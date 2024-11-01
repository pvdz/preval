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
import {
  ASSERT,
  log,
  group,
  groupEnd,
  vlog,
  vgroup,
  vgroupEnd,
  fmat,
  tmat,
  rule,
  example,
  before,
  source,
  after,
  findBodyOffset,
} from '../utils.mjs';
import * as AST from '../ast.mjs';
import {
  BUILTIN_MATH_STATIC_LOOKUP,
  BUILTIN_MATH_STATIC_LOOKUP_REV,
  BUILTIN_NUMBER_METHOD_LOOKUP,
  BUILTIN_NUMBER_METHOD_LOOKUP_REV,
  BUILTIN_NUMBER_STATIC_LOOKUP,
  BUILTIN_NUMBER_STATIC_LOOKUP_REV,
  BUILTIN_STRING_METHOD_LOOKUP,
  BUILTIN_STRING_METHOD_LOOKUP_REV,
  BUILTIN_STRING_STATIC_LOOKUP,
  BUILTIN_STRING_STATIC_LOOKUP_REV,
} from '../symbols_builtins.mjs';
import { createFreshVar, getMeta } from '../bindings.mjs';
import { VERBOSE_TRACING } from '../constants.mjs';
import { pcanCompile, pcodeSupportedBuiltinFuncs, pcompile, runPcode } from '../pcode.mjs';
import { BUILTIN_GLOBAL_FUNC_NAMES } from '../globals.mjs';
import { GLOBAL_PREVAL_SYMBOLS, SYMBOL_COERCE } from '../symbols_preval.mjs';
import { getExpressionFromNormalizedStatement } from '../ast.mjs';

