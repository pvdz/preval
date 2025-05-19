// Find property reads of object literals when the literal does not have the property.
//
//
// const x = {a: 1}; $(x.b);
// -->
// const x = {a: 1}; $($Object_prototype.b);
//
// We can't do this by default because own properties may be overridden. This is less likely for non-plain objects.

import walk from '../../lib/walk.mjs';
import { ASSERT, log, group, groupEnd, vlog, vgroup, vgroupEnd, fmat, tmat, rule, example, before, source, after, findBodyOffset, riskyRule, useRiskyRules, todo, } from '../utils.mjs';
import { symbo } from '../symbols_builtins.mjs';
import * as AST from '../ast.mjs';

export function protoPropReads(fdata) {
  group('\n\n\n[protoPropReads] Finding property reads on an objlit that must read prototype\n');
  //currentState(fdata, 'protoPropReads', true, fdata);
  const r = _propertyLookups(fdata);
  groupEnd();
  return r;
}
function _propertyLookups(fdata) {
  const ast = fdata.tenkoOutput.ast;

  let changes = 0;

  // TODO: is the walking of individual if statements here more efficient than the gc pressure of collecting all if-statements and their parent etc in phase1 (often redundantly so)?
  walk(_walker, ast, 'ast');
  function _walker(node, beforeWalk, nodeType, path) {
    if (beforeWalk) return;
    if (node.type !== 'MemberExpression') return;
    if (node.computed) return; // For now, anyways
    if (node.object.type !== 'Identifier') return;
    if (AST.isPrimitive(node.object)) return;
    const objName = node.object.name;
    if (objName === 'arguments') return;

    const parentNode = path.nodes[path.nodes.length - 2];
    const parentProp = path.props[path.props.length - 1];
    //const parentIndex = path.indexes[path.indexes.length - 1];
    const grandNode = path.nodes[path.nodes.length - 3];
    //const grandProp = path.props[path.props.length - 2];
    //const grandIndex = path.indexes[path.indexes.length - 2];
    const blockBody = path.blockBodies[path.blockBodies.length - 1];
    const blockIndex = path.blockIndexes[path.blockIndexes.length - 1];

    if (parentNode.type === 'CallExpression') return; // Bail on method calls for now.

    const objMeta = fdata.globallyUniqueNamingRegistry.get(objName);
    const mustBe = objMeta.typing.mustBeType;
    const propName = node.property.name;

    vlog('-', objName + '.' + node.property.name, ', typing for obj is::', mustBe);
    ASSERT(parentNode.type !== 'NewExpression', 'normalized code should not have member expressions as the callee of a new (nor its args)');
    ASSERT(fdata.globallyUniqueNamingRegistry.get(objName)?.typing, 'if not a primitive then the ident should be known and have typing data available');

    // Eliminate statements that are member expressions where object and property are known builtins
    // I think it's fine to even drop any property lookup on known builtins.
    // Technically expandos could cause observable side effects for accessing them. But aren't you just really trying at that point?
    // Note: we can't just do builtin symbol lookup because an object could have an own property all the same.
    // We can verify that a property is not defined on the object expression, and then safely assert it must
    // either be a property on the Object.prototype, or undefined.
    // This requires the init to be an object.
    if (
      mustBe === 'object' &&
      (parentNode.type !== 'AssignmentExpression' || parentProp !== 'left') && // If we allowed this we'd be assigning to the proto
      (parentNode.type !== 'UnaryExpression' || parentNode.operator !== 'delete') && // Should not even be possible but if we allowed it we'd end up deleting proto props
      objMeta.isConstant &&
      objMeta.writes.length === 1 &&
      objMeta.varDeclRef?.node.type === 'ObjectExpression' &&
      // In order to be predictable, all props must be non-computed and no spread must occur
      objMeta.varDeclRef.node.properties.every(pnode => pnode.type !== 'RestElement' && !pnode.computed) &&
      // Object can not have been mutated so some reachability check needs to happen
      objMeta.writes[0].blockBody === blockBody &&
      objMeta.writes[0].blockIndex === blockIndex-1 &&
      !objMeta.varDeclRef.node.properties.some(pnode => pnode.key.name === propName)
    ) {
      vlog('  - The obj had no explicit property so we should be safe to look into the prototype');
      rule('When property is not explicitly declared on objlit it must refer to proto prop');
      example('const x = {a: 1}; $(x.b);', `const x = {a: 1}; $(${symbo('Object', 'prototype')}.b);`);
      before(grandNode);

      node.object = AST.identifier(symbo('Object', 'prototype'));

      after(grandNode);
      ++changes;
    }
  }

  if (changes) {
    log('Properties that must be on proto:', changes, '. Restarting from phase1');
    return {what: 'protoPropReads', changes: changes, next: 'phase1'};
  }

  log('Properties that must be on proto: 0.');
}
