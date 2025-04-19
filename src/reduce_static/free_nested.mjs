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
import { ASSERT, log, group, groupEnd, vlog, vgroup, vgroupEnd, fmat, tmat, rule, example, before, source, after, findBodyOffset, todo, assertNoDupeNodes } from '../utils.mjs';
import * as AST from '../ast.mjs';
import { BUILTIN_GLOBAL_FUNC_NAMES } from '../globals.mjs';
import { cloneSimple, getExpressionFromNormalizedStatement } from '../ast.mjs';
import { createFreshLabelStatement } from '../labels.mjs';
import { SYMBOL_COERCE, SYMBOL_DOTCALL, SYMBOL_FRFR } from '../symbols_preval.mjs';
import { BUILTIN_SYMBOLS } from '../symbols_builtins.mjs';

export function freeNested(fdata, $prng, usePrng = true) {
  group('\n\n\nSearching for nested free calls to flatten\n');
  const r = _freeNested(fdata, $prng, usePrng);
  groupEnd();
  return r;
}
function _freeNested(fdata, $prng, usePrng) {
  let changed = 0;

  walk(_walker, fdata.tenkoOutput.ast, 'ast');
  function _walker(blockNode, beforeWalk, nodeType, path) {
    if (blockNode.type === 'FunctionExpression' && blockNode.id?.name === '$free') {
      ASSERT(beforeWalk, 'we dont visit these funcs after processing so the walker should not go back up through them');
      vgroup('Checking free func:', path.nodes[path.nodes.length - 2].id.name);
      processFreeFunction(blockNode, path.nodes[path.nodes.length - 2]);
      vgroupEnd();
      return true; // Do not walk $free functions
    }
  }

  if (changed) {
    log('Nested free calls flattened:', changed, '. Restarting from phase1');
    return {what: 'freeNested', changes: changed, next: 'phase1'};
  }

  log('Nested free calls flattened: 0.');

  function processFreeFunction(funcNode, parentNode) {
    ASSERT(funcNode.id.name === '$free', 'this is the key indicator that this is a $free function');
    const freeFuncName = parentNode.id.name;

    // Confirm that the function is still useful. It may have been reduced to such simplicity that it can be folded up.
    // This happens when the function is created while the statements could still be simplified.

    const body = funcNode.body.body;

    if (body.length - funcNode.$p.bodyOffset === 1) {
      const last = body[body.length - 1];
      ASSERT(last?.type === 'ReturnStatement', '$free functions should always result in a return...', last);

      // Get the function alias for this $free func
      const funcAlias =
        parentNode.type === 'VarStatement'
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
        before(parentNode);
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
      stmt.type === 'VarStatement' &&
      // And then return this value
      last.type === 'ReturnStatement' &&
      // If not then bail. Most likely another trick will fix it for us.
      last.argument.type === 'Identifier' && last.argument.name === stmt.id.name
    ) {
      // Get the function alias for this $free func
      const funcAlias =
        parentNode.type === 'VarStatement'
        ? parentNode.id.name
        : parentNode.type === 'AssignmentExpression' && parentNode.left.type === 'Identifier'
        ? parentNode.left.name
        : ASSERT(false, 'what', parentNode);

      const init = stmt.init;
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
        before(parentNode);
        before(read.blockBody[read.blockIndex]);

        // Find all idents and map them back to the original arg inputs

        let finalNode;
        if (initIsPrimitive) {
          finalNode = AST.primitive(AST.getPrimitiveValue(init));
        }
        else {
          switch (init.type) {
            case 'Identifier': {
              finalNode = valueNodeToArgNode(init, funcNode, callNode);
              break;
            }
            case 'CallExpression': {
              // Must do the arg swap for both the callee (which may be a member) and every arg
              const callee = init.callee;
              let newCallee;
              if (callee.type === 'Identifier') {
                newCallee = AST.cloneSimple(valueNodeToArgNode(callee, funcNode, callNode))
              }
              else if (callee.type === 'MemberExpression') {
                if (callee.computed) {
                  newCallee = AST.memberExpression(
                    AST.cloneSimple(valueNodeToArgNode(callee.object, funcNode, callNode)),
                    AST.cloneSimple(valueNodeToArgNode(callee.property, funcNode, callNode)),
                    true
                  );
                } else {
                  newCallee = AST.memberExpression(
                    AST.cloneSimple(valueNodeToArgNode(callee.object, funcNode, callNode)),
                    AST.cloneSimple(callee.property),
                  );
                }
              }
              else {
                // I guess it's a primitive now? Or what...
                newCallee = AST.cloneSimple(callee)
              }

              finalNode = AST.callExpression(
                newCallee,
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
              finalNode = AST.cloneSimpleOrTemplate(init);
              finalNode.expressions = init.expressions.map(e => valueNodeToArgNode(e, funcNode, callNode));

              ASSERT(finalNode.quasis.length === finalNode.expressions.length+1, 'quasi:expr ratio mismatch', finalNode.quasis, finalNode.expressions);
              break;
            }
            case 'Literal': {
              ASSERT(init.raw.startsWith('/'), 'literal should be regex literal', init);
              finalNode = AST.cloneSortOfSimple(init);
              break;
            }
            case 'UnaryExpression': {
              finalNode = AST.unaryExpression(init.operator, valueNodeToArgNode(init.argument, funcNode, callNode));
              break;
            }
            default: {
              ASSERT(false, 'support this type', init, init.type);
            }
          }
        }

        if (read.grandIndex < 0) read.grandNode[read.grandProp] = finalNode;
        else read.grandNode[read.grandProp][read.grandIndex] = finalNode;

        after(read.blockBody[read.blockIndex]);
        changed += 1;
      });

      return;
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

      if (body[index].type === 'VarStatement' || body[index].type === 'ExpressionStatement') {
        const expr = getExpressionFromNormalizedStatement(body[index]);
        const isFrfr = expr.type === 'CallExpression' && expr.callee.type === 'Identifier' && expr.callee.name === '$frfr';

        if (isFrfr && body[index].type === 'ExpressionStatement' && body[index].expression === expr) {
          // This is dead code. A $frfr has no side effects by definition and its resulting value is not used. We should eliminate this.

          rule('A $frfr that is an expression statement is dead code');
          example('$frfr(func, a, b);', 'a; b;');
          before(body[index]);

          body[index] = AST.emptyStatement();

          after(body[index]);
          changed += 1;
          continue;
        }

        if (isFrfr) {
          const frfrCallArgs = expr.arguments;

          // A $frfr that is called from inside a $free func can collapse its argument into
          // that function if the called $free func is only referenced once.
          // Yes, in theory there's no condition to it, but we want to reduce code bloat so that's the line.
          ASSERT(frfrCallArgs[0]?.type === 'Identifier', 'we control $frfr and the first arg must be the free func to call');
          const calledFreeFuncName = frfrCallArgs[0].name;
          const calledFreeMeta = fdata.globallyUniqueNamingRegistry.get(calledFreeFuncName);
          const calledFreeFuncNode = calledFreeMeta.varDeclRef.node;
          ASSERT(calledFreeMeta);
          // This one tripped before when making globals args, which included nested frfr calls, which then trips this
          ASSERT(calledFreeFuncNode?.type === 'FunctionExpression', 'expecting the first argument to $frfr to be a var decl whose init is a function', frfrCallArgs[0], ' init:', calledFreeMeta.varDeclRef.node, stmt);
          ASSERT(calledFreeFuncNode.id?.name === '$free', '$frfr should be calling $free functions');

          // Note: calledFreeFuncNode.params should have a .$p.paramVarDeclRef at this point if they have a local const. They may not.

          if (calledFreeFuncName === freeFuncName) {
            // Do not collapse recursive $frfr calls. That's gonna be an implosion or smth :p
            // Should not happen though since we only target a function that is read only once
            // and a function calls itself is dead code. But maybe it occurs as an artifact.
            vlog('Found frfr call but it was recursive;', freeFuncName);
          }

          else if (calledFreeMeta.reads.length === 1) {
            vlog('Found a $frfr calling a $free function inside another $free function, and the called function is only read once. We can squash the $frfr call here.');

            // To make it easier (or lazy?) we will inline the called function verbatim and patch
            // the arg names to param names through const aliasing and have other rules clean that up
            // Otherwise we'd have to rename the whole thing.

            rule('A $frfr called inside a $free function can be squashed if the called function is only referenced once');
            example(
              'const f = function $free(){ const z = $frfr(g, b); }; const g = function $free(y) { const x = Math.pow(y); return x; }',
              'const f = function $free(){ const y = b; const x = Math.pow(y); const z = x; };',
            );
            before(body[index], calledFreeFuncNode);

            // The safe way to inline this function is to
            // - create a const for all params of the inner free func that are used
            //   - move the call.arguments[n] to their init
            //   - the name should be the real name, not $$1 of course
            // - find the variable to which the return value of this function is assigned
            //   - if there is none this function is dead code
            // - if the function has more than one return statement, wrap the body in a label
            //   - all returns except the last must break to this label instead
            // - the last return is always in the root of the func, but when there is more than one return
            //   - if the result is assigned to a var decl
            //     - we must create a let decl for it at the top
            //     - all returns must assign their original arg to this decl before breaking (last stmt won't have this break, just the assign)
            // - when there is only one return, we can simply move the var decl to that return, it's much easier

            const returns = [];
            walk(_returner, calledFreeFuncNode.body, 'ast');
            function _returner(node, beforeWalk, nodeType, path) {
              if (beforeWalk && nodeType === 'ReturnStatement') {
                const parentNode = path.nodes[path.nodes.length - 2];
                const parentProp = path.props[path.props.length - 1];
                const parentIndex = path.indexes[path.indexes.length - 1];
                returns.push({parentNode, parentProp, parentIndex, node});
              }
              ASSERT(nodeType !== 'FunctionExpression');
            }

            ASSERT(returns.length > 0, 'normalized funcs should at least end with a return statement');

            const labelStatementNode =
              returns.length > 1
              ? AST.blockStatement(createFreshLabelStatement('$defree', fdata, calledFreeFuncNode.body))
              : calledFreeFuncNode.body

            vlog('- will wrap body in fresh label if it has more than one return statement:', returns.length > 1);
            if (returns.length > 1) {
              vlog('  - replacing all returns with a break to fresh label:', labelStatementNode.body[0].label.name);
              returns.forEach(({parentNode, parentIndex}) => {
                parentNode.body[parentIndex] = AST.breakStatement(labelStatementNode.body[0].label.name);
              });
            }

            vgroup('- move call arg nodes to the var decl for each used param');
            before(calledFreeFuncNode);
            for (let i=0; i<calledFreeFuncNode.body.body.length; ++i) {
              const bnode = calledFreeFuncNode.body.body[i];
              vlog('-', bnode.type);
              if (bnode.type === 'DebuggerStatement') {
                calledFreeFuncNode.body.body[i] = AST.emptyStatement(); // Drop the debugger statement. We won't need it anymore.
                break;
              }
              ASSERT(bnode.type === 'VarStatement', 'should not find this/arguments or anything else in the func header', calledFreeFuncNode.body.body, i, bnode.type);

              const init = bnode.init;
              ASSERT(init.type === 'Param', '$free funcs shouldnt get this or arguments aliases and we would stop before finding Debugger so what is this?', bnode);

              // Find the parameter index, then get the argument at that index and move it here.
              // We asserted above that the param.$p.paramVarDeclRef is set
              ASSERT(init.index >= 0, 'param is as param do', init);
              ASSERT(calledFreeFuncNode.params[init.index]?.index === init.index, 'index should refer to proper func param', init.index, calledFreeFuncNode.params);

              // Updating the init. Note that the frfr first arg is the function, so map the 1-offset.
              bnode.init = frfrCallArgs[init.index + 1];
            }
            after(calledFreeFuncNode);
            vgroupEnd();
            assertNoDupeNodes(body, 'body');

            // The statement is either a var decl or an assignment. Assignments are easier. Keep the statement either way. The body is injected AFTER it.
            vgroup('- replace original call statement with an empty var decl or empty statement');
            before(funcNode);
            let lhs;
            if (body[index].type === 'VarStatement') {
              // Keep the decl but make it a let and init to undefined
              lhs = body[index].id;
              body[index].init = AST.identifier('undefined'); // TODO: Should be init value type matching return type
              body[index].kind = 'let';
            } else {
              ASSERT(body[index].type === 'ExpressionStatement' && body[index].expression.type === 'AssignmentExpression');
              lhs = body[index].expression.left;
              // Drop the original assignment to make body flattening simpler
              body[index] = AST.emptyStatement();
            }
            after(funcNode);
            vgroupEnd();

            vgroup('- add a return-assignment to all previous', returns.length, 'returns');
            before(calledFreeFuncNode);
            if (returns.length > 1) {
              // Prepend the assignment
              returns.forEach(({parentNode, parentIndex, node}) => {
                parentNode.body.splice(parentIndex, 0, AST.expressionStatement(AST.assignmentExpression(cloneSimple(lhs), cloneSimple(node.argument))));
              });
            } else {
              // Replace the return
              returns[0].parentNode.body[returns[0].parentIndex] = AST.expressionStatement(AST.assignmentExpression(cloneSimple(lhs), returns[0].node.argument));
            }
            after(calledFreeFuncNode);
            vgroupEnd();

            vlog('- move func block to parent');
            // Inject immediately _AFTER_ the original call statement.
            body.splice(index+1, 0, ...labelStatementNode.body);

            vlog('- Remove the eliminated function');
            calledFreeMeta.varDeclRef.varDeclBody[calledFreeMeta.varDeclRef.varDeclIndex] = AST.emptyStatement();

            vlog('- should be finished!');

            vlog('Final result:');
            after(funcNode);

            assertNoDupeNodes(body, 'body');

            changed += 1;
            return true;
          }
        }
      }
    }

    vlog('Found no further frf calls');
  }

  function valueNodeToArgNode(valueNode, funcNode, callNode) {
    ASSERT(valueNode);
    ASSERT(funcNode);
    ASSERT(callNode);

    if (valueNode.type === 'Identifier' && !AST.isPrimitive(valueNode)) {
      const targetName = valueNode.name;
      const n = funcNode.$p.paramNameToIndex.get(targetName);
      if (n >= 0) {
        return callNode.arguments[n+1] ? AST.cloneSimple(callNode.arguments[n+1]) : AST.identifier('undefined');
      } else {
        // In this case we have an argument that is an ident that is not recorded as a local function.
        // Then this ought to be a global (builtin or explicit), which would not be passed in as an arg.
        ASSERT(
          targetName === '$' ||
          targetName === SYMBOL_FRFR ||
          targetName === SYMBOL_DOTCALL ||
          targetName === SYMBOL_COERCE || // I think this should be eliminated in free funcs? but eh
          BUILTIN_GLOBAL_FUNC_NAMES.has(targetName) ||
          BUILTIN_SYMBOLS.has(targetName) ||
          fdata.globallyUniqueNamingRegistry.get(targetName)?.varDeclRef?.node?.$p.blockChain === '1,',
          'if there is no arg then the var must refer to a global of sorts', targetName, BUILTIN_GLOBAL_FUNC_NAMES.has(targetName)
        );
        return AST.identifier(targetName);
      }
    } else {
      return AST.cloneSimpleOrTemplate(valueNode);
    }
  }
}
