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

import { ASSERT, log, group, groupEnd, vlog, vgroup, vgroupEnd, rule, example, before, source, after, fmat, tmat, findBodyOffset, findBodyOffsetExpensiveMaybe, allReadsAreCallsOrAliasingOrRecursive, todo, } from '../utils.mjs';
import * as AST from '../ast.mjs';
import {findClosureRefs} from "./func_scope_promo.mjs"

export function selfAssignNoop(fdata) {
  group('\n\n\n[selfAssignNoop] Checking for self-assigning noop funcs');
  //currentState(fdata, 'selfAssignNoop'. true, fdata);
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
    return {what: 'selfAssignNoop', changes: updated, next: 'phase1'};
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

  function process(meta, targetFuncName) {
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

    if (first.kind !== 'var') {
      return;
    }
    const outerFunc = first.parentNode.init;
    if (outerFunc.type !== 'FunctionExpression') {
      return;
    }
    if (second.parentNode.type !== 'AssignmentExpression') {
      // Not assigning TO the binding
      return;
    }
    const innerFuncNode = second.parentNode.right;
    if (innerFuncNode.type !== 'FunctionExpression') {
      return;
    }
    if (!outerFunc.body.body.includes(second.grandNode)) {
      vlog('   - bail: Second assign was not in root of function that was assigned in the first write');
      return;
    }

    vlog('Have a candidate with two writes...', meta.writes.length, 'writes and', meta.reads.length, 'reads');

    // Confirmed that this was the case of a var initialized to a func and
    // inside that function the same binding was updated with a new function
    // `let f = function(){ ... f = function(){} ... };`

    vgroup('Next step is to verify that this new function has no non-global-closures');
    const refs = findClosureRefs(outerFunc);
    vgroupEnd();
    if (!Array.from(refs).every(ref => {
      const meta = fdata.globallyUniqueNamingRegistry.get(ref);
      return meta.isImplicitGlobal || meta.isBuiltin || meta.bfuncNode.type === 'Program';
    })) {
      vlog('   - bail: inner function contains reference that is neither local nor global');
      return;
    }

    const bodyOffset = findBodyOffsetExpensiveMaybe(innerFuncNode.body.body);
    ASSERT(bodyOffset > 0, 'at this point all functions should have a header and so the debugger statement should be found');

    // We've verified that
    // - this is a function var decl
    // - the binding is updated inside this function
    // - the update is another function
    // - the inner function has no closures, no references that are neither local nor global
    // We must now confirm that the outer function
    // - only:
    //   - mutates the function (that's verified above)
    //   - then calls this updated function
    //   - then and returns that value
    //   - and that all params of the outer function are only used to call the inner function or in any way inside the inner function
    // - for now it shouldn't do anything else. very specific but room for improvement.

    // In other words; we are going to verify the next three statements very tightly:
    //
    // a = function(){ ... }
    // const y = a();              <-- maybe with params from outer func as args
    // return y;

    const outerBody = outerFunc.body.body;
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
      outerBody[outerOffset + 1]?.type !== 'VarStatement' ||
      outerBody[outerOffset + 1].id.type !== 'Identifier' ||
      outerBody[outerOffset + 1].init.type !== 'CallExpression' ||
      outerBody[outerOffset + 1].init.callee.type !== 'Identifier' ||
      outerBody[outerOffset + 1].init.callee.name !== targetFuncName
    ) {
      vlog('   - bail: third statement was not var decl of calling the func again');
      return;
    }
    if (
      outerBody[outerOffset + 2]?.type !== 'ReturnStatement' ||
      outerBody[outerOffset + 2].argument.type !== 'Identifier' ||
      outerBody[outerOffset + 1].init.callee.type !== 'Identifier' ||
      outerBody[outerOffset + 1].id.name !== outerBody[outerOffset + 2].argument.name
    ) {
      vlog('   - bail: fourth statement was not returning the binding of the third statement');
      return;
    }

    // Okay, struct verified. Now we must verify that all the reads from this binding are func calls
    if (!allReadsAreCallsOrAliasingOrRecursive(fdata, meta, innerFuncNode.body.$p.blockChain)) {
      vlog('   - bail: at least one usage of the binding was not a func call');
      return;
    }

    // I think we've now verified the following structure
    // let f = function(<?>) {
    //   f = function(){
    //     return $();
    //   };
    //   const y = f(<?>);
    //   return y;
    // }
    // with any other references to `f` being plain calls to the function or aliasing where the alias is only called

    // Verify the outer function params. Ensure they are either used to call the inner function
    // immediately, and beyond that only inside the inner function. The latter is implied by the
    // above checks. There can also not be any rest param.
    // If there are no params and `arguments` is not referenced then we can skip this check entirely.

    const noParamsUsage = outerFunc.params.length === 0 && !outerFunc.$p.readsArgumentsAny;
    vlog('Are params of outer func not used?', noParamsUsage, ', params:', outerFunc.params.length, ', uses arguments:', outerFunc.$p.readsArgumentsAny);

    if (outerFunc.params.some(pnode => pnode.rest)) {
      vlog('  - bail: at least one outer param was a rest param');
      return;
    }
    // Beyond rest, I think normalization and the check above imply that the args are either only used as
    // call args to the inner function, or otherwise only inside the inner function, or not at all.

    // Track the first call. We need this to know the arguments to cache and to confirm that this is being called
    // before it gets aliased. We need that, otherwise an alias may get different closure and that would mess us up.

    let firstSpyExpr = noParamsUsage || findFirstCallToFunc(fdata, targetFuncName);
    if (!firstSpyExpr) {
      // We have another chance. It's a tight one, maybe too specific, but it'll work, there's a test.
      // If the func is only referenced in one scope and we can fully trace that usage ot its first call
      // then we should still be good to go... albeit less reliably (args may not be known).

      // An alternative is when there's no closure created. That's a bit superficial but that would be the case where
      // no params are used, which we catch above.

      vlog('Road to recovery; if the function usage is tight and we can track it');

      // The reads, other than the recursive call, should be in same block, back to back, etc
      // We have to support an alias case as well, yay.

      const rest = meta.reads.filter(read => read.node !== outerBody[outerOffset + 1].init.callee);
      ASSERT(rest.length === meta.reads.length - 1, 'should find the one read that was the recursive call...');

      // If there weren't any other reads then this is dead code and we should eliminate it...
      if (rest.length === 0) {
        todo('create a test case if this ever comes up; self closing func that has no reads');
        vlog('  - bail: there are no non-recursion calls, this is dead code');
        return;
      }

      const targetBlockChain = rest[0].blockChain;
      if (rest.some(read => read.blockChain !== targetBlockChain)) return vlog('  - bail: Not all reads were in same block');

      // Since the rest is all in same block, their order must be in order of appearance.
      // For our pattern, we target and track the first read.
      if (rest[0].parentNode.type === 'CallExpression' && rest[0].parentProp === 'callee') {
        // In this case the function is called first and all subsequent calls (which
        // we already verified to be non-escaping) are moot.
        vlog('All other reads are in same block, first one is called, this is the target call');
        firstSpyExpr = rest[0].parentNode;
      } else if (rest[0].parentNode.type === 'AssignmentExpression' && rest[0].parentProp === 'right') {
        // This is potentially the alias case, with regular assignment
        // Bail for now. We can support a subset of cases but it gets very specific.
        vlog('  - bail: alias through assignment case. too hot to handle rn.');
        return;
      } else if (rest[0].parentNode.type === 'VarStatement') {
        // This is potentially the alias case, with local var decl
        const aliasName = rest[0].parentNode.id.name;
        // Now the next statement must be a call to this function. And the only read of this alias.
        const aliasMeta = fdata.globallyUniqueNamingRegistry.get(aliasName);
        if (aliasMeta.writes.length === 1 && aliasMeta.reads.length === 1) {
          if (
            rest[0].blockBody === aliasMeta.reads[0].blockBody && // Same parent block?
            rest[0].blockIndex + 1 === aliasMeta.reads[0].blockIndex && // Next statement?
            aliasMeta.reads[0].parentNode.type === 'CallExpression' &&
            aliasMeta.reads[0].parentProp === 'callee' // do not forget.
          ) {
            // This case may be unreachable due to other transforms ... but whatever.
            vlog('Special alias case where first read of outer function is to alias it but the alias is immediately invoked');
            firstSpyExpr = aliasMeta.reads[0].parentNode;
          } else {
            vlog('  - bail: alias', [aliasName], 'is not immediately invoked', rest[0].blockBody === aliasMeta.reads[0].blockBody, rest[0].blockIndex,'===', aliasMeta.writes[0].blockIndex);
            return
          }
        } else {
          vlog('  - bail: alias has multiple reads or writes', aliasMeta.writes.length, aliasMeta.reads.length);
          return
        }
      } else {
        vlog('  - bail: first usage is not an alias or call; need to investigate this before we can support it');
        return;
      }

      if (!firstSpyExpr) return vlog('  - bail: final nope');
    }

    // Next step is to replace the outer function with the inner function
    // We can also replace all references to the alias (but maybe we don't have to since the func will be a constant after this step)

    rule('Self assignment that is redundant allow the outer function to be replaced by the inner function');
    example(
      'let f = function(a, b){ f = function(){ return $(a, b); }; return f(); } f(1,2) === f(3, 4);',
      'let f = function(){ return $(a, b); } const a = 1; const b; f() === f(3, 4);'
    );
    example(
      'let f = function(a, b){ f = function(c, d){ return $(c, d); }; return f(a, b); } f(1,2) === f(3, 4);',
      'let a = 3; let b = 4; let f = function(c, d){ return $(a, b); } const a = 1; const b; f() === f(3, 4);'
    );
    before(first.blockBody[first.blockIndex]);

    first.parentNode.init = innerFuncNode;

    vlog('Moving', outerFunc.params.length, 'params to be globals');

    // Outer function params become global consts, init is a clone of the args of the first call.
    // These are "closures" or "sealed"

    const newNodes = outerFunc.params.map((pnode, i) => {
      if (pnode.$p.paramVarDeclRef) {
        ASSERT(firstSpyExpr?.type === 'CallExpression', 'if noParamsUsage then this is `true` but it would not reach this point in the first place because .params would be empty', outerFunc, firstSpyExpr);
        return AST.varStatement(
          'let',
          pnode.$p.paramVarDeclRef.name,
          firstSpyExpr['arguments'][i] ? AST.cloneSimpleOrTemplate(firstSpyExpr['arguments'][i]) : AST.undef(),
        );
      }
    }).filter(Boolean);
    first.blockBody.splice(first.blockIndex, 0, ...newNodes);

    after(newNodes);
    after(first.blockBody[first.blockIndex + newNodes.length]);
    ++updated;
  }

  return updated;
}

