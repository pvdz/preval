// Trebra: Track Ref Branch (unique string)

import { REF_TRACK_TRACING } from './utils.mjs';


/**
 * Only used by while/for-in/for-of and try nodes. Other nodes don't need it.
 * We could put these props on $p directly but I wanted to abstract the ref tracking meta data.
 *
 * @typedef {
 *  {
 *    pendingLoopWriteChecks: Array<{
 *      abruptReason: '' | 'break' | 'continue' | 'return' | 'throw',
 *      srcPid: number,
 *      exitWrites: Map<string, Set<Write>>,
 *      mutedRefs: Set<string>
 *    }>,
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
     * Only for loops.
     * This set contains arrays, maps, and sets by reference from Block node Treblo's.
     * Since we must also be able to schedule something without an AST node, we juggle the refs instead.
     * When a node abrupt completes and skips through a few nodes, it may break through one or more loops.
     * When those loops reconnect the main block to the start, they may update the overwritten which may
     * affect queued abrupt completions inside of it.
     * This list should fix that by also updating any set in this array with the mutedBetweenSrcAndDst at that time.
     */
    pendingLoopWriteChecks: [],
  };

  return Trebra;
}
