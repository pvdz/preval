// Find bindings that are only used in booly tests (if/while/!/Boolean) and make sure that values where we know the state get an explicit bool.
// `let x = "foo"; if (x) { x = null; }`
// -> `let x = true; if (x) { x = false; }`

import { ASSERT, log, group, groupEnd, vlog, vgroup, vgroupEnd, rule, example, before, source, after, findBodyOffset } from '../utils.mjs';
import * as AST from '../ast.mjs';

export function ifTestOnly(fdata) {
  group('\n\n\nLooking for bindings only used in unobservable boolean testing places\n');
  const r = _ifTestOnly(fdata);
  groupEnd();
  return r;
}
function _ifTestOnly(fdata) {
  const queue = [];

  fdata.globallyUniqueNamingRegistry.forEach((meta, name) => {
    if (meta.isImplicitGlobal) return;
    if (meta.isBuiltin) return;
    if (!meta.varDeclRef) return; // catch

    vgroup('- `' + name + '`:', meta.varDeclRef.node.type);

    const usedElsewhere = meta.reads.some((read) => {
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
    });

    vgroupEnd();
    if (usedElsewhere) return false;

    // When notBool, at least one assignment was unknown, to keep the var mono we should simplify primitives to their true/false value
    let notBool = false;
    if (meta.writes.some(write => {
      if (write.kind !== 'var' && write.kind !== 'assign') {
        vlog('At least one write was not the var or an assign, bailing');
        return true;
      }
      if (write.kind === 'assign' && !AST.isPrimitive(write.parentNode.right)) {
        vlog('At least one assignment wasnt a primitive, can only dumb down');
        notBool = true;
        return false;
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

      if (notBool && !AST.isPrimitive(expr)) {
        vlog('- Cannot change non-primitive value when not updating to true/false directly');
        return;
      }
      else if (notBool) {
        if (AST.isTrue(expr) || AST.isFalse(expr)) return vlog('Already true/false');
        if (AST.isNumberLiteral(expr)) {
          bool = AST.isTruthy(expr) ? 1 : 0;
          if (AST.getPrimitiveValue(expr) === bool) return vlog('Already target number');
        }
        else if (AST.isStringLiteral(expr)) {
          bool = AST.isTruthy(expr) ? 'T' : '';
          if (AST.getPrimitiveValue(expr) === bool) return vlog('Already target string');
        }
        else {
          return vlog('Not changing null/undef');
        }
      }
      else if (AST.isTruthy(expr)) {
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

      queue.push({
        index: write.blockIndex,
        func: () => {
          rule('An assignment of a determined booly value to a binding only used in bool-test cases can be replaced by an actual bool')
          example('let x = "foo"; if (x) { x = null; }', 'let x = true; if (x) { x = false; }')
          before(write.blockBody[write.blockIndex])

          // Now we should have an rhs whose truthy value is in `bool`. Apply it.
          if (write.kind === 'var') write.parentNode.init = AST.primitive(bool);
          else write.parentNode.right = AST.primitive(bool);

          // Move the expression to a statement. Need to queue this.
          if (!AST.isPrimitive(expr)) {
            write.blockBody.splice(write.blockIndex, 0, AST.expressionStatement(expr));
          }

          after(write.blockBody[write.blockIndex])
        }
      });
    });
  });

  if (queue.length) {
    // By index, high to low. This way it should not be possible to cause reference problems by changing index
    queue.sort(({ index: a }, { index: b }) => (a < b ? 1 : a > b ? -1 : 0));
    queue.forEach(({ index, func }) => func());

    log('Unobservable bool tests fixed:', queue.length, '. Restarting from phase1 to fix up read/write registry.');
    return {what: 'ifTestOnly', changes: queue.length, next: 'phase1'};
  }

  log('Unobservable bool tests fixed: 0.');
  return false;
}
