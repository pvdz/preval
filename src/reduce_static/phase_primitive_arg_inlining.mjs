// When a function is called with a primitive; clone the function and force that parameter
// to that primitive, in hopes of simplifying/reducing the function.

import crypto from 'crypto';

import {
  ASSERT,
  log,
  group,
  groupEnd,
  vlog,
  vgroup,
  vgroupEnd,
  tmat,
  fmat,
  rule,
  example,
  before,
  source,
  after,
  findBodyOffset,
} from '../utils.mjs';
import * as AST from '../ast.mjs';
import { cloneFunctionNode } from '../utils/serialize_func.mjs';
import { createFreshVar } from '../bindings.mjs';

// Things to do
// - Inline local constants, numbers, literal idents
// - Inline imported constants
// - Unroll a function when called with a primitive
// - Branch out
// - Const binding folding (const a = $(); const b = a; -> redundant)
// - Unary negative/positive should look at argument

export function phasePrimitiveArgInlining(program, fdata, resolve, req, cloneLimit = 0) {
  group(
    '\n\n\n##################################\n## phase primitive arg inlining  ::  ' +
      fdata.fname +
      '\n##################################\n\n\n',
  );

  const ast = fdata.tenkoOutput.ast;
  vlog('\nCurrent state (before primitive arg inlining)\n--------------\n' + fmat(tmat(ast)) + '\n--------------\n');

  // Initially we only care about bindings whose writes have one var decl and only assignments otherwise
  // Due to normalization, the assignments will be a statement. The var decl can not contain an assignment as init.
  // Elimination of var decls or assignments will be deferred. This way we can preserve parent/node
  // relationships which might otherwise break. This means a binding may have been removed from the books
  // even though it's technically still part of the AST. But since we take the books as leading in this step
  // that should not be a problem.

  // - A function can not be cloned here if it contains another function.
  //   - This should make it impossible to clone cloned functions as a side effect
  //   - It will reduce the duplication surface a little bit.
  //   - It means the name of a function binding can be safely used as a cache key for the purpose of cloning
  // - If we know a function will be called with a particular value (like primitives);
  //   - Create a cache key;
  //     - The encoding of the cache key must have a few props;
  //       - We must be able to recognize a cache key as a cloned function key
  //       - It must be a valid identifier
  //       - It must contain all the replaced params and the values that we replaced it with (this might get tricky in time)
  //       - We must be able to deduce the name of the original function as it was before this step in the first pass (unique)
  //       - Maybe turn to a digest for values that serialize to very long ident names? That's bound to happen but we may need to protect against this in different ways (too).
  //     - In general, we must be able to decompose the key into its original pieces, values having a one-way-collision-free encoding to valid idents
  //   - Check whether cache key already exists
  //     - If clone exists, use that name. No need to clone.
  //       - All clones have the same scoping properties as the original function so that should not lead to problems
  //       - All optimization to the cloned function should happen for any such function so it should be fine
  //          - Exceptions are `arguments.length` and `this` related optimizations, which we should handle with extra care
  //     - Else if clone does not exist
  //       - Take AST of function, deep clone it (print, parse, use func from fresh AST verbatim)
  //       - Set name of the cloned function to the cache key
  //       - Inject an assignment of the inlined value to the parameter as the first statement of the function
  //   - Replace call site with new or cached name
  const newFuncs = []; // <write, clonedFuncNode>
  const truncableCallArgs = []; // <args, func>
  const cloneCounts = program.cloneCounts; // How often did we clone a particular function? (dumb recursion protection)
  const cloneMap = program.cloneMap; // Retained between passes
  fdata.globallyUniqueNamingRegistry.forEach((meta, metaName) => {
    if (meta.isBuiltin) return;
    if (meta.isImplicitGlobal) return;
    if (!meta.isConstant) return;

    vlog('- `' + metaName + '`:', meta.constValueRef.node.type, ', writes:', meta.writes.length, ', reads:', meta.reads.length);
    if (meta.constValueRef.node.type === 'FunctionExpression') {
      const funcNode = meta.constValueRef.node;
      const bodyOffset = findBodyOffset(funcNode);
      const hasRest = !!funcNode.params[funcNode.params.length - 1]?.rest;

      // If the function contains another function, it is not eligible for cloning unless there is only one call to it. This prevents infinite recursion loops.
      // If the function reads arguments then skip it for now. Inlining may either repeat endlessly or change semantics
      if ((!funcNode.$p.containsFunctions || meta.reads.length === 1) && !funcNode.$p.readsArgumentsAny) {
        meta.reads.forEach((read) => {
          if (read.parentProp === 'callee' && read.parentNode.type === 'CallExpression') {
            const callee = read.parentNode.callee;
            ASSERT(callee === read.node);
            const args = read.parentNode.arguments;
            // This is a direct call to the function
            const staticArgs = []; // <index, valueNode> for each static arg. index should map to args and params.

            vlog('- read; call with', args.length, 'args, func has', funcNode.params.length, 'params.');

            // Note: not straightforward;
            //       - spread args shift arg<>param mapping
            //       - we can't really apply this trick to rest params (well, maybe in some cases, but we'll see)
            //       - excess arguments are ignored. if the function does not access `arguments`, we should DCE them (but that's an edge case)
            //       - excess params get set to `undefined`. less of an edge case as it triggers param defaults (still do after we normalized them away)
            funcNode.params.some((pnode, pi) => {
              ASSERT(pnode.type === 'Param');
              if (pnode.rest) {
                // Do not change the rest param of the function.
                return true;
              }
              if (pi >= args.length) {
                // There are more params than arguments for this call. Set the unused parameter to undefined
                staticArgs.push(hashArg(pi, AST.identifier('undefined')));
                return;
              }
              const anode = args[pi];
              if (anode.type === 'SpreadElement') {
                return true; // Stop processing.
              }
              if (AST.isPrimitive(anode)) {
                staticArgs.push(hashArg(pi, anode));
              }
              // Otherwise just keep this param as is (we can probably refine this later)
            });

            if (staticArgs.length) {
              // There's at least one argument that we might inline
              // Clone the function, give it a different name, make sure all bindings created inside have a
              // unique name (since the cloning will make them dupes).

              ASSERT(
                callee.type === 'Identifier' && callee.name === metaName,
                'we are walking metas and checked that hte parent is CallExpression.callee so this must be an identifier',
              );
              const cloneDetails = metaName.startsWith('$clone$')
                ? // This should be a function that we previously cloned
                  fromClonedFuncCacheKey(metaName, staticArgs)
                : // This should be the original function, not one we cloned before
                  {
                    name: hashCloneName(metaName),
                    inlined: staticArgs,
                  };
              vlog('The cloneDetails:', cloneDetails);
              cloneDetails.inlined.forEach((obj) => {
                if (obj.type === undefined) {
                  console.log('input name:', [metaName]);
                  console.log('fromClonedFuncCacheKey(name, staticArgs):');
                  console.log(fromClonedFuncCacheKey(metaName, staticArgs), { depth: null });
                  console.log(staticArgs, { depth: null });
                  console.log('otherwise');
                  console.log(
                    {
                      name: metaName,
                      inlined: staticArgs,
                    },
                    { depth: null },
                  );
                  ASSERT(false, 'wat?');
                }
              });
              const cloneCacheKey = toClonedFuncCacheKey(cloneDetails);
              log(
                'Cloning func the hard way. Original func name: `' +
                  metaName +
                  '` (hashed: `' +
                  cloneDetails.name +
                  '`). Cloned name: `' +
                  cloneCacheKey +
                  '`',
              );

              const knownClone = cloneMap.has(cloneCacheKey);
              if (knownClone && fdata.globallyUniqueNamingRegistry.has(cloneCacheKey)) {
                // Note: the clone may have been eliminated by other rules so we must verify that it still exists.
                // If the clone no longer exists we must recreate it anew.
                // Let's hope this doesn't lead to clone-eliminate-clone indirect infinite loops ;( You know it will.
                log('Using a cached cloned function:', cloneCacheKey);
                //read.node.name = cloneCacheKey;
                callee.name = cloneCacheKey; // Eh, redundant?
                staticArgs.forEach(({ index }) => {
                  if (args[index]) args[index] = AST.nul();
                });
              } else {
                // Memoize the function being cloned. If the same function is called multiple times with the same primitive
                // then we can reuse that result. This should not be a scoping problem (it was able to reach the original func)
                // Cache key should be param index and primitive value
                // TODO: limit the size of strings here. At some point it should be either a digest or skipped entirely.
                const count = (cloneCounts.get(cloneDetails.name) ?? 0) + 1;

                if (meta.reads.length === 1) {
                  vlog('The function is only called once so we do not need to clone it');
                  const funcBody = funcNode.body.body;
                  staticArgs.forEach(({ index: paramIndex, type, value: paramValue }) => {
                    if (paramIndex >= funcNode.params.length) return; // Argument without param, we ignore.
                    if (funcNode.params[paramIndex].$p.ref) {
                      log('- Replacing param `' + funcNode.params[paramIndex].$p.ref?.name + '` with', paramValue);
                    } else {
                      log('- Want to replace param', paramIndex, 'with', paramValue, 'but it looks like it is not used');
                    }

                    const targetParamName = '$$' + paramIndex;
                    let found = false;
                    for (let i = 0, l = bodyOffset - 1; i < l; ++i) {
                      const n = funcBody[i];
                      ASSERT(
                        n.type === 'VariableDeclaration' || n.type === 'EmptyStatement',
                        'rn the header only contains var decls. not very relevant, just assuming this when doing checks. if this changes, update the logic here accordingly',
                        n,
                      );
                      if (
                        n.type === 'VariableDeclaration' &&
                        n.declarations[0].init.type === 'Param' &&
                        n.declarations[0].init.name === targetParamName
                      ) {
                        funcBody[i] = AST.emptyStatement();
                        found = true;
                        break;
                      }
                    }
                    ASSERT(!!found === !!funcNode.params[paramIndex].$p.ref, 'iif found then the param should have a ref to it');
                    if (found) {
                      funcBody.splice(
                        bodyOffset,
                        0,
                        AST.variableDeclaration(
                          funcNode.params[paramIndex].$p.ref.name,
                          type === 'I' ? AST.identifier(paramValue) : type === 'N' ? AST.nul() : AST.literal(paramValue),
                          'let',
                        ),
                      );
                    } else {
                      vlog(
                        'It appears that the param is unused. As such we can not find the original param name for this index. Nothing to do here.',
                      );
                    }
                  });
                  staticArgs.forEach(({ index }) => {
                    if (read.parentNode['arguments'][index]) read.parentNode['arguments'][index] = AST.nul();
                  });
                } else if (cloneLimit && count > cloneLimit) {
                  vlog('Reached max of', cloneLimit, 'clones for function `' + cloneDetails.name + '`. Not cloning it again.');
                } else {
                  vlog('Cloning...');
                  // Make sure to register the name (and that its unique) in case of a cache-hit that was eliminated.
                  const newName = createFreshVar(cloneCacheKey, fdata);
                  vlog('Name to use for clone: `' + cloneCacheKey + '`');
                  cloneMap.set(cloneCacheKey, newName);
                  cloneCounts.set(cloneDetails.name, count);
                  const newFunc = cloneFunctionNode(funcNode, newName, staticArgs, fdata);
                  newFuncs.push([meta, AST.variableDeclaration(newName, newFunc, 'const')]);
                  staticArgs.forEach(({ index }) => {
                    if (read.parentNode['arguments'][index]) read.parentNode['arguments'][index] = AST.nul();
                  });
                  newFunc.name = null;
                  read.node.name = newName;
                }
              }
            }
            if (!hasRest) {
              truncableCallArgs.push([funcNode, args]);
            }
          }
        });
      }
    }
  });
  // The next loop will invalidate read/write references...
  truncableCallArgs.forEach(([funcNode, args]) => {
    const params = funcNode.params;
    if (args.length > params.length) {
      ASSERT(!funcNode.$p.readsArgumentsAny);
      if (funcNode.$p.readsArgumentsLen) {
        // The function reads `arguments.length` so replace the args with a placeholder
        for (let i = params.length; i < args.length; ++i) {
          if (args[i]) args[i] = AST.nul();
        }
      } else {
        // The function does not read `arguments` so we should be fine to remove them
        args.length = params.length;
      }
    }
  });
  newFuncs.forEach(([meta, node]) => {
    ASSERT(meta.writes.length === 1, 'this transform should not have happened if there were multiple writes');
    meta.writes[0].blockBody.splice(meta.writes[0].blockIndex, 0, node);
  });
  log('End of primitive arg inlining. Cloned', newFuncs.length, 'functions, checked', truncableCallArgs.length, 'funcs for excessive args');

  vlog('\nCurrent state\n--------------\n' + fmat(tmat(ast)) + '\n--------------\n');
  groupEnd();
}

