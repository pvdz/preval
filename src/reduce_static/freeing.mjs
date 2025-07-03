// Find consecutive statements that are "predictable" and merge them into a "free" function.
// Will also check whether existing $free functions are still useful and check whether $frfr calls are redundant.
//
//    while (true) {
//      const x = Math.random();
//      const y = x * 10;
//      const z = String(y);
//      $(z);
//    }
//
//  ->
//
//    const tmp = function $free(){ // -> move to global space regardless of where it came from
//      const x = Math.random();
//      const y = x * 10;
//      const z = String(y);
//      return z;
//    };
//    while (true) {
//      const z = $frfr(tmp);
//      $(z);
//    }
//
// In this context, a "predictable" is a statement that consists of built-ins and variables known to have no side effects.
// Any result from $frfr should be considered to be predictable and in fact, consecutive $frfr calls can be merged. Or ought to be.
//
// Another condition for this conversion is that any variable in the statement must be a constant or a let that is not assigned to
// within the statement(s), and the value must not be mutated.
//
// The code wrapped this way is put in a function (expression, as all functions are in normalized code) with a special
// local name "$free". The point here is to be able to skip over this function, treat them as separated, and also to prevent inlining
// them. Any $free function could basically be its own module, independent of the rest of the input code and independent of any other
// $free functions for that matter.
//
// While scanning, we should be able to assume that $free functions have no closure access and have no observable side effects
// as long as the inputs given to it cannot spy either, of course. The onus is on the caller to ensure only safe inputs are used.
//
//
// The general approach is that the code should not be able to know whether or not the $frfr call happened until it attempts
// to evaluate the result of it. No spy triggered, no await/yield/callbacks. Only side effect free "pure" functions. Just like
// 1+1 can not trigger observable side effects, and how !x cannot trigger callbacks because it doesn't coerce.
//

import walk from '../../lib/walk.mjs';
import { ASSERT, log, group, groupEnd, vlog, vgroup, vgroupEnd, fmat, tmat, rule, example, before, source, after, findBodyOffset, todo, clearStdio, currentState } from '../utils.mjs';
import * as AST from '../ast.mjs';
import { BUILTIN_SYMBOLS, MATH, NUMBER, STRING, symbo } from '../symbols_builtins.mjs';
import { createFreshVar, getMeta, GLOBAL_BLOCKCHAIN } from '../bindings.mjs';
import { PRIMITIVE_TYPE_NAMES_PREVAL, setVerboseTracing, VERBOSE_TRACING } from '../constants.mjs';
import { pcodeSupportedBuiltinFuncs, runFreeWithPcode } from '../pcode.mjs';
import { BUILTIN_GLOBAL_FUNC_NAMES } from '../globals.mjs';
import { GLOBAL_PREVAL_SYMBOLS, SYMBOL_COERCE, SYMBOL_DOTCALL } from '../symbols_preval.mjs';

