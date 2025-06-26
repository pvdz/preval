import * as AST from '../ast.mjs';
import { ASSERT, log, group, groupEnd, vlog, vgroup, vgroupEnd, fmat, tmat, rule, example, before, source, after, findBodyOffset, todo } from '../utils.mjs';


/**
 * Note: nodes are assumed to be normalized
 * This function is used for is_test_merging.mjs
 *
 * @param {Node} nodeA
 * @param {Node} nodeB
 * @param {undefined|Array<{ap: Node|Array<Node>, bp: Node|Array<Node>, prop: string|number}>} collect
 * @returns {boolean} If true then the two nodes serialize to the same source code, potentially except for boolean literals `true` and `false`
 */
export function isSameFlatStatementExceptBool(nodeA, nodeB, collect) {
  // Walk through each (normalized) statement node and confirm that they would render
  // the same source code, except for occurrences of true and false.
  // Will return `false` for statements with sub-statements (if, loop, try, label)

  if (nodeA === nodeB) return true;
  if (nodeA.type !== nodeB.type) return false;

  switch (nodeA.type) {
    case 'BreakStatement': return nodeA.label?.name === nodeB.label?.name;

    case 'ThrowStatement': // Fall-through
    case 'ReturnStatement': {
      return isSameExpressionExceptBool(nodeA.argument, nodeB.argument, collect, nodeA, nodeB, 'argument');
    }

    case 'ExpressionStatement': {
      const r = isSameExpressionExceptBool(nodeA.expression, nodeB.expression, collect, nodeA, nodeB, 'expression');
      vlog('Expression statement same?', r);
      return r;
    }

    case 'VarStatement': {
      if (!isSameExpressionExceptBool(nodeA.init, nodeB.init, collect, nodeA, nodeB, 'init')) {
        return false;
      }

      vlog('- Var decls are equal but when hoisting them the name needs to be updated on one side. But we can do that.');
      return true;
    }

    default:
      ASSERT(['EmptyStatement', 'BlockStatement', 'IfStatement', 'WhileStatement', 'TryStatement', 'LabeledStatement', 'DebuggerStatement'].includes(nodeA.type), 'what statement is this missing?', nodeA.type);
      return false;
  }
}

/**
 * Note: nodes are assumed to be normalized
 * Returns true when the two nodes serialize to the same source code,
 * potentially except for boolean literals `true` and `false`
 *
 * @param {Node} nodeA
 * @param {Node} nodeB
 * @param {undefined|Array<{ap: Node|Array<Node>, bp: Node|Array<Node>, prop: string|number}>} collect
 * @param {Node|Array<Node>} ap Note: this may be an array (.arguments or .elements or .properties) with the prop the index !
 * @param {Node|Array<Node>} bp
 * @param {string|number} prop
 * @returns {boolean}
 */
