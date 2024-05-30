import {
  ASSERT,
  vlog,
  vgroup,
  vgroupEnd,
  REF_TRACK_TRACING,
  debugStringMapOfSetOfReadOrWrites,
  debugStringListOfReadOrWrites,
} from '../utils.mjs';
import {createTrebra} from "../trebra.mjs"
import {createTreblo} from "../treblo.mjs"

// This analysis is only useful for single scope bindings. For them we can assert source code order matches temporal.
// Goal is to determine for each binding reference which writes it may observe in the worst case, or which writes
// it may overwrite in the worst case. This includes loops and try/catch/finally complexity.
// It assumes normalized code, which eliminates a few things (like switches).

// The result is a fairly solid list of references
// - all the assignments a particular read might observe and the other way around
// - all the assignments that another assignment might replace/overwrite
// - properly traced including catch and finally

// Known caveats:
// - May be overzealous for implicit throws for the case where they are guaranteed to be caught
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
//   - I do have a plan where we automatically try all variations of the test case (if/else branch, loop not loop, throw everywhere in a try)
//   - But it's been a lot of work and :shrug: I want to work on something else (:
// - There's an outstanding bug with finally and abrupt completions
//   - It should reschedule continuations according to abrupt completions but it's ignoring that right now
//   - Instead I'm going to eliminate finally and so the point to fix it is kind of moot


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

export function openRefsOnBeforeBlock(node, parentNode, parentProp, grandNode, parentBlock, globallyUniqueNamingRegistry) {
  if (REF_TRACK_TRACING) console.group('RTT: BLOCK @', +node.$p.pid);
  if (REF_TRACK_TRACING) console.group('RTT: BLOCK:before', parentNode.type, '.', parentProp);

  ASSERT(!node.$p.treblo, 'treblo is created here');
  node.$p.treblo = createTreblo(
    parentBlock.$p.treblo.defined,
    // Finally Blocks should not inherit the exitWrites from the parent. They are special.
    // This is not relevant for Catch because in that case exitWrites are almost always indeed propagated (except when the try _can't_ throw... is that even relevant?)
    parentNode.type === 'TryStatement' && parentNode.finalizer === node ? new Map : parentBlock.$p.treblo.exitWrites,
  );

  // Special case visit the Try children
  switch (parentNode.type) {
    case 'TryStatement': {
      if (parentProp === 'block') {
        // Must set the Treblo on the handler and finalizer blocks now. Can't wait.
        openRefsOnBeforeTryBody(node, parentNode, parentProp, parentBlock);
      } else {
        ASSERT(parentProp === 'finalizer');
        openRefsOnBeforeFinallyBody(node, parentNode, parentProp, parentBlock);
      }
      break;
    }

    case 'CatchClause': {
      openRefsOnBeforeCatchBody(node, parentNode, parentProp, grandNode, parentBlock, globallyUniqueNamingRegistry);
      break;
    }

    default: {
      if (REF_TRACK_TRACING) console.log('RTT: block:enter,', parentNode.type, 'block @', +node.$p.pid);
      ASSERT(['IfStatement', 'WhileStatement', 'ForInStatement', 'ForOfStatement', 'LabeledStatement', 'FunctionExpression'].includes(parentNode.type), 'expecting normalized code but found an unexpected node', parentNode.type);
    }
  }

  if (REF_TRACK_TRACING) console.groupEnd(); // BLOCK:before
  if (REF_TRACK_TRACING) console.log('RTT: /BLOCK:before');
}

export function openRefsOnAfterBlock(node, walkerPath, parentNode, parentProp, grandNode, loopStack, parentBlock, globallyUniqueLabelRegistry, tryNodeStack, catchStack, globallyUniqueNamingRegistry) {
  if (REF_TRACK_TRACING) console.group('RTT: BLOCK:after', parentNode.type, '.', parentProp);

  switch (parentNode.type) {
    case 'TryStatement': {
      if (parentProp === 'block') {
        openRefsOnAfterTryBody(node, parentNode, parentBlock, walkerPath, globallyUniqueLabelRegistry, loopStack, tryNodeStack, catchStack, globallyUniqueNamingRegistry);
      } else if (parentProp === 'finalizer') {
        openRefsOnAfterFinallyBody(node, walkerPath, parentNode, parentProp, grandNode, globallyUniqueLabelRegistry, loopStack, catchStack);
      } else {
        console.log('prop:', parentProp)
        ASSERT(false, 'what is this', parentNode.type, parentProp) // ??
      }
      break;
    }

    case 'CatchClause': {
      openRefsOnAfterCatchBody(node, walkerPath, parentNode, parentProp, grandNode, parentBlock, globallyUniqueLabelRegistry, loopStack, tryNodeStack, catchStack);
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

  if (REF_TRACK_TRACING) console.groupEnd(); // IF:before
}

export function openRefsOnafterIf(node, parentBlock, walkerPath, globallyUniqueNamingRegistry, globallyUniqueLabelRegistry, loopStack, catchStack) {
  if (REF_TRACK_TRACING) console.group('RTT: IF:after');

  const trebloTrue = node.consequent.$p.treblo;
  const trebloFalse = node.alternate.$p.treblo;

  if (REF_TRACK_TRACING) console.group('RTT: findAndQueueContinuationBlock(consequent, @', +node.consequent.$p.pid, ')');
  findAndQueueContinuationBlock(trebloTrue, +node.consequent.$p.pid, trebloTrue.wasAbruptType, trebloTrue.wasAbruptLabel, walkerPath, globallyUniqueLabelRegistry, loopStack, catchStack);
  if (REF_TRACK_TRACING) console.groupEnd();
  if (REF_TRACK_TRACING) console.group('RTT: findAndQueueContinuationBlock(alternate, @', +node.alternate.$p.pid, ')');
  findAndQueueContinuationBlock(trebloFalse, +node.alternate.$p.pid, trebloFalse.wasAbruptType, trebloFalse.wasAbruptLabel, walkerPath, globallyUniqueLabelRegistry, loopStack, catchStack);
  if (REF_TRACK_TRACING) console.groupEnd();

  const parentTreblo = parentBlock.$p.treblo;
  const parentExitWrites = parentTreblo.exitWrites;
  const parentDefined = parentTreblo.defined;
  const parentOverwritten = parentTreblo.overwritten;
  const parentEntryReads = parentTreblo.entryReads;
  const parentEntryWrites = parentTreblo.entryWrites;
  const pendingNext = parentTreblo.pendingNext;

  ASSERT(pendingNext.every(({pid, wasAbruptType}) => pid === +node.consequent.$p.pid || pid === +node.alternate.$p.pid), 'either only find the if/else branches');
  ASSERT(pendingNext.length <= 2, 'should only be the consequent and alternate blocks', pendingNext.length, pendingNext.map(({pid}) => pid));
  ASSERT(!pendingNext[0] || pendingNext[0].pid === +node.consequent.$p.pid || pendingNext[0].pid === +node.alternate.$p.pid);
  ASSERT(!pendingNext[1] || pendingNext[1].pid === +node.alternate.$p.pid);
  ASSERT(pendingNext.every(({wasAbrubtType}) => !wasAbrubtType), 'if either branch completed abruptly then they should have been scheduled elsewhere');

  // Always do the next steps with the block(s) just traversed. Not the pending queue.
  // In this case the pendingNext are just the two blocks so it works out
  // Must therefor do this before updating the overwritten state, below
  if (REF_TRACK_TRACING) console.group('RTT: propagate If/Else entryReads and entryWrites to parent');
  parentDefined.forEach(name => {
    // Note: this is only visible in loops since entryReads/entryWrites are not used again in normal flow. Maybe finally too?
    if (parentOverwritten.has(name)) {
      if (REF_TRACK_TRACING) console.log(`RTT: \`${name}\`: NOT propagating entryReads and entryWrites because parent has already overwritten it`);
    } else {
      if (REF_TRACK_TRACING) console.log(`RTT: \`${name}\`: [true] propagating ${trebloTrue.entryReads.get(name)?.size??0} entryReads, ${trebloTrue.entryWrites.get(name)?.size??0} entryWrites from Block @`, +node.consequent.$p.pid, 'to the parent');
      trebloTrue.entryReads.get(name)?.forEach((read) => upsertGetSet(parentEntryReads, name, read));
      trebloTrue.entryWrites.get(name)?.forEach((write) => upsertGetSet(parentEntryWrites, name, write));
      if (REF_TRACK_TRACING) console.log(`RTT: \`${name}\`: [false] propagating ${trebloFalse.entryReads.get(name)?.size??0} entryReads, ${trebloFalse.entryWrites.get(name)?.size??0} entryWrites from Block @`, +node.alternate.$p.pid, 'to the parent');
      trebloFalse.entryReads.get(name)?.forEach((read) => upsertGetSet(parentEntryReads, name, read));
      trebloFalse.entryWrites.get(name)?.forEach((write) => upsertGetSet(parentEntryWrites, name, write));
    }
  });
  if (REF_TRACK_TRACING) console.groupEnd();

  if (pendingNext.length === 0) {
    // Nothing to do here. Both branches are scheduled to complete elsewhere.
  } else {
    if (REF_TRACK_TRACING) console.log(`RTT: merging or replacing the If-exitWrites from ${pendingNext.length} / ${pendingNext.length} pending sets into the parent`);
    // Merge or replace depends
    parentDefined.forEach(name => {
      // Note: the .overwritten should be  equal to the .mutatedBetweenSrcAndDst for the If/Else case...
      const replace = pendingNext.every(({overwritten}) => overwritten.has(name))
      if (REF_TRACK_TRACING) console.log('RTT: -', name, ': overwritten?', pendingNext.map(({overwritten}) => overwritten.has(name)), ' so verdict:', replace ? 'replace' : 'merge', 'with', pendingNext.map(({exitWrites}) => exitWrites.get(name)?.size??0), 'exitWrites');
      if (replace) {
        // Since the binding was overwritten at least once in _all_ code paths leading here,
        // the initial exitWrites from the parent can not be observed and we can drop them.
        const set = new Set();
        pendingNext.forEach(({exitWrites}) => {
          ASSERT(exitWrites?.size > 0, 'all paths had this overwritten so it should exist and have writes');
          exitWrites.get(name).forEach(write => set.add(write));
        });
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
          parentExitWrites.set(name, set);
        }
        // Note: parent exitWrites may still be visible. We can't mark it overwritten in the parent.
      }

      if (REF_TRACK_TRACING) console.log('RTT:   - parentExitWrites:', debugStringMapOfSetOfReadOrWrites(parentExitWrites));
    });
  }

  // Clear the queue. We're done.
  pendingNext.length = 0;

  // The parent block should now have an updated exitWrites set for each of its bindings

  if (REF_TRACK_TRACING) console.groupEnd(); // IF:after
  if (REF_TRACK_TRACING) console.groupEnd(); // IF
  if (REF_TRACK_TRACING) console.log('/IF');
}

export function openRefsOnBeforeLabel(node, parentBlock) {
  if (REF_TRACK_TRACING) console.group('RTT: LABEL,', parentBlock.$p.treblo.defined.size, 'known bindings');
  if (REF_TRACK_TRACING) console.group('RTT: LABEL:before');

  if (REF_TRACK_TRACING) console.groupEnd(); // LABEL:before
}

export function openRefsOnafterLabel(node, parentBlock, walkerPath, globallyUniqueNamingRegistry, globallyUniqueLabelRegistry, loopStack, catchStack) {
  if (REF_TRACK_TRACING) console.group('RTT: LABEL:after');

  if (node.body.type !== 'BlockStatement') {
    if (REF_TRACK_TRACING) console.log('RTT: label body is a loop so not propagating ref stuff');
  } else {
    const treblo = node.body.$p.treblo;

    if (REF_TRACK_TRACING) console.group('RTT: findAndQueueContinuationBlock(label, @', +node.body.$p, ')');
    findAndQueueContinuationBlock(node.body.$p.treblo, +node.body.$p.pid, treblo.wasAbruptType, treblo.wasAbruptLabel, walkerPath, globallyUniqueLabelRegistry, loopStack, catchStack);
    if (REF_TRACK_TRACING) console.groupEnd();

    const parentTreblo = parentBlock.$p.treblo;
    const parentExitWrites = parentTreblo.exitWrites;
    const parentDefined = parentTreblo.defined;
    const parentOverwritten = parentTreblo.overwritten;
    const parentEntryReads = parentTreblo.entryReads;
    const parentEntryWrites = parentTreblo.entryWrites;
    const pendingNext = parentTreblo.pendingNext;

    // Always do the next steps with the block(s) just traversed. Not the pending queue.
    // Visible for loops since they use entryReads and entryWrites again.
    if (REF_TRACK_TRACING) console.group('RTT: propagate Label body entryReads and entryWrites to parent');
    parentDefined.forEach(name => {
      if (parentOverwritten.has(name)) {
        if (REF_TRACK_TRACING) console.log(`RTT: \`${name}\`: NOT propagating entryReads and entryWrites because parent already overwrote the binding`);
      } else {
        if (REF_TRACK_TRACING) console.log(`RTT: \`${name}\`: propagating ${treblo.entryReads.get(name)?.size??0} entryReads, ${treblo.entryWrites.get(name)?.size??0} entryWrites from Label Block @${node.body.$p.pid} to the parent`);
        treblo.entryReads.get(name)?.forEach((read) => upsertGetSet(parentEntryReads, name, read));
        treblo.entryWrites.get(name)?.forEach((write) => upsertGetSet(parentEntryWrites, name, write));
      }
    });
    if (REF_TRACK_TRACING) console.groupEnd();

    if (pendingNext.length === 0) {
      // Nothing to do here. All branches are scheduled to complete elsewhere.
      // TODO: rest is dead code, apply DCE?
    } else {
      if (REF_TRACK_TRACING) console.log(`RTT: merging or replacing the Label-exitWrites from ${pendingNext.length} / ${pendingNext.length} pending sets into the parent`);
      // Merge or replace depends
      parentDefined.forEach(name => {
        const replace = pendingNext.every(({ mutatedBetweenSrcAndDst }) => mutatedBetweenSrcAndDst.has(name));
        if (REF_TRACK_TRACING) console.log('RTT: -', name, ': overwrittenn?', pendingNext.map(({ mutatedBetweenSrcAndDst }) => mutatedBetweenSrcAndDst.has(name)), ' so verdict:', replace ? 'replace' : 'merge', pendingNext.map(({exitWrites}) => exitWrites.get(name)?.size??0), 'exitWrites, abrupts:', pendingNext.map(({ wasAbruptType }) => wasAbruptType));
        if (replace) {
          // Replace
          const set = new Set();
          pendingNext.forEach(({ exitWrites }) => {
            ASSERT(exitWrites?.size > 0, 'all paths had this overwritten so it should exist and have writes');
            exitWrites.get(name).forEach(write => set.add(write));
          });
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
            parentExitWrites.set(name, set);
          }
          // Note: parent exitWrites may still be visible. We can't mark it overwritten in the parent.
        }

        if (REF_TRACK_TRACING) console.log('RTT:   - parentExitWrites:', debugStringMapOfSetOfReadOrWrites(parentExitWrites));
      });
    }

    pendingNext.length = 0;
  }

  if (REF_TRACK_TRACING) console.groupEnd(); // LABEL:after
  if (REF_TRACK_TRACING) console.groupEnd(); // LABEL
  if (REF_TRACK_TRACING) console.log('/LABEL');
}

