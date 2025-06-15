import { ASSERT, log, group, groupEnd, vlog, vgroup, vgroupEnd, rule, example, before, source, after, fmat, tmat } from '../utils.mjs';
import * as AST from '../ast.mjs';
import { createFreshVar } from '../bindings.mjs';

export function multiScopeSSA(fdata) {
  group('\n\n\n[multiScopeSSA] Checking for vars to SSA in multiple scopes\n');
  const r = _multiScopeSSA(fdata);
  groupEnd();
  return r;
}
function _multiScopeSSA(fdata) {
  const ast = fdata.tenkoOutput.ast;

  let multiScopeSSA = 0;
  new Map(fdata.globallyUniqueNamingRegistry).forEach((meta, name) => {
    if (meta.isBuiltin) return;
    if (meta.isConstant) return; // No need to SSA a constant
    if (meta.isImplicitGlobal) return;
    if (meta.isExport) return; // Exports are "live" bindings so any update to it might be observable in strange ways
    if (!meta.varDeclRef) return; // catch, for-x, ???
    if (meta.varDeclRef.varDeclNode.type !== 'VarStatement') return; // catch, for-x, ???

    vgroup('- `' + name + '`:', meta.varDeclRef.node.type, ', reads:', meta.reads.length, ', writes:', meta.writes.length);

    const rwOrder = meta.rwOrder;
    vlog('rwOrder:', [rwOrder.map((o) => o.action + ':' + o.kind + ':' + o.node.$p.npid + ':' + o.blockIndex).join(', ')]);

    vlog('Multi-scope fallback. Attempting to apply SSA to back2back writes');
    vgroup('Walking through all refs of `' + name + '`');
    const lastMap = new Map(); // Map<funcNode, ref|undefined>. For each scope remember the previous write, if any.
    let seenDecl = false;
    const declWasFirstRef = rwOrder[0]?.action === 'write' && rwOrder[0]?.kind === 'var';
    let declInnerLoop = undefined; // If a ref is inside a loop then we can only SSA if it is in the same loop as the var decl is. Otherwise the name will no longer match next iteration.
    rwOrder.some((ref, i) => {
      // Only do this once per binding. Require another cycle for multiple occurrences.
      const isAssign = ref.action === 'write' && ref.kind === 'assign';
      const isVar = ref.action === 'write' && ref.kind === 'var';
      const isDeclOrAssign = isAssign || isVar;
      const block = ref.blockBody;

      const last = lastMap.get(ref.funcChain);

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

      const isSelfRefAssign =
        nextWriteIndex > i && rwOrder[nextWriteIndex].blockBody === ref.blockBody && rwOrder[nextWriteIndex].blockIndex === ref.blockIndex; // Can't be zero eh

      vgroup(
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
        ', the next write being on rwOrder index',
        nextWriteIndex,
        ', ref blockindex:',
        ref.blockIndex,
        ', next write block index:',
        nextWriteIndex > i && rwOrder[nextWriteIndex].blockIndex,
        ', next write same block?',
        nextWriteIndex > i && rwOrder[nextWriteIndex].blockBody === ref.blockBody,
      );

      const r = processRef(ref, i, last, block, isAssign, isSelfRefAssign, nextWriteIndex);

      if (isDeclOrAssign) {
        if (ref.kind === 'var') {
          seenDecl = true;
          declInnerLoop = ref.innerLoop;
        }
        lastMap.set(ref.funcChain, ref);
      } else if (last && ref.action === 'read' && last.funcChain === ref.funcChain) {
        // Only apply to back2back writes. If there was a read in the same scope then it's not back2back.
        // However, if two writes had statements between them without observable side effects we still consider
        // them to be back2back, since nothing can observe the difference.
        lastMap.set(ref.funcChain, undefined);
      }

      vgroupEnd();

      if (r) return r;
    });

    function processRef(ref, i, last, block, isAssign, isSelfRefAssign, nextWriteIndex) {
      if (!last) {
        vlog('- no last');
        return;
      }

      if (!seenDecl) {
        vlog('- have not seen decl yet');
        return;
      }

      if (block !== last.blockBody) {
        vlog('- not in same block');
        return;
      }

      if (ref.innerLoop && ref.innerLoop !== declInnerLoop) {
        // If the ref is in a loop, only proceed if the var is in the same loop. And it wasn't.
        vlog('- inside loop and decl was not in it');
        return;
      }

      if (!isAssign && !isSelfRefAssign) {
        vlog('- neither assign nor self assign');
        return;
      }

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
      let sideEffectFreeRhs = firstDeclAssignCase || !!AST.expressionHasNoObservableSideEffect(rhs, name);
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

        let offset = start + 1;
        vlog('Initial offset:', offset);

        const offsetOffset = offset;
        for (; offset < end && sideEffectFree; ++offset) {
          const n = block[offset];
          ASSERT(n, 'should have a node...', offsetOffset, offset, end, block.length);
          if (AST.expressionHasNoObservableSideEffect(n)) {
            vlog(offset, ': yes');
          } else {
            vlog(offset, ': no');
            sideEffectFree = false;
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

          write2.blockBody[write2.blockIndex] = AST.varStatement('let', tmpName, rhs);
          ASSERT(nextWriteIndex >= i);
          rwOrder.forEach((r, n) => {
            if (!(r.action === 'write' && r.kind === 'var') && (n < i || n > nextWriteIndex)) {
              r.node.name = tmpName;
            }
          });

          ++multiScopeSSA;
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

          last.blockBody[last.blockIndex] = AST.varStatement('const', tmpName, last.parentNode.right);
          ASSERT(nextWriteIndex >= i);
          rwOrder.forEach((r, n) => {
            // Find all refs in the rhs. Those are the ones we rename.
            if (n >= i && n < nextWriteIndex) {
              r.node.name = tmpName;
            }
          });

          ++multiScopeSSA;
          after(last.blockBody[last.blockIndex]);
          after(write2.blockBody[write2.blockIndex]);
          return true; // Move on to next var, even if there might be multiple cases here.
        }
      }
    }

    vgroupEnd();

    vgroupEnd();
  });

  if (multiScopeSSA) {
    log('Multi scope assignments SSAd:', multiScopeSSA, '. Restarting from phase1 to fix up read/write registry');
    return {what: 'multiScopeSSA', changes: multiScopeSSA, next: 'phase1'};
  }

  log('Multi scope assignments SSAd: 0.');
}