function isSameExpressionExceptBool(nodeA, nodeB, collect, ap, bp, prop) {
  if (nodeA === nodeB) return true;
  if (nodeA.type !== nodeB.type) return false;

  if (AST.isPrimitive(nodeA)) {
    if (!AST.isPrimitive(nodeB)) return false;
    return isSamePrimitiveExceptBool(nodeA, nodeB, collect, ap, bp, prop);
  }

  switch (nodeA.type) {
    case 'Identifier': return nodeA.name === nodeB.name;
    case 'Literal': {
      if (nodeA.regex) return nodeA.regex.pattern === nodeB.regex.pattern && nodeA.regex.flags === nodeB.regex.flags;
      throw ASSERT(false, 'what kind of literal is not a primitive besides regex?');
    }
    case 'AssignmentExpression': {
      ASSERT(nodeA.operator === '=' && nodeB.operator === '=');
      return (
        isSameExpressionExceptBool(nodeA.left, nodeB.left, collect, nodeA, nodeB, 'left') &&
        isSameExpressionExceptBool(nodeA.right, nodeB.right, collect, nodeA, nodeB, 'right')
      );
    }
    case 'CallExpression': {
      if (nodeA.callee.type !== nodeB.callee.type) return false;
      if (!isSameExpressionExceptBool(nodeA.callee, nodeB.callee, collect, nodeA, nodeB, 'callee')) return false;
      if (nodeA['arguments'].length !== nodeB['arguments'].length) return false;
      return nodeA['arguments'].every((anodeA, i) => {
        const anodeB = nodeB['arguments'][i];
        if (anodeA.type !== anodeB.type) return false;
        if (anodeA.type === 'SpreadElement') return isSameExpressionExceptBool(anodeA.argument, anodeB.argument, collect, anodeA, anodeB, 'argument');
        return isSameExpressionExceptBool(anodeA, anodeB, collect, nodeA['arguments'], nodeB['arguments'], i);
      });
    }
    case 'MemberExpression': {
      if (nodeA.computed !== nodeB.computed) return false;
      if (!isSameExpressionExceptBool(nodeA.object, nodeB.object, collect, nodeA, nodeB, 'object')) return false;
      if (nodeA.computed) {
        // The property is an (almost) arbitrary expression
        return isSameExpressionExceptBool(nodeA.property, nodeB.property, collect, nodeA, nodeB, 'property');
      } else {
        ASSERT(nodeA.property.type === 'Identifier' && nodeB.property.type === 'Identifier', 'Normalized code, not computed, so this must be a simple ident', nodeA, nodeB);
        return nodeA.property.name === nodeB.property.name;
      }
    }
    case 'NewExpression': {
      // (A `new` node is basically a call node)
      if (nodeA.callee.type !== nodeB.callee.type) return false;
      if (!isSameExpressionExceptBool(nodeA.callee, nodeB.callee, collect, nodeA, nodeB, 'callee')) return false;
      if (nodeA['arguments'].length !== nodeB['arguments'].length) return false;
      return nodeA['arguments'].every((anodeA, i) => {
        const anodeB = nodeB['arguments'][i];
        if (anodeA.type !== anodeB.type) return false;
        if (anodeA.type === 'SpreadElement') return isSameExpressionExceptBool(anodeA.argument, anodeB.argument, collect, anodeA, anodeB, 'argument');
        return isSameExpressionExceptBool(anodeA, anodeB, collect, nodeA['arguments'], nodeB['arguments'], i);
      });
    }
    case 'AwaitExpression': {
      return isSameExpressionExceptBool(nodeA.argument, nodeB.argument, collect, nodeA, nodeB, 'argument');
    }
    case 'YieldExpression': {
      return isSameExpressionExceptBool(nodeA.argument, nodeB.argument, collect, nodeA, nodeB, 'argument');
    }
    case 'BinaryExpression': {
      if (nodeA.operator !== nodeB.operator) return false;
      if (!isSameExpressionExceptBool(nodeA.left, nodeB.left, collect, nodeA, nodeB, 'left')) return false;
      return isSameExpressionExceptBool(nodeA.right, nodeB.right, collect, nodeA, nodeB, 'right');
    }
    case 'UnaryExpression': {
      if (nodeA.operator !== nodeB.operator) return false;
      return isSameExpressionExceptBool(nodeA.argument, nodeB.argument, collect, nodeA, nodeB, 'argument');
    }
    case 'ArrayExpression': {
      if (nodeA.elements.length !== nodeB.elements.length) return false;

      return nodeA.elements.every((enodeA, i) => {
        const enodeB = nodeB.elements[i];
        if (!enodeA && !enodeB) return true;
        if (!nodeA || !enodeB) return false;
        if (enodeA.type !== enodeB.type) return false;
        if (enodeA.type === 'SpreadElement') return isSameExpressionExceptBool(enodeA.argument, enodeB.argument, collect, nodeA, nodeB, 'argument');
        return isSameExpressionExceptBool(enodeA, enodeB, collect, nodeA.elements, nodeB.elements, i);
      });
    }
    case 'ObjectExpression': {
      vlog('- Checking objlit');
      if (nodeA.properties.length !== nodeB.properties.length) return false;

      return nodeA.properties.every((pnodeA, i) => {
        vlog('- key', i, '...');
        const pnodeB = nodeB.properties[i];
        if (pnodeA.type !== pnodeB.type) return false; // Should both be Property
        if (pnodeA.type === 'SpreadElement') return isSameExpressionExceptBool(pnodeA.argument, pnodeB.argument, collect, nodeA, nodeB, 'argument');
        if (pnodeA.key.type !== pnodeB.key.type) return false;
        if (pnodeA.computed !== pnodeB.computed) return false;
        if (pnodeA.computed) {
          if (AST.isBoolean(pnodeA.key)) return false; // Either this comes back (`{[true]:x}` becomes `{true: x}`) or it's a mismatch.
          if (!isSameExpressionExceptBool(pnodeA.key, pnodeB.key, collect, pnodeA, pnodeB, 'key')) return false;
        } else if (pnodeA.key.type === 'Identifier') {
          if (pnodeA.key.name !== pnodeB.key.name) return false;
        } else {
          // Cover NaN etc
          if (!Object.is(AST.getPrimitiveValue(pnodeA), AST.getPrimitiveValue(pnodeB))) return false;
        }
        vlog('- key', i,'is equal:', pnodeA.key);
        // Key ok. Now check value.
        const r = isSameExpressionExceptBool(pnodeA.value, pnodeB.value, collect, pnodeA, pnodeB, 'value');
        vlog('- value equal?', r);
        return r;
      });
    }
    case 'ThisExpression': {
      return true; // Should only occur in the header though but why not.
    }
    case 'ClassExpression': {
      // I'm lazy. Not doing this today.
      return false;
    }
    case 'TemplateLiteral': {
      // These have at least one (normalized) expression. Verify the string parts and the expressions.

      if (nodeA.quasis.length !== nodeB.quasis.length) return false;

      if (!nodeA.quasis.every((te, i) => te.value.raw === nodeB.quasis[i].value.raw)) return false;
      return nodeA.expressions.every((enode, i) => {
        return isSameExpressionExceptBool(enode, nodeB.expressions[i], collect, nodeA.elements, nodeB.elements, i)
      });
    }
    case 'SuperCall': {
      if (nodeA['arguments'].length !== nodeB['arguments'].length) return false;
      return nodeA['arguments'].every((anodeA, i) => {
        const anodeB = nodeB['arguments'][i];
        if (anodeA.type !== anodeB.type) return false;
        if (anodeA.type === 'SpreadElement') return isSameExpressionExceptBool(anodeA.argument, anodeB.argument, collect, anodeA, anodeB, 'argument');
        return isSameExpressionExceptBool(anodeA, anodeB, collect, nodeA['arguments'], nodeB['arguments'], i);
      });
    }
    case 'SuperMethodCall': {
      if (nodeA.computed !== nodeB.computed) return false;
      if (nodeA['arguments'].length !== nodeB['arguments'].length) return false;
      if (isSameExpressionExceptBool(nodeA.property, nodeB.property, collect, nodeA, nodeB, 'property')) return false;
      return nodeA['arguments'].every((anodeA, i) => {
        const anodeB = nodeB['arguments'][i];
        if (anodeA.type !== anodeB.type) return false;
        if (anodeA.type === 'SpreadElement') return isSameExpressionExceptBool(anodeA.argument, anodeB.argument, collect, anodeA, anodeB, 'argument');
        return isSameExpressionExceptBool(anodeA, anodeB, collect, nodeA['arguments'], nodeB['arguments'], i);
      });
    }
    case 'SuperProp': {
      if (nodeA.computed !== nodeB.computed) return false;
      if (nodeA.computed) {
        // The property is an (almost) arbitrary expression
        return isSameExpressionExceptBool(nodeA.property, nodeB.property, collect, nodeA, nodeB, 'property');
      } else {
        ASSERT(nodeA.property.type === 'Identifier' && nodeB.property.type === 'Identifier', 'Normalized code, not computed, so this must be a simple ident', nodeA, nodeB);
        return nodeA.property.name !== nodeB.property.name;
      }
    }

    default:
      // ASSERT(![].includes(nodeA.type), 'should not have certain expr in normalized code', nodeA.type);
      ASSERT(['Param', 'FunctionExpression', ].includes(nodeA.type), 'what expr is this missing?', nodeA.type);
      return false;
  }
}

