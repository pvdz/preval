// If a variable is assigned a function and inside that function assigned another function then
// if that inner function returns a reference to a variable of the outer function and the outer
// function returns the results of calling that new inner function then we can outline it in certain cases.
//
// `function f(){ const arr = [1,2,3]; f = function(){ return arr; }; return f(); }`
//
// Another word to describe this is "deferred encapsulated immutable caching" as the original value cannot
// be accessed/changed directly but won't be created until calling the function for the first time.
//
// - function self assigns a function
// - new function returns a closure from old function
// - old function calls new function and returns its return value
// - no observable side effects between self-assignment and returning (else Z or arr could be updated once again)
// - function is not otherwise aliased (that's a more complex case), only ever called
// --> function invariably returns a closure and future calls to it can't create a different instance of the array
//  --> create outer variable (not necessary a global)
//  --> replace future calls where we can guarantee the same reference with self_assign+outer_ref

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
  findBodyOffset, findBodyOffsetExpensiveMaybe,
} from '../utils.mjs';
import * as AST from '../ast.mjs';
import {expressionHasNoObservableSideEffect} from "../ast.mjs"

export function selfAssignClosure(fdata) {
  group('\n\n\nChecking for self-assigning funcs returning their own closures');
  //vlog('\nCurrent state\n--------------\n' + fmat(tmat(fdata.tenkoOutput.ast)) + '\n--------------\n');
  const r = _selfAssignClosure(fdata);
  groupEnd();
  return r;
}
function _selfAssignClosure(fdata) {
  const ast = fdata.tenkoOutput.ast;

  let updated = processAttempt(fdata);

  log('');
  if (updated) {
    log('Self-assign-closures promoted:', updated, '. Restarting from phase1 to fix up read/write registry');
    return {what: 'selfAssignClosure', changes: updated, next: 'phase1'};
  }
  log('Self-assign-closures promoted: 0.');
}

