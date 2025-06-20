// Find Try statements where the first statement in the body can be safely hoisted outside of the Try. There's multiple cases.
// Some examples
//
//          try { break } catch {}                          // break cant throw
//
//          try { const x = 1 + 2 } catch {}                // binary operations on primitives cant throw
//
//          const arr = []; try { arr.pop(); } catch {}     // pop on a constant that is an array literal, cant throw, assuming builtins

import walk from '../../lib/walk.mjs';
import { ASSERT, log, group, groupEnd, vlog, vgroup, vgroupEnd, fmat, tmat, rule, example, before, source, after, findBodyOffset, riskyRule, useRiskyRules, assertNoDupeNodes, todo, clearStdio, } from '../utils.mjs';
import * as AST from '../ast.mjs';
import { PRIMITIVE_TYPE_NAMES_PREVAL, setVerboseTracing } from '../constants.mjs';
import { BUILTIN_SYMBOLS, symbo } from '../symbols_builtins.mjs';
import { SYMBOL_DOTCALL } from '../symbols_preval.mjs';

export function tryEscaping(fdata) {
  //clearStdio();
  //setVerboseTracing(true);
  group('\n\n\n[tryEscaping] Find Try statements which start with statements that cannot throw and elevate them\n');
  const r = _tryEscaping(fdata);
  groupEnd();
  return r;
}
function _tryEscaping(fdata) {
  const ast = fdata.tenkoOutput.ast;

  let changed = 0;
  let restart = false; // If true then will restart from normal rather than phase1

  walk(_walker, ast);
  function _walker(node, beforeWalk, nodeType, path) {
    // There are a couple of cases we'll target but there are probably many more. Can we catch them all?

    if (!beforeWalk) return false;
    if (changed) return false; // Stop traversing further, require phase1/normal loop first. There's a bug where read blockIndex references get stale and it's breaking. We have to go step-by-step until we manage to work around that.
    if (nodeType !== 'TryStatement') return false;
    if (!node.block.body.length) return false; // empty try will be eliminated anyways (We could do that here but)

    const firstNode = node.block.body[0];
    vgroup('- Have a Try statement, going to check if its first statement can be lifted', firstNode.type, firstNode.expression?.type);
    const liftable = isLiftableStatement(firstNode, firstNode.type, fdata);
    vlog('-- verdict:', liftable);
    vgroupEnd();
    if (liftable === 'no') return false;

    // Move the statement to before the Try
    // Each case should emit the rule() / example() before getting here

    before(node);

    const parentNode = path.nodes[path.nodes.length - 2];
    //const parentProp = path.props[path.props.length - 1];
    const parentIndex = path.indexes[path.indexes.length - 1];

    if (liftable === 'lift' || liftable === 'lift-restart') {
      parentNode.body.splice(parentIndex, 0, node.block.body.shift());
      if (liftable === 'lift-restart') restart = true;
    } else if (liftable === 'ifyes' || liftable === 'ifyes-restart') {
      // try { if (x) { a } else { b } c } catch {} ->
      // if (x) { a } else { try { b; c } catch {} }

      if (
        firstNode.type === 'IfStatement' &&
        node.block.body.length > 1 &&
        !firstNode.consequent.$p.alwaysCompletes?.size // If true, guaranteed to do one of return/throw/break
      ) {
        vlog('If is not only node of Try and consequent does not always-complete so cannot lift it safely');
        return 'no';
      }

      // Remove the If from the Try Block
      node.block.body.shift();
      // Move the alternate body statements to the front of the Try Block
      node.block.body.unshift(...firstNode.alternate.body);
      // Clear the alternate body
      firstNode.alternate.body.length = 0;
      // Swap the Try node in the parent with the If node
      parentNode.body[parentIndex] = firstNode;
      // Move the Try node into the If alternate body
      firstNode.alternate.body.push(node);
      if (liftable === 'ifyes-restart') restart = true;
    } else if (liftable === 'ifno' || liftable === 'ifno-restart') {
      // try { if (x) { a } else { b } c } catch {} ->
      // if (x) { try { a; c } catch {} } else { b }

      if (
        firstNode.type === 'IfStatement' &&
        node.block.body.length > 1 &&
        !firstNode.alternate.$p.alwaysCompletes?.size // If true, guaranteed to do one of return/throw/break
      ) {
        vlog('If is not only node of Try and alternate does not always-complete so cannot lift it safely');
        return 'no';
      }

      // Remove the If from the Try Block
      node.block.body.shift();
      // Move the consequent body statements to the front of the Try Block
      node.block.body.unshift(...firstNode.consequent.body);
      // Clear the consequent body
      firstNode.consequent.body.length = 0;
      // Swap the Try node in the parent with the If node
      parentNode.body[parentIndex] = firstNode;
      // Move the Try node into the If consequent body
      firstNode.consequent.body.push(node);
      if (liftable === 'ifno-restart') restart = true;
    } else {
      ASSERT(false);
    }


    after(parentNode.body[parentIndex]);
    after(node);
    assertNoDupeNodes(parentNode, 'body');
    ++changed;
    return true; // rewalk
  }

  if (changed) {
    if (restart) {
      log('Tries escaped:', changed, '. Restarting from phase0 because we hoisted break/return');
      return {what: 'tryEscaping', changes: changed, next: 'normal'};
    } else {
      log('Tries escaped:', changed, '. Restarting from phase1');
      return {what: 'tryEscaping', changes: changed, next: 'phase1'};
    }
  }

  log('Tries escaped: 0.');
}

