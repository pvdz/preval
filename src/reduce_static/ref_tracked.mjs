// Ref tracking tricks
// Note: this only applies to explicit bindings that are not closures. Certain rules apply only to var binding (not catch etc)
// - [x]: A read that can reach only one write and that write is assigning a primitive -> replace read with primitive
// - [x]: A binding that can't reach any write -> add a TDZ throw
// - [x]: A write that has no reads -> eliminate (keep rhs)
// - [x]: A binding with only writes can be eliminated? TDZ concerns notwithstanding

import { ASSERT, log, group, groupEnd, vlog, vgroup, vgroupEnd, rule, example, before, source, after, findBodyOffset, tmat, assertNoDupeNodes, currentState } from '../utils.mjs';
import * as AST from '../ast.mjs';

export function refTracked(fdata) {
  group('\n\n\n[refTracked] Looking ref-tracking tricks to apply\n');
  //currentState(fdata, 'refTracked', true, fdata);
  const r = _refTracked(fdata);
  groupEnd();
  return r;
}
function _refTracked(fdata) {
  let changed = 0;

  const queue = [];
  const queue2 = []; // unwind after first queue. unconditional actions that should not depend on index caches but might break them anyways.

  fdata.globallyUniqueNamingRegistry.forEach((meta, name) => {


    if (meta.isImplicitGlobal) return;
    if (meta.isBuiltin) return;

    if (meta.singleScoped) {
      // Ref tracking only works for vars that appear in one (func) scope. No closures.
      vgroup('- `' + name);
      processSingleScopedBinding(meta, name);
      vgroupEnd();
    }

    // We must check from the func expr because we can't get the name of the func from a given param decl. Not here.
    // In this case, we want to know if a param is only used in recursive calls, so
    if (
      meta.isConstant && // For now. We may also be able to support the let case but I'm afraid it's a bit harder to do.
      meta.writes.length === 1 &&
      meta.writes[0].kind === 'var' &&
      meta.writes[0].parentNode.init.type === 'FunctionExpression' &&
      !meta.writes[0].parentNode.init.$p.readsArgumentsAny
    ) {
      // This is a constant function binding. Find the pattern: `function f(a) { f(a); }`
      const funcNode = meta.writes[0].parentNode.init;
      funcNode.params.forEach(pnode => {
        if (pnode.$p.paramVarDeclRef?.name) {
          const pmeta = fdata.globallyUniqueNamingRegistry.get(pnode.$p.paramVarDeclRef.name)
          if (pmeta.reads.every(read => {
            return (
              read.parentNode.type === 'CallExpression' &&
              read.parentProp === 'arguments' && // read is used as an arg in this call
              read.parentNode.callee.type === 'Identifier' &&
              read.parentNode.callee.name === meta.writes[0].parentNode.id.name // call is calling the function above
            );
          })) {
            // Every read for this param was in a call to the same function name. If arguments is not
            // used, we should be able to drop it, regardless of whether the function escapes.

            pmeta.reads.every(read => {
              rule('Param that is only used in func calls to the same name as original func, is an unused param');
              example('function f(a) { f(a); }', 'function f() { f(); }');
              before(read.parentNode);
              read.parentNode.arguments[read.parentIndex] = AST.identifier('undefined')
              after(read.parentNode);
              changed += 1;
            });
          }
        }
      });
    }

  });
  assertNoDupeNodes(fdata.tenkoOutput.ast, 'body');

  function processSingleScopedBinding(meta, varName) {

    if (!meta.reads.length) {
      vgroup('  This binding has no reads and', meta.writes.length,'writes. We should try to eliminate the writes;', meta.writes.map(write => write.kind));
      meta.writes.forEach(write => {
        vlog('- write', write.kind, write.parentNode.type);
        if (write.kind === 'var') {
          if (meta.writes.every(write => write.kind === 'assign' || write.kind === 'var')) {
            vlog('  - queued');
            queue.push({
              index: write.blockIndex,
              func: () => {
                // Covered by tests/cases/arguments/arg_spread_stmt2.md
                rule('A binding with only writes can be eliminated; var decl');
                example('let x = 1; x = 2; x = 3;', '1; 2; 3;');
                before(write.blockBody[write.blockIndex]);

                const expr = write.parentNode.init;
                if (expr.type === 'Param' || expr.type === 'FunctionExpression' || AST.isPrimitive(expr)) {
                  write.blockBody[write.blockIndex] = AST.emptyStatement();
                } else {
                  write.blockBody[write.blockIndex] = AST.expressionStatement(expr);
                }

                after(write.blockBody[write.blockIndex]);
                assertNoDupeNodes(write.blockBody, 'body', true);
              }
            });
            ++changed;
            return;
          } else {
            // keep; binding used in export or something?
            vlog('  - not queued because there was a non-var non-assign write');
          }
        }
        else if (write.kind === 'assign') {
          vlog('  - queued');
          queue.push({
            index: write.blockIndex,
            func: () => {
              // Covered by tests/cases/arr_mutation/loop_access_of_const.md
              rule('A binding with only writes can be eliminated; var decl');
              example('let x = 1; x = 2; x = 3;', '1; 2; 3;');
              before(write.blockBody[write.blockIndex]);

              const expr = write.parentNode.right;
              if (expr.type === 'Param' || expr.type === 'FunctionExpression' || AST.isPrimitive(expr)) {
                write.blockBody[write.blockIndex] = AST.emptyStatement();
              } else {
                write.blockBody[write.blockIndex] = AST.expressionStatement(expr);
              }

              after(write.blockBody[write.blockIndex]);
              assertNoDupeNodes(write.blockBody, 'body', true);
            }
          });
          ++changed;
          return;
        }
        else {
          vlog('  - not queued because kind =', write.kind);
        }
      });
      vgroupEnd();
      return;
    }

    meta.rwOrder.forEach((ref => {
      if (ref.kind === 'read') {
        const read = ref;
        ASSERT(read.reachesWrites, 'ref tracking should create this');
        if (read.reachesWrites.size === 0) {
          if (read.blockBody[read.blockIndex + 1]?.type !== 'ThrowStatement') {
            // TDZ? We should have written a TDZ throw for these non-closure cases before phase2 ... I think?
            // We should be able to safely deconstruct this assignment and let other rules cleanup the fallout.

            // Covered by tests/cases/normalize/binding/for-header-pattern-rhs-scoping-tdz.md
            rule('Read that cannot see any writes can be eliminated');
            example('a = b', 'a; b;');
            before(read.blockBody[read.blockIndex]);

            const stringArg = tmat(read.blockBody[read.blockIndex], true).replace(/\n.*/g, ' ').trim();
            const stringArgTrunced = stringArg.slice(0, 50) + (stringArg.length > 50 ? ' ...' : '');
            read.blockBody[read.blockIndex] =
              AST.throwStatement(AST.primitive(`Preval: This statement contained a read that reached no writes: ${stringArgTrunced}`));

            after(read.blockBody[read.blockIndex]);
            assertNoDupeNodes(read.blockBody, 'body', true);
            ++changed;
            return;
          }
        }
        else if (read.reachesWrites.size === 1) {
          const write = Array.from(read.reachesWrites)[0];
          // Note: the write may be a catch etc. Explicitly check for the var decl or assignment cases. Ignore the rest.
          if (write.parentNode.type === 'AssignmentExpression') {
            // TODO: same if it's a builtin or other "predictable" value. But maybe another rule would already do this anyways?
            assertNoDupeNodes(read.blockBody, 'body', true);
            const rhs = write.parentNode.right;
            if (AST.isPrimitive(rhs)) {
              const newNode = AST.primitive(AST.getPrimitiveValue(rhs));

              if (rhs.type === 'TemplateLiteral' && read.parentNode.type === 'TemplateLiteral') {
                // Prevent doing `a${`b`}` because that requires another normalization pass.
                // So here just apply the concat.
                rule('A read that can only reach one write and that write assigns a string can be replaced by the primitive value; rhs string concat');
                example('const x = "b"; const y = \`a\${x}c\`;', 'const x = "b"; const y = \`abc\`;');
                before(read.blockBody[read.blockIndex]);

                ASSERT(rhs.expressions.length === 0, 'the template should be a string, not a concat', rhs);
                ASSERT(read.parentIndex >= 0, 'should be an expression in teh template', read);

                read.parentNode[read.parentProp][read.parentIndex] = newNode;
                const squashedNode = AST.normalizeTemplateSimple(read.parentNode);
                if (read.grandIndex < 0) read.grandNode[read.grandProp] = squashedNode;
                else read.grandNode[read.grandProp][read.grandIndex] = squashedNode;

                after(read.blockBody[read.blockIndex]);
                ++changed;
                assertNoDupeNodes(read.blockBody, 'body', true);
                return;
              } else {
                // Covered by tests/cases/arr_mutation/arr_loop_case_assign.md
                rule('A read that can only reach one write and that write assigns a primitive can be replaced by the primitive value; rhs');
                example('x = 10; f(x);', 'x = 10; f(10);');
                before(read.blockBody[read.blockIndex]);

                if (read.parentIndex < 0) read.parentNode[read.parentProp] = newNode;
                else read.parentNode[read.parentProp][read.parentIndex] = newNode;

                after(read.blockBody[read.blockIndex]);
                ++changed;
                assertNoDupeNodes(read.blockBody, 'body', true);
                return;
              }
            } else {
              vlog('RHS is not a primitive:', rhs.type);
            }
          }
          else if (write.parentNode.type === 'VarStatement') {
            // TODO: same if it's a builtin or other "predictable" value. But maybe another rule would already do this anyways?
            const init = write.parentNode.init;
            if (AST.isPrimitive(init)) {
              const newNode = AST.primitive(AST.getPrimitiveValue(init));

              if (init.type === 'TemplateLiteral' && read.parentNode.type === 'TemplateLiteral') {
                // Prevent doing `a${`b`}` because that requires another normalization pass.
                // So here just apply the concat.
                rule('A read that can only reach one write and that write assigns a string can be replaced by the primitive value; init string concat');
                example('const x = "b"; const y = \`a\${x}c\`;', 'const x = "b"; const y = \`abc\`;');
                before(read.blockBody[read.blockIndex]);

                ASSERT(init.expressions.length === 0, 'the template should be a string, not a concat', init);
                ASSERT(read.parentIndex >= 0, 'should be an expression in teh template', read);

                read.parentNode[read.parentProp][read.parentIndex] = newNode;
                const squashedNode = AST.normalizeTemplateSimple(read.parentNode);
                if (read.grandIndex < 0) read.grandNode[read.grandProp] = squashedNode;
                else read.grandNode[read.grandProp][read.grandIndex] = squashedNode;

                after(read.blockBody[read.blockIndex]);
                ++changed;
                assertNoDupeNodes(read.blockBody, 'body', true);
                return;
              } else {
                // Covered by tests/cases/_base/concat.md
                rule('A read that can only reach one write and that write assigns a primitive can be replaced by the primitive value; init');
                example('const x = 10; f(x);', 'const x = 10; f(10);');
                before(read.blockBody[read.blockIndex]);

                if (read.parentIndex < 0) read.parentNode[read.parentProp] = newNode;
                else read.parentNode[read.parentProp][read.parentIndex] = newNode;

                after(read.blockBody[read.blockIndex]);
                ++changed;
                assertNoDupeNodes(read.blockBody, 'body', true);
                return;
              }
            } else {
              vlog('Init is not a primitive:', write.parentNode.init.type);
            }
          }
          else {
            ASSERT(false, 'what else might cause this?', write.parentNode.type);
            return;
          }
        }
      }
      else if (ref.kind === 'assign' || ref.kind === 'var') {
        const write = ref;
        ASSERT(write.reachedByReads, 'ref tracking should create this');
        ASSERT(write.reachedByWrites, 'ref tracking should create this');

        if (write.reachedByReads.size === 0) {
          if (ref.kind === 'assign') {
            // TODO: this works fine for complex nodes too but in that case tainting other binding caches (rhs or lhs) is a risk. Not for primitives.
            //if (AST.isPrimitive(write.parentNode.right)) {
              queue.push({
                index: write.blockIndex,
                func: () => {
                  if (meta.isConstant) {
                    // This is supposed to be a constant so a write should trigger an error.
                    // As such this write is not completely dead, even though it's write could
                    // never be observed other than the crash happening. We gotta keep it.
                    rule('A write to a constant should be kept even if the write cannot be read');
                    example('const x = 1; x = 2; x = 3;', 'let x = 1; x; 2; throw new Error();');
                    before(write.blockBody[write.blockIndex]);

                    write.blockBody[write.blockIndex] = AST.throwStatement(
                      AST.primitive(
                        `Preval: Assignment to constant variable: \`${tmat(write.blockBody[write.blockIndex], true)}\``
                      )
                    )
                    after(write.blockBody[write.blockIndex]);
                  } else {
                    rule('A write that is not reached by any read can be eliminated; assign');
                    example('let x = 1; x = 2; x = 3;', 'let x = 1; x; 2; x = 3;');
                    before(write.blockBody[write.blockIndex]);

                    if (AST.isPrimitive(write.parentNode.right) || write.parentNode.right.type === 'Param') {
                      write.blockBody[write.blockIndex] = AST.expressionStatement(write.parentNode.left);
                      after(write.blockBody[write.blockIndex]);
                    } else {
                      write.blockBody.splice(
                        write.blockIndex, 1,
                        AST.expressionStatement(write.parentNode.left),
                        AST.expressionStatement(write.parentNode.right)
                      );
                      after(write.blockBody[write.blockIndex]);
                      after(write.blockBody[write.blockIndex + 1]);
                      assertNoDupeNodes(write.blockBody, 'body', true);
                    }
                  }
                }
              });
              ++changed;
              return;
            //} else {
            //  vlog('RHS is not a primitive:', write.parentNode.right.type);
            //}
          }
          else if (ref.kind === 'var') {
            // TODO: same if it's a builtin or other "predictable" value. But maybe another rule would already do this anyways?
            // Ignore primitives to prevent infinite transform loop with the "conditionally initliazed lets" rule.
            // There is room for improvement here; in particular deduping large strings.
            if (!AST.isPrimitive(write.parentNode.init)) {
              queue.push({
                index: write.blockIndex,
                func: () => {
                  rule('A write that is not reached by any read can be eliminated; var');
                  example('let x = {}; x = 2;', 'let x = 1; 1; x = 2;');
                  before(write.blockBody[write.blockIndex]);

                  if (write.parentNode.init.type !== 'Param') {
                    write.blockBody.splice(write.blockIndex, 0, AST.expressionStatement(write.parentNode.init));
                  }
                  // Use something that is truthy. The value can't be falsy because that would have to be a primitive
                  // and those won't get here. Using a truthy value causes some tricks to still succeed like
                  // `let x = {}; ... x = function(){}; if (x) ...` where x is only assigned truthys.
                  // If the value is not a primitive then we should probably check the typing stuff too.
                  write.parentNode.init = AST.primitive(1);

                  after(write.blockBody[write.blockIndex]);
                  after(write.blockBody[write.blockIndex + 1]);
                  assertNoDupeNodes(write.blockBody, 'body', true);
                }
              });

              ++changed;
              return;
            } else {
              vlog('Init is not a primitive:', write.parentNode.init.type);
            }
          }
          else {
            ASSERT(false, 'what else might cause this?', write.parentNode.type);
            return;
          }

          return;
        }
      }
    }));

    if (
      meta.writes.length > 0 &&
      meta.reads.length > 0 &&
      meta.writes[0].kind === 'var' &&
      AST.isPrimitive(meta.writes[0].parentNode.init)
    ) {
      // This one could be a trick on its own but: when a single scope binding is only used inside one inner block scope
      // and the init is non-observable, the binding should move to be inside that block scope too.
      // `let x = 1; if (y) { while (true) { x = 2; ...; } $(x); }`
      // ->
      // `if (y) { let x = 1; while (true) { x = 2; ...; } $(x); }`
      // Less trivial example covered by this rule at the time of writing: tests/cases/ref_tracking/inside_use_promo_complex.md

      const write = meta.writes[0];
      if (
        meta.reads.every(read => read.blockChain.startsWith(write.blockChain) && write.blockChain < read.blockChain) &&
        (meta.writes.length === 1 || meta.writes.every((w,i) => i===0|| (w.blockChain.startsWith(write.blockChain) && write.blockChain < w.blockChain)))
      ) {
        // This is a single scoped variable and all reads all subsequent writes occur in a block
        // nested to the var decl block. Now confirm that they all share the same parent block.
        const read0 = meta.reads[0];
        // blockChains are like `23,45,32,` so provided the read was longer than the write, there must be
        // something and not just a comma. we can split by comma and take the first part which yields a
        // $p.pid as string. That's the block pid we'll confirm and search for.
        const pid = read0.blockChain.slice(write.blockChain.length).split(',')[0];
        if (!pid) {
          console.log([write.blockChain, read0.blockChain, pid])
        }
        ASSERT(pid, 'pid should always be a pid because write.blockChain was less than the read');

        const pref = write.blockChain + pid + ',';
        // vlog('blockChains:', meta.writes.map(w=>w.blockChain), meta.reads.map(r=>r.blockChain), ', pref to test:', pref);
        if (
          meta.reads.every(read => read.blockChain.startsWith(pref)) &&
          (meta.writes.length === 1 || meta.writes.every((w,i) => i===0|| w.blockChain.startsWith(pref)))
        ) {
          vlog('Every ref other than the decl was a child of the node with pid in pref, name=', varName);
          // Find the node. It must be the block of an `if` branch, otherwise we can't continue.
          // I don't think this is safe for loops. I'm just not sure about try/catch here.
          // The statement should be found starting at the write and it should be in the block of the write.
          // If we miss, we bail.

          const body = write.blockBody;
          for (let i=write.blockIndex+1; i<body.length; ++i) {
            const next = body[i];
            if (next.type === 'IfStatement') {
              // vlog('next:', next.type, [next.consequent.$p.blockChain + next.consequent.$p.pid + ',', next.alternate.$p.blockChain + -next.alternate.$p.pid + ',', pref])
              // Ok this check is a bit ugly but blocks do not have their own blockChain ID cached so we must construct it... (maybe we can cache that)
              const isCons = next.consequent.$p.blockChain + next.consequent.$p.pid + ',' === pref;
              const isAlt = !isCons && (next.alternate.$p.blockChain + next.alternate.$p.pid + ',' === pref);
              if (isCons || isAlt) {
                vlog('It should be safe to move the var decl for', varName, 'inside the block... queued the transform');

                queue.push({
                  index: write.blockIndex,
                  func: () => {
                    rule('When a single scope var with prim init is only used inside the same block, move it inside that block');
                    example('const x = 1; if (y) { $(x); }', 'if (y) { const x = 1; $(x); }');
                    before(write.blockBody[write.blockIndex]);
                    before(next);

                    const varDecl = write.blockBody[write.blockIndex];
                    write.blockBody.splice(write.blockIndex, 1);
                    const targetBlock = isCons ? next.consequent.body : next.alternate.body;

                    // We can safely remove the write. We can not yet safely inject it into the block since htat
                    // would destroy all index caches, so we do this in a second step.
                    queue2.push(() => {
                      targetBlock.unshift(varDecl);
                    });

                    targetBlock.unshift(varDecl); // for debugging. it's fine.
                    after(next);
                    // currentState(fdata, 'okwot', true, fdata);
                    targetBlock.shift(varDecl); // was only for debugging.
                    // stopmaar
                  }
                });

                ++changed;
                return;
              }
            }
          }
        }
      }
    }
  }

  if (queue.length) {
    // By index, high to low. This way it should not be possible to cause reference problems by changing index
    queue.sort(({ index: a }, { index: b }) => (a < b ? 1 : a > b ? -1 : 0));
    queue.forEach(({ func }) => func());
    // Now call all funcs in the second queue. They may destroy index caches but should not depend on them.
    queue2.forEach(func => func());
  }
  if (changed) {
    log('Ref-tracking tricks applied:', changed, '. Restarting from phase1 to fix up read/write registry.');
    return {what: 'refTracked', changes: changed, next: 'phase1'};
  }

  log('Ref-tracking tricks applied: 0.');
}