const SUPPORTED_FREE_BUILTINS = new Set([
  symbo('boolean', 'constructor'),
  symbo('boolean', 'toString'),
  symbo('boolean', 'valueOf'),
  symbo('Math', 'E'),
  symbo('Math', 'LN10'),
  symbo('Math', 'LN2'),
  symbo('Math', 'LOG10E'),
  symbo('Math', 'LOG2E'),
  symbo('Math', 'PI'),
  symbo('Math', 'SQRT1_2'),
  symbo('Math', 'SQRT2'),
  symbo('Math', 'abs'),
  symbo('Math', 'acos'),
  symbo('Math', 'acosh'),
  symbo('Math', 'asin'),
  symbo('Math', 'asinh'),
  symbo('Math', 'atan'),
  symbo('Math', 'atan2'),
  symbo('Math', 'atanh'),
  symbo('Math', 'cbrt'),
  symbo('Math', 'ceil'),
  symbo('Math', 'clz32'),
  symbo('Math', 'cos'),
  symbo('Math', 'cosh'),
  symbo('Math', 'exp'),
  symbo('Math', 'expm1'),
  symbo('Math', 'f16round'),
  symbo('Math', 'floor'),
  symbo('Math', 'fround'),
  symbo('Math', 'hypot'),
  symbo('Math', 'imul'),
  symbo('Math', 'log'),
  symbo('Math', 'log10'),
  symbo('Math', 'log1p'),
  symbo('Math', 'log2'),
  symbo('Math', 'max'),
  symbo('Math', 'min'),
  symbo('Math', 'pow'),
  //symbo('Math', 'random'), // Not this one
  symbo('Math', 'round'),
  symbo('Math', 'sign'),
  symbo('Math', 'sin'),
  symbo('Math', 'sinh'),
  symbo('Math', 'sqrt'),
  symbo('Math', 'tan'),
  symbo('Math', 'tanh'),
  symbo('Math', 'trunc'),
  symbo('Number', 'EPSILON'),
  symbo('Number', 'MAX_SAFE_INTEGER'),
  symbo('Number', 'MAX_VALUE'),
  symbo('Number', 'MIN_SAFE_INTEGER'),
  symbo('Number', 'MIN_VALUE'),
  symbo('Number', 'NaN'),
  symbo('Number', 'NEGATIVE_INFINITY'),
  symbo('Number', 'POSITIVE_INFINITY'),
  'isFinite',
  symbo('Number', 'isFinite'),
  symbo('Number', 'isInteger'),
  symbo('Number', 'isNaN'),
  'isNaN',
  symbo('Number', 'isSafeInteger'),
  symbo('Number', 'parseFloat'),
  symbo('Number', 'parseInt'),
  symbo('number', 'constructor'),
  symbo('number', 'toExponential'),
  symbo('number', 'toFixed'),
  symbo('number', 'toLocaleString'),
  symbo('number', 'toPrecision'),
  symbo('number', 'toString'),
  symbo('number', 'valueOf'),
  symbo('String', 'fromCharCode'),
  symbo('String', 'fromCodePoint'),
  symbo('String', 'raw'),
  symbo('string', 'at'),
  symbo('string', 'charAt'),
  symbo('string', 'charCodeAt'),
  symbo('string', 'constructor'),
  symbo('string', 'concat'),
  symbo('string', 'endsWith'),
  symbo('string', 'includes'),
  symbo('string', 'indexOf'),
  symbo('string', 'isWellFormed'),
  symbo('string', 'lastIndexOf'),
  symbo('string', 'localeCompare'),
  symbo('string', 'match'),
  symbo('string', 'matchAll'),
  symbo('string', 'normalize'),
  symbo('string', 'padEnd'),
  symbo('string', 'padStart'),
  symbo('string', 'repeat'),
  symbo('string', 'replace'),
  symbo('string', 'replaceAll'),
  symbo('string', 'search'),
  symbo('string', 'slice'),
  // symbo('string', 'split'), // returns an array
  symbo('string', 'startsWith'),
  symbo('string', 'substring'),
  symbo('string', 'substr'),
  symbo('string', 'toLocaleLowerCase'),
  symbo('string', 'toLocaleUpperCase'),
  symbo('string', 'toLowerCase'),
  symbo('string', 'toString'),
  symbo('string', 'toUpperCase'),
  symbo('string', 'toWellFormed'),
  symbo('string', 'trim'),
  symbo('string', 'trimEnd'),
  symbo('string', 'trimStart'),
  symbo('string', 'valueOf'),
])

