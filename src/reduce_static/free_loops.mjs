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
import { pcanCompile, pcompile, pcodeSupportedBuiltinFuncs, runPcode, SO_MESSAGE, runFreeWithPcode } from '../pcode.mjs';
import { SYMBOL_COERCE, SYMBOL_FRFR } from '../symbols_preval.mjs';

const FAILURE_SYMBOL = {};
const BREAK_SYMBOL = {};

const SUPPORTED_GLOBAL_FUNCS = ['$frfr'];
const SUPPORTED_METHODS = ['array.push', 'string.charAt'];

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

    const callTypes = new Map; // CallExpression node (obj instance) to qualified string name of func or method to be called
    const declaredNameTypes = new Map; // Binding name to mustBeType value

    vlog('Checking isFree on `while` loop @', blockBody[whileIndex].$p.pid, '...');
    let fromIndex = whileIndex;
    while (fromIndex > 0) {
      fromIndex = fromIndex - 1;
      const r = isFree(blockBody[fromIndex], fdata, callTypes, declaredNameTypes, false);
      if (!r || r === FAILURE_SYMBOL) {
        vlog('Statement at index', fromIndex, 'is NOT free, ends the scan of pre-while-statements (', blockBody[fromIndex].type, blockBody[fromIndex].declarations?.[0].init.type, ')');
        fromIndex += 1; // Compensate.
        break;
      } else {
        vlog('Statement at index', fromIndex, 'is also free (', blockBody[fromIndex].type, blockBody[fromIndex].declarations?.[0].init.type, ')');
      }
    }

    vlog('Now calling isFree() on the `while` node...');
    for (let i=0; i<node.body.body.length; ++i) {
      const r = isFree(node.body.body[i], fdata, callTypes, declaredNameTypes, true)
      if (!r || r === FAILURE_SYMBOL) return vlog('-- bail: While loop is not free\n\n');
    }

    // While loop must be free. Let's try to resolve it.
    vlog('\nOk. Resolving `while` loop @', blockBody[whileIndex].$p.pid, 'at block index', whileIndex,', starting from statement index', fromIndex,'\n');

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

    let failed = false;
    for (let i=fromIndex; i<=whileIndex; ++i) {
      const node = blockBody[i];
      if (runStatement(fdata, node, register, callTypes, prng, usePrng) === FAILURE_SYMBOL) {
        failed = true;
        break;
      }
    }

    vlog('Storing final values of pre-loop variables');
    for (let i=fromIndex; i<whileIndex; ++i) {
      if (blockBody[i].type === 'VariableDeclaration') {
        blockBody[i].declarations[0].init = register.get(blockBody[i].declarations[0].id.name);
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
function isFree(node, fdata, callTypes, declaredNameTypes, insideWhile = true) {
  ASSERT(node, 'should receive a node at least');
  ASSERT((arguments.length === 4 && typeof declaredNameTypes !== 'boolean') || arguments.length === 5, 'arg count to isFree');

  if (AST.isPrimitive(node)) return true;

  switch (node.type) {
    case 'ArrayExpression': {
      // We can support some cases of spread but initially it won't
      return node.elements.every(e => !e || (e.type !== 'SpreadElement' && isFree(e, fdata, callTypes, declaredNameTypes)));
    }
    case 'AssignmentExpression': {
      if (node.left.type === 'Identifier') {
        return isFree(node.left, fdata, callTypes, declaredNameTypes) && isFree(node.right, fdata, callTypes, declaredNameTypes);
      } else if (node.left.type === 'MemberExpression') {
        if (node.left.computed) {
          // `arr[x] = y`
          return isFree(node.left.object, fdata, callTypes, declaredNameTypes) &&  isFree(node.left.property, fdata, callTypes, declaredNameTypes) && isFree(node.right, fdata, callTypes, declaredNameTypes);
        } else {
          // `arr.x = y`
          return isFree(node.left.object, fdata, callTypes, declaredNameTypes) && isFree(node.right, fdata, callTypes, declaredNameTypes);
        }
      } else {
        todo('what else can we assign to?', node.left);
        return false;
      }
    }
    case 'BinaryExpression': return isFree(node.left, fdata, callTypes, declaredNameTypes) && isFree(node.right, fdata, callTypes, declaredNameTypes);
    case 'BlockStatement': {
      for (let i=0; i<node.body.length; ++i) {
        if (!isFree(node.body[i], fdata, callTypes, declaredNameTypes)) return false;
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
      if (node.callee.type === 'Identifier') {
        callTypes.set(node, '$coerce');
        if (node.callee.name === SYMBOL_FRFR) {
          // Special case: $frfr. We control this.
          // The return type should be the return type of the func that is the first arg to this call.
          ASSERT(node.arguments[0]?.type === 'Identifier');
          const meta = fdata.globallyUniqueNamingRegistry.get(node.arguments[0].name);
          const t = meta.typing.returns; // this is a Set. Or a string? dang I don't know.
          if (!t || (typeof t === 'string' ? t === 'primitive' : (t.size !== 1 || t.has('?') || t.has('primitive')))) {
            todo('Support $frfr that has multiple/no/generic returns type;', t);
            return FAILURE_SYMBOL;
          }
          callTypes.set(node.call, t);
          return true;
        }
        if (node.callee.name === SYMBOL_COERCE) {
          // Special case: $coerce
          // We control this so we should have a string as second arg and unknown as first arg
          if (AST.isPrimitive(node.arguments[0])) return true;
          if (node.arguments[0].type === 'Identifier' && declaredNameTypes.has(node.arguments[0].name)) {
            const t = declaredNameTypes.get(node.arguments[0].name);
            return ['undefined', 'null', 'boolean', 'number', 'string'].includes(t);
          }
          // Technically it is possible for this to be an array or whatever. And even that could be supported.
          todo('Support non-primitive in first arg to $coerce', node.arguments[0]);
          return false;
        }
        if (node.callee.name === 'isNaN') {
          callTypes.set(node, 'isNaN');
          return true;
        }
        if (node.callee.name === 'isFinite') {
          callTypes.set(node, 'isFinite');
          return true;
        }
        todo('Support this ident in isFree CallExpression:', node.callee.name);
        return false;
      } else if (node.callee.type === 'MemberExpression') {
        if (node.callee.computed) return false; // `a[b]()` ... if we don't know b then we don't know what's being called

        if (AST.isPrimitive(node.callee.object)) {
          // This must be a built-in as I'm not sure if we'll support custom methods any time soon
          const method = AST.getPrimitiveType(node.callee.object) + '.' + node.callee.property.name;
          if (SUPPORTED_METHODS.includes(method)) {
            callTypes.set(node, method);
            return true;
          } else {
            todo('Support this method in isFree:', method);
            return false;
          }
        } else if (node.callee.object.type === 'Identifier') {
          // The variable must be a constant of sorts because otherwise the method to invoke may
          // change during resolution and each method must be gated explicitly so we can't have that.
          const objName = node.callee.object.name;
          const meta = fdata.globallyUniqueNamingRegistry.get(objName);
          // Is the ident a builtin or part of declaredNameTypes?
          if (meta.isBuiltIn) {
            const staticMethod = objName + '.' + node.callee.property.name;
            if (SUPPORTED_METHODS.includes(staticMethod)) {
              // ie: Math.pow or String.fromCharCode
              // This should be a global that we explicitly support. We must allow-list it since each case must be implemented explicitly.
              callTypes.set(node, staticMethod);
              return true;
            } else {
              todo('Support builtin method call to', staticMethod);
              return false;
            }
          } else {
            const init = declaredNameTypes.get(objName);
            if (init) {
              // Get the type of the init of the object. That will tell us what method is being invoked.
              ASSERT(meta, 'objname should be known');
              if (!meta.isConstant) {
                todo('Assert whether the binding is written before/inside the loop, if not we can still totally do this');
                return false;
              }
              if (meta.typing.mustBeType) {
                const method = meta.typing.mustBeType + '.' + node.callee.property.name;
                if (SUPPORTED_METHODS.includes(method)) { // These methods must be implemented explicitly
                  callTypes.set(node, method);
                  return true;
                } else {
                  todo('Not supporting this method just yet:', method);
                  return false;
                }
              } else {
                todo('Dont have a mustBeType for obj so dont know the method being called:', objName);
                return false;
              }
            } else {
              todo('Calling a function that is not global and not recorded:', objName);
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
    case 'ExpressionStatement': return isFree(node.expression, fdata, callTypes, declaredNameTypes);
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
        todo('Support referencing this builtin in isFree:', node.name);
        return false;
      }

      todo('Support referencing this var in isFree:', node.name);
      return false; // Maybe there are more valid cases but I don't know what that looks like right now
    }
    case 'IfStatement': {
      return isFree(node.test, fdata, callTypes, declaredNameTypes) && isFree(node.consequent, fdata, callTypes, declaredNameTypes) && isFree(node.alternate, fdata, callTypes, declaredNameTypes);
    }
    case 'MemberExpression': {
      if (AST.isPrimitive(node.object)) {
        if (node.computed && AST.isNumberLiteral(node.property)) return true;
        // Should we be careful here with what we allow? Arbitrary property lookup seems like a recipe for unsafety.
        // Otoh, numbers are fine. In certain cases, regular properties are fine as well.
        if (node.computed && declaredNameTypes.has(node.property.name)) {
          if (declaredNameTypes.get(node.property.name) === 'number') {
            return true;
          }
          todo('computed property access of a primitive on a non-number feels tricky;', node.property.name);
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
        if (node.computed && declaredNameTypes.has(node.property.name)) {
          if (declaredNameTypes.get(node.property.name) === 'number') {
            return true; // Dont relaly think this can go wrong, even in NaN or Infinity cases...?
          }
          todo('computed property access of an ident on a non-number feels tricky;', node.property.name, declaredNameTypes.get(node.property.name));
          return false;
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
    case 'UnaryExpression': return isFree(node.argument, fdata, callTypes, declaredNameTypes);
    case 'VariableDeclaration': {
      log('- Recording free variable:', node.declarations[0].id.name);

      const init = node.declarations[0].init;
      if (!isFree(init, fdata, callTypes, declaredNameTypes)) {
        todo('  - var decl the init', init.type, 'is not free :(');
        return false;
      }

      let t = '';
      if (AST.isPrimitive(init)) {
        t = AST.getPrimitiveType(init);
      } else {
        switch (init.type) {
          case 'ArrayExpression': {
            t = 'array';
            break;
          }
          case 'BinaryExpression': {
            if (['>', '<', '==', '===', '!=', '!==', '<=', '>='].includes(init.operator)) {
              t = 'boolean';
            } else if (['%', '-', '/', '*', '^', '|', '&'].includes(init.operator)) {
              t = 'number';
            } else if (['+'].includes(init.operator)) {
              const lhs =
                AST.isPrimitive(init.left)
                ? (AST.isNumberLiteral(init.left) ? 'number' : 'string')
                : (init.left.type === 'Identifier' && declaredNameTypes.has(init.left.name))
                ? declaredNameTypes.get(init.left.name)
                : null;

              const rhs =
                AST.isPrimitive(init.left)
                ? (AST.isNumberLiteral(init.left) ? 'number' : 'string')
                : (init.left.type === 'Identifier' && declaredNameTypes.has(init.left.name))
                ? declaredNameTypes.get(init.left.name)
                : null;

              if (lhs === 'string' || rhs === 'string') {
                t = 'string';
              }
              else if (lhs === 'number' && rhs === 'number') {
                t = 'number';
              }
              else {
                todo('Tricky case of addition predicting depends on type of operands and we dont know? well probably we do but...', init.left.name, lhs, init.right.name, rhs);
                return false;
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
              if (init.callee.name === '$frfr') {
                // Special case
                // This actually calls the function that is the first argument
                const targetFreeFunc = init.arguments[0];
                ASSERT(targetFreeFunc?.type === 'Identifier', '$frfr is controlled by us and the first arg should be the name of a $free function', targetFreeFunc);
                const meta = fdata.globallyUniqueNamingRegistry.get(targetFreeFunc.name);
                ASSERT(meta?.typing, 'The $free function should at least be known to return a primitive so typing should be set on it', meta);
                ASSERT(meta.typing.returns, 'Should $free functions return a known primitive?', meta.returns);
                ASSERT(typeof meta.typing.returns === 'object', '.returns shouldnt be a string here i think', meta.typing.returns);
                if (meta.typing.returns.size !== 1 || meta.typing.returns.has('?') || meta.typing.returns.has('primitive')) {
                  todo('$frfr returns a generic, unknown, or nothing at all type...', meta.typing.returns);
                  return false;
                }
                t = Array.from(meta.typing.returns)[0];
                callTypes.set(init, t);
              } else {
                todo('Support other kind of ident call as init', init);
                return false;
              }
            } else if (init.callee.computed) {
              todo('Support computed method call as init (lolno)', init);
              return false;
            } else {
              if (!isFree(init, fdata, callTypes, declaredNameTypes)) {
                todo('Support method call as init', init);
                return false;
              }

              // Now have to determine the return value of that call...
              switch (callTypes.get(init)) {
                case 'string.charAt': t = 'string'; break;
                case 'array.push': t = 'number'; break;
                default: {
                  todo('Missing method type for init typing', callTypes.get(init));
                  return false;
                }
              }
            }
            break;
          }
          case 'FunctionExpression': {
            // If this function is free then we can probably move it to global...?
            t = 'function';
            break;
          }
          case 'Literal': {
            if (init.raw[0] === '/') t = 'regex';
            else ASSERT(false, 'support this literal case', init);
            break;
          }
          case 'MemberExpression': {
            t = 'member';
            todo('fix the member expression on array stuff. im going to hate myself for skipping this.');
            break;
          }
          case 'ObjectExpression': {
            // We probably have to collect the shape etc... or just a reference to the init
            t = 'object';
            break;
          }
          default: {
            todo(`Support this node type as init in isFree:`, init.type);
            return false;
          }
        }
        ASSERT(t, 'type should be known at this point');
      }

      log('  - isa:', t);
      declaredNameTypes.set(node.declarations[0].id.name, t);
      return true;
    }
    default: {
      todo(`Support this node type in isFree:`, node.type, node);
      return false;
    }
  }

  unreachable();
}

function runStatement(fdata, node, register, callTypes, prng, usePrng) {
  ASSERT(arguments.length === 6, 'arg count to runExpression');
  // We use the AST node of inits of declared vars as value holders as well
  // Eg. if an array literal gets pushed into, we push an AST node into its elements array

  switch (node.type) {
    case 'BlockStatement': {
      for (let i=0; i<node.body.length; ++i) {
        switch (runStatement(fdata, node.body[i], register, callTypes, prng, usePrng)) {
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
      const v = runExpression(fdata, node.expression, register, callTypes, prng, usePrng);
      if (v === FAILURE_SYMBOL) return FAILURE_SYMBOL;
      break;
    }
    case 'IfStatement': {
      const v = runExpression(fdata, node.test, register, callTypes, prng, usePrng);
      vlog('- if(', v, ')');
      switch (v) {
        case FAILURE_SYMBOL: return FAILURE_SYMBOL;
        case BREAK_SYMBOL: return true;
      }
      if (v) return runStatement(fdata, node.consequent, register, callTypes, prng, usePrng);
      else return runStatement(fdata, node.alternate, register, callTypes, prng, usePrng);
    }
    case 'VariableDeclaration': {
      // We'll only see let and const and I don't think it matters as we don't need to validate mutability.
      const init = node.declarations[0].init;
      if (init.type === 'ArrayExpression') {
        register.set(
          node.declarations[0].id.name,
          init // Use verbatim. The init.elements will be referenced and mutated, most of the time.
        );
      } else if (init.type === 'ObjectExpression') {
        todo('support var decls with objects?');
        return FAILURE_SYMBOL;
      } else {
        const value = runExpression(fdata, node.declarations[0].init, register, callTypes, prng, usePrng);
        if (value === FAILURE_SYMBOL) return FAILURE_SYMBOL;
        ASSERT(['undefined', 'null', 'boolean', 'number', 'string'].includes(value === null ? 'null' : typeof value), 'var decl init runexpr should yield a primitive?', node.declarations[0].init, value);

        register.set(
          node.declarations[0].id.name,
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

        switch (runStatement(fdata, node.body, register, callTypes, prng, usePrng)) {
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
function runExpression(fdata, node, register, callTypes, prng, usePrng) {
  ASSERT(arguments.length === 6, 'arg count to runExpression');
  // We use the AST node of inits of declared vars as value holders as well
  // Eg. if an array literal gets pushed into, we push an AST node into its elements array

  switch (node.type) {
    case 'AssignmentExpression': {
      const value = runExpression(fdata, node.right, register, callTypes, prng, usePrng);
      if (value === FAILURE_SYMBOL) return FAILURE_SYMBOL;

      ASSERT(['undefined', 'null', 'boolean', 'number', 'string'].includes(value === null ? 'null' : typeof value), 'I guess assignment should expect primitives back?', node.right, value);

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
          const prop = runExpression(fdata, node.left.property, register, callTypes, prng, usePrng);
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
      const lhs = runExpression(fdata, node.left, register, callTypes, prng, usePrng);
      if (lhs === FAILURE_SYMBOL) return FAILURE_SYMBOL;
      const rhs = runExpression(fdata, node.right, register, callTypes, prng, usePrng);
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
        // The func decl node for this $free func should be stored in the callTypes for this argument node ref (see isFree)
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
        ASSERT(callTypes.has(node), 'The callTypes should contain all call nodes, isFree should do that (frfr too)', node);

        const funcName = callTypes.get(node);
        switch (funcName) {
          case 'array.push': {
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
          case 'string.charAt': {
            const value = runExpression(fdata, node.callee.object, register, callTypes, prng, usePrng);
            if (typeof value !== 'string') {
              todo('The value was not a string but isFree should have guaranteed it was', node.callee.object);
              return FAILURE_SYMBOL;
            }
            const arg = runExpression(fdata, node.arguments[0], register, callTypes, prng, usePrng);
            if (typeof arg !== 'number') {
              todo('The arg was not a number but isFree should have guaranteed it was', node.arguments[0]);
              return FAILURE_SYMBOL;
            }
            const ch = value.charAt(arg);
            return ch;
          }
          case '$coerce': {
            const value = runExpression(fdata, node.arguments[0], register, callTypes, prng, usePrng);
            if (value === FAILURE_SYMBOL) return FAILURE_SYMBOL;
            const targetType = AST.getPrimitiveValue(node.arguments[1]) === 'number' ? 'number' : 'string';
            if (targetType === 'plustr') return value + '';
            if (targetType === 'string') return String(value);
            if (targetType === 'number') return value + 0;
            return ASSERT(false, '$coerce should not have anything else');
          }
          case 'isNaN': {
            const value = runExpression(fdata, node.arguments[0], register, callTypes, prng, usePrng);
            if (value === FAILURE_SYMBOL) return FAILURE_SYMBOL;
            return isNaN(value);
          }
          case 'isFinite': {
            const value = runExpression(fdata, node.arguments[0], register, callTypes, prng, usePrng);
            if (value === FAILURE_SYMBOL) return FAILURE_SYMBOL;
            return isFinite(value);
          }
          default: {
            todo('Missing implementation for allowed function call to:', funcName);
            return FAILURE_SYMBOL;
          }
        }
      }

      break;
    }
    case 'Identifier': {
      // Resolve value, either a built-in or a local value from register

      const currInit = register.get(node.name);
      vlog('- eval ident', node.name, ':', currInit);
      if (currInit) {
        //return runExpression(fdata, currInit, register, callTypes, prng, usePrng);
        if (AST.isPrimitive(currInit)) {
          return AST.getPrimitiveValue(currInit);
        } else {
          todo('Deal with reading an ident that is not a primitive;', node.name, currInit);
          return FAILURE_SYMBOL;
        }
      } else {
        todo('Support global value for ident', node.name);
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
        const prop = runExpression(fdata, node.property, register, callTypes, prng, usePrng);
        if (obj?.type !== 'ArrayExpression' || typeof prop !== 'number') {
          todo('Not numbered array access, implement me', obj, prop);
          return FAILURE_SYMBOL;
        }
        const v = obj.elements[prop];
        vlog('memberexpression, number', prop, 'on array is', v)
        if (!v) return undefined;
        else if (AST.isPrimitive(v)) return AST.getPrimitiveValue(v);
        else {
          todo('Array contents was not missing and not a primitive, fixme');
          return FAILURE_SYMBOL;
        }
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
