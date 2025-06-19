// Find functions with one statement and a return and inline calls to them

import { ASSERT, log, group, groupEnd, vlog, vgroup, vgroupEnd, rule, example, before, source, after, findBodyOffset, todo, currentState, } from '../utils.mjs';
import * as AST from '../ast.mjs';
import { createFreshVar } from '../bindings.mjs';

export function inlineSimpleFuncCalls(fdata) {
  group('\n\n\n[inlineSimpleFuncCalls] Checking for simple func calls that can be inlined');
  // currentState(fdata, 'inlineSimpleFuncCalls', true, fdata);
  const r = _inlineSimpleFuncCalls(fdata);
  groupEnd();
  return r;
}
function _inlineSimpleFuncCalls(fdata) {
  const queue = [];
  fdata.globallyUniqueNamingRegistry.forEach(function (meta, funcName) {
    if (!meta.isConstant) return;
    if (meta.writes.length !== 1) return; // :shrug:
    if (meta.reads.length === 0) return; // :shrug:

    const funcNode = meta.varDeclRef.node;
    if (funcNode.type !== 'FunctionExpression') return;
    if (funcNode.async) {
      todo('inline async functions safely (because await)');
      return;
    }
    if (funcNode.generator) {
      todo('inline generator functions safely (because yield)');
      return;
    }

    vgroup('- `' + meta.uniqueName + ':', meta.varDeclRef.node.type);
    process(meta, funcName, funcNode, fdata, queue);
    vgroupEnd();
  });

  if (queue.length) {
    // Now unwind the queue in reverse AST order. This way splices should not interfere with each other.
    queue.sort(({index: a}, {index: b}) => b - a);
    queue.forEach(({func}) => {
      vgroup('Applying queue item');
      func();
      vgroupEnd();
    });

    log('Inlined function calls:', queue.length, '. Restarting from phase1 to fix up read/write registry');
    return {what: 'inlineSimpleFuncCalls', changes: queue.length, next: 'phase1'};
  }

  log('Inlined function calls: 0.');
}
function process(meta, funcName, funcNode, fdata, queue) {
  if (funcNode.params.some((pnode) => pnode.rest)) {
    vlog('- bail: Function param has a rest element');
    return;
  }

  // A simple function is a function with one statement and a return statement.
  // In normalized code, the return statement must have a simple argument with no side effects.
  // The other statement must not be of a branching or block type (no `if`, `while`, `for`, or `try`)
  // For the time being, we should probably disallow fresh functions as well, since they add
  // complexity through closures (local to the params that we will eliminate).

  // The function can have any number of params and we'll need to connect them all to the call
  // args because they might be used in an array or func call or return value.

  // There are some situations where we cannot inline the call
  // - Func has rest param. We can't reliably match params to args.
  // - Call uses spread. We can't reliably match params to args.
  // - Function uses `this`
  // - Function uses `arguments`
  // - Function uses `arguments.length` when we can't determine it (can this even happen without other rules bailing?)

  if (funcNode.$p.thisAccess) {
    vlog('- bail: Function uses `this`');
    return;
  }
  if (funcNode.$p.readsArgumentsAny) {
    todo('Can we inline a function that uses arguments, anyways?');
    vlog('- bail: Function accesses `arguments`');
    return;
  }

  const bodyOffset = funcNode.$p.bodyOffset;
  ASSERT(bodyOffset);

  const bodyNodes = funcNode.body.body.slice(bodyOffset);
  ASSERT(bodyNodes.length > 0, 'normalized functions must explicitly return so even empty functions must return undefined');

  if (bodyNodes.length > 2) return vlog('- bail: body has more than two statements; risky to proceed due to duplication bloat:', bodyNodes.length);

  const ret = bodyNodes[bodyNodes.length - 1];
  if (ret.type !== 'ReturnStatement' && ret.type !== 'ThrowStatement') {
    // Note: cannot be break.
    if (ret.type !== 'IfStatement') todo(`what last statement is not return? ${ret.type}`);
    return vlog('- bail: last statement of func is not a return', ret.type);
  }

  // Figure out the return/throw value. There must be one as all functions have a return value.
  let paramIndex = -1;
  let argslen = false;
  const returnArg = ret.argument;
  if (returnArg.type === 'Identifier') {
    if (returnArg.name === funcNode.$p.readsArgumentsLenAs) {
      return vlog('- bail: func is returning/throwing the `arguments.length` alias');
    } else if (returnArg.name === funcNode.$p.readsArgumentsAs) {
      return vlog('- bail: func is returning/throwing the `arguments` alias');
    } else if (returnArg.name === funcNode.$p.thisAliasAs) {
      todo('we can probably apply simple_funcs inlining when it returns/throw `this`');
      return vlog('- bail: returns `this`');
    } else {
      paramIndex = funcNode.$p.paramNames.indexOf(returnArg.name);
    }
  }

  vlog('- returns or throws param index?', paramIndex, ', argslen?', argslen, ret.type);

  if (bodyNodes.length === 1) {
    vlog('- body has 1 statement after header', ret.type);

    // The call is entirely replaced with the returned/thrown value.
    // If the arg is returning a param then the call is replaced with that arg.
    // The statement can only return one value, which must be simple at this point, so at most one arg is relevant.
    // Note: It may still return/throw a non-param (primitive, closure, builtin) but we filtered some cases (this/arguments)
    // Note: we may not be able to transform all calls. That's fine. We're leaving the function for another reducer to clean.

    vgroup('- ok. Processing reads to the function. Note that some may not be able to transform.');
    meta.reads.forEach((read) => {
      if (read.parentNode.type === 'CallExpression' && read.parentProp === 'callee') {
        if (read.parentNode['arguments'].some((anode) => anode.type === 'SpreadElement')) {
          vlog('At least one arg of the call was a spread. Bailing');
          return;
        }

        queue.push({
          index: read.blockIndex,
          func: () => {
            rule('Simple function whcih only returns or throws can be inlined');
            example('function f(x){ return x; } f(a); f(b);', 'a; b;');
            example('function f(x){ throw x; } f(a); f(b);', 'throw a; throw b;');
            before(read.blockBody[read.blockIndex], funcNode);

            const callNode = read.parentNode;
            const callArgs = callNode['arguments'];

            let arg;
            if (argslen) {
              // This was the `arguments.length` alias inside this function. Inline it with the number of args of the call now :)
              ASSERT(false, 'unreachable'); // would have returned early
            } else if (paramIndex >= 0) {
              // Replace call with the arg in position paramIndex of the call
              // We should not need to clone this since the arg is not reused more then once, and not duplicated in the AST
              arg = AST.cloneSimple(callArgs[paramIndex] || AST.undef());
            } else {
              // Replace call with a clone of the return arg, whatever it is
              arg = AST.cloneSimple(returnArg);
            }

            if (ret.type === 'ThrowStatement') {
              // Push throw before the calling statement. This retains tdz sort of edge cases. Other reducers will clean that up.
              read.blockBody.splice(read.blockIndex, 0, AST.throwStatement(arg));
              // The rest will be DCE'd. Must remove call though, or risk infinite transform loop
              if (read.grandIndex < 0) read.grandNode[read.grandProp] = AST.identifier('undefined');
              else read.grandNode[read.grandProp][read.grandIndex] = AST.identifier('undefined');
            } else {
              if (read.grandIndex < 0) read.grandNode[read.grandProp] = arg;
              else read.grandNode[read.grandProp][read.grandIndex] = arg;
            }

            // Make sure to do this second. If the function ended with a throw, this newNode should precede it
            // Also make sure to retain tdz crash semantics; outline args as statements.
            const outlinedArgs = callArgs
              .filter(anode => anode.type !== 'FunctionExpression' && !AST.isPrimitive(anode))
              .map(anode => AST.expressionStatement(AST.cloneSortOfSimple(anode)));
            // Move call original call args (simple) as statements before the call to retain tdz logic.
            read.blockBody.splice(read.blockIndex, 0, ...outlinedArgs);

            after(read.blockBody.slice(read.blockIndex, read.blockIndex + 1 + outlinedArgs.length + (ret.type === 'ThrowStatement' ? 1 : 0)));
          },
        });
      } else {
        vlog('This read was not a call. Bailing');
      }
    });
    vgroupEnd();
  }
  else if (bodyNodes.length === 2) {
    const stmt = bodyNodes[0];
    vlog('- body has 2 statements after header:', stmt.type, ret.type);

    if (!['ExpressionStatement', 'VarStatement'].includes(stmt.type)) {
      vlog('- bail: Function contained something other than expression or var statement:', stmt.type);
      return;
    }

    if (stmt.type === 'ExpressionStatement') {
      if (stmt.expression.type === 'AssignmentExpression' && stmt.expression.right.type === 'FunctionExpression') {
        return vlog('- bail: assigns a function, edge cases are too complex');
      }
    } else if (stmt.type === 'VarStatement') {
      if (stmt.init.type === 'FunctionExpression') {
        return vlog('- bail: returns a fresh function, edge cases are too complex');
      }
    }

    vlog('- ok. Function with some statement and a return.');

    vgroup('- Processing', meta.reads.length, 'function reads.');
    meta.reads.forEach((read, ri) => {
      const callNode = read.parentNode;
      if (callNode.type !== 'CallExpression' || read.parentProp !== 'callee') {
        vlog('-', ri, ': bail: not a call', callNode.type, read.parentProp);
        return;
      }

      if (
        callNode.callee.type === 'Identifier' &&
        callNode.callee.name === funcName &&
        (callNode.blockChain + ',').startsWith(funcNode.$p.blockChain + ',')
      ) {
        vlog('-', ri,': bail: call is recursive, bail', callNode.callee.name, funcName);
        return;
      }

      if (callNode['arguments'].some((anode) => anode.type === 'SpreadElement')) {
        vlog('-', ri, ': bail: at least one arg was a spread. Bailing');
        return;
      }

      const paramArgMapper = new Map(
        funcNode.params
          .map((pnode, pi) => [pnode.$p.paramVarDeclRef?.name, callNode['arguments'][pi] ?? AST.identifier('undefined')])
          .filter((a) => !!a[0]),
      );
      if (funcNode.$p.readsArgumentsLen) {
        // If the argslen alias was referenced, make sure it's replaced with the proper (actual) value
        paramArgMapper.set(funcNode.$p.readsArgumentsLenAs, AST.literal(callNode['arguments'].length));
      }

      if (stmt.type === 'VarStatement') {
        vgroup('-', ri, ': function contained a var statement; processVarStmtCase()');
        processVarStmtCase(stmt, ret, paramArgMapper, read, ri, funcNode, fdata, queue, argslen, paramIndex, returnArg);
        vgroupEnd();
      } else {
        vgroup('-', ri, ': function contained an expr statement; processExprStmtCase()');
        processExprStmtCase(stmt, ret, paramArgMapper, read, ri, funcNode, queue, argslen, paramIndex, returnArg);
        vgroupEnd();
      }
    });
    vgroupEnd();
  } else {
    // Maybe we'll want to inline with certain other statements but that's tbd.
  }
}
function processVarStmtCase(stmt, ret, paramArgMapper, read, ri, funcNode, fdata, queue, argslen, paramIndex, returnArg) {
  const oldName = stmt.id.name;
  // Special case because we need to create a unique name for the binding
  const fail = { de: false };
  if (stmt.init.type === 'AwaitExpression') {
    // We can totally do this when the new parent function is async. But we gotta check that first.
    vlog('  - Init is `await`, bailing. TODO: confirm if new parent function is async and then do it anyways');
    return false;
  }
  if (stmt.init.type === 'YieldExpression') {
    // We can totally do this when the new parent function is generator. But we gotta check that first.
    vlog('  - Init is `yield`, bailing. TODO: confirm if new parent function is generator and then do it anyways');
    return false;
  }
  const newInit = AST.deepCloneForFuncInlining(stmt.init, paramArgMapper, fail);
  if (fail.ed) {
    vlog('  - Node contained a write to a param. Bailing');
    return false;
  }

  vlog('- ok. Func with a var statement can be inlined into this call, queueing transform');

  queue.push({
    index: read.blockIndex,
    func: () => {
      rule('Simple function with only a var decl can be inlined');
      example('function f(){ const x = g(); return x; } f(); f();', 'g(); g();');
      before(read.blockBody[read.blockIndex], funcNode);

      const callNode = read.parentNode;
      const callArgs = callNode['arguments'];

      const tmpName = createFreshVar(stmt.id.name, fdata);
      const newNode = AST.varStatement('const', tmpName, newInit);

      let arg;
      if (argslen) {
        // This was the `arguments.length` alias inside this function. Inline it with the number of args of the call now :)
        ASSERT(false, 'unreachable'); // would have returned early
      } else if (paramIndex >= 0) {
        // Replace call with the arg in position paramIndex of the call
        // We should not need to clone this since the arg is not reused more then once, and not duplicated in the AST
        arg = AST.cloneSimple(callArgs[paramIndex] || AST.undef());
      } else if (returnArg.type === 'Identifier' && returnArg.name === oldName) {
        // Replace call with renamed local variable
        arg = AST.identifier(tmpName);
      } else {
        // Replace call with a clone of the return arg
        arg = AST.cloneSimple(returnArg);
      }

      if (ret.type === 'ThrowStatement') {
        read.blockBody.splice(read.blockIndex, 0, AST.throwStatement(arg));
        // The rest will be DCE'd. Must remove call though, or risk infinite transform loop
        if (read.grandIndex < 0) read.grandNode[read.grandProp] = AST.identifier('undefined');
        else read.grandNode[read.grandProp][read.grandIndex] = AST.identifier('undefined');
      } else {
        if (read.grandIndex < 0) read.grandNode[read.grandProp] = arg;
        else read.grandNode[read.grandProp][read.grandIndex] = arg;
      }

      // Make sure to do this second. If the function ended with a throw, this newNode should precede it
      // Also make sure to retain tdz crash semantics; outline args as statements.
      const outlinedArgs = callArgs
        .filter(anode => anode.type !== 'FunctionRExpression' && !AST.isPrimitive(anode))
        .map(anode => AST.expressionStatement(AST.cloneSortOfSimple(anode)));
      read.blockBody.splice(read.blockIndex, 0, ...outlinedArgs, newNode);

      after(read.blockBody.slice(read.blockIndex, read.blockIndex + 2 + outlinedArgs.length + (ret.type === 'ThrowStatement' ? 1 : 0)));
    },
  });
  return true;
}
function processExprStmtCase(stmt, ret, paramArgMapper, read, ri, funcNode, queue, argslen, paramIndex, returnArg) {
  const fail = { de: false };
  const newNode = AST.deepCloneForFuncInlining(stmt, paramArgMapper, fail);
  if (fail.ed) {
    vlog('  - Node contained a write to a param. Bailing');
    return false;
  }

  queue.push({
    index: read.blockIndex,
    func: () => {
      rule('Simple function with only an expression can be inlined');
      example('function f(x){ g(); return x; } f(); f();', 'g(); g();');
      before(read.blockBody[read.blockIndex], funcNode);

      const callNode = read.parentNode;
      const callArgs = callNode['arguments'];

      let arg;
      if (argslen) {
        vlog('- using arguments.length resolved...');
        // This was the `arguments.length` alias inside this function. Inline it with the number of args of the call now :)
        ASSERT(false, 'unreachable'); // would have returned early
      } else if (paramIndex >= 0) {
        vlog('- using arg at index', paramIndex);
        // Replace call with the arg in position paramIndex of the call
        // We should not need to clone this since the arg is not reused more then once, and not duplicated in the AST
        arg = AST.cloneSimple(callArgs[paramIndex] || AST.undef());
      } else {
        vlog('- using clone of arg, which is not a param or local var');
        // Replace call with a clone of the return arg
        arg = AST.cloneSimple(returnArg);
      }

      if (ret.type === 'ThrowStatement') {
        read.blockBody.splice(read.blockIndex, 0, AST.throwStatement(arg));
        // The rest will be DCE'd. Must remove call though, or risk infinite transform loop
        if (read.grandIndex < 0) read.grandNode[read.grandProp] = AST.identifier('undefined');
        else read.grandNode[read.grandProp][read.grandIndex] = AST.identifier('undefined');
      } else {
        if (read.grandIndex < 0) read.grandNode[read.grandProp] = arg;
        else read.grandNode[read.grandProp][read.grandIndex] = arg;
      }

      // Make sure to do this second. If the function ended with a throw, this newNode should precede it
      // Also make sure to retain tdz crash semantics; outline args as statements.
      const outlinedArgs = callArgs
        .filter(anode => anode.type !== 'FunctionRExpression' && !AST.isPrimitive(anode))
        .map(anode => AST.expressionStatement(AST.cloneSortOfSimple(anode)));
      read.blockBody.splice(read.blockIndex, 0,
        ...outlinedArgs, // cant be spread, right?
        newNode
      );

      after(read.blockBody.slice(read.blockIndex, read.blockIndex + 2 + outlinedArgs.length + (ret.type === 'ThrowStatement' ? 1 : 0)));
    },
  });
  return true;
}
