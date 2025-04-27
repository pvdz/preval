import { ASSERT } from './utils.mjs';

export function arrayExpression(node) {
  ASSERT(typeof node === 'object');
  return node.type === 'ArrayExpression';
}
export {arrayExpression as array};

export function binaryExpression(node, operator, leftType, rightType) {
  ASSERT(typeof node === 'object');
  if (node.type !== 'BinaryExpression') return false;
  if (operator && node.operator !== operator) return false;
  if (leftType && node.left.type !== leftType) return false;
  if (rightType && node.right.type !== rightType) return false;
  return true;
}
export {binaryExpression as binary};

export function breakStatement(node, label) {
  ASSERT(typeof node === 'object');
  if (node.type !== 'BreakStatement') return false;
  if (label !== undefined && node.label !== label) return false;
  return true;
}
export {breakStatement as break};

export function boolean(node) {
  ASSERT(typeof node === 'object');
  return node.type === 'Literal' && typeof node.value === 'boolean';
}

export function callExpression(node, calleeType, calleeName, argCount) {
  ASSERT(typeof node === 'object');
  if (node.type !== 'CallExpression') return false;
  if (calleeType && node.type !== calleeType) return false;
  if (calleeName && node.name !== calleeName) return false;
  if (argCount !== undefined && node.arguments.length !== argCount) return false;
  return true;
}
export {callExpression as call};

export function _const(node, name, initType) {
  return variableDeclaration(node, 'const', name, initType);
}
export {_const as const};

export function expressionStatement(node, exprType) {
  ASSERT(typeof node === 'object');
  if (node.type !== 'ExpressionStatement') return false;
  if (exprType && node.expression.type !== exprType) return false;
  return true;
}
export {expressionStatement as exprstmt};

export function _false(node) {
  ASSERT(typeof node === 'object');
  return node.type === 'Literal' && node.value === false;
}
export {_false as false};

export function ident(node, name) {
  ASSERT(typeof node === 'object');
  if (node.type !== 'Identifier') return false;
  if (name && node.name !== name) return false;
  return true;
}
export {ident as identifier};

export function ifStatement(node, testType, testName, consequentLen, alternateLen) {
  ASSERT(typeof node === 'object');
  if (node.type !== 'IfStatement') return false;
  if (testType && node.test.type !== testType) return false;
  if (testName && node.test.name !== testName) return false;
  if (consequentLen !== undefined && node.consequent.body.length !== consequentLen) return false;
  if (alternateLen !== undefined && node.alternate.body.length !== alternateLen) return false;
  return true;
}
export {ifStatement as if};

export function _let(node, name, initType) {
  return variableDeclaration(node, 'let', name, initType);
}
export {_let as let};

export function memberExpression(node, computed, objectType, objectName, propType, propName) {
  ASSERT(typeof node === 'object');
  if (node.type !== 'MemberExpression') return false;
  if (computed !== undefined && node.computed !== computed) return false;
  if (objectType && node.object.type !== objectType) return false;
  if (objectName && node.object.name !== objectName) return false;
  if (propType && node.property.type !== propType) return false;
  if (propName && node.property.name !== propName) return false;
  return true;
}
export {memberExpression as member};

function _null(node) {
  ASSERT(typeof node === 'object');
  return node.type === 'Literal' && node.raw === 'null';
}
export {_null as null}; // Consistency ftw?

export function number(node) {
  ASSERT(typeof node === 'object');
  return node.type === 'Literal' && typeof node.value === 'number';
}

export function string(node, allowLiteral = false) {
  // This returns true for actual string literals and template literals without expressions.
  return (
    (node.type === 'TemplateLiteral' && node.expressions.length === 0) ||
    (node.type === 'Literal' && typeof node.value === 'string')
  );
}

function _true(node) {
  ASSERT(typeof node === 'object');
  return node.type === 'Literal' && node.value === true;
}
export {_true as true};

export function undefined(node) {
  ASSERT(typeof node === 'object');
  return node.type === 'Identifier' && node.name === 'undefined';
}

export function variableDeclaration(node, kind, name, initType) {
  if (node?.type !== 'VariableDeclaration') return false;
  if (kind && node.kind !== kind) return false;
  if (name && node.declarations[0].id.name !== name) return false;
  if (initType && node.declarations[0].init.type !== initType) return false;
  return true;
}
export {variableDeclaration as varDecl};
export {variableDeclaration as var};

export function whileStatement(node, testType, testName, bodyLen) {
  ASSERT(typeof node === 'object', 'should be a node so an object', typeof node, node?.type);
  if (node.type !== 'WhileStatement') return false;
  if (testType && node.test.type !== testType) return false;
  if (testName && node.test.name !== testName) return false;
  if (bodyLen !== undefined && node.body.body.length !== bodyLen) return false;
  return true;
}
export {whileStatement as while};
