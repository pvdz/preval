// If a variable is assigned a function and inside that function assigned another function then
// if that inner function returns a reference to a variable of the outer function and the outer
// function returns the results of calling that new inner function then we can outline it in certain cases.
//
// `function f(){ const arr = [1,2,3]; f = function(){ return arr; }; return f(); }`
//
// Another word to describe this is "deferred encapsulated immutable caching" as the original value cannot
// be accessed/changed directly but won't be created until calling the function for the first time.
// We can also call it "function sealing".
//
// - function self assigns a function
// - new function returns a closure from old function
// - old function calls new function and returns its return value
// - no observable side effects between self-assignment and returning (else Z or arr could be updated once again)
// - function is not otherwise aliased (that's a more complex case), only ever called
// --> function invariably returns a closure and future calls to it can't create a different instance of the array
//  --> create outer variable (not necessary a global)
//  --> replace future calls where we can guarantee the same reference with self_assign+outer_ref
//
// The tricky part here is when the closure depends on unresolved code, like an array getting data from an
// unresolved variable or a variable that may still change later. We can't just outline it arbitrarily.
// Another tricky part is when the function may be sealed more than once, with a different value being encapsulated.
// It's vital that we ensure the original semantics are retained.

import walk from '../../lib/walk.mjs';
import { ASSERT, log, group, groupEnd, vlog, vgroup, vgroupEnd, rule, example, before, source, after, fmat, tmat, findBodyOffset, findBodyOffsetExpensiveMaybe, assertNoDupeNodes, todo, currentState, } from '../utils.mjs';
import * as AST from '../ast.mjs';
import { createFreshVar } from '../bindings.mjs';
import { cloneSimple } from '../ast.mjs';

export function selfAssignClosure(fdata) {
  group('\n\n\n[selfAssignClosure] Checking for self-assigning funcs returning their own closures');
  currentState(fdata, 'selfAssignClosure', true, fdata);
  // currentState(fdata, 'selfAssignClosure', true, fdata);
  const r = _selfAssignClosure(fdata);
  currentState(fdata, 'selfAssignClosure', true, fdata);
  groupEnd();
  return r;
}
function _selfAssignClosure(fdata) {
  const updated = processAttempt(fdata);

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
  //     if we can detect that the function is invariably called after the alias and
  //     that nothing happens in between that may possibly impact the function, then
  //     we can still collapse the encapsulation (cache the value as a global) since
  //     any subsequent calls to this function would invariably receive that value.

  // This means that for the unaliased case:
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

  // This is a special case where we try to smoke out the above case at the start of some
  // code but where the soundness is harder to prove generically.

  const found = handleTripleAliasArrayClosure(fdata);
  if (found) return 1;
  vlog('findTripleAliasArrayClosure not found. searching for self sealers now...');

  fdata.globallyUniqueNamingRegistry.forEach(function (meta, targetName) {
    if (!meta.isLet) return;
    // not builtin, implicit global, const, catch
    // We need at least two writes and a read
    if (meta.writes.length !== 2) return; // require two writes
    if (!meta.reads.length) return; // requires some reads
    if (meta.writes[0].kind !== 'var' || meta.writes[1].kind !== 'assign') return; // the assign is nested in the var so it must follow

    vgroup('-', [targetName], 'is a let with two writes and 1+ reads, first write is var and second is assign. Processing...');
    const changed = findSelfCloser(fdata, meta, targetName);
    if (changed) updated += 1;
    vgroupEnd();
  });

  return updated;
}

function handleTripleAliasArrayClosure(fdata) {
  // This searches for a hyper specific pattern.
  // From the start of the function, ignore all var decls with a declarative
  // structure (functions, empty array, empty object) as long as they don't
  // leak identifiers. Goal is to skip anything that might alias or call
  // another ident.
  // - Then search for this pattern:
  //          const x = f; const y = b; conxt z = x;
  //   Where `f` should refer to a function with this form:
  //          let f = function(){ debugger; const x = [..]; f = function(){ .. }; const r = f(); return r; }
  //   In this, `b` is irrelevant, even if it happens to be `f`
  // - Then verify that `f` is guaranteed to be a function with that pattern
  //
  // -> tests/cases/self_assign_closure/triple_ident_call_case.md

  vgroup('findInitSealer');
  const r = findTripleInit(fdata.tenkoOutput.ast.body, fdata);
  vgroupEnd();
  return r;
}
function findTripleInit(body, fdata) {
  ASSERT(arguments.length === findTripleInit.length);
  ASSERT(!body.type, 'should receive an array, not a BlockStatement', body);

  vgroup('findInit');
  const r = _findTripleInit(body, fdata);
  vgroupEnd();
  return r;
}
function _findTripleInit(body, fdata) {
  // Skip statements that are vars with function inits. enter labeled statements (bail upon return).
  // stop on anything else. hope that's the start of our pattern.
  let i = 0;
  for (; i<body.length; ++i) {
    const stmt = body[i];
    if (stmt.type === 'VarStatement') {
      const init = stmt.init;
      if (init.type === 'FunctionExpression') continue; // noop
      if (AST.isPrimitive(init)) continue; // noop
      if (init.type === 'ArrayExpression') {
        if (init.elements.every(e => !e || AST.isPrimitive(e))) return; // noop. but not when there are idents in the array.
      }
      break; // the end
    }
    else if (stmt.type === 'LabeledStatement') {
      return findTripleInit(stmt.body.body, fdata);
    }
    // TODO: while statement? shrug
    else {
      // unknown, not safe to assume
      break;
    }
  }

  // Now looking for a specific pattern of `const x = f; const y = g; const z = x()`

  // const x = f;
  if (body[i]?.type !== 'VarStatement') return;
  if (body[i].init.type !== 'Identifier') return;
  // const y = g;    (it doesn't matter if that is f, actually)
  if (body[i+1]?.type !== 'VarStatement') return;
  if (body[i+1].init.type !== 'Identifier') return; // TODO: it's also fine if this is another kind of noop like func, prim, obj, or arr
  // const z = x;
  if (body[i+2]?.type !== 'VarStatement') return;
  if (body[i+2].init.type !== 'CallExpression') return;
  if (body[i+2].init.callee.type !== 'Identifier') return;
  if (body[i+2].init.callee.name !== body[i].id.name) return;

  const x = body[i];
  //const xname = x.id.name;
  const xinit = x.init;
  //const y = body[i];
  //const yname = y.id.name;
  //const yinit = y.init;
  //const z = body[i];
  //const zname = z.id.name;
  //const zinit = z.init;

  // Verify that x is an alias for a function -> check that the rhs is always a function
  const meta = fdata.globallyUniqueNamingRegistry.get(xinit.name);
  if (!meta.isLet) return;
  if (meta.writes.length !== 2) return;
  const decl = meta.writes[0].kind === 'var' ? meta.writes[0] : meta.writes[1];
  const assign = meta.writes[0].kind === 'assign' ? meta.writes[0] : meta.writes[1];
  if (!decl || !assign) return;
  if (decl.parentNode.init.type !== 'FunctionExpression') return;
  if (assign.parentNode.right.type !== 'FunctionExpression') return;

  // Ok. Always a function.
  const outerFunc = decl.parentNode.init;
  const outerFuncBody = outerFunc.body.body;

  // Now verify if this function matches the pattern:
  //      `f = function(){ debugger; const x = [..]; f = function(){ .. }; const r = f(); return r; }`
  // Note: param count doesn't really matter, we assert that the first statement is Debugger so any param is unused.
  if (outerFuncBody.length !== 5) return; // Looking for: `debugger; const x = []; self = func; const x = self(); return x`
  if (outerFuncBody[0].type !== 'DebuggerStatement') return;
  if (outerFuncBody[1].type !== 'VarStatement') return; // arr
  if (outerFuncBody[1].init.type !== 'ArrayExpression') return;
  if (!outerFuncBody[1].init.elements.every(e => !e || AST.isPrimitive(e))) return; // we can support _some_ idents too, but...
  if (outerFuncBody[2].type !== 'ExpressionStatement') return;
  if (outerFuncBody[2].expression.type !== 'AssignmentExpression') return;
  if (outerFuncBody[2].expression.left.type !== 'Identifier') return;
  if (outerFuncBody[2].expression.left.name !== xinit.name) return;
  if (outerFuncBody[2].expression.right.type !== 'FunctionExpression') return;
  if (outerFuncBody[2].expression.right.body.body.length !== 2) return; // nested func has debugger and then returns the arr
  if (outerFuncBody[2].expression.right.body.body[0].type !== 'DebuggerStatement') return;
  if (outerFuncBody[2].expression.right.body.body[1].type !== 'ReturnStatement') return;
  if (outerFuncBody[2].expression.right.body.body[1].argument.name !== outerFuncBody[1].id.name) return; // return arr
  if (outerFuncBody[3].type !== 'VarStatement') return;
  if (outerFuncBody[3].init.type !== 'CallExpression') return;
  if (outerFuncBody[3].init.callee.type !== 'Identifier') return;
  if (outerFuncBody[3].init.callee.name !== xinit.name) return;
  if (outerFuncBody[3].init.arguments.length > 0) return; // There shouldn't be any args. It shouldn't matter. So we're going to ignore it. Most likely another transform will eliminate them anyways and then this rule will pass...
  if (outerFuncBody[4].type !== 'ReturnStatement') return;
  if (outerFuncBody[4].argument.type !== 'Identifier') return;
  if (outerFuncBody[4].argument.name !== outerFuncBody[3].id.name) return;

  // Ok, this is
  // `let f = function(){ debugger; const x = [..]; f = function(){ .. }; const r = f(); return r; }`
  // So f matches the self-sealing pattern we are seeking.
  // Consider the "startup" pattern we verified earlier:
  // `const x = f; const y = g; const z = x()`
  // In that case y is truly noop since the rhs can not have been referenced in this pattern.
  // In that case z is calling f as the first operation of the script and we are go for takeoff.
  // - TODO: What if `z` is called multiple times? We need make sure it's not read more than once (or that the reads are dead somehow)
  // - TODO: What if `y` is `f` and gets called? Wouldn't that create a new closure as well? Maybe that does matter.

  // So:
  // - We know func `f` is called immediately as the first action of this script
  // - We know it will create a closure over the array and then self-seal
  // - We know it has further references, though none of them matter much
  // It should be safe to move the array to the owner scope of the function
  // Then, it should be safe to replace the body of the function with a simple return of that constant array ident
  // What follows is that the function becomes a const and trampoline transforms will replace all calls with the array ident
  // And that's the first step of unfolding this pattern; eliminating this self sealing data func

  // ```
  // let func = function() {
  //   const arr = [];
  //   func = function() {
  //     return arr;
  //   };
  //   const r = func();
  //   return r;
  // };
  // ```

  // -->

  // ```
  // const arr = [];
  // let func = function() {
  //   return arr;
  // };
  // ```

  rule('Special self-sealing function can be sealed immediately');
  example(
    'let func = function(){ const arr = []; func = function(){ return arr; }; const r = func(); return r; } $(func());',
    'const arr = []; const func = function(){ return arr; } $(func());',
  );
  before(decl.blockBody[decl.blockIndex]);
  before(body[i]);
  before(body[i+1]);
  before(body[i+2]);

  // Replace the func with one that just returns the arr
  decl.blockBody[decl.blockIndex].init = AST.functionExpression([], [
    AST.debuggerStatement(),
    AST.returnStatement(outerFuncBody[1].id.name) // return arr
  ]);
  // We should have eliminated the only other write so it's now a const. We also could omit this step and let other rules deal with it.
  decl.blockBody[decl.blockIndex].kind = 'const';
  // return arr
  decl.blockBody.splice(decl.blockIndex, 0, outerFuncBody[1]);

  after(decl.blockBody[decl.blockIndex]);
  after(decl.blockBody[decl.blockIndex+1]);

  // Now it must just restart from phase1 immediately, don't bother with the rest.
  return true;
}