/**
 * The ifyes/ifno are special cases when the statement is an If and one of its branches can be lifted
 * The restart case is for lifting break/return cases, which require a DCE sweep
 * @returns {'no' | 'lift' | 'lift-restart' | 'ifyes' | 'ifno' | 'ifyes-restart' | 'ifno-restart'}
 */
function isLiftableStatement(node, nodeType, fdata, fromIf = false) {
  vgroup('- isLiftableStatement(', nodeType, ')');
  const r = _isLiftableStatement(node, nodeType, fdata, fromIf);
  vgroupEnd();
  return r;
}
function _isLiftableStatement(node, nodeType, fdata, fromIf = false) {
  const isVarDecl = node.type === 'VarStatement';

  if (isVarDecl || node.type === 'ExpressionStatement') {
    const isAssign = !isVarDecl && node.expression.type === 'AssignmentExpression';

    // Verify the init or the expression
    let rhs;
    if (node.type === 'VarStatement') {
      rhs = node.init;
    }
    else if (isAssign) {
      // TODO: Verify that the left write is okay to write to

      if (node.expression.left.type !== 'Identifier') return 'no'; // MemberExpression or whatever. bail.

      const meta = fdata.globallyUniqueNamingRegistry.get(node.expression.left.name);
      if (meta.isImplicitGlobal || meta.isBuiltin) return 'no';
      if (!meta.singleScoped) return 'no';

      // Single scoped assigns not be a TDZ at this point so this should be fine.

      rhs = node.expression.right;
    }
    else {
      rhs = node.expression;
    }

    if (!isNotSpyingValueNode(rhs, fdata, isVarDecl, isAssign, fromIf)) return 'no';

    return 'lift';
  }

  if (node.type === 'BreakStatement') {
    if (!fromIf) {
      rule('A Try that starts with a break statement can have that statement lifted');
      example('A: { try { break A; } catch {} }', 'A: { break A; try {} catch {} }');
    }
    return 'lift-restart'; // The hoisted break may uncover DCE cases that we must apply first
  }

  if (node.type === 'ReturnStatement') {
    if (node.argument?.type === 'Identifier' && !useRiskyRules()) {
      // When the return value is an ident that triggers TDZ/implicitGlobal errors then the rule
      // is not sound, so it's risky (because we can't cover all cases proper).
      return 'no';
    }

    if (!cantThrow(node.argument, fdata, true)) return 'no';

    if (!fromIf) {
      riskyRule('A Try that starts with Return with an argument that cannot TDZ can have that statement lifted');
      example('const x = 1; try { return x; } catch {}', 'const x = 1; return x; try { } catch {}');
    }
    return 'lift-restart'; // The hoisted return may uncover DCE cases that we must apply first
  }

  if (node.type === 'LabeledStatement') {
    // We now want to wrap the whole try in the label which is slightly different from the expression cases
    // This doesn't work when the label is not the only statement of the Try, that may be rare? Let's bail on it for now.
    return 'no'; // TODO
  }

  if (node.type === 'IfStatement') {
    // Due to transform complexities the If can only hoist if either both of its branches are safe to hoist,
    // or if at least one of the branches is guaranteed to complete abruptly. The reason is that statements
    // in the same Try that follow the If would otherwise need to be duplicated to preserve original semantics.
    // `try { if (x) a; b } catch {}` -> `if (x) { try { a; b } catch {} } else { b }`
    // But if we know the tail can't be reached through a branch, or simply doesn't exist, then it's all good.

    if (!useRiskyRules()) {
      // When the test is an ident that triggers TDZ/implicitGlobal errors then the rule is not sound, so it's
      // risky (because we can't cover all cases proper). And the test will be an ident in normalized code
      // because the boolean value of primitives would get resolved immediately.
      return 'no';
    }

    if (!cantThrow(node.test, fdata)) {
      return 'no';
    }

    // When the if-test is safe and one branch is empty then we can move the try into the other branch

    let yesRestarts = false;
    const yessable = node.consequent.body.every(node => {
      const lift = isLiftableStatement(node, node.type, fdata, true);
      if (lift === 'lift-restart') yesRestarts = true;
      if (lift === 'lift') return true;
      return lift === 'lift-restart';
    });
    let noRestarts = false;
    const noable = node.alternate.body.every(node => {
      const lift = isLiftableStatement(node, node.type, fdata, true);
      if (lift === 'lift-restart') noRestarts = true;
      if (lift === 'lift') return true;
      return lift === 'lift-restart';
    });

    if (yessable && noable) {
      if (!fromIf) {
        riskyRule('An If where both branches contains liftable statements can be lifted entirely');
        example('try { if (x) { break A; } else { break B; } } catch {}', 'if (x) { break A; } else { break B; } try { } catch {}');
      }
      if (yesRestarts) return 'lift-restart';
      if (noRestarts) return 'lift-restart';
      return 'lift';
    } else if (fromIf) {
      // Skip nested If statement unless both branches are fully safe to lift
      return 'no';
    } else if (yessable) {
      if (!fromIf) {
        riskyRule('An If where the consequent branch contains liftable statements can be lifted partially');
        example('try { if (x) { break; } else { $(); } } catch {}', 'if (x) { break; } else { try { $(); } catch {} }');
      }
      if (yesRestarts) return 'ifyes-restart';
      return 'ifyes';
    } else if (noable) {
      if (!fromIf) {
        riskyRule('An If where the alternate branch contains liftable statements can be lifted partially');
        example('try { if (x) { $(); } else { break; } } catch {}', 'if (x) { try { $(); } catch {} } else { break; }');
      }
      if (noRestarts) return 'ifno-restart';
      return 'ifno';
    } else {
      return 'no';
    }
  }

  if (node.type === 'WhileStatement') {
    // Not sure there's anything meaningful to do here. There are edge cases but.
    return 'no';
  }

  if (node.type === 'TryStatement') {
    // Skip
    // If the _catch_ block of the try is safe then it could be moved to before... is that better?
    return 'no';
  }

  if (node.type === 'ThrowStatement') {
    // By definition, this throws. Not sure if this can reach here because we can fold that case.
    // (A try that throws immediately is basically going to always execute its catch block)
    return 'no';
  }

  vlog('Unsupported stmt, bailing');
  return 'no';
}

