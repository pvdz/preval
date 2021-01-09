import { clearStdio, setStdio, log, fmat, group, groupEnd } from './utils.mjs';
import { phase0 } from './phase0.mjs';
import { phaseNormalize } from './normalize.mjs';
import { phase1 } from './phase1.mjs';
import { phase2 } from './phase2.mjs';
import { phase3 } from './phase3.mjs';
import { phase4 } from './phase4.mjs';
import { printer } from '../lib/printer.mjs';
import { printer as specialPrinter } from '../lib/printer_special.mjs';

export function preval({ entryPointFile, stdio, resolve, req }) {
  if (stdio) setStdio(stdio);
  else clearStdio();

  // First normalize the code. Then serialize that AST. Then parse it again (because scope tracking).
  // Scope tracking by parser not looking so hot now, eh.
  const code = req(entryPointFile);
  const fdataOriginal = phase0(code, entryPointFile);
  phase1(fdataOriginal, resolve, req); // I want a phase1 because I want the scope tracking set up for normalizing bindings
  phaseNormalize(fdataOriginal, entryPointFile);
  const normalizedCode = printer(fdataOriginal.tenkoOutput.ast);
  const specialCode = specialPrinter(fdataOriginal.tenkoOutput.ast);

  log('\n\nSerializing and parsing normalized code next.');

  // Now process the normalized code
  const fdata = phase0(normalizedCode, entryPointFile);

  const program = {
    modules: new Map([[fdata.name, fdata]]),
    main: fdata.name,
  };

  phase1(fdata, resolve, req);

  let changed = false;
  do {
    ++fdata.cycle;
    changed = phase2(program, fdata, resolve, req);
    changed = phase3(program, fdata, resolve, req) || changed;
    changed = phase4(program, fdata, resolve, req) || changed;
  } while (changed);

  // This is where the magic starts

  return {
    files: {
      // note: test runner will auto-Prettier the result. Perhaps this should be done here..? Or let the user take care of that?
      [entryPointFile]: printer(fdata.tenkoOutput.ast),
    },
    normalized: {
      // For debug/testing
      [entryPointFile]: normalizedCode,
    },
    special: {
      // Gives a better idea of how simplified the code is, less noise etc
      [entryPointFile]: specialCode
    },
  };
}
