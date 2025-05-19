// Search for single scoped var decls without spies and try to move them closer to their first ref

import {
  ASSERT,
  log,
  group,
  groupEnd,
  vlog,
  vgroup,
  vgroupEnd,
  rule,
  example,
  before,
  source,
  after,
  fmat,
  tmat,
  findBodyOffset,
} from '../utils.mjs';
import * as AST from '../ast.mjs';
import { DIM, RESET, VERBOSE_TRACING } from '../constants.mjs';

export function spylessVars(fdata) {
  group('\n\n\n[spylessVars] Checking for single scoped spyless vars to move');
  //currentState(fdata, 'spylessVars', true, fdata);
  const r = _spylessVars(fdata);
  groupEnd();
  return r;
}
function _spylessVars(fdata) {
  const queue = [];
  /** @var {Array<{varNode: Node, oldBody: Array<Node>, oldIndex: number}>} **/
  const attempted = [];
  processAttempt(fdata, queue, attempted);

  log('');
  if (queue.length) {
    // Inject indexes front to back. If two vars compete for the same index, make sure to keep them in original (as before this step) source order.
    queue.sort(({ index: a, pid: pa, del: da, oldBody: oldBodyA }, { index: b, pid: pb, del: db, oldBody: oldBodyB }) => {
      if (a === b) {
        // Do deletes first, regardless
        ASSERT(!(da && db) || oldBodyA !== oldBodyB, 'should not want to delete the same index twice');
        if (da) return -1;
        if (db) return -1;

        // So two (or more) decls want to be on the same index. This should mean that they all
        // have their first reference in the statement of that index, like a binary expression,
        // array, or object.
        // We should order them in the reverse order of appearance; first reference should be
        // the last statement to be inserted here.
        // This should preserve order a bit and make sure we don't get into infinite transfer
        // loops. Hopefully? Please?

        // Order by first read pid, asc
        return pb-pa;
      }

      // Not the same index. Just order by reverse index then.
      return b-a;
    });

    if (VERBOSE_TRACING) {
      queue.forEach(({varNode, targetBody, oldBody, index, oldIndex, del}, i) => {
        console.log(i, ':', del ? 'Removing' : 'Adding  ', DIM, tmat(varNode, true), RESET, 'from', oldIndex, del ? '' : 'to', del ? '' : index, del ? '' : ', same body?', del ? '' : targetBody === oldBody);
      });
    }

    vgroup('Unwinding', queue.length, 'callbacks');
    queue.forEach(({ func, index, del }) => {
      vlog('-- next, index=', index, ', del=',del);
      func();
    });
    vgroupEnd();

    let changed = 0;

    // Now look back and see how many actually changed position
    attempted.forEach(({varNode, oldBody, oldIndex}) => {

      if (VERBOSE_TRACING) {
        vlog('Before:', DIM, tmat(varNode,true), RESET, ', from:', oldIndex);
        vlog('After :', DIM, oldBody[oldIndex] ? tmat(oldBody[oldIndex],true) : ';', RESET, 'same?', oldBody[oldIndex] === varNode);
      }

      if (oldBody[oldIndex] !== varNode) ++changed;
    })

    if (changed) {
      log('Var decls moved:', changed, '. Restarting from phase1 to fix up read/write registry');
      return {what: 'spylessVars', changes: changed, next: 'phase1'};
    }
  }
  log('Var decls moved: 0.');
}

function processAttempt(fdata, queue, attempted) {
  // We want to find all var decls that are single scoped and have no spies and move
  // them as close to their first ref as possible.
  // Unfortunately, var decls may reference each other so we run into a bit of a jam
  // in terms of cached indexes running stale.
  // To this end we first collect all var decls that pass
  // Then we start determining their end location, in ascending pid order.
  // The idea is that this way we can't move a var decl beyond another var decl that references them.
  // After doing this for all var decls, we move them to their new position.
  // This way the var decls may not move to their final destination, but at least they won't move
  // too far. For example:
  // `const a = x; f(); const b = a + y; if (z) f(); $(b);`
  // First sweep:
  // `f(); const a = x; if (z) f(); const b = a + 5; $(b);`
  // Second sweep:
  // `f(); if (z) f(); const a = x; const b = a + 5; $(b);`
  // In the first step, `a` couldn't move past the decl of `b` so the search stopped there. Then
  // the second search `b` had also been moved forward so `a` could move further.
  // Each binding does not care about indexes before it (we only move var decls for whom the decl
  // is the first ref) and we don't change index order until we actually move, so this should be ok?
  // Another problem we have to deal with is branching. If we move a decl into a block that references
  // it then another reference after that block may now fail hard.

  fdata.globallyUniqueNamingRegistry.forEach(function (meta, name) {
    if (meta.isBuiltin) return;
    if (meta.isImplicitGlobal) return;
    if (!meta.isConstant) return; // We don't move it beyond the first ref so don't care about it being a let or const
    if (!meta.singleScoped) return; // Maybe we can do it for multi-scoped but this introduces TDZ related problems, and more.
    if (meta.writes.length !== 1) return; // Whatever
    if (meta.reads.length === 0) return; // No reads? Bah!

    vgroup('- var `' + name + '`');
    process(fdata, meta, name, queue, attempted);
    vgroupEnd();
  });
}

