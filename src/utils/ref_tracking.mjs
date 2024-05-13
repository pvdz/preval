import {ASSERT, vlog, vgroup, vgroupEnd, REF_TRACK_TRACING} from "../utils.mjs"
import {createTrebra} from "../trebra.mjs"
import {createTreblo} from "../treblo.mjs"

// This analysis is only useful for single scope bindings. For them we can assert source code order matches temporal.
// Goal is to determine for each binding reference which writes it may observe in the worst case, or which writes
// it may overwrite in the worst case. This includes loops and try/catch/finally complexity.
// It assumes normalized code, which eliminates a few things (like switches).

// All reads/writes encountered in walking order. Values are only added upon visiting, not removed on the way down.
// Additionally, each block gets properties to track:
// - all reads/writes that occur inside anywhere in the block
// - all and the only reads that potentially read the value as the binding had when it entered the block
// - all and the only writes that may have caused the final value of a binding when leaving the block
// - all bindings that have been written to in all branches, necessary to track firstReads properly without making it ephemeral. boolean? or as pid of first statement after?


export function openRefsOnBeforeProgram(node) {
  if (REF_TRACK_TRACING) console.group('RTT: PROGRAM');
  if (REF_TRACK_TRACING) console.group('RTT: PROGRAM:before');

  node.$p.treblo = createTreblo(new Set, new Map);

  if (REF_TRACK_TRACING) console.groupEnd(); // PROGRAM:before
}

export function openRefsOnAfterProgram(node) {
  if (REF_TRACK_TRACING) console.group('RTT: PROGRAM:after');
  if (REF_TRACK_TRACING) console.groupEnd(); // PROGRAM:after
  if (REF_TRACK_TRACING) console.groupEnd(); // PROGRAM
  if (REF_TRACK_TRACING) console.log('/PROGRAM');
}

export function openRefsOnBeforeBlock(node, parentNode, parentProp, parentBlock) {
  if (REF_TRACK_TRACING) console.group('RTT: BLOCK');
  if (REF_TRACK_TRACING) console.group('RTT: BLOCK:before', parentNode.type, '.', parentProp);

  node.$p.treblo = createTreblo(
    parentBlock.$p.treblo.defined,
    parentBlock.$p.treblo.exitWrites,
    //parentBlock.$p.treblo.exitWritesBefore,
    //parentBlock.$p.treblo.overwritten
  );

  // Special case nodes with multiple block children that depend on each
  // other but where the walker does not visit another node in between
  switch (parentNode.type) {
    case 'TryStatement': {
      if (parentProp === 'block') {
        // Must set the Treblo on the handler and finalizer blocks now. Can't wait.
        openRefsOnBeforeTryBody(node, parentNode, parentProp, parentBlock);
      } else if (parentProp === 'finalizer') {
        openRefsOnBeforeFinallyBody(node, parentNode, parentProp, parentBlock);
      } else {
        console.log('prop:', parentProp)
        ASSERT(false, 'what is this', parentNode.type, parentProp) // ??
      }
      break;
    }

    case 'CatchClause': {
      openRefsOnBeforeCatchBody(node, parentNode, parentProp, parentBlock);

      //// Must handle it here because the block is not visited until after this point
      //// so we can't put the writes in there much earlier than this.
      //// We will delete the temporary reference to the try node which we need, to remove the circular ref.
      //
      //// Set the set of writes of the block as the initial exitWrites, which will be
      //// amended in the block event above with the exitWrites of the _parent_ block.
      //parentBlock.$p.treblo.defined.forEach(name => {
      //  const catchExitWrites = node.$p.treblo.exitWrites.get(name);
      //  const allTryBlockWrites = parentNode.$p.tryNode.block.$p.treblo.writes.get(name);
      //  if (catchExitWrites) {
      //    allTryBlockWrites.forEach(write => catchExitWrites.add(write));
      //  } else if (allTryBlockWrites) {
      //    node.$p.treblo.exitWrites.set(name, new Set(allTryBlockWrites));
      //  }
      //  if (OPEN_REF_TRACING) console.group('catch clause; name: `' + name + '`, added', node.$p.treblo.exitWrites.get(name)?.size??0, 'writes from try-block as the catch-block entryWrites (partial list)');
      //});
      //
      //// Allow dumping ast (cant have circular refs)
      //node.$p.tryNode = '<consumed>';
      break;
    }

    default: {
      if (REF_TRACK_TRACING) console.log('RTT: block:enter,', parentNode.type, 'block @', +node.$p.pid);
      ASSERT(['IfStatement', 'WhileStatement', 'ForInStatement', 'ForOfStatement', 'LabeledStatement', 'FunctionExpression'].includes(parentNode.type), 'expecting normalized code but found an unexpected node', parentNode.type);
    }
  }

  if (REF_TRACK_TRACING) console.groupEnd(); // BLOCK:before
}

export function openRefsOnAfterBlock(node, parentNode, parentProp, loopStack, parentBlock, globallyUniqueLabelRegistry, tryNodeStack, catchStack, finallyStack) {
  if (REF_TRACK_TRACING) console.group('RTT: BLOCK:after', parentNode.type);

  switch (parentNode.type) {
    case 'TryStatement': {
      if (parentProp === 'block') {
        openRefsOnAfterTryBody(node, parentBlock, globallyUniqueLabelRegistry, loopStack, tryNodeStack, catchStack, finallyStack);
      } else if (parentProp === 'finalizer') {
        openRefsOnAfterFinallyBody(node, parentNode, parentProp, globallyUniqueLabelRegistry, loopStack, catchStack, finallyStack);
      } else {
        console.log('prop:', parentProp)
        ASSERT(false, 'what is this', parentNode.type, parentProp) // ??
      }
      break;
    }

    case 'CatchClause': {
      openRefsOnAfterCatchBody(node, parentNode, parentProp, loopStack, tryNodeStack, catchStack, finallyStack);
      break;
    }
  }

  if (REF_TRACK_TRACING) console.groupEnd(); // BLOCK:after
  if (REF_TRACK_TRACING) console.groupEnd(); // BLOCK
  if (REF_TRACK_TRACING) console.log('/BLOCK');
}

export function openRefsOnBeforeIf(node, parentBlock) {
  if (REF_TRACK_TRACING) console.group('RTT: IF,', parentBlock.$p.treblo.defined.size, 'known bindings');
  if (REF_TRACK_TRACING) console.group('RTT: IF:before');

  node.$p.trebra = createTrebra();

  if (REF_TRACK_TRACING) console.groupEnd(); // IF:before
}

export function openRefsOnafterIf(node, parentBlock, walkerPath, globallyUniqueNamingRegistry, globallyUniqueLabelRegistry, loopStack, catchStack, finallyStack) {
  if (REF_TRACK_TRACING) console.group('RTT: IF:after');

  const trebloTrue = node.consequent.$p.treblo;
  const trebloFalse = node.alternate.$p.treblo;

  if (REF_TRACK_TRACING) console.group('RTT: findAndQueueContinuationBlock(consequent)');
  const [continuationBlockTrue, nearestCatchBlockTrue, nearestFinallyBlockTrue] = findAndQueueContinuationBlock(node.consequent, trebloTrue.wasAbrupt, walkerPath, globallyUniqueLabelRegistry, loopStack, catchStack, finallyStack);
  if (REF_TRACK_TRACING) console.groupEnd();
  if (REF_TRACK_TRACING) console.group('RTT: findAndQueueContinuationBlock(alternate)');
  const [continuationBlockFalse, nearestCatchBlockFalse, nearestFinallyBlockFalse] = findAndQueueContinuationBlock(node.alternate, trebloFalse.wasAbrupt, walkerPath, globallyUniqueLabelRegistry, loopStack, catchStack, finallyStack);
  if (REF_TRACK_TRACING) console.groupEnd();

  const wasAbruptTrue = trebloTrue.wasAbrupt?.type;
  const wasAbruptFalse = trebloFalse.wasAbrupt?.type;

  // Now resolve the parent pending. There can't be any loop pending to process after an `if`.

  // Propagate all current exitWrites to the parent.
  // If either branch completed abruptly then exitWrites of the other branch replaces the parent.
  // If both branches overwrote the binding, then the union of both branches replaces the parent.
  // In all other cases the sets are merged with the parent.
  // Since the parent set is only changes if there was an overwrite at all, we just have to look at the
  // union of overwrites. But for that reason we do have to propagate it back to the parent now.

  const parentExitWrites = parentBlock.$p.treblo.exitWrites;
  const parentDefined = parentBlock.$p.treblo.defined;
  if (wasAbruptTrue) {
    // Replace up, regardless
    if (REF_TRACK_TRACING) console.log('RTT: replacing the false branch exitWrites into the parent');

    parentDefined.forEach(name => {
      const set = trebloFalse.exitWrites.get(name);
      if (set?.size) {
        parentExitWrites.set(name, new Set(set));
        parentBlock.$p.treblo.overwritten.add(name);
      }
    });
  } else if (wasAbruptFalse) {
    // Replace up, regardless
    if (REF_TRACK_TRACING) console.log('RTT: replacing the true branch exitWrites into the parent');

    parentDefined.forEach(name => {
      const set = trebloTrue.exitWrites.get(name);
      if (set?.size) {
        parentExitWrites.set(name, new Set(set));
        parentBlock.$p.treblo.overwritten.add(name);
      }
    });
  } else {
    if (REF_TRACK_TRACING) console.log('RTT: merging or replacing the exitWrites into the parent');
    // Merge or replace depends
    parentDefined.forEach(name => {
      const overwrittenTrue = trebloTrue.overwritten.has(name);
      const overwrittenFalse = !overwrittenTrue || trebloFalse.overwritten.has(name); // Must be at least one of them so only .has when the consequent branch did too
      if (REF_TRACK_TRACING) console.log('RTT: -', name, ': overwritten?', overwrittenTrue, overwrittenFalse, ' so verdict:', (overwrittenTrue && overwrittenFalse) ? 'replace' : 'merge');
      if (overwrittenTrue && overwrittenFalse) {
        // Replace
        const set = new Set(trebloTrue.exitWrites.get(name));
        ASSERT(set?.size > 0, 'overwritten so should be set', +node.consequent.$p.pid, +node.alternate.$p.pid);
        trebloFalse.exitWrites.get(name).forEach(write => set.add(write));
        parentBlock.$p.treblo.exitWrites.set(name, set);
        parentBlock.$p.treblo.overwritten.add(name);
      } else {
        // Merge both
        // Note: some of these will be the same as the parent but since it's a Set that should be fine (code is complex enough as is)
        const setTrue = trebloTrue.exitWrites.get(name);
        if (setTrue) {
          parentExitWrites.has(name) ? setTrue.forEach(write => parentExitWrites.get(name).add(write)) : parentExitWrites.set(name, new Set(setTrue));
        }
        const setFalse = trebloFalse.exitWrites.get(name);
        if (setFalse) {
          parentExitWrites.has(name) ? setFalse.forEach(write => parentExitWrites.get(name).add(write)) : parentExitWrites.set(name, new Set(setFalse));
        }
        // Note: while one branch may have overwritten the binding, it wasn't overwritten in both so we're not marking it in parent here
      }

      if (REF_TRACK_TRACING) console.log('RTT:   - parent now has', parentExitWrites.get(name)?.size, 'exitWrites');
    });
  }

  if (REF_TRACK_TRACING) console.log('RTT: propagate entryReads and entryWrites to parent');
  const parentEntryReads = parentBlock.$p.treblo.entryReads;
  const parentEntryWrites = parentBlock.$p.treblo.entryWrites;
  parentDefined.forEach(name => {
    trebloTrue.entryReads.get(name)?.forEach((read) => parentEntryReads.get(name)?.add(read) ?? parentEntryReads.set(name, new Set([read])));
    trebloTrue.entryWrites.get(name)?.forEach((write) => parentEntryWrites.get(name)?.add(write) ?? parentEntryWrites.set(name, new Set([write])));
    trebloFalse.entryReads.get(name)?.forEach((read) => parentEntryReads.get(name)?.add(read) ?? parentEntryReads.set(name, new Set([read])));
    trebloFalse.entryWrites.get(name)?.forEach((write) => parentEntryWrites.get(name)?.add(write) ?? parentEntryWrites.set(name, new Set([write])));
  });

  // The parent block should now have an updated exitWrites set for each of its bindings

  if (REF_TRACK_TRACING) console.groupEnd(); // IF:after
  if (REF_TRACK_TRACING) console.groupEnd(); // IF
  if (REF_TRACK_TRACING) console.log('/IF');
}

