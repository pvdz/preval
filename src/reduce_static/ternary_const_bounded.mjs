// Find const vars used as `if` test condition where the value of the var inside each branch is known.
//
//      const x = y & 1; if (y) $(x); else $(x);
// ->
//      const x = y & 1; if (x) $(1); else $(0);
//
//
//      const x = y < 10; if (y) $(x < 20); else $(x < 5);
// ->
//      const x = y < 10; if (y) $(true); else $(false);
//

import { ASSERT, log, group, groupEnd, vlog, vgroup, vgroupEnd, rule, example, before, source, after, fmat, tmat, findBodyOffset, todo, } from '../utils.mjs';
import * as AST from '../ast.mjs';

export function ternaryConstBounded(fdata) {
  group('\n\n\n[ternaryConstBounded] Checking for ternaries that are bounded');
  //currentState(fdata, 'ternaryConstBounded', true, fdata);
  const r = _ternaryConstBounded(fdata);
  groupEnd();
  return r;
}
function _ternaryConstBounded(fdata) {
  let changed = 0;

  vlog('Searching for ternary const where all assigns are primitives...');

  fdata.globallyUniqueNamingRegistry.forEach((meta, varName) => {
    if (!meta.isLet) return;
    if (meta.reads.length < 1) return; // Not observable

    vlog('Checking ternary const:', varName);
    if (!meta.writes.every(write => {
      if (write.kind === 'var') {
        if (write.reachedByReads?.size === 0) return true; // Init is ignored.
        return AST.isPrimitive(write.parentNode.init);
      }
      if (write.kind === 'assign') {
        return AST.isPrimitive(write.parentNode.right);
      }
      return false; // :shrug:
    })) {
      vlog('- bail: at least one assign was not a prim or there was a non-var non-assign write');
      return;
    }
    vlog('- Have a var that is only assigned prims:', [varName]);

    let lazyPrims; // lazy init these
    const getPrims = () => {
      if (lazyPrims) return lazyPrims;
      lazyPrims = meta.writes.filter(write => {
        if (write.reachedByReads?.size === 0) return false; // Init is ignored so filter it out.
        return true;
      }).map(write => AST.getPrimitiveValue(write.kind === 'var' ? write.parentNode.init : write.parentNode.right));
      vlog('- generated prims:', lazyPrims);;
      return lazyPrims;
    };

    function applyUnaOp(op, v) {
      switch (op) {
        case '~': return ~v;
        case '!': return !v;
        case '+': return +v;
        case '-': return -v;
        case 'typeof': return typeof v;
      }
      // no void, we filtered delete
      ASSERT(false, 'add me', [op]);
    }

    function applyBinOp(lhs, op, rhs) {
      switch (op) {
        case '<': return lhs < rhs;
        case '<=': return lhs <= rhs;
        case '>': return lhs > rhs;
        case '>=': return lhs >= rhs;
        case '==': return lhs == rhs;
        case '===': return lhs === rhs;
        case '!=': return lhs != rhs;
        case '!==': return lhs !== rhs;
        case '%': return lhs % rhs;
        case '+': return lhs + rhs;
        case '-': return lhs - rhs;
        case '*': return lhs * rhs;
        case '/': return lhs / rhs;
        case '^': return lhs ^ rhs;
        case '&': return lhs & rhs;
        case '|': return lhs | rhs;
        case '**': return lhs ** rhs;
        case 'in': return lhs in rhs;
        case 'instanceof': return lhs instanceof rhs;
      }
      ASSERT(false, 'add me', [op]);
    }

    function getUniformOutcomeUnary(op) {
      return getPrims().reduce((have, v) => {
        // have: undefined=init, null=bad, true/false
        if (have === null) return null; // bad
        const r = applyUnaOp(op, v);
        if (have === undefined) return r;
        if (Object.is(have, r)) return have;
        return null; // bad
      }, undefined)
    }

    function getUniformOutcomeRhs(op, rhs) {
      return getPrims().reduce((have, lhs) => {
        // have: undefined=init, null=bad, true/false
        if (have === null) return null; // bad
        const r = applyBinOp(lhs, op, rhs);
        if (have === undefined) return r;
        if (Object.is(have, r)) return have;
        return null; // bad
      }, undefined)
    }

    function getUniformOutcomeLhs(lhs, op) {
      return getPrims().reduce((have, rhs) => {
        // have: undefined=init, null=bad, true/false
        if (have === null) return null; // bad
        const r = applyBinOp(lhs, op, rhs);
        if (have === undefined) return r;
        if (Object.is(have, r)) return have;
        return null; // bad
      }, undefined)
    }

    // Now find a read where we may make use of a bounded value
    meta.reads.forEach((read,n) => {
      vlog('-- read', n);
      if (read.parentNode.type === 'BinaryExpression') {
        const op = read.parentNode.operator;
        vlog('  - is binexpr', op);
        if (['<', '<=', '>', '>=', '==', '===', '!=', '!==', '%', '+', '-', '*', '/', '^', '&', '|', '**', 'in', 'instanceof'].includes(op)) {
          if (read.parentProp === 'left' && AST.isPrimitive(read.parentNode.right)) {
            const rhs = AST.getPrimitiveValue(read.parentNode.right);
            vlog('  - right is prim, applying op to all lhs values and', [rhs]);
            // Must all be the same outcome, regardless of what it is. None of the ops can return null/undef so we use that as base/bad signals.
            // We use object.is to support checking for NaN or weird cases like negative zero.
            const allOutcome = getUniformOutcomeRhs(op, rhs);
            vlog('  - uniform outcome:', [allOutcome]);
            // None of the binary ops here can return undefined or null.
            if (allOutcome != null) {
              rule('When the outcome of a binary expression is equal for all possible values of a var, inline the result; rhs');
              example('let x = 1; if (y) x = 2; if (x < 3) $(yes);', 'let x = 1; if (y) x = 2; if (true) $(yes);');
              before(read.blockBody[read.blockIndex]);

              if (read.grandIndex < 0) read.grandNode[read.grandProp] = AST.primitive(allOutcome);
              else read.grandNode[read.grandProp][read.grandIndex] = AST.primitive(allOutcome);

              after(read.blockBody[read.blockIndex]);
              changed += 1;
              return;
            }
          } else if (read.parentProp === 'right' && AST.isPrimitive(read.parentNode.left)) {
            // Same as block above but in reverse
            const lhs = AST.getPrimitiveValue(read.parentNode.left);
            vlog('  - left is prim, applying op to all rhs values and', [lhs]);
            // Must all be the same outcome, regardless of what it is. None of the ops can return null/undef so we use that as base/bad signals.
            // We use object.is to support checking for NaN or weird cases like negative zero.
            const allOutcome = getUniformOutcomeLhs(lhs, op);
            vlog('  - uniform outcome:', [allOutcome]);
            // None of the binary ops here can return undefined or null.
            if (allOutcome != null) {
              rule('When the outcome of a binary expression is equal for all possible values of a var, inline the result; lhs');
              example('let x = 1; if (y) x = 2; if (3 < x) $(yes);', 'let x = 1; if (y) x = 2; if (false) $(yes);');
              before(read.blockBody[read.blockIndex]);

              if (read.grandIndex < 0) read.grandNode[read.grandProp] = AST.primitive(allOutcome);
              else read.grandNode[read.grandProp][read.grandIndex] = AST.primitive(allOutcome);

              after(read.blockBody[read.blockIndex]);
              changed += 1;
              return;
            }
          }
        }
      }
      else if (read.parentNode.type === 'UnaryExpression' && read.operator !== 'delete') {
        vlog('Unary op that is not delete');
        // Must all be the same outcome, regardless of what it is. None of the ops can return null/undef so we use that as base/bad signals.
        // We use object.is to support checking for NaN or weird cases like negative zero.
        const allOutcome = getUniformOutcomeUnary(read.parentNode.operator);
        vlog('  - uniform outcome:', [allOutcome]);
        // None of the binary ops here can return undefined or null.
        if (allOutcome != null) {
          rule('When the outcome of a unary expression is equal for all possible values of a var, inline the result; rhs');
          example('let x = 1; if (y) x = 2; if (typeof x) $(yes);', 'let x = 1; if (y) x = 2; if ("number") $(yes);');
          before(read.blockBody[read.blockIndex]);

          if (read.grandIndex < 0) read.grandNode[read.grandProp] = AST.primitive(allOutcome);
          else read.grandNode[read.grandProp][read.grandIndex] = AST.primitive(allOutcome);

          after(read.blockBody[read.blockIndex]);
          changed += 1;
          return;
        }
      }
      else {
        vlog('  - is ignored:', read.parentNode.type);
      }
    });
  });

  if (changed) {
    log('Ternary consts resolved:', changed, '. Restarting from phase1 to fix up read/write registry');
    return {what: 'ternaryConstBounded', changes: changed, next: 'phase1'};
  }

  log('Ternary consts resolved: 0.');
}
