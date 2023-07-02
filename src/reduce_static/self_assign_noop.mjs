// A function that replaces itself with a new function and then returns a call to that replacement,
// when the replacement has no closures and where the func is only ever being called, is basically a noop.
//
// let f = function() {
//   f = function() {
//     $();
//   };
//   return f();
// }
// f();
//
// In our target case, f is also being aliased so this rule will also check
// all aliased cases to confirm they are only ever calling the function.

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
  findBodyOffset, findBodyOffsetExpensiveMaybe, allReadsAreCallsOrAliasing,
} from '../utils.mjs';
import * as AST from '../ast.mjs';
import {findClosureRefs} from "./func_scope_promo.mjs"

export function selfAssignNoop(fdata) {
  group('\n\n\nChecking for self-assigning noop funcs');
  //vlog('\nCurrent state\n--------------\n' + fmat(tmat(fdata.tenkoOutput.ast)) + '\n--------------\n');
  const r = _selfAssignNoop(fdata);
  groupEnd();
  return r;
}
function _selfAssignNoop(fdata) {
  const ast = fdata.tenkoOutput.ast;

  let updated = processAttempt(fdata);

  log('');
  if (updated) {
    log('Self-assign-noop promoted:', updated, '. Restarting from phase1 to fix up read/write registry');
    return 'phase1';
  }
  log('Self-assign-noop promoted: 0.');
}

function processAttempt(fdata) {
  let updated = 0;

  // For this initial poc:
  // - find all references which are written exactly once after initialization
  // - confirm that both cases are writing a function
  // - confirm the second write is inside the function assigned in the first
  // - confirm the inner function only refers to local or global bindings (no closures)
  // - confirm the outer function then calls and returns the new inner function
  // - confirm that the the outer function is only ever called, or assigned to bindings which are only ever called
  // --> in that case we can replace the outer function with the inner function
  // --> the relevant difference is the instance reference, which is not observable when being called

  // This means
  //
  // function f(){
  //   f = function(){ return $(); };
  //   return f();
  // }
  //
  // Can change into
  //
  // function f(){
  //   return $();
  // }

  fdata.globallyUniqueNamingRegistry.forEach(function (meta, name) {
    if (meta.isBuiltin) return;
    if (meta.isImplicitGlobal) return;
    if (meta.isConstant) return;
    if (meta.rwOrder.length <= 2) return; // For now only target a very specific case.
    if (meta.writes[0]?.action !== 'write' || meta.writes[1]?.action !== 'write') return;
    if (meta.writes[0].kind !== 'var' || meta.writes[1].kind !== 'assign') return;

    group('- `' + name + '`');
    process(meta, name);
    groupEnd();
  });

  function process(meta, name) {
    // We already verified that the references start with two writes and are only reads after that
    // Now we must confirm that
    // - all reads are regular calls, or assignments to bindings which in turn are only called
    // - new function is called and immediately returned
    // - inner function only refers to local or global variables, no closures

    if (meta.writes.length !== 2) {
      log('   - bail: number of writes is not two', meta.writes.length);
      return;
    }

    const first = meta.writes[0];
    const second = meta.writes[1];

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
      vlog('   - bail: Second assign was not in root of function that was assigned in the first write');
      return;
    }

    // Confirmed that this was the case of a var initialized to a func and
    // inside that function the same binding was updated with a new function

    // Next step is to verify that this new function has no non-global-closures
    const refs = findClosureRefs(first.parentNode.init);
    if (!Array.from(refs).every(ref => {
      const meta = fdata.globallyUniqueNamingRegistry.get(ref);
      return meta.isImplicitGlobal || meta.isBuiltin || meta.bfuncNode.type === 'Program';
    })) {
      vlog('   - bail: inner function contains reference that is neither local nor global');
      return;
    }

    const bodyOffset = findBodyOffsetExpensiveMaybe(second.parentNode.right.body.body);
    ASSERT(bodyOffset > 0, 'at this point all functions should have a header and so the debugger statement should be found');

    // We've verified that
    // - this is a function var decl
    // - the binding is updated inside this function
    // - the update is another function
    // - the inner function has no closures, no references that are neither local nor global
    // We must now confirm that the outer function
    // - only mutates the function (verified above), calls this updated function, and returns that value
    // - for now it shouldn't do anything else. very specific but room for improvement.

    // In other words; we are going to verify the next three statements very tightly:
    //
    // a = function(){ ... }
    // const y = a();
    // return y;

    const outerBody = first.parentNode.init.body.body;
    const outerOffset = findBodyOffsetExpensiveMaybe(outerBody);
    ASSERT(outerOffset > 0, 'should find debugger statement');

    if (
      outerBody[outerOffset]?.type !== 'ExpressionStatement' ||
      outerBody[outerOffset].expression !== second.parentNode
    ) {
      vlog('   - bail: second statement was not assignment of the inner function');
      return;
    }

    if (
      outerBody[outerOffset + 1]?.type !== 'VariableDeclaration' ||
      outerBody[outerOffset + 1].declarations[0].id.type !== 'Identifier' ||
      outerBody[outerOffset + 1].declarations[0].init.type !== 'CallExpression' ||
      outerBody[outerOffset + 1].declarations[0].init.callee.type !== 'Identifier' ||
      outerBody[outerOffset + 1].declarations[0].init.callee.name !== name
    ) {
      vlog('   - bail: third statement was not var decl of calling the func again');
      return;
    }
    if (
      outerBody[outerOffset + 2]?.type !== 'ReturnStatement' ||
      outerBody[outerOffset + 2].argument.type !== 'Identifier' ||
      outerBody[outerOffset + 1].declarations[0].init.callee.type !== 'Identifier' ||
      outerBody[outerOffset + 1].declarations[0].id.name !== outerBody[outerOffset + 2].argument.name
    ) {
      vlog('   - bail: fourth statement was not returning the binding of the third statement');
      return;
    }

    // Okay, struct verified. Now we must verify that all the reads from this binding are func calls
    if (!allReadsAreCallsOrAliasing(fdata, meta)) {
      vlog('   - bail: at least one usage of the binding was not a func call');
      return;
    }

    // I think we've now verified the following structure
    // let f = function() {
    //   f = function(){
    //     return $();
    //   };
    //   const y = f();
    //   return y;
    // }
    // with any other references to `f` being plain calls to the function or aliasing where the alias is only called

    // Next step is to replace the outer function with the inner function
    // We can also replace all references to the alias (but maybe we don't have to since the func will be a constant after this step)

    // TODO: map args properly
    rule('Self assignment that is redundant allow the outer function to be replaced by the inner function');
    example('let f = function(){ f = function(){ return $(); }; return f(); } f() === f();', 'let f = function(){ return $(); } f() === f();');
    before(first.parentNode);
    first.parentNode.init = second.parentNode.right;
    after(first.parentNode);

    ++updated;
  }

  return updated;
}
