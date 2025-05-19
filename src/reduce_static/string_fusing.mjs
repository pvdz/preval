// Find templates that are concat with values that must be string and melt them into a single template

import walk from '../../lib/walk.mjs';
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
} from '../utils.mjs';
import * as AST from '../ast.mjs';
import { createFreshVar } from '../bindings.mjs';
import { normalizeTemplateSimple } from '../ast.mjs';

export function stringFusing(fdata) {
  group('\n\n\n[stringFusing] Searching for strings to fuse together');
  //currentState(fdata, 'stringFusing', true, fdata);
  const r = _stringFusing(fdata);
  groupEnd();
  return r;
}
function _stringFusing(fdata, nodeType, path) {
  const ast = fdata.tenkoOutput.ast;

  let changed = 0;

  walk(_walker, ast, 'ast');
  function _walker(_node, beforeWalk, _, path) {
    if (beforeWalk) return;

    const parentNode = path.nodes[path.nodes.length - 2];
    const parentProp = path.props[path.props.length - 1];
    const parentIndex = path.indexes[path.indexes.length - 1];

    if (parentProp === 'ast') return;

    let nodeChanged = false;

    {
      // Get fresh node in case this transform changed it already
      const node = parentIndex < 0 ? parentNode[parentProp] : parentNode[parentProp][parentIndex];

      if (node.type === 'BinaryExpression' && node.operator === '+') {
        if (processBinary(fdata, path, parentNode, parentProp, parentIndex)) {
          changed += 1;
          nodeChanged = true;
        }
      } else if (node.type === 'TemplateLiteral') {
        if (processTemplate(fdata, path, parentNode, parentProp, parentIndex)) {
          changed += 1;
          nodeChanged = true;
        }
      }
    }

    if (nodeChanged) {
      vgroup();
      const parentNode = path.nodes[path.nodes.length - 2];
      const parentProp = path.props[path.props.length - 1];
      source(parentNode[parentProp], true);
      const node = parentIndex < 0 ? parentNode[parentProp] : parentNode[parentProp][parentIndex];
      const normNode = AST.normalizeTemplateSimple(node);
      if (normNode !== node) {
        const parentNode = path.nodes[path.nodes.length - 2];
        const parentProp = path.props[path.props.length - 1];
        const parentIndex = path.indexes[path.indexes.length - 1];

        rule('Nested templates should be flattened immediately');
        before(parentNode[parentProp]);
        if (parentIndex < 0) parentNode[parentProp] = normNode;
        else parentNode[parentProp][parentIndex] = normNode;
        after(normNode);
      }
      vgroupEnd();
    }
  }

  if (changed) {
    log('Strings fused together:', changed, '. Restarting from phase1 to fix up read/write registry');
    return {what: 'stringFusing', changes: changed, next: 'phase1'};
  }

  log('Strings fused together: 0.');
}

function processTemplate(fdata, path, parentNode, parentProp, parentIndex) {
  vgroup('Found a template');
  const node = parentIndex < 0 ? parentNode[parentProp] : parentNode[parentProp][parentIndex];
  source(node, true);
  const r = _processTemplate(fdata, path, parentNode, parentProp, parentIndex);
  vgroupEnd();
  return r;
}
function _processTemplate(fdata, path, parentNode, parentProp, parentIndex) {
  const node = parentIndex < 0 ? parentNode[parentProp] : parentNode[parentProp][parentIndex];
  let changed = false;
  for (let ei = node.expressions.length - 1; ei >= 0; --ei) {
    let expr = node.expressions[ei];

    if (expr.type === 'Identifier') {
      vlog('Expr', ei, 'of the template is the identifier `' + expr.name + '`. Is it a constant string type?');
      const meta = fdata.globallyUniqueNamingRegistry.get(expr.name, fdata);
      if (meta.isConstant && meta.varDeclRef) {
        const stmt = meta.varDeclRef.varDeclNode;
        const init = stmt.init;
        vlog('- const:', !!meta.isConstant, ', init type:', init.type);
        if (meta.isConstant && init.type === 'TemplateLiteral') {
          source(init, true);

          // Okay should be safe to concat to a string
          // We can append this to the quasi but then we have to deal with raw/cooked stuff. So we just inject it as another expression.
          // Another rule will clean it up properly. That way I don't have to duplicate that logic here.

          rule('Adding a template to a primitive ident should be resolved statically');
          example('`a${b}c` + 15', '`a${b}c${15}`');
          before(meta.varDeclRef.varDeclBody[meta.varDeclRef.varDeclIndex]);
          before(stmt);

          node.expressions[ei] = AST.cloneSimpleOrTemplate(init);

          after(stmt);
          changed = true;
        } else {
          vlog('- no. skipping');
        }
      } else {
        vlog('- not a const or it has not init');
      }
    }
  }

  return changed;
}

