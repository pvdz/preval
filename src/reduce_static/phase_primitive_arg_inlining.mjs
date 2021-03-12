// When a function is called with a primitive; clone the function and force that parameter
// to that primitive, in hopes of simplifying/reducing the function.
import { log, group, groupEnd, ASSERT, BLUE, RED, RESET, tmat, fmat, TRIBE, PURPLE, DIM, YELLOW, rule, example, before, source, after } from '../utils.mjs';
import * as AST from '../ast.mjs';
import { cloneFunctionNode } from '../utils/serialize_func.mjs';
import crypto from 'crypto';

let VERBOSE_TRACING = true;

// Things to do
// - Inline local constants, numbers, literal idents
// - Inline imported constants
// - Unroll a function when called with a primitive
// - Branch out
// - Const binding folding (const a = $(); const b = a; -> redundant)
// - Unary negative/positive should look at argument

export function phasePrimitiveArgInlining(program, fdata, resolve, req, verbose = VERBOSE_TRACING, cloneLimit = 0) {

  VERBOSE_TRACING = verbose;
  if (fdata.len > 10 * 1024) VERBOSE_TRACING = false; // Only care about this for tests or debugging. Limit serialization for larger payloads for the sake of speed.

  group(
    '\n\n\n##################################\n## phase primitive arg inlining  ::  ' +
      fdata.fname +
      '\n##################################\n\n\n',
  );

  // Initially we only care about bindings whose writes have one var decl and only assignments otherwise
  // Due to normalization, the assignments will be a statement. The var decl can not contain an assignment as init.
  // Elimination of var decls or assignments will be deferred. This way we can preserve parent/node
  // relationships which might otherwise break. This means a binding may have been removed from the books
  // even though it's technically still part of the AST. But since we take the books as leading in this step
  // that should not be a problem.

  const ast = fdata.tenkoOutput.ast;

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
  fdata.globallyUniqueNamingRegistry.forEach((meta, name) => {
    if (meta.isBuiltin) return;
    if (meta.isImplicitGlobal) return;

    if (VERBOSE_TRACING) log(' - `' + name + '`', meta.writes.length, meta.reads.length, meta.constValueRef?.type);
    if (
      meta.writes.length === 1 &&
      meta.constValueRef &&
      (meta.constValueRef.node.type === 'FunctionExpression' || meta.constValueRef.node.type === 'ArrowFunctionExpression')
    ) {
      const write = meta.writes[0];

      const funcNode = meta.constValueRef.node;
      const hasRest = funcNode.params.length > 0 && funcNode.params[funcNode.params.length - 1].type === 'RestElement';

      // If the function contains another function, it is not eligible for cloning unless it only referenced once.
      // If the function reads arguments then skip it for now. Inlining may either repeat endlessly or change semantics
      if ((!funcNode.$p.containsFunctions || meta.reads.length === 1) && !funcNode.$p.readsArgumentsAny) {
        meta.reads.forEach((read) => {
          if (read.parentProp === 'callee' && read.parentNode.type === 'CallExpression') {
            const callee = read.parentNode.callee;
            ASSERT(callee === read.node);
            const args = read.parentNode.arguments;
            // This is a direct call to the function
            const staticArgs = []; // <index, valueNode> for each static arg. index should map to args and params.

            log('- read; call with', args.length, 'args, func has', funcNode.params.length, 'params.');

            // Note: not straightforward;
            //       - spread args shift arg<>param mapping
            //       - we can't really apply this trick to rest params (well, maybe in some cases, but we'll see)
            //       - excess arguments are ignored. if the function does not access `arguments`, we should DCE them (but that's an edge case)
            //       - excess params get set to `undefined`. less of an edge case as it triggers param defaults (still do after we normalized them away)
            funcNode.params.some((pnode, pi) => {
              if (pnode.type === 'RestElement') {
                return true; // Stop processing
              }
              if (pi >= args.length) {
                // Fill the unused parameter with undefined
                staticArgs.push(hashArg(pi, AST.identifier('undefined')));
                return;
              }
              const anode = args[pi];
              if (anode.type === 'SpreadElement') {
                return true; // Stop processing.
              }
              if (AST.isPrimitive(anode)) {
                staticArgs.push(hashArg(pi, anode));
                return;
              }
            });
            if (staticArgs.length) {
              // There's at least one argument that we might inline. TODO: Make sure it hits an actual param
              // Clone the function, give it a different name, make sure all bindings created inside are updated accordingly as well

              ASSERT(callee.type === 'Identifier' && callee.name === name);
              const cloneDetails = name.startsWith('$clone$')
                ? // This should be a function that we previously cloned
                  fromClonedFuncCacheKey(name, staticArgs)
                : // This should be the original function, not one we cloned before
                  {
                    name: hashCloneName(name),
                    inlined: staticArgs,
                  };
              if (VERBOSE_TRACING) log('The cloneDetails:', cloneDetails);
              cloneDetails.inlined.forEach((obj) => {
                if (obj.type === undefined) {
                  console.log('input name:', [name]);
                  console.log('fromClonedFuncCacheKey(name, staticArgs):');
                  console.log(fromClonedFuncCacheKey(name, staticArgs), { depth: null });
                  console.log(staticArgs, { depth: null });
                  console.log('otehrwise');
                  console.log(
                    {
                      name,
                      inlined: staticArgs,
                    },
                    { depth: null },
                  );
                  endnow;
                }
              });
              const cloneCacheKey = toClonedFuncCacheKey(cloneDetails);
              log(
                'Cloning func the hard way. Original func name: `' +
                  name +
                  '` (hashed: `' +
                  hashCloneName(name) +
                  '`). Cloned name: `' +
                  cloneCacheKey +
                  '`',
              );

              if (cloneMap.has(cloneCacheKey)) {
                log('Using a cached cloned function:', cloneCacheKey);
                //read.node.name = cloneCacheKey;
                callee.name = cloneCacheKey; // Eh, redundant?
                staticArgs.forEach(({ index }) => {
                  args[index] = AST.identifier('$');
                });
              } else {
                // Memoize the function being cloned. If the same function is called multiple times with the same primitive
                // then we can reuse that result. This should not be a scoping problem (it was able to reach the original func)
                // Cache key should be param index and primitive value
                // TODO: limit the size of strings here. At some point it should be either a digest or skipped entirely.
                const count = (cloneCounts.get(cloneDetails.name) ?? 1) + 1;
                if (meta.reads.length === 1) {
                  if (VERBOSE_TRACING) log('The function is only called once so we do not need to clone it');
                  staticArgs.forEach(({ index: paramIndex, type, value: paramValue }) => {
                    if (paramIndex >= funcNode.params.length) return; // Argument without param, we ignore.
                    log('- Replacing param `' + funcNode.params[paramIndex].name + '` with', paramValue);
                    funcNode.body.body.unshift(
                      AST.expressionStatement(
                        AST.assignmentExpression(funcNode.params[paramIndex].name, type === 'I' ? AST.identifier(paramValue) : type === 'N' ? AST.literal(null, true) : AST.literal(paramValue)),
                      ),
                    );
                  });
                  staticArgs.forEach(({ index }) => {
                    read.parentNode['arguments'][index] = AST.identifier('$');
                  });
                } else if (cloneLimit && count > cloneLimit) {
                  if (VERBOSE_TRACING) log('Reached max of', cloneLimit, 'clones for function `' + cloneDetails.name + '`. Not cloning it again.');
                } else {
                  if (VERBOSE_TRACING) log('Cloning...');
                  cloneMap.set(cloneCacheKey, cloneCacheKey);
                  cloneCounts.set(cloneDetails.name, count);
                  const newFunc = cloneFunctionNode(funcNode, cloneCacheKey, staticArgs, fdata, VERBOSE_TRACING);
                  newFuncs.push([meta, AST.variableDeclaration(cloneCacheKey, newFunc, 'const')]);
                  staticArgs.forEach(({ index }) => {
                    read.parentNode['arguments'][index] = AST.identifier('$');
                  });
                  newFunc.name = null;
                  read.node.name = cloneCacheKey;
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
          args[i] = AST.identifier('$');
        }
      } else {
        // The function does not read `arguments` so we should be fine to remove them
        args.length = params.length;
      }
    }
  });
  newFuncs.forEach(([meta, node]) => {
    ASSERT(meta.constValueRef.containerNode.body && meta.constValueRef.containerIndex >= 0, 'fixme if other');
    meta.constValueRef.containerNode.body.splice(meta.constValueRef.containerIndex + 1, 0, node);
  });
  log('End of primitive arg inlining. Cloned', newFuncs.length, 'functions, checked', truncableCallArgs.length, 'funcs for excessive args');

  if (VERBOSE_TRACING) log('\nCurrent state\n--------------\n' + fmat(tmat(ast)) + '\n--------------\n');
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
  return name.replace(/_/g, '__').replace(/\$/g, '_');
}
function toClonedFuncCacheKey({ name, inlined /*:Array<{index, type, node}>*/ }) {
  if (VERBOSE_TRACING) log('toClonedFuncCacheKey');
  const hashedName = hashCloneName(name);
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
  if (VERBOSE_TRACING) log('fromClonedFuncCacheKey', [key]);
  ASSERT(key.startsWith('$clone$'));
  const [empty, clone, originalName, ...params] = key.split('$');

  const inlined = params
    .map((p) => {
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
