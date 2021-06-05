// Find array literals with spreads that where we can predict the array value safely

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

export function arrSpreads(fdata) {
  group('\n\n\nChecking for array spreads');
  const ast = fdata.tenkoOutput.ast;
  //vlog('\nCurrent state\n--------------\n' + fmat(tmat(fdata.tenkoOutput.ast)) + '\n--------------\n');
  const r = _arrSpreads(fdata);
  groupEnd();
  return r;
}
function _arrSpreads(fdata) {
  // Find arrays with a spread and see if the spread arg resolves to an array.
  // Then check if we can guarantee the array contents. This is the tricky part since
  // almost any kind of read could potentially mutate the array.
  // However, I feel it's safe to assume that numbered property access on the array
  // is safe, as well as reading the .length. Assignments to properties are not safe.
  // Although we could probably make a few small steps to support certain cases.

  const ast = fdata.tenkoOutput.ast;

  const queueInlines = [];
  const queueInjects = [];

  walk(_walker, ast, 'ast');
  function _walker(node, beforeWalk, nodeType, path) {
    if (beforeWalk) return;

    if (node.type !== 'ArrayExpression') return;

    for (let i = node.elements.length - 1; i >= 0; --i) {
      const enode = node.elements[i];
      if (enode && enode.type === 'SpreadElement') {
        // Now figure out whether the arg is an array (note that it is normalized code so this
        // can only be the case if the node is an identifier for a binding that must be an array).
        if (enode.argument.type === 'Identifier') {
          const meta = fdata.globallyUniqueNamingRegistry.get(enode.argument.name);
          if (meta.isBuiltin) continue;
          if (meta.isImplicitGlobal) continue;
          if (!meta.isConstant) continue; // We can improve on this
          if (meta.isExport) continue; // Exports are "live" bindings so any update to it might be observable in strange ways
          if (meta.constValueRef.containerNode.type !== 'VariableDeclaration') continue; // catch, for-x, ???
          if (meta.constValueRef.node.type !== 'ArrayExpression') return;
          if (meta.writes.length > 1) return; // TODO: fixme if broken

          const write = meta.writes[0];
          ASSERT(write.kind === 'var');

          vlog('Found an array being spread into another array...');

          const arrNodeSpreadedInto = node;
          const arrNodeBeingSpreaded = meta.constValueRef.node;

          if (arrNodeBeingSpreaded.elements.some((enode) => enode?.type === 'SpreadElement')) {
            vlog('Can not spread an array contains another spread');
            continue;
          }

          if (
            meta.reads.some((read) => {
              // Should not escape
              if (read.parentNode.type === 'SpreadElement') {
                // Whether this one or another doesn't matter. We assume the iterator of an array literal to not mutate the array.
                return false;
              }
              if (read.parentNode.type !== 'MemberExpression' || read.parentProp !== 'object') {
                vlog('At least one read was not a member expression; the array is "escaping"');
                return true;
              }
              // Should not be a write (`arr[x] = 5`). In normalized code, this is the only valid assign.
              if (read.grandNode.type === 'AssignmentExpression' && read.grandProp === 'left') {
                vlog('The array had at least one property assignment');
                return true;
              }
              // Should not have a method called on it (`arr.splice(0, 10)`)
              ASSERT(read.grandProp !== 'arguments', 'because this is normalized and a member expression, it cannot be an arg node');
              if (read.grandProp === 'callee') {
                vlog('The array had at least one method call');
                return true;
              }
              // Okay so this array can not have been mutated since creating it?
              return false;
            })
          ) {
            continue;
          }

          vlog('This should be an array spread of an array expression that is not mutated...');
          vlog('Queued up spread inlining');

          queueInlines.push({
            offset: i,
            func: (spreadOffset) => {
              vlog('- Next offset:', spreadOffset);
              rule('An array expression which gets an array expression spread can be folded up');
              example('const a = [1, 2, 3]; const b = [10, ...a, 20]; f(b);', 'const b = [10, 1, 2, 3, 20]; f(b);');
              before(arrNodeBeingSpreaded);
              before(arrNodeSpreadedInto);

              // Any ident needs to be cached (if they're lets, they might be changed. And otherwise it will be cleaned up)
              const tmpVarNodes = [];
              const newElements = arrNodeBeingSpreaded.elements.map((enode) => {
                if (enode === null) {
                  // The holes get plugged. (`[1, [,,2], 3]` -> `[1, undefined, undefined, 2, 3]`)
                  return AST.identifier('undefined');
                }
                if (enode.type === 'Identifier') {
                  // Cache this
                  const tmpName = createFreshVar('arrEl', fdata);
                  const varNode = AST.variableDeclaration(tmpName, AST.cloneSimple(enode), 'const');
                  tmpVarNodes.push(varNode);
                  const finalNode = AST.identifier(tmpName);

                  return finalNode;
                } else {
                  // Clone this simple node (literal or whatever)
                  const finalNode = AST.cloneSimple(enode);

                  return finalNode;
                }
              });

              arrNodeSpreadedInto.elements.splice(spreadOffset, 1, ...newElements);
              // The parent array of  is either a statement, assignment, or var init
              // Inject the var decls before this node
              queueInjects.push({
                pid: meta.constValueRef.node.$p.pid,
                func: (pid) => {
                  vlog('- Next pid:', pid);
                  write.blockBody.splice(write.blockIndex, 0, ...tmpVarNodes);
                },
              });

              after(write.blockBody);
            },
          });
        }
      }
    }
  }

  if (queueInlines.length) {
    vlog('Running', queueInlines.length, 'inliners now');
    // If one arr has multiple spreads, they should be injected back to front to prevent index problems
    // Element order is irrelevant, it's all about the index.
    queueInlines.sort(({ offset: a }, { offset: b }) => b - a);
    queueInlines.forEach(({ offset, func }) => func(offset));
    vlog('Injecting', queueInjects.length, 'new vars');
    // The above should not change block index order so ref.blockIndex should not be stale yet.
    queueInjects.sort(({ pid: a }, { pid: b }) => +b - a);
    queueInjects.forEach(({ pid, func }) => func(pid));

    log('Arr-in-arr spreads inlined:', queueInlines.length, '. Restarting from phase1 to fix up read/write registry');
    return 'phase1';
  }

  log('Arr-in-arr spreads inlined:', 0, '.');
}
