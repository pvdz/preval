// Find functions with one statement and a return and inline calls to them

import { ASSERT, log, group, groupEnd, vlog, vgroup, vgroupEnd, rule, example, before, source, after, findBodyOffset, todo, } from '../utils.mjs';
import * as AST from '../ast.mjs';
import { createFreshVar } from '../bindings.mjs';

export function inlineSimpleFuncCalls(fdata) {
  group('\n\n\n[inlineSimpleFuncCalls] Checking for simple func calls that can be inlined');
  const r = _inlineSimpleFuncCalls(fdata);
  groupEnd();
  return r;
}
function _inlineSimpleFuncCalls(fdata) {
  const queue = [];
  fdata.globallyUniqueNamingRegistry.forEach(function (meta, funcName) {
    if (meta.isBuiltin) return;
    if (meta.isImplicitGlobal) return;
    if (!meta.isConstant) return;
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
    queue.sort(([a], [b]) => (a < b ? 1 : a > b ? -1 : 0));
    queue.forEach(([pid, f]) => f());

    log('Inlined function calls:', queue.length, '. Restarting from phase1 to fix up read/write registry');
    return {what: 'inlineSimpleFuncCalls', changes: queue.length, next: 'phase1'};
  }

  log('Inlined function calls: 0.');
}
function process(meta, funcName, funcNode, fdata, queue) {
  if (funcNode.params.some((pnode) => pnode.rest)) {
    vlog('Function params has a rest element. Bailing');
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
    vlog('Function uses `this`. Bailing');
    return;
  }
  if (funcNode.$p.readsArgumentsAny) {
    // TODO: can we do this anyways? Not if it's actually returned but otherwise..?
    vlog('Function accesses `arguments`. Bailing');
    return;
  }

  const bodyOffset = funcNode.$p.bodyOffset;
  ASSERT(bodyOffset);

  const bodyNodes = funcNode.body.body.slice(bodyOffset);
  ASSERT(bodyNodes.length > 0, 'normalized functions must explicitly return so even empty functions must return undefined');

  if (bodyNodes.length === 1) {
    const ret = bodyNodes[0];
    if (ret.type === 'IfStatement') {
      vlog('Function has only `if`. Bailing.');
      return;
    }

    // Function only has a return type
    ASSERT(ret.type === 'ReturnStatement' || ret.type === 'ThrowStatement', 'must end with return/throw?', ret);

    // The call is entirely replaced with the return arg.
    // If the arg is a param then the call is replaced with that arg.

    let paramIndex = -1;
    let argslen = false;
    const returnArg = ret.argument;
    if (returnArg.type === 'Identifier') {
      if (returnArg.name === funcNode.$p.readsArgumentsLenAs) {
        vlog('This is the `arguments.length` alias (A)');
        argslen = true;
      } else {
        paramIndex = funcNode.$p.paramNames.indexOf(returnArg.name);
      }
    }

    vgroup('Processing reads.');
    meta.reads.forEach((read) => {
      if (read.parentNode.type === 'CallExpression' && read.parentProp === 'callee') {
        if (read.parentNode['arguments'].some((anode) => anode.type === 'SpreadElement')) {
          vlog('At least one arg of the call was a spread. Bailing');
          return;
        }

        queue.push([
          +read.node.$p.pid,
          () => {
            rule('Simple function with only a return statement can be inlined');
            example('function f(x){ return x; } f(a); f(b);', 'a; b;');
            before(read.blockBody[read.blockIndex], funcNode);

            const callNode = read.parentNode;
            const callArgs = callNode['arguments'];

            let arg;
            if (argslen) {
              // This was the `arguments.length` alias inside this function. Inline it with the number of args of the call now :)
              arg = AST.literal(callArgs.length);
            } else if (paramIndex >= 0) {
              // Replace call with the arg in position paramIndex of the call
              // We should not need to clone this since the arg is not reused more then once, and not duplicated in the AST
              arg = callArgs[paramIndex];
            } else {
              // Replace call with a clone of the return arg
              arg = AST.cloneSimple(returnArg);
            }

            if (ret.type === 'ThrowStatement') {
              read.blockBody.splice(read.blockIndex, 0, AST.throwStatement(arg));
              // The rest will be DCE'd so whatever.
              if (read.grandIndex < 0) read.grandNode[read.grandProp] = AST.identifier('undefined');
              else read.grandNode[read.grandProp][read.grandIndex] = AST.identifier('undefined');
            } else {
              if (read.grandIndex < 0) read.grandNode[read.grandProp] = arg;
              else read.grandNode[read.grandProp][read.grandIndex] = arg;
            }

            // Make sure to do this second. If the function ended with a throw, this newNode should precede it
            // Also make sure to retain tdz crash semantics; outline args as statements.
            read.blockBody.splice(read.blockIndex, 0,
              ...callArgs
                .filter(anode => anode.type !== 'FunctionRExpression' && !AST.isPrimitive(anode))
                .map(anode => AST.expressionStatement(AST.cloneSortOfSimple(anode))), // cant be spread, right?
            );

            after(read.blockBody[read.blockIndex]);
          },
        ]);
      } else {
        vlog('This read was not a call. Bailing');
      }
    });
    vgroupEnd();
  } else if (bodyNodes.length === 2) {
    const stmt = bodyNodes[0];
    if (!['ExpressionStatement', 'VarStatement'].includes(stmt.type)) {
      vlog('Function contained something other than expression or var statement', stmt.type, ', bailing');
      return;
    }

    const ret = bodyNodes[1];
    if (ret.type === 'IfStatement') {
      vlog('Function has only `if`. Bailing.');
      return;
    }

    ASSERT(ret.type === 'ReturnStatement' || ret.type === 'ThrowStatement');

    if (stmt.type === 'ExpressionStatement') {
      if (stmt.expression.type === 'AssignmentExpression' && stmt.expression.right.type === 'FunctionExpression') {
        return; // Too complex with the potential of closures over params
      }
    } else if (stmt.type === 'VarStatement') {
      if (stmt.init.type === 'FunctionExpression') {
        return; // Too complex with the potential of closures over params
      }
    }

    vgroup('Processing', meta.reads.length, 'reads.');
    meta.reads.forEach((read, ri) => {
      const callNode = read.parentNode;
      if (callNode.type !== 'CallExpression' || read.parentProp !== 'callee') {
        vlog('-', ri, ': not a call', callNode.type, read.parentProp);
        return;
      }

      if (
        callNode.callee.type === 'Identifier' &&
        callNode.callee.name === funcName &&
        (callNode.blockChain + ',').startsWith(funcNode.$p.blockChain + ',')
      ) {
        vlog('-', ri,': call is recursive, bail', callNode.callee.name, funcName);
        return;
      }

      if (callNode['arguments'].some((anode) => anode.type === 'SpreadElement')) {
        vlog('-', ri, ': at least one arg was a spread. Bailing');
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
        vgroup('-', ri, ': a var');
        processVar(stmt, ret, paramArgMapper, read, ri, funcNode, fdata, queue);
        vgroupEnd();
      } else {
        vgroup('-', ri, ': a non-var');
        processNonVar(stmt, ret, paramArgMapper, read, ri, funcNode, queue);
        vgroupEnd();
      }
    });
    vgroupEnd();
  } else {
    // Maybe we'll want to inline with certain other statements but that's tbd.
  }
}
function processVar(stmt, ret, paramArgMapper, read, ri, funcNode, fdata, queue) {
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

  queue.push([
    +read.node.$p.pid,
    () => {
      rule('Simple function with only a var decl can be inlined');
      example('function f(){ const x = g(); return x; } f(); f();', 'g(); g();');
      before(read.blockBody[read.blockIndex], funcNode);

      const callNode = read.parentNode;
      const callArgs = callNode['arguments'];

      const tmpName = createFreshVar(stmt.id.name, fdata);
      const newNode = AST.varStatement('const', tmpName, newInit);

      let paramIndex = -1;
      let argslen = false;
      const returnArg = ret.argument;
      if (returnArg.type === 'Identifier') {
        if (returnArg.name === funcNode.$p.readsArgumentsLenAs) {
          vlog('This is the `arguments.length` alias (B)');
          argslen = true;
        } else {
          paramIndex = funcNode.$p.paramNames.indexOf(returnArg.name);
        }
      }

      let arg;
      if (argslen) {
        // This was the `arguments.length` alias inside this function. Inline it with the number of args of the call now :)
        arg = AST.literal(callArgs.length);
      } else if (paramIndex >= 0) {
        // Replace call with the arg in position paramIndex of the call
        // We should not need to clone this since the arg is not reused more then once, and not duplicated in the AST
        arg = callArgs[paramIndex];
      } else if (returnArg.type === 'Identifier' && returnArg.name === oldName) {
        // Replace call with renamed local variable
        arg = AST.identifier(tmpName);
      } else {
        // Replace call with a clone of the return arg
        arg = AST.cloneSimple(returnArg);
      }

      if (ret.type === 'ThrowStatement') {
        read.blockBody.splice(read.blockIndex, 0, AST.throwStatement(arg));
        // The rest will be DCE'd so whatever.
        if (read.grandIndex < 0) read.grandNode[read.grandProp] = AST.identifier('undefined');
        else read.grandNode[read.grandProp][read.grandIndex] = AST.identifier('undefined');
      } else {
        if (read.grandIndex < 0) read.grandNode[read.grandProp] = arg;
        else read.grandNode[read.grandProp][read.grandIndex] = arg;
      }

      // Make sure to do this second. If the function ended with a throw, this newNode should precede it
      // Also make sure to retain tdz crash semantics; outline args as statements.
      read.blockBody.splice(read.blockIndex, 0,
        ...callArgs
          .filter(anode => anode.type !== 'FunctionRExpression' && !AST.isPrimitive(anode))
          .map(anode => AST.expressionStatement(AST.cloneSortOfSimple(anode))), // cant be spread, right?
        newNode
      );

      after(read.blockBody[read.blockIndex]);
    },
  ]);
  return true;
}
function processNonVar(stmt, ret, paramArgMapper, read, ri, funcNode, queue) {
  const fail = { de: false };
  const newNode = AST.deepCloneForFuncInlining(stmt, paramArgMapper, fail);
  if (fail.ed) {
    vlog('  - Node contained a write to a param. Bailing');
    return false;
  }

  queue.push([
    +read.node.$p.pid,
    () => {
      rule('Simple function with only an expression can be inlined');
      example('function f(x){ g(); return x; } f(); f();', 'g(); g();');
      before(read.blockBody[read.blockIndex], funcNode);

      const callNode = read.parentNode;
      const callArgs = callNode['arguments'];

      let paramIndex = -1;
      let argslen = false;
      const returnArg = ret.argument;
      if (returnArg.type === 'Identifier') {
        if (returnArg.name === funcNode.$p.readsArgumentsLenAs) {
          vlog('This is the `arguments.length` alias (C)');
          argslen = true;
        } else {
          paramIndex = funcNode.$p.paramNames.indexOf(returnArg.name);
        }
      }

      let arg;
      if (argslen) {
        // This was the `arguments.length` alias inside this function. Inline it with the number of args of the call now :)
        arg = AST.literal(callArgs.length);
      } else if (paramIndex >= 0) {
        // Replace call with the arg in position paramIndex of the call
        // We should not need to clone this since the arg is not reused more then once, and not duplicated in the AST
        arg = callArgs[paramIndex];
      } else {
        // Replace call with a clone of the return arg
        arg = AST.cloneSimple(returnArg);
      }

      if (ret.type === 'ThrowStatement') {
        read.blockBody.splice(read.blockIndex, 0, AST.throwStatement(arg));
        // The rest will be DCE'd so whatever.
        if (read.grandIndex < 0) read.grandNode[read.grandProp] = AST.identifier('undefined');
        else read.grandNode[read.grandProp][read.grandIndex] = AST.identifier('undefined');
      } else {
        if (read.grandIndex < 0) read.grandNode[read.grandProp] = arg;
        else read.grandNode[read.grandProp][read.grandIndex] = arg;
      }

      // Make sure to do this second. If the function ended with a throw, this newNode should precede it
      // Also make sure to retain tdz crash semantics; outline args as statements.
      read.blockBody.splice(read.blockIndex, 0,
        ...callArgs
          .filter(anode => anode.type !== 'FunctionRExpression' && !AST.isPrimitive(anode))
          .map(anode => AST.expressionStatement(AST.cloneSortOfSimple(anode))), // cant be spread, right?
        newNode
      );

      after(read.blockBody[read.blockIndex]);
    },
  ]);
  return true;
}
