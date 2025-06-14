import { ASSERT, vlog, vgroup, vgroupEnd, REF_TRACK_TRACING, debugStringMapOfSetOfReadOrWrites, debugStringListOfReadOrWrites, currentState, createOpenRefsState, } from '../utils.mjs';
import {createTrebra} from "../trebra.mjs"
import {createTreblo} from "../treblo.mjs"
import { BLUE, RED, RESET, YELLOW } from '../../tests/utils.mjs';


// This analysis is only useful for single scope bindings. For them we can assert source code order matches temporal.
// Goal is to determine for each binding reference which writes it may observe in the worst case, or which writes
// it may overwrite in the worst case. This includes loops and try/catch complexity.
// It assumes normalized code, which eliminates a few things (like switches and finally).

// The result is a fairly solid list of references
// - all the assignments a particular read might observe and the other way around
// - all the assignments that another assignment might replace/overwrite
// - properly traced including catch

// Known caveats:
// - In general it may be too conservative but should never be too optimistic
//   - This means that
//     - It may consider that two references can reach each other when in fact there exists no such code path
//     - It should never consider two references to not reach each other when there exists a code path where they do
//   - So
//     - A write that is only read is in fact a constant
//     - A read or write that is not observed is dead code
// - May be pessimistic for implicit throws for the case where they are guaranteed to be caught
//   - `let x=1; try { try { x = 2; maybeThrow(); } catch {} } finally { $(x); }` due to how tracking is set up, it considers x to possibly read x=2 even though that's impossible because it would be caught by the inner catch.
//   - not sure yet how easy it would be to prevent this
// - If an assignment is the last statement of a try, it still considers it possible to throw afterwards
//   - `let x=1; try { x=2 } catch { $(x) }` this analysis still considers the read of x to possibly be 2, which is not true
//   - we should be able to fix that later but for now we'll accept it
// - There might be super far corner cases that are not covered.
//   - Test coverage is pretty good but may be incomplete due to the complexity of if-else, while, labels, try, catch, and finally :shrug:
// - Terrible at DCE
//   - Irrelevant under the assumption that DCE will be applied later anyway. Bad tracking due to not ignoring dead code is therefor negligible.
// - Ignores it when certain structs can't do their normal thing
//   - (yaya I know) Like a try that can't throw, a loop that never loops, etc.
//   - These edge cases are currently ignored and I don't know if that matters much. Not in my tests.
//   - Infinite loops with dead code afterward will have undefined (but at worst more conservative) behavior for that dead code
// - If a Catch can't throw then throws (implicit and explicit) may be detected to hit an outer finally that it can't hit in reality
//   - example case: tests/cases/ref_tracking/finally_catch_finally_bad2.md
//   - `let x=1; try { try { x=2; if ($) throw $; x=3 } catch { x=4 } } finally { $(x) }` x can't be seen to be 2 but ref tracking claims it might
//   - this "worst case" scenario should only lead to sub-optimal cases (being over conservative) and not bugs. hopefully.
//   - maybe we can fix it too. might be hard.
// - The refTests are manual
//   - Especially the more esoteric try-finally-label cases can be extremely complex
//     - (But we eliminate finally so that's a lesser concern, at the cost of accuracy)
//   - I do have a plan where we automatically try all variations of the test case (if/else branch, loop not loop, throw everywhere in a try)
//   - But it's been a lot of work and :shrug: I want to work on something else (:


/**
 * @typedef {
 *   {
 *     trabs: Map<Node, Trebra>,
 *     trebs: Map<Node, Treblo>,
 *   }
 * } RefTrackState
 */


export function createState() {
  /**
   * @var {RefTrackState}
   */
  return {
    trabs: new Map,
    trebs: new Map,
  };
}

export function logExitWritesX(refTrackState, blockNode, label) {
  if (REF_TRACK_TRACING) {
    const treblo = refTrackState.trebs.get(blockNode);
    if (!treblo) console.log(RED+'[X] wrong node? no treblo found' + RESET);
    const inset = Array.from(treblo?.entryWrites?.get('x') ?? []).map(w => w.node.$p.npid);
    const outset = Array.from(treblo?.exitWrites?.get('x') ?? []).map(w => w.node.$p.npid);
    console.log(BLUE + `[X] [${label}] writes for 'x'` + RESET + `; entry:`, inset.length ? inset : ['<none>'], ', exit:', outset.length ? outset : ['<none>']);
  }
}

export function openRefsOnBeforeProgram(refTrackState, node, fdata) {
  if (REF_TRACK_TRACING) console.group('RTT: PROGRAM');
  if (REF_TRACK_TRACING) console.group('RTT: PROGRAM:before');
  // logExitWritesX(refTrackState, node, 'onBeforeProgram');

  if (REF_TRACK_TRACING) currentState(fdata, 'BeforeRefTracking', false, fdata, true, true);

  refTrackState.trebs.set(node, createTreblo(refTrackState, new Set, new Map));

  if (REF_TRACK_TRACING) console.groupEnd(); // PROGRAM:before
}

export function openRefsOnAfterProgram(refTrackState, node, fdata) {
  if (REF_TRACK_TRACING) console.group('RTT: PROGRAM:after');
  logExitWritesX(refTrackState, node, 'onAfterProgram');
  if (REF_TRACK_TRACING) console.groupEnd(); // PROGRAM:after
  if (REF_TRACK_TRACING) console.groupEnd(); // PROGRAM
  if (REF_TRACK_TRACING) console.log('/PROGRAM');

  if (REF_TRACK_TRACING) console.log('');
  if (REF_TRACK_TRACING) console.log('Reference reachability:');
  if (REF_TRACK_TRACING) console.log(createOpenRefsState(fdata.globallyUniqueNamingRegistry));
}

export function openRefsOnBeforeBlock(refTrackState, node, parentNode, parentProp, grandNode, parentBlock, globallyUniqueNamingRegistry) {
  if (REF_TRACK_TRACING) console.group('RTT: BLOCK @', node.$p.npid);
  if (REF_TRACK_TRACING) console.group('RTT: BLOCK:before', parentNode.type, '.', parentProp);

  ASSERT(!refTrackState.trebs.has(node), 'treblo is created here');
  const ptreblo = refTrackState.trebs.get(parentBlock);
  ASSERT(ptreblo, 'has parent treblo');
  refTrackState.trebs.set(node, createTreblo(
    refTrackState,
    ptreblo.defined,
    ptreblo.exitWrites,
  ));
  logExitWritesX(refTrackState, node, 'onBeforeBlock');

  // Special case visit the Try children
  switch (parentNode.type) {
    case 'TryStatement': {
      ASSERT(parentProp === 'block', 'without finally the child Block of a Try must be the Try Block');
      openRefsOnBeforeTryBody(refTrackState, node, parentNode, parentProp, parentBlock);
      break;
    }

    case 'CatchClause': {
      openRefsOnBeforeCatchBody(refTrackState, node, parentNode, parentProp, grandNode, parentBlock, globallyUniqueNamingRegistry);
      break;
    }

    default: {
      if (REF_TRACK_TRACING) console.log('RTT: block:enter,', parentNode.type, 'block @', node.$p.npid);
      ASSERT(['IfStatement', 'WhileStatement', 'LabeledStatement', 'FunctionExpression'].includes(parentNode.type), 'expecting normalized code but found an unexpected node', parentNode.type);
    }
  }

  if (REF_TRACK_TRACING) console.groupEnd(); // BLOCK:before
  if (REF_TRACK_TRACING) console.log('RTT: /BLOCK:before');
}

export function openRefsOnAfterBlock(refTrackState, node, walkerPath, parentNode, parentProp, grandNode, loopStack, parentBlock, globallyUniqueLabelRegistry, tryNodeStack, catchStack, globallyUniqueNamingRegistry) {
  if (REF_TRACK_TRACING) console.group('RTT: BLOCK:after', parentNode.type, '.', parentProp);

  switch (parentNode.type) {
    case 'TryStatement': {
      ASSERT(parentProp === 'block', 'what is this', parentNode.type, parentProp);
      openRefsOnAfterTryBody(refTrackState, node, parentNode, parentBlock, walkerPath, globallyUniqueLabelRegistry, loopStack, tryNodeStack, catchStack, globallyUniqueNamingRegistry);
      break;
    }

    case 'CatchClause': {
      openRefsOnAfterCatchBody(refTrackState, node, walkerPath, parentNode, parentProp, grandNode, parentBlock, globallyUniqueLabelRegistry, loopStack, tryNodeStack, catchStack);
      break;
    }
  }

  logExitWritesX(refTrackState, node, 'onAfterBlock');

  if (REF_TRACK_TRACING) console.groupEnd(); // BLOCK:after
  if (REF_TRACK_TRACING) console.groupEnd(); // BLOCK
  if (REF_TRACK_TRACING) console.log('/BLOCK');
}