function findFirstCallToFunc(fdata, targetFuncName) {
  vgroup('Searching for first spying statement..');
  const firstSpyStatement = findFirstSpy(fdata.tenkoOutput.ast);
  vlog('First spying statement: @', +firstSpyStatement?.$p.pid, firstSpyStatement?.type, firstSpyStatement?.expression?.type ?? firstSpyStatement?.init?.type);
  vgroupEnd();

  if (!firstSpyStatement) {
    todo('i dont expect this to be the case.. is the function not called at all?');
    vlog('  - bail: was unable to find any first statement. was this function not called?')
    return;
  }

  let firstSpyExpr;
  if (firstSpyStatement.type === 'VarStatement') {
    firstSpyExpr = firstSpyStatement.init;
  } else if (firstSpyStatement.type === 'ExpressionStatement') {
    firstSpyExpr = firstSpyStatement.expression;
    if (firstSpyExpr.type === 'AssignmentExpression') {
      firstSpyExpr = firstSpyExpr.right;
    }
  }
  if (!firstSpyExpr) {
    vlog('  - bail: the first spy statement is not var or expr');
    return;
  }
  // Verify that this expression is a call to this function
  if (firstSpyExpr.type !== 'CallExpression') return vlog('  - bail: the first spy statement was not a call');
  if (firstSpyExpr.callee.type !== 'Identifier') return vlog('  - bail: the first spy statement was not calling an ident;', firstSpyExpr.callee.type);
  if (firstSpyExpr.callee.name !== targetFuncName) return vlog('  - bail: the first spy statement was not calling our func;', firstSpyExpr.callee.name, '!==', targetFuncName);
  if (firstSpyExpr.arguments.some(anode => AST.isComplexNode(anode))) return vlog('  - bail: first spy call had complex arg (spread?)');

  return firstSpyExpr;
}

