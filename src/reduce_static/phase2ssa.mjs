import { ASSERT, log, group, groupEnd, vlog, vgroup, vgroupEnd, rule, example, before, source, after, fmat, tmat } from '../utils.mjs';
import * as AST from '../ast.mjs';
import { createFreshVar, createWriteRef } from '../bindings.mjs';

export function applySSA(fdata) {
  group('\n\n\nChecking for vars to SSA\n');
  const r = _applySSA(fdata);
  groupEnd();
  return r;
}
function _applySSA(fdata) {
  const ast = fdata.tenkoOutput.ast;

  vlog('First going to try to SSA bindings that are used in a single scope');
  let queue = [];
  // Shallow clone to prevent mutations to the registry from breaking because their read/write refs did not go through phase1
  new Map(fdata.globallyUniqueNamingRegistry).forEach((meta, name) => {
    if (meta.isBuiltin) return;
    if (meta.isConstant) return; // No need to SSA a constant
    if (meta.isImplicitGlobal) return;
    if (meta.isExport) return; // Exports are "live" bindings so any update to it might be observable in strange ways
    if (meta.constValueRef.containerNode.type !== 'VariableDeclaration') return; // catch, for-x, ???

    vgroup('- `' + name + '`:', meta.constValueRef.node.type, ', reads:', meta.reads.length, ', writes:', meta.writes.length);

    // We assume that every kind of meta that wasn't filtered out above (builtin, constant, implicit), must
    // be created through a var decl (let or const). TODO: catch clause bindings are currently considered to be implicit globals.

    // Generally speaking, we want to try and replace this write with a new fresh var decl.
    // One of the advantages of this approach is that it's more likely that the binding becomes
    // a constant for at least part of its original reach. Maybe entirely. This allows a lot of
    // other rules to potentially apply that only look at constants.

    // A "ref" (read or write of the binding) can "reach" a write if there's a direct path in the AST from
    // the read to the write while traversing up+backwards. So `x = 5; f(x)` but not `f(x); x = 5;`.
    // A read can reach a write when the "blockChain" of the write is a prefix of the blockChain of the
    // read. The blockChain is a comme separated list of pids for each block leading up to global starting
    // from the ref. The pids for loops will be negative to distinguish them.
    // If `read.blockChain.startsWith(write.blockChain) && write.pid < read.pid && write.scope === read.scope`
    // then the read should be able to reach the write.

    // There are a few cases to consider for SSA;
    // - If the binding only has refs in one scope
    //   - If the write happens in a loop
    //     - No prior reads inside this loop (inc loop test)
    //     - All future reads are inside same scope, and can reach this write or another write
    //   - The write was not in a loop
    //     - All future reads must reach this write, or another write
    // - If the binding spreads multiple scopes
    //   - If all bindings inside a scope start with a write and all other reads can reach that write then maybe?
    //     - We can trace the call and determine whether it escapes and maybe do analysis on more cases to support here
    //   - TODO: cry me a river

    vlog('The binding `' + name + '` is a var decl. Analyzing usages (', meta.reads.length, 'reads and', meta.writes.length, 'writes).');

    // Since we regenerate the pid during every phase1, we should be able to rely on it for DFS ordering.
    const rwOrder = [...meta.reads, ...meta.writes].sort(({ node: { $p: { pid: a } } }, { node: { $p: { pid: b } } }) =>
      +a < +b ? -1 : +a > +b ? 1 : 0,
    );
    vlog('rwOrder:', [rwOrder.map((o) => o.action + ':' + o.kind + ':' + o.node.$p.pid).join(', ')]);

    //if (meta.writes[0].kind !== 'var') {
    //  // catch clause, for-x, ehhh there was another one.
    //  vlog('The first write was not a decl, bailing');
    //  vgroupEnd();
    //  return;
    //}

    //// Note: We asserted that the first write is a var decl, but a closure in func decl may still put a read as the first source ref.
    //if (rwOrder[0].kind !== 'var') {
    //  vlog('There was a read in the source before the decl, bailing');
    //  vgroupEnd();
    //  return;
    //}

    const declScope = meta.bfuncNode.$p.pid;
    vlog(
      'Decl scope:',
      declScope,
      ', ref scopes:',
      rwOrder.map((ref) => +ref.pfuncNode.$p.pid),
    );

    let allInSameScope = rwOrder.every((ref, i) => {
      return ref.scope === declScope;
    });
    vlog('allInSameScope:', allInSameScope);

    if (!allInSameScope) {
      // Hard path
      vlog('This binding was used in multiple scopes so skipping the thorough hard path');
    } else {
      // Soft path
      vlog('This binding was only used in the same scope it as was defined in');
      // If there was a read or write to this binding before the decl then check whether we are in a loop.
      // If inside a loop then special case it. Otherwise it must be a TDZ error. One of the few cases we
      // can catch. (Un?)fortunately TDZ errors are rare as they would be actual runtime problems.

      vlog('Walking through all', rwOrder.length, 'refs');
      let sawBinding = false;
      for (let i = 0; i < rwOrder.length; ++i) {
        const ref = rwOrder[i];
        vgroup('-', i + 1, '/', rwOrder.length, ':', ref.action, ':', ref.kind);
        vlog('- blockChain:', ref.blockChain);
        if (ref.action === 'write' && ref.kind === 'var') {
          vlog('- This is the decl');
          // There should only be one binding for this name so this is the one
          sawBinding = true;
        } else if (sawBinding) {
          if (ref.action === 'write') {
            if (ref.kind === 'assign') {
              let passed = true;

              if (ref.innerLoop) {
                // This is tricky but we can still do it when
                // - There is no prior read in this loop
                // - All future reads can reach this write
                // - Any parent loop up to the lex scope that has the var decl, or the first func boundary, has no read
                vlog('  Write is inside a loop. Checking if any prior ref occurs in a loop.');
                // TODO: The prior read may be in a different (sibling) loop. After normalization that's less likely tho.
                for (let k = 0; k < i && passed; ++k) {
                  const refk = rwOrder[k];
                  vlog('  -', k, ':', refk.action, refk.kind, refk.innerLoop);
                  passed = (refk.action === 'write' && refk.kind === 'var') || !refk.innerLoop;
                }
                if (passed) {
                  vlog('All prior refs are not in a loop. Ok.');
                } else {
                  vlog('Found at least one read in the loop before the write in the loop. Bailing');
                }
              }

              if (passed) {
                // Check if all possible reads that may still be invoked from this point in the code must invariably
                // reach this write. In case of loops this includes earlier reads inside that loop. This also
                // includes reads that may happen after the current block, if the binding was declared before it.

                vgroup('  Searching through remaining refs to find out whether all future reads can reach the write');

                const eligible = [];
                for (let j = i + 1; j < rwOrder.length && passed; ++j) {
                  const r2 = rwOrder[j];
                  vlog('--', j + 1, '/', rwOrder.length, ':', r2.action, ':', r2.kind);
                  vlog('  - blockChain:', r2.blockChain);
                  if (r2.innerLoop && r2.action === 'write') {
                    vlog('A write inside a loop. Bailing.');
                    passed = false;
                  } else if (r2.blockChain.startsWith(ref.blockChain)) {
                    vlog('Ref can reach the write. Still eligible for SSA.');
                    eligible.push(r2);
                  } else {
                    // TODO: if a future read can not reach the read but is in a branch that is the fork of a shared ancestor
                    //       that is not beyond function boundaries or even beyond the lex scope to which that binding is
                    //       bound, then the read can be ignored. `let x = 1; if (a) x = 2; else $(x);` in this case the
                    //       read can not be affected by the write being SSAd. This does hinge on us knowing that an
                    //       ancestor is or isn't an `if`...

                    let stillBad = true;
                    for (let i = 0, l = Math.min(ref.ifChain.length, r2.ifChain.length); i < l; ++i) {
                      const a = ref.ifChain[i];
                      const b = r2.ifChain[i];
                      if (a === b) {
                        // Same parent
                        vlog('Same ancestor');
                      } else if (Math.abs(a) === Math.abs(b)) {
                        // It branched. We should be good?
                        // Example: `if (x) a = 1; else $(function(){ a })`.
                        // Example, `if (x) $(function(){ a = 1 }); else $(a)`
                        // But the refs were all in the same scope so we can't even have functions here.
                        vlog('Ok, it branched!');
                        stillBad = false;
                        break;
                      } else {
                        // Ok this is still bad
                        vlog('No, actually bad.');
                        break;
                      }
                    }

                    if (stillBad) {
                      vlog('Ref can not reach the write. Bailing');
                      passed = false;
                    }
                  }
                }

                if (passed) {
                  vlog('All future reads are properly scoped, collected', eligible.length, 'eligible refs');
                  //vlog(eligible);
                  queue.push({ eligible, meta, write: ref });
                } else {
                  vlog('There was at least one future read that could not reach this write');
                  // Consider something like this:
                  // `let x = 1; { x = 2; f(x); f(x); f(x); } f(x);`
                  // We could still do something like this
                  // `let x = 1; { const y = 2; x = y; f(y); f(y); f(y); } f(x);`
                  // Perhaps this way we can eliminate a few more lets
                  // We can check whether there are any reads at all and prevent this if there aren't any (or fewer than one)
                }

                vgroupEnd();
              }
            } else {
              // We skip the var decl ref so this must be try/catch or for-x or something. Ignore those for now.
              vlog('  - Ignoring "other" write');
            }
          } else if (ref.action === 'read') {
            // do nothing?
            vlog('  - Ignoring read');
          } else {
            ASSERT(false);
          }
        } else {
          // Since this is a flat scope and we've eliminated edge cases like switch-defaults jumping back up
          // we must now check whether this read and decl were inside a loop. Otherwise this must be a TDZ.
          vlog('  - Saw a ref before the decl. Potential TDZ. must check loop stuff now.');
        }
        vgroupEnd();
      }
    }

    vgroupEnd();
  });

  if (queue.length) {
    // Since the same binding may be changed multiple times (`let a = 1; a = 2; a = 3;`) the queue
    // should be unwound in DFS order per binding. This way we can rename variables inline and the next
    // step in the queue will only overwrite the next ones. The queue should already be in DFS order.

    vlog('Queue has', queue.length, 'writes to SSA');
    queue.forEach(({ eligible, meta, write }) => {
      vgroup('Next binding: `' + meta.uniqueName + '` on', eligible.length, 'refs');
      rule('Apply SSA where possible');
      example('let a = 1; f(a); a = 2; f(a);', 'let a = 1; f(a); const tmp = 2; f(tmp);');
      before(write.parentNode);

      const assign = write.parentNode;
      ASSERT(
        assign.type === 'AssignmentExpression',
        'this should be an assignment?',
        assign,
        write.parentNode,
        write.parentNode?.body,
        write.parentProp,
      );
      const rhs = assign.right;
      const oldName = meta.uniqueName;
      vlog('- Applying SSA to `' + oldName + '`');
      const tmpName = createFreshVar(oldName.startsWith('tmpSSA_') ? oldName : 'tmpSSA_' + oldName, fdata);
      write.blockBody[write.blockIndex] = AST.variableDeclaration(tmpName, rhs, 'let');
      eligible.forEach((ref, i) => {
        vlog('- ref', i);
        // Note: we must rename the identifier node since we may have changed the parent with the new var decl above
        // I don't think this is a problem since nodes should not appear more than once in the AST
        ref.node.name = tmpName;
      });

      after(write.blockBody[write.blockIndex]);
      vgroupEnd();
    });

    log('Assignments SSAd:', queue.length, '. Restarting from phase1 to fix up read/write registry');

    vlog('\nCurrent state (after SSA)\n--------------\n' + fmat(tmat(ast)) + '\n--------------\n');

    return 'phase1';
  }
  vlog('Was not able to SSA anything.\n');

  vlog('Now going to try to SSA bindings that are used in multiple scopes');
  let altPath = 0;
  new Map(fdata.globallyUniqueNamingRegistry).forEach((meta, name) => {
    if (meta.isBuiltin) return;
    if (meta.isConstant) return; // No need to SSA a constant
    if (meta.isImplicitGlobal) return;
    if (meta.isExport) return; // Exports are "live" bindings so any update to it might be observable in strange ways
    if (meta.constValueRef.containerNode.type !== 'VariableDeclaration') return; // catch, for-x, ???

    vgroup('- `' + name + '`:', meta.constValueRef.node.type, ', reads:', meta.reads.length, ', writes:', meta.writes.length);

    // Since we regenerate the pid during every phase1, we should be able to rely on it for DFS ordering.
    const rwOrder = [...meta.reads, ...meta.writes].sort(({ node: { $p: { pid: a } } }, { node: { $p: { pid: b } } }) =>
      +a < +b ? -1 : +a > +b ? 1 : 0,
    );
    vlog('rwOrder:', [rwOrder.map((o) => o.action + ':' + o.kind + ':' + o.node.$p.pid + ':' + o.blockIndex).join(', ')]);

    vlog('Multi-scope fallback. Attempting to apply SSA to back2back writes');
    vgroup('Walking through all refs of `' + name + '`');
    let last;
    let seenDecl = false;
    let declInnerLoop = undefined; // If a ref is inside a loop then we can only SSA if it is in the same loop as the var decl is. Otherwise the name will no longer match next iteration.
    rwOrder.some((ref, i) => {
      // Only do this once per binding. Require another cycle for multiple occurrences.
      const isAssign = ref.action === 'write' && ref.kind === 'assign';
      const isVar = ref.action === 'write' && ref.kind === 'var';
      const isDeclOrAssign = isAssign || isVar;
      const block = ref.blockBody;

      // Check stuff like `x = x + 1`, `x = x + x`, `x = f(x, x)`, and `x = [x, x, x]`.
      // If the rhs of an assignment contains itself, skip any number of self
      // references as long as they are in the same blockIndex. (`x=[x,x,x]`)
      let nextWriteIndex = i;
      if (!isDeclOrAssign && last) {
        for (let n = i; n < rwOrder.length; ++n) {
          const next = rwOrder[n];
          if (next.blockBody !== block) {
            // It needs to be in the same block or else there might be trouble
            nextWriteIndex = -1;
            break;
          } else if (next.action === 'read') {
            // If this read was in a different statement then there was no back2back assignment. Stop looking for one.
            if (next.blockBody !== block) {
              nextWriteIndex = -1;
              break;
            }
          } else if (next.action === 'write') {
            if (next.kind === 'assign') {
              nextWriteIndex = n;
            } else {
              nextWriteIndex = -1;
            }
            break;
          } else {
            ASSERT(false);
          }
        }
      } else if (!last) {
        nextWriteIndex = -1;
      }
      const isSelfRefAssign = nextWriteIndex > i; // Can't be zero eh

      vlog(
        '-',
        i,
        '`',
        ref.action + ':' + ref.kind,
        '. Had last:',
        !!last,
        ', saw decl:',
        seenDecl,
        ', is a decl',
        isVar,
        'or assign:',
        isAssign,
        ', self referencing assign:',
        isSelfRefAssign,
        'the next write being on index',
        nextWriteIndex,
      );

      if (!last) {
        vlog('  - no last');
      } else if (!seenDecl) {
        vlog('  - have not seen decl yet');
      } else if (block !== last.blockBody) {
        vlog('  - not in same block');
      } else if (ref.innerLoop && ref.innerLoop !== declInnerLoop) {
        // If the ref is in a loop, only proceed if the var is in the same loop. And it wasn't.
        vlog('  - inside loop and decl was not in it');
      } else if (!isAssign && !isSelfRefAssign) {
        vlog('  - neither assign nor self assign');
      } else {
        const write2 = isAssign ? ref : rwOrder[nextWriteIndex];
        ASSERT(write2);
        const start = last.blockIndex;
        const end = write2.blockIndex; // Regardless of self assign or regular assign
        ASSERT(start < end, 'the refs should have been ordered', start, end);

        // The rhs contains a reference to the lhs iif isSelfRefAssign
        let rhs = write2.parentNode.right;

        // Exception: If this case happened as the write immediately following the var decl and
        // the var decl was the first ref, then and only then can we safely ignore side effects
        // in the rhs of the second write. Because in that case it is not possible to reference
        // the binding by name as a side effect (Note: in normalized code we eliminate hoisting).
        const firstDeclAssignCase = i === 1 && last.action === 'write' && last.kind === 'var';
        vlog('firstDeclAssignCase:', firstDeclAssignCase);

        // Any closure may be activated as a side effect, including one that may attempt to read
        // the value of the binding before changing it. So we can't SSA if this rhs has them.
        let sideEffectFreeRhs = firstDeclAssignCase || !AST.mayHaveObservableSideEffect(rhs, name);
        vlog('sideEffectFreeRhs:', sideEffectFreeRhs);

        let sideEffectFree = sideEffectFreeRhs;

        // For each statement/declaration between the statement containing the last and current
        // write check whether the statement has observable side effects. We can't proceed if
        // that's the case since there's a chance those break if we SSA it.
        if (end - (start + 1) <= 0) {
          vlog('There are no statements between the two writes');
        } else if (firstDeclAssignCase) {
          vlog('No need to check statements between the writes because there is no closure risk');
        } else {
          vlog('Checking if all statements between the two writes at index', start, 'and', end, 'are side effect free');
          for (let i = start + 1; i < end && sideEffectFree; ++i) {
            const n = block[i];
            if (AST.mayHaveObservableSideEffect(n)) {
              vlog(i, ': no');
              sideEffectFree = false;
            } else {
              vlog(i, ': yes');
            }
          }
        }

        if (!sideEffectFree) {
          if (sideEffectFreeRhs) {
            vlog('There was at least one node between last and current ref that might observe this change so we must bail');
          } else {
            vlog('The rhs of the second assignment might have observable side effects so we cant do this');
          }
        } else {
          const name = meta.uniqueName;
          vlog('  - found back2back write');

          const tmpName = createFreshVar(name.startsWith('tmpSSA_') ? name : 'tmpSSA_' + name, fdata);

          if (last.kind === 'var') {
            // Back to back writes with no observable side effects between them (so just assignments or whatever)
            // In this case we create a new var for the second assignment and rename all other usages ot it.
            rule('Var decl that is not observable should be SSAd');
            example('let x = 1; x = 2; f(x);', 'let x = 1; let tmp = 2; f(tmp);');
            example('let x = 1; x = x + 1; f(x);', 'let x = 1; let tmp = x + 1; f(tmp);');
            before(last.parentNode, last.blockBody[last.blockIndex]);
            before(write2.parentNode, write2.blockBody[write2.blockIndex]);

            // This should always be safe to transform
            // Create a new var decl for the second write (current `ref`). Then replace all other occurrences
            // with that name. This also fixes the case where a closure was created before the binding.
            // The old binding will ultimately be dropped since nothing references it

            write2.blockBody[write2.blockIndex] = AST.variableDeclaration(tmpName, rhs, 'let');
            ASSERT(nextWriteIndex >= i);
            rwOrder.forEach((r, n) => {
              if (!(r.action === 'write' && r.kind === 'var') && (n < i || n > nextWriteIndex)) {
                r.node.name = tmpName;
              }
            });

            ++altPath;
            after(last.blockBody[last.blockIndex]);
            after(write2.blockBody[write2.blockIndex]);
            return true; // Move on to next var, even if there might be multiple cases here.
          } else {
            // Back to back writes with no observable side effects between them (so just assignments or whatever)
            // In this case we create a new var for the first assignment and only rename the uses of it in the rhs.
            rule('Var decl / assignment that is not observable should be SSAd');
            example('x = 1; x = 2; f(x);', 'let tmp = 1; let x = 2; f(x);');
            example('x = 1; x = x + 1; f(x);', 'let tmp = 1; let x = tmp + 1; f(x);');
            before(last.parentNode, last.blockBody[last.blockIndex]);
            before(write2.parentNode, write2.blockBody[write2.blockIndex]);

            // This should always be safe to transform
            // Create a new var decl for the second write (current `ref`). Then replace all other occurrences
            // with that name. This also fixes the case where a closure was created before the binding.
            // The old binding will ultimately be dropped since nothing references it

            last.blockBody[last.blockIndex] = AST.variableDeclaration(tmpName, last.parentNode.right, 'const');
            ASSERT(nextWriteIndex >= i);
            rwOrder.forEach((r, n) => {
              // Find all refs in the rhs. Those are the ones we rename.
              if (n >= i && n < nextWriteIndex) {
                r.node.name = tmpName;
              }
            });

            ++altPath;
            after(last.blockBody[last.blockIndex]);
            after(write2.blockBody[write2.blockIndex]);
            return true; // Move on to next var, even if there might be multiple cases here.
          }
        }
      }

      if (isDeclOrAssign) {
        if (ref.kind === 'var') {
          seenDecl = true;
          declInnerLoop = ref.innerLoop;
        }
        last = ref;
      } else if (last && ref.action === 'read' && last.blockBody === ref.blockBody) {
        // Only apply to back2back writes. If there was a read in the same blockBody then it's not back2back.
        // However, if two writes had statements between them without observable side effects we still consider
        // them to be back2back, since nothing can observe the difference.
        last = undefined;
      }
    });
    vgroupEnd();

    vgroupEnd();
  });

  if (altPath) {
    log('Assignments SSAd:', altPath, ' via the alt path. Restarting from phase1 to fix up read/write registry');
    return 'phase1';
  }

  log('Assignments SSAd: 0.');
}
