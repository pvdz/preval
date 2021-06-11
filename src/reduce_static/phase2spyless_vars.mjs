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

export function spylessVars(fdata) {
  group('\n\n\nChecking for single scoped spyless vars to move');
  //vlog('\nCurrent state\n--------------\n' + fmat(tmat(fdata.tenkoOutput.ast)) + '\n--------------\n');
  const r = _spylessVars(fdata);
  groupEnd();
  return r;
}
function _spylessVars(fdata) {
  const ast = fdata.tenkoOutput.ast;

  const queue = [];
  const dupes = new Map(); // We can't continue if the system detects multiple vars want to move within the same body.
  processAttempt(fdata, queue, dupes);

  log('');
  if (queue.length) {
    // Inject indexes front to back. If two vars compete for the same index, make sure to keep them in original (as before this step) source order.
    queue.sort(({ pid: pa, index: ia }, { pid: pb, index: ib }) => (ia < ib ? 1 : ia > ib ? -1 : pa < pb ? 1 : pa > pb ? -1 : 0));

    let changed = 0;

    vgroup('Unwinding', queue.length, 'callbacks');
    queue.forEach(({ func }) => {
      vlog('-- next');
      if (func()) ++changed;
    });
    vgroupEnd();

    if (changed) {
      log('Var decls moved:', changed, '. Restarting from phase1 to fix up read/write registry');
      return 'phase1';
    }
  }
  log('Var decls moved: 0.');
}

function processAttempt(fdata, queue, dupes) {
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

  fdata.globallyUniqueNamingRegistry.forEach(function (meta, name) {
    if (meta.isBuiltin) return;
    if (meta.isImplicitGlobal) return;
    if (!meta.isConstant) return; // We don't move it beyond the first ref so don't care about it being a let or const
    if (!meta.singleScoped) return; // Maybe we can do it for multi-scoped but this introduces TDZ related problems, and more.
    if (meta.rwOrder.length === 1) return; // No reads? Bah!

    vgroup('- var `' + name + '`');
    process(fdata, meta, name, queue, dupes);
    vgroupEnd();
  });
}