export function openRefsOnBeforeIf(refTrackState, node, parentBlock) {
  if (REF_TRACK_TRACING) console.group('RTT: IF,', refTrackState.trebs.get(parentBlock).defined.size, 'known bindings');
  if (REF_TRACK_TRACING) console.group('RTT: IF:before');
  logExitWritesX(refTrackState, parentBlock, 'onBeforeIf');

  if (REF_TRACK_TRACING) console.groupEnd(); // IF:before
}

export function openRefsOnAfterIf(refTrackState, node, parentBlock, walkerPath, globallyUniqueNamingRegistry, globallyUniqueLabelRegistry, loopStack, catchStack) {
  if (REF_TRACK_TRACING) console.group('RTT: IF:after @', node.$p.npid);

  const trebloTrue = refTrackState.trebs.get(node.consequent);
  const trebloFalse = refTrackState.trebs.get(node.alternate);

  if (REF_TRACK_TRACING) console.group('RTT: findAndQueueContinuationBlock(consequent, @', node.consequent.$p.npid, ')');
  findAndQueueContinuationBlock(refTrackState, trebloTrue, node.consequent.$p.npid, trebloTrue.wasAbruptType, trebloTrue.wasAbruptLabel, walkerPath, globallyUniqueLabelRegistry, loopStack, catchStack);
  if (REF_TRACK_TRACING) console.groupEnd();
  if (REF_TRACK_TRACING) console.group('RTT: findAndQueueContinuationBlock(alternate, @', node.alternate.$p.npid, ')');
  findAndQueueContinuationBlock(refTrackState, trebloFalse, node.alternate.$p.npid, trebloFalse.wasAbruptType, trebloFalse.wasAbruptLabel, walkerPath, globallyUniqueLabelRegistry, loopStack, catchStack);
  if (REF_TRACK_TRACING) console.groupEnd();

  const parentTreblo = refTrackState.trebs.get(parentBlock);
  const parentExitWrites = parentTreblo.exitWrites;
  const parentDefined = parentTreblo.defined;
  const parentOverwritten = parentTreblo.overwritten;
  const parentEntryReads = parentTreblo.entryReads;
  const parentEntryWrites = parentTreblo.entryWrites;
  const pendingNext = parentTreblo.pendingNext;

  ASSERT(pendingNext.every(({pid, wasAbruptType}) => pid === node.consequent.$p.npid || pid === node.alternate.$p.npid), 'either only find the if/else branches');
  ASSERT(pendingNext.length <= 2, 'should only be the consequent and alternate blocks', pendingNext.length, pendingNext.map(({pid}) => pid));
  ASSERT(!pendingNext[0] || pendingNext[0].pid === node.consequent.$p.npid || pendingNext[0].pid === node.alternate.$p.npid);
  ASSERT(!pendingNext[1] || pendingNext[1].pid === node.alternate.$p.npid);
  ASSERT(pendingNext.every(({wasAbrubtType}) => !wasAbrubtType), 'if either branch completed abruptly then they should have been scheduled elsewhere');

  propagateEntryReadWrites(node.consequent.$p.npid, trebloTrue, parentEntryReads, parentEntryWrites, parentDefined, parentOverwritten, parentBlock.$p.npid);
  propagateEntryReadWrites(node.alternate.$p.npid, trebloFalse, parentEntryReads, parentEntryWrites, parentDefined, parentOverwritten, parentBlock.$p.npid);

  propagateExitWrites(pendingNext, parentDefined, parentExitWrites, parentOverwritten, parentBlock.$p.npid);

  // The parent block should now have an updated exitWrites set for each of its bindings

  logExitWritesX(refTrackState, parentBlock, 'onAfterIf');
  if (REF_TRACK_TRACING) console.groupEnd(); // IF:after
  if (REF_TRACK_TRACING) console.groupEnd(); // IF
  if (REF_TRACK_TRACING) console.log('/IF');
}

export function openRefsOnBeforeLabel(refTrackState, node, parentBlock) {
  if (REF_TRACK_TRACING) console.group('RTT: LABEL,', refTrackState.trebs.get(parentBlock).defined.size, 'known bindings');
  if (REF_TRACK_TRACING) console.group('RTT: LABEL:before');
  logExitWritesX(refTrackState, node, 'onBeforeLabel');

  if (REF_TRACK_TRACING) console.groupEnd(); // LABEL:before
}

export function openRefsOnAfterLabel(refTrackState, node, parentBlock, walkerPath, globallyUniqueNamingRegistry, globallyUniqueLabelRegistry, loopStack, catchStack) {
  if (REF_TRACK_TRACING) console.group('RTT: LABEL:after', node.$p.newAbrupt);

  if (node.body.type !== 'BlockStatement') {
    if (REF_TRACK_TRACING) console.log('RTT: label body is a loop so not propagating ref stuff');
  } else {
    const treblo = refTrackState.trebs.get(node.body);
    const parentTreblo = refTrackState.trebs.get(parentBlock);
    const parentExitWrites = parentTreblo.exitWrites;
    const parentDefined = parentTreblo.defined;
    const parentOverwritten = parentTreblo.overwritten;
    const parentEntryReads = parentTreblo.entryReads;
    const parentEntryWrites = parentTreblo.entryWrites;
    const pendingNext = parentTreblo.pendingNext;

    if (REF_TRACK_TRACING) console.group('RTT: findAndQueueContinuationBlock(label, @', node.body.$p.npid, ')');
    findAndQueueContinuationBlock(refTrackState, treblo, node.body.$p.npid, treblo.wasAbruptType, treblo.wasAbruptLabel, walkerPath, globallyUniqueLabelRegistry, loopStack, catchStack);
    if (REF_TRACK_TRACING) console.groupEnd();

    propagateEntryReadWrites(node.body.$p.npid, treblo, parentEntryReads, parentEntryWrites, parentDefined, parentOverwritten, parentBlock.$p.npid);

    propagateExitWrites(pendingNext, parentDefined, parentExitWrites, parentOverwritten, parentBlock.$p.npid);
  }

  logExitWritesX(refTrackState, node, 'onAfterLabel');
  if (REF_TRACK_TRACING) console.groupEnd(); // LABEL:after
  if (REF_TRACK_TRACING) console.groupEnd(); // LABEL
  if (REF_TRACK_TRACING) console.log('/LABEL');
}

export function openRefsOnBeforeLoop(refTrackState, kind /*: while */, node, parentBlock) {
  if (REF_TRACK_TRACING) console.group('RTT: LOOP,', kind);
  if (REF_TRACK_TRACING) console.group('RTT: LOOP:before,', kind, ', has', refTrackState.trebs.get(parentBlock).defined.size, 'known bindings');
  logExitWritesX(refTrackState, parentBlock, 'onBeforeLoop');

  refTrackState.trabs.set(node, createTrebra());

  if (REF_TRACK_TRACING) console.groupEnd(); // LOOP:before
}

