// Find constants whose assignment is redundant because the rhs is a constant or an ident that
// won't change between declaration and usage.
// This is a common artifact left by normalization, which does not use scope tracking, and has to be safe.
//
//        const x = 1; const y = x; x = 2; $(x, y);
// ->     const x = 1; const y = x; x = 2; $(x, x);
//
//        const x = $(); const y = x; $(x, y);
// ->     const x = $(); const y = x; $(x, x);
//
//        const x = this; const y = x; $(x, y);
// ->     const x = this; const y = x; $(x, x);
//


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
  findBodyOffset, riskyRule,
} from '../utils.mjs';
import * as AST from '../ast.mjs';
import { ASSUME_BUILTINS } from '../constants.mjs';

export function constAliasing(fdata) {
  group('\n\n\nSearching for two const values that get assigned to each other\n');
  const r = _constAliasing(fdata);
  groupEnd();
  return r;
}
function _constAliasing(fdata) {
  // `const a = x; const b = a; f(b);` --> `f(a);`

  let dropped = 0;

  fdata.globallyUniqueNamingRegistry.forEach((meta, lhsName) => {
    if (meta.isBuiltin) return;
    if (meta.isImplicitGlobal) return;
    if (meta.isExport) return; // Exports are "live" bindings so any update to it might be observable in strange ways
    if (!meta.isConstant) return;
    if (meta.constValueRef?.containerNode.type !== 'VariableDeclaration') return; // catch, ???
    if (meta.constValueRef.containerNode.declarations[0].init.type !== 'Identifier') return;

    const rhsName = meta.constValueRef.containerNode.declarations[0].init.name;
    if (rhsName === lhsName) return; // TDZ but not my problem
    if (rhsName === 'arguments') return;
    const meta2 = fdata.globallyUniqueNamingRegistry.get(rhsName);
    if (meta2.isImplicitGlobal) return;
    if (meta2.isExport) return; // Exports are "live" bindings so any update to it might be observable in strange ways
    if (meta2.isBuiltin) {
      // special case aliasing a known builtin global. `const f = Array;`

      // Replace all occurrences of the binding name with the global name
      // Since built-ins are not constants, they can be overridden, so we must be a bit careful here
      if (ASSUME_BUILTINS) {
        vlog('Replacing all cases of "', rhsName, '" with "', lhsName, '"');

        riskyRule('An alias to a built-in global should be renamed to that global');
        example('const x = Array; f(x);', 'f(Array);');
        before(meta.constValueRef.containerNode);

        vgroup();
        meta.reads.forEach(read => {
          before(read.blockBody[read.blockIndex]);

          if (read.parentIndex < 0) read.parentNode[read.parentProp] = AST.identifier(rhsName);
          else read.parentNode[read.parentProp][read.parentIndex] = AST.identifier(rhsName);

          after(read.blockBody[read.blockIndex]);
        });
        vgroupEnd();

        after(meta.constValueRef.containerNode);
        dropped += 1;
        return;
      }

      return
    }

    if (meta2.isConstant) {
      // Main case we target here. `const x = 1; const y = x;`
      if (meta2.constValueRef?.containerNode.type !== 'VariableDeclaration') return; // catch, ???

      vlog('Replacing all cases of "', rhsName, '" with "', lhsName, '"');

      rule('A constant that aliases another constant should have all refs to the second one replaced by the name of the first');
      example('const x = foo; const y = x; f(y);', 'const x = foo; const y = x; f(x);');
      before(meta.constValueRef.containerNode);
      before(meta2.constValueRef.containerNode);

      vgroup();
      meta.reads.forEach(read => {
        before(read.blockBody[read.blockIndex]);

        if (read.parentIndex < 0) read.parentNode[read.parentProp] = AST.identifier(rhsName);
        else read.parentNode[read.parentProp][read.parentIndex] = AST.identifier(rhsName);

        after(read.blockBody[read.blockIndex]);
      });
      vgroupEnd();

      after(meta.constValueRef.containerNode);
      after(meta2.constValueRef.containerNode);
      dropped += 1;

      return;
    }

    // Try to figure out if the assigned (let) binding may have changed before first usage of the constant.
    // If that's not the case then we can change that usage to the rhs instead.
    // So we want to know if `let rhs = x; const lhs = rhs; $(lhs);` and want to change $(lhs) to $(rhs)

    const FOUND = 1;
    const SPIES = 2;
    const INVIS = 3;
    function exprUsesName(expr, targetName, origName, fdata) {
      if (expr.type === 'BinaryExpression') {

        if (!AST.complexExpressionNodeMightSpy(expr.right, fdata) && expr.left.type === 'Identifier' && expr.left.name === targetName) {
          rule('A let alias where the let value can not be changed before the first usage can have its usage replaced; bin usage left');
          example('let x = 1; const y = x; const z = y + 5;', 'let x = 1; const y = x; const z = x + 5;');
          before(expr);
          expr.left.name = origName;
          after(expr);

          ++dropped;
          return FOUND;
        }
        if (!AST.complexExpressionNodeMightSpy(expr.left, fdata) && expr.right.type === 'Identifier' && expr.right.name === targetName) {
          rule('A let alias where the let value can not be changed before the first usage can have its usage replaced; bin usage right');
          example('let x = 1; const y = x; const z = 5 + y;', 'let x = 1; const y = x; const z = 5 + x;');
          before(expr);
          expr.right.name = origName;
          after(expr);

          ++dropped;
          return FOUND;
        }
      }

      if (expr.type === 'UnaryExpression' && expr.argument.type === 'Identifier' && expr.argument.name === targetName) {
        rule('A let alias where the let value can not be changed before the first usage can have its usage replaced; unary usage');
        example('let x = 1; const y = x; const z = !y;', 'let x = 1; const y = x; const z = !x;');
        before(expr);
        expr.argument.name = origName;
        after(expr);

        ++dropped;
        return FOUND;
      }

      if (expr.type === 'CallExpression') {
        if (expr.callee.type === 'Identifier' && expr.callee.name === targetName) {
          rule('A let alias where the let value can not be changed before the first usage can have its usage replaced; call callee usage');
          example('let x = 1; const y = x; const z = y();', 'let x = 1; const y = x; const z = x();');
          before(expr);
          expr.callee.name = origName;
          after(expr);

          ++dropped;
          return FOUND;
        }
        let und;
        if (expr.arguments.some(anode => {
          if (anode.type === 'Identifier' && anode.name === targetName) {
            rule('A let alias where the let value can not be changed before the first usage can have its usage replaced; call arg usage');
            example('let x = 1; const y = x; const z = f(y);', 'let x = 1; const y = x; const z = f(x);');
            before(expr);
            anode.name = origName;
            after(expr);

            ++dropped;
            und = FOUND;
            return true;
          }
          if (AST.complexExpressionNodeMightSpy(anode, fdata)) {
            und = SPIES;
            return true;
          }
        })) {
          return und;
        }
      }

      if (expr.type === 'AssignmentExpression') {
        if (expr.left.type !== 'Identifier') return SPIES;
        if (expr.left.name === targetName) {
          // Can't replace this.
          return FOUND;
        }
        if (expr.right.type === 'Identifier' && expr.right.name === targetName) {
          rule('A let alias where the let value can not be changed before the first usage can have its usage replaced; assign rhs usage');
          example('let x = 1; const y = x; z = y;', 'let x = 1; const y = x; z = x;');
          before(expr);
          expr.right.name = origName;
          after(expr);

          ++dropped;
          return FOUND;
        }
        return exprUsesName(expr.right, targetName, origName, fdata);
      }

      // We might skip places where the ident is used ... :// oh well!

      // Check if the function could have side effects
      if (!AST.complexExpressionNodeMightSpy(expr, fdata)) {
        // A call with args and it can't spy. Like doing Boolean() or coercing a primitive with Number()
        index += 1;
        return INVIS;
      }

      return SPIES
    }

    let index = meta.constValueRef.containerIndex + 1;
    const body = meta.constValueRef.containerParent;

    while (index < body.length) {
      const stmt = body[index];

      if (stmt.type === 'VariableDeclaration') {
        const init = stmt.declarations[0].init;

        const usage = exprUsesName(init, lhsName, rhsName, fdata);
        if (usage === FOUND) break;
        if (usage === SPIES) break;

        index += 1;
        continue;
      }

      if (stmt.type === 'ExpressionStatement') {
        const expr = stmt.expression;

        const usage = exprUsesName(expr, lhsName, rhsName, fdata);
        if (usage === FOUND) break;
        if (usage === SPIES) break;

        index += 1;
        continue;
      }

      // Unsupported statement. Maybe we canshould support it? :)
      break;
    }
  });

  if (dropped) {
    log('Dropped const aliases:', dropped, '. Restarting from phase1');
    return {what: 'constAliasing', changes: dropped, next: 'phase1'};
  }

  log('Dropped const aliases: 0.');
}