/**
 * Note: nodes are assumed to be normalized
 *
 * @param {Node} nodeA
 * @param {Node} nodeB
 * @param {undefined|Array<{ap: Node|Array<Node>, bp: Node|Array<Node>, prop: string|number}>} collect
 * @param {Node|Array<Node>} ap A's parent node. Note: this may be an array (.arguments or .elements or .properties) with the prop the index !
 * @param {Node|Array<Node>} bp A's parent node. Note: this may be an array (.arguments or .elements or .properties) with the prop the index !
 * @param {string|number} prop ap[prop] === nodeA and bp[prop] === nodeB
 * @returns {boolean} If true then the two nodes serialize to the same source code, potentially except for boolean literals `true` and `false`
 */
function isSamePrimitiveExceptBool(nodeA, nodeB, collect, ap, bp, prop) {
  // Note: nodeA and nodeB are assumed ot have checked by isPrimitive() first

  if (nodeA === nodeB) return true;
  if (nodeA.type !== nodeB.type) return false;

  if (nodeA.type === 'Literal') {
    if (typeof nodeA.value === 'boolean' && typeof nodeB.value === 'boolean') {
      if (collect && nodeA.value !== nodeB.value) {
        collect.push({a: nodeA, b: nodeB, ap, bp, prop});
      }
      return true;
    }
    // Circumvent edge cases, just check the serialized value
    return nodeA.raw === nodeB.raw;
  }

  if (nodeA.type === 'Identifier') {
    return nodeA.name === nodeB.name;
  }

  if (nodeA.type === 'UnaryExpression') {
    ASSERT(nodeA.operator === '-' && nodeA.argument.type !== 'UnaryExpression', 'asserted by isPrimitive');
    ASSERT(nodeB.operator === '-' && nodeB.argument.type !== 'UnaryExpression', 'asserted by isPrimitive');

    return isSamePrimitiveExceptBool(nodeA.argument, nodeB.argument, collect, nodeA, nodeB, 'argument');
  }

  if (nodeA.type === 'TemplateLiteral') {
    ASSERT(nodeA.expressions.length === 0, 'caller should assert isPrimitive', nodeA);
    ASSERT(typeof nodeA.quasis[0].value.cooked === 'string');
    ASSERT(nodeB.expressions.length === 0, 'caller should assert isPrimitive', nodeB);
    ASSERT(typeof nodeB.quasis[0].value.cooked === 'string');
    return nodeA.quasis[0].value.cooked === nodeB.quasis[0].value.cooked;
  }

  ASSERT(false, 'unreachable because the node was asserted to be a primitive', nodeA, nodeB);
}