export function openRefsOnAfterLoop(refTrackState, kind /* loop | in | of */, node, parentBlock, walkerPath, globallyUniqueLabelRegistry, loopStack, tryNodeStack, catchStack, isUnreachableAfter = false) {
  if (REF_TRACK_TRACING) console.group('RTT: LOOP:after,', kind, 'after @', node.$p.npid);

  /** @var {Treblo} */
  const treblo = refTrackState.trebs.get(node.body);
  const trebra = refTrackState.trabs.get(node);

  if (REF_TRACK_TRACING) console.log('Current exitWrite status of loop body:', debugStringMapOfSetOfReadOrWrites(treblo.exitWrites));

  if (REF_TRACK_TRACING) {
    console.log('[loop] EntryWrites in loop body:');
    treblo.entryWrites.forEach((set, name) => {
      console.log(`  ${name}:`, Array.from(set).map(w => w.node.$p.npid));
    });
    console.log('[loop] ExitWrites in loop body:');
    treblo.exitWrites.forEach((set, name) => {
      console.log(`  ${name}:`, Array.from(set).map(w => w.node.$p.npid));
    });
  }

  if (REF_TRACK_TRACING) console.group('RTT: findAndQueueContinuationBlock(loop, @', node.body.$p.npid, ')');
  findAndQueueContinuationBlock(refTrackState, treblo, node.body.$p.npid, treblo.wasAbruptType, treblo.wasAbruptLabel, walkerPath, globallyUniqueLabelRegistry, loopStack, catchStack);
  if (REF_TRACK_TRACING) console.groupEnd();

  // Keep in mind: we assume normalized code, so loops are while(true), there is no for/do

  const parentTreblo = refTrackState.trebs.get(parentBlock);
  const parentExitWrites = parentTreblo.exitWrites;
  const parentDefined = parentTreblo.defined;
  const parentOverwritten = parentTreblo.overwritten;
  const parentEntryReads = parentTreblo.entryReads;
  const parentEntryWrites = parentTreblo.entryWrites;

  if (REF_TRACK_TRACING) {
    console.log('[loop] EntryReads just before propagateEntryReadWrites:');
    treblo.entryReads.forEach((set, name) => {
      console.log(`  ${name}:`, Array.from(set).map(w => w.node.$p.npid));
    });
    console.log('[loop] EntryWrites just before propagateEntryReadWrites:');
    treblo.entryWrites.forEach((set, name) => {
      console.log(`  ${name}:`, Array.from(set).map(w => w.node.$p.npid));
    });
    console.log('[loop] Parent ExitWrites (not propagated in this step):');
    parentExitWrites.forEach((set, name) => {
      console.log(`  ${name}:`, Array.from(set).map(w => w.node.$p.npid));
    });
  }

  propagateEntryReadWrites(node.body.$p.npid, treblo, parentEntryReads, parentEntryWrites, parentDefined, parentOverwritten, parentBlock.$p.npid);

  // Connect the end of the loop to the start
  // Do this first because it also updates the overwritten of nodes that break to or through this node, which is necessary info to process any that break to here.

  const pendingLoop = treblo.pendingLoop;
  if (REF_TRACK_TRACING) console.group('TTR: pendingLoop has', pendingLoop.length, `blocks that jump to repeat the loop (from ${pendingLoop.map(({pid, dst}) => `@${pid}->@${dst.$p.npid}`)}). Processing`, parentDefined.size, 'bindings that were known in the parent.');
  const queue = [];
  parentDefined.forEach(bindingNameBeforeLoop => {
    if (REF_TRACK_TRACING) console.group(`TTR: - \`${bindingNameBeforeLoop}\`: Loop body has ${treblo.entryReads.get(bindingNameBeforeLoop)?.size??0} entryReads and ${treblo.entryWrites.get(bindingNameBeforeLoop)?.size??0} entryWrites, now for each pendingLoop for this var:`);
    pendingLoop.forEach(({pid, exitWrites}, i) => {
      const set = exitWrites.get(bindingNameBeforeLoop);
      if (REF_TRACK_TRACING) console.group(`TTR: pendingLoop[${i}], from @`, pid, ', connect reads and writes and processing', refTrackState.trabs.get(node).pendingLoopWriteChecks.length, 'pendingLoopWriteChecks');

      // Connect exitWrites of the source node to entryReads and entryWrites of the loop body

      if (REF_TRACK_TRACING) {
        if (set?.size) {
          console.log(`pendingLoop[${i}] has these exitWrites:`, debugStringListOfReadOrWrites(set || []));
          if (treblo.entryReads.get(bindingNameBeforeLoop)?.size) {
            console.log('- entryReads to connect to:', debugStringListOfReadOrWrites(treblo.entryReads.get(bindingNameBeforeLoop)));
          } else {
            console.log('- entryReads to connect to: <none>');
          }
          if (treblo.entryWrites.get(bindingNameBeforeLoop)?.size) {
            console.log('- entryWrites to connect to:', debugStringListOfReadOrWrites(treblo.entryWrites.get(bindingNameBeforeLoop)));
          } else {
            console.log('- entryWrites to connect to: <none>');
          }
        } else {
          console.log('Pending no exitWrites');
        }
        console.log(`TTR: there are`, trebra.pendingLoopWriteChecks.length, `pendingLoopWriteChecks;`);
      }

      set?.forEach(write => {
        treblo.entryReads.get(bindingNameBeforeLoop)?.forEach(read => {
          write.reachedByReads.add(read);
          read.reachesWrites.add(write);
        });
        treblo.entryWrites.get(bindingNameBeforeLoop)?.forEach(write2 => {
          write.reachedByWrites.add(write2);
          write2.reachesWrites.add(write);
        });
        if (REF_TRACK_TRACING) console.group();
        refTrackState.trabs.get(node).pendingLoopWriteChecks.forEach(({ srcPid, exitWrites, mutatedRefs }, i) => {
          if (REF_TRACK_TRACING) console.group(`TTR: pendingLoopWriteChecks[${bindingNameBeforeLoop}][${i}][write@${write.node.$p.npid}]; from @${srcPid}, mutatedRefs: ${Array.from(mutatedRefs).join(',')||'<none>'}`);

          // Note: This mutatedRefs is a live _reference_ to refTrackState.trebs.get(srcBlock).pendingNext[].mutatedBetweenSrcAndDst
          //       The loop will mutated it but those mutations are deferred until after the loop.
          if (mutatedRefs.has(bindingNameBeforeLoop)) {
            if (REF_TRACK_TRACING) console.log(`TTR: - from @`, srcPid, `NOT adding write @$`, write.node.$p.npid, `for "${bindingNameBeforeLoop}" to exitWrites of srcBlock @`, srcPid, `because mutatedRefs already contained it, so it was already overwritten so the current exitWrite(s) should be the correct one`);
          } else {
            if (REF_TRACK_TRACING) console.log(`TTR: - from @`, srcPid, `Adding write @`, write.node.$p.npid, `for "${bindingNameBeforeLoop}" to exitWrites of srcBlock @`, srcPid, `(because of loop)`);
            upsertGetSet(exitWrites, bindingNameBeforeLoop, write);
            if (treblo.overwritten.has(bindingNameBeforeLoop)) {
              if (REF_TRACK_TRACING) console.log(`[mutatedRefs] Added ${bindingNameBeforeLoop} to mutatedRefs in block @${srcPid}`);
              if (REF_TRACK_TRACING) console.log(`TTR: - Marking "${bindingNameBeforeLoop}" as (always) overwritten in queued continuation from block @${srcPid} because it was such at end of loop body`);
              // Defer updating mutatedRefs otherwise this loop will incorrectly consider other mutations for the
              // same var as "already mutated, ignore", which leads to bugs. example: tests/cases/ref_tracking/loop_regression.md
              queue.push(() => mutatedRefs.add(bindingNameBeforeLoop)); // defer
            }
          }
          if (REF_TRACK_TRACING) console.groupEnd(); // pendingLoopWriteChecks inner
        });
        if (REF_TRACK_TRACING) console.groupEnd(); // pendingLoopWriteChecks outer
      });

      if (REF_TRACK_TRACING) console.groupEnd(); // pendingLoop iteration
    });
    if (REF_TRACK_TRACING) console.groupEnd();
  });
  if (REF_TRACK_TRACING) console.groupEnd();
  queue.forEach(f => f());

  // Do the normal thing with pending continuations

  const pendingNext = parentTreblo.pendingNext;

  if (REF_TRACK_TRACING) {
    console.group('[loop] ExitWrites just before propagateExitWrites:');
    console.group('Parent ExitWrites:');
    parentExitWrites.forEach((set, name) => {
      console.log(`  ${name}:`, Array.from(set).map(w => w.node.$p.npid));
    });
    console.groupEnd();
    console.log('To be merged with these Pending ExitWrites:');
    pendingNext.forEach((p,i) => {
      console.group('Pending', i);
      p.exitWrites.forEach((set, name) => {
        console.log(`  ${name}:`, Array.from(set).map(w => w.node.$p.npid));
      });
      console.groupEnd();
    });
    console.groupEnd();
  }

  // TODO: figure out if this is what I want/need and why this patch is incomplete
  // // If all code paths exiting the loop (i.e., all entries in parentTreblo.pendingNext)
  // // have the variable in mutatedBetweenSrcAndDst, then all loop body paths assign to it.
  // // In that case, we prune the parent's exitWrites for that variable to only the writes
  // // created in the loop body (i.e., those in treblo.entryWrites). This prevents pre-loop
  // // writes from being considered reachable after the loop, which is correct for normalized
  // // code where the loop body is always entered at least once.
  // parentDefined.forEach((name) => {
  //   const entryWrites = treblo.entryWrites.get(name);
  //   if (entryWrites && entryWrites.size > 0) {
  //     parentExitWrites.set(name, new Set(entryWrites));
  //     parentOverwritten.add(name);
  //   }
  // });

  // // After the loop, check if the loop is infinite (no path escapes)
  // const escapesLoop = parentTreblo.pendingNext.some(
  //   pending => pending.pid !== node.body.$p.npid
  // );
  // if (!escapesLoop) {
  //   parentExitWrites.clear();
  // } else {
    propagateExitWrites(pendingNext, parentDefined, parentExitWrites, parentOverwritten, parentBlock.$p.npid);
  // }

  if (REF_TRACK_TRACING) {
    console.log('[loop] Parent ExitWrites after propagateExitWrites:');
    parentExitWrites.forEach((set, name) => {
      console.log(`  ${name}:`, Array.from(set).map(w => w.node.$p.npid));
    });
  }

  // The parent block should now have an updated exitWrites set for each o1f its bindings

  logExitWritesX(refTrackState, parentBlock, 'onAfterLoop');
  if (REF_TRACK_TRACING) console.groupEnd(); // LOOP:after
  if (REF_TRACK_TRACING) console.groupEnd(); // LOOP
  if (REF_TRACK_TRACING) console.log('/LOOP');
}

