import {ASSERT, vlog} from "../utils.mjs"
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


export const REF_TRACK_TRACING = false;

export function openRefsOnBeforeProgram(node) {
  if (REF_TRACK_TRACING) console.group('RTT: PROGRAM');
  if (REF_TRACK_TRACING) console.group('RTT: PROGRAM:before');

  node.$p.treblo = createTreblo(new Set, new Map, new Map, new Set);

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
  if (REF_TRACK_TRACING) console.group('RTT: BLOCK:before', parentNode.type);

  node.$p.treblo = createTreblo(parentBlock.$p.treblo.defined, parentBlock.$p.treblo.exitWrites, parentBlock.$p.treblo.exitWritesBefore, parentBlock.$p.treblo.overwritten);

  // Special case nodes with multiple block children that depend on each
  // other but where the walker does not visit another node in between
  switch (parentNode.type) {
    case 'TryStatement': {
      if (parentProp === 'block') {
        openRefsOnBeforeTryBody(node, parentNode, parentProp, parentBlock);
      } else if (parentProp === 'finalizer') {
        openRefsOnBeforeFinallyBody(node, parentNode, parentProp, parentBlock);
      } else {
        console.log('prop:', parentProp)
        TODO // ??
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
      if (REF_TRACK_TRACING) console.log('RTT: block:enter unknown node,', parentNode.type);
      ASSERT(['IfStatement', 'WhileStatement', 'ForInStatement', 'ForOfStatement', 'LabeledStatement', 'FunctionExpression'].includes(parentNode.type), 'expecting normalized code but found an unexpected node', parentNode.type);
    }
  }

  if (REF_TRACK_TRACING) console.groupEnd(); // BLOCK:before
}

export function openRefsOnAfterBlock(node, parentNode, parentProp, loopStack, parentBlock, globallyUniqueLabelRegistry, tryNodeStack) {
  if (REF_TRACK_TRACING) console.group('RTT: BLOCK:after', parentNode.type);

  switch (parentNode.type) {
    case 'TryStatement': {
      if (parentProp === 'block') {
        openRefsOnAfterTryBody(node, parentBlock, globallyUniqueLabelRegistry, loopStack, tryNodeStack);
      } else if (parentProp === 'finalizer') {
        openRefsOnAfterFinallyBody(node, parentNode, parentProp, globallyUniqueLabelRegistry, loopStack);
      } else {
        console.log('prop:', parentProp)
        TODO // ??
      }
      break;
    }


    case 'CatchClause': {
      openRefsOnAfterCatchBody(node, parentNode, parentProp);
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

  node.$p.openRefsT = createTrebra();

  if (REF_TRACK_TRACING) console.groupEnd(); // IF:before
}

export function openRefsOnafterIf(node, parentBlock, globallyUniqueLabelRegistry, loopStack, blockStack, tryNodeStack) {
  if (REF_TRACK_TRACING) console.group('RTT: IF:after');

  const continuationNodeTrueBranch = findContinuationNode(node.consequent.$p.treblo.wasAbrupt, globallyUniqueLabelRegistry, loopStack);

  // Check for breaking through a finally barrier
  // We need to confirm whether there's a `try` node with a pid between the target node and the current node
  // If there is, we need to confirm whether this node has a `finally` block
  // If so, we need to special case that because the finally is a forced path, that's its job

  const nearestFinallyTryNode = tryNodeStack[tryNodeStack.length - 1];
  if (
    // If the flow continues inside this function but breaks through a finally barrier, we have to hit the finally first
    (continuationNodeTrueBranch && +continuationNodeTrueBranch.$p.pid < +nearestFinallyTryNode?.$p.pid) ||
    // If the flow does not continue in this function, but does cross a finally barrier before leaving the function, then we have to hit that finally
    (!continuationNodeTrueBranch && nearestFinallyTryNode && node.$p.funcDepth === nearestFinallyTryNode?.$p.funcDepth)
  ) {
    if (REF_TRACK_TRACING) console.log('  `yes`, through finally, abrupt:', node.consequent.$p.treblo.wasAbrupt?.type, ', continues after node @:', continuationNodeTrueBranch?.$p.pid, ', has', node.consequent.$p.treblo.entryReads.size, ' entryReads,', node.consequent.$p.treblo.entryWrites.size, 'entryWrites, and', node.consequent.$p.treblo.exitWrites.size, 'exitWrites');
    nearestFinallyTryNode.$p.openRefsT.finallyCaught.push([node.consequent, node.consequent.$p.treblo.exitWrites, continuationNodeTrueBranch]);
  } else if (continuationNodeTrueBranch) {
    const treblo = node.consequent.$p.treblo;
    // continuationNodeA is now the node _after_ which code flow continues
    // This may be null, in case of early return/throw. This may be the last statement of the block.
    // Without abrupt completions it'll just be the `if` statement itself.
    if (REF_TRACK_TRACING) console.log('  `yes`, abrupt:', treblo.wasAbrupt?.type, ', continues after node @:', continuationNodeTrueBranch?.$p.pid, ', has', treblo.entryReads.size, ' entryReads,', treblo.entryWrites.size, 'entryWrites, and', treblo.exitWrites.size, 'exitWrites');
    // Now add the exitWrites to the parent block for each continuation
    // node for each binding that already existed before that node
    continuationNodeTrueBranch?.$p.openRefsT.exitWritesAfter.push(treblo);
  }

  // Repeat for `else` branch

  const continuationNodeFalseBranch = findContinuationNode(node.alternate.$p.treblo.wasAbrupt, globallyUniqueLabelRegistry, loopStack);
  if (
    // If the flow continues inside this function but breaks through a finally barrier, we have to hit the finally first
    (continuationNodeFalseBranch && +continuationNodeFalseBranch.$p.pid < +nearestFinallyTryNode?.$p.pid) ||
    // If the flow does not continue in this function, but does cross a finally barrier before leaving the function, then we have to hit that finally
    (!continuationNodeFalseBranch && nearestFinallyTryNode && node.$p.funcDepth === nearestFinallyTryNode?.$p.funcDepth)
  ) {
    if (REF_TRACK_TRACING) console.log('  `yes`, through finally, abrupt:', node.alternate.$p.treblo.wasAbrupt?.type, ', continues after node @:', continuationNodeFalseBranch?.$p.pid, ', has', node.alternate.$p.treblo.entryReads.size, ' entryReads,', node.alternate.$p.treblo.entryWrites.size, 'entryWrites, and', node.alternate.$p.treblo.exitWrites.size, 'exitWrites');
    nearestFinallyTryNode.$p.openRefsT.finallyCaught.push([node.alternate, node.alternate.$p.treblo.exitWrites, continuationNodeFalseBranch]);
  } else if (continuationNodeFalseBranch) {
    const treblo = node.alternate.$p.treblo;
    // continuationNodeA is now the node _after_ which code flow continues
    // This may be null, in case of early return/throw. This may be the last statement of the block.
    // Without abrupt completions it'll just be the `if` statement itself.
    if (REF_TRACK_TRACING) console.log('  `yes`, abrupt:', treblo.wasAbrupt?.type, ', continues after node @:', continuationNodeFalseBranch?.$p.pid, ', has', treblo.entryReads.size, ' entryReads,', treblo.entryWrites.size, 'entryWrites, and', treblo.exitWrites.size, 'exitWrites');
    // Now add the exitWrites to the parent block for each continuation
    // node for each binding that already existed before that node
    continuationNodeFalseBranch?.$p.openRefsT.exitWritesAfter.push(treblo);
  }

  // Now process all these afters for this node because
  // there can be no further things jumping to this node.

  // Note: for an `if`, only the "consequent" and "alternate" blocks might use
  // the `if` as their continuation node. And only if they don't complete abruptly.
  // For each branch, apply current outer set of exitWrites (as right before the `if`) to all entryReads and entryWrites
  // Then, for each block that uses this `if` as its continuationNode, replace or merge their exitWrites with the parent exitWrites.

  const blocksThatContinueHere = [];
  if (!node.consequent.$p.treblo.wasAbrupt) blocksThatContinueHere.push(node.consequent);
  if (!node.alternate.$p.treblo.wasAbrupt) blocksThatContinueHere.push(node.alternate);

  const bothBlocks = [node.consequent, node.alternate];

  //if (REF_TRACK_TRACING) console.group('`if` parent block @', parentBlock.$p.pid, 'knew of', parentBlock.$p.treblo.defined.size, 'bindings. Now processing the entryReads and entryWrites of both branches, as well as', node.$p.openRefsT.exitWritesAfter.length, 'sets of writes @', +parentBlock.$p.pid);
  //parentBlock.$p.treblo.defined.forEach(name => {
  //  if (REF_TRACK_TRACING) console.group('- binding:', [name]);
  //
  //  const wasOverwrittenBeforeNode = parentBlock.$p.treblo.overwritten.has(name);
  //  if (REF_TRACK_TRACING) console.log('- wasOverwrittenBeforeNode:', wasOverwrittenBeforeNode);
  //
  //  const overwrittenInBothBranches = blocksThatContinueHere.every(blockNode => !blockNode.$p.treblo.wasAbrupt && blockNode.$p.treblo.overwritten.has(name));
  //  if (REF_TRACK_TRACING) console.log('- overwrittenInBothBranches:', overwrittenInBothBranches);
  //
  //  // If overwritten in all branches that continue here, the statement after this `if`
  //  // cannot see the entry value, so we replace the set of exitWrites first.
  //  if (overwrittenInBothBranches) {
  //    if (REF_TRACK_TRACING) console.log('Setting parent exitWrites to empty set because this node overwrites it in all branches leading to after the node');
  //    if (parentBlock.$p.treblo.exitWrites.get(name)) parentBlock.$p.treblo.exitWrites.set(name, new Set);
  //    parentBlock.$p.treblo.overwritten.set(name, true);
  //  } else {
  //    if (REF_TRACK_TRACING) console.log('Will amend exitWrites to parent because not overwritten in all branches');
  //  }
  //
  //  // Some things are done regardless (entryReads entryWrites etc)
  //  if (REF_TRACK_TRACING) console.group('Propagating entryReads entryWrites from', bothBlocks.length, 'block nodes');
  //  bothBlocks.forEach(blockNode => {
  //    // When not yet overwritten, copy the entry reads/writes to the parent
  //    if (!wasOverwrittenBeforeNode) {
  //      const entryReadsSet = blockNode.$p.treblo.entryReads.get(name);
  //      let parentEntryReadsSet = parentBlock.$p.treblo.entryReads.get(name);
  //      if (!parentEntryReadsSet && entryReadsSet?.size) {
  //        parentEntryReadsSet = new Set;
  //        parentBlock.$p.treblo.entryReads.set(name, parentEntryReadsSet);
  //      }
  //      entryReadsSet?.forEach(write => parentEntryReadsSet.add(write));
  //
  //      const entryWritesSet = blockNode.$p.treblo.entryWrites.get(name);
  //      let parentEntryWritesSet = parentBlock.$p.treblo.entryWrites.get(name);
  //      if (!parentEntryWritesSet && entryWritesSet?.size) {
  //        parentEntryWritesSet = new Set;
  //        parentBlock.$p.treblo.entryWrites.set(name, parentEntryWritesSet);
  //      }
  //      entryWritesSet?.forEach(write => parentEntryWritesSet.add(write));
  //    }
  //  });
  //  if (REF_TRACK_TRACING) console.groupEnd();
  //
  //  // Some things are done only when this if is the continuation node (exitWrites)
  //  if (REF_TRACK_TRACING) console.log('There are', blocksThatContinueHere.length, 'block nodes that continue after this `if`-node');
  //  blocksThatContinueHere.forEach((blockNode, i) => {
  //    if (REF_TRACK_TRACING) console.group('- blockNode', i, blockNode === node.consequent ? '(yes-block)' : blockNode === node.alternate ? '(no-block)' : '(unknown)');
  //
  //    const exitWrites = blockNode.$p.treblo.exitWrites.get(name);
  //
  //    let set = parentBlock.$p.treblo.exitWrites.get(name);
  //    if (exitWrites?.size && !set) {
  //      set = new Set;
  //      parentBlock.$p.treblo.exitWrites.set(name, set);
  //    }
  //    exitWrites?.forEach(write => set.add(write));
  //
  //    // Copy all reads and writes to the parent, regardless of abrupt.
  //    // "if the consequent writes then a finally must know about it"
  //    blockNode.$p.treblo.writes.get(name)?.forEach(write => parentBlock.$p.treblo.writes.get(name)?.push(write) ?? parentBlock.$p.treblo.writes.set(name, [write]));
  //    blockNode.$p.treblo.reads.get(name)?.forEach(read => parentBlock.$p.treblo.reads.get(name)?.push(read) ?? parentBlock.$p.treblo.reads.set(name, [read]));
  //
  //    if (REF_TRACK_TRACING) console.groupEnd(); // /loop
  //  });
  //
  //  if (REF_TRACK_TRACING) console.groupEnd(); // /binding name
  //});
  //if (REF_TRACK_TRACING) console.groupEnd(); // outer `defined` loop

  // The parent block should now have an updated exitWrites set for each of its bindings

  if (REF_TRACK_TRACING) console.groupEnd(); // IF:after
  if (REF_TRACK_TRACING) console.groupEnd(); // IF
  if (REF_TRACK_TRACING) console.log('/IF');
}

export function openRefsOnBeforeLoop(kind /*: loop | in | of */, node, parentBlock) {
  if (REF_TRACK_TRACING) console.group('RTT: LOOP,', kind);
  if (REF_TRACK_TRACING) console.group('RTT: LOOP:before,', kind, ', has', parentBlock.$p.treblo.defined.size, 'known bindings');

  node.$p.openRefsT = createTrebra();

  if (REF_TRACK_TRACING) console.groupEnd(); // LOOP:before
}

export function openRefsOnAfterLoop(kind /* loop | in | of */, node, parentBlock, globallyUniqueLabelRegistry, loopStack, tryNodeStack) {
  if (REF_TRACK_TRACING) console.group('RTT: LOOP:after,', kind, 'after @', +node.$p.pid);

  /** @var {Treblo} */
  const treblo = node.body.$p.treblo;
  const continuationNode = findContinuationNode(treblo.wasAbrupt, globallyUniqueLabelRegistry, loopStack);

  // Check for breaking through a finally barrier
  // We need to confirm whether there's a `try` node with a pid between the target node and the current node
  // If there is, we need to confirm whether this node has a `finally` block
  // If so, we need to special case that because the finally is a forced path, that's its job
  const nearestFinallyTryNode = tryNodeStack[tryNodeStack.length - 1];
  if (+continuationNode?.$p.pid < +tryNodeStack[tryNodeStack.length - 1]?.$p.pid) {
    nearestFinallyTryNode.$p.openRefsT.finallyCaught.push([node.body, treblo.exitWrites, continuationNode]);
  } else {
    // continuationNode is now the node _after_ which code flow continues
    // This may be null, in case of early return/throw. This may be the last statement of the block.
    // Without abrupt completions it'll just be the `while` statement itself, with the caveat that
    // body may still need to connect the end to the start. But if the test fails, code logic would
    // continue after the while so that's why it makes sense.
    if (REF_TRACK_TRACING) console.log('  loop, abrupt:', treblo.wasAbrupt?.type, ', continues after node @:', continuationNode?.$p.pid, ', has', treblo.entryReads.size, ' entryReads,', treblo.entryWrites.size, 'entryWrites, and', treblo.exitWrites.size, 'exitWrites');
    // Now add the exitWrites to the parent block for each continuation
    // node for each binding that already existed before that node
    continuationNode?.$p.openRefsT.exitWritesAfter.push(treblo);
  }

  if (REF_TRACK_TRACING) console.log('end of loop body continues after node @:', continuationNode?.$p.pid, '(', continuationNode?.type ?? '<???>', ')', '(this node?', continuationNode === node, ')');

  // "upstream changes" now. see large blob of commented out code for alt path

  // Now add the exitWrites to the parent block for each continuation
  // node for each binding that already existed before that node

  //continuationNode?.$p.openRefsT.entryReadsAfter.push(node.body.$p.treblo.entryReads);
  //continuationNode?.$p.openRefsT.entryWritesAfter.push(node.body.$p.treblo.entryWrites);
  continuationNode?.$p.openRefsT.exitWritesAfter.push([treblo.wasAbrupt?.type, treblo.exitWrites]);

  // Now process all these afters for this node because
  // there can be no further things jumping to this node.

  //if (REF_TRACK_TRACING) console.group('loop parent block @', parentBlock.$p.pid, 'knew of', parentBlock.$p.treblo.defined.size, 'bindings. Now processing', node.$p.openRefsT.entryReadsAfter.length, 'sets of entry reads,', node.$p.openRefsT.entryWritesAfter.length, ', sets of entry writes', node.$p.openRefsT.exitWritesAfter.length, ', and sets of exit write', +parentBlock.$p.pid);
  //// Walk all bindings known before this node and check if they were exitWritten
  //// in each block that ended up jumping to after this node.
  //parentBlock.$p.treblo.defined.forEach(name => {
  //  if (REF_TRACK_TRACING) console.log('- binding ', [name]);
  //
  //  if (REF_TRACK_TRACING) console.log('  - had', treblo.entryReads.get(name)?.size??0, 'entryReads and', treblo.entryWrites.get(name)?.size??0, 'entryWrites');
  //  if (parentBlock.$p.treblo.overwritten.get(name)) {
  //    if (REF_TRACK_TRACING) console.log('  - had its entry value overwritten in parent block so mulling those entryReads and entryWrites');
  //  } else {
  //    const pEntryReads = parentBlock.$p.treblo.entryReads;
  //    const pEntryWrites = parentBlock.$p.treblo.entryWrites;
  //    if (REF_TRACK_TRACING) console.log('  - entry value was not fully overwritten in parent block so adding those entryReads and entryWrites');
  //    treblo.entryReads.get(name)?.forEach(read => pEntryReads.get(name)?.add(read) ?? pEntryReads.set(name, new Set([read])));
  //    treblo.entryWrites.get(name)?.forEach(write => pEntryWrites.get(name)?.add(write) ?? pEntryWrites.set(name, new Set([write])));
  //    if (REF_TRACK_TRACING) console.log('  - parent block binding entryReads:', Array.from(pEntryReads.get(name)??[]).map(read => +read.node.$p.pid), ', entryWriteS:', Array.from(pEntryWrites.get(name)??[]).map(write => +write.node.$p.pid));
  //  }
  //
  //  // Based on the abrupt state of blocks leading to this loop we connect
  //  // exitWrites to entryReads and entryWrites as well as the parent block
  //
  //  let outerWriteSet = parentBlock.$p.treblo.exitWrites.get(name);
  //  if (REF_TRACK_TRACING) console.log('  - had', outerWriteSet?.size??0, 'exitWrites queued');
  //  if (node.$p.openRefsT.exitWritesAfter.every(([_abrupt, map]) => map.has(name))) {
  //    // This binding was written to in each branch that ended up jumping to this node so
  //    // we can _replace_ the set of exitWrites with the disjunction of those branches.
  //    if (REF_TRACK_TRACING) console.log('  - since they were written in all branches that lead here, the set is cleared');
  //    outerWriteSet = new Set;
  //    parentBlock.$p.treblo.exitWrites.set(name, outerWriteSet);
  //  } else {
  //    if (REF_TRACK_TRACING) console.log('  - was not overwritten in all branches leading here so keeping those');
  //  }
  //  if (REF_TRACK_TRACING) console.log('- processing exitWritesAfter now...');
  //  // Now add all the exitWrites we found queued up after _this_ node to the parent
  //  // exitWrites, potentially a fresh Set, but otherwise amending it. (`x = 1; if ($) x = 2;`)
  //  node.$p.openRefsT.exitWritesAfter.forEach(([abrupt, exitWritesMap]) => {
  //    if (REF_TRACK_TRACING) console.log('  - map has', exitWritesMap.get(name)?.size ?? 0, 'writes queued, origin abrupt state:', abrupt);
  //    exitWritesMap.get(name)?.forEach(write => {
  //      if (!abrupt) {
  //        if (REF_TRACK_TRACING) console.log('    - Adding write @', +write.node.$p.pid, 'for `' + name + '` to parent block');
  //        // Only `break` and no abrupt completion would execute the next line after the loop
  //        outerWriteSet.add(write);
  //      } else {
  //        if (REF_TRACK_TRACING) console.log('    - Not adding write @', +write.node.$p.pid, 'for `' + name + '` to parent block because the block leading here was either continue or exits the block');
  //      }
  //      if (!abrupt) {
  //        if (REF_TRACK_TRACING) console.log('    - Marking', treblo.entryReads.get(name)?.size ?? 0 ,'entryReads as reading exitWrite @', +write.node.$p.pid);
  //        treblo.entryReads.get(name)?.forEach(read => {
  //          if (REF_TRACK_TRACING) console.log('      - Read', +read.node.$p.pid, 'can read write', +write.node.$p.pid);
  //          read.openRefsRCanRead.add(write);
  //          write.openRefsRReadBy.add(read);
  //        });
  //      } else {
  //        if (REF_TRACK_TRACING) console.log('    - Not marking any entryReads as reading exitWrite @', +write.node.$p.pid, 'because it continued, returned, or threw');
  //      }
  //    })
  //  });
  //  if (REF_TRACK_TRACING) console.log('  - queue processed for this binding. it has', parentBlock.$p.treblo.exitWrites.size, 'exitWrites');
  //});
  //if (REF_TRACK_TRACING) console.groupEnd(); // inner `defined` loop

  // The parent block should now have an updated exitWrites set for each of its bindings

  if (REF_TRACK_TRACING) console.groupEnd(); // LOOP:after
  if (REF_TRACK_TRACING) console.groupEnd(); // LOOP
  if (REF_TRACK_TRACING) console.log('/LOOP');
}

export function openRefsLabelOnBefore(node, parentBlock) {
  if (REF_TRACK_TRACING) console.group('RTT: LABEL');
  if (REF_TRACK_TRACING) console.group(`RTT: LABEL:before, label[\`${node.label.name}\`], has ${parentBlock.$p.treblo.defined.size} known bindings`);

  node.$p.openRefsT = createTrebra();

  if (REF_TRACK_TRACING) console.groupEnd(); // LABEL:before
}

export function openRefsLabelOnAfter(node, parentBlock, globallyUniqueLabelRegistry, loopStack) {
  if (node.body.type !== 'BlockStatement') {
    vlog('TODO: eliminate continue'); // and then this invariant of labeled-loop cant exist anymore in normalize code
    if (REF_TRACK_TRACING) console.groupEnd(); // LABEL
    return;
  }

  if (REF_TRACK_TRACING) console.group('RTT: LABEL:after, label[' + node.label.name + ']');

  /** @var {Treblo} */
  const treblo = node.body.$p.treblo;

  // If the child node of this label is not a block then we don't need to propagate the exitWrites here

  // Find the statement that's executed _after_ this label block.
  let continuationNode = node;
  if (treblo.wasAbrupt) {
    if (treblo.wasAbrupt.type === 'BreakStatement') {
      if (treblo.wasAbrupt.label) {
        continuationNode = globallyUniqueLabelRegistry.get(treblo.wasAbrupt.label.name).node;
        //TODO // implement loop logic
      } else {
        continuationNode = loopStack[loopStack.length - 1];
      }
    }
    else if (treblo.wasAbrupt.type === 'ContinueStatement') {
      vlog('TODO: eliminate continue');
      return;
    }
    else if (treblo.wasAbrupt.type === 'ReturnStatement') {
      continuationNode = null; // We don't care about what happens after the if
    }
    else if (treblo.wasAbrupt.type === 'ThrowStatement') {
      continuationNode = null; // We don't care about what happens after the if
    }
    else {
      ASSERT(false, 'should be one of these cases');
    }
  }

  // continuationNode is now the node _after_ which code flow continues
  // This may be null, in case of early return/throw. This may be the last statement of the block.
  // Without abrupt completions it'll just be the label statement itself.

  if (REF_TRACK_TRACING) console.log('  abrupt:', treblo.wasAbrupt?.type, ', continues after node @:', continuationNode?.$p.pid, ', has', treblo.entryReads.size, ' entryReads,', treblo.entryWrites.size, 'entryWrites, and', treblo.exitWrites.size, 'exitWrites');

  // Now add the exitWrites to the parent block of the continuation
  // node for each binding that already existed before that node

  continuationNode?.$p.openRefsT.exitWritesAfter.push([treblo.wasAbrupt?.type, treblo.exitWrites]);

  // Now process all the queued afters for _this_ label node because
  // there can be no further things jumping to this node.

  if (REF_TRACK_TRACING) console.group('label parent block @', parentBlock.$p.pid, 'knew of', parentBlock.$p.treblo.defined.size, 'bindings. Now processing the entryReads and entryWrites of the body, as well as', node.$p.openRefsT.exitWritesAfter.length, 'sets of writes', +parentBlock.$p.pid);

  //// Walk all bindings known before this node and check if they were exitWritten
  //// in each block that ended up jumping to after this node.
  //parentBlock.$p.treblo.defined.forEach(name => {
  //  if (REF_TRACK_TRACING) console.log('- binding', [name]);
  //
  //  if (REF_TRACK_TRACING) console.log('  - had', treblo.entryReads.get(name)?.size??0, 'entryReads and', treblo.entryWrites.get(name)?.size??0, 'entryWrites');
  //  if (parentBlock.$p.treblo.overwritten.get(name)) {
  //    if (REF_TRACK_TRACING) console.log('  - had its entry value overwritten in parent block so mulling those entryReads and entryWrites');
  //  } else {
  //    const pEntryReads = parentBlock.$p.treblo.entryReads;
  //    const pEntryWrites = parentBlock.$p.treblo.entryWrites;
  //    if (REF_TRACK_TRACING) console.log('  - entry value was not fully overwritten in parent block so adding those entryReads and entryWrites');
  //    treblo.entryReads.get(name)?.forEach(read => pEntryReads.get(name)?.add(read) ?? pEntryReads.set(name, new Set([read])));
  //    treblo.entryWrites.get(name)?.forEach(write => pEntryWrites.get(name)?.add(write) ?? pEntryWrites.set(name, new Set([write])));
  //    if (REF_TRACK_TRACING) console.log('  - parent block binding entryReads:', Array.from(pEntryReads.get(name)??[]).map(read => +read.node.$p.pid), ', entryWriteS:', Array.from(pEntryWrites.get(name)??[]).map(write => +write.node.$p.pid));
  //  }
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
  //if (REF_TRACK_TRACING) console.groupEnd(); // inner `defined` loop

  // The parent block should now have an updated exitWrites set for each of its bindings

  if (REF_TRACK_TRACING) console.groupEnd(); // LABEL:after
  if (REF_TRACK_TRACING) console.groupEnd(); // LABEL
  if (REF_TRACK_TRACING) console.log('/label');
}

function findContinuationNode(wasAbrupt, globallyUniqueLabelRegistry, loopStack) {
  // Find the "parentBlock" of the statement that's executed _after_ each block.
  // This is the one we need to update, break, continue, or not abrupt at all.
  // Return null if there's no need to update anything due to a `return`

  if (wasAbrupt) {
    if (wasAbrupt.type === 'BreakStatement') {
      if (wasAbrupt.label) {
        return globallyUniqueLabelRegistry.get(wasAbrupt.label.name).node;
      } else {
        return loopStack[loopStack.length - 1];
      }
    }
    else if (wasAbrupt.type === 'ContinueStatement') {
      vlog('TODO: eliminate continue');
      return null;
    }
    else if (wasAbrupt.type === 'ReturnStatement') {
      return null; // We don't care about what happens after the if
    }
    else if (wasAbrupt.type === 'ThrowStatement') {
      // TODO: we may care?
      return null; // We don't care about what happens after the if
    }
    else {
      ASSERT(false, 'should be one of these cases');
    }
  }
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

  node.$p.openRefsT = createTrebra();

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
  //    parentBlock.$p.treblo.overwritten.set(name, true);
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

  if (REF_TRACK_TRACING) console.groupEnd(); // TRY:BODY:before
}

export function openRefsOnAfterTryBody(node, parentBlock, globallyUniqueLabelRegistry, loopStack, tryNodeStack) {
  if (REF_TRACK_TRACING) console.group('RTT: TRY:BODY:after');

  const treblo = node.$p.treblo;
  const continuationNode = findContinuationNode(treblo.wasAbrupt, globallyUniqueLabelRegistry, loopStack);
  // Check for breaking through a finally barrier
  // We need to confirm whether there's a `try` node with a pid between the target node and the current node
  // If there is, we need to confirm whether this node has a `finally` block
  // If so, we need to special case that because the finally is a forced path, that's its job
  const nearestFinallyTryNode = tryNodeStack[tryNodeStack.length - 1];
  if (+continuationNode?.$p.pid < +tryNodeStack[tryNodeStack.length - 1]?.$p.pid) {
    nearestFinallyTryNode.$p.openRefsT.finallyCaught.push([node.body, treblo.exitWrites, continuationNode]);
  } else {
    // continuationNode is now the node _after_ which code flow continues
    // This may be null, in case of early return/throw. This may be the last statement of the block.
    // Without abrupt completions it'll just be the `if` statement itself.
    if (REF_TRACK_TRACING) console.log('  /try-block, abrupt:', treblo.wasAbrupt?.type, ', continues after node @:', continuationNode?.$p.pid, ', has', treblo.entryReads.size, ' entryReads,', treblo.entryWrites.size, 'entryWrites, and', treblo.exitWrites.size, 'exitWrites');
    // Now add the exitWrites to the parent block for each continuation
    // node for each binding that already existed before that node
    continuationNode?.$p.openRefsT.exitWritesAfter.push(treblo);
  }

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

  // Merge them into a single new exitWritesBefore for the catch block
  const catchExitWritesBefore = new Map;
  parentNode.$p.treblo_try.exitWritesBefore.forEach((set, name) => {
    catchExitWritesBefore.set(name, new Set(set));
  });
  parentNode.$p.treblo_try.writes.forEach((tryBlockWrites, name) => {
    const newSet = catchExitWritesBefore.get(name);
    if (newSet) {
      tryBlockWrites.forEach(write => newSet.add(write));
    } else {
      catchExitWritesBefore.set(name, new Set(tryBlockWrites));
    }
  });

  if (REF_TRACK_TRACING) console.log('Setting catch exitWritesBefore to', catchExitWritesBefore.size, 'refs');
  node.$p.treblo.exitWritesBefore = catchExitWritesBefore;

  if (REF_TRACK_TRACING) console.groupEnd(); // TRY:CATCH:before
}

export function openRefsOnAfterCatchBody(node, parentNode, parentProp) {
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

export function openRefsOnAfterFinallyBody(node, parentNode, parentProp, globallyUniqueLabelRegistry, loopStack) {
  if (REF_TRACK_TRACING) console.group('RTT: TRY:FINALLY:after');

  const treblo = node.$p.treblo;
  const continuationNode = findContinuationNode(treblo.wasAbrupt, globallyUniqueLabelRegistry, loopStack);
  if (REF_TRACK_TRACING) console.log('  /try-finally, abrupt:', treblo.wasAbrupt?.type, ', continues after node @:', continuationNode?.$p.pid, ', has', treblo.entryReads.size, ' entryReads,', treblo.entryWrites.size, 'entryWrites, and', treblo.exitWrites.size, 'exitWrites');

  if (REF_TRACK_TRACING) console.group(); // TRY:FINALLY:after
  if (REF_TRACK_TRACING) console.group(); // TRY:FINALLY
  if (REF_TRACK_TRACING) console.log('/FINALLY');
}

export function openRefsCatchOnBefore(node, parentNode) {
  if (REF_TRACK_TRACING) console.group('RTT: catch clause:before');

  // TODO: where does this happen versus the catch body?

  // Create the state for the catch block
  node.$p.openRefsT = createTrebra();

  // Copy state from Try block to Catch node (because event handler won't have access to Try node so can't reach into the block node)
  node.$p.treblo_try = parentNode.block.$p.treblo;
}

export function openRefsOnBeforeCatchVar() {
  if (REF_TRACK_TRACING) console.group('RTT: openRefsOnBeforeCatchVar()');
}
export function openRefsOnAfterCatchVar(node, parentNode, parentProp, parentBlock) {
  if (REF_TRACK_TRACING) console.groupEnd(); // openRefsOnBeforeCatchVar
}
export function openRefsOnAfterCatchNode(node, parentBlock, globallyUniqueLabelRegistry, loopStack, tryNodeStack) {
  const treblo = node.body.$p.treblo;
  const continuationNode = findContinuationNode(treblo.wasAbrupt, globallyUniqueLabelRegistry, loopStack);
  // Check for breaking through a finally barrier
  // We need to confirm whether there's a `try` node with a pid between the target node and the current node
  // If there is, we need to confirm whether this node has a `finally` block
  // If so, we need to special case that because the finally is a forced path, that's its job
  const nearestFinallyTryNode = tryNodeStack[tryNodeStack.length - 1];
  if (+continuationNode?.$p.pid < +tryNodeStack[tryNodeStack.length - 1]?.$p.pid) {
    nearestFinallyTryNode.$p.openRefsT.finallyCaught.push([node.body, treblo.exitWrites, continuationNode]);
  } else {
    // continuationNode is now the node _after_ which code flow continues
    // This may be null, in case of early return/throw. This may be the last statement of the block.
    // Without abrupt completions it'll just be the `if` statement itself.
    if (REF_TRACK_TRACING) console.group('/try-catch, abrupt:', treblo.wasAbrupt?.type, ', continues after node @:', continuationNode?.$p.pid, ', has', treblo.entryReads.size, ' entryReads,', treblo.entryWrites.size, 'entryWrites, and', treblo.exitWrites.size, 'exitWrites');
    // Now add the exitWrites to the parent block for each continuation
    // node for each binding that already existed before that node
    continuationNode?.$p.openRefsT.exitWritesAfter.push(treblo);
    if (REF_TRACK_TRACING) console.groupEnd();
  }

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

  // For all intentions and purposes, right now the next read can only see this write.
  // It's only for reconciling branching blocks where it might have multiple open writes
  // Note: `let x = 1; while (true) { $(x) x = 2; }` is fixed by connect pre-write-reads to last-writes after a loop.

  read.openRefsRCanRead = new Set(blockNode.$p.treblo.exitWrites.get(name) ?? []);
  read.openRefsRCanRead.forEach(write => write.openRefsRReadBy.add(read));

  if (REF_TRACK_TRACING) if (read.openRefsRCanRead.size) console.log('RTT: read @', +read.node.$p.pid, 'can at least read write(s) @', ...Array.from(read.openRefsRCanRead).map(ref => +ref.node.$p.pid));
  if (REF_TRACK_TRACING) if (!read.openRefsRCanRead.size) console.log('RTT: read @', +read.node.$p.pid, 'can not read any writes (so far in this block)');

  // It is an entryRead if there are no entryWrites yet since those are block specific (not pre-populated with parent state)
  if (treblo.overwritten.has(name)) {
    if (REF_TRACK_TRACING) console.log('Since binding was fully overwritten in this block, @', +read.node.$p.pid, 'is not an entryRead');
  } else {
    if (REF_TRACK_TRACING) console.log('Marking @', +read.node.$p.pid, 'as an entryRead for this block. exitWrites so far:', treblo.exitWrites.get(name)?.size??0, ', parent exitWrites so far:', treblo.exitWritesBefore.get(name)?.size??0);
    treblo.entryReads.get(name)?.add(read) ?? treblo.entryReads.set(name, new Set([read]));

    // This entryRead can reach all exitWrites of the parent up to this point
    treblo.exitWritesBefore.get(name)?.forEach(write1 => {
      if (REF_TRACK_TRACING) console.log('- Read', +read.node.$p.pid, 'can reach write', +write1.node.$p.pid);
      write1.openRefsRReadBy.add(read);
      read.openRefsRCanRead.add(write1);
    });
  }

  treblo.reads.get(name)?.add(read) ?? treblo.reads.set(name, new Set([read]));

  if (REF_TRACK_TRACING) console.groupEnd(); // ref:read:before
}

export function openRefsOnBeforeWrite(write, blockNode) {
  const name = write.node.name;

  if (name === '$') return; // Special debugging symbol. Should be global. This analysis doesn't apply to globals. Noisy in tests. So skip it.

  if (REF_TRACK_TRACING) console.group('RTT: on::write:before, recording', /write/, 'reference');

  /** @var {Treblo} */
  const treblo = blockNode.$p.treblo;

  if (write.parentNode.type === 'VariableDeclarator') {
    if (REF_TRACK_TRACING) console.log('Adding binding to parent block @', +write.parentBlockNode.$p.pid, '(', write.parentBlockNode.type, ')');
    treblo.defined.add(write.node.name);
  }

  //treblo.entryWrites.get(name)?.add(write) ??
  treblo.entryWrites.set(name, new Set([write]));

  // Track the first writes to a binding in a block chain. This is used to connect end of loops to the start.
  if (treblo.overwritten.has(name)) {
    if (REF_TRACK_TRACING) console.log('Not first write in this block. Can not reach exitWritesBefore of parent');
  } else {
    if (REF_TRACK_TRACING) console.log('Binding was not yet (fully) overwritten in this block; it is now.');

    // This binding is overwritten in this block.
    if (REF_TRACK_TRACING) console.log('Marking as overwritten in block @', +blockNode.$p.pid);
    treblo.overwritten.set(name, true);

    // This entryWrite can reach all exitWrites of the parent up to this point
    treblo.exitWritesBefore.get(name)?.forEach(write1 => {
      if (REF_TRACK_TRACING) console.log('- Write', +write.node.$p.pid, 'overwrites write', +write1.node.$p.pid, '(propagating from loop-end)');
      write1.openRefsROverwrittenBy.add(write);
      write.openRefsRCanOverwrite.add(write1);
    });
  }

  // Record the writes that can be reached
  const currExitWrites = treblo.exitWrites.get(name);
  if (REF_TRACK_TRACING) if (currExitWrites) console.log('RTT: open writes that this write may overwrite: @', ...Array.from(currExitWrites).map(write => +write.node.$p.pid));
  if (REF_TRACK_TRACING) if (!currExitWrites) console.log('RTT: open writes that this write may overwrite: none');
  currExitWrites?.forEach(openWrite => {
    if (REF_TRACK_TRACING) console.log('RTT: noting write @', +openWrite.node.$p.pid, 'can be overwritten by @', +write.node.$p.pid);
    openWrite.openRefsROverwrittenBy.add(write);
    write.openRefsRCanOverwrite.add(openWrite);
  });

  // For all intentions and purposes, right now the next read can only see this write.
  // It's only for reconciling branching blocks where it might have multiple open writes
  if (REF_TRACK_TRACING) console.log('Setting exitWrites of block @', +blockNode.$p.pid, 'to only the write @', +write.node.$p.pid);
  treblo.exitWrites.set(name, new Set([write]));

  const writes = treblo.writes.get(name);
  if (writes) {
    writes.push(write);
  } else {
    treblo.writes.set(name, [write]);
  }

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
          rw.action === 'read' ? (rw.openRefsRCanRead.size ? 'canRead: ' + Array.from(rw.openRefsRCanRead).map(write => write.node.$p.pid) : 'can not read any writes (TDZ?)') : '',
          rw.action === 'write' ? (rw.openRefsRReadBy.size ? 'readBy: ' + Array.from(rw.openRefsRReadBy).map(read => read.node.$p.pid) : 'not read') : '',
          rw.action === 'write' ? (rw.openRefsRCanOverwrite.size ? 'overwrites: ' + Array.from(rw.openRefsRCanOverwrite).map(write => write.node.$p.pid) : 'does not overwrite') : '',
          rw.action === 'write' ? (rw.openRefsROverwrittenBy.size ? 'overwrittenBy: ' + Array.from(rw.openRefsROverwrittenBy).map(write => write.node.$p.pid) : 'not overwritten') : '',
        ].filter(Boolean).join(', ')
      );
    });
    console.groupEnd();
    console.log('\n');
  });
}
