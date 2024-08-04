// Find bindings where we know an absolute upper bound set of values and try to resolve expressions based on that

import { ASSERT, log, group, groupEnd, vlog, vgroup, vgroupEnd, rule, example, before, source, after, fmat, tmat } from '../utils.mjs';
import * as AST from '../ast.mjs';
import { createFreshVar } from '../bindings.mjs';

export function resolveBoundValueSet(fdata) {
  group('\n\n\nChecking for ops that return the same for all possible worlds\n');
  const r = _resolveBoundValueSet(fdata);
  groupEnd();
  return r;
}
function _resolveBoundValueSet(fdata) {
  const ast = fdata.tenkoOutput.ast;

  let changed = 0;

  fdata.globallyUniqueNamingRegistry.forEach((meta, name) => {
    if (meta.isBuiltin) return;
    if (meta.isImplicitGlobal) return;
    vlog(
      `- \`${name}\`, is primitive?`,
      meta.typing.mustBePrimitive,
      ', has',
      meta.typing.worstCaseValueSet?.size,
      'known values',
      meta.typing.worstCaseValueSet?.size < 10 ? [...meta.typing.worstCaseValueSet] : '',
    );
    if (!meta.typing.worstCaseValueSet) return;

    vgroup();
    process(meta, name);
    vgroupEnd();
  });

  function process(meta, name, queue) {
    meta.reads.forEach((read, ri) => {
      if (read.parentNode.type === 'BinaryExpression') {
        const op = read.parentNode.operator;

        if (op === 'in' || op === 'instanceof') return; // the rhs should not be a primitive

        const left = read.parentNode.left;
        const right = read.parentNode.right;

        const other = left === read.node ? right : left;

        if (!AST.isPrimitive(other)) {
          // This trick relies on a primitive left or right
          // TODO: maybe if other has a worst case value set then we may be able to resolve some of these ops anyways...
          return;
        }

        const ov = AST.getPrimitiveValue(other);

        const f = {
          '**': (a, b) => a ** b,
          '*': (a, b) => a * b,
          '/': (a, b) => a / b,
          '%': (a, b) => a % b,
          '+': (a, b) => a + b,
          '-': (a, b) => a - b,
          '<<': (a, b) => a << b,
          '>>': (a, b) => a >> b,
          '>>>': (a, b) => a >>> b,
          '<': (a, b) => a < b,
          '>': (a, b) => a > b,
          '<=': (a, b) => a <= b,
          '>=': (a, b) => a >= b,
          '==': (a, b) => a == b,
          '!=': (a, b) => a != b,
          '===': (a, b) => a === b,
          '!==': (a, b) => a !== b,
          '&': (a, b) => a & b,
          '^': (a, b) => a ^ b,
          '|': (a, b) => a | b,
        }[op];

        vlog(
          'Testing op `' + op + '` with fixed',
          other === left ? 'left' : 'right',
          'value',
          [ov],
          'against the known set of of values:',
          [...meta.typing.worstCaseValueSet],
          other === left ? 'to the right' : 'to the left',
        );

        const NOPE = undefined; // None of the ops can result in `undefined` so it should be safe to use as the "nope" value. (Yeah, can also use a `{}` ;) but w/e)
        let prev = NOPE;
        for (const e of meta.typing.worstCaseValueSet) {
          const now = other === left ? f(ov, e) : f(e, ov);
          vlog('  - ', other === left ? ov : e, op, other === left ? e : ov, ' --> ', now);
          if (prev !== NOPE && !Object.is(prev, now)) {
            prev = NOPE;
            break;
          }
          prev = now;
        }

        if (prev === NOPE) {
          vlog('At least one case returned a different result so we cannot inline this');
        } else {
          // Since the operator returns the same value for all possible values of this binding we should be able to inline it
          rule('An operator that has the same result for all possible values of its operand should be inlined');
          example('let a = 1; a = 2; f(a < 3);', 'let a = 1; a = 2; f(true);');
          before(read.blockBody[read.blockIndex]);

          if (read.grandIndex < 0) read.grandNode[read.grandProp] = AST.primitive(prev);
          else read.grandNode[read.grandProp][read.grandIndex] = AST.primitive(prev);

          after(read.blockBody[read.blockIndex]);
          ++changed;
        }
      }
    });
  }

  if (changed) {
    //queue.sort(({ index: a }, { index: b }) => (a < b ? 1 : a > b ? -1 : 0));
    //queue.forEach(({ index, func }) => func());

    log('Bound value sets resolved:', changed, '. Restarting from phase1');
    return {what: 'resolveBoundValueSet', changes: changed, next: 'phase1'};
  }

  log('Bound value sets resolved: 0.');
}