export function openRefsOnBeforeLoop(kind /*: loop | in | of */, node, parentBlock) {
  if (REF_TRACK_TRACING) console.group('RTT: LOOP,', kind);
  if (REF_TRACK_TRACING) console.group('RTT: LOOP:before,', kind, ', has', parentBlock.$p.treblo.defined.size, 'known bindings');

  node.$p.trebra = createTrebra();

  if (REF_TRACK_TRACING) console.groupEnd(); // LOOP:before
}

export function openRefsOnAfterLoop(kind /* loop | in | of */, node, parentBlock, walkerPath, globallyUniqueLabelRegistry, loopStack, tryNodeStack, catchStack) {
  if (REF_TRACK_TRACING) console.group('RTT: LOOP:after,', kind, 'after @', +node.$p.pid);

  /** @var {Treblo} */
  const treblo = node.body.$p.treblo;

  findAndQueueContinuationBlock(node.body.$p.treblo, +node.body.$p.pid, treblo.wasAbruptType, treblo.wasAbruptLabel, walkerPath, globallyUniqueLabelRegistry, loopStack, catchStack);

  // Keep in mind: we assume normalized code, so all while loops are while(true) and all for-in/of-loops don't introduce a new binding

  const parentTreblo = parentBlock.$p.treblo;
  const parentExitWrites = parentTreblo.exitWrites;
  const parentDefined = parentTreblo.defined;
  const parentOverwritten = parentTreblo.overwritten;
  const parentEntryReads = parentTreblo.entryReads;
  const parentEntryWrites = parentTreblo.entryWrites;

  // Propagate entryReads/entryWrites to parent, before overwritten gets amended below

  if (REF_TRACK_TRACING) console.group('RTT: propagate Loop body entryReads and entryWrites to parent iif the binding was known there');
  parentDefined.forEach(name => {
    if (parentOverwritten.has(name)) {
      if (REF_TRACK_TRACING) console.log(`RTT: \`${name}\`: NOT propagating entryReads and entryWrites because parent already overwrote the binding`);
    } else {
      if (REF_TRACK_TRACING) console.log(`RTT: \`${name}\`: propagating ${treblo.entryReads.get(name)?.size??0} entryReads, ${treblo.entryWrites.get(name)?.size??0} entryWrites from a Block to the parent`);
      treblo.entryReads.get(name)?.forEach((read) => upsertGetSet(parentEntryReads, name, read));
      treblo.entryWrites.get(name)?.forEach((write) => upsertGetSet(parentEntryWrites, name, write));
    }
  });
  if (REF_TRACK_TRACING) console.groupEnd();

  // Connect the end of the loop to the start
  // Do this first because it also updates the overwritten of nodes that break to or through this node, which is necessary info to process any that break to here.

  const pendingLoop = treblo.pendingLoop;
  if (REF_TRACK_TRACING) console.group('TTR: Loop Queue has', pendingLoop.length, `blocks that jump to repeat the loop (from ${pendingLoop.map(({pid, dst}) => `@${pid}->@${dst.$p.pid}`)}). Processing`, parentDefined.size, 'bindings that were known in the parent.');
  parentDefined.forEach(name => {
    if (REF_TRACK_TRACING) console.log(`TTR: - \`${name}\`: Loop body has ${treblo.entryReads.get(name)?.size??0} entryReads and ${treblo.entryWrites.get(name)?.size??0} entryWrites`);

    pendingLoop.forEach(({pid, exitWrites}) => {
      if (REF_TRACK_TRACING) console.group('TTR: pendingLoop[n]');

      const set = exitWrites.get(name);
      if (REF_TRACK_TRACING) console.log('TTR:   - from @', pid, 'has', set?.size ?? 0, 'exitWrites');

      // Connect exitWrites of the source node to entryReads and entryWrites of the loop body
      set?.forEach(write => {
        treblo.entryReads.get(name)?.forEach(read => {
          if (REF_TRACK_TRACING) console.log('TTR: Loop entryRead @', +read.node.$p.pid, 'can read the last write to the binding @', +write.node.$p.pid);
          write.reachedByReads.add(read);
          read.reachesWrites.add(write);
        });
        treblo.entryWrites.get(name)?.forEach(write2 => {
          if (REF_TRACK_TRACING) console.log('TTR: Loop entryWrite @', +write2.node.$p.pid, 'can overwrite the last write to the binding @', +write.node.$p.pid);
          write.reachedByWrites.add(write2);
          write2.reachesWrites.add(write);
        });
        if (REF_TRACK_TRACING) console.group(`TTR: pendingLoopWriteChecks; Adding the ${treblo.overwritten.size} overwritten names of the loop end to the ${node.$p.trebra.pendingLoopWriteChecks.length} queued blocks`);
        node.$p.trebra.pendingLoopWriteChecks.forEach(({ srcPid, exitWrites, mutatedRefs }) => {
          if (mutatedRefs.has(name)) {
            if (REF_TRACK_TRACING) console.log(`TTR: - NOT adding write @$`, +write.node.$p.pid, `for "${name}" to exitWrites of srcBlock @${srcPid} because it was already overwritten so the current exitWrite(s) should be the correct one`);
          } else {
            if (REF_TRACK_TRACING) console.log(`TTR: - Adding write @`, +write.node.$p.pid, `for "${name}" to exitWrites of srcBlock @${srcPid} (because of loop)`);
            upsertGetSet(exitWrites, name, write)
          }
          treblo.overwritten.forEach(name => {
            // Note: this mutatedRefs is a live _reference_ to the srcBlock.$p.treblo.mutatedBetweenSrcAndDst
            if (REF_TRACK_TRACING) console.log(`TTR: - Marking "${name}" as overwritten in queued block @${srcPid}`);
            mutatedRefs.add(name);
          });
        });
        if (REF_TRACK_TRACING) console.groupEnd(); // pendingLoopWriteChecks
      });

      if (REF_TRACK_TRACING) console.groupEnd(); // pendingLoop iteration
    });
  });
  if (REF_TRACK_TRACING) console.groupEnd();

  // Do the normal thing with pending continuations

  // This is for break. And any node that breaks here with a label. Not sure if there are other ways for a node to be scheduled here.
  const pendingNext = parentTreblo.pendingNext;
  if (REF_TRACK_TRACING) console.group('TTR: Parent pendingNext Queue has', pendingNext.length, `nodes that continue after the loop (from ${pendingNext.map(({pid, dst}) => `@${pid}->@${dst.$p.pid}`)}). Processing`, parentDefined.size, 'bindings that were known in the parent.');
  if (pendingNext.length === 0) {
    // Nothing to do here?
    // What if the loop breaks to the parent? or throws? or returns? Then it wouldn't be scheduled in this pendingNext list, right? So, whatever..?
    // TODO: we should add a check to see if a loop has an abrupt completion at all. And if it's not Catch/Finally trapped then consider the tail unreachable. Etc.
  } else {
    if (REF_TRACK_TRACING) console.log(`RTT: merging or replacing the Loop-exitWrites from ${pendingNext.length} / ${pendingNext.length} pending sets into the parent`);
    parentDefined.forEach(name => {
      // Note: above names are added when _any_ next node overwrites it. Here we want to know if they _all_ do it.
      // If the loop is (probably) infinite then always replace parent exitWrites with what happens in the loop
      // TODO: probably should consider the rest dead code...
      const replace = pendingNext.every(({ mutatedBetweenSrcAndDst }) => mutatedBetweenSrcAndDst.has(name));
      if (REF_TRACK_TRACING) console.log('RTT: -', name, ': overwrittennn?', pendingNext.map(({ mutatedBetweenSrcAndDst }) => mutatedBetweenSrcAndDst.has(name)), ' so final verdict:', replace ? 'replace' : 'merge', pendingNext.map(({exitWrites}) => exitWrites.get(name)?.size??0), 'exitWrites with', parentExitWrites.get(name)?.size??0, 'parent exitWrites');
      if (replace) {
        // Replace
        const set = new Set();
        pendingNext.forEach(({ exitWrites }) => {
          ASSERT(exitWrites?.size > 0, 'all paths had this overwritten so it should exist and have writes');
          exitWrites.get(name).forEach(write => set.add(write));
        });
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
          parentExitWrites.set(name, set);
        }
        // Note: parent exitWrites may still be visible. We can't mark it overwritten in the parent.
      }
      if (REF_TRACK_TRACING) console.log('RTT:   - parentExitWrites:', debugStringMapOfSetOfReadOrWrites(parentExitWrites));
    });
    if (REF_TRACK_TRACING) console.groupEnd();

    // Remove processed nodes from queue
    pendingNext.length = 0;
  }

  // The parent block should now have an updated exitWrites set for each o1f its bindings

  if (REF_TRACK_TRACING) console.groupEnd(); // LOOP:after
  if (REF_TRACK_TRACING) console.groupEnd(); // LOOP
  if (REF_TRACK_TRACING) console.log('/LOOP');
}