export function openRefsOnBeforeLoop(kind /*: loop | in | of */, node, parentBlock) {
  if (REF_TRACK_TRACING) console.group('RTT: LOOP,', kind);
  if (REF_TRACK_TRACING) console.group('RTT: LOOP:before,', kind, ', has', parentBlock.$p.treblo.defined.size, 'known bindings');

  node.$p.trebra = createTrebra();

  if (REF_TRACK_TRACING) console.groupEnd(); // LOOP:before
}

export function openRefsOnAfterLoop(kind /* loop | in | of */, node, parentBlock, walkerPath, globallyUniqueLabelRegistry, loopStack, tryNodeStack, catchStack, finallyStack) {
  if (REF_TRACK_TRACING) console.group('RTT: LOOP:after,', kind, 'after @', +node.$p.pid);

  /** @var {Treblo} */
  const treblo = node.body.$p.treblo;

  const [continuationBlock, nearestCatchBlock, nearestFinallyBlock] = findAndQueueContinuationBlock(node.body, treblo.wasAbrupt, walkerPath, globallyUniqueLabelRegistry, loopStack, catchStack, finallyStack);
  if (REF_TRACK_TRACING) {
    console.log(
      'RTT: the loop block', !treblo.wasAbrupt ? 'implicitly loops' : continuationBlock ? `continues in block @${continuationBlock.$p.pid}` : `does not naturally continue or break (abrupt=${treblo.wasAbrupt?.type})`,
      nearestCatchBlock ? `Flow might be caught by catch block @${nearestCatchBlock.$p.pid}` : '',
      nearestFinallyBlock ? `Flow is forced to go through @${nearestFinallyBlock.$p.pid} first, regardless` : ''
    );
  }

  // Keep in mind: we assume normalized code, so all while loops are while(true) and all for-loops don't introduce a new binding


  const parentTreblo = parentBlock.$p.treblo;
  const parentExitWrites = parentTreblo.exitWrites;
  const parentDefined = parentTreblo.defined;

  const parentEntryReads = parentBlock.$p.treblo.entryReads;
  const parentEntryWrites = parentBlock.$p.treblo.entryWrites;


  // Connect the end of the loop to the start
  // Do this first because it also updates the overwritten of nodes that break to or through this node, which is necessary info to process any that break to here.

  const loopingFrom = node.body.$p.treblo.pendingLoop;
  if (REF_TRACK_TRACING) console.group('TTR: Loop Queue has', loopingFrom.length, `blocks that jump to repeat the loop (from ${loopingFrom.map(({src, dst}) => `@${src.$p.pid}->@${dst.$p.pid}`)}). Processing`, parentDefined.size, 'bindings that were known in the parent.');
  parentDefined.forEach(name => {
    if (REF_TRACK_TRACING) console.log(`TTR: - \`${name}\`: Loop body has ${node.body.$p.treblo.entryReads.get(name)?.size??0} entryReads and ${node.body.$p.treblo.entryWrites.get(name)?.size??0} entryWrites`);

    loopingFrom.forEach(({src: fromBlock}) => {
      const exitWrites = fromBlock.$p.treblo.exitWrites.get(name);
      if (REF_TRACK_TRACING) console.log('TTR:   - from @', +fromBlock.$p.pid, 'has', exitWrites?.size || 0, 'exitWrites');

      // Connect exitWrites of the source node to entryReads and entryWrites of the loop body
      exitWrites?.forEach(write => {
        node.body.$p.treblo.entryReads.get(name)?.forEach(read => {
          if (REF_TRACK_TRACING) console.log('TTR: Loop entryRead @', +read.node.$p.pid, 'can read the last write to the binding @', +write.node.$p.pid);
          write.reachedByReads.add(read);
          read.reachesWrites.add(write);
        });
        node.body.$p.treblo.entryWrites.get(name)?.forEach(write2 => {
          if (REF_TRACK_TRACING) console.log('TTR: Loop entryWrite @', +write2.node.$p.pid, 'can overwrite the last write to the binding @', +write.node.$p.pid);
          write.reachedByWrites.add(write2);
          write2.reachesWrites.add(write);
        });
        if (REF_TRACK_TRACING) console.group(`TTR: Adding the ${node.body.$p.treblo.overwritten.size} overwritten names of the loop end to the ${node.$p.trebra.pendingOverwrittens.length} queued blocks`);
        node.$p.trebra.pendingOverwrittens.forEach(fromBlock => {
          node.body.$p.treblo.exitWrites.get(name)?.forEach(write => {
            if (fromBlock.$p.treblo.overwritten.has(name)) {
              if (REF_TRACK_TRACING) console.log(`TTR: - NOT adding write @${write.node.$p.pid} for "${name}" to exitWrites of @${fromBlock.$p.pid} because it was already overwritten so the current exitWrite(s) should be the correct one`);
            } else {
              if (REF_TRACK_TRACING) console.log(`TTR: - Adding write @${write.node.$p.pid} for "${name}" to exitWrites of @${fromBlock.$p.pid} (because of loop)`);
              fromBlock.$p.treblo.exitWrites.get(name)?.add(write) ?? fromBlock.$p.treblo.exitWrites.set(name, new Set([write]));
            }
          });
          node.body.$p.treblo.overwritten.forEach(name => {
            if (REF_TRACK_TRACING) console.log(`TTR: - Marking "${name}" as overwritten in queued block @${fromBlock.$p.pid}`);
            fromBlock.$p.treblo.overwritten.add(name);
          });
        });
        if (REF_TRACK_TRACING) console.groupEnd();
      });
    })
  });
  if (REF_TRACK_TRACING) console.groupEnd();

  if (REF_TRACK_TRACING) console.group('RTT: propagate entryReads and entryWrites from looping nodes to parent');
  loopingFrom.forEach(({src: fromBlock}) => {
    parentDefined.forEach(name => {
      fromBlock.$p.treblo.entryReads.get(name)?.forEach((read) => parentEntryReads.get(name)?.add(read) ?? parentEntryReads.set(name, new Set([read])));
      fromBlock.$p.treblo.entryWrites.get(name)?.forEach((write) => parentEntryWrites.get(name)?.add(write) ?? parentEntryWrites.set(name, new Set([write])));
    });
  })
  if (REF_TRACK_TRACING) console.groupEnd();








  // Propagate all current exitWrites to the parent.
  // If neither branch completed abruptly and both branches overwrote the binding, then the union of both
  // branches replaces the parent exitWrites. In all other cases the sets are merged with the parent.
  // Since the parent set is only changes if there was an overwrite at all, we just have to look at the
  // union of overwrites. But for that reason we do have to propagate it back to the parent now.


  // This is for break. And any node that breaks here with a label. Not sure if there are other ways for a node to be scheduled here.
  const pendingNext = parentTreblo.pendingNext;
  if (REF_TRACK_TRACING) console.group('TTR: Next Queue has', pendingNext.length, `nodes that continue after the loop (from ${pendingNext.map(({src, dst}) => `@${src.$p.pid}->@${dst.$p.pid}`)}). Processing`, parentDefined.size, 'bindings that were known in the parent.');
  if (pendingNext.length === 0) {
    if (REF_TRACK_TRACING) console.log('TTR: is this an infinite loop?? Will pretend the loop leads to a break but should probably eliminate the tail as dead code...');
    pendingNext.push({src: node.body, dst: node.body, overwrittens: new Set(node.body.$p.treblo.overwritten)});
  }
  parentDefined.forEach(name => {
    // Note: above names are added when _any_ next node overwrites it. Here we want to know if they _all_ do it.
    // If the loop is (probably) infinite then always replace parent exitWrites with what happens in the loop
    // TODO: probably should consider the rest dead code...
    const replace = pendingNext.every(({overwrittens}) => overwrittens.has(name));
    const newSet = !replace ? parentExitWrites.get(name) || new Set : new Set;
    pendingNext.forEach(({src: fromNode}) => {
      //console.log('pendingNext fromNode @', fromNode.$p.pid, ' has these exitWrites for x:', Array.from(fromNode.$p.treblo.exitWrites.get('x'))?.map(w => `@${w.node.$p.pid}`));
      fromNode.$p.treblo.exitWrites.get(name)?.forEach(write => newSet.add(write))
    });
    if (replace) {
      if (REF_TRACK_TRACING) console.log('TTR: -', name, 'was overwritten in all src nodes so exitWrites get replaced, becomes:', newSet.size, Array.from(newSet).map(w => w.node.$p.pid));
      parentExitWrites.set(name, newSet);
      parentTreblo.overwritten.add(name);
    } else {
      if (REF_TRACK_TRACING) console.log('TTR: -', name, 'was not overwritten in all src nodes so exitWrites is amended, becomes:', newSet.size, Array.from(newSet).map(w => w.node.$p.pid));
    }
  });
  if (REF_TRACK_TRACING) console.groupEnd();

  if (REF_TRACK_TRACING) console.log('RTT: propagate entryReads and entryWrites from next nodes to parent iif the binding was known there');
  pendingNext.forEach(({src: fromBlock}) => {
    parentDefined.forEach(name => {
      fromBlock.$p.treblo.entryReads.get(name)?.forEach((read) => parentEntryReads.get(name)?.add(read) ?? parentEntryReads.set(name, new Set([read])));
      fromBlock.$p.treblo.entryWrites.get(name)?.forEach((write) => parentEntryWrites.get(name)?.add(write) ?? parentEntryWrites.set(name, new Set([write])));
    });
  });

  // The parent block should now have an updated exitWrites set for each of its bindings

  if (REF_TRACK_TRACING) console.groupEnd(); // LOOP:after
  if (REF_TRACK_TRACING) console.groupEnd(); // LOOP
  if (REF_TRACK_TRACING) console.log('/LOOP');
}

