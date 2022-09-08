// Find spreads as args to functions that don't take arguments (from that position onwards)
// `function f(){} f(...x);`
// -> `[...x]; f();`

// This transform is a little redundant with exparam.mjs but that one doesn't do spreads so here we are. TODO :)

import { ASSERT, log, group, groupEnd, vlog, vgroup, vgroupEnd, rule, example, before, source, after, findBodyOffset } from '../utils.mjs';
import * as AST from '../ast.mjs';
import { createFreshVar } from '../bindings.mjs';
import { ASSUME_BUILTINS } from '../constants.mjs';

export function excessiveArgs(fdata) {
  group('\n\n\nLooking for function calls containing args where the functions dont have params at that position\n');
  const r = _excessiveArgs(fdata);
  groupEnd();
  return r;
}
function _excessiveArgs(fdata) {
  const queue = [];

  fdata.globallyUniqueNamingRegistry.forEach((meta, name) => {
    if (meta.isImplicitGlobal) return;
    if (meta.isBuiltin) return;
    if (!meta.isConstant) return;

    const funcNode = meta.constValueRef.node;
    if (funcNode.type !== 'FunctionExpression') return;

    vlog('- `' + name + '`:', meta.constValueRef.node.type);

    if (funcNode.$p.readsArgumentsAny || funcNode.$p.readsArgumentsLen) {
      vlog('- func uses `arguments`, bailing');
      return;
    }

    if (meta.writes.length !== 1) {
      vlog('This constant has multiple writes. Need to eliminate those runtime errors first.');
      return;
    }

    if (funcNode.params.some((pnode) => pnode.rest)) {
      vlog('- At least one param of the function was a spread, bailing');
      return;
    }

    const paramCount = funcNode.params.length;

    vgroup('- Call is legit. Checking whether there are any excessive args that we can eliminate');
    meta.reads.forEach((read) => {
      if (read.parentNode.type !== 'CallExpression' || read.parentProp !== 'callee') return;

      if (read.parentNode['arguments'].length > paramCount) {
        vlog('Found a call with too many args, checking if we can trim the args to match the param count');

        // Basically we need to confirm that there were no spreads within the range of paramCount, or actually,
        // we need to confirm that we have more than paramCount args even if we don't count the spreads (worst
        // case the spreads are empty and don't contribute an argument).

        let atleast = 0;
        let pruneFrom = 0;
        if (
          paramCount !== 0 &&
          !read.parentNode['arguments'].some((anode, i) => {
            if (anode.type !== 'SpreadElement') {
              ++atleast;
              if (atleast > paramCount) {
                pruneFrom = i;
                return true;
              }
            }
          })
        ) {
          vlog('- Either there are no excessive args or at least one arg is a spread that potentially maps to a param, bailing');
          return;
        }

        vlog('- Even ignoring all spreads, there are excessive args in the call we can proceed to prune, starting at index', pruneFrom);

        queue.push({
          index: read.blockIndex,
          func: () => {
            rule('A call passing on more args than the function receives should be pruned');
            example('function f(a){} f(x, y, ...z);', 'function f(a){} y; [...z]; f(x);');
            before(read.blockBody[read.blockIndex]);

            // Note: This changes semantics slightly insofar that y and z are now evaluated (and spread) before f or x are
            //       evaluated. At worst this does a bunch of stuff inside the iterator of y before TDZ crashing on accessing
            //       f or x. Since that's an edge case I'm choosing to ignore that.

            const newNodes = read.parentNode['arguments'].slice(pruneFrom).map((anode) => {
              if (anode.type === 'SpreadElement') return AST.expressionStatement(AST.arrayExpression(anode));
              return AST.expressionStatement(anode);
            });
            read.blockBody.splice(read.blockIndex, 0, ...newNodes);
            // Drop the excessive args (by setting the length of the array)
            read.parentNode['arguments'].length = pruneFrom;

            after(newNodes);
            after(read.blockBody[read.blockIndex]);
          },
        });
      }
      vgroupEnd();
    });
    vgroupEnd();
  });

  if (queue.length) {
    // By index, high to low. This way it should not be possible to cause reference problems by changing index
    queue.sort(({ index: a }, { index: b }) => (a < b ? 1 : a > b ? -1 : 0));
    queue.forEach(({ index, func }) => func());

    log('Functions unlocked:', queue.length, '. Restarting from phase1 to fix up read/write registry.');
    return 'phase1';
  }

  log('Functions unlocked: 0.');
  return false;
}