export function openRefsOnBeforeBreak(node, blockStack) {
  if (REF_TRACK_TRACING) console.group('RTT: BREAK');
  if (REF_TRACK_TRACING) console.group('RTT: BREAK:before');

  blockStack[blockStack.length - 1].$p.treblo.wasAbruptType = 'break';
  blockStack[blockStack.length - 1].$p.treblo.wasAbruptLabel = node.label?.name;

  if (REF_TRACK_TRACING) console.groupEnd(); // BREAK:before
}

export function openRefsOnAfterBreak(node, blockStack) {
  if (REF_TRACK_TRACING) console.group('RTT: BREAK:after');

  if (REF_TRACK_TRACING) console.groupEnd(); // BREAK:after
  if (REF_TRACK_TRACING) console.groupEnd(); // BREAK
}

export function openRefsOnBeforeContinue(node, blockStack) {
  if (REF_TRACK_TRACING) console.group('RTT: CONTINUE:before');

  blockStack[blockStack.length - 1].$p.treblo.wasAbruptType = 'continue';
  blockStack[blockStack.length - 1].$p.treblo.wasAbruptLabel = node.label?.name;

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

  blockStack[blockStack.length - 1].$p.treblo.wasAbruptType = 'return';
  blockStack[blockStack.length - 1].$p.treblo.wasAbruptLabel = undefined;

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

  blockStack[blockStack.length - 1].$p.treblo.wasAbruptType = 'throw';
  blockStack[blockStack.length - 1].$p.treblo.wasAbruptLabel = undefined;

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

  node.$p.trebra = createTrebra();

  if (REF_TRACK_TRACING) console.groupEnd(); // TRY:before
}

//waarom is /home/ptr/proj/preval/tests/cases/ref_tracking/try_loop_entry1.md stuk?

export function openRefsOnAfterTryNode(node, parentBlock, globallyUniqueLabelRegistry, loopStack) {
  // (Root node, versus the body/catch/finally body)
  if (REF_TRACK_TRACING) console.group('RTT: TRY:after');

  const parentTreblo = parentBlock.$p.treblo;
  const parentExitWrites = parentTreblo.exitWrites;
  const parentDefined = parentTreblo.defined;
  const parentOverwritten = parentTreblo.overwritten;

  // Now resolve the parent pending. There can't be any loop pending to process after an `if`.

  console.log('TODO: Why are we not propagating entryRead/entryWrite here?');

  const pendingNext = parentTreblo.pendingNext;

  if (REF_TRACK_TRACING) console.log(`RTT: process the ${pendingNext.length} pendingNext of the parent of the Try`);
  if (pendingNext.length === 0) {
    // Nothing to do here. Both branches are scheduled to complete elsewhere.
  } else {
    if (REF_TRACK_TRACING) console.log(`RTT: merging or replacing the Try-Catch or Try-Finally exitWrites from ${pendingNext.length} pendingNext sets into the parent; abrupts:`, pendingNext.map(({wasAbruptType}) => wasAbruptType), ', from pids:', pendingNext.map(({pid}) => pid), ', pendingNext.exitWrites:', pendingNext.map(obj => debugStringMapOfSetOfReadOrWrites(obj.exitWrites)));
    // Merge or replace depends
    parentDefined.forEach(name => {
      const replace = pendingNext.every(({ mutatedBetweenSrcAndDst }) => mutatedBetweenSrcAndDst.has(name));

      //probleem is hier dat een van de twee sets een implicit finally is. voor die moet je eigenlijk ook de mutatedBetweenSrcAndDst van de incoming checken.
      //  betekent dit eigenlijk dat we gewoon niets schedulen voor de finally zelf?
      //  er gaat altijd een throw doorheen. daarnaast gaat er nog een try block doorheen, of meerdere.
      //  die try block zorgt voor een propagering, right

      if (REF_TRACK_TRACING) console.log('RTT: -', name, ': overwrittennnn?', pendingNext.map(({ mutatedBetweenSrcAndDst }) => mutatedBetweenSrcAndDst.has(name)), ' so verdict:', replace ? 'replace' : 'merge', pendingNext.map(({exitWrites}) => exitWrites.get(name)?.size??0), 'exitWrites');
      if (replace) {
        // Since the binding was overwritten at least once in _all_ code paths leading here,
        // the initial exitWrites from the parent can not be observed and we can drop them.
        const set = new Set();
        pendingNext.forEach(({exitWrites}) => {
          ASSERT(exitWrites?.size > 0, 'all paths had this overwritten so it should exist and have writes');
          exitWrites.get(name).forEach(write => set.add(write));
        });
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
          parentExitWrites.set(name, set);
        }
        // Note: parent exitWrites may still be visible. We can't mark it overwritten in the parent.
      }

      if (REF_TRACK_TRACING) console.log('RTT:   - parentExitWrites:', debugStringMapOfSetOfReadOrWrites(parentExitWrites));
    });

    pendingNext.length = 0;
  }


  /*
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
*/

  if (REF_TRACK_TRACING) console.groupEnd(); // TRY:after
  if (REF_TRACK_TRACING) console.groupEnd(); // TRY
  if (REF_TRACK_TRACING) console.log('/TRY');
}

export function openRefsOnBeforeTryBody(node, parentBlock) {
  // This is after the `try-block` but before returning on the whole TryStatement node
  // Not much to do here tbh (even the log is done in caller)

  if (REF_TRACK_TRACING) console.group('RTT: TRY:BODY');
  if (REF_TRACK_TRACING) console.group('RTT: TRY:BODY:before');

  if (REF_TRACK_TRACING) console.groupEnd(); // TRY:BODY:before
}

