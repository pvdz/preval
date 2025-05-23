import * as Tenko from '../../lib/tenko.prod.mjs'; // This way it works in browsers and nodejs and github pages ... :/
import { log, group, groupEnd, vlog, vgroup, vgroupEnd } from '../utils.mjs';

if (typeof window !== 'undefined') window.Tenko = Tenko; // Expose symbols for UI

export function parseCode(code, fname, subCall) {
  if (subCall) group('\nParsing with Tenko (subcall)  ::  ' + fname);
  else group('\n\n\n##################################\n## parse source  ::  ' + fname + '\n##################################\n\n\n');

  log('- Parsing code with Tenko...');

  const start = Date.now();
  const tenkoOutput = Tenko.Tenko(code, {
    exposeScopes: true,
    collectTokens: Tenko.COLLECT_TOKENS_NONE,
    goalMode: Tenko.GOAL_MODULE,
    locationTracking: false,
    toplevelAwait: true,
    alwaysAllowOctalEscapes: true, // It's possible for eval/Function to drop these into the code while transforming so we need this option
    astUids: true, // debugging
  });

  //console.dir(tenkoOutput.ast, {depth: null});

  log('- Finished parsing (', Date.now() - start, 'ms)');

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
    /** @property {Map<pid, {name: string, pcode: Pcode}> pcodeOutput */
    pcodeOutput: {},
  };
}
