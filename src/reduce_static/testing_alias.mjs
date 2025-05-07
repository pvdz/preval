// Find bindings which are initialized to true, and conditionally updated to false, and only used as if-tests

// `let x = true; if ($) { } else { x = false; } if (x) while (true) ...`
// -> `let x = $; if (x) while (true) ...`

import { ASSERT, log, group, groupEnd, vlog, vgroup, vgroupEnd, rule, example, before, source, after, findBodyOffset } from '../utils.mjs';
import * as AST from '../ast.mjs';
import {cloneSimple} from "../ast.mjs"
import { symbo } from '../symbols_builtins.mjs';

export function testingAlias(fdata) {
  group('\n\n\n[testingAlias] Looking for bindings only used as if-test bools and an alias to another var\n');
  const r = _testingAlias(fdata);
  groupEnd();
  return r;
}
function _testingAlias(fdata) {
  const queue = [];

  fdata.globallyUniqueNamingRegistry.forEach((meta, name) => {
    if (meta.isImplicitGlobal) return;
    if (meta.isBuiltin) return;
    if (!meta.varDeclRef) return; // catch

    vlog('- `' + name + '`:', meta.varDeclRef.node.type);

    if (
      meta.reads.some((read) => {
        if (read.parentNode.type === 'IfStatement') return;
        if (read.parentNode.type === 'WhileStatement') return;
        if (read.parentNode.type === 'UnaryExpression' && read.parentNode.operator === '!') return true;
        if (
          read.parentNode.type === 'CallExpression' &&
          read.parentProp === 'arguments' &&
          read.parentNode['arguments'][0] === read.node &&
          read.parentNode.callee.type === 'Identifier' &&
          read.parentNode.callee.name === symbo('boolean', 'constructor')
        ) {
          // Boolean(x) does not evaluate x, only abstract testing (same as !)
          return;
        }

        // We ignore assignments, objects, arrays, classes, member, and other calls since the value just gets lost
        // Any other ways of using it that don't get observed?

        vlog('- Binding read in a way that may be observed, bailing');
        return true;
      })
    ) {
      return false;
    }

    if (meta.writes.some(write => {
      if (write.kind === 'var') {
        if (!AST.isPrimitive(write.parentNode.init) || AST.getPrimitiveType(write.parentNode.init) !== 'boolean') {
          vlog('  - At least one write did not write a boolean, bailing');
          return true;
        }
        return;
      }

      if (write.kind === 'assign') {
        if (!AST.isPrimitive(write.parentNode.right) || AST.getPrimitiveType(write.parentNode.right) !== 'boolean') {
          vlog('  - At least one write did not write a boolean, bailing');
          return true;
        }
        return;
      }

      vlog('  - At least one write was not the var or an assign, bailing');
      return true;
    })) {
      return
    }

    vlog('  - Reads and writes seem to be ok. Now processing rwOrder');

    meta.rwOrder.forEach((ref, i) => {
      const nextRef = meta.rwOrder[i + 1];
      const nextNode = ref.blockBody[ref.blockIndex + 1];

      vlog('    - ref', i, ':', ref.action, ref.parentNode.type, nextRef?.action, nextNode?.type);

      // `x = true; if (y) {} else { x = false; }`
      if (
        ref.action === 'write' &&
        nextRef?.action === 'write' &&
        ((ref.parentNode.type === 'VarStatement' && AST.isTrue(ref.parentNode.init)) || (ref.parentNode.type === 'AssignmentExpression' && AST.isFalse(ref.parentNode.right))) &&
        ((nextRef.parentNode.type === 'VarStatement' && AST.isFalse(nextRef.parentNode.init)) || (nextRef.parentNode.type === 'AssignmentExpression' && AST.isFalse(nextRef.parentNode.right))) &&
        nextNode?.type === 'IfStatement' &&
        nextNode.alternate.body.length > 0 &&
        nextNode.alternate.body[0].type === 'ExpressionStatement' &&
        nextNode.alternate.body[0].expression === nextRef.parentNode
      ) {
        vlog('Scheduling inlining!');

        queue.push({
          index: ref.blockIndex,
          func: () => {
            rule('Assignment of true followed by if and assignment of false in the else branch is an alias of the if-test');
            example('let x = true; if ($) {} else { x = false; }', 'let x = $;');
            before(ref.blockBody[ref.blockIndex]);
            before(nextNode);

            if (ref.parentNode.type === 'VarStatement') {
              ref.parentNode.init = cloneSimple(nextNode.test);
            } else if (ref.parentNode.type === 'AssignmentExpression') {
              ref.parentNode.right = cloneSimple(nextNode.test);
            } else {
              TODO
            }

            nextRef.blockBody[nextRef.blockIndex] = AST.emptyStatement();

            after(ref.blockBody[ref.blockIndex]);
            after(nextNode);
          }
        });
      }
    });
  });

  if (queue.length) {
    // By index, high to low. This way it should not be possible to cause reference problems by changing index
    queue.sort(({ index: a }, { index: b }) => (a < b ? 1 : a > b ? -1 : 0));
    queue.forEach(({ index, func }) => func());

    log('Testing aliases inlnied:', queue.length, '. Restarting from phase1 to fix up read/write registry.');
    return {what: 'testingAlias', changes: queue.length, next: 'phase1'};
  }

  log('Testing aliases inlnied: 0.');
}
