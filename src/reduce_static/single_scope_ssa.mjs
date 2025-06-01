import { ASSERT, log, group, groupEnd, vlog, vgroup, vgroupEnd, rule, example, before, source, after, fmat, tmat } from '../utils.mjs';
import * as AST from '../ast.mjs';
import { createFreshVar } from '../bindings.mjs';

export function singleScopeSSA(fdata) {
  group('\n\n\n[singleScopeSSA] Checking for vars to SSA in single scope\n');
  const r = _singleScopeSSA(fdata);
  groupEnd();
  return r;
}
function _singleScopeSSA(fdata) {
  const ast = fdata.tenkoOutput.ast;

  let changed = 0;

  vlog('First going to try to SSA bindings that are used in a single scope');

  // Shallow clone to prevent mutations to the registry from breaking because their read/write refs did not go through phase1
  new Map(fdata.globallyUniqueNamingRegistry).forEach((meta, name) => {
    if (!meta.singleScoped) return;
    if (meta.isBuiltin) return;
    if (meta.isConstant) return; // No need to SSA a constant
    if (meta.isImplicitGlobal) return;
    if (meta.isExport) return; // Exports are "live" bindings so any update to it might be observable in strange ways
    if (!meta.varDeclRef) return; // catch, ???
    if (meta.varDeclRef.varDeclNode.type !== 'VarStatement') return; // catch, ???

    vgroup('- `' + name + '`:', meta.varDeclRef.node.type, ', reads:', meta.reads.length, ', writes:', meta.writes.length);

    process(meta, name);

    vgroupEnd();
  });

  function process(meta, name) {
    // We assume that every kind of meta that wasn't filtered out before (builtin, constant, implicit), must
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

    const rwOrder = meta.rwOrder;
    vlog('rwOrder:', [rwOrder.map((o) => o.action + ':' + o.kind + ':' + o.node.$p.npid).join(', ')]);

    const declScope = meta.bfuncNode.$p.npid;
    vlog(
      'Decl scope:',
      declScope,
      ', ref scopes:',
      rwOrder.map((ref) => ref.pfuncNode.$p.npid),
    );

    const varDeclWrite = meta.writes.find((write) => write.kind === 'var');
    ASSERT(varDeclWrite);

    const declFirst = rwOrder[0] === varDeclWrite;
    vlog('declFirst:', declFirst);
    // A single-scope constant where the decl is not the first in source order must lead to a TDZ...
    if (!declFirst) {
      vlog('Decl is not first. This binding is single scope. This must lead to a TDZ error. Loops dont save you ehre.');
      return;
    }

    let failingWrite = '';
    if (meta.writes.some((write) => (failingWrite = write.kind) !== 'assign' && write.kind !== 'var')) {
      vlog(`At least one write is not an "assign" kind (it was "${failingWrite}"), bailing`);
      return;
    }

    const colors = new Map(); // Map<number, Set<Ref>>

    vgroup('Walking the writes now...');
    // For every write, determine whether all reads can only read that write
    meta.writes.forEach((write) => {
      vlog('- `' + write.name + '` ::', write.action + ':' + write.kind, ', has', write.reachedByReads.size, 'reads');
      source(write.blockBody[write.blockIndex]);

      const nextColor = colors.size;
      write.color = nextColor;
      vlog('This write gets color', write.color);
      let colorSet = new Set([write]);
      colors.set(write.color, colorSet);

      vgroup('Painting write.reachedByReads,', write.reachedByReads.size, 'nodes');
      write.reachedByReads.forEach((ref) => {
        vlog('-ref');
        const rc = ref.color;
        if (rc === nextColor) {
          vlog('Ref already has this color. No need to paint it.');
        } else if (ref.color >= 0) {
          const oldSet = colors.get(rc);
          ASSERT(oldSet);
          vlog('- Ref has color', rc, '! Changing', oldSet.size, 'refs to', nextColor);
          vlog('Marking', rc, 'as deleted...');
          colors.set(rc, null); // prevent further use. Do not delete because we rely on colors.size.
          // All colors in the `oldSet` must have .color=rc (that's the point)
          oldSet.forEach((ref) => {
            ASSERT(ref.color === rc);
            ref.color = nextColor;
            colorSet.add(ref);
          });
          vlog('New set now has', colorSet.size, 'refs');
        } else {
          vlog('Ref had no color yet');
          ref.color = nextColor;
          colorSet.add(ref);
        }
      });
      vgroupEnd();
      vlog('Color set', nextColor, 'ultimately contains', colorSet.size, 'refs');
    });
    vgroupEnd();

    // How many colors do we have? (+debug them in groups)
    let uniqueColors = 0;
    colors.forEach((s, c) => {
      if (s !== null) {
        ++uniqueColors;

        // Print the clusters (for now, will probably want to get rid of this)
        vgroup(c, ':');
        [...s]
          .sort((a, b) => b.node.$p.npid - a.node.$p.npid)
          .forEach((r) => {
            source(r.blockBody[r.blockIndex]);
          });
        vgroupEnd();
      }
    });

    // If there is more than one cluster then they should all get their own name since
    // neither write nor read from one cluster can observe any write or read from another
    // cluster. As per the definition of a cluster. Need a good heuristic for new vars.
    // Have to be careful of the `let x; if ($) x=1; else x=2` case.

    if (uniqueColors > 1) {
      vgroup('The binding had multiple colors. Making sure each color gets a unique name');
      colors.forEach((refs, color) => {
        if (refs === null) return;

        vlog('- Color', color, ', refs:', refs.size);

        if (refs.has(varDeclWrite)) {
          vlog('  - Contains the var decl. No need to change this group');
          return;
        }

        if (refs.size === 1) {
          refs.forEach((ref) => {
            ASSERT(ref.action === 'write');
            if (ref.kind === 'var') {
              // Another rule will pick this up. This binding may need to persist to support certain structures:
              // `let x = undefined; if (a) x = 1; else x = 2; f(x);`, can't eliminate the decl (which will be in its own group)
            } else if (ref.kind !== 'assign') {
              // Another rule will pick this up. This may be mandatory. (the decl will be in its own group)
              // `let x; for (x in y) f();`, the lhs in this `for` header is mandatory even if unused.
            } else {
              // Trailing write? Should be alright to eliminate...
              rule('A write with no reads can be eliminated in many cases');
              example('let x = 1; f(x); x = g();', 'let x = 1; f(x); g()');
              before(varDeclWrite.blockBody[varDeclWrite.blockIndex]);
              before(ref.blockBody[ref.blockIndex]);

              ref.blockBody.splice(ref.blockIndex, 1, AST.expressionStatement(ref.parentNode.right));

              after(ref.blockBody[ref.blockIndex]);
              ++changed;
            }
          });
          vlog('  - This group had one write and no reads. Bailing to prevent botching an if-else case.');
          return;
        }

        // If the blockChain of the first write, in pid order, is not a prefix of all other writes
        // in this group, then it must mean that this group spans an if-else with a write in both
        // branches, which means it must be preceded by a placeholder var decl.

        const refsArr = [...refs].sort((a, b) => a.node.$p.npid - b.node.$p.npid);

        vlog('Searching for var decl and making sure all reads can read the write');
        let firstWrite = undefined; // Like this one :p
        if (
          refsArr.some((ref) => {
            if (ref.action === 'write') {
              if (!firstWrite) {
                firstWrite = ref;
                return;
              }
            }
            vlog('-', '"' + ref.blockChain + '".startsWith("' + firstWrite.blockChain + '")');
            return !ref.blockChain.startsWith(firstWrite.blockChain);
          })
        ) {
          vlog('  - At least one write is in a different branch from the first write so we must bail.');
          return;
        }

        ASSERT(firstWrite.kind === 'assign', 'ehh, or fix me :) dont think for-header/catch is gonna work here', firstWrite.kind);

        // I believe that we should be good to go for changing this write to a var decl now...
        // TODO: confirm this properly ignores for-header lhs cases.
        vlog('Changing the first write into a var decl');
        rule('If a set of read/writes form a separated group from all other read/writes on the same binding, then the group should SSA');
        example('x = 1; f(x); x = 2; f(x);', 'x = 1; f(x); let x2 = 2; f(x2);');
        before(firstWrite.blockBody[firstWrite.blockIndex], firstWrite.blockBody);

        const tmpName = createFreshVar(name.startsWith('tmpClusterSSA_') ? name : 'tmpClusterSSA_' + name, fdata);
        refsArr.forEach((ref) => {
          ref.node.name = tmpName;
        });
        firstWrite.blockBody[firstWrite.blockIndex] = AST.varStatement('let', tmpName, firstWrite.parentNode.right);

        after(firstWrite.blockBody);
        ++changed;
      });
      vgroupEnd();
    }
  }

  if (changed) {
    log('Assignments SSAd:', changed, '. Restarting from phase1 to fix up read/write registry');

    return {what: 'singleScopeSSA', changes: changed, next: 'phase1'};
  }

  log('Assignments SSAd: 0.');
}
