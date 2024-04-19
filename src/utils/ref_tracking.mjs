import {ASSERT, vlog} from "../utils.mjs"

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


export const OPEN_REF_TRACING = true;

/**
 * @typedef {
 *  {
 *    preWriteReads: Map<string, Set<Read>>,
 *    firstWrites: Map<string, Set<Write>>,
 *    lastWrites: Map<string, Set<Write>>,
 *    wasAbrupt: undefined | 'break' | 'continue' | 'return' | 'throw',
 *    reads: Array<Read>,
 *    writes: Array<Write>,
 *    rwOrder: Array<Read | Write>,
 *  }
 * } OpenRefsN
 */

/**
 * @typedef {
 *  {
 *    preWriteReadsToProcessBefore: Array<Map<string, Set<Read>>>,
 *    firstWritesToProcessBefore: Array<Map<string, Set<Write>>>,
 *    lastWritesToProcessBefore: Array<Map<string, Set<Write>>>,
 *    preWriteReadsToProcessAfter: Array<Map<string, Set<Read>>>,
 *    firstWritesToProcessAfter: Array<Map<string, Set<Write>>>,
 *    lastWritesToProcessAfter: Array<Map<string, Set<Write>>>,
 *  }
 * } OpenRefsT
 */

function createOpenRefsN() {
  /**
   * @type OpenRefsN
   */
  const openRefsN = {
    firstWrites: new Map,
    lastWrites: new Map,
    preWriteReads: new Map,
    wasAbrupt: undefined,
    reads: [],
    writes: [],
    wrOrder: [],
  };

  return openRefsN;
}

function createOpenRefsT() {
  /**
   * @type OpenRefsT
   */
  const openRefsT = {
    preWriteReadsToProcessBefore: [], // Unused by try
    firstWritesToProcessBefore: [], // Unused by try
    lastWritesToProcessBefore: [], // Unused by try
    preWriteReadsToProcessAfter: [],
    firstWritesToProcessAfter: [],
    lastWritesToProcessAfter: [],
  };

  return openRefsT;
}

export function openRefsProgramOnBefore(node) {
  // An "open ref" is a write reference that is not 100% replaced by other writes. If/else/loop branching can cause this to be plural.
  if (OPEN_REF_TRACING) vlog('OpenRefs: program; create root maps');

  node.$p.openRefsN = createOpenRefsN();
}

export function openRefsBlockOnBefore(node) {
  // "Open ref" refers to tracking bindings refs that read/write each other
  if (OPEN_REF_TRACING) vlog('OpenRefs: block; create block maps');

  node.$p.openRefsN = createOpenRefsN();
}

