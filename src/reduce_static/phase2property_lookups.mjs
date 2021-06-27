// Find properties that we can inline. Use type inference or whatever.

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
  findBodyOffset,
} from '../utils.mjs';
import { BUILTIN_ARRAY_PROTOTYPE } from '../constants.mjs';
import * as AST from '../ast.mjs';

export function propertyLookups(fdata) {
  group('\n\n\nFinding static properties to resolve\n');
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

    const parentNode = path.nodes[path.nodes.length - 2];
    const parentProp = path.props[path.props.length - 1];
    const parentIndex = path.indexes[path.indexes.length - 1];
    const grandNode = path.nodes[path.nodes.length - 3];
    const grandProp = path.props[path.props.length - 2];
    const grandIndex = path.indexes[path.indexes.length - 2];

    if (parentNode.type === 'CallExpression') return; // Bail on method calls for now.
    ASSERT(parentNode.type !== 'NewExpression', 'normalized code should not have member expressions as the callee of a new (nor its args)');

    vlog('-', node.computed ? node.object.type + '[' + node.property.type + ']' : node.object.type + '.' + node.property.type)

    if (node.object.type === 'Identifier' && !AST.isPrimitive(node.object) && node.object.name !== 'arguments') {
      const meta = fdata.globallyUniqueNamingRegistry.get(node.object.name);
      vlog('  -', node.computed ? node.object.name + '[' + node.property.type + ']' : node.object.name + '.' + node.property.name)
      vlog('the obj is a', meta.typing.mustBeType || '<unknown>');
      vlog('    - typing for `' + node.object.name  + '`:', meta.typing)
      if (meta.typing.mustBeType === 'array') {
        ASSERT(node.property.type === 'Identifier');
        const prop = node.property.name;
        if (['flat', 'concat'].includes(prop)) {
          if (true) {
            // jsf*ck specific support
            // This is Function#flat ...
            rule('Fetching but not calling a method from Array.prototype should do this explicitly');
            example('f([].flat)', 'f('+BUILTIN_ARRAY_PROTOTYPE+'.flat)');
            before(node, grandNode);

            node.object = AST.identifier(BUILTIN_ARRAY_PROTOTYPE);

            after(node, grandNode);
            ++changes;
            return;
          }
        }
      } else if (meta.typing.mustBeType === 'function') {
        ASSERT(node.property.type === 'Identifier');
        const prop = node.property.name;
        if (prop === 'constructor') {
          if (true) {
            // jsf*ck specific support
            // This is Function ...
            rule('Fetching the constructor prop from a function should return `Function`');
            example('f(parseInt.constructor)', 'f(Function)');
            before(node, grandNode);

            const finalNode = AST.identifier('Function');
            if (parentIndex < 0) parentNode[parentProp] = finalNode;
            else parentNode[parentProp][parentIndex] = finalNode;

            after(node, grandNode);
            ++changes;
            return;
          }
        }
      } else if (meta.typing.mustBeType === 'regex') {
        ASSERT(node.property.type === 'Identifier');
        const prop = node.property.name;
        if (prop === 'constructor') {
          if (true) {
            // jsf*ck specific support
            // This is RegExp ...
            rule('Fetching the constructor prop from a function should return `Function`');
            example('f(/foo/.constructor)', 'f(RegExp)');
            before(node, grandNode);

            const finalNode = AST.identifier('RegExp');
            if (parentIndex < 0) parentNode[parentProp] = finalNode;
            else parentNode[parentProp][parentIndex] = finalNode;

            after(node, grandNode);
            ++changes;
            return;
          }
        }
      }
    }

  }

  if (changes) {
    log('Properties resolved:', changes, '. Restarting from phase1');
    return 'phase1';
  }

  log('Properties resolved: 0.');
}
