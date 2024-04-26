// Treblo: Track Ref Block (unique string)

import {REF_TRACK_TRACING} from "./utils/ref_tracking.mjs"

/**
 * All blocks have this
 * @see createTreblo where this is created for comments
 * Previously known as OpenRefsN
 *
 * @typedef {
 *  {
 *    defined: Set<string>,
 *    overwritten: Map<string, boolean>,
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
 * @param {Map<string, Set<Write>>} beforeParentExitWrites
 * @param {Map<string, boolean>} parentOverwritten
 */
export function createTreblo(alreadyDefined, currentParentExitWrites, beforeParentExitWrites, parentOverwritten) {
  // TODO: do we need to track which bindings were already available in parent node?

  if (REF_TRACK_TRACING) console.log('RTT: createTreblo()');


  // The exitWrites before the current node are the combination of the exitWrites
  // in that node so far plus, provided the parentNode does not have overwritten
  // set for a binding, also the combined exitWrites of ancestor block(s) so far
  const exitWritesBefore = new Map;
  alreadyDefined.forEach(name => {
    const e1 = currentParentExitWrites.get(name);
    const e2 = !parentOverwritten.has(name) && beforeParentExitWrites.get(name);

    if (e1 || e2) {
      const set = new Set(e1 || e2);
      if (e1 && e2) {
        e2.forEach(write => set.add(write));
      }
      exitWritesBefore.set(name, set);
    }
  })

  /**
   * @type Treblo
   */
  const Treblo = {
    _type: 'Treblo',

    /**
     * List of bindings that were declared inside this node
     */
    defined: new Set(alreadyDefined),
    /**
     * For each binding for which a read or write was encountered, this map tells you
     * whether there was at least one branch that did not mutate the binding.
     */
    overwritten: new Map,
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
    /**
     * These are the aggregate parent exitWrites so far.
     * Basically tells you which writes may be affected by an entryWrite or entryWrite
     */
    exitWritesBefore,
    /**
     * For each binding a list of writes inside this node that can be the last write to
     * the binding in this node in at least one scenario.
     * Need this to connect these writes back to the entryReads of a loop
     * Note: do not consider the sets to be ordered.
     * Note: this map is stored by reference. Do not replace it.
     */
    exitWrites: new Map,
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