function isNotSpyingValueNode(node, fdata, isVarDecl, isAssign, dontPrint) {
  vgroup('- isNotSpyingValueNode(', node.type, ')');
  const r = _isNotSpyingValueNode(node, fdata, isVarDecl, isAssign, dontPrint);
  vgroupEnd();
  return r;
}
function _isNotSpyingValueNode(node, fdata, isVarDecl, isAssign, dontPrint) {
  if (node.type === 'CallExpression') {
    ASSERT(node.callee.type === 'Identifier', 'in normalized code, members should be dotcalls, rest should be normalized out to idents', node);

    const funcName = node.callee.name;
    vlog('- Calling', funcName);

    if (
      [
        symbo('Number', 'parseInt'),
        symbo('Number', 'parseFloat'),
        'isNaN',
        symbo('Number', 'isNaN'),
        'isFinite',
        symbo('Number', 'isFinite'),
        symbo('Number', 'isInteger'),
        symbo('Number', 'isSafeInteger'),
      ].includes(funcName) && // There are more like this, like on Math or url stuff.
      node.arguments.length === 1
    ) {
      // const x = parseInt(y) with an unknown but simple y.
      // It will coerce the arg to a string/number so must confirm it is a primitive.

      const arg = node.arguments[0];
      if (!cantThrow(arg, fdata)) return;

      if (!dontPrint) {
        rule('A Try that starts with statement with non-throwable expression can have that statement lifted; parseInt cannot throw');
        example('try { const x = parseInt(1); } catch {}', 'const x = parseInt(1); try {} catch {}', isVarDecl);
        example('try { x = parseInt(1); } catch {}', 'x = parseInt(1); try {} catch {}', isAssign);
        example('try { parseInt(1); } catch {}', 'parseInt(1); try {} catch {}', !isVarDecl && !isAssign);
      }

      return true;
    }

    // If we can assume built-ins are untouched then certain method calls can't really fail. Ex: arr.pop() on an array literal.
    // TODO: this list is far from complete
    if (funcName === SYMBOL_DOTCALL) {
      const targetFuncNameNode = node.arguments[0];
      vlog('- DotCalling', targetFuncNameNode.name);
      const targetContextNode = node.arguments[1];

      if (targetContextNode.type === 'Identifier') {
        const meta = fdata.globallyUniqueNamingRegistry.get(targetContextNode.name);
        if (meta.typing.mustBeType === 'array') {
          vlog('- on an array...');
          // Most built-in array method calls are safe (assuming built-ins are unchanged) and cannot realistically throw
          // (by realistically I mean, arr.push() only really throws when the array is too big, etc)
          if ([
            symbo('array', 'push'),
            symbo('array', 'pop'),
            symbo('array', 'shift'),
            symbo('array', 'unshift'),
            symbo('array', 'slice'),
          ].includes(targetFuncNameNode.name)) {
            if (!dontPrint) {
              riskyRule('Calling an array method on a value known to be an array literal should be safe, assuming built-ins are sound');
              example('const x = [1,2,3]; try { x.push(); } catch {}', 'const x = [1,2,3]; x.push(); try { } catch {}');
            }
            return true;
          }
        }

        // TODO: Math, primitives, regular expressions, etc. Slight edge case but.
        if (BUILTIN_SYMBOLS.has(targetFuncNameNode.name)) {
          todo(`try escaping may support dotcalling ${targetFuncNameNode.name}`);
        }
      }
    }
    else if (BUILTIN_SYMBOLS.has(funcName)) {
      todo(`try escaping may support calling ${funcName}`);
    }

  }

  //superseded by /home/ptr/proj/preval/src/reduce_static/noop_try.mjs
  if (node.type === 'BinaryExpression') {
    // safe:    === !==
    // unsafe:  in instanceof
    // coerces: ** * / % + - << >> >>> < <= > >= == != & ^ |
    // (Other ops won't appear in normalized code or are not BinaryExpression)
    if (node.op === 'in' || node.op === 'instanceof') return false;
    const anyKind = node.op === '===' || node.op === '!=='; // triple n/eq is unobservable regardless (does not coerce)

    if (!cantThrow(node.left, fdata, anyKind)) return;
    if (!cantThrow(node.right, fdata)) return;

    if (!dontPrint) {
      rule('A Try that starts with statement with non-throwable expression can have that statement lifted; binary expression that cannot throw');
      example('try { const x = a + b; } catch {}', 'const x = a + b; try {} catch {}', isVarDecl);
      example('try { x = a + b; } catch {}', 'x = a + b; try {} catch {}', isAssign);
      example('try { a + b; } catch {}', 'a + b; try {} catch {}', !isVarDecl && !isAssign);
    }

    return true;
  }

  if (node.type === 'UnaryExpression') {
    // safe:    ! typeof
    // unsafe:  delete
    // coerces: + - ~
    // (Other ops won't appear in normalized code or are not UnaryExpression. Note that `delete` _can_ throw.)
    if (node.op === 'delete') return false;
    const anyKind = node.op === '!' || node.op === 'typeof';

    if (!cantThrow(node.argument, fdata, anyKind)) return;

    if (!dontPrint) {
      rule('A Try that starts with statement with non-throwable expression can have that statement lifted; unary expression that cannot throw');
      example('try { const x = !a; } catch {}', 'const x = !a; try {} catch {}', isVarDecl);
      example('try { x = !a; } catch {}', 'x = !a; try {} catch {}', isAssign);
      example('try { !a; } catch {}', '!a; try {} catch {}', !isVarDecl && !isAssign);
    }

    return true;
  }

  if (node.type === 'Identifier') {
    if (!cantThrow(node, fdata, true)) return;

    if (!dontPrint) {
      rule('A Try that starts with statement with non-throwable expression can have that statement lifted; ident that cannot TDZ');
      example('try { const x = a; } catch {}', 'const x = a; try {} catch {}', isVarDecl);
      example('try { x = a; } catch {}', 'x = a; try {} catch {}', isAssign);
      example('try { a; } catch {}', 'a; try {} catch {}', !isVarDecl && !isAssign); // I guess it should just be dropped?
    }

    return true;
  }

  if (
    node.type === 'MemberExpression' &&
    node.object.type === 'Identifier' &&
    node.computed &&
    AST.isNumberLiteral(node.property)
  ) {
    // Something like `x[6]`
    // We want to catch the array case specifically here
    const meta = fdata.globallyUniqueNamingRegistry.get(node.object.name);
    if (meta.typing.mustBeType === 'array') {
      if (!dontPrint) {
        rule('A Try that starts with statement with non-throwable expression can have that statement lifted; numbered property access on a guaranteed array');
        example('try { const x = a[1]; } catch {}', 'const x = a[1]; try {} catch {}', isVarDecl);
        example('try { x = a[1]; } catch {}', 'x = a[1]; try {} catch {}', isAssign);
        example('try { a[1]; } catch {}', 'a[1]; try {} catch {}', !isVarDecl && !isAssign); // I guess it should just be dropped?
      }

      return true;
    }

    // TODO: we can catch access of known properties of obj literals and built-in stuff
  }

  // new, yield, await, param, templateliteral, this,

  vlog('Unsupported expression, bailing');
  todo(`can try-escaping support this expr node type? ${node.type}`);
  return false;
}