export function openRefsBlockOnAfter(node, parentNode, parentProp, loopStack) {

  if (OPEN_REF_TRACING) console.group('OpenRefs: ' + parentNode.type + '-block; connecting data back upward');
  if (OPEN_REF_TRACING) if (parentNode.type === 'TryStatement' && parentProp === 'block') console.group('try');
  if (OPEN_REF_TRACING) if (parentNode.type === 'CatchClause') console.group('catch');
  if (OPEN_REF_TRACING) if (parentProp === 'finalizer') console.group('finally');

  // Merge the reads that happened before a write with those of the parent block. Then clear the ones
  // for which we've seen a write. Wrong: need to track these reads and write stats separately
  //const rbws = node.$p.openRefsPreWriteReads
  if (node.$p.openRefsN.wasAbrupt === 'continue') {
    if (OPEN_REF_TRACING) console.log('OpenRefs: block ended in continue');

    // This must be a loop.
    // I don't remember whether I supported labeled continue in normalized state.
    // Either way, find the target loop to continue to and connect the reads and writes
    // to both the start and end of that loop body.
    const nearestLoopNode = loopStack[loopStack.length - 1];
    if (OPEN_REF_TRACING) console.log('OpenRefs: adding to befores and afters');
    nearestLoopNode.$p.openRefsT.firstWritesToProcessBefore.push(node.$p.openRefsN.firstWrites);
    nearestLoopNode.$p.openRefsT.firstWritesToProcessAfter.push(node.$p.openRefsN.firstWrites);
    nearestLoopNode.$p.openRefsT.lastWritesToProcessBefore.push(node.$p.openRefsN.lastWrites);
    nearestLoopNode.$p.openRefsT.lastWritesToProcessAfter.push(node.$p.openRefsN.lastWrites);
    nearestLoopNode.$p.openRefsT.preWriteReadsToProcessBefore.push(node.$p.openRefsN.preWriteReads);
    nearestLoopNode.$p.openRefsT.preWriteReadsToProcessAfter.push(node.$p.openRefsN.preWriteReads);
  }
  else if (node.$p.openRefsN.wasAbrupt === 'break') {
    if (OPEN_REF_TRACING) console.log('OpenRefs: block ended in break');

    // This must be a loop or a labeled break to a labeled statement
    // If loop, wire up reads and writes to the end of the loop. Not the start.
    // If labeled break, wire up reads and writes to after the block that is labeled
    const nearestLoopNode = loopStack[loopStack.length - 1];
    if (OPEN_REF_TRACING) console.log('OpenRefs: adding to befores and afters');
    nearestLoopNode.$p.openRefsT.firstWritesToProcessBefore.push(node.$p.openRefsN.firstWrites);
    nearestLoopNode.$p.openRefsT.firstWritesToProcessAfter.push(node.$p.openRefsN.firstWrites);
    // - Dont add last writes to before
    nearestLoopNode.$p.openRefsT.lastWritesToProcessAfter.push(node.$p.openRefsN.lastWrites);
    nearestLoopNode.$p.openRefsT.preWriteReadsToProcessBefore.push(node.$p.openRefsN.preWriteReads);
    nearestLoopNode.$p.openRefsT.preWriteReadsToProcessAfter.push(node.$p.openRefsN.preWriteReads);
  }
  else if (node.$p.openRefsN.wasAbrupt === 'return') {
    if (OPEN_REF_TRACING) console.log('OpenRefs: block ended in return. noop');
    // Drop the reads and writes. This analysis is only for single scope and so we don't care what happens here.
  }
  else if (node.$p.openRefsN.wasAbrupt === 'throw') {
    if (OPEN_REF_TRACING) console.log('OpenRefs: block ended in throw. TODO');
    // Tricky.
    // In theory we find the nearest catch. If that path breaks any finally blocks it gets
    // even harder because it will go through them but there will still be an error thrown.
    // Tempted to mark these bindings as unsupported for now.
    // However, any bindings that are local are no longer read after this branch so that's fine to drop now.
    ASSERT(!'TODO')
  }
  else if (node.$p.openRefsN.wasAbrupt) {
    if (OPEN_REF_TRACING) console.log('OpenRefs: block ended abrupt but unknown', node.$p.openRefsN.wasAbrupt);

    console.log('wat:', node.$p.openRefsN.wasAbrupt);
    ASSERT(!'TODO') // what is this
  }
  else {
    if (OPEN_REF_TRACING) console.log('OpenRefs: block did not end abrupt. parent:', parentNode.type);

    // This block did not return abruptly. The parent node determines what to do next.
    // - if-else: Only after the else. Update the openRefs for the parent block to the combination
    //            of open refs from both branches. Ignore any branch that ends in an abrupt return.
    // - while:   Update the open refs at the start of this loop with the open refs at the end of
    //            this loop for any binding created before the loop. Do the same for the while
    //            parent block. (In normalized code all whiles are infinite loops so this step
    //            may be moot and we should let the break handle that, but eh. TODO)
    // - for:     Both for-in and for-of have the same as loops except they may never loop and
    //            may break even without an explicit break, so these steps are never optional.
    // - try/etc: TODO
    // - label:   Nothing special. The custom behavior is with labeled break/continue.
    // - funcs:   None. End of a function is irrelevant for this analysis.

    const nearestLoopNode = loopStack[loopStack.length - 1];

    if (['WhileStatement', 'ForInStatement', 'ForOfStatement'].includes(parentNode.type)) {
      if (OPEN_REF_TRACING) console.log('OpenRefs: adding to befores');

      // With loops, everything that's open at the end of a body will loop to the start again
      nearestLoopNode.$p.openRefsT.firstWritesToProcessBefore.push(node.$p.openRefsN.firstWrites);
      parentNode.$p.openRefsT.lastWritesToProcessBefore.push(node.$p.openRefsN.lastWrites);
      parentNode.$p.openRefsT.preWriteReadsToProcessBefore.push(node.$p.openRefsN.preWriteReads);
    }
    else if (parentNode.type === 'TryStatement') {
      if (parentProp === 'block') {
        // All writes that occurred inside the try-block are reachable by the first reads and writes
        // in the catch and/or finally block so we must collect them. But we can collect them later?
        console.log('Skipping the try-block stuff for now');
      }
      else if (parentProp === 'finalizer') {
        console.log('Skipping the finally-block stuff for now');
      }
      else {
        console.log('parent:', parentNode.type, [parentProp]);
        TODO
      }
    }
    else if (parentNode.type === 'CatchClause') {
      // This is the catch block
      console.log('Skipping catch block');
    }
    else {
      ASSERT(['LabeledStatement', 'BlockStatement', 'IfStatement'].includes(parentNode.type), 'TODO', parentNode.type);
    }
    // Everything at the end of a loop should be appended to the end of the block.
    // TODO: normalized loops are while(true) so this would always be a useless or even sub-optimal step
    if (OPEN_REF_TRACING) console.log('OpenRefs: adding to afters');
    parentNode.$p.openRefsT.firstWritesToProcessAfter.push(node.$p.openRefsN.firstWrites);
    parentNode.$p.openRefsT.lastWritesToProcessAfter.push(node.$p.openRefsN.lastWrites);
    parentNode.$p.openRefsT.preWriteReadsToProcessAfter.push(node.$p.openRefsN.preWriteReads);
  }

  if (OPEN_REF_TRACING) if (parentNode.type === 'TryStatement' && parentProp === 'block') console.groupEnd();
  if (OPEN_REF_TRACING) if (parentNode.type === 'CatchClause') console.groupEnd();
  if (OPEN_REF_TRACING) if (parentProp === 'finalizer') console.groupEnd();
  if (OPEN_REF_TRACING) console.groupEnd();
}

