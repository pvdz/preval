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
import { ASSERT, log, group, groupEnd, vlog, vgroup, vgroupEnd, rule, example, before, source, after, fmat, tmat, findBodyOffset, findBodyOffsetExpensiveMaybe, assertNoDupeNodes } from '../utils.mjs';
import * as AST from '../ast.mjs';

export function selfAssignClosure(fdata) {
  group('\n\n\n[selfAssignClosure] Checking for self-assigning funcs returning their own closures');
  //currentState(fdata, 'selfAssignClosure', true, fdata);
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

  const found = findInitSealer(fdata);
  if (found) return 1;

  fdata.globallyUniqueNamingRegistry.forEach(function (meta, targetName) {
    if (meta.isBuiltin) return;
    if (meta.isImplicitGlobal) return;
    if (meta.isConstant) return;
    if (meta.rwOrder.length <= 2) return; // For now only target a very specific case.
    if (meta.writes.length !== 2) return; // require two writes
    if (meta.writes[0].kind !== 'var' || meta.writes[1].kind !== 'assign') return; // the assign is nested in the var so it must follow

    vgroup('- `' + targetName + '`');
    const changed = process(fdata, meta, targetName);
    if (changed) updated += 1;
    vgroupEnd();
  });

  return updated;
}

function findInitSealer(fdata) {
  return findInit(fdata.tenkoOutput.ast.body, fdata);
}
function findInit(body, fdata) {
  ASSERT(arguments.length === findInit.length);
  ASSERT(!body.type, 'should receive an array, not a BlockStatement', body);

  vgroup('findInit');
  const r = _findInit(body, fdata);
  vgroupEnd();
  return r;
}
function _findInit(body, fdata) {
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
      return findInit(stmt.body.body, fdata);
    }
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

  // Verify that x is an alias for a function
  const meta = fdata.globallyUniqueNamingRegistry.get(xinit.name);
  if (meta.isBuiltin) return;
  if (meta.isImplicitGlobal) return;
  if (meta.isConstant) return;
  if (meta.writes.length !== 2) return;

  const decl = meta.writes[0].kind === 'var' ? meta.writes[0] : meta.writes[1];
  const assign = meta.writes[0].kind === 'assign' ? meta.writes[0] : meta.writes[1];
  if (!decl || !assign) return;

  if (decl.parentNode.init.type !== 'FunctionExpression') return;
  if (decl.blockBody[decl.blockIndex].kind !== 'let') return; // I think this check is unnecessary.

  const func = decl.parentNode.init;
  const funcBody = func.body.body;

  // Now verify if this function matches the pattern
  // Note: param count doesn't really matter, we assert that the first statament is Debugger so any param is unused.
  if (funcBody.length !== 5) return; // Looking for: `debugger; const x = []; self = func; const x = self(); return x`
  if (funcBody[0].type !== 'DebuggerStatement') return;
  if (funcBody[1].type !== 'VarStatement') return; // arr
  if (funcBody[1].init.type !== 'ArrayExpression') return;
  if (!funcBody[1].init.elements.every(e => !e || AST.isPrimitive(e))) return; // we can support _some_ idents too, but...
  if (funcBody[2].type !== 'ExpressionStatement') return;
  if (funcBody[2].expression.type !== 'AssignmentExpression') return;
  if (funcBody[2].expression.left.type !== 'Identifier') return;
  if (funcBody[2].expression.left.name !== xinit.name) return;
  if (funcBody[2].expression.right.type !== 'FunctionExpression') return;
  if (funcBody[2].expression.right.body.body.length !== 2) return; // nested func has debugger and then returns the arr
  if (funcBody[2].expression.right.body.body[0].type !== 'DebuggerStatement') return;
  if (funcBody[2].expression.right.body.body[1].type !== 'ReturnStatement') return;
  if (funcBody[2].expression.right.body.body[1].argument.name !== funcBody[1].id.name) return; // return arr
  if (funcBody[3].type !== 'VarStatement') return;
  if (funcBody[3].init.type !== 'CallExpression') return;
  if (funcBody[3].init.callee.type !== 'Identifier') return;
  if (funcBody[3].init.callee.name !== xinit.name) return;
  if (funcBody[3].init.arguments.length > 0) return; // There shouldn't be any args. It shouldn't matter. So we're going to ignore it. Most likely another transform will eliminate them anyways and then this rule will pass...
  if (funcBody[4].type !== 'ReturnStatement') return;
  if (funcBody[4].argument.type !== 'Identifier') return;
  if (funcBody[4].argument.name !== funcBody[3].id.name) return;

  // xinit is the self-sealing pattern.
  // In that case y is truly noop since the rhs can not have been referenced in this pattern
  // In that case z is calling xinit as the first operation of the script and we are go for takeoff.

  // So:
  // - We know the func is called immediately as the first action of this script
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
    AST.returnStatement(funcBody[1].id.name) // return arr
  ]);
  // We should have eliminated the only other write so it's now a const. We also could omit this step and let other rules deal with it.
  decl.blockBody[decl.blockIndex].kind = 'const';
  // return arr
  decl.blockBody.splice(decl.blockIndex, 0, funcBody[1]);

  after(decl.blockBody[decl.blockIndex]);
  after(decl.blockBody[decl.blockIndex+1]);

  // Now it must just restart from phase1 immediately, don't bother with the rest.
  return true;
}

