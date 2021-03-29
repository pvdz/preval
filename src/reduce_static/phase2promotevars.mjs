import { ASSERT, log, group, groupEnd, vlog, vgroup, vgroupEnd, rule, example, before, source, after } from '../utils.mjs';
import * as AST from '../ast.mjs';
import { createFreshVar, createWriteRef } from '../bindings.mjs';

export function promoteVars(fdata) {
  group('\n\n\nChecking for promotable vars\n');
  const r = _promoteVars(fdata);
  groupEnd();
  return r;
}
function _promoteVars(fdata) {
  let promoted = 0;
  fdata.globallyUniqueNamingRegistry.forEach((meta, name) => {
    if (meta.isBuiltin) return;
    if (meta.isImplicitGlobal) return;

    vgroup('- `' + name + '`');
    vlog(
      '-',
      meta.reads.length,
      'reads and',
      meta.writes.length,
      'writes',
      meta.isConstant ? '(a constant)' : '(not a constant)',
      meta.constValueRef?.node?.type ?? '',
    );

    // Check if all usages of the binding is consolidated to one scope
    const writeScopes = new Set();
    meta.writes.forEach((write) => writeScopes.add(write.scope));
    const readScopes = new Set();
    meta.reads.forEach((write) => readScopes.add(write.scope));

    ASSERT(meta.writes.length > 0, 'all bindings must have at least some writes...');
    const declData = meta.writes[0].decl;

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

    vlog('Starts with decl?', !!declData);

    // "Is this binding defined through a var decl?" -- prevents forx, func decl closures, implicit globals, and TDZ cases.
    if (declData) {
      vlog('The binding `' + name + '` has a var decl. Analyzing usages (', meta.reads.length, 'reads and', meta.writes.length, 'writes).');

      const rwOrder = [...meta.reads, ...meta.writes].sort(({ rwCounter: a }, { rwCounter: b }) => (a < b ? -1 : a > b ? 1 : 0));
      vlog('rwOrder:', [rwOrder.map((o) => o.action).join(', ')]);
      // Note: We asserted that the first write is a var decl, but a closure in func decl may still put a read as the first source ref.
      if (rwOrder[0].decl) {
        ASSERT(rwOrder[0].action === 'write', 'the .decl check subsumes this, right?');
        //vlog('The initial binding:');
        //source(rwOrder[0].parentNode);

        ASSERT(
          rwOrder.slice(1).every((rw) => (!rw.decl ? true : !!void console.dir(rw, { depth: null }))),
          'a binding should have no more than one var decl after normalization',
          name,
          rwOrder,
        );

        // Bail as soon as we find a read/write in a different scope. In that case we have a TDZ or closure
        // and source-order-"future" read/writes can not (easily) statically be guaranteed to be safe.
        const bindingScope = rwOrder[0].scope;

        // Note: rwOrder may have holes after the loop but during the loop, a and b should not be null
        for (let i = 1; i < rwOrder.length; ++i) {
          const a = rwOrder[i - 1];
          const b = rwOrder[i];

          vlog('- rwOrder[' + i + '] =', b.action);
          //source(b.parentNode);

          if (b.scope !== bindingScope) {
            // TODO: I think there are situations where we can still safely support this case
            vlog('Found a read/write in a different scope. Bailing as we cannot guarantee the remaining read/writes.');
            break;
          }

          if (b.action === 'write') {
            // Must be
            // - an assignment
            // - all future reads must reach this write
            // - if the current write is inside a loop (while, for-x)
            //   - all future reads must not be outside the current loop
            //   - all future reads must be in the same scope
            //   - all previous reads must be before the current loop

            vlog('Is the write an assign?', !!b.assign);

            // Verify that the write is an assign that happens in the same scope because we must ignore closures for now
            ASSERT(!b.decl, 'a decl must be the first write and a and b were both writes so b cannot be the var decl');
            if (b.assign) {
              // Must verify that all remaining usages can reach this write

              let loopId = b.innerLoop;
              vlog('Write inside a loop?', loopId);
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
                      ', same loop:',
                      loopId === c.innerLoop,
                      ', can reach:',
                      c.blockChain.startsWith(b.blockChain),
                    );
                    if (loopId === c.innerLoop) {
                      vlog('At least one previous ref is in the same loop so this we can not SSA');
                      canSSA = false;
                      break;
                    }
                    if (c.blockChain.startsWith(b.blockChain)) {
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
                  vlog('-', j, ': can reach:', c.blockChain.startsWith(b.blockChain), ', same scope:', b.scope === c.scope);
                  // Closure? Only relevant if assignment is in a loop.
                  if (loopId && b.scope !== c.scope) {
                    vlog('At least one future read/write was in a different scope');
                    canSSA = false;
                    break;
                  }
                  // A usage c can reach another usage b if the blockChain of b is a prefix of the blockchain of c
                  if (!c.blockChain.startsWith(b.blockChain)) {
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
                before(b.node);

                const newName = createFreshVar(name.startsWith('SSA_') ? name : 'SSA_' + name, fdata);
                const newMeta = fdata.globallyUniqueNamingRegistry.get(newName);
                b.node.name = newName;

                // Convert the assignment node represented by `b` into a let decl

                meta.writes.splice(meta.writes.indexOf(b), 1);
                newMeta.writes.push(b);

                // Replace the assignment with a var decl of the same kind
                const { assignParent, assignProp, assignIndex } = b.assign;
                const assignExpr = assignIndex >= 0 ? assignParent[assignProp][assignIndex] : assignParent[assignProp];
                ASSERT(b.parentNode.type === 'AssignmentExpression', 'if not then indexes changed?', assignExpr);
                ASSERT(b.parentNode.left === b.node, 'should still be node');
                const rhs = b.parentNode.right;
                const newNode = AST.variableDeclaration(b.node, rhs, 'let'); // it SHOULD be fine to change this to a let...?
                if (assignIndex >= 0) assignParent[assignProp][assignIndex] = newNode;
                else assignParent[assignProp] = newNode;

                for (let j = i + 1; j < rwOrder.length; ++j) {
                  const c = rwOrder[j];

                  if (c.action === 'write') {
                    meta.writes.splice(meta.writes.indexOf(c), 1);
                    newMeta.writes.push(c);
                  } else {
                    meta.reads.splice(meta.reads.indexOf(c), 1);
                    newMeta.reads.push(c);
                  }

                  c.node.name = newName;
                }

                after(b.node);
                ++promoted;
                //endit
              } else {
                vlog('At least one subsequent usage can not reach this write so we can not easily SSA here');
              }
            }
          }
        }
      }
    }

    vgroupEnd();
  });

  log('\nPromoted', promoted, 'bindings to a constant');
  if (promoted) {
    log('Restarting from phase1 to fix up read/write registry\n\n\n\n\n\n');
    return 'phase1';
  }
}
