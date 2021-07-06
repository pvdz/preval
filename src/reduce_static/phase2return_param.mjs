// Find functions that return a direct derivative of its param (and don't escape). Outline the param.
//    `function f(a) { const x = a + 1; return x; } $(f(y));'
// -> 'function f(a) { const x = a + 1; return x; } f(); $(y + 1);
// TODO: also do the case where the last statement is just using the param but it's result is not returned

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

export function returnsParam(fdata) {
  group('\n\n\nChecking for functions that return a static mutation of an arg');
  //vlog('\nCurrent state\n--------------\n' + fmat(tmat(fdata.tenkoOutput.ast)) + '\n--------------\n');
  const r = _returnsParam(fdata);
  groupEnd();
  return r;
}
function _returnsParam(fdata) {
  // phase1 will already determine the common primitive return value for each function
  // All we have to do here is find all calls to functions that still have a commonReturn set and inline those.

  let queue = [];
  fdata.globallyUniqueNamingRegistry.forEach(function (funcMeta, name) {
    if (funcMeta.isBuiltin) return; // We can probably do it for some of these cases? But let's do that in another step
    if (funcMeta.isImplicitGlobal) return;
    if (!funcMeta.isConstant) return;

    const funcNode = funcMeta.constValueRef.node;
    if (funcNode.type !== 'FunctionExpression') return;

    vgroup('- `' + funcMeta.uniqueName + '`, writes:', funcMeta.writes.length, ', reads:', funcMeta.reads.length);
    processFunc(funcNode, funcMeta);
    vgroupEnd();
  });
  function processFunc(funcNode, funcMeta) {
    // Make sure the function doesn't "escape", since we need to be able to transform all calls to it.
    // TODO: we can do a partial transform by cloning the function but we probably don't want that..?
    // TODO: alternatively, we could abstract the rest of the function to a fresh function etc. Meh?

    // Find the pattern...
    // Find the return value. Check whether it is directly related to a param. Check whether the
    // actual returned value can be determined without additional knowledge specific to that function.
    // If both holds then we can replace all calls to this function by moving the call to a previous
    // statement and replacing the expression with the returned value.
    // Note: this does inflate op count, but I think this will be okay?

    if (!funcNode.$p.commonReturn) {
      vlog('- No common return');
      return;
    }
    if (funcNode.$p.commonReturn.type !== 'Identifier') {
      vlog('- Common return is not an ident');
      return;
    }

    // It doesn't necessarily matter whether this ident is used in multiple exit points but in practice
    // it'll most likely be just one. Look up the decl of the return value and confirm whether or not
    // it's a derivative of one of the params.

    const returnMeta = fdata.globallyUniqueNamingRegistry.get(funcNode.$p.commonReturn.name);
    if (returnMeta.isBuiltin) {
      // we can outline this but another rule should already do this I think
      vlog('- Returns a builtin.');
      return;
    }
    if (returnMeta.isImplicitGlobal) {
      // TODO: I think we can outline this as well but globals may be observable so I'm not sure if it'd be safe
      vlog('- Returned value is an implicit global');
      return;
    }
    if (!returnMeta.isConstant) {
      vlog('- Returned value is not a constant');
      return;
    }

    if (returnMeta.reads.length > 1) {
      if (returnMeta.reads.some((read) => read.parentNode.type !== 'ReturnStatement')) {
        vlog('- The returned ident was also read outside of returns. Bailing.');
        return;
      }
    }

    const varDeclWrite = returnMeta.writes.find((write) => write.kind === 'var');
    if (!varDeclWrite) {
      // TODO: not sure when this can happen. Should assert it but for not let's just let it slide...
      vlog('- Returned ident had no var decl');
      return;
    }

    if (funcMeta.reads.some((read) => read.parentNode.type !== 'CallExpression' || read.parentProp !== 'callee')) {
      // TODO: we could allow property lookups as long as it's not a method call... but that's already a bit of an edge case.
      // We need to remove something from the function so we cannot safely do this.
      vlog('This function "escapes" so we cannot safely apply this rule');
      return;
    }

    let param;
    let expr;

    // Now confirm whether a param was used in the init of this var decl that gets returned
    // I guess we want to limit the kinds of things that are possible here, for now...
    const init = varDeclWrite.parentNode.init;
    switch (init.type) {
      case 'UnaryExpression': {
        if (init.argument.type === 'Identifier' && funcNode.$p.paramNames.includes(init.argument.name)) {
          vlog('We can outline this unary expression on a param!');
          param = funcNode.params.find((pnode) => pnode.$p.paramVarDeclRef.name === init.argument.name);
          ASSERT(param, 'should not get here otherwise', init.argument.name, funcNode.params);
          expr = init;
        }
        break;
      }
      case 'BinaryExpression': {
        const left = init.left;
        const right = init.right;
        if (left.type === 'Identifier' && funcNode.$p.paramNames.includes(left.name)) {
          if (AST.isPrimitive(right)) {
            vlog('We can outline this! left');
            param = funcNode.params.find((pnode) => pnode.$p.paramVarDeclRef.name === left.name);
            ASSERT(param, 'should not get here otherwise', left.name, funcNode.params);
            expr = init;
          }
        } else if (right.type === 'Identifier' && funcNode.$p.paramNames.includes(right.name)) {
          if (AST.isPrimitive(left)) {
            vlog('We can outline this! right');
            param = funcNode.params.find((pnode) => pnode.$p.paramVarDeclRef.name === right.name);
            ASSERT(param, 'should not get here otherwise', right.name, funcNode.params);
            expr = init;
          }
        }
        break;
      }
      case 'CallExpression': {
        // TODO: we can improve this a little bit by also mapping closures and other params.
        if (init.callee.type === 'Identifier' && funcNode.$p.paramNames.includes(init.callee.name)) {
          // Regular call.
          if (init['arguments'].every((anode) => AST.isPrimitive(anode))) {
            vlog('May be able to outline this call');
            param = funcNode.params.find((pnode) => pnode.$p.paramVarDeclRef.name === init.callee.name);
            ASSERT(param, 'should not get here otherwise', init.callee.name, funcNode.params);
            expr = init;
          }
        } else if (init.callee.type === 'MemberExpression' && funcNode.$p.paramNames.includes(init.callee.object.name)) {
          // Method call. Why not.
          if (init['arguments'].every((anode) => AST.isPrimitive(anode))) {
            vlog('May be able to outline this call');
            param = funcNode.params.find((pnode) => pnode.$p.paramVarDeclRef.name === init.callee.object.name);
            ASSERT(param, 'should not get here otherwise', init.callee.object, funcNode.params);
            expr = init;
          }
        }
        break;
      }
      case 'Identifier': {
        // TODO: we can improve this a little bit by also mapping closures and other params.
        // `const x = y; return x;` Odd case but this can happen as an artifact of phase2.
        if (funcNode.$p.paramNames.includes(init.name)) {
          vlog('This is just returning a param.');
          param = funcNode.params.find((pnode) => pnode.$p.paramVarDeclRef.name === init.name);
          ASSERT(param, 'should not get here otherwise', init.name, funcNode.params);
          expr = init;
        }
        break;
      }
      case 'MemberExpression': {
        if (funcNode.$p.paramNames.includes(init.object.name)) {
          vlog('Returning the property of a param');
          param = funcNode.params.find((pnode) => pnode.$p.paramVarDeclRef.name === init.object.name);
          ASSERT(param, 'should not get here otherwise', init.object.name, funcNode.params);
          expr = init;
        }
        break;
      }
      default: {
        // :shrug: There's probably a few more cases we can trivially trap here...
      }
    }
    if (!param) {
      vlog('- Returned value could not be determined as a static param expression. Bailing');
      return;
    }

    ASSERT(expr, 'if param then expr');

    // Verify that the call had no spread before or on the target param index
    let ok = true;
    funcNode.params.some((pnode, pi) => {
      if (pnode.rest) {
        vlog('Function had a rest at index', pi, 'but target param is at index', param.index, 'so must bail');
        ok = false;
        return true;
      }
      if (pi >= param.index) {
        // Don't care about spreads that appear later than the target param...
        return true;
      }
    });
    if (!ok) return false;

    const funcQueue = [];
    vgroup('Walking all reads for this func...');
    funcMeta.reads.some((callRead, ri) => {
      vgroup('-', ri, ':', callRead.parentNode.type, callRead.parentProp);
      const r = one(callRead, funcQueue, param, expr);
      vgroupEnd();
      return !r;
    });
    vgroupEnd();

    if (funcQueue.length !== funcMeta.reads.length) {
      vlog('Was not able to convert all reads so cannot convert any read.');
    } else {
      vlog('Was able to convert all reads. Adding them to the queue now.');
      queue.push(...funcQueue);
      returnMeta.reads.forEach((read) => {
        ASSERT(read.parentNode.type === 'ReturnStatement', 'asserted before', read);
        queue.push({
          pid: read.blockIndex,
          func: () => {
            read.parentNode.argument = AST.identifier('undefined');
          },
        });
      });
      queue.push({
        pid: varDeclWrite.blockIndex,
        func: () => {
          varDeclWrite.blockBody[varDeclWrite.blockIndex] = AST.emptyStatement();
        },
      });
    }

    function one(callRead, funcQueue, param, expr) {
      const paramIndex = param.index;

      const callNode = callRead.parentNode; // Calling the function that is returning the param
      ASSERT(callNode.type === 'CallExpression', 'should not get here otherwise');

      // Verify that the call had no spread before or on the target param index
      let ok = true;
      callNode['arguments'].some((anode, ai) => {
        if (anode.type === 'SpreadElement') {
          vlog('Call had a spread at index', ai, 'but target param is at index', paramIndex, 'so must bail');
          ok = false;
          return true;
        }
        if (ai >= paramIndex) {
          // Don't care about spreads that appear later than the target param...
          return true;
        }
      });
      if (!ok) return false;

      const matchingArgNodeClone = AST.cloneSimple(callNode['arguments'][paramIndex]);

      let clone;
      if (expr.type === 'UnaryExpression') {
        clone = AST.unaryExpression(expr.operator, matchingArgNodeClone);
      } else if (expr.type === 'BinaryExpression') {
        ASSERT((expr.left.type === 'Identifier') ^ (expr.right.type === 'Identifier'), 'either must be ident but not both', expr);
        if (expr.left.type === 'Identifier') {
          clone = AST.binaryExpression(expr.operator, matchingArgNodeClone, AST.cloneSimple(expr.right));
        } else {
          clone = AST.binaryExpression(expr.operator, AST.cloneSimple(expr.left), matchingArgNodeClone);
        }
      } else if (expr.type === 'Identifier') {
        clone = matchingArgNodeClone;
      } else if (expr.type === 'CallExpression') {
        if (expr.callee.type === 'Identifier') {
          clone = AST.callExpression(
            matchingArgNodeClone,
            expr['arguments'].map((anode) => AST.cloneSimple(anode)),
          );
        } else if (expr.callee.type === 'MemberExpression') {
          clone = AST.callExpression(
            AST.memberExpression(matchingArgNodeClone, AST.cloneSimple(expr.callee.property), expr.callee.computed),
            expr['arguments'].map((anode) => AST.cloneSimple(anode)),
          );
        } else {
          ASSERT(false);
        }
      } else if (expr.type === 'MemberExpression') {
        clone = AST.memberExpression(matchingArgNodeClone, AST.cloneSimple(expr.property), expr.computed);
      } else {
        ASSERT(false);
      }

      vlog('Should be able to outline the tail param usage and replace it with the arg');

      funcQueue.push({
        pid: callRead.blockIndex,
        func: () => {
          // Note: all we have to do is change the call. If this causes the return value of the function to
          // never be used, then another rule will eliminate it. If that causes the param not to be used,
          // then yet another rule will eliminate it.

          rule('If a function returns a static operation on a parameter, it should outline this operation');
          example('function f(a) { const x = a + 1; return x; } $(f(y));', 'function f(a) { const x = a + 1; return x; } f(); $(y + 1);');
          before(varDeclWrite.blockBody[varDeclWrite.blockIndex], funcNode);
          before(callRead.blockBody[callRead.blockIndex], varDeclWrite.blockBody[returnMeta.blockIndex]);

          if (callRead.grandIndex < 0) callRead.grandNode[callRead.grandProp] = clone;
          else callRead.grandNode[callRead.grandProp][callRead.grandIndex] = clone;
          callRead.blockBody.splice(callRead.blockIndex, 0, AST.expressionStatement(callRead.parentNode));

          after(callRead.blockBody[callRead.blockIndex]);
          after(callRead.blockBody[callRead.blockIndex + 1]);
        },
      });

      return true;
    }
  }

  if (queue.length) {
    queue.sort(({ pid: a }, { pid: b }) => (a < b ? 1 : a > b ? -1 : 0));
    vgroup('Unwinding', queue.length, 'callbacks');
    queue.forEach(({ func }) => {
      vlog('-- next');
      func();
    });
    vgroupEnd();

    log('Changed return values:', queue.length, '. Restarting from phase1 to fix up read/write registry');
    return 'phase1';
  }

  log('Changed return values: 0');
}