function findSelfCloser(fdata, meta, targetName) {
  // Initially, only target the write-write-read+ case. We can try to expand that later but not sure if we have to.
  // We already verified that the references start with two rwites and are only reads after that
  // Now we must confirm that
  // - all reads are regular calls
  // - one read occurs after the write
  // - the result of _that_ call is returned
  // - and more

  const firstWrite = meta.writes[0];
  const secondWrite = meta.writes[1];

  if (firstWrite.parentNode.type !== 'VarStatement') {
    return vlog('- bail: first write was not a var, after all');
  }
  if (firstWrite.parentNode.init.type !== 'FunctionExpression') {
    return vlog('- bail: first write did not init to function');
  }
  if (secondWrite.parentNode.type !== 'AssignmentExpression') {
    // Not assigning TO the binding
    return vlog('- bail: second write was not an assignment');
  }
  if (secondWrite.parentNode.right.type !== 'FunctionExpression') {
    return vlog('- bail: second write was not a function');
  }
  const outerFuncBlock = firstWrite.parentNode.init.body.body;
  if (!outerFuncBlock.includes(secondWrite.grandNode)) {
    return vlog('- bail: Second assign was not in root of function that was assigned in the first write');
  }

  vlog('- ok: confirmed that this was the case of a var initialized to a func and inside that function the same binding was updated with a new function')
  //
  //     `let f = function(){ ...; f = function(){ ... }; ... }`
  //
  // Next: confirm that the outer function ends with returning a call to it(-new-)self
  //
  //     `let f = function(){ ...; f = function(){ ... }; const tmp = f(); return tmp; }`
  //

  if (outerFuncBlock.length < 3) {
    return vlog('- bail; need at least 3 statements to match the pattern');
  }
  const closingNode = outerFuncBlock[outerFuncBlock.length - 3];
  const tmpCall = outerFuncBlock[outerFuncBlock.length - 2];
  const tmpRet = outerFuncBlock[outerFuncBlock.length - 1];

  // `targetName = function(){}`
  if (
    closingNode.type !== 'ExpressionStatement' ||
    closingNode.expression !== secondWrite.parentNode
  ) {
    return vlog('- bail; third-last statement of outer function was not the assignment of the inner function');
  }

  // `var tmp = targetName()`
  if (
    tmpCall.type !== 'VarStatement' ||
    tmpCall.init.type !== 'CallExpression' ||
    tmpCall.init.callee.type !== 'Identifier' ||
    tmpCall.init.callee.name !== targetName
  ) {
    return vlog('- bail; second-last statement was not a call to the inner function');
  }
  // Check if `const tmp = targetName(...x)` has a spread
  if (tmpCall.init.arguments.some(a => a.type === 'SpreadElement')) {
    return vlog('- bail; at least one arg to the inner call is spreading'); // We can probably support some cases here tho
  }

  // `return tmp`
  if (
    tmpRet.type !== 'ReturnStatement' ||
    tmpRet.argument.type !== 'Identifier' ||
    tmpRet.argument.name !== tmpCall.id.name
  ) {
    return vlog('- bail; final return is not returning the tmp call');
  }

  vgroup('- ok: confirmed tentative self closing pattern. Now to drill in...');

  // Confirmed this pattern now:
  //
  //     `let f = function(){ ...; f = function(){ ... }; const tmp = f(); return tmp; }`
  //
  // With some unknown parts before and inside the inner function and where the closing call
  // does not spread. It may still pass through params. There are now a few cases to cover;

  vgroup('Trying verifyClosureCase()');
  if (handleClosureCase(fdata, meta, targetName, firstWrite, secondWrite)) {
    vgroupEnd();
    return true;
  }
  vgroupEnd();
  vgroup('Trying verifyWrapperCase()');
  if (handleWrapperCase(fdata, meta, targetName, firstWrite, secondWrite, outerFuncBlock, tmpCall)) {
    vgroupEnd();
    return true;
  }
  vgroupEnd();
  vgroup('Trying immediatelyCalledSelfClosing()');
  if (handleImmediatelyCalledCases(fdata, meta, targetName, firstWrite, secondWrite, tmpCall)) {
    vgroupEnd();
    return true;
  }
  vgroupEnd();

  todo('Found a self-closing function shell but it did not match a known pattern...');
  return false;
}

