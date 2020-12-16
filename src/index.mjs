import { clearStdio, setStdio, log, group, groupEnd } from './utils.mjs';
import { phase0 } from './phase0.mjs';
import { phase1 } from './phase1.mjs';
import { phase2 } from './phase2.mjs';
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
    changed = phase2(program, fdata, resolve, req);

    fdata.globallyUniqueNamingRegistery.forEach((obj, uniqueName) => {
      if (obj.updates.length === 1) {
        let update = obj.updates[0].parent[obj.updates[0].prop];
        if (obj.updates[0].index >= 0) update = update[obj.updates[0].index];
        if (update.type === 'Literal') {
          log('Replacing literal binding with the literal...');

          // Replace all occurrences with the literal...
          obj.usages.forEach(({ parent, prop, index }) => {
            // Cannot replace the declaration itself. But can eliminate it
            if (parent.type === 'VariableDeclarator' && prop !== 'init') {
              // TODO: Eliminate this declaration...
              log('TODO: eliminate var declarator');
            } else {
              log('Replacing a usage of `' + uniqueName + '` with a literal');
              if (index >= 0) {
                if (parent[prop][index] !== update) {
                  log('- actually replacing', parent.type + '[' + prop + '][' + index + '] with a', update.type);
                  parent[prop][index] = update;
                  changed = true;
                }
              } else {
                if (parent[prop] !== update) {
                  log('- actually replacing', parent.type + '[' + prop + '] with a', update.type, '->', index);
                  parent[prop] = update;
                  changed = true;
                }
              }
            }
          });
        }
      }
    });
  } while (changed);

  // This is where the magic starts

  return {
    files: {
      // note: test runner will auto-Prettier the result. Perhaps this should be done here..? Or let the user take care of that?
      [entryPointFile]: printer(fdata.tenkoOutput.ast),
    },
  };
}