export function openRefsOnAfterTryBody(node, parentTryNode, parentBlock, walkerPath, globallyUniqueLabelRegistry, loopStack, tryNodeStack, catchStack, globallyUniqueNamingRegistry) {
  if (REF_TRACK_TRACING) console.group('RTT: TRY:BODY:after');

  const treblo = node.$p.treblo;
  const parentTreblo = parentBlock.$p.treblo;

  if (REF_TRACK_TRACING) console.log('RTT: exitWrites:', debugStringMapOfSetOfReadOrWrites(treblo.exitWrites));

  // Only the try body continues (potentially) in the catch body. You can't break to it etc.

  ASSERT(parentTryNode.type === 'TryStatement', 'right?');


  if (REF_TRACK_TRACING) console.group('RTT: findAndQueueContinuationBlock(try.block, @', +node.$p.pid, ')');
  findAndQueueContinuationBlock(treblo, +node.$p.pid, node.$p.treblo.wasAbruptType, node.$p.treblo.wasAbruptLabel, walkerPath, globallyUniqueLabelRegistry, loopStack, catchStack);
  if (REF_TRACK_TRACING) console.groupEnd();


  const tryPid = +parentTryNode.$p.pid;
  const parentExitWrites = parentTreblo.exitWrites;
  const parentDefined = parentTreblo.defined;
  const parentOverwritten = parentTreblo.overwritten;
  const parentEntryReads = parentTreblo.entryReads;
  const parentEntryWrites = parentTreblo.entryWrites;


  // First schedule the implicit throw. It's a special case that contains all
  // exitWrites from the parent and all writes in the Try Block as exitWrites.
  // It should be caught by either the Catch or the Finally of this Try.

  if (REF_TRACK_TRACING) console.group('RTT: schedule implicit throw from within the Try Block @', +parentTryNode.$p.pid);

  // Since the Catch exitWrites should contain all writes from anywhere in the Try Block, we don't
  // have to worry about pre-existing exitWrites. Either we'll add existing writes to the set (which
  // is a noop) or we'll add a new one. No need to clear it.
  // Note: we've just finished walking the try body. There is no catch pid yet. Only check if pid is after the Try.
  const allWrites = new Map;
  parentDefined.forEach((name) => {
    if (REF_TRACK_TRACING) console.log(`RTT: \`${name}\`: copying parentExitWrites (${debugStringListOfReadOrWrites(parentExitWrites.get(name))}) from before the Try to the set of initial exitWrites for the implicit Throw`);
    parentExitWrites.get(name)?.forEach(write => upsertGetSet(allWrites, name, write));
    if (REF_TRACK_TRACING) console.log(`RTT: \`${name}\`: copying all writes inside Try Block (pid > @${tryPid}) to the set of initial exitWrites for the implicit throw: ${debugStringListOfReadOrWrites(globallyUniqueNamingRegistry.get(name).writes.filter(write => +write.node.$p.pid > tryPid))}`);
    console.log('does this mean we dont need the allWrites lists anymore? we used to use it here but no more...');
    globallyUniqueNamingRegistry.get(name).writes.forEach(write => {
      const pid = +write.node.$p.pid;
      if (pid > tryPid) upsertGetSet(allWrites, name, write);
    });
    if (REF_TRACK_TRACING) console.log(`RTT: \`${name}\` now has these exitWrites in the implicit throw: ${debugStringListOfReadOrWrites(allWrites.get(name))}`);
    // Overwritten is same as it was before the Try since in theory none of the writes might have succeeded when hitting the catch
    console.log('TODO: do we need to copy overwritten state from Try Block as well?');
  });

  // Schedule a fake throw that represents the implicit ability for this finally to potentially observe every step of the way
  // This is only necessary for Finally Blocks that might observe it. A Catch Block will explicitly handle the implicit throw of its owner Try Block.
  // We need it because unlike everything else, code propagates finally differently depending on how it entered, and so do its exitWrites for each.
  // Even if we don't schedule it here, we would need to schedule it in the finally:after
  if (REF_TRACK_TRACING) console.group('RTT: findAndQueueContinuationBlock(finally.implicit.throw, @', +parentTryNode.$p.pid, ')');
  findAndQueueContinuationBlock(
    // Fresh Treblo containing all the writes as exit writes. empty other sets.
    createTreblo(parentDefined, allWrites),
    // This is a potential throw from anywhere inside the Try Block
    // Target the Try. After that it fizzles. A Catch will explicitly handle this throw differently. We only need to emit it for Finally's (regardless of whether this Try has one)
    +parentTryNode.$p.pid,
    // Consider it a throw, even if there was no explicit throw at all
    'implicit-throw', // We ignore the explicit throws because they're superseded by the implicit throw for the sake of this ref analysis
    // Label irrelevant here
    undefined,
    walkerPath,
    globallyUniqueLabelRegistry,
    loopStack,
    catchStack,
  );
  if (REF_TRACK_TRACING) console.groupEnd(); // find
  if (REF_TRACK_TRACING) console.groupEnd(); // schedule throw


  // Note: We never propagate the exitWrites to the parent because either the Catch or Finally will consume these

  // Always do the next steps with the block(s) just traversed. Not the pending queue.
  // Do this regardless of Catch or Finally logic. We're looking for the potential to read an exitWrite, not whether it must happen.
  if (REF_TRACK_TRACING) console.group('RTT: propagate Try Block entryReads, entryWrites to parent');
  parentDefined.forEach((name) => {
    if (parentOverwritten.has(name)) {
      if (REF_TRACK_TRACING) console.log(`RTT: \`${name}\`: not propagating entryReads/writes because binding was already overwritten in parent`);
    } else {
      if (REF_TRACK_TRACING) console.log(`RTT: \`${name}\`: propagating ${treblo.entryReads.get(name)?.size??0} entryReads, ${treblo.entryWrites.get(name)?.size??0} entryWrites from the TryBlock to the parent`);
      treblo.entryReads.get(name)?.forEach((read) => upsertGetSet(parentEntryReads, name, read));
      treblo.entryWrites.get(name)?.forEach((write) => upsertGetSet(parentEntryWrites, name, write));
    }
  });
  if (REF_TRACK_TRACING) console.groupEnd();

  if (REF_TRACK_TRACING) console.groupEnd(); // TRY:BODY:after
  if (REF_TRACK_TRACING) console.groupEnd(); // TRY:BODY
}

export function openRefsOnBeforeCatchBody(node, parentNode, parentProp, parentTryNode, parentBlock, globallyUniqueNamingRegistry) {
  // This is after the `try block`, right before entering its `catch block`

  if (REF_TRACK_TRACING) console.group('RTT: TRY:CATCH');
  if (REF_TRACK_TRACING) console.group('RTT: TRY:CATCH:before');
  ASSERT(parentTryNode.type === 'TryStatement', 'right?');
  ASSERT(parentNode.type === 'CatchClause', 'right?');

  // This Catch has access to all writes anywhere inside the Try Block and considers them all exitWrites.
  // This is the easy part (Finally is harder)

  const tryPid = +parentTryNode.$p.pid;
  const catchPid = +node.$p.pid;
  const parentTreblo = parentBlock.$p.treblo;
  const parentExitWrites = parentTreblo.exitWrites;
  const parentDefined = parentTreblo.defined;
  const catchExitWrites = node.$p.treblo.exitWrites;





  // Since the Catch exitWrites should contain all writes from anywhere in the Try Block, we don't
  // have to worry about pre-existing exitWrites. Either we'll add existing writes to the set (which
  // is a noop) or we'll add a new one. No need to clear it.
  parentDefined.forEach((name) => {
    if (REF_TRACK_TRACING) console.log('RTT: copying', parentExitWrites.get(name)?.size??0, `exitWrites for "${name}" from before the Try to the set of initial exitWrites for the Catch Block`);
    parentExitWrites.get(name)?.forEach(write => upsertGetSet(catchExitWrites, name, write));
    if (REF_TRACK_TRACING) console.log(`RTT: copying all writes to  "${name}" after the Try Block and before the Catch to the set of initial exitWrites for the Catch`);
    globallyUniqueNamingRegistry.get(name).writes.forEach(write => {
      const pid = +write.node.$p.pid;
      if (pid > tryPid && pid < catchPid) upsertGetSet(catchExitWrites, name, write);
    });
    if (REF_TRACK_TRACING) console.log(`RTT: \`${name}\` now has ${catchExitWrites.size} exitWrites in the Catch`);
    // Overwritten is same as it was before the Try since in theory none of the writes might have succeeded when hitting the catch
    console.log('TODO: do we need to copy overwritten state from Try Block as well?');
  });


  if (REF_TRACK_TRACING) console.groupEnd(); // TRY:CATCH:before
}

export function openRefsOnAfterCatchBody(node, walkerPath, parentNode, parentProp, grandNode, parentBlock, globallyUniqueLabelRegistry, loopStack, tryNodeStack, catchStack) {
  if (REF_TRACK_TRACING) console.group('RTT: TRY:CATCH:after');

  // Note: in normalized code, a Try with Catch can not have a Finally sibling (such would become a wrapper Try)

  ASSERT(grandNode.type === 'TryStatement', 'right?');

  const parentTreblo = parentBlock.$p.treblo;

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

  const catchTreblo = node.$p.treblo;

  if (REF_TRACK_TRACING) console.group('RTT: findAndQueueContinuationBlock(catch.body, @', +node.$p.pid, ')');
  findAndQueueContinuationBlock(catchTreblo, +node.$p.pid, catchTreblo.wasAbruptType, catchTreblo.wasAbruptLabel, walkerPath, globallyUniqueLabelRegistry, loopStack, catchStack);
  if (REF_TRACK_TRACING) console.groupEnd();


  const parentDefined = parentTreblo.defined;
  const parentEntryReads = parentTreblo.entryReads;
  const parentEntryWrites = parentTreblo.entryWrites;


  // Always do the next steps with the block(s) just traversed. Not the pending queue.
  if (REF_TRACK_TRACING) console.group('RTT: propagate Catch Block entryReads, entryWrites to parent');
  parentDefined.forEach((name) => {
    if (parentTreblo.overwritten.has(name)) {
      if (REF_TRACK_TRACING) console.log(`RTT: \`${name}\`: not propagating entryReads/writes because binding was already overwritten in parent`);
    } else {
      if (REF_TRACK_TRACING) console.log(`RTT: \`${name}\`: propagating ${catchTreblo.entryReads.get(name)?.size??0} entryReads, ${catchTreblo.entryWrites.get(name)?.size??0} entryWrites from the CatchBlock to the parent`);
      catchTreblo.entryReads.get(name)?.forEach((read) => upsertGetSet(parentEntryReads, name, read));
      catchTreblo.entryWrites.get(name)?.forEach((write) => upsertGetSet(parentEntryWrites, name, write));
    }
  });
  if (REF_TRACK_TRACING) console.groupEnd();

  if (REF_TRACK_TRACING) console.groupEnd(); // TRY:CATCH:after
  if (REF_TRACK_TRACING) console.groupEnd(); // TRY:CATCH
  if (REF_TRACK_TRACING) console.log('/CATCH');
}

