// Given a loop that is preceded by predictable statements and that contains free statements and expressions that only operate on
// those or local statements, and everything is free and/or predictable, then we can precompile and resolve them.
// This is mostly obfuscation land but it might also be tiny dev overhead.
//
// ```
// let counter = 0;
// const arr = [];
// while (true) {
//   if (counter < 100) {
//     arr.push(counter);
//   } else {
//     break;
//   }
//   counter += 1;
// }
// ```
//
// This whole snippet is predictable (we are assuming clean prototypes) and we can replace the whole thing
// with just the arr decl and an array literal of 100.
// That's what we're aiming for here.

import walk from '../../lib/walk.mjs';
import * as AST from '../ast.mjs';
import { ASSERT, log, group, groupEnd, vlog, vgroup, vgroupEnd, tmat, fmat, source, REF_TRACK_TRACING, assertNoDupeNodes, rule, example, before, after, todo } from '../utils.mjs';
import { runFreeWithPcode } from '../pcode.mjs';
import { SYMBOL_COERCE, SYMBOL_FRFR } from '../symbols_preval.mjs';
import { PRIMITIVE_TYPE_NAMES_PREVAL, PRIMITIVE_TYPE_NAMES_TYPEOF } from '../constants.mjs';
import { BUILTIN_SYMBOLS, symbo } from '../symbols_builtins.mjs';

const FAILURE_SYMBOL = {};
const BREAK_SYMBOL = {};

const SUPPORTED_GLOBAL_FUNCS = [SYMBOL_FRFR, SYMBOL_COERCE, '$frfr', 'parseInt', 'parseFloat', 'isNaN', 'isFinite'];
const SUPPORTED_METHODS = [
  symbo('array', 'push'),
  symbo('array', 'shift'),
  symbo('string', 'charAt'),
  symbo('string', 'charCodeAt'),
  symbo('String', 'fromCharCode'),
];

export function freeLoops(fdata, prng, usePrng = true) {
  group('\n\n\nChecking for free loops to simulate and resolve\n');
  //vlog('\nCurrent state\n--------------\n' + fmat(tmat(fdata.tenkoOutput.ast)) + '\n--------------\n');
  const r = _freeLoops(fdata, prng, usePrng);
  groupEnd();
  return r;
}

export function _freeLoops(fdata, prng, usePrng) {
  //const ast = fdata.tenkoOutput.ast;

  let changed = 0;

  // Find loops.
  // - Check any statement prior to it and remember how many are predictable
  //   - Keep a list of variables and their toplevel type
  // - Scan through the loop
  //   - Verify each statement, recursively
  //   - Each function must be free or only refer to vars collected so far
  //   - New decls are part of this set since if they are inside this loop they should be safe
  //   - I guess we bail as soon as anything escapes or is otherwise unpredictable
  // - If the loop is free then we should be able to resolve it ...


  walk(_walker, fdata.tenkoOutput.ast, 'ast');
  function _walker(node, beforeWalk, nodeType, path) {
    if (beforeWalk) return;

    if (node.type !== 'WhileStatement') return;

    // From this node, walk back up up to the start of the block or until the first statement that is not predictable

    const whileIndex = path.indexes[path.indexes.length - 1];
    const blockBody = path.nodes[path.nodes.length - 2]?.body;

    const callNodeToSymbol = new Map; // CallExpression node (obj instance) to qualified string name of func or method to be called
    const declaredNameTypes = new Map; // Binding name to mustBeType value

    vgroup('Checking isFree on `while` loop @', blockBody[whileIndex].$p.pid, '...');
    vgroup('Scanning statements before the loop...');
    let fromIndex = whileIndex;
    while (fromIndex > 0) {
      fromIndex = fromIndex - 1;
      vgroup('Statement', fromIndex, '(', blockBody[fromIndex].type, blockBody[fromIndex].init?.type, ')');
      const r = isFree(blockBody[fromIndex], fdata, callNodeToSymbol, declaredNameTypes, false);
      if (!r || r === FAILURE_SYMBOL) {
        vlog('Statement at index', fromIndex, 'is NOT free, ends the scan of pre-while-statements (', blockBody[fromIndex].type, blockBody[fromIndex].init?.type, ')');
        fromIndex += 1; // Compensate.
        vgroupEnd();
        break;
      } else {
        vlog('^ Statement at index', fromIndex, 'is free (', blockBody[fromIndex].type, blockBody[fromIndex].init?.type, ')');
      }
      vgroupEnd();
    }
    vgroupEnd();

    vlog('Now calling isFree() on the `while` node... Including these idents before it:', Array.from(declaredNameTypes.keys()));
    for (let i=0; i<node.body.body.length; ++i) {
      const r = isFree(node.body.body[i], fdata, callNodeToSymbol, declaredNameTypes, true)
      if (!r || r === FAILURE_SYMBOL) {
        vlog('-- bail: While loop is not free\n\n');
        vgroupEnd();
        return;
      }
    }
    vgroupEnd();

    // While loop must be free. Let's try to resolve it.
    vlog('\n\nOk! Resolving `while` loop @', blockBody[whileIndex].$p.pid, 'at block index', whileIndex,', starting from statement index', fromIndex,'\n\n');

    // The register contains the `init` for each declared variable. We use those as storage.
    // Then, by the end, any decls we want to keep will have the updated/correct node value.
    // The rest, we just drop so it doesn't matter what state they are in.
    const register = new Map;

    rule('A while loop that is fully predictable can be resolved and eliminated');
    example(
      'let x = 0; const arr = []; while (i < 10) { arr.push(i); ++i; }',
      'let x = 10; const arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];'
    );
    for (let i=fromIndex; i<=whileIndex; ++i) before(blockBody[i]);

    vlog('\n\nStart\n\n');

    let failed = false;
    for (let i=fromIndex; i<=whileIndex; ++i) {
      const node = blockBody[i];
      if (runStatement(fdata, node, register, callNodeToSymbol, prng, usePrng) === FAILURE_SYMBOL) {
        failed = true;
        break;
      }
    }

    vlog('Storing final values of pre-loop variables');
    for (let i=fromIndex; i<whileIndex; ++i) {
      if (blockBody[i].type === 'VarStatement') {
        blockBody[i].init = register.get(blockBody[i].id.name);
      }
    }

    if (failed) {
      vlog('Failed to resolve free loop, ohnooooes');
    } else {
      vlog('Successfully resolved free loop!');
      if (node.type === 'WhileStatement') blockBody[whileIndex] = AST.emptyStatement();
    }

    for (let i=fromIndex; i<=whileIndex; ++i) after(blockBody[i]);
    changed = changed + 1; // hopefully, or this is an endless loop...

    if (failed) fixmehhh

    ASSERT(!failed, 'gotta fixme...');
  }

  if (changed) {
    log('Free loops dropped:', changed, '. Restarting from phase1');
    return {what: 'freeLoops', changes: changed, next: 'phase1'};
  }

  log('Free func loops dropped: 0.');
}

