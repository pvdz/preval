// Find array literal property reads to inline
//    const arr = [1, 2, 3]; x = arr[1]
//  ->
//    const arr = [1, 2, 3]; x = 2;


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
  findBodyOffset, riskyRule,
} from '../utils.mjs';
import * as AST from '../ast.mjs';

export function arrayReads(fdata) {
  group('\n\n\nFinding property reads on array literals\n');
  //vlog('\nCurrent state\n--------------\n' + fmat(tmat(fdata.tenkoOutput.ast)) + '\n--------------\n');
  const r = _arrayReads(fdata);
  groupEnd();
  return r;
}
function _arrayReads(fdata) {
  const ast = fdata.tenkoOutput.ast;

  let changes = 0;

  walk(_walker, ast, 'ast');
  function _walker(node, beforeWalk, nodeType, path) {
    if (beforeWalk) return;
    if (node.type !== 'ArrayExpression') return;

    const parentNode = path.nodes[path.nodes.length - 2];
    //const parentProp = path.props[path.props.length - 1];
    //const parentIndex = path.indexes[path.indexes.length - 1];
    //const grandNode = path.nodes[path.nodes.length - 3];
    //const grandProp = path.props[path.props.length - 2];
    //const grandIndex = path.indexes[path.indexes.length - 2];

    vlog('Have array expression @', +node.$p.pid);

    // Okay silly heuristic:
    // - scan forward. skip any var decls and assignments as long as they are simple
    // - search for property access on the array
    // - otherwise stop at the first complex node

    const arrNode = node;
    if (arrNode.elements.some(enode => enode?.type === 'SpreadElement')) return vlog('- Array has a spread, bailing');

    let lhs;
    if (parentNode.type === 'VariableDeclarator') {
      ASSERT(parentNode.init === arrNode);
      lhs = parentNode.id;
    }
    else if (parentNode.type === 'AssignmentExpression') {
      ASSERT(parentNode.right === arrNode);
      lhs = parentNode.left;
    }
    else if (parentNode.type === 'ExpressionStatement') {
      return vlog('- It is an expr statement. Bailing');
    }
    else {
      ASSERT(false, 'FIXME where do arrays appear in normalized code?', parentNode);
    }

    // Note: this only works because the parent block is 3 removed from an assignment statement rhs as well as var decl init
    // - block[i].expression.right
    // - block[i].decls[0].init
    const blockBody = path.nodes[path.nodes.length - 4].body;
    const blockIndex = path.indexes[path.indexes.length - 3];

    ASSERT(blockBody && blockIndex >= 0, 'blockbody and blockindex should be available now, in normalized code they should be easy to get', blockBody, blockIndex);
    ASSERT(lhs?.type === 'Identifier', 'in normalized code we only assign to idents', lhs, parentNode);
    const arrName = lhs.name;
    const meta = fdata.globallyUniqueNamingRegistry.get(arrName);
    if (meta.isImplicitGlobal) return vlog('- Assigned to implicit global, bailing');
    if (meta.isBuiltin) return vlog('- Assigned to built-in. Who does that. Bailing'); // eh

    vgroup();
    withArrayExpr(node, arrName, parentNode, blockBody, blockIndex);
    vgroupEnd();
  }

  /**
   * @param {BlockStatement['body']} block An array
   * @param {number} index
   * @param {ArrayExpression} arrNode
   * @param {string} arrName
   * @param {'bail' | 'changed' | undefined} An undefined means the statement does not prevent us from checking the next statement
   */
  function walkBlock(block, index, arrNode, arrName) {
    if (index >= block.length) return vlog('- No more statements after index', index);
    while (block[index]) {
      const next = block[index];
      vlog('- Statement', index, ';', next?.type);
      if (
        next.type === 'VariableDeclaration' &&
        (next.declarations[0].init.type === 'Identifier' || AST.isPrimitive(next.declarations[0].init.type))
      ) {
        // This can't cause array changes, skip it
        vlog('  - Var decl with ident or primitive as init, skipping');
      }
      else if (
        next.type === 'ExpressionStatement' &&
        next.expression.type === 'AssignmentExpression' &&
        next.expression.left.type === 'Identifier' &&
        (next.expression.right.type === 'Identifier' || AST.isPrimitive(next.expression.right.type))
      ) {
        // This can't cause array changes, skip it
        vlog('  - Assignment to ident with ident or primitive as init, skipping');
      }
      else if (
        next.type === 'VariableDeclaration' &&
        next.declarations[0].init.type === 'MemberExpression' &&
        next.declarations[0].init.object.type === 'Identifier' &&
        next.declarations[0].init.object.name === arrName
      ) {
        vlog('  - Var decl with prop read on arr as init...');
        // Even if we can't inline this, a regular (or computed) property read on a built-in array can not change it.
        const prop = next.declarations[0].init.property;
        if (
          next.declarations[0].init.computed &&
          AST.isNumber(prop) // literal, not NaN/Infinity
        ) {
          const arrIndex = AST.getPrimitiveValue(prop);
          const enode = arrNode.elements[arrIndex];
          if (!enode || AST.isPrimitive(enode)) {
            // This is a primitive value so we should be able to inline it safely
            rule('If an array literal is accessed immediately after creating it and assigned to decl then we can inline primitive props');
            example('const arr = [1, 2, 3]; f(arr[1])', 'const arr = [1, 2, 3]; f(2);');
            before(next);

            next.declarations[0].init = enode ? AST.primitive(AST.getPrimitiveValue(enode)) : AST.identifier('undefined');

            after(next);
            ++changes;
            return 'changed';
          } else {
            // Can only use this reference if it wasn't assigned to yet since the decl
            vlog('  - The element in the array literal at index', arrIndex, 'is a', enode.type, 'which we cant safely inline here'); // (yet? there are some more cases we can cover here)
          }
        } else {
          // Not a numbered property access on the array
          vlog('  - The property access was not an index, skipping');
        }
        // The current statement could not have changed the array. Continue searching.
        vlog('  - It was not an indexed prop read but a regular read on the array should not mutate it, skipping');
      }
      else if (
        next.type === 'ExpressionStatement' &&
        next.expression.type === 'AssignmentExpression' &&
        next.expression.right.type === 'MemberExpression' &&
        next.expression.right.object.type === 'Identifier' &&
        next.expression.right.object.name === arrName
      ) {
        vlog('  - Assignment with prop read on arr as rhs...');
        // Reading a regular/computed property on a built-in array cannot mutate the array
        const prop = next.expression.right.property;
        if (
          next.expression.right.computed &&
          AST.isNumber(prop) // literal, not NaN/Infinity
        ) {
          const arrIndex = AST.getPrimitiveValue(prop);
          const enode = arrNode.elements[arrIndex];
          if (!enode || AST.isPrimitive(enode)) {
            // This is a primitive value so we should be able to inline it safely
            rule('If an array literal is accessed immediately after creating it and assigned elsewhere then we can inline primitive props');
            example('arr = [1, 2, 3]; f(arr[1])', 'const arr = [1, 2, 3]; f(2);');
            before(next);

            next.expression.right = enode ? AST.primitive(AST.getPrimitiveValue(enode)) : AST.identifier('undefined');

            after(next);
            ++changes;
            return 'changed';
          } else {
            // Can only use this reference if it wasn't assigned to yet since the decl
          }
        }
        else if (next.expression.right.type !== 'Identifier') {
          vlog('  - Was not array index access, was not assignment to ident, bailing');
          return 'bail';
        }
        vlog('  - Was not array index access, was assignment to ident, cannot change array, skipping');
      }
      else if (next.type === 'IfStatement') {
        // Walk both sides
        const a = walkBlock(next.consequent.body, 0, arrNode, arrName);
        const b = walkBlock(next.alternate.body, 0, arrNode, arrName);
        return a || b; // Guess it doesn't matter much what we return here
      }
      else if (next.type === 'LabeledStatement') {
        return walkBlock(next.body, 0, arrNode, arrName);
      }
      else if (next.type === 'TryStatement') {
        // I believe this is safe to do. Not the Catch block tho.
        walkBlock(next.block, 0, arrNode, arrName);
        // Since a try is followed by a catch and we can't predict the catch, we can't safely assume much about the state of the array
        // I guess there are some cases where we can. Maybe worth checking into at some point but not now.
        return 'bail';
      }
      else {
        // TODO: This may be a statement that we can ignore but there are many cases to cover here
        vlog('  - Was "other" statement (', next.type, next.expression?.type, '), bailing');
        return 'bail';
      }
      ++index;
    }

    return undefined; // Did not bail or change
  }

  function withArrayExpr(arrNode, arrName, parentNode, blockBody, blockIndex) {

    let index = blockIndex + 1; //
    if (!blockBody[index]) {
      vlog('- Array literal was in last statement of owner block, bailing');
      return;
    }

    walkBlock(blockBody, index, arrNode, arrName)
  }

  if (changes) {
    log('Properties resolved:', changes, '. Restarting from phase1');
    return 'phase1';
  }

  log('Properties resolved: 0.');
}