export function openRefsIfOnBefore(node) {
  if (OPEN_REF_TRACING) console.group('OpenRefs: if; creating data arrays');

  node.$p.openRefsT = createOpenRefsT();

  if (OPEN_REF_TRACING) console.groupEnd();
}

export function openRefsIfOnafter(node, parentBlock) {
  if (OPEN_REF_TRACING) console.group('OpenRefs: if:after; connecting data back upward');

  mergeFirstWrites(node, parentBlock);
  mergeLastWrites(node, parentBlock);
  mergePreWriteReads(node, parentBlock);

  if (OPEN_REF_TRACING) console.groupEnd();
}

export function openRefsLoopOnBefore(kind /*: loop | in | of */, node) {
  if (OPEN_REF_TRACING) console.group('OpenRefs: ', kind, ':before');

  node.$p.openRefsT = createOpenRefsT();

  if (OPEN_REF_TRACING) console.groupEnd();
}

export function openRefsLoopOnAfter(kind /* loop | in | of */, node, parentBlock) {
  if (OPEN_REF_TRACING) console.group('OpenRefs: ', kind, ':after @', +node.$p.pid);

  connectPreWriteReadsWithLastWritesInLoop(node);
  connectFirstWritesWithLastWritesInLoop(node);
  mergeFirstWrites(node, parentBlock);
  mergeLastWrites(node, parentBlock);
  mergePreWriteReads(node, parentBlock);

  if (OPEN_REF_TRACING) console.groupEnd();
}

export function openRefsLabelOnBefore(node) {
  if (OPEN_REF_TRACING) console.group('OpenRefs: label; create arrays for label');

  node.$p.openRefsT = createOpenRefsT();

  if (OPEN_REF_TRACING) console.groupEnd();
}

export function openRefsLabelOnAfter(node, parentBlock) {
  if (OPEN_REF_TRACING) console.group('OpenRefs: label; copy everything upward');

  mergeFirstWrites(node, parentBlock);
  mergeLastWrites(node, parentBlock);
  mergePreWriteReads(node, parentBlock);

  if (OPEN_REF_TRACING) console.groupEnd();
}

export function openRefsContinueBreakOnBefore(node, blockStack) {
  if (OPEN_REF_TRACING) console.group('OpenRefs: abrupt completion;', node.type);

  blockStack[blockStack.length - 1].$p.openRefsN.wasAbrupt = node.type === 'BreakStatement' ? 'break' : 'continue';

  if (OPEN_REF_TRACING) console.groupEnd();
}

export function openRefsReturnOnBefore(blockStack) {
  if (OPEN_REF_TRACING) console.group('OpenRefs: abrupt completion; return');

  blockStack[blockStack.length - 1].$p.openRefsN.wasAbrupt = 'return';

  if (OPEN_REF_TRACING) console.groupEnd();
}

