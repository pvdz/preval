import { ASSERT, log, group, groupEnd, vlog, vgroup, vgroupEnd, rule, example, before, source, after, fmat, tmat } from '../utils.mjs';
import * as AST from '../ast.mjs';
import { createFreshVar } from '../bindings.mjs';

export function singleScopeSSA(fdata) {
  group('\n\n\nChecking for vars to SSA\n');
  const r = _singleScopeSSA(fdata);
  groupEnd();
  return r;
}
function _singleScopeSSA(fdata) {
  const ast = fdata.tenkoOutput.ast;

  vlog('First going to try to SSA bindings that are used in a single scope');
  let queue = [];
  let foundTdz = 0;
  // Shallow clone to prevent mutations to the registry from breaking because their read/write refs did not go through phase1
  new Map(fdata.globallyUniqueNamingRegistry).forEach((meta, name) => {
    if (meta.isBuiltin) return;
    if (meta.isConstant) return; // No need to SSA a constant
    if (meta.isImplicitGlobal) return;
    if (meta.isExport) return; // Exports are "live" bindings so any update to it might be observable in strange ways
    if (meta.constValueRef.containerNode.type !== 'VariableDeclaration') return; // catch, for-x, ???
    if (foundTdz) return;

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
    // read. The blockChain is a comma separated list of pids for each block leading up to global starting
    // from the ref. The pids for loops will be negative to distinguish them.
    // A read can reach a write when;
    // - the blockChain of the write is a prefix of the blockChain of the read, and
    // - either the write is not in a loop or the read.innerLoop is equal to write.innerLoop, and
    // - have the same pfuncNode, and
    // - write.pid < read.pid, and
    // - the read does not reach another write sooner

    // Alternatively, if a binding starts with a write in any scope for any branching path then
    // it should be turned into a local variable since the state closure is never observable.
    // This is the case if the assign is the first ref in the scope and in the root of the func
    // or when not in a loop and every branch encounters the write before the read.

    // Zooming in, when a branch starts with a write and the binding is not used anywhere after
    // the loop, and not in another scope either, then the binding should be local.

    vlog('The binding `' + name + '` is a var decl. Analyzing usages (', meta.reads.length, 'reads and', meta.writes.length, 'writes).');

    // Since we regenerate the pid during every phase1, we should be able to rely on it for DFS ordering.
    const rwOrder = [...meta.reads, ...meta.writes].sort(({ node: { $p: { pid: a } } }, { node: { $p: { pid: b } } }) =>
      +a < +b ? -1 : +a > +b ? 1 : 0,
    );
    vlog('rwOrder:', [rwOrder.map((o) => o.action + ':' + o.kind + ':' + o.node.$p.pid).join(', ')]);

    const declScope = meta.bfuncNode.$p.pid;
    vlog(
      'Decl scope:',
      declScope,
      ', ref scopes:',
      rwOrder.map((ref) => +ref.pfuncNode.$p.pid),
    );

    const varDeclWrite = meta.writes.find((write) => write.kind === 'var');
    ASSERT(varDeclWrite);
    const declBlockChain = varDeclWrite.blockChain;

    vlog('Confirming all refs can reach the decl');
    rwOrder.forEach((ref, i) => {
      if (ref === varDeclWrite || ref.blockChain.startsWith(declBlockChain)) {
        // can reach
      } else {
        // can not reach. guaranteed tdz?
        ASSERT(false, 'not sure we allow this case to reach this point since the parser would mark it as an implicit global');
      }
    })

    let allInSameScope = rwOrder.every((ref, i) => {
      return ref.scope === declScope;
    });
    vlog('allInSameScope:', allInSameScope);

    const declFirst = rwOrder[0] === varDeclWrite;
    vlog('declFirst:', declFirst);
    const declLooped = declFirst.innerLoop > 0;

    if (allInSameScope) {
      // Analysis is a little easier when we don't have to worry about closures
      vlog('This binding was only used in the same scope it as was defined in');

      if (!declFirst) {
        // If there was a read or write to this binding before the decl then check whether we are in a loop.
        // If inside a loop then special case it. Otherwise it must be a TDZ error. One of the few cases we
        // can catch. (Un?)fortunately TDZ errors are rare as they would be actual runtime problems.

        // Note: this crash may still be conditional.
        vlog(
          'There were references to `' + name + '` before their var decl and there is no closure so we must check for a runtime TDZ error',
        );

        for (let i = 0; rwOrder[i] !== varDeclWrite; ++i) {
          const ref = rwOrder[i];

          if (!declLooped || ref.innerLoop !== varDeclWrite.innerLoop) {
            rule('Reference to future binding when binding is not in same loop and not a closure must mean TDZ');
            example('x; let x = 10;', 'throw error; let x = 10;');
            before(ref.node, ref.blockBody[ref.blockIndex]);

            ref.blockBody[ref.blockIndex] = AST.throwStatement(AST.literal('Preval: Cannot access `' + name + '` before initialization'));

            after(ref.node, ref.blockBody[ref.blockIndex]);

            // This will shortcut this step and request another normalization step. This is necessary because other
            // references may be stale now and dead code is probably introduced for all the code after the new `throw`.
            // It's fine since this should be a very rare occurrence in real world code.
            ++foundTdz;
          }
        }

        if (foundTdz) return;
      }

      vlog('Walking through all', rwOrder.length, 'refs');
      let sawBinding = false;
      for (let i = 0; i < rwOrder.length; ++i) {
        const ref = rwOrder[i];
        vgroup('-', i + 1, '/', rwOrder.length, ':', ref.action, ':', ref.kind);
        vlog('- blockChain:', ref.blockChain);
        if (ref === varDeclWrite) {
          vlog('- This is the decl');
          // There should only be one binding for this name so this is the one
          sawBinding = true;
        } else if (!sawBinding) {
          // Since this is a flat scope and we've eliminated edge cases like switch-defaults jumping back up
          // we must now check whether this read and decl were inside a loop. Otherwise this must be a TDZ.
          vlog('- Saw a ref before the decl. Potential TDZ');
        } else if (ref.action === 'read') {
          // do nothing?
          vlog('- Ignoring read');
        } else if (ref.action === 'write') {
          if (ref.kind === 'assign') {
            let passed = true;

            if (ref.innerLoop) {
              // This is tricky but we can still do it when
              // - There is no prior read in this or any parent loop (prior sibling loop is okay)
              // - All future reads can reach this write (implies they are nested in the same loop)
              // - Any parent loop up to the lex scope that has the var decl, or the first func boundary, has no read
              vlog('  Write is inside a loop. Checking if any prior ref occurs in a loop.');
              for (let k = 0; k < i && passed; ++k) {
                const refk = rwOrder[k];
                vlog('  -', k, ':', refk.action, refk.kind, refk.innerLoop);
                passed = (refk === varDeclWrite) || !refk.innerLoop;
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
        } else {
          ASSERT(false);
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

  log('Assignments SSAd: 0.');
}