export function openRefsOnBeforeBreak(refTrackState, node, blockStack) {
  if (REF_TRACK_TRACING) console.group('RTT: BREAK');
  if (REF_TRACK_TRACING) console.group('RTT: BREAK:before');
  logExitWritesX(refTrackState, blockStack[blockStack.length - 1], 'onBeforeBreak');

  refTrackState.trebs.get(blockStack[blockStack.length - 1]).wasAbruptType = 'break';
  refTrackState.trebs.get(blockStack[blockStack.length - 1]).wasAbruptLabel = node.label?.name;

  if (REF_TRACK_TRACING) console.groupEnd(); // BREAK:before
}

export function openRefsOnAfterBreak(refTrackState, node, blockStack) {
  if (REF_TRACK_TRACING) console.group('RTT: BREAK:after');

  logExitWritesX(refTrackState, blockStack[blockStack.length - 1], 'onAfterBreak');
  if (REF_TRACK_TRACING) console.groupEnd(); // BREAK:after
  if (REF_TRACK_TRACING) console.groupEnd(); // BREAK
}

export function openRefsOnBeforeReturn(refTrackState, blockStack, node) {
  if (REF_TRACK_TRACING) console.group('RTT: RETURN');
  if (REF_TRACK_TRACING) console.group('RTT: RETURN:before');
  logExitWritesX(refTrackState, blockStack[blockStack.length - 1], 'onBeforeReturn');

  refTrackState.trebs.get(blockStack[blockStack.length - 1]).wasAbruptType = 'return';
  refTrackState.trebs.get(blockStack[blockStack.length - 1]).wasAbruptLabel = undefined;

  if (REF_TRACK_TRACING) console.groupEnd(); // RETURN:before
}

export function openRefsOnAfterReturn(refTrackState, blockStack, node) {
  if (REF_TRACK_TRACING) console.group('RTT: RETURN:after');

  logExitWritesX(refTrackState, blockStack[blockStack.length - 1], 'onAfterReturn');
  if (REF_TRACK_TRACING) console.groupEnd(); // RETURN:after
  if (REF_TRACK_TRACING) console.groupEnd(); // RETURN
}

export function openRefsOnBeforeThrow(refTrackState, blockStack, node) {
  if (REF_TRACK_TRACING) console.group('RTT: THROW');
  if (REF_TRACK_TRACING) console.group('RTT: THROW:before');
  logExitWritesX(refTrackState, blockStack[blockStack.length - 1], 'onBeforeThrow');

  refTrackState.trebs.get(blockStack[blockStack.length - 1]).wasAbruptType = 'throw';
  refTrackState.trebs.get(blockStack[blockStack.length - 1]).wasAbruptLabel = undefined;

  if (REF_TRACK_TRACING) console.groupEnd(); // THROW:before
}

export function openRefsOnAfterThrow(refTrackState, blockStack, node) {
  if (REF_TRACK_TRACING) console.group('RTT: THROW:after');

  logExitWritesX(refTrackState, blockStack[blockStack.length - 1], 'onAfterThrow');
  if (REF_TRACK_TRACING) console.groupEnd(); // THROW:before
  if (REF_TRACK_TRACING) console.groupEnd(); // THROW
}

export function openRefsOnBeforeTryNode(refTrackState, node, parentBlock) {
  // (Root node, versus the body/catch body)

  if (REF_TRACK_TRACING) console.group('RTT: TRY');
  if (REF_TRACK_TRACING) console.group('RTT: TRY:before,', refTrackState.trebs.get(parentBlock).defined.size, 'known bindings before the `try`');
  logExitWritesX(refTrackState, parentBlock, 'onBeforeTryNode');

  //refTrackState.trabs.get(node) = createTrebra();

  if (REF_TRACK_TRACING) console.groupEnd(); // TRY:before
}

export function openRefsOnAfterTryNode(refTrackState, node, parentBlock, globallyUniqueLabelRegistry, loopStack) {
  // (Root node, versus the body/catch body)
  if (REF_TRACK_TRACING) console.group('RTT: TRY:after');

  const parentTreblo = refTrackState.trebs.get(parentBlock);
  const parentExitWrites = parentTreblo.exitWrites;
  const parentDefined = parentTreblo.defined;
  const parentOverwritten = parentTreblo.overwritten;

  // Now resolve the parent pending. There can't be any loop pending to process after an `if`.

  const pendingNext = parentTreblo.pendingNext;

  propagateExitWrites(pendingNext, parentDefined, parentExitWrites, parentOverwritten, parentBlock.$p.npid)

  logExitWritesX(refTrackState, parentBlock, 'onAfterTryNode');
  if (REF_TRACK_TRACING) console.groupEnd(); // TRY:after
  if (REF_TRACK_TRACING) console.groupEnd(); // TRY
  if (REF_TRACK_TRACING) console.log('/TRY');
}

export function openRefsOnBeforeTryBody(refTrackState, node, parentBlock) {
  // This is after the `try-block` but before returning on the whole TryStatement node
  // Not much to do here tbh (even the log is done in caller)

  if (REF_TRACK_TRACING) console.group('RTT: TRY:BODY');
  if (REF_TRACK_TRACING) console.group('RTT: TRY:BODY:before');
  logExitWritesX(refTrackState, parentBlock, 'onBeforeTryBody');

  if (REF_TRACK_TRACING) console.groupEnd(); // TRY:BODY:before
}

export function openRefsOnAfterTryBody(refTrackState, node, parentTryNode, parentBlock, walkerPath, globallyUniqueLabelRegistry, loopStack, tryNodeStack, catchStack, globallyUniqueNamingRegistry) {
  if (REF_TRACK_TRACING) console.group('RTT: TRY:BODY:after');

  // Only the try body continues (potentially) in the catch body. You can't break to it etc.

  ASSERT(parentTryNode.type === 'TryStatement', 'right?');

  const treblo = refTrackState.trebs.get(node);
  const parentTreblo = refTrackState.trebs.get(parentBlock);
  const parentDefined = parentTreblo.defined;
  const parentOverwritten = parentTreblo.overwritten;
  const parentEntryReads = parentTreblo.entryReads;
  const parentEntryWrites = parentTreblo.entryWrites;

  if (REF_TRACK_TRACING) console.log('RTT: exitWrites:', debugStringMapOfSetOfReadOrWrites(treblo.exitWrites));

  if (REF_TRACK_TRACING) console.group('RTT: findAndQueueContinuationBlock(try.block, @', node.$p.npid, ')');
  findAndQueueContinuationBlock(refTrackState, treblo, node.$p.npid, treblo.wasAbruptType, treblo.wasAbruptLabel, walkerPath, globallyUniqueLabelRegistry, loopStack, catchStack);
  if (REF_TRACK_TRACING) console.groupEnd();

  // Note: We never propagate the exitWrites to the parent because the Catch will consume these

  propagateEntryReadWrites(node.$p.npid, treblo, parentEntryReads, parentEntryWrites, parentDefined, parentOverwritten, parentBlock.$p.npid);

  logExitWritesX(refTrackState, parentBlock, 'onAfterTryBody');
  if (REF_TRACK_TRACING) console.groupEnd(); // TRY:BODY:after
  if (REF_TRACK_TRACING) console.groupEnd(); // TRY:BODY
}