export function freeing(fdata, $prng, prngSeed = 1) {
  group('\n\n\nSearching for free statements to collect\n');
  const r = _freeing(fdata, $prng, prngSeed);
  groupEnd();
  return r;
}
function _freeing(fdata, $prng, prngSeed) {
  let changed = 0;

  const funcQueue = [];

  walk(_walker, fdata.tenkoOutput.ast, 'ast');
  function _walker(blockNode, beforeWalk, nodeType, path) {
    if (blockNode.type === 'FunctionExpression' && blockNode.id?.name === '$free') {
      ASSERT(beforeWalk, 'we dont visit these funcs so they dont return');
      processFreeFunction(blockNode, path.nodes[path.nodes.length - 2]);
      return true; // Do not visit $free functions at all
    }
    if (beforeWalk) return;
    if (blockNode.type !== 'BlockStatement' && blockNode.type !== 'Program') return; // Just process blocks
    return processBlock(blockNode, path);
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
    vlog('Block @', +blockNode.$p.pid, blockNode.$p.predictable, 'has', blockNode.body.length, 'statements, parent:', path.nodes[path.nodes.length - 2]?.type);
    if (blockNode.$p.predictable === false) return; // May already have been visited entirely when walking recursively
    if (blockNode.body.length < 2) return; // Not worth it

    let lastStart = 0;
    let index = 0;
    while (index < blockNode.body.length) {
      vlog('- stmt[' + index + '] =', blockNode.body[index].type, blockNode.body[index].declarations?.[0].init.type || blockNode.body[index].expression?.type || '');

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
          const updated = withPredictableStatements(blockNode.body, i, index - 1, fdata, funcQueue, $prng, prngSeed);
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
        const updated = withPredictableStatements(blockNode.body, i, index - 1, fdata, funcQueue, $prng, prngSeed);
        if (updated) {
          changed += 1;
          // Do not visit this block any further.
          return true;
        }
      }
    }

  }

  function processFreeFunction(funcNode, parentNode) {
    ASSERT(funcNode.id.name === '$free', 'this is the key indicator that this is a $free function');

    // Confirm that the function is still useful. It may have been reduced to such simplicity that it can be folded up.
    // This happens when the function is created while the statements could still be simplified.

    const body = funcNode.body.body;

    if (body.length - funcNode.$p.bodyOffset === 1) {
      const last = body[body.length - 1];
      ASSERT(last?.type === 'ReturnStatement', '$free functions should always result in a return...', last);

      // Get the function alias for this $free func
      const funcAlias =
        parentNode.type === 'VariableDeclarator'
        ? parentNode.id.name
        : parentNode.type === 'AssignmentExpression' && parentNode.left.type === 'Identifier'
        ? parentNode.left.name
        : ASSERT(false, 'what', parentNode);

      ASSERT(funcAlias);
      const meta = fdata.globallyUniqueNamingRegistry.get(funcAlias);
      meta.reads.forEach(read => {
        // Change me if this fails :)
        ASSERT(read.parentNode.type === 'CallExpression', 'not sure if $free refs should ever be shuffled around...');
        ASSERT(read.parentNode.callee.name === '$frfr', 'I think $free funcs should only ever be the arg to $frfr');
        ASSERT(read.parentNode.arguments[0] === read.node, 'I think the arg should always be the first to $frfr');

        rule('If a $free function has one statement then it can be folded back up');
        example('const f = function $free(x) { return x; }; const x = $frfr(f, 1);', 'const x = 1;');
        before(funcNode);
        before(read.blockBody[read.blockIndex]);

        // Have to resolve a returned ident back to its param so we can do the mapping on the call side of things
        const finalNode = valueNodeToArgNode(last.argument, funcNode, read.parentNode);
        if (read.grandIndex < 0) read.grandNode[read.grandProp] = finalNode;
        else read.grandNode[read.grandProp][read.grandIndex] = finalNode;

        after(read.blockBody[read.blockIndex]);
        changed += 1;
      });

      return true;
    }

    const last = body[body.length - 1];
    const stmt = body[body.length - 2];
    if (
      // "real" body should have exactly two statements
      body.length - funcNode.$p.bodyOffset === 2 &&
      // It should start with a var decl of sorts
      stmt.type === 'VariableDeclaration' &&
      // And then return this value
      last.type === 'ReturnStatement' &&
      // If not then bail. Most likely another trick will fix it for us.
      last.argument.type === 'Identifier' && last.argument.name === stmt.declarations[0].id.name
    ) {
      // Get the function alias for this $free func
      const funcAlias =
        parentNode.type === 'VariableDeclarator'
        ? parentNode.id.name
        : parentNode.type === 'AssignmentExpression' && parentNode.left.type === 'Identifier'
        ? parentNode.left.name
        : ASSERT(false, 'what', parentNode);

      const init = stmt.declarations[0].init;
      const initIsPrimitive = AST.isPrimitive(init);

      ASSERT(funcAlias);
      const meta = fdata.globallyUniqueNamingRegistry.get(funcAlias);
      meta.reads.forEach(read => {
        const callNode = read.parentNode;
        // Change me if this fails :)
        ASSERT(callNode.type === 'CallExpression', 'not sure if $free refs should ever be shuffled around...');
        ASSERT(callNode.callee.name === '$frfr', 'I think $free funcs should only ever be the arg to $frfr');
        ASSERT(callNode.arguments[0] === read.node, 'I think the arg should always be the first to $frfr');

        rule('If a $free function has two statements then it can be folded back up');
        example('const f = function $free(x) { const r = parseInt(x); return r; }; const x = $frfr(f, 1);', 'const x = parseInt(1);');
        before(funcNode);
        before(read.blockBody[read.blockIndex]);

        // Find all idents and map them back to the original arg inputs

        let finalNode;
        if (initIsPrimitive) {
          finalNode = AST.primitive(AST.getPrimitiveValue(init));
        } else {
          switch (init.type) {
            case 'Identifier': {
              finalNode = valueNodeToArgNode(init, funcNode, callNode);
              break;
            }
            case 'CallExpression': {
              finalNode = AST.callExpression(
                AST.cloneSimple(init.callee),
                init.arguments.map(anode => valueNodeToArgNode(anode, funcNode, callNode)),
              );
              break;
            }
            case 'BinaryExpression': {
              const left = valueNodeToArgNode(init.left, funcNode, callNode);
              const right = valueNodeToArgNode(init.right, funcNode, callNode);
              finalNode = AST.binaryExpression(init.operator, left, right);
              break;
            }
            case 'TemplateLiteral': {
              if (init.expressions.length === 0) {
                finalNode = AST.cloneSimpleOrTemplate(init);
                break;
              }
              ASSERT(init.expressions.length === 1, 'template literals have one expression');
              finalNode = AST.cloneSimpleOrTemplate(init);
              finalNode.expressions = [valueNodeToArgNode(init.expressions[0], funcNode, callNode)];
              break;
            }
            default: {
              ASSERT(false, 'support this type', init.type);
            }
          }
        }

        if (read.grandIndex < 0) read.grandNode[read.grandProp] = finalNode;
        else read.grandNode[read.grandProp][read.grandIndex] = finalNode;

        after(read.blockBody[read.blockIndex]);
        changed += 1;
      });

      return true;
    }

    for (let index=funcNode.$p.bodyOffset; index<body.length; ++index) {
      if (body[index].type === 'ExpressionStatement' &&
        ['UnaryExpression', 'BinaryExpression'].includes(body[index].type)
      ) {
        // We can drop this because args to $free functions are supposed to be asserted to be side effect free
        rule('Expression statements with no observable effects can be safely eliminated from $free functions');
        example('const f = function $free(x) { +x; return x; }', 'const f = function $free(x) { ; return x; }');
        before(body[index]);

        // Note: normalization will clean that up eventually
        body[index] = AST.emptyStatement();

        after(body[index]);
        changed += 1;
      }

      if (body[index].type === 'VariableDeclaration' || body[index].type === 'ExpressionStatement') {
        const expr = getExpressionFromNormalizedStatement(body[index]);
        if (
          expr.type === 'CallExpression' &&
          expr.callee.type === 'Identifier' &&
          expr.callee.name === '$frfr'
        ) {
          // A $frfr that is called from inside a $free func can collapse its argument into
          // that function if the called $free func is only referenced once.
          // Yes, in theory there's no condition to it, but we want to reduce code bloat so that's the line.
          ASSERT(expr.arguments[0]?.type === 'Identifier', 'we control $frfr and the first arg must be the free func to call');
          const freeFuncName = expr.arguments[0].name;
          const meta = fdata.globallyUniqueNamingRegistry.get(freeFuncName);
          ASSERT(meta);
          ASSERT(meta.constValueRef?.node?.type === 'FunctionExpression');
          ASSERT(meta.constValueRef?.node?.id?.name === '$free', '$frfr should be calling $free functions');

          if (meta.reads.length === 1) {
            vlog('Found a $frfr calling a $free function inside another $free function, and the called function is only read once. We can squash the $frfr call here.');

            // To make it easier (or lazy?) we will inline the called function verbatim and patch
            // the arg names to param names through const aliasing and have other rules clean that up
            // Otherwise we'd have to rename the whole thing.

            rule('A $frfr called inside a $free function can be squashed if the called function is only referenced once');
            example(
              'const f = function $free(){ const z = $frfr(g, b); }; const g = function $free(y) { const x = Math.pow(y); return x; }',
              'const f = function $free(){ const y = b; const x = Math.pow(y); const z = x; };',
            );
            before(meta.constValueRef.containerParent[meta.constValueRef.containerIndex]);
            before(body[index], body);

            const innerBody = meta.constValueRef.node.body.body;
            const returnStmt = innerBody[innerBody.length - 1];
            ASSERT(returnStmt.type === 'ReturnStatement');
            ASSERT(returnStmt.argument);

            body[index].declarations[0].init = returnStmt.argument;
            body.splice(index, 0,
              ...meta.constValueRef.node.params.map((param,i) => AST.variableDeclaration(param.$p.paramVarDeclRef.name, expr.arguments[i+1] || AST.identifier('undefined'))),
              ...innerBody.slice(meta.constValueRef.node.$p.bodyOffset, -1),
            );

            after(body[index], body);
            changed += 1;
            return true;
          }
        }
      }
    }
  }

  function valueNodeToArgNode(valueNode, funcNode, callNode) {
    ASSERT(valueNode);
    ASSERT(funcNode);
    ASSERT(callNode);

    if (valueNode.type === 'Identifier' && !AST.isPrimitive(valueNode)) {
      const targetName = valueNode.name;
      const n = funcNode.$p.paramNameToIndex.get(targetName);
      if (n >= 0) {
        return AST.cloneSimple(callNode.arguments[n+1]) || AST.identifier('undefined');
      } else {
        // Then this ought to be a global (builtin or explicit), which would not be passed in as an arg.
        ASSERT(BUILTIN_GLOBAL_FUNC_NAMES.has(targetName) || fdata.globallyUniqueNamingRegistry.get(targetName)?.constValueRef?.node?.$p.blockChain === '1,', 'if there is no arg then the var must refer to a global of sorts');
        return AST.identifier(targetName);
      }
    } else {
      return AST.cloneSimpleOrTemplate(valueNode);
    }
  }

  function processFrfrCall(block, index, callNode, path) {
    if (block[index].type === 'ExpressionStatement') {
      // The $frfr call is a statement. Since $free func calls are not observable, this must mean
      // the statement is moot and we can eliminate it. We should keep the ident args for tdz as usual

      rule('A $frfr as statement is moot and can be eliminated');
      example('$frfr(f, x, y, z);', 'x; y; z;');
      before(block[index]);

      // Ideally we'd make this a sequence though but feh, this should get cleaned up by normalization as well
      block[index].expression = AST.arrayExpression(callNode.arguments);

      after(block[index]);
      changed += 1;
      return true;
    }

    ASSERT(block[index].type === 'VariableDeclaration' || block[index].expression?.type === 'AssignmentExpression', 'one of three', block[index].type, block[index].expression?.type);

    if (callNode.arguments.every((anode, i) => i === 0 || AST.isPrimitive(anode))) {
      ASSERT(callNode.arguments?.[0]?.type === 'Identifier', '$frfr is controlled by us and first arg should be the free func ref');
      const freeFuncName = callNode.arguments[0].name;
      const meta = fdata.globallyUniqueNamingRegistry.get(freeFuncName);
      const funcNode = meta.constValueRef?.node;
      ASSERT(meta.writes.length === 1 && funcNode && funcNode.id?.name === '$free', 'we defined this...', funcNode.id?.name, meta.writes.length);

      // Check if it is using user globals. Those wouldn't become parameters but would block the following rule.
      vgroup('Searching for explicit globals used in the $free func');
      const declared = [];
      const reffed = [];
      for (let i=funcNode.$p.bodyOffset; i<funcNode.body.body.length; ++i) {
        walk(quickIdentScanner, funcNode.body.body[i], 'body');
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
          if (meta.isConstant && meta.constValueRef.node.$p.blockChain === '1,') {
            // This is a global var. No need to pass this in. We can reach it from anywhere.
            vlog('-', [name], 'is an explicit user global');
            return true;
          } else {
            //vlog('-', [name], 'will be added to arg list');
            //outer.add(name);
          }
        }
      });
      vlog('Has explicit user global?', hasExplicitGlobal);
      vgroupEnd();

      if (!hasExplicitGlobal) {
        // Attempt to resolve the $frfr call
        const outNode = runFreeWithPcode(funcNode, callNode.arguments.slice(1), fdata, freeFuncName, $prng, prngSeed);
        if (outNode) {
          rule('A $frfr that only receives primitives should be inlined so it can get resolved');
          example('const x = $frfr(f, 1, 2, 3);', 'const a = 1; const x = a + 2;');
          before(block[index]);

          if (block[index].type === 'VariableDeclaration') block[index].declarations[0].init = outNode;
          else if (block[index].type === 'ExpressionStatement' && block[index].expression.type === 'AssignmentExpression') block[index].expression.right = outNode;
          else if (block[index].type === 'ExpressionStatement' && block[index].expression.type === 'CallExpression') block[index].expression = outNode;
          else ASSERT(false, 'fiiiixme');

          after(block[index]);
          changed += 1;
          return true;
        } else {
          ASSERT(false, 'We should be able to resolve the $frfr call but pcode failed to complete');
        }
      }
    }

    // If the statement before (or after) a $frfr call is predictable and the result is only
    // used as an arg to the $frfr call then it can be combined with the function being called

    const prev = index > 0 && block[index-1];
    if (
      prev &&
      prev.type === 'VariableDeclaration' &&
      prev.kind === 'const' &&
      callNode.arguments.some(anode => anode.type === 'Identifier' && anode.name === prev.declarations[0].id.name) &&
      isFreeStatement(prev, fdata)
    ) {
      // Why are we letting unsafe vars through now
      const prevName = prev.declarations[0].id.name;
      // Prev was a const and it's being passed into the $frfr call. Check if it's used anywhere else.
      const meta = fdata.globallyUniqueNamingRegistry.get(prevName);
      if (meta.reads.some(read => +read.node.$p.pid > +prev.$p.pid || +read.node.$p.pid < +(block[index+1]?.$p.pid ?? Infinity))) {
        // No ref outside of the const and frfr call. We can combine these.

        vlog('We can merge statement', index, 'with the $frfr call');

        rule('A predictable statement before a $frfr call can be merged');
        const updated = withPredictableStatements(block, index-1, index, fdata, funcQueue, $prng, prngSeed);
        if (updated) {
          changed += 1;
          return true;
        }
      }
    }
  }
}

