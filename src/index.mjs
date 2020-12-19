import { clearStdio, setStdio, log, group, groupEnd } from './utils.mjs';
import { phase0 } from './phase0.mjs';
import { phase1 } from './phase1.mjs';
import { phase2 } from './phase2.mjs';
import { phase3 } from './phase3.mjs';
import { phase4 } from './phase4.mjs';
import { printer } from '../lib/printer.mjs';

export function preval({ entryPointFile, stdio, resolve, req }) {
  if (stdio) setStdio(stdio);
  else clearStdio();

  const code = req(entryPointFile);
  const fdata = phase0(code, entryPointFile);
  const program = {
    modules: new Map([[fdata.name, fdata]]),
    main: fdata.name,
  };
  phase1(program, fdata, resolve, req);

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
  };
}
