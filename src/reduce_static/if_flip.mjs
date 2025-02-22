// Find `if` statements where we can trivially detect the test to be `!` inverted, and invert them.
//
//      const x = !y; if (x) f(); else g();
// ->
//      const x = !y; if (y) g(); else f();

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

export function ifFlipping(fdata) {
  group('\n\n\nFinding inverted if tests and flip them\n');
  const r = _ifFlipping(fdata);
  groupEnd();
  return r;
}
function _ifFlipping(fdata) {
  const ast = fdata.tenkoOutput.ast;

  let changed = 0;

  // TODO: is the walking of individual if statements here more efficient than the gc pressure of collecting all if-statements and their parent etc in phase1 (often redundantly so)?
  walk(_walker, ast, 'ast');
  function _walker(node, beforeWalk, nodeType, path) {
    if (beforeWalk) return;
    if (node.type !== 'IfStatement') return;
    if (node.test.type !== 'Identifier') return;

    const testName = node.test.name;

    const meta = fdata.globallyUniqueNamingRegistry.get(testName);
    if (meta.isImplicitGlobal) return;
    if (meta.isBuiltin) return;
    if (meta.isExport) return;
    if (meta.tainted) return; // Already visited this run. Index caches may be busted. Wait for another phase1 round.

    if (meta.isConstant) {
      ASSERT(meta.writes.length === 1, 'fixme if this becomes legit');

      const write = meta.writes[0];
      ASSERT(write.blockBody[write.blockIndex].type === 'VariableDeclaration');

      if (write.parentNode.init.type === 'UnaryExpression' && write.parentNode.init.operator === '!') {

        const arg = write.parentNode.init.argument;
        if (arg.type === 'Identifier' && !AST.isPrimitive(arg)) {
          const argMeta = fdata.globallyUniqueNamingRegistry.get(arg.name);
          if (argMeta.isImplicitGlobal) {
            vlog('Not applying this to an implicit binding');
            return;
          }
        }

        // This is the trivial target we are aiming for. Flip it.
        // If the argument is an identifier, use that instead. The `!` cannot be observed, nor can the if-test.
        // All reads will do the same and we don't need to update the init to eliminate the `!`.
        // If this causes the alias to no longer be used it will get collected by another rule.

        rule('If the test of an if is a trivial inverted identifier, use that ident instead and flip the if');
        example('const x = !y; if (x) f(); else g();', 'const x = !y; if (y) g(); else f();');
        before(node);

        node.test = AST.cloneSimple(write.parentNode.init.argument);
        const bak = node.consequent;
        node.consequent = node.alternate;
        node.alternate = bak;

        after(node);
        ++changed;
        meta.tainted = true;
      } else if (
        write.parentNode.init.type === 'CallExpression' &&
        write.parentNode.init.callee.type === 'Identifier' &&
        write.parentNode.init.callee.name === 'Boolean'
      ) {
        const arg = write.parentNode.init['arguments'].length && write.parentNode.init['arguments'][0];
        if (arg?.type === 'Identifier' && !AST.isPrimitive(arg)) {
          const argMeta = fdata.globallyUniqueNamingRegistry.get(arg.name);
          if (argMeta.isImplicitGlobal) {
            vlog('Not applying this to an implicit binding');
            return;
          }
        }

        // This is the trivial target we are aiming for. Unwrap it.
        // If the argument is an identifier, use that instead. The `Boolean()` cannot be observed, nor can the if-test.
        // All reads will do the same and we don't need to update the init to eliminate the `Boolean()`.
        // If this causes the alias to no longer be used it will get collected by another rule.
        rule('If the test of an if is a trivial inverted identifier, use that ident instead, leave if alone');
        example('const x = Boolean(y); if (x) f(); else g();', 'const x = Boolean(y); if (y) f(); else g();');
        before(node);

        node.test = AST.cloneSimple(write.parentNode.init.arguments[0] ?? AST.identifier('undefined'));
        // Note: for Boolean the consequent and alternate do not swap.

        after(node);
        ++changed;
        meta.tainted = true;
      } else if (
        write.parentNode.init.type === 'BinaryExpression' &&
        // The `!==` op is not observable
        (write.parentNode.init.operator === '!==' ||
          // The `!=` coerces, but when comparing it to null or undefined it is not observable
          // See https://tc39.es/ecma262/#sec-abstract-equality-comparison
          (write.parentNode.init.operator === '!=' &&
            (AST.isUndefined(write.parentNode.init.left) ||
              AST.isNull(write.parentNode.init.left) ||
              AST.isUndefined(write.parentNode.init.right) ||
              AST.isNull(write.parentNode.init.right))))
      ) {
        // If this binding was only used as `if` tests then we can safely flip it
        // Honestly, not sure if this makes any difference for the process, though it should lead to more homogeneous
        // code which might lead to easier to recognize patterns. But this won't eliminate `!==` so it doesn't really matter.
        // TODO: should we do the same for > and >= ? What about != (maybe on null/undefined). Anything else?
        if (meta.reads.every((read) => read.parentNode.type === 'IfStatement' && read.parentProp === 'test')) {
          rule('A binding with `!==` init that is only used in `if` tests can be flipped');
          example('const x = y !== 1; if (x) f(); else g();', 'const x = y === 1; if (x) g(); else y();');
          before(write.blockBody[write.blockIndex]);

          write.parentNode.init.operator = write.parentNode.init.operator === '!==' ? '===' : '==';

          vgroup();
          meta.reads.forEach((read) => {
            vlog('- Next read:');
            const ifNode = read.parentNode;
            before(ifNode);
            const bak = ifNode.consequent;
            ifNode.consequent = ifNode.alternate;
            ifNode.alternate = bak;
            after(ifNode);
          });
          vgroupEnd();

          after(write.blockBody[write.blockIndex]);
          ++changed;
          meta.tainted = true;
        }
      }
    } else {
      const parentNode = path.nodes[path.nodes.length - 2];
      const parentProp = path.props[path.props.length - 1];
      const parentIndex = path.indexes[path.indexes.length - 1];

      const prevNode = parentIndex > 0 && parentNode[parentProp][parentIndex - 1];
      if (
        // Check the `let x = y; if (x)` case
        prevNode &&
        prevNode.type === 'VariableDeclaration' &&
        prevNode.declarations[0].id.name === testName &&
        !AST.isComplexNode(prevNode.declarations[0].init)
      ) {
        // The statement before this `if` statement was the var decl on which is being tested and the name is just an alias.
        // While the binding may still change later on, it can not have between the var decl and the `if`, so we can use that name.
        // This way we can potentially eliminate some alias usages, allowing SSA.
        rule('When an `if` test is a `let` alias and there were no statements between the var decl and the `if`, the alias is redundant');
        example('let x = y; if (x) f();', 'let x = y; if (y) f();');
        before(prevNode);
        before(node);

        node.test = AST.cloneSimple(prevNode.declarations[0].init);

        after(node);
        ++changed;
        meta.tainted = true;
      } else if (
        // Check the `let x = !y; if (x)` case
        prevNode &&
        prevNode.type === 'VariableDeclaration' &&
        prevNode.declarations[0].id.name === testName &&
        prevNode.declarations[0].init.type === 'UnaryExpression' &&
        prevNode.declarations[0].init.operator === '!'
      ) {
        // The statement before this `if` statement was the var decl on which is being tested and the name is just an inverted alias.
        // While the binding may still change later on, it can not have between the var decl and the `if`, and `!` is also not observable
        // so we can use that name directly if we flip the `if` branches. This way we can potentially eliminate some alias usages.
        rule(
          'When an `if` test is an inverted `let` alias and there were no statements between the var decl and the `if`, the alias is redundant',
        );
        example('let x = !y; if (x) f(); else g();', 'let x = true; if (y) { x = false; g(); } else { x = true; f(); }');
        before(prevNode);
        before(node);

        node.consequent.body.unshift(AST.expressionStatement(AST.assignmentExpression(node.test.name, AST.tru())));
        node.alternate.body.unshift(AST.expressionStatement(AST.assignmentExpression(node.test.name, AST.fals())));

        node.test = AST.cloneSimple(prevNode.declarations[0].init.argument);
        prevNode.kind = 'let';
        prevNode.declarations[0].init = AST.fals(); // or true; shouldn't matter?
        const bak = node.consequent;
        node.consequent = node.alternate;
        node.alternate = bak;

        before(prevNode);
        after(node);
        ++changed;
        meta.tainted = true;
      } else if (
        // Check the `let x = Boolean(y); if (x)` case
        prevNode &&
        prevNode.type === 'VariableDeclaration' &&
        prevNode.declarations[0].id.name === testName &&
        prevNode.declarations[0].init.type === 'CallExpression' &&
        prevNode.declarations[0].init.callee.type === 'Identifier' &&
        prevNode.declarations[0].init.callee.name === 'Boolean'
      ) {
        // The statement before this `if` statement was the var decl on which is being tested and the name is just a boolean alias.
        // While the binding may still change later on, it can not have between the var decl and the `if`, and `Boolean()` is also not observable
        // so we can use that name directly if we flip the `if` branches. This way we can potentially eliminate some alias usages.
        rule(
          'When an `if` test is a Boolean() `let` alias and there were no statements between the var decl and the `if`, the alias is redundant',
        );
        example('let x = Boolean(y); if (x) f(); else g();', 'let x = false; if (y) { x = false; g(); } else { x = true; f(); }');
        before(prevNode);
        before(node);

        node.consequent.body.unshift(AST.expressionStatement(AST.assignmentExpression(node.test.name, AST.tru())));
        node.alternate.body.unshift(AST.expressionStatement(AST.assignmentExpression(node.test.name, AST.fals())));

        node.test = AST.cloneSimple(prevNode.declarations[0].init.arguments[0] ?? AST.identifier('undefined'));
        prevNode.kind = 'let';
        prevNode.declarations[0].init = AST.fals(); // or true; shouldn't matter?

        after(node);
        ++changed;
        meta.tainted = true;
      }

      // If the binding was only used as `if` tests and all writes are inverting,
      // then we can still invert all of them and all the ifs that test on it :)
      else if (
        // Confirm all reads are if-tests
        meta.reads.every((read) => read.parentNode.type === 'IfStatement' && read.parentProp === 'test')
      ) {
        if (
          // Confirm all writes are inverting something
          meta.writes.every(
            (write) =>
              (write.kind === 'var' && write.parentNode.init.type === 'UnaryExpression' && write.parentNode.init.operator === '!') ||
              (write.kind === 'assign' && write.parentNode.right.type === 'UnaryExpression' && write.parentNode.right.operator === '!'),
          )
        ) {
          rule('If a binding only has inverted values and is only used as `if` tests it should invert everything');
          example('let x = !a; if (x) f(); else x = !b; if (x) g(); else h();', 'let x = a; if (x) x = b; else f(); if (x) h(); else g();');

          vgroup('Dropping the `!` from all writes');
          meta.writes.forEach((write) => {
            before(write.blockBody[write.blockIndex]);

            if (write.kind === 'var') {
              write.parentNode.init = write.parentNode.init.argument;
            } else if (write.kind === 'assign') {
              write.parentNode.right = write.parentNode.right.argument;
            } else {
              ASSERT(false);
            }

            after(write.blockBody[write.blockIndex]);
          });
          vgroupEnd();

          vgroup('Flipping ifs');
          meta.reads.forEach((read) => {
            before(read.blockBody[read.blockIndex]);

            const bak = read.parentNode.consequent;
            read.parentNode.consequent = read.parentNode.alternate;
            read.parentNode.alternate = bak;

            after(read.blockBody[read.blockIndex]);
          });
          vgroupEnd();

          vlog('done!');
          ++changed;
          meta.tainted = true;
        } else if (
          // Confirm all writes are using not equals != null, != undefined, or !==
          meta.writes.every(
            (write) =>
              // Confirm all values assigned to this binding are using != or !==
              (write.kind === 'var' &&
                write.parentNode.init.type === 'BinaryExpression' &&
                (write.parentNode.init.operator === '!==' ||
                  // The `!=` coerces, but when comparing it to null or undefined it is not observable
                  // See https://tc39.es/ecma262/#sec-abstract-equality-comparison
                  (write.parentNode.init.operator === '!=' &&
                    (AST.isUndefined(write.parentNode.init.left) ||
                      AST.isNull(write.parentNode.init.left) ||
                      AST.isUndefined(write.parentNode.init.right) ||
                      AST.isNull(write.parentNode.init.right))))) ||
              (write.kind === 'assign' &&
                write.parentNode.right.type === 'BinaryExpression' &&
                (write.parentNode.right.operator === '!==' ||
                  // The `!=` coerces, but when comparing it to null or undefined it is not observable
                  // See https://tc39.es/ecma262/#sec-abstract-equality-comparison
                  (write.parentNode.right.operator === '!=' &&
                    (AST.isUndefined(write.parentNode.right.left) ||
                      AST.isNull(write.parentNode.right.left) ||
                      AST.isUndefined(write.parentNode.right.right) ||
                      AST.isNull(write.parentNode.right.right))))),
          )
        ) {
          rule('If a binding only has not-equal results and is only used as `if` tests it should invert everything');
          example(
            'let x = a !== b; if (x) f(); else x = a !== c; if (x) g(); else h();',
            'let x = a === b; if (x) x = a === c; else f(); if (x) h(); else g();',
          );

          vgroup('Dropping the `!=` and `!==` from all writes');
          meta.writes.forEach((write) => {
            before(write.blockBody[write.blockIndex]);

            if (write.kind === 'var') {
              write.parentNode.init.operator = write.parentNode.init.operator === '!==' ? '===' : '==';
            } else if (write.kind === 'assign') {
              write.parentNode.right.operator = write.parentNode.right.operator === '!==' ? '===' : '==';
            } else {
              ASSERT(false);
            }

            after(write.blockBody[write.blockIndex]);
          });
          vgroupEnd();

          vgroup('Flipping ifs');
          meta.reads.forEach((read) => {
            before(read.blockBody[read.blockIndex]);

            const bak = read.parentNode.consequent;
            read.parentNode.consequent = read.parentNode.alternate;
            read.parentNode.alternate = bak;

            after(read.blockBody[read.blockIndex]);
          });
          vgroupEnd();

          vlog('done!');
          ++changed;
          meta.tainted = true;
        }
      }
    }
  }

  if (changed) {
    log('Flipped ifs:', changed, '. Restarting from phase1');
    return {what: 'ifFlipping', changes: changed, next: 'phase1'};
  }

  log('Flipped ifs: 0.');
}
