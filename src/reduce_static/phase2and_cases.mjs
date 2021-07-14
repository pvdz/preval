// Searching for patterns checking whether all of a given number of bits are unset or applying AND twice
// `const x = y & 200; const set = x === 0; if (set) f();`
// We can eliminate the check in this case since we know `set` must be zero or a non-zero non-NaN number, so there is only one falsy case.
// --> `const x = y & 200; if (x) {} else f();`

import { ASSERT, log, group, groupEnd, vlog, vgroup, vgroupEnd, rule, example, before, source, after, fmat, tmat } from '../utils.mjs';
import * as AST from '../ast.mjs';

export function andCases(fdata) {
  group('\n\n\nChecking AND cases\n');
  //vlog('\nCurrent state\n--------------\n' + fmat(tmat(fdata.tenkoOutput.ast)) + '\n--------------\n');
  const r = _andCases(fdata);
  groupEnd();
  return r;
}
function _andCases(fdata) {
  const ast = fdata.tenkoOutput.ast;

  let found = 0;

  fdata.globallyUniqueNamingRegistry.forEach((meta, name) => {
    if (meta.isBuiltin) return;
    if (meta.isImplicitGlobal) return;
    if (meta.typing.anded === false || meta.typing.anded === undefined) return; // phase1 will have done the necessary checks for the init. we should not need to check the rest?
    if (!meta.isConstant) return;
    //if (meta.writes.length !== 1) return; // :shrug:
    //if (meta.constValueRef.containerNode.type !== 'VariableDeclaration') return;

    vgroup('- `' + name + '`: is a const var whose value was ANDed to:', '0b' + meta.typing.anded.toString(2));
    process(meta, name);
    vgroupEnd();
  });

  function process(meta, name) {
    // This meta is a constant binding whose init was a binary expression with operator & and which had at least
    // a literal on one side of the operand (potentially two, though). Must confirm whether the number is a "single bit".

    const bitsAnded = meta.typing.anded;
    ASSERT(typeof bitsAnded === 'number', 'undefined, false, or a number', bitsAnded);

    // Check if there's a usage of this in a comparison to zero or the bit that was set
    vgroup('Scanning for all usages of `' + meta.uniqueName + '`...');
    meta.reads.forEach((read, ri) => {
      vlog('-', ri, read.parentNode.type + '.' + read.parentProp);
      if (read.parentNode.type === 'BinaryExpression') {
        vlog('Is binary expression with operator: `' + read.parentNode.operator + '`');
        // We know one side was the result of applying `&` and `.typing.anded`.
        // - `bit === 0` -> `!bit`
        // - `bit !== 0` -> `!bit` (bit must be zero or the bit, so it won't be anything else)
        // - `bit & bit` -> redundant if same, can narrow is subset of bits or partial overlap
        // - `bit & bit` -> redundant
        // - `bit & nonbit` -> `0`, same if there is no overlap
        // TODO: they're all a bit edge casy but we can probably do stuff for other ops as well

        if (read.parentNode.operator === '===' || read.parentNode.operator === '!==') {
          vlog('Is strict comparison, checking if comparing to bit value', bitsAnded);
          //const known = read.parentNode.left === read.node ? read.parentNode.left : read.parentNode.right;
          const unknown = read.parentNode.left === read.node ? read.parentNode.right : read.parentNode.left;

          // We have `const x = y === unknown`. Now we check whether `unknown` is either `0` or has overlapping bits.
          if (AST.isPrimitive(unknown)) {
            const pvo = AST.getPrimitiveValue(unknown);
            const pv = pvo | 0;
            vlog('Was comparing to a primitive:', pvo, '(', pv, ')');
            // This is `y === <primitive>` where we only know `y` to be the result of `& <anded>`

            vlog('- Then: 0b' + bitsAnded.toString(2).padStart(32, ' '));
            vlog('- This: 0b' + pv.toString(2).padStart(32, ' '));
            vlog('- Same: 0b' + (bitsAnded & pv).toString(2).padStart(32, ' '));

            if (pv === 0) {
              // -0 distinction is not relevant here
              vlog('This is checking whether any bits are or are not set');

              rule('Comparing an AND result to zero is like doing a truthy check');
              example(
                'const x = a & 200; const y = x === 0; f(y);',
                'const x = a & 200; const y = Boolean(x); f(y);',
                () => read.parentNode.operator === '===',
              ); // tests/cases/bit_hacks/and_x_if/and_x_if_eq/multi_bit_and_x_eq_0.md
              example(
                'const x = a & 200; const y = x !== 0; f(y);',
                'const x = a & 200; const y = !x; f(y);',
                () => read.parentNode.operator === '!==',
              ); // this case may be preempted by a different rule
              before(read.parentNode, read.blockBody[read.blockIndex]);

              // Note: we know that the other side is a number so we don't have to worry about a spy here
              // Other rules will clean up this alias if possible
              const finalNode =
                read.parentNode.operator === '==='
                  ? AST.unaryExpression('!', AST.identifier(name))
                  : AST.callExpression('Boolean', [AST.identifier(name)]);
              if (read.grandIndex < 0) read.grandNode[read.grandProp] = finalNode;
              else read.grandNode[read.grandProp][read.grandIndex] = finalNode;

              after(finalNode, read.blockBody[read.blockIndex]);
              ++found;
            } else if ((pv & ~(bitsAnded >>> 0)) !== 0) {
              vlog('Checked against a value where some bits are outside the ANDed bitmask');
              vlog('- AND: 0b' + bitsAnded.toString(2).padStart(32, ' '));
              vlog('- ===: 0b' + pv.toString(2).padStart(32, ' '));
              vlog('- OOB: 0b' + (pv & ~(bitsAnded >>> 0)).toString(2).padStart(32, ' '));

              // If it compares against a value that has bits set that are not part of the bitmask then we know the outcome
              rule('An ANDed result that is compared to a value whose bits can not be set anymore has a static result');
              example(
                'const x = a & 6; const y = x === 5; f(y);',
                'const x = a & 6; const y = false; f(y);',
                () => read.parentNode.operator === '===',
              ); // tests/cases/bit_hacks/and_x_if/and_x_if_eq/multi_bit_and_x_eq_z.md
              example(
                'const x = a & 6; const y = x !== 5; f(y);',
                'const x = a & 6; const y = true; f(y);',
                () => read.parentNode.operator === '!==',
              ); // this case may be preempted by a different rule
              before(read.parentNode, read.blockBody[read.blockIndex]);

              // Note: we know that the other side is a number so we don't have to worry about a spy here
              // Other rules will clean up this alias if possible
              const finalNode = read.parentNode.operator === '===' ? AST.fals() : AST.tru();
              if (read.grandIndex < 0) read.grandNode[read.grandProp] = finalNode;
              else read.grandNode[read.grandProp][read.grandIndex] = finalNode;

              after(finalNode, read.blockBody[read.blockIndex]);
              ++found;
            }
          } else {
            vlog('Not comparing to zero');
          }
        } else if (read.parentNode.operator === '&') {
          vlog('Doing an AND on a value that is the result of another AND operation...');

          const unknown = read.parentNode.left === read.node ? read.parentNode.right : read.parentNode.left;
          if (AST.isPrimitive(unknown)) {
            const pv = AST.getPrimitiveValue(unknown);
            vlog('Was comparing to a primitive:', pv, ', the previous operation was with:', bitsAnded);
            vlog('- Then: 0b' + bitsAnded.toString(2).padStart(32, ' '));
            vlog('- This: 0b' + pv.toString(2).padStart(32, ' '));
            vlog('- Same: 0b' + (bitsAnded & pv).toString(2).padStart(32, ' '));

            // Two cases:
            // - At least some bits overlap between this bitmask and the previous one
            // - No bits overlap between this bitmask and the previous one

            if ((pv & bitsAnded) === bitsAnded) {
              rule('ANDing the result of a bitmask to a bitmask with the same bits also set is redundant');
              example('const x = a & 32; const y = x & 33; f(y);', 'const x = a & 32; const y = x; f(y);'); // tests/cases/bit_hacks/and_twice_good.md
              before(read.parentNode, read.blockBody[read.blockIndex]);

              // Note: we know that the other side is a number so we don't have to worry about a spy here
              // Other rules will clean up this alias if possible
              const finalNode = AST.identifier(name);
              if (read.grandIndex < 0) read.grandNode[read.grandProp] = finalNode;
              else read.grandNode[read.grandProp][read.grandIndex] = finalNode;

              after(finalNode, read.blockBody[read.blockIndex]);
            } else if ((pv & bitsAnded) === 0) {
              rule('ANDing the result of a bitmask to a bitmask with none of the bits set means the result is zero');
              example('const x = a & 32; const y = x & 31; f(y);', 'const x = a & 32; const y = 0; f(y);'); // tests/cases/bit_hacks/and_twice_bad.md
              before(read.parentNode, read.blockBody[read.blockIndex]);

              // Note: we know that the other side is a number so we don't have to worry about a spy here
              // Other rules will clean up this alias if possible
              const finalNode = AST.literal(0);
              if (read.grandIndex < 0) read.grandNode[read.grandProp] = finalNode;
              else read.grandNode[read.grandProp][read.grandIndex] = finalNode;

              after(finalNode, read.blockBody[read.blockIndex]);
            } else {
              ASSERT(
                (pv & bitsAnded) !== 0 && (pv & bitsAnded) !== bitsAnded,
                'there must be at least some bits in the new mask that get unset',
              );
              rule('Anding a value known to have one bit set with a value that does not have that bit set means the result is zero');
              example('const x = a & 33; const y = x & 5; f(y);', 'const x = 33; const y = x & 1; f(y);'); // tests/cases/bit_hacks/anding.md
              before(read.parentNode, read.blockBody[read.blockIndex]);

              // Note: we know that the other side is a number so we don't have to worry about a spy here
              const finalNode = AST.literal(0);
              if (read.grandIndex < 0) read.grandNode[read.grandProp] = finalNode;
              else read.grandNode[read.grandProp][read.grandIndex] = finalNode;

              after(finalNode, read.blockBody[read.blockIndex]);
            }
          }
        }
      } else {
        // TODO: Can still do `~` and `!` here
        vlog('Not binary operator');
      }
    });
    vgroupEnd();
  }

  if (found) {
    log('Found bit tests:', found, '. Restarting from phase1');
    return 'phase1';
  }

  log('Found bit tests:: 0.');
}
