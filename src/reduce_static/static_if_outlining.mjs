// If a function only gets called and the first statement is an `if` that tests the arg
// then split up the function into either branch and move the `if` out, eliminating the arg if possible
//
//    function f(x) { if (x) $(a); else $(b); }
//    f(1);
//    f(y);
// ->
//    function f_t() { $(a); }
//    function f_f() { $(b); }
//    if (1) f_t(); else f_f();
//    if (y) f_t(); else f_f();
//

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
  coerce,
  findBodyOffset,
  assertNoDupeNodes,
} from '../utils.mjs';
import * as AST from '../ast.mjs';
import { createFreshVar } from '../bindings.mjs';
import { cloneSimple, cloneSortOfSimple, functionExpressionNormalized, isSimpleNodeOrSimpleMember, normalizeFunction } from '../ast.mjs';
import { SYMBOL_COERCE } from '../symbols_preval.mjs';

export function staticIfOutlining(fdata) {
  group('\n\n\n[staticIfOutlining] Finding static ifs to outline\n');
  //currentState(fdata, 'staticIfOutlining', true, fdata);
  const r = _staticIfOutlining(fdata);
  groupEnd();
  return r;
}
function _staticIfOutlining(fdata) {
  let changes = 0;
  const queue = [];

  fdata.globallyUniqueNamingRegistry.forEach((meta, name) => {
    if (meta.isBuiltin) return;
    if (meta.isCatchVar) return;
    if (meta.isImplicitGlobal) return;
    if (!meta.isConstant) return; // I don't think this really matters. But perhaps in that case we should just skip the lets...
    if (meta.varDeclRef.node.type !== 'FunctionExpression') return;

    vgroup(`- processing function "${name}"`);
    processFunctionName(meta, name);
    vgroupEnd();
  });

  function processFunctionName(funcMeta, funcName) {
    // Verify that
    // - The function is only called, doesn't escape
    // - The function has at least one arg
    // - The function has some kind of expression in the first statement that uses an arg
    // - None of the calls use a spread (and later we can still proceed if the param is before the spread in all calls)
    // - The function is not direct recursive (tests/cases/primitive_arg_inlining/recursion/_base.md). Probably also not indirectly recursive (?)

    const funcRef = funcMeta.varDeclRef;
    const funcNode = funcMeta.varDeclRef.node;

    if (funcNode.$p.readsArgumentsLen || funcNode.$p.readsArgumentsAny) {
      // TODO: We can support this just don't remove the args after outlining them. Replace caller values with `undefined`.
      vlog('- The function uses `arguments` so we should bail');
      return;
    }

    if (funcNode.params.find(p => p.rest)) {
      // TODO: we can support these cases for the non-rest param. And probably one or two cases of the rest as well.
      vlog('- The function has at least one rest param. Bailing for now.');
      return;
    }

    // Try to validate whether function is safe to modify (does not escape, only called, etc)
    if (
      funcMeta.reads.some((read) => {
        // TODO: ignore .call() etc as part of this
        //if (
        //  read.parentNode.type === 'MemberExpression' &&
        //  (
        //    !read.parentNode.computed &&
        //    (
        //      read.parentNode.property.name === 'call' ||
        //      read.parentNode.property.name === 'apply' ||
        //      read.parentNode.property.name === 'bind'
        //    )
        //  )
        //) {
        //  // I think bind is actually irrelevant here.
        //  // I hope I'm not wrong but I think only .call and .apply could observe this change. And maybe .toString, but that's ok. Any other property can't reflect?
        //  vlog(
        //    '- The function is used in a member expression with a non-computed .call, .apply, or .bind. Ignoring this case.',
        //  );
        //  return;
        //}

        if (read.parentNode.type !== 'CallExpression' || read.parentProp !== 'callee') {
          vlog('- The function escapes (at least one read was not a call), bailing');
          return true;
        }

        if (read.parentNode.arguments.some((anode) => anode.type === 'SpreadElement')) {
          // TODO: we can still do this for any params that occur before any spread in all calls
          vlog('- The function was called with a spread at least once, bailing');
          return true;
        }

        if (read.parentNode.arguments.length < funcNode.params.length) {
          // TODO: we can support this for the args that have been passed on and infer `undefined` for the missing ones...
          // (We don't care as much about arg overflow, only underflow)
          vlog('- The function has at least one call where it has fewer args than parameters');
          return true;
        }

        if (read.pfuncNode === funcNode) {
          vlog('- This is a recursive function. It is too dangerous.');
          return true;
        }
      })
    ) {
      return;
    }

    // Okay, we've verified the function is only called, doesn't escape, and gets at least as many args as params in all calls.
    // Find the first statement of the function and check if and how it uses an arg.
    // TODO: in certain cases we can skip statements (ones that can't possibly spy) to try the next statement.

    const stmtOffset = funcNode.$p.bodyOffset;
    ASSERT(funcNode.body.body[stmtOffset - 1]?.type === 'DebuggerStatement', 'The body offset should not be stale');
    let stmt = funcNode.body.body[stmtOffset];
    ASSERT(stmt, 'normalized funcs must at least have a return statement...');

    if (
      funcNode.body.body.length-1 === stmtOffset && // Body has 1 statement? with more than one we risk blowing up the size too much.
      stmt.type === 'IfStatement' &&
      stmt.test.type === 'Identifier' &&
      funcNode.$p.paramNames.includes(stmt.test.name)
    ) {
      // Function starts with an if/else.
      // Test of the If is a param
      // We can try to outline it. It's slightly trickier due to const scoping of parent.
      // We can take two routes
      // - move the `if` to the call site
      //   -   `f(a); function f(b) { if (b) $(x) else {} }`
      //   ->  `if (a) f(a); function f(b) { $(x) }`
      //   -   `const r = f(a); function f(b) { if (b) $(x) else {} }`
      //   ->  `if (a) const r = f(a); function f(b) { $(x) }` , oops
      //   - also, this won't work if both branches have code, which leads us to the next option
      // - we split the function and update the callsite where possible
      //   - `f(a); function f(b) { if (b) $(x) else $(y) }`
      //   - `f2(a); function f(b) { if (b) f1(b); else f2(b); } function f1(b) { $(x) } function f2(b) { $(y) }`
      //     - risk of bouncy transform recursion
      //   - `f2(false); function f1(b) { $(x) } function f2(b) { $(y) }`
      // - we split the function and compile an `if` at callsite
      //   - `f(a); function f(b) { if (b) $(x) else $(y) }`
      //   - `if (a) f1(a); else f2(a); function f1(b) { $(x) } function f2(b) { $(y) }`
      //   - this has the same binding scope issues as before, of course
      // For the scope issues, we could also detect the binding case and create a let binding above the if
      // - this kind of feels like a step back since we aim to create constants
      // - `let r; if (a) r = f(a); function f(b) { $(x) }`
      // - still, may be best?

      vlog('- First and only statement is an If');

      const paramIndex = funcNode.$p.paramNameToIndex.get(stmt.test.name);
      ASSERT(paramIndex >= 0 && paramIndex < funcNode.params.length, 'map should be legit and cache should not be stale');

      const f1 = AST.functionExpressionNormalized(
        funcNode.params.map((_, i) => funcNode.$p.paramIndexToName.get(i) ?? '_'),
        stmt.consequent.body,
        {generator: funcNode.generator, async: funcNode.async}
      );
      const f2 = AST.functionExpressionNormalized(
        funcNode.params.map((_, i) => funcNode.$p.paramIndexToName.get(i) ?? '_'),
        stmt.alternate.body,
        {generator: funcNode.generator, async: funcNode.async}
      );

      const funcName1 = createFreshVar(`${funcName}_t`, fdata);
      const funcName2 = createFreshVar(`${funcName}_f`, fdata);

      const fbody = funcRef.varDeclBody;
      const findex = funcRef.varDeclIndex;

      queue.push({
        index: findex,
        func: () => {
          rule('Outline the first If in a function when conditions are met; step 1/2, split function');
          example('function f(a) { if (a) $(1); else $(s); } f(0); f(1);', 'function f1(a) { $(1); } function f2(a) { $(2); } if (0) f1(0); else f2(0); if (1) f1(1); else f2(1);')
          before(fbody[findex]);

          fbody.splice(findex, 1,
            AST.varStatement('const', funcName1, f1),
            AST.varStatement('const', funcName2, f2),
          );

          after(fbody[findex]);
          after(fbody[findex+1]);
        }
      });

      // Now convert all call sites
      funcMeta.reads.forEach(read => {
        const cblock = read.blockBody;
        const cindex = read.blockIndex;

        queue.push({
          index: cindex,
          func: () => {
            rule('Outline the first If in a function when conditions are met; step 2/2, wrap callers in if/else');
            example('function f(a) { if (a) $(1); else $(s); } f(0); f(1);', 'function f1(a) { $(1); } function f2(a) { $(2); } if (0) f1(0); else f2(0); if (1) f1(1); else f2(1);')
            before(cblock[cindex]);

            const block1 = AST.blockStatement();
            const block2 = AST.blockStatement();

            if (cblock[cindex].type === 'ExpressionStatement') {
              if (cblock[cindex].expression.type === 'CallExpression') {
                // Statement is just the call to the function. Easiest case.
                block1.body.push(
                  AST.expressionStatement(
                    AST.callExpression(funcName1, read.parentNode.arguments.map(node => AST.cloneSimple(node)))
                  )
                );
                block2.body.push(
                  AST.expressionStatement(
                    AST.callExpression(funcName2, read.parentNode.arguments.map(node => AST.cloneSimple(node)))
                  )
                );
              }
              else if (cblock[cindex].expression.type === 'AssignmentExpression') {
                // Statement is assigning the call to the function. Simple case
                block1.body.push(
                  AST.expressionStatement(
                    AST.assignmentExpression(
                      AST.cloneSimple(cblock[cindex].expression.left),
                      AST.callExpression(funcName1, read.parentNode.arguments.map(node => AST.cloneSimple(node)))
                    )
                  )
                );
                block2.body.push(
                  AST.expressionStatement(
                    AST.assignmentExpression(
                      AST.cloneSimple(cblock[cindex].expression.left),
                      AST.callExpression(funcName2, read.parentNode.arguments.map(node => AST.cloneSimple(node)))
                    )
                  )
                );
              }
              else {
                ASSERT(false, 'in normalized code, a call would be a statement expression, rhs of an assignment, or init of var decl. this is an expression so it must be one of the two and wasnt');
              }

              cblock[cindex] = AST.ifStatement(
                AST.cloneSimple(read.parentNode.arguments[paramIndex] ?? AST.isUndefined()),
                block1, block2
              )
            }
            else if (cblock[cindex].type === 'VarStatement') {
              // Meh.
              // We replace the decl with the if and prepend a let decl instead. Let other rules clean that up.
              const declName = cblock[cindex].id.name;
              block1.body.push(
                AST.expressionStatement(
                  AST.assignmentExpression(
                    AST.identifier(declName),
                    AST.callExpression(funcName1, read.parentNode.arguments.map(node => AST.cloneSimple(node)))
                  )
                )
              );
              block2.body.push(
                AST.expressionStatement(
                  AST.assignmentExpression(
                    AST.identifier(declName),
                    AST.callExpression(funcName2, read.parentNode.arguments.map(node => AST.cloneSimple(node)))
                  )
                )
              );

              cblock.splice(cindex, 1,
                AST.varStatement('let', declName, AST.undef()),
                AST.ifStatement(
                  AST.cloneSimple(read.parentNode.arguments[paramIndex] ?? AST.isUndefined()),
                  block1, block2
                )
              );
            }

            after(cblock[cindex]);
          }
        });
      });


      ++changes;
      return;
    }

    vlog('  - nope.');
  }

  if (changes) {
    vgroup('Unrolling call queue now:');

    queue.sort(({ index: a }, { index: b }) => b - a);
    queue.forEach(({ index, func }) => {
      ASSERT(typeof index === 'number', 'must queue a number...', index);
      func()
    });

    vgroupEnd();

    log('Static ifs outlined:', changes, '. Restarting from normalization\n');
    return {what: 'staticIfOutlining', changes: changes, next: 'normal'};
  }
  log('Static ifs outlined: 0.\n');
}
