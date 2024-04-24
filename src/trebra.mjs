// Trebra: Track Ref Branch (unique string)

import {REF_TRACK_TRACING} from "./utils/ref_tracking.mjs"

/**
 * Control flow changing nodes have this, like `if`, loops, and try/catch/finally
 * @see createTrebra where this is created for comments
 * Previously known as OpenRefsT
 *
 * @typedef {
 *  {
 *    entryReadsAfter: Array<OpenRefsN['entryReads']>
 *    entryWritesAfter: Array<OpenRefsN['entryWrites']>
 *    exitWritesAfter: Array<['BreakStatement' | 'ThrowStatement' | 'ReturnStatement' | undefined, OpenRefsN['exitWrites']]>,
 *    entryReadsToProcessBefore: Array<Map<string, Set<Read>>>,
 *    entryWritesToProcessBefore: Array<Map<string, Set<Write>>>,
 *    exitWritesToProcessBefore: Array<Map<string, Set<Write>>>,
 *    entryReadsToProcessAfter: Array<Map<string, Set<Read>>>,
 *    entryWritesToProcessAfter: Array<Map<string, Set<Write>>>,
 *    exitWritesToProcessAfter: Array<Map<string, Set<Write>>>,
 *    finallyCaught: Array<[fromNode, continuationNode]>,
 *  }
 * } Trebra // Track Ref Branch (unique string)
 */

export function createTrebra() {
  if (REF_TRACK_TRACING) console.log('RTT: createTrebra()');

  /**
   * @type Trebra
   */
  const Trebra = {
    _type: 'Trebra',

    /**
     * For nodes that can be the target of code flow after branching (labels, loops, ifs)
     * this array is the list of entryReads to consolidate after visiting the actual node.
     **/
    entryReadsAfter: [],
    /**
     * For nodes that can be the target of code flow after branching (labels, loops, ifs)
     * this array is the list of entryWrites to consolidate after visiting the actual node.
     */
    entryWritesAfter: [],
    /**
     * For nodes that can be the target of code flow after branching (labels, loops, ifs)
     * this array is the list of exitWrites to consolidate after visiting the actual node.
     * Each element is a tuple where the first value tells you whether the block that added
     * it had an abrupt completion (break, continue, etc) and the second element is the
     * map of exitWrites for that block. The abrupt part is relevant for loops.
     **/
    exitWritesAfter: [],

    entryReadsToProcessBefore: [],
    entryWritesToProcessBefore: [],
    exitWritesToProcessBefore: [],
    entryReadsToProcessAfter: [],
    entryWritesToProcessAfter: [],
    exitWritesToProcessAfter: [],

    /**
     * Only for try statements with a finally block; this contains the list of
     * nodes and their continuation node that broke through this finally.
     * They need to apply to this finally as individual runs.
     */
    finallyCaught: [],
  };

  return Trebra;
}