// A node is "free" when it is fully predictable by preval.
// For example, primitive operations are fully predictable.
// But also, pushing a primitive into an array literal.
function isFree(node, fdata, callNodeToSymbol, declaredNameTypes, insideWhile) {
  vgroup('isFree(', node.type, node.value, node.name, ')');
  const r = _isFree(node, fdata, callNodeToSymbol, declaredNameTypes, insideWhile);
  vgroupEnd();
  return r;
}
function _isFree(node, fdata, callNodeToSymbol, declaredNameTypes, insideWhile) {
  ASSERT(node, 'should receive a node at least');
  ASSERT(arguments.length === 5, 'arg count to isFree');

  if (AST.isPrimitive(node)) return true;

  switch (node.type) {
    case 'ArrayExpression': {
      // We can support some cases of spread but initially it won't
      return node.elements.every(e => !e || (e.type !== 'SpreadElement' && isFree(e, fdata, callNodeToSymbol, declaredNameTypes, insideWhile)));
    }
    case 'AssignmentExpression': {
      if (node.left.type === 'Identifier') {
        return isFree(node.left, fdata, callNodeToSymbol, declaredNameTypes, insideWhile) && isFree(node.right, fdata, callNodeToSymbol, declaredNameTypes, insideWhile);
      } else if (node.left.type === 'MemberExpression') {
        if (node.left.computed) {
          // `arr[x] = y`
          return isFree(node.left.object, fdata, callNodeToSymbol, declaredNameTypes, insideWhile) &&  isFree(node.left.property, fdata, callNodeToSymbol, declaredNameTypes, insideWhile) && isFree(node.right, fdata, callNodeToSymbol, declaredNameTypes, insideWhile);
        } else {
          // `arr.x = y`
          return isFree(node.left.object, fdata, callNodeToSymbol, declaredNameTypes, insideWhile) && isFree(node.right, fdata, callNodeToSymbol, declaredNameTypes, insideWhile);
        }
      } else {
        todo('what else can we assign to?', node.left);
        return false;
      }
    }
    case 'BinaryExpression': return isFree(node.left, fdata, callNodeToSymbol, declaredNameTypes, insideWhile) && isFree(node.right, fdata, callNodeToSymbol, declaredNameTypes, insideWhile);
    case 'BlockStatement': {
      for (let i=0; i<node.body.length; ++i) {
        if (!isFree(node.body[i], fdata, callNodeToSymbol, declaredNameTypes, insideWhile)) return false;
      }
      return true;
    }
    case 'BreakStatement': {
      if (node.label) {
        todo('Support breaking to a label in isFree');
        return false;
      }
      // Technically this is only okay once we're inside the loop...?
      if (insideWhile) return true;
      // Some kind of `break` statement before a while loop. Totally valid but if we could solve it a previous call would have..
      return false;
    }
    case 'CallExpression': {
      // A call is free when it is predictable. That means it's a built-in or something we can track, initially just $frfr
      vlog('-- Calling', node.callee.type === 'Identifier' ? node.callee.name : node.callee.object?.name + '.' + node.callee.property?.name);
      if (node.callee.type === 'Identifier') {
        if (SUPPORTED_GLOBAL_FUNCS.includes(node.callee.name)) {
          if (node.callee.name === SYMBOL_FRFR) {
            // Special case: $frfr. We control this.
            // The return type should be the return type of the func that is the first arg to this call.
            ASSERT(node.arguments[0]?.type === 'Identifier');
            const meta = fdata.globallyUniqueNamingRegistry.get(node.arguments[0].name);
            const t = meta.typing.returns; // this is a string
            if (!t || t === 'primitive') {
              todo('Support $frfr that has multiple/no/generic returns type;', t);
              return FAILURE_SYMBOL;
            }
            callNodeToSymbol.set(node.call, t);
            return true;
          }
          if (node.callee.name === SYMBOL_COERCE) {
            callNodeToSymbol.set(node, '$coerce');
            // Special case: $coerce
            // We control this so we should have a string as second arg and unknown as first arg
            if (AST.isPrimitive(node.arguments[0])) return true;
            if (node.arguments[0].type === 'Identifier' && declaredNameTypes.has(node.arguments[0].name)) {
              const t = declaredNameTypes.get(node.arguments[0].name);
              return PRIMITIVE_TYPE_NAMES_PREVAL.has(t);
            }
            // Technically it is possible for this to be an array or whatever. And even that could be supported.
            const t = declaredNameTypes.get(node.arguments[0].name);
            if (PRIMITIVE_TYPE_NAMES_PREVAL.has(t)) {
              return true;
            }
            todo('Support non-primitive in first arg to $coerce', node.arguments[0]);
            return false;
          }
          if (node.callee.name === 'isNaN') {
            callNodeToSymbol.set(node, 'isNaN');

            if (!node.arguments[0]) return true;
            if (AST.isPrimitive(node.arguments[0])) return true;
            if (node.arguments[0].type === 'Identifier' && declaredNameTypes.has(node.arguments[0].name)) {
              const t = declaredNameTypes.get(node.arguments[0].name);
              return PRIMITIVE_TYPE_NAMES_PREVAL.has(t);
            }
            // Technically it is possible for this to be an array or whatever. And even that could be supported.
            const t = declaredNameTypes.get(node.arguments[0].name);
            if (PRIMITIVE_TYPE_NAMES_PREVAL.has(t)) {
              return true;
            }
            todo('Support non-primitive in first arg to isNan', node.arguments[0]);
            return false;
          }
          if (node.callee.name === 'isFinite') {
            callNodeToSymbol.set(node, 'isFinite');

            if (!node.arguments[0]) return true;
            if (AST.isPrimitive(node.arguments[0])) return true;
            if (node.arguments[0].type === 'Identifier' && declaredNameTypes.has(node.arguments[0].name)) {
              const t = declaredNameTypes.get(node.arguments[0].name);
              return PRIMITIVE_TYPE_NAMES_PREVAL.has(t);
            }
            // Technically it is possible for this to be an array or whatever. And even that could be supported.
            const t = declaredNameTypes.get(node.arguments[0].name);
            if (PRIMITIVE_TYPE_NAMES_PREVAL.has(t)) {
              return true;
            }
            todo('Support non-primitive in first arg to isFinite', node.arguments[0]);
            return false;
          }
          if (node.callee.name === 'parseInt') {
            callNodeToSymbol.set(node, 'parseInt');

            if (!node.arguments[0]) {}
            else if (AST.isPrimitive(node.arguments[0])) {}
            else if (
              node.arguments[0].type === 'Identifier' &&
              declaredNameTypes.has(node.arguments[0].name) &&
              PRIMITIVE_TYPE_NAMES_PREVAL.has(declaredNameTypes.get(node.arguments[0].name))
            ) {}
            else {
              // Technically it is possible for this to be an array or whatever. And even that could be supported.
              const t = declaredNameTypes.get(node.arguments[0].name);
              if (PRIMITIVE_TYPE_NAMES_PREVAL.has(t)) {
                return true;
              }
              todo('Support non-primitive ident-ref in first arg to parseInt', node.arguments[0], '~>', declaredNameTypes.get(node.arguments[0].name));
              return false;
            }

            if (!node.arguments[1]) {}
            else if (AST.isPrimitive(node.arguments[1])) {}
            else if (
              node.arguments[1].type === 'Identifier' &&
              declaredNameTypes.has(node.arguments[1].name) &&
              PRIMITIVE_TYPE_NAMES_PREVAL.has(declaredNameTypes.get(node.arguments[1].name))
            ) {}
            else {
              const t = declaredNameTypes.get(node.arguments[1].name);
              if (PRIMITIVE_TYPE_NAMES_PREVAL.has(t)) {
                return true;
              }
              // Technically it is possible for this to be an array or whatever. And even that could be supported.
              todo('Support non-primitive ident-ref in second arg to parseInt', node.arguments[0], '~>', declaredNameTypes.get(node.arguments[0].name));
              return false;
            }

            // kayy
            return true;
          }
          if (node.callee.name === 'parseFloat') {
            callNodeToSymbol.set(node, 'parseFloat');

            if (!node.arguments[0]) return true;
            if (AST.isPrimitive(node.arguments[0])) return true;
            if (node.arguments[0].type === 'Identifier' && declaredNameTypes.has(node.arguments[0].name)) {
              const t = declaredNameTypes.get(node.arguments[0].name);
              return PRIMITIVE_TYPE_NAMES_PREVAL.has(t);
            }
            // Technically it is possible for this to be an array or whatever. And even that could be supported.
            todo('Support non-primitive ident-ref in first arg to parseFloat', node.arguments[0], '~>', declaredNameTypes.get(node.arguments[0].name));
            return false;
          }
          ASSERT(false, 'should cover all supported func idents', node.callee.name);
        }
        if (SUPPORTED_METHODS.includes(node.callee.name)) {
          if (node.callee.name === symbo('String', 'fromCharCode')) {
            const symbol = node.callee.name;
            callNodeToSymbol.set(node, symbol);

            // This func receives and uses any number of args so we must check them all
            return node.arguments.every(anode => {
              if (AST.isPrimitive(anode)) return true;
              if (anode.type === 'Identifier' && declaredNameTypes.has(anode.name)) {
                const t = declaredNameTypes.get(anode.name);
                return PRIMITIVE_TYPE_NAMES_PREVAL.has(t);
              }
              // Technically it is possible for this to be an array or whatever. And even that could be supported.
              todo('Support non-primitive ident-ref in first arg to parseFloat', anode, '~>', declaredNameTypes.get(anode.name));
              return false;
            });
          }
          ASSERT(false, 'should cover all supported method idents', node.callee.name);
        }

        if (BUILTIN_SYMBOLS.has(node.callee.name)) {
          todo(`Support this ident in isFree CallExpression: ${node.callee.name}`);
        }
        return false;
      }
      else if (node.callee.type === 'MemberExpression') {
        if (node.callee.computed) {
          // `a[b]()` ... if we don't know b then we don't know what's being called
          todo('Computed method call but we dont know whats being called')
          return false;
        }

        if (AST.isPrimitive(node.callee.object)) {
          // This must be a built-in as I'm not sure if we'll support custom methods any time soon
          const symbol = symbo(AST.getPrimitiveType(node.callee.object), node.callee.property.name);
          if (SUPPORTED_METHODS.includes(symbol)) {
            callNodeToSymbol.set(node, symbol);
            return true;
          } else {
            todo('Support this method in isFree:', symbol);
            return false;
          }
        }
        else if (node.callee.object.type === 'Identifier') {
          // The variable must be a constant of sorts because otherwise the method to invoke may
          // change during resolution and each method must be gated explicitly so we can't have that.
          const objName = node.callee.object.name;
          const symbol = symbo(objName, node.callee.property.name);
          vlog('Static method call for symbol?', [symbol]);
          const meta = fdata.globallyUniqueNamingRegistry.get(objName);
          // Is the ident a builtin or part of declaredNameTypes?
          if (meta.isBuiltin) {
            if (SUPPORTED_METHODS.includes(symbol)) {
              // ie: Math.pow or String.fromCharCode
              // This should be a global that we explicitly support. We must allow-list it since each case must be implemented explicitly.
              callNodeToSymbol.set(node, symbol);
              return true;
            } else {
              todo('Support builtin method call to', symbol);
              return false;
            }
          }
          else {
            const qualified = objName + '.' + node.callee.property.name;
            vlog('No, calling:', [qualified]);
            const init = declaredNameTypes.get(objName);
            if (init) {
              // Get the type of the init of the object. That will tell us what method is being invoked.
              ASSERT(meta, 'objname should be known');
              if (!meta.isConstant) {
                todo('Assert whether the binding is written before/inside the loop, if not we can still totally do this');
                return false;
              }
              if (meta.typing.mustBeType) {
                const symbol = symbo(meta.typing.mustBeType, node.callee.property.name);
                vlog('Typed func call to:', [symbol]);
                if (SUPPORTED_METHODS.includes(symbol)) { // These methods must be implemented explicitly
                  callNodeToSymbol.set(node, symbol);
                  return true;
                } else {
                  todo('Not supporting this method just yet:', symbol);
                  return false;
                }
              }
              else {
                todo('Dont have a mustBeType for obj so dont know the method being called:', objName);
                return false;
              }
            } else {
              //todo(`Calling a static method on an ident that is not global and not recorded in free loop: ${qualified}`);
              todo(`Calling a static method on an ident that is not global and not recorded: ${symbol}`);
              return false;
            }
          }
        } else {
          todo('Support this call expression member callee object type:', node.callee.object.type);
          return false;
        }
      } else {
        todo('Support this callee type in isFree CallExpression:', node.callee.type);
        return false;
      }
      break;
    }
    case 'EmptyStatement': {
      // I mean ok. _probably_ want to have this go through phase1 first?
      return true;
    }
    case 'ExpressionStatement': return isFree(node.expression, fdata, callNodeToSymbol, declaredNameTypes, insideWhile);
    case 'FunctionExpression': {
      // For now, don't include func exprs in this logic.
      return false;
    }
    case 'Identifier': {
      // The identifier may not be a closure; it may not be accessed in another func scope from where it was declared
      // (This is the only way we can guarantee source-code-order evaluation is safe)
      // Beyond that, the var must be a known built-in or a declared var (known to be safe) in the current set.
      if (declaredNameTypes.has(node.name)) return true;

      const meta = fdata.globallyUniqueNamingRegistry.get(node.name);
      if (meta.isBuiltin) {
        if (SUPPORTED_GLOBAL_FUNCS.includes(node.name)) return true;
        todo(`Support referencing this builtin in isFree: ${node.name}`);
        return false;
      }
      if (node.name === '$frfr') return true;

      if (BUILTIN_SYMBOLS.has(node.name)) {
        todo(`Support referencing this var in isFree (not a builtin, not already declared): ${node.name}`, meta?.typing?.mustBeType, declaredNameTypes);
      }
      return false; // Maybe there are more valid cases but I don't know what that looks like right now
    }
    case 'IfStatement': {
      return isFree(node.test, fdata, callNodeToSymbol, declaredNameTypes, insideWhile) && isFree(node.consequent, fdata, callNodeToSymbol, declaredNameTypes, insideWhile) && isFree(node.alternate, fdata, callNodeToSymbol, declaredNameTypes, insideWhile);
    }
    case 'MemberExpression': {
      if (AST.isPrimitive(node.object)) {
        if (node.computed && AST.isNumberLiteral(node.property)) return true;
        // Should we be careful here with what we allow? Arbitrary property lookup seems like a recipe for unsafety.
        // Otoh, numbers are fine. In certain cases, regular properties are fine as well.
        const has = declaredNameTypes.get(node.property.name);
        if (node.computed && has) {
          if (has === 'number') {
            return true;
          }
          todo('computed property access of a primitive on a non-number feels tricky;', node.object.name, node.property.name, has);
          return false;
        }
        if (node.computed) {
          todo('computed property of a primitive access on an unknown expr;', node.property.name);
          return false;
        }
        todo('regular property of a primitive;', node.property.name);
        return false;
      }
      if (node.object.type === 'Identifier') {
        if (node.computed) {
          if (AST.isNumberLiteral(node.property)) {
            return true;
          }
          const has = declaredNameTypes.get(node.property.name);
          if (has) {
            if (has === 'number') {
              return true; // Dont really think this can go wrong, even in NaN or Infinity cases...?
            }
            todo('computed property access of an ident on a non-number feels tricky;', node.object.name, node.property.name, has);
            return false;
          }
          todo('computed property access of an ident where the property ident is not recorded;', node.object.name, '[~>', node.property.name, ']', declaredNameTypes);
          return false;
        }

        // Check if it's an array reference. That's the main use case here.
        // The array must be a local var though.
        if (node.property.name === 'length' && declaredNameTypes.get(node.object.name)) {
          const meta = fdata.globallyUniqueNamingRegistry.get(node.object.name);
          if (meta.isConstant && meta.constValueRef.node.type === 'ArrayExpression') {
            // Doing .length on an array ought to be safe?
            return true;
          }
        }

        todo('regular property access of an ident feels tricky;', node.property.name);
        return false;
      }

      todo('if not primitive or ident what might an object be in normalized space?');
      return FAILURE_SYMBOL;
    }
    case 'ObjectExpression': {
      todo('objects in isFree check');
      return false;
    }
    case 'TryStatement': {
      // A try statement can be supported but only if the catch var is not used.
      // The catch var is an unknown variable. And although I think it's safe to support
      // cases where that is used, I'm not 100% that it doesn't risk leaking of any kind.
      const t = isFree(node.block, fdata, callNodeToSymbol, declaredNameTypes, insideWhile);
      if (!t || t === FAILURE_SYMBOL) return t;
      const c = isFree(node.handler.body, fdata, callNodeToSymbol, declaredNameTypes, insideWhile);
      if (!c || c === FAILURE_SYMBOL) return t;

      if (c.handler) {
        // Don't remember if we normalized catch param to always exist. No matter.
        if (c.handler.param?.type !== 'Identifier') {
          todo('Try/catch when param is not an ident, is that even possible in normalized code?');
          return false;
        }
        // Verify usage
        const meta = fdata.globallyUniqueNamingRegistry.get(node.handler.param.name);
        if (meta.writes.length > 1 || meta.reads.length > 0) {
          todo('Catch clause is used');
          return false;
        }
      }
      // I don't see why `try {} catch {}` would be an issue here. It may hide issues tho.
      return true;
    }
    case 'UnaryExpression': return isFree(node.argument, fdata, callNodeToSymbol, declaredNameTypes, insideWhile);
    case 'VarStatement': {
      const id = node.id;
      vlog('- Var decl; Recording free variable (probably):', [id.name]);

      const init = node.init;
      if (init.type === 'FunctionExpression') {
        vlog('  - Ignoring function expression as init. Also not recording var (', id.name,')');
        // Ignore..? But don't record this var as accessible.
        return true;
      }
      if (!isFree(init, fdata, callNodeToSymbol, declaredNameTypes, insideWhile)) {
        vlog('  - The init was not free so not recording the name...');
        return false;
      }
      vlog('  - init isFree...', [id.name], '; determining type');

      let t = '';
      if (AST.isPrimitive(init)) {
        vlog('  - converting primitive init...');
        t = AST.getPrimitiveType(init);
      }
      else {
        switch (init.type) {
          case 'ArrayExpression': {
            // Note: We already called isFree on the init
            t = 'array';
            break;
          }
          case 'BinaryExpression': {
            // Must also validate the lhs/rhs, even if we don't care about their type as much
            const lhs = isFree(init.left, fdata, callNodeToSymbol, declaredNameTypes, insideWhile);
            if (!lhs || lhs === FAILURE_SYMBOL) return lhs;
            const rhs = isFree(init.right, fdata, callNodeToSymbol, declaredNameTypes, insideWhile);
            if (!rhs || rhs === FAILURE_SYMBOL) return rhs;

            if (['>', '<', '==', '===', '!=', '!==', '<=', '>='].includes(init.operator)) {
              t = 'boolean';
            } else if (['%', '-', '/', '*', '^', '|', '&', '<<', '>>', '>>>'].includes(init.operator)) {
              t = 'number';
            } else if (['+'].includes(init.operator)) {
              if (lhs === 'string' || rhs === 'string') {
                // Any op with a string on either side result in a string
                t = 'string';
              }
              else {
                // any non-string primitive with numeric op to another non-string primitive results in a number
                t = 'number';
              }
            } else {
              todo('Support this binary expression operator:', init.operator);
              return false;
            }
            break;
          }
          case 'CallExpression': {
            // This should be the return value of the call expression
            // If the callee is an ident then resolve typing through its meta, otherwise it's a
            // method and we probably have to get a basic type from the object and then resolve
            // the return type of the method that belongs to it.

            if (init.callee.type === 'Identifier') {
              vlog('Call', [init.callee.name]);
              if (init.callee.name === '$frfr') {
                // Special case
                // This actually calls the function that is the first argument
                const targetFreeFunc = init.arguments[0];
                ASSERT(targetFreeFunc?.type === 'Identifier', '$frfr is controlled by us and the first arg should be the name of a $free function', targetFreeFunc);
                const meta = fdata.globallyUniqueNamingRegistry.get(targetFreeFunc.name);
                ASSERT(meta?.typing, 'The $free function should at least be known to return a primitive so typing should be set on it', meta);
                //if (!meta.typing.returns) return false;
                ASSERT(meta.typing.returns, 'Shouldnt the return types of $free functions be set?', targetFreeFunc.name, meta);
                ASSERT(!meta.typing.returns || typeof meta.typing.returns === 'string', '.returns should be a string or false or undefined', meta.typing.returns);
                if (!meta.typing.returns || meta.typing.returns === 'primitive') {
                  todo('$frfr returns a generic, unknown, or nothing at all type...', meta.typing.returns);
                  return false;
                }

                // Should also confirm all the frfr args. They may be primitives but if
                // we can't predict their value it might as well be magic.
                if (init.arguments.some((arg, i) => {
                  if (!i) return false;
                  const r = isFree(arg, fdata, callNodeToSymbol, declaredNameTypes, insideWhile);
                  if (!r || r === FAILURE_SYMBOL) return true;
                  return false;
                })) {
                  todo('- at least one of the frfr args was not isFree, bailing');
                  return false;
                }

                ASSERT(meta.typing.returns, 'frfr must have return type', meta);
                t = meta.typing.returns;
                callNodeToSymbol.set(init, t);
              } else {
                const ct = callNodeToSymbol.get(init);
                if (ct) {
                  t = ct; // eh?
                } else {
                  todo('Support other kind of ident call as init', init, ct);
                  return false;
                }
              }
            } else if (init.callee.type === 'MemberExpression' && init.callee.computed) {
              vlog('Call', [init.object.name], [init.property.type, init.property.name]);
              todo('Support computed method call as init (lolno)', init);
              return false;
            } else if (init.callee.type === 'MemberExpression') {
              vlog('Call', [init.callee.object.name + '.' + init.callee.property.name]);
              if (!isFree(init, fdata, callNodeToSymbol, declaredNameTypes, insideWhile)) {
                todo('Support method call as init', init);
                return false;
              }

              // Now have to determine the return value of that call...
              switch (callNodeToSymbol.get(init)) {
                case symbo('string', 'charAt'): t = 'string'; break;
                case symbo('string', 'charCodeAt'): t = 'number'; break;
                case symbo('String', 'fromCharCode'): t = 'string'; break;
                case symbo('array', 'push'): t = 'number'; break;
                case symbo('array', 'shift'): t = 'primitive'; break; // Returns whatever the array contains, or at least undefined
                default: {
                  todo('Missing method type for init typing', callNodeToSymbol.get(init));
                  return false;
                }
              }
            } else {
              ASSERT(false, 'what is being called here?', init, init.callee);
            }
            break;
          }
          case 'FunctionExpression': {
            // We ignore functions in the preamble. We should not encounter them in the loop.
            return true;
            //t = 'function';
            //break;
          }
          case 'Literal': {
            if (init.raw[0] === '/') {
              t = 'regex';
            } else {
              todo(false, 'support this literal case', init);
              return false;
            }
            break;
          }
          case 'MemberExpression': {
            vlog('- member(', init.object.type, [init.object.name], init.computed ? '[' : '.', init.property.type, [init.property.name], init.computed ? ']' : '', ')');
            const r = isFree(init.object, fdata, callNodeToSymbol, declaredNameTypes, insideWhile);
            if (!r || r === FAILURE_SYMBOL) return r;
            if (node.computed) {
              const t = isFree(init.property, fdata, callNodeToSymbol, declaredNameTypes, insideWhile);
              if (!t || t === FAILURE_SYMBOL) return t;
            }
            t = 'member';

            // Figure out the type being returned. Default to `member`
            const isArray = declaredNameTypes.get(init.object.name) === 'array';
            if (init.object.type === 'Identifier') {
              vlog('- obj is an ident', [init.object.name]);
              if (isArray && init.computed && AST.isNumberLiteral(init.property)) {
                vlog('- obj is an array! and prop is a number! and access is computed!');
                // Walk the array and get the type for each element
                // Note: arrays can always return undefined, so we'll never find a concrete primitive value for it (except perhaps undefined itself)
                // We're mostly checking if the type is "primitive" or not.
                const meta = fdata.globallyUniqueNamingRegistry.get(init.object.name);
                if (meta.isConstant) {
                  vlog('- checking elements of const arr...');
                  ASSERT(meta.constValueRef.node.type === 'ArrayExpression', 'this init should be an array at this point...? or can it be the result of slice or something? in that case this logic needs to check more explicit', meta.constValueRef.node);
                  if (meta.constValueRef.node.elements.every((e,i) => {
                    if (!e) return true; // returns undefined so that's ok
                    else if (AST.isPrimitive(e)) return true;
                    else if (e.type === 'Identifier' && declaredNameTypes.has(e.name)) return PRIMITIVE_TYPE_NAMES_PREVAL.has(declaredNameTypes.get(e.name));
                    // Ok so the element is not elided, not ap primitive node, and not an ident we know to be primitive. Just use member.
                    vlog('- array contains an element with unknown type', e);
                    return false;
                  })) {
                    // Whatever you get back from arr[num], it'll be a primitive
                    vlog('- all array elements represent primitives so thats better than nothing');
                    t = 'primitive';
                  }
                } else  {
                  vlog('- the array is not a constant, cant trust it', meta); // ok we could with some work but.
                }
              }
              else if (isArray && init.computed && init.property.type === 'Identifier') {
                // This is `arr[foo]`. Verify the foo to be a number.
                const pmeta = fdata.globallyUniqueNamingRegistry.get(init.property.name);
                if (pmeta.typing.mustBeType === 'number') {
                  vlog('- this is indexed access on the array. need to verify the arr');
                  const ometa = fdata.globallyUniqueNamingRegistry.get(init.object.name);
                  if (ometa.constValueRef.node.elements.every((e,i) => {
                    if (!e) return true; // returns undefined so that's ok
                    else if (AST.isPrimitive(e)) return true;
                    else if (e.type === 'Identifier' && declaredNameTypes.has(e.name)) return PRIMITIVE_TYPE_NAMES_PREVAL.has(declaredNameTypes.get(e.name));
                    // Ok so the element is not elided, not ap primitive node, and not an ident we know to be primitive. Just use member.
                    vlog('- array contains an element with unknown type', e);
                    return false;
                  })) {
                    t = 'primitive'; // worst case it always returns undefined so we demote to primitive, regardless
                  };
                } else {
                  todo('in this arr[x], x is not known to be a number so we must bail');
                }
              }
              else if (isArray && !init.computed && init.property.type === 'Identifier' && init.property.name === 'length') {
                vlog('- this is array.length');
                t = 'number';
              }
            }

            if (t === 'member' && isArray) {
              vlog('- Was unable to determine the array to return a primitive');
              todo('fix the member expression on array stuff. im going to hate myself for skipping this.');
            }
            break;
          }
          case 'ObjectExpression': {
            // We probably have to collect the shape etc... or just a reference to the init
            t = 'object';
            break;
          }
          case 'Identifier': {
            // We can allow an identifier when we know it's a primitive and it is declared inside the preamble or inside the loop
            // Because then it means that, at least inside a free loop, we can track its value, regardless of concrete primitive.
            // (That's relevant when it comes from arr[x], which may always be `undefined` too)
            const meta = fdata.globallyUniqueNamingRegistry.get(init.name);
            if (!meta.typing?.mustBeType && !meta.typing?.mustBePrimitive) {
              todo('Support an ident without mustBeType set, name=', init.name);
              return false;
            }

            // TODO: I don't think we need to do a write check here:
            //       - either the var is only mutated inside the loop, in which case we know the values assigned, or
            //       - if it is a closure, we know it won't be invoked as that would reject the loop from being isFree, and
            //       - we don't care about post-loop mutations (but .mustBeType and .mustBePrimitive do so that may be a sub-optimal signal)

            // I guess?
            t = meta.typing?.mustBeType || meta.typing?.mustBePrimitive;
            ASSERT(typeof t === 'string', 'should be string so change the above?');
            break;
          }
          default: {
            todo(`Support this node type as init in isFree:`, init.type, init.name);
            return false;
          }
        }
        ASSERT(t, 'type should be known at this point');
      }

      vlog('  - ok! isa:', t, ', recording', id.name);
      declaredNameTypes.set(id.name, t);
      return true;
    }
    case 'WhileStatement': {
      if (insideWhile) {
        // Gotta make sure these loop pid uses a single counter (or shared), otherwise they can explode
        return isFree(node.body, fdata, callNodeToSymbol, declaredNameTypes, insideWhile);
      }

      // Do not skip over previous loops in the same block. It leads to trouble. If they can be eliminated, they will be.
      return false;
    }
    case 'Literal': {
      // A regex is not necessarily free because it is an object that is stateful
      // I think we'll support it in the future but for now it's a no
      // Bigint and I dunno what else, also no.
      return false;
    }
    default: {
      todo(`Support this node type in isFree: ${node.type}`, node);
      return false;
    }
  }

  unreachable();
}