function hashSlow(str) {
  // This is slow at scale :/ May need a better mechanism for this at some point. But guaranteed to have a fixed length at least.
  const hash = crypto.createHash('sha1');
  hash.update(str);
  return hash.digest('hex');
}

function hashArg(index, valueNode) {
  const value =
    valueNode.type === 'Identifier'
      ? valueNode.name
      : valueNode.type === 'Literal'
      ? valueNode.value
      : valueNode.type === 'UnaryExpression' &&
        valueNode.operator === '-' &&
        valueNode.argument.type === 'Literal' &&
        typeof valueNode.argument.value === 'number'
      ? -valueNode.argument.value
      : ASSERT(false, 'support this node kind', valueNode);
  return {
    index,
    type:
      valueNode.type === 'Identifier'
        ? 'I'
        : value === true
        ? 'T'
        : value === false
        ? 'F'
        : valueNode.raw === 'null'
        ? 'N'
        : typeof value === 'number'
        ? 'D'
        : typeof value === 'string'
        ? 'S'
        : ASSERT(false, 'support this value', valueNode),
    value,
  };
}
function hashCloneName(name) {
  // We need to eliminate $ from the name because we use that to split
  return name.replace(/_/g, '__').replace(/\$/g, 'd_d');
}
function toClonedFuncCacheKey({ name: hashedName, inlined /*:Array<{index, type, node}>*/ }) {
  vlog('toClonedFuncCacheKey');
  ASSERT(!hashedName.includes('$'), 'name should be hashed and not include a dollar sign');
  return `$clone$${hashedName}$${inlined
    .map(({ index, type, value }) => {
      if ('TFNI'.includes(type)) return index + '_' + type + String(value);
      if (type === 'D') return index + '_D' + String(value).replace(/\W/g, '_');
      if (type === 'S') {
        if (value.length < 40 && /^[a-zA-Z0-9_]+$/.test(value)) return index + '_S' + value;
        return index + '_S' + hashSlow(value);
      }
      throw ASSERT(false, 'support this kind of literal', [type, value]);
    })
    .join('$')}`;
}
function fromClonedFuncCacheKey(key, withAdditionalInlines = []) {
  vlog('fromClonedFuncCacheKey', [key]);
  const [empty, clone, originalName, ...params] = key.split('$');
  ASSERT(key.startsWith('$clone$'));
  ASSERT(!originalName.includes('$'));

  const inlined = params
    .map((p) => {
      if (/^\d+%/.test(p) && key.endsWith('$' + p)) {
        // This is the suffix counter to make var names unique.
        // I think this means we have to treat the whole name as a new name that we haven't seen yet
        // I think this can happen if a function contains another function, the inner function gets cloned,
        // then the outer function gets cloned which makes a duplicate of the inner function, with a suffix.
        // Some steps later, it is possible that the contents of one copy gets inlined differently from
        // the other copy. So we should not treat both functions as equal.
        // Observe: `function f(b) { function g(a, b) { return [a, b]; } return [g(1), g(2)]; } $(f(3), f(4));`
        // First g gets cloned with param a bound to 1 and the other clone bound to 2. Then f gets cloned, binding
        // b to 3 and 4. This leads to a clone of g having its return value inlined to [1,3] , [2,3] , [1,4] and [2,4].
        // If we were to treat the copies of the clones as equals then we would not have the [1,4] and [2,4] variations.
        ASSERT(false, 'find a test case that has this problem and fix it...');
      }
      const [paramIndex, ...valueSplit] = p.split('_');
      const typeValue = valueSplit.join('_');
      const type = typeValue[0];
      const value = typeValue.slice(1);
      return {
        index: parseInt(paramIndex, 10),
        type,
        value,
      };
    })
    .concat(withAdditionalInlines);

  return {
    name: originalName,
    inlined,
  };
}