export function openRefsThrowOnBefore(blockStack) {
  if (OPEN_REF_TRACING) console.group('OpenRefs: abrupt completion; throw');

  blockStack[blockStack.length - 1].$p.openRefsN.wasAbrupt = 'throw';

  if (OPEN_REF_TRACING) console.groupEnd();
}

export function openRefsTryOnBefore(node) {
  if (OPEN_REF_TRACING) console.group('OpenRefs: try; creating data arrays');
  // Every step of the way may be observed by a catch or a finally. Kind of annoying.

  node.$p.openRefsT = createOpenRefsT();

  if (OPEN_REF_TRACING) console.groupEnd();
}

export function openRefsTryOnAfter(node) {
  // Note: openrefs need to be done at the block statement level because we need to hook
  // into the catch and finally separately; they are not standalone ast nodes.
  // Then here we need to do process the open refs / pre reads and copy them back to the parent

  // TODO: try in loops?
  // First collect all writes seen inside the try. TODO: maybe remember the write count, or do this on the way back in the try-block?
  // Ignore any binding created inside the try.

  if (OPEN_REF_TRACING) console.group('OpenRefs: try; figuring stuff out...');

  console.log(node)
  // de lastwriteafter enzo van de try/catch/finally worden niet gepropageerd en het is de vraag of dat wel kan.
  // de "after" maps moeten worden bijgewerkt na iedere block walk denk ik, en daarna reset. waarschijnlijk betekent dat het geburik van mergeFirstWrites
  // op een of andere manier moet de catch en finally toch weten wat de firstwrites waren in de eerdere try blocks
  // en dat is lastig want deze worden eigenlijk alleen op loop niveau bijgehouden. tenzij we dat veranderen natuurlijk
  // maar ook dat heeft dragons. dus pas op. gl.
  TODO


  // Go back from allWrites until the start of the finally (if any)
  let firstRefInFinal = allWrites.length;
  if (node.finalizer) {
    const finalPid = +node.finalizer.$p.pid;
    while (firstRefInFinal > 0) {
      const write = allWrites[firstRefInFinal - 1];
      if (+write.node.$p.pid < finalPid) {
        break;
      }
      firstRefInFinal -= 1;
    }
  }
  let firstRefInCatch = firstRefInFinal;
  if (node.handler) {
    const catchPid = +node.handler.$p.pid;
    // index should now be the first write after the finalizer, or after the end of the list if there weren't any
    while (firstRefInCatch > 0) {
      const write = allWrites[firstRefInCatch - 1];
      if (+write.node.$p.pid < catchPid) {
        break;
      }
      firstRefInCatch -= 1;
    }
  }
  // index should now be the first write after the finalizer, or after the end of the list if there weren't any
  const tryPid = +node.block.$p.pid;
  let firstRefInTry = firstRefInCatch;
  while (firstRefInTry > 0) {
    const write = allWrites[firstRefInTry - 1];
    if (+write.node.$p.pid < tryPid) {
      break;
    }
    firstRefInTry -= 1;
  }
  if (OPEN_REF_TRACING) console.log('Ref borders: writes total:', allWrites.length, ', try', firstRefInTry, 'catch', firstRefInCatch, 'finally', firstRefInFinal);
  if (OPEN_REF_TRACING) console.log('Ref borders: write pids: try @', ...allWrites.slice(firstRefInTry, firstRefInCatch).map(write => +write.node.$p.pid), 'catch @', ...allWrites.slice(firstRefInCatch, firstRefInFinal).map(write => +write.node.$p.pid), 'finally @', ...allWrites.slice(firstRefInFinal).map(write => +write.node.$p.pid));
  if (OPEN_REF_TRACING) console.log('Catch preWriteReads:', Array.from(node.handler.body.$p.openRefsN.preWriteReads.entries()).map(([v, k]) => `${v}: @ ${Array.from(k).map(r => +r.node.$p.pid)}`),);
  if (OPEN_REF_TRACING) console.log('Catch firstWrites:', Array.from(node.handler.body.$p.openRefsN.firstWrites.entries()).map(([v, k]) => `${v}: @ ${Array.from(k).map(r => +r.node.$p.pid)}`),);
  if (OPEN_REF_TRACING) console.log('Catch lastWrites:', Array.from(node.handler.body.$p.openRefsN.lastWrites.entries()).map(([v, k]) => `${v}: @ ${Array.from(k).map(r => +r.node.$p.pid)}`),);
  if (OPEN_REF_TRACING) console.log('Finally preWriteReads:', Array.from(node.finalizer.$p.openRefsN.preWriteReads.entries()).map(([v, k]) => `${v}: @ ${Array.from(k).map(r => +r.node.$p.pid)}`),);
  if (OPEN_REF_TRACING) console.log('Finally firstWrites:', Array.from(node.finalizer.$p.openRefsN.firstWrites.entries()).map(([v, k]) => `${v}: @ ${Array.from(k).map(r => +r.node.$p.pid)}`),);
  if (OPEN_REF_TRACING) console.log('Finally lastWrites:', Array.from(node.finalizer.$p.openRefsN.lastWrites.entries()).map(([v, k]) => `${v}: @ ${Array.from(k).map(r => +r.node.$p.pid)}`),);

  // So now we connect these sets of writes.
  // The firstWrites can overwrite all of them, the preWriteReads can read them.

  if (node.handler) {
    if (OPEN_REF_TRACING) console.group('catch');
    allWrites
    .slice(firstRefInTry, firstRefInCatch)
    .forEach(write => {
      if (OPEN_REF_TRACING) console.group('write to `' + write.name + '`');
      if (OPEN_REF_TRACING) console.group('preWriteReads');
      node.handler.body.$p.openRefsN.preWriteReads
      .get(write.name)
      ?.forEach(read => {
        console.log('Marking @', +read.node.$p.pid, 'can read @', +write.node.$p.pid);
        read.openRefsRCanRead.add(write);
        write.openRefsRReadBy.add(read);
      });
      if (OPEN_REF_TRACING) console.groupEnd();
      if (OPEN_REF_TRACING) console.group('firstWrites');
      node.handler.body.$p.openRefsN.firstWrites
      .get(write.name)
      ?.forEach(firstWrite => {
        console.log('Marking @', +firstWrite.node.$p.pid, 'can overwrite @', +write.node.$p.pid);
        firstWrite.openRefsRCanOverwrite.add(write);
        write.openRefsROverwrittenBy.add(firstWrite);
      });
      if (OPEN_REF_TRACING) console.groupEnd();
      if (OPEN_REF_TRACING) console.groupEnd();
    });
    if (OPEN_REF_TRACING) console.groupEnd();
  }
  if (node.finalizer) {
    if (OPEN_REF_TRACING) console.group('finally');
    allWrites
    .slice(firstRefInTry, firstRefInFinal) // Both the try and the catch (!)
    .forEach(write => {
      if (OPEN_REF_TRACING) console.group('write to `' + write.name + '`');
      if (OPEN_REF_TRACING) console.group('preWriteReads');
      node.finalizer.$p.openRefsN.preWriteReads
      .get(write.name)
      ?.forEach(read => {
        console.log('Marking @', +read.node.$p.pid, 'can read @', +write.node.$p.pid);
        read.openRefsRCanRead.add(write);
        write.openRefsRReadBy.add(read);
      });
      if (OPEN_REF_TRACING) console.groupEnd();
      if (OPEN_REF_TRACING) console.group('firstWrites');
      node.finalizer.$p.openRefsN.firstWrites
      .get(write.name)
      ?.forEach(firstWrite => {
        console.log('Marking @', +firstWrite.node.$p.pid, 'can overwrite @', +write.node.$p.pid);
        firstWrite.openRefsRCanOverwrite.add(write);
        write.openRefsROverwrittenBy.add(firstWrite);
      });
      if (OPEN_REF_TRACING) console.groupEnd();
      if (OPEN_REF_TRACING) console.groupEnd();
    });
    if (OPEN_REF_TRACING) console.groupEnd();
  }


  if (OPEN_REF_TRACING) console.groupEnd();

}