function handleWrapperCase(fdata, meta, targetName, firstWrite, secondWrite, outerFuncBlock, outerFuncTmpVar) {
  // Note: so far we have only verified this pattern:
  //        `let f = function(??){ ??; f = function(??){ ?? }; const tmp = f(??); return tmp; }`
  //
  // This case looks for an iife that only references local or global variables (no closures)
  // Something like this:
  //
  //        `const z = 10; function f(a,b){ g(); f = function(c,d){ return c+d+z; }; return f(a,b); }`
  //
  // The outer params are passed into the inner function but we can map that. Assuming `z` is a
  // global, the inner function should be able to be inlined into the outer function safely, regardless
  // of when, where, or how many times it gets called.
  //
  //        `const z = 10; function f(a,b){ g(); return a+b+z; }`
  //        `const z = 10; function f(a,b){ g(); const c=a; const d=b; return c+d+z; }`
  //
  // - verify that the params are only used to call the inner func
  // - verify that the start of the outer func is calling a func
  // - verify that the inner func does have closures or nested funcs

  // Check if a param is only used for the recursive call, if used at all
  if (firstWrite.parentNode.init.$p.paramNames.some(pname => {
    const meta = fdata.globallyUniqueNamingRegistry.get(pname);
    if (
      // outer func params should only have one write
      meta.writes.length === 1 &&
      // there should be at most one read
      (
        meta.reads.length === 0 ||
        (
          meta.reads.length === 1 &&
          // and the read should be the recursive call
          outerFuncTmpVar.init === meta.reads[0].parentNode
        )
      )
    ) {
      return false; // this is ok.
    }
    return true; // yep, found problem
  })) {
    return vlog('- bail: at least one param was used in a way that did not match target pattern');
  }

  const outerOffset = firstWrite.parentNode.init.$p.bodyOffset;

  // Check if start of func just calls a function (TODO: expand on this)
  // Target pattern has 4 statements right now
  if (outerFuncBlock.length !== outerOffset+4) return vlog('- bail: outer func does not have 4 statements(+header)');
  // Pattern so far confirmed the last three statements (re-assign, recursive call, return)
  if (outerFuncBlock[outerOffset].type !== 'ExpressionStatement') return vlog('- bail: first statement is not expression');
  if (outerFuncBlock[outerOffset].expression.type !== 'CallExpression') return vlog('- bail: first statement is not expression');
  // Bail on arguments/this usages for now
  if (firstWrite.parentNode.init.$p.readsArgumentsAny) return vlog('inner uses `arguments`');
  if (firstWrite.parentNode.init.$p.thisAccess) return vlog('inner uses `this`');
  if (secondWrite.parentNode.right.$p.readsArgumentsAny) return vlog('inner uses `arguments`');
  if (secondWrite.parentNode.right.$p.thisAccess) return vlog('inner uses `this`');

  // Verify that the inner function has no closures. This needs to be recursive but
  // we can also decide to bail when the inner function has another nested function...

  const program = fdata.tenkoOutput.ast; // Need this to check for explicit globals

  vgroup('Verifying whether inner function has any closures or nested funcs');
  let fail = false;
  walk(_walker, secondWrite.parentNode.right);
  function _walker(node, beforeWalk, nodeType, path) {
    if (fail) return true; // Do not enter more nodes
    if (beforeWalk) return;
    if (node === secondWrite.parentNode.right) return; // ignore inner function itself
    if (node.type === 'FunctionExpression') {
      vlog('- bail: Inner function contained another function');
      fail = true;
      return true; // Do not enter
    }
    if (node.type !== 'Identifier') return;

    const meta = fdata.globallyUniqueNamingRegistry.get(node.name);
    if (!meta) return; // Not a binding ident, is fine

    if (secondWrite.parentNode.right.$p.ownBindings.has(node.name)) {
      return;
    }
    if (meta.isImplicitGlobal || meta.isBuiltin) {
      return;
    }
    if (program.$p.ownBindings.has(node.name)) {
      return;
    }

    vlog('- bail: Binding', node.name, 'is not local, not global, not build-in');
    fail = true;
    return true;
  }
  vgroupEnd();

  if (fail) {
    vlog('- bail: Found at least one closure or function inside the inner function');
    return false;
  }

  // This must be something like
  //
  //        `const z = 10; function f(a,b){ g(); f = function(c,d){ return klm(c,d); }; return f(a,b); }`
  //                                        \A/                     |----B---------|
  //
  // Where A is code inside the outer function before the closing part and B is the body of the inner func.
  // I think we're now ready to transform this into
  //
  //        `const z = 10; function f(a,b){ g(); c=a; d=b; return klm(c,d); }`
  //                                        \A/            |----B---------|
  //
  // And we'll need to think of the best way to propagate the inner call args to the func. Aliasing like above is one way.

  rule('Simple self closing function with no side effects can be collapsed');
  example(
    'let f = function(a,b){ g(1); f = function(c,d){ return g(2); }; const tmp = f(a,b); return tmp; };',
  'let f = function(a,b){ let c = a; let d = b; g(1); return g(2); };'
  );
  before(firstWrite.blockBody[firstWrite.blockIndex]);

  outerFuncBlock.pop(); // return
  outerFuncBlock.pop(); // tmp=f()
  outerFuncBlock.pop(); // f=function(){}

  vlog('popped the tail:')
  after(firstWrite.blockBody[firstWrite.blockIndex]);

  // Append the inner, except for its own header
  outerFuncBlock.push(...secondWrite.parentNode.right.body.body.slice(secondWrite.parentNode.right.$p.bodyOffset));
  vlog('append the inner:')
  after(firstWrite.blockBody[firstWrite.blockIndex]);

  // Inject param aliases in reverse
  const pnamestmp = firstWrite.parentNode.init.$p.paramNames.reverse(); // being lazy
  secondWrite.parentNode.right.$p.paramNames.reverse().forEach((pname,i) => {
    outerFuncBlock.splice(
      outerOffset, 0,
      AST.varStatement('let', pname, AST.identifier(pnamestmp[i]))
    );
  });
  vlog('injected the aliases:')
  after(firstWrite.blockBody[firstWrite.blockIndex]);

  after(firstWrite.blockBody[firstWrite.blockIndex]);
  assertNoDupeNodes(firstWrite.blockBody, 'body');
  return true;
}