function runStatement(fdata, node, register, callNodeToSymbol, prng, usePrng) {
  vgroup('# ', node.type);
  const r = _runStatement(fdata, node, register, callNodeToSymbol, prng, usePrng)
  vgroupEnd();
  return r;
}
function _runStatement(fdata, node, register, callNodeToSymbol, prng, usePrng) {
  ASSERT(arguments.length === 6, 'arg count to runExpression');
  // We use the AST node of inits of declared vars as value holders as well
  // Eg. if an array literal gets pushed into, we push an AST node into its elements array

  switch (node.type) {
    case 'BlockStatement': {
      for (let i=0; i<node.body.length; ++i) {
        switch (runStatement(fdata, node.body[i], register, callNodeToSymbol, prng, usePrng)) {
          case FAILURE_SYMBOL: return FAILURE_SYMBOL;
          case BREAK_SYMBOL: return BREAK_SYMBOL;
        }
      }
      return true;
    }
    case 'BreakStatement': {
      if (node.label) {
        todo('missing label implementation for break');
        return FAILURE_SYMBOL;
      }
      vlog('- eval: Breaky breaky');
      return BREAK_SYMBOL;
    }
    case 'ExpressionStatement': {
      const v = runExpression(fdata, node.expression, register, callNodeToSymbol, prng, usePrng);
      if (v === FAILURE_SYMBOL) return FAILURE_SYMBOL;
      break;
    }
    case 'EmptyStatement': {
      // I mean ok. _probably_ want to have this go through phase1 first?
      break;
    }
    case 'IfStatement': {
      const v = runExpression(fdata, node.test, register, callNodeToSymbol, prng, usePrng);
      vlog('- if(', v, ')');
      switch (v) {
        case FAILURE_SYMBOL: return FAILURE_SYMBOL;
        case BREAK_SYMBOL: return true;
      }
      if (v) return runStatement(fdata, node.consequent, register, callNodeToSymbol, prng, usePrng);
      else return runStatement(fdata, node.alternate, register, callNodeToSymbol, prng, usePrng);
    }
    case 'TryStatement': {
      // A try statement can be supported but only if the catch var is not used.
      // The catch var is an unknown variable. And although I think it's safe to support
      // cases where that is used, I'm not 100% that it doesn't risk leaking of any kind.

      try {
        return runStatement(fdata, node.block, register, callNodeToSymbol, prng, usePrng);
      } catch {
        return runStatement(fdata, node.handler.body, register, callNodeToSymbol, prng, usePrng);
      }
    }
    case 'VarStatement': {
      // We'll only see let and const and I don't think it matters as we don't need to validate mutability.
      const init = node.init;
      //console.log('var decl for: ' + node.id.name, 'total', Array.from(register.keys()).join(' '))
      if (init.type === 'ArrayExpression') {
        register.set(
          node.id.name,
          init // Use verbatim. The init.elements will be referenced and mutated, most of the time.
        );
      } else if (init.type === 'ObjectExpression') {
        todo('support var decls with objects?');
        return FAILURE_SYMBOL;
      } else {
        const value = runExpression(fdata, node.init, register, callNodeToSymbol, prng, usePrng);
        if (value === FAILURE_SYMBOL) return FAILURE_SYMBOL;
        ASSERT(PRIMITIVE_TYPE_NAMES_TYPEOF.has(value === null ? 'null' : typeof value), 'var decl init runexpr should yield a primitive?', node.init, value);

        register.set(
          node.id.name,
          AST.primitive(value)
        );
      }

      break;
    }
    case 'WhileStatement': {
      let limit = 1_000_000;
      while (true) {
        if (--limit <= 0) {
          // Prevent runaway loops and ignore.
          vlog('- At least one loop tripped the million iteration breaker');
          return FAILURE_SYMBOL;
        }

        switch (runStatement(fdata, node.body, register, callNodeToSymbol, prng, usePrng)) {
          case FAILURE_SYMBOL: return FAILURE_SYMBOL;
          case BREAK_SYMBOL: return true;
        }
      }
      return true;
    }
    default: {
      todo('missing support for statement when running a free loop?', node.type, node);
      return FAILURE_SYMBOL;
    }
  }

  return true;
}