export function freeing(fdata, $prng, options) {
  //clearStdio();
  //setVerboseTracing(true);


  const usePrng = !!options.prngSeed;
  group('\n\n\n[freeing] Searching for free statements to collect\n');
  // currentState(fdata, 'freeing', true, fdata);
  const r = _freeing(fdata, $prng, usePrng);
  groupEnd();

  return r;
}
function _freeing(fdata, $prng, usePrng) {
  let changed = 0;

  const funcQueue = [];

  walk(_walker, fdata.tenkoOutput.ast, 'ast');
  function _walker(blockNode, beforeWalk, nodeType, path) {
    if (blockNode.type === 'FunctionExpression' && blockNode.id?.name === '$free') {
      ASSERT(beforeWalk, 'we dont visit these funcs so they dont return');
      return true; // Do not visit $free functions at all
    }
    if (beforeWalk) return;

    if (blockNode.type !== 'BlockStatement' && blockNode.type !== 'Program') return; // Just process blocks
    vgroup('processBlock()');
    const r = processBlock(blockNode, path);
    vgroupEnd();

    return r;
  }

  if (changed) {
    // Inject the functions at the top. They are free functions so it should not matter where they are, as long as they are
    // reachable. Global functions are always reachable :)
    funcQueue.forEach(node => fdata.tenkoOutput.ast.body.unshift(node));

    log('Statements freed:', changed, '. Restarting from normalization');
    return {what: 'freeing', changes: changed, next: 'normal'};
  }

  log('Statements freed: 0.');

  function processBlock(blockNode, path) {
    vlog('Block @', blockNode.$p.npid, blockNode.$p.predictable, 'has', blockNode.body.length, 'statements, parent:', path.nodes[path.nodes.length - 2]?.type);
    if (blockNode.$p.predictable === false) return; // May already have been visited entirely when walking recursively
    if (blockNode.body.length < 2) return; // Not worth it

    let lastStart = 0;
    let index = 0;
    while (index < blockNode.body.length) {
      vlog('- stmt[' + index + '] =', blockNode.body[index].type, blockNode.body[index].init?.type || blockNode.body[index].expression?.type || '');

      const call = AST.isStatementCallingFunc(blockNode.body[index], '$frfr');
      if (call) {
        if (processFrfrCall(blockNode.body, index, call, path)) {
          return true; // skip rest of block
        }
      }

      if (isFreeStatement(blockNode.body[index],  fdata)) {
        vlog('  == stmt[' + index + '] = predictable');
      } else {
        vlog('  == stmt[' + index + '] = NOT predictable');
        for (let i=lastStart; i<index; ++i) {
          const updated = withPredictableStatements(blockNode.body, i, index - 1, fdata, funcQueue, $prng, usePrng);
          if (updated) {
            changed += 1;
            // Do not visit this block any further.
            return true;
          }
        }
        lastStart = index + 1;
      }

      index += 1;
    }
    if (index - lastStart > 2) {
      for (let i=lastStart; i<index; ++i) {
        const updated = withPredictableStatements(blockNode.body, i, index - 1, fdata, funcQueue, $prng, usePrng);
        if (updated) {
          changed += 1;
          // Do not visit this block any further.
          return true;
        }
      }
    }
  }

  function processFrfrCall(block, index, frfrCallNode, path) {
    if (block[index].type === 'ExpressionStatement' && block[index].expression === frfrCallNode) {
      // The $frfr call is a statement. Since $free func calls are not observable, this must mean
      // the statement is moot and we can eliminate it. We should keep the ident args for tdz as usual

      rule('A $frfr as statement is moot and can be eliminated');
      example('$frfr(f, x, y, z);', 'x; y; z;');
      before(block[index]);

      // Ideally we'd make this a sequence though but feh, this should get cleaned up by normalization as well
      block[index].expression = AST.arrayExpression(frfrCallNode.arguments);

      after(block[index]);
      changed += 1;
      return true;
    }

    ASSERT(block[index].type === 'VarStatement' || block[index].expression?.type === 'AssignmentExpression', 'one of three', block[index].type, block[index].expression?.type);

    // Inline a $frfr call when all the args are primitives (first is the target $free func)
    if (frfrCallNode.arguments.every((anode, i) => i === 0 || AST.isPrimitive(anode))) {
      ASSERT(frfrCallNode.arguments?.[0]?.type === 'Identifier', '$frfr is controlled by us and first arg should be the free func ref');
      const freeFuncName = frfrCallNode.arguments[0].name;
      const meta = fdata.globallyUniqueNamingRegistry.get(freeFuncName);
      const freeFuncNode = meta.varDeclRef?.node;
      ASSERT(meta.writes.length === 1 && freeFuncNode && freeFuncNode.id?.name === '$free', 'we created the free func and it should be a constant...', freeFuncNode.id?.name, meta.writes.length);

      // Check if it is using user globals. Those wouldn't become parameters but would block the following rule.
      vgroup('Searching for explicit globals used in the $free func');
      const declared = [];
      const reffed = [];
      for (let i=freeFuncNode.$p.bodyOffset; i<freeFuncNode.body.body.length; ++i) {
        walk(quickIdentScanner, freeFuncNode.body.body[i], 'body');
      }
      function quickIdentScanner(node, beforeWalk, nodeType, path) {
        if (!beforeWalk) return; // only once, on the way up
        // The point is to collect all references, declared and referenced
        return collectFromStatement(node, declared, reffed);
      }
      const inner = new Set(declared.map(node => node.name));
      const hasExplicitGlobal = reffed.some(({name}) => {
        if (inner.has(name)) {
          // Fine
          //vlog('-', [name], 'is a local var');
        } else if (BUILTIN_GLOBAL_FUNC_NAMES.has(name) || GLOBAL_PREVAL_SYMBOLS.has(name)) {
          // Do nothing, it's calling or reading from builtin globals like Math, String, etc
          //vlog('-', [name], 'is a builtin or preval global');
        //} else if (name === 'arguments') {
        //  outer.add(name);
        //  vlog('-', [name], 'is `arguments` and added to the arg list');
        } else {
          const meta = fdata.globallyUniqueNamingRegistry.get(name);
          if (meta.isConstant && meta.varDeclRef.node.$p.blockChain === GLOBAL_BLOCKCHAIN) {
            // This is a global var. No need to pass this in. We can reach it from anywhere.
            vlog('-', [name], 'is an explicit user global');
            return true;
          } else {
            //vlog('-', [name], 'will be added to arg list');
            //outer.add(name);
          }
        }
      });
      vlog('freeing; Has explicit user global?', hasExplicitGlobal);
      vgroupEnd();

      if (!hasExplicitGlobal) {
        vlog('Ok. Now attempt to resolve the $frfr call');

        const outNode = runFreeWithPcode(freeFuncNode, frfrCallNode.arguments.slice(1), fdata, freeFuncName, $prng, usePrng);
        if (outNode) {
          rule('A $frfr that only receives primitives should be inlined so it can get resolved');
          example('const x = $frfr(f, 1, 2, 3);', 'const a = 1; const x = a + 2;');
          before(block[index]);

          if (block[index].type === 'VarStatement') block[index].init = outNode;
          else if (block[index].type === 'ExpressionStatement' && block[index].expression.type === 'AssignmentExpression') block[index].expression.right = outNode;
          else if (block[index].type === 'ExpressionStatement' && block[index].expression.type === 'CallExpression') block[index].expression = outNode;
          else ASSERT(false, 'fiiiixme');

          after(block[index]);
          changed += 1;
          return true;
        } else {
          // ASSERT(false, 'We should be able to resolve the $frfr call but pcode failed to complete with a Node, hasExplicitGlobal=false', outNode);
          todo('We should be able to resolve the $frfr call but pcode failed to complete with a Node, hasExplicitGlobal=false', outNode);
        }
      }
    }

    // If the statement before (or after) a $frfr call is predictable and the result is only
    // used as an arg to the $frfr call then it can be combined with the function being called

    const prev = index > 0 && block[index-1];
    if (
      prev &&
      prev.type === 'VarStatement' &&
      prev.kind === 'const' &&
      frfrCallNode.arguments.some(anode => anode.type === 'Identifier' && anode.name === prev.id.name) &&
      isFreeStatement(prev, fdata)
    ) {
      // Why are we letting unsafe vars through now
      const prevName = prev.id.name;
      // Prev was a const and it's being passed into the $frfr call. Check if it's used anywhere else.
      const meta = fdata.globallyUniqueNamingRegistry.get(prevName);
      if (meta.reads.some(read => read.node.$p.npid > prev.$p.npid || read.node.$p.npid < (block[index+1]?.$p.npid ?? Infinity))) {
        // No ref outside of the const and frfr call. We can combine these.

        vlog('We can merge statement', index, 'with the $frfr call');

        rule('A predictable statement before a $frfr call can be merged');
        const updated = withPredictableStatements(block, index-1, index, fdata, funcQueue, $prng, usePrng);
        if (updated) {
          changed += 1;
          return true;
        }
      }
    }
  }
}

