// Searching for patterns checking whether all of a given number of bits are unset or applying AND twice
// `const x = y & 200; const set = x === 0; if (set) f();`
// We can eliminate the check in this case since we know `set` must be zero or a non-zero non-NaN number, so there is only one falsy case.
// --> `const x = y & 200; if (x) {} else f();`

import { ASSERT, log, group, groupEnd, vlog, vgroup, vgroupEnd, rule, example, before, source, after, fmat, tmat, currentState, } from '../utils.mjs';
import * as AST from '../ast.mjs';
import { symbo } from '../symbols_builtins.mjs';

export function andCases(fdata) {
  group('\n\n\n[andCases] Checking AND cases\n');
  //currentState(fdata, 'andCases', true, fdata);
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
    //if (meta.varDeclRef.varDeclNode.type !== 'VarStatement') return;

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
                  : AST.callExpression(symbo('boolean', 'constructor'), [AST.identifier(name)]);
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
              // If this was a coercion from string, then so be it. Just being lazy here tbh.
              // Note that there's little we can do here.
              if (unknown.type === 'Literal') {
                rule(
                  'Anding a value known to have one bit set with a value with that and other bits set can reduce that and to that one bit',
                );
                example('const x = a & 32; const y = x & 33; f(y);', 'const x = 32; const y = x & 32; f(y);'); // tests/cases/bit_hacks/anding.md
                before(read.parentNode, read.blockBody[read.blockIndex]);

                unknown.value = pv & bitsAnded;

                after(unknown, read.blockBody[read.blockIndex]);
              }
            }
          }
        }
      } else if (read.parentNode.type === 'IfStatement') {
        vlog('This means that we can predict the value of this binding in each branch but also the value of the  ');

        // If the init of this binding had a constant on one side and a literal on the other, then we can resolve the
        // value in the `else` branch to be zero. In addition we can resolve certain expressions when we know the bit
        // is not contained in the other side.

        const varWrite = meta.writes[0];
        ASSERT(varWrite.kind === 'var');
        const init = varWrite.parentNode.init;
        ASSERT(init.type === 'BinaryExpression' && init.operator === '&');

        const pl = AST.isPrimitive(init.left);
        const pr = AST.isPrimitive(init.right);
        let initIdent;
        if (pl && !pr && init.right.type === 'Identifier') {
          initIdent = init.right;
        } else if (!pl && pr && init.left.type === 'Identifier') {
          initIdent = init.left;
        } else {
          vlog('Either both sides are primitives or the other side is not an identifier. Bailing');
        }

        if (initIdent) {
          const initMeta = fdata.globallyUniqueNamingRegistry.get(initIdent.name);
          ASSERT(initMeta);
          if (!initMeta.isImplicitGlobal && initMeta.isConstant) {
            vlog('Find all occurrences in the `then` branch and replace them with zero');

            const thenFirstPid = read.parentNode.consequent.$p.npid;
            const elseFirstPid = read.parentNode.alternate.$p.npid;
            const elseLastPid = read.parentNode.alternate.$p.lastPid;
            initMeta.reads.forEach((r) => {
              const pid = r.node.$p.npid;
              if (pid >= thenFirstPid && pid <= elseFirstPid) {
                vlog('The result of an AND in the `then` branch means the value has at least some of these bits set');
                // We can resolve this read (r) if, for example, it is compared against a value that does not contain any bit

                const op = r.parentNode.operator;

                let pvn;
                let pva;
                if (r.parentNode.type === 'BinaryExpression' && (op === '===' || op === '!==')) {
                  if (r.parentProp === 'left' && AST.isPrimitive(r.parentNode.right)) {
                    pvn = r.parentNode.right;
                    pva = AST.getPrimitiveValue(pvn) & bitsAnded;
                  } else if (r.parentProp === 'right' && AST.isPrimitive(r.parentNode.left)) {
                    pvn = r.parentNode.left;
                    pva = AST.getPrimitiveValue(pvn) & bitsAnded;
                  }
                }

                if (pvn && op === '===' && pva === 0) {
                  rule(
                    'When a value gets ANDed and the result is an if-test then the `then` branch must have these bits set so it can resolve comparisons against value that do not have these bits',
                  );
                  example('const x = a & 16; if (x) f(a === 32);', 'const x = a & 16; if (x) f(false);');
                  before(r.parentNode, r.blockBody[r.blockIndex]);

                  if (r.grandIndex < 0) r.grandNode[r.grandProp] = op === '===' ? AST.fals() : AST.tru();
                  else r.grandNode[r.grandProp][r.grandIndex] = op === '===' ? AST.fals() : AST.tru();

                  after(AST.fals(), r.blockBody[r.blockIndex]);
                  ++found;
                }
              } else if (pid >= elseFirstPid && pid <= elseLastPid) {
                vlog('The result of an AND in the `else` branch means the value has none of these bits set');
                // We can resolve this read (r) if, for example, it is compared against a value that contains any bit

                const op = r.parentNode.operator;

                let pvn;
                let pva;
                if (r.parentNode.type === 'BinaryExpression' && (op === '===' || op === '!==')) {
                  if (r.parentProp === 'left' && AST.isPrimitive(r.parentNode.right)) {
                    pvn = r.parentNode.right;
                    pva = AST.getPrimitiveValue(pvn) & bitsAnded;
                  } else if (r.parentProp === 'right' && AST.isPrimitive(r.parentNode.left)) {
                    pvn = r.parentNode.left;
                    pva = AST.getPrimitiveValue(pvn) & bitsAnded;
                  }
                }

                if (pvn && pva === bitsAnded) {
                  rule(
                    'When a value gets ANDed and the result is an if-test then the `else` branch must have none of these bits set so it can resolve comparisons against value that has any of these bits',
                  );
                  example('const x = a & 16; if (x) {} else f(a === 17);', 'const x = a & 16; if (x) {} else f(false);');
                  before(r.parentNode, r.blockBody[r.blockIndex]);

                  if (r.grandIndex < 0) r.grandNode[r.grandProp] = op === '===' ? AST.fals() : AST.tru();
                  else r.grandNode[r.grandProp][r.grandIndex] = op === '===' ? AST.fals() : AST.tru();

                  after(AST.fals(), r.blockBody[r.blockIndex]);
                  ++found;
                }
              }
            });
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
    return {what: 'andCases', changes: found, next: 'phase1'};
  }

  log('Found bit tests:: 0.');
}