function process(fdata, meta, name, queue, dupes) {
  // Single scoped vars should have their decl first, or they are TDZ
  const varDeclRef = meta.rwOrder[0];
  if (varDeclRef.action !== 'write' || varDeclRef.kind !== 'var') {
    vlog('- First write is not the var decl', varDeclRef.action, varDeclRef.kind);
    return;
  }

  if (varDeclRef.blockBody === varDeclRef.pfuncNode.body.body && varDeclRef.blockIndex < varDeclRef.pfuncNode.$p.bodyOffset) {
    vlog('Not changing anything in the function header');
    return;
  }

  // Check whether the over statement has a bigger pid than the next ref
  const firstRef = meta.rwOrder[1];
  // No refs is fine but we ignore them here. This var decl will be eliminated.
  const lastRef = meta.rwOrder[meta.rwOrder.length - 1]; // Worst case it is the first ref. :shrug:

  // Check whether the init can spy (deep check)
  const init = varDeclRef.parentNode.init;
  source(varDeclRef.grandNode);

  if (init.type === 'FunctionExpression') {
    // This ends up in an infinite loop... like with tests/cases/type_tracked/invert/else_branch_closure2.md
    vlog('Not moving function expressions because there is another rule that wants to move them further out');
    return;
  }

  const isSpy = AST.complexNodeMightSpy(init, fdata);
  if (isSpy) {
    vlog('- The init to this binding is a spy. Bailing');
    return;
  }

  // Check whether the node is used inside the next node
  // If not, then it must be safe to jump over it
  // If it is and it is an IfStatement;
  // - When the binding is used after the if, do nothing
  // - Else, when the binding is used in only one branch, move it inside of that branch

  const firstRefPid = +firstRef.node.$p.pid;
  const lastRefPid = +lastRef.node.$p.pid;

  let targetBody = varDeclRef.blockBody;
  let targetIndexToContainRef = varDeclRef.blockIndex + 1;

  vgroup(
    'Searching for new target from',
    targetIndexToContainRef,
    ', body has',
    targetBody.length,
    'statements. First ref pid:',
    firstRefPid,
    ', last ref pid:',
    lastRefPid,
  );
  while (targetIndexToContainRef < targetBody.length) {
    const afterPid = +(targetBody[targetIndexToContainRef + 1]?.$p.pid ?? Infinity);
    vlog(
      '- loop',
      targetIndexToContainRef,
      ', next pid:',
      +targetBody[targetIndexToContainRef]?.$p.pid,
      ' (',
      targetBody[targetIndexToContainRef]?.type,
      '), followed by:',
      afterPid,
      '(',
      targetBody[targetIndexToContainRef + 1]?.type,
      ')',
    );
    if (!targetBody[targetIndexToContainRef + 1])
      vlog('  (there is no after so ref must be inside next node, using Infinity as after pid)');
    if (afterPid < firstRefPid) {
      // The node after the next node has a lower pid than the first ref. This means the first ref must occur later.
      ++targetIndexToContainRef;
      vlog('  - Node does not contain ref, skipping to next node');
    } else {
      ASSERT(afterPid > firstRefPid);
      ASSERT(targetBody[targetIndexToContainRef]);

      vlog(
        '  - Ok, next node contains first ref, but was the last ref after this node?',
        lastRefPid,
        '>',
        afterPid,
        '?',
        lastRefPid > afterPid ? 'yes, so we end here' : 'no, so we move into this node',
      );

      // First check whether there are any references to this binding _after_ the next node which contains at least one ref.
      // If there are, then we stop searching. This is where we put the var decl.
      // All we have to check is whether the last ref is also before the node after
      if (lastRefPid > afterPid) {
        // There was a ref inside the next node and one after it. Must move the var decl to be in front of this node now.
        vlog('  - Ref inside node and after it. Bailing');
        break;
      }

      // Enter nodes with children. But note that it may not have any (like `return`)
      const nextNode = targetBody[targetIndexToContainRef];
      if (nextNode.type === 'IfStatement') {
        if (firstRefPid > +nextNode.consequent.$p.pid) {
          vlog(
            '  - if statement pid bounds:',
            +nextNode.$p.pid,
            nextNode.consequent.$p.lastPid,
            +nextNode.alternate.$p.pid,
            nextNode.alternate.$p.lastPid,
            ', looking for range',
            firstRefPid,
            lastRefPid,
          );
          // Confirm whether both branches have a ref. If so, move the var decl in front of this `if`
          // Otherwise, move the var decl inside the branch that references it (ofc)
          if (lastRefPid <= nextNode.consequent.$p.lastPid) {
            vlog(
              '  - if statement... only ref in consequent because last ref pid <= last pid in consequent',
              lastRefPid,
              nextNode.consequent.$p.lastPid,
            );
            // All refs are inside the consequent branch
            targetBody = nextNode.consequent.body;
            targetIndexToContainRef = 0;
          } else if (+nextNode.alternate.$p.pid < firstRefPid) {
            vlog(
              '  - if statement... only ref in alternate because if alternate pid < first ref pid',
              +nextNode.consequent.$p.pid,
              lastRefPid,
            );
            // All refs are inside the alternate branch
            targetBody = nextNode.alternate.body;
            targetIndexToContainRef = 0;
          } else {
            vlog('  - if statement... ref in both, bailing');
            // So both branches. Put before the if.
            break;
          }
        } else {
          vlog('Ref was inside if-header. Put node before it');
          break;
        }
      } else if (nextNode.type === 'WhileStatement' || nextNode.type === 'ForInStatement' || nextNode.type === 'ForOfStatement') {
        // Technically also goes for regular expressions?
        if (['FunctionExpression', 'ClassExpression', 'ObjectExpression', 'ArrayExpression'].includes(init.type)) {
          vlog('Can not move an object type into a loop. It ends here');
          break;
        } else if (firstRefPid > +nextNode.body.$p.pid) {
          vlog('  - inside loop (and not after)');
          targetBody = nextNode.body.body;
          targetIndexToContainRef = 0;
        } else {
          vlog('Ref was inside if-header. Put node before it');
          break;
        }
      } else {
        vlog('  - unknown... stop', nextNode.type);
        // hmmmm, are we skipping over anything else?
        // Either way, it should be safe to stop here and put the node in front of the next
        ASSERT(nextNode.type !== 'BlockStatement');
        break;
      }
    }
  }
  vgroupEnd();

  vlog(
    'Before index:',
    varDeclRef.blockIndex,
    ', after index:',
    targetIndexToContainRef,
    ', same body?',
    targetBody === varDeclRef.blockBody,
  );

  const alreadyTargeted = dupes.get(targetBody);
  if (alreadyTargeted === undefined) {
    dupes.set(targetBody, false);
  } else if (alreadyTargeted === false) {
    dupes.set(targetBody, true);
  } else if (alreadyTargeted === true) {
    vlog('This body was already targeted once so we have to skip this one (and the one that was queued already)');
    return;
  } else {
    ASSERT(false);
  }

  if (targetBody !== varDeclRef.blockBody || targetIndexToContainRef - 1 !== varDeclRef.blockIndex) {
    // Move the var decl to the blockBody to before nextIndex
    vlog('Queued up var decl to be moved...', targetIndexToContainRef);

    // Remove the var decl from AST. Don't change the indexes (normalized code is allowed to
    // have empty statements, normalization will clean it up).

    const varNode = varDeclRef.blockBody[varDeclRef.blockIndex];

    // Capture the output before modifying this var
    const outputBefore = before(varNode, varDeclRef.blockBody, true);

    // Queue the re-injection to happen in a queue
    queue.push({
      index: targetBody[targetIndexToContainRef],
      pid: varNode.$p.pid, // If two vars are competing for the same index, make sure to keep original source order
      func: () => {
        if (dupes.get(targetBody) === true) {
          vlog('This body was targeted multiple times. Can not proceed.');
          return false;
        }

        rule('A var decl whose init is not a spy can be moved closer to its first ref');
        example('const x = +y; const z = x * 2; if ($) $(); $(z);', 'const x = +y; if ($) $(); const z = x * 2; $(z);');
        vlog(outputBefore);

        varDeclRef.blockBody[varDeclRef.blockIndex] = AST.emptyStatement();
        targetBody.splice(targetIndexToContainRef, 0, varNode);

        after(varNode, targetBody);
        return true;
      },
    });
  } else {
    vlog('Target body is same as before. No need to move this var decl.');
  }
}
