// Find comparisons to zero where the other side is guaranteed to be a number (even if we don't actually know the value).
// `const y = +x; const t = y === 0;'
// -> 'const y = +x; const t = !y;`
// Also covers other types, or known type mismatches

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

export function typedComparison(fdata) {
  group('\n\n\nChecking for comparisons to zero on values that must be a number');
  const ast = fdata.tenkoOutput.ast;
  //vlog('\nCurrent state\n--------------\n' + fmat(tmat(fdata.tenkoOutput.ast)) + '\n--------------\n');
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

    const ipl = AST.isPrimitive(node.left);
    const ipr = AST.isPrimitive(node.right);

    // If neither or both are primitive, bail. If both then another rule can resolve them completely.
    if ((!ipl && !ipr) || (ipl && ipr)) return;

    const identNode = ipl ? node.right : node.left;

    // Bail if the other side is not an ident.
    // TODO: there are some other node types that we can still resolve here since this is a strict comparison and we have a primitive
    if (identNode.type !== 'Identifier') return;

    const meta = fdata.globallyUniqueNamingRegistry.get(identNode.name);
    ASSERT(meta);

    if (!meta.typing.mustBeType) {
      vlog('- Comparing a primitive to an ident but the type of the ident was not guaranteed. We must bail.');
      return;
    }

    // So now we are comparing a primitive to an ident that is not a primitive
    // We can resolve a few `===` cases and any `!==` cases where the type is not a match

    const blockBody = path.blockBodies[path.blockBodies.length - 1];
    const blockIndex = path.blockIndexes[path.blockIndexes.length - 1];
    const parentNode = path.nodes[path.nodes.length - 2];
    const parentProp = path.props[path.props.length - 1];
    const parentIndex = path.indexes[path.indexes.length - 1];

    const pv = AST.getPrimitiveValue(ipl ? node.left : node.right);

    vlog('Comparing primitive', [pv], 'to ident `' + identNode.name + '`, which must be of type', meta.typing.mustBeType);

    // First compare the falsy values
    switch (typeof pv + ':' + meta.typing.mustBeType) {
      case 'undefined:undefined':
      case 'object:null': {
        vlog('The other side must be undefined/null and so another rule will deal with it');
        return;
      }
      case 'boolean:boolean': {
        rule('When comparing an ident known to be a bool with an actual bool we can drop the comparison');
        example('const x = Boolean(a); f(x === true);', 'const x = Boolean(a); f(x);', () => node.operator === '===' && pv);
        example('const x = Boolean(a); f(x !== false);', 'const x = Boolean(a); f(x);', () => node.operator === '===' && !pv);
        example('const x = Boolean(a); f(x === false);', 'const x = Boolean(a); f(x);', () => node.operator === '!==' && !pv);
        example('const x = Boolean(a); f(x !== true);', 'const x = Boolean(a); f(!x);', () => node.operator === '!==' && pv);
        before(blockBody[blockIndex]);

        // table:
        // - === + true -> drop both
        // - === + false -> bang
        // - !== + true -> bang
        // - !== + false -> drop both
        if ((node.operator === '===') === pv) {
          // Drop both, keep the ident
          if (parentIndex < 0) parentNode[parentProp] = identNode;
          else parentNode[parentProp][parentIndex] = identNode;
        } else {
          // Bang
          if (parentIndex < 0) parentNode[parentProp] = AST.unaryExpression('!', identNode);
          else parentNode[parentProp][parentIndex] = AST.unaryExpression('!', identNode);
        }

        after(blockBody[blockIndex]);
        ++changed;
        return;
      }
      case 'number:number': {
        if (pv === 0) {
          rule('When comparing an ident that must be a number to a zero, change to a bool coerce');
          rule('const x = +a; f(x === 0);', 'const x = +a; f(!x);');
          rule('const x = +a; f(x !== 0);', 'const x = +a; f(Boolean(x));');
          before(blockBody[blockIndex]);

          const newNode = node.operator === '===' ? AST.unaryExpression('!', identNode) : AST.callExpression('Boolean', [identNode]);
          if (parentIndex < 0) parentNode[parentProp] = newNode;
          else parentNode[parentProp][parentIndex] = newNode;

          after(blockBody[blockIndex]);
          ++changed;
        }
        return;
      }
      case 'string:string': {
        if (pv === '') {
          rule('When comparing an ident that must be a number to a zero, change to a bool coerce');
          rule('const x = String(a); f(x === "");', 'const x = +a; f(!x);');
          rule('const x = String(a); f(x !== "");', 'const x = +a; f(Boolean(x));');
          before(blockBody[blockIndex]);

          const newNode = node.operator === '===' ? AST.unaryExpression('!', identNode) : AST.callExpression('Boolean', [identNode]);
          if (parentIndex < 0) parentNode[parentProp] = newNode;
          else parentNode[parentProp][parentIndex] = newNode;

          after(blockBody[blockIndex]);
          ++changed;
        }
        return;
      }
    }

    ASSERT(meta.typing.mustBeType !== typeof pv, 'Can only reach this point if the primitive was compared to something that is known but not the same type. That ... is false.')

    // This case is already covered by another rule so we should not need to do it here ...
    //vlog('Type must not match so this must be false or true depending on the op');
    //rule('When an ident whose type is known is compared to a primitive of a different type, we can resolve strict comparisons safely');
    //example('const x = +a; f(x === "foo");', 'const x = +a; f(false);');
    //before(blockBody[blockIndex]);
    //
    //const newNode = node.operator === '===' ? AST.fals() : AST.tru()
    //if (parentIndex < 0) parentNode[parentProp] = newNode;
    //else parentNode[parentProp][parentIndex] = newNode;
    //
    //after(blockBody[blockIndex]);
    //++changed;
  }

  if (changed) {
    log('Typed comparisons resolved:', changed, '. Restarting from phase1 to fix up read/write registry');
    return 'phase1';
  }

  log('Typed comparisons resolved: 0.');
}