export function openRefsCatchOnBefore(node) {
  if (OPEN_REF_TRACING) console.group('OpenRefs: catch clause; creating data arrays');

  node.$p.openRefsT = createOpenRefsT();

  if (OPEN_REF_TRACING) console.groupEnd();
}



export function openRefsRefBefore(kind, node, parentNode, parentProp, parentIndex, meta) {
  if (node.name === '$') console.group();
  else if (OPEN_REF_TRACING) console.group('on::ref @', +node.$p.pid, ': Ref:', [node.name], 'with kind', [kind], 'on a', parentNode.type + '.'+ parentProp + (parentIndex >= 0 ? '[' + parentIndex + ']' : ''), '( builtin=', meta.isBuiltin, ', implicit=', meta.isImplicitGlobal, ')');
}

export function openRefsRefAfter(kind, node, parentNode, parentProp, parentIndex, meta) {
  if (OPEN_REF_TRACING) console.groupEnd();
}

export function openRefsReadBefore(read, blockNode) {
  const name = read.node.name;

  if (name === '$') return; // Special debugging symbol. Should be global. This analysis doesn't apply to globals. Noisy in tests. So skip it.

  // For all intentions and purposes, right now the next read can only see this write.
  // It's only for reconciling branching blocks where it might have multiple open writes
  // Note: `let x = 1; while (true) { $(x) x = 2; }` is fixed by connect pre-write-reads to last-writes after a loop.
  const openRefsLastWrites = blockNode.$p.openRefsN.lastWrites.get(name);
  read.openRefsRCanRead = new Set(openRefsLastWrites ?? []);
  read.openRefsRCanRead.forEach(write => write.openRefsRReadBy.add(read));
  if (OPEN_REF_TRACING) if (read.openRefsRCanRead.size) console.log('OpenRefs: can read write @', ...Array.from(read.openRefsRCanRead).map(ref => +ref.node.$p.pid));
  if (OPEN_REF_TRACING) if (!read.openRefsRCanRead.size) console.log('OpenRefs: can not read any writes');
  const rbwSet = blockNode.$p.openRefsN.preWriteReads.get(name);
  if (rbwSet === undefined) {
    if (OPEN_REF_TRACING) console.log('OpenRefs: first read in block, not yet guaranteed to be written');
    // First read in block, not yet written in block
    blockNode.$p.openRefsN.preWriteReads.set(name, new Set([read]));
  } else if (rbwSet === null) {
    if (OPEN_REF_TRACING) console.log('OpenRefs: already guaranteed to be written');
    // Already guaranteed to have been written to
  } else {
    if (OPEN_REF_TRACING) console.log('OpenRefs: not first read in block, not yet guaranteed to be written');
    // Not the first read this block, not yet seen a guaranteed write
    rbwSet.add(read);
  }
}

