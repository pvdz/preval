// Treblo: Track Ref Block (unique string)

import { REF_TRACK_TRACING } from './utils.mjs';

/**
 * All blocks have this
 * @see createTreblo where this is created for comments
 * Previously known as OpenRefsN
 *
 * @typedef {
 *  {
 *    defined: Set<string>,
 *    overwritten: Set<string>, // More like "alwaysOverwritten"
 *    entryReads: Map<string, Set<Read>>,
 *    entryWrites: Map<string, Set<Write>>,
 *    exitWrites: Map<string, Set<Write>>,
 *    wasAbrupt: undefined | Node,
 *    reads: Map<string, Array<Read>>,
 *    writes: Map<string, Array<Read>>,
 *    rwOrder: Map<string, Array<Read | Write>>,
 *    exitWritesBefore: Map<string, Set<Write>>,
 *  }
 * } Treblo // Track Ref Block (unique string)
 */

/**
 * @param {Set<string>} alreadyDefined
 * @param {Map<string, Set<Write>>} currentParentExitWrites
 */
export function createTreblo(
  alreadyDefined,
  currentParentExitWrites,
) {
  // TODO: do we need to track which bindings were already available in parent node?

  if (REF_TRACK_TRACING) console.log('RTT: createTreblo()');

  const exitWritesClone = new Map;
  currentParentExitWrites.forEach((set, name) => exitWritesClone.set(name, new Set(set)));

  /**
   * @type Treblo
   */
  const Treblo = {
    _type: 'Treblo',

    /**
     * These are queued nodes whose code flow continues here. They are somewhere
     * inside the currently traversed descendant of this Block. When the walker
     * exits the direct child, it will process these pending nodes and connect
     * their exitWrites and overwritten status to this treblo.
     * The overwrittens are the bindings that, at the time of abrupt completing,
     * were completely overwritten somewhere between the dst block and the src node.
     *
     * @type {Array<{src: Node, dst: Node, overwrittens: Set<string>}>}
     */
    pendingNext: [],
    /**
     * Similar to pendingNext except only nodes that continue a loops.
     * This list is processed after each loop that the walker exits.
     * We need it to connect exitWrites to the entryReads/entryWrites of the loop.
     *
     * @type {Array<{src: Node, dst: Node, overwrittens: Set<string>}>}
     **/
    pendingLoop: [],

    /**
     * List of bindings that were declared inside this node
     */
    defined: new Set(alreadyDefined),
    /**
     * If a name was written to in this block then this set should hold the name.
     * However, it should only be set if _all_ branches leading here overwrite it.
     * Put differently; this determines whether a read can still be an entryRead.
     * Set is "live", meaning it gets updated as the AST is walked. At the end
     * of each block the overwritten set is merged upward depending on the branching.
     * (Consider; if a var is overwritten in each branch of an `if` then the parent
     * block should consider it overwritten regardless after that `if`.)
     */
    overwritten: new Set,
    /**
     * For each binding a list of reads inside this node that might read the value of
     * the binding as it was at the start of this node.
     * Note: these may also read the end state of a binding inside a loop when it loops
     * Note: these may read any write if the read is an entryRead of a catch or finally
     * Note: do not consider the sets to be ordered.
     */
    entryReads: new Map,
    /**
     * For each binding the any write inside this node that might change the state of
     * a binding from what it was at the start of this node.
     * Note: these may also change the end state of a binding inside a loop when it loops
     * Note: these may change any write if the write is an entryRead of a catch or finally
     * Need this for catch/finally, to connect them to the writes of the try/catch blocks
     * Note: do not consider the sets to be ordered.
     */
    entryWrites: new Map,
    ///**
    // * These are the aggregate parent exitWrites so far.
    // * Basically tells you which writes may be affected by an entryWrite or entryWrite
    // * @deprecated do we really need this?
    // */
    //exitWritesBefore,
    /**
     * For each binding a list of writes inside this node that can be the last write to
     * the binding in this node in at least one scenario.
     * Need this to connect these writes back to the entryReads of a loop
     * Note: do not consider the sets to be ordered.
     * Note: this map is stored by reference. Do not replace it.
     * Note: this is a "live" map, meaning that it gets updated and replaced as we walk
     *       and it starts with the parent exitWrites. This is also known as "lastWrites".
     */
    exitWrites: exitWritesClone,
    /**
     * Did the node abruptly change flow (break,continue,return,throw)? Implies things for exitWrites
     * If it did then the abrupt completion node is direct a child of this node, not nested.
     */
    wasAbrupt: undefined,
    /**
     * All read refs inside this node in source order
     */
    reads: new Map,
    /**
     * All write refs inside this node in source order
     */
    writes: new Map,
    /**
     * All read and write refs inside this node in source order
     */
    rwOrder: new Map,
  };

  return Treblo;
}