function findAndQueueContinuationBlock(fromBlock, wasAbrupt, walkerPath, globallyUniqueLabelRegistry, loopStack, catchStack, finallyStack) {
  // Find the "parentBlock" of the statement that's executed _after_ each block.
  // This is the one we need to update, break, continue, or not abrupt at all.
  // Return null if there's no need to update anything due to a `return`
  // There may be multiple, like
  //     try { a; b } catch { x } y
  // after `a` it can continue to `b` or throw and continue `x-into-y` (worst case).
  // And if there's only some `finally` nodes then flow still returns back to the original.
  // This is exacerbated by nested traps. Or like nested finally - catch - finally - aaaaaaah
  // An edge case but an important one for ref tracking (even for non-closured vars)

  // First get the original target without checking for catch/finally
  // because regardless of anything else, that's a valid code path.
  // The given node is the parent block where code flow continues. The index is the statement.
  // If the index overflows then it continues in its parent, but we can ignore that here.
  // If the node is null then the code continues in an outer scope and we can ignore it here.
  let continuationBlock = findSimpleContinuationBlock(wasAbrupt, walkerPath, globallyUniqueLabelRegistry, loopStack);



  // We first have to find the nearest catch and finally handlers because if there is a finally
  // handler between the current node and the continuation block then it will be executed
  // before control returns to the continuation block. So in that case we don't schedule
  // the continuation yet. The finally leave walker event will have to do this.


  // For finally we need to keep track of the target block node where code will continue, unless
  // the finally overrides it (by an abrupt completion that leaves the handler block).
  // This is not true for the Catch block, because that may or may not trigger and is an extra
  // path to compute, rather than a forced solo path like with `finally`.
  // The catch block, unless abrupt completed itself and/or trapped by a finally, will continue
  // with whatever node follows the parent TryStatement node, regardless of the original target.
  // We only need the _nearest_ catch and finally as we only want the continuation node here and
  // code flow never skips a catch or finally "layer".

  // Complexity arises from something like
  //    let x; try { try { a } finally { x = 1 } } finally { x = 2 } x
  // in this case the exitWrite of the outer finally can reach the inner and the final read
  // can always and ever only see `2` (well, assuming the assignment can't fail).
  // Alternates:
  //    function f() { let x; try { try { a } finally { x = 1; return x; } } finally { x = 2 } x }
  // (Now the second finally is still visited but the returned value is 1)
  //    function f() { let x; try { try { a } finally { x = 1; return () => x; } } finally { x = 2 } x } f()();
  // (Now the closure should return 2)
  // But point is, the exitWrites of a connect to the first finally, not the second
  //    let x; try { try { a } finally { $(x); x = b } } finally { $(x); x = c } x
  // So the entryReads of the first finally will observe a, the second finally observes b, and the outer read observes c.
  // Abrupt completions inside the finally do mean wrapper finally blocks don't get connected
  // anymore so we can't just add them to the list. But they could be. I guess for that reason
  // we add the continuation nodes to the finally node and once we've processed it, we propagate
  // that forward to the next layer if it doesn't complete abruptly.
  // But that means that we should add the continuation node to the finally now, even the first.
  // Not so for the catch since any code hitting that block will divert to continue after the parent Try.
  // The twist for finally is that it can connect exitWrites with entryReads and entryWrites
  // depending on how it entered the finally.
  //    let x; try { x = 1 } finally { } x;
  // Now the last read can only observe the try write
  //    let x; try { x = 1 } finally { x } x;
  // Same, the try write is only observed more
  //    let x; try { x = 1 } finally { x = 1 } x;
  // Now the read can only observe the finally writes
  //    let x; try { if ($) { x = 1 } else { x = 2 } } finally { x = 3 } x;
  // Here, x is always 3
  //    let x; try { if ($) { x = 1 } else { x = 2 } } finally { if ($) x = 3 } x;
  // But here x is 1 2 or 3.

  // Wires can cross. From try block break to label, from catch block break to other label.
  //    let x; A: {  B: { try { if ($) { x = 1; break A; } else { x = 2; break B; } } finally { $(x) } } $('c', x) } $('d', x);
  // If $ is truthy then c isn't even visited and finally and d observe 1. Else, finally and c and d observe 1.
  //    let x; A: {  B: { try { if ($) { x = 1; break A; } else { x = 2; break B; } } finally { x = 3; } } $('c', x) } $('d', x);
  // This just hooks up c and d to both read the finally value, regardless
  //    let x; A: {  B: { try { if ($) { x = 1; break A; } else { x = 2; break B; } } finally { $(x) } } $('c', x); x = 4; } $('d', x);
  // Now the c write can only overwrite the B and not the A write.
  // This proof shows why we must remember both the origin and the target on finally nodes for the sake of connecting exit with entry.
  // This is only relevant if exitWrites pass through the finally (not overwritten) but it is relevant.
  //    let x; A: {  B: { try { if ($) { x = 1; break A; } else { x = 2; break B; } } finally { x = 3 } } $('c', x); x = 4; } $('d', x);
  // Writes in the finally are only overwritten if any node that continues into it end up in c, which is not guaranteed.
  //    let x; A: {  B: { try { try { if ($) { x = 1; break A; } else { x = 2; break B; } } finally { x = 3 } } catch { $(x) } x = 6 } $('c', x); x = 4; } $('d', x);
  // Worse; with double finally, you have to propagate those sets of entry/exit per continuation node. But then the catch hits and
  // you have to assume it may go there, and the set of exitWrites are all observable to x=6?
  // And if x=6 wasn't a write then all become visible to to x=4 as well. So the catch wrapper does change that logic.
  // If it's catch finally finally catch then we have to defer propagation of the finally
  // and still consider catch wrappers in every finally step. Maybe even catch steps too?
  //    let x; A: {  B: { try { try { try { if ($) { x=1; break A; } x=2; break B } catch { x } finally { x } } finally { x } catch { $(x) } x = 6 } $('c', x); x = 4; } $('d', x);
  // The outer catch can observe 1 and 2, regardless. By extension, so does x=4.
  // Without that catch clause, x=4 can only observe 1. Of course, the catch can "skip" over some nodes. That'll apply naturally.
  // This is why we must queue and process nodes individually

  // Every finally block must first determine its own entryReads/entryWrites/exitWrites.
  // Every continuation node that goes through the finally will have its own final
  // set of entryReads/entryWrites/exitWrites and propagates that forward to either the
  // next finally, a wrapper catch, or the target continuation node.
  // If there's a wrapper catch then that connects to all exitWrites of the finally, of all continuation nodes combined.

  // If there is no continuation block (return/throw) then target the nearest function boundary instead



  // Code may also loop if not abrupt and fromBlock is body of a loop (checked later)
  let loops = wasAbrupt?.type === 'ContinueStatement';

  const nodes = walkerPath.nodes;
  const top = nodes.length - 1;

  // We passed a catch if we see a TryStatement that has a catch block (so not if it only has a finally block)
  let nearestCatchBlock = false;
  // We passed a finally if we either see a TryStatement with a finally block or a catch block with a finally block
  let nearestFinallyBlock = false;

  // If code doesn't abrupt then it can't go through a trap and we can skip this search
  if (wasAbrupt) {
    if (REF_TRACK_TRACING) console.group(`TTR: Was abrupt (${wasAbrupt.type}). Searching for nearest catch and/or finally traps between fromBlock @${fromBlock.$p?.pid} and target ${continuationBlock ? `@${continuationBlock.$p?.pid}` : 'nearest function boundary'}`, 'queuing overwrites in loops');

    let index = top;
    while (continuationBlock ? nodes[index] !== continuationBlock : (nodes[index].type !== 'FunctionDeclaration' && nodes[index].type !== 'Program')) {
      const node = nodes[index];
      if (REF_TRACK_TRACING) console.group(`TTR: depth: ${index}, type=${node.type}, @${node.$p.pid}`);

      if (node.type === 'WhileStatement' || node.type === 'ForInStatement' || node.type === 'ForOfStatement') {
        if (REF_TRACK_TRACING) console.log('TTR: Adding the overwrittens from @', +fromBlock.$p.pid, 'to the loop of @', +node.$p.pid, 'to update later');
        node.$p.trebra.pendingOverwrittens.push(fromBlock);
      }
      else if (node.type === 'BlockStatement') {
        //     TryStatement { block, handler: CatchClause { body }, finalizer }
        // Note: being in a TryStatement block doesn't mean anything because, for example, if we
        // just came through a finally handler block then that won't trap anything in itself. That's
        // why we have to check the parent of the Block instead.

        // If catch clause, check if it has a `finally` sibling. In that case we have now passed through a finally barrier.
        if (!nearestFinallyBlock && nodes[index-1].type === 'CatchClause' && nodes[index-2].finalizer) {
          // This is the catch block and it is trapped by a finally block
          // Note that this also supersedes a catch handler, so we won't search for that one anymore either
          nearestFinallyBlock = nodes[index-2].finalizer;
        }
        // Note: if we have passed through a finally handler then a catch block further away can't trap it before that. Hence the extra check.
        else if (!nearestFinallyBlock && nodes[index-1].type === 'TryStatement' && nodes[index-1].block === node) {
          // This is the try block and it will be trapped by a catch and/or a finally block
          if (!nearestCatchBlock && !nearestFinallyBlock && node.handler) nearestCatchBlock = node.handler.body;
          if (!nearestFinallyBlock && node.finalizer) nearestFinallyBlock = node.finalizer;
        }
      }
      if (REF_TRACK_TRACING) console.groupEnd();

      --index;
      ASSERT(index >= 0, 'continuation block must be in the current list of parent nodes, or if there was none then a nearest function/program must be found');
    }

    if (REF_TRACK_TRACING) console.groupEnd();
  } else {
    if (REF_TRACK_TRACING) console.log(`TTR: Was not abrupt so cant go through catch/finally trap`);
  }

  if (!continuationBlock && (nearestFinallyBlock || nearestCatchBlock)) {
    TODO
    //   For the next section we need to target the parent of the catch or the finally, whichever is further away, because we still need to discover
    //   whether bindings were overwritten
  }

  // If we found a finally then the continuation node must go there first so we clear it
  if (nearestFinallyBlock) {
    vlog('Since there was a finally handler between the current and the continuation node, code must continue in that handler first. Clearing the continuation node.');
    TODO
    // same todo as above; we still need to discover the next part for finally and catch
    continuationBlock = undefined;
  }

  // For each binding we must now determine whether the binding was (fully) overwritten anywhere between the current
  // node and the continuation Block. Same for catch and finally blocks, if any. But those must be within the
  // range of the current and continuation nodes so it can be done in the same pass.

  // The reason for this pass is that the continuation is "scheduled" to be processed when the walker leaves the target
  // node. For a labeled break/continue and catch/finally this usually crosses multiple blocks. Each of those will
  // have a treblo.overwritten set but that set is for that block only. So when scheduling the upward propagation
  // of exitWrites, it's impossible to tell whether a binding was fully overwritten anywhere between the abrupt
  // completion and its continuation block. Unless we do this here now.
  // Consider the code example:
  //     let x = 1; while (true) { x = 2; if ($a) if ($b) { break; } } $(x)
  // In this case the Block containing the break does have the exitWrite of x=2 but the Block itself has an empty
  // treblo.overwritten set. And since we're crossing an arbitrary amount of nodes, we can't really do something
  // like "the set of all overwrittens in any parent so far" because that would only work if you went all the way
  // back up to the Block that defined the binding. More often than not, not the case.

  // The bad news: this is a bit expensive. For each binding that was known at the continuation block we must check
  // whether it was .overwritten before reaching the first catch, finally, and the continuation block.

  // We can prune bindings that are constants and bindings that are known to be closures.
  const overwrittens = new Map;

  if (!wasAbrupt && ['WhileStatement', 'ForInStatement', 'ForOfStatement'].includes(walkerPath.nodes[top].type)) {
    loops = true;
    if (REF_TRACK_TRACING) console.log(`TTR: special case implicit loop continue overwritten check, using this set:`, continuationBlock.$p.treblo.overwritten);
    // This was an implicit end of a loop so it continues. This is an exception case where the walker goes back down
    // in the AST, rather than up (which is the case for all other code flow changes). So we special case it.
    // Since this can't break through a catch or finally trap, we can safely check the overwritten state for
    // the same body.
    continuationBlock.$p.treblo.defined.forEach(name => {
      const status = {
        dst: false, // .overwritten between node and continuation block?
        cat: false, // .overwritten between node and nearest catch? (if any)
        fin: false, // .overwritten between node and nearest finally? (if any)
      };
      overwrittens.set(name, status);
      if (continuationBlock.$p.treblo.overwritten.has(name)) {
        status.dst = true;
      }
    });
  } else {
    continuationBlock.$p.treblo.defined.forEach(name => {
      // TODO: use global registry to prune constants and closures

      const status = {
        dst: false, // .overwritten between node and continuation block?
        cat: false, // .overwritten between node and nearest catch? (if any)
        fin: false, // .overwritten between node and nearest finally? (if any)
      };
      overwrittens.set(name, status);

      let index = top;
      // We passed a catch if we see a TryStatement that has a catch block (so not if it only has a finally block)
      let passedCatch = false;
      // We passed a finally if we either see a TryStatement with a finally block or a catch block with a finally block
      let passedFinally = false;
      while (nodes[index] !== continuationBlock) {
        const node = nodes[index];
        if (node.type === 'BlockStatement') {
          if (node.$p.treblo.overwritten.has(name)) {
            status.dst = true;
            if (!passedCatch) status.cat = true;
            if (!passedFinally) status.fin = true;
            break; // We have all the info we need
          }

          //     TryStatement { block, handler: CatchClause { body }, finalizer }
          // Note: being in a TryStatement block doesn't mean anything because, for example, if we
          // just came through a finally handler block then that won't trap anything in itself. That's
          // why we have to check the parent of the Block instead.

          // If catch clause, check if it has a `finally` sibling. In that case we have now passed through a finally barrier.
          if (!passedFinally && nodes[index-1].type === 'CatchClause' && nodes[index-2].finalizer) {
            // This is the catch block and it is trapped by a finally block
            passedFinally = true;
            passedCatch = true;
          }
          // If we passed a finally then we don't care about catch anymore
          else if (!passedFinally && nodes[index-1].type === 'TryStatement' && nodes[index-1].block === node) {
            // This is the try block and it will be trapped by a catch and/or a finally block
            if (!passedCatch && !passedFinally && node.handler) passedCatch = true;
            if (!passedFinally && node.finalizer) {
              passedFinally = true;
              // Since a finally catches it first, an outer catch handler won't be able to catch it before the finally triggers.
              passedCatch = true;
            }
          }
        }

        --index;
        ASSERT(index >= 0, 'continuation block must be in the current list of parent nodes');
      }
    });
  }



  if (nearestCatchBlock) {
    TODO
    nearestCatchBlock.$p.treblo.trappedToStartHere.push({src: fromBlock, dst: continuationBlock, overwrittens});
  }
  if (nearestFinallyBlock) {
    TODO
    nearestFinallyBlock.$p.treblo.trappedToStartHere.push({src: fromBlock, dst: continuationBlock, overwrittens});
  }
  if (continuationBlock) {
    if (loops) {
      continuationBlock.$p.treblo.pendingLoop.push({src: fromBlock, dst: continuationBlock, overwrittens});
    } else {
      continuationBlock.$p.treblo.pendingNext.push({src: fromBlock, dst: continuationBlock, overwrittens});
    }
  }

  return [continuationBlock, nearestCatchBlock, nearestFinallyBlock];
}
function findSimpleContinuationBlock(wasAbrupt, walkerPath, globallyUniqueLabelRegistry, loopStack) {
  if (!wasAbrupt) {
    // Find nearest Block
    // If we're currently leaving a Block, then
    // - If it's the child of a loop, that Block already is the continuation Block
    // - If it's the child of a Function, we don't care
    // - Anything else, the next nearest Block is the continuation Block
    // Anything else, that's the continuation Block

    let index = walkerPath.nodes.length - 1;

    if (walkerPath.nodes[index].type !== 'BlockStatement') {
      // We are starting in a Block then it depends on the parent
      switch (walkerPath.nodes[index].type) {
        case 'Program': {
          TODO
          if (REF_TRACK_TRACING) console.log(`TTR: leaving the root node, end of the line`);
          return undefined;
        }
        case 'FunctionDeclaration': {
          // This is where we stop for this analysis.
          TODO
          if (REF_TRACK_TRACING) console.log(`TTR: leaving a block with function as parent so continuationBlock will be undefined`);
          return undefined;
        }
        case 'WhileStatement':
        case 'ForInStatement':
        case 'ForOfStatement': {
          // Code logic continues with the body of the loop. So of the current Block.
          if (REF_TRACK_TRACING) console.log(`TTR: leaving a block with loop as parent so actually continuationBlock is same block (@${walkerPath.nodes[index].body.$p.pid})`);
          return walkerPath.nodes[index].body;
        }
      }
    }

    while (walkerPath.nodes[--index].type !== 'BlockStatement' && walkerPath.nodes[index].type !== 'Program') {
      // Keep searching. It must be there. Or the loop condition will eventually crash. That'd be a bad thing.
    }

    return walkerPath.nodes[index];
  }

  // See findContinuationBlock.
  // This func ignores the existence of catch and finally concepts.
  if (wasAbrupt.type === 'BreakStatement') {
    // code continues _after_ the node (next index in the parent block)
    if (wasAbrupt.label) {
      const labelNode = globallyUniqueLabelRegistry.get(wasAbrupt.label.name).node;
      let index = walkerPath.nodes.length - 1;
      while (walkerPath.nodes[index] !== labelNode) {
        --index;
        ASSERT(index >= 0, 'the label must be in the current node path otherwise the parser would throw up on the input code', index);
      }
      ASSERT(index > 0, 'the label must not be the root node because that is Program', index);
      // Note: parent node must be a block of some kind (only valid parent of label statements)
      const parentBlock = walkerPath.nodes[index - 1];
      // Note: parent node index is one further than prop index and index index
      const parentIndex = walkerPath.indexes[index];
      // The break continues code execution _after_ the label statement so on the next index (or otherwise its parent)
      return parentBlock;
    } else {
      const loopNode = loopStack[loopStack.length - 1];
      let top = walkerPath.nodes.length - 1;
      //console.log('loopStack:', loopStack)
      //console.log('top is', walkerPath.nodes[top], 'node is', loopNode)
      while (walkerPath.nodes[top] !== loopNode) {
        --top;
        ASSERT(top >= 0, 'the loop must be in the current node path otherwise the parser would throw up on the input code', top);
      }
      ASSERT(top > 0, 'the loop must not be the root node because its parent must be a block or label', top);
      // Note: parent node must be a block of some kind or a labeled statement
      const parentBlock = walkerPath.nodes[top - 1];
      if (parentBlock.type === 'LabeledStatement') {
        // In that case go one more node up the path
        const blockParentNode = walkerPath.nodes[top - 2];
        return blockParentNode;
      } else {
        // The break continues code execution _after_ the target loop statement so on the next index (or otherwise its parent)
        return parentBlock;
      }
    }
  }
  else if (wasAbrupt.type === 'ContinueStatement') {
    vlog('TODO: eliminate continue');
    // code continues _with_ the node (same index in the parent block)
    if (wasAbrupt.label) {
      // We can return the label statement since that's essentially the same
      // TODO: we need to parent block tho
      const labelNode = globallyUniqueLabelRegistry.get(wasAbrupt.label.name).node;
      ASSERT(['WhileStatement', 'ForInStatement', 'ForOfStatement'].includes(labelNode.body.type), 'if continue can syntactically target a label then it must have a while as body');
      ASSERT(labelNode.body.body.type === 'BlockStatement', 'and this is its body');
      return labelNode.body.body;
    } else {
      // Nearest loop, then that body
      return loopStack[loopStack.length - 1].body;
    }
  }
  else if (wasAbrupt.type === 'ReturnStatement') {
    // Code does not continue but may still traverse through one or
    // more finally blocks (which we explicitly ignore here)
    TODO
    return undefined;
  }
  else if (wasAbrupt.type === 'ThrowStatement') {
    // Code does not continue unless caught.
    // So worst case it is caught so we point at the nearest catch
    // if there is one in the same function. In all other cases we
    // consider "none" because this is only in the context of ref
    // tracking for non-closured bindings. So we don't care if the
    // throw ends up getting caught by an outer scope.
    // However, in this case we explicitly ignore the existence
    // of the `catch` mechanic, and so we defer to the fallback
    // of "none". (The parent function will add the catch/finally
    // nodes if there are any, and assume that worst case code
    // actually does continue after the catch block, too).
    TODO
    return undefined;
  }
  else {
    ASSERT(false, 'should be one of these cases');
  }

  ASSERT(false, 'unreachable');
}

