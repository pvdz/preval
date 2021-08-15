import * as Tenko from '../../lib/tenko.prod.mjs'; // This way it works in browsers and nodejs and github pages ... :/
import { log, group, groupEnd, vlog, vgroup, vgroupEnd } from '../utils.mjs';

if (typeof window !== 'undefined') window.Tenko = Tenko; // Expose symbols for UI

export function phase0(code, fname, subCall) {
  if (subCall) group('\nParsing with Tenko  ::  ' + fname);
  else group('\n\n\n##################################\n## phase0  ::  ' + fname + '\n##################################\n\n\n');

  log('- Calling Tenko...');

  const tenkoOutput = Tenko.Tenko(code, {
    exposeScopes: true, // func cloning needs it. shouldn't add too much overhead except for debug output
    //exposeScopes: false, // At this point all identifiers should be globally unique (relative to the module) so we don't need this
    collectTokens: Tenko.COLLECT_TOKENS_NONE,
    goalMode: Tenko.GOAL_MODULE,
    locationTracking: false,

    astUids: false, // For debugging
  });

  log('- Finished parsing');

  groupEnd();

  return {
    // fdata
    fname,
    len: code.length,
    cycle: 0, // How often did we repeat the main loop
    tenkoOutput,
    imports: undefined, // phase1
    exports: undefined, // phase1
    globallyUniqueNamingRegistry: undefined, // phase1. every binding is assigned a (module) globally unique name and meta data for this binding is stored here by that name
    reports: [],
  };
}
