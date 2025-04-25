// Attempts to find `let` bindings whose value can be undoubtedly predicted at any point and inline them

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
  findBodyOffset,
} from '../utils.mjs';
import * as AST from '../ast.mjs';
import { mayBindingMutateBetweenRefs } from '../bindings.mjs';

export function staticLets(fdata) {
  group('\n\n\n[staticLets] Checking for let bindings whose value we can predict anyways');
  //currentState(fdata, 'staticLets'. true);
  const r = _staticLets(fdata);
  groupEnd();
  return r;
}
function _staticLets(fdata) {
  let changed = 0;

  new Map(fdata.globallyUniqueNamingRegistry).forEach((meta, name) => {
    if (meta.isBuiltin) return;
    if (meta.isImplicitGlobal) return;
    if (meta.isConstant) return;

    vgroup('- name: `' + name + '`, reads:', meta.reads.length, ', writes:', meta.writes.length);
    process(meta, name);
    vgroupEnd();
  });

  function process(meta, name) {
    // This targets a very specific pattern right now. See top of file.

    // Find a read where we can tell for sure what the value must be
    // Like; `let x = 5; $(x);` must be `$(5)` even if `x` is not actually a const. This happens a lot.

    // This search is a lot like let promotion. We trace through all refs and figure out whether there
    // are observable side effects betwen two refs. If not and if know the concrete value of the first
    // ref then we also know what the second ref must be and inline it (if it's a read).

    const rwOrder = meta.rwOrder;
    vlog('rwOrder:', [rwOrder.map((o) => o.action + ':' + o.kind + ':' + o.node.$p.pid + ':' + o.blockIndex).join(', ')]);

    let varDecl = undefined;
    let lastMap = new Map(); // Map<node, write|undefined>. Track per scope what the previous ref was
    rwOrder.some((ref, i) => {
      vgroup('-', i, ':', ref.action, ref.kind);
      const r = processRef(ref, i);
      vgroupEnd();
      return r;
    });

    function processRef(ref, i) {
      const last = lastMap.get(ref.pfuncNode);
      if (
        last &&
        // We only care to inline reads
        ref.action === 'read' &&
        // Don't change export statements. Heh.
        ref.kind !== 'export' &&
        // Must be in same scope
        ref.pfuncNode === last.pfuncNode &&
        // Must be in the same loop or not at all
        ref.innerLoop === last.innerLoop &&
        // Must be in the same try-block or not at all
        ref.innerTry === last.innerTry &&
        // The read must be able to reach the write
        ref.blockChain.startsWith(last.blockChain)
      ) {
        // Confirm that there were no observable side effects between the two refs
        // Start at last.block at index and move toward the read. We already checked that we're not going
        // to cross a loop or function boundary this way so it should be good to check linearly.

        const startsWithVarDecl = rwOrder[0].action === 'write' && rwOrder[0].kind === 'var';
        const skipSideEffectCheck = startsWithVarDecl && i === 1;

        let failed = false;
        if (skipSideEffectCheck) {
          vlog(
            'Skipping side effect check because the first ref is a var decl and this is the second ref so no side effects can possibly observe the binding',
          );
        } else {
          failed = mayBindingMutateBetweenRefs(meta, last, ref);
        }

        if (failed) {
          vlog('May have changed between the previous ref and this so bailing');
        } else {
          const valueNode = last.parentNode.type === 'VarStatement' ? last.parentNode.init : last.parentNode.right;
          vlog('Is the value node (init/rhs) a primitive?', valueNode?.type, valueNode?.name, valueNode?.value);
          ASSERT(valueNode, 'since the write should be a decl or assign', last.blockBody[last.blockIndex]);
          if (AST.isPrimitive(valueNode)) {
            rule('A write of primitive to a `let` binding followed by a read should inline the read');
            example('let x = 5; f(x);', 'let x = 5; f(5);');
            before(last.blockBody[last.blockIndex]);
            before(ref.node, ref.blockBody[ref.blockIndex]);

            if (ref.parentIndex < 0) ref.parentNode[ref.parentProp] = AST.cloneSimple(valueNode);
            else ref.parentNode[ref.parentProp][ref.parentIndex] = AST.cloneSimple(valueNode);

            after(ref.blockBody[ref.blockIndex]);
            ++changed;
          } else if (valueNode.type === 'Identifier') {
            const meta = fdata.globallyUniqueNamingRegistry.get(valueNode.name);
            if (meta.isConstant || meta.isBuiltin) {
              rule('A write of constants or builtins to a `let` binding followed by a read should inline the read');
              example('const y = f(); let x = y; f(x);', 'const y = f(); let x = y; f(y);');
              before(ref.node, ref.blockBody[ref.blockIndex]);

              if (ref.parentIndex < 0) ref.parentNode[ref.parentProp] = AST.cloneSimple(valueNode);
              else ref.parentNode[ref.parentProp][ref.parentIndex] = AST.cloneSimple(valueNode);

              after(ref.blockBody[ref.blockIndex]);
              ++changed;
            } else {
              vlog('Not a builtin nor a constant');
            }
          } else {
            vlog('Neither a primitive nor a constant nor a builtin');
          }
        }
      }

      // This misses the case where a write happens in and before a closure. We should use a stack or smth.
      // `let x = 5; function f(){ x = 10; } f(x);` should have `f(5)` but wouldn't.

      if (ref.action === 'write') {
        if (ref.kind === 'var') {
          varDecl = ref;
        } else if (ref.kind !== 'assign') {
          vlog('At least one write was not an assign. Bailing');
          return true;
        }
        lastMap.set(ref.pfuncNode, ref);
      } else if (last?.pfuncNode === ref.pfuncNode) {
        // If we couldn't determine the value for this read, we won't be able to determine it for the next read
        lastMap.set(ref.pfuncNode, undefined);
      }
    }
  }

  if (changed) {
    log('staticLets patterns captured:', changed, '. Restarting from phase1 to fix up read/write registry');
    return {what: 'staticLets', changes: changed, next: 'phase1'};
  }
  log('staticLets patterns captured: 0');
}
