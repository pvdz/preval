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
  findBodyOffset, todo, currentState,
} from '../utils.mjs';
import * as AST from '../ast.mjs';
import { SYMBOL_COERCE, SYMBOL_DOTCALL, SYMBOL_FRFR } from '../symbols_preval.mjs';
import { BUILTIN_SYMBOLS } from '../symbols_builtins.mjs';

export function returnsParam(fdata) {
  group('\n\n\n[returnsParam] Checking for functions that return a static mutation of an arg');
  // currentState(fdata, 'returnsParam', true, fdata);
  const r = _returnsParam(fdata);
  groupEnd();
  return r;
}
function _returnsParam(fdata) {
  // phase1 will already determine the common primitive return value for each function
  // All we have to do here is find all calls to functions that still have a commonReturn set and inline those.

  let changes = 0;
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
    // TODO: we can do a partial transform if the func escapes by cloning the function, but we probably don't want that..?
    // TODO: alternatively, we could abstract the rest of the function to a fresh function etc. similarly bad.

    // Find the pattern...
    // Find the return value. Check whether it is directly related to a param. Check whether the
    // actual returned value can be determined without additional knowledge specific to that function.
    // If both holds then we can replace all calls to this function by moving the call to a previous
    // statement and replacing the expression with the returned value.
    // Note: this does inflate op count, but I think deflating functions is ultimately better for preval's own analysis

    if (!funcNode.$p.commonReturn) return vlog('- bail: no common return');
    if (funcNode.$p.commonReturn.type !== 'Identifier') return vlog('- bail: common return is not an ident');
    if (funcNode.params.some(pnode => pnode.rest)) return vlog('- bail: at least one param was rest');

    // It doesn't necessarily matter whether this ident is used in multiple exit points but in practice
    // it'll most likely be just one. Look up the decl of the return value and confirm whether or not
    // it's a derivative of one of the params.
    // - It should be a constant
    // - Its init should consist of primitives and param idents
    // - (We can work with a subset of closure cases but that's a TODO for later...?)

    const returnedName = funcNode.$p.commonReturn.name;
    const returnMeta = fdata.globallyUniqueNamingRegistry.get(returnedName);
    if (!returnMeta.isConstant) return vlog('- bail: the identifier returned is not a constant');

    const firstRead = returnMeta.reads[0];
    ASSERT(firstRead, 'since the ident is being returned, there must be at least one read...');

    // Ok we have a func that has one return and it returns a const and is the exact pattern `const x = <expr>; return x;`

    const write = returnMeta.writes[0];
    ASSERT(write);

    const paramNames = funcNode.$p.paramNames;

    let returnsParam = false;
    let eliminateReturnDecl = false;
    vlog('- commonReturn name is', returnedName, ', is that a param name?', paramNames.includes(returnedName));
    if (paramNames.includes(returnedName)) {
      // This is the simpler transform
      returnsParam = returnedName;
    }
    // else, the init must be primitive/builtin, or the binding must only be used as returns. we cant guarantee safety in other cases.
    else if (AST.isPrimitive(returnMeta.varDeclRef.node)) {
      // cannot spy so this is fine either way. we can keep it and something else will eliminate it if eligible.
    }
    else if (returnMeta.reads.every(read => read.parentNode.type === 'ReturnStatement')) {
      // only returns use this var so we can eliminate the decl after this transform, init irrelevant but we can't keep it
      eliminateReturnDecl = true;
    }
    else {
      return vlog('- bail: returned var is used in non-return places and the init is not a primitive');
    }

    if (funcMeta.reads.some((read) => {
      if (read.parentNode.type !== 'CallExpression') {
        vlog('- bail: parent not a call:', read.parentNode.type);
        return true; // bad
      }
      // This transform only targets function calls so this cache can only get busted if the init was a func call that
      // was also outlined in the same phase loop. That's fine. Just skip it and the next iteration will get it, eventually.
      if (read.blockBody[read.blockIndex].type === 'BlockStatement') {
        // - `function g() { const y = h(); return y; } function f() { const x = g(); return x; }`
        vlog('- bail: the index cache was busted, that must mean this init was outlined by this transform and we havent gone through phase1 again, yet');
        return true;
      }
      if (read.parentProp === 'callee') return false; // ok
      if (
        read.parentNode.callee.type === 'Identifier' &&
        read.parentNode.callee.name === SYMBOL_DOTCALL &&
        read.parentNode.arguments[0] === read.node // is the function being dotcalled here? that's fine, that's not escaping
      ) return false; // ok
      vlog('- bail: parent:', read.parentNode, ', prop:', read.parentProp);
      return true; // used in a way that is escaping, oops.
    })) {
      // TODO: we could allow property lookups as long as it's not a method call... but that's already a bit of an edge case.
      // We need to remove something from the function so we cannot safely do this because it may be observed.
      return vlog('- bail: this function "escapes" so we cannot safely apply this rule');
    }

    function isNodeOk(node) {
      if (AST.isPrimitive(node)) return true;
      if (node.type !== 'Identifier') return false;
      if ([SYMBOL_DOTCALL, SYMBOL_FRFR, SYMBOL_COERCE].includes(node.name)) return true; // special builtins
      if (paramNames.includes(node.name)) return true;
      if (BUILTIN_SYMBOLS.has(node.name)) return true;
      // TODO: globals, outer locals. but tdz wise, we must assert that they were defined before this call...
      return false;
    }

    // No need to confirm the init when its a param :)
    const init = write.parentNode.init;
    if (!returnsParam) {
      // Now confirm whether one or more params were used in the init of the var decl that gets returned
      // This needs to be done per type of expression. And we'll need to repeat most of the logic to support multiple params (in binary, call, etc)
      // TODO: next step: the returned expression can use _one_ identifier that is local to the function. the transformed init can use the return value of the function in its place. that should work, too.
      switch (init.type) {
        case 'UnaryExpression': {
          if (!isNodeOk(init.argument)) return vlog('- bail: unary arg is not ok');
          break;
        }
        case 'BinaryExpression': {
          if (!isNodeOk(init.left)) return vlog('- bail: left arg is not ok');
          if (!isNodeOk(init.right)) return vlog('- bail: right arg is not ok');
          break;
        }
        case 'CallExpression': {
          // TODO: we can improve this a little bit by also mapping closures and other params.
          ASSERT(init.callee.type === 'Identifier', 'normalized to ident calls', init);
          if (!isNodeOk(init.callee)) return vlog('- bail: callee is not ok', init.callee.type, init.callee.name);
          // This will also do context checks for dotcall, since that's just an argument too
          // TODO: we can assert $frfr will call a global func
          if (!init.arguments.every(anode => isNodeOk(anode))) return vlog('- bail: at least one arg was not ok');
          break;
        }
        case 'Identifier': {
          // TODO: we can improve this a little bit by also mapping closures and other params.
          if (!isNodeOk(init)) return vlog('ident was not ok');
          break;
        }
        case 'MemberExpression': {
          if (!isNodeOk(init.object)) return vlog('object was not ok');
          if (init.computed && !isNodeOk(init.property)) return vlog('computed prop was not ok');
          break;
        }
        case 'ArrayExpression': {
          if (init.elements.some(enode => enode && !isNodeOk(enode))) return vlog('- bail: at least one array element was not ok');
          break;
        }
        default: {
          if (AST.isPrimitive(init)) {} // ok
          else {
            // :shrug: There's probably a few more cases we can trivially trap here...
            if (!['FunctionExpression'].includes(init.type)) {
              todo(`return_param on ${init.type}; should try to cover this expression too`);
            }
            return vlog('- bail: unsupported expression type;', init.type);
          }
        }
      }
    }

    vlog('- ok, ident that is being returned is not using local vars');

    vgroup('Checking calls for spreads...');
    const allok = funcMeta.reads.every((callRead, ri) => {
      return !callRead.parentNode.arguments.some(anode => anode.type === 'SpreadElement');
    });
    vgroupEnd();
    if (!allok) return vlog('- bail: at least one call had a spread');


    // We verified the function, the returned value, the params, the call args... I think we should be good to go?

    if (returnsParam) {
      rule('If a function returns a param and we control all calls then we can outline that param');
      example('function f(a) { ...; return a; } const x = f(y);', 'function f(a) { ...; return undefined; } f(y); const x = y;');
    } else {
      rule('If the returned value of a func uses no local vars and we know all call sites then we can outline that return value; process call');
      example(
        'function f(x){ ...; const tmp = x + 5; return x; } f(100); const a = f(200); a = f(300);',
        'function f(x){ ...; return undefined; } f(100); x + 5; f(200); const a = 200 + 5; f(300); a = 300 + 5;'
      );
    }
    before(funcNode);

    funcMeta.reads.forEach((callRead, ri) => {
      vgroup('-', ri, ':', callRead.parentNode.type, callRead.parentProp);
      transformCall(funcNode, callRead, init, returnsParam);
      vgroupEnd();
    });


    if (eliminateReturnDecl) {
      // Clear the init. Will squash afterwards. Don't clear the param init.
      if (!returnsParam) {
        write.blockBody[write.blockIndex] = AST.blockStatement(); // Empty. Marks it as replaced. We squash it afterwards.
        queue.push({
          index: write.blockIndex,
          func: () => {
            ASSERT(write.blockBody[write.blockIndex].type === 'BlockStatement', 'right? gets dicy when this doesnt hold because then cache is stale');
            write.blockBody.splice(write.blockIndex, 1, ...write.blockBody[write.blockIndex].body);
          }}
        );
      }
    }

    // We must replace all return args with undefined, not just one. I think we don't have to queue this.
    returnMeta.reads.forEach(read => {
      if (read.parentNode.type === 'ReturnStatement') {
        read.parentNode.argument = AST.undef();
      }
    });

    after(funcNode);
    changes = changes + 1;

    function transformCall(funcNode, callRead, returnedInit, returnsParam) {

      // Given the read of a function that should be a call to it, and the init that is returned
      // by the function and which should only use params, primitives, or builtins, transform the
      // init by using the arguments such that the return value is equal.

      const callNode = callRead.parentNode;
      ASSERT(callNode.type === 'CallExpression');
      const paramNames = funcNode.$p.paramNames;
      const args = callNode.arguments.slice(callNode.callee.name === SYMBOL_DOTCALL ? 3 : 0);
      function cloneArgIfParamElseCloneNode(node) {
        if (node.type === 'Identifier') {
          const at = paramNames.indexOf(node.name);
          if (at >= 0) {
            return AST.cloneSimple(args[at]);
          }
        }
        return AST.cloneSimple(node);
      }

      // For each param reference in the init, find the param index and map it to the argument index.
      // The args should be simple at this point because code is normalized, so we can clone them safely.

      // `function f(a,b,c) { ...; const tmp = a+b; return tmp; } const x = f(a,b,c);` -> `f(a, b, c); const x = b + c;`
      // The returnInit represents `a+b` and the callRead is `f(a,b,c)`
      // This can get a bit tricky with multiple cached transforms though...

      // Note: the init was already validated so we can assume stuff here.
      let transformedInit;
      if (returnsParam) {
        vlog('ok wtf shouldnt this work?', [returnedName], cloneArgIfParamElseCloneNode(AST.identifier(returnedName)))
        transformedInit = cloneArgIfParamElseCloneNode(AST.identifier(returnedName)); // lazy tsktsk
      } else {
        switch (returnedInit.type) {
          case 'UnaryExpression': {
            transformedInit = AST.unaryExpression(returnedInit.operator, cloneArgIfParamElseCloneNode(returnedInit.argument));
            break;
          }
          case 'BinaryExpression': {
            transformedInit = AST.binaryExpression(returnedInit.operator, cloneArgIfParamElseCloneNode(returnedInit.left), cloneArgIfParamElseCloneNode(returnedInit.right));
            break;
          }
          case 'CallExpression': {
            transformedInit = AST.callExpression(cloneArgIfParamElseCloneNode(returnedInit.callee), returnedInit.arguments.map(anode => cloneArgIfParamElseCloneNode(anode)));
            break;
          }
          case 'Identifier': {
            transformedInit = cloneArgIfParamElseCloneNode(returnedInit);
            break;
          }
          case 'MemberExpression': {
            transformedInit = AST.memberExpression(cloneArgIfParamElseCloneNode(returnedInit.object), cloneArgIfParamElseCloneNode(returnedInit.property), returnedInit.computed);
            break;
          }
          case 'ArrayExpression': {
            transformedInit = AST.arrayExpression(
              returnedInit.elements.map(enode => enode && cloneArgIfParamElseCloneNode(enode))
            );
            break;
          }
          default: {
            if (AST.isPrimitive(returnedInit)) {
              transformedInit = cloneArgIfParamElseCloneNode(returnedInit);
            }
            else {
              ASSERT(false, 'unreachable; earlier check should cover this', returnedInit);
            }
          }
        }
      }

      // Transformed init should be ready to go. Now transform the call.
      // There are three cases: var decl, assign, or expr.

      const stmt = callRead.blockBody[callRead.blockIndex];

      rule('Outline the return value for one call');
      example('const x = f(100);', 'f(100); const x = 100 + 5;');
      example('x = f(100);', 'f(100); x = 100 + 5;');
      example('f(100);', 'f(100); 100 + 5;');
      before(stmt);

      if (stmt.type === 'VarStatement') {
        // `var x = f();` -> `{ f(); var x = init; }`  // note: we squash the block later
        callRead.blockBody[callRead.blockIndex] = AST.blockStatement(
          AST.expressionStatement(stmt.init), // Keep original call as is. Ignore the return value.
          AST.varStatement(stmt.kind, stmt.id, transformedInit),
        );
      }
      else if (stmt.type === 'ExpressionStatement') {
        if (stmt.expression.type === 'AssignmentExpression') {
          // `x = f();` -> `{ f(); x = init; }`     // note: we squash the block later
          callRead.blockBody[callRead.blockIndex] = AST.blockStatement(
            // Note: dont put left first; that tdz would not trigger until after the (original) func call.
            AST.expressionStatement(stmt.expression.right), // Keep original call as is. Ignore the return value.
            AST.expressionStatement(AST.assignmentExpression(stmt.expression.left, transformedInit)),
          );
        }
        else if (stmt.expression.type === 'CallExpression') {
          // `f();` -> `{ f(); init; }`     // note: we squash the block later
          callRead.blockBody[callRead.blockIndex] = AST.blockStatement(
            stmt, // Keep original as is.
            AST.expressionStatement(transformedInit),
          );

        }
        else ASSERT(false, 'unreachable');
      }
      else ASSERT(false, 'unreachable');

      after(callRead.blockBody[callRead.blockIndex]);

      // Ok, callRead is updated. Queue the squash.

      queue.push({
        index: callRead.blockIndex,
        func: () => {
          ASSERT(callRead.blockBody[callRead.blockIndex].type === 'BlockStatement', 'right? gets dicy when this doesnt hold because then cache is stale');
          callRead.blockBody.splice(callRead.blockIndex, 1, ...callRead.blockBody[callRead.blockIndex].body);
        }}
      );

      vlog('Should be able to outline the tail param usage and replace it with the arg');
    }
  }

  if (changes) {
    queue.sort(({ index: a }, { index: b }) => b - a);
    vgroup('Unwinding', queue.length, 'callbacks');
    queue.forEach(({ func }) => {
      vlog('-- next');
      func();
    });
    vgroupEnd();

    log('Changed return values:', changes, '. Restarting from phase1 to fix up read/write registry');
    return {what: 'returnsParam', changes, next: 'phase1'};
  }

  log('Changed return values: 0');
}