function cantThrow(node, fdata, skipPrimitiveCheck) {
  // ok if primitive, builtin, known to be primitive, or we can confirm that the ref can be reached

  if (AST.isPrimitive(node)) {
    return true;
  }

  if (node.type === 'Identifier') {
    const meta = fdata.globallyUniqueNamingRegistry.get(node.name);

    if (meta.isBuiltin) {
      // ok
      return true;
    }

    if (meta.isImplicitGlobal) {
      // raison d'etre.
      return false;
    }

    if (meta.typing?.mustBePrimitive) {
      return true;
    }

    if (skipPrimitiveCheck) {
      return true;
    }

    if (PRIMITIVE_TYPE_NAMES_PREVAL.has(meta.typing.mustBeType) || ['regex', 'function', 'class'].includes(meta.typing.mustBeType)) {
      // ok. I'm not sure about set/map and yeah, func/class/regex are edge cases for sure
      return true;
    }
    if (['promise', 'map', 'set'].includes(meta.typing.mustBeType)) todo('Confirm whether promise,map,set and whatever are safe here');

    // Going to ignore the option of checking step-by-step if this ref can reach the const
    // - implicit globals may trip TDZ error
    // - non-primitive values may spy during coercion and trigger error

    vlog('Expression can not be asserted to be spy-free, bailing');
    return false;
  }

  vlog('Unsupported node type;', node.type, '; bailing');
  return false;
}
