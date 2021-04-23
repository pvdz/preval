// Combined with lite type checking, we can reduce the possible valid values for an if condition and deduce the actual value from it that way.

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
import * as AST from '../ast.mjs';
import { createFreshVar, getIdentUsageKind } from '../bindings.mjs';

export function ifReduction(fdata) {
  group('\n\n\nReducing idents used in if-else\n');
  const r = _ifReduction(fdata);
  groupEnd();
  return r;
}
function _ifReduction(fdata) {
  let deduced = 0;
  const ast = fdata.tenkoOutput.ast;

  const queue = [];

  // TODO: is the walking of individual if statements here more efficient than the gc pressure of collecting all if-statements and their parent etc in phase1 (often redundantly so)?
  walk(_walker, ast, 'ast');
  function _walker(node, beforeWalk, nodeType, path) {
    if (beforeWalk) return;
    if (node.type !== 'IfStatement') return;
    if (node.test.type !== 'Identifier') return;

    const ident = node.test;
    const meta = fdata.globallyUniqueNamingRegistry.get(ident.name);

    if (meta.isBuiltin) return; // This should be picked up by normalization and eliminated
    if (meta.isImplicitGlobal) return;
    if (!meta.isConstant) return; // TODO: we can probably narrow the type, which I'll focus on later

    // Add to queue in reverse DFS order (we are on the way back here)
    const parentNode = path.nodes[path.nodes.length - 2];
    const parentProp = path.props[path.props.length - 1];
    const parentIndex = path.indexes[path.indexes.length - 1];
    ASSERT(parentIndex >= 0);
    queue.push({ node, meta, body: parentNode[parentProp], index: parentIndex });
  }

  vlog('Found', queue.length, 'if statements that may qualify');

  if (queue.length) {
    vgroup('Processing ifs now');
    queue.forEach(({ node, meta, body, index }) => {
      const typing = meta.typing;
      vlog('Next if:', typing);

      if (typing.mustBeTruthy || ['object', 'array', 'function', 'class', 'regex'].includes(typing.mustBeType)) {
        vlog('The if-test has an ident that must be a truthy value. Eliminating the else branch.');
        rule('If test that must be truthy means the else branch must be dropped');
        example('let x = 1; if (x) f(); else g();', 'let x = 1; f();');
        before(node);

        ASSERT(node.consequent.type === 'BlockStatement');
        body.splice(index, 1, ...node.consequent.body);

        ++deduced;
        after(node.consequent);
        return;
      }

      if (typing.mustBeFalsy || ['undefined', 'null'].includes(typing.mustBeType)) {
        vlog('The if-test has an ident that must be a false value. Eliminating the if branch.');
        rule('If test that must be falsy means the else branch must be dropped');
        example('let x = 0; if (x) f(); else g();', 'let x = 0; g();');
        before(node);

        ASSERT(node.alternate.type === 'BlockStatement');
        body.splice(index, 1, ...node.alternate.body);

        after(node.consequent);
        ++deduced;
        return;
      }

      if (typing.mustBeType === 'boolean') {
        // If this code is normalized then this if should not appear inside a loop but as a function toplevel.
        // There should not be a tail (code following this if)
        // As such we should be able to safely rename all occurrences of this binding name inside one branch
        // to a fresh constant that we initialize to true or false, depending on the branch.
        // Since it's a constant, it should not be possible to change this value regardless.
        // To prevent infinite rewrites, for each branch, check whether the test ident actually occurs in at
        // that branch before creating a clone for it.

        let printedRule = false;

        const originalName = meta.uniqueName;
        ASSERT(node.test.name === originalName);

        let foundInIf = false;
        let tmpNameTrue; // Lazy set
        walk((node, beforeWalk, nodeType, path) => {
          if (!beforeWalk && node.type === 'Identifier' && node.name === originalName) {
            const parentNode = path.nodes[path.nodes.length - 2];
            const parentProp = path.props[path.props.length - 1];
            const kind = getIdentUsageKind(parentNode, parentProp);
            ASSERT(kind !== 'write' && kind !== 'readwrite');
            if (kind === 'read') {
              if (!printedRule) {
                rule('An if-test on bool means we know the value inside both branches');
                example('const x = a === b; if (x) { f(x); } else { g(x); }', 'const x = a === b; if (x) { f(true); } else { g(false); }');
                before(node);
                printedRule = true;
              }
              if (!foundInIf) {
                tmpNameTrue = createFreshVar('tmpIfReduceTrue', fdata);
              }
              node.name = tmpNameTrue;
              foundInIf = true;
            }
          }
        }, node.consequent);
        if (foundInIf) {
          node.consequent.body.unshift(AST.variableDeclaration(tmpNameTrue, AST.tru(), 'const'));
        }

        let foundInElse = false;
        let tmpNameFalse;
        walk((node, beforeWalk, nodeType, path) => {
          if (!beforeWalk && node.type === 'Identifier' && node.name === originalName) {
            const parentNode = path.nodes[path.nodes.length - 2];
            const parentProp = path.props[path.props.length - 1];
            const kind = getIdentUsageKind(parentNode, parentProp);
            ASSERT(kind !== 'write' && kind !== 'readwrite');
            if (kind === 'read') {
              if (!printedRule) {
                rule('An if-test on bool means we know the value inside both branches');
                example('const x = a === b; if (x) { f(x); } else { g(x); }', 'const x = a === b; if (x) { f(true); } else { g(false); }');
                before(node);
                printedRule = true;
              }
              if (!foundInElse) {
                tmpNameFalse = createFreshVar('tmpIfReduceFalse', fdata);
              }
              node.name = tmpNameFalse;
              foundInElse = true;
            }
          }
        }, node.alternate);
        if (foundInElse) {
          node.alternate.body.unshift(AST.variableDeclaration(tmpNameFalse, AST.fals(), 'const'));
        }

        if (foundInIf || foundInElse) {
          ++deduced;
          after(node);
        }
        return;
      }

      if (typing.mustBeType === 'number') {
        // Note: This is not about the AST node! But the actual value. So it may also be NaN, Infinity, or negative.
        //       That means the alternate branch does not necessarily mean the value is a zero.
        // Skip for now... We need to remind ourselves whether or not this was a literal and/or negative number.
        return;
      }

      if (typing.mustBeType === 'string') {
        // The alternate branch must be the empty string

        let printedRule = false;

        const originalName = meta.uniqueName;
        ASSERT(node.test.name === originalName);

        let foundInElse = false;
        let tmpNameFalse;
        walk((node, beforeWalk, nodeType, path) => {
          if (!beforeWalk && node.type === 'Identifier' && node.name === originalName) {
            const parentNode = path.nodes[path.nodes.length - 2];
            const parentProp = path.props[path.props.length - 1];
            const kind = getIdentUsageKind(parentNode, parentProp);
            ASSERT(kind !== 'write' && kind !== 'readwrite');
            if (kind === 'read') {
              if (!printedRule) {
                rule('An if-test on string means we know the value inside the else branche');
                example('const x = str(); if (x) { f(x); } else { g(x); }', 'const x = str(); if (x) { f(x); } else { g(""); }');
                before(node);
                printedRule = true;
              }
              if (!foundInElse) {
                tmpNameFalse = createFreshVar('tmpIfReduceStr', fdata);
              }
              node.name = tmpNameFalse;
              foundInElse = true;
            }
          }
        }, node.alternate);
        if (foundInElse) {
          node.alternate.body.unshift(AST.variableDeclaration(tmpNameFalse, AST.literal(''), 'const'));
        }

        if (foundInElse) {
          ++deduced;
          after(node);
        }
        return;
      }

      // Nothing to do here.
    });
    vgroupEnd();

    if (deduced) {
      log('Deduced idents:', deduced, '. Restarting from phase1');
      return 'phase1';
    }
  }

  log('Deduced idents: 0.');
}
