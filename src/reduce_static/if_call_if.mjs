// Attempt to tackle the common problem left behind by a logical OR:
// An If statement and either branch calls a function that starts with another If statement with the same condition.
//
// ```
// let x = condition();
// const f = function(){
//   if (x) {
//     stuff();
//   } else {
//     return g();
//   }
// }
// if (x) {
//   x = newCondition();
//   f();
// } else {
//   f();
// }
// ```
// Incidentally, it also tracks the pattern of a function that starts with an `if` where the `if`-test is explicitly set prior to the call

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
import { resolveNodeAgainstParams } from '../bindings.mjs';
import { returnStatement } from '../ast.mjs';

export function ifCallIf(fdata) {
  group('\n\n\n[ifCallIf] Checking for the if-call-if pattern');
  //currentState(fdata, 'ifCallIf', true, fdata);
  const r = _assignHoisting(fdata);
  groupEnd();
  return r;
}
function _assignHoisting(fdata) {
  let updated = processAttempt(fdata);

  log('');
  if (updated) {
    log('If-call-if patterns changed:', updated, '. Restarting from phase1 to fix up read/write registry');
    return {what: 'ifCallIf', changes: updated, next: 'phase1'};
  }
  log('If-call-if patterns changed: 0.');
}

function processAttempt(fdata) {
  // - Find functions that start with an `if`.
  // - Find there call sites and check if those are in a branch.
  // - Confirm that either
  //   - The call is the first statement of that branch and the `if` had the same condition, or
  //   - the previous assignment is to the if condition and statically resolves to truthy or falsy
  // - Provided that all holds, we can do things.

  const queue = [];

  fdata.globallyUniqueNamingRegistry.forEach(function (meta, name) {
    if (meta.isBuiltin) return;
    if (meta.isImplicitGlobal) return;
    if (!meta.isConstant) return; // Only consider constant functions

    vgroup('- `' + name + '`');
    process(meta, name, fdata, queue);
    vgroupEnd();
  });

  return processQueue(fdata, queue);
}

function process(meta, name, fdata, queue) {
  const write = meta.writes[0];
  if (write.kind !== 'var') {
    vlog('First write is not a var, bailing');
    return;
  }

  const innerFuncNode = meta.varDeclRef.node;
  if (innerFuncNode.type !== 'FunctionExpression') {
    vlog('Var decl init was not a function, bailing');
    return;
  }

  const innerFuncBody = innerFuncNode.body.body;
  const innerIfNode = innerFuncBody[innerFuncNode.$p.bodyOffset];
  if (innerIfNode?.type !== 'IfStatement') {
    // TODO: we may be able to skip past unobservable side effects here
    vlog('First statement of the function was not an if, bailing');
    return;
  }

  const innerIfTest = innerIfNode.test;
  if (AST.isPrimitive(innerIfTest)) {
    vlog('The `if` test is a primitive. Resolve it through other means.');
    return;
  }
  if (innerIfTest.type !== 'Identifier') {
    vlog('The `if` test was not an identifier, bailing');
    return;
  }
  // TODO: do we want to check for local binding here? The test could be a param. Or not care as much?

  // Milestone 1: this is a function and starts with an `if`

  vlog('Function ok. The `if` tests on `' + innerIfTest.name + '`. Walking through all refs for this function');
  meta.reads.forEach((read, i) => {
    vgroup('- Read', i, ', ifChain:', read.ifChain);
    processRead(fdata, queue, read, i, innerFuncNode, innerIfNode, innerIfTest);
    vgroupEnd();
  });
}