function handleClosureCase(fdata, meta, targetName, first, second) {
  // This case looks for a closure, something like this:
  //
  //        `let f = function(){ const arr = [1,2,3]; f = function(){ return arr; }; const tmp = f(); return tmp; }`
  //                             |------ A --------|  |----- B -------- C --------| |----- D -------| |-- E ----|
  //
  // Where A is a decl of sorts that's going to get closed, B is the inner function (secondWrite) that only returns
  // the closure (C), followed by immediately calling itself (D) and returning that result (E).
  // The caller has already verified the B, D, and E parts.
  //
  // Next step is to verify that the inner function just returns a binding (C) and
  // that this binding is a local variable of the outer function (A).

  const firstBody = first.parentNode.init.body.body;
  const bodyOffset1 = first.parentNode.init.$p.bodyOffset;

  const secondBody = second.parentNode.right.body.body;
  const bodyOffset2 = second.parentNode.right.$p.bodyOffset;
  ASSERT(bodyOffset1 > 0 && bodyOffset2 > 0, 'func $p.bodyOffset should be set');

  if (firstBody.length - bodyOffset1 !== 4) {
    vlog('  - bail: outer func is not exactly four statements (expecting var, assign, var, return)');
    return false;
  }
  if (firstBody[bodyOffset1].type !== 'VarStatement') {
    vlog('  - bail: first statement of outer function is not a binding that we can close');
    return false;
  }
  // The init is asserted later

  if (secondBody.length - bodyOffset2 !== 1) {
    // This also circumvents weird cases like `return x; const x = 1;`
    vlog('  - bail: inner func does not have exactly one statement', secondBody.length, bodyOffset2);
    return false;
  }
  if (secondBody[bodyOffset2].type !== 'ReturnStatement') {
    vlog('  - bail: inner function does have a single return statement');
    return false;
  }

  // Must now confirm that it returns a binding that is registered in the parent function
  if (secondBody[bodyOffset2].argument.type !== 'Identifier') {
    vlog('  - bail: inner function does not return an ident');
    return false;
  }
  if (secondBody[bodyOffset2].argument.name !== firstBody[bodyOffset1].id.name) {
    vlog('  - bail: inner function is not returning outer closure');
    return false;
  }

  // We've verified this exact pattern
  //
  //        `let f = function(){ const a = closureValueNode; f = function(){ return a; }; const tmp = f(); return tmp; }`
  //
  // With an unknown closureValueNode and potentially some params/args (but no spreads) which would not actually be used

  const closureValueNode = firstBody[bodyOffset1].init;

  // Confirm X; the value being closed.
  if (
    closureValueNode.type !== 'ArrayExpression' ||
    closureValueNode.elements.some(enode => enode && !AST.isPrimitive(enode))
  ) {
    // We can support some other cases
    vlog('   - bail: closed value is not an array with only primitives/holes. TODO: check if we can support this case');
    return false;
  }

  // Okay, struct verified. Now we must verify that all the reads from this binding are func calls

  if (meta.rwOrder.some((rw, i) => {
    if (i <= 1) return false;
    if (rw.kind !== 'read') return true;
    if (rw.parentNode.type !== 'CallExpression') return true;
    if (rw.parentProp !== 'callee') return true;
    return false;
  })) {
    vlog('   - problem: at least one usage of the binding was not a func call');
    return closureCaseEscaping(first, second, meta, targetName);
  }

  return closureCaseNotEscaping(first, meta, targetName, closureValueNode);
}

function closureCaseNotEscaping(first, meta, targetName, closureValueNode) {
  // We've verified this exact pattern
  //
  //        `let f = function(){ const a = [..]; f = function(){ return a; }; const tmp = f(); return tmp; }`
  //
  // With the array only containing holes or primitive and with
  // any other references to `f` being plain calls to the function
  //
  // Now we'll replace the init of the outer function binding (the function
  // itself) with the non-observable-expression that it was returning. All calls to
  // the function should be changed to plain identifier references.

  rule('Self assignment of closure can be replaced with closure value in very specific case');
  example(
    'let f = function(){ const x = [1,2,3]; f = function(){ return x; }; return f(); } f() === f();',
    'const f = [1,2,3]; f === f;'
  );
  before(first.blockBody[first.blockIndex]);

  // The value being encapsulated becomes the init where the func used to be
  // TODO: the decl must be hoisted to global space if that's not already the case
  //       this may mean we define the variable there as a let above the ancestor
  //       that is global too. and then assign it here instead of declaring it.
  first.parentNode.init = closureValueNode;

  after(first.blockBody[first.blockIndex]);

  vlog('Update', meta.reads.length, 'calls to this function, turning them into a regular reference instead');
  // TODO: retain arguments to retain TDZ semantics. :shrug:

  // All calls to the function are replaced by regular reads
  meta.reads.forEach((read, i) => {
    if (read.parentNode.type !== 'CallExpression') return; // skip. This was an exception checked above.

    rule('Self assigned closure is now a plain reference');
    example('x = f();', 'x = f;');
    before(read.blockBody[read.blockIndex]);

    if (read.grandIndex < 0) read.grandNode[read.grandProp] = AST.identifier(targetName);
    else read.grandNode[read.grandProp][read.grandIndex] = AST.identifier(targetName);

    after(read.blockBody[read.blockIndex]);
  });

  assertNoDupeNodes(first.blockBody, 'body');
  return true;
}

function closureCaseEscaping(first, second, meta, targetName) {
  // We've verified this exact pattern
  //
  //        `let f = function(){ const a = [..]; f = function(){ return a; }; const tmp = f(); return tmp; }`
  //
  // With the array having only primitives/holes.
  //
  // But function f has read references that are not function calls and that's dangerous.
  //
  // let f = function(){ const a = [..]; f = function(){ return a; }; const tmp = f(); return tmp; }
  // const g = f;   // aliases the outer func
  // f();           // locks f
  // h(f);          // passes through the locked f
  // g();           // now f is a new inner reference, h's received value does not change, g is still the outer
  // f();           // returns a different array instance than the first call but neither (other) alias is affected
  //
  // I'm not seeing an out. Only when you can assert that the function is called
  // before any aliasing can you safely continue to apply the transform.
  //
  // I'm not seeing an (easy) transform for the case where the call happens before
  // it or any alias truly escapes. You ultimately must be able to keep track of
  // multiple instances of the closed value, which we can't really do in source code.
  //
  // Note that the transform in the current case still needs to take special care due
  // to the aliases. The aliases will still expect the value to be callable. So instead
  // we will outline the value being closed, replace the outer function with the inner
  // function (changing it into a simple trampoline) and replacing all actual calls to
  // targetName with the closure value, leaving all other references point to the trampo.

  let immediatelyCalled = false;

  let index = first.blockIndex;
  while (++index < first.blockBody.length) {
    const stmt = first.blockBody[index];
    if (stmt.type === 'ExpressionStatement') {
      if (
        stmt.expression.type === 'CallExpression' &&
        stmt.expression.callee.type === 'Identifier' &&
        stmt.expression.callee.name === targetName
      ) {
        vlog('   - ok, the function is immediately called');
        immediatelyCalled = true;
        break;
      }

      if (
        stmt.expression.type === 'AssignmentExpression' &&
        stmt.expression.right.type === 'CallExpression' &&
        stmt.expression.right.callee.type === 'Identifier' &&
        stmt.expression.right.callee.name === targetName
      ) {
        vlog('   - ok, the function is immediately called');
        immediatelyCalled = true;
        break;
      }

      // regular expressions, bin/unary ops guaranteed not to spy, etc?
      vlog('   - bail, expr stmt is not supported');
      break;
    }

    if (stmt.type !== 'VarStatement') {
      vlog('   - bail, encountered non-var-decl before seeing call;', stmt.type, stmt);
      break;
    }

    const init = stmt.init;

    if (
      init.type === 'CallExpression' &&
      init.callee.type === 'Identifier' &&
      init.callee.name === targetName
    ) {
      vlog('   - ok, the function is immediately called');
      immediatelyCalled = true;
      break;
    }

    if (init.type === 'Identifier' && init.name === targetName) {
      // Aliasing is too risky. We can explore this line (assert that the var being assigned is does not escape and
      // maybe do something special if it is called sooner) but for now we terminate.
      vlog('   - bail, function is aliased here');
      break;
    }

    if (
      // The identifier case could trip a TDZ error but I think we're gonna be okay
      // We can also cover arrays/objects if they don't contain the targetName
      !['Identifier', 'FunctionExpression'].includes(init.type) && // etc...
      !AST.isPrimitive(init) &&
      !(init.type === 'ArrayExpression' && init.elements.every(e => !e || (e.type !== 'Identifier' && e.name !== targetName)))
      // We could cover objects too with a similar check
    ) {
      vlog('  - bail, var init was not an ident, func, or primitive, before seeing call', init.type);
      break;
    }
  }

  if (!immediatelyCalled) {
    vlog('   - bail: immediatelyCalled; the function escapes and we did not prove that it is called immediately');
    return false;
  }

  vlog('   - ok; the function is called before it escapes so the transform is on');


  const firstBody = first.parentNode.init.body.body;
  const bodyOffset1 = first.parentNode.init.$p.bodyOffset;
  const secondBody = second.parentNode.right.body.body;
  const bodyOffset2 = second.parentNode.right.$p.bodyOffset;

  const returned = firstBody[firstBody.length - 2].init.callee;
  const closureName = firstBody[bodyOffset1].id.name;

  // Mutate calls first. They don't change indexs.
  // Change any call to simply refer straight to the value instead
  meta.reads.forEach(read => {
    if (returned !== read.node && read.parentNode.type === 'CallExpression' && read.parentProp === 'callee') {
      ASSERT(read.grandIndex < 0, 'normalized callexpressions ought to not appear in array like structures');

      rule('Self closing collapse; Calls to the function should refer to the value instead');
      example(
        'let f = function(){ const a = []; f = function(){ return a; }; const tmp = f(); return tmp; }; $(f());',
        'const a = []; let f = function(){ return a; }; $(a);'
      );
      before(read.blockBody[read.blockIndex]);

      read.grandNode[read.grandProp] = AST.identifier(closureName); // the ident

      after(read.blockBody[read.blockIndex]);
    }
  });


  rule('A self closing function that is called before it escapes can be collapsed');
  example(
    'let f = function(){ const a = []; f = function(){ return a; }; const tmp = f(); return tmp; }; f(); const g = f; $(f); $(f()); $(g());',
  'const a = []; let f = function(){ return a; }; a; const g = f; $(f); $(a); $(g());'
  );
  before(first.blockBody[first.blockIndex]);

  // `const closureName = []`
  first.blockBody.splice(first.blockIndex, 0, firstBody[bodyOffset1]);
  // `return closureName`
  firstBody[bodyOffset1] = secondBody[bodyOffset2];
  // `return tmp`
  firstBody.pop();
  // `const tmp = targetName()`
  firstBody.pop();
  // `targetName = function(){}`
  firstBody.pop();

  after(first.blockBody[first.blockIndex]);
  after(first.blockBody[first.blockIndex+1]);

  return true;
}