export function openRefsOnBeforeCatchBody(refTrackState, node, parentNode, parentProp, parentTryNode, parentBlock, globallyUniqueNamingRegistry) {
  // This is after the `try block`, right before entering its `catch block`

  if (REF_TRACK_TRACING) console.group('RTT: TRY:CATCH');
  if (REF_TRACK_TRACING) console.group('RTT: TRY:CATCH:before');
  logExitWritesX(refTrackState, parentBlock, 'onBeforeCatchBody'); // TODO: what's the proper block?
  ASSERT(parentTryNode.type === 'TryStatement', 'right?');
  ASSERT(parentNode.type === 'CatchClause', 'right?');

  // This Catch has access to all writes anywhere inside the Try Block and considers them all exitWrites.

  const tryPid = parentTryNode.$p.npid;
  const catchPid = node.$p.npid;
  const parentTreblo = refTrackState.trebs.get(parentBlock);
  const parentExitWrites = parentTreblo.exitWrites;
  const parentDefined = parentTreblo.defined;
  const catchExitWrites = refTrackState.trebs.get(node).exitWrites;


  // Since the Catch exitWrites should contain all writes from anywhere in the Try Block, we don't
  // have to worry about pre-existing exitWrites. Either we'll add existing writes to the set (which
  // is a noop) or we'll add a new one. No need to clear it.
  parentDefined.forEach((name) => {
    if (REF_TRACK_TRACING) console.log('RTT: copying', parentExitWrites.get(name)?.size??0, `exitWrites for "${name}" from before the Try to the set of initial exitWrites for the Catch Block`);
    parentExitWrites.get(name)?.forEach(write => upsertGetSet(catchExitWrites, name, write));
    if (REF_TRACK_TRACING) console.log(`RTT: copying all writes to  "${name}" after the Try Block and before the Catch to the set of initial exitWrites for the Catch`);
    globallyUniqueNamingRegistry.get(name).writes.forEach(write => {
      const pid = write.node.$p.npid;
      if (pid > tryPid && pid < catchPid) upsertGetSet(catchExitWrites, name, write);
    });
    if (REF_TRACK_TRACING) console.log(`RTT: \`${name}\` now has ${catchExitWrites.size} exitWrites in the Catch`);
    // Overwritten is same as it was before the Try since in theory none of the writes might have succeeded when hitting the catch
  });

  if (REF_TRACK_TRACING) console.groupEnd(); // TRY:CATCH:before
}

export function openRefsOnAfterCatchBody(refTrackState, node, walkerPath, parentNode, parentProp, grandNode, parentBlock, globallyUniqueLabelRegistry, loopStack, tryNodeStack, catchStack) {
  if (REF_TRACK_TRACING) console.group('RTT: TRY:CATCH:after');

  // Note: in normalized code there is no Finally at all

  ASSERT(grandNode.type === 'TryStatement', 'right?');

  // Code flow naturally continues in parentBlock
  // There are no "pendingNext" to consider other than this block because flow continues
  // in the parentBlock unless there's an explicit abrupt completion that says otherwise.
  // For example, a label is always wrapped in a block or loop so
  //       x: { try { } catch { break x; } }
  // would not continue in the parentBlock of the Try but rather
  // the Block outside of it. Similar for continue.
  // But what about caught throws?
  //       try {} catch { try { } catch { throw x; } }
  // In this case the Catch considers all writes to x inside the Try Block as (initial)
  // exitWrites, which will be a super set of the exitWrites at the time of throwing. As
  // such, the throw won't add new information regarding entry/exit rw logic and we don't care?

  // Note: the Catch Block may have still completed abruptly.

  const parentTreblo = refTrackState.trebs.get(parentBlock);
  const catchTreblo = refTrackState.trebs.get(node);
  const parentDefined = parentTreblo.defined;
  const parentEntryReads = parentTreblo.entryReads;
  const parentEntryWrites = parentTreblo.entryWrites;
  const parentOverwritten = parentTreblo.overwritten;

  if (REF_TRACK_TRACING) console.group('RTT: findAndQueueContinuationBlock(catch.body, @', node.$p.npid, ')');
  findAndQueueContinuationBlock(refTrackState, catchTreblo, node.$p.npid, catchTreblo.wasAbruptType, catchTreblo.wasAbruptLabel, walkerPath, globallyUniqueLabelRegistry, loopStack, catchStack);
  if (REF_TRACK_TRACING) console.groupEnd();

  propagateEntryReadWrites(node.$p.npid, catchTreblo, parentEntryReads, parentEntryWrites, parentDefined, parentOverwritten, parentBlock.$p.npid);

  logExitWritesX(refTrackState, node, 'onAfterCatchBody'); // TODO: what's the proper block?
  if (REF_TRACK_TRACING) console.groupEnd(); // TRY:CATCH:after
  if (REF_TRACK_TRACING) console.groupEnd(); // TRY:CATCH
  if (REF_TRACK_TRACING) console.log('/CATCH');
}

export function openRefsOnBeforeCatchNode(refTrackState, node, parentNode) {
  if (REF_TRACK_TRACING) console.group('RTT: catch clause:before');
}

export function openRefsOnBeforeCatchVar(refTrackState) {
  if (REF_TRACK_TRACING) console.group('RTT: openRefsOnBeforeCatchVar()');
}
export function openRefsOnAfterCatchVar(refTrackState, node, parentNode, parentProp, parentBlock) {
  if (REF_TRACK_TRACING) console.groupEnd(); // openRefsOnBeforeCatchVar
}
export function openRefsOnAfterCatchNode(refTrackState, node, parentBlock, globallyUniqueLabelRegistry, loopStack, tryNodeStack) {
  if (REF_TRACK_TRACING) console.groupEnd(); // openRefsOnBeforeCatchNode()
}

export function openRefsOnBeforeRef(refTrackState, kind, node, parentNode, parentProp, parentIndex, meta) {
  if (node.name === '$') { if (REF_TRACK_TRACING) console.group(); }
  else if (REF_TRACK_TRACING) console.group('RTT: ref:before; on::ref @', node.$p.npid, ': Ref:', [node.name], 'with kind', [kind], 'on a', parentNode.type + '.'+ parentProp + (parentIndex >= 0 ? '[' + parentIndex + ']' : ''), '( builtin=', meta.isBuiltin, ', implicit=', meta.isImplicitGlobal, ')');
}

export function openRefsOnAfterRef(refTrackState, kind, node, parentNode, parentProp, parentIndex, meta) {
  if (node.name === '$') { if (REF_TRACK_TRACING) console.groupEnd(); }
  else if (REF_TRACK_TRACING) console.groupEnd(); // openRefsOnBeforeRef
}

