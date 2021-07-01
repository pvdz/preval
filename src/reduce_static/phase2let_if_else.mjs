// Find lets that are assigned conditionally
// `let x = undefined; if ($) x = 1; else x = 2;`

import {
  ASSERT,
  log,
  group,
  groupEnd,
  vlog,
  vgroup,
  vgroupEnd,
  rule,
  example,
  before,
  source,
  after,
  fmat,
  tmat,
  findBodyOffset,
} from '../utils.mjs';
import * as AST from '../ast.mjs';
import { createFreshVar } from '../bindings.mjs';
import { RESET, GREEN } from '../constants.mjs';

export function letIfElse(fdata) {
  group('\n\n\nSearching for conditionally initialized lets\n');
  //vlog('\nCurrent state\n--------------\n' + fmat(tmat(fdata.tenkoOutput.ast)) + '\n--------------\n');
  const r = _letIfElse(fdata);
  groupEnd();
  return r;
}
function _letIfElse(fdata) {
  const queue = [];
  fdata.globallyUniqueNamingRegistry.forEach(function (meta, name) {
    if (meta.isBuiltin) return; // We can probably do it for some of these cases? But let's do that in another step
    if (meta.isImplicitGlobal) return;
    if (meta.isConstant) return;

    const initNode = meta.constValueRef.node;
    if (!AST.isPrimitive(initNode)) return;

    vgroup('- `' + meta.uniqueName + '`, writes:', meta.writes.length, ', reads:', meta.reads.length);

    const varDeclWrite = meta.writes.find((write) => write.kind === 'var');
    ASSERT(varDeclWrite, 'constant should have a var decl');
    if (varDeclWrite.reachedBy.size > 0) {
      vlog('There was at least one read that could reach this write so must bail');
      return;
    }

    vlog('This binding init is not observed. Can we replace it with one of the primitives assigned in branch?');
    const ipv = AST.isPrimitive(varDeclWrite.parentNode.init);
    if (ipv) {
      // Search for the first primitive that is assigned to this binding and use that as its init.
      // - This makes sure the state is consistent, even if there are multiple kinds of primitives assigned to this binding
      // - This makes it most likely that an assignment can be eliminated for being redundant
      // The alternative is to use the baseline for that primitive (empty string, zero, false)

      const pv = AST.getPrimitiveValue(varDeclWrite.parentNode.init);
      meta.writes.some((write) => {
        if (write.kind !== 'assign') return; // the var decl or `for`. Shrug.

        const isPrimitive = AST.isPrimitive(write.parentNode.right); // The assigned value
        if (isPrimitive) {
          const rpv = AST.getPrimitiveValue(write.parentNode.right);
          const rpvd = typeof pv === 'string' ? '' : typeof pv === 'number' ? 0 : rpv;
          if (rpvd === pv) {
            vlog('Apparently it already matches the type of the first primitive');
            return true;
          } else {
            vlog('Current init:', [pv], ', new value:', [rpv], ', target init value:', [rpvd]);
            rule('When the init of a binding cannot be observed, prefer to initialize it to the first found primitive assigned to it');
            example('let x = undefined; if (a) x = 5; else x = 10; f(x);', 'let x = 5; if (a) x = 5; else x = 10; f(x);');
            example('let x = undefined; if (a) x = f(); else x = 10; f(x);', 'let x = 10; if (a) x = f(); else x = 10; f(x);');
            before(varDeclWrite.blockBody[varDeclWrite.blockIndex]);

            varDeclWrite.parentNode.init = AST.primitive(rpvd);

            after(varDeclWrite.blockBody[varDeclWrite.blockIndex]);
            queue.push(1);
            return true;
          }
        }
      });
    }

    vgroupEnd();
  });

  if (queue.length > 0) {
    log('Let-if-else changed:', queue.length, '. Restarting from phase1 to fix up read/write registry');
    return 'phase1';
  }
  log('Let-if-else changed: 0.');
}
