// Find a sealer where the if-branches are equal without the sealer.
//
//    `let a = false; if (a) { $(x); return undefined; } else { a = true; $(x);  return undefined; }`
//                             ^^^^^^^^^^^^^^^^^^^^^^^                    ^^^^^^^^^^^^^^^^^^^^^^^^
// ->
//    `$(x); return undefined;`
//

import { ASSERT, log, group, groupEnd, vlog, vgroup, vgroupEnd, rule, example, before, source, after, findBodyOffset, currentState, } from '../utils.mjs';
import * as AST from '../ast.mjs';

export function ifTestSealerUseless(fdata) {
  currentState(fdata, 'ifTestSealerUseless', true, fdata);

  group('\n\n\n[ifTestSealerUseless] Looking for dead sealers with identical branches\n');
  const r = _ifTestSealerUseless(fdata);
  groupEnd();

  // currentState(fdata, 'ifTestSealerUseless', true, fdata);

  return r;
}
function _ifTestSealerUseless(fdata) {
  let changes = 0;
  const queue = [];

  fdata.globallyUniqueNamingRegistry.forEach((meta, varName) => {
    if (meta.isImplicitGlobal) return;
    if (meta.isConstant) return; // Must get updated
    if (meta.isBuiltin) return;
    if (!meta.varDeclRef) return; // catch
    if (meta.writes.length !== 2) return; // Sealers have an init and an assign (seal)
    if (meta.reads.length !== 1) return; // Only read as an if-test

    const testRead = meta.reads[0];

    const ifNode = testRead.parentNode;
    if (ifNode.type !== 'IfStatement' || testRead.parentProp !== 'test') return; // As an if-test.

    vlog('Testing var', [varName], ', with 2 writes and 1 read, which is an if-test');

    const write0 = meta.writes[0];
    const write1 = meta.writes[1];
    const initWrite = write0.kind === 'var' ? write0 : write1;
    const assignWrite = write0.kind === 'assign' ? write0 : write1;

    // For now, must be the first statement of the branch
    if (assignWrite.blockIndex !== 0) return; // TODO: we can improve this but by checking if it's the first we know the write is unconditional (and not susceptible to abrupt completions)

    // The write should be the first statement of either branch.
    // We must know which branch and we must know what the initial value was.
    // There is a situation where the assign is not to be executed. Compare:
    // - `let x = false; if (x) $(); else { x = $('live'); $(); }`
    // - `let x = true; if (x) $(); else { x = $('dead'); $(); }`
    //
    // I think this only requires knowing the _initial_ value, since that determines whether the assign is dead or not.
    let assignVisited = false;
    if (assignWrite.blockBody !== ifNode.consequent.body) {
      if (AST.isTruthy(initWrite.parentNode.init)) assignVisited = true;
      else if (!AST.isFalsy(initWrite.parentNode.init)) return; // If we can't determine it, we must bail
    }
    else if (assignWrite.blockBody !== ifNode.alternate.body) {
      if (AST.isFalsy(initWrite.parentNode.init)) assignVisited = true;
      else if (!AST.isTruthy(initWrite.parentNode.init)) return; // If we can't determine it, we must bail
    }
    else {
      return; // assign not inside if-statement
    }

    vlog('- Assign is inside if, is it visited?', assignVisited); // When not visited it was just dead code, oh well

    // Now confirm the branches are equal without that assignment
    // The branch with the assignment will have offset+1
    const conOffset = assignWrite.blockBody === ifNode.consequent.body ? 1 :0;
    const altOffset = assignWrite.blockBody === ifNode.alternate.body ? 1 : 0;
    vlog('- Assign is first stmt');
    if (ifNode.consequent.body.length - conOffset !== ifNode.alternate.body.length - altOffset) return vlog('- bail: branches have different statement count');
    for (let i = 0, n = Math.min(ifNode.consequent.body.length, ifNode.alternate.body.length); i<n; ++i) {
      const a = ifNode.consequent.body[i+conOffset];
      const b = ifNode.alternate.body[i+altOffset];
      if (!AST.isSameStatement(a, b)) {
        return vlog('- bail: This branch is not same (or comparison is not supported, like var statements)');
      }
    }

    // Okay, the branches are same so we should be good to go now!

    rule('A sealer that causes two equal if-branches is dead code');
    example('let x = false; if (x) { $(a); return undefined; } else { x = $("ok"); $(a); return undefined; }', '$("ok"); $(a); return undefined;');
    example('let x = true; if (x) { $(a); return undefined; } else { x = $("fail"); $(a); return undefined; }', '$(a); return undefined;');
    before(initWrite.blockBody[initWrite.blockIndex]);
    before(testRead.blockBody[testRead.blockIndex]);

    // Preserve init if not primitive
    const pre = [];
    if (!AST.isPrimitive(initWrite.parentNode.init)) pre.push(AST.expressionStatement(initWrite.parentNode.init));
    initWrite.blockBody[initWrite.blockIndex] = AST.blockStatement(...pre);

    queue.push({
      i: initWrite.parentNode.$p.npid,
      j: initWrite.blockIndex,
      func: () => {
        before(initWrite.blockBody);
        const huh = initWrite.blockBody[initWrite.blockIndex].body;
        initWrite.blockBody.splice(initWrite.blockIndex, 1, ...huh);
        after(initWrite.blockBody);
      }
    });

    // Preserve assigned value if not primitive, unless it wasn't visited at all
    let assignLeftover = [];
    if (assignVisited && !AST.isPrimitive(assignWrite.parentNode.right)) {
      assignLeftover.push(AST.expressionStatement(assignWrite.parentNode.right));
    }
    if (conOffset) testRead.blockBody[testRead.blockIndex] = ifNode.consequent;
    else testRead.blockBody[testRead.blockIndex] = ifNode.alternate;

    queue.push({
      i: testRead.parentNode.$p.npid,
      j: testRead.blockIndex,
      func: () => {
        before(testRead.blockBody);
        testRead.blockBody.splice(testRead.blockIndex, 1,
          ...assignLeftover, // Inject the assignment rhs if it wasn't a primitive
          ...testRead.blockBody[testRead.blockIndex].body.slice(1)
        );
        after(testRead.blockBody);
      }
    });

    after(initWrite.blockBody[initWrite.blockIndex]);
    if (ifNode.consequent.body.length === 0) after(AST.emptyStatement());
    else after(testRead.blockBody.slice(testRead.blockIndex, testRead.blockIndex + ifNode.consequent.body.length));

    changes += 1;
  });

  if (changes > 0) {
    vlog('\nSplatting blocks');
    queue.sort(({ i: i1, j: j1 }, { i: i2, j: j2 }) => i1 - i2 || j1 - j2); // desc, first stmt then index
    queue.forEach(({ func }) => vlog('\n') || func());

    log('Dead sealers eliminated:', changes, '. Restarting from phase1 to fix up read/write registry.');
    return {what: 'ifTestSealerUseless', changes, next: 'phase1'};
  }

  log('Dead sealers eliminated: 0.');
}
