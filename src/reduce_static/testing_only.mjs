// Find bindings that are only used in booly tests (if/while/!/Boolean) and make sure that values where we know the state get an explicit bool.
// `let x = "foo"; if (x) { x = null; }`
// -> `let x = true; if (x) { x = false; }`

import { ASSERT, log, group, groupEnd, vlog, vgroup, vgroupEnd, rule, example, before, source, after, findBodyOffset } from '../utils.mjs';
import * as AST from '../ast.mjs';

export function testing_only(fdata) {
  group('\n\n\nLooking for bindings only used in unobservable boolean testing places\n');
  const r = _testing_only(fdata);
  groupEnd();
  return r;
}
function _testing_only(fdata) {
  const queue = [];

  fdata.globallyUniqueNamingRegistry.forEach((meta, name) => {
    if (meta.isImplicitGlobal) return;
    if (meta.isBuiltin) return;

    vlog('- `' + name + '`:', meta.constValueRef.node.type);

    if (
      meta.reads.some((read) => {
        if (read.parentNode.type === 'IfStatement') return;
        if (read.parentNode.type === 'WhileStatement') return;
        if (read.parentNode.type === 'UnaryExpression' && read.parentNode.operator === '!') return true;
        if (
          read.parentNode.type === 'CallExpression' &&
          read.parentProp === 'arguments' &&
          read.parentNode['arguments'][0] === read.node &&
          read.parentNode.callee.type === 'Identifier' &&
          read.parentNode.callee.name === 'Boolean'
        ) {
          return;
        }

        // We ignore assignments, objects, arrays, classes, member, and other calls since the value just gets lost
        // Any other ways of using it that don't get observed?

        vlog('- Binding read in a way that may be observed, bailing');
        return true;
      })
    ) {
      return false;
    }

    if (meta.writes.some(write => {
      if (write.kind !== 'var' && write.kind !== 'assign') {
        vlog('At least one write was not the var or an assign, bailing');
        return true;
      }
    })) {
      return
    }

    // Okay. Replace all writes with true or false if we can assert their truthy value. Leave anything else.

    meta.writes.forEach(write => {
      // IF we can determine the truthy value, we replace it with that boolean. Put the old rhs as a statement.
      // All writes should be assigns, except for the one var. So the transform should be fairly straightforward.
      // Do we have to queue the statementification of the old rhses, of course.

      const expr = write.kind === 'var' ? write.parentNode.init : write.parentNode.right;

      if (AST.isBoolean(expr)) return;

      let bool = false;

      if (AST.isTruthy(expr)) {
        vlog('- This is a truthy value:', expr.type, expr);
        bool = true;
      } else if (AST.isFalsy(expr)) {
        vlog('- This is a falsy value:', expr.type);
        bool = false;
      } else if (expr.type === 'Identifier' && expr.name !== 'arguments') {
        const emeta = fdata.globallyUniqueNamingRegistry.get(expr.name);
        if (emeta.typing.mustBeTruthy) {
          vlog('- The ident `' + expr.name + '` is known to be a truthy value');
          bool = true;
        } else if (emeta.typing.mustBeFalsy) {
          vlog('- The ident `' + expr.name + '` is known to be a falsy value');
          bool = false;
        } else {
          // Ignore
          return;
        }
      } else {
        // Ignore...
        return;
      }

      rule('An assignment of a determined booly value to a binding only used in bool-test cases can be replaced by an actual bool')
      example('let x = "foo"; if (x) { x = null; }', 'let x = true; if (x) { x = false; }')
      before(write.blockBody[write.blockIndex])

      // Now we should have an rhs whose truthy value is in `bool`. Apply it.
      if (write.kind === 'var') write.parentNode.init = AST.primitive(bool);
      else write.parentNode.right = AST.primitive(bool);

      if (!AST.isPrimitive(expr)) {
        // Move the expression to a statement. Need to queue this.
        queue.push({
          index: write.blockIndex,
          func: () => {
            write.blockBody.splice(write.blockIndex, 0, AST.expressionStatement(expr));
          }
        });
      }

      after(write.blockBody[write.blockIndex])
    })
  });

  if (queue.length) {
    // By index, high to low. This way it should not be possible to cause reference problems by changing index
    queue.sort(({ index: a }, { index: b }) => (a < b ? 1 : a > b ? -1 : 0));
    queue.forEach(({ index, func }) => func());

    log('Functions unlocked:', queue.length, '. Restarting from phase1 to fix up read/write registry.');
    return {what: 'testing_only', changes: queue.length, next: 'phase1'};
  }

  log('Functions unlocked: 0.');
  return false;
}
