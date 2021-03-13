import { ASSERT, log, group, groupEnd, vlog, vgroup, vgroupEnd, rule, example, before, source, after } from '../utils.mjs';
import * as AST from '../ast.mjs';
import { createFreshVar, createWriteRef } from '../bindings.mjs';

export function promoteVars(fdata) {
  group('\n\n\nChecking for promotable vars\n');

  let promoted = 0;
  fdata.globallyUniqueNamingRegistry.forEach((meta, name) => {
    if (meta.isBuiltin) return;
    if (meta.isImplicitGlobal) return;

    vgroup('- `' + name + '`');
    vlog('-', meta.reads.length, 'reads and', meta.writes.length, 'writes', meta.isConstant ? '(a constant)' : '(not a constant)', meta.constValueRef?.node?.type ?? '');

    // Check if all usages of the binding is consolidated to one scope
    const writeScopes = new Set();
    meta.writes.forEach((write) => writeScopes.add(write.scope));
    const readScopes = new Set();
    meta.reads.forEach((write) => readScopes.add(write.scope));

    ASSERT(meta.writes.length > 0, 'all bindings must have at least some writes...');
    const declData = meta.writes[0].decl;

    // "Does the binding have two writes, of which the first was a decl and the second a regular assignment?"
    if (meta.writes.length === 2 && meta.writes[0].decl && meta.writes[1].assign) {
      vgroup('Found `' + name + '` which has two writes, first a decl without init and second an assignment');
      const decl =
        declData.declIndex >= 0 ? declData.declParent[declData.declProp][declData.declIndex] : declData.declParent[declData.declProp];
      const decr = decl.declarations[0];
      // Did the decl have no init? Because that's a case where we may ignore the "write", provided reads don't happen before it.
      if (decr && decr.id && !decr.init) {
        // This might be a constant. It is currently a var or let (not already a const because it has no init).
        // Confirm that the reads happen in the same scope as the write. Ignore the decl as it doesn't write.
        if (readScopes.size === 1 && readScopes.has(meta.writes[1].scope)) {
          // The writes and all the reads happen in the same scope. Now confirm that the branch where
          // the reads occur can all reach the branch (upwards) to where the write occurs.
          // For example, `{ x=10; } x;` fails where `{ x=10; { x; } }` passes.

          // Each read and write will have a blockChain property which is an array of block pids where the
          // last pid is that of the block that contains the read or write.
          // We need to validate here whether the read occurs in a block that is an ancestor of the block
          // containing the write. This must mean the write chain is a prefix of the read...?
          // Note: at the moment this chek is moot because the system does not track values and would not know that
          //       a function is called if it was passed around. As such, detected closures are always accessible.

          const writeChain = meta.writes[1].blockChain;
          if (
            meta.reads.every((read) => {
              const pass = read.blockChain.startsWith(writeChain);
              log('OOB check: does `' + read.blockChain + '` start with `' + writeChain + '` ?', pass);
              return pass;
            })
          ) {
            // Every read is in a block that is on the same level of, or an ancestor of, the block containing the write.
            // As the final step We must now confirm that the first read occurs after the write.
            // We stick to source order for now. We can use rwCounter for this purpose.
            // Note that var statements are hoisted above func decls so that order should work out.
            // All reads must have a higher value than the write.
            const writeCounter = meta.writes[1].rwCounter;
            // TODO: we can merge this step with the one above
            if (
              meta.reads.every((read) => {
                log('Does the read appear later in source than the write?', read.rwCounter, '>', writeCounter);
                return read.rwCounter > writeCounter;
              })
            ) {
              log('The binding is a constant. Change the write to a const decl.');
              // Drop the decl (the first write) and promote the second write to a const decl. Make sure to update the write too.

              rule('Hoisted var decl that is a constant should become const');
              example('let x; x = f(); g(x);', 'const x = f(); g(x);');
              before(decl);
              before(meta.writes[1].parentNode);

              if (declData.declIndex >= 0) {
                declData.declParent[declData.declProp][declData.declIndex] = AST.emptyStatement();
              } else {
                declData.declParent[declData.declProp] = AST.emptyStatement();
              }

              // Drop the empty var decl from the list
              meta.writes.shift();

              // Promote the only write left.
              // The original code may not have been an expression statement but after normalization it must now be.
              const assign = meta.writes[0];

              ASSERT(
                assign.assign.assignParent[assign.assign.assignProp][assign.assign.assignIndex].type === 'ExpressionStatement',
                'all assignments should be normalized to expression statements',
                assign,
              );
              ASSERT(
                assign.assign.assignParent[assign.assign.assignProp][assign.assign.assignIndex].expression === assign.parentNode,
                'the assignment should be in the expression statement',
              );

              declData.declParent[declData.declProp][declData.declIndex] = AST.emptyStatement();

              const newNode = AST.variableDeclaration(assign.parentNode.left, assign.parentNode.right, 'const');

              // TODO: -> blockBody
              assign.assign.assignParent[assign.assign.assignProp][assign.assign.assignIndex] = newNode;

              // Mark it as a constant for other reasons
              meta.isConstant = true;
              meta.constValueRef = {
                node: newNode.declarations[0].init,
                containerNode: newNode,
                containerProp: 'declarations',
                containerIndex: 0,
              };

              // Push a new write record for the const decl which replaces the old one for the assignment
              meta.writes[0] = createWriteRef({
                parentNode: newNode.declarations[0],
                parentProp: 'init',
                parentIndex: -1,
                blockBody: assign.blockBody,
                blockIndex: assign.blockIndex,
                node: newNode.declarations[0].id,
                rwCounter: assign.rwCounter,
                scope: assign.scope,
                blockChain: assign.blockChain,
                innerLoop: assign.innerLoop,
                decl: { declParent: assign.assign.assignParent, declProp: assign.assign.assignProp, declIndex: assign.assign.assignIndex },
              });

              after(newNode, assign.assign.assignParent);
              ++promoted;
              return;
            } else {
              log('There was at least one read before the write. Binding may not be a constant (it could be).');
            }
          } else {
            // At least one read appeared on a block that was not an ancestor of the block containing the write.
            log('At least one read was oob and might read an `undefined`. Not a constant.');
          }
        }
      }

      vlog('- Var decl not immediately followed by assignment');
      vgroupEnd();
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
    // - all future writes are assigns (not params, for-x or something else)
    // - all reads must reach the write
    // - all prior reads are in the same scope
    // - if the write is in a loop,
    //   - there are no prior reads in the same or an even deeper loop
    //   - all future reads are in the same scope

    // Note regarding SSA on param names; there exists a secret live binding in `arguments` that this transform breaks. Not sure I car.e

    vlog('Starts with decl',!!declData,'or param?', !!meta.writes[0].param);

    // "Is this binding defined through a var decl or param name?" -- prevents forx, func decl closures, implicit globals, and TDZ cases.
    if (declData || meta.writes[0].param) {
      log('The binding `' + name + '` has a var decl. Analyzing usages (', meta.reads.length, 'reads and', meta.writes.length, 'writes).');

      const rwOrder = [...meta.reads, ...meta.writes].sort(({ rwCounter: a }, { rwCounter: b }) => (a < b ? -1 : a > b ? 1 : 0));
      log('rwOrder:', [rwOrder.map((o) => o.action).join(', ')]);
      // Note: We asserted that the first write is a var decl, but a closure in func decl may still put a read as
      //       the first source ref. This is not a concern for params since they must go first in their scope (defaults are gone).
      if (rwOrder[0].action === 'write') {
        log('The initial binding:');
        source(rwOrder[0].parentNode);

        ASSERT(rwOrder[0].decl || rwOrder[0].param, 'the first write should be a decl or param, otherwise maybe this is TDZ');
        ASSERT(
          rwOrder.slice(1).every((rw) => (!rw.decl && !rw.param ? true : !!void console.dir(rw, { depth: null }))),
          'a binding should have no more than one var decl / param after normalization',
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

          log('- rwOrder[' + i + '] =', b.action);
          source(b.parentNode);

          if (b.scope !== bindingScope) {
            // TODO: I think there are situations where we can still safely support this case
            log('Found a read/write in a different scope. Bailing as we cannot guarantee the remaining read/writes.');
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

            log('Is the write an assign?', !!b.assign);

            // Verify that the write is an assign that happens in the same scope because we must ignore closures for now
            ASSERT(!b.decl && !b.param, 'a decl must be the first write and a and b were both writes so b cannot be the var decl');
            if (b.assign) {
              // Must verify that all remaining usages can reach this write

              let loopId = b.innerLoop;
              log('Write inside a loop?', loopId);
              let canSSA = true;
              if (loopId) {
                log('Checking if any previous read can reach this write (it is bad if one does)');
                // All previous reads must not be able to reach this assign (because that implies they're part of the loop)
                for (let j = 0; j < i; ++j) {
                  const c = rwOrder[j];
                  if (c.action === 'read') {
                    log(
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
                      log('At least one previous ref is in the same loop so this we can not SSA');
                      canSSA = false;
                      break;
                    }
                    if (c.blockChain.startsWith(b.blockChain)) {
                      log('At least one previous ref can reach this write so this we can not SSA');
                      canSSA = false;
                      break;
                    }
                  }
                }
              }
              if (canSSA) {
                log('Checking if all future reads can reach this write (good) and that they are in the same scope (good)');
                for (let j = i + 1; j < rwOrder.length; ++j) {
                  const c = rwOrder[j];
                  log('-', j, ': can reach:', c.blockChain.startsWith(b.blockChain), ', same scope:', b.scope === c.scope);
                  // Closure? Only relevant if assignment is in a loop.
                  if (loopId && b.scope !== c.scope) {
                    log('At least one future read/write was in a different scope');
                    canSSA = false;
                    break;
                  }
                  // A usage c can reach another usage b if the blockChain of b is a prefix of the blockchain of c
                  if (!c.blockChain.startsWith(b.blockChain)) {
                    log('At least one future read/write can not reach this assignment');
                    canSSA = false;
                    break;
                  }
                }
              }

              if (canSSA) {
                log('Applying SSA now');
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
                log('At least one subsequent usage can not reach this write so we can not easily SSA here');
              }
            }
          }
        }
      }
    }

    vgroupEnd();
  });
  groupEnd();
  log('\nPromoted', promoted, 'bindings to constant');
  if (promoted) {
    log('Restarting from phase1 to fix up read/write registry\n\n\n\n\n\n');
    groupEnd();
    return 'phase1';
  }
}