function processBinary(fdata, path, parentNode, parentProp, parentIndex) {
  vgroup('Found a binary +');
  const node = parentIndex < 0 ? parentNode[parentProp] : parentNode[parentProp][parentIndex];
  source(node, true);
  const changed = _processBinary(fdata, path, parentNode, parentProp, parentIndex);
  vgroupEnd();
  return changed;
}
function _processBinary(fdata, path, parentNode, parentProp, parentIndex) {
  const node = parentIndex < 0 ? parentNode[parentProp] : parentNode[parentProp][parentIndex];

  // If the lhs is a template or primitive and the right is a template or
  // primitive (and at least one is a template) merge them into one template

  let left = node.left;
  let right = node.right;

  if (left.type === 'Identifier') {
    const meta = fdata.globallyUniqueNamingRegistry.get(left.name, fdata);
    if (meta.isConstant && meta.varDeclRef) {
      const stmt = meta.varDeclRef.varDeclNode;
      const init = stmt.init;

      if (init.type === 'TemplateLiteral') {
        left = init;
      } else if (['boolean', 'number', 'string'].includes(meta.typing.mustBeType)) {
        left = AST.identifier(left.name);
      } else {
        left = undefined;
      }
    } else {
      left = undefined;
    }
  } else if (left.type !== 'TemplateLiteral' && !AST.isPrimitive(left)) {
    left = undefined;
  }
  if (right.type === 'Identifier') {
    const meta = fdata.globallyUniqueNamingRegistry.get(right.name, fdata);
    if (meta.isConstant && meta.varDeclRef) {
      const stmt = meta.varDeclRef.varDeclNode;
      const init = stmt.init;
      if (init.type === 'TemplateLiteral') {
        right = init;
      } else if (['boolean', 'number', 'string'].includes(meta.typing.mustBeType)) {
        right = AST.identifier(right.name);
      } else {
        right = undefined;
      }
    } else {
      right = undefined;
    }
  } else if (right.type !== 'TemplateLiteral' && !AST.isPrimitive(right)) {
    right = undefined;
  }

  vlog('left:', left?.type, ', right:', right?.type);

  if (left && right) {
    // This means left and right are primitives, complex templates, or idents with unknown constant value that must be of primitive type

    const parentNode = path.nodes[path.nodes.length - 2];
    const parentProp = path.props[path.props.length - 1];
    const parentIndex = path.indexes[path.indexes.length - 1];

    if (left.type === 'TemplateLiteral') {
      // Okay should be safe to concat to a string
      // We can append this to the quasi but then we have to deal with raw/cooked stuff. So we just inject it as another expression.
      // Another rule will clean it up properly. That way I don't have to duplicate that logic here.

      rule('Adding a template to a primitive should be resolved statically');
      example('`a${b}c` + 15', '`a${b}c${15}`');
      before(node, parentNode);

      const newRight = AST.cloneSimpleOrTemplate(right);

      const newTemplateNode = AST.templateLiteral(
        [...left.quasis.map((te) => te.value.cooked), ''],
        [...left.expressions.map((n) => AST.cloneSimpleOrTemplate(n)), newRight],
      );
      if (parentIndex < 0) parentNode[parentProp] = newTemplateNode;
      else parentNode[parentProp][parentIndex] = newTemplateNode;

      after(newTemplateNode, parentNode);
      return true;
    } else if (right.type === 'TemplateLiteral') {
      // Okay should be safe to concat to a string
      // We can append this to the quasi but then we have to deal with raw/cooked stuff. So we just inject it as another expression.
      // Another rule will clean it up properly. That way I don't have to duplicate that logic here.

      rule('Adding a primitive to a template should be resolved statically');
      example('15 + `a${b}c`', '`${15}a${b}c`');
      before(node, parentNode);

      const newLeft = AST.cloneSimpleOrTemplate(left);

      const newTemplateNode = AST.templateLiteral(
        ['', ...right.quasis.map((te) => te.value.cooked)],
        [...right.expressions.map((n) => AST.cloneSimpleOrTemplate(n)), newLeft],
      );
      if (parentIndex < 0) parentNode[parentProp] = newTemplateNode;
      else parentNode[parentProp][parentIndex] = newTemplateNode;

      after(newTemplateNode, parentNode);
      return true;
    }
  }
}
