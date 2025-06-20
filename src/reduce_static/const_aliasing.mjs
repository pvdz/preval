// Find constants whose assignment is redundant because the rhs is a constant or a let that
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
//        let x = 0; const y = x; $(); $(y); x += 1; $(x);
// ->     let x = 0; const y = x; $(); $(x); x += 1; $(x);
//
// Or even assignments
//
//        const x = unknown; y = x; z = x; $(x, y);
// ->     const x = unknown; y = unknown; z = unknown; $(x, y)
//                                     ^//
// Also handles some "ternary" cases, where a binding is conditionally initialized but still always to the same binding.
//

import { ASSERT, log, group, groupEnd, vlog, vgroup, vgroupEnd, fmat, tmat, rule, example, before, source, after, findBodyOffset, riskyRule, todo, currentState } from '../utils.mjs';
import * as AST from '../ast.mjs';
import { ASSUME_BUILTINS } from '../constants.mjs';
import { SYMBOL_FRFR } from '../symbols_preval.mjs';
import { hasSingleScopedWrites } from '../bindings.mjs';

export function constAliasing(fdata) {
  group('\n\n\n[constAliasing] Searching for two const values that get assigned to each other\n');
  // currentState(fdata, 'constAliasing', true, fdata);
  const r = _constAliasing(fdata);
  groupEnd();
  return r;
}
function _constAliasing(fdata) {
  // `const a = x; const b = a; f(b);` --> `f(a);`

  let dropped = 0;
  const queue = [];

  // First search for the `a`
  fdata.globallyUniqueNamingRegistry.forEach((meta, lhsName) => {
    if (!meta.isConstant) {
      if (meta.isBuiltin) return;
      if (meta.isImplicitGlobal) return;
      if (meta.isCatchVar) return;
      if (meta.isExport) return; // Exports are "live" bindings so any update to it might be observable in strange ways

      if (meta.isTernaryConst) {
        handleTernaryConst(meta);
      }
      return;
    }
    ASSERT(!meta.isBuiltin && !meta.isImplicitGlobal && !meta.isCatchVar && !meta.isLet, 'constant supersedes these', meta);
    if (meta.writes.length !== 1) return; // caught elsewhere
    if (meta.writes[0].kind !== 'var') return todo('what is a constant with one write but not a var as first write?'); // catch or smth
    if (meta.varDeclRef.node.type !== 'Identifier') return;
    const rhsName = meta.varDeclRef.node.name;

    // Okay so meta is `a`, which is a `const`. meta2 will represent `b` and could be any kind of binding
    // - If `a` and `b` are constants then the inlining is trivial. Just rename one for the other, arbitrarily.
    // - If `b` is a builtin then replace `a` with `b` but ONLY if `a` is not exported (otherwise it leads to syntax errors)
    //   - a sub rule could still do the aliasing while making sure the syntax error does not happen. Not sure if there's a concrete real-world use case.
    // - If `b` is not written to between the var decl and a particular reference of `a` then for all intentions and purposes a===b, so we can replace that read
    //   - We only care about the writes, so if we can confirm the writes are in this function, I think we can safely go down the single scoped path...?
    //   - This one is tricky and breaks apart in several sub-parts
    //

    // We have a `const lhs = rhs`
    vlog('- Testing:', [lhsName], 'with', [rhsName]);
    if (rhsName === lhsName) return vlog('- bail: this is tdz'); // TDZ but not my problem, should be caught elsewhere
    if (rhsName === 'arguments') return vlog('- bail: this is a special symbol');

    const meta2 = fdata.globallyUniqueNamingRegistry.get(rhsName);
    if (meta2.isBuiltin) {
      // special case aliasing a known builtin global. `const f = Array;`

      // Replace all occurrences of the binding name with the global name
      // Since built-ins are not constants, they can be overridden, so we must be a bit careful here
      if (ASSUME_BUILTINS) {
        if (meta.isExport) {
          // Example that breaks: `const x = undefned; export {x as y};` -> `export {undefined as y}` fails
          todo('Exported members must have a local binding so this leads to failure but we could still inline other local occurrences');
          return;
        }

        vlog('Rhs is a builtin. Replacing all cases of "', lhsName, '" with builtin "', rhsName, '"');

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

    if (meta2.isConstant) {
      // Main case we target here. `const x = 1; const y = x;`
      // I think here the export case is not important? Both are immutable after all.

      vlog('Replacing all cases of "', lhsName, '" with constant "', rhsName, '"');

      rule('A constant that aliases another constant should have all refs to the lhs replaced by the rhs');
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

    if (!meta2.isExplicitVar) return; // Not implicit global, not catch var, etc
    if (meta.isExport) return; // ?
    if (meta2.isExport) return; // ?

    // Okay. Now we have const `a` and let `b`, for any read of `a` we have to determine whether `b` is still the same value as when `a` was declared.
    // - single scoped b
    //   - if `b` has no write between decl of `a` and a particular read of `a` then this read should be an alias. both must be in same loop scope.
    //     - refinement; if the violating write(s) is/are only in the "other" branch than the one where the read happens, we're still good
    //       - this gets hard fast, especially with multiple levels of nesting
    //   - I'm not sure what other ways we need to investigate here. "if we can prove it was reassigned the same value as before the loop" etc is super niche.
    // - multi-scoped b
    //   - we have to be super conservative here. can't use reads/writes reliably for this. step through the statements and find the reference before
    //     finding an observable side effect. with some edge cases in mind. and here too, must be same loop, but also same branch and try scope...

    // Note: we have a reducer "letAliasRedundant" that aliases a let to a let, does kind of the same thing. This is aliasing a const to a let.

    const declWrite1 = meta.writes[0];
    ASSERT(declWrite1?.kind === 'var', 'there is a write and it is the decl, yes?', declWrite1);

    const declWrite2 = meta2.writes[0];
    if (declWrite2.kind !== 'var') return vlog('  - Bail: first write of rhs was not a var decl');

    // Both vars must be declared in same function scope. Otherwise we don't know which value was assigned to the const.
    if (declWrite1.funcChain !== declWrite2.funcChain) return vlog('  - Bail: vars are not declared inside same func');

    if (hasSingleScopedWrites(meta2)) { // subsumes .singleScoped
      vlog(`It seems const \`${lhsName}\` is a const that is the alias of let \`${rhsName}\``, );

      // I think, if meta2/rhs is a single-scoped-writes-let, that we can assert that there is no further write to
      // it before the end of the current block where the lhs is defined in (after which mutations are irrelevant).
      // In that case, at least for the remaining duration of the block, the lhs is an alias to the rhs. Even loops
      // and try/catch can't change that. A loop would destroy the var upon looping. A try/catch basically does too.
      // And the single scoped nature means closures can't mess with us either; all refs are source visit order.
      const body = declWrite1.blockBody;

      const firstPid = declWrite1.node.$p.npid;

      vgroup('Checking whether there is a read for which all writes of meta2 are not between the const decl and the read');
      let droppedSome = false;
      meta.reads.forEach((read,i) => {
        // We have to prove no read is between the write (const decl) and this read
        // - do pid range check
        // - confirm same innerloop

        // Confirm that the read is in same loop as its decl. Loops can break the invariant that we test here.
        if (read.innerLoop !== declWrite1.innerLoop) {
          // nested part will be difficult. unless we set start/end pid instead of inner loop (same for others). helpful or noise?
          // what if we stored the loopChain instead. Then we can do prefix checks for this sort of thing ...
          todo('we can still proceed with the loop as long as there is no let-write anywhere in the loop, inc nested');
          return vlog('  - Bail: read is not loop as decl');
        }

        const readPid = read.node.$p.npid;
        vlog('- read', i, ', write innerloop=', declWrite1.innerLoop, ', read=', read.innerLoop, ', pid @', readPid);
        if (
          meta2.writes.every(write => {
            const pid = write.node.$p.npid;
            // One edge case: the pid of the write `rhs = lhs` will be higher than the read pid because it is visit order, not source order.
            // This would be `let x = 1; const y = x; x = y;`, in which case it's indeed `x=x` so that's fine.
            vlog('- write pid: @', pid, ', violation:', pid > firstPid && pid < readPid);

            if (pid > firstPid && pid < readPid) {
              // TODO: What if the write is in a different branch from the read? `let a = 1; const b = a; if (x) a = 2; else $(b)`, b is an alias
              //       This also applies when the branch is in an ancestor if-node. we can't easily do this in preval.
              vlog('At least one right of the rhs was between the decl and the end of the block with the decl so we must bail');
              return false;
            }
            // TODO: Need to verify that this write is unconditional: no write in the same if, loop, or try, after the read
            // - if there's a write between the decl and the read in the same loop then the value may change in a next iteration
            // - if there's a write after the read but in the same loop as read and read and loop are not equal, value may change
            // - how relevant is this for the try-block?
            return true;
          })
        ) {
          vlog('ok, meta2 (', rhsName, ') should be a proper alias to this read of', lhsName);
          // TODO: Where this misses the spot is conditional writes on a dead-end branch.
          //       `let a = 1; const b = a; if (x) { a = 2; return; } $(b);` -> here b is
          //       still totally an alias for a in all cases. But we see the write and bail.
          // TODO: This misses an if-else where the read is in the else branch but a write
          //       in the then-branch. Fine to alias but since a write.pid < read.pid, it bails

          rule('A let alias where the single scoped let rhs can not be changed between assign and end of containing block, is effectively a const alias');
          example('let x = 1; if ($) x = 2; const y = x; const z = y + 5;', 'let x = 1; if ($) x = 2; const y = x; const z = x + 5;');
          before(body[declWrite1.blockIndex]);
          before(read.blockBody[read.blockIndex]);

          if (read.parentIndex < 0) read.parentNode[read.parentProp] = AST.identifier(rhsName);
          else read.parentNode[read.parentProp][read.parentIndex] = AST.identifier(rhsName);

          after(body[declWrite1.blockIndex]);
          after(read.blockBody[read.blockIndex]);

          dropped += 1;
          droppedSome = true;
        }
      });
      vgroupEnd();
      if (droppedSome) return;
    }
vlog('early bail');
return

    // This code has some subtle bugs I'm trying to squash.
    // There's also some reducer duplication between this part and letAliasRedundant (and probably others?)
    // Since I have a chicken egg problem I'm going to start by disabling this while tacklign that...
    // Note: tests/cases/return/closure.md is the main concern throughout this bug hunt, the rest is easy/fine.
    return console.log('temporarily disabled const aliasing for let. should probably move this to letAliasRedundant, anyways');

    // This is alt-path. The rhs is not a constant, maybe even an implicit global, catch var, and potentially exported.

    // Assert: all usages of the const happen before the rhs has an opportunity to change
    // Example: `let rhs = x; const lhs = rhs; $(lhs);` in that case we want to change $(lhs) to $(rhs)
    // Example: `let rhs = x; const lhs = rhs; $(lhs); x = 10; $(lhs);` in that case we can only change the first usage, not both
    // Have to do solid side effect analysis

    const FOUND = 1;
    const SPIES = 2;
    const INVIS = 3;
    // Helper: recursively check if a statement or block mutates the let variable
    function blockMutatesLetVar(stmts, letName) {
      for (const stmt of stmts) {
        if (stmt.type === 'VarStatement' && stmt.init.type === 'AssignmentExpression') {
          if (stmt.init.left.type === 'Identifier' && stmt.init.left.name === letName) return true;
        }
        if (stmt.type === 'ExpressionStatement' && stmt.expression.type === 'AssignmentExpression') {
          if (stmt.expression.left.type === 'Identifier' && stmt.expression.left.name === letName) return true;
        }
        if (stmt.type === 'IfStatement') {
          if (blockMutatesLetVar(stmt.consequent.body, letName) || blockMutatesLetVar(stmt.alternate.body, letName)) return true;
        }
        if (stmt.type === 'LabeledStatement') {
          if (blockMutatesLetVar(stmt.body.body, letName)) return true;
        }
        if (stmt.type === 'WhileStatement' || stmt.type === 'ForStatement') {
          if (blockMutatesLetVar(stmt.body.body, letName)) return true;
        }
        // Add more as needed
      }
      return false;
    }
    function exprUsesName(expr, targetName, origName, fdata) {
      // Check if the target name is used. If so, replace it with origName.
      // If not, check if the expression can spy. If it does, that's the end of the search.
      // Otherwise, this expression is spy free and we can continue searching.

      // NEW: If this expression is an assignment to the original let variable, block aliasing
      if (expr.type === 'AssignmentExpression') {
        if (expr.left.type === 'Identifier' && expr.left.name === origName) {
          return SPIES;
        }
      }
      // NEW: If this is a block that mutates the let variable, block aliasing
      if (expr.type === 'BlockStatement' && blockMutatesLetVar(expr.body, origName)) {
        return SPIES;
      }

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

        // NEW: If the block mutates the let variable, block aliasing
        if (blockMutatesLetVar(body.slice(index), rhsName)) return SPIES;

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
    queue.sort(({ index: a }, { index: b }) => b - a);
    queue.forEach(({ index, func }) => func());

    log('Dropped const aliases:', dropped, '. Restarting from phase1');
    return {what: 'constAliasing', changes: dropped, next: 'phase1'};
  }

  log('Dropped const aliases: 0.');
}
