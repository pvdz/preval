// Find specific pattern of conditional let init with redundant assignment
//
// `let x = 1; if (y) x = 1; else x = 2;`
//          ^         ^^^^^

import {
  ASSERT,
  log,
  group,
  groupEnd,
  vlog,
  vgroup,
  vgroupEnd,
  fmat,
  tmat,
  rule,
  example,
  before,
  source,
  after,
  findBodyOffset,
} from '../utils.mjs';
import * as AST from '../ast.mjs';

export function redundantWrites(fdata) {
  group('\n\n\nFinding redundant if-else writes');
  const r = _redundantWrites(fdata);
  groupEnd();
  return r;
}
function _redundantWrites(fdata) {
  const ast = fdata.tenkoOutput.ast;

  let changes = 0;

  fdata.globallyUniqueNamingRegistry.forEach(function (meta, name) {
    if (meta.isImplicitGlobal) return;
    if (meta.isBuiltin) return;
    if (meta.isConstant) return; // Can't have redundant writes if you can't have more than one
    if (!meta.singleScoped) return; // TODO: we can go the hard way on this one?

    vgroup('-- name: `' + name + '`, writes:', meta.writes.length, ', reads:', meta.reads.length);

    const varWrite = meta.writes.find((write) => write.kind === 'var');
    ASSERT(varWrite, 'all constants have a var', meta);

    ASSERT(
      varWrite.reachedByWrites.size > 0 || meta.writes.length === 1,
      'when not TDZ and not multi-scope and not a constant, the var should be reachable by at least one other write if there is one',
      varWrite.reachedByWrites.size > 0,
      meta.writes.length,
    );

    // If the var decl init cannot be observed, replace it with any primitive assigned in a write that reaches ("shadows") the var
    let hasNoPrimitives = false;
    vlog('Reads that can reach this var:', varWrite.reachedByReads.size);
    let replacedWith; // Prevent reprocessing this deleted write (if any)
    if (varWrite.reachedByReads.size === 0) {
      hasNoPrimitives = true;
      vlog('Going to try and find a write with primitive to replace the init (1)');
      [...varWrite.reachedByWrites].some((shadowWrite) => {
        vlog('-', shadowWrite.action + ':' + shadowWrite.kind, shadowWrite.parentNode.right.type);
        if (shadowWrite.kind !== 'assign') {
          // for
          return;
        }
        if (AST.isPrimitive(shadowWrite.parentNode.right)) {
          rule('When the init of a binding cannot be observed it can be replaced with the primitive rhs of an assignment');
          example('let x = 0; if (a) x = 1; else x = 2;', 'let x = 1; if (a) ; else x = 2;');
          before(varWrite.blockBody[varWrite.blockIndex]);
          before(shadowWrite.blockBody[shadowWrite.blockIndex]);

          varWrite.parentNode.init = shadowWrite.parentNode.right;
          shadowWrite.blockBody[shadowWrite.blockIndex] = AST.emptyStatement();

          before(varWrite.blockBody[varWrite.blockIndex]);
          before(AST.emptyStatement());
          ++changes;
          hasNoPrimitives = false; // We found at least one
          replacedWith = shadowWrite;
          return true;
        }
      });
    }

    // If we wanted to replace the init but didn't, then none of the assignments have a primitive and the next check is moot
    if (hasNoPrimitives) {
      vlog('Since we checked for an assignment with primitive before but did not find it, we do not have to scan again');
    } else {
      vgroup('Finding writes that write the same as all previous writes that can reach it');
      meta.writes.forEach((write, wi) => {
        if (write === replacedWith) return false; // Skip. This one was deleted in previous block.
        // Skip the var (it should not reasonably have previous writes) and non-assignments here
        if (write.kind !== 'assign') return false;

        vlog(
          '|-',
          wi,
          ':',
          write.action + ':' + write.kind,
          write.kind === 'var' ? write.parentNode.init.type : write.parentNode.right.type,
        );

        const ipv = write.kind === 'var' ? AST.isPrimitive(write.parentNode.init) : AST.isPrimitive(write.parentNode.right);
        if (!ipv) {
          vlog('- rhs is not a primitive, bailing');
          return false;
        }

        const pv = write.kind === 'var' ? AST.getPrimitiveValue(write.parentNode.init) : AST.getPrimitiveValue(write.parentNode.right);
        vlog('  - This write assigns', [pv]);

        if (!write.reachesWrites.size) {
          // I think this can happen for multi-scope. Alternatively, this can happen single scope in a loop, but it's a TDZ either way.
          vlog('  - Somehow, this write does not reach other writes. Bailing');
          return false;
        }

        vgroup('  - Scanning all writes that reach this writes (', write.reachesWrites.size, ')');
        if (
          [...write.reachesWrites].every((prevWrite) => {
            vlog('  -', prevWrite.action + ':' + prevWrite.kind, prevWrite.parentNode.right?.type, prevWrite.parentNode.init?.type);
            if (prevWrite === replacedWith) {
              vlog('   - Skip. This one was deleted in previous block.');
              return false;
            }
            if (prevWrite.kind !== 'assign' && prevWrite.kind !== 'var') {
              vlog('    - This is a `for`, bailing');
              return false;
            }
            if (!AST.isPrimitive(prevWrite.kind === 'var' ? prevWrite.parentNode.init : prevWrite.parentNode.right)) {
              vlog(
                '    - Assignment is not a primitive, bailing',
                (prevWrite.kind === 'var' ? prevWrite.parentNode.init : prevWrite.parentNode.right)?.type,
                (prevWrite.kind === 'var' ? prevWrite.parentNode.init : prevWrite.parentNode.right)?.name,
              );
              return false;
            }
            const v = AST.getPrimitiveValue(prevWrite.kind === 'var' ? prevWrite.parentNode.init : prevWrite.parentNode.right);
            if (Object.is(v, pv)) {
              vlog('    - match');
              return true;
            }
            vlog('    - Assignment has different rhs, bailing', pv, v);
            return false;
          })
        ) {
          // This condition has to hold for all writes that can reach this write (like in a loop)

          rule('A write that is the same as the init can be dropped');
          example('let x = 0; if (a) x = 0; else x = 2;', 'let x = 0; if (a) ; else x = 2;');
          before(write.blockBody[write.blockIndex]);

          write.blockBody[write.blockIndex] = AST.emptyStatement();

          before(write.blockBody[write.blockIndex]);
          ++changes;
        } else {
          vlog('  - At least one write that reaches this write had a different init');
        }
        vgroupEnd();
      });
      vgroupEnd();
    }

    vgroupEnd();
  });

  if (changes) {
    log('Redundant writes eliminated:', changes, '. Restarting from phase1');
    return 'phase1';
  }

  log('Redundant writes eliminated: 0.');
}