function process(fdata, meta, targetName) {
  // Initially, only target the write-write-read+ case. We can try to expand that later but not sure if we have to.
  // We already verified that the references start with two rwites and are only reads after that
  // Now we must confirm that
  // - all reads are regular calls
  // - one read occurs after the write
  // - the result of _that_ call is returned
  // - and more

  const firstWrite = meta.writes[0];
  const secondWrite = meta.writes[1];

  if (firstWrite.parentNode.type !== 'VarStatement' && firstWrite.parentProp !== 'id') {
    return;
  }
  if (firstWrite.parentNode.init.type !== 'FunctionExpression') {
    return;
  }
  if (secondWrite.parentNode.type !== 'AssignmentExpression' && firstWrite.parentProp !== 'left') {
    // Not assigning TO the binding
    return;
  }
  if (secondWrite.parentNode.right.type !== 'FunctionExpression') {
    return;
  }
  const outerFuncBlock = firstWrite.parentNode.init.body.body;
  if (!outerFuncBlock.includes(secondWrite.grandNode)) {
    // Second assign was not in root of function that was assigned in the first write
    return;
  }

  // Confirmed that this was the case of a var initialized to a func and
  // inside that function the same binding was updated with a new function
  //
  //     `let f = function(){ ...; f = function(){ ... }; ... }`
  //
  // Next: confirm that the outer function ends with returning a call to it(-new-)self
  //
  //     `let f = function(){ ...; f = function(){ ... }; const tmp = f(); return tmp; }`
  //

  if (outerFuncBlock.length < 3) {
    vlog('- bail; need at least 3 statements to match the pattern');
    return;
  }
  const closingNode = outerFuncBlock[outerFuncBlock.length - 3];
  const tmpCall = outerFuncBlock[outerFuncBlock.length - 2];
  const tmpRet = outerFuncBlock[outerFuncBlock.length - 1];

  // `targetName = function(){}`
  if (
    closingNode.type !== 'ExpressionStatement' ||
    closingNode.expression !== secondWrite.parentNode
  ) {
    vlog('- bail; third-last statement of outer function was not the assignment of the inner function');
    return;
  }

  // `var tmp = targetName()`
  if (
    tmpCall.type !== 'VarStatement' ||
    tmpCall.init.type !== 'CallExpression' ||
    tmpCall.init.callee.type !== 'Identifier' ||
    tmpCall.init.callee.name !== targetName
  ) {
    vlog('- bail; second-last statement was not a call to the inner function');
    return;
  }
  // Check if `const tmp = targetName(...x)` has a spread
  if (tmpCall.init.arguments.some(a => a.type === 'SpreadElement')) {
    vlog('- bail; at least one arg to the inner call is spreading'); // We can probably support some cases here tho
    return;
  }

  // `return tmp`
  if (
    tmpRet.type !== 'ReturnStatement' ||
    tmpRet.argument.type !== 'Identifier' ||
    tmpRet.argument.name !== tmpCall.id.name
  ) {
    vlog('- bail; final return is not returning the tmp call');
    return;
  }

  // Confirmed this pattern now:
  //
  //     `let f = function(){ ...; f = function(){ ... }; const tmp = f(); return tmp; }`
  //
  // With some unknown parts before and inside the inner function and where the closing call
  // does not spread. It may still pass through params. There are now a few cases to cover;

  if (verifyClosureCase(fdata, meta, targetName, firstWrite, secondWrite)) {
    return true;
  }
  if (verifyWrapperCase(fdata, meta, targetName, firstWrite, secondWrite)) {
    return true;
  }
  if (verifyImmediatelyCalledCase(fdata, meta, targetName, firstWrite, secondWrite)) {
    return true;
  }

  return false;
}