export function openRefsOnBeforeRead(refTrackState, read, blockNode) {
  const name = read.node.name;

  if (name === '$') return; // Special debugging symbol. Should be global. This analysis doesn't apply to globals. Noisy in tests. So skip it.

  if (REF_TRACK_TRACING) console.group('RTT: on::read:before, recording', /read/, 'reference to', [name]);
  if (name === 'x') logExitWritesX(refTrackState, blockNode, 'onBeforeReadRef');

  /** @var {Treblo} */
  const treblo = refTrackState.trebs.get(blockNode);
  ASSERT(treblo, 'the treblo should be set on this block...');

  // For all intentions and purposes, right now the next read can only see this write.
  // It's only for reconciling branching blocks where it might have multiple open writes
  // Note: `let x = 1; while (true) { $(x) x = 2; }` is fixed by connect pre-write-reads to last-writes after a loop.

  if (REF_TRACK_TRACING) console.log('There are', treblo.exitWrites.get(name)?.size ?? 0, 'exitWrites this read can reach in block @', blockNode.$p.npid);

  // It is an entryRead if the binding has not been written to yet in this block. The entryReads are relevant for loops, later.
  const isEntryRead = treblo.overwritten.has(name);
  if (isEntryRead) {
    if (REF_TRACK_TRACING) console.log('Since binding was already overwritten in this block, @', read.node.$p.npid, 'is not an entryRead');
  } else {
    if (REF_TRACK_TRACING) console.log('Marking @', read.node.$p.npid, 'as an entryRead for its block @', blockNode.$p.npid);
    treblo.entryReads.get(name)?.add(read) ?? treblo.entryReads.set(name, new Set([read]));
  }

  // An read can reach all current exitWrites ("open writes" or "lastWrites")
  treblo.exitWrites.get(name)?.forEach(write => {
    if (REF_TRACK_TRACING) console.log('- Read', read.node.$p.npid, 'can reach write', write.node.$p.npid);
    write.reachedByReads.add(read);
    read.reachesWrites.add(write);
  });

  upsertGetSet(treblo.reads, name, read);
  upsertGetPush(treblo.rwOrder, name, read);

  if (name === 'x') logExitWritesX(refTrackState, blockNode, 'onAfterReadRef');
  if (REF_TRACK_TRACING) console.groupEnd(); // ref:read:before
}

export function openRefsOnBeforeWrite(refTrackState, write, blockNode) {
  const name = write.node.name;

  if (name === '$') return; // Special debugging symbol. Should be global. This analysis doesn't apply to globals. Noisy in tests. So skip it.

  if (REF_TRACK_TRACING) console.group('RTT: on::write:before, recording', /write/, 'reference');
  if (name === 'x') logExitWritesX(refTrackState, blockNode, 'onBeforeRefWrite');

  /** @var {Treblo} */
  const treblo = refTrackState.trebs.get(blockNode);
  ASSERT(treblo, 'the treblo should be set on this block...');

  if (write.parentNode.type === 'VarStatement') {
    if (REF_TRACK_TRACING) console.log('Adding binding to owner block @', write.parentBlockNode.$p.npid, '(', write.parentBlockNode.type, ')');
    treblo.defined.add(name);
  }

  if (treblo.overwritten.has(name)) {
    if (REF_TRACK_TRACING) console.log('Since binding was already overwritten in this block, @', write.node.$p.npid, 'is not an entryWrite');
  } else {
    if (REF_TRACK_TRACING) console.log('Since binding was not yet overwritten in this block, @', write.node.$p.npid, 'is an entryWrite, mark it as overwritten now in @', blockNode.$p.npid);
    upsertGetSet(treblo.entryWrites, name, write);
    treblo.overwritten.add(name);
  }

  // This write can reach all exitWrites ("open writes" or "lastWrites")
  treblo.exitWrites.get(name)?.forEach(write1 => {
    if (REF_TRACK_TRACING) console.log('- Write', write.node.$p.npid, 'overwrites write', write1.node.$p.npid);
    write1.reachedByWrites.add(write);
    write.reachesWrites.add(write1);
  });

  // For all intentions and purposes, right now the next read can only see this write.
  // It shadows all previous writes for any statements in that follow in the same block. So replace the list.
  // It's only for reconciling branching blocks where the set might have multiple open writes
  if (REF_TRACK_TRACING) console.log('Setting exitWrites of block @', blockNode.$p.npid, 'to only the write @', write.node.$p.npid);
  treblo.exitWrites.set(name, new Set([write])); // Is clearing it and reusing the set faster/better? :shrug:

  upsertGetPush(treblo.writes, name, write);
  upsertGetPush(treblo.rwOrder, name, write);

  if (name === 'x') logExitWritesX(refTrackState, blockNode, 'onAfterRefWrite');
  if (REF_TRACK_TRACING) console.groupEnd(); // ref:write:before
}

export function dumpOpenRefsState(refTrackState, globallyUniqueNamingRegistry) {
  if (REF_TRACK_TRACING) console.log('RTT: State of globallyUniqueNamingRegistry after:');
  if (REF_TRACK_TRACING) Array.from(globallyUniqueNamingRegistry.entries()).map(([name, meta]) => {
    if (meta.isImplicitGlobal || meta.isGlobal || meta.isBuiltin) return;
    console.group('RTT:', [name], ':');
    // Note: meta.reOrder is created in phase2
    (meta.reads || []).concat(meta.writes || []).sort((a, b) => a.node.$p.npid - b.node.$p.npid)
    .forEach(rw => {
      console.log('- @', rw.node.$p.npid, ';', rw.action, ';',
        [
          rw.action === 'read' ? (rw.reachesWrites.size ? 'canRead: ' + Array.from(rw.reachesWrites).map(write => write.node.$p.npid) : 'can not read any writes (TDZ?)') : '',
          rw.action === 'write' ? (rw.reachedByReads.size ? 'readBy: ' + Array.from(rw.reachedByReads).map(read => read.node.$p.npid) : 'not read') : '',
          rw.action === 'write' ? (rw.reachesWrites.size ? 'overwrites: ' + Array.from(rw.reachesWrites).map(write => write.node.$p.npid) : 'does not overwrite') : '',
          rw.action === 'write' ? (rw.reachedByWrites.size ? 'overwrittenBy: ' + Array.from(rw.reachedByWrites).map(write => write.node.$p.npid) : 'not overwritten') : '',
        ].filter(Boolean).join(', ')
      );
    });
    console.groupEnd();
    console.log('\n');
  });
}