export function openRefsOnBeforeBreak(node, blockStack) {
  if (REF_TRACK_TRACING) console.group('RTT: BREAK');
  if (REF_TRACK_TRACING) console.group('RTT: BREAK:before');

  blockStack[blockStack.length - 1].$p.treblo.wasAbrupt = node;

  if (REF_TRACK_TRACING) console.groupEnd(); // BREAK:before
}

export function openRefsOnAfterBreak(node, blockStack) {
  if (REF_TRACK_TRACING) console.group('RTT: BREAK:after');

  if (REF_TRACK_TRACING) console.groupEnd(); // BREAK:after
  if (REF_TRACK_TRACING) console.groupEnd(); // BREAK
}

export function openRefsOnBeforeContinue(node, blockStack) {
  if (REF_TRACK_TRACING) console.group('RTT: CONTINUE:before');

  blockStack[blockStack.length - 1].$p.treblo.wasAbrupt = node;

  if (REF_TRACK_TRACING) console.groupEnd(); // CONTINUE:after
  if (REF_TRACK_TRACING) console.groupEnd(); // CONTINUE
}

export function openRefsOnAfterContinue(node, blockStack) {
  if (REF_TRACK_TRACING) console.group('RTT: CONTINUE:after');

  if (REF_TRACK_TRACING) console.groupEnd(); // CONTINUE:after
  if (REF_TRACK_TRACING) console.groupEnd(); // CONTINUE
}

export function openRefsOnBeforeReturn(blockStack, node) {
  if (REF_TRACK_TRACING) console.group('RTT: RETURN');
  if (REF_TRACK_TRACING) console.group('RTT: RETURN:before');

  blockStack[blockStack.length - 1].$p.treblo.wasAbrupt = node;

  if (REF_TRACK_TRACING) console.groupEnd(); // RETURN:before
}

export function openRefsOnAfterReturn(blockStack, node) {
  if (REF_TRACK_TRACING) console.group('RTT: RETURN:after');

  if (REF_TRACK_TRACING) console.groupEnd(); // RETURN:after
  if (REF_TRACK_TRACING) console.groupEnd(); // RETURN
}

export function openRefsOnBeforeThrow(blockStack, node) {
  if (REF_TRACK_TRACING) console.group('RTT: THROW');
  if (REF_TRACK_TRACING) console.group('RTT: THROW:before');

  blockStack[blockStack.length - 1].$p.treblo.wasAbrupt = node;

  if (REF_TRACK_TRACING) console.groupEnd(); // THROW:before
}

