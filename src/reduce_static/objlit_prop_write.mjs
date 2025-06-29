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

    if (!objNode.properties.every(pnode => {
      if (pnode.type === 'SpreadElement') return vlog('- bail: obj has spread prop');
      if (pnode.kind !== 'init') return vlog('- bail: obj has getter/setter');
      if (pnode.computed) {
        // numbers, strings, should be fine and predictable (?)
        if (AST.isPrimitive(pnode.value)) return true;
        return vlog('- bail: non-primitive computed property');
      }
      return true;
    })) {
      return vlog('- bail: obj has spread, getter/setter, or bad computed');
    }

    const write = meta.writes[0];
    // Scan forward, skipping noops, and inline properties

    vlog('- Scan for property write, skipping statements that you cant observe');
    const body = write.blockBody;
    let index = write.blockIndex;
    const locals = [];
    while (++index < body.length) {
      const stmt = body[index];
      if (stmt.type === 'ExpressionStatement' && stmt.expression.type === 'AssignmentExpression' && stmt.expression.left.type === 'Identifier') {
        return vlog('- bail: assignment; there is code that depends on local vars not being overwritten. if we want to support assignements in this loop, that logich as to be revisited to support that');
      }
      if (stmt.type === 'VarStatement') {
        locals.push(stmt.id.name);
        if (AST.isPrimitive(stmt.init)) continue;
        if (stmt.init.type === 'FunctionExpression') continue;
        if (stmt.init.type === 'Identifier' && !locals.includes(stmt.init.name)) continue;
        if (stmt.init.type === 'ArrayExpression' && stmt.init.elements.every(enode => !enode || AST.isPrimitive(enode) || enode.type === 'Identifier')) continue;
        return vlog('- bail: var init was not recognized as a noop;', stmt.init.type);
      }
      else if (
        stmt.type === 'ExpressionStatement' &&
        stmt.expression.type === 'AssignmentExpression' &&
        stmt.expression.left.type === 'MemberExpression' &&
        stmt.expression.left.object.type === 'Identifier' &&
        stmt.expression.left.object.name === name
      ) {
        if (!stmt.expression.left.computed) {
          vlog('- ok, setting property', stmt.expression.left.property.name, 'on obj');
          break;
        }
        if (AST.isPrimitive(stmt.expression.left.property)) {
          vlog('- ok, setting computed property that is a primitive');
          break;
        }
        return vlog('- bail: setting non-primitive computed property');
      }
      else {
        return vlog('- bail: statement was not assigning a property to target ident and not recognized as noop');
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

    // Verify that the target prop is safe to (over)write
    // TODO: actually, does that really matter? Maybe for getters/setters tho... methods/init should be fine to overwrite this way. normalization will prune. computer .. should be fine even if it ends up in the same value? maybe?
    const ok = objNode.properties.every(pnode => {
    //   // Cannot be spread.
    //
    //   if (pnode.computed) return vlog('- bail: at least one property is computed');
      if (pnode.kind !== 'init') vlog('- bail: at least one property is not simple');
    //   if (pnode.method) vlog('- bail: at least one property is a method');
    //
      return true
    });
    if (!ok) return;

    if (rhs.type === 'Identifier' && locals.includes(rhs.name)) {
      vlog('- Assigned value is a local binding created between the objlit and this assignment...');

      // We can support a variety of cases: for consts; primitives trivially, idents when we can prove reachability
      // Primitives should be inlined by another reducer first.
      const meta = fdata.globallyUniqueNamingRegistry.get(rhs.name);
      // Note: there is an assert above that checks there are no re-assignments between objlit and this write, so const/let should not matter. current value ought to be the init.
      if (meta.varDeclRef) {
        if (AST.isPrimitive(meta.varDeclRef.node)) {
          rule('Assigning an ident that is a primitive to a property of an object literal when the object can not have been used yet should be inlined');
          example('const obj = {}; const y = "foo"; obj.x = y;', 'const obj = {x: "foo"}; const y = "foo";');
          before(write.blockBody[write.blockIndex]);
          before(body[index]);

          objNode.properties.push(AST.property(AST.cloneSimple(lhs.property), AST.cloneSimple(meta.varDeclRef.node), false, lhs.computed));
          body[index] = AST.emptyStatement();

          after(write.blockBody[write.blockIndex]);
          after(body[index]);
          assertNoDupeNodes(body, 'body');
          updated = updated + 1;
          return;
        }
        else if (meta.varDeclRef.node.type === 'Identifier') {
          // Reachable? We don't skip nested structs so if it was reachable as var init then it should be reachable to the objlit
          if (locals.includes(meta.varDeclRef.node.name)) {
            todo('support identifier indirection assignment in objlit_prop_write');
            return vlog('- bail: identifier is alias');
          }
          rule('Assigning an ident that is an alias to a property of an object literal when the object can not have been used yet should be inlined');
          example('const obj = {}; const y = z; obj.x = y;', 'const obj = {x: z}; const y = z;');
          before(write.blockBody[write.blockIndex]);
          before(body[index]);

          objNode.properties.push(AST.property(AST.cloneSimple(lhs.property), AST.identifier(meta.varDeclRef.node.name), false, lhs.computed));
          body[index] = AST.emptyStatement();

          after(write.blockBody[write.blockIndex]);
          after(body[index]);
          assertNoDupeNodes(body, 'body');
          updated = updated + 1;
          return;
        }
        else {
          todo(`support let ident assigned to prop that we could resolve`); // assigns are tricky...
          return vlog('- bail: assigning ident defined between objlit and this write, its init is not reachable');
        }
      } else {
        todo(`support ident assigned to prop without var init`);
        return vlog('- bail: assigning ident defined between objlit and this write, its init is not reachable');
      }
    }

    rule('Assigning to a property of an object literal when the object can not have been used yet should be inlined');
    example('const obj = {}; obj.x = 5;', 'const obj = {x: 5}');
    before(write.blockBody[write.blockIndex]);
    before(body[index]);

    objNode.properties.push(AST.property(AST.cloneSimple(lhs.property), rhs, false, lhs.computed));
    body[index] = AST.emptyStatement();

    after(write.blockBody[write.blockIndex]);
    after(body[index]);
    assertNoDupeNodes(body, 'body');
    updated = updated + 1;
    return;
  }
}
