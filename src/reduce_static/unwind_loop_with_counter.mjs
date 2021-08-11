// Find trivial while loops with counter that is the test that we can unwind a bit
// `let x = 100; while (x) $(--x);`
// -> `$(0); $(1); $(2); let x = 3; while (x < 10) $(--x);`

// The pattern can be somewhat generic as long as
// - we can reliably detect the offset and limit
// - proof that the counter only goes one way
// - actual body is one statement (?) and not an if or while or some others (should at most blow up code by one step per transform)
// - probably some other factors... tbd :)

import { ASSERT, log, group, groupEnd, vlog, vgroup, vgroupEnd, rule, example, before, source, after, fmat, tmat } from '../utils.mjs';
import * as AST from '../ast.mjs';
import { createFreshVar } from '../bindings.mjs';

export function unwindWhileWithCounter(fdata, unrollLimit = 10) {
  group('\n\n\nChecking for while loops with counter as test that we can unwind');
  //vlog('\nCurrent state\n--------------\n' + fmat(tmat(fdata.tenkoOutput.ast)) + '\n--------------\n');
  const r = _unwindWhileWithCounter(fdata, unrollLimit);
  groupEnd();
  return r;
}
function _unwindWhileWithCounter(fdata, unrollLimit) {
  let updated = processAttempt(fdata, unrollLimit);

  log('');
  if (updated) {
    log('Loops unrolled:', updated, '. Restarting from phase1 to fix up read/write registry');
    return 'phase1';
  }
  log('Loops unrolled: 0.');
}

