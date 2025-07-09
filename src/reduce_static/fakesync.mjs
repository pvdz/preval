// Find async functions that don't use await. If possible, transform them into returning promise boxed values instead.
//
//          `async function f() { return x + y; } f();`
// ->
//          `function f() { try { return Promise.resolve(x + y); } catch (e) { return Promise.reject(e); } } f();`
//
// Only covers async function where the await keyword is not used (mostly obfuscation, I guess?).
//
// We can transform when:
// - all calls of this function ignore the result
// - all calls of the function store the result but that value can be proven not to be awaited (array.some)
// - all calls of the function do await the value, then I think the function itself no longer needs the async keyword
//

import walk from '../../lib/walk.mjs';
import * as AST from '../ast.mjs';
import { ASSERT, log, group, groupEnd, vlog, vgroup, vgroupEnd, tmat, fmat, source, assertNoDupeNodes, rule, example, before, after, todo, currentState, } from '../utils.mjs';
import { SYMBOL_DOTCALL } from '../symbols_preval.mjs';
import { symbo } from '../symbols_builtins.mjs';
import { createFreshVar } from '../bindings.mjs';

export function fakesync(fdata) {
  group('\n\n\n[fakesync] Check for async functions to deasyncify\n');
  //currentState(fdata, 'fakesync', true, fdata);
  const r = _fakesync(fdata);
  groupEnd();
  return r;
}

