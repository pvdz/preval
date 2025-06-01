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
  group('\n\n\n[redundantWrites] Finding redundant if-else writes');
  const r = _redundantWrites(fdata);
  groupEnd();
  return r;
}
function _redundantWrites(fdata) {
  const ast = fdata.tenkoOutput.ast;

  let changes = 0;
  /** @var {Array<{pid: number, block: Node, index: number}>} */
  const queue = [];

  fdata.globallyUniqueNamingRegistry.forEach(function (meta, name) {
    if (meta.isImplicitGlobal) return;
    if (meta.isBuiltin) return;
    if (meta.isConstant) return; // Can't have redundant writes if you can't have more than one
    if (!meta.singleScoped) return closureCases(meta, name, fdata);
    if (meta.writes.length === 1) return; // This rule doesn't apply at all

    vgroup('-- name: `' + name + '`, writes:', meta.writes.length, ', reads:', meta.reads.length);

    const varWrite = meta.writes.find((write) => write.kind === 'var');
    ASSERT(varWrite, 'all constants have a var', meta);

    if (varWrite.reachedByWrites.size === 0) return; // There might be writes but they're already unreachable. Ignore them.

    // If the var decl init cannot be observed, replace it with any primitive assigned in a write that reaches ("shadows") the var
    let hasNoPrimitives = false;
    vlog('Reads that can reach this var:', varWrite.reachedByReads.size);
    let eliminatedShadowWrite; // Prevent reprocessing this deleted write (if any)
    if (varWrite.reachedByReads.size === 0) {
      // Note: this part may not do anything. It'll look for x=1 in `let x=$(); if (a) x=1; else x=2` (for any primitive)

      hasNoPrimitives = true;
      vlog('Going to try and find a write with primitive to replace the init (1)');
      Array.from(varWrite.reachedByWrites).some((shadowWrite) => {
        vlog('-', shadowWrite.action + ':' + shadowWrite.kind, shadowWrite.parentNode.right.type);
        if (shadowWrite.kind !== 'assign') {
          // export, catch, etc
          // We were looking for the x=1 in `let x=$(); if (a) x=1; else x=2` case, which must be an assignment
          return;
        }
        if (AST.isPrimitive(shadowWrite.parentNode.right)) {
          // The transform must insert a new statement into the body. This is problematic as it changes cached indexes.
          // We'll use a Block for this instead. Technically that's incorrect because it changes the scope of the binding.
          // It's also not normalized code because it's a nested Block.
          // However, it's only temporary as we'll flatten this Block before leaving the trick.
          // By doing it this way we can avoid stale index caches entirely.

          rule('When the init of a binding cannot be observed and is overwritten by a primitive it can be replaced with that primitive');
          example('let x = $(); if (a) x = 1; else x = 2;', '$(); let x = 1; if (a) ; else x = 2;');
          before(varWrite.blockBody[varWrite.blockIndex]);
          before(shadowWrite.blockBody[shadowWrite.blockIndex]);

          varWrite.blockBody[varWrite.blockIndex] = AST.blockStatement(
            AST.expressionStatement(varWrite.parentNode.init),
            varWrite.parentNode
          );
          varWrite.parentNode.init = AST.primitive(AST.getPrimitiveValue(shadowWrite.parentNode.right));
          shadowWrite.blockBody[shadowWrite.blockIndex] = AST.emptyStatement();

          // Schedule the newly injected block for flattening. We must do that in this trick before leaving but can't do that immediately.
          queue.push({
            block: varWrite.blockBody,
            index: varWrite.blockIndex,
          });

          after(varWrite.blockBody[varWrite.blockIndex]);
          after(shadowWrite.blockBody[shadowWrite.blockIndex]);

          ++changes;
          hasNoPrimitives = false; // We found at least one
          eliminatedShadowWrite = shadowWrite;
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
        if (write === eliminatedShadowWrite) return false; // Skip. This one was deleted in previous block.
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
          Array.from(write.reachesWrites).every((prevWrite) => {
            vlog('  -', prevWrite.action + ':' + prevWrite.kind, prevWrite.parentNode.right?.type, prevWrite.parentNode.init?.type);
            if (prevWrite === eliminatedShadowWrite) {
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

          after(write.blockBody[write.blockIndex]);
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

  function closureCases(meta, name, fdata) {
    meta.writes.forEach(write => {
      if (
        write.blockIndex > 0 &&
        write.blockBody[write.blockIndex].type === 'ExpressionStatement' && // Make sure it's an assign, not a var decl or whatever
        write.blockBody[write.blockIndex-1].type === 'IfStatement'
      ) {
        const ifstmt = write.blockBody[write.blockIndex - 1];
        const lastA = ifstmt.consequent.body[ifstmt.consequent.body.length - 1];
        const lastB = ifstmt.alternate.body[ifstmt.alternate.body.length - 1];
        if (
          lastA?.type === 'ExpressionStatement' &&
          lastA.expression.type === 'AssignmentExpression' &&
          lastA.expression.left.type === 'Identifier' &&
          lastA.expression.left.name === name
        ) {
          // Now we still have to make sure we're not inside a try/catch
          // We already know it's a closure (that's why we're in the slow path) so that would prevent this rule.
          let pointer = write.blockBodies.length - 1;
          while (--pointer >= 0) {
            const i = write.blockIndexes[pointer];
            ASSERT(write.blockBodies[i]);
            if (write.blockBodies[i].type === 'TryStatement') break; // bad
            if (write.blockBodies[i].type === 'FunctionExpression') pointer = 0; // ok!
          }
          if (pointer < 0) {
            // Looks like no parent is a try so we should be good to go here?

            rule('When the last statement of an if assigns to the same var as the first statement after the ifelse, and the ifelse is not trapped, the assign is moot');
            example('let x = 1; if (y) { x = 2; } x = 3;', 'let x = 1; if (y) { 2; } x = 3;');
            before(lastA, ifstmt);
            before(write.blockBody[write.blockIndex]);

            lastA.expression = lastA.expression.right;

            after(lastA, ifstmt);
            after(write.blockBody[write.blockIndex]);
            changes += 1;
          }
        }
        if (
          lastB?.type === 'ExpressionStatement' &&
          lastB.expression.type === 'AssignmentExpression' &&
          lastB.expression.left.type === 'Identifier' &&
          lastB.expression.left.name === name
        ) {
          // Now we still have to make sure we're not inside a try/catch
          // We already know it's a closure (that's why we're in the slow path) so that would prevent this rule.
          let pointer = write.blockBodies.length - 1;
          while (--pointer >= 0) {
            const i = write.blockIndexes[pointer];
            ASSERT(write.blockBodies[i]);
            if (write.blockBodies[i].type === 'TryStatement') break; // bad
            if (write.blockBodies[i].type === 'FunctionExpression') pointer = 0; // ok!
          }
          if (pointer < 0) {
            // Looks like no parent is a `try` so we should be good to go here?

            rule('When the last statement of an else assigns to the same var as the first statement after the ifelse, and the ifelse is not trapped, the assign is moot');
            example('let x = 1; if (y) {} else { x = 2; } x = 3;', 'let x = 1; if (y) {} else { 2; } x = 3;');
            before(lastB, ifstmt);
            before(write.blockBody[write.blockIndex]);

            lastB.expression = lastB.expression.right;

            after(lastB, ifstmt);
            after(write.blockBody[write.blockIndex]);
            changes += 1;
          }
        }
      }
    });
  }

  if (changes) {

    queue.sort(({index:a}, {index: b}) => b-a); // Flatten in reverse order, back to front
    queue.forEach(({block, index}) => {
      block.splice(index, 1, ...block[index].body);
    });

    log('Redundant writes eliminated:', changes, '. Restarting from phase1');
    return {what: 'redundantWrites', changes: changes, next: 'phase1'};
  }

  log('Redundant writes eliminated: 0.');
}