export function openRefsOnAfterThrow(blockStack, node) {
  if (REF_TRACK_TRACING) console.group('RTT: THROW:after');

  if (REF_TRACK_TRACING) console.groupEnd(); // THROW:before
  if (REF_TRACK_TRACING) console.groupEnd(); // THROW
}

export function openRefsOnBeforeTryNode(node, parentBlock) {
  // (Root node, versus the body/catch/finally body)

  if (REF_TRACK_TRACING) console.group('RTT: TRY');
  if (REF_TRACK_TRACING) console.group('RTT: TRY:before,', parentBlock.$p.treblo.defined.size, 'known bindings before the `try`');

  // Every step of the way may be observed by a catch or a finally. Kind of annoying.

  //node.$p.openRefsT = createTrebra();

  // Note: handler/finalizer not yet visited so no $p yet
  //if (node.handler) node.handler.$p.openRefsT = createTrebra();
  //if (node.finalizer) node.finalizer.$p.openRefsT = createTrebra();

  if (REF_TRACK_TRACING) console.groupEnd(); // TRY:before
}

export function openRefsOnAfterTryNode(node, parentBlock, globallyUniqueLabelRegistry, loopStack) {
  // (Root node, versus the body/catch/finally body)
  if (REF_TRACK_TRACING) console.group('RTT: TRY:after');

  ///** @var {Treblo} */
  //const treblo = node.body.$p.treblo;

  // Note: this handler is for the entire node. There are separate handlers to deal with catch:before and finally:before

  // TODO: `let x = 1; abc: try { break abc; } finally { x = 2; } $(x);`. The last read can't reach 1 at all.
  // TODO: `let x = 1; abc: try { fail; break abc; } catch { x = 2; } $(x);`. The last read can't reach 1 at all. But we can't statically determine this. So it should at least reach 2, as well.


  // TODO: a break trapped by a finally still continues to the break target afterwards (the finally does override it if it would)
  // TODO: `foo: { let x = 1; abc: try { break foo; } finally { x = 2; } $(x); x = 3; } $(x);` x can be 1 or 2 but not 3. we can cover this.

  // Als een break door een finally gaat, komt ie daarna alsnog uit bij zn target label
  // - finally body krijgt exitWrites
  // - target label krijgt de exitWrites die daarna overblijven, eigenlijk alsof
  //   try { x; break } finally { y; }
  //   { { x; } y; } break;
  //   dus alsof de try/catch body een nested block is met de abrupt exit achter
  //   de finally aan geplakt. maar dan voor alle branches.
  //   dus voor alle exits in de try en catch moeten we een route laten lopen
  //   door de finally. hetzelfde voor de block en catch denk ik.
  //   Hoe dan met een break door meerdere finally lagen?
  //   foo: { try { try { X; break foo; } finally { A } } finally { B } }
  //   foo: { { { X; } A } B break foo; }
  //   So when finding the continuation target, make sure to visit finally stack
  //   and resolve them first. Probably by adding a queue on each finally node
  //   and for each element in it, post-resolving it, then populating the queue
  //   on the continuation node (or next finally layer, if it breaks through
  //   another one).



  // ok dus, bij zoeken continuation node eerst in queue van finally.
  // als die bezocht wordt dan doorgaan naar volgende.
  // entryReads, entryWrites, exitWrites van de finally kunnen telkens opnieuw
  // applied worden denk ik? maar dan moet je wel de beginsituatie weten. die kunnen we cachen voor de finally.
  // hoe dan met de catch? die is niet gegarandeerd maar heeft wel dezelfde gevolgen
  //    x = 1; try { fail(); x = 2; } catch { x = 3 } $(x);
  // hier is x=2 niet observable maar dat weten we niet. daarintegen is x=3 gegarandeerd
  // de enige waarde die uiteindelijk gelezen wordt maar ook dat weten we niet. dus we
  // moeten tot de situatie komen dat x = 1, x = 2, of x = 3. en dat we het niet weten.
  // tdz is trappable dus x=1 moeten we ook houden.
  // Een break/etc gaat niet eerst door een catch dus daarom is dit niet nodig
  // voor een catch, alleen finally.
  // de finally krijgt alle entry state plus alle reads/writes van de try en de catch
  // als entry read/writes. maar abrupts moeten zorgen voor hun eigen stack van refs.


  // try {A} catch {B} finally {C}
  // { try {A} catch {try {B} catch {}} C }



  // foo: { X; try {break foo} catch {B} finally {C} Y }
  // foo: { X; { try {break foo} catch {try {B} catch {}} C } Y }


  // Consolidate the try.body block, try.handler.block, and try.finalizer block

  // Note that the catch block entryReads and entryWrites can reach all writes
  // inside the try.body and all entryWrites of the `try` node. They do not
  // replace the exit writes for the whole try node because it's not guaranteed
  // to be visited but worst case it might be so it amends them instead.

  // The finally block has access to all writes in the try block and handler.
  // It does modify the exit writes since it's guaranteed to always be visited.

  // Find the "parentBlock" of the `try` statement.
  // The body and handler block of the try will continue in the finally, if it
  // exists, and otherwise the node after the try node.
  // The finally block continues after the try node.

  // The node to goven where the `try` node continues is;
  // - The finally
  // - The catch, if there is one and there is no finally. But then still also,
  // - The body, if there is no finally

  // The catch duality is annoying for us here. We have to update them both.
  // The catch continuation with the exit for the catch (which initially starts
  // from the exit of the body). The body continuation with the exit for the block.

  //// Find the "parentBlock" of the statement that's executed _after_ each block.
  //// This is the one we need to update, break, continue, or not abrupt at all.
  //// Set to null if there's no need to update anything afterward (return, throw).
  //let continuationNodeBody = node;
  //if (treblo.wasAbrupt) {
  //  if (treblo.wasAbrupt.type === 'BreakStatement') {
  //    if (treblo.wasAbrupt.label) {
  //      continuationNodeBody = globallyUniqueLabelRegistry.get(treblo.wasAbrupt.label.name).node;
  //      if (node.finalizer) TODO // implement label logic
  //    } else {
  //      continuationNodeBody = loopStack[loopStack.length - 1];
  //      if (node.finalizer) TODO // what about the finally case
  //    }
  //  }
  //  else if (treblo.wasAbrupt.type === 'ContinueStatement') {
  //    vlog('TODO: eliminate continue');
  //    return;
  //  }
  //  else if (treblo.wasAbrupt.type === 'ReturnStatement') {
  //    if (node.finalizer) TODO // what about the finally case
  //    continuationNodeBody = null; // We don't care about what happens after the if
  //  }
  //  else if (treblo.wasAbrupt.type === 'ThrowStatement') {
  //    if (node.finalizer) TODO // what about the finally case
  //    continuationNodeBody = null; // We don't care about what happens after the if
  //  }
  //  else {
  //    ASSERT(false, 'should be one of these cases');
  //  }
  //}
  //let continuationNodeCatch = undefined;
  //if (node.handler) {
  //  continuationNodeCatch = node;
  //  if (node.handler.body.$p.treblo.wasAbrupt) {
  //    if (node.handler.body.$p.treblo.wasAbrupt.type === 'BreakStatement') {
  //      if (node.handler.body.$p.treblo.wasAbrupt.label) {
  //        continuationNodeCatch = globallyUniqueLabelRegistry.get(node.handler.body.$p.treblo.wasAbrupt.label.name).node;
  //        TODO // implement label logic
  //      } else {
  //        if (node.finalizer) TODO // what about the finally case
  //        continuationNodeCatch = loopStack[loopStack.length - 1];
  //      }
  //    }
  //    else if (node.handler.body.$p.treblo.wasAbrupt.type === 'ContinueStatement') {
  //      vlog('TODO: eliminate continue');
  //      return;
  //    }
  //    else if (node.handler.body.$p.treblo.wasAbrupt.type === 'ReturnStatement') {
  //      if (node.finalizer) TODO // what about the finally case
  //      continuationNodeCatch = null; // We don't care about what happens after the if
  //    }
  //    else if (node.handler.body.$p.treblo.wasAbrupt.type === 'ThrowStatement') {
  //      if (node.finalizer) TODO // what about the finally case
  //      continuationNodeCatch = null; // We don't care about what happens after the if
  //    }
  //    else {
  //      ASSERT(false, 'should be one of these cases');
  //    }
  //  }
  //}
  //let continuationNodeFinally = node;
  //if (node.finalizer) {
  //  continuationNodeFinally = node;
  //
  //  if (node.finalizer.$p.treblo.wasAbrupt) {
  //    if (node.finalizer.$p.treblo.wasAbrupt.type === 'BreakStatement') {
  //      if (node.finalizer.$p.treblo.wasAbrupt.label) {
  //        continuationNodeFinally = globallyUniqueLabelRegistry.get(node.finalizer.$p.treblo.wasAbrupt.label.name).node;
  //        TODO // implement label logic
  //      } else {
  //        continuationNodeFinally = loopStack[loopStack.length - 1];
  //      }
  //    }
  //    else if (node.finalizer.$p.treblo.wasAbrupt.type === 'ContinueStatement') {
  //      vlog('TODO: eliminate continue');
  //      return;
  //    }
  //    else if (node.finalizer.$p.treblo.wasAbrupt.type === 'ReturnStatement') {
  //      continuationNodeFinally = null; // We don't care about what happens after the if
  //    }
  //    else if (node.finalizer.$p.treblo.wasAbrupt.type === 'ThrowStatement') {
  //      continuationNodeFinally = null; // We don't care about what happens after the if
  //    }
  //    else {
  //      ASSERT(false, 'should be one of these cases');
  //    }
  //  }
  //
  //  // The finally unconditionally overrides any exit points for code flow
  //  if (REF_TRACK_TRACING) console.log('There is a finally so block/handler go to the finally block');
  //  continuationNodeBody = node.finalizer;
  //  continuationNodeCatch = node.finalizer;
  //}
  //
  //
  //// Record body exit if there were no throws.
  //
  //// continuationNodeBody is now the node _after_ the try-block.
  //// This may be null, in case of early return/throw. This may be the last statement of the block.
  //// Without abrupt completions it'll just be the `if` statement itself.
  //if (REF_TRACK_TRACING) console.log('`try.block`, abrupt:', treblo.wasAbrupt?.type, ', continues after node @:', continuationNodeBody?.$p.pid, ', has', treblo.entryReads.size, ' entryReads,', treblo.entryWrites.size, 'entryWrites, and', treblo.exitWrites.size, 'exitWrites');
  //if (REF_TRACK_TRACING) console.log('`try.catch`, abrupt:', node.handler?.body.$p.treblo.wasAbrupt?.type, ', continues after node @:', continuationNodeCatch?.$p.pid, ', has', node.handler?.body.$p.treblo.entryReads.size, ' entryReads,', node.handler?.body.$p.treblo.entryWrites.size, 'entryWrites, and', node.handler?.body.$p.treblo.exitWrites.size, 'exitWrites');
  //if (REF_TRACK_TRACING) console.log('`try.block`, abrupt:', node.finalizer.$p.treblo.wasAbrupt?.type, ', continues after node @:', continuationNodeFinally?.$p.pid, ', has', node.finalizer.$p.treblo.entryReads.size, ' entryReads,', node.finalizer.$p.treblo.entryWrites.size, 'entryWrites, and', node.finalizer.$p.treblo.exitWrites.size, 'exitWrites');
  //// Now add the exitWrites to the parent block for each continuation
  //// node for each binding that already existed before that node
  //
  //console.log('continuationNodeBody:', continuationNodeBody)
  //
  //continuationNodeBody?.$p.openRefsT.exitWritesAfter.push([treblo.wasAbrupt?.type, treblo.exitWrites]);
  //// TODO: the other two may need to be down after the next block?
  //if (node.handler) continuationNodeCatch?.$p.openRefsT.exitWritesAfter.push([node.handler.body.$p.treblo.wasAbrupt?.type, node.handler.body.$p.treblo.exitWrites]);
  //if (node.finalizer) continuationNodeFinally?.$p.openRefsT.exitWritesAfter.push([node.finalizer.body.$p.treblo.wasAbrupt?.type, node.finalizer.body.$p.treblo.exitWrites]);
  //
  //
  //// Walk all bindings known before this node and check if they were exitWritten
  //// in each block that ended up jumping to after this node.
  //parentBlock.$p.treblo.defined.forEach(name => {
  //  if (REF_TRACK_TRACING) console.log('- binding', [name]);
  //
  //  if (REF_TRACK_TRACING) console.log('  - had',
  //    treblo.entryReads.get(name)?.size??0, '+',
  //    node.handler.body.$p.treblo.entryReads.get(name)?.size??0, '+',
  //    node.finalizer.body.$p.treblo.entryReads.get(name)?.size??0,
  //    'entryReads and',
  //    treblo.entryWrites.get(name)?.size??0, '+',
  //    node.handler.body.$p.treblo.entryWrites.get(name)?.size??0, '+',
  //    node.finalizer.body.$p.treblo.entryWrites.get(name)?.size??0, '+',
  //    'entryWrites'
  //  );
  //
  //  if (REF_TRACK_TRACING) console.group('  - try:block');
  //  if (parentBlock.$p.treblo.overwritten.get(name)) {
  //    if (REF_TRACK_TRACING) console.log('  - had its entry value overwritten in parent block so mulling those entryReads and entryWrites');
  //  } else {
  //    // Note: even if there's a finally, the block entry value comes from the parent block
  //    const pEntryReads = parentBlock.$p.treblo.entryReads;
  //    const pEntryWrites = parentBlock.$p.treblo.entryWrites;
  //    if (REF_TRACK_TRACING) console.log('  - entry value was not fully overwritten in parent block so adding those entryReads and entryWrites');
  //    treblo.entryReads.get(name)?.forEach(read => pEntryReads.get(name)?.add(read) ?? pEntryReads.set(name, new Set([read])));
  //    treblo.entryWrites.get(name)?.forEach(write => pEntryWrites.get(name)?.add(write) ?? pEntryWrites.set(name, new Set([write])));
  //    if (REF_TRACK_TRACING) console.log('  - parent block binding entryReads:', Array.from(pEntryReads.get(name)??[]).map(read => +read.node.$p.pid), ', entryWriteS:', Array.from(pEntryWrites.get(name)??[]).map(write => +write.node.$p.pid));
  //  }
  //  if (REF_TRACK_TRACING) console.groupEnd();
  //
  //
  //  if (node.handler) {
  //    // The handler block, worst case, reads the same entry value as the try block.
  //    // Worst case, it reads the same exit value as the try block (crashing without
  //    // another reference to the current binding after it).
  //    // The entry value for the catch is therefor the combination of exitWrites of
  //    // the parent block and all writes that occur anywhere in the try:block.
  //    // Same for entry reads.
  //
  //    if (REF_TRACK_TRACING) console.group('  - try:catch');
  //    if (parentBlock.$p.treblo.overwritten.get(name)) {
  //      if (REF_TRACK_TRACING) console.log('  - had its entry value overwritten in parent block so mulling those entryReads and entryWrites and only using the refs in try-block');
  //    } else {
  //      // Note: even if there's a finally, the catch block entry value comes from
  //      //       the last writes in parent block or any write in the try-block
  //      const pEntryReads = parentBlock.$p.treblo.entryReads;
  //      const pEntryWrites = parentBlock.$p.treblo.entryWrites;
  //      if (REF_TRACK_TRACING) console.log('  - entry value was not fully overwritten in parent block so adding those entryReads and entryWrites');
  //      node.handler.body.$p.treblo.entryReads.get(name)?.forEach(read => pEntryReads.get(name)?.add(read) ?? pEntryReads.set(name, new Set([read])));
  //      node.handler.body.$p.treblo.entryWrites.get(name)?.forEach(write => pEntryWrites.get(name)?.add(write) ?? pEntryWrites.set(name, new Set([write])));
  //      if (REF_TRACK_TRACING) console.log('  - parent block binding entryReads:', Array.from(pEntryReads.get(name)??[]).map(read => +read.node.$p.pid), ', entryWriteS:', Array.from(pEntryWrites.get(name)??[]).map(write => +write.node.$p.pid));
  //    }
  //
  //    if (REF_TRACK_TRACING) console.groupEnd();
  //  }
  //
  //
  //  let outerExitWriteSet = parentBlock.$p.treblo.exitWrites.get(name);
  //  if (REF_TRACK_TRACING) console.log('  - had', outerExitWriteSet?.size??0, 'exitWrites queued');
  //  if (node.$p.openRefsT.exitWritesAfter.every(([_aburupt, map]) => map.has(name))) {
  //    // This binding was written to in each branch that ended up jumping to this node so
  //    // we can _replace_ the set of exitWrites with the disjunction of those branches.
  //    if (REF_TRACK_TRACING) console.log('  - since they were written in all branches that lead here, the set is cleared');
  //    outerExitWriteSet = new Set;
  //    parentBlock.$p.treblo.exitWrites.set(name, outerExitWriteSet);
  //  } else {
  //    if (REF_TRACK_TRACING) console.log('  - was not overwritten in all branches leading here so keeping those');
  //  }
  //  if (REF_TRACK_TRACING) console.log('- processing exitWritesAfter now...');
  //  // Now add all the exitWrites we found queued up after _this_ node to the parent
  //  // exitWrites, potentially a fresh Set, but otherwise amending it. (`x = 1; if ($) x = 2;`)
  //  node.$p.openRefsT.exitWritesAfter.forEach(([abrupt, exitWritesMap]) => {
  //    if (REF_TRACK_TRACING) console.log('  - map has', exitWritesMap.get(name)?.size ?? 0, 'writes queued');
  //    exitWritesMap.get(name)?.forEach(write => {
  //      if (REF_TRACK_TRACING) console.log('    - Adding write @', +write.node.$p.pid, 'for `' + name + '` to parent block');
  //      outerExitWriteSet.add(write)
  //    });
  //  });
  //  if (REF_TRACK_TRACING) console.log('  - queue processed for this binding. it has', parentBlock.$p.treblo.exitWrites.size, 'exitWrites');
  //});
  //
  //// The parent block should now have an updated exitWrites set for each of its bindings
  //
  //
  //// TODO: de volgende node.finalizer things kunnen van een merge conflict zijn
  //
  //// Note: the exitWritesAfter part has already been done. We only need to propagate all afters to parent here
  //// Note: likewise, the entry read/write mutations happen elsewhere. This only propagates state to parent.
  //
  //if (REF_TRACK_TRACING) console.log('try parent block @', parentBlock.$p.pid, 'knew of', parentBlock.$p.treblo.defined.size, 'bindings. Now processing', node.$p.openRefsT.exitWritesAfter.length, 'sets of exitWrites');
  //
  //const exitWritesAfter = node?.$p.openRefsT.exitWritesAfter.slice(0);
  //if (!node.finalizer) {
  //  exitWritesAfter.push(treblo);
  //}
  //if (node.handler && !node.finalizer) {
  //  exitWritesAfter.push(node.handler.body.$p.treblo);
  //}
  //if (node.finalizer) {
  //  exitWritesAfter.push(node.finalizer.$p.treblo);
  //}
  //
  //if (node.finalizer?.$p.wasAbrupt || (!node.finalizer && node.handler.body.$p.wasAbrupt)) {
  //  TODO // update the allOverwritten logic
  //}
  //if (exitWritesAfter.length > 3) {
  //  TODO // update the allOverwritten logic
  //}
  //
  //if (REF_TRACK_TRACING) console.group('Processing', parentBlock.$p.treblo.defined.size, 'outer bindings');
  //parentBlock.$p.treblo.defined.forEach(name => {
  //  //const parentExitWritesName = node.$p.openRefsT.exitWritesBefore.get(name);
  //  if (REF_TRACK_TRACING) console.group('-', [name]);
  //
  //  // In a try/catch/finally, something is overwritten when:
  //  // - it has a finally and it was overwritten in the finally
  //  // - it has no finally and was overwritten in the catch
  //  // TODO: abrupt conditions
  //  // TODO: multiple finally with different abrupt or multiple abrupts through it
  //  // TODO: finally with updated abrupt
  //  const allOverwritten = ((node.finalizer && node.finalizer.$p.treblo.overwritten.has(name)) || (!node.finalizer && node.handler.body.$p.treblo.overwritten.has(name)));
  //
  //  let parentExitWrites;
  //
  //  if (allOverwritten) {
  //    if (REF_TRACK_TRACING) console.log('All branches overwrite or abrupt (parent:', parentBlock.$p.treblo.overwritten.has(name),', catch:', !node.handler ? 'missing' : node.finalizer ? 'ignored' : (node.handler.body.$p.treblo.overwritten.has(name)), ', finalizer:', node.finalizer ? node.finalizer.$p.treblo.overwritten.has(name) : 'missing', ' so creating new exitWrites set on parent');
  //    parentBlock.$p.treblo.exitWrites.set(name, new Set()); // Will be filled in the exitWritesAfter loop below
  //    parentBlock.$p.treblo.overwritten.add(name);
  //  } else {
  //    const exitWritesBefore = (node.finalizer || node.handler.body).$p.treblo.exitWritesBefore.get(name); // Lazily fetched
  //    parentExitWrites = parentBlock.$p.treblo.exitWrites.get(name);
  //    if (REF_TRACK_TRACING) console.log('Started with',exitWritesBefore.size,'exitWrites before the', node.finalizer ? 'try' : 'catch', 'node', ', parent set before merges:', parentExitWrites?.size);
  //    if (!parentExitWrites?.size && exitWritesBefore?.size) {
  //      if (REF_TRACK_TRACING) console.log('overwriting parentBlock exitWrites with that exitWritesBefore set now...');
  //      parentBlock.$p.treblo.exitWrites.set(name, new Set(exitWritesBefore));
  //    } else {
  //      exitWritesBefore.forEach(write => parentExitWrites.add(write))
  //    }
  //  }
  //
  //  if (REF_TRACK_TRACING) console.log('Have',exitWritesAfter.length,'exitWritesAfter');
  //
  //  // Note: for a loop, breaks (and continues) may target the loop-node. We eliminate continues and may eliminate breaks (in favor of labeled breaks)
  //  // A cBlock, "continuation block", is any block that continues after this loop. Like non-abrupt body or any block with a non-label break.
  //  // Note: abrupt here is less relevant because we know it continues here (if it was a break then it had no label, and targeted this loop)
  //  for (const currentTreblo of exitWritesAfter) {
  //    const currentExitWrites = currentTreblo.exitWrites.get(name);
  //
  //    if (REF_TRACK_TRACING) console.group('Next currentExitWrites block; wasAbrupt:', currentTreblo.wasAbrupt?'yes':'no', ', blockExitWrites:', currentTreblo.exitWrites.get(name)?.size??0, ', block overwrites:', currentTreblo.overwritten.has(name));
  //
  //    // Update the exitWrites of the cBlock to the parent. TODO: we can/should skip this step for the body of while(true) loops that dont abrupt
  //
  //    if (currentExitWrites?.size) {
  //      if (!parentExitWrites) {
  //        parentExitWrites = parentBlock.$p.treblo.exitWrites.get(name);
  //        if (REF_TRACK_TRACING) console.log('Parent exit writes set before any merge:', parentExitWrites?.size??'<none>');
  //        if (!parentExitWrites) {
  //          parentExitWrites = new Set;
  //          parentBlock.$p.treblo.exitWrites.set(name, parentExitWrites);
  //        }
  //      }
  //
  //      if (REF_TRACK_TRACING) console.log('Merging', currentExitWrites.size,'exitWrites from the try-node with parent exitWrites');
  //      currentExitWrites?.forEach(write => parentExitWrites.add(write));
  //      if (REF_TRACK_TRACING) console.log('- exitWrites after:', parentExitWrites.size);
  //    } else {
  //      if (REF_TRACK_TRACING) console.log('No exit writes, nothing to merge');
  //    }
  //
  //    if (REF_TRACK_TRACING) console.groupEnd();
  //  }
  //
  //  // Copy all reads and writes to the parent, regardless of abrupt.
  //  // "if the finally writes then an outer finally must know about it"
  //  treblo.writes.get(name)?.forEach(write => parentBlock.$p.treblo.writes.get(name)?.push(write) ?? parentBlock.$p.treblo.writes.set(name, [write]));
  //  treblo.reads.get(name)?.forEach(read => parentBlock.$p.treblo.reads.get(name)?.push(read) ?? parentBlock.$p.treblo.reads.set(name, [read]));
  //  node.handler?.body.$p.treblo.writes.get(name)?.forEach(write => parentBlock.$p.treblo.writes.get(name)?.push(write) ?? parentBlock.$p.treblo.writes.set(name, [write]));
  //  node.handler?.body.$p.treblo.reads.get(name)?.forEach(read => parentBlock.$p.treblo.reads.get(name)?.push(read) ?? parentBlock.$p.treblo.reads.set(name, [read]));
  //  node.finalizer?.$p.treblo.writes.get(name)?.forEach(write => parentBlock.$p.treblo.writes.get(name)?.push(write) ?? parentBlock.$p.treblo.writes.set(name, [write]));
  //  node.finalizer?.$p.treblo.reads.get(name)?.forEach(read => parentBlock.$p.treblo.reads.get(name)?.push(read) ?? parentBlock.$p.treblo.reads.set(name, [read]));
  //
  //  if (REF_TRACK_TRACING) console.groupEnd();
  //});
  //if (REF_TRACK_TRACING) console.groupEnd();
  //
  //// The parent block should now have an updated exitWrites set for each of its bindings
  //node.$p.openRefsT.finallyCaught.forEach((tuple) => {
  //  // Starting at `fromNode`, it goes through this finally to continue after the continuationNode
  //
  //  // - finally may overwrite all
  //  // - finally may redirect abrupt flow
  //  // - finally already has access to all entryWrites and writes
  //  // - maybe it's only relevant to determine
  //  // - TODO: what if finally abrupts conditionally? schedule for every occurrence? but we may not know about it, right?
  //
  //  console.log('fromNode:', fromNode.$p.treblo.exitWrites)
  //
  //  const [fromNode, fromExitWrites, continuationNode] = tuple;
  //
  //  const nextExitWrites = new Set;
  //
  //  parentBlock.$p.treblo.defined.forEach(name => {
  //    const tryExitWrites = node.$p.treblo.exitWrites.get(name);
  //    let exitWrites;
  //    if (fromNode.$p.treblo.overwritten.has(name)) {
  //      // Ignore the exitWrites because we use them from the finally only
  //      if (tryExitWrites) exitWrites = new Set(tryExitWrites);
  //    } else {
  //      // Amend the exitWrites from the finally
  //      exitWrites = fromExitWrites;
  //      if (exitWrites) exitWrites = new Set(exitWrites);
  //      if (exitWrites) {
  //        node.$p.treblo.exitWrites.get(name)?.forEach(write => exitWrites.add(write));
  //      } else {
  //        exitWrites = new Set(tryExitWrites);
  //      }
  //    }
  //
  //    if (exitWrites) nextExitWrites.set(name, exitWrites);
  //    tuple[1] = nextExitWrites;
  //    console.log('dit werkt toch voor geen meter');
  //    console.log('dit werkt toch voor geen meter');
  //    console.log('dit werkt toch voor geen meter');
  //    console.log('dit werkt toch voor geen meter');
  //    console.log('dit werkt toch voor geen meter');
  //    console.log('dit werkt toch voor geen meter');
  //    console.log('dit werkt toch voor geen meter');
  //    console.log('dit werkt toch voor geen meter');
  //    console.log('dit werkt toch voor geen meter');
  //    console.log('dit werkt toch voor geen meter');
  //    console.log('dit werkt toch voor geen meter');
  //    console.log('dit werkt toch voor geen meter');
  //    console.log('dit werkt toch voor geen meter');
  //    console.log('dit werkt toch voor geen meter');
  //    console.log('dit werkt toch voor geen meter');
  //    console.log('dit werkt toch voor geen meter');
  //  });
  //
  //  console.log('todo: apply the stuffs')
  //  TODO
  //});


  if (REF_TRACK_TRACING) console.groupEnd(); // TRY:after
  if (REF_TRACK_TRACING) console.groupEnd(); // TRY
  if (REF_TRACK_TRACING) console.log('/TRY');
}

