import { ASSERT, DIM, BOLD, RESET, BLUE, dir, group, groupEnd, log, fmat, printNode } from './utils.mjs';
import { printer } from '../lib/printer.mjs';
import { $p } from './$p.mjs';
import * as AST from './ast.mjs';

// This phase runs after phase 2 and is supposed to quickly run through aggregated things

export function phase3(program, fdata, resolve, req) {
  group(
    '\n\n\n##################################\n## phase3  ::  ' +
      fdata.fname +
      '  ::  cycle ' +
      fdata.cycle +
      '\n##################################\n\n\n',
  );

  let changed = false;

  fdata.globallyUniqueNamingRegistery.forEach((obj, uniqueName) => {
    if (obj.updates.length === 1) {
      const update = obj.updates[0];
      // variable decl without init will have updateTo as null/undefined here
      log('so the updates', obj.updates)
      let updateTo;
      if (update.index >= 0) updateTo = update.parent[update.prop][update.index];
      else updateTo = update.parent[update.prop];
      if (!updateTo) updateTo = AST.identifier('undefined');
      //log('test->', updateTo)
      if (updateTo.type === 'Literal' || (updateTo.type === 'Identifier' && ['undefined', 'NaN', 'Infinity'].includes(updateTo.name))) {
        log('Replacing literal binding with the actual literal...');

        // Replace all occurrences with the literal...
        obj.usages.forEach(({ parent, prop, index }) => {
          // Cannot replace the declaration itself. But can eliminate it
          if (parent.type === 'VariableDeclarator' && prop !== 'init') {
            // `let x = 5;`
            return; // Ignore, phase4 will take care of this
          }

          log('Replacing a usage of `' + uniqueName + '` with a primitive', updateTo);
          if (index >= 0) {
            if (parent[prop][index] !== updateTo) {
              log('- actually replacing', parent.type + '[' + prop + '][' + index + '] with a', updateTo.type);
              parent[prop][index] = updateTo;
              changed = true;
            }
          } else {
            if (parent[prop] !== updateTo) {
              log('- actually replacing', parent.type + '[' + prop + '] with a', updateTo.type, '->', index);
              parent[prop] = updateTo;
              changed = true;
            }
          }
        });
      }
    }
  });

  log('\nCurrent state\n--------------\n' + fmat(printer(fdata.tenkoOutput.ast)) + '\n--------------\n');

  log('End of phase3');
  groupEnd();

  return changed;
}
