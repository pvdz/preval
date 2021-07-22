// A specific pattern where a bit check is used as `if` test
// `const x = y & 32; const set = x === 32; if (set) f();`
// We can eliminate the check since, for one bit, the value is going to be zero or non-zero.
// --> `const x = y & 32; if (x) f();`

import { ASSERT, log, group, groupEnd, vlog, vgroup, vgroupEnd, rule, example, before, source, after, fmat, tmat } from '../utils.mjs';
import * as AST from '../ast.mjs';

export function bitSetTests(fdata) {
  group('\n\n\nChecking for bit-set `if`-test pattern\n');
  //vlog('\nCurrent state\n--------------\n' + fmat(tmat(fdata.tenkoOutput.ast)) + '\n--------------\n');
  const r = _bitSetTests(fdata);
  groupEnd();
  return r;
}
function _bitSetTests(fdata) {
  let found = 0;

  fdata.globallyUniqueNamingRegistry.forEach((meta, name) => {
    if (meta.isBuiltin) return;
    if (meta.isImplicitGlobal) return;
    if (!meta.typing.oneBitAnded) return; // (undefined, false, 0) phase1 will have done the necessary checks for the init. we should not need to check the rest?
    if (!meta.isConstant) return;

    vgroup('- `' + name + '`: is a const var whose value is a single bit:', meta.typing.oneBitAnded);
    process(meta, name);
    vgroupEnd();
  });

  function process(meta, name) {
    // This meta is a constant binding whose init was a binary expression with operator & and which had at least
    // a literal on one side of the operand (potentially two, though). Must confirm whether the number is a "single bit".

    const oneBitAnded = meta.typing.oneBitAnded;
    ASSERT(typeof oneBitAnded === 'number', 'should be undefined, false, or a number', oneBitAnded);

    // Check if there's a usage of this in a comparison to zero or the bit that was set
    vgroup('Scanning for all usages of `' + meta.uniqueName + '`...');
    meta.reads.forEach((read, ri) => {
      vlog('-', ri, read.parentNode.type + '.' + read.parentProp);
      if (read.parentNode.type === 'BinaryExpression') {
        vlog('Is binary expression with operator: `' + read.parentProp.operator + '`');
        // We know one side is either zero or a number with a single bit set
        // Interchange the next example for a number with a single bit set (32, in this example), or zero
        // TODO: do we in general prefer zero over non-zero? Is that an easier generic case to work with?
        // - `bit === 32` -> `Boolean(bit)`
        // - `bit === 0` -> `!bit`
        // - `bit === 33` -> `false` (for any value other than 0 or 32)
        // - `bit !== 32` -> `true` (bit must be zero or the bit, so it won't be anything else)
        // - `bit !== 0` -> `!bit` (bit must be zero or the bit, so it won't be anything else)
        // - `bit & bit` -> redundant
        // - `bit & nonbit` -> `0`
        // TODO: they're all a bit edge casy but these are others we can do:
        // - `bit == 32` -> `===`
        // - `bit != 32` -> `!==`, or `=== 0` ("the other")
        // - `bit > 32` -> false, since it's only going to be the bit-value or zero
        // - `bit >= 32` -> `===`
        // - `bit < 32` -> `=== 0`
        // - `bit <= 32` -> `===`
        // - `bit ^ 32` -> inverts the value, if it was zero it's now value, if it was value it's now zero :shrug:
        // - `bit & 32` -> noop. eliminate
        // - `bit | 32` -> :shrug: it is what it is
        // - `bit % 32` -> `0`, either way
        // - `bit * 1` -> `1`
        // - `bit * 0` -> `0`

        if (read.parentNode.operator === '===' || read.parentNode.operator === '!==') {
          vlog('Is strict comparison, checking if comparing to bit value', oneBitAnded);
          //const known = read.parentNode.left === read.node ? read.parentNode.left : read.parentNode.right;
          const unknown = read.parentNode.left === read.node ? read.parentNode.right : read.parentNode.left;

          // We have `const x = y === unknown`. Now we check whether `unknown` is either `0` or the value that we know x is ANDed with.
          if (AST.isPrimitive(unknown)) {
            const pv = AST.getPrimitiveValue(unknown);
            vlog('Was comparing to a primitive:', pv, '&', oneBitAnded);
            // This is `y === <primitive>` where we know `y` must be zero or <oneBitAnded>

            // There are two cases; Either
            // - we know because the primitive value is not one of the two values that `y` could possible be, or
            // - we don't know the answer, just that it's either zero or non-zero

            // If we know the outcome then we can replace the binary expression with true or false, period
            // If we don't kow the outcome, we can still replace all occurrences of `x` as an `if` test with `y`

            if (pv === 0 || pv === oneBitAnded) {
              // We don't know the outcome. Replace any `if` tests.
              replaceEqTests(meta, read, read.parentNode.operator, pv, name);
              ++found;
            } else {
              // We know the outcome. Replace the binary expression and let other rules clean it up.
              replaceBinaryExpression(read, read.parentNode.operator);
              ++found;
            }
          } else {
            vlog('Not comparing to zero or the target bit-value');
          }
        } else if (read.parentNode.operator === '&') {
          vlog('Doing an and on a single bit value...');

          const unknown = read.parentNode.left === read.node ? read.parentNode.right : read.parentNode.left;
          if (AST.isPrimitive(unknown)) {
            const pv = AST.getPrimitiveValue(unknown);
            vlog('Was comparing to a primitive:', pv, '&', oneBitAnded);
            // Regardless of the primitive, check if it has the same bit set as the value was already ANDed with.
            // If the bit is set, remove the binary expression (leaving just the ident)
            // If the bit was unset, then the result must be zero, so replace the binary expression with a zero.

            if (pv & oneBitAnded) {
              rule('Anding a value known to have at most one bit set with a value that at least also has that bit set is redundant');
              example('const x = a & 32; const y = x & 96; f(y);', 'const x = a & 32; const y = x; f(y);'); // tests/cases/bit_hacks/and_twice_good.md
              before(read.parentNode, read.blockBody[read.blockIndex]);

              // Note: we know that the other side is a number so we don't have to worry about a spy here
              // Other rules will clean up this alias if possible
              const finalNode = AST.identifier(name);
              if (read.grandIndex < 0) read.grandNode[read.grandProp] = finalNode;
              else read.grandNode[read.grandProp][read.grandIndex] = finalNode;

              after(finalNode, read.blockBody[read.blockIndex]);
              ++found;
            } else {
              rule('Anding a value known to have one bit set with a value that does not have that bit set means the result is zero');
              example('const x = a & 32; const y = x & 4; f(y);', 'const x = 0; const y = x; f(y);'); // tests/cases/bit_hacks/and_twice_bad.md
              before(read.parentNode, read.blockBody[read.blockIndex]);

              // Note: we know that the other side is a number so we don't have to worry about a spy here
              const finalNode = AST.literal(0);
              if (read.grandIndex < 0) read.grandNode[read.grandProp] = finalNode;
              else read.grandNode[read.grandProp][read.grandIndex] = finalNode;

              after(finalNode, read.blockBody[read.blockIndex]);
              ++found;
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

function replaceEqTests(meta, read, op, pv, name) {
  // Okay so we have an `x = y === z` where we know `y` is either zero or one other explicit number, and `z` is
  // one of those two values but we don't know which. This means that we do know z to be truthy or falsy and
  // only have one value for each. Essentially this means we can transform it to `z = Boolean(y)`. So we will.
  // Other rules will pick this up and propagate that where relevant.
  // When the op is `===` then the cast is boolean (`Boolean`), when the op is `!==` then the cast is boolean invert (`!`).

  ASSERT(op === '===' || op === '!==', 'the operator should have been confirmed to be `!==` or `===`', op, read);
  ASSERT(pv === 0 || pv === meta.typing.oneBitAnded, 'one operand should be known to be one of two values');
  rule(
    'Comparing a value to a number when the value is zero or single a bitwise flag and the number is either of that means the result is true or false based on whether the value is truthy or falsy so we cast explicitly',
  );
  example('const a = b & 32; const x = y === 0;', 'const a = b & 32; const x = !b;', () => op === '===' && pv === 0); // tests/cases/bit_hacks/and_x_if_neq/single_bit_and_x_neq_0.md
  example('const a = b & 32; const x = y === z;', 'const a = b & 32; const x = Boolean(b);', () => op === '===' && pv !== 0); // tests/cases/bit_hacks/and_x_if_neq/single_bit_and_x_neq_x.md
  example('const a = b & 32; const x = y !== 0;', 'const a = b & 32; const x = Boolean(b);', () => op === '!==' && pv === 0); // tests/cases/bit_hacks/and_x_if/and_neq_0_true.md
  example('const a = b & 32; const x = y !== z;', 'const a = b & 32; const x = !b;', () => op === '!==' && pv !== 0); // tests/cases/bit_hacks/and_x_if/and_neq_n_false.md
  before(read.parentNode, read.blockBody[read.blockIndex]);

  const finalNode =
    (op === '===') !== (pv === 0) ? AST.callExpression('Boolean', [AST.identifier(name)]) : AST.unaryExpression('!', AST.identifier(name));
  if (read.grandIndex < 0) read.grandNode[read.grandProp] = finalNode;
  else read.grandNode[read.grandProp][read.grandIndex] = finalNode;

  after(finalNode, read.blockBody[read.blockIndex]);
}

function replaceBinaryExpression(read, op) {
  // Okay so we have an `x = y === z` where we know `y` is either zero or one other explicit number, and `z` is
  // neither if those values. So at this point we are replacing the `y == z` expression with a `true` if the op
  // was `!==` and `false` if the op was `===`.
  ASSERT(op === '===' || op === '!==', 'the operator should have been confirmed to be `!==` or `===`', op, read);
  rule(
    'Comparing a value to a number when the value is zero or single a bitwise flag and the number is neither zero nor that flag must mean we know the outcome',
  );
  example('const a = b & 32; const x = y === 4;', 'const a = b & 32; const x = false;', () => op === '==='); // tests/cases/bit_hacks/and_x_if/and_x_eq_y.md
  example('const a = b & 32; const x = y !== 4;', 'const a = b & 32; const x = true;', () => op === '!=='); // tests/cases/bit_hacks/and_x_if/and_x_neq_y.md
  before(read.parentNode, read.blockBody[read.blockIndex]);

  const finalNode = op === '!==' ? AST.tru() : AST.fals();
  if (read.grandIndex < 0) read.grandNode[read.grandProp] = finalNode;
  else read.grandNode[read.grandProp][read.grandIndex] = finalNode;

  after(finalNode, read.blockBody[read.blockIndex]);
}