function processRead(fdata, queue, read, i, innerFuncNode, innerIfNode, innerIfTest) {
  // Inner is the function/if/test being called from this read. The read is the outer.

  if (read.parentNode.type !== 'CallExpression' || read.parentProp !== 'callee') {
    vlog('- Not a call to the func');
    return;
  }

  vlog('Searching for parent `if` in parent owner func', read.innerIf);

  if (read.innerIf === 0) {
    vlog('Parent is global. This is not the pattern. Bailing.');
    return;
  }

  const outerIfNode = fdata.flatNodeMap.get(read.innerIf);
  ASSERT(outerIfNode);

  const outerBranchBody = read.blockBody;
  const outerIfTest = outerIfNode.test;
  vlog(
    '    Found parent `if`. The `if` is testing on:',
    outerIfTest.type === 'Identifier' ? '`' + outerIfTest.name + '`' : 'something that is not an ident',
  );

  const outerCallBranchIndex = read.blockIndex;

  const isCallInOuterIf =
    outerIfNode.consequent.body === outerBranchBody
      ? innerIfNode.consequent.body
      : outerIfNode.alternate.body === outerBranchBody
      ? innerIfNode.alternate.body
      : undefined;

  if (!isCallInOuterIf) {
    vlog('Found parent `if` but the read was not a direct parent of either branch. Maybe nested or smth. Bailing.');
    return;
  }

  let innerBranchBody = isCallInOuterIf;
  const innerTestName = innerIfTest.name;

  if (outerCallBranchIndex === 0) {
    if (outerIfTest.type !== 'Identifier') {
      vlog('    Outer `if` test was not an identifier, bailing');
      return;
    }
    if (innerTestName !== outerIfTest.name) {
      vlog('Call was the first statement of an `if` that tests for a different name than the inner `if`, bailing');
      return;
    }

    vlog(
      'The call was the first of a branch of an `if` that tests on the same ident as the first `if` of the outer function. This allows us to safely infer the truthy/falsy state of this variable.',
    );

    // Since the call was the first statement after an `if(x)`, we can safely conclude that the state of `x` must have
    // the same truthfulness value at the start of the call of the inner function.
  } else {
    vlog('The call was not the first statement of the branch. Checking if previous statement tells us the state of the test');
    // Confirm if the previous statement may tell us whether the value is truthy or falsy. If all previous statements
    // cannot observe the variable then we can assume truthy anyways.

    let n = outerCallBranchIndex - 1;
    while (n >= 0) {
      const outerPrev = outerBranchBody[n];
      if (
        outerPrev?.type === 'ExpressionStatement' &&
        outerPrev.expression.type === 'AssignmentExpression' &&
        outerPrev.expression.left.type === 'Identifier' &&
        outerPrev.expression.left.name === innerIfTest.name
      ) {
        vlog('The statement before the call was an assignment to the test var `' + innerTestName + '`. checking truthy/falsy state of rhs');
        break;
      }
      --n;
    }
    if (n < 0) {
      vlog(
        'None of the statements before the call could have changed the var used as if-test so confirm that the outer `if` tests on the same name and then assume its truthfullness state',
      );
      if (outerIfTest.type !== 'Identifier') {
        vlog('    Outer `if` test was not an identifier, bailing');
        return;
      }
      if (innerTestName !== outerIfTest.name) {
        vlog('Call was the first statement of an `if` that tests for a different name than the inner `if`, bailing');
        return;
      }
      // Assume the truthfullness of the parent if-test is still the same. Depending on which branch contained the call, use
      // that state (if/else -> truthy/falsy).
      if (outerIfNode.consequent.body === read.blockBody) {
        vlog(
          'The call happened in the truthy branch, there were no statements before the call, assuming `' + innerTestName + '` is truthy',
        );
        innerBranchBody = innerIfNode.consequent.body;
      } else {
        vlog('The call happened in the falsy branch, there were no statements before the call, assuming `' + innerTestName + '` is falsy');
        innerBranchBody = innerIfNode.alternate.body;
      }
    } else {
      // The ident was not changed so it should be the same truthfullness value as the if-test
      const outerPrev = outerBranchBody[n];
      const rhs = outerPrev.expression.right;
      if (AST.isTruthy(rhs)) {
        vlog('The call was preceded by an assignment of a truthy value to the condition');
        innerBranchBody = innerIfNode.consequent.body;
      } else if (AST.isFalsy(rhs)) {
        vlog('The call was preceded by an assignment of a falsy value to the condition');
        innerBranchBody = innerIfNode.alternate.body;
      } else {
        // TODO: confirm that we can assert the if-test value, either because all previous statements can not change it or because we can infer the value from the last one that could
        vlog('Bailing for now because the prev statement did assign to the variable but we could not assert truthy or falsy');
        return;
      }
    }
  }

  // The `innerBranchBody` should now be the branch body of the `if` inside the inner function that is invariantly going to be
  // executed when calling the inner function. We must now determine whether the statements in this branch can be inlined.
  // As a general rule of thumb, we can not inline statements if they increase the total line count.
  // Here specifically, we can only inline the branch if it has a return as the first or second statement. We bail otherwise.

  vlog('Now we need to validate whether the resulting inner branch can be inlined at all');
  source(innerBranchBody);
  // TODO: edge case; TDZ error when it returns a binding declared after the return `if (x) { return y; let y; }`. Not very important rn.
  if (innerBranchBody.length === 0) {
    vlog(
      'The branch has no statements. Need to confirm whether the `if` was the last statement of the function. It probably was not. Bailing.',
    );
    // Note: in normalized code, all returns are explicit and tail if-statements have an explicit return in each branch.
    //       As such, since this branch did not end with a return, it should not be the last statement of the function.
    return;
  } else if (innerBranchBody.length > 0 && innerBranchBody[0].type === 'ReturnStatement') {
    vlog('The first statement of the inner branch returned');
    tryToInline(queue, read, innerBranchBody[0], undefined, innerFuncNode);
  } else if (innerBranchBody.length > 1 && innerBranchBody[1].type === 'ReturnStatement') {
    vlog('The second statement of the inner branch returned');
    tryToInline(queue, read, innerBranchBody[0], innerBranchBody[1], innerFuncNode);
    //} else if () {
    //  // Edge case specifically for the pattern where the same binding is updated twice and where one branching path
    //  // in particular the first write is unobservable in userland. It goes a little this:
    //  // `function f(){ if (test) {} else { test = 'hidden'; if (test) { } else { test = 'visible' } } }`
    //  // Except, of course, abstracted into functions and a translation artifact of other rules.
    //  // In this case we can inline the three statements of the inner function (assignment, call, return) into the
    //  // outer `else` branch which also did an assignment, call, return.
    //  // TODO
  } else {
    // Either this branch has more than two statements, or (considering normalized code), this
    // `if` is not at the end of the function.
    vlog('Cannot inline this function because the branch does not return in the first two statements');
  }
}