export function _fakesync(fdata) {
  const ast = fdata.tenkoOutput.ast;

  let changed = 0;
  const queue = []; // not sorted like usual!

  fdata.globallyUniqueNamingRegistry.forEach((meta, funcName) => {
    if (!meta.isConstant) return;
    if (meta.writes.length !== 1) return;
    if (!meta.reads.length) return;
    const funcNode = meta.varDeclRef.node;
    if (funcNode.type !== 'FunctionExpression') return;
    if (!funcNode.async) return;
    if (funcNode.$p.usesAwait) return;

    vgroup('- Have async function without await:', funcName);
    processFunc(meta, funcName, funcNode);
    vgroupEnd();
  });
  function processFunc(meta, funcName, funcNode) {
    if (funcNode.generator) return vlog('- bail: async generators may be a special breed requiring further thinking');

    // All reads must call the function, one way or another.
    // I don't think free functions are ever async so we'll skip that case for now.

    if (funcNode.name === '$free') {
      todo('found a $free function that is async which I dont think is what I expect here');
      return vlog('- bail: free functions dont async? whats going on here.');
    }

    vgroup('- Looping over reads now');
    const ok = meta.reads.every(read => {
      if (read.parentNode.type !== 'CallExpression') return vlog('- bail: at least one read is not in a call expression');
      if (read.parentNode.callee.type !== 'Identifier') return vlog('- bail: parent callee was not identifier (??)', read.parentNode.callee.type);
      if (read.parentNode.callee.name === funcName) return true;
      if (read.parentNode.callee.name === SYMBOL_DOTCALL && read.parentIndex === 0) return true; // when dotcalled must be first arg
      if (read.parentNode.callee.name === SYMBOL_DOTCALL && read.parentIndex === 0) todo('fakesync when function is used in context');


      // For some functions we can know or trace how the function is used.
      if (read.parentNode.callee.name === SYMBOL_DOTCALL && read.parentNode.arguments[0]?.type === 'Identifier') {
        if (read.parentNode.arguments[0].name === symbo('array', 'forEach') && read.parentIndex === 3 + 0) {
          // callback result is ignored. for_each is transformed when the array is known but otherwise it's left about.
          return true;
        }
      }

      return vlog('- bail: at least one ref of function is not a call', read.parentNode.callee.name);
    });
    vgroupEnd();
    if (!ok) return;

    const write = meta.writes[0];

    // Now we must validate how the returned value is used. There are basically three cases:
    // - return value is not used at all (call is a statement) (this also counts as a 'never awaited' case)
    // - we can prove that return value is never awaited, maybe bool tested etc
    // - we can prove that return value is always awaited (only/first?)
    // The function itself does not await. As such it's effectively sync except for the return value / throws.
    // So whether the value is awaited or not, the basic transform should be valid regardless.
    // The result can then be refined, generically, by different reducers.

    let seenAwaited = false;
    let seenUnawaited = false;
    let seenUnknown = false;

    // Stop at first unknown because that forces the worst case
    meta.reads.some(read => {
      if (read.parentNode.type === 'ExpressionStatement' && read.parentProp === 'expression') {
        seenUnawaited = true;
      }
      else if (read.parentNode.type === 'VarStatement') {
        // Verify whether this binding is immediately awaited. Do it the AST way: check for var, assign, and stmt.
        const next = read.blockBody[read.blockIndex + 1];
        if (next) {
          let expr;
          if (next.type === 'VarStatement') expr = next.init;
          else if (next.type === 'ExpressionStatement') {
            if (next.expression.type === 'AssignmentExpression') expr = next.right;
            else expr = next.expression;
          }

          if (expr?.type === 'AwaitExpression' && expr.argument.type === 'Identifier' && expr.argument.name === read.parentNode.id.name) {
            seenAwaited = true;
          } else {
            seenUnknown = true;
            return true;
          }
        } else {
          seenUnknown = true;
          return true;
        }
      }
      else if (
        read.parentNode.type === 'ExpressionStatement' &&
        read.parentNode.expression.type === 'AssignmentExpression' &&
        read.parentNode.expression.left.type === 'Identifier'
      ) {
        // Verify whether this binding is immediately awaited. Similar to the var case but slightly trickier, I think.
        const next = read.blockBody[read.blockIndex + 1];
        if (next) {
          let expr;
          if (next.type === 'VarStatement') expr = next.init;
          else if (next.type === 'ExpressionStatement') {
            if (next.expression.type === 'AssignmentExpression') expr = next.right;
            else expr = next.expression;
          }

          if (expr?.type === 'AwaitExpression' && expr.argument.type === 'Identifier' && expr.argument.name === read.parentNode.expression.left.name) {
            seenAwaited = true;
          } else {
            seenUnknown = true;
            return true;
          }
        } else {
          seenUnknown = true;
          return true;
        }
      }
      else {
        seenUnknown = true;
        return true;
      }
    });

    // When we don't know, or we have seen both with and without await, we have to take the most conservative approach
    if (seenUnknown || (seenAwaited && seenUnawaited)) {
      rule('An async function that does not await can drop the async keyword; some calls are unknown');
      // Contrived example; we can outline this function call
      example('async function f(x) { $(x); } $(f(1));', 'function f(x) { try { $(x); return Promise.resolve(undefined); } catch (e) { return Promise.reject(e); } } $(f(1));');
      before(write.blockBody[write.blockIndex]);

      const tmp = createFreshVar('tmpRejectErr', fdata);

      funcNode.async = false;
      // Must visit the node and replace all `return arg` with `return promise.resolve(arg)`. Except perhaps when this is already returning a promise.* call.
      walk(_walker, funcNode.body, 'body');
      function _walker(node, beforeWalk, nodeType, path) {
        if (beforeWalk) return;
        if (node.type === 'FunctionExpression') return false; // do not go into nested functions
        if (node.type === 'ReturnStatement') {
          const parentNode = path.nodes[path.nodes.length - 2];
          const parentProp = path.props[path.props.length - 1];
          const parentIndex = path.indexes[path.indexes.length - 1];
          // `return x` -> `if (true) { const tmp = $promise_resolve(x); return tmp; }`, which is flattened in a queue.
          // all returns should ever be considered once by this reducer so a single queue should be safe
          // Note: using `if(true)` as a hack because this reducer may nest and if I use a block to squash then it may squash in the wrong parent
          const tmp = createFreshVar('tmpResolveVal', fdata);
          // Return so index >=0
          parentNode[parentProp][parentIndex] = AST.ifStatement(AST.tru(), AST.blockStatement(
            AST.varStatement('const', tmp, AST.callExpression(AST.identifier(symbo('Promise', 'resolve')), [node.argument])),
            AST.returnStatement(AST.identifier(tmp))
          ), AST.blockStatement());
        }
      }
      // Do this after the walk otherwise this new return also gets transformed
      // In fact, we need to do this after the first queue because we need to retain the blockBody reference, even in the first queue
      const tmp2 = createFreshVar('tmpRejectVal', fdata);
      // I think this replace should happen once per body and as such the order is not relevant
      queue.push(() => {
        vlog('queue2:', funcNode.$p.bodyOffset);
        ASSERT(funcNode.body.body[funcNode.$p.bodyOffset-1].type === 'DebuggerStatement', 'body offset should not be stale', funcNode.$p.bodyOffset, funcNode.body.body[funcNode.$p.bodyOffset-1].type, funcNode.body.body);
        const oldBody = funcNode.body.body.slice(funcNode.$p.bodyOffset);
        funcNode.body.body.length = funcNode.$p.bodyOffset;
        funcNode.body.body.push(
          AST.tryStatement(
            AST.blockStatement(oldBody),
            AST.identifier(tmp),
            AST.blockStatement(
              AST.varStatement('const', tmp2, AST.callExpression(
                AST.identifier(symbo('Promise', 'reject')),
                [
                  AST.identifier(tmp)
                ]
              )),
              AST.returnStatement(
                AST.identifier(tmp2)
              )
            )
          )
        );
        vlog('With try/catch wrapper:');
        after(funcNode);
      });
      vlog('Without try/catch wrapper (that is queued):');
      after(write.blockBody[write.blockIndex]);
      changed = changed + 1;
      return;
    } else {
      // When the result is awaited, we don't have to promise box the results but we do have to try/catch wrap to preserve
      // tick order. The error is still thrown immediately, except with a promise tick in between. It's just not the same.
      // When the result is not awaited, we have to try wrap to prevent the error at all. Boxing the results is irrelevant.

      rule('An async function that does not await can drop the async keyword; all calls are statements');
      // Contrived example; we can outline this function call. Important in this case is not needing to Promise box the return values.
      example('async function f(x) { $(x); } f(1);', 'function f(x) { try { $(x); } catch (e) { } } f(1);');
      before(write.blockBody[write.blockIndex]);

      const tmp = createFreshVar('tmpRejectErr', fdata);

      // Unlike above, we don't walk the body to box returns. Antoher resolver can normalize the unused return values to undefined.
      funcNode.async = false;
      // In the "calls are statements" flow, we do need to try/catch wrap the body to prevent sync error propagation.
      // Do this after the first queue because we need to retain the blockBody reference, even in the first queue
      const tmp2 = createFreshVar('tmpRejectVal', fdata);
      // I think this replace should happen once per body and as such the order is not relevant
      queue.push(() => {
        const oldBody = funcNode.body.body.slice(funcNode.$p.bodyOffset);
        funcNode.body.body.length = funcNode.$p.bodyOffset;
        funcNode.body.body.push(
          AST.tryStatement(
            AST.blockStatement(oldBody),
            AST.identifier(tmp),
            AST.blockStatement(
              // No need to propagate the error. We know the call result is not used.
              AST.returnStatement(AST.undef())
            )
          )
        );
        vlog('With simple try/catch wrapper:');
        after(write.blockBody[write.blockIndex]);
      });
      vlog('Without try/catch wrapper (that is queued):');
      after(write.blockBody[write.blockIndex]);
      changed = changed + 1;
      return;
    }
  }

  assertNoDupeNodes(ast, 'body');

  if (changed) {
    queue.forEach(func => func());

    log('Async functions deasyncified:', changed, '. Restarting from phase1');
    return {what: 'fakesync', changes: changed, next: 'phase1'};
  }

  log('Async functions deasyncified: 0.');
}