export function openRefsOnBeforeTryBody(node, parentBlock) {
  // This is after the `try-block` but before returning on the whole TryStatement node
  // Not much to do here tbh (even the log is done in caller)

  if (REF_TRACK_TRACING) console.group('RTT: TRY:BODY');
  if (REF_TRACK_TRACING) console.group('RTT: TRY:BODY:before');

  // For Catch and Finally _block_ nodes.
  // This is the list of src/dst nodes that (worst case) also enter these blocks.
  // Can't do this on Treblo's because we need to create this array before arriving to that node
  if (node.handler) node.handler.body.$p.nodesThatContinueHere = [];
  if (node.finalizer) node.finalizer.$p.nodesThatContinueHere = [];


  if (REF_TRACK_TRACING) console.groupEnd(); // TRY:BODY:before
}

export function openRefsOnAfterTryBody(node, parentBlock, globallyUniqueLabelRegistry, loopStack, tryNodeStack, catchStack, finallyStack) {
  if (REF_TRACK_TRACING) console.group('RTT: TRY:BODY:after');

  //const treblo = node.$p.treblo;
  //const continuationNode = findContinuationBlock(treblo.wasAbrupt, globallyUniqueLabelRegistry, loopStack);
  //// Check for breaking through a finally barrier
  //// We need to confirm whether there's a `try` node with a pid between the target node and the current node
  //// If there is, we need to confirm whether this node has a `finally` block
  //// If so, we need to special case that because the finally is a forced path, that's its job
  //const nearestFinallyTryNode = tryNodeStack[tryNodeStack.length - 1];
  //if (+continuationNode?.$p.pid < +tryNodeStack[tryNodeStack.length - 1]?.$p.pid) {
  //  nearestFinallyTryNode.$p.openRefsT.finallyCaught.push([node.body, treblo.exitWrites, continuationNode]);
  //} else {
  //  // continuationNode is now the node _after_ which code flow continues
  //  // This may be null, in case of early return/throw. This may be the last statement of the block.
  //  // Without abrupt completions it'll just be the `if` statement itself.
  //  if (REF_TRACK_TRACING) console.log('  /try-block, abrupt:', treblo.wasAbrupt?.type, ', continues after node @:', continuationNode?.$p.pid, ', has', treblo.entryReads.size, ' entryReads,', treblo.entryWrites.size, 'entryWrites, and', treblo.exitWrites.size, 'exitWrites');
  //  // Now add the exitWrites to the parent block for each continuation
  //  // node for each binding that already existed before that node
  //  continuationNode?.$p.openRefsT.exitWritesAfter.push(treblo);
  //}

  // Only the try body continues (potentially) in the catch body. You can't break to it etc. That makes this step a bit simpler.

  if (REF_TRACK_TRACING) console.groupEnd(); // TRY:BODY:after
  if (REF_TRACK_TRACING) console.groupEnd(); // TRY:BODY
}

