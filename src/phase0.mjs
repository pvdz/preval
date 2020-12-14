import { log, group, groupEnd } from './utils.mjs';
import * as Tenko from '../lib/tenko.prod.mjs'; // This way it works in browsers and nodejs and github pages ... :/

if (typeof window !== 'undefined') window.Tenko = Tenko; // Expose symbols for UI

export function phase0(code, fname) {
  group('\n\n\n##################################\n## phase0  ::  ' + fname + '\n##################################\n\n\n');

  log('- Parsing code with Tenko...');

  const tenkoOutput = Tenko.Tenko(code, {
    exposeScopes: true,
    astUids: true,
    collectTokens: Tenko.COLLECT_TOKENS_ALL,
    goalMode: Tenko.GOAL_MODULE,
    tokenStorage: [],
  });

  log('- Finished parsing');

  // Create a lookup table, rowxcol -> token, so we can map AST nodes to their tokens. Hopefully.
  // Also adds a property to uniquely identify the token based on its position in the token stream.
  const tokenTable = new Map(
    tenkoOutput.tokens.map((token, i) => {
      token.n = i;
      token.str = code.slice(token.start, token.stop);
      return [token.line + ':' + token.column, token];
    }),
  );

  //if (store.options.onParse) store.options.onParse(filename, fileState.tenkoOutput, fileState.tokenTable);

  groupEnd();

  return { // fdata
    fname,
    tenkoOutput,
    tokenTable,
    imports: undefined, // phase1
    exports: undefined, // phase1
    globallyUniqueNamingRegistery: undefined, // phase1. every binding is assigned a (module) globally unique name and meta data for this binding is stored here by that name
  };
}
