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
import { SYMBOL_DOTCALL } from '../symbols_preval.mjs';

export function returnsParam(fdata) {
  group('\n\n\n[returnsParam] Checking for functions that return a static mutation of an arg');
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

    const funcNode = funcMeta.varDeclRef.node;
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
    else if (returnMeta.isImplicitGlobal) {
      // TODO: I think we can outline this as well but globals may be observable so I'm not sure if it'd be safe
      vlog('- Returned value is an implicit global');
      return;
    }
    else if (!returnMeta.isConstant) {
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
      // TODO: not sure when this can happen. Should assert it but for now let's just let it slide...
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
        ASSERT(init.callee.type === 'Identifier', 'normalized to ident calls', init);
        const funcName = init.callee.name;

        if (funcName === SYMBOL_DOTCALL) {
          // Is this dotcalling a func with the context a param?
          const funcName = init.arguments[0].name;
          const ctxNode = init.arguments[1];
          const args = init.arguments.slice(3);
          if (args.every((anode) => AST.isPrimitive(anode))) {
            // Less likely but the dotcall callee could also be a param (maybe due to transforms or simple a contrived example)
            const calleeIsParam = init.arguments[0].type === 'Identifier' && funcNode.$p.paramNames.includes(funcName);
            const contextIsParam = init.arguments[1].type === 'Identifier' && funcNode.$p.paramNames.includes(init.arguments[1].name);

            // Do not outline if context or callee is a local var or something.
            if ((calleeIsParam || AST.isPrimitive(init.arguments[0])) && (contextIsParam || AST.isPrimitive(init.arguments[1]))) {
              // `function f(a) { return a.toString(); }`
              // `function f(a) { return $dotCall(a, x, undefined); }`
              // `function f(a, b) { return $dotCall(a, b, undefined); }` (like a function apply abstraction)
              vlog('May be able to outline this dotcall; callee and/or context are params');
              // Doesn't matter. Both have to be checked below.
              param = 'ignored_because_both_must_be_resolved';
              expr = init;
            }
            else {
              // `function f(a) { return $dotCall(x, a, undefined); }`
            }
          }
        } else {
          // Is this directly calling a param?
          if (funcNode.$p.paramNames.includes(funcName) && init['arguments'].every((anode) => AST.isPrimitive(anode))) {
            // `function f(a){ return a(); } f(g)`
            vlog('May be able to outline this ident call');
            param = funcNode.params.find((pnode) => pnode.$p.paramVarDeclRef.name === funcName);
            ASSERT(param, 'should not get here otherwise', funcName, funcNode.params);
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
      //TODO // if there are multiple calls, we must do them all or none...

      // This is the actual value being passed on to the param that's being outlined.
      // Eg. `function f(x) { return x(); } f(g)` then the clone would be a clone of the ident node `g`
      const matchingArgNodeClone = AST.cloneSimple(callNode['arguments'][paramIndex]);

      let clone;
      if (expr.type === 'UnaryExpression') {
        clone = AST.unaryExpression(expr.operator, matchingArgNodeClone);
      }
      else if (expr.type === 'BinaryExpression') {
        ASSERT((expr.left.type === 'Identifier' && !AST.isPrimitive(expr.left)) ^ (expr.right.type === 'Identifier' && !AST.isPrimitive(expr.right)), 'either must be ident but not both', expr);
        if (expr.left.type === 'Identifier') {
          clone = AST.binaryExpression(expr.operator, matchingArgNodeClone, AST.cloneSimple(expr.right));
        } else {
          clone = AST.binaryExpression(expr.operator, AST.cloneSimple(expr.left), matchingArgNodeClone);
        }
      }
      else if (expr.type === 'Identifier') {
        clone = matchingArgNodeClone;
      }
      else if (expr.type === 'CallExpression') {
        ASSERT(expr.callee.type === 'Identifier');
        // Note: we have to be careful with dotcall as we have to check both the callee and the context separately

        // `expr` is the call that is at the end of the function, the expression we're trying to move out
        clone = AST.cloneSortOfSimple(expr); // Normalized call is sort-of-simple

        const callName = expr.callee.name;
        if (callName === SYMBOL_DOTCALL) {
          ASSERT(typeof param === 'string', 'the param for dotcall must be resolved per callee/context'); // see above
          // The callee (arg 0) might be a param, or the context (arg 1) might be a param, or both
          // Note: `expr` is the func call inside the function that we are trying to move. callNode is the call to the function
          //       from which expr is being moved out. We need to check (again) whether the callee/context is a param.
          const calleeParam =
            expr.arguments[0].type === 'Identifier' &&
            funcNode.params.find((pnode) => pnode.$p.paramVarDeclRef.name === expr.arguments[0].name);
          if (calleeParam) {
            clone.arguments[0] = AST.cloneSimple(callNode['arguments'][calleeParam.index]);
          }
          const contextParam =
            expr.arguments[1].type === 'Identifier' &&
            funcNode.params.find((pnode) => pnode.$p.paramVarDeclRef.name === expr.arguments[1].name);
          if (contextParam) {
            clone.arguments[1] = AST.cloneSimple(callNode['arguments'][contextParam.index]);
          }
          ASSERT(calleeParam || contextParam, 'should find at least the callee or context as param');
        } else {
          // The callee is the param
          clone.callee = matchingArgNodeClone;
        }

        // We have to replace the proper node here
        // When we're dotcalling, we replace the context, otherwise the callee
        if (callName === SYMBOL_DOTCALL) {
          clone.arguments[1] = matchingArgNodeClone;
        } else {
        }
      }
      else if (expr.type === 'MemberExpression') {
        clone = AST.memberExpression(matchingArgNodeClone, AST.cloneSimple(expr.property), expr.computed);
      }
      else {
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
          example(
            'function f(a) { const x = a + 1; return x; } $(f(y));',
            'function f(a) { const x = a + 1; return x; } f(); $(y + 1);'
          );
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
    return {what: 'returnsParam', changes: queue.length, next: 'phase1'};
  }

  log('Changed return values: 0');
}