export function openRefsOnBeforeCatchBody(node, parentNode, parentProp, parentBlock) {
  // This is after the `try block`, right before entering the `catch block`

  if (REF_TRACK_TRACING) console.group('RTT: TRY:CATCH');
  if (REF_TRACK_TRACING) console.group('RTT: TRY:CATCH:before');

  // We need to consider any point in the catch to throw and as such the
  // exitWrites here are the exitWrites of the parent plus any writes in
  // the try block.

  //// Merge them into a single new exitWritesBefore for the catch block
  //const catchExitWritesBefore = new Map;
  //parentNode.$p.treblo_try.exitWritesBefore.forEach((set, name) => {
  //  catchExitWritesBefore.set(name, new Set(set));
  //});
  //parentNode.$p.treblo_try.writes.forEach((tryBlockWrites, name) => {
  //  const newSet = catchExitWritesBefore.get(name);
  //  if (newSet) {
  //    tryBlockWrites.forEach(write => newSet.add(write));
  //  } else {
  //    catchExitWritesBefore.set(name, new Set(tryBlockWrites));
  //  }
  //});
  //
  //if (REF_TRACK_TRACING) console.log('Setting catch exitWritesBefore to', catchExitWritesBefore.size, 'refs');
  //node.$p.treblo.exitWritesBefore = catchExitWritesBefore;

  if (REF_TRACK_TRACING) console.groupEnd(); // TRY:CATCH:before
}

export function openRefsOnAfterCatchBody(node, parentNode, parentProp, loopStack, tryNodeStack, catchStack, finallyStack) {
  if (REF_TRACK_TRACING) console.group('RTT: TRY:CATCH:after');

  if (REF_TRACK_TRACING) console.groupEnd(); // TRY:CATCH:after
  if (REF_TRACK_TRACING) console.groupEnd(); // TRY:CATCH
  if (REF_TRACK_TRACING) console.log('/CATCH');
}

export function openRefsOnBeforeFinallyBody(node, parentNode, parentProp, parentBlock) {
  if (REF_TRACK_TRACING) console.group('RTT: TRY:FINALLY');
  if (REF_TRACK_TRACING) console.group('RTT: TRY:FINALLY:before');

  // This is in the before block handler of the finally

  //// Since the finally can be triggered at any point, any exitWrites at the start of the try or
  //// the catch are potentially visible, as well as any writes inside of them.
  //const finallyExitWritesBefore = new Map;
  //parentNode.block.$p.treblo.exitWritesBefore.forEach((set, name) => {
  //  finallyExitWritesBefore.set(name, new Set(set));
  //});
  //parentNode.block.$p.treblo.writes.forEach((tryBlockWrites, name) => {
  //  const newSet = finallyExitWritesBefore.get(name);
  //  if (newSet) {
  //    tryBlockWrites.forEach(write => newSet.add(write));
  //  } else {
  //    finallyExitWritesBefore.set(name, new Set(tryBlockWrites));
  //  }
  //});
  //if (parentNode.handler) {
  //  parentNode.handler.body.$p.treblo.writes.forEach((tryBlockWrites, name) => {
  //    const newSet = finallyExitWritesBefore.get(name);
  //    if (newSet) {
  //      tryBlockWrites.forEach(write => newSet.add(write));
  //    } else {
  //      finallyExitWritesBefore.set(name, new Set(tryBlockWrites));
  //    }
  //  });
  //}
  //node.$p.treblo.exitWritesBefore = finallyExitWritesBefore;

  if (REF_TRACK_TRACING) console.group(); // TRY:FINALLY:before
}

