import { ASSERT, log, group, groupEnd, vlog, vgroup, vgroupEnd, rule, example, before, source, after } from '../utils.mjs';
import * as AST from '../ast.mjs';
import { createFreshVar, createWriteRef } from '../bindings.mjs';

export function applySSA(fdata) {
  group('\n\n\nChecking for vars to SSA\n');
  const r = _applySSA(fdata);
  groupEnd();
  return r;
}
function _applySSA(fdata) {
  let promoted = 0;
  // Shallow clone to prevent mutations to the registry from breaking because their read/write refs did not go through phase1
  new Map(fdata.globallyUniqueNamingRegistry).forEach((meta, name) => {
    if (meta.isBuiltin) return;
    if (meta.isImplicitGlobal) return;

    vgroup('- `' + name + '`:', meta.constValueRef.node.type, ', reads:', meta.reads.length, ', writes:', meta.writes.length);

    if (meta.writes[0].kind !== 'var') {
      vlog('The first write was not a decl, bailing');
      vgroupEnd();
      return;
    }

    // If a binding start with a var decl as first write (prevents func decl closure problem) and the next
    // usage is an assignment write then the first decl can be dropped (if it has an init then that becomes
    // the statement) and the next write becomes the decl. This should hold even if the binding becomes a
    // closure since func decls will be hoisted and so will appear earlier and any other closure won't be
    // able to be called until it is defined (-> source order read) so that can't cause problems either.
    // This only holds if all future reads have the blockchain of the first read as a prefix of their own.
    // A future update might improve that by doing branch analysis or branch extrapolation.
    // Additionally, we can't do this for loops since they obviously do revisit the previous name. If the
    // last write was in the same loop then the above applies anyways. Otherwise it's trickier. So we track
    // it. If a block was was the body of a loop (must be `while` or `fox-x` at this point) then the number
    // in the blockChain will be negative.

    // A write can be SSA'd if
    // - all future writes are assigns (not for-x or something else)
    // - all reads must reach the write
    // - all prior reads are in the same scope
    // - if the write is in a loop,
    //   - there are no prior reads in the same or an even deeper loop
    //   - all future reads are in the same scope

    vlog('The binding `' + name + '` has a var decl. Analyzing usages (', meta.reads.length, 'reads and', meta.writes.length, 'writes).');

    const rwOrder = [...meta.reads, ...meta.writes].sort(({ rwCounter: a }, { rwCounter: b }) => (a < b ? -1 : a > b ? 1 : 0));
    vlog('rwOrder:', [rwOrder.map((o) => o.action).join(', ')]);

    // Note: We asserted that the first write is a var decl, but a closure in func decl may still put a read as the first source ref.
    if (rwOrder[0].kind !== 'var') {
      vlog('There was a read in the source before the decl, bailing');
      vgroupEnd();
      return;
    }

    // Bail as soon as we find a read/write in a different scope. In that case we have a TDZ or closure
    // and source-order-"future" read/writes can not (easily) statically be guaranteed to be safe.
    const bindingScope = rwOrder[0].scope;

    // Note: rwOrder may have holes after the loop but during the loop
    for (let i = 1; i < rwOrder.length; ++i) {
      const rwRef = rwOrder[i];

      vlog('- rwOrder[' + i + '] =', rwRef.kind);

      if (rwRef.scope !== bindingScope) {
        // TODO: I think there are situations where we can still safely support this case
        vlog('Found a read/write in a different scope. Bailing as we cannot guarantee the remaining read/writes.');
        break;
      }

      if (rwRef.action === 'write') {
        // To SSA;
        // - it must be an assignment
        // - all future reads must reach this write
        // - if the current write is inside a loop (while, for-x)
        //   - all future reads must not be outside the current loop
        //   - all future reads must be in the same scope
        //   - all previous reads must be before the current loop

        vlog('Is the write an assign?', rwRef.kind);

        // Verify that the write is an assign that happens in the same scope because we must ignore closures for now
        if (rwRef.kind === 'assign') {
          // Must verify that all remaining usages can reach this write

          let loopId = rwRef.innerLoop;
          vlog('Write inside a loop?', loopId, loopId < 0 ? 'yes' : 'no');
          let canSSA = true;
          if (loopId) {
            vlog('Checking if any previous read can reach this write (it is bad if one does)');
            // All previous reads must not be able to reach this assign (because that implies they're part of the loop)
            for (let j = 0; j < i; ++j) {
              const c = rwOrder[j];
              if (c.action === 'read') {
                vlog(
                  '-',
                  j,
                  ':',
                  c.action,
                  ', innerLoop:', c.innerLoop,
                  ', same loop:',
                  loopId === c.innerLoop,
                  ', can reach:',
                  c.blockChain.startsWith(rwRef.blockChain),
                );
                if (loopId === c.innerLoop) {
                  vlog('At least one previous ref is in the same loop so this we can not SSA');
                  canSSA = false;
                  break;
                }
                if (c.blockChain.startsWith(rwRef.blockChain)) {
                  vlog('At least one previous ref can reach this write so this we can not SSA');
                  canSSA = false;
                  break;
                }
              }
            }
          }
          if (canSSA) {
            vlog('Checking if all future reads can reach this write (good) and that they are in the same scope (good)');
            for (let j = i + 1; j < rwOrder.length; ++j) {
              const c = rwOrder[j];
              vlog('-', j, ': can reach:', c.blockChain.startsWith(rwRef.blockChain), ', same scope:', rwRef.scope === c.scope);
              // Closure? Only relevant if assignment is in a loop.
              if (loopId && rwRef.scope !== c.scope) {
                vlog('At least one future read/write was in a different scope');
                canSSA = false;
                break;
              }
              // A usage c can reach another usage b if the blockChain of b is a prefix of the blockchain of c
              if (!c.blockChain.startsWith(rwRef.blockChain)) {
                vlog('At least one future read/write can not reach this assignment');
                canSSA = false;
                break;
              }
            }
          }

          if (canSSA) {
            vlog('Applying SSA now');
            rule('A redundant assign where remaining usages can all reach it must be SSA-ed');
            example('let x = 10; x = 20; f(x);', 'let x = 10; let x2 = 20; f(x2);');
            before(rwRef.node);

            const newName = createFreshVar(name.startsWith('tmpSSA_') ? name : 'tmpSSA_' + name, fdata);

            // Replace the assignment with a var decl of the same kind
            const rhs = rwRef.parentNode.right;
            const newNode = AST.variableDeclaration(rwRef.node, rhs, 'let'); // it SHOULD be fine to change this to a let...?
            rwRef.blockBody[rwRef.blockIndex] = newNode;

            for (let j = i; j < rwOrder.length; ++j) {
              rwOrder[j].node.name = newName;
            }

            after(rwRef.node);
            ++promoted;
            //endit
          } else {
            vlog('At least one subsequent usage can not reach this write so we can not easily SSA here');
          }
        }
      }
    }

    vgroupEnd();
  });

  if (promoted) {
    log('Bindings SSAd:', promoted, '. Restarting from phase1 to fix up read/write registry');
    return 'phase1';
  }

  log('Bindings SSAd: 0.');
}
