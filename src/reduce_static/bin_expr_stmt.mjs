// Find dead expression statements that we can determine based on meta typing info

// Since each step only uses the mustBeType property, and this property should hold for any assignment to
// a binding, we should not need to worry about lets or anything of the sort. If the meta type is set then
// we should be able to assume that the type is bound for all refs of the binding. (This is important...)

// TODO: can function/class/regex serialization be made observable by expandos or prototype changes?

import walk from '../../lib/walk.mjs';
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
import { PRIMITIVE_TYPE_NAMES_PREVAL, PRIMITVE_TYPE_NAMES_NOT_STRING } from '../constants.mjs';

export function binExprStmt(fdata) {
  group('\n\n\n[binExprStmt] Finding dead binary expression statements\n');
  //currentState(fdata, 'binExprStmt'. true, fdata);
  const r = _binExprStmt(fdata);
  groupEnd();
  return r;
}
function _binExprStmt(fdata) {
  const ast = fdata.tenkoOutput.ast;

  let changed = 0;

  walk(_walker, ast, 'ast');
  function _walker(node, beforeWalk, nodeType, path) {
    if (beforeWalk) return;
    if (node.type !== 'ExpressionStatement') return;

    const expr = node.expression;

    switch (expr.type) {
      case 'UnaryExpression':
        let staticArg = AST.isPrimitive(expr.argument);
        if (!staticArg && expr.argument.type === 'Identifier') {
          const metaRight = fdata.globallyUniqueNamingRegistry.get(expr.argument.name);
          staticArg = isStatic(metaRight.typing.mustBeType);
        }

        if (staticArg) {
          rule('Unary expression statement where the arg is known to be static can be dropped');
          example('const x = "" + a; ~x;', 'const x = "" + a; ;');
          before(node);

          const parentNode = path.nodes[path.nodes.length - 2];
          const parentProp = path.props[path.props.length - 1];
          const parentIndex = path.indexes[path.indexes.length - 1];

          ASSERT(parentIndex >= 0);
          parentNode[parentProp][parentIndex] = AST.emptyStatement();

          after(AST.emptyStatement());
          ++changed;
          return;
        }
        break;
      case 'BinaryExpression':
        // Note: `===` and `!==` statements always get cleaned up in normalization. Don't need to do them here.

        if (['*', '/', '-', '<<', '>>', '>>>', '&', '^', '|', '<', '<=', '>', '>='].includes(expr.operator)) {
          // There's no real need to convert these. I'm doing it to make them stand out. And `**` is rarely used.
          vlog('Converting unobservable binary expression statement operator to `**`');
          expr.operator = '**';
          //++changed; // This should not require a new cycle... nothing changed and the op is not observable
        }

        const op = expr.operator;

        if (expr.left.type === 'Identifier') {
          const meta = fdata.globallyUniqueNamingRegistry.get(expr.left.name);
          const staticNode = isStatic(meta.typing.mustBeType);

          // If the lhs is not static then we can't really do much although in some edge cases we can act on the rhs
          if (staticNode) {
            let rightStatic = AST.isPrimitive(expr.right);
            if (!rightStatic && expr.right.type === 'Identifier') {
              const metaRight = fdata.globallyUniqueNamingRegistry.get(expr.right.name);
              rightStatic = isStatic(metaRight.typing.mustBeType);
            }

            if (rightStatic && op !== 'instanceof' && op !== 'in') {
              rule('Binary expression statement where both operands are known to be static can be dropped');
              example('const x = "" + a; x + "";', 'const x = "" + a; ;');
              before(expr);

              const parentNode = path.nodes[path.nodes.length - 2];
              const parentProp = path.props[path.props.length - 1];
              const parentIndex = path.indexes[path.indexes.length - 1];

              ASSERT(parentIndex >= 0);
              parentNode[parentProp][parentIndex] = AST.emptyStatement();

              after(AST.emptyStatement());
              ++changed;
              return;
            }

            // This can still be a bit of a complex table because the new value depends on the left value, operand, and right value.
            if (meta.typing.mustBeType === 'string') {
              // If string is on either side of a coercion the result will also be a string so we can safely replace it with empty string
              replaceBinarySide(AST.primitive(''), (x) => (expr.left = x));
              ++changed;
              return;
            }
            if (meta.typing.mustBeType === 'number') {
              replaceBinarySide(AST.literal(0), (x) => (expr.left = x));
              ++changed;
              return;
            }
          }
        }

        if (expr.right.type === 'Identifier') {
          const meta = fdata.globallyUniqueNamingRegistry.get(expr.right.name);
          const staticNode = isStatic(meta.typing.mustBeType);

          // The lhs was not a known type but it may be primitive
          if (staticNode) {
            if (AST.isPrimitive(expr.left) && op !== 'instanceof' && op !== 'in') {
              rule('Binary expression statement where both opearnds are known to be static can be dropped');
              example('const x = "" + a; x + "";', 'const x = "" + a; ;');
              before(expr);

              const parentNode = path.nodes[path.nodes.length - 2];
              const parentProp = path.props[path.props.length - 1];
              const parentIndex = path.indexes[path.indexes.length - 1];

              ASSERT(parentIndex >= 0);
              parentNode[parentProp][parentIndex] = AST.emptyStatement();

              after(AST.emptyStatement());
              ++changed;
              return;
            }

            // This can still be a bit of a complex table because the new value depends on the left value, operand, and right value.
            if (meta.typing.mustBeType === 'string') {
              // If string is on either side of a coercion the result will also be a string so we can safely replace it with empty string
              replaceBinarySide(AST.primitive(''), (x) => (expr.right = x));
              ++changed;
              return;
            }
            if (meta.typing.mustBeType === 'number') {
              replaceBinarySide(AST.literal(0), (x) => (expr.right = x));
              ++changed;
              return;
            }
          }
        }

        break;
      case 'Identifier': {
        // Not trivial to drop this due to TDZ cases that may no longer fail...
        break;
      }
    }
  }

  if (changed) {
    log('Binaries binned:', changed, '. Restarting from phase1');
    return {what: 'binExprStmt', changes: changed, next: 'phase1'};
  }

  log('Binaries binned: 0.');
}

function replaceBinarySide(node, action) {
  rule('Binary expression where we know the type of the lhs must have that ident replaced by something basic');
  example('const a = 10 * x; a * b;', 'const a = 10 * x; 0 * b;');
  before(node);

  action(node);

  after(node);
}

function isStatic(mustBeType) {
  if (PRIMITIVE_TYPE_NAMES_PREVAL.has(mustBeType)) return true;

  // For the rest, note that it's only relevant to know whether it can have observable side effects. These can't as a decl node.
  return [
    'regex',
    'function',
    'class',
    //'promise'
    //'set',
    //'map',
  ].includes(mustBeType);
}