function tryToInline(queue, read, innerFirstStatement, innerSecondStatementMaybe, innerFuncNode) {
  vgroup('tryToInline');
  _tryToInline(queue, read, innerFirstStatement, innerSecondStatementMaybe, innerFuncNode);
  vgroupEnd();
}
function _tryToInline(queue, read, innerFirstStatement, innerSecondStatementMaybe, innerFuncNode) {
  // Basically replace the call to this function with the return value. Prepend the other statement to the statement
  // that contained the call. If this is a var binding trampoline, make sure to use fresh variables as we keep the `if`, too.
  // Considering it was a function call before, this should not inflate the statement count down the line.
  // outerReturnArg is the returned value in case the statement containing the read was immediately followed by a return.

  const innerReturnStatement = innerSecondStatementMaybe || innerFirstStatement;
  // If there was only a return statement, simplify the remaining logic by padding an undefined statement
  const innerTopStatement = innerSecondStatementMaybe ? innerFirstStatement : AST.expressionStatement(AST.identifier('undefined'));
  ASSERT(
    innerReturnStatement?.type === 'ReturnStatement',
    'currently we only inline if the inner branch has a return for the first or second statement. update me if that changes.',
    innerFirstStatement,
    innerSecondStatementMaybe,
  );
  ASSERT(innerTopStatement, 'should have a first as well');

  switch (innerTopStatement.type) {
    case 'VarStatement':
      const declName = innerTopStatement.id.name;
      log('The first inner statement is a var, to `' + declName + '`');
      // Confirm that this is the name being returned. It almost has to be, especially in normalized code, but who knows.
      // Then clone the rhs in a param aware way

      if (innerReturnStatement.argument.type !== 'Identifier') {
        // If it exists then this is an edge case within the IR. There's no test that covers this case.
        vlog('The return statement of the inner branch does not return an identifier. TODO');
        return;
      }

      if (innerReturnStatement.argument.name !== declName) {
        // If it exists then this is an edge case within the IR. There's no test that covers this case.
        vlog('The return statement does not return the ident that was created in the first statement. TODO');
        vlog('First statement defined `' + declName + '` and the return statement returned `' + innerReturnStatement.argument.name + '`');
        return;
      }

      vlog('Queued up node', read.node.$p.npid, 'for inlining');

      queue.push({
        what: 'var',
        index: read.blockIndex,
        read,
        innerFuncNode,
        innerFirstStatement: innerTopStatement,
        innerReturnStatement: innerReturnStatement,
      });

      return;

    case 'ExpressionStatement':
      vlog('Queued up node', read.node.$p.npid, 'for inlining');

      queue.push({
        what: 'expr',
        index: read.blockIndex,
        read,
        innerFuncNode,
        innerFirstStatement: innerTopStatement,
        innerReturnStatement: innerReturnStatement,
      });

      return;
    default:
      // Do I care? This could be if/while/for/
      vlog('First statement is not a var or expression. Bailing');
      return;
  }
}

