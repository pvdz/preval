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
//        const x = unknown; $(x);
// ->     $(unknown);
//
// Or even assignments
//
//        const x = unknown; y = x; z = x; $(x, y);
// ->     const x = unknown; y = unknown; z = unknown; $(x, y)
//
// Also handles some "ternary" cases, where a binding is conditionally initialized but still always to the same binding.
//

import { ASSERT, log, group, groupEnd, vlog, vgroup, vgroupEnd, fmat, tmat, rule, example, before, source, after, findBodyOffset, riskyRule, todo, } from '../utils.mjs';
import * as AST from '../ast.mjs';
import { ASSUME_BUILTINS } from '../constants.mjs';
import { SYMBOL_FRFR } from '../symbols_preval.mjs';

export function constAliasing(fdata) {
  group('\n\n\n[constAliasing] Searching for two const values that get assigned to each other\n');
  //currentState(fdata, 'constAliasing', true, fdata);
  const r = _constAliasing(fdata);
  groupEnd();
  return r;
}
function _constAliasing(fdata) {
  // `const a = x; const b = a; f(b);` --> `f(a);`

  let dropped = 0;
  const queue = [];

  fdata.globallyUniqueNamingRegistry.forEach((meta, lhsName) => {
    if (meta.isBuiltin) return;
    if (meta.isImplicitGlobal) return;
    if (meta.isCatchVar) return;
    if (meta.isExport) return; // Exports are "live" bindings so any update to it might be observable in strange ways
    if (!meta.isConstant) {
      if (meta.isTernaryConst) {
        handleTernaryConst(meta);
      }
      return;
    }
    if (meta.writes.length !== 1) return;
    if (meta.writes[0].kind !== 'var') return; // catch or smth
    if (meta.varDeclRef.varDeclNode.init.type !== 'Identifier') return;

    const rhsName = meta.varDeclRef.varDeclNode.init.name;
    vlog('- Testing:', [lhsName], 'with', [rhsName]);
    if (rhsName === lhsName) return vlog('- bail: this is tdz'); // TDZ but not my problem, should be caught elsewhere
    if (rhsName === 'arguments') return vlog('- bail: this is a special symbol');

    const meta2 = fdata.globallyUniqueNamingRegistry.get(rhsName);
    if (meta2.isBuiltin) {
      // special case aliasing a known builtin global. `const f = Array;`

      // Replace all occurrences of the binding name with the global name
      // Since built-ins are not constants, they can be overridden, so we must be a bit careful here
      if (ASSUME_BUILTINS) {
        vlog('Replacing all cases of "', rhsName, '" with "', lhsName, '"');

        riskyRule('An alias to a built-in global should be renamed to that global');
        example('const x = Array; f(x);', 'f(Array);');
        before(meta.varDeclRef.varDeclNode);

        vgroup();
        meta.reads.forEach(read => {
          before(read.blockBody[read.blockIndex]);

          if (read.parentIndex < 0) read.parentNode[read.parentProp] = AST.identifier(rhsName);
          else read.parentNode[read.parentProp][read.parentIndex] = AST.identifier(rhsName);

          after(read.blockBody[read.blockIndex]);
        });
        vgroupEnd();

        after(meta.varDeclRef.varDeclNode);
        dropped += 1;
        return;
      }

      return
    }

    //if (meta2.isImplicitGlobal) return;
    //if (meta2.isExport) return; // Exports are "live" bindings so any update to it might be observable in strange ways

    if (meta2.isConstant) {
      // Main case we target here. `const x = 1; const y = x;`

      vlog('Replacing all cases of "', rhsName, '" with "', lhsName, '"');

      rule('A constant that aliases another constant should have all refs to the second one replaced by the name of the first');
      example('const x = foo; const y = x; f(y);', 'const x = foo; const y = x; f(x);');
      before(meta.varDeclRef.varDeclNode);
      before(meta2.varDeclRef.varDeclNode);

      vgroup();
      meta.reads.forEach(read => {
        before(read.blockBody[read.blockIndex]);

        if (read.parentIndex < 0) read.parentNode[read.parentProp] = AST.identifier(rhsName);
        else read.parentNode[read.parentProp][read.parentIndex] = AST.identifier(rhsName);

        after(read.blockBody[read.blockIndex]);
      });
      vgroupEnd();

      after(meta.varDeclRef.varDeclNode);
      after(meta2.varDeclRef.varDeclNode);
      dropped += 1;

      return;
    }

    // This is alt-path. The rhs is not a constant, maybe even an implicit global.

    // Case 1: all usages of the const happen before the rhs has an opportunity to change
    // Example: `let rhs = x; const lhs = rhs; $(lhs);` in that case we want to change $(lhs) to $(rhs)
    // Example: `let rhs = x; const lhs = rhs; $(lhs); x = 10; $(lhs);` in that case we can only change the first usage, not both

    const FOUND = 1;
    const SPIES = 2;
    const INVIS = 3;
    function exprUsesName(expr, targetName, origName, fdata) {
      // Check if the target name is used. If so, replace it with origName.
      // If not, check if the expression can spy. If it does, that's the end of the search.
      // Otherwise, this expression is spy free and we can continue searching.

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

        // Cannot risk coercion issues
        return SPIES;
      }

      if (expr.type === 'UnaryExpression') {
        if (expr.argument.type === 'Identifier' && expr.argument.name === targetName) {
          rule('A let alias where the let value can not be changed before the first usage can have its usage replaced; unary usage');
          example('let x = 1; const y = x; const z = !y;', 'let x = 1; const y = x; const z = !x;');
          before(expr);
          expr.argument.name = origName;
          after(expr);

          ++dropped;
          return FOUND;
        }

        // Cannot risk coercion issues
        return SPIES;
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

        if (expr.callee.type === 'Identifier' && expr.callee.name === SYMBOL_FRFR) {
          // We know $frf can't spy and it should not change global vars so this call should be safe to ignore.
          return INVIS;
        }

        // Cannot risk side effects
        return SPIES;
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

      // Check if the init could have side effects
      // A function/class/array/object literal most of the time can't spy (but in some edge cases it could)
      if (!AST.complexExpressionNodeMightSpy(expr, fdata)) {
        // A call with args and it can't spy. Like doing Boolean() or coercing a primitive with Number()
        index += 1;
        return INVIS;
      }

      return SPIES
    }

    function scanBlock(index, body) {
      // meta2 is assigned to meta1 (a constant). If we can prove that meta2 cannot change before meta1's
      // usage then the usage must be able to refer to meta2 directly, regardless.
      while (index < body.length) {
        const stmt = body[index];

        if (stmt.type === 'VarStatement') {
          const init = stmt.init;

          const usage = exprUsesName(init, lhsName, rhsName, fdata);
          if (usage === FOUND) return usage;
          if (usage === SPIES) return usage;

          index += 1;
          continue;
        }

        if (stmt.type === 'ExpressionStatement') {
          const expr = stmt.expression;

          const usage = exprUsesName(expr, lhsName, rhsName, fdata);
          if (usage === FOUND) return usage;
          if (usage === SPIES) return usage;

          index += 1;
          continue;
        }

        if (stmt.type === 'EmptyStatement') {
          index += 1;
          continue;
        }

        if (stmt.type === 'DebuggerStatement') {
          index += 1;
          continue;
        }

        if (stmt.type === 'ReturnStatement') {
          const usage = exprUsesName(stmt.argument, lhsName, rhsName, fdata);
          if (usage === FOUND) return usage;
          if (usage === SPIES) return usage;
          break;
        }

        if (stmt.type === 'ThrowStatement') {
          const usage = exprUsesName(stmt.argument, lhsName, rhsName, fdata);
          if (usage === FOUND) return usage;
          if (usage === SPIES) return usage;
          break;
        }

        if (stmt.type === 'BreakStatement') {
          // I think this is fine. It should end the current block but if
          // this happens in like an `if` then that's fine. Either meta2
          // might have changed and then we bail regardless, or it would
          // not have and we safely allow it to continue after the label.
          // Or the other branch continues and worst case we're over-defensive.
          break;
        }

        if (stmt.type === 'IfStatement') {
          const a = scanBlock(0, stmt.consequent.body);
          const b = scanBlock(0, stmt.alternate.body);
          if (a === SPIES) return a;
          if (b === SPIES) return b;
          if (a === FOUND) return a;
          if (b === FOUND) return b;
          // Do we need to break if we haven't already?
          break;
        }

        if (stmt.type === 'LabeledStatement') {
          const usage = scanBlock(0, stmt.body.body);
          if (usage === FOUND) return usage;
          if (usage === SPIES) return usage;
          // Do we need to break if we haven't already?
          break;
        }

        // Unsupported statement. Maybe we canshould support it? :)
        todo(`can we support this const aliasing blocking statement? ${stmt.type}`);
        break;
      }
    }

    // meta2 is assigned to meta1 (a constant). If we can prove that meta2 cannot change before meta1's
    // usage then the usage must be able to refer to meta2 directly, regardless.
    let index = meta.varDeclRef.varDeclIndex + 1;
    const body = meta.varDeclRef.varDeclBody;
    scanBlock(index, body);
  });

  function handleTernaryConst(meta) {
    // We can salvage this.
    // If this var is consistently set to the same binding that is a const (or even other ternaryconst) in all writes then it's an alias anyways
    // and we can dedupe them.
    let bindingName;
    const ok = meta.writes.every((write, i) => {
      if (i===0 && meta.ternaryWritesIgnoreFirst) return true;
      const rhs = write.parentNode.type === 'VarStatement' ? write.parentNode.init : write.parentNode.right;
      if (rhs.type !== 'Identifier') return; // Whatever.
      if (bindingName) return bindingName === rhs.name;
      // Ok we're searching for this name now.
      bindingName = rhs.name;
      return true;
    });
    if (!ok) return; // all relevant writes did not get same ident assigned
    const rhsMeta = fdata.globallyUniqueNamingRegistry.get(bindingName);
    if (rhsMeta.isConstant || rhsMeta.isTernaryConst) {
      rule('When a ternary const binding is assigned the same binding that is a const or ternary const, eliminate the first binding');
      example(
        'let a = 0; let b = 0; if (x) { a = 1; b = a; } else { a = 2; b = a; } $(b)',
        'let a = 0; if (x) { a = 1; } else { a = 2; } $(a)',
      );

      // Eliminate all writes. They should be statements so just replace the statement.
      // Replace all reads by the other name.
      // TODO: we can do better; cleanup with queue
      meta.writes.forEach(write => {
        before(write.blockBody[write.blockIndex]);
        write.blockBody[write.blockIndex] = AST.emptyStatement()
        after(write.blockBody[write.blockIndex]);

        queue.push({
          index: write.blockIndex,
          func: () => write.blockBody.splice(write.blockIndex, 1), // Drop the empty statement
        });
      });
      meta.reads.forEach(read => {
        before(read.blockBody[read.blockIndex]);
        if (read.parentIndex < 0) read.parentNode[read.parentProp] = AST.identifier(bindingName);
        else read.parentNode[read.parentProp][read.parentIndex] = AST.identifier(bindingName);
        after(read.blockBody[read.blockIndex]);
      });
      dropped += 1;
    }
  }

  if (dropped) {
    queue.sort(({ index: a }, { index: b }) => (a < b ? 1 : a > b ? -1 : 0));
    queue.forEach(({ index, func }) => func());

    log('Dropped const aliases:', dropped, '. Restarting from phase1');
    return {what: 'constAliasing', changes: dropped, next: 'phase1'};
  }

  log('Dropped const aliases: 0.');
}
