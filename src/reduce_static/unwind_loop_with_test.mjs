// Find trivial while loops with counter and separate test that we can unwind a bit
// `let x = 0; while (x < 10) $(--x);`
// -> `$(0); $(1); $(2); let x = 3; while (x < 10) $(--x);`

// The pattern can be somewhat generic as long as
// - we can reliably detect the offset and limit
// - proof that the counter only goes one way
// - actual body is one statement (?) and not an if or while or some others (should at most blow up code by one step per transform)
// - probably some other factors... tbd :)

import { ASSERT, log, group, groupEnd, vlog, vgroup, vgroupEnd, rule, example, before, source, after, fmat, tmat } from '../utils.mjs';
import * as AST from '../ast.mjs';
import { createFreshVar } from '../bindings.mjs';

export function unwindWhileWithTest(fdata, unrollLimit = 10) {
  group('\n\n\nChecking for while loops with counter and test that we can unwind');
  //vlog('\nCurrent state\n--------------\n' + fmat(tmat(fdata.tenkoOutput.ast)) + '\n--------------\n');
  const r = _unwindWhileWithTest(fdata, unrollLimit);
  groupEnd();
  return r;
}
function _unwindWhileWithTest(fdata, unrollLimit) {
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

  // The test should be initialized to some kind of truthy value or the "range check"
  // The test should be updated by the same "range check" inside the loop
  // The "range check" should be a constant on one side and a "counter" on the other side
  // The "counter" should be initialized with a constant value
  // The "counter" should be updated inside the loop, once, and with a partial constant binary expression of sorts

  // In short:
  //            `let counter = 0; let test = true; while (test) { $(); counter = counter + 1; test = counter < 10; }`
  // - the test ----------------------^^^^                ^^^^                                ^^^^^^^^^^^^^^^^^^^
  // - counter  ----^^^^^^^                                           ^^^^^^^^^^^^^^^^^^^^^

  new Map(fdata.globallyUniqueNamingRegistry).forEach(function (meta, name) {
    if (meta.isBuiltin) return; // Ignore undefined etc. Builtins never match this pattern
    if (meta.isImplicitGlobal) return;
    if (meta.isConstant) return; // Actually, constants would not match this pattern so skip them too.

    vgroup('- `' + name + '`');
    process(meta, name);
    vgroupEnd();
  });

  function process(testMeta, testName) {
    // We are looking for `let counter = 0; let test = true; while (test) { $(); counter = counter + 1; test = counter < 10; }`

    // We start by verifying `test`:

    if (testMeta.writes.length !== 2) {
      // `let test = false; while (test) { ...; test = x < y; }` has two writes to `test`
      // TODO: in the future we can probably also support other cases here...?
      vlog('- Did not have two writes. Target pattern can not match.');
      return;
    }

    // Verify that there was at least one read that was used in a while-test
    // I think it doesn't really matter if there are more reads

    let loops = 0;
    let testRead;
    testMeta.reads.some((read) => {
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

    const testWriteVar = testMeta.writes[0];
    const testWriteUpd = testMeta.writes[1];
    if (testWriteVar.kind !== 'var') {
      vlog('- The first write to the test was not the var decl. Dunno whats up with that but bailing.');
      return;
    }
    if (testWriteUpd.kind !== 'assign') {
      vlog('- The second write to the test was not an assignment. Maybe `for` or whatever but we must bail here.');
      return; // Not sure how to get here with a test :)
    }

    // Verify the init and update case. The init may be a boolean predictable value, or a range check.
    // The assignment must be a range check. If the init had one it must be exactly the same range check.

    let counterNameA;
    let rangeOpA;
    let rangeValueA;

    const testInit = testWriteVar.parentNode.init;
    if (AST.isPrimitive(testInit)) {
      // `let t = true;`
    } else if (testInit.type !== 'BinaryExpression') {
      vlog('- Init was not a binary expression, bailing');
      return;
    } else if (!['<', '<=', '>', '>='].includes(testInit.operator)) {
      // TODO: do we want to include `===` (etc) here too? I don't think it matters?
      vlog('- Init operator was not a range check, bailing');
      return;
    } else if (testInit.left.type === 'Identifier' && AST.isPrimitive(testInit.right)) {
      // `let t = i < 10;`
      counterNameA = testInit.left.name;
      rangeOpA = testInit.operator;
      rangeValueA = +AST.getPrimitiveValue(testInit.right);
    } else if (testInit.right.type === 'Identifier' && AST.isPrimitive(testInit.left)) {
      // `let t = 10 > i;`
      rangeValueA = +AST.getPrimitiveValue(testInit.left);
      rangeOpA = testInit.operator;
      counterNameA = testInit.right.name;
    } else {
      // `let t = i < max; while ... t = i < max;`
      vlog(
        '- The init range check failed, the expression was not doing a range check of an ident versus a numeric literal',
        testInit.left.type,
        testInit.right.type,
      );
      return;
    }

    let counterNameB;
    let rangeOpB;
    let rangeValueB;

    const testRhs = testWriteUpd.parentNode.right;
    if (testRhs.type !== 'BinaryExpression') {
      vlog('- Rhs was not a binary expression, bailing');
      return;
    } else if (!['<', '<=', '>', '>='].includes(testRhs.operator)) {
      // TODO: do we want to include `===` (etc) here too? I don't think it matters?
      vlog('- Rhs operator was not a range check, bailing');
      return;
    } else if (testRhs.left.type === 'Identifier' && AST.isPrimitive(testRhs.right)) {
      // `let t = true; while ... t = i < 10;`
      // `let t = i < 10; while ... t = i < 10;`
      counterNameB = testRhs.left.name;
      rangeOpB = testRhs.operator;
      rangeValueB = +AST.getPrimitiveValue(testRhs.right);
    } else if (testRhs.right.type === 'Identifier' && AST.isPrimitive(testRhs.left)) {
      // `let t = true; while ... t = 10 < i;`
      // `let t = 10 < i; while ... t = 10 < i;`
      rangeValueB = +AST.getPrimitiveValue(testRhs.left);
      rangeOpB = testRhs.operator;
      counterNameB = testRhs.right.name;
    } else {
      // `let t = true; while ... t = i < max;`
      // `let t = i < 10; while ... t = i < max;`
      // We can't really deal with this because we need to know what the counter offset is in order to prevent infinite transform loops.
      // So sadly, we must bail here, until we figure out a way to do stable yolo transforms without risking infini transforms.
      vlog(
        '- The RHS range check failed, the expression was not doing a range check of an ident versus a numeric literal',
        testRhs.left.type,
        testRhs.right.type,
      );
      return;
    }

    ASSERT(counterNameB);

    if (counterNameA) {
      // At the time of writing, the counter init and test init require literals and normalization would
      // resolve the test init before reaching here. Hence this check is redundant right now. But if that
      // invariant changes, this test becomes relevant.

      if (counterNameA !== counterNameB) {
        vlog('- The init checks for a different counter than the update, bailing');
        return;
      }
      if (rangeValueA !== rangeValueB) {
        vlog('- The init has a different static value in the range check than the update');
        return;
      }
      if (rangeOpA !== rangeOpB) {
        // TODO: normalize a<b to a>=b and a<=b to a>b ? it's not necessarily safe wrt nans but it should be safe here? is it very relevant?
        vlog('- The init has a different op in the range check than the update');
        return;
      }
    }

    // The pattern is confirmed for the test meta. Now we must confirm the counter.

    const counterMeta = fdata.globallyUniqueNamingRegistry.get(counterNameB);

    // The counter must be initialized to a primitive (for now, a finite number). Maybe later anything can be okay (but why).
    // The counter must have one assignment, which unambiguously increments or decrements the counter by some primitive value.
    // TODO: maybe also supports strings? Is that ever a relevant case?

    if (counterMeta.writes.length !== 2) {
      vlog('- The counter did not have two writes so it cannot meet the target pattern, bailing');
      return;
    }

    const counterWriteVar = counterMeta.writes[0];
    const counterWriteUpd = counterMeta.writes[1];
    if (counterWriteVar.kind !== 'var') {
      vlog('- The first write to the counter was not the var decl. Dunno whats up with that but bailing.');
      return;
    }
    if (counterWriteUpd.kind !== 'assign') {
      vlog('- The second write to the counter was not an assignment. Maybe `for` or whatever but we must bail here.');
      return;
    }

    const counterInit = counterWriteVar.parentNode.init;
    if (!AST.isPrimitive(counterInit)) {
      vlog('- The counter was not initialized to a number, bailing', counterInit.type);
      return;
    }

    const counterOffset = AST.getPrimitiveValue(counterInit);
    if (!isFinite(counterOffset)) {
      vlog('- The counter was not initialized to a finite value, bailing (', [counterOffset], ')');
      return;
    }

    let counterStep;
    let counterOp;

    const counterUpdRhs = counterWriteUpd.parentNode.right;
    // Adding more ops means updating the steps check since it currently only works for + and -
    if (counterUpdRhs.type === 'BinaryExpression' && ['+', '-' /*, '*'*/].includes(counterUpdRhs.operator)) {
      counterOp = counterUpdRhs.operator;
      if (counterUpdRhs.left.type === 'Identifier' && counterUpdRhs.left.name === counterNameB && AST.isPrimitive(counterUpdRhs.right)) {
        counterStep = +AST.getPrimitiveValue(counterUpdRhs.right);
      } else if (
        counterUpdRhs.right.type === 'Identifier' &&
        counterUpdRhs.right.name === counterNameB &&
        AST.isPrimitive(counterUpdRhs.left)
      ) {
        counterStep = +AST.getPrimitiveValue(counterUpdRhs.left);
      } else {
        vlog('- The rhs of the counter update was not incrementing or decrementing the counter by a static number, bailing');
        return;
      }
    } else {
      vlog('- The rhs of the counter update was not a `+` or a `-`, bailing'); // for now
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

    ASSERT(
      isFinite(counterOffset) && isFinite(counterStep) && counterOp && rangeValueB !== undefined,
      'wut',
      counterOffset,
      counterStep,
      counterOp,
      rangeValueB,
    );

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
    const len = Math.abs(Math.abs(rangeValueB) - Math.abs(counterOffset)) + (rangeOpB === '<=' || rangeOpB === '>=' ? 1 : 0);
    const steps = Math.ceil(len / Math.abs(counterStep));
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

    // We should confirm that the counter and test updates are the last in the main body of
    // the loop. Also confirm that the loop does not contain a `continue` or `break`.

    // Initially we'll flip this implicitly by confirming that the body is explicitly only
    // an expression statement, the counter update, and the test update. This also means it
    // won't accept a break, continue, if, and nested loop.

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

    // The next two checks confirm whether the test/counter updates are the last two in the loop. But I don't think it matters much?
    //if (counterWriteUpd.blockBody !== loopBody || counterWriteUpd.blockIndex !== loopBody.length - 2) {
    //  vlog('- The counter update was not the second-to-last statement of the while, bailing');
    //  return;
    //}
    //if (testWriteUpd.blockBody !== loopBody || testWriteUpd.blockIndex !== loopBody.length - 1) {
    //  vlog('- The test update was not the last statement of the while, bailing');
    //  return;
    //}

    vlog('Pattern confirmed ... now deep cloning the `while`');

    // Pattern is now confirmed

    // We basically clone the whole loop and and replace the `while` of the clone with an `if`.
    // Other rules should deduce the actual values of the counter etc and the whole clone
    // should not lead to too much code bloat here since the core is only a single expression.

    // Collect all var decls being defined (because we need to rename them when cloning
    const freshNames = loopBody.filter((n) => n.type === 'VariableDeclaration').map((n) => n.declarations[0].id.name);

    ASSERT(
      transformSteps > 0 && transformSteps <= unrollLimit,
      'the transform step count should be bound between zero and up-to-and-including the unrollLimit',
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

      outer = AST.ifStatement(AST.identifier(testName), AST.blockStatement(...newIfBody, outer), AST.blockStatement());
    }

    vlog('Cloned. Applying transform.');

    rule('A counted iterator while loop can be unrolled a bit');
    example(
      'let counter = 0; let test = counter < 10; while (test) { f(); counter = counter + 1; test = counter < 10; }',
      'let counter = 0; let test = counter < 10; if (test) { f(); counter = counter + 1; test = counter < 10; } while (test) { f(); counter = counter + 1; test = counter < 10; }',
    );
    before(testWriteVar.blockBody[testWriteVar.blockIndex]);
    before(counterWriteVar.blockBody[counterWriteVar.blockIndex]);
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