function withPredictableStatements(body, firstIndex, lastIndex, fdata, funcQueue, $prng, usePrng) {
  if (!(lastIndex > firstIndex)) { // Note: inclusive range
    return false;
  }

  vlog('- withRange(', firstIndex, ',', lastIndex, ')');
  // Two+ consecutive predictable statements. We can potentially join these!
  // - Any var decl created cannot be referenced later, except if it is the last statement
  // - If if two statements are calling free functions back to back then maybe we can merge them

  // Now verify whether these names are accessed later (or before in closures ...)
  // Basically, if there's any ref with a pid before or after the region then we must
  // ensure that the variable exists after this step. This means we can only do it when
  // it's the last statement of statements we're packing up right now. Maybe we can
  // improve that heuristic somehow later.
  const firstPid = body[firstIndex].$p.npid;
  const lastPid = lastIndex + 1 >= body.length ? Infinity : body[lastIndex + 1].$p.npid;

  for (let stmtIndex=firstIndex; stmtIndex<=lastIndex; ++stmtIndex) {
    const stmt = body[stmtIndex];
    if (stmt.type === 'VarStatement') {
      const name = stmt.id.name;
      vlog('  - Checking if', [name], 'is used out of range');
      const meta = fdata.globallyUniqueNamingRegistry.get(name);
      for (let refIndex=0; refIndex<meta.rwOrder.length; ++refIndex) {
        const ref = meta.rwOrder[refIndex];
        const pid = ref.node.$p.npid;
        const inRange = pid >= firstPid && pid <= lastPid;
        vlog('    - is', name, '@', ref.node.$p.npid, 'in range?', firstPid, '<', pid, '<', lastPid, '--', inRange);
        // If not then this must be the last statement. Can only proceed if there was at least one statement earlier.
        // We'd have to restart this function with the new bounds if they are different.
        if (!inRange && stmtIndex !== lastIndex) {
          vlog('    - Retrying with smaller range', firstIndex, stmtIndex, 'because', stmtIndex, '!==', lastIndex);
          // The variable was used outside of the given range. We cannot include it.
          // Try again with a smaller range. Note that we reduce the last index, not the first
          // index, because we will cover that later anyways.
          return withPredictableStatements(body, firstIndex, stmtIndex, fdata, funcQueue, $prng, usePrng);
        }
      }
      // If it gets here then the variable name has no references outside of the targeted range. Good!
    }
  }

  // All refs are local to the statements we are about to pack. All statements are predictable.
  // We should be good to go now.
  vlog('Found some statements to wrap in a $free function:', firstIndex, lastIndex, firstPid, lastPid);
  //source(AST.blockStatement(body.slice(firstIndex, lastIndex)), true);


  if (body[lastIndex].type !== 'VarStatement' && !(body[lastIndex].type === 'ExpressionStatement' && body[lastIndex].expression.type === 'AssignmentExpression')) {
    vlog('Last statement was neither a var decl nor an assignment and these statements are not observable so we can drop them?');
    //source(body.slice(firstIndex, lastIndex+1), true);
    return;
  }

  // Now walk the statements again and collect all the vars being declared and all the vars being referenced
  // We need that to determine the params of the new func and then to rename all their references to a unique name

  const declared = [];
  const reffed = [];
  for (let i=firstIndex;i<=lastIndex;++i) {
    walk(identCollectorWalker, body[i], 'ast');
  }
  function identCollectorWalker(node, beforeWalk, nodeType, path) {
    if (!beforeWalk) return; // only once, on the way up
    // The point is to collect all references, declared and referenced
    return collectFromStatement(node, declared, reffed);
  }

  if (VERBOSE_TRACING) {
    vlog('The statements reffed', reffed.map(node => node.name), 'and declared', declared.map(node => node.name));
  }

  vgroup('Now determining arg list of new $frfr call');
  const outer = new Set;
  const inner = new Set(declared.map(node => node.name));
  const userGlobals = new Set;
  reffed.forEach(({name}) => {
    if (inner.has(name)) {
      // Fine
      vlog('-', [name], 'is a local var');
    } else if (BUILTIN_GLOBAL_FUNC_NAMES.has(name) || GLOBAL_PREVAL_SYMBOLS.has(name) || BUILTIN_SYMBOLS.has(name)) {
      // Do nothing, it's calling or reading from builtin globals like Math, String, etc
      vlog('-', [name], 'is a builtin or preval global');
    } else if (name === 'arguments') {
      outer.add(name);
      vlog('-', [name], 'is `arguments` and added to the arg list');
    } else {
      // Only apply the global check to $free functions (we control them). Anything else should be an arg.
      const meta = fdata.globallyUniqueNamingRegistry.get(name);
      if (
        meta.isConstant &&
        meta.writes.length === 1 &&
        meta.writes[0].parentNode.init.type === 'FunctionExpression' &&
        meta.writes[0].parentNode.init.id?.name === '$free'
      ) {
        // This is a global var. No need to pass this in. We can reach it from anywhere.
        // If we were to pass through free funcs then other assumptions go out of the window
        // And since we control $free, we can assert it's safe to assume them to be global without messing up other heuristics
        vlog('-', [name], 'is a $free function, do not pass those as args. Assume they are globals.');
        userGlobals.add(name);
      } else {
        vlog('-', [name], 'will be added to arg list');
        outer.add(name);
      }
    }
  });
  vgroupEnd();

  if (outer.has('arguments')) {
    vlog('Would want to create a var named `arguments`, which is illegal; bailing');
    return;
  }

  const tmpFuncName = createFreshVar('tmpFree', fdata);
  const tmpReturn = createFreshVar('tmpRet', fdata);

  if (VERBOSE_TRACING) {
    vlog('The args will be:', outer, ', the func will be named "', tmpFuncName, '" and have these local vars:', inner, 'and return "', tmpReturn, '"');
  }

  const last = body[lastIndex];
  const lastRhs =
    last.type === 'VarStatement'
      ? last.init
      : last.type === 'ExpressionStatement' && last.expression.type === 'AssignmentExpression'
      ? last.expression.right
      : ASSERT(false, 'last should be var or assign, was neither;', last.type, last.expression?.type);
  const lastName =
    last.type === 'VarStatement'
      ? last.id.name
      : last.type === 'ExpressionStatement' && last.expression.type === 'AssignmentExpression' && last.expression.left.type === 'Identifier'
      ? last.expression.left.name
      : ASSERT(false, 'assigns should be to idents?', last.left.type);

  const func = AST.functionExpression(
    Array.from(outer).map((name,i) => AST.param('$$' + i)),
    [
      ...Array.from(outer).map((name,i) => AST.varStatement('let', name, AST.identifier('$$' + i))), // or const?
      AST.debuggerStatement(),
      ...body.slice(firstIndex, lastIndex), // Note: the last one is picked apart above (lastRhs/lastName) so don't add it in this slice
      AST.varStatement('const', tmpReturn, lastRhs),
      AST.returnStatement(AST.identifier(tmpReturn)),
    ],
    {
      id: AST.identifier('$free')
    }
  );

  if (outer.size === 0 && userGlobals.size === 0) {
    // Note: One notable exception is math.random(). Are there any other exceptions like it?
    vlog('The function would receive no arguments. This means the output is constant and we should be able to resolve it immediately', last.id?.name || last.left?.name);

    const outNode = runFreeWithPcode(func, [], fdata, 'tmp_free_func', $prng, usePrng);
    if (outNode) {
      rule('Two or more predictable statements that have no other vars can be resolved with pcode');
      example('const y = Math.floor(NaN); const z = y / 3; $(z);', '$(NaN);');
      before(AST.blockStatement(body.slice(firstIndex, lastIndex+1)));

      body.splice(
        firstIndex,
        lastIndex-firstIndex, // Not +1, we keep the last one
      );
      if (last.type === 'VarStatement') {
        last.init = outNode;
      } else if (last.type === 'ExpressionStatement' && last.expression.type === 'AssignmentExpression') {
        last.expression.right = outNode;
      } else if (last.type === 'ExpressionStatement') {
        body[lastIndex] = AST.emptyStatement();
      } else {
        ASSERT(false, 'wat dan');
      }

      after(body[lastIndex - (lastIndex-firstIndex)]);
      return true;
    } else {
      vlog('Seems we cant process this by pcode? Bummer. Bail, for now');
    }
  }
  else {
    rule('Two or more statements that have no observable side effects can be combined into a free function');
    example(
      'const x = $(); const y = x + 2; const z = y / 3; $(z);',
      'const tmp = function $free(x) { const y = x + 2; const ret = y / 3; return ret; } const z = tmp();'
    );
    before(AST.blockStatement(body.slice(firstIndex, lastIndex+1)));

    // Queue the function (whole decl) to inject at the top of global scope in the end
    const varDecl = AST.varStatement('const', tmpFuncName, func);
    funcQueue.push(varDecl);

    const finalNode = AST.varStatement('let', lastName, AST.callExpression(
      '$frfr',
      [AST.identifier(tmpFuncName)].concat(Array.from(outer).map(name => AST.identifier(name))),
    ));
    body.splice(
      firstIndex,
      lastIndex-firstIndex+1,
      finalNode
    );

    after(varDecl, body);
    after(finalNode);
    return true;
  }
}