function verifyWrapperCase(fdata, meta, targetName, firstWrite, secondWrite) {
  vlog('verifyWrapperCase()');
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
  // Start by verifying that the inner function has no closures. This needs to be recursive but
  // we can also decide to bail when the inner function has another nested function...

  const program = fdata.tenkoOutput.ast; // Need this to check for explicit globals

  vgroup('Verifying whether inner function has any closures or nested funcs');
  let fail = false;
  walk(_walker, secondWrite.parentNode.right);
  function _walker(node, beforeWalk, nodeType, path) {
    if (fail) return true; // Do not enter more nodes
    if (beforeWalk) return;
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

  const innerBlock = firstWrite.parentNode.init.body.body;
  const offset = firstWrite.parentNode.init.$p.bodyOffset;

  // Verify a pattern of `let f = function(){ debugger; f = function(){ ... }; const tmp = f(); return tmp; }`
  // The above already verified that the inside does not contain a closure.

  const call = innerBlock[offset+1].init;

  rule('Simple self closing function with no side effects can be collapsed');
  example(
    'let f = function(a,b){ g(1); f = function(c,d){ return g(2); }; const tmp = f(a,b); return tmp; };',
  'let f = function(){ g(1); const c=a; const d=b; return g(2); };'
  );
  before(firstWrite.blockBody[firstWrite.blockIndex]);

  innerBlock.splice(offset, 1,
    ...secondWrite.parentNode.right.params.map((pnode,i) => {
      return pnode.$p.paramVarDeclRef ?
        AST.varStatement(
          'let',
          pnode.$p.paramVarDeclRef.blockBody[pnode.$p.paramVarDeclRef.blockIndex].id.name,
          // Either use the call arg node or use undefined
          call.arguments[i] || AST.identifier('undefined'),
        ) : AST.emptyStatement();
    }),
    ...secondWrite.parentNode.right.body.body.slice(secondWrite.parentNode.right.$p.bodyOffset)
  );
  innerBlock.pop(); // Drop the (old) last return
  innerBlock.pop(); // Drop the (old) now-last var tmp call

  after(firstWrite.blockBody[firstWrite.blockIndex]);
  assertNoDupeNodes(firstWrite.blockBody, 'body');
  return true;
}

function verifyClosureCase(fdata, meta, targetName, first, second) {
  vlog('verifyClosureCase()');
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
    vlog('   - bail: the function escapes and we did not prove that it is called immediately');
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

function verifyImmediatelyCalledCase(fdata, meta, targetName, first, second) {
  // In this case the self closing function is either called immediately, or aliased and the alias
  // is called immediately. And neither the targetName nor its aliases escape before that point.
  // If we can prove that then we can resolve the self assignment immediately and don't have to
  // worry about local closures.



  let immediatelyCalled = false;

  // We will search for the first call of any of these names or a statement that could potentially
  // let the function escape. We're cutting corners here so this could be solidified at the cost of perf.
  const aliases = new Set([targetName]);

  let index = first.blockIndex;
  while (++index < first.blockBody.length) {
    const stmt = first.blockBody[index];

    if (stmt.type === 'ExpressionStatement') {
      const expr = stmt.expression;
      if (
        expr.type === 'CallExpression' &&
        expr.callee.type === 'Identifier' &&
        aliases.has(expr.callee.name)
      ) {
        // The function is called before anything else, yay
        immediatelyCalled = true;
        break;
      }

      if (expr.type === 'CallExpression') {
        // There was a function call but our function could not have escaped yet
        // so we should be able to safely ignore this call and continue.
        // TODO: what about expressions containing an alias letting it escape? like an array element or call arg
        continue;
      }

      if (['Identifier', 'BinaryExpression'].includes(expr.type)) {
        // Could not possibly mess with our function so fine to skip
        continue;
      }

      if (expr.type === 'AssignmentExpression') {
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
      break;
    }
    if (stmt.type === 'VarStatement') {
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

      if (init.type === 'Identifier' && aliases.has(init.name)) {
        // Add alias to the list
        aliases.add(stmt.id.name);
        continue;
      }

      if (['FunctionExpression'].includes(init.type)) {
        vlog('  - bail, too risky/expensive of leaking an alias', init.type);
        break;
      }

      if (
        // The identifier case could trip a TDZ error but I think we're gonna be okay
        !['Identifier'].includes(init.type) && // etc...
        !AST.isPrimitive(init)
      ) {
        vlog('  - bail, var init was not an ident, func, or primitive, before seeing call', init.type);
        break;
      }
    }

    // Visit loops
    // Visit the first call of a try (super edge case but that's what we target). The rest is risky because an error may trigger.
    //this requires nested walking
  }

  if (!immediatelyCalled) {
    vlog('   - bail: the function escapes and we did not prove that it is called immediately');
    return false;
  }



}