export function openRefsWriteBefore(write, blockNode) {
  const name = write.node.name;

  if (name === '$') return; // Special debugging symbol. Should be global. This analysis doesn't apply to globals. Noisy in tests. So skip it.

  // Track the first writes to a binding in a block chain. This is used to connect end of loops to the start.
  if (!blockNode.$p.openRefsN.firstWrites.has(name)) {
    if (OPEN_REF_TRACING) console.log('OpenRefs: first write in this block');
    blockNode.$p.openRefsN.firstWrites.set(name, new Set([write]));
  } else {
    if (OPEN_REF_TRACING) console.log('OpenRefs: not first write in this block');
  }
  // Record the writes that can be reached
  const currLastWrites = blockNode.$p.openRefsN.lastWrites.get(name);
  if (OPEN_REF_TRACING) if (currLastWrites) console.log('OpenRefs: open writes that this write may overwrite: @', ...Array.from(currLastWrites).map(write => +write.node.$p.pid));
  if (OPEN_REF_TRACING) if (!currLastWrites) console.log('OpenRefs: open writes that this write may overwrite: none');
  currLastWrites?.forEach(openWrite => {
    if (OPEN_REF_TRACING) console.log('OpenRefs: noting write @', +openWrite.node.$p.pid, 'can be overwritten by @', +write.node.$p.pid);
    openWrite.openRefsROverwrittenBy.add(write);
    write.openRefsRCanOverwrite.add(openWrite);
  });
  // For all intentions and purposes, right now the next read can only see this write.
  // It's only for reconciling branching blocks where it might have multiple open writes
  blockNode.$p.openRefsN.lastWrites.set(name, [write]);

  if (OPEN_REF_TRACING) console.groupEnd();
}