/**
 * Should return the statement that does something that may trigger a spy indirectly, or that
 * blocks us discovering this.
 *
 * If it returns a Node, then that's it.
 * If it returns undefined, this block did not have any such statements but also no blockers.
 */
function findFirstSpy(block) {
  for (let i=0; i<block.body.length; ++i) {
    const stmt = block.body[i];
    const r = findFirstCallStatement(stmt);
    if (r !== undefined) return r;
  }
  return undefined;
}

function findFirstCallStatement(stmt) {
  switch (stmt.type) {
    case 'BlockStatement': {
      // Not sure if we're supposed to see this, or if it should always be the child of another
      // statement to visit from that statement. I think encountering it here is when there's a
      // block as a nested block, not as the child of another statement. That's not normalized.
      // Either way, we can just visit it. I don't think it changes anything for us.
      return findFirstSpy(stmt);
    }
    case 'BreakStatement': {
      // Well, this is sort of a branching as well? Except we follow the trail to the target label.
      // TODO: I'm pretty sure we can support this to some degree but it'll require us to be able
      //       to jump to end of loops or labels. I think that's doable?
      return stmt;
    }
    case 'DebuggerStatement': {
      // skip
      return undefined;
    }
    case 'EmptyStatement': {
      // I'm not sure if we're supposed to expect to see this but whatever, skip.
      return undefined;
    }
    case 'ExpressionStatement': {
      // Skip past non-spies
      if (findFirstCallExpression(stmt.expression) !== undefined) return stmt
      return undefined;
    }
    case 'IfStatement': {
      // Recursion but for both branches
      // The merge is a bit tricky here. Maybe we should bail unless neither branch can trigger side effects?
      // We should also kind of know the test value here, since we're at the start of the code.
      // This value may come from an unknown global source, though, like $().
      return stmt;
    }
    case 'LabeledStatement': {
      // Just visit. It doesn't change anything in itself.
      return findFirstCallStatement(stmt.body);
    }
    case 'ReturnStatement': {
      // Track back to nearest function boundary. Continue from there?
      return stmt; // TODO: we can probably support some sort of thing here
    }
    case 'ThrowStatement': {
      // Mmmmm, track back to nearest TryBlock or Function boundary? Continue from there?
      return stmt; // TODO: support a try/catch thing here
    }
    case 'TryStatement': {
      // I'm not even sure but I think we can process the first statement and then only the catch block
      // We can't process anything after it because if it were all non-spy statements then the try
      // would be equally useless and we should eliminate it.
      return stmt; // TODO: support the minimal case here? The first statement, probably
    }
    case 'VarStatement': {
      // Skip past non-spies and structure assignments like funcs and arrays
      if (findFirstCallExpression(stmt.init) !== undefined) return stmt;
      return undefined;
    }
    case 'WhileStatement': {
      // Tricky. We can walk but we have to be super conservative.
      return stmt; // TODO: do tricky walk
    }
    default: {
      ASSERT(false, 'Missing statement type in first call search', stmt);
    }
  }
}

