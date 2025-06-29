// Find objlit property writes that can be inlined into the objlit
//
//        `const obj = {}; obj.x = 5;`
// ->
//        `const obj = {x: 5};`
//

import {
  ASSERT,
  log,
  group,
  groupEnd,
  vlog,
  vgroup,
  vgroupEnd,
  rule,
  example,
  before,
  source,
  after,
  fmat,
  tmat,
  findBodyOffset,
  todo,
  assertNoDupeNodes,
} from '../utils.mjs';
import * as AST from '../ast.mjs';
import { createFreshVar, mayBindingMutateBetweenRefs } from '../bindings.mjs';
import { SYMBOL_COERCE, SYMBOL_DOTCALL, SYMBOL_FRFR } from '../symbols_preval.mjs';
import { BUILTIN_SYMBOLS, BUILTIN_FUNC_NO_CTX, symbo } from '../symbols_builtins.mjs';

export function objlitPropWrite(fdata) {
  group('\n\n\n[objlitPropWrite] Checking for object literals whose props are accessed immediately');
  //currentState(fdata, 'objlitPropWrite', true, fdata);
  const r = _objlitPropWrite(fdata);
  groupEnd();
  return r;
}
function _objlitPropWrite(fdata) {
  let queue = [];
  let updated = 0;

  fdata.globallyUniqueNamingRegistry.forEach(function (meta, name) {
    if (!meta.isConstant) return;
    if (meta.writes.length !== 1) return;
    if (meta.varDeclRef.node.type !== 'ObjectExpression') return;

    vgroup('- const with objlit init:', [name]);
    process(meta, name);
    vgroupEnd();
  });

  if (updated + queue.length) {
    queue.sort(({ index: a }, { index: b }) => b - a);

    vgroup('Unwinding', queue.length, 'callbacks');
    queue.forEach(({ func }) => {
      vlog('-- next');
      func();
    });
    vgroupEnd();
  }
  if (updated > 0) {
    log('Prop assigns inlined:', updated, '. Restarting from phase1 to fix up read/write registry');
    return {what: 'objlitPropWrite', changes: updated, next: 'phase1'};
  }
  log('Prop assigns inlined: 0.');

  function process(meta, name) {
    const objNode = meta.varDeclRef.node;

    if (!objNode.properties.every(pnode => pnode.type !== 'SpreadElement' && pnode.kind === 'init' && !pnode.computed)) {
      return vlog('- bail: obj has spread, getter/setter, or computed');
    }

    const write = meta.writes[0];
    // Scan forward, skipping noops, and inline properties

    const body = write.blockBody;
    let index = write.blockIndex;
    const locals = [];
    while (++index < body.length) {
      const stmt = body[index];
      if (stmt.type === 'VarStatement') {
        locals.push(stmt.id.name);
        if (AST.isPrimitive(stmt.init)) continue;
        if (stmt.init.type === 'FunctionExpression') continue;
        // if (stmt.init.type === 'Identifier') continue; // TODO: make sure not to reassign an aliased value
        if (stmt.init.type === 'ArrayExpression' && stmt.init.elements.every(enode => !enode || AST.isPrimitive(enode) || enode.type === 'Identifier')) continue;
        return vlog('- bail: var init was not recognized as a noop');
      }
      else if (
        stmt.type === 'ExpressionStatement' &&
        stmt.expression.type === 'AssignmentExpression' &&
        stmt.expression.left.type === 'MemberExpression' &&
        stmt.expression.left.object.type === 'Identifier' &&
        !stmt.expression.left.computed &&
        stmt.expression.left.object.name === name
      ) {
        vlog('- ok, setting property', stmt.expression.left.property.name, 'on obj');
        break;
      }
      else {
        return vlog('- bail: statement was not assigning a property and not recognized as noop');
      }
    }
    if (index >= body.length) {
      return vlog('- bail: reached end before finding target');
    }

    // Ok, there's a prop being written after the decl and there has not been anything meaningful in between.

    const assign = body[index];
    const lhs = assign.expression.left;
    const rhs = assign.expression.right;

    // I think it kind of has to but...
    if (!AST.isPrimitive(rhs) && rhs.type !== 'Identifier') {
      todo(`what is being assigned to this prop? ${rhs.type}`);
      return vlog('- bail: not assigning primitive or ident', rhs.type);
    }

    if (lhs.computed) {
      todo('prop inlining with computed key assignment');
      return vlog('- bail: computed key assignment');
    }

    // Verify that the target prop is safe to (over)write

    const ok = objNode.properties.every(pnode => {
      // Cannot be spread.

      if (pnode.computed) return vlog('- bail: at least one property is computed');
      if (pnode.kind !== 'init') vlog('- bail: at least one property is not simple');
      if (pnode.method) vlog('- bail: at least one property is a method');

      return true
    });
    if (!ok) return;

    rule('Assigning a property to an object literal when the object can not have been used yet should be inlined');
    example('const obj = {}; obj.x = 5;', 'const obj = {x: 5}');
    before(write.blockBody[write.blockIndex]);
    before(body[index]);

    objNode.properties.push(AST.property(lhs.property.name, rhs, false, false));
    body[index] = AST.emptyStatement();

    after(write.blockBody[write.blockIndex]);
    after(body[index]);
    assertNoDupeNodes(body, 'body');
    updated = updated + 1;
    return;
  }
}