function process(fdata, meta, name, queue, attempted) {
  // Single scoped vars should have their decl first, or they are TDZ
  const write = meta.rwOrder[0];
  if (write.action !== 'write' || write.kind !== 'var') {
    return vlog('- First write is not the var decl', write.action, write.kind);
  }

  if (write.blockBody === write.pfuncNode.body.body && write.blockIndex < write.pfuncNode.$p.bodyOffset) {
    return vlog('Not changing anything in the function header');
  }

  // Check whether the over statement has a bigger pid than the next ref
  const firstRead = meta.rwOrder[1];
  // No refs is fine but we ignore them here. This var decl will be eliminated.
  const lastRead = meta.rwOrder[meta.rwOrder.length - 1]; // Worst case it is the first ref. :shrug:

  // Check whether the init can spy (deep check)
  const init = write.parentNode.init;

  if (init.type === 'FunctionExpression') {
    // This ends up in an infinite loop... like with tests/cases/type_tracked/invert/else_branch_closure2.md
    return vlog('Not moving function expressions because there is another rule that wants to move them further out');
  }

  // TODO: what about let bindings that may change like array elements or call args? We don't check for that case I think.

  //source(write.grandNode);

  const isSpy = AST.complexExpressionNodeMightSpy(init, fdata);
  if (isSpy) {
    vlog('- The init to this binding is a spy. Bailing');
    return;
  }

  // Check whether the node is used inside the next node
  // If not, then it must be safe to jump over it
  // If it is and it is an IfStatement;
  // - When the binding is used after the if, do nothing
  // - Else, when the binding is used in only one branch, move it inside of that branch

  const firstReadPid = +firstRead.node.$p.pid;
  const lastReadPid = +lastRead.node.$p.pid;

  let targetBody = write.blockBody;
  let currentIndex = write.blockIndex + 1;

  vgroup('Searching for new target from', currentIndex, ', body has', targetBody.length, 'statements. First ref pid:', firstReadPid, ', last ref pid:', lastReadPid);
  while (currentIndex < targetBody.length) {
    const currPid = +targetBody[currentIndex]?.$p.pid;
    const nextPid = +(targetBody[currentIndex + 1]?.$p.pid ?? Infinity);
    vlog('- loop, current index:', currentIndex, ', currPid: @', currPid, ' (', targetBody[currentIndex]?.type, '), next pid: @', nextPid, '(', targetBody[currentIndex + 1]?.type ?? 'none', ')');

    if (!targetBody[currentIndex + 1]) {
      vlog('  (there is no "after statement" so ref must be inside next node, using Infinity as after pid)');
    }
    if (nextPid < firstReadPid) {
      // Keep in mind, this is a single scoped variable and the (only) write
      // happened before all reads. As such, there can be no side effect that
      // spies on this var because that always entails invoking a function.

      // The node after the current node has a lower pid than that of the
      // first read. This means the first read must occur later and so we
      // can safely skip the current statement. Nothing can spy on the var yet.
      ++currentIndex;
      vlog('  - Node does not contain ref, skipping to next node');
      continue;
    }

    const currNode = targetBody[currentIndex];

    ASSERT(nextPid > firstReadPid, 'next pid is a statement but the read is an expr so it cant match and it must be bigger');
    ASSERT(currNode);

    vlog('  - Ok, curr statement contains the first ref, but was the last ref after this node?', lastReadPid, '>', nextPid, '?');
    if (lastReadPid > nextPid) {
      vlog('    - Yes, so the search ends here and we move the decl to before statement @', nextPid);
      break;
    }

    vlog('    - No, so we can move the decl into this block because there is no later reference');
    // Wait, is that true for loops though? Even if there's no read afterwards, the loop
    // start would need to remember the last value of the end of the previous iteration..?

    // Enter nodes with children.
    // It may not have any (like `return`), in which case that's the read and we break.
    if (currNode.type === 'IfStatement') {
      if (firstReadPid > +currNode.consequent.$p.pid) {
        vlog(
          '  - if statement pid bounds:',
          +currNode.$p.pid,
          currNode.consequent.$p.lastPid,
          +currNode.alternate.$p.pid,
          currNode.alternate.$p.lastPid,
          ', looking for range',
          firstReadPid,
          lastReadPid,
        );
        // Confirm whether both branches have a ref. If so, move the var decl in front of this `if`
        // Otherwise, move the var decl inside the branch that references it (ofc)
        if (lastReadPid <= currNode.consequent.$p.lastPid) {
          vlog(
            '  - if statement... only ref in consequent because last ref pid <= last pid in consequent',
            lastReadPid,
            currNode.consequent.$p.lastPid,
          );
          // All refs are inside the consequent branch
          targetBody = currNode.consequent.body;
          currentIndex = 0;
        } else if (+currNode.alternate.$p.pid < firstReadPid) {
          vlog(
            '  - if statement... only ref in alternate because if alternate pid < first ref pid',
            +currNode.consequent.$p.pid,
            lastReadPid,
          );
          // All refs are inside the alternate branch
          targetBody = currNode.alternate.body;
          currentIndex = 0;
        } else {
          vlog('  - if statement... ref in both branches, move decl to before the if');
          break;
        }
      } else {
        vlog('Ref was inside if-header. Move decl to before the if');
        break;
      }
    }
    else if (currNode.type === 'WhileStatement') {
      // Technically also goes for regular expressions?
      if (['FunctionExpression', 'ClassExpression', 'ObjectExpression', 'ArrayExpression'].includes(init.type)) {
        vlog('Can not move an object type into a loop. Move decl to before the loop');
        break;
      } else if (firstReadPid > +currNode.body.$p.pid) {
        vlog('  - inside loop (and not after)');
        targetBody = currNode.body.body;
        currentIndex = 0;
      } else {
        vlog('Ref was inside loop-header. Move decl to before the loop');
        break;
      }
    }
    else if (currNode.type === 'BlockStatement') {
      vlog('Curr statement is a block (possible if phase2 did not go back to normalization). Go inside.');
      targetBody = currNode.body;
      currentIndex = 0;
    }
    else if (currNode.type === 'TryStatement') {
      vlog('Try; we want to move stuff out of the Try so we bail here');
      vgroupEnd();
      return;
    }
    else {
      // Note: the first read was asserted to be inside the current statement and it does not have a block
      //       so decl should be moved to precede the current statement.
      vlog('  - not a block bearing statement, the decl should be moved to before this statement', currNode.type);
      break;
    }
  }
  vgroupEnd();

  vlog('Before index:', write.blockIndex, ', after index:', currentIndex, ', same body?', targetBody === write.blockBody);

  // Queue regardless. This is how we try to prevent infinite transform loops.
  // The idea is that we can order them by firstReadPid as a way to normalize the order.
  // If we would omit the statements that would not need ot move right now then we couldn't
  // sort queue with them in mind as well, potentially still leading to phase1 loops, where
  // one sort of frog-leaps one over the other after every iteration. Infinitely so.

  // This only affects const decls that are not closures. Hopefully that's a reasonable list.

  // Move the var decl to the blockBody to end up before the currIndex
  vlog('Queued up var decl to be moved to end up before index', currentIndex);

  const varNode = write.blockBody[write.blockIndex];

  // Queue the removal and insertion separately.
  // If we unwind the queue in reverse index order then it should not be possible to ruin index caches too early

  ASSERT(!varNode.deleting, 'each node only gets here once right?');
  varNode.deleting = true; // Temp mark node to do a sanity check
  attempted.push({varNode, oldBody: write.blockBody, oldIndex: write.blockIndex, index: write.blockIndex});

  queue.push({
    index: write.blockIndex,
    pid: firstReadPid,
    del: true,
    targetBody,
    oldBody: write.blockBody,
    oldIndex: write.blockIndex,
    varNode,
    func: () => {
      rule('A var decl whose init is not a spy can be moved closer to its first ref; removal step');
      example('const x = +y; const z = x * 2; if ($) $(); $(z);', 'const x = +y; if ($) $(); const z = x * 2; $(z);');
      before(write.blockBody);

      vlog('Removing:');
      source(write.blockBody[write.blockIndex], true);

      ASSERT(write.blockBody[write.blockIndex].deleting, 'we should only be deleting nodes marked for deletion... if this fails then queue order is incorrect and its removing the wrong nodes, very bad');
      write.blockBody[write.blockIndex].deleting = false; // each only once
      write.blockBody.splice(write.blockIndex, 1);

      after(write.blockBody);
      return true;
    }
  });
  queue.push({
    index: currentIndex,
    pid: firstReadPid,
    del: false,
    targetBody,
    oldBody: write.blockBody,
    oldIndex: write.blockIndex,
    varNode,
    func: () => {
      rule('A var decl whose init is not a spy can be moved closer to its first ref; insert step');
      example('const x = +y; const z = x * 2; if ($) $(); $(z);', 'const x = +y; if ($) $(); const z = x * 2; $(z);');
      before(targetBody);

      vlog('Adding:');
      source(varNode, true);

      targetBody.splice(currentIndex, 0, varNode);

      after(targetBody);
      return true;
    }
  });
}
