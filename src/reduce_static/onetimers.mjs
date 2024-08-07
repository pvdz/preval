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
  group('\n\n\nChecking for functions that are called once');
  //vlog('\nCurrent state\n--------------\n' + fmat(tmat(fdata.tenkoOutput.ast)) + '\n--------------\n');
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
  fdata.globallyUniqueNamingRegistry.forEach(function (funcMeta, funcName) {
    if (funcMeta.isBuiltin) return;
    if (funcMeta.isImplicitGlobal) return;
    if (!funcMeta.isConstant) return;

    ASSERT(funcMeta.writes.length === 1, 'fix me if we somehow allow constants to be written to more than once. This transform would probably break it.', funcName, 'is a constant but has', funcMeta.writes.length, 'writes so thats odd'); // We drop the decl so if this is not the case, we break stuff.

    vgroup(
      '- `' + funcMeta.uniqueName + '`:',
      funcMeta.constValueRef.node.type,
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

    const funcNode = funcMeta.constValueRef.node;
    if (funcNode.type !== 'FunctionExpression') {
      vlog('Constant is not a function, bailing');
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

    // This exception is only relevant when aiming for a "single branch per function" state
    //if (funcNode.$p.hasBranch && read.pfuncNode.$p.hasBranch) {
    //  // We strive for a max of one branch per function so do not merge functions that both have one
    //  // A branch is an if or a loop (while, for-x) or a catch. Other types (do-while, for, switch, logic operators,
    //  // conditional operators, ternary operator) are all gone at this point.
    //  vlog('The called function and the calling function both have a branch so we cant inline');
    //  vgroupEnd();
    //  return;
    //}

    const write = funcMeta.writes[0];
    if (write.kind !== 'var') {
      vlog('The func write was not a var. Bailing');
      vgroupEnd();
      return;
    }

    vlog('Read funcChain:', read.funcChain, ', func readBlock:', funcNode.$p.funcChain);
    if (read.funcChain !== funcNode.$p.funcChain && read.funcChain.startsWith(funcNode.$p.funcChain)) {
      vlog('This call was nested inside the function being called (recursion). This action would implode the function. Bailing.');
      vgroupEnd();
      return;
    }

    // We should be able to inline this call
    // We must
    // - map all the params of the func to the arguments of the call
    // - wrap the function body in a label
    // - transform all return statements with
    //   - do whatever the original call site did with the return value (in normalized code, thats decl ini, assign, or nothing)
    //   - replace with a break to the new label

    const debugCode = '<' + read.node.$p.pid + ':' + read.node.$p.funcDepth + '>';

    vlog('Function [' + funcNode.$p.pid + '] is called and referenced exactly once and meets all other conditions');
    vlog(` - queued \`${funcMeta.uniqueName}\`; ${debugCode}`);
    queue.push({
      pid: +read.node.$p.pid,
      depth: read.node.$p.funcDepth,
      blockRefBak: read.blockBody[read.blockIndex],
      debugCode,
      read,
      write /*body: read.blockBody, index: read.blockIndex*/,
      funcNode,
      meta: funcMeta,
    });

    vgroupEnd();
  });

  log('Attempting to inline', queue.length, 'function calls.');
  let actuallyInlined = 0;
  if (queue.length > 0) {
    // We want to apply the splices back to front, or reverse source code order
    // There's currently no guarantee about the order of the queue so we can't just reverse it.
    // The pid is guaranteed fresh and incremental in traversal order so we use that to sort.
    queue.sort(({ pid: a }, { pid: b }) => b-a);

    let inlined = 0;

    // Inline functions. Start with the lowest nesting to the least nested, last to first source code order.
    // By starting at the most nested, we prevent less indented inlines from missing indentations from more inlined calls.
    // By going last to first we can freely inject any number of elements into a body without affecting earlier indexes.
    // The call is leading for this order, not the function decl. The call is where arbitrary statements are injected.
    // The function decls are set to an empty statement and do not change any indexes.

    vgroup('There are', queue.length, 'functions queued for inlining');
    queue.forEach(({ specialReturnCase, funcNode, read, write, blockRefBak, debugCode, meta }, i) => {
      vgroup(
        '- queue[' + i + '][' + funcNode.$p.pid + '] ' + debugCode + '; Starting to inline next one-time called function in the queue',
        specialReturnCase ? '(special return trampoline case)' : '',
      );

      // This dirty check is only relevant for the parent since that's where we want to inject new elements
      // so if that's no longer attached to the AST or changed order or smth then we want to skip here.
      // We need to check it for the current function as well because flags like hasBranch and returnsEarly may have changed.
      if (read.pfuncNode.$p.oneTimerDirty || funcNode.$p.oneTimerDirty) {
        ASSERT(inlined > 0, 'must have inlined one already for this state to be set');
        vlog('This function had at least one function flattened into it in this pass so it will need another phase1 pass first');
        vgroupEnd();
        return;
      }

      ASSERT(
        read.blockBody[read.blockIndex] === blockRefBak,
        'the functions should be unwound backwards and prevent staling these references...',
      );

      const funcBody = funcNode.body.body;
      const params = funcNode.params;
      const args = read.parentNode['arguments'];

      ++inlined;
      ++actuallyInlined;
      rule('Function that is only used in a call once should be inlined');
      // There are three cases to consider; statement-call, statement-assignment, vardecl-init
      example('function f(a){ g(a); return 2; } f(1);', 'A: { g(1); break A; }');
      example('function f(a){ g(a); return 2; } x = f(1);', 'A: { g(1); x = 2; break A; }');
      example('function f(a){ g(a); return 2; } const x = f(1);', 'let x; A: { g(1); x = 2; break A; }');
      // Cases where the function ends in if/else
      example('function f(a){ if (foo) { g(a); return 2; } else { h(a); return 3; } } f(1);', 'A: { if (foo) { g(a); break A; } else { h(a); break A; } }');
      example('function f(a){ if (foo) { g(a); return 2; } else { h(a); return 3; } } x = f(1);', 'A: { if (foo) { g(a); x=2; break A; } else { h(a); x=2; break A; } }');
      example('function f(a){ if (foo) { g(a); return 2; } else { h(a); return 3; } } const x = f(1);', 'let x; A: { if (foo) { g(a); x=2; break A; } else { h(a); x=2; break A; } }');

      before(write.blockBody[write.blockIndex], write.blockBody);
      before(read.blockBody[read.blockIndex], write.blockBody !== read.blockBody ? write.blockBody : null);

      const newLabelWrapper = createFreshLabelStatement('$inlinedFunction', fdata, funcNode.body);
      const wrapperLabelName = newLabelWrapper.label.name;

      // Steps to complete:
      // - Replace all return statements with return value handling and breaking to label
      //   - value handling depends on function call, nothing, assign, or var decl
      //   - if var decl then create let before the new label block
      // - Assign used arguments to params in the func header
      // - Remove function header debugger statement
      // - Remove statement with original func decl


      // First check what the call did with the return value. This determines how to transform the Return.
      // Note: each usage of this receiverNode must clone it. It should be a SimpleNode already.
      let receiverNode;
      let callWasDecl = false;
      if (read.blockBody[read.blockIndex].type === 'ExpressionStatement' && read.blockBody[read.blockIndex].expression.type === 'AssignmentExpression') {
        receiverNode = read.blockBody[read.blockIndex].expression.left;
      } else if (read.blockBody[read.blockIndex].type === 'VariableDeclaration') {
        receiverNode = read.blockBody[read.blockIndex].declarations[0].id;
        callWasDecl = true;
      } else {
        ASSERT(read.blockBody[read.blockIndex].type === 'ExpressionStatement' && read.blockBody[read.blockIndex].expression.type === 'CallExpression', 'what else?', read.blockBody[read.blockIndex]);
        // In this case we don't set a receiverNode because the return value of the call is not stored
      }

      if (params.length) {
        vgroup('Copying call args to param inits for each param');
        params.forEach((pnode, i) => {
          before(pnode.$p.paramVarDeclRef.blockBody[pnode.$p.paramVarDeclRef.blockIndex]);
          if (read.parentNode.arguments[i]) {
            pnode.$p.paramVarDeclRef.blockBody[pnode.$p.paramVarDeclRef.blockIndex].declarations[0].init = read.parentNode.arguments[i];
          } else {
            pnode.$p.paramVarDeclRef.blockBody[pnode.$p.paramVarDeclRef.blockIndex].declarations[0].init = AST.identifier('undefined');
          }
          after(pnode.$p.paramVarDeclRef.blockBody[pnode.$p.paramVarDeclRef.blockIndex]);
        });
        vgroupEnd();
      } else {
        vlog('No params to inline');
      }

      ASSERT(funcNode.body.body[funcNode.$p.bodyOffset - 1]?.type === 'DebuggerStatement', 'bodyOffset should not be stale', funcNode.body.body[funcNode.$p.bodyOffset]);
      funcNode.body.body[funcNode.$p.bodyOffset - 1] = AST.emptyStatement();

      function _walker(node, beforeWalk, nodeType, path) {
        switch (`${node.type}:${beforeWalk?'before':'after'}`) {
          case 'ReturnStatement:before': {
            before(node);

            const parentNode = path.nodes[path.nodes.length - 2];
            const parentProp = path.props[path.props.length - 1];
            const parentIndex = path.indexes[path.indexes.length - 1];

            const clonedValueNode = AST.cloneSimple(node.argument);
            parentNode.body[parentIndex] = AST.blockStatement(
              AST.expressionStatement(receiverNode ? AST.assignmentExpression(AST.cloneSimple(receiverNode), clonedValueNode) : clonedValueNode),
              AST.breakStatement(wrapperLabelName),
            );

            after(parentNode.body[parentIndex]);
            break;
          }
          case 'FunctionExpression:before': {
            if (node !== funcNode) {
              return true; // Do not traverse
            }
            break; // Initial
          }
        }
      }
      vgroup('Replacing Return statements');
      walk(_walker, funcNode, 'body');
      vgroupEnd();

      ASSERT(!callWasDecl || receiverNode.type === 'Identifier', 'var decls must be idents', receiverNode);
      read.blockBody.splice(
        read.blockIndex,
        1,
        callWasDecl ? AST.variableDeclaration(receiverNode, AST.identifier('undefined'), 'let') : AST.emptyStatement(),
        newLabelWrapper
      );

      write.blockBody[write.blockIndex] = AST.emptyStatement();
      after(read.blockBody[read.blockIndex], read.blockBody);

      //endoftheline
      //
      //// Must now inject a const for each param name, with the init being the arg at the same index.
      //// We can't just inline-replace them because it is possible to assign to param names and if
      //// we replace them then this may fail. Consider;
      //// `function f(a){$(a); a=10; $(a);} f(2)`
      //// If we replace then it becomes `$(2); a=10; $(2);`, which is not the same as `const x=2; $(x); x=10; $(x);`
      //// The constants will be SSA'd or eliminated entirely by other rules.
      //
      //let headerSize = -1;
      //funcNode.body.body.some((pnode, pi) => {
      //  if (pnode.type === 'DebuggerStatement') {
      //    headerSize = pi + 1; // If header is empty, debugger is first statement, pi=0
      //    return true;
      //  }
      //  if (pnode.type === 'EmptyStatement') {
      //    // We inject those. Ignore.
      //    return;
      //  }
      //  ASSERT(pnode.type === 'VariableDeclaration', 'fixme if this invariant changes but fucn header only has var decls rn', pnode);
      //  const init = pnode.declarations[0].init;
      //  ASSERT(
      //    init.type === 'Param',
      //    'funcs that reference `this` or `arguments` were filtered out so only param inits should exist in the heder... did this chnage?',
      //    pnode,
      //    init,
      //  );
      //});
      //ASSERT(headerSize >= 0, 'the func should have a debugger statement indicating the end of our func header');
      //
      //const collected = [];
      //funcNode.params.forEach((pnode, pi) => {
      //  // Unused params have no ref (?)
      //  if (pnode.$p.paramVarDeclRef) {
      //    collected.push(AST.variableDeclaration(pnode.$p.paramVarDeclRef.name, args[pi] ? args[pi] : AST.identifier('undefined'), 'let'));
      //  }
      //});
      //
      //funcNode.body.body.splice(0, headerSize); // Drop all param inits and the debugger statement (our header marker)
      //funcNode.body.body.unshift(...collected);
      //
      //vlog('After replacing params with args:');
      //source(funcNode);
      //
      //if (read.grandNode.type === 'AwaitExpression' || read.grandNode.type === 'YieldExpression') {
      //  // The read should be the object of a call so we check whether that's the arg of an await or yield, which would be the grand
      //  console.log('Going to blow up now...');
      //  source(fdata.tenkoOutput.ast, true);
      //}
      //ASSERT(read.grandNode.type !== 'AwaitExpression', 'normalized await expression are not yet supported here...');
      //ASSERT(read.grandNode.type !== 'YieldExpression', 'normalized yield expression are not yet supported here...');
      //ASSERT(
      //  ['ExpressionStatement', 'AssignmentExpression', 'VariableDeclarator'].includes(read.grandNode.type),
      //  `normalized calls can only appear in three ways but this was a ${read.grandNode.type}`,
      //  read.parentNode,
      //);
      //ASSERT(read.parentIndex < 0, 'in all three cases the parent should not be an array');
      //
      //vlog('Making sure call is properly replaced with final value (init/rhs)');
      //const lastNode = funcBody[funcBody.length - 1];
      //
      //if (specialReturnCase) {
      //  vlog('This is the special "early return" + "trampoline return" case. Keep the return statements. Remove the trampoline.');
      //  before(funcBody[funcBody.length - 1]);
      //  before(read.blockBody[read.blockIndex]);
      //  before(read.blockBody[read.blockIndex + 1]);
      //
      //  read.blockBody[read.blockIndex] = AST.emptyStatement();
      //  read.blockBody[read.blockIndex + 1] = AST.emptyStatement();
      //
      //  after(read.blockBody[read.blockIndex]);
      //  after(read.blockBody[read.blockIndex + 1]);
      //} else if (lastNode?.type === 'ReturnStatement') {
      //  // The simple case because it does not matter whether the call was a var, assign, or stmt.
      //  vlog('Last node of func body is a `return`');
      //  // Replace the call with the argument of this return statement
      //  // When normalized, the call can only exist as a statement, rhs of assignment, or init of var decl
      //  // This means, if we care to replace it at all, then the index must be -1
      //  before(funcBody[funcBody.length - 1]);
      //  funcBody[funcBody.length - 1] = AST.emptyStatement();
      //  vlog('Dropped the return statement from the function');
      //  after(funcBody[funcBody.length - 1]);
      //
      //  // The parentNode must be a CallExpression. Replace it entirely with the final return value of the func.
      //  // The rest of the func is injected before the line of the call expr. It was checked not to return early.
      //  vlog('Replacing whole call expression with return.argument expression');
      //  ASSERT(lastNode.argument, 'normalized code must have explicit return values');
      //  ASSERT(read.parentNode.type === 'CallExpression', 'the read was a call, right?', read.parentNode);
      //  ASSERT(read.grandNode[read.grandProp] === read.parentNode, 'checking just in case');
      //  before(read.blockBody[read.blockIndex]);
      //  // Inject an empty statement. The body injection below assumes the index to be moved one.
      //  read.grandNode[read.grandProp] = lastNode.argument; // Should not need to clone this...
      //  read.blockBody.splice(read.blockIndex, 0, AST.emptyStatement());
      //  after(read.blockBody[read.blockIndex]);
      //  after(read.blockBody[read.blockIndex + 1]);
      //
      //  vlog('Called function now (this is what will be injected before the line with call expression):');
      //  source(funcNode);
      //  vlog('Owner function now (the one that contained the call expression):');
      //  source(read.pfuncNode);
      //} else {
      //  // This is the harder path because we must recursively check all last nodes of each branch of the `if`
      //  // If the call was a var init, we'll need to first hoist that decl to before this line, otherwise we'll
      //  // be injecting a local scoped variable (multiple times) that may need to be referenced afterwards.
      //  // Let other rules patch this back up through SSA etc, if it doesn't need this hoisting.
      //
      //  let targetName = '';
      //  if (read.grandNode.type === 'VariableDeclarator') {
      //    targetName = read.grandNode.id.name;
      //    vlog(
      //      'The call was init to a var decl `' +
      //        targetName +
      //        '`. Since the last statement of the func is an `if`, we must replace the variable with a `let` to `undefined`',
      //    );
      //    before(read.blockBody[read.blockIndex]);
      //    read.blockBody[read.blockIndex] = AST.variableDeclaration(targetName, 'undefined', 'let');
      //    after(read.blockBody[read.blockIndex]);
      //  } else if (read.grandNode.type === 'AssignmentExpression') {
      //    targetName = read.grandNode.left.name;
      //    vlog(
      //      'The call was the rhs of an assignment to `' +
      //        targetName +
      //        '`. Dropping that line. Return statements should be replaced with assignments of name = return.argument',
      //    );
      //    before(read.blockBody[read.blockIndex]);
      //    read.blockBody[read.blockIndex] = AST.emptyStatement();
      //    after(read.blockBody[read.blockIndex]);
      //  } else {
      //    vlog(
      //      'The call was an expression statement. Dropping that line. Return statements can be dropped entirely (since their arg should be simple nodes).',
      //    );
      //    before(read.blockBody[read.blockIndex]);
      //    read.blockBody[read.blockIndex] = AST.emptyStatement();
      //    after(read.blockBody[read.blockIndex]);
      //  }
      //
      //  source(read.pfuncNode);
      //
      //  vlog('Func may contain any number of return statements, but if so, they must all in a tail position. Replace them all.');
      //
      //  function inlineTail(node) {
      //    const last = node.body[node.body.length - 1];
      //    _inlineTail(node, last);
      //  }
      //  function _inlineTail(node, last) {
      //    vlog('_inlineTail:', node?.type, last.type);
      //    if (last.type === 'IfStatement') {
      //      inlineTail(last.consequent);
      //      inlineTail(last.alternate);
      //      return;
      //    }
      //
      //    if (last.type === 'ReturnStatement') {
      //      if (targetName === '') {
      //        vlog('Dropping a return statement');
      //        before(last);
      //        node.body[node.body.length - 1] = AST.emptyStatement();
      //        after(node.body[node.body.length - 1]);
      //      } else {
      //        vlog('Replacing a return statement with an assignment');
      //        before(last);
      //        node.body[node.body.length - 1] = AST.expressionStatement(AST.assignmentExpression(targetName, last.argument)); // Should not need to clone this
      //        after(node.body[node.body.length - 1]);
      //      }
      //      return;
      //    }
      //
      //    if (['WhileStatement', 'BlockStatement', 'LabeledStatement'].includes(last.type)) {
      //      inlineTail(last.body);
      //      return;
      //    }
      //
      //    if (last.type === 'TryStatement') {
      //      inlineTail(last.block);
      //      inlineTail(last.handler);
      //      return;
      //    }
      //
      //    // What's left that we care about?
      //    return;
      //  }
      //  // TODO: if there are any implicit return points then the call should be replaced by `undefined`, but we currently don't do this...
      //  //       and we can't init it to undefined beforehand because that may be observable if the func refers to the binding
      //  if (
      //    [
      //      'IfStatement',
      //      'ReturnStatement',
      //      'WhileStatement',
      //      'BlockStatement',
      //      'LabeledStatement',
      //      'TryStatement',
      //    ].includes(lastNode.type)
      //  ) {
      //    // Note: undefined makes sure it triggers an error because it is only used when lastNode is a `return` and it won't. shouldn't.
      //    vgroup('Attempting to inline all returns now');
      //    _inlineTail(undefined, lastNode);
      //    vgroupEnd();
      //  } else {
      //    vlog('Last node does not need to be visited to replace returns');
      //  }
      //}
      //
      //// We need to inject afterwards because the var decl case will leave a new var decl behind
      //vlog("Injecting what's left of the original function _after_ the index of the call expr");
      //read.blockBody.splice(read.blockIndex + 1, 0, ...funcBody); // funcBody should now not contain the header, not contain the return statements.
      //
      ////source(read.pfuncNode);
      //
      //assertNoDupeNodes(read.pfuncNode, 'body');
      //assertNoDupeNodes(funcNode, 'body');
      //
      //after(read.pfuncNode);
      //
      ////vlog('\nCurrent state\n--------------\n' + fmat(tmat(fdata.tenkoOutput.ast)) + '\n--------------\n');
      //
      vgroupEnd();
    });
    vgroupEnd();

    ASSERT(
      actuallyInlined > 0,
      'The only thing that can block a queued call to inline is if another one changed something so we must always process at least one entry',
    );

    log('Single calls inlined:', actuallyInlined, '. Restarting from phase1 to fix up read/write registry');
    return {what: 'inlineOneTimeFunctions', changes: actuallyInlined, next: 'normal'};
  }
  log('Single calls inlined: 0.');
}