export function openRefsOnBeforeFinallyBody(node, parentNode, parentProp, parentBlock) {
  if (REF_TRACK_TRACING) console.group('RTT: TRY:FINALLY');
  if (REF_TRACK_TRACING) console.group('RTT: TRY:FINALLY:before');

  ASSERT(parentNode.type === 'TryStatement', 'right?');

  // This is in the before block handler of the finally
  // Special case: Finally Block does not start with exitWrites from parent. Instead, there are some
  //               continuations trapped that will supply their own set of exitWrites to work with.
  // - Owner Try can not also have a Catch block (normalized away; that would become a child Try/Catch statement)
  // - Handle scheduled continuations (now or later?)
  // - The Try Block will schedule an implicit Throw with all the exitWrites of the parent plus all
  //   the writes in the Try Block, recursively, as its exitWrites. So that's all done for.

  ASSERT(node.$p.treblo, 'the Finally Block treblo is created elsewhere');
  ASSERT(node.$p.treblo.exitWrites.size === 0, 'the Finally Block should not inherit exitWrites from the parent, unlike other blocks');

  if (REF_TRACK_TRACING) console.groupEnd(); // TRY:FINALLY:before
  if (REF_TRACK_TRACING) console.log('RTT: /TRY:FINALLY:before');
}

// Als een name overwritten is in de try body dan kunnen de entry read/writes niet propageren naar de parent...
// Dus of ze propageren naar de parent is afhankelijk van de continuations? Dat zou betekenen dat alle continuations het zouden moeten overschrijven