function handleImmediatelyCalledCases(fdata, meta, targetName, first, second, tmpCallVarNode) {
  // So we have already confirmed that we have a self closing function with this shape:
  //
  //     `let f = function(pqr){ ...; f = function(){ ... }; const tmp = f(xyz); return tmp; }`
  //
  // With some unknown parts before and inside the inner function and where the closing call does not
  // spread. It may still pass through params (not yet confirmed!). There are now a few cases to cover;
  //
  // This is hard path and we have to confirm whether `f` is called immediately as the first real
  // call of the entire script. We can ignore a few declarative things that have no observable
  // side effects. Basically we're worried that a closure triggers the self closing function too
  // and we're left with two instances, which would break the transform.
  // That feels brittle, it kind of is, but mostly means that this targets a fairly specific kind
  // of self closing occurrence, popular with obfuscators. We'll deal with brittleness later. Maybe.

  // Confirm the params. In particular, confirm that the params are only used in the outer function
  // once (at most), which in particular must be in the recursive call. Fewer params may be used in
  // that call but they should be in order without gaps. That's the pattern so far. Refine if necessary.

  const outerFuncNode = first.parentNode.init;

  if (outerFuncNode.$p.thisAccess) {
    todo('self closing function pattern where outer func uses `this`');
    vlog('- bail: outer func uses `this`');
    return false;
  }

  if (outerFuncNode.$p.readsArgumentsAny) {
    todo('self closing function pattern where outer func uses `arguments`'); // We can replace `arguments.length` in this particular case tho...
    vlog('- bail: outer func uses `arguments`');
    return false;
  }

  // We have to account for two patterns now:
  // - the function that's sealed is the one that's called throughout
  //   - aliases cannot be referenced after the sealing call
  //   - apply the closure transform that converts the closure to an outer variable with fixed return
  // - the aliases are the ones being called
  //   - sealing function can only be called as the recursive call
  //   - sealing function can only be referenced as part of the pattern, no further
  //   - in this case the closure is moot and only a way to complicate variable definition, easy to transform

  const found = verifyImmediatelyCalledCase(fdata, meta, targetName, first);
  if (!found) return false;
  const {call: firstCallNode, blockBody: callBlockBody, blockIndex: callBlockIndex, aliases} = found;
  const called = firstCallNode.callee.name;
  aliases.delete(targetName);

  const {selfCalling, aliasCalling} = verifySelfAliasCalling(called, targetName, aliases, fdata, meta, firstCallNode, tmpCallVarNode);
  vlog('- Self or alias calling pattern?', selfCalling, aliasCalling);
  if (!selfCalling && !aliasCalling) {
    vlog('- bail: not only self calling and not only alias calling, unsafe');
    return false;
  }

  if (!verifyArgumentsAccessibleAtDecl(firstCallNode, fdata, first)) return false;

  // Note: the self calling pattern (closures persist, created once, become globals) is different from the
  // alias calling (closures do not persist so are really just a local variable).
  if (selfCalling) {
    return handleSelfCallingImmediatelyCalled(fdata, first, second, firstCallNode, callBlockBody, callBlockIndex, tmpCallVarNode, outerFuncNode)
  } else {
    return handleAliasCallingImmediatelyCalled(fdata, first, second, outerFuncNode, tmpCallVarNode);
  }
}
function handleSelfCallingImmediatelyCalled(fdata, first, second, firstCallNode, callBlockBody, callBlockIndex, tmpCallVarNode, outerFuncNode) {
  // Challenge (each should have a test):
  //
  // `let f = function(){}; const x = []; f(x); f(x);`
  // `let f = function(){}; while (true) { const x = []; f(x); f(x);`
  // `let f = function(){}; const g = f; while() { const x = []; f(x); f(x);`    <-- cant move the func init because of this, and it has no access to x
  //
  // First example is fine
  // Second example passes in unknown value that is not accessible at func decl time because it's scoped
  // Third example has same as second example but aliases the function before entering the loop.

  rule('Self closing function with noop, called, aliases never called, closures become globals');
  example(
    'let f = function(arg) { ...; f = function(arg2) { arguments; arg; arg2; ... }; const r = f(arg); return r; }; f(a, b);',
    'let arg = a; let ran = false; let f = function(arg2) { arguments; arg; arg2; ... }; const arg = a; ...; if (bool) { f(a, b); } else { bool = true; f(arg); }',
    // This only works when the args to the first call to f() are reachable at the point of declaring the f variable
    // See above for some problem cases where this fails. They are separate cases to handle.
    // Also; first call needs to have args be that of the recursive call. In a loop we must make sure that only happens once.
  );
  before(first.blockBody[first.blockIndex]);

  const tmpSealed = createFreshVar('tmpSealed', fdata);

  // Replace the args of the first call with that of the tmp call.
  // This would break loops since the second iteration would need the regular call args again.
  // To this end we wrap the whole thing in a bool flag. We dont have innerLoop on $p and no ref
  // for the first call here so let's just do it everywhere. Maybe we can save try/catch this way
  // although then the bool would need to be after it. But that messes up recursive sealer calls.
  // Which shouldn't exist. So we should put the bool assign after the first call. Ok good talk.
  // `if (tmpSealed) f(1,2); else { f(outer_arg1, outer_arg1); tmpSealed = true; }`
  // The call may have been assigned to something (ident or prop), or be the init of a var. sigh
  // - stmt call, ident assign call, prop assign call, var init call. Deal with each case separately.
  const oldStmt = callBlockBody[callBlockIndex];

  if (oldStmt.type === 'VarStatement') {
    // Here we have to create the var as a let undefined, then assign the call result to it in each branch
    callBlockBody.splice(callBlockIndex, 1,
      AST.varStatement('let', oldStmt.id.name, AST.undef()),
      AST.ifStatement(
        AST.identifier(tmpSealed),
        AST.blockStatement(
          AST.expressionStatement(AST.assignmentExpression(oldStmt.id.name, AST.cloneSortOfSimple(firstCallNode))),
        ),
        AST.blockStatement(
          AST.expressionStatement(AST.assignmentExpression(oldStmt.id.name, AST.callExpression(AST.identifier(firstCallNode.callee.name), tmpCallVarNode.init.arguments.map(anode => AST.cloneSimple(anode))))),
          AST.expressionStatement(AST.assignmentExpression(tmpSealed, AST.tru())),
        ),
      ),
    );
  } else if (oldStmt.type === 'ExpressionStatement') {
    const oldExpr = oldStmt.expression;
    if (oldExpr === firstCallNode) {
      // Just call the func, ignore result
      callBlockBody[callBlockIndex] = AST.ifStatement(
        AST.identifier(tmpSealed),
        AST.blockStatement(
          AST.expressionStatement(AST.cloneSortOfSimple(firstCallNode)),
        ),
        AST.blockStatement(
          AST.expressionStatement(AST.callExpression(AST.identifier(firstCallNode.callee.name), tmpCallVarNode.init.arguments.map(anode => AST.cloneSimple(anode)))),
          AST.expressionStatement(AST.assignmentExpression(tmpSealed, AST.tru())),
        ),
      );
    } else if (oldExpr.type === 'AssignmentExpression') {
      // Assign to the same ident or prop, just clone it
      callBlockBody[callBlockIndex] = AST.ifStatement(
        AST.identifier(tmpSealed),
        AST.blockStatement(
          AST.expressionStatement(AST.assignmentExpression(AST.cloneSimple(oldExpr), AST.cloneSortOfSimple(firstCallNode))),
        ),
        AST.blockStatement(
          AST.expressionStatement(AST.assignmentExpression(oldExpr.left.name, AST.callExpression(firstCallNode.callee.name, tmpCallVarNode.init.arguments.map(anode => AST.cloneSimple(anode))))),
          AST.expressionStatement(AST.assignmentExpression(tmpSealed, AST.tru())),
        ),
      );
    } else {
      ASSERT(false, 'unreachable, hopefully');
    }
  }

  const newNodes = [
    // Transform the params of outer func to regularly declared variables. Init them to a clone of the arg nodes of first call.
    ...outerFuncNode.$p.paramNames.map((aname, i) => {
      const arg = firstCallNode.arguments[i];
      if (arg) {
        return AST.varStatement('let', aname, AST.cloneSimpleOrTemplate(arg));
      } else {
        return AST.varStatement('let', aname, AST.undef());
      }
    }),
    // The bool to mark the seal call was executed (loop protection)
    AST.varStatement('let', tmpSealed, AST.fals()),
    // Put any code from between the header and the re-assignment here... Confirmed not to contain this/arguments.
    // If it contains an arg reference that's fine because we create them as vars. We should be good?
    ...outerFuncNode.body.body.slice(outerFuncNode.$p.bodyOffset, outerFuncNode.body.body.length - 3), // -3 because it ends with `f=func; t=f(); return t`
  ];

  // Inject before the first call
  first.blockBody.splice(first.blockIndex, 0, ...newNodes);

  // Replace the outer function with the inner function
  first.parentNode.init = second.parentNode.right;

  after(first.blockBody[first.blockIndex + newNodes.length]);
  after(newNodes);
  after(firstCallNode);
  assertNoDupeNodes(first.blockBody, 'body', true); // var decl of sealer
  assertNoDupeNodes(callBlockBody, 'body', true); // first call of sealer in some capacity
  return true;
}
function handleAliasCallingImmediatelyCalled(fdata, first, second, outerFuncNode, tmpCallVarNode) {
  // Different from self calling pattern

  // We've asserted arguments/this are not used. This transform would break if we allow that ...
  if (second.parentNode.right.$p.thisAccess) {
    todo('self-closing pattern when inner access `this`, needs refinement');
    vlog('  - bail: inner function access `this`, this transform is not suitable');
    return false;
  }

  if (second.parentNode.right.$p.readsArgumentsLen) {
    // We can fix this for the aliasCalling case!
    // That's because the inner function is only ever called from the recursive call, so we can replace
    // `arguments.length` with that arg count and be done with it.
    ASSERT(second.parentNode.right.$p.readsArgumentsLenAs, 'we still define this?');
    const lenName = second.parentNode.right.$p.readsArgumentsLenAs;
    const meta = fdata.globallyUniqueNamingRegistry.get(lenName);
    ASSERT(meta.writes[0].kind === 'var', 'we sort of control this?');

    rule('Using `arguments.length` in a self closing function with the aliasCalling pattern means trivial inlining of that value');
    example(
      'let f = function(a, b, c){ f = function(){ $(arguments.length); const tmp = f(a, b, c); return tmp; }; const g = f; g(1, 2, 3); g(3, 4); g(5);',
      'let f = function(a, b, c){ f = function(){ $(3); const tmp = f(a, b, c); return tmp; };  const g = f; g(1, 2, 3); g(3, 4); g(5);',
    );
    before(meta.writes[0].blockBody[meta.writes[0].blockIndex]);

    meta.writes[0].parentNode.init = AST.primitive(tmpCallVarNode.init.arguments.length);

    after(meta.writes[0].blockBody[meta.writes[0].blockIndex]);
    return true; // feh
  }
  if (second.parentNode.right.$p.readsArgumentsAny) {
    vlog('The inner is referencing `arguments`, which is tricky for us; between stmt count:', outerFuncNode.body.body.length - outerFuncNode.$p.bodyOffset);
    // If there is still code between outer function body start and inner function assignment
    // then we can move this into the inner body instead. But there's a minor complication when
    // a binding from that code is also passed into the inner function as an argument.
    if (outerFuncNode.body.body.length - outerFuncNode.$p.bodyOffset > 3) {
      vlog('There are statements between outer func boundary and seal assignment... see if we can move them inside');
      // See if we can't just move all the extra code from outer to inner. Should be safe unless recursive call uses a part of it.
      if (tmpCallVarNode.init.arguments.every(anode => {
        if (AST.isPrimitive(anode)) return true;
        if (anode.type !== 'Identifier') return false;
        return outerFuncNode.$p.paramNames.includes(anode.name);
      })) {
        vlog('All args to the recursive call are params or primitives. Least we can do now is move the extra code to the inner func');
        rule('Self closing function with blocking complexity that is not using that complexity in the recursive call can move the complexity to the inner func');
        example(
          'let f = function(){ let x = 0; f = function(){ x = x + 1; $(x); }; const t = f(); return t; } const g = f; g(); g(); g();',
          'let f = function(){ f = function(){ let x = 0; x = x + 1; $(x); }; const t = f(); return t; } const g = f; g(); g(); g();',
        );
        before(first.blockBody[first.blockIndex]);

        const arr = outerFuncNode.body.body.splice(outerFuncNode.$p.bodyOffset, outerFuncNode.body.body.length - outerFuncNode.$p.bodyOffset - 3);

        second.parentNode.right.body.body.splice(
          second.parentNode.right.$p.bodyOffset,
          0,
          ...arr,
        );

        after(first.blockBody[first.blockIndex]);
        return true;
      }
      vlog('Apparently the recursive call is using some of that code so we cant just get rid of it');
      // Let's start with a targeted case; one statement and it's a closure
      if (outerFuncNode.body.body.length - outerFuncNode.$p.bodyOffset === 4) {
        // 4 means closure, f=function, t=f(); return t.
        const stmt = outerFuncNode.body.body[outerFuncNode.$p.bodyOffset];
        ASSERT(stmt !== second.parentNode, 'fickle test but we should not be fetching the sealing statement here');
        ASSERT(stmt, 'should have something');

        if (stmt.type === 'VarStatement' && tmpCallVarNode.init.arguments.every(anode => {
          if (AST.isPrimitive(anode)) return true;
          if (anode.type !== 'Identifier') return false;
          if (outerFuncNode.$p.paramNames.includes(anode.name)) return true;
          if (anode.name === stmt.id.name) return true;
        })) {
          vlog('Ok we should be able to inline this a bit!');

          rule('Self closing function with alias calling pattern and using arguments in inner func and using closure data for recursive call, can move that code to inner func');
          example(
            'let f = function(){ let x = 0; f = function(y){ x = x + 1; $(x, y, arguments); }; const t = f(x); return t; } const g = f; g(); g(); g();',
            'let f = function(){ f = function(y){ let x = 0; x = x + 1; $(x, y, arguments); }; const t = f(0); return t; } const g = f; g(); g(); g();',
          );
          before(first.blockBody[first.blockIndex]);

          const arr = outerFuncNode.body.body.splice(outerFuncNode.$p.bodyOffset, outerFuncNode.body.body.length - outerFuncNode.$p.bodyOffset - 3);

          second.parentNode.right.body.body.splice(
            second.parentNode.right.$p.bodyOffset,
            0,
            ...arr,
          );

          tmpCallVarNode.init.arguments.forEach((anode, i) => {
            if (anode.name === stmt.id.name) {
              tmpCallVarNode.init.arguments[i] = AST.cloneSortOfSimple(stmt.init);
            }
          });

          after(first.blockBody[first.blockIndex]);
          return true;
        }

        todo('self closing pattern, alias calling, but recursive call is using stuff from the closure area beyond current heuristics');
        vlog('  - bail: does not match heuristics');
        return false;
      }
    }

    todo('self-closing pattern when inner access arguments/this needs refinement');
    vlog('  - bail: inner function access arguments, this transform is not suitable');
    // How would we do this. In the self calling path we replace the first call with the recursive call args
    // and that would work. In this case we don't so how do we make arguments work? We can ignore `this`.
    // If they are primitives we can probably sus it out. But we have a real world case where the arg is
    // a closure (of a param, unused, but still). We can't really fake it. The arguments object is too
    // complex for that.

    // We do know that the closure part is not actually a closure so we could move all that code to the inner
    // function. That may lead to other rules eliminating the usage (or simplifying stuff anyways).
    // We'd only need to make sure that we can resolve the recursive call if it passes on a local var
    // created in that closure space (and we've observed cases that do this so we must cover it)

    return false;
  }

  rule('Self closing function with noop, basically seals over and over again, closures are just local vars');
  example(
    'let f = function(arg) { ...; f = function(arg2) { arguments; arg; arg2; ... }; const r = f(arg); return r; }; f(a, b);',
    'let f = function(arg) { let arg2 = a; arguments; arg; arg2; ... }; const g = f; g(1, 2);',
    // This case will basically call the sealer over and over again. Alias the params locally, don't replace call args.
  );
  before(first.blockBody[first.blockIndex]);

  outerFuncNode.body.body.splice(-3, 3,
    ...second.parentNode.right.$p.paramNames.map((aname, i) => {
      return AST.varStatement('let', aname, tmpCallVarNode.init.arguments[i] || AST.undef());
    }),
    ...second.parentNode.right.body.body.slice(second.parentNode.right.$p.bodyOffset),
  );

  after(first.blockBody[first.blockIndex]);
  assertNoDupeNodes(first.blockBody, 'body', true); // var decl of sealer
  return true;
}

