// Find bindings which are initialized to true, and conditionally updated to false, and only used as while-tests

// `let x = y; if (y) y = $; if (x) while (true) { y = $; if (y) break; }`
// -> `if (y) { y = $; while (true) if (y = $) break; } else { }

import { ASSERT, log, group, groupEnd, vlog, vgroup, vgroupEnd, rule, example, before, source, after, findBodyOffset } from '../utils.mjs';
import * as AST from '../ast.mjs';

export function aliasIfIf(fdata) {
  group('\n\n\nLooking for alias of var that is if-tested followed by the alias if-tested\n');
  const r = _aliasIfIf(fdata);
  groupEnd();
  return r;
}
function _aliasIfIf(fdata) {
  const queue = [];

  fdata.globallyUniqueNamingRegistry.forEach((meta, name) => {
    if (meta.isImplicitGlobal) return;
    if (meta.isBuiltin) return;
    if (!meta.constValueRef) return; // catch

    vlog('- `' + name + '`:', meta.constValueRef.node.type);

    //if (
    //  meta.reads.some((read) => {
    //    if (read.parentNode.type === 'IfStatement') return;
    //    if (read.parentNode.type === 'WhileStatement') return;
    //    if (read.parentNode.type === 'UnaryExpression' && read.parentNode.operator === '!') return true;
    //    if (
    //      read.parentNode.type === 'CallExpression' &&
    //      read.parentProp === 'arguments' &&
    //      read.parentNode['arguments'][0] === read.node &&
    //      read.parentNode.callee.type === 'Identifier' &&
    //      read.parentNode.callee.name === 'Boolean'
    //    ) {
    //      // Boolean(x) does not evaluate x, only abstract testing (same as !)
    //      return;
    //    }
    //
    //    // We ignore assignments, objects, arrays, classes, member, and other calls since the value just gets lost
    //    // Any other ways of using it that don't get observed?
    //
    //    vlog('- Binding read in a way that may be observed, bailing');
    //    return true;
    //  })
    //) {
    //  return false;
    //}
    //
    //if (meta.writes.some(write => {
    //  if (write.kind === 'var') {
    //    if (!AST.isPrimitive(write.parentNode.init) || AST.getPrimitiveType(write.parentNode.init) !== 'boolean') {
    //      vlog('  - At least one write did not write a boolean, bailing');
    //      return true;
    //    }
    //    return;
    //  }
    //
    //  if (write.kind === 'assign') {
    //    if (!AST.isPrimitive(write.parentNode.right) || AST.getPrimitiveType(write.parentNode.right) !== 'boolean') {
    //      vlog('  - At least one write did not write a boolean, bailing');
    //      return true;
    //    }
    //    return;
    //  }
    //
    //  vlog('  - At least one write was not the var or an assign, bailing');
    //  return true;
    //})) {
    //  return
    //}

    vlog('  - Reads and writes seem to be ok. Now processing rwOrder');

    meta.rwOrder.forEach((ref, i) => {
      if (ref.blockIndex >= ref.blockBody.length - 2) return vlog('    - not enough statements left in parent block'); // Need at least two if-statements to follow the ref
      if (ref.action !== 'write') return vlog('    - not a write');

      let rhsName = '';
      if (ref.parentNode.type === 'AssignmentExpression' && ref.parentNode.right.type === 'Identifier') {
        rhsName = ref.parentNode.right.name;
      } else if (ref.parentNode.type === 'VarStatement' && ref.parentNode.init.type === 'Identifier') {
        rhsName = ref.parentNode.init.name;
      } else {
        vlog('    - was not assigned an ident');
        return;
      }

      if (ref.node.type !== 'Identifier') {
        console.log(ref.node);
        TODO;
      }
      const refName = ref.node.name;

      const nextNode1 = ref.blockBody[ref.blockIndex + 1];
      const nextNode2 = ref.blockBody[ref.blockIndex + 2];
      ASSERT(nextNode2, 'tested above?', ref.blockIndex, ref.blockBody.length);

      vlog('      - ref', i, '(', refName, ') is ok:', ref.parentNode.type, '=', rhsName);

      // `const x = y; if (y) {} else {} if (x) {} else {}`

      if (
        meta.isConstant &&
        nextNode1.type === 'IfStatement' &&
        nextNode1.test.type === 'Identifier' &&
        nextNode1.test.name === rhsName &&
        nextNode2.type === 'IfStatement' &&
        nextNode2.test.type === 'Identifier' &&
        nextNode2.test.name === refName
      ) {
        // `const refName = rhsName; if (rhsName) {} else {} if (refName) {} else {}`

        queue.push({
          index: ref.blockIndex,
          func: () => {
            // This should be safe because x is a constant and so its boolean-test outcome can no longer change
            rule('Caching of value and using back to back ifs can merge the ifs');
            example('const x = y; if (y) { a; b; } else { c; d; } if (x) { q; r; } else { s; t; }', 'if (y) { a; b; q; r; } else { c; d; s; t; }');
            before(ref.blockBody[ref.blockIndex]);
            before(nextNode1);
            before(nextNode2);

            nextNode1.consequent.body.push(...nextNode2.consequent.body);
            nextNode1.alternate.body.push(...nextNode2.alternate.body);
            ref.blockBody[ref.blockIndex + 2] = AST.emptyStatement();

            after(ref.blockBody[ref.blockIndex]);
            after(nextNode1);
            after(nextNode2);
          }
        });
      } else {
        vlog('  - did not meet criteria');
      }
    });
  });

  if (queue.length) {
    // By index, high to low. This way it should not be possible to cause reference problems by changing index
    queue.sort(({ index: a }, { index: b }) => (a < b ? 1 : a > b ? -1 : 0));
    queue.forEach(({ index, func }) => func());

    log('Alias-if-ifs merged:', queue.length, '. Restarting from phase1 to fix up read/write registry.');
    return {what: 'aliasIfIf', changes: queue.length, next: 'phase1'};
  }

  log('Alias-if-ifs merged: 0.');
}
