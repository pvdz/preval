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
 *    trappedByFinally: Array<{
 *      srcPid: number,
 *      dst: Node,
 *      // dstDefined==dst=destinationNode.
 *      // - Most of the time, this is equal to the continuationNode (-> .dst), except:
 *      //   - If there is no dst, like with return/throw, then this is the nearest scope floor (function/program)
 *      //   - If dst is a Catch for throw then this is the parent of its target Try.
 *      dstDefined: Node,
 *      abruptReason: '' | 'continue' | 'break' | 'return' | 'throw', // This is wasAbruptType
 *      exitWrites: Treblo['exitWrites'], // By ref from src node
 *      overwrotes: Treblo['overwritten'], // (clone)
 *
 *      // TODO:
 *      mutatedBetweenSrcAndDst: Set<string>, // By ref from src node
 *      entryReads: Set<Read>, // By ref from src node
 *      entryWrites: Set<Write>, // By ref from src node
 *      abruptLabel: undefined | string,
 *    }>
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
    /**
     * For Try nodes
     * These nodes are caught by this Finally and will go through this node.
     * We need to remember the dst node where it wants to continue because it's not scheduled
     * since the Finally may change the continuation destination.
     * The treblo for the Finally Block doesn't exist yet since that Finally hasn't been
     * traversed yet. So we store it in the parent.
     * The dstDefined node is the one used for defined checks. It will be equal to the
     * continuationNode if present, and otherwise the block of the nearest scope boundary.
     */
    trappedByFinally: [],
  };

  return Trebra;
}
