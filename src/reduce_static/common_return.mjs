// Find functions with a common return value that is primitive and replace all call sites with that value

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

export function inlineCommonReturns(fdata) {
  group('\n\n\nChecking for functions that have a common return value that is a primitive');
  //vlog('\nCurrent state\n--------------\n' + fmat(tmat(fdata.tenkoOutput.ast)) + '\n--------------\n');
  const r = _inlineCommonReturns(fdata);
  groupEnd();
  return r;
}
function _inlineCommonReturns(fdata) {
  // phase1 will already determine the common primitive return value for each function
  // All we have to do here is find all calls to functions that still have a commonReturn set and inline those.

  const queue = [];
  fdata.globallyUniqueNamingRegistry.forEach(function (meta, name) {
    if (meta.isBuiltin) return; // We can probably do it for some of these cases? But let's do that in another step
    if (meta.isImplicitGlobal) return;
    if (!meta.isConstant) return;

    const funcNode = meta.constValueRef.node;
    if (funcNode.type !== 'FunctionExpression') return;

    vgroup('- `' + meta.uniqueName + '`, writes:', meta.writes.length, ', reads:', meta.reads.length);

    if (funcNode.async || funcNode.generator) {
      vlog('Function is async or a generator, bailing');
      vgroupEnd();
      return;
    }

    if (!funcNode.$p.commonReturn) {
      vlog('Function does not have a common return value that is a primitive, bailing');
      vgroupEnd();
      return;
    }

    if (!AST.isPrimitive(funcNode.$p.commonReturn)) {
      // node.$p.commonReturn may be an identifier that is not a primitive
      vlog('Function does not return a primitive. Bailing');
      vgroupEnd();
      return;
    }

    meta.reads.forEach((read) => {
      // Find all calls and replace them with a clone of the commonReturn node, moving the call to above
      if (read.parentNode.type !== 'CallExpression' || read.parentProp !== 'callee') {
        return;
      }

      if (read.grandNode.type === 'ExpressionStatement') {
        // This value is voided so there's no point in inlining it (plus it would lead to an infinite loop...)
        return;
      }

      // So this should be a read that is a call to the function that we can inline...
      queue.push({ pid: +read.node.$p.pid, meta, read });
    });

    vgroupEnd();
  });

  log('Attempting to inline the return value of', queue.length, 'function calls.');
  if (queue.length > 0) {
    vlog('There are', queue.length, 'function calls queued for inlining');
    // We want to apply the splices back to front, or reverse source code order
    // There's currently no guarantee about the order of the queue so we can't just reverse it.
    // The pid is guaranteed fresh and incremental in traversal order so we use that to sort.
    queue.sort(({ pid: A }, { pid: B }) => (A < B ? 1 : A > B ? -1 : 0));
    vlog('The inline queue pid and depth order:', queue.map(({ pid }) => '<' + pid + '>').join(', '));

    // Inline functions. Start with the lowest nesting to the least nested, last to first source code order.
    // By starting at the most nested, we prevent less indented inlines from missing indentations from more inlined calls.
    // By going last to first we can freely inject any number of elements into a body without affecting earlier indexes.
    // The call is leading for this order, not the function decl. The call is where arbitrary statements are injected.
    // The function decls are set to an empty statement and do not change any indexes.
    vlog('');
    queue.forEach(({ meta, read }, i) => {
      vgroup('- queue[' + i + '][' + meta.uniqueName + ']');

      rule('If a function returns the same primitive in all places then replace all calls to it with that value');
      example('function f(){ $(); return 5; } $(f());', 'function f(){ $(); return 5; } f(); $(5);');
      before(read.node, read.blockBody[read.blockIndex]);

      // Move the call to its own statement
      read.blockBody.splice(read.blockIndex, 0, AST.expressionStatement(read.parentNode));
      // Then replace the original place where the call happened with the commonReturn value
      const clone = AST.cloneSimple(meta.constValueRef.node.$p.commonReturn);
      if (read.grandIndex < 0) read.grandNode[read.grandProp] = clone;
      else read.grandNode[read.grandProp][read.grandIndex] = clone;

      after(read.blockBody[read.blockIndex]);
      after(read.blockBody[read.blockIndex + 1]);
      vgroupEnd();
    });

    log('Return values inlined:', queue.length, '. Restarting from phase1 to fix up read/write registry');
    return {what: 'inlineCommonReturns', changes: queue.length, next: 'phase1'};
  }
  log('Return values inlined: 0.');
}
