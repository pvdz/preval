// Trebra: Track Ref Branch (unique string)

import { REF_TRACK_TRACING } from './utils.mjs';


/**
 * Control flow changing nodes have this, like `if`, loops, and try/catch/finally
 * Contains node specific things.
 *
 * @typedef {
 *  {
 *    pendingOverwrittens: Array<Set<string>>,
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
     * When a node abrupt completes and skips through a few nodes, it may break through one or more loops.
     * When those loops reconnect the main block to the start, they may update the overwritten which may
     * affect queued abrupt completions inside of it.
     * This list should fix that by also updating any set in this array with the overwrittens at that time.
     *
     * @type {Array<Set<string>>}
     */
    pendingOverwrittens: [],

  };

  return Trebra;
}
