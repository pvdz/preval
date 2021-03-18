// Find functions that are only used in a call and only once and inline it if all other conditions are met

import { ASSERT, log, group, groupEnd, vlog, vgroup, vgroupEnd, rule, example, before, source, after, fmat, tmat } from '../utils.mjs';
import * as AST from '../ast.mjs';

export function inlineOneTimeFunctions(fdata) {
  group('\n\n\nChecking for functions that are called once');
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
  fdata.globallyUniqueNamingRegistry.forEach(function (meta, name) {
    if (meta.isBuiltin) return;
    if (meta.isImplicitGlobal) return;
    vgroup(
      '-',
      meta.name,
      ', constant?',
      meta.isConstant,
      ', constValueRef?',
      meta.constValueRef?.node.type,
      ', writes:',
      meta.writes.length,
      ', reads:',
      meta.reads.length,
      ', first read type:',
      meta.reads[0]?.node?.type,
    );

    // I don't care if it's a constant (although for functions it kinda has to?)
    if (meta.reads.length !== 1 || meta.writes.length !== 1) {
      vlog('Not a single read or write, bailing');
      vgroupEnd();
      return;
    }

    const funcNode = meta.constValueRef?.node;

    if (funcNode?.type !== 'FunctionExpression') {
      vlog('Constant is not a function, bailing');
      vgroupEnd();
      return;
    }

    if (funcNode.async || funcNode.generator) {
      vlog('Function is async or a generator, bailing');
      vgroupEnd();
      return;
    }

    const read = meta.reads[0];
    if (read.parentNode.type !== 'CallExpression' || read.parentProp !== 'callee') {
      vlog('The read is not the callee to a call expression, bailing');
      vgroupEnd();
      return;
    }

    if (read.blockChain.startsWith(meta.writes[0].blockChain + ',' + funcNode.body.$p.pid)) {
      // This may also catch recursive calls within nested functions but for now that's the way it is.
      // Assumes a particular structure of the blockChain, not sure if there's a better way right now.
      vlog('The blockChain of the write is a prefix of the read, this implies recursion, bailing');
      vgroupEnd();
      return;
    }

    const params = funcNode.params;

    // So this function is a constant and is only used in a call
    // Is there a rest? If so let's bail for now. We can partially support that later.
    if (params[params.length - 1]?.type === 'RestElement') {
      vlog('Param contains rest. Bailing for now');
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

    // If there is a return that is not the last statement then bail. Take care; This also checks if the
    // return is the last element of an if-else that is the last statement of the function.
    // Maybe in the future we can do a more thorough check to see if the same value is being returned.
    // We can ignore break/continue and even throw here. It's `return` whose behavior gets changed.
    if (funcNode.$p.earlyReturn) {
      vlog('This function has an early return so bailing');
      vgroupEnd();
      return;
    }

    if (funcNode.body.body[funcNode.body.body.length - 1]?.type === 'IfStatement' && read.grandNode.type === 'VariableDeclarator') {
      // In this case the call site is a var decl and the function ends with an if-else branch.
      // If we were to inline this then we would end up with potentially two var decls and an unknown tail.
      // While this would be normalized just fine, it would lead to two identifiers being declared with the
      // same name. Additionally it would mean the code after the original call site would not have access
      // when it did before. As such we need to exclude this transform with var decls and if-else for now.
      vlog('This function ends with an if-else and the call site was a var decl so bailing for now');
      vgroupEnd();
      return;
    }

    if (funcNode.$p.hasBranch && read.grandNode.hasBranch) {
      // We strive for a max of one branch per function so do not merge functions that both have one
      // A branch is an if or a loop (while, for-x). Other types (do-while, for, switch, logic operators,
      // conditional operators, ternary operator) are all gone at this point.
      vlog('This function or the parent function has a branch so we cant inline');
      vgroupEnd();
      return;
    }

    const write = meta.writes[0];

    // We should be able to inline this call
    // We must map all the params of the func to the arguments of the call
    // This is a little annoying but we should have all references to all bindings and should be able to
    // loop through them and replace them with a clone of the argument in the same position.

    vlog('Function is called and referenced exactly once and meets all other conditions; queued to be inlined');
    queue.push({
      pid: +read.node.$p.pid,
      depth: read.node.$p.funcDepth,
      read,
      write /*body: read.blockBody, index: read.blockIndex*/,
      funcNode,
    });

    vgroupEnd();
  });

  log('Inlined', queue.length, 'function calls.');
  if (queue.length > 0) {
    // We want to apply the splices back to front, or reverse source code order
    // There's currently no guarantee about the order of the queue so we can't just reverse it.
    // The pid is guaranteed fresh and incremental in traversal order so we use that to sort.
    queue.sort(({ pid: A, depth: X }, { pid: B, depth: Y }) => (X < Y ? 1 : X > Y ? -1 : A < B ? 1 : A > B ? -1 : 0));
    vlog('The inline queue pid and depth order:', queue.map(({ pid, depth }) => '<' + pid + ':' + depth + '>').join(', '));

    // Inline functions. Start with the lowest nesting to the least nested, last to first source code order.
    // By starting at the most nested, we prevent less indented inlines from missing indentations from more inlined calls.
    // By going last to first we can freely inject any number of elements into a body without affecting earlier indexes.
    // The call is leading for this order, not the function decl. The call is where arbitrary statements are injected.
    // The function decls are set to an empty statement and do not change any indexes.
    queue.forEach(({ funcNode, read, write }, i) => {
      const funcBody = funcNode.body.body;
      vlog('\nCurrent state\n--------------\n' + fmat(tmat(fdata.tenkoOutput.ast)) + '\n--------------\n');
      vlog('Queue', i, funcBody);

      const params = funcNode.params;
      const args = read.parentNode['arguments'];

      rule('Function that is only used in a call once should be inlined');
      example('function f(a){ g(a); } f(100);', 'g(100);');
      vlog('Write:');
      before(write.parentNode);
      vlog('Read:');
      before(read.grandNode);

      // - inject const for each param, the init being the arg in the same position
      // - replace call with return argument, or undefined if there isn't any
      // - replace function var decl with undefined
      // - inject all statements of the function (except the last return statement, if any) before the call

      vlog('Injecting let assignments for each param, initializing them to the argument value');
      vlog('- Param names:', params.map((pnode) => pnode.name).join(', '));

      // Must now inject a const for each param name, with the init being the arg at the same index.
      // We can't just inline-replace them because it is possible to assign to param names and if
      // we replace them then this may fail. Consider;
      // `function f(a){$(a); a=10; $(a);} f(2)`
      // If we replace then it becomes `$(2); a=10; $(2);`, which is not the same as `const x=2; $(x); x=10; $(x);`
      // The constants will be SSA'd or eliminated entirely by other rules.
      funcNode.body.body.unshift(
        ...params.map((pnode, pi) => {
          // The lets will promote to a const in most cases, followed by elimination of some kind. Not always.
          return AST.variableDeclaration(pnode.name, args[pi], 'let');
        }),
      );
      vlog('After adding the lets:');
      source(funcNode);

      ASSERT(
        ['ExpressionStatement', 'AssignmentExpression', 'VariableDeclarator'].includes(read.grandNode.type),
        'normalized calls can only appear in three ways',
        read.parentNode,
      );
      ASSERT(read.parentIndex < 0, 'in all three cases the parent should not be an array');

      const lastNode = funcBody[funcBody.length - 1];
      if (lastNode?.type === 'ReturnStatement') {
        // Replace the call with the argument of this return statement
        // When normalized, the call can only exist as a statement, rhs of assignment, or init of var decl
        // This means, if we care to replace it at all, then the index must be -1
        const retNode = funcBody.pop(); // This changes the function node (!) but we're dropping it so that's ok??
        read.grandNode[read.grandProp] = retNode.argument; // Should not need to clone this...
      } else if (lastNode?.type === 'IfStatement') {
        const ifLast = lastNode.consequent.body[lastNode.consequent.body.length - 1];
        const elseLast = lastNode.alternate?.body[lastNode.alternate.body.length - 1];

        // The last node of the body is an if-else.
        // The read is a call that is either a statement or an assignment.
        // In both branches, copy the assignment, replacing the call with the return value in that branch.
        // If there was no return then substitute undefined. For the statement we can drop this.
        // The var decl should not get down here because then we'd have two var decls with the same name.
        ASSERT(read.grandNode.type !== 'VariableDeclarator', 'this should have been checked above');
        if (read.grandNode.type === 'ExpressionStatement') {
          vlog('The read was a statement so we should be able to drop the return statements care free');

          // Drop the call
          read.grandNode.expression = AST.identifier('undefined');

          // Drop the return statements, if any.
          if (ifLast?.type === 'ReturnStatement') {
            vlog('Dropping return statement from `if`');
            lastNode.consequent.body.pop();
          }
          if (elseLast?.type === 'ReturnStatement') {
            vlog('Dropping return statement from `else`');
            lastNode.alternate.body.pop();
          }
          vlog('if-node after return pruning:');
          source(lastNode);
        } else {
          ASSERT(read.grandNode.type === 'AssignmentExpression');
          vlog(
            'The read was the rhs of an assignment. In each branch, add the same assignment replacing the rhs with the return arg for that branch, or undefined if return is absent',
          );

          // The read is an assignment like `x = f()`
          // In both branches, if the branch ends with a `return y` then replace that with
          // an assignment `x = y`. If a branch does not end with a return then append `x = undefined`
          if (ifLast?.type === 'ReturnStatement') {
            lastNode.consequent.body.pop();
          }
          lastNode.consequent.body.push(
            AST.expressionStatement(
              AST.assignmentExpression(
                AST.cloneSimple(read.grandNode.left),
                ifLast?.type === 'ReturnStatement' ? ifLast.argument : AST.identifier('undefined'),
              ),
            ),
          );

          if (lastNode.alternate) {
            if (elseLast?.type === 'ReturnStatement') {
              lastNode.alternate.body.pop();
            }
          } else {
            lastNode.alternate = AST.blockStatement();
          }
          lastNode.alternate.body.push(
            AST.expressionStatement(
              AST.assignmentExpression(
                AST.cloneSimple(read.grandNode.left),
                elseLast?.type === 'ReturnStatement' ? elseLast.argument : AST.identifier('undefined'),
              ),
            ),
          );

          read.blockBody[read.blockIndex] = AST.emptyStatement();
        }
      } else {
        // Replace the call with `undefined`
        read.grandNode[read.grandProp] = AST.identifier('undefined');
      }

      write.blockBody[write.blockIndex] = AST.emptyStatement();
      read.blockBody.splice(read.blockIndex, 0, ...funcBody);

      vlog('write block body:');
      after(write.parentNode);
      vlog('read block body:');
      after(read.grandNode);
      vgroupEnd();

      vlog('Still have to move the old body code to the parent)');
      vlog('\nCurrent state\n--------------\n' + fmat(tmat(fdata.tenkoOutput.ast)) + '\n--------------\n');
    });

    log('Restarting from phase1 to fix up read/write registry\n\n\n\n\n\n');
    return 'phase1';
  }
  log('\n\n\n\n\n\n');
}