function processAttempt(fdata, unrollLimit) {
  let updated = 0;

  // The counter should be initialized to a positive number (although technically we don't care about infinite loops, so any constant will work)
  // The loop should use the counter as the loop-test verbatim
  // The counter should be updated inside the loop in a predictable way
  // The "counter" should be updated inside the loop, once, and with a partial constant binary expression of sorts

  // In short:
  //            `let counter = 100; while (test) { $(); counter = counter - 1; }`
  // - counter  -----^^^^^^^                            ^^^^^^^^^^^^^^^^^^^^^

  new Map(fdata.globallyUniqueNamingRegistry).forEach(function (meta, name) {
    if (meta.isBuiltin) return; // Ignore undefined etc. Builtins never match this pattern
    if (meta.isImplicitGlobal) return;
    if (meta.isConstant) return; // Actually, constants would not match this pattern so skip them too.

    vgroup('- `' + name + '`');
    process(meta, name, unrollLimit);
    vgroupEnd();
  });

  function process(meta, name, unrollLimit) {
    // We are looking for `let counter = 100; while (test) { $(); counter = counter - 1; }`

    // We start by finding the counter by finding an ident used in a while-test

    if (meta.writes.length !== 2) {
      // `let counter = false; while (counter) { ...; counter = counter - 1; }` has two writes to `counter`
      // TODO: in the future we can probably also support other cases here...? Especially outside of the loop or in both branches of an if.
      vlog('- Did not have two writes. Target pattern can not match.');
      return;
    }

    // Verify that there was at least one read that was used in a while-test
    // I think it doesn't really matter if there are more reads

    let loops = 0;
    let testRead;
    meta.reads.some((read) => {
      if (read.parentProp === 'test' && read.parentNode.type === 'WhileStatement') {
        testRead = read;
        ++loops;
        if (loops > 1) return true;
      }
    });
    if (loops === 0) {
      vlog('- Not used as a while test, bailing');
      return;
    }
    if (loops > 1) {
      vlog('- Used as the test of multiple loops, bailing');
      return;
    }
    ASSERT(testRead);

    const writeVar = meta.writes[0];
    const writeUpd = meta.writes[1];
    if (writeVar.kind !== 'var') {
      vlog('- The first write to the counter was not the var decl. Dunno whats up with that but bailing.');
      return;
    }
    if (writeUpd.kind !== 'assign') {
      vlog('- The second write to the counter was not an assignment. Maybe `for` or whatever but we must bail here.');
      return; // Not sure how to get here with a test :)
    }

    // Verify the init and update case. The init should be any kind of primitive value.
    // The assignment must be any binary expression that uses the counter itself and another primitive

    const testInit = writeVar.parentNode.init;
    if (AST.isPrimitive(testInit)) {
      // `let t = 100;`
    } else {
      vlog('The counter init was not a primitive, bailing');
      return;
    }

    let counterOffset = AST.getPrimitiveValue(testInit);
    if (!isFinite(counterOffset)) {
      vlog('- The counter was not initialized to a finite value, bailing (', [counterOffset], ')');
      return;
    }

    const updateExpressionNode = writeUpd.parentNode.right;
    let counterOp;
    let counterStep;
    if (updateExpressionNode.type !== 'BinaryExpression') {
      vlog('- Rhs was not a binary expression, bailing');
      return;
    } else if (
      updateExpressionNode.left.type === 'Identifier' &&
      updateExpressionNode.left.name === name &&
      AST.isPrimitive(updateExpressionNode.right)
    ) {
      // `let t = 10; while ... i = i - 1;`
      counterOp = updateExpressionNode.operator;
      counterStep = +AST.getPrimitiveValue(updateExpressionNode.right);
    } else if (
      updateExpressionNode.right.type === 'Identifier' &&
      updateExpressionNode.right.name === name &&
      AST.isPrimitive(updateExpressionNode.left)
    ) {
      // `let t = 10; while ... i = 1 - i;`
      counterStep = +AST.getPrimitiveValue(updateExpressionNode.left);
      counterOp = updateExpressionNode.operator;
    } else {
      // `let t = true; while ... i = i - x;`
      // We can't really deal with this because we need to know what the counter offset is in order to prevent infinite transform loops.
      // So sadly, we must bail here, until we figure out a way to do stable yolo transforms without risking infini transforms.
      vlog(
        '- The RHS range check failed, the expression was not doing a range check of an ident versus a numeric literal',
        updateExpressionNode.left.type,
        updateExpressionNode.right.type,
      );
      return;
    }

    if (isNaN(counterStep)) {
      vlog('- The counter step was a NaN, bailing');
      return;
    }
    if (!isFinite(counterStep)) {
      vlog('- The counter step was not a finite number, bailing');
      return;
    }
    if (!counterStep) {
      vlog('- The counter step was zero, bailing');
      return;
    }

    ASSERT(isFinite(counterOffset) && isFinite(counterStep) && counterOp, 'wut', counterOffset, counterStep, counterOp);

    // Prevent infinite loops or excessive unrolling
    // Since it's difficult to generically state how many times to unroll, we pick an arbitrary limit
    // of how many iterations to unroll. If the number of iterations is larger than that then only
    // unroll a certain amount at the start, provided the offset is zero.
    // By doing so, we prevent pseudo-infinite loops (a million iterations) while still being able
    // to support some unrolling.

    // We have these values:
    // - counterOffset
    // - counterStep
    // - counterOp
    // - rangeOpB
    // - rangeValueB
    const steps = Math.ceil(counterOffset / Math.abs(counterStep));
    if (steps === 0) {
      vlog('- There are no steps. No need to do anything, this while should fold up.');
      return;
    }
    if (counterOffset !== 0 && steps > unrollLimit) {
      // TODO: we can also include a heuristic for the size of the parent function or something? tricky business.
      vlog('- Total steps exceeds the unrollLimit and offset is not zero, bailing', counterOffset, steps, unrollLimit);
      return;
    }

    // If the total steps exceeds unrollLimit, cap the transform at unrollLimit unrolls
    const transformSteps = Math.min(steps, unrollLimit);

    // We should confirm that the counter updates are the last in the main body of
    // the loop. Also confirm that the loop does not contain a `continue` or `break`.

    // Initially we'll flip this implicitly by confirming that the body is explicitly only
    // expression statements and variable declarations. This way it won't accept a break,
    // continue, if, try, and nested loops.

    const loopNode = testRead.parentNode;
    const loopBody = loopNode.body.body;

    // The higher the max, the more potential code bloat caused by unrolling (!)
    if (loopBody.length < 2 || loopBody.length > 7) {
      vlog(
        '- The while body does not have exactly 3 to 7 statements so it is not a single statement plus counter update plus test update, bailing',
        loopBody.length,
        loopNode.type,
        loopNode.body.type,
      );
      return;
    }
    if (
      loopBody.some((n) => {
        if (n.type === 'ExpressionStatement') {
          // Normalized code should not allow anything here that we would block but maybe IR does?
          const expr = n.expression;
          if (expr.type === 'AssignmentExpression') {
            const rhs = expr.right;
            if (['FunctionExpression', 'ClassExpression', 'ObjectExpression'].includes(rhs.type)) {
              vlog('- The loop body contained a var decl with complex init, bailing');
              return true;
            }
          } else if (['FunctionExpression', 'ClassExpression', 'ObjectExpression'].includes(expr.type)) {
            vlog('- The loop body contained a var decl with complex init, bailing');
            return true;
          }
          ASSERT(!['Param'].includes(expr.type), 'this type of node should not appear here', expr);
          return;
        }
        if (n.type === 'VariableDeclaration') {
          const init = n.declarations[0].init;
          if (['FunctionExpression', 'ClassExpression', 'ObjectExpression'].includes(init.type)) {
            vlog('- The loop body contained a var decl with complex init, bailing');
            return true;
          }
          ASSERT(!['Param'].includes(init.type), 'this type of node should not appear here', init);
          // Ok, the init is hopefully fine... :)
          return;
        }
        vlog('- The loop body had a statement that was neither an expression nor a binding decl, bailing');
        return true;
      })
    ) {
      return;
    }

    vlog('Pattern confirmed ... now deep cloning the `while`');

    // Pattern is now confirmed

    // We basically clone the whole loop and and replace the `while` of the clone with an `if`.
    // Other rules should deduce the actual values of the counter etc and the whole clone should
    // not lead to too much code bloat here since the core can only be a limited number expressions.

    // Collect all var decls being defined (because we need to rename them when cloning
    const freshNames = loopBody.filter((n) => n.type === 'VariableDeclaration').map((n) => n.declarations[0].id.name);

    ASSERT(
      transformSteps > 0 && transformSteps <= unrollLimit,
      'the transform step count should be bound between zero and up-to-and-including unrollLimit',
      steps,
      unrollLimit,
      transformSteps,
      unrollLimit,
    );
    let outer = loopNode;
    // (This is a .reduce)
    for (let i = 0; i < transformSteps; ++i) {
      vlog('  - transform step', i + 1, '/', transformSteps);
      const fail = {};

      // Create the new var names first. We'll need this to do the deep clone and replace their usages. The mapper contains _nodes_
      // which get cloned too when the cloner encounters their usages.
      // Note that this code should be scoped in a loop body so we should not need to worry about further usages.
      const freshMap = new Map(freshNames.map((name) => [name, AST.identifier(createFreshVar('tmpUnwindVarClone', fdata))]));

      const newIfBody = loopBody.map((n) => {
        if (n.type === 'VariableDeclaration') {
          return AST.variableDeclaration(
            freshMap.get(n.declarations[0].id.name), // This is an actual ident node (!) but that's fine since it should not be used anywhere else
            AST.deepCloneForFuncInlining(n.declarations[0].init, freshMap, fail),
          );
        }
        return AST.deepCloneForFuncInlining(n, freshMap, fail);
      });
      if (fail.ed) {
        // Dunno what might cause this but whatever...
        vlog('- There was a problem while cloning the `while` node, bailing');
        return;
      }

      outer = AST.ifStatement(AST.identifier(name), AST.blockStatement(...newIfBody, outer), AST.blockStatement());
    }

    vlog('Cloned. Applying transform.');

    rule('A counted iterator while loop that tests on the counter can be unrolled a bit');
    example(
      'let counter = 10; while (counter) { f(); counter = counter - 1; }',
      'let counter = 10; if (counter) { f(); counter = counter + 1; } while (counter) { f(); counter = counter + 1; }',
    );
    before(writeVar.blockBody[writeVar.blockIndex]);
    before(loopNode);

    const loopParentNode = testRead.grandNode;
    const loopParentProp = testRead.grandProp;
    const loopParentIndex = testRead.grandIndex;
    //vlog(loopParentNode, loopParentProp, loopParentIndex)
    ASSERT(loopParentNode && loopParentProp && loopParentIndex !== undefined);
    ASSERT((loopParentIndex < 0 ? loopParentNode[loopParentProp] : loopParentNode[loopParentProp][loopParentIndex]) === loopNode);

    if (loopParentIndex < 0) loopParentNode[loopParentProp] = outer;
    else loopParentNode[loopParentProp][loopParentIndex] = outer;

    after(outer);
    ++updated;
  }

  return updated;
}
