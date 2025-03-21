// Find `if` tests that are identifier and whose value is inverted inside either branch
//
//      if (x) y = !x;
// ->
//      if (x) y = false;

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

export function ifTestBool(fdata) {
  group('\n\n\nChecking for if-tests that are inverted');
  const ast = fdata.tenkoOutput.ast;
  //vlog('\nCurrent state\n--------------\n' + fmat(tmat(fdata.tenkoOutput.ast)) + '\n--------------\n');
  const r = _ifTestBool(fdata);
  groupEnd();
  return r;
}
function _ifTestBool(fdata) {
  const ast = fdata.tenkoOutput.ast;

  let changed = 0;

  // TODO: probably faster to walk the known binding names and check if any of them are used as an if-test
  walk(_walker, ast, 'ast');
  function _walker(node, beforeWalk, nodeType, path) {
    if (beforeWalk) return;

    if (node.type !== 'IfStatement') return;

    if (node.test.type !== 'Identifier') return;

    vlog('If on ident');

    // First find the `var x = a === b``
    const ifTestMeta = fdata.globallyUniqueNamingRegistry.get(node.test.name);
    if (ifTestMeta.isBuiltin) return;
    if (ifTestMeta.isImplicitGlobal) return;
    if (ifTestMeta.constValueRef.containerNode.type !== 'VariableDeclaration') return; // catch, for-x, ???
    if (!ifTestMeta.isConstant) return;
    //if (meta.writes.length > 1) return; // TODO: fixme if broken

    let varDeclRef = ifTestMeta.writes.find((write) => write.kind === 'var');
    if (!varDeclRef) {
      vlog('The binding was not a var. Bailing');
      return;
    }

    const beforeValueNode = ifTestMeta.constValueRef.node;
    vlog('If on constant or if is immediately after var:', beforeValueNode.type);

    // Find all reads to the ident and see if we can predict something with the truthy/falsy state of the var
    vgroup('First trick failed. Now searching all reads of the test ident `' + ifTestMeta.uniqueName + '`');
    ifTestMeta.reads.forEach((read, ri) => {
      vlog('- read', ri);
      let whichBranch = '';
      if (+read.node.$p.pid > +node.consequent.$p.pid && +read.node.$p.pid <= +node.consequent.$p.lastPid) {
        vlog('ref in if branch');

        if (read.parentNode.type === 'UnaryExpression' && read.parentNode.operator === '!') {
          rule('Inverting an `if`-tested constant in the consequent branch must yield `false`');
          example('if (x) y = !x', 'if (x) y = false;');
          before(read.blockBody[read.blockIndex]);

          if (read.grandIndex < 0) read.grandNode[read.grandProp] = AST.fals();
          else read.grandNode[read.grandProp][read.grandIndex] = AST.fals();
          ++changed;

          after(read.blockBody[read.blockIndex]);
        } else if (
          read.parentNode.type === 'CallExpression' &&
          read.parentNode.callee.type === 'Identifier' &&
          read.parentNode.callee.name === 'Boolean' &&
          read.parentNode['arguments'].length === 1 &&
          read.parentProp === 'arguments'
        ) {
          rule('Boolean() on an `if`-tested constant in the consequent branch must yield `true`');
          example('if (x) y = Boolean(x);', 'if (x) y = false;');
          before(read.blockBody[read.blockIndex]);

          if (read.grandIndex < 0) read.grandNode[read.grandProp] = AST.tru();
          else read.grandNode[read.grandProp][read.grandIndex] = AST.tru();
          ++changed;

          after(read.blockBody[read.blockIndex]);
        }
      } else if (+read.node.$p.pid > +node.alternate.$p.pid && +read.node.$p.pid <= +node.alternate.$p.lastPid) {
        vlog('ref in else branch');

        if (read.parentNode.type === 'UnaryExpression' && read.parentNode.operator === '!') {
          rule('Inverting an `if`-tested constant in the alternate branch must yield `true`');
          example('if (x) y = !x', 'if (x) y = false;');
          before(read.blockBody[read.blockIndex]);

          if (read.grandIndex < 0) read.grandNode[read.grandProp] = AST.tru();
          else read.grandNode[read.grandProp][read.grandIndex] = AST.tru();
          ++changed;

          after(read.blockBody[read.blockIndex]);
        } else if (
          read.parentNode.type === 'CallExpression' &&
          read.parentNode.callee.type === 'Identifier' &&
          read.parentNode.callee.name === 'Boolean' &&
          read.parentNode['arguments'].length === 1 &&
          read.parentProp === 'arguments'
        ) {
          rule('Boolean() on an `if`-tested constant in the alternate branch must yield `false`');
          example('if (x) {} else y = Boolean(x);', 'if (x) {} else y = false;');
          before(read.blockBody[read.blockIndex]);

          if (read.grandIndex < 0) read.grandNode[read.grandProp] = AST.fals();
          else read.grandNode[read.grandProp][read.grandIndex] = AST.fals();
          ++changed;

          after(read.blockBody[read.blockIndex]);
        }
      } else {
        vlog('ref not inside `if` statement at all');
      }
    });
    vgroupEnd();
  }

  if (changed) {
    log('If tests inverted:', changed, '. Restarting from phase1 to fix up read/write registry');
    return {what: 'ifTestBool', changes: changed, next: 'phase1'};
  }

  log('If tests inverted: 0.');
}