function collectFromStatement(node, declared, reffed) {
  vgroup('- collectFromStatement(', node.type, ')');
  const r = _collectFromStatement(node, declared, reffed);
  vgroupEnd();
  return r;
}
function _collectFromStatement(node, declared, reffed) {
  switch (node.type) {
    case 'VarStatement': {
      declared.push(node.id);
      const init = node.init;
      if (init.type === 'Identifier') {
        collectFromSimpleOrFail(init, reffed);
      } else if (init.type === 'MemberExpression') {
        ASSERT(!init.computed, 'do we accept computed now?');
        if (init.object.type === 'Identifier') collectFromSimpleOrFail(init.object, reffed);
      } else {
        collectFromExpression(init, declared, reffed);
      }
      return true;
    }
    case 'ExpressionStatement': {
      if (node.expression.type === 'Identifier') {
        collectFromSimpleOrFail(node.expression, reffed);
      } else {
        collectFromExpression(node.expression, declared, reffed);
      }
      return true;
    }
    case 'DebuggerStatement': {
      return true;
    }
    case 'ReturnStatement': {
      if (node.argument.type === 'Identifier') {
        collectFromSimpleOrFail(node.argument, reffed);
      } else {
        collectFromExpression(node.argument, declared, reffed);
      }
      return true;
    }
    case 'EmptyStatement': {
      return false; // This will be revisited next round because normalization will remove this
    }
    default: {
      ASSERT(false, 'support this statement:', node.type);
    }
  }
}
function collectFromExpression(node, declared, reffed) {
  vgroup('- collectFromExpression(', node.type, ')');
  _collectFromExpression(node, declared, reffed);
  vgroupEnd();
}
function _collectFromExpression(node, declared, reffed) {
  switch (node.type) {
    case 'CallExpression': {
      if (node.callee.type === 'Identifier') {
        collectFromSimpleOrFail(node.callee, reffed);
      } else if (node.callee.type === 'MemberExpression') {
        if (node.callee.object.type === 'Identifier') collectFromSimpleOrFail(node.callee, reffed);
      } else {
        ASSERT(false, 'need to support this callee:', node.callee.type);
      }
      node.arguments.forEach(anode => {
        collectFromSimpleOrFail(anode, reffed);
      });
      break;
    }
    case 'BinaryExpression': {
      collectFromSimpleOrFail(node.left, reffed);
      collectFromSimpleOrFail(node.right, reffed);
      break;
    }
    case 'UnaryExpression': {
      collectFromSimpleOrFail(node.argument, reffed);
      break;
    }
    case 'AssignmentExpression': {
      collectFromSimpleOrFail(node.left, reffed);
      if (node.right.type === 'Identifier') collectFromSimpleOrFail(node.right);
      else collectFromExpression(node.right, declared, reffed);
      break;
    }
    case 'Literal': {
      break;
    }
    case 'TemplateLiteral': {
      // I forgot whether we enforced template literals to have one expression (versus strings to have no expressions) or not (:
      if (node.expressions.length === 0) {
        break;
      }
      //ASSERT(node.expressions.length === 1, 'right?', node, node.expressions);
      if (node.expressions.length > 1) todo('find test case where template ends up with multiple expressions');
      // Guess it doesn't really matter. We just collect them all here.
      for (let i=0; i<node.expressions.length; ++i) {
        collectFromSimpleOrFail(node.expressions[i], reffed);
      }
      break;
    }
    case 'Param': {
      ASSERT(false, 'dont think we should be trying to test a function header');
      return false;
    }
    default: {
      ASSERT(false, 'support this expression:', node.type);
    }
  }
}
function collectFromSimpleOrFail(node, reffed) {
  ASSERT(arguments.length === 2);
  if (AST.isPrimitive(node)) return;
  if (node.type === 'MemberExpression') {
    ASSERT(!node.computed, 'this is trickier');
    return collectFromSimpleOrFail(node.object, reffed);
  }
  ASSERT(node.type !== 'TemplateLiteral', 'if a template literal hits here its parent is probably not normalized; some transform should have called AST.normalizeTemplateSimple or go back through normalize first', node);
  ASSERT(node.type === 'Identifier', 'add support for anything else', node.type);
  vlog('  - collected:', node.name, node.$p.blockChain);
  reffed.push(node);
}