function findAndQueueContinuationBlock(refTrackState, fromBlockTreblo, fromBlockPid, wasAbruptType, wasAbruptLabel, walkerPath, globallyUniqueLabelRegistry, loopStack, catchStack) {
  if (wasAbruptType === 'return' || wasAbruptType === 'throw') {
    // Without finally, there's nothing that can observe a return or a throw
    // before it leaves the function (after which this analysis doesn't care).
    // Furthermore, the implicit throw case is handled separately at the Catch
    // node handler and it supersedes any explicit throws.
    // As such, we don't need to schedule either of them here.
    if (REF_TRACK_TRACING) console.log(`RTT: Not scheduling return or throw completions ("${wasAbruptType}") as they cant be observed in normalized code before leaving the function`);
    return;
  }

  const srcBlockMutatedBetweenSrcAndDst = new Set(fromBlockTreblo.overwritten);
  // Find the "parentBlock" of the statement that's executed _after_ each block.
  // This is the one we need to update, break, or not abrupt at all.
  // Return null if there's no need to update anything due to a `return`
  // There s always ever one. The implicit throw case is handled in the catch explicitly
  // and there is no finally (but even with finally it would be one).
  // First get the original target without checking for a catch
  // because regardless of anything else, that's a valid code path.
  // The given node is the parent block where code flow continues. The index is the statement.
  // If the index overflows then it continues in its parent, but we can ignore that here.
  // If the node is null then the code continues in an outer scope and we can ignore it here.
  let continuationBlock = findSimpleContinuationBlock(wasAbruptType, wasAbruptLabel, walkerPath, globallyUniqueLabelRegistry, loopStack);

  const nodes = walkerPath.nodes;
  const topIndex = nodes.length - 1;

  // This determines which `defined` set to use when iterating over var names.
  // This is usually the same as the continuationBlock, but there are some exceptions:
  // - return/throw has no continuation block. In that case it's the nearest scope floor (func/program)
  // - if throw and target is catch block then target is the parent block of its try
  let targetDefinedBlock = continuationBlock;
  if (!targetDefinedBlock) {
    if (REF_TRACK_TRACING) console.log('Have no continuationNode so finding nearest scope to use as `defined` target');
    let index = topIndex;
    while (nodes[index].type !== 'FunctionDeclaration' && nodes[index].type !== 'FunctionExpression' && nodes[index].type !== 'Program') {
      if (REF_TRACK_TRACING) console.log('TTR: ->',index,nodes[index].type)
      --index;
      ASSERT(index >= 0, 'must find program if nothing else');
    }
    ASSERT(nodes[index], 'must find a scope');
    targetDefinedBlock = nodes[index].type === 'Program' ? nodes[index] : nodes[index].body;
    if (REF_TRACK_TRACING) console.log('- The target block is @', targetDefinedBlock?.$p.npid);
  }

  // The catch block, unless abrupt completed itself, will continue with whatever node follows the parent
  // TryStatement node, regardless of the original target.
  // We only need the _nearest_ catch as we only want the continuation node here and the thrown
  // code flow never skips a catch "layer".

  // If there is no continuation block (return/throw) then target the nearest function boundary instead

  // Code may also loop if not abrupt and fromBlock is body of a loop (checked later)
  let loops = continuationBlock?.$p.npid === fromBlockPid; // (The Continue statement was eliminated so we only check for implicit loopers)
  if (REF_TRACK_TRACING) console.log(`TTR: Loops? Only if continuation block has same pid as from block (`, continuationBlock?.$p.npid === fromBlockPid, '), verdict:', loops);

  // If code doesn't abrupt then it can't go through a trap and we can skip this search
  if (wasAbruptType) {
    if (REF_TRACK_TRACING) console.group(`TTR: Queuing pendingLoopWriteChecks. Abrupt type=${wasAbruptType}.`);
    scheduleWrittensAtLoops(refTrackState, topIndex, wasAbruptType, fromBlockTreblo, srcBlockMutatedBetweenSrcAndDst, fromBlockPid, continuationBlock, nodes);
    if (REF_TRACK_TRACING) console.groupEnd(); // loop
  } else if (nodes[topIndex].type === 'BlockStatement' && nodes[topIndex-1].type === 'TryStatement' && walkerPath.props[walkerPath.props.length - 1] === 'block') {
    if (REF_TRACK_TRACING) console.log('TTR: This is a Try Block. It is trapped by its Catch');
  } else {
    if (REF_TRACK_TRACING) console.log(`TTR: Was not abrupt so cant go through catch trap`);
  }

  if (continuationBlock) {
    if (loops) {
      if (REF_TRACK_TRACING) console.log('TTR: scheduling looping from node @', fromBlockPid, 'in continuationBlock ("looping") @', continuationBlock.$p.npid, ', with overwritten:', Array.from(fromBlockTreblo.overwritten), ', and srcBlockMutatedBetweenSrcAndDst:', srcBlockMutatedBetweenSrcAndDst);
      refTrackState.trebs.get(continuationBlock).pendingLoop.push({
        pid: fromBlockPid,
        entryReads: fromBlockTreblo.entryReads,
        entryWrites: fromBlockTreblo.entryWrites,
        exitWrites: fromBlockTreblo.exitWrites,
        dst: continuationBlock,
        mutatedBetweenSrcAndDst: srcBlockMutatedBetweenSrcAndDst
      });
    } else {
      if (REF_TRACK_TRACING) console.log('TTR: scheduling from node @', fromBlockPid, 'in continuationBlock (not "looping") @', continuationBlock.$p.npid, ', with overwritten:', Array.from(fromBlockTreblo.overwritten), ', and srcBlockMutatedBetweenSrcAndDst:', srcBlockMutatedBetweenSrcAndDst);
      refTrackState.trebs.get(continuationBlock).pendingNext.push({
        pid: fromBlockPid,
        dst: continuationBlock,
        wasAbruptType: fromBlockTreblo.wasAbruptType,
        wasAbruptLabel: fromBlockTreblo.wasAbruptLabel,
        entryReads: fromBlockTreblo.entryReads,
        entryWrites: fromBlockTreblo.entryWrites,
        exitWrites: fromBlockTreblo.exitWrites,
        overwritten: fromBlockTreblo.overwritten,
        mutatedBetweenSrcAndDst: srcBlockMutatedBetweenSrcAndDst
      });
    }
  }
}
function findSimpleContinuationBlock(wasAbruptType, wasAbruptLabel, walkerPath, globallyUniqueLabelRegistry, loopStack) {
  if (!wasAbruptType) {
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
        case 'WhileStatement': {
          // Code logic continues with the body of the loop. So of the current Block.
          const target = walkerPath.nodes[index].body;
          if (REF_TRACK_TRACING) console.log(`TTR: leaving a block with loop as parent and since it was not abrupt, continuationBlock is same block (@${target.$p.npid})`);
          return target;
        }
      }
    }

    while (walkerPath.nodes[--index].type !== 'BlockStatement' && walkerPath.nodes[index].type !== 'Program') {
      // Keep searching. It must be there. Or the loop condition will eventually crash. That'd be a bad thing.
    }

    return walkerPath.nodes[index];
  }

  // See findContinuationBlock.
  // This func ignores the existence of catch concepts. (Finally does not exist in normalized code)
  if (wasAbruptType === 'break') {
    // code continues _after_ the node (next index in the parent block)
    if (wasAbruptLabel) {
      const labelNode = globallyUniqueLabelRegistry.get(wasAbruptLabel).node;
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
      // We need to walk up the AST because we need to get the _parent_ of the nearest loop
      // Parser should assert that the break is legal, so there must be a loop or a label
      const loopNode = loopStack[loopStack.length - 1];
      let top = walkerPath.nodes.length - 1;
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
  else {
    ASSERT(false, 'should be one of these cases (and cant be return or throw)', wasAbruptType);
  }

  ASSERT(false, 'unreachable');
}

/**
 * Schedule continuations that break through loops such that those continuations get their
 * overwritten updated once the loop connects exitWrites back to the start of the loop.
 * The `nodes` is from the walker. srcBlockMutatedBetweenSrcAndDst is by reference.
 */
function scheduleWrittensAtLoops(refTrackState, topIndex, wasAbruptType, fromBlockTreblo, srcBlockMutatedBetweenSrcAndDst, fromBlockPid, continuationBlock, nodes) {
  if (REF_TRACK_TRACING) console.log(`TTR: scheduleWrittensAtLoops(${wasAbruptType}), continuationBlock: ${continuationBlock ? `@${continuationBlock.$p.npid}` : '(none)'}, updating overwrittens with all ancestors`);

  let index = topIndex;
  while (continuationBlock ? nodes[index] !== continuationBlock : (nodes[index].type !== 'FunctionDeclaration' && nodes[index].type !== 'FunctionExpression' && nodes[index].type !== 'Program')) {
    const currentIndexNode = nodes[index];
    if (REF_TRACK_TRACING) console.group(`TTR: depth: ${index}, type=${currentIndexNode.type}, @${currentIndexNode.$p.npid}, overwritten state: ${Array.from(refTrackState.trebs.get(currentIndexNode)?.overwritten??[]).join(',')||'<none>'}`);

    refTrackState.trebs.get(currentIndexNode)?.overwritten.forEach(name => {
      if (REF_TRACK_TRACING) console.log(`Adding "${name}" to all pendingLoopWriteChecks.mutatedRefs being queued right now`);
      srcBlockMutatedBetweenSrcAndDst.add(name);
    });

    if (currentIndexNode.type === 'WhileStatement') {
      if (index === topIndex && currentIndexNode.body === continuationBlock) { // TODO: was this for a `continue`? cause we dropped them
        if (REF_TRACK_TRACING) console.log(`TTR: continues in same loop`);
        if (REF_TRACK_TRACING) console.groupEnd();
        break;
      }

      if (REF_TRACK_TRACING) console.log('TTR: Scheduling srcBlock @', fromBlockPid, 'in the pendingLoopWriteChecks of loop @', currentIndexNode.$p.npid, 'to update for any continuation that loops');
      if (REF_TRACK_TRACING) console.log('TTR: exitWrites just scheduled:', debugStringMapOfSetOfReadOrWrites(fromBlockTreblo.exitWrites), ', with overwrites (mutatedRefs):', Array.from(srcBlockMutatedBetweenSrcAndDst).join(',') || '<none>', fromBlockTreblo.overwritten);
      refTrackState.trabs.get(currentIndexNode).pendingLoopWriteChecks.push({
        abruptReason: wasAbruptType,
        srcPid: fromBlockPid,
        exitWrites: fromBlockTreblo.exitWrites, // by reference
        mutatedRefs: srcBlockMutatedBetweenSrcAndDst, // By reference... because the loop:after will update this with the loopers
      });
    }

    if (REF_TRACK_TRACING) console.groupEnd(); // inner loop

    --index;
    ASSERT(index >= 0, 'continuation block must be in the current list of parent nodes, or if there was none then a nearest function/program must be found');
  }
  if (REF_TRACK_TRACING) console.log(`TTR: final depth: ${index}, type=${nodes[index].type}, @${nodes[index].$p.npid}, final srcBlockMutatedBetweenSrcAndDst:`, srcBlockMutatedBetweenSrcAndDst);
}

/**
 * @template {V}
 * @param map {Map<string, Set<V>>}
 * @param key {string}
 * @param value {V}
 */
function upsertGetSet(map, key, value) {
  const set = map.get(key);
  if (set) set.add(value);
  else map.set(key, new Set([value]));
}

/**
 * @template {V}
 * @param map {Map<string, Array<V>>}
 * @param key {string}
 * @param value {V}
 */
function upsertGetPush(map, key, value) {
  const set = map.get(key);
  if (set) set.push(value);
  else map.set(key, [value]);
}

function propagateEntryReadWrites(pid, treblo, parentEntryReads, parentEntryWrites, parentDefined, parentOverwritten, parentBlockPid) {
  // Always do the next steps with the block(s) just traversed. Not the pending queue.
  // In this case the pendingNext are just the two blocks so it works out
  // Must therefor do this before updating the overwritten state, below
  if (REF_TRACK_TRACING) console.group(`RTT: propagateEntryReadWrites(): propagate entryReads (${debugStringMapOfSetOfReadOrWrites(treblo.entryReads)}) and entryWrites (${debugStringMapOfSetOfReadOrWrites(treblo.entryWrites)}) from @${pid} to the parent @`, parentBlockPid, 'which has these overwritten already:', Array.from(parentOverwritten).join(',')||'<none>');
  parentDefined.forEach(name => {
    // Note: this is only visible in loops since entryReads/entryWrites are not used again in normal flow.
    if (parentOverwritten.has(name)) {
      if (REF_TRACK_TRACING) console.log(`RTT: \`${name}\`: NOT propagating entryReads and entryWrites because parent has already overwritten it`);
    } else {
      if (REF_TRACK_TRACING) console.log(`RTT: \`${name}\`: propagating ${treblo.entryReads.get(name)?.size??0} entryReads, ${treblo.entryWrites.get(name)?.size??0} entryWrites from Block @`, pid, 'to the parent');
      treblo.entryReads.get(name)?.forEach((read) => upsertGetSet(parentEntryReads, name, read));
      treblo.entryWrites.get(name)?.forEach((write) => upsertGetSet(parentEntryWrites, name, write));
    }
  });
  if (REF_TRACK_TRACING) console.groupEnd();
}

function propagateExitWrites(pendingNext, parentDefined, parentExitWrites, parentOverwritten, parentBlockPid) {
  if (REF_TRACK_TRACING) {
    console.log('[propagateExitWrites] called for parentBlockPid:', parentBlockPid);
    console.log('  parentDefined:', Array.from(parentDefined));
    console.log('  parentExitWrites (before):', debugStringMapOfSetOfReadOrWrites(parentExitWrites));
    console.log('  parentOverwritten (before):', Array.from(parentOverwritten));
    console.log('  pendingNext.length:', pendingNext.length);
    pendingNext.forEach((p, i) => {
      console.log(`    pendingNext[${i}]: pid=${p.pid}, mutatedBetweenSrcAndDst=${Array.from(p.mutatedBetweenSrcAndDst).join(',')}`);
      if (p.exitWrites) {
        console.log(`      exitWrites:`, debugStringMapOfSetOfReadOrWrites(p.exitWrites));
      }
    });
  }
  if (pendingNext.length === 0) {
    // All branches are scheduled to complete elsewhere.
    // What if a loop breaks to the parent? or throws? or returns? Then it wouldn't be scheduled in this pendingNext list, right? So, whatever..?
    // TODO: we should add a check to see if a loop has an abrupt completion at all. And if it's not Catch trapped then consider the tail unreachable. Etc.
    // TODO: if a loop body does not contain a natural break then the code after it is dead code unless the loop is not the child of a block...
    // TODO: rest is dead code, apply DCE?

    if (REF_TRACK_TRACING) console.group(`RTT: There are no pendingNext in the parent Block, clearing parentExitWrites`);
    parentExitWrites.clear();

  } else {
    if (REF_TRACK_TRACING) console.group(`RTT: process the ${pendingNext.length} pendingNext of the parent Block (from ${pendingNext.map(({pid}) => `@${pid}`).join(',')}). For each defined var, merging or replacing their exitWrites into the parent @`, parentBlockPid);
    parentDefined.forEach((name) => {
      if (REF_TRACK_TRACING) console.group(`RTT: pendingNext[${name}]`);
      // Note: the .overwritten should be  equal to the .mutatedBetweenSrcAndDst for the If/Else case...
      // Note: above names are added when _any_ next node overwrites it. Here we want to know if they _all_ do it.
      // If the loop is (probably) infinite then always replace parent exitWrites with what happens in the loop
      // TODO: probably should consider the rest dead code...
      const replace = pendingNext.every(({ mutatedBetweenSrcAndDst }) => mutatedBetweenSrcAndDst.has(name));
      if (REF_TRACK_TRACING) {
        console.log('RTT: -', name, ': overwritten in all pendings (', pendingNext.map(({ mutatedBetweenSrcAndDst }) => mutatedBetweenSrcAndDst.has(name)), ')? final verdict:', replace ? 'replace' : 'merge', pendingNext.map(({exitWrites}) => exitWrites.get(name)?.size??0), 'exitWrites with', parentExitWrites.get(name)?.size??0, 'parent exitWrites');
        console.log('RTT:   - parentExitWrites before:', debugStringMapOfSetOfReadOrWrites(parentExitWrites));
        pendingNext.forEach(({exitWrites}, i) => console.log(`RTT:   - \`${name}\`: pending[${i}] exitWrites:`, debugStringMapOfSetOfReadOrWrites(exitWrites)));
      }
      if (replace) {
        // Since the binding was overwritten at least once in _all_ code paths leading here,
        // the initial exitWrites from the parent can not be observed and we can drop them.
        // Note: above names are added when _any_ next node overwrites it. Here we want to know if they _all_ do it.
        // If the loop is (probably) infinite then always replace parent exitWrites with what happens in the loop
        // TODO: probably should consider the rest dead code...
        const set = new Set();
        pendingNext.forEach(({ exitWrites }) => {
          // TODO: this assertion doesnt hold anymore because if a branch doesnt have pendingNext then it clears the parent exitWrites, leaving this assertion moot
          //ASSERT(exitWrites?.size > 0, 'all paths had this overwritten so it should exist and have writes');
          exitWrites.get(name)?.forEach(write => set.add(write));
        });
        ASSERT(typeof name === 'string' && name !== '0', 'names are strings not numbers');
        parentExitWrites.set(name, set);
        // Mark the name as overwritten in this code path too
        parentOverwritten.add(name);
      } else {
        // Merge them with the parent exitWrites
        // Note: some of these will be the same as the parent but since it's a Set that should be fine (code is complex enough as is)
        const set = parentExitWrites.get(name) ?? new Set;
        pendingNext.forEach(({exitWrites}) => {
          exitWrites.get(name)?.forEach(write => set.add(write));
        });
        if (set.size) { // There may not be any writes
          ASSERT(typeof name === 'string' && name !== '0', 'names are strings not numbers');
          parentExitWrites.set(name, set);
        }
        // Note: parent exitWrites may still be visible. We can't mark it overwritten in the parent.
      }

      if (REF_TRACK_TRACING) console.log('RTT:   - parentExitWrites after:', debugStringMapOfSetOfReadOrWrites(parentExitWrites));
      if (REF_TRACK_TRACING) console.groupEnd();
    });

    // Remove processed nodes from queue
    pendingNext.length = 0;
  }
  if (REF_TRACK_TRACING) {
    console.log('  parentExitWrites (after):', debugStringMapOfSetOfReadOrWrites(parentExitWrites));
    console.log('  parentOverwritten (after):', Array.from(parentOverwritten));
  }
  if (REF_TRACK_TRACING) console.groupEnd();
}