export function openRefsOnAfterFinallyBody(node, parentNode, parentProp, globallyUniqueLabelRegistry, loopStack, catchStack, finallyStack) {
  if (REF_TRACK_TRACING) console.group('RTT: TRY:FINALLY:after');

  const treblo = node.$p.treblo;
  ASSERT(false, 'fixme. this works funky now. what is the parent block event.');
  const [continuationBlock, nearestCatchBlock, nearestFinallyBlock] = findAndQueueContinuationBlock(node.body, treblo.wasAbrupt, walkerPath, globallyUniqueLabelRegistry, loopStack, catchStack, finallyStack);
  TODO
  if (REF_TRACK_TRACING) console.log('  /try-finally, abrupt:', treblo.wasAbrupt?.type, ', continues after node @:', continuationNode?.$p.pid, ', has', treblo.entryReads.size, ' entryReads,', treblo.entryWrites.size, 'entryWrites, and', treblo.exitWrites.size, 'exitWrites');

  if (REF_TRACK_TRACING) console.group(); // TRY:FINALLY:after
  if (REF_TRACK_TRACING) console.group(); // TRY:FINALLY
  if (REF_TRACK_TRACING) console.log('/FINALLY');
}

export function openRefsCatchOnBefore(node, parentNode) {
  if (REF_TRACK_TRACING) console.group('RTT: catch clause:before');

  // TODO: where does this happen versus the catch body?

  // Create the state for the catch block
  //node.$p.openRefsT = createTrebra();

  // Copy state from Try block to Catch node (because event handler won't have access to Try node so can't reach into the block node)
  //node.$p.treblo_try = parentNode.block.$p.treblo;
}

export function openRefsOnBeforeCatchVar() {
  if (REF_TRACK_TRACING) console.group('RTT: openRefsOnBeforeCatchVar()');
}
export function openRefsOnAfterCatchVar(node, parentNode, parentProp, parentBlock) {
  if (REF_TRACK_TRACING) console.groupEnd(); // openRefsOnBeforeCatchVar
}
export function openRefsOnAfterCatchNode(node, parentBlock, globallyUniqueLabelRegistry, loopStack, tryNodeStack) {
  //const treblo = node.body.$p.treblo;
  //const continuationNode = findContinuationBlock(treblo.wasAbrupt, globallyUniqueLabelRegistry, loopStack);
  //// Check for breaking through a finally barrier
  //// We need to confirm whether there's a `try` node with a pid between the target node and the current node
  //// If there is, we need to confirm whether this node has a `finally` block
  //// If so, we need to special case that because the finally is a forced path, that's its job
  //const nearestFinallyTryNode = tryNodeStack[tryNodeStack.length - 1];
  //if (+continuationNode?.$p.pid < +tryNodeStack[tryNodeStack.length - 1]?.$p.pid) {
  //  nearestFinallyTryNode.$p.openRefsT.finallyCaught.push([node.body, treblo.exitWrites, continuationNode]);
  //} else {
  //  // continuationNode is now the node _after_ which code flow continues
  //  // This may be null, in case of early return/throw. This may be the last statement of the block.
  //  // Without abrupt completions it'll just be the `if` statement itself.
  //  if (REF_TRACK_TRACING) console.group('/try-catch, abrupt:', treblo.wasAbrupt?.type, ', continues after node @:', continuationNode?.$p.pid, ', has', treblo.entryReads.size, ' entryReads,', treblo.entryWrites.size, 'entryWrites, and', treblo.exitWrites.size, 'exitWrites');
  //  // Now add the exitWrites to the parent block for each continuation
  //  // node for each binding that already existed before that node
  //  continuationNode?.$p.openRefsT.exitWritesAfter.push(treblo);
  //  if (REF_TRACK_TRACING) console.groupEnd();
  //}

  if (REF_TRACK_TRACING) console.groupEnd(); // openRefsCatchOnBefore()
}

export function openRefsOnBeforeRef(kind, node, parentNode, parentProp, parentIndex, meta) {
  if (node.name === '$') { if (REF_TRACK_TRACING) console.group(); }
  else if (REF_TRACK_TRACING) console.group('RTT: ref:before; on::ref @', +node.$p.pid, ': Ref:', [node.name], 'with kind', [kind], 'on a', parentNode.type + '.'+ parentProp + (parentIndex >= 0 ? '[' + parentIndex + ']' : ''), '( builtin=', meta.isBuiltin, ', implicit=', meta.isImplicitGlobal, ')');
}

export function openRefsOnAfterRef(kind, node, parentNode, parentProp, parentIndex, meta) {
  if (node.name === '$') { if (REF_TRACK_TRACING) console.groupEnd(); }
  else if (REF_TRACK_TRACING) console.groupEnd(); // openRefsOnBeforeRef
}

export function openRefsOnBeforeRead(read, blockNode) {
  const name = read.node.name;

  if (name === '$') return; // Special debugging symbol. Should be global. This analysis doesn't apply to globals. Noisy in tests. So skip it.

  if (REF_TRACK_TRACING) console.group('RTT: on::read:before, recording', /read/, 'reference to', [name]);

  /** @var {Treblo} */
  const treblo = blockNode.$p.treblo;
  ASSERT(treblo, 'the treblo should be set on this block...');

  // For all intentions and purposes, right now the next read can only see this write.
  // It's only for reconciling branching blocks where it might have multiple open writes
  // Note: `let x = 1; while (true) { $(x) x = 2; }` is fixed by connect pre-write-reads to last-writes after a loop.

  if (REF_TRACK_TRACING) console.log('There are', blockNode.$p.treblo.exitWrites.get(name)?.size ?? 0, 'exitWrites this read can reach in block @', +blockNode.$p.pid);

  // It is an entryRead if the binding has not been written to yet in this block. The entryReads are relevant for loops, later.
  const isEntryRead = treblo.overwritten.has(name);
  if (isEntryRead) {
    if (REF_TRACK_TRACING) console.log('Since binding was already overwritten in this block, @', +read.node.$p.pid, 'is not an entryRead');
  } else {
    if (REF_TRACK_TRACING) console.log('Marking @', +read.node.$p.pid, 'as an entryRead for its block @', +blockNode.$p.pid);
    treblo.entryReads.get(name)?.add(read) ?? treblo.entryReads.set(name, new Set([read]));
  }

  // An read can reach all current exitWrites ("open writes" or "lastWrites")
  treblo.exitWrites.get(name)?.forEach(write => {
    if (REF_TRACK_TRACING) console.log('- Read', +read.node.$p.pid, 'can reach write', +write.node.$p.pid);
    write.reachedByReads.add(read);
    read.reachesWrites.add(write);
  });

  treblo.reads.get(name)?.add(read) ?? treblo.reads.set(name, new Set([read]));
  treblo.rwOrder.get(name)?.push(read) ?? treblo.rwOrder.set(name, [read]);

  if (REF_TRACK_TRACING) console.groupEnd(); // ref:read:before
}

export function openRefsOnBeforeWrite(write, blockNode) {
  const name = write.node.name;

  if (name === '$') return; // Special debugging symbol. Should be global. This analysis doesn't apply to globals. Noisy in tests. So skip it.

  if (REF_TRACK_TRACING) console.group('RTT: on::write:before, recording', /write/, 'reference');

  /** @var {Treblo} */
  const treblo = blockNode.$p.treblo;
  ASSERT(treblo, 'the treblo should be set on this block...');

  if (write.parentNode.type === 'VariableDeclarator') {
    if (REF_TRACK_TRACING) console.log('Adding binding to owner block @', +write.parentBlockNode.$p.pid, '(', write.parentBlockNode.type, ')');
    treblo.defined.add(name);
  }

  if (treblo.overwritten.has(name)) {
    if (REF_TRACK_TRACING) console.log('Since binding was already overwritten in this block, @', +write.node.$p.pid, 'is not an entryWrite');
  } else {
    if (REF_TRACK_TRACING) console.log('Since binding was not yet overwritten in this block, @', +write.node.$p.pid, 'is an entryWrite, mark it as overwritten now in @', +blockNode.$p.pid);
    treblo.entryWrites.get(name)?.add(write) ?? treblo.entryWrites.set(name, new Set([write]));
    treblo.overwritten.add(name);
  }

  // This write can reach all exitWrites ("open writes" or "lastWrites")
  treblo.exitWrites.get(name)?.forEach(write1 => {
    if (REF_TRACK_TRACING) console.log('- Write', +write.node.$p.pid, 'overwrites write', +write1.node.$p.pid);
    write1.reachedByWrites.add(write);
    write.reachesWrites.add(write1);
  });

  // For all intentions and purposes, right now the next read can only see this write.
  // It shadows all previous writes for any statements in that follow in the same block. So replace the list.
  // It's only for reconciling branching blocks where the set might have multiple open writes
  if (REF_TRACK_TRACING) console.log('Setting exitWrites of block @', +blockNode.$p.pid, 'to only the write @', +write.node.$p.pid);
  treblo.exitWrites.set(name, new Set([write])); // Is clearing it and reusing the set faster/better? :shrug:

  treblo.writes.get(name)?.push(write) ?? treblo.writes.set(name, [write]);
  treblo.rwOrder.get(name)?.push(write) ?? treblo.rwOrder.set(name, [write]);

  if (REF_TRACK_TRACING) console.groupEnd(); // ref:write:before
}

export function dumpOpenRefsState(globallyUniqueNamingRegistry) {

  if (REF_TRACK_TRACING) console.log('RTT: State of globallyUniqueNamingRegistry after:');
  if (REF_TRACK_TRACING) Array.from(globallyUniqueNamingRegistry.entries()).map(([name, meta]) => {
    if (meta.isImplicitGlobal || meta.isGlobal || meta.isBuiltin) return;
    console.group('RTT:', [name], ':');
    // Note: meta.reOrder is created in phase2
    (meta.reads || []).concat(meta.writes || []).sort(({ node: { $p: { pid: a } } }, { node: { $p: { pid: b } } }) =>
      +a < +b ? -1 : +a > +b ? 1 : 0,
    ).forEach(rw => {
      console.log('- @', +rw.node.$p.pid, ';', rw.action, ';',
        [
          rw.action === 'read' ? (rw.reachesWrites.size ? 'canRead: ' + Array.from(rw.reachesWrites).map(write => write.node.$p.pid) : 'can not read any writes (TDZ?)') : '',
          rw.action === 'write' ? (rw.reachedByReads.size ? 'readBy: ' + Array.from(rw.reachedByReads).map(read => read.node.$p.pid) : 'not read') : '',
          rw.action === 'write' ? (rw.reachesWrites.size ? 'overwrites: ' + Array.from(rw.reachesWrites).map(write => write.node.$p.pid) : 'does not overwrite') : '',
          rw.action === 'write' ? (rw.reachedByWrites.size ? 'overwrittenBy: ' + Array.from(rw.reachedByWrites).map(write => write.node.$p.pid) : 'not overwritten') : '',
        ].filter(Boolean).join(', ')
      );
    });
    console.groupEnd();
    console.log('\n');
  });
}
