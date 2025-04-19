// Find functions that reference `this` and are never called with a context (in module goal they are `undefined` but in web code it's window)
// `function f(){ return this; }`
// -> `function f(){ return undefined; }`
// -> `function f(){ return window; }` with options.implicitThisValue=window

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

export function implicitThis(fdata, implicitThisIdent = 'undefined') {
  group('\n\n\n[implicitThis] Looking for implicit `this` cases to replace with another ident\n');
  const ast = fdata.tenkoOutput.ast;
  //vlog('\nCurrent state\n--------------\n' + fmat(tmat(fdata.tenkoOutput.ast)) + '\n--------------\n');
  const r = _implicitThis(fdata, implicitThisIdent);
  groupEnd();
  return r;
}
function _implicitThis(fdata, implicitThisValue) {
  const ast = fdata.tenkoOutput.ast;

  let changes = 0;

  const funcStack = [];

  walk(_walker, ast, 'ast');
  function _walker(node, beforeWalk, nodeType, path) {
    if (node.type === 'FunctionExpression') {
      if (beforeWalk) funcStack.push(node);
      else funcStack.pop();
      return;
    }

    if (beforeWalk) return;

    if (node.type !== 'ThisExpression') return;

    const parentNode = path.nodes[path.nodes.length - 2];
    const parentProp = path.props[path.props.length - 1];
    const parentIndex = path.indexes[path.indexes.length - 1];
    const grandNode = path.nodes[path.nodes.length - 3];
    const grandProp = path.props[path.props.length - 2];
    const grandIndex = path.indexes[path.indexes.length - 2];
    const blockBody = path.blockBodies[path.blockBodies.length - 1];
    const blockIndex = path.blockIndexes[path.blockIndexes.length - 1];

    // Since this is normalized code, ths `this` can only appear in the function header, when it gets aliased

    const funcNode = funcStack[funcStack.length - 1];
    if (funcNode) {
      if (!funcNode.$p.uniqueName) {
        vlog('The func was not a const so we should bail here since we can not track callers properly');
        return
      }

      const meta = fdata.globallyUniqueNamingRegistry.get(funcNode.$p.uniqueName);

      // Verify all reads are calls and that all calls have the callee an ident, not a member expression
      if (
        meta.reads.some((read) => {
          if (read.parentNode.type !== 'CallExpression' || read.parentProp !== 'callee') {
            return true;
          }
        })
      ) {
        return;
      }

      ASSERT(blockIndex < funcNode.$p.bodyOffset, 'normalized code should have all `this` occurrences as alias in the header');

      rule(
        'The `this` value for a function that is never called with a context can be replaced with the implicit `this` value;',
        implicitThisValue,
      );
      example('function f() { return this; } f();', 'function f() { return undefined; } f();');
      before(parentNode, funcNode);

      const finalNode = AST.identifier(implicitThisValue);
      if (parentIndex < 0) parentNode[parentProp] = finalNode;
      else parentNode[parentProp][parentIndex] = finalNode;
      // Move the statement down (should be safe since there can be only one per function in normalized code)
      blockBody.splice(funcNode.$p.bodyOffset, 0, blockBody[blockIndex]);
      blockBody.splice(blockIndex, 1);

      after(parentNode, funcNode);
      ++changes;
    } else {
      // TODO: implicit this in global scope is the same?
    }
  }
  if (changes) {
    log('Implicit `this`es replaced:', changes, '. Restarting from phase1 to fix up read/write registry');
    return {what: 'implicitThis', changes: changes, next: 'phase1'};
  }

  log('Implicit `this`es replaced:', 0, '.');
}