export function dumpOpenRefsState(globallyUniqueNamingRegistry) {

  if (OPEN_REF_TRACING) console.log('OpenRefs: State of globallyUniqueNamingRegistry after:');
  if (OPEN_REF_TRACING) Array.from(globallyUniqueNamingRegistry.entries()).map(([name, meta]) => {
    if (meta.isImplicitGlobal || meta.isGlobal || meta.isBuiltin) return;
    console.group('OpenRefs:', [name], ':');
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

function connectPreWriteReadsWithLastWritesInLoop(node) {
  if (OPEN_REF_TRACING) console.group('OpenRefs: connectPreWriteReadsWithLastWritesInLoop()');
  // Any read that (potentially) happens before a write to that binding can also observe any
  // last write in that loop (when the loop loops). This is why we must track both the pre-reads
  // and the last-writes.
  // The point is to add future writes to past reads. The rest should already be connected as
  // we were walking the AST.

  node.$p.openRefsT.lastWritesToProcessBefore.forEach(map => {
    // Note: this writes set should _not_ include abruptly completed branches
    map.forEach((writes, name) => {

      // Connect this set of last writes for this binding to all the pre-reads of that binding
      // But only those reads that happened inside the loop... Cause reads before the loop can't
      // observe the writes in the loop.
      // We can do this by checking the pid. It must be higher than that of the while-node itself.

      node.$p.openRefsT.preWriteReadsToProcessBefore.forEach((map) => {
        map.get(name)?.forEach(read => {
          // Note: this reads set can include abruptly completed branches
          if (+read.node.$p.pid > +node.body.$p.pid) {
            // This must mean the node appeared after the `{` of the `while`. Since we're still
            // walking that body now, it can't be a node that appears after the while body.
            // This means we should be good to connect them.
            writes.forEach(write => {
              // Write should also appear inside the loop, not before it
              if (+write.node.$p.pid > +node.body.$p.pid) {
                if (OPEN_REF_TRACING) console.log('OpenRefs: after looping @', +write.node.$p.pid, 'can be read by @', +read.node.$p.pid);
                read.openRefsRCanRead.add(write);
                write.openRefsRReadBy.add(read);
              }
            });
          }
        });
      });
    });
  });
  // So now all reads that read the binding inside the loop before a write will be connected
  // to all the writes that happened at the end of a loop without another write after it.
  // Because if it loops, that write is potentially observable by any of those reads.
  if (OPEN_REF_TRACING) console.groupEnd();
}

function connectFirstWritesWithLastWritesInLoop(node) {
  if (OPEN_REF_TRACING) console.group('OpenRefs: connectFirstWritesWithLastWritesInLoop()');
  // Any write that is (potentially) the first in a loop may (also) overwrite any write that is
  // the last in that loop (so without another write guaranteed to follow it).
  // The point is to be able to discover which writes are (potentially) overwriting another write.

  node.$p.openRefsT.lastWritesToProcessBefore.forEach(map => {
    // Note: this writes set should _not_ include abruptly completed branches
    map.forEach((lastWrites, name) => {

      // Connect this set of last writes for this binding to all the first writes of that binding.
      // Each while node starts with a fresh set of first-writes, since they are only relevant to
      // that node and not outside of it. As such we don't need to do any bounds checks.
      node.$p.openRefsT.firstWritesToProcessBefore.forEach(map => {
        map.get(name)?.forEach(firstWrite => {
          // Each write should appear inside the loop, not before it
          if (+firstWrite.node.$p.pid > +node.body.$p.pid) {
            lastWrites.forEach(lastWrite => {
              // Each write should appear inside the loop, not before it
              if (+lastWrite.node.$p.pid > +node.body.$p.pid) {
                if (OPEN_REF_TRACING) console.log('OpenRefs: after looping @', +firstWrite.node.$p.pid, 'can overwrite @', +lastWrite.node.$p.pid);
                firstWrite.openRefsRCanOverwrite.add(lastWrite);
                lastWrite.openRefsROverwrittenBy.add(firstWrite);
              }
            });
          }
        });
      });
    });
  });
  // So now all writes at the start of a loop that may overwrite a write at the end of a loop are
  // also connected to each other.
  if (OPEN_REF_TRACING) console.groupEnd();
}

function mergeFirstWrites(node, parentBlock) {
  if (OPEN_REF_TRACING) console.group('OpenRefs: mergeFirstWrites()', node.$p.openRefsT.firstWritesToProcessAfter.length);
  // This part must merge the first-writes detected in either branch and set them on the parent block.
  // It should only bother for bindings for which no first-write is known at this time. Else it's not
  // a first-write (by definition).
  // The point is to be able to fix this: `while (true) { if ($) $(x); x = 5; }` -> we must keep track
  // of the fact that `$(x)` can observe that `x = 5` later in the loop, if it loops.
  // If a branch obruptly stops then it shouldn't set the "after" here for first-writes. It won't set
  // the "before" regardless.

  const parentFirstWrites = parentBlock.$p.openRefsN.firstWrites; // At the time of reaching this `if`
  const copy = new Map(parentFirstWrites); // Cache known names because we're mutating them next.
  /**
   * @type {Array<Map<string, Array<Write>>>}
   */
  const openRefsFirstWritesToProcessAfter = node.$p.openRefsT.firstWritesToProcessAfter;
  openRefsFirstWritesToProcessAfter.forEach((mapToMerge) => {
    mapToMerge.forEach((arrToMerge, name) => {
      // Check on the copy because when the "if" has a first write for some name, the map will be updated by the time you reach the "else"
      if (!copy.has(name)) {
        if (!parentFirstWrites.has(name)) {
          // Note: most of the time it won't have this but when two branches both merge a
          // first-write, it will. That's the whole point of this complexity.
          parentFirstWrites.set(name, new Set);
        }
        arrToMerge.forEach(write => {
          parentFirstWrites.get(name).add(write);
        });
      }
    })
  });
  // At this point "parentBlock.$p.openRefsFirstWrites" should be the intersection of node.consequent.$p.openRefsFirstWrites
  // and node.alternate.$p.openRefsFirstWrites for any binding that did not already exist.
  if (OPEN_REF_TRACING) console.groupEnd();
}

function mergeLastWrites(node, parentBlock) {
  if (OPEN_REF_TRACING) console.group('OpenRefs: mergeLastWrites()', node.$p.openRefsT.lastWritesToProcessAfter.length);

  // After the "if" statement, if at least one write for a binding was observed in
  // _all_ branches inside the statement then replace the lastWrites of the parent
  // with the intersection of those writes. Otherwise amend the set of the parent.
  // The point is that we need to know all the writes a next ref after the statement
  // might be able to read/overwrite.
  // The writes in abrupt completed branches will not appear in this "after".

  const mergeMap = new Map;
  node.$p.openRefsT.lastWritesToProcessAfter.forEach(map => {
    map.forEach((set, name) => {
      const curr = mergeMap.get(name);
      if (curr) {
        set.forEach(write => curr.add(write));
      } else {
        mergeMap.set(name, new Set(set));
      }
    });
  });
  // Now for every entry in mergeMap that appears in all "after" maps, overwrite
  // them in the parent. For anything else, amend them.
  mergeMap.forEach((set, name) => {
    if (node.$p.openRefsT.lastWritesToProcessAfter.every(map => map.has(name))) {
      parentBlock.$p.openRefsN.lastWrites.set(name, set);
    } else {
      const s = parentBlock.$p.openRefsN.lastWrites.get(name) || new Set; // It may not exist eh.
      set.forEach(write => s.add(write));
      parentBlock.$p.openRefsN.lastWrites.set(name, s);
    }
  });
  // Now the parent node represents the current open-write state after the "if".
  // The next ref will be able to find all the writes it can read/overwrite in this list.
  if (OPEN_REF_TRACING) console.groupEnd();
}

function mergePreWriteReads(node, parentBlock) {
  if (OPEN_REF_TRACING) console.group('OpenRefs: mergePreWriteReads()', node.$p.openRefsT.preWriteReadsToProcessAfter.length);

  // The point of the pre-write-reads is to know which reads at the start
  // of a loop may read a write at the end of that loop once it loops.
  // `while ($) { $(x); x = 1; }`
  // We want to know every potential read here. So imbalanced branching
  // should still result in an pre-write-read. For example, in this snippet
  // `while ($) { if ($()) x = 1; $(x); x = 2; }` the $(x) read of x may
  // observe 1 or 2 (or the value before the loop) so that's what we want to know.
  // To achieve this, we must copy all the refs marked this way, from either branch,
  // and merge it with those of the parent node.

  const mergeMap = parentBlock.$p.openRefsN.preWriteReads;
  node.$p.openRefsT.preWriteReadsToProcessAfter.forEach(map => {
    map.forEach((set, name) => {
      const has = mergeMap.get(name);
      if (!has) {
        mergeMap.set(name, new Set(set));
      } else {
        set.forEach(read => has.add(read));
      }
    });
  });

  // Now the map is updated with all the early reads after this "if".
  if (OPEN_REF_TRACING) console.groupEnd();
}