function withPredictableStatements(body, firstIndex, lastIndex, fdata, funcQueue, $prng, prngSeed) {
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
  const firstPid = +body[firstIndex].$p.pid;
  const lastPid = lastIndex + 1 >= body.length ? Infinity : +body[lastIndex + 1].$p.pid;

  for (let stmtIndex=firstIndex; stmtIndex<=lastIndex; ++stmtIndex) {
    const stmt = body[stmtIndex];
    if (stmt.type === 'VariableDeclaration') {
      const name = stmt.declarations[0].id.name;
      vlog('  - Checking if "', name, '" is used out of range');
      const meta = fdata.globallyUniqueNamingRegistry.get(name);
      for (let refIndex=0; refIndex<meta.rwOrder.length; ++refIndex) {
        const ref = meta.rwOrder[refIndex];
        const pid = +ref.node.$p.pid;
        const inRange = pid >= firstPid && pid <= lastPid;
        vlog('    - is', name, '@', +ref.node.$p.pid, 'in range?', firstPid, '<', pid, '<', lastPid, '--', inRange);
        // If not then this must be the last statement. Can only proceed if there was at least one statement earlier.
        // We'd have to restart this function with the new bounds if they are different.
        if (!inRange && stmtIndex !== lastIndex) {
          vlog('    - Retrying with smaller range', firstIndex, stmtIndex, 'because', stmtIndex, '!==', lastIndex);
          // The variable was used outside of the given range. We cannot include it.
          // Try again with a smaller range. Note that we reduce the last index, not the first
          // index, because we will cover that later anyways.
          return withPredictableStatements(body, firstIndex, stmtIndex, fdata, funcQueue, $prng, prngSeed);
        }
      }
      // If it gets here then the variable name has no references outside of the targeted range. Good!
    }
  }

  // All refs are local to the statements we are about to pack. All statements are predictable.
  // We should be good to go now.
  vlog('Found some statements to wrap in a $free function:', firstIndex, lastIndex, firstPid, lastPid);
  //source(AST.blockStatement(body.slice(firstIndex, lastIndex)), true);


  if (body[lastIndex].type !== 'VariableDeclaration' && !(body[lastIndex].type === 'ExpressionStatement' && body[lastIndex].expression.type === 'AssignmentExpression')) {
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
    } else if (BUILTIN_GLOBAL_FUNC_NAMES.has(name) || GLOBAL_PREVAL_SYMBOLS.has(name)) {
      // Do nothing, it's calling or reading from builtin globals like Math, String, etc
      vlog('-', [name], 'is a builtin or preval global');
    } else if (name === 'arguments') {
      outer.add(name);
      vlog('-', [name], 'is `arguments` and added to the arg list');
    } else {
      const meta = fdata.globallyUniqueNamingRegistry.get(name);
      if (meta.isConstant && meta.constValueRef.node.$p.blockChain === '1,') {
        // This is a global var. No need to pass this in. We can reach it from anywhere.
        vlog('-', [name], 'is a global, no need to pass as arg');
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
    last.type === 'VariableDeclaration'
      ? last.declarations[0].init
      : last.type === 'ExpressionStatement' && last.expression.type === 'AssignmentExpression'
        ? last.expression.right
        : ASSERT(false, 'last should be var or assign, was neither;', last.type, last.expression?.type);
  const lastName =
    last.type === 'VariableDeclaration'
      ? last.declarations[0].id.name
      : last.type === 'ExpressionStatement' && last.expression.type === 'AssignmentExpression' && last.left.type === 'Identifier'
        ? last.expression.left.name
        : ASSERT(false, 'assigns should be to idents?', last.left.type);

  const func = AST.functionExpression(
    Array.from(outer).map((name,i) => AST.param('$$' + i)),
    [
      ...Array.from(outer).map((name,i) => AST.variableDeclaration(name, '$$' + i, 'let')), // or const?
      AST.debuggerStatement(),
      ...body.slice(firstIndex, lastIndex), // Note: the last one is picked apart above (lastRhs/lastName) so don't add it in this slice
      AST.variableDeclaration(tmpReturn, lastRhs, 'const'),
      AST.returnStatement(AST.identifier(tmpReturn)),
    ],
    {
      id: AST.identifier('$free')
    }
  );

  if (outer.size === 0 && userGlobals.size === 0) {
    // Note: One notable exception is math.random(). Are there any other exceptions like it?
    vlog('The function would receive no arguments. This means the output is constant and we should be able to resolve it immediately');

    const outNode = runFreeWithPcode(func, [], fdata, 'tmp_free_func', $prng, prngSeed);
    if (outNode) {
      rule('Two or more predictable statements that have no other vars can be resolved with pcode');
      example('const y = Math.floor(NaN); const z = y / 3; $(z);', '$(NaN);');
      before(AST.blockStatement(body.slice(firstIndex, lastIndex+1)));

      body.splice(
        firstIndex,
        lastIndex-firstIndex, // Not +1, we keep the last one
      );
      if (last.type === 'VariableDeclaration') {
        last.declarations[0].init = outNode;
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
    const varDecl = AST.variableDeclaration(tmpFuncName, func);
    funcQueue.push(varDecl);

    const finalNode = AST.variableDeclaration(lastName, AST.callExpression(
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
    case 'VariableDeclaration': {
      declared.push(node.declarations[0].id);
      const init = node.declarations[0].init;
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
      collectFromSimpleOrFail(node.right, reffed);
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
      ASSERT(node.expressions.length === 1, 'right?', node, node.expressions);
      collectFromSimpleOrFail(node.expressions[0], reffed);
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
  ASSERT(node.type === 'Identifier', 'add support for anything else', node.type);
  vlog('  - collected:', node.name, node.$p.blockChain);
  reffed.push(node);
}


function runFreeWithPcode(funcNode, argNodes, fdata, freeFuncName, $prng, prngSeed) {
  source(funcNode, true);
  const callsWhenCompiled = pcanCompile(funcNode, fdata, freeFuncName);
  vlog('Can pcode body?', freeFuncName, callsWhenCompiled);
  if (callsWhenCompiled) {
    const pcode = pcompile(funcNode, fdata);
    // Temp
    fdata.pcodeOutput = new Map;
    fdata.pcodeOutput.set(+funcNode.$p.pid, { pcode, funcNode, name: freeFuncName });
    fdata.pcodeOutput.set(freeFuncName, { pcode, funcNode, name: freeFuncName });
    vlog('pcode:', pcode);
    vlog('Getting primitives from args:', argNodes);
    const args = argNodes.map(anode => AST.getPrimitiveValue(anode));
    vlog('Now running pcode with args:', args);
    const out = runPcode(freeFuncName, args, fdata.pcodeOutput, fdata, $prng, prngSeed);
    vlog('Outcome:', out);
    // Cleanup
    fdata.pcodeOutput = undefined;

    return AST.primitive(out);
  }

  return null;
}

function isFreeStatement(stmtNode, fdata) {
  // A statement is predictable when the execution of it in itself has no observable side effects.
  // In concrete terms: when there's no way it could trigger a `console.log()` or `alert()`.

  if (stmtNode.$p.predictable !== undefined) {
    return stmtNode.$p.predictable;
  }

  switch (stmtNode.type) {
    case 'VariableDeclaration': {
      // Special case: this is only okay to capture if the variable is not
      //               used before/after the $free function. The exception
      //               is when that variable is the last statement being
      //               captured this way.
      //               We check this afterwards because we only need to
      //               check the outer block of targeted statements and it
      //               depends on the statements being gathered whether we
      //               can abstract it into a $free or not due to this.
      if (isFreeExpression(stmtNode.declarations[0].init, fdata)) {
        stmtNode.$p.predictable = true;
        return true;
      } else {
        stmtNode.$p.predictable = false;
        return false;
      }
    }
    case 'ExpressionStatement': {
      if (isFreeExpression(stmtNode.expression, fdata)) {
        vlog('- @', +stmtNode.$p.pid, '= yes');
        stmtNode.$p.predictable = true;
        return true;
      } else {
        vlog('- @', +stmtNode.$p.pid, '= no');
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
      vlog('  - Is call?', exprNode.callee.name, exprNode.callee.object?.name, exprNode.callee.property?.name);
      // Yes when the args are predictable and when the callee is
      // - a builtin ident (`parseInt()`), or
      // - a builtin member expression (`Math.random()`), or
      // - calling another $free function, or
      // - a local (? not sure if we'll ever do this because that sub-function would then just be another $free func, right?)

      if (exprNode.callee.type === 'Identifier' && exprNode.callee.name === '$frfr') {
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

      if (exprNode.callee.type === 'Identifier') {
        vlog('  - ident call;', exprNode.callee.name);
        if (['parseInt', 'parseFloat', 'isNaN', 'isFinite', ].includes(exprNode.callee.name)) {
          return true; // Ok as long as args are ok
        }
        if (BUILTIN_MATH_STATIC_LOOKUP_REV[exprNode.callee.name] && BUILTIN_MATH_STATIC_LOOKUP[BUILTIN_MATH_STATIC_LOOKUP_REV[exprNode.callee.name]]) {
          return true; // Ok as long as args are ok
        }
        if (exprNode.callee.name === SYMBOL_COERCE) {
          const meta = getMeta(exprNode.arguments[0].name, fdata);
          if (meta.typing?.mustBeType || meta.typing?.mustBePrimitive) {
            return true; // $coerce on a primitive is safe and predictable
          }
          return false; // $coerce may have side effects on non-primitives. That's why we do this in $coerce in the first place.
        }
      }
      if (exprNode.callee.type === 'MemberExpression') {
        vlog('  - member call;', exprNode.callee.computed, exprNode.callee.object.name, exprNode.callee.property.name);
        if (exprNode.callee.computed) return false; // Not going to bother with this

        if (exprNode.callee.object.type === 'Identifier') {
          const objName = exprNode.callee.object.name;
          const propName = exprNode.callee.property.name;
          if (
            objName === 'Math' &&
            propName !== 'random' &&
            BUILTIN_MATH_STATIC_LOOKUP[propName] &&
            BUILTIN_MATH_STATIC_LOOKUP_REV[BUILTIN_MATH_STATIC_LOOKUP[propName]]
          ) {
            vlog('  - Static Math functions ok');
            return true; // ok, Math.abs with predictable args
          }
          if (
            objName === 'String' &&
            BUILTIN_STRING_STATIC_LOOKUP[propName] &&
            BUILTIN_STRING_STATIC_LOOKUP_REV[BUILTIN_STRING_STATIC_LOOKUP[propName]]
          ) {
            vlog('  - Static String functions ok');
            return true;
          }
          if (
            objName === 'Number' &&
            BUILTIN_NUMBER_STATIC_LOOKUP[propName] &&
            BUILTIN_NUMBER_STATIC_LOOKUP_REV[BUILTIN_NUMBER_STATIC_LOOKUP[propName]]
          ) {
            vlog('  - Static Number functions ok');
            return true;
          }

          // See if the object is a primitive and calling a known builtin on it
          const meta = fdata.globallyUniqueNamingRegistry.get(objName);
          switch (meta.typing?.mustBeType) {
            case 'number': {
              if (
                BUILTIN_NUMBER_METHOD_LOOKUP[propName] &&
                BUILTIN_NUMBER_METHOD_LOOKUP_REV[BUILTIN_NUMBER_METHOD_LOOKUP[propName]]
              ) {
                return true;
              }
              break;
            }
            case 'string': {
              if (
                BUILTIN_STRING_METHOD_LOOKUP[propName] &&
                BUILTIN_STRING_METHOD_LOOKUP_REV[BUILTIN_STRING_METHOD_LOOKUP[propName]]
              ) {
                return true;
              }
            }
          }
        }

        if (AST.isPrimitive(exprNode.callee.object)) {
          const qualifiedName = AST.getPrimitiveType(exprNode.callee.object) + '.' + exprNode.callee.property.name; // Lower cased class `string.charAt`
          if (pcodeSupportedBuiltinFuncs.has(qualifiedName)) {
            vlog('  - yes, this builtin is supported;', qualifiedName);
            return true;
          }
        }
      }

      // Anything else is an exception? Not my problem here.
      vlog('  - No, bad call');
      return false;
    }
    case 'Identifier': {
      // The point here is figuring out whether the value of this ident could possibly spy. Like when coerced to string or number.
      // An identifier is "predictable" when either
      // - it's a built-in value of any kind; they don't spy unless called (TODO: so how do we cover that case?)
      // - it refers to another $free func var
      // - it refers to a constant known to be an immutable value of any kind, most commonly a primitive, actual value irrelevant
      // - it refers to a local var which is not mutated in the free func (it might declare it though)
      //   - with no side effects, the kind/lifetime of the var is irrelevant
      //   - only need to guarantee that the value is immutable at the point of calling the free func
      // - it refers to a local var which is mutated in the free func but not referenced any further after the free func

      if (['undefined', 'NaN', 'Infinity', 'arguments'].includes(exprNode.name)) {
        return true;
      }
      const meta = fdata.globallyUniqueNamingRegistry.get(exprNode.name);
      vlog('  - Ident "', exprNode.name, '", meta typing:', JSON.stringify(meta.typing));
      if (['undefined', 'null', 'boolean', 'number', 'string'].includes(meta.typing.mustBeType) || meta.typing.mustBePrimitive) {
        vlog('    - =ok');
        return true;
      }
      if (
        meta.isConstant &&
        meta.constValueRef?.node.type === 'FunctionExpression' &&
        meta.constValueRef.node.name === '$free'
      ) {
        return true;
      }
      if (
        meta.isConstant &&
        meta.constValueRef &&
        AST.isPrimitive(meta.constValueRef)
      ) {
        return true;
      }

      // rest: tbd

      return false;
    }
    case 'Literal': {
      // I think even a regex is okay here...?
      return true;
    }
    case 'TemplateLiteral': {
      // In normalized code, templates should be guaranteed to only receive expressions known
      // or forced to be a string already. The template expression itself can therefor have no
      // other side effects than the concatenation of two (or three) strings.
      return true;
    }
    case 'BinaryExpression': {
      return isFreeExpression(exprNode.left, fdata) && isFreeExpression(exprNode.right, fdata);
    }
    case 'UnaryExpression': {
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
