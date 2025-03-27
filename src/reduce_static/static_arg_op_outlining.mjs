// If a function only gets called and the first statement mutates an arg in a static way then we can outline this operation
// `function f(a) { const x = a + 1; return a; } f(1); f(2);`
// -> `function f(a) { const x = a; return a; } f(1 + 1); f(2 + 1);`
// (the opposite is "inline identical param")

// TODO: Bonus points if the op regards two args rather than a literal
// TODO: Bonus points for outlining assignments to closures in the same way

import { ASSERT, log, group, groupEnd, vlog, vgroup, vgroupEnd, rule, example, before, source, after, fmat, tmat, coerce, findBodyOffset, assertNoDupeNodes, } from '../utils.mjs';
import * as AST from '../ast.mjs';
import { createFreshVar } from '../bindings.mjs';
import { cloneSimple, isSimpleNodeOrSimpleMember } from '../ast.mjs';
import { SYMBOL_COERCE } from '../symbols_preval.mjs';

export function staticArgOpOutlining(fdata) {
  group('\n\n\nFinding static param ops to outline\n');
  //vlog('\nCurrent state\n--------------\n' + fmat(tmat(fdata.tenkoOutput.ast)) + '\n--------------\n');
  const r = _staticArgOpOutlining(fdata);
  groupEnd();
  return r;
}
function _staticArgOpOutlining(fdata) {
  let changes = 0;
  const queue = [];

  // PASS is >=0 and means the index of the param
  const FAIL = -1;
  const SKIP = -2;

  fdata.globallyUniqueNamingRegistry.forEach((meta, name) => {
    if (meta.isBuiltin) return;
    if (meta.isCatchVar) return;
    if (meta.isImplicitGlobal) return;
    if (!meta.isConstant) return; // I don't think this really matters. But perhaps in that case we should just skip the lets...
    if (meta.varDeclRef.node.type !== 'FunctionExpression') return;

    vgroup(`- processing function "${name}"`);
    processFunctionName(meta, name);
    vgroupEnd();
  });

  function actionableValue(node, names) {
    // This should be the init of the var or rhs of the assign (or unary/binary as statement...)
    // The return value should indicate whether this is the needle (expression that contains a param and is
    // otherwise static) or an expression that has no side effects and is safe to scan past (like an
    // assignment of primitive or function or smth).
    if (AST.isPrimitive(node)) {
      // `5` is skippable
      return SKIP;
    }
    else if (node.type === 'TemplateLiteral') {
      // Must be a concat of sorts since it wasn't a primitive, but we can outline them too

      if (node.expressions.length !== 1) return FAIL; // Eh, this is more complex. Should still be doable but.
      const expr = node.expressions[0];
      if (expr.type !== 'Identifier') return SKIP; // I think this is a non-observable string concat?
      const paramIndex = names.indexOf(expr.name);
      return paramIndex;
    }
    else if (node.type === 'BinaryExpression') {
      // Good if at least left or right is a param and the other is a param or primitive
      // Skippable if the expression is a primitive, function expression, or class/array/object with all internals skippable too

      let index;

      let params = 0;
      if (AST.isPrimitive(node.left)) {
      } else if (node.left.type === 'Identifier') {
        const paramIndex = names.indexOf(node.left.name);
        if (paramIndex < 0) {
          vlog('- The lhs was not a param, bailing');
          return FAIL;
        }
        ++params;
        index = paramIndex;
      } else {
        vlog('- Left is neither primitive nor param, bailing');
      }
      if (AST.isPrimitive(node.right)) {
      } else if (node.right.type === 'Identifier') {
        const paramIndex = names.indexOf(node.right.name);
        if (paramIndex < 0) {
          // Must bail because x+y _may_ spy and change something on the caller side.
          vlog('- The rhs was not a param, bailing');
          return FAIL;
        }
        ++params;
        index = paramIndex;
      } else {
        vlog('- Right is neither primitive nor param, bailing');
        return FAIL;
      }
      if (!params) {
        // Even though normalization would take care of it, there's no reason why we wouldn't just skip it here.
        // `x = 1 + 2` is skippable
        return SKIP;
      }
      if (params !== 1) {
        // TODO: I think we can support this but double ident is dangerous because they may be two spies and you would need to make sure they proc in the proper order (that's the order here)
        return FAIL;
      }
      // So this must (currently) be ident + primitive, or primitive + ident.
      vlog('- Accepting this binary');
      return index;
    }
    else if (node.type === 'UnaryExpression') {
      if (AST.isPrimitive(node.argument)) {
        // `x = ~1` is skippable
        return SKIP;
      }
      if (node.argument.type !== 'Identifier') {
        // Normalized code so I'm not even sure what it may still be if not primitive or ident, but whatever.
        vlog('- Unary arg is not an ident, bailing');
        return FAIL;
      }
      const paramIndex = names.indexOf(node.argument.name);
      if (paramIndex < 0) {
        // Not even `!` is safe here since if the arg is a spy, it may be changed by this transform (`x = !spy; y = spy_as_parma + 1`)
        vlog('- The arg was not a param, bailing');
        return FAIL;
      }
      return paramIndex;
    }
    else if (node.type === 'Identifier') {
      // Either this is an assignment or init of an ident, or a noop ident.
      vlog('skip ident');
      return SKIP;
    }
    else if (['FunctionExpression', 'ArrayExpression', 'ObjectExpression', 'ClassExpression'].includes(node.type)) {
      // `x = function(){};` is not observable
      // Same for class/array/object but only if the same applies to any of their internal bits.
      // Since they are normalized, they should not contain bits that can be observable when read...
      return SKIP;
    }
    else if (node.type === 'CallExpression') {
      // Outline calls, why not? but only if all their args (if any) are primitives
      // - `$$0()`
      // - `$$0.x()`
      // - `f($$0)`
      // - `f.g($$0)`

      if (node.callee.type === 'Identifier') {
        const paramIndex = names.indexOf(node.callee.name);
        if (paramIndex >= 0 && node.arguments.every(a => AST.isPrimitive(a))) {
          // This is the `'x'` or `'y`' in `function f(a) { return a(0); } f('x'); f('y');`
          return paramIndex;
        }
        // TODO: we could do it for known idents (known globals) but not for closures because call sites may not have access to them
        return FAIL;
      }
      else if (node.callee.type === 'MemberExpression' && !node.callee.computed && AST.isPrimitive(node.callee.object)) {
        // ``foo'.slice($$0)`
        // (the arg is a param)
        let found = 0;
        let at = 0;
        let fail = false;
        node.arguments.every(a => {
          if (AST.isPrimitive(a)) return true;
          if (a.type !== 'Identifier') {
            fail = true;
            return false;
          }
          if (found) { // multi-arg (TODO)
            ++found;
            fail = true;
            return false;
          }
          at = names.indexOf(a.name);
          if (at >= 0) {
            ++found;
          }
        })
        if (fail || found !== 1) {
          return FAIL;
        }
        return at;
      }
      else if (node.callee.type === 'MemberExpression' && !node.callee.computed && node.callee.object.type === 'Identifier') {
        const paramIndex = names.indexOf(node.callee.object.name);
        if (paramIndex >= 0 && node.arguments.every(a => AST.isPrimitive(a))) {
          // This is like `function f(a) { return a(0); } f('x'); f('y');`
          return paramIndex;
        }
      }

      return FAIL;
    }
    else if (node.type === 'NewExpression') {
      // TODO: we can ignore some builtin calls
      return FAIL;
    }
    else if (node.type === 'MemberExpression') {
      // tODO: we can skip stuff like Math.PI
      return FAIL;
    }
    else if (node.type === 'EmptyStatement') {
      // it's a temporary artifact but we can safely skip this
      return SKIP;
    }
    else if (node.type === 'AssignmentExpression') {
      return actionableValue(node.right, names);
    }
    else {
      return FAIL;
    }
  }
  function actionable(node, names) {
    // Returns the param index, or FAIL or SKIP (which are negative)

    switch (node.type) {
      case 'VarStatement': {
        return actionableValue(node.init, names);
      }
      case 'ExpressionStatement': {
        const r = actionableValue(node.expression, names);
        if (node.expression.type === 'AssignmentExpression' && r < 0) {
          // The assignment may be dangerous if the result is SKIP
          return FAIL;
        }
        return r;
      }
      case 'EmptyStatement': {
        // it's a temporary artifact but we can safely skip this
        return SKIP;
      }
      default:
        return FAIL;
    }
  }

  function processFunctionName(funcMeta, funcName) {
    // Verify that
    // - The function is only called, doesn't escape
    // - The function has at least one arg
    // - The function has some kind of expression in the first statement that uses an arg
    // - None of the calls use a spread (and later we can still proceed if the param is before the spread in all calls)
    // - The function is not direct recursive (tests/cases/primitive_arg_inlining/recursion/_base.md). Probably also not indirectly recursive (?)

    const funcRef = funcMeta.varDeclRef;
    const funcNode = funcMeta.varDeclRef.node;
    const paramCount = funcNode.params.length;
    //if (paramCount === 0) {
    //  vlog('- Function has no params, bailing');
    //  return;
    //}

    if (funcNode.$p.readsArgumentsLen || funcNode.$p.readsArgumentsAny) {
      // TODO: We can support this just don't remove the args after outlining them. Replace caller values with `undefined`.
      vlog('- The function uses `arguments` so we should bail');
      return;
    }

    if (funcNode.params.find(p => p.rest)) {
      // TODO: we can support these cases for the non-rest param. And probably one or two cases of the rest as well.
      vlog('- The function has at least one rest param. Bailing for now.');
      return;
    }

    // Try to validate whether function is safe to modify (does not escape, only called, etc)
    if (
      funcMeta.reads.some((read) => {
        // TODO: ignore .call() etc as part of this
        //if (
        //  read.parentNode.type === 'MemberExpression' &&
        //  (
        //    !read.parentNode.computed &&
        //    (
        //      read.parentNode.property.name === 'call' ||
        //      read.parentNode.property.name === 'apply' ||
        //      read.parentNode.property.name === 'bind'
        //    )
        //  )
        //) {
        //  // I think bind is actually irrelevant here.
        //  // I hope I'm not wrong but I think only .call and .apply could observe this change. And maybe .toString, but that's ok. Any other property can't reflect?
        //  vlog(
        //    '- The function is used in a member expression with a non-computed .call, .apply, or .bind. Ignoring this case.',
        //  );
        //  return;
        //}

        if (read.parentNode.type !== 'CallExpression' || read.parentProp !== 'callee') {
          vlog('- The function escapes (at least one read was not a call), bailing');
          return true;
        }

        if (read.parentNode.arguments.some((anode) => anode.type === 'SpreadElement')) {
          // TODO: we can still do this for any params that occur before any spread in all calls
          vlog('- The function was called with a spread at least once, bailing');
          return true;
        }

        if (read.parentNode.arguments.length < funcNode.params.length) {
          // TODO: we can support this for the args that have been passed on and infer `undefined` for the missing ones...
          // (We don't care as much about arg overflow, only underflow)
          vlog('- The function has at least one call where it has fewer args than parameters');
          return true;
        }

        if (read.pfuncNode === funcNode) {
          vlog('- This is a recursive function. It is too dangerous.');
          return true;
        }
      })
    ) {
      return;
    }

    // Okay, we've verified the function is only called, doesn't escape, and gets at least as many args as params in all calls.
    // Find the first statement of the function and check if and how it uses an arg.
    // TODO: in certain cases we can skip statements (ones that can't possibly spy) to try the next statement.

    let max = funcNode.body.body.length - 1;
    const stmtOffset = funcNode.$p.bodyOffset;
    ASSERT(funcNode.body.body[stmtOffset - 1]?.type === 'DebuggerStatement', 'The body offset should not be stale');
    let stmt = funcNode.body.body[stmtOffset];
    let stmtIndex = stmtOffset;
    ASSERT(stmt, 'normalized funcs must at least have a return statement...');

    const names = funcNode.$p.paramNames;
    let paramIndex = SKIP;
    while (paramIndex === SKIP && stmtIndex < max) {
      stmt = funcNode.body.body[stmtIndex];
      ASSERT(stmt, 'pointer should not be beyond the last statement yet...', stmtIndex, max);
      vlog('-', stmt.type, stmt.type === 'VarStatement' ? stmt.init.type : stmt.expression?.type ?? stmt.type);
      paramIndex = actionable(stmt, names);
      vlog('  -', paramIndex === FAIL ? 'FAIL' : paramIndex === SKIP ? 'SKIP' : paramIndex);
      if (paramIndex === FAIL) {
        vlog('  - Found a blocking statement before finding a target, this is not a statement with op');
        paramIndex = -1;
        break;
      }
      ++stmtIndex;
    }
    if (paramIndex >= 0) {
      inlineOp(funcMeta, funcNode, paramIndex, paramCount, stmt, stmtIndex);
      return;
    }

    // Check if first statement is a regular assignment to a closure. Would be cool if we could outline that.
    const firstStmt = funcNode.body.body[stmtOffset];

    vlog('- Was unable to find a target statement to inline an op.');
    vlog('- Now checking the assignment case. First statement is', firstStmt.type, '...');

    if (
      firstStmt.type === 'ExpressionStatement' &&
      firstStmt.expression.type === 'AssignmentExpression' &&
      firstStmt.expression.left.type === 'Identifier' &&
      AST.isPrimitive(firstStmt.expression.right)
    ) {
      // `function f() { x = 1 }` or `function f(x) { x = 1 }`

      vlog('- First statement is a regular assignment (rhs=primitive). Check if it is assigning a param to a closure.');
      // Check whether left or right is a closure. Neither have to be and they might both be.
      // We can do a simple param name check for this. Either it's a param or it's a closure.
      const left = firstStmt.expression.left;
      const right = firstStmt.expression.right;

      const leftIsParam = funcNode.$p.paramNames.indexOf(left.name);

      // `function f(b) { b = 1; }`
      ASSERT(!(leftIsParam >= 0), 'if left was a param then it would be SSAd away');

      // `let a = 1; function f(b) { a = 100; }`

      const leftMeta = fdata.globallyUniqueNamingRegistry.get(left.name);

      if (leftMeta.varDeclRef?.containerNode.type !== 'VarStatement') {
        // TODO: we can probably still support this case...? As long as we have a scope to check, who cares what you assign to
        vlog('- The lhs is a closure but it was not a variable declaration, so bailing');
        return; // catch, for-x, ???
      }
      if (funcMeta.reads.some(read => !read.blockChain.startsWith(leftMeta.varDeclRef.node.$p.blockChain))) {
        vlog('- Not all call sites can reach the closure, bailing');
        return;
      }

      rule('Function that does not escape where first statement is assignment of param to closure can be simplified');
      example('let x=1; function f(a){ x = a; } f(2); f(3);', 'let x=1; function f(a){ x = a; } x = 2; f(2); x = 3; f(3);');
      before(firstStmt);

      // Note: We'll replace the statement with a block that wraps both expressions.
      //       Then before this trick returns we'll flatten that in reverse pid order.

      funcMeta.reads.forEach(read => {
        before(read.blockBody[read.blockIndex]);

        read.blockBody[read.blockIndex] = AST.blockStatement(
          AST.expressionStatement(AST.assignmentExpression(AST.identifier(left.name), cloneSimple(right))),
          read.blockBody[read.blockIndex],
        );

        queue.push({
          index: read.blockIndex,
          func: () => {
            // Flatten the block
            read.blockBody.splice(read.blockIndex, 1, ...read.blockBody[read.blockIndex].body);
          }
        });

        after(read.blockBody[read.blockIndex]);
      });


      funcNode.body.body[stmtOffset] = AST.emptyStatement();
      assertNoDupeNodes(fdata.tenkoOutput.ast, 'body');

      ++changes;
      return;
    }

    if (
      firstStmt.type === 'ExpressionStatement' &&
      firstStmt.expression.type === 'AssignmentExpression' &&
      firstStmt.expression.left.type === 'Identifier' &&
      firstStmt.expression.right.type === 'Identifier'
    ) {
      vlog('- First statement is a regular assignment (ident=ident). Check if it is assigning a param to a closure.');
      // Check whether left or right is a closure. Neither have to be and they might both be.
      // We can do a simple param name check for this. Either it's a param or it's a closure.
      const left = firstStmt.expression.left;
      const right = firstStmt.expression.right;

      const leftIsParam = funcNode.$p.paramNames.indexOf(left.name);
      const rightIsParam = funcNode.$p.paramNames.indexOf(right.name);

      ASSERT(!(leftIsParam >= 0), 'assignment to param would be SSAd so this is not expected to hit');

      vlog('- leftIsParam:', leftIsParam, ', rightIsParam:', rightIsParam);

      if (rightIsParam >= 0) {
        // `let a = 1; function f(b) { a = b; }`
        const leftMeta = fdata.globallyUniqueNamingRegistry.get(left.name);

        if (leftMeta.varDeclRef?.containerNode.type !== 'VarStatement') {
          // TODO: we can probably still support this case...? As long as we have a scope to check, who cares what you assign to
          vlog('- The lhs is a closure but it was not a variable declaration, so bailing');
          return; // catch, for-x, ???
        }
        if (funcMeta.reads.some(read => !read.blockChain.startsWith(leftMeta.varDeclRef.node.$p.blockChain))) {
          vlog('- Not all call sites can reach the closure, bailing');
          return;
        }

        rule('Function that does not escape where first statement is assignment of param to closure can be simplified');
        example('let x=1; function f(a){ x = a; } f(2); f(3);', 'let x=1; function f(a){ x = a; } x = 2; f(2); x = 3; f(3);');
        before(firstStmt);

        // Note: We'll replace the statement with a block that wraps both expressions.
        //       Then before this trick returns we'll flatten that in reverse pid order.

        funcMeta.reads.forEach(read => {
          before(read.blockBody[read.blockIndex]);

          const arg = read.parentNode.arguments[rightIsParam];
          ASSERT(isSimpleNodeOrSimpleMember(arg), 'should be normalized code so call should have simple args');

          read.blockBody[read.blockIndex] = AST.blockStatement(
            AST.expressionStatement(AST.assignmentExpression(AST.identifier(left.name), cloneSimple(arg))),
            read.blockBody[read.blockIndex],
          );

          queue.push({
            index: read.blockIndex,
            func: () => {
              // Flatten the block
              read.blockBody.splice(read.blockIndex, 1, ...read.blockBody[read.blockIndex].body);
            }
          });

          after(read.blockBody[read.blockIndex]);
        });

        funcNode.body.body[stmtOffset] = AST.emptyStatement();
        assertNoDupeNodes(fdata.tenkoOutput.ast, 'body');

        ++changes;
        return;
      } else {
        // `let a = 1; let b = $(); function f() { a = b; }`
        // `let a = 1; function f() { a = arguments.length; }`
        const leftMeta = fdata.globallyUniqueNamingRegistry.get(left.name);
        const rightMeta = fdata.globallyUniqueNamingRegistry.get(right.name);

        if (leftMeta.varDeclRef?.containerNode.type !== 'VarStatement') {
          // `try {} catch (e) { let b = $(); function f() { e = b; } }`
          // TODO: we can probably still support this case...? As long as we have a scope to check, who cares what you assign to
          vlog('- The lhs is a closure but it was not a variable declaration, so bailing');
          return; // catch, for-x, ???
        }
        if (rightMeta.varDeclRef?.containerNode.type !== 'VarStatement') {
          // `try {} catch (e) { let b = $(); function f() { b = e; } }`
          // TODO: we can probably still support this case...? As long as we have a scope to check, who cares what you assign to
          vlog('- The rhs is a closure or this/arguments but it was not a variable declaration, so bailing');
          return; // catch, for-x, ???
        }
        if (funcMeta.reads.some(read => !read.blockChain.startsWith(leftMeta.varDeclRef.node.$p.blockChain))) {
          // `let f; { let b = $(); f = function(a) { b = a; } } f(1); f(2);`
          // Currently this doesn't hit but it might in the future.
          vlog('- Not all call sites can reach the lhs closure, bailing');
          return;
        }
        if (funcMeta.reads.some(read => !read.blockChain.startsWith(rightMeta.varDeclRef.node.$p.blockChain))) {
          // `let a = 1; function f() { a = this; }`
          vlog('- Not all call sites can reach the rhs binding, bailing');
          return;
        }

        rule('Function that does not escape where first statement is assignment between two closures can be simplified');
        example('let x=1; let y=2; function f(a){ x=y; } f(2); f(3);', 'let x=1; let y=2; function f(a){ } x=y; f(undefined); x=y; f(undefined);');

        // All call sites can reach both closures so we should be able to outline this assignment verbatim

        funcMeta.reads.forEach(read => {
          before(read.blockBody[read.blockIndex]);

          read.blockBody[read.blockIndex] = AST.blockStatement(
            AST.expressionStatement(AST.cloneSortOfSimple(firstStmt.expression)),
            read.blockBody[read.blockIndex],
          );

          queue.push({
            index: read.blockIndex,
            func: () => {
              // Flatten the block
              read.blockBody.splice(read.blockIndex, 1, ...read.blockBody[read.blockIndex].body);
            }
          });

          after(read.blockBody[read.blockIndex]);
        });

        before(funcNode.body.body[stmtOffset]);
        funcNode.body.body[stmtOffset] = AST.emptyStatement();
        assertNoDupeNodes(fdata.tenkoOutput.ast, 'body');
        after(funcNode.body.body[stmtOffset]);

        assertNoDupeNodes(fdata.tenkoOutput.ast, 'body');

        ++changes;
        return;
      }
    }

    if (
      firstStmt.type === 'IfStatement' &&
      firstStmt.test.type === 'Identifier' &&
      funcNode.$p.paramNames.includes(firstStmt.test.name)
    ) {
      vlog('First statement is If but it is not the only statement in the body, bailing');
      return;
    }

    if (
      firstStmt.type === 'ExpressionStatement' &&
      firstStmt.expression.type === 'CallExpression' &&
      firstStmt.expression.callee.type === 'Identifier' &&
      firstStmt.expression.callee.name === SYMBOL_COERCE
    ) {
      // `function f() { $(coerce, x, 'string') }`
      // Coerce as a statement

      vlog('- First statement is a $coerce');

      // Check whether arg `x` is a closure. It doesn't have to be. Note that it can't be a Param because
      // they can only appear in the func header, where $coerce should not be possible.

      const arg = firstStmt.expression.arguments[0];
      ASSERT(arg, 'in normalized code, $coerce should be crafted by us and so this arg should exist');

      const argMeta = fdata.globallyUniqueNamingRegistry.get(arg.name);

      if (arg.type === 'Identifier' && funcNode.$p.paramNames.includes(arg.name)) {
        // `function f($$1) { const b = $$1; debugger; $coerce( b, "plustr" ); } f(1)`
        vgroup('- Arg is a param');

        rule('Special $coerce with param as first statement of function can be outlined');
        example('let b = $; function f(a) { $coerce( a, "plustr" ); g(); } f(b)', 'let b = $; function f(b) { g(); } $coerce( b, "plustr" ); f(b)');

        before(funcMeta.varDeclRef.containerParent[funcMeta.varDeclRef.containerIndex]);

        funcNode.body.body[funcNode.$p.bodyOffset] = AST.emptyStatement();

        after(funcMeta.varDeclRef.containerParent[funcMeta.varDeclRef.containerIndex]);

        funcMeta.reads.forEach(read => {
          before(read.blockBody[read.blockIndex]);

          const paramIndex = funcNode.$p.paramNameToIndex.get(arg.name);
          ASSERT(paramIndex >= 0, 'cause it was a param?');
          const clonedCall = AST.cloneSortOfSimple(firstStmt.expression);
          clonedCall.arguments[0] = AST.cloneSimple(read.parentNode.arguments[paramIndex]);
          read.blockBody[read.blockIndex] = AST.blockStatement(
            AST.expressionStatement(clonedCall),
            read.blockBody[read.blockIndex],
          );

          queue.push({
            index: read.blockIndex,
            func: () => {
              // Flatten the block
              read.blockBody.splice(read.blockIndex, 1, ...read.blockBody[read.blockIndex].body);
            }
          });

          after(read.blockBody[read.blockIndex]);
        });

        assertNoDupeNodes(funcNode, 'body');

        vgroupEnd();
        ++changes;
        return;
      }
      else if (arg.type === 'Identifier') {
        // `let b = $; function f() { $coerce( b, "plustr" ); } f()`
        vgroup('  - Arg is a closure or arguments or this.');

        if (argMeta.varDeclRef?.containerNode.type !== 'VarStatement') {
          // `try {} catch (b) { function f() { $coerce( b, "plustr" ); } f() }`
          // Maybe we can support catch etc but not today.
          vlog('  - Closure is not a var binding, bailing');
          return;
        }

        if (funcMeta.reads.some(read => !read.blockChain.startsWith(argMeta.varDeclRef.node.$p.blockChain))) {
          // `let f; { let b = $; f = function() { $coerce( b, "plustr" ); } } f()`
          vlog('  - Not all call sites can reach the closure, bailing');
          return;
        }

        rule('Special $coerce with closure as first statement of function can be outlined');
        example('let b = $; function f() { $coerce( b, "plustr" ); g(); } f()', 'let b = $; function f() { g(); } $coerce( b, "plustr" ); f()');

        before(funcMeta.varDeclRef.containerParent[funcMeta.varDeclRef.containerIndex]);

        funcNode.body.body[funcNode.$p.bodyOffset] = AST.emptyStatement();

        after(funcMeta.varDeclRef.containerParent[funcMeta.varDeclRef.containerIndex]);

        funcMeta.reads.forEach(read => {
          before(read.blockBody[read.blockIndex]);

          read.blockBody[read.blockIndex] = AST.blockStatement(
            AST.expressionStatement(AST.cloneSortOfSimple(firstStmt.expression)),
            read.blockBody[read.blockIndex],
          );

          queue.push({
            index: read.blockIndex,
            func: () => {
              // Flatten the block
              read.blockBody.splice(read.blockIndex, 1, ...read.blockBody[read.blockIndex].body);
            }
          });

          after(read.blockBody[read.blockIndex]);
        });

        assertNoDupeNodes(funcNode, 'body');

        vgroupEnd();
        ++changes;
        return;
      }

      ASSERT(arg.type !== 'Param', 'The param to a $coerce call cannot be a Param because they should be kept in the func header where $coerce should not be possible');
      // this/arguments alias? Maybe primitives before normalization or something...?
      vlog('  - Arg is not an ident or param (', arg.type, '), bailing');
      return;
    }

    if (
      firstStmt.type === 'ExpressionStatement' &&
      firstStmt.expression.type === 'AssignmentExpression' &&
      firstStmt.expression.right.type === 'CallExpression' &&
      firstStmt.expression.right.callee.type === 'Identifier' &&
      firstStmt.expression.right.callee.name === SYMBOL_COERCE
    ) {
      // `function f() { y = $(coerce, x, 'string') }`
      // Coerce as a statement

      vlog('- First statement is assignment (not decl) of a $coerce');

      // Check whether arg `x` is a closure. It doesn't have to be. Note that it can't be a Param because
      // they can only appear in the func header, where $coerce should not be possible. But it can be the
      // name of a param, which is pretty much what we need to check.
      const arg = firstStmt.expression.right.arguments[0];
      ASSERT(arg, 'in normalized code, $coerce should be crafted by us and so this arg should exist');
      const argMeta = fdata.globallyUniqueNamingRegistry.get(arg.name);

      const lhs = firstStmt.expression.left;
      ASSERT(lhs?.type === 'Identifier', 'right? what else could it be?', lhs);
      const lhsMeta = fdata.globallyUniqueNamingRegistry.get(lhs.name);

      if (arg.type === 'Identifier' && funcNode.$p.paramNames.includes(arg.name)) {
        // `let b = $; function f(a, b) { a = $coerce( b, "plustr" ); } f()`
        // `let a = undefined; let b = $; function f(b) { a = $coerce( b, "plustr" ); } f()`
        vlog('  - $coerce arg is a param.'); // Kind of unusual but ok

        // Check if lhs is closure or param (this is the first statement so there is no other choice..?)
        if (funcNode.$p.paramNames.includes(lhs.name)) {
          ASSERT(false, 'param to param assignment should be SSAd first and then it should not get here');
          return;
        }
        else {
          // `let a = undefined; let b = $; function f(b) { a = $coerce( b, "plustr" ); } f()`
          vlog('  - LHS is a closure. Assigning param to closure.'); // or the arguments/this alias
          // In this case we move the entire assignment out while replacing the rhs with the arg value.

          if (argMeta.varDeclRef?.containerNode.type !== 'VarStatement') {
            // `try {} catch (b) { function f() { $coerce( b, "plustr" ); } f() }`
            // Maybe we can support catch etc but not today.
            vlog('  - Closure is not a var binding, bailing');
            return;
          }

          if (funcMeta.reads.some(read => !read.blockChain.startsWith(argMeta.varDeclRef.node.$p.blockChain))) {
            // `let f; { let b = $; f = function() { $coerce( b, "plustr" ); } } f()`
            vlog('  - Not all call sites can reach the closure, bailing');
            return;
          }

          rule('Special $coerce with param assigned to closure as first statement of function can be outlined');
          example(
            'let a = undefined; let b = $; function f(c) { a = $coerce( c, "plustr" ); g(); } f(b)',
            'let a = undefined; let b = $; function f(c) { g(); } a = $coerce( b, "plustr" ); f(b)'
          );

          before(funcMeta.varDeclRef.containerParent[funcMeta.varDeclRef.containerIndex]);

          funcNode.body.body[funcNode.$p.bodyOffset] = AST.emptyStatement();

          after(funcMeta.varDeclRef.containerParent[funcMeta.varDeclRef.containerIndex]);

          funcMeta.reads.forEach(read => {
            before(read.blockBody[read.blockIndex]);

            read.blockBody[read.blockIndex] = AST.blockStatement(
              AST.expressionStatement(AST.cloneSortOfSimple(firstStmt.expression)),
              read.blockBody[read.blockIndex],
            );

            queue.push({
              index: read.blockIndex,
              func: () => {
                // Flatten the block
                read.blockBody.splice(read.blockIndex, 1, ...read.blockBody[read.blockIndex].body);
              }
            });

            after(read.blockBody[read.blockIndex]);
          });

          assertNoDupeNodes(funcNode, 'body');

          ++changes;
          return;
        }

      }
      else if (arg.type === 'Identifier') {
        // `let a = undefined; let b = $; function f() { a = $coerce( b, "plustr" ); } f()`
        // `let a = undefined; let b = $; function f() { a = $coerce( b, "plustr" ); } f()`
        vlog('  - Arg is a closure.');

        if (funcNode.$p.paramNames.includes(lhs.name)) {
          // `let a = undefined; let b = $; function f(c) { c = $coerce( b, "plustr" ); } f(a)`
          vlog('  - LHS is a param. Assigning param to closure.'); // or the arguments/this alias
          ASSERT(false, 'should not get here because c should be SSAd');
        } else {
          // `let a = undefined; let b = $; function f(b) { a = $coerce( b, "plustr" ); } f()`
          vlog('  - LHS is a closure. Assigning param to closure.'); // or the arguments/this alias
          // In this case we move the entire assignment out while replacing the rhs with the arg value.

          const lhsMeta = fdata.globallyUniqueNamingRegistry.get(lhs.name);

          if (lhsMeta.varDeclRef?.containerNode.type !== 'VarStatement') {
            // `let a = $(); try {} catch (b) { function f() { b = $coerce( a, "plustr" ); } f() }`
            // Maybe we can support catch etc but not today.
            vlog('  - Closure is not a var binding, bailing');
            return;
          }

          if (argMeta.varDeclRef?.containerNode.type !== 'VarStatement') {
            // `let a = undefined; try {} catch (b) { function f() { a = $coerce( b, "plustr" ); } f() }`
            // Maybe we can support catch etc but not today.
            vlog('  - Closure is not a var binding, bailing');
            return;
          }

          if (funcMeta.reads.some(read => !read.blockChain.startsWith(lhsMeta.varDeclRef.node.$p.blockChain))) {
            // `let a = $(); let f; { let b = $; f = function() { b = $coerce( a, "plustr" ); } } f()`
            vlog('  - Not all call sites can reach the closure, bailing');
            return;
          }

          if (funcMeta.reads.some(read => !read.blockChain.startsWith(argMeta.varDeclRef.node.$p.blockChain))) {
            // `let a; let f; { let b = $; f = function() { b = $coerce( a, "plustr" ); } } f()`
            vlog('  - Not all call sites can reach the closure, bailing');
            return;
          }
          rule('Special $coerce with closure assigning to closure as first statement of function can be outlined');
          example(
            'let a = undefined; let b = $; function f(c) { a = $coerce( c, "plustr" ); g(); } f(b)',
            'let a = undefined; let b = $; function f(c) { g(); } a = $coerce( b, "plustr" ); f(b)'
          );

          before(funcMeta.varDeclRef.containerParent[funcMeta.varDeclRef.containerIndex]);

          funcNode.body.body[funcNode.$p.bodyOffset] = AST.emptyStatement();

          after(funcMeta.varDeclRef.containerParent[funcMeta.varDeclRef.containerIndex]);

          funcMeta.reads.forEach(read => {
            before(read.blockBody[read.blockIndex]);

            const clonedAssign = AST.cloneSortOfSimple(firstStmt.expression); // This is closure to closure so we shouldn't need anything else...
            read.blockBody[read.blockIndex] = AST.blockStatement(
              AST.expressionStatement(clonedAssign),
              read.blockBody[read.blockIndex],
            );

            queue.push({
              index: read.blockIndex,
              func: () => {
                // Flatten the block
                read.blockBody.splice(read.blockIndex, 1, ...read.blockBody[read.blockIndex].body);
              }
            });

            after(read.blockBody[read.blockIndex]);
          });

          assertNoDupeNodes(funcNode, 'body');

          vgroupEnd();
          ++changes;
          return;
        }
      }

      ASSERT(arg.type !== 'Param', 'The param to a $coerce call cannot be a Param because they should be kept in the func header where $coerce should not be possible');
      // this/arguments alias? Maybe primitives before normalization or something...?
      vlog('  - Arg is not an ident or param (', arg.type, '), bailing');
      return;
    }

    if (
      firstStmt.type === 'VarStatement' &&
      firstStmt.init.type === 'CallExpression' &&
      firstStmt.init.callee.type === 'Identifier' &&
      firstStmt.init.callee.name === SYMBOL_COERCE
    ) {
      // `function f() { y = $(coerce, x, 'string') }`
      // Coerce as a statement

      vlog('- First statement is var decl with a $coerce');

      const callExpr = firstStmt.init;

      // Check whether arg `x` is a closure. It doesn't have to be. Note that it can't be a Param because
      // they can only appear in the func header, where $coerce should not be possible. But it can be the
      // name of a param, which is pretty much what we need to check.
      const arg = callExpr.arguments[0];
      ASSERT(arg, 'in normalized code, $coerce should be crafted by us and so this arg should exist');
      const argMeta = fdata.globallyUniqueNamingRegistry.get(arg.name);

      if (arg.type === 'Identifier' && funcNode.$p.paramNames.includes(arg.name)) {
        // `let b = $; function f(b) { const c = $coerce( b, "plustr" ); } f(b)`
        vlog('  - $coerce arg is a param. Init decl with param');

        // In this case we move the $coerce out, passing in the result instead, and replacing the rhs with the arg value.

        rule('Special $coerce that is decl init with param as first statement of function can be outlined');
        example(
          'let a = $; function f(b) { const c = $coerce( b, "plustr" ); g(); } f(a)',
          'let a = $; function f(b) { const c = b; g(); } const tmp = $coerce( a, "plustr" ); f(tmp)'
        );

        before(funcMeta.varDeclRef.containerParent[funcMeta.varDeclRef.containerIndex]);

        funcNode.body.body[funcNode.$p.bodyOffset].init = arg; // Replaces `const b = $coerce(a)` with `const b = a;`

        after(funcMeta.varDeclRef.containerParent[funcMeta.varDeclRef.containerIndex]);

        funcMeta.reads.forEach(read => {
          before(read.blockBody[read.blockIndex]);

          const rhsParamIndex = funcNode.$p.paramNameToIndex.get(arg.name);
          const clonedCall = AST.cloneSortOfSimple(callExpr);
          const tmpName = createFreshVar('tmp', fdata);
          clonedCall.arguments[0] = read.parentNode.arguments[rhsParamIndex];
          read.parentNode.arguments[rhsParamIndex] = AST.identifier(tmpName);
          read.blockBody[read.blockIndex] = AST.blockStatement(
            AST.varStatement('const', tmpName, clonedCall),
            read.blockBody[read.blockIndex],
          );

          queue.push({
            index: read.blockIndex,
            func: () => {
              // Flatten the block
              read.blockBody.splice(read.blockIndex, 1, ...read.blockBody[read.blockIndex].body);
            }
          });

          after(read.blockBody[read.blockIndex]);
        });

        assertNoDupeNodes(funcNode, 'body');

        ++changes;
        return;
      }
      else if (arg.type === 'Identifier') {
        // `let b = $; function f() { const c = $coerce( b, "plustr" ); } f()`
        vlog('  - Arg is a closure.'); // or argument/this

        // `let a = undefined; let b = $; function f(b) { a = $coerce( b, "plustr" ); } f()`
        vlog('  - LHS is a closure. Assigning param to closure.'); // or the arguments/this alias
        // In this case we move the entire assignment out while replacing the rhs with the arg value.

        if (argMeta.varDeclRef?.containerNode.type !== 'VarStatement') {
          // `let a = undefined; try {} catch (b) { function f() { a = $coerce( b, "plustr" ); } f() }`
          // Maybe we can support catch etc but not today.
          vlog('  - Closure is not a var binding, bailing');
          return;
        }

        if (funcMeta.reads.some(read => !read.blockChain.startsWith(argMeta.varDeclRef.node.$p.blockChain))) {
          // `let a; let f; { let b = $; f = function() { b = $coerce( a, "plustr" ); } } f()`
          vlog('  - Not all call sites can reach the closure, bailing');
          return;
        }

        vlog('TODO: we would have to add a new parameter and pass in the result of the $coerce call to be able to outline this and even then it may still not be "better"')

      }

      ASSERT(arg.type !== 'Param', 'The param to a $coerce call cannot be a Param because they should be kept in the func header where $coerce should not be possible');
      // this/arguments alias? Maybe primitives before normalization or something...?
      vlog('  - Arg is not an ident or param (', arg.type, '), bailing');
      return;
    }

    vlog('  - nope.');
  }
  function inlineOp(funcMeta, funcNode, paramIndex, paramCount, stmt, stmtIndex) {
    const names = funcNode.$p.paramNames;

    let oldParamName = names[paramIndex];
    vlog('- Target param name: `' + oldParamName + '` with param index:', paramIndex, ', at statement index', stmtIndex);

    rule('Part 1: Function that is only called and uses a param in a position where we can outline it');
    example(
      'function f(a) { const x = a + 1; g(a); return x; } f(1); f("a");',
      'function f(a, b) { const x = b; g(a); return x; } f(1, 1 + 1); f("a" + 1);',
    );
    before(funcMeta.varDeclRef.containerNode);
    funcMeta.reads.forEach((read) => before(read.blockBody[read.blockIndex]));

    // We create a fresh param name and add it to the end
    // We replace the binary expression with the new param name
    // For all calls we create a local var with the binary expression of the arg at that position and the binary expression
    // To each call we append a new arg which is the new binding name
    // Must be careful with spreads, rest, and missing arguments (or do we guarantee those in normalized state? I don't think we can?)
    // But we've already verified that spreads did not occur, we ignore rest for now, and assume missing args always exist.
    // TODO: if the param concerns a rest we should bail
    // TODO: not sure if we should do it here but if it reaches here with a rest param then we can eliminate this rest statically

    const newParamName = '$$' + paramCount;
    const newParamNode = AST.param('$$' + paramCount, false);
    funcNode.params.push(newParamNode);
    const newLocalParamName = createFreshVar('tmpOutlinedParam', fdata);
    const newLocalParamNode = AST.varStatement('const', newLocalParamName, AST.identifier(newParamName));
    // Need to queue the inject because injecting the arg in the body pushes all other statements down
    queue.push({
      index: funcNode.$p.bodyOffset - 1,
      func: () => {
        funcNode.body.body.splice(funcNode.$p.bodyOffset - 1, 0, newLocalParamNode);
      },
    });

    // Replace the expression that we're outlining... The target can only be one of three;
    // `var x = <y>`, `x = <y>`, or `<y>`. We replace the expression y with the new var because we'll outline it.
    let expr;
    if (stmt.type === 'VarStatement') {
      expr = stmt.init;
      stmt.init = AST.identifier(newLocalParamName);
    } else if (stmt.expression.type === 'AssignmentExpression') {
      expr = stmt.expression.right;
      stmt.expression.right = AST.identifier(newLocalParamName);
    } else if (
      stmt.expression.type === 'UnaryExpression' ||
      stmt.expression.type === 'BinaryExpression' ||
      stmt.expression.type === 'CallExpression'
    ) {
      expr = stmt.expression;
      stmt.expression = AST.identifier(newLocalParamName);
    } else {
      source(stmt, true);
      ASSERT(false, 'implement me', stmt);
    }

    // Update all the call sites. They need to add a clone of the expression to their argument list.
    // They need to replace the occurrence of the parameter with the argument that represents it (same index).
    // `function f(a) { a + 2 } f(1)` -> `function f(a, b) { b } f(1, 1 + 2)`
    funcMeta.reads.forEach((read) => {
      queue.push({
        index: read.blockIndex,
        func: () => {
          vlog('For', funcMeta.uniqueName);
          rule('Part 2: add a new arg in calls to the function, replacing param for arg in same index');
          example('f(a);', 'let tmp = a + 1; f(a, tmp);');
          before(read.blockBody[read.blockIndex]);

          // Must first cache the expression in case it's a string... (otherwise we may accidentally break normalized form)
          // Other rules will reconcile this temporary alias, or melt the string concat, when necessary.
          const tmpNameA = createFreshVar('tmpSaooA', fdata); // Holds the arg value at param index
          const tmpNameB = createFreshVar('tmpSaooB', fdata); // Holds the cloned expr result

          const args = read.parentNode.arguments;
          // Make sure there are enough params right now otherwise our new arg will become an earlier one and map to the wrong param (-> tests/cases/normalize/defaults/one.md)
          // `function (a,b,c) {} f(a)` -> `f(a,undefined,undefined)`
          while (paramCount > args.length) {
            args.push(AST.identifier('undefined'));
          }

          // The expression that got outlined is `expr`. We need to clone it because we may copy it to multiple func calls.
          // We must find the position of the parameter (this is `oldParamName`, at `paramIndex` of the func param list)
          // This can have various forms. Once we find it, replace it with the arg at same index
          let clone;
          if (expr.type === 'UnaryExpression') {
            ASSERT(expr.argument.type === 'Identifier' && expr.argument.name === oldParamName);
            // `!$$1`
            clone = AST.unaryExpression(expr.operator, tmpNameA);
          }
          else if (expr.type === 'BinaryExpression') {
            if (expr.left.type === 'Identifier' && expr.left.name === oldParamName) {
              // `$$1 + a`
              clone = AST.binaryExpression(expr.operator, tmpNameA, AST.cloneSimple(expr.right));
            } else if (expr.right.type === 'Identifier' && expr.right.name === oldParamName) {
              // `a + $$1`
              clone = AST.binaryExpression(expr.operator, AST.cloneSimple(expr.left), tmpNameA);
            } else {
              ASSERT(false);
            }
          } else if (expr.type === 'CallExpression') {
            // Either calling the parameter directly, a method on the property, or calling a function or method with the parameter as arg
            // At this point, the param node name is
            if (expr.callee.type === 'Identifier') {
              if (expr.callee.name === oldParamName) {
                // $$0(0)
                clone = AST.callExpression(tmpNameA, expr.arguments.map(a => AST.cloneSimple(a)));
              } else {
                // f($$0)     (for any one arg)
                clone = AST.callExpression(tmpNameA, expr.arguments.map(a => AST.cloneSimple(a)));
              }
            } else {
              ASSERT(expr.callee.type === 'MemberExpression' && !expr.callee.computed, 'should be non-computed member yes?', expr.type, !!expr.computed, expr);
              if (expr.callee.object.type === 'Identifier' && expr.callee.object.name === oldParamName) {
                // $$0.slice(0)
                clone = AST.callExpression(AST.memberExpression(tmpNameA, expr.callee.property.name), expr.arguments.map(a => AST.cloneSimple(a)));
              } else {
                // xyz.foo($$0)
                // "foo".slice($$0)
                clone = AST.callExpression(AST.cloneSimple(expr.callee), expr.arguments.map(a => a.type === 'Identifier' && a.name === oldParamName ? AST.identifier(tmpNameA) : AST.cloneSimple(a)));
              }
            }
          } else if (expr.type === 'TemplateLiteral') {
            ASSERT(expr.expressions.length === 1 && expr.expressions[0].type === 'Identifier' && expr.expressions[0].name === oldParamName);
            // `a ${$$1} b`
            clone = AST.templateLiteral(expr.quasis.map(q => q.value.cooked), [AST.identifier(tmpNameA)]);
          } else {
            ASSERT(false, 'implement me', expr.type);
          }
          ASSERT(clone, 'clone must be set');

          read.blockBody.splice(
            read.blockIndex,
            0,
            AST.varStatement('const', AST.identifier(tmpNameA), AST.cloneSimple(read.parentNode.arguments[paramIndex])),
            AST.varStatement('const', AST.identifier(tmpNameB), clone),
          );
          read.parentNode.arguments.push(AST.identifier(tmpNameB));

          after(read.blockBody[read.blockIndex]);
          after(read.blockBody[read.blockIndex + 1]);
          after(read.blockBody[read.blockIndex + 2]);
        },
      });
    });

    after(funcMeta.varDeclRef.containerNode);
    funcMeta.reads.forEach((read) => after(read.blockBody[read.blockIndex]));
    ++changes;
  }

  if (changes) {
    vgroup('Unrolling call queue now:');

    queue.sort(({ index: a }, { index: b }) => b-a);
    queue.forEach(({ index, func }) => {
      ASSERT(typeof index === 'number', 'must queue a number...', index);
      func()
    });

    vgroupEnd();

    log('Static arg ops outlined:', changes, '. Restarting from normalization\n');
    return {what: 'staticArgOpOutlining', changes: changes, next: 'normal'};
  }
  log('Static arg ops outlined: 0.\n');
}