export function openRefsOnAfterFinallyBody(node, walkerPath, parentTryNode, parentProp, parentBlockNode, globallyUniqueLabelRegistry, loopStack, catchStack) {
  if (REF_TRACK_TRACING) console.group('RTT: TRY:FINALLY:after');

  ASSERT(parentTryNode.type === 'TryStatement', 'parent is Try');
  ASSERT(!parentTryNode.handler, 'in normalized code there is no Catch block to worry about');
  ASSERT(parentBlockNode.type === 'BlockStatement' || parentBlockNode.type === 'Program', 'parentBlockNode=grandNode, parent of try must be block', parentBlockNode.type);

  const tryBlockTreblo = parentTryNode.block.$p.treblo;
  const finallyTreblo = node.$p.treblo;

  const parentTreblo = parentBlockNode.$p.treblo;
  const parentDefined = parentTreblo.defined;
  const parentExitWrites = parentTreblo.exitWrites;
  const parentEntryReads = parentTreblo.entryReads;
  const parentEntryWrites = parentTreblo.entryWrites;


  // Do NOT do the normal continuationBlock thing for this Block
  // For each continuation that is trapped to go through this Finally:
  // - apply the exitWrites of the continuation to all entryReads and entryWrites of this Finally
  // - if the Finally fully overwrites a name then replace the exitWrites of the continuation with those of the Finally
  // - otherwise amend the exitWrites of the continuation with those of the Finally
  // - TODO: what if the finally does abrupt? the scheduled branch has different exitWrites etc? but it gets scheduled multiple times?

  if (REF_TRACK_TRACING) console.group(`RTT: process the ${parentTryNode.$p.trebra.trappedByFinally.length} trappedByFinally blocks queued to go through this finally`);


  console.log('deze propagatie moet nog wordne gechceked')
  if (REF_TRACK_TRACING) console.group('RTT: propagate Finally Block entryReads, entryWrites to parent');
  parentDefined.forEach((name) => {
    // A finally entryRead entryWrite should propagate to the parent when none of the continuations going into the
    // Finally could have overwritten it.
    // This is different from other blocks because any write could potentially shadow the initial value (in the Try)
    if (parentTryNode.$p.trebra.trappedByFinally.some(({exitWrites}) => exitWrites.has(name))) {
      if (REF_TRACK_TRACING) console.log(`RTT: \`${name}\`: not propagating entryReads/writes because binding was already overwritten in parent`);
    } else {
      if (REF_TRACK_TRACING) console.log(`RTT: \`${name}\`: propagating ${finallyTreblo.entryReads.get(name)?.size??0} entryReads, ${finallyTreblo.entryWrites.get(name)?.size??0} entryWrites from the FinallyBlock to the parent`);
      finallyTreblo.entryReads.get(name)?.forEach((read) => upsertGetSet(parentEntryReads, name, read));
      finallyTreblo.entryWrites.get(name)?.forEach((write) => upsertGetSet(parentEntryWrites, name, write));
    }
  });
  if (REF_TRACK_TRACING) console.groupEnd();


  // The ContinuationBlock for a `finally` is different from all the others:
  // - It may catch normal code flow (from Try Block, if incoming fromBlock was not an abrupt completion)
  //   - If the Finally Block abrupt completes it'll do what it normally does
  //   - Otherwise it'll continue in the parent Block like usual
  //   -> If the incoming node was not from abrupt completion then flow continues after the Try node without special conditions
  // - It may catch abrupt completions of any kind
  //   - If the Block abrupt completes then that'll override the original target
  //   - If the Block does not abrupt complete then it'll continue with the originally targeted Block
  //     - Internal breaks or catches do not apply
  // - Normal finally rules (in case of nesting) still apply, recursively

  parentTryNode.$p.trebra.trappedByFinally.forEach(({
    srcPid,
    dst: continuationBlock,
    dstDefined: targetDefinedBlock, // either; continuationNode, or scope floor (func/program), or parent Block of Catch (parent to the Try of that Catch)
    abruptReason,
    abruptLabel,
    exitWrites: exitWritesSrc,
    entryReads: entryReadsSrc,
    entryWrites: entryWritesSrc,
    mutatedBetweenSrcAndDst: srcBlockMutatedBetweenSrcAndDst,
    overwrotes
  }, i) => {
    if (REF_TRACK_TRACING) console.group(`RTT: trappedByFinally[${i}]; from @${srcPid}, is {${abruptReason||'implicit'}} continuationBlock: to @${continuationBlock?.$p.pid ?? '(none)'}, targetDefinedBlock: @${targetDefinedBlock.$p.pid}, exitWrites: ${exitWritesSrc.size===0?'(none)':debugStringMapOfSetOfReadOrWrites(exitWritesSrc)}, overwrotes: ${Array.from(overwrotes).join(', ') || '(none)'}`);

    // Connect all entryReads and entryWrites to the exitWrites of the src
    // For all overwrotes in the fromBlock, replace the exitWrites with
    // the exitWrites of the finally. For all others, amend them instead.
    // The only bindings to consider here are the ones known in the _dst_ block
    // TODO: is that true? what about nested finally? Would outer finally need to care about writes to bindings not known in dst block? yes, right? so potentially use the parent of the nearest finally for this purpose. catch also comes into play here.
    // This kind of holds because even though an inner binding may have more writes, they
    // can not be observed because the code will always continue to a place
    // where these bindings do not exist and cannot be referenced.
    // TODO: is it still relevant to know which writes overwrite which writes or is that all fine and dandy?

    targetDefinedBlock.$p.treblo.defined.forEach(name => {
      if (REF_TRACK_TRACING) console.group(`RTT: - name: \`${name}\`, overwritten in src: ${overwrotes.has(name)}, in final: ${finallyTreblo.overwritten.has(name)}, exitWrites in src: ${exitWritesSrc.get(name)?.size??0}, in final: ${finallyTreblo.exitWrites.get(name)?.size??0}`);

      // Connect writes (finally entryReads -> src exitWrites)
      finallyTreblo.entryReads.get(name)?.forEach(read => {
        exitWritesSrc.get(name)?.forEach(write => {
          if (REF_TRACK_TRACING) console.log(`RTT: connect trappedToStartHere to finally; \`${name}\` read @`, +read.node.$p.pid, `in @${srcPid} reaches @`, +write.node.$p.pid);
          write.reachedByReads.add(read);
          read.reachesWrites.add(write);
        });
      });

      // Connect writes (finally entryWrites -> src exitWrites)
      finallyTreblo.entryWrites.get(name)?.forEach(newWrite => {
        exitWritesSrc.get(name)?.forEach(oldWrite => {
          if (REF_TRACK_TRACING) console.log(`RTT: connect trappedToStartHere from @${srcPid} to finally; \`${name}\` write @`, +newWrite.node.$p.pid, 'overwrites @', +oldWrite.node.$p.pid);
          oldWrite.reachedByWrites.add(newWrite);
          newWrite.reachesWrites.add(oldWrite);
        });
      });

      // Update exitWrites and overwritten of the continuation (not the Finally (!))
      // If the node was fully overwritten in the Finally, then replace them with the exitWrites of the Finally
      if (finallyTreblo.overwritten.has(name)) {
        if (REF_TRACK_TRACING) console.log(`RTT: \`${name}\` was overwritten in finally: replace ${exitWritesSrc.get(name)?.size??0} src exitWrites from @${srcPid} with ${finallyTreblo.exitWrites.get(name)?.size??0} from the Finally`);
        exitWritesSrc.set(name, new Set(finallyTreblo.exitWrites.get(name)));
      } else {
        if (REF_TRACK_TRACING) console.log(`RTT: \`${name}\` was not (fully) overwritten in finally: amend ${exitWritesSrc.get(name)?.size??0} src exitWrites from @${srcPid} with ${finallyTreblo.exitWrites.get(name)?.size??0} from the Finally`);
        finallyTreblo.exitWrites.get(name)?.forEach(write => upsertGetSet(exitWritesSrc, name, write));
      }

      // If overwritten in finally, or not overwritten at all in finally and fully overwritten in try, then mark scheduled node as fully overwritten
      // (We only need to act when finally fully overwrites, or when it does not at all)
      if (finallyTreblo.overwritten.has(name)) overwrotes.add(name);
      //else if (!finallyTreblo.exitWrites.get(name)?.size) overwrotes.add(name);
      if (REF_TRACK_TRACING) console.log('- scheduled continuation has overwritten?', overwrotes.has(name));

      if (REF_TRACK_TRACING) console.groupEnd(); // one defined
    });


    if (REF_TRACK_TRACING) console.log('RTT: must now reschedule the continuation in the nearest finally or catch, and otherwise the final dest');
    // - walk tree up to dst or first scope boundary
    // - if passing a try block with catch, schedule a throw copy too
    // - if passing a try block with finally, schedule it for that finally instead
    // - if no finally then schedule it for the dst
    // - (There is no catch+finally in normalized code so ignore that case)
    // - if the dst is parent then it's the Finally Block itself and was not abrupt (most common case, probably?)
    // Note: dst may be undefined, like with a throw or return. In that case only reschedule for catch (if throw) and finally (regardless). else bail.
    if (REF_TRACK_TRACING) console.group('TTR: ----> find continuation. Dest node @', continuationBlock?.$p.pid ?? '<none>', ', defined dst: @', targetDefinedBlock.$p.pid);

    const nodes = walkerPath.nodes;
    const top = nodes.length - 1;
    let scheduledFinally = false;
    let index = top;
    // We use targetDefinedBlock rather than continuationBlock because the targetDefinedBlock must exist (and is otherwise the same)
    if (REF_TRACK_TRACING) console.log('TTR: looking for @', +targetDefinedBlock?.$p.pid, ', starting at @', +nodes[index].$p.pid)
    while (nodes[index] !== targetDefinedBlock) {
      const node = nodes[index];

      if (REF_TRACK_TRACING) console.log('TTR: ->',index, node.type, '@', node.$p.pid);
      if (node.type === 'TryStatement') {
        if (REF_TRACK_TRACING) console.log(`TTR: - body is @${node.block.$p.pid} and it has a`, node.handler ? `Catch @${node.handler.body.$p?.pid??'(unvisited)'}` : `Finally @${node.finalizer.$p?.pid??'(unvisited)'}`);
      }

      // We're searching for the Catch or Finally between top and destination.
      // Destination must be a ancestor node in the AST except for a Catch that traps
      // a throw. We check explicitly for this case (otherwise it trips an ASSERT).

      // Search for the Try Block. This means we must check the parent and if it's
      // a Try then confirm that the Block node is in fact the node.block. Otherwise
      // it might be the Finally Block (not Catch because that has a specific parent).

      if (node.type === 'BlockStatement' && nodes[index-1].type === 'TryStatement' && nodes[index-1].block === node) {

        // This is the Try Block:
        // - If this Try has a Catch
        //   - Ignore it. Catch will be initialized explicitly by code for the implicit-throw that accesses all writes in the try
        // - Else, the Try Block has a Finally, schedule it there as trapped and stop loop
        // Once the targetDefinedBlock is found the loop ends and the continuation is scheduled there (or fizzles)
        // This may lead to a throw to reach an outer finally where it might not be but at the same time either the
        // Catch may throw immediately to cause that naturally unless it can't throw. That's a known loophole in this analysis.

        // This is the Try Block
        if (REF_TRACK_TRACING) console.log('TTR: - From the Try Block of Try @', +nodes[index-1].$p.pid, '; checking if trapped');
        const tryNode = nodes[index-1];
        ASSERT(!!tryNode.handler !== !!tryNode.finalizer, 'normalized code has one but never both');
        if (tryNode.handler) {
          if (REF_TRACK_TRACING) console.log('TTR: Ignoring Catch of Try @', +tryNode.$p.pid, ', Catch Block @', +tryNode.handler.$p.pid, ', @', +tryNode.handler.body.$p.pid);
        } else {
          if (REF_TRACK_TRACING) console.log('TTR: - exitWrites for this finally re-schedule:', Array.from(exitWritesSrc.entries()).map(([name, set]) => `${name}:${ Array.from(set).map((write) => `@${write.node.$p.pid}`).join(',')}`).join(', '));

          // Now schedule it in the trebra of the try node. Just copy all the bits from this one.
          tryNode.$p.trebra.trappedByFinally.push({
            srcPid,
            dst: continuationBlock,
            dstDefined: targetDefinedBlock,
            abruptReason,
            exitWrites: exitWritesSrc,
            overwrotes,
            entryReads: entryReadsSrc,
            entryWrites: entryWritesSrc,
            mutatedBetweenSrcAndDst: srcBlockMutatedBetweenSrcAndDst,
            abruptLabel,
          });
          if (REF_TRACK_TRACING) console.log('TTR: scheduled in trappedByFinally of Try @', +tryNode.$p.pid, 'with exitWrites', debugStringMapOfSetOfReadOrWrites(exitWritesSrc));

          scheduledFinally = true;
          break;
        }
      }
      --index;
      ASSERT(index >= 0, 'must find program if nothing else');
    }
    ASSERT(nodes[index], 'must find a scope');
    if (REF_TRACK_TRACING) console.groupEnd(); // ---->
    if (REF_TRACK_TRACING) console.log('TTR: --->',index, nodes[index].type, '@', nodes[index].$p.pid, ', scheduled finally:', scheduledFinally);

    if (scheduledFinally) {
      // noop
    } else if (!continuationBlock) {
      if (REF_TRACK_TRACING) console.log('TTR: Has no continuationBlock and is not further trapped by a Try so no need to schedule it');
    } else {
      ASSERT(abruptReason !== 'throw' && abruptReason !== 'implicit-throw');
      if (REF_TRACK_TRACING) console.log('TTR: Scheduling it for the final dst @', +nodes[index].$p.pid, 'with exitWrites', debugStringMapOfSetOfReadOrWrites(exitWritesSrc));
      console.log('FIXME mutatedBetweenSrcAndDst !== overwrotes')
      // If dst exists, schedule it in the nodes[index] node now
      nodes[index].$p.treblo.pendingNext.push({
        pid: srcPid,
        dst: continuationBlock,
        wasAbruptType: '',
        wasAbruptLabel: undefined,
        entryReads: new Map,
        entryWrites: new Map,
        exitWrites: exitWritesSrc, // Okay by reference. This is the last time we need it where it came from.
        overwritten: new Map,
        mutatedBetweenSrcAndDst: overwrotes
      });
    }

    if (REF_TRACK_TRACING) console.groupEnd(); // trappedByFinally loop body
  });
  if (REF_TRACK_TRACING) console.groupEnd(); // trappedByFinally loop wrap




  /*
  // Starting with normal flow (not abrupt incoming)
  // I don't think we do this for the Finally Block ...
  //if (REF_TRACK_TRACING) console.group('RTT: findAndQueueContinuationBlock(try.finalizer)');
  //findAndQueueContinuationBlock(finallyTreblo, +node.$p.pid, finallyTreblo.wasAbrupt?.type, finallyTreblo.wasAbrupt?.label?.name, walkerPath, globallyUniqueLabelRegistry, loopStack, catchStack);
  //if (REF_TRACK_TRACING) console.groupEnd();


  // Here we combine the Try Block with the Finally Block

  //if (grandNode !== continuationBlockFinally) TODO // return/break/etc


  // This is the easy part (finally is harder)
  //if (REF_TRACK_TRACING) console.group('RTT: There were', parentNode.$p.trebra.trappedByFinally.length, `block nodes pending to go through this Finally (abrupts: ${parentNode.$p.trebra.trappedByFinally.map(({abruptReason}) => abruptReason ?? 'implicit')})`);
  //parentNode.$p.trebra.trappedByFinally.forEach(fromBlock => TODO&&finallyTreblo.pendingNext.push({fixme:fromBlock}));

  // When the finally does an abrupt completion, how do you replay that?
  // The abrupt may change whether an exitwrite reaches the end or not
  // It may also mean both, jumping over a write, causing a read to see
  // it with and without the write.
  // The finally, and by extension all the things, would need to track all the branching they do...?
  // This is unique to the finally because after the code flow can leave a finally in different ways that depend on how they entered it (natural, break, throw, etc)
  // Ultimately, all runs either fizzle after the finally block or continue somewhere in the current path. but that doesn't solver a problem for us here.


  // -x walk through the finally with all scheduled nodes one-by-one
  // -x track a constant set of exitWrites, one for each scheduled node
  // -> track all completions on the nearest finally so you can apply all scheduled nodes on them..


  // - all Finally's should have an implicit throw case queued
  //    - has all the parent exitWrites and any write in the try, empty mutatedBetweenSrcAndDst
  //    - no entryReads/entryWrites? you dont know if and when this throw happens
  //    - would it include `x=1; break`, knowing it cant throw after the x=1 went through?
  //      - would be easier but I think less accurate...
  // - if name is overwritten in all pending blocks in a finally, no matter what, then the exitWrites from the parent are replaced
  //    - they never are if we add an implicit throw containing all writes and no mutatedBetweenSrcAndDst?
  // - all pending blocks either leave the finally through an explicit abrupt completion or by implicitly doing what they originally did
  //    - if it was an implicit from try then it'll just continue with the first statement after the try
  // - all blocks do the regular exitWrite dance
   */

  // The parent block should now have an updated exitWrites set for each of its bindings




  if (REF_TRACK_TRACING) console.groupEnd(); // TRY:FINALLY:after
  if (REF_TRACK_TRACING) console.groupEnd(); // TRY:FINALLY
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

  upsertGetSet(treblo.reads, name, read);
  upsertGetPush(treblo.rwOrder, name, read);

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
  }1

  if (treblo.overwritten.has(name)) {
    if (REF_TRACK_TRACING) console.log('Since binding was already overwritten in this block, @', +write.node.$p.pid, 'is not an entryWrite');
  } else {
    if (REF_TRACK_TRACING) console.log('Since binding was not yet overwritten in this block, @', +write.node.$p.pid, 'is an entryWrite, mark it as overwritten now in @', +blockNode.$p.pid);
    upsertGetSet(treblo.entryWrites, name, write);
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

  upsertGetPush(treblo.writes, name, write);
  upsertGetPush(treblo.rwOrder, name, write);

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

function findAndQueueContinuationBlock(fromBlockTreblo, fromBlockPid, wasAbruptType, wasAbruptLabel, walkerPath, globallyUniqueLabelRegistry, loopStack, catchStack) {
  if (wasAbruptType === 'throw') {
    // Completely ignore the explicit throw for the sake of ref analysis
    // We can do this because a throw that is untrpped (not wrapped in a Try Block
    // on any level of the AST) can not observe its exitWrites before leaving
    // the function or the program.
    // Inside a Try Block we invariably schedule an implicit throw, which
    // encapsulates all the writes in that Try Block as potential exitWrites,
    // which includes whatever an explicit throw would contain.
    // Therefor, the explicit throw would not add more information here.
    // Do not schedule, do not process, just ignore.
    if (REF_TRACK_TRACING) console.log('RTT: Ignoring an abrupt completion that is an explict throw because either an implicit throw will supersede it or it cannot be observed');
    return;
  }

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
  let continuationBlock = findSimpleContinuationBlock(wasAbruptType, wasAbruptLabel, walkerPath, globallyUniqueLabelRegistry, loopStack);

  const srcBlockMutatedBetweenSrcAndDst = new Set(fromBlockTreblo.overwritten)

  const nodes = walkerPath.nodes;
  const topIndex = nodes.length - 1;



  // This determines which `defined` set to use when iterating over var names.
  // This is usually the same as the continuationBlock, but there are some exceptions:
  // - return/throw has no continuation block. In that case it's the nearest scope floor (func/program)
  // - if throw and target is catch block then target is the parent block of its try
  // - for a continue that loops the target is the parent of the loop
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
    if (REF_TRACK_TRACING) console.log('- The target block is @', targetDefinedBlock?.$p.pid);
  }




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
  let loops = wasAbruptType === 'continue' || +continuationBlock?.$p.pid === fromBlockPid;
  if (REF_TRACK_TRACING) console.log(`TTR: Loops? Only if abrupt was "continue" (= "${wasAbruptType}"), or if continuation block has same pid as from block (`, +continuationBlock?.$p.pid === fromBlockPid, '), verdict:', loops);

  // We passed a Catch if we see a TryStatement that has a Catch Block (so not if it only has a Finally Block)
  let nearestCatchBlockParentTry = false;
  // We passed a Finally if we either see a TryStatement with a Finally Block or a catch block with a Finally Block
  let nearestFinallyParentTry = false;

  // If code doesn't abrupt then it can't go through a trap and we can skip this search
  if (wasAbruptType) {
    if (REF_TRACK_TRACING) console.group(`TTR: Abrupt type=${wasAbruptType}. Queuing overwrites mutations in loops`);
    scheduleWrittensAtLoops(topIndex, wasAbruptType, fromBlockTreblo, srcBlockMutatedBetweenSrcAndDst, fromBlockPid, continuationBlock, nodes);
    if (REF_TRACK_TRACING) console.groupEnd(); // loop
    if (REF_TRACK_TRACING) console.group(`TTR: Abrupt type=${wasAbruptType}. Searching for nearest catch or finally trap between fromBlock @${fromBlockPid} and target ${continuationBlock ? `@${continuationBlock.$p?.pid}` : 'nearest function boundary'}`, 'queuing overwrites in loops');
    ({ nearestCatchBlockParentTry, nearestFinallyParentTry } = findAbruptCatchOrFinallyTrap(topIndex, wasAbruptType, continuationBlock, nodes));
    if (REF_TRACK_TRACING) console.groupEnd(); // loop
  } else if (nodes[topIndex].type === 'BlockStatement' && nodes[topIndex-1].type === 'TryStatement' && walkerPath.props[walkerPath.props.length - 1] === 'block') {
    if (REF_TRACK_TRACING) console.log('TTR: This is a Try Block. It can be trapped by its Catch or Finally');
    const tryNode = nodes[topIndex-1];
    if (tryNode.handler) {
      if (wasAbruptType === 'implicit-throw' && !nearestFinallyParentTry) {
        console.log('dit moet dus niet gebeuren maar deze throw moet meteen in de catch worden gezet')
        if (REF_TRACK_TRACING) console.log('  TTR: The Try has a Catch so setting nearestCatchBlockParentTry to that');
        nearestCatchBlockParentTry = tryNode;
      }
    } else {
      if (!nearestCatchBlockParentTry) {
        if (REF_TRACK_TRACING) console.log('  TTR: The Try has a Finally so setting nearestFinallyParentTry to that');
        ASSERT(tryNode.finalizer);
        nearestFinallyParentTry = tryNode;
      }
    }
  } else {
    if (REF_TRACK_TRACING) console.log(`TTR: Was not abrupt so cant go through catch/finally trap`);
  }

  // If we found a catch or finally then the continuation node must go there first. We will clear the vars but we need it when scheduling.
  const continuationBlockBackup = continuationBlock;

  if (nearestCatchBlockParentTry) {
    ASSERT(!(nearestCatchBlockParentTry && nearestFinallyParentTry), 'not both');
    // If the continuation is trapped by a Catch or Finally then let it propagate from there
    if (REF_TRACK_TRACING) console.log('TTR: Since there was a Catch handler between the current and the continuation node, code must continue in that handler first. Clearing the continuation node.');
    continuationBlock = undefined; // We only care about the Catch now
  }
  else if (nearestFinallyParentTry) {
    if (REF_TRACK_TRACING) console.log('TTR: Since there was a Finally handler between the current and the continuation node, code must continue in that handler first. Clearing the continuation node.');
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
  // like "the set of all mutatedBetweenSrcAndDst in any parent so far" because that would only work if you went all the way
  // back up to the Block that defined the binding. More often than not, not the case.

  // The bad news: this is a bit expensive. For each binding that was known at the continuation block we must check
  // whether it was .overwritten before reaching the first catch, finally, and the continuation block.

  // We can prune bindings that are constants and bindings that are known to be closures.

  //const overwrotesBeforeDst = new Set;
  //const overwrotesBeforeCatch = new Set;
  //const overwrotesBeforeFinally = new Set;
  //
  //
  //if ((!wasAbruptType || wasAbruptType === 'continue') && ['WhileStatement', 'ForInStatement', 'ForOfStatement'].includes(walkerPath.nodes[top].type)) {
  //  loops = true;
  //  if (REF_TRACK_TRACING) console.log(`TTR: special case implicit loop continue overwritten check, using this set:`, continuationBlock?.$p.treblo.overwritten);
  //  // This was an implicit end of a loop so it continues. This is an exception case where the walker goes back down
  //  // in the AST, rather than up (which is the case for all other code flow changes). So we special case it.
  //  // Since this can't break through a catch or finally trap, we can safely check the overwritten state for
  //  // the same body.
  //  ASSERT(continuationBlock, 'implicit completions of loop blocks should always result in a continuationBlock (usually itself)');
  //  targetDefinedBlock.$p.treblo.defined.forEach(name => {
  //    const status = {
  //      dst: false, // .overwritten between node and continuation block?
  //      cat: false, // .overwritten between node and nearest catch? (if any)
  //      fin: false, // .overwritten between node and nearest finally? (if any)
  //    };
  //    if (continuationBlock.$p.treblo.overwritten.has(name)) {
  //      overwrotesBeforeDst.push(name);
  //    }
  //  });
  //}
  //
  //if (REF_TRACK_TRACING) console.log('TTR: populating the mutatedBetweenSrcAndDst list...');
  //targetDefinedBlock.$p.treblo.defined.forEach(name => {
  //  // TODO: use global registry to prune constants and closures
  //
  //  let index = top;
  //  if ((nodes[index].type === 'WhileStatement' || nodes[index].type === 'ForInStatement' || nodes[index].type === 'ForOfStatement') && nodes[index].body === targetDefinedBlock) {
  //    if (REF_TRACK_TRACING) console.log('TTR: exception case: block is loop body and looping');
  //
  //  } else {
  //    // We cantCatch if we've seen a TryStatement that has a Catch Block or if we've already seen a Finally
  //    let cantCatch = false;
  //    // We cantFinally if we've seen a TryStatement with a Finally Block
  //    let cantFinally = false;
  //    while (nodes[index] !== targetDefinedBlock) {
  //      const node = nodes[index];
  //      if (node.type === 'BlockStatement') {
  //        if (node.$p.treblo.overwritten.has(name)) {
  //          overwrotesBeforeDst.add(name);
  //          if (!cantCatch) overwrotesBeforeCatch.add(name);
  //          if (!cantFinally) overwrotesBeforeFinally.add(name);
  //          break; // We have all the info we need
  //        }
  //
  //        // Note: being in a TryStatement block doesn't mean anything because, for example, if we
  //        // just came through a Finally handler block then that won't trap anything in itself. That's
  //        // why we have to check the parent of the Block instead.
  //
  //        // If we passed a finally then we don't care about catch anymore
  //        if (!cantFinally && nodes[index-1].type === 'TryStatement' && nodes[index-1].block === node) {
  //          // This is the Try Block and it will be trapped by a Catch or a Finally Block (not both)
  //          if (node.handler) {
  //            if (!cantFinally) {
  //              cantCatch = true;
  //            }
  //          } else {
  //            cantFinally = true;
  //            // Since a Finally catches it first, an outer Catch handler won't be able to catch it before the Finally triggers.
  //            cantCatch = true;
  //          }
  //        }
  //      }
  //
  //      --index;
  //      ASSERT(index >= 0, 'targetDefinedBlock must be in the current list of parent nodes');
  //    }
  //  }
  //});

  if (nearestFinallyParentTry) {
    // (Finalizer not yet visited so has no pid to mention)
    if (REF_TRACK_TRACING) console.log('TTR: scheduling continuation from @', fromBlockPid, 'for Finally of nearest Finally Block, Try Node @', +nearestFinallyParentTry.$p?.pid, ', targetDefinedBlock=@', +targetDefinedBlock.$p.pid, ', continuationBlockBackup=@', +continuationBlockBackup?.$p?.pid);
    if (REF_TRACK_TRACING) console.log('TTR: - source treblo exitWrites:', debugStringMapOfSetOfReadOrWrites(fromBlockTreblo.exitWrites));

    /** @type {Map<string, Set<Write>>} */
    const writes = new Map;
    fromBlockTreblo.exitWrites.forEach((set, name) => writes.set(name, new Set(set)));


    if (REF_TRACK_TRACING) console.log('TTR: - exitWrites for this finally schedule:', debugStringMapOfSetOfReadOrWrites(writes));
    ASSERT(!nearestCatchBlockParentTry, 'continuation is only trapped by one thing');
    ASSERT(!continuationBlock, 'continuation is only trapped by one thing');

    // This will need to be the try node trebra because the treblo doesnt exit yet
    // because it's a _next_ sibling node to a node path in the sub-tree being traversed
    nearestFinallyParentTry.$p.trebra.trappedByFinally.push({
      abruptReason: wasAbruptType,
      srcPid: fromBlockPid,
      exitWrites: writes, // fromBlockTreblo.exitWrites, // This should include the exitWrites from the parent as they were before the Try
      dst: continuationBlockBackup,
      dstDefined: targetDefinedBlock,
      overwrotes: new Set(fromBlockTreblo.overwritten),

      entryReads: fromBlockTreblo.entryReads,
      entryWrites: fromBlockTreblo.entryWrites,
      mutatedBetweenSrcAndDst: srcBlockMutatedBetweenSrcAndDst,
      abruptLabel: wasAbruptLabel,
    });
  }
  if (continuationBlock) {
    if (loops) {
      if (REF_TRACK_TRACING) console.log('TTR: scheduling looping from node @', fromBlockPid, 'in continuationBlock (nearest Loop Block) @', +continuationBlock.$p.pid, ', with overwritten:', Array.from(fromBlockTreblo.overwritten));
      continuationBlock.$p.treblo.pendingLoop.push({
        pid: fromBlockPid,
        entryReads: fromBlockTreblo.entryReads,
        entryWrites: fromBlockTreblo.entryWrites,
        exitWrites: fromBlockTreblo.exitWrites,
        dst: continuationBlockBackup,
        mutatedBetweenSrcAndDst: srcBlockMutatedBetweenSrcAndDst
      });
    } else {
      if (REF_TRACK_TRACING) console.log('TTR: scheduling from node @', fromBlockPid, 'in continuationBlock (nearest parent Block) @', +continuationBlock.$p.pid, ', with overwritten:', Array.from(fromBlockTreblo.overwritten));
      continuationBlock.$p.treblo.pendingNext.push({
        pid: fromBlockPid,
        dst: continuationBlockBackup,
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
  else if (wasAbruptType === 'continue') {
    // code continues _with_ the node (same index in the parent block)
    if (wasAbruptLabel) {
      // We can return the label statement since that's essentially the same
      const labelNode = globallyUniqueLabelRegistry.get(wasAbruptLabel).node;
      ASSERT(['WhileStatement', 'ForInStatement', 'ForOfStatement'].includes(labelNode.body.type), 'if continue can syntactically target a label then it must have a loop as body');
      ASSERT(labelNode.body.body.type === 'BlockStatement', 'and this is the loop body');
      return labelNode.body.body;
    } else {
      // Nearest loop, then that body
      return loopStack[loopStack.length - 1].body;
    }
  }
  else if (wasAbruptType === 'return') {
    // Code does not continue but may still traverse through one or
    // more finally blocks (which we explicitly ignore here)
    return undefined;
  }
  else if (wasAbruptType === 'throw' || wasAbruptType === 'implicit-throw') {
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
    return undefined;
  }
  else {
    ASSERT(false, 'should be one of these cases');
  }

  ASSERT(false, 'unreachable');
}

/**
 * Schedule continuations that break through loops such that those continuations get their
 * overwritten updated once the loop connects exitWrites back to the start of the loop.
 * The `nodes` is from the walker. srcBlockMutatedBetweenSrcAndDst is by reference.
 */
function scheduleWrittensAtLoops(topIndex, wasAbruptType, fromBlockTreblo, srcBlockMutatedBetweenSrcAndDst, fromBlockPid, continuationBlock, nodes) {
  if (REF_TRACK_TRACING) console.log(`TTR: scheduleWrittensAtLoops(${wasAbruptType}), continuationBlock: ${continuationBlock ? `@${continuationBlock.$p.pid}` : '(none)'}`);

  let index = topIndex;
  while (continuationBlock ? nodes[index] !== continuationBlock : (nodes[index].type !== 'FunctionDeclaration' && nodes[index].type !== 'FunctionExpression' && nodes[index].type !== 'Program')) {
    const currentIndexNode = nodes[index];
    if (REF_TRACK_TRACING) console.group(`TTR: depth: ${index}, type=${currentIndexNode.type}, @${currentIndexNode.$p.pid}`);

    if (currentIndexNode.type === 'WhileStatement' || currentIndexNode.type === 'ForInStatement' || currentIndexNode.type === 'ForOfStatement') {
      if (index === topIndex && currentIndexNode.body === continuationBlock) {
        if (REF_TRACK_TRACING) console.log(`TTR: continues in same loop`);
        if (REF_TRACK_TRACING) console.groupEnd();
        break;
      }

      if (REF_TRACK_TRACING) console.log('TTR: Scheduling srcBlock @', fromBlockPid, 'in the pendingLoopWriteChecks of loop @', +currentIndexNode.$p.pid, 'to update for any continuation that loops');
      currentIndexNode.$p.trebra.pendingLoopWriteChecks.push({
        abruptReason: wasAbruptType,
        srcPid: +fromBlockPid,
        exitWrites: fromBlockTreblo.exitWrites, // by reference
        mutatedRefs: srcBlockMutatedBetweenSrcAndDst, // By reference... because the loop:after will update this with the loopers
      });
    }

    if (REF_TRACK_TRACING) console.groupEnd(); // inner loop

    --index;
    ASSERT(index >= 0, 'continuation block must be in the current list of parent nodes, or if there was none then a nearest function/program must be found');
  }
  if (REF_TRACK_TRACING) console.log(`TTR: final depth: ${index}, type=${nodes[index].type}, @${nodes[index].$p.pid}`);
}

function findAbruptCatchOrFinallyTrap(topIndex, wasAbruptType, continuationBlock, nodes) {
  if (REF_TRACK_TRACING) console.log(`TTR: findAbruptCatchOrFinallyTrap(${wasAbruptType})`);

  let index = topIndex;
  while (continuationBlock ? nodes[index] !== continuationBlock : (nodes[index].type !== 'FunctionDeclaration' && nodes[index].type !== 'FunctionExpression' && nodes[index].type !== 'Program')) {
    const currentIndexNode = nodes[index];

    if (currentIndexNode.type === 'WhileStatement' || currentIndexNode.type === 'ForInStatement' || currentIndexNode.type === 'ForOfStatement') {
      if (index === topIndex && currentIndexNode.body === continuationBlock) {
        if (REF_TRACK_TRACING) console.log(`TTR: continues in same loop`);
        break;
      }
    }

    if (REF_TRACK_TRACING) console.group(`TTR: depth: ${index}, type=${currentIndexNode.type}, @${currentIndexNode.$p.pid}`);
    if (currentIndexNode.type === 'BlockStatement') {
      const currentParentNode = nodes[index-1];
      //     TryStatement { block, handler: CatchClause { body }, finalizer }
      // Note: being in a TryStatement block doesn't mean anything because, for example, if we
      // just came through a finally handler block then that won't trap anything in itself. That's
      // why we have to check the parent of the Block instead.

      // If catch clause, check if it has a `finally` sibling. In that case we have now passed through a Finally barrier.
      if (currentParentNode.type === 'CatchClause') {
        // The Catch _only_ captures continuations that are throwing.
        // Note that for Try Blocks we explicitly schedule the implicit throw
        // This means we can ignore Catch Blocks for anything that is not a "throw".
        if (wasAbruptType === 'implicit-throw') {
          if (REF_TRACK_TRACING) console.log('TTR:   Catch Block');
          ASSERT(!nodes[index-2].finalizer, 'in normalized code a Try only has a Catch or a Finally but not both');
          if (REF_TRACK_TRACING) console.groupEnd(); // loop inside
          return {nearestCatchBlockParentTry: currentParentNode, nearestFinallyParentTry: false};
        }
      }
      if (currentParentNode.type === 'TryStatement') {
        if (REF_TRACK_TRACING) console.log('TTR: parent is Try @', +currentParentNode.$p.pid);
        ASSERT(!currentParentNode.handler !== !currentParentNode.finalizer, 'try has a catch or finally but not both');
        // Note: we only need to check the Try Block because a Catch can not also be trapped by a Finally after normalization :)
        if (currentParentNode.block === currentIndexNode) {
          if (REF_TRACK_TRACING) console.log('TTR:   Try Block. Is it trapped by Catch?', !!currentParentNode.handler, ' or by Finally?', !!currentParentNode?.finalizer);
          // This is the try block and it will be trapped by a Catch or a Finally Block
          if (currentParentNode.handler) {
            // Only "throw" continuations can be caught by the Catch
            if (wasAbruptType === 'implicit-throw') {
              if (REF_TRACK_TRACING) console.log('TTR:   Hit! The Try Block is trapped by the Catch of this Try and this continuation was a "throw"');
              if (REF_TRACK_TRACING) console.groupEnd(); // loop inside
              return {nearestCatchBlockParentTry: currentParentNode, nearestFinallyParentTry: false};
            }
          }
          else {
            if (REF_TRACK_TRACING) console.log('TTR:   Hit!! The Try Block is trapped by the Finally of this Try');
            if (REF_TRACK_TRACING) console.groupEnd(); // loop inside
            return {nearestCatchBlockParentTry: false, nearestFinallyParentTry: currentParentNode};
          }
        } else {
          if (REF_TRACK_TRACING) console.log('TTR:   This is Catch or Finally. Ignoring for this case.');
        }
      }
    }
    if (REF_TRACK_TRACING) console.groupEnd(); // inner loop

    --index;
    ASSERT(index >= 0, 'continuation block must be in the current list of parent nodes, or if there was none then a nearest function/program must be found');
  }
  if (REF_TRACK_TRACING) console.log(`TTR: Miss! Final depth: ${index}, type=${nodes[index].type}, @${nodes[index].$p.pid}. The continuation is not trapped.`);

  return { nearestCatchBlockParentTry: false, nearestFinallyParentTry: false };
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
