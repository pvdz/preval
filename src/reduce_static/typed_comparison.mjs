// Find strict equality checks to values where we know the type does not match, allowing us to predict the outcome reliably
//
//      const y = +x; const z = y === [];
// ->
//      const y = +x; const t = false;
//
// Also covers other types, or known type mismatches

import walk from '../../lib/walk.mjs';
import { ASSERT, log, group, groupEnd, vlog, vgroup, vgroupEnd, rule, example, before, source, after, fmat, tmat, findBodyOffset, todo } from '../utils.mjs';
import * as AST from '../ast.mjs';
import { PRIMITVE_TYPE_NAMES_NOT_STRING } from '../constants.mjs';
import { symbo } from '../symbols_builtins.mjs';

export function typedComparison(fdata) {
  group('\n\n\n[typedComparison] Checking for predictable strict type comparisons');
  const ast = fdata.tenkoOutput.ast;
  //currentState(fdata, 'typedComparison'. true);
  const r = _typedComparison(fdata);
  groupEnd();
  return r;
}

function _typedComparison(fdata) {
  const ast = fdata.tenkoOutput.ast;

  let changed = 0;

  walk(_walker, ast, 'ast');

  function _walker(node, beforeWalk, nodeType, path) {
    if (beforeWalk) return;

    if (node.type !== 'BinaryExpression') return;
    if (node.operator !== '===' && node.operator !== '!==') return;

    const blockBody = path.blockBodies[path.blockBodies.length - 1];
    const blockIndex = path.blockIndexes[path.blockIndexes.length - 1];

    const parentNode = path.nodes[path.nodes.length - 2];
    const parentProp = path.props[path.props.length - 1];
    const parentIndex = path.indexes[path.indexes.length - 1];

    // We can predict a bunch of strict type comparison results based on the
    // type, even if we don't know the concrete value. Not sure about rarity.
    // This may be handy for obfuscation cases, which tend to be contrived.

    const isPrimLeft = AST.isPrimitive(node.left);
    const isPrimRight = AST.isPrimitive(node.right);

    if (isPrimLeft || isPrimRight) {
      if (isPrimLeft && isPrimRight) return processPrimPrim(node.left, node.right, node.operator, blockBody, blockIndex, parentNode, parentProp, parentIndex);
      if (isPrimRight && (node.left.type === 'Literal' || node.left.type === 'TemplateLiteral')) return processPrimLit(node.left, node.right, node.operator, blockBody, blockIndex, parentNode, parentProp, parentIndex);
      if (isPrimLeft && (node.right.type === 'Literal' || node.right.type === 'TemplateLiteral')) return processPrimLit(node.right, node.left, node.operator, blockBody, blockIndex, parentNode, parentProp, parentIndex);
      if (isPrimRight && node.left.type === 'Identifier') return processPrimIdent(node.right, node.left, node.operator, fdata, blockBody, blockIndex, parentNode, parentProp, parentIndex);
      if (isPrimLeft && node.right.type === 'Identifier') return processPrimIdent(node.left, node.right, node.operator, fdata, blockBody, blockIndex, parentNode, parentProp, parentIndex);
      return vlog('-- one side is primitive but the other is not a primitive, literal, or identifier; bailing');
    }

    if (node.left.type === 'Literal' || node.left.type === 'TemplateLiteral') {
      if (node.right.type === 'Literal' || node.right.type === 'TemplateLiteral') return processLitLit(node.left, node.right, node.operator, blockBody, blockIndex, parentNode, parentProp, parentIndex);
      if (node.right.type === 'Identifier') return processLitIdent(node.left, node.right, node.operator, fdata, blockBody, blockIndex, parentNode, parentProp, parentIndex);
      return vlog('-- one side is a literal but the other is not a primitive, literal, or identifier; bailing');
    }

    if (node.left.type === 'Identifier') {
      if (node.right.type === 'Literal' || node.right.type === 'TemplateLiteral') return processLitIdent(node.right, node.left, node.operator, fdata, blockBody, blockIndex, parentNode, parentProp, parentIndex);
      if (node.right.type === 'Identifier') return processIdentIdent(node.left, node.right, node.operator, fdata, blockBody, blockIndex, parentNode, parentProp, parentIndex);
      return vlog('-- one side is an identifier but the other is not a primitive, literal, or identifier; bailing');
    }

    return vlog('-- at least one side neither a primitive, literal, or identifier; bailing');
  }

  function processPrimPrim(node1, node2, op, blockBody, blockIndex, parentNode, parentProp, parentIndex) {
    ASSERT(arguments.length === processPrimPrim.length);

    // I mean, resolve if why not.
    const equal = AST.getPrimitiveValue(node1) === AST.getPrimitiveValue(node2);
    // true and op is ===, or false and op is !==: result is true
    // false and op is ===, or true and op is !==: result is false
    const result = (equal === (op === '==='));

    rule('When strict comparing two primitives, resolve the operator');
    example('f(1 === "2");', 'f(false);');
    before(blockBody[blockIndex]);

    if (parentIndex < 0) parentNode[parentProp] = AST.primitive(result);
    else parentNode[parentProp][parentIndex] = AST.primitive(result);

    after(blockBody[blockIndex]);
    ++changed;
    return;
  }

  function processPrimLit(primitiveNode, literalNode, op, blockBody, blockIndex, parentNode, parentProp, parentIndex) {
    ASSERT(arguments.length === processPrimLit.length);

    const pt = AST.getPrimitiveType(primitiveNode);
    vlog('- processPrimLit(', pt, literalNode.type, ')');
    if (pt === 'string' && literalNode.type === 'TemplateLiteral') {
      if (AST.getPrimitiveValue(primitiveNode) === '') {

        // Note: in this branch, the only valid type for the literalNode
        // is StringLiteral. Other primitives would route to another func.
        // x==='' is same as !x because if x is '' then the result is true, and otherwise it is false.
        // x!=='' is the reverse. So we can replace x==='' with !x, and x!=='' with Boolean(x).
        // I think that's easier (?).

        rule('When strict comparing a string against an empty string we can simplify the expression');
        example('f(x === "");', 'f(Boolean(x));');
        example('f(x !== "");', 'f(!x);');
        before(blockBody[blockIndex]);

        const finalNode = op === '!==' ? AST.callExpression(symbo('boolean', 'constructor'), [literalNode]) : AST.unaryExpression('!', literalNode);
        if (parentIndex < 0) parentNode[parentProp] = finalNode;
        else parentNode[parentProp][parentIndex] = finalNode;

        after(blockBody[blockIndex]);
        ++changed;
        return;
      }

      // Ignore. They could still resolve to the same string, or not.
      return;
    }

    // Otherwise the literal node is not a primitive and so it can't strictly equal a primitive value
    // Since the comparison is false, the op is true when the op is !==, otheriwse false
    const result = op === '!==';


    rule('When strict comparing a primitive to a non-primitive literal, the result is predictable');
    example('f(1 === "2");', 'f(false);');
    before(blockBody[blockIndex]);

    if (parentIndex < 0) parentNode[parentProp] = AST.primitive(result);
    else parentNode[parentProp][parentIndex] = AST.primitive(result);

    after(blockBody[blockIndex]);
    ++changed;
  }
  function processPrimIdent(primitiveNode, identNode, op, fdata, blockBody, blockIndex, parentNode, parentProp, parentIndex) {
    ASSERT(arguments.length === processPrimIdent.length);
    const meta = fdata.globallyUniqueNamingRegistry.get(identNode.name);

    const pt = AST.getPrimitiveType(primitiveNode);

    vlog('- processPrimIdent(', pt, meta.typing.mustBeType, ')');

    if (!meta.typing.mustBeType) return; // We must know a type in order to make a prediction here
    // We can only predict the result when there is a type misMatch
    if (meta.typing.mustBeType === pt) {
      if (pt === 'string' && AST.getPrimitiveValue(primitiveNode) === '') {
        // Note: in this branch, the only valid type for the literalNode
        // is StringLiteral. Other primitives would route to another func.
        // x==='' is same as !x because if x is '' then the result is true, and otherwise it is false.
        // x!=='' is the reverse. So we can replace x==='' with !x, and x!=='' with Boolean(x).
        // I think that's easier (?).

        rule('When strict comparing a string against an empty string we can simplify the expression');
        example('f(x === "");', 'f(Boolean(x));');
        example('f(x !== "");', 'f(!x);');
        before(blockBody[blockIndex]);

        const finalNode = op === '!==' ? AST.callExpression(symbo('boolean', 'constructor'), [identNode]) : AST.unaryExpression('!', identNode);
        if (parentIndex < 0) parentNode[parentProp] = finalNode;
        else parentNode[parentProp][parentIndex] = finalNode;

        after(blockBody[blockIndex]);
        ++changed;
        return;
      }

      if (pt === 'boolean') {
        rule('When strict comparing a bool against true or false we can simplify the expression');
        example('f(x === true);', 'f(Boolean(x));');
        example('f(x !== true);', 'f(!x);');
        before(blockBody[blockIndex]);

        const pv = AST.getPrimitiveValue(primitiveNode);

        const finalNode = pv === (op === '===') ? AST.callExpression(symbo('boolean', 'constructor'), [identNode]) : AST.unaryExpression('!', identNode);
        if (parentIndex < 0) parentNode[parentProp] = finalNode;
        else parentNode[parentProp][parentIndex] = finalNode;

        after(blockBody[blockIndex]);
        ++changed;
        return;
      }

      // Same type, no prediction
      return;
    }

    if (PRIMITVE_TYPE_NAMES_NOT_STRING.has(meta.typing.mustBeType)) {
      // We know the result must be false
      rule('A primitive to and an ident with different mustBeType is always strictly inequal');
      example('const x = $() * 1; $(x === "foo");', 'const x = $() * 1; $(false);');
      example('const x = $() * 1; $(x !== "foo");', 'const x = $() * 1; $(true);');
      before(blockBody[blockIndex]);

      if (parentIndex < 0) parentNode[parentProp] = AST.primitive(op === '!==');
      else parentNode[parentProp][parentIndex] = AST.primitive(op === '!==');

      after(blockBody[blockIndex]);
      ++changed;
    }
  }
  function processLitLit(node1, node2, op, fdata, blockBody, blockIndex, parentNode, parentProp, parentIndex) {
    ASSERT(arguments.length === processLitLit.length);
    // Literals or TemplateLiteral but not primitive or TemplateLiterals without expressions.
    // The literals should be asserted not to be primitives, so we can ignore undefined, null, boolean, string, number
    // What's left is regex, I think? which is always false.

    vlog('- processLitLit(', node1.type, typeof node1.value, node2.type, typeof node2.value, ')');

    if (node1.type === 'TemplateLiteral' && node2.type === 'TemplateLiteral') return; // Unable to predict any comparison outcome

    // The node should be a regex literal or a template literal at this point and should in any way not be strictly equal.
    ASSERT(node1.type === 'TemplateLiteral' || node1.raw[0] === '/', 'node1 should be template or regex', node1);
    ASSERT(node2.type === 'TemplateLiteral' || node2.raw[0] === '/', 'node2 should be template or regex', node2);

    // We can only apply the result when there is a type misMatch
    rule('Two non-primitive literals are always inequal');
    example('$(/x/ === /x/)', '$(false)');
    example('$("foo${x}d" === /food/', '$(false)');
    before(blockBody[blockIndex]);

    if (parentIndex < 0) parentNode[parentProp] = AST.primitive(op === '!==');
    else parentNode[parentProp][parentIndex] = AST.primitive(op === '!==');

    after(blockBody[blockIndex]);
    ++changed;


    const result = op === '!==';

    rule('When strict comparing a primitive to a non-primitive literal, the result is predictable');
    example('f(1 === "2");', 'f(false);');
    before(blockBody[blockIndex]);

    if (parentIndex < 0) parentNode[parentProp] = AST.primitive(result);
    else parentNode[parentProp][parentIndex] = AST.primitive(result);

    after(blockBody[blockIndex]);
    ++changed;
  }
  function processLitIdent(litNode, identNode, op, fdata, blockBody, blockIndex, parentNode, parentProp, parentIndex) {
    ASSERT(arguments.length === processLitIdent.length);
    // If we have a type for the ident and it's not string, then we know the values are strictly inequal
    // Otherwise we must bail.

    vlog('- processLitIdent(', litNode.type, identNode.name, ')');

    if (litNode.type === 'TemplateLiteral') {
      const meta = fdata.globallyUniqueNamingRegistry.get(identNode.name);
      vlog('  - one side is a string, the mustBeType of the other side is:', meta.typing.mustBeType);
      if (!meta.typing.mustBeType || meta.typing.mustBeType === 'primitive') return; // This might be a string that's equal to the literal so we can't predict inequality
    } else {
      vlog('  - the literal is not a string (must be regex) so it shouldnt matter what the other side is');
    }

    // Either the literal is not a string or the ident is a known type that is not a string; the values are strictly inequal

    // We can only apply the result when there is a type misMatch
    rule('Literal and ident with known type are always strictly inequal if they are not both strings');
    example('const foo = 5; $(/x/ === foo)', '$(false)');
    example('const foo = [a,b,c]; $(`${x}` === foo)', '$(false)');
    before(blockBody[blockIndex]);

    if (parentIndex < 0) parentNode[parentProp] = AST.primitive(op === '!==');
    else parentNode[parentProp][parentIndex] = AST.primitive(op === '!==');

    after(blockBody[blockIndex]);
    ++changed;
  }
  function processIdentIdent(node1, node2, op, fdata, blockBody, blockIndex, parentNode, parentProp, parentIndex) {
    ASSERT(arguments.length === processIdentIdent.length);
    vlog('- processIdentIdent(', node1.type, node2.name, ')');

    const meta1 = fdata.globallyUniqueNamingRegistry.get(node1.name);
    const meta2 = fdata.globallyUniqueNamingRegistry.get(node2.name);

    // We ony want to allow solid types
    // For example, all arrays are objects. But primitives cannot match an object. So it can get a bit complex.
    const solids = new Set(['array', 'function', 'class', 'set', 'map', 'regex', 'promise']);
    const prims = new Set(['undefined', 'null', 'boolean', 'number', 'string']);

    const mustBe1 = meta1.typing.mustBeType;
    const mustBe2 = meta2.typing.mustBeType;

    vlog('The mustbes:', [meta1.typing.mustBeType, meta2.typing.mustBeType]);
    // Only do this when we're certain.
    if (!mustBe1 || !mustBe2) return;
    if (mustBe1 === mustBe2 || !(
      (solids.has(mustBe1) && solids.has(mustBe2)) || // two different concrete object types
      (prims.has(mustBe1) && prims.has(mustBe2)) ||   // two different concrete prims
      ((mustBe1 === 'primitive' && prims.has(mustBe1)) && !(solids.has(mustBe2) || mustBe2 === 'object')) || // any primitive vs any object type
      ((mustBe2 === 'primitive' && prims.has(mustBe2)) && !(solids.has(mustBe1) || mustBe1 === 'object'))    // any primitive vs any object type
    )) {
      return;
    }

    rule('Two idents with known types that are different are always strictly inequal');
    example('const foo = 5; const b = []; $(foo === b)', '$(false)');
    before(blockBody[blockIndex]);

    if (parentIndex < 0) parentNode[parentProp] = AST.primitive(op === '!==');
    else parentNode[parentProp][parentIndex] = AST.primitive(op === '!==');

    after(blockBody[blockIndex]);
    ++changed;
  }

  if (changed) {
    log('Typed comparisons resolved:', changed, '. Restarting from phase1 to fix up read/write registry');
    return { what: 'typedComparison', changes: changed, next: 'phase1' };
  }

  log('Typed comparisons resolved: 0.');
}
