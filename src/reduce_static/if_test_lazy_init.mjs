// Find a sealer that is a lazy loader / init and don't lazy load it in certain cases
//
//    `let a = null; if (a) { } else { a = {}; $(a); }`
// ->
//    `let a = {}; $(a);`
//
// Basically works when the var is guaranteed to be read only ever after assigning to it
//
//    `let a = null; if (a) { } else { a = {}; } $(a);`
// ->
//    `let a = {}; $(a);`
//
// But not when at least one branch reds the var, except when branches would be equal without that assign
//
//    `let a = null; if (a) { $(a); } else { a = {}; $(a); } $(a);`
// ->
//    `let a = {}; $(a);`
//
// Don't do it for expensive computation etc. Fine for static values like obj/arr/etc. Careful with idents (-> tdz)
//

import { ASSERT, log, group, groupEnd, vlog, vgroup, vgroupEnd, rule, example, before, source, after, findBodyOffset, currentState, } from '../utils.mjs';
import * as AST from '../ast.mjs';

export function ifTestLazyInit(fdata) {
  currentState(fdata, 'ifTestLazyInit', true, fdata);

  group('\n\n\n[ifTestLazyInit] Looking for sealers that are lazy loaders\n');
  const r = _ifTestLazyInit(fdata);
  groupEnd();

  // currentState(fdata, 'ifTestLazyInit', true, fdata);

  return r;
}
function _ifTestLazyInit(fdata) {
  let changes = 0;
  const queue = [];

  fdata.globallyUniqueNamingRegistry.forEach((meta, varName) => {
    if (meta.isImplicitGlobal) return;
    if (meta.isConstant) return; // Must get updated
    if (meta.isBuiltin) return;
    if (!meta.varDeclRef) return; // catch
    if (meta.writes.length !== 2) return; // Sealers have an init and an assign (seal)
    if (!meta.reads.length) return; // Dead code

    // The first read must be an if-test because the other reads must scope under it or after-under it

    const testRead = meta.reads[0];

    const ifNode = testRead.parentNode;
    if (ifNode.type !== 'IfStatement' || testRead.parentProp !== 'test') return; // As an if-test.

    vlog('Testing var', [varName], ', with 2 writes and', meta.reads.length, 'reads, which is an if-test');

    const write0 = meta.writes[0];
    const write1 = meta.writes[1];
    const initWrite = write0.kind === 'var' ? write0 : write1;
    const assignWrite = write0.kind === 'assign' ? write0 : write1;

    // All reads must either happen
    // - descendant of the parent node of the if-node, but lexicographically after it
    //   - TODO: what about loop/try scopes?
    // - in the other branch, but only when the branches are identical without that write (regardless of lex order)

    const assignPid = assignWrite.node.$p.npid;
    const ifStartPid = ifNode.consequent.$p.npid;
    const ifMidPid = ifNode.alternate.$p.npid;
    const ifEndPid = ifNode.alternate.$p.lastPid;

    let writeBranch = true;
    let assignVisited = false;
    if (ifStartPid < assignPid && assignPid < ifMidPid) {
      // write is in the consequent branch
      writeBranch = true;
      // Assign is in consequent branch, if var starts as truthy then it is visited.
      if (AST.isTruthy(initWrite.parentNode.init)) assignVisited = true;
      else if (!AST.isFalsy(initWrite.parentNode.init)) return vlog('- bail: unable to determine if init is falsy', initWrite.parentNode.init);
    } else if (ifMidPid < assignPid && assignPid < ifEndPid) {
      // write is in the alternate branch
      writeBranch = false;
      // Assign is in alternate branch, if var starts as falsy then it is visited.
      if (AST.isFalsy(initWrite.parentNode.init)) assignVisited = true;
      else if (!AST.isTruthy(initWrite.parentNode.init)) return vlog('- bail: unable to determine if init is truthy', initWrite.parentNode.init);
    } else {
      // TODO: Not sure what case this is or if we could support it but for now it's not our pattern
      return vlog('- bail: write is not scoped in same if-node as the one that tests it');
    }

    if (!assignVisited) {
      // Silly dead code. Maybe artifact or obscure test case
      // - `let x = false; if (x) { x = false; $(a); } else $(b);`    //  x is never set to false, $(a) never called
      vlog('Looks like the assignment branch is dead code anyways due to the if-test initial value, which leads to the only assignment never being visited');

      // We could leave this to another rule or just do it here? Let's just neuter the if-test and move on. It's an edge case.
      rule('When an if-branch is dead code, eliminate it');
      example('let x = true; if (x) $(a); else { x = true; $(b); }', 'let x = true; if (x) $(a); else { x = true; $(b); }');
      before(ifNode);

      ifNode.test = writeBranch ? AST.fals() : AST.tru();

      after(ifNode);
      changes += 1;
      return;
    }

    // We can guarantee that the write happens before any post-test read so we then we shouldn't need to have
    // to worry about loops/traps here because either they're in the same loop/trap or it writes before them.
    // So just find out whether all reads lexicographically appear after the assign, or in the other branch.
    for (const read of meta.reads) {
      if (read === testRead) continue;
      const pid = read.node.$p.npid;
      if (ifStartPid < pid && pid < ifEndPid) {
        if (writeBranch && ifMidPid < pid && pid < ifEndPid) continue; // write is in "other" branch; lex order not relevant
        else if (!writeBranch && ifStartPid < pid && pid < ifMidPid) continue; // write is in "other" branch; lex order not relevant
      }
      if (read.node.$p.npid < assignPid) return vlog('- bail: read pid < assign pid'); // TODO: falsy case (read can appear in alternate)
    }

    // Since the if-statement contains a read (at least the test-read), the if-branches must be equal without the assign.
    // If we don't check then this leads to asymmetrical branches and we can't eliminate one of those safely.
    // Undoing the lazy load will lead to elimination of the assign branch, so for example:
    // - `let x = false; ... if (x) $(a) else { x = true; $(b); }`
    // would fail because `let x = true; ... if (x) $(a) else { $(b) }` is not the same since before the change it would call $(b)
    // first and $(b) from there on out. But after the change it would never call $(b). (Unless one branch was already dead)
    // So we must check for symmetry, meaning we must validate that both branch are equal when ignoring the assignment.
    //
    // That complicates the comparison so for now we'll require the assign to be toplevel to the branch.
    // TODO: technically the assign could appear anywhere in the branch, we just have to update the comparison logic to account for skipping the assign once we find it...

    // The branch with the assignment will have offset+1
    if (ifNode.consequent.body.length - (writeBranch ? 1 : 0) !== ifNode.alternate.body.length - (writeBranch ? 0 : 1)) return vlog('- bail: branches have different statement count');
    let seenAssign = false;
    for (let i = 0, n = Math.min(ifNode.consequent.body.length, ifNode.alternate.body.length); i<n; ++i) {
      const ai = i+(writeBranch ? (seenAssign ? 1 : 0) : 0);
      let a = ifNode.consequent.body[ai];
      const bi = i+(writeBranch ? 0 : (seenAssign ? 1 : 0));
      let b = ifNode.alternate.body[bi];
      if (writeBranch && ai === assignWrite.blockIndex) {
        seenAssign = true;
        a = ifNode.consequent.body[ai + 1];
      }
      else if (!writeBranch && bi === assignWrite.blockIndex) {
        seenAssign = true;
        b = ifNode.alternate.body[bi + 1];
      }
      if (!AST.isSameStatement(a, b)) {
        return vlog('- bail: This branch is not same (or comparison is not supported, like var statements)');
      }
    }

    // Okay, the branches are same so we should be good to go now! (Note: we know neither branch is dead code)

    rule('A sealer that is only read after the seal is lazy load/init which we can unlazy');
    example('let x = false; ... if (x) { $(a); } else { x = {}; $(a); }', 'let x = {}; ... $(a);');
    before(initWrite.blockBody[initWrite.blockIndex]);
    before(testRead.blockBody[testRead.blockIndex]);

    const stmt = initWrite.blockBody[initWrite.blockIndex];
    if (!AST.isPrimitive(initWrite.parentNode.init)) {
      // Preserve init if not primitive. Replace the var smtt with a `{ <init>; var }` block
      // which we will splat in the end (to preserve index caches during the loop)
      initWrite.blockBody[initWrite.blockIndex] = AST.blockStatement(
        AST.expressionStatement(initWrite.parentNode.init),
        stmt,
      );

      queue.push({
        i: initWrite.parentNode.$p.npid,
        j: initWrite.blockIndex,
        func: () => {
          before(initWrite.blockBody);
          const body = initWrite.blockBody[initWrite.blockIndex].body;
          initWrite.blockBody.splice(initWrite.blockIndex, 1, ...body);
          after(initWrite.blockBody);
        }
      });
    }

    queue.push({
      i: testRead.parentNode.$p.npid,
      j: testRead.blockIndex,
      func: () => {
        before(stmt);
        before(testRead.blockBody);
        stmt.init = assignWrite.parentNode.right;
        // Splat the branch without the write (they are asserted equal otherwise)
        if (writeBranch) testRead.blockBody.splice(testRead.blockIndex, 1, ...ifNode.alternate.body);
        else testRead.blockBody.splice(testRead.blockIndex, 1, ...ifNode.consequent.body);
        after(stmt);
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

    log('Lazy loader sealers found:', changes, '. Restarting from phase1 to fix up read/write registry.');
    return {what: 'ifTestLazyInit', changes, next: 'phase1'};
  }

  log('Lazy loader sealers found: 0.');
}
