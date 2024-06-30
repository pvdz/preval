// Find spreads on if-tests in the `else` branch
//
//          const x = f(); if (x) {} else { g(...x); }
// ->
//          const x = f(); if (x) {} else { if (typeof x === 'string') g(); else throw error; }
// ->
//          const x = f(); if (x) {} else { if (x === '') g(); else throw error; }

import {
  ASSERT,
  log,
  group,
  groupEnd,
  vlog,
  vgroup,
  vgroupEnd,
  fmat,
  tmat,
  rule,
  example,
  before,
  source,
  after,
  findBodyOffset,
} from '../utils.mjs';
import * as AST from '../ast.mjs';

export function ifFalsySpread(fdata) {
  group('\n\n\nSearching for if tests that are spread in the else branch\n');
  const r = _ifFalsySpread(fdata);
  groupEnd();
  return r;
}
function _ifFalsySpread(fdata) {
  const queue = [];

  fdata.globallyUniqueNamingRegistry.forEach((meta, name) => {
    if (meta.isImplicitGlobal) return;
    if (meta.isBuiltin) return;
    if (!meta.isConstant && !meta.singleScopeWrites) return; // Cant reliably predict write order. TODO: we only care about multi-scope _writes_...

    vgroup('- `' + name + '`');

    meta.rwOrder.forEach((ref, ri) => {
      if (ref.action !== 'read') return;
      vlog('ref', ri, ':', ref.action, ref.kind, ref.node.$p.pid);

      const read = ref;
      const ifNode = read.parentNode;
      if (read.parentNode.type !== 'IfStatement') return vlog('- not an if-test');

      const elseStartPid = +ifNode.alternate.$p.pid;
      const elseEndPid = +ifNode.alternate.$p.lastPid;

      for (let i = ri; i < meta.rwOrder.length; ++i) {
        const r = meta.rwOrder[i];
        const pid = +r.node.$p.pid;
        //vlog('sub-ref', ri, ', pid', pid, 'between', elseStartPid, 'and', elseEndPid,'?')
        if (pid < elseStartPid) {
          vlog('- occurrence in the `then` ...');
        } else if (pid <= elseEndPid) {
          vlog('- occurrence inside the `else` ...', r.parentNode.type);
          if (r.parentNode.type === 'SpreadElement') {
            // bingo?
            // const x = foo(...x)
            //->
            // if (x !== '') throw err
            // const x = foo()

            vlog('  - Found! Queued for transformation');
            queue.push({
              pid: +r.node.$p.pid, // Use pid because there may be multiple spreads in a call
              func: () => {
                rule('Spreading a falsy value can only work for empty string');
                example('const x = f(); if (x) {} else g(...x);', 'const x = f(); if (x) {} else { if (x !== "") throw err; g(); }');
                before(r.blockBody[r.blockIndex]);

                r.blockBody.splice(
                  r.blockIndex,
                  0,
                  AST.ifStatement(
                    AST.binaryExpression('!==', AST.cloneSimple(r.node), AST.primitive('')),
                    AST.blockStatement(
                      AST.throwStatement(AST.primitive('Preval: Attempting to spread primitive that is not an empty string')),
                    ),
                    AST.blockStatement(),
                  ),
                );
                r.grandNode[r.grandProp].splice(r.grandIndex, 1); // Drop the spread

                after(r.blockBody[r.blockIndex]);
                after(r.blockBody[r.blockIndex + 1]);
              },
            });
          }
        } else {
          vlog('- not used in a spread in the `else` branch');
          break;
        }
      }
    });

    vgroupEnd();
  });

  if (queue.length) {
    queue.sort(({ pid: a }, { pid: b }) => (a < b ? 1 : a > b ? -1 : 0));
    queue.forEach(({ index, func }) => func());

    log('Falsy spreads fixed:', queue.length, '. Restarting from phase1');
    return 'phase1';
  }

  log('Falsy spreads fixed: 0.');
}
