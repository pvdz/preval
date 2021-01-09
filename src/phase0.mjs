import { log, group, groupEnd } from './utils.mjs';
import * as Tenko from '../lib/tenko.prod.mjs'; // This way it works in browsers and nodejs and github pages ... :/

if (typeof window !== 'undefined') window.Tenko = Tenko; // Expose symbols for UI

export function phase0(code, fname) {
  group('\n\n\n##################################\n## phase0  ::  ' + fname + '\n##################################\n\n\n');

  log('- Parsing code with Tenko...');

  const tenkoOutput = Tenko.Tenko(code, {
    exposeScopes: true,
    collectTokens: Tenko.COLLECT_TOKENS_NONE,
    goalMode: Tenko.GOAL_MODULE,
    locationTracking: false,

    astUids: true, // debugging
  });

  //console.dir(tenkoOutput.ast, {depth: null});

  log('- Finished parsing');

  groupEnd();

  return { // fdata
    fname,
    cycle: 0, // How often did we repeat the main loop
    tenkoOutput,
    imports: undefined, // phase1
    exports: undefined, // phase1
    globallyUniqueNamingRegistery: undefined, // phase1. every binding is assigned a (module) globally unique name and meta data for this binding is stored here by that name
  };
}
