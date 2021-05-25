// A specific pattern where a bit check is used as `if` test
// `const x = y & 32; const set = x === 32; if (set) f();`
// We can eliminate the check since, for one bit, the value is going to be zero or non-zero.
// --> `const x = y & 32; if (x) f();`

import { ASSERT, log, group, groupEnd, vlog, vgroup, vgroupEnd, rule, example, before, source, after, fmat, tmat } from '../utils.mjs';
import * as AST from '../ast.mjs';

export function bitSetTests(fdata) {
  group('\n\n\nChecking for bit-set `if`-test pattern\n');
  const r = _bitSetTests(fdata);
  groupEnd();
  return r;
}
function _bitSetTests(fdata) {
  const ast = fdata.tenkoOutput.ast;

  let found = 0;

  fdata.globallyUniqueNamingRegistry.forEach((meta, name) => {
    if (meta.isBuiltin) return;
    if (meta.isImplicitGlobal) return;
    if (!meta.typing.oneBitSet) return; // phase1 will have done the necessary checks for the init. we should not need to check the rest?
    //if (!meta.isConstant) return;
    //if (meta.writes.length !== 1) return; // :shrug:
    //if (meta.constValueRef.containerNode.type !== 'VariableDeclaration') return;

    vgroup('- `' + name + '`: is a const var whose value is a single bit:', meta.typing.oneBitSet);

    process(meta, name);
    vgroupEnd();
  });

  function process(meta, name) {
    // This meta is a constant binding whose init was a binary expression with operator & and which had at least
    // a literal on one side of the operand (potentially two, though). Must confirm whether the number is a "single bit".

    // Check if there's a usage of this in a comparison to zero or the bit that was set
    // (This is why meta.typing.oneBitSet is not a bool but rather the value if a single bit is set on it)
    vgroup('Scanning for all usages of `' + meta.uniqueName + '`...');
    meta.reads.forEach((read, ri) => {
      vlog('-', ri, read.parentNode.type + '.' + read.parentProp);
      if (read.parentNode.type === 'BinaryExpression') {
        vlog('Is binary expression with operator: `' + read.parentProp.operator + '`');
        // We know one side is either zero or a number with a single bit set
        // Interchange the next example for a number with a single bit set (32, in this example), or zero
        // TODO: do we in general prefer zero over non-zero? Is that an easier generic case to work with?
        // - `bit === 32` -> `!== 0`
        // - `bit === 33` -> `false` (for any value other than 0 or 32)
        // TODO: they're all a bit edge casy but these are others we can do:
        // - `bit !== 32` -> `=== 0`
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
          vlog('Is strict comparison, checking if comparing to bit value', meta.typing.oneBitSet);
          const known = read.parentNode.left === read.node ? read.parentNode.left : read.parentNode.right;
          const unknown = read.parentNode.left === read.node ? read.parentNode.right : read.parentNode.left;

          if (
            unknown.type === 'Literal' &&
            typeof unknown.value === 'number' &&
            (unknown.value === 0 || unknown.value === meta.typing.oneBitSet)
          ) {
            vlog('Was comparing to zero or the target bit-value', meta.typing.oneBitSet);
            // This is `x === 0` or `x !== 0` or `x === bit` or `x !== bit`
            // We can normalize this slightly and if the binding is used in an `if` then we can replace it.
            if (read.grandNode.type === 'VariableDeclarator') {
              const eqMeta = fdata.globallyUniqueNamingRegistry.get(read.grandNode.id.name);
              ASSERT(eqMeta);

              if (eqMeta.isConstant) {
                vlog('Checking whether `' + eqMeta.uniqueName + '` is ever used as `if` test');
                eqMeta.reads.forEach((eqRead) => {
                  if (eqRead.parentNode.type === 'IfStatement' && eqRead.parentProp === 'test') {
                    vlog('- It was. Replacing that occurrence with `' + meta.uniqueName + '`');

                    rule('If a value is known to be a bit test and used as an if-test, use the AND result directly');
                    example(
                      'const a = x & 32; const b = a === 32; if (b) f();',
                      'const a = x & 32; if (a) f();',
                      () => read.parentNode.operator === '===' && unknown.value !== 0,
                    );
                    example(
                      'const a = x & 32; const b = a !== 32; if (b) f();',
                      'const a = x & 32; if (a) ; else f();',
                      () => read.parentNode.operator === '!==' && unknown.value !== 0,
                    );
                    example(
                      'const a = x & 32; const b = a === 0; if (b) f();',
                      'const a = x & 32; if (a) ; else f();',
                      () => read.parentNode.operator === '===' && unknown.value === 0,
                    );
                    example(
                      'const a = x & 32; const b = a !== 0; if (b) f();',
                      'const a = x & 32; if (a) f();',
                      () => read.parentNode.operator === '!==' && unknown.value === 0,
                    );
                    before(meta.writes[0].blockBody[meta.writes[0].blockIndex]);
                    before(read.blockBody[read.blockIndex]);
                    before(eqRead.blockBody[eqRead.blockIndex]);
                    if (
                      (read.parentNode.operator === '!==' && unknown.value !== 0) ||
                      (read.parentNode.operator === '===' && unknown.value === 0)
                    ) {
                      // Swap branches
                      const bak = eqRead.parentNode.consequent;
                      eqRead.parentNode.consequent = eqRead.parentNode.alternate;
                      eqRead.parentNode.alternate = bak;
                    }
                    eqRead.node.name = meta.uniqueName;

                    after(eqRead.blockBody[eqRead.blockIndex]);
                    ++found;
                  }
                });
              }
            }
          } else {
            vlog('Not comparing to zero or the target bit-value');
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
    log('Found bit tests:', found, '. Restarting from from normalization to eliminate dead code.');
    return true; // Need to potentially eliminate dead code (!)
  }

  log('Found bit tests:: 0.');
}