function processAttempt(fdata) {
  let updated = 0;

  // For this initial poc:
  // - find all references which are written exactly once after initialization
  // - confirm that both cases are writing a function
  // - confirm the second write is inside the function assigned in the first
  // - confirm the inner function returns a reference created in the outer function
  // - confirm the outer function then calls the new inner function
  // - confirm that the variables can not be mutated or changed between these steps
  // - confirm that the function is only ever called (not aliased, not blackholed)
  //   - note that the alias case is slightly different and more complex

  // This means
  //
  // function f(){
  //   const arr = [1,2,3];
  //   f = function(){ return arr; };
  //   return f();
  // }
  //
  // Can change into
  //
  // const arr = [1,2,3];
  // function f(){
  //   f = function(){ return arr; };
  //   return f();
  // }
  //
  // (to be optimized after that)
  // The invariant to hold is that `f() === f()`

  fdata.globallyUniqueNamingRegistry.forEach(function (meta, name) {
    if (meta.isBuiltin) return;
    if (meta.isImplicitGlobal) return;
    if (meta.isConstant) return;
    if (meta.rwOrder.length <= 2) return; // For now only target a very specific case.
    if (meta.rwOrder[0]?.action !== 'write' || meta.rwOrder[1]?.action !== 'write') return;
    if (meta.rwOrder[0].kind !== 'var' || meta.rwOrder[1].kind !== 'assign') return;
    if (meta.rwOrder.some((rw, i) => i >= 2 && rw.action !== 'read')) return; // require two writes and only reads

    vgroup('- `' + name + '`');
    process(meta, name);
    vgroupEnd();
  });

  function process(meta, name) {
    // Initially, only target the write-write-read+ case. We can try to expand that later but not sure if we have to.
    // We already verified that the references start with two rwites and are only reads after that
    // Now we must confirm that
    // - all reads are regular calls
    // - one read occurs after the write
    // - the result of _that_ call is returned
    // - and more


    const rwOrder = meta.rwOrder;
    const first = rwOrder[0];
    const second = rwOrder[1];

    if (first.parentNode.type !== 'VariableDeclarator' && first.parentNode.prop !== 'id') {
      return;
    }
    if (first.parentNode.init.type !== 'FunctionExpression') {
      return;
    }
    if (second.parentNode.type !== 'AssignmentExpression' && first.parentProp !== 'left') {
      // Not assigning TO the binding
      return;
    }
    if (second.parentNode.right.type !== 'FunctionExpression') {
      return;
    }
    if (!first.parentNode.init.body.body.includes(second.grandNode)) {
      // Second assign was not in root of function that was assigned in the first write
      return;
    }

    // Confirmed that this was the case of a var initialized to a func and
    // inside that function the same binding was updated with a new function

    // Next step is to verify that this new function returns a binding and
    // that this binding is a local variable of the initial function.

    const bodyOffset = findBodyOffsetExpensiveMaybe(second.parentNode.right.body.body);
    ASSERT(bodyOffset > 0, 'at this point all functions should have a header and so the debugger statement should be found');
    if (second.parentNode.right.body.body.length - bodyOffset !== 1) {
      vlog('  - bail: does not have exactly one statement');
      return;
    }
    if (second.parentNode.right.body.body[bodyOffset].type !== 'ReturnStatement') {
      vlog('  - bail: inner function does not have a single return statement');
      return;
    }

    // Must now confirm that it returns a binding that is registered in the parent function
    const returnArg = second.parentNode.right.body.body[bodyOffset].argument;
    ASSERT(returnArg, 'normalized return must have arg');

    const returnedBindingName = second.parentNode.right.body.body[bodyOffset].argument.name;
    const returnValueMeta = fdata.globallyUniqueNamingRegistry.get(returnedBindingName);
    ASSERT(returnValueMeta, 'name must be known');

    if (returnValueMeta.bfuncNode !== first.parentNode.init) {
      vlog('   - bail: returned ident is not from parent scope');
      return;
    }

    // We've verified that
    // - this is a function var decl
    // - the binding is updated inside this function
    // - the update is another function
    // - the inner function only has a return statement
    // - the return statement is a binding from the outer function
    // - the binding in the outer statement has an init that is not observable (no function call etc), because we want to move it outside
    //   - TODO: followup improvement to support that case too in some situations. requires being certain about when/where the function is called first.
    // We must now confirm that the outer function
    // - only creates the binding, mutates the function (verified above), calls this updated function, and returns that value
    // - for now it shouldn't do anything else. very specific but room for improvement.

    // In other words; we are going to verify the next four statements very tightly:
    //
    // const x = <non-observable-expression>;
    // a = function(){ return x; }
    // const y = a();
    // return y;

    const outerBody = first.parentNode.init.body.body;
    const outerOffset = findBodyOffsetExpensiveMaybe(outerBody);
    ASSERT(outerOffset > 0, 'should find debugger statement');

    if (
      outerBody[outerOffset].type !== 'VariableDeclaration' ||
      outerBody[outerOffset].declarations[0].id.name !== returnedBindingName ||
      !expressionHasNoObservableSideEffect(outerBody[outerOffset].declarations[0].init, true)
    ) {
      // All names are unique at this point. So the returned name, which we expect to be
      // bound in the outer function, should be the one being declared here. And it's not.
      vlog('   - bail: did not find binding that was returned by inner func');
      return;
    }
    const closureValueNode = outerBody[outerOffset].declarations[0].init;
    if (
      outerBody[outerOffset + 1]?.type !== 'ExpressionStatement' ||
      outerBody[outerOffset + 1].expression !== second.parentNode
    ) {
      vlog('   - bail: second statement was not assignment of the inner function');
      return;
    }

    if (
      outerBody[outerOffset + 2]?.type !== 'VariableDeclaration' ||
      outerBody[outerOffset + 2].declarations[0].id.type !== 'Identifier' ||
      outerBody[outerOffset + 2].declarations[0].init.type !== 'CallExpression' ||
      outerBody[outerOffset + 2].declarations[0].init.callee.type !== 'Identifier' ||
      outerBody[outerOffset + 2].declarations[0].init.callee.name !== name
    ) {
      vlog('   - bail: third statement was not var decl of calling the func again');
      return;
    }
    if (
      outerBody[outerOffset + 3]?.type !== 'ReturnStatement' ||
      outerBody[outerOffset + 3].argument.type !== 'Identifier' ||
      outerBody[outerOffset + 2].declarations[0].init.callee.type !== 'Identifier' ||
      outerBody[outerOffset + 2].declarations[0].id.name !== outerBody[outerOffset + 3].argument.name
    ) {
      vlog('   - bail: fourth statement was not returning the binding of the third statement');
      return;
    }

    // Okay, struct verified. Now we must verify that all the reads from this binding are func calls
    if (meta.rwOrder.some((rw, i) => {
      if (i <= 1) return false;
      if (rw.kind !== 'read') return true;
      if (rw.parentNode.type !== 'CallExpression') return true;
      if (rw.parentProp !== 'callee') return true;
      return false;
    })) {
      vlog('   - bail: at least one usage of the binding was not a func call');
      return;
    }

    // I think we've now verified the following structure
    // let f = function() {
    //   const x = <non-observable-expression>;
    //   f = function(){
    //     return x;
    //   };
    //   const y = f();
    //   return y;
    // }
    // with any other references to `f` being plain calls to the function

    // Next step is to replace the init of the outer function binding (the function
    // itself) with the non-observable-expression that it was returning. All calls to
    // the function should be changed to plain identifier references.

    rule('Self assignment of closure can be replaced with closure value in very specific case');
    example('let f = function(){ const x = [1,2,3]; f = function(){ return x; }; return f(); } f() === f();', 'const f = [1,2,3]; f === f;');
    example('f();', 'f');
    before(first.parentNode);
    first.parentNode.init = closureValueNode;
    after(first.parentNode);
    meta.rwOrder.forEach((read, i) => {
      if (i < 2) return;

      before(read.parentNode);
      if (read.grandIndex < 0) read.grandNode[read.grandProp] = AST.identifier(name);
      else read.grandNode[read.grandProp][read.grandIndex] = AST.identifier(name);
      after(read.parentNode);
    })

    ++updated;
  }

  return updated;
}