function isFreeStatement(stmtNode, fdata) {
  // A statement is predictable when the execution of it in itself has no observable side effects.
  // In concrete terms: when there's no way it could trigger a `console.log()` or `alert()`.

  if (stmtNode.$p.predictable !== undefined) {
    return stmtNode.$p.predictable;
  }

  switch (stmtNode.type) {
    case 'VarStatement': {
      // Special case: this is only okay to capture if the variable is not
      //               used before/after the $free function. The exception
      //               is when that variable is the last statement being
      //               captured this way.
      //               We check this afterwards because we only need to
      //               check the outer block of targeted statements and it
      //               depends on the statements being gathered whether we
      //               can abstract it into a $free or not due to this.
      if (isFreeExpression(stmtNode.init, fdata)) {
        stmtNode.$p.predictable = true;
        return true;
      } else {
        stmtNode.$p.predictable = false;
        return false;
      }
    }
    case 'ExpressionStatement': {
      if (isFreeExpression(stmtNode.expression, fdata)) {
        vlog('- @', stmtNode.$p.npid, '= yes');
        stmtNode.$p.predictable = true;
        return true;
      } else {
        vlog('- @', stmtNode.$p.npid, '= no');
        stmtNode.$p.predictable = false;
        return false;
      }
    }

    // BreakStatement: would be safe if the label is inside the $free function
    // LabeledStatement: totally okay once we can cover break statements. Maybe we just pass in a set of allowed label names.
    // ReturnStatement: not okay. we would have to take care of propagating this and it just gets messy and worse.
    // ThrowStatement: this should be fine
    // Try: if we can prove that the whole thing is predictable then obviously, yes, it's fine...
    // Block: should be fine
    // If: fine if both blocks are predictable (note that an if-test never triggers a spy)
    // While: fine if the block is predictable (I think?). the test is always true.
    // DebuggerStatement: happens when processing a block and not knowing it's a function body

    default: {
      // Not sure yet
      stmtNode.$p.predictable = false;
      return false;
    }
  }
}
function isFreeExpression(exprNode, fdata) {
  // Do we need the predictable tag here or is that redundant if parent statements already do this?
  // TODO: this needs to be in sync with pcode. Can we generalize that?

  switch (exprNode.type) {
    case 'CallExpression': {
      vlog('  - Is call', [exprNode.callee.name]);
      // Yes when the args are predictable and when the callee is
      // - a builtin ident (`parseInt()`), or
      // - a builtin member expression (`Math.random()`), or
      // - calling another $free function, or
      // - a local (? not sure if we'll ever do this because that sub-function would then just be another $free func, right?)

      if (exprNode.callee.type !== 'Identifier') {
        todo('Encountered non-ident as callee');
        vlog('- bail: calling a non-ident should throw at this point');
        return false;
      }

      const funcName = exprNode.callee.name;

      if (funcName === '$frfr') {
        // We created this and I think it should always be safe to call these
        // nested, even after other rules may have transformed it further?
        return true;
      }

      if (exprNode.arguments.some(anode => {
        if (!anode) return false; // ok
        vlog('  - arg:', anode.type, anode.name);
        return !isFreeExpression(anode, fdata);
      })) {
        // At least one arg was not predictable
        vlog('  - has bad args :(');
        return false;
      }

      if (funcName === SYMBOL_COERCE) {
        // Seen a real world case choke over this:
        ASSERT(exprNode.arguments.length === 2, 'coerce should always have 2 args', exprNode);
        if (AST.isPrimitive(exprNode.arguments[0])) return true;
        ASSERT(exprNode.arguments[0].type === 'Identifier', 'coerce should always have prim or ident as first arg', exprNode, exprNode.arguments[0]);
        const meta = getMeta(exprNode.arguments[0].name, fdata);
        if (meta.typing?.mustBeType || meta.typing?.mustBePrimitive) {
          vlog('  - ok! its a coerce call with primitive arg:', funcName);
          return true; // $coerce on a primitive is safe and predictable
        }
        vlog('  - no. its a coerce call but the arg is not a primitive:', funcName);
        return false; // $coerce may have side effects on non-primitives. That's why we do this in $coerce in the first place.
      }

      if (funcName === SYMBOL_DOTCALL) {
        vlog('  - its a dotcall:', [exprNode.arguments[0].name]);
        ASSERT(exprNode.arguments[0].type === 'Identifier', 'we control dotcall?', exprNode.arguments[0]);
        if (SUPPORTED_FREE_BUILTINS.has(exprNode.arguments[0].name)) {
          vlog('  - ok! its a global builtin dotcall:', exprNode.arguments[0].name);
          return true; // Ok as long as args are ok
        }
        //todo('  - the ident call is not accepted (can it be?):', [funcName]);
        vlog('  - the dotcalled ident is not a supported name');
        return false;
      }

      vlog('  - ident call;', funcName);
      if (SUPPORTED_FREE_BUILTINS.has(funcName)) {
        vlog('  - ok! its a global builtin call:', funcName);
        return true; // Ok as long as args are ok
      }

      // Anything else is an exception? Not my problem here.
      //todo('  - the ident call is not accepted (can it be?):', [funcName]);
      vlog('  - No, supported func name call');
      return false;
    }
    case 'Identifier': {
      vlog('is ident', [exprNode.name]);

      // The point here is figuring out whether the value of this ident could possibly spy. Like when coerced to string or number.
      // An identifier is "predictable" when either
      // - it's a built-in value of any kind; they don't spy unless called (TODO: so how do we cover that case?)
      // - it refers to another $free func var
      // - it refers to a constant known to be an immutable value of any kind, most commonly a primitive, actual value irrelevant
      // - it refers to a local var which is not mutated in the free func (it might declare it though)
      //   - with no side effects, the kind/lifetime of the var is irrelevant
      //   - only need to guarantee that the value is immutable at the point of calling the free func
      // - it refers to a local var which is mutated in the free func but not referenced any further after the free func

      const funcName = exprNode.name;

      if (['undefined', 'NaN', 'Infinity', 'arguments'].includes(funcName)) {
        return true;
      }
      const meta = fdata.globallyUniqueNamingRegistry.get(funcName);
      ASSERT(meta, 'if missing check if another reducer failed to go to phase1');
      vlog('  - Ident "', funcName, '", meta typing:', JSON.stringify(meta?.typing));
      if (PRIMITIVE_TYPE_NAMES_PREVAL.has(meta.typing.mustBeType) || meta.typing.mustBePrimitive) {
        vlog('    - ident=ok');
        return true;
      }
      if (
        meta.isConstant &&
        meta.varDeclRef?.node.type === 'FunctionExpression' &&
        meta.varDeclRef.node.name === '$free'
      ) {
        return true;
      }
      if (
        meta.isConstant &&
        meta.varDeclRef &&
        AST.isPrimitive(meta.varDeclRef)
      ) {
        return true;
      }
      if (SUPPORTED_FREE_BUILTINS.has(funcName)) {
         return true;
      }

      // rest: tbd

      return false;
    }
    case 'Literal': {
      vlog('is lit', [exprNode.value]);
      // I think even a regex is okay here...?
      return true;
    }
    case 'TemplateLiteral': {
      vlog('is template');
      // In normalized code, templates should be guaranteed to only receive expressions known
      // or forced to be a string already. The template expression itself can therefor have no
      // other side effects than the concatenation of two (or three) strings.
      return true;
    }
    case 'BinaryExpression': {
      vlog('is binary', exprNode.operator);
      return isFreeExpression(exprNode.left, fdata) && isFreeExpression(exprNode.right, fdata);
    }
    case 'UnaryExpression': {
      vlog('is unary', exprNode.operator);
      if (exprNode.operator !== 'delete') {
        return isFreeExpression(exprNode.argument, fdata);
      }
      return;
    }

    case 'FunctionExpression': {
      return false;
    }
    case 'MemberExpression': {
      // TODO: Some things can definitely be supported. This is a property lookup.
      return false;
    }
    case 'AssignmentExpression': {
      // TODO: This should be considered fine for local bindings
      return false;
    }
    case 'Param': {
      // Can happen when scanning Blocks where we don't know that it's a function. Just ignore.
      return false;
    }
    case 'ArrayExpression': {
      // TODO: maybe if it doesn't escape?
      return false;
    }
    case 'ObjectExpression': {
      // TODO: maybe if it doesn't escape?
      return false;
    }
    case 'AwaitExpression': {
      return false;
    }
    case 'YieldExpression': {
      return false;
    }
    case 'SuperCall': {
      return false;
    }
    case 'SuperMethodCall': {
      return false;
    }
    case 'SuperProp': {
      return false;
    }
    case 'ThisExpression': {
      // Can happen when scanning Blocks where we don't know that it's a function. Just ignore.
      return false;
    }
    case 'NewExpression': {
      return false;
    }
    case 'ClassExpression': {
      return false;
    }
    case 'SpreadElement': {
      return false;
    }
  }

  ASSERT(false, 'lets be exhaustive here, this is missing:', exprNode.type);
  return false;
}