// Note: this returns (primitive) values, not AST nodes
function runExpression(fdata, node, register, callNodeToSymbol, prng, usePrng) {
  ASSERT(arguments.length === 6, 'arg count to runExpression');
  // We use the AST node of inits of declared vars as value holders as well
  // Eg. if an array literal gets pushed into, we push an AST node into its elements array

  switch (node.type) {
    case 'AssignmentExpression': {
      const value = runExpression(fdata, node.right, register, callNodeToSymbol, prng, usePrng);
      if (value === FAILURE_SYMBOL) return FAILURE_SYMBOL;

      ASSERT(PRIMITIVE_TYPE_NAMES_TYPEOF.has(value === null ? 'null' : typeof value), 'I guess assignment should expect primitives back?', node.right, value);

      if (node.left.type === 'Identifier') {
        const init = register.get(node.left.name);
        ASSERT(init, 'should know this binding');
        register.set(node.left.name, AST.primitive(value));
        // In normalized code, the parent of this assignment node should be an expression statement, so the return value should be moot
        return value;
      } else if (node.left.type === 'MemberExpression') {
        if (node.left.object.type !== 'Identifier') {
          todo('Trying to assign to a non-ident property? yikes', node);
          return FAILURE_SYMBOL;
        }
        const obj = register.get(node.left.object.name);
        // So this should be an array or object literal node that we defined in code, before the loop.
        if (obj?.type !== 'ArrayExpression') {
          // objlit is not yet supported. go add it.
          todo('Assigning to prop but it wasnt an array', obj);
          return FAILURE_SYMBOL;
        }
        if (node.left.computed) {
          const prop = runExpression(fdata, node.left.property, register, callNodeToSymbol, prng, usePrng);
          if (typeof prop !== 'number') {
            todo('Assigning non-number to computed property, should investigate this first', [prop]);
            return FAILURE_SYMBOL;
          }
          obj.elements[prop] = AST.primitive(value);
        } else {
          // For arrays, can only support .length here.
          if (node.left.property.name !== 'length') {
            todo('Trying to write to unexpected array property', node.left);
            return FAILURE_SYMBOL;
          }
          obj.elements[node.left.property.name] = AST.primitive(value);
        }
        return value;
      } else {
        ASSERT(false, 'what other things can you assign to than idents and members?', node);
        return FAILURE_SYMBOL;
      }
    }
    case 'BinaryExpression': {
      const lhs = runExpression(fdata, node.left, register, callNodeToSymbol, prng, usePrng);
      if (lhs === FAILURE_SYMBOL) return FAILURE_SYMBOL;
      const rhs = runExpression(fdata, node.right, register, callNodeToSymbol, prng, usePrng);
      if (rhs === FAILURE_SYMBOL) return FAILURE_SYMBOL;

      vlog('- eval binexpr:', lhs, node.operator, rhs);

      switch (node.operator) {
        case '>': return lhs > rhs;
        case '>=': return lhs >= rhs;
        case '<': return lhs < rhs;
        case '<=': return lhs <= rhs;
        case '==': return lhs == rhs;
        case '===': return lhs === rhs;
        case '!=': return lhs != rhs;
        case '!==': return lhs !== rhs;
        case '%': return lhs % rhs;
        case '-': return lhs - rhs;
        case '/': return lhs / rhs;
        case '*': return lhs * rhs;
        case '^': return lhs ^ rhs;
        case '|': return lhs | rhs;
        case '&': return lhs & rhs;
        case '<<': return lhs << rhs;
        case '>>': return lhs >> rhs;
        case '>>>': return lhs >>> rhs;
        case '+': return lhs + rhs;
        default: {
          todo('all ops here should have been checked by isFree so one was forgotten to get implemented', node.operator);
          return FAILURE_SYMBOL;
        }
      }
    }
    case 'CallExpression': {
      if (node.callee.type === 'Identifier' && node.callee.name === '$frfr') {
        // This is guaranteed to return a primitive of sorts.
        // We just have to invoke the pcode.

        ASSERT(node.arguments[0]?.type === 'Identifier', '$frfr is controlled by us and first arg should be the free func ref');
        // The func decl node for this $free func should be stored in the callNodeToSymbol for this argument node ref (see isFree)
        const freeFuncName = node.arguments[0].name;
        const meta = fdata.globallyUniqueNamingRegistry.get(freeFuncName);
        const freeFuncNode = meta.constValueRef.node;
        ASSERT(meta.writes.length === 1 && freeFuncNode && freeFuncNode.id?.name === '$free', 'we created the free func and it should be a constant...', freeFuncNode.id?.name, meta.writes.length);

        let fail = false;
        const args = node.arguments.slice(1).map(arg => {
          if (AST.isPrimitive(arg)) return arg;
          if (arg.type !== 'Identifier') {
            todo('frfr args should be primitives or local vars or we should support whatever is missing', arg);
            fail = true;
            return;
          }
          if (!register.has(arg.name)) {
            todo('frfr ident args should be local vars or we should support whatever is missing', arg);
            fail = true;
            return;
          }
          const val = register.get(arg.name);
          if (!AST.isPrimitive(val)) {
            todo('frfr ident args should be a primitive', arg, val);
            fail = true;
            return;
          }
          return val;
        });
        if (fail) return FAILURE_SYMBOL;

        const outNode = runFreeWithPcode(freeFuncNode, args, fdata, freeFuncName, prng, usePrng);
        if (!AST.isPrimitive(outNode)) {
          todo('The return value of runFreeWithPcode was not a primitive?');
          return FAILURE_SYMBOL;
        }
        return AST.getPrimitiveValue(outNode);
      } else {
        ASSERT(callNodeToSymbol.has(node), 'The callNodeToSymbol should contain all call nodes, isFree should do that (frfr too but that special case is captured in the other branch above)', node);

        const funcName = callNodeToSymbol.get(node);
        // The simple stuff that's not part of builtin symbols
        switch (funcName) {
          case '$coerce': {
            const value = runExpression(fdata, node.arguments[0], register, callNodeToSymbol, prng, usePrng);
            if (value === FAILURE_SYMBOL) return FAILURE_SYMBOL;
            const targetType = AST.getPrimitiveValue(node.arguments[1]) === 'number' ? 'number' : 'string';
            if (targetType === 'plustr') return value + '';
            if (targetType === 'string') return String(value);
            if (targetType === 'number') return value + 0;
            return ASSERT(false, '$coerce should not have anything else');
          }
          case 'isNaN': {
            const value = runExpression(fdata, node.arguments[0], register, callNodeToSymbol, prng, usePrng);
            if (value === FAILURE_SYMBOL) return FAILURE_SYMBOL;
            return isNaN(value);
          }
          case 'isFinite': {
            const value = runExpression(fdata, node.arguments[0], register, callNodeToSymbol, prng, usePrng);
            if (value === FAILURE_SYMBOL) return FAILURE_SYMBOL;
            return isFinite(value);
          }
          case 'parseInt': {
            const value = node.arguments[0] ? runExpression(fdata, node.arguments[0], register, callNodeToSymbol, prng, usePrng) : undefined;
            if (value === FAILURE_SYMBOL) return FAILURE_SYMBOL;
            const base = node.arguments[1] ? runExpression(fdata, node.arguments[1], register, callNodeToSymbol, prng, usePrng) : undefined;
            if (base === FAILURE_SYMBOL) return FAILURE_SYMBOL;
            return parseInt(value, base);
          }
          case 'parseFloat': {
            const value = node.arguments[0] ? runExpression(fdata, node.arguments[0], register, callNodeToSymbol, prng, usePrng) : undefined;
            if (value === FAILURE_SYMBOL) return FAILURE_SYMBOL;
            return parseFloat(value);
          }
        }

        ASSERT(BUILTIN_SYMBOLS.has(funcName), 'I think the builtin symbols should now contain all values of callNodeToSymbol, including parseint and such? $frfr is captured above', node, '=', funcName);
        vlog('calling', funcName);

        // The symbols
        switch (funcName) {
          case symbo('array', 'push'): {
            // The object must be a local var. Find the init.
            ASSERT(node?.callee?.object?.name, 'since its a method call it must have an object and since its an array it must be an ident', node?.callee);
            const init = register.get(node.callee.object.name);
            ASSERT(init, 'calling array.push must mean the object is an array must mean it is a local variable which isFree should guarantee', node.callee.object.name, node);
            // Go through the list of args, resolve them to their current value if not yet, and push a new node for each
            node.arguments.forEach(arg => {
              // Each arg must be simple so either it's a primitive or a variable we can lookup
              // If the variable is a local reference then it must outlive the loop (so it must be defined before the loop)
              // That's because we'll be eliminating the loop afterwards so that reference will disappear.
              // There would be an exception for an object that is created and referenced only once. In that case we can compile a node
              // to instantiate that object rather than the reference. But we'd need to be danged certain about its full state...

              if (AST.isPrimitive(arg)) {
                const argValue = AST.getPrimitiveValue(arg);
                init.elements.push(AST.primitive(argValue));
              } else if (arg.type === 'Identifier') {
                // Resolve it from its init
                const argInit = register.get(arg.name);
                if (AST.isPrimitive(argInit)) {
                  const argValue = AST.getPrimitiveValue(argInit);
                  init.elements.push(AST.primitive(argValue));
                } else {
                  todo('Support pushing a non-primitive into an array');
                  return FAILURE_SYMBOL;
                }
              } else {
                todo('Unexpected arg type in call:', arg);
                return FAILURE_SYMBOL;
              }
            });
            return init.elements.length; // array.push returns the new size of the array
          }
          case symbo('array', 'shift'): {
            // The object must be a local var. Find the init.
            ASSERT(node?.callee?.object?.name, 'since its a method call it must have an object and since its an array it must be an ident', node?.callee);
            const init = register.get(node.callee.object.name);
            ASSERT(init, 'calling array.push must mean the object is an array must mean it is a local variable which isFree should guarantee', node.callee.object.name, node);
            const front = init.elements.shift();
            return runExpression(fdata, front, register, callNodeToSymbol, prng, usePrng);
          }
          case symbo('string', 'charAt'): {
            const value = runExpression(fdata, node.callee.object, register, callNodeToSymbol, prng, usePrng);
            if (typeof value !== 'string') {
              todo('The value was not a string but isFree should have guaranteed it was', node.callee.object);
              return FAILURE_SYMBOL;
            }
            const arg = runExpression(fdata, node.arguments[0], register, callNodeToSymbol, prng, usePrng);
            if (typeof arg !== 'number') {
              todo('The arg was not a number but isFree should have guaranteed it was', node.arguments[0]);
              return FAILURE_SYMBOL;
            }
            const ch = value.charAt(arg);
            return ch;
          }
          case symbo('string', 'charCodeAt'): {
            const value = runExpression(fdata, node.callee.object, register, callNodeToSymbol, prng, usePrng);
            if (typeof value !== 'string') {
              todo('The value was not a string but isFree should have guaranteed it was', node.callee.object);
              return FAILURE_SYMBOL;
            }
            const arg = runExpression(fdata, node.arguments[0], register, callNodeToSymbol, prng, usePrng);
            if (typeof arg !== 'number') {
              todo('The arg was not a number but isFree should have guaranteed it was', node.arguments[0]);
              return FAILURE_SYMBOL;
            }
            const ch = value.charCodeAt(arg);
            return ch;
          }
          case symbo('String', 'fromCharCode'): {
            // You can use any number of args here. Into the thousands. So we must take care here.
            const args = node.arguments.map(a => runExpression(fdata, a, register, callNodeToSymbol, prng, usePrng));
            const str = String.fromCharCode.apply(null, args);
            return str;
          }
          default: {
            if (
              funcName.startsWith('string_') ||
              funcName.startsWith('number_') ||
              funcName.startsWith('boolean_') ||
              funcName.startsWith('regex_') ||
              funcName.startsWith('array_')
            ) console.dir('free_loops may not have bailed if it implemented `' + funcName + '`');
            todo('Missing implementation for allowed function call to:', funcName);
            return FAILURE_SYMBOL;
          }
        }
      }

      break;
    }
    case 'FunctionExpression': {
      // The only reason isFree would allow this is when it's in the preamble, to skip it
      // So it should be safe to skip it. This variable is a noop for our current task.
      return true;
    }
    case 'Identifier': {
      // Resolve value, either a built-in or a local value from register

      // undefined, NaN, Infinity
      if (AST.isPrimitive(node)) return AST.getPrimitiveValue(node);

      const currInit = register.get(node.name);
      vlog('- resolving ident:', node.name, ', with init:', currInit?.type, currInit?.value, currInit?.name);
      if (currInit) {
        //return runExpression(fdata, currInit, register, callNodeToSymbol, prng, usePrng);
        if (AST.isPrimitive(currInit)) {
          return AST.getPrimitiveValue(currInit);
        } else {
          todo('Deal with reading an ident that is not a primitive;', node.name, currInit);
          return FAILURE_SYMBOL;
        }
      } else {
        todo('Support global value for ident', node.name, node);
        return FAILURE_SYMBOL;
      }
    }
    case 'Literal': {
      if (AST.isPrimitive(node)) {
        return AST.getPrimitiveValue(node);
      } else {

        todo('Support non-primitive literal expression resolving', node);
        return FAILURE_SYMBOL;
      }
    }
    case 'MemberExpression': {
      if (node.object.type !== 'Identifier') {
        todo('Support member on non-ident');
        return FAILURE_SYMBOL;
      }

      if (node.computed) {
        const obj = register.get(node.object.name);
        const prop = runExpression(fdata, node.property, register, callNodeToSymbol, prng, usePrng);
        if (obj?.type !== 'ArrayExpression' || typeof prop !== 'number') {
          todo('Not numbered array access, implement me', obj, prop);
          return FAILURE_SYMBOL;
        }
        const v = obj.elements[prop];
        if (v?.type === 'Identifier') vlog('memberexpression[', prop, '] on array is', [v.name]);
        else if (v?.type === 'TemplateLiteral') vlog('memberexpression[', prop, '] on array is string: `' + v.quasis[0].value.raw.slice(0, 10) + '`' + (v.quasis[0].value.raw.length > 10 ? '...' : ''));
        else vlog('memberexpression[', prop, '] on array is', v?.type, v?.value, v?.name)
        if (!v) return undefined;
        else if (AST.isPrimitive(v)) return AST.getPrimitiveValue(v);
        else {
          todo('Array contents was not missing and not a primitive, fixme');
          return FAILURE_SYMBOL;
        }
      } else if (node.property.name === 'length') {
        // Then the context should be an array of sorts, and we can find it in the decl (or register)
        const obj = register.get(node.object.name);
        ASSERT(obj && obj.elements && obj.type === 'ArrayExpression', 'should get the array', node.object.name, obj, node);
        return obj.elements.length;
      } else {
        todo('Support regular prop on ident');
        return FAILURE_SYMBOL;
      }

    }
    case 'TemplateLiteral': {
      return AST.getPrimitiveValue(node);
    }
    default: {
      todo('missing support for expression when running a free loop?', node.type, node);
      return FAILURE_SYMBOL;
    }
  }

  ASSERT(false, 'gotta return early');
}