function verifyImmediatelyCalledCase(fdata, meta, targetName, first) {
  // In this case the self-closing function is either called immediately, or aliased and the alias
  // is called immediately. And neither the targetName nor its aliases escape before that point.
  // If we can prove that then we can resolve the self assignment immediately and don't have to
  // worry about local closures.

  // We will search for the first call of any of these names or a statement that could potentially
  // let the function escape. We're cutting corners here so this could be solidified at the cost of perf.
  const aliases = new Set([targetName]);

  vgroup('Searching for first call of', [targetName], ', starting at', first.blockIndex, '/', first.blockBody.length);
  const immediatelyCalled = verifyImmediatelyCalledBlock(targetName, first.blockBody, first.blockIndex+1, aliases);
  vgroupEnd();

  return immediatelyCalled;
}
function verifyImmediatelyCalledBlock(targetName, blockBody, blockIndex, aliases) {
  for (; blockIndex < blockBody.length; blockIndex++) {
    const stmt = blockBody[blockIndex];
    vlog('Next statement:', stmt.type);

    if (stmt.type === 'ExpressionStatement') {
      const expr = stmt.expression;
      vlog('Expr stmt, expr type is:', expr.type);
      if (
        expr.type === 'CallExpression' &&
        expr.callee.type === 'Identifier' &&
        aliases.has(expr.callee.name)
      ) {
        vlog('This is calling the target directly or indirectly as "first" action, as statement');
        return {call: expr, blockBody, blockIndex, aliases};
      }

      if (expr.type === 'CallExpression') {
        vlog('This is calling another function, fail');
        // There was a function call but our function could not have escaped yet
        // so we should be able to safely ignore this call and continue.
        // TODO: what about expressions containing an alias letting it escape? like an array element or call arg
        continue;
      }

      if (['Identifier', 'BinaryExpression'].includes(expr.type)) {
        vlog('- ident/binexpr are ok? wait this cant be correct...');
        // Could not possibly mess with our function so fine to skip
        continue;
      }

      if (expr.type === 'AssignmentExpression') {
        if (
          expr.right.type === 'CallExpression' &&
          expr.right.callee.type === 'Identifier' &&
          aliases.has(expr.right.callee.name)
        ) {
          vlog('This is calling the target directly or indirectly as "first" action, as assign');
          return {call: expr, blockBody, blockIndex, aliases};
        }


        if (
          (expr.type === 'ArrayExpression' && expr.elements.every(e => !e || AST.isPrimitive(e)))
        ) {
          vlog('  - ok; array with primitives');
          continue;
        }

        vlog('- bail: assignment is risky');
        // Aliasing to an existing var is too risky because the var may already
        // be closed and any function call could blow up our assumptions.
        break;

        //// If aliasing an alias then add it to the list
        //if (expr.right.type === 'Identifier' && aliases.has(expr.right.name)) {
        //  aliases.add(expr.left.name);
        //}
        //// TODO: what about expressions containing an alias letting it escape? like an array element or call arg
        //continue;
      }

      // Unknown expression; we skip.
      vlog('- bail: this expr type is not allow listed');
      break;
    }

    if (stmt.type === 'VarStatement') {
      const init = stmt.init;

      vlog('- Init type is', init.type);

      if (init.type === 'CallExpression') {
        vlog('  - calling', [init.callee.name ?? init.callee.type], ', target is', [targetName]);
        if (
          init.callee.type === 'Identifier' &&
          aliases.has(init.callee.name)
        ) {
          vlog('   - ok, the function is calling target directly or indirectly as "first" action, var stmt');
          return {call: init, blockBody, blockIndex, aliases};
        }
      }

      if (init.type === 'Identifier') {
        vlog('  - name:', init.name);
        if (aliases.has(init.name)) {
          vlog('   - ok, adding to aliases', [stmt.id.name]);
          // Add alias to the list
          aliases.add(stmt.id.name);
          continue;
        }

        // TODO: is this risky? can this lead to bad aliases?
        vlog('  - ok; tentatively I think this might be ok. not observable, probably not risky');
        continue;
      }

      if (['FunctionExpression'].includes(init.type)) {
        // TODO: check this claim and describe it better if true: vlog('  - bail, too risky/expensive of leaking an alias', init.type);
        vlog('  - ok, noob');
        continue;
      }

      if (
        // The identifier case could trip a TDZ error but I think we're gonna be okay
        ['Identifier'].includes(init.type) ||
        AST.isPrimitive(init) ||
        (init.type === 'ArrayExpression' && init.elements.every(e => !e || AST.isPrimitive(e)))
      ) {
        vlog('  - ok, ignoring');
        continue;
      }

      vlog('- bail: this var init expr type is not allow listed', init.type);
      break;
    }

    if (stmt.type === 'EmptyStatement') {
      continue;
    }

    if (stmt.type === 'LabeledStatement') {
      vgroup('- Entering label. Will bail if not found in here.');
      // This is a one-way trip; we enter unconditionally but we don't continue visiting after the label if not yet found
      const r = verifyImmediatelyCalledBlock(targetName, stmt.body.body, 0, aliases);
      vgroupEnd();
      return r;
    }

    if (stmt.type === 'WhileStatement') {
      vgroup('- Entering loop. Will bail if not found in here.');
      // This is a one-way trip; we enter unconditionally but we don't continue visiting after the loop if not yet found
      const r = verifyImmediatelyCalledBlock(targetName, stmt.body.body, 0, aliases);
      vgroupEnd();
      return r;
    }

    if (stmt.type === 'TryStatement') {
      // This is tricky since there's no guarantee that anything runs inside a try without throwing
      // For now we just scan the first statement and that's it...?
      vlog('Check first statement for a call. Cannot support anything else safely at this time.');
      const first = stmt.block.body[0];
      let callNode;
      if (first?.type === 'VarStatement') {
        callNode = first.init;
      } else if (first?.type === 'ExpressionStatement') {
        if (first.expression.type === 'AssignmentExpression') {
          callNode = first.expression.right;
        } else {
          callNode = first.expression;
        }
      }

      if (
        callNode.type === 'CallExpression' &&
        callNode.callee.type === 'Identifier' &&
        aliases.has(callNode.callee.name)
      ) {
        vlog('- ok: first expr of try is calling the target directly or indirectly');
        return {call: callNode, blockBody, blockIndex, aliases};
      }
      vlog('- bail: could not verify the first expr in the try to call the func');
      return false;
    }

    vlog('- bail: statement not allow listed');
    return false;

    // Visit loops
    // Visit the first call of a try (super edge case but that's what we target). The rest is risky because an error may trigger.
    //this requires nested walking
  }

  vlog('   - bail: end of body; the function escapes and we did not prove that it is called immediately');
  return false;
}
function verifySelfAliasCalling(called, targetName, aliases, fdata, meta, firstCallNode, tmpCallVarNode) {
  let selfCalling = false; // The sealer is called once, closure is hoisted outward
  let aliasCalling = false; // The sealer is called over and over again, the closure is not relevant

  // Check if either func is called first and alias ignored, or func is not called at all
  if (called === targetName) {
    // Verify that the aliases are moot
    vlog('- ok! Since the sealer itself was called we must now verify that all aliases are moot', aliases);
    // Slightly trickier so we'll start conservatively;
    // - aliases should be dead after the first call
    // - aliases must be single scoped
    // - also ok when sealer is called twice (recursive and first) and only aliases after that

    let allok = true;
    aliases.forEach(aname => {
      if (!allok) return;
      const ameta = fdata.globallyUniqueNamingRegistry.get(aname);
      if (!ameta.singleScoped) {
        vlog('  - bail; alias', aname, 'is multi scoped');
        allok = false;
        return;
      }

      const allok2 = ameta.rwOrder.every(ref => {
        const r = ref.node.$p.npid;
        const c = firstCallNode.$p.npid;
        // vlog('   - ref @', r, ' <= call @', c);
        if (r > c) {
          vlog('- bail: found a read for the alias after the call', r, c);
          allok = false;
          return;
        }
        return false;
      });

      if (!allok2) {
        vlog('  - bail: alias', aname, 'has a ref after the call node');
        allok = false;
        return;
      }
    });
    if (!allok) {
      vlog('  - turns out at least one alias was used after the first call. since the first call was the sealer itself, we can still save this if the sealer is not called any more after the first call (and the seal call)');
      // We would love to do a .singleScoped check but we already know this will be multi-scoped due ot the recursive seal call. If only we could exclude that one...
      // Suppose it doesn't matter. We already manually asserted "first call" is the first call. If there is any other call than that one and the seal call then we
      // are bust here. Doesn't matter where that happens. But we have to go one step further; the sealer can't be referenced anywhere else.
      if (!meta.reads.every((read,i) => {
        vlog('  - read', i, '; parent type=', read.parentNode.type, ', grand type=', read.grandNode.type);
        // So we must exclude the reads that are the recursive "sealing" call, and the "first call" and any aliasing before the first call.
        if (read.parentNode.type === 'CallExpression' && read.parentProp === 'callee') {
          vlog('  - parent is call');
          if (
            read.grandNode.type === 'AssignmentExpression' &&
            read.grandNode.left.type === 'Identifier' &&
            read.grandNode.left.name === targetName
          ) {
            vlog('    - found the "seal" call, ignoring');
            return true; // This is the seal call
          }
          if (
            read.grandNode.type === 'VarStatement' &&
            read.grandNode === tmpCallVarNode
          ) {
            vlog('    - found the recursive call, ignoring');
            return true; // This is the seal call
          }
          if (read.parentNode === firstCallNode) {
            vlog('    - found the "first" call, ignoring');
            return true;
          }
          vlog('  - bail: sealer is called more than twice, and it has aliases that are being used, we cant continue');
          return false;
        }
        if (read.parentNode.type === 'VarStatement') {
          // Aliasing reads
          vlog('  - parent is var, id=', read.parentNode.id.name);
          if (aliases.has(read.parentNode.id.name)) {
            vlog('  - found an aliasing read, to', read.parentNode.id.name);
            return true;
          }
        }
        if (read.grandNode.type === 'VarStatement') {
          vlog('  - parent is var, id=', read.parentNode.id.name);
          if (aliases.has(read.parentNode.id.name)) {
            vlog('  - found an aliasing read, to', read.parentNode.id.name);
            return true;
          }
        }
        vlog('  - bail: to refine, but the read was not a call so we bail right now', read.parentNode.type);
        todo('self-closing function which was called immediately but may not have further refs, currently blocked on non-call usages');
        return false;
      })) {
        vlog('  - bail: this self-closing function is called itself and as an alias and we cant safely assert whether the closure is observable or not');
        return {selfCalling, aliasCalling};
      }

      vlog('- ok, looks like we recovered! The sealer is called once, so this is the aliasCaller pattern');
      aliasCalling = true;
    } else {
      vlog('- ok, this is selfCalling');
      selfCalling = true;
    }
  } else {
    // Verify that the sealer is not used beyond the pattern
    vlog('- ok! Since an alias was called we must now verify that the sealer itself is not used beyond the pattern', meta.reads.length);

    let called = 0;
    meta.reads.some((read,i) => {
      // Assert that the ident is called exactly once (the recursive call)
      // Because this means the closure effect can never actually be observed
      vlog('- sealer read', i, ':', read.parentNode.type, read.parentProp)
      if (read.parentNode.type === 'CallExpression' && read.parentProp === 'callee') {
        called += 1;
        if (called > 1) return true; // Bust.
      }
    });
    if (called > 1) {
      vlog('- bail: the sealer function was called more than once. This does not match the pattern.');
      return {selfCalling, aliasCalling};
    }
    aliasCalling = true;
  }

  return {selfCalling, aliasCalling};
}
function verifyArgumentsAccessibleAtDecl(firstCallNode, fdata, first) {
  // For now, we must verify that all args in the first call are reachable at var decl time
  vlog('Verify that all args can be accessed at var decl time');
  if (!firstCallNode.arguments.every((anode,i) => {
    if (AST.isPrimitive(anode)) {
      vlog('-', i, 'ok primitive')
      return true;
    }
    if (anode.type !== 'Identifier') {
      vlog('-',i,'bail: a call arg was not an ident or primitive');
      return false;
    }
    // Find the decl of the ident. Check if that's in same or higher block than the decl of the sealer
    const meta = fdata.globallyUniqueNamingRegistry.get(anode.name);
    if (meta.isBuiltin) return true; // always accessible so that's fine
    if (meta.isImplicitGlobal) return true; // I mean, probably fine, but always accessible anyways
    // Let's ignore catch vars for now
    if (meta.isCatchVar) {
      todo('Edge case in self-closing function that passes on catch vars');
      vlog('-', i, 'bail')
      return false;
    }
    ASSERT(meta.isExplicitVar, 'what other kinds are left? update logic here accordingly', meta);
    // Find the decl
    const declWrite = meta.writes.find(write => write.kind === 'var');
    ASSERT(declWrite, 'must find a decl');
    // Now check that this decl has an equal or lower block chain
    vlog('-',i,'Verifying blockchains now;', [declWrite.blockChain], '<=', [first.blockChain]);
    if (declWrite.blockChain > first.blockChain) {
      vlog('-', i, 'bail; not reachable')
      return false;
    }
    vlog('-',i,'Verifying pid now;', [declWrite.node.$p.npid], '<=', [first.node.$p.npid]);
    if (declWrite.node.$p.npid > first.node.$p.npid) {
      vlog('-', i, 'bail; arg is declared after func decl')
      return false;
    }

    vlog('-', i, 'ok: reachable')
    return true;
  })) {
    vlog('- bail: at least one argument was not reachable at func decl time');
    todo('self-closing function pattern with unreachable first call arg');
    return false;
  }
  return true;
}
