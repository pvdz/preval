// Find functions that are only used in a call and only once and inline it if all other conditions are met

import walk from '../../lib/walk.mjs';
import {
  ASSERT,
  assertNoDupeNodes,
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
import { createFreshLabelStatement } from '../labels.mjs';

export function inlineOneTimeFunctions(fdata) {
  group('\n\n\n[inlineOneTimeFunctions] Checking for functions that are called once');
  //currentState(fdata, 'inlineOneTimeFunctions'. true);
  const r = _inlineOneTimeFunctions(fdata);
  groupEnd();
  return r;
}
function _inlineOneTimeFunctions(fdata) {
  // A function that is called once should be inlined
  // If nothing lese, this is a common artifact of switch/label elimination transforms
  // There are a few conditions to take into account;
  // - The function has exactly one reference and that reference is as the callee of a CallExpression
  // - The function does not reference `arguments` or `this`
  // - The function or the function containing the call does not have any branching (if/else, block, loop)
  //   - We may work around certain cases here, like `arguments.callee` if the arg list is simple
  // - If the call contains spread
  //   - If the params on the same and later indexes are never used then this may be fine
  // - If the param contains rest
  //   - We can often work around this but not always
  // - If the function contains yield or await
  //   - (just bail for async/generator functions)
  // - If the call is recursive; called inside its own function (even nested inside another function)
  // A non-branching function should be inline-able with little effort
  // If the function has branching then early completions may be hard to work with
  // In normalized code, the call can only be a statement, assignment rhs, or var decl init and the
  // return value of the function should replace the call in all three cases.
  // TODO: and not method?

  const queue = [];
  const results = []; // The label nodes, for debugging
  let inlined = 0;

  //assertNoDupeNodes(fdata.tenkoOutput.ast, 'ast');

  fdata.globallyUniqueNamingRegistry.forEach(function (funcMeta, funcName) {
    if (funcMeta.isBuiltin) return;
    if (funcMeta.isImplicitGlobal) return;
    if (!funcMeta.isConstant) return;

    ASSERT(funcMeta.writes.length === 1, 'fix me if we somehow allow constants to be written to more than once. This transform would probably break it.', funcName, 'is a constant but has', funcMeta.writes.length, 'writes so thats odd'); // We drop the decl so if this is not the case, we break stuff.

    vgroup(
      '- `' + funcMeta.uniqueName + '`:',
      funcMeta.varDeclRef.node.type,
      ', writes:',
      funcMeta.writes.length,
      ', reads:',
      funcMeta.reads.length,
      ', first read type:',
      funcMeta.reads[0]?.node?.type,
    );

    if (funcMeta.reads.length !== 1) {
      vlog('Not a single read, bailing');
      vgroupEnd();
      return;
    }

    const funcNode = funcMeta.varDeclRef.node;
    if (funcNode.type !== 'FunctionExpression') {
      vlog('Constant is not a function, bailing');
      vgroupEnd();
      return;
    }

    if (funcNode.id?.name === '$free') {
      vlog('Constant is a $free function, bailing');
      vgroupEnd();
      return;
    }

    if (funcNode.async || funcNode.generator) {
      vlog('Function is async or a generator, bailing');
      vgroupEnd();
      return;
    }

    const read = funcMeta.reads[0];
    if (read.parentNode.type !== 'CallExpression' || read.parentProp !== 'callee') {
      vlog('The read is not the callee to a call expression, bailing');
      vgroupEnd();
      return;
    }

    if (read.blockChain.startsWith(funcMeta.writes[0].blockChain + funcNode.body.$p.pid)) {
      // This may also catch recursive calls within nested functions but for now that's the way it is.
      // Assumes a particular structure of the blockChain, not sure if there's a better way right now.
      vlog('The blockChain of the write is a prefix of the read, this implies recursion, bailing');
      vgroupEnd();
      return;
    }

    const params = funcNode.params;

    // So this function is a constant and is only used in a call
    // Is there a rest? If so let's bail for now. We can partially support that later.
    if (params[params.length - 1]?.rest) {
      vlog('Func contains rest param. Bailing for now');
      vgroupEnd();
      return;
    }

    // Does it reference this/arguments?
    if (funcNode.$p.readsArgumentsAny || funcNode.$p.readsArgumentsLen || funcNode.$p.thisAccess) {
      vlog('Function reads this or arguments so we bail, for now');
      vgroupEnd();
      return;
    }

    if (read.parentNode['arguments'].some((anode) => anode.type === 'SpreadElement')) {
      vlog('The call used a spread so we must be bail for now');
      vgroupEnd();
      return;
    }

    ASSERT(funcMeta.writes.length === 1);
    const write = funcMeta.writes[0];
    if (write.kind !== 'var') {
      vlog('The func write was not a var. Bailing');
      vgroupEnd();
      return;
    }

    vlog('Read funcChain:', read.funcChain, ', func readBlock:', funcNode.$p.funcChain);
    if (read.funcChain.startsWith(funcNode.$p.funcChain)) {
      vlog('This call was nested inside the function being called (recursion). This action would implode the function. Bailing.');
      vgroupEnd();
      return;
    }

    // We should be able to inline this call
    queueForInlining(funcNode, funcName, read, write);

    vgroupEnd();
  });

  function queueForInlining(funcNode, funcName, read, write) {
    ++inlined;

    // We must
    // - map all the params of the func to the arguments of the call
    // - wrap the function body in a label
    // - transform all return statements with
    //   - do whatever the original call site did with the return value (in normalized code, thats decl ini, assign, or nothing)
    //   - replace with a break to the new label
    // Make sure to do each step separately in pid order, otherwise two functions may interfere with each other.

    // The body of the function remains the same, we just transfer it to the label
    // and replace the function decl with the label decl.
    // `const f = function(){ return 1; }; ... const r = f();`
    // `; ... let r; F: { r = 1; break F; };`

    let kind =
      read.blockBody[read.blockIndex].type === 'VarStatement'
      ? 'decl'
      : read.blockBody[read.blockIndex].type !== 'ExpressionStatement'
      ? ASSERT(false, 'what can this be in normalized code', read.blockBody[read.blockIndex].type, read.blockBody[read.blockIndex].name) // ???
      : read.blockBody[read.blockIndex].expression.type === 'AssignmentExpression'
      ? 'assign'
      : read.blockBody[read.blockIndex].expression.type === 'CallExpression'
      ? 'stmt'
      : ASSERT(false, 'what can this be in normalized code', read.blockBody[read.blockIndex].expression.type, read.blockBody[read.blockIndex].expression.name) // ???
    ;

    vlog('Function [' + funcNode.$p.pid + '] (', funcName, ') is called (', kind, ') and referenced exactly once and meets all other conditions. Adding it to the queue.');

    rule('A function that is called one time can be inlined; before');
    example('const f = function(a, b){ g(a); return b; }; const x = f(1, 2);', 'let x = undefined; A: { const a = 1; const b = 2; x = b; }', kind === 'decl');
    example('const f = function(a, b){ g(a); return b; }; x = f(1, 2);', 'A: { const a = 1; const b = 2; x = b; }', kind === 'assign');
    example('const f = function(a, b){ g(a); return b; }; f(1, 2);', 'A: { const a = 1; const b = 2; b; }', kind === 'call');
    before(funcNode);
    before(read.blockBody[read.blockIndex]);

    const newLabelWrapper = createFreshLabelStatement('$inlinedFunction', fdata, funcNode.body);
    results.push(newLabelWrapper);
    const wrapperLabelName = newLabelWrapper.label.name;
    const lhsNode = kind === 'decl'
      ? read.blockBody[read.blockIndex].id
      : kind === 'assign'
      ? read.blockBody[read.blockIndex].expression.left // May be member expression
      : undefined;

    // Replace all returns with assign+break.
    // Every replace gets scheduled separately as it may change index positions and break caches.

    function _walker(node, beforeWalk, nodeType, path) {
      if (!beforeWalk) return;
      switch (node.type) {
        case 'ReturnStatement': {
          vlog('Scheduling return replacement for pid', +node.$p.pid);
          const parentNode = path.nodes[path.nodes.length - 2];
          //const parentProp = path.props[path.props.length - 1]; // body
          const parentIndex = path.indexes[path.indexes.length - 1];
          queue.push({
            pid: +node.$p.pid,
            func: () => {
              rule('Inlining function: return statements should become assigns of return value and break to label');
              example('function f(){ return x; }', 'A: { x; break A; }', () => kind === 'stmt');
              example('function f(){ return x; }', 'A: { r = x; break A; }', () => kind !== 'stmt');
              before(parentNode.body[parentIndex]);

              parentNode.body.splice(
                parentIndex,
                1,
                AST.expressionStatement(kind === 'stmt' ? node.argument : AST.assignmentExpression(AST.cloneSimple(lhsNode), node.argument)),
                AST.breakStatement(wrapperLabelName),
              );

              after(parentNode.body[parentIndex]);
              after(parentNode.body[parentIndex + 1]);
              assertNoDupeNodes(parentNode, 'body');
            }
          });

          break;
        }
        case 'FunctionExpression': {
          if (node !== funcNode) {
            return true; // Do not traverse
          }
          break; // Initial
        }
      }
    }
    vgroup('Scheduling Return statements replacements');
    walk(_walker, funcNode, 'body');
    vgroupEnd();

    vlog('Schedule elimination of the function decl');
    queue.push({
      pid: +write.node.$p.pid,
      func: () => {
        // Replace the function with empty statement

        rule('Inlining function: function decl itself is eliminated');
        example('function f(){}', ';');
        before(write.blockBody[write.blockIndex]);

        write.blockBody[write.blockIndex] = AST.emptyStatement();

        after(write.blockBody[write.blockIndex]);
      }
    });

    vlog('Schedule elimination of the call replacement');
    queue.push({
      pid: +read.node.$p.pid,
      func: () => {
        // - move func body to be the body of a fresh label
        //   - if the call was a var decl or assignment, replace all returns with `x = returnValue; break label`
        //   - otherwise, just replace them with break label
        // - in the function body, replace Param nodes with their respective call arg nodes
        // - replace call
        //   - if it was a var decl, change it to a let and init to undefined, then append the label after it
        //   - else, just replace the original call statement with the label

        const params = funcNode.params;
        const args = read.parentNode['arguments'];

        // Replace params with call args

        // These indexes should be the same so no need to queue them separately
        vgroup('Copying', params.length, 'call args to replace param inits');
        params.forEach((pnode, i) => {
          if (pnode.$p.paramVarDeclRef) {
            vlog('- Copying argument', i);

            rule('Inlining function: param init nodes get replaced with call arg nodes at same index');
            example('const f = function($$1) { const a = $$1; ... }; f(xyz);', 'const f = A { const a = xyz; ... };');
            before(pnode.$p.paramVarDeclRef.blockBody);
            before(pnode.$p.paramVarDeclRef.blockBody[pnode.$p.paramVarDeclRef.blockIndex]);

            if (args[i]) {
              pnode.$p.paramVarDeclRef.blockBody[pnode.$p.paramVarDeclRef.blockIndex].init = args[i];
            } else {
              pnode.$p.paramVarDeclRef.blockBody[pnode.$p.paramVarDeclRef.blockIndex].init = AST.identifier('undefined');
            }
            after(pnode.$p.paramVarDeclRef.blockBody[pnode.$p.paramVarDeclRef.blockIndex]);
          } else {
            // TODO: This hides TDZ errors we should keep the arg around
            vlog('Warning: Argument', i, 'is unused, skipping, this may lead to hiding TDZ errors');
          }
        });
        vgroupEnd();
        if (params.length < args.length) {
          // TODO: This hides TDZ errors we should keep the arg around
          vlog('Warning: there are more arguments to the call than params, this may lead to hiding TDZ errors');
        }

        // Now that we've eliminated the Params, we should be able to eliminate the Debugger
        // "function header" without disturbing anything else for this transform
        ASSERT(funcNode.body.body[funcNode.$p.bodyOffset-1]?.type === 'DebuggerStatement', 'should still be warm cache', funcNode.$p.bodyOffset, funcNode.body.body[funcNode.$p.bodyOffset-1]);
        funcNode.body.body[funcNode.$p.bodyOffset-1] = AST.emptyStatement();

        // Replace the statement with call with maybe a let decl and with the label.
        rule('A function that is called one time can be inlined; replace statement step')
        example('function f(){ return 1; } f();', 'A: { 1; }', () => kind === 'stmt');
        example('function f(){ return 1; } x = f();', 'A: { x = 1; }', () => kind === 'assign');
        example('function f(){ return 1; } const x = f();', 'let x = undefined; A: { x = 1; }', () => kind === 'decl');
        before(read.blockBody[read.blockIndex]);

        vlog('Kind=', kind);

        read.blockBody.splice(
          read.blockIndex, 1,
          ...kind === 'decl' ? [AST.varStatement('let', lhsNode, AST.undef())] : [],
          newLabelWrapper
        );

        after(read.blockBody[read.blockIndex]);
        if (kind === 'decl') after(read.blockBody[read.blockIndex + 1]);
      }
    });
  }

  if (queue.length) {
    vlog('Now running the queued changes...', queue.length);

    queue.sort(({ pid: a }, { pid: b }) => (a < b ? 1 : a > b ? -1 : 0));
    queue.forEach(({ func }) => func());

    // Note: because we remove the function separately from the call, the AST will have dupe nodes
    //       in between. That's expected and fine.
    assertNoDupeNodes(fdata.tenkoOutput.ast, 'body');

    vlog('End results, the new label statement for each transformed function:');
    results.forEach(label => {
      after(label);
    });

    log('Single calls inlined:', inlined, '. Restarting from normalization');
    return {what: 'inlineOneTimeFunctions', changes: inlined, next: 'normal'};
  }
  log('Single calls inlined: 0.');
}
