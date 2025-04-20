// A function that has one unknown statement and then returns a coercion to boolean would be a "boolean trampoline".
// They are interesting because if their result is used in an if, the call can be replaced by the thing being trampolined
// `function f(){ const x = g(); const y = Boolean(x); return y; } if (f()) {}`
// -> `if (f()) {}`

import { ASSERT, log, group, groupEnd, vlog, vgroup, vgroupEnd, rule, example, before, source, after, findBodyOffset } from '../utils.mjs';
import * as AST from '../ast.mjs';
import { createFreshVar } from '../bindings.mjs';
import { symbo } from '../symbols_builtins.mjs';

export function boolTrampolines(fdata) {
  group('\n\n\n[boolTrampolines] Pruning boolean trampolines\n');
  const r = _boolTrampolines(fdata);
  groupEnd();
  return r;
}
function _boolTrampolines(fdata) {
  // We search for functions who's content is an arbitrary statemetn and then a coercion to boolean, either through Boolean or the `!`
  // We then find reads of this function and, assuming it's assigned to a binding somehow, check whether this binding is used in
  // an `if` test. When this is the case, the whole thing can collapse and we can replace the call to the function with the unknown
  // statement that is being trampolined.

  const queue = [];

  fdata.globallyUniqueNamingRegistry.forEach((meta, name) => {
    if (meta.isImplicitGlobal) return;
    if (meta.isBuiltin) return;
    if (!meta.isConstant) return;

    const funcNode = meta.varDeclRef.node;
    if (funcNode.type !== 'FunctionExpression') return;

    vlog('- `' + name + '`:', meta.varDeclRef.node.type);

    if (funcNode.$p.readsArgumentsAny || funcNode.$p.readsArgumentsLen) {
      // Note: Inlining the arg count should be trivial so we can do that easily
      //       We can probably deal with many usages of `arguments` as well, but I'm just deferring that
      vlog('  - Accesses `arguments`, bailing on that for now');
      return;
    }

    if (funcNode.$p.thisAccess) {
      // Note: Most likely we can patch up many cases where `this` is accessed. But not right now.
      vlog('  - Accesses `this`, bailing on that for now');
      return;
    }

    const funcParams = funcNode.params;

    // Ignore this step if the function has a rest arg. It'll be too difficult to map for now.
    const lastParam = funcParams[funcParams.length - 1];
    ASSERT(lastParam === undefined || lastParam.type === 'Param');
    vlog('  - Has rest?', !!lastParam?.rest);
    if (lastParam?.rest) {
      vlog('  - Bailing. Cannot deal with rest right now');
      return;
    }

    const bodyOffset = findBodyOffset(funcNode);
    const statementCount = funcNode.body.body.length - bodyOffset;

    if (statementCount !== 3) {
      vlog('  - The function does not have three statements so it cannot be a bool trampoline');
      return;
    }

    const tramNode = funcNode.body.body[bodyOffset];
    const boolNode = funcNode.body.body[bodyOffset + 1];
    const returnNode = funcNode.body.body[bodyOffset + 2];
    vlog('    - 1st node;', tramNode.type);
    vlog('    - 2nd node;', boolNode.type);
    vlog('    - 3nd node;', returnNode.type);

    // Detect the bool trampoline. It must start with a <lhs1, rhs1>, followed by <lhs2, !rhs1> or <lhs2, Boolean(lhs1)>, followed by return lhs2
    // I think the situation where the lhs is the same binding is prevented by other rules? (`x = a; x = !x; return x`) so not covering that.
    // We don't cover the member expression (as lhs) case here. Basically unavoidably too dangerous due to getters.

    let firstClosure = false;
    let secondClosure = false;

    // The first statement must be a var
    let lhs1;
    let rhs1;
    if (tramNode.type === 'VarStatement') {
      // Some form of `const x = $(); const y = Boolean(x); return y;` or `const x = $(); y = Boolean(x); return y;`
      lhs1 = tramNode.id;
      rhs1 = tramNode.init;
    } else if (
      tramNode.type === 'ExpressionStatement' &&
      tramNode.expression.type === 'AssignmentExpression' &&
      tramNode.expression.left.type === 'Identifier'
    ) {
      // Some form of `x = $(); const y = Boolean(x); return y;` or `x = $(); y = Boolean(x); return y;`
      // Must confirm whether this initial assignment is to a closure that is accessible by the caller
      firstClosure = true;
      lhs1 = tramNode.expression.left;
      rhs1 = tramNode.expression.right;
    } else {
      vlog('  - the first node was not a matching expectations, bailing');
      return;
    }

    // The bool node must either be a var or assignment and the rhs must be a call to Boolean or an exclamation mark, with lhs1 as first arg.
    let lhs2;
    let rhs2;
    if (boolNode.type === 'VarStatement') {
      // Some form of `const x = $(); const y = Boolean(x); return y;` or `x = $(); const y = Boolean(x); return y;`
      lhs2 = boolNode.id;
      rhs2 = boolNode.init;
    } else if (
      // Some form of `x = $(); y = Boolean(x); return y;` or `x = $(); y = Boolean(x); return y;`
      // Must confirm whether this second assignment is to a closure that is accessible by the caller
      boolNode.type === 'ExpressionStatement' &&
      boolNode.expression.type === 'AssignmentExpression' &&
      boolNode.expression.left.type === 'Identifier'
    ) {
      lhs2 = boolNode.expression.left;
      rhs2 = boolNode.expression.right;
      secondClosure = true;
    } else {
      vlog('  - the second node was not a proper bool node so we must bail');
      return;
    }

    let wasInvert = false; // Gotta remember whether it was a Boolean() or !
    if (
      rhs2.type === 'CallExpression' &&
      rhs2.callee.type === 'Identifier' &&
      rhs2.callee.name === symbo('boolean', 'constructor') &&
      rhs2['arguments'].length === 1 &&
      rhs2['arguments'][0].type === 'Identifier' &&
      rhs2['arguments'][0].name === lhs1.name
    ) {
      // This is Boolean(lhs1)
    } else if (
      rhs2.type === 'UnaryExpression' &&
      rhs2.operator === '!' &&
      rhs2.argument.type === 'Identifier' &&
      rhs2.argument.name === lhs1.name
    ) {
      // This is !lhs1
      wasInvert = true;
    } else {
      vlog('  - The second node did not invert the lhs binding of the first node. Bailing');
      return;
    }

    if (returnNode.type !== 'ReturnStatement' || returnNode.argument.type !== 'Identifier' || returnNode.argument.name !== lhs2.name) {
      // I'm not entirely sure how the throw case works here or whether it's actually relevant to collapse that one too. I don't think it is?
      vlog('Did not return the lhs2 name. Bailing');
      return;
    }

    // I believe we've verified the pattern at this point.
    // Next step is to find call sites and track the bindings that hold the result of the call.
    // If any results are detected to be used in an `if` test (only), then we can replace the call with rhs1 (after inlining the arguments)

    vgroup('- Pattern confirmed. This function is a bool trampoline. Must now check each call site');
    meta.reads.forEach((read, i) => {
      vlog('- Read', i);
      // First check whether this is actually a call to the binding
      if (read.parentNode.type !== 'CallExpression') {
        vlog('  - Not a call expression, bailing');
        return;
      }
      if (read.parentProp !== 'callee') {
        vlog('  - Not the thing being called in this the expression, bailing');
        return;
      }

      // Confirm the scope containing the function is accessible to the call site
      if (!(read.blockChain).startsWith(funcNode.$p.blockChain)) {
        // If we don't do this check then we may inline something that's not accessible at the point of calling the function.
        // TODO: we can widen the scope
        //       - if we confirm all the bits in the function are local to the function, then we can safely copy it regardless of this rule
        //       - we can check every bit of the function and confirm all of them are accessible at the call site, regardless of this rule
        vlog('  - The call site can not access the scope containing the function(', [read.blockChain], [funcNode.$p.blockChain], '). Bailing for now because this transform is unsafe.');
        return;
      }

      let lhs;
      if (read.grandNode.type === 'AssignmentExpression' && read.grandProp === 'right' && read.grandNode.left.type === 'Identifier') {
        // Some form of `x = f()`
        lhs = read.grandNode.left;
      } else if (read.grandNode.type === 'VarStatement') {
        // Some form of `const x = f()`
        lhs = read.grandNode.id;
      } else {
        vlog('  - The call is not an assign or var decl, bailing');
        return;
      }

      // Ok this should be a call and the result should be assigned
      // Now check whether the binding that was the lhs is actually only used as if-tests. Multiple is fine.
      // TODO: or as Boolean() or ! args, I guess that'd be fine too?

      const lhsMeta = fdata.globallyUniqueNamingRegistry.get(lhs.name);
      if (lhsMeta.isImplicitGlobal) return;
      if (lhsMeta.isBuiltin) return; // meh?
      //if (!lhsMeta.isConstant) return; // As long as the binding is only used in boolean contexts, it doesn't matter how many other writes it has
      if (
        lhsMeta.reads.some((r) => {
          if (r.parentNode.type === 'IfStatement' && r.parentProp === 'test') {
            // ok, this is `if (x)`
            return false;
          } else if (r.parentNode.type === 'UnaryExpression' && r.parentNode.operator === '!') {
            // ok, this is `!x`
            return false;
          } else if (r.parentNode.type === 'CallExpression' && r.parentProp === 'arguments' && r.parentIndex === 0) {
            // ok... This is `Boolean(x)`
            return false;
          } else {
            // Fail. This read is not just a bool coercion.
            return true;
          }
        })
      ) {
        vlog('  - Usage of result not meeting expectations, bailing');
        return;
      }

      if (rhs1.type === 'AwaitExpression' || rhs2.type === 'AwaitExpression') {
        // We can totally do this when the new parent function is async. But we gotta check that first.
        vlog('  - At least one rhs is `await`, bailing. TODO: confirm if new parent function is async and then do it anyways');
        return false;
      }
      if (rhs1.type === 'YieldExpression' || rhs2.type === 'YieldExpression') {
        // We can totally do this when the new parent function is generator. But we gotta check that first.
        vlog('  - At least one rhs is `yield`, bailing. TODO: confirm if new parent function is generator and then do it anyways');
        return false;
      }

      // I think we're ready to call it. We can inline this case with the firstNode trampoline (and bool coercion).

      queue.push({
        index: read.parentIndex, // grand?
        func: () => {
          rule('A boolean trampoline whose result is only used in boolean contexts can be inlined');
          example(
            'function f(){ const x = g(); const y = !x; return y; } const z = f(); if (z) {}',
            'function f(){ const x = g(); const y = !x; return y; } const tmp = g(); const z = !tmp; if (z) {}',
          );
          before(rhs1, funcNode);
          before(funcNode);
          before(read.blockBody[read.blockIndex]);

          const paramArgMapper = new Map(
            funcNode.params
              .map((pnode, pi) => [pnode.$p.paramVarDeclRef?.name, read.parentNode['arguments'][pi] ?? AST.identifier('undefined')])
              .filter((a) => !!a[0]),
          );
          if (funcNode.$p.readsArgumentsLen) {
            // If the argslen alias was referenced, make sure it's replaced with the proper (actual) value
            paramArgMapper.set(funcNode.$p.readsArgumentsLenAs, AST.literal(read.parentNode['arguments'].length));
          }

          // Forms are:
          // - `[const] <A> = <expr>; [const] <B> = !<A>; return <B>`
          // - `[const] <A> = <expr>; [const] <B> = Boolean(<A>); return <B>`

          const fail = {};
          const exprClone = AST.deepCloneForFuncInlining(rhs1, paramArgMapper, fail);
          ASSERT(!fail.ed);

          const firstName = firstClosure ? lhs1.name : createFreshVar('tmpBoolTrampoline', fdata);
          const newLine1 = firstClosure
            ? AST.expressionStatement(AST.assignmentExpression(AST.identifier(firstName), exprClone))
            : AST.varStatement('const', firstName, exprClone);
          const secondNAme = secondClosure ? lhs2.name : createFreshVar('tmpBoolTrampolineB', fdata);
          const newRhs = wasInvert
            ? AST.unaryExpression('!', firstName)
            : AST.callExpression(symbo('boolean', 'constructor'), [AST.identifier(firstName)]);
          const newLine2 = secondClosure
            ? AST.expressionStatement(AST.assignmentExpression(AST.identifier(secondNAme), newRhs))
            : AST.varStatement('const', secondNAme, newRhs);

          read.blockBody.splice(read.blockIndex, 0, newLine1, newLine2);
          // Replace the whole func call with the second alias
          if (read.grandIndex < 0) read.grandNode[read.grandProp] = AST.identifier(secondNAme);
          else read.grandNode[read.grandProp][read.grandIndex] = AST.identifier(secondNAme);

          after(newLine1);
          after(newLine2);
          after(read.grandNode);
        },
      });
    });
    vgroupEnd();

  });

  if (queue.length) {
    // By index, high to low. This way it should not be possible to cause reference problems by changing index
    queue.sort(({ index: a }, { index: b }) => (a < b ? 1 : a > b ? -1 : 0));
    queue.forEach(({ index, func }) => func());

    log('Trampolines inlined:', queue.length, '. Restarting from phase1 to fix up read/write registry.');
    return {what: 'boolTrampolines', changes: queue.length, next: 'phase1'};
  }

  log('Trampolines inlined: 0.');
  return false;
}