/**
 * Return undefined if okay. Return the node if it can spy or if it's something
 * that we don't know about.
 */
function findFirstCallExpression(expression) {
  switch (expression.type) {
    case 'ArrayExpression':{
      // Does not spy in normalized code: all elements must be simple and the array decl does not touch them
      return undefined;
    }
    case 'AssignmentExpression':{
      // In itself the assignment is not observable insofar that it cannot trigger a spy.
      // But the side effect is observable as it mutates a variable.
      // In the context of finding the first function call, this is relevant due to aliasing.
      if (expression.left.type === 'MemberExpression') return expression;
      // We are ignoring TDZ/ref errors here...
      return findFirstCallExpression(expression.right);
    }
    case 'AwaitExpression':{
      // I think the await expression itself does not mutate anything. It kind of implies that
      // there's already been a call with side effects, or where else does the promise come from.
      // Should probably play it safe on this one.
      return expression;
    }
    case 'BinaryExpression': {
      // This might trigger spies. Both sides should be simple so this is in the area of coercion.
      // If we can assert that both sides cannot spy, primitives or mustBeType driven, then it should
      // be fine to skip.
      return expression; // TODO: we can refine this step and skip certain cases for sure.
    }
    case 'CallExpression':{
      // This is our goal. Probably.
      // We can skip $frfr calls, for example. Probably certain builtins.
      return expression; // We can probably refine and skip some superficial stuff
    }
    case 'ClassExpression':{
      // I don't think a class expression in itself is dangerous wrt spying. Must check the extend
      // expression as well as dynamic keys, though. There may be something going on there.
      return expression;
    }
    case 'FunctionExpression':{
      // The func definition can not spy
      return undefined
    }
    case 'Identifier':{
      // This can't really spy in itself but it can trigger TDZ or reference errors.
      // TBD whether we care about that in this context.
      return undefined;
    }
    case 'Literal':{
      // This cannot spy
      return undefined;
    }
    case 'MemberExpression':{
      // This can spy and we'll have to confirm the object, the property to be accessed, and of
      // course the computed aspect of the node, in order to be able to safely say whether this
      // node spies or not. And then it may still be relevant to know whether it is called or not.
      return expression; // TODO: refine
    }
    case 'NewExpression':{
      // This is a function call.
      return expression; // TODO: Can we refine this? Like `new Map` sort of cases.
    }
    case 'ObjectExpression':{
      // In itself the decl does not spy but computed keys are coerced so we must confirm them.
      return expression; // TODO: refine
    }
    case 'Param':{
      // This does not spy
      return undefined;
    }
    case 'SuperCall': {
      return expression;
    }
    case 'SuperMethodCall': {
      return expression;
    }
    case 'SuperProp': {
      return expression; // TODO: maybe...
    }
    case 'TemplateLiteral':{
      // In theory this does not spy because all expressions ought to have been explicitly coerced
      // before being used in a template literal. Fingers crossed this is correct?
      return undefined;
    }
    case 'ThisExpression':{
      // This cannot spy
      return undefined;
    }
    case 'YieldExpression':{
      // This ... is a strange one. We should be cautious and consider it to spy.
      return expression;
    }
    case 'UnaryExpression':{
      // This depends on whether the operator will coerce the argument and that can spy.
      // For example, `!` and `typeof` do not while `~` `-` and `+` do.
      return expression; // TODO: refine
    }
    default: {
      ASSERT(false, 'missing expression node type in first call discovery:', expression);
    }
  }
}