function processQueue(fdata, queue) {
  let updated = 0;

  vlog('Queued up', queue.length, 'more read to potentially inline');
  if (queue.length) {
    // Elements in the queue may still be blocked if it can't create clones for the expressions

    // Sort in reverse DFS order. PID are incremental in DFS order.
    queue.sort(({ index: a }, { index: b }) => b - a);

    vgroup('Draining queue');
    queue.forEach(({ what, read, innerFuncNode, innerFirstStatement, innerReturnStatement }) => {
      vlog('- Next node in queue:', read.node.$p.npid);

      if (what === 'var') {
        const newInit = paramAwareClone(innerFirstStatement.init, read.parentNode, innerFuncNode);
        if (!newInit) {
          // Something should have been printed.
          vlog('Could not param clone the init. Bailing');
          return;
        }

        // This var decl was created and returned (trampoline)
        // Replace the call expression with this init. That's it.
        vlog('Replacing the var-call expression with a param sensitive clone of the init');
        rule('if-call-if inlining; var-return');
        before(read.grandNode[read.grandProp][read.grandIndex] ?? read.grandNode[read.grandProp]);

        if (read.grandIndex < 0) read.grandNode[read.grandProp] = newInit;
        else read.grandNode[read.grandProp][read.grandIndex] = newInit;

        after(read.grandNode[read.grandProp][read.grandIndex] ?? read.grandNode[read.grandProp]);
        ++updated;
      } else if (what === 'expr') {
        const newExpr = paramAwareClone(innerFirstStatement.expression, read.parentNode, innerFuncNode);
        if (!newExpr) {
          // Something should have been printed.
          vlog('Could not param clone the init. Bailing');
          return;
        }
        const newReturn = paramAwareClone(innerReturnStatement.argument, read.parentNode, innerFuncNode);
        if (!newReturn) {
          // Something should have been printed.
          vlog('Could not param clone the return value. Bailing');
          return;
        }

        rule('if-call-if inlining; expr');
        before(read.grandNode[read.grandProp][read.grandIndex] ?? read.grandNode[read.grandProp]);

        if (read.grandIndex < 0) read.grandNode[read.grandProp] = newReturn;
        else read.grandNode[read.grandProp][read.grandIndex] = newReturn;
        read.blockBody.splice(read.blockIndex, 0, AST.expressionStatement(newExpr));

        after(read.blockBody[read.blockIndex]);
        after(read.blockBody[read.blockIndex + 1]);
        ++updated;
      }
    });
    vgroupEnd();
  }

  return updated;
}

function paramAwareClone(expr, callNode, funcNode) {
  switch (expr.type) {
    case 'AssignmentExpression':
      // TODO: what if there is an assignment to a param name? If we inline that the result is observable...
      return AST.assignmentExpression(paramAwareClone(expr.left, callNode, funcNode), paramAwareClone(expr.right, callNode, funcNode));
    case 'CallExpression':
      return AST.callExpression(
        paramAwareClone(expr.callee, callNode, funcNode),
        expr.arguments.map((anode) => paramAwareClone(anode, callNode, funcNode)),
      );
    case 'NewExpression':
      return AST.newExpression(
        paramAwareClone(expr.callee, callNode, funcNode),
        expr.arguments.map((anode) => paramAwareClone(anode, callNode, funcNode)),
      );
    case 'BinaryExpression':
      return AST.binaryExpression(
        expr.operator,
        paramAwareClone(expr.left, callNode, funcNode),
        paramAwareClone(expr.right, callNode, funcNode),
      );
    case 'UnaryExpression':
      return AST.unaryExpression(expr.operator, paramAwareClone(expr.argument, callNode, funcNode));
    case 'SuperExpression':
      //console.log('TODO');
      return null;
    case 'FunctionExpression':
      // I don't want to clone functions for now
      //console.log('TODO');
      return null;
    case 'ClassExpression':
      // I don't want to clone classes for now
      //console.log('TODO');
      return null;
    case 'Identifier':
      const [resolvedLeft, blockingSpread, paramIndex, isRest] = resolveNodeAgainstParams(expr, callNode, funcNode);
      // Npte: if resolvedLeft is a node, it will be fresh
      if (!resolvedLeft || blockingSpread) {
        // The reason will already have been printed
        //console.log('TODO');
        return null;
      }
      return resolvedLeft;
    case 'Literal':
      return AST.cloneSimple(expr);
    case 'TemplateLiteral':
      ASSERT(AST.isStringLiteral(expr), 'return args must be simple so this should be a template without expressions');
      return AST.cloneSimple(expr);
    case 'MemberExpression':
      return AST.memberExpression(
        paramAwareClone(expr.object, callNode, funcNode),
        expr.computed ? paramAwareClone(expr.property, callNode, funcNode) : AST.cloneSimple(expr.property),
        expr.computed,
      );
    case 'ObjectExpression':
      return AST.objectExpression(
        expr.properties.map((pnode) =>
          pnode.type === 'SpreadElement'
            ? AST.spreadElement(paramAwareClone(pnode.argument, callNode, funcNode))
            : AST.property(
                pnode.computed ? paramAwareClone(pnode.key, callNode, funcNode) : AST.cloneSimple(pnode.key),
                paramAwareClone(pnode.value, callNode, funcNode),
                false,
                pnode.computed,
                pnode.kind,
                pnode.method,
              ),
        ),
      );
    case 'ArrayExpression':
      return AST.arrayExpression(
        expr.elements.map((enode) =>
          !enode
            ? enode
            : enode.type === 'SpreadElement'
            ? AST.spreadElement(paramAwareClone(enode.argument, callNode, funcNode))
            : paramAwareClone(enode || AST.identifier('undefined'), callNode, funcNode),
        ),
      );

    default:
      ASSERT(false, 'add this node type', expr);
      return;
  }
}
