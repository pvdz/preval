import { ASSERT, log, group, groupEnd, vlog, vgroup, vgroupEnd, fmat, tmat, rule, example, before, source, after, findBodyOffset, } from '../utils.mjs';
import * as AST from '../ast.mjs';

export function findThrowers(fdata) {
  group('\n\n\n[findThrowers] Searching for functions that only throw\n');
  const r = _findThrowers(fdata);
  groupEnd();
  return r;
}
function _findThrowers(fdata) {
  const queue = [];
  fdata.globallyUniqueNamingRegistry.forEach((meta, name) => {
    if (meta.isImplicitGlobal) return;
    if (meta.isBuiltin) return;
    if (!meta.isConstant) return;

    vlog(
      '- `' + name + '`:',
      meta.varDeclRef.node.type,
      'reads args?',
      meta.varDeclRef.node.$p.readsArgumentsLen,
      meta.varDeclRef.node.$p.readsArgumentsAny,
    );

    if (meta.writes.length !== 1) {
      vlog('- Binding has more than one write. Bailing');
      return;
    }

    const funcNode = meta.varDeclRef.node;
    if (funcNode.type !== 'FunctionExpression') {
      vlog('- not a function');
      return;
    }

    if (funcNode.$p.commonReturn !== undefined) {
      vlog('- returns at least at one point');
      return;
    }

    vlog('- this function always throws and never returns. All calls should be followed by an empty throw.');

    meta.reads.forEach((read, ri) => {
      vlog('-', ri, ':', read.parentNode.type + '.' + read.parentProp);
      if (read.parentNode.type !== 'CallExpression' || read.parentProp !== 'callee') {
        return;
      }

      // Make sure the call is a statement. It shouldn't really matter what it was before but retain it anyways.
      // The previous "shell", if not a statement, should now follow the call expression statement.
      // After the call inject a throw. This should make the rest dead code, but let DCE deal with that.
      // If the call is already followed by this throw, do nothing. Consider it normalized.

      if (read.blockBody.length >= read.blockIndex) {
        if (read.blockBody[read.blockIndex + 1]?.type === 'ThrowStatement') {
          vlog('Next statement already throws. Bailing');
          return;
        }
      }

      queue.push({
        pid: read.node.$p.pid,
        func: () => {
          rule('A call to a function that always throws should be followed by a throw');
          example('function f(){ throw x; } g(f());', 'function f(){ throw x; } g(f()); throw "always";');
          before(read.blockBody[read.blockIndex]);

          read.blockBody.splice(read.blockIndex + 1, 0, AST.throwStatement(AST.templateLiteral('Preval: the previous call always throws')));

          after(read.blockBody[read.blockIndex]);
          after(read.blockBody[read.blockIndex + 1]);
        },
      });
    });
  });

  if (queue.length) {
    queue.sort(({ pid: a }, { pid: b }) => (a < b ? 1 : a > b ? -1 : 0));
    queue.forEach(({ func }) => func());

    log('Throws injected:', queue.length, '. Restarting from phase1');
    return {what: 'findThrowers', changes: queue.length, next: 'phase1'};
  }

  log('Throws injected: 0.');
  return false;
}
