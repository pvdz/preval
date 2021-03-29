import walk from '../../lib/walk.mjs';
import { ALIAS_PREFIX } from '../constants.mjs';
import {
  ASSERT,
  log,
  group,
  groupEnd,
  vlog,
  vgroup,
  vgroupEnd,
  tmat,
  fmat,
  rule,
  example,
  before,
  source,
  after,
  findBodyOffset,
} from '../utils.mjs';
import * as AST from '../ast.mjs';
import { getIdentUsageKind } from '../bindings.mjs';

export function funcScopePromo(fdata) {
  group('\n\n\nPromoting functions to an upper scope when possible\n');
  const r = _funcScopePromo(fdata);
  groupEnd();
  return r;
}
function _funcScopePromo(fdata) {
  const ast = fdata.tenkoOutput.ast;

  let toMove = [];
  let changed = false;
  do {
    changed = false;
    fdata.globallyUniqueNamingRegistry.forEach(function (meta, name) {
      if (meta.isBuiltin) return;
      if (meta.isImplicitGlobal) return;

      if (meta.bfuncNode.type === 'Program') return; // Already global

      vgroup('-', meta.uniqueName, ', constant?', meta.isConstant, ', constValueRef?', meta.constValueRef?.node.type);

      const funcNode = meta.constValueRef?.node;
      if (funcNode?.type !== 'FunctionExpression') {
        vlog('Not a function');
        vgroupEnd();
        return;
      }
      vlog('Func pid is', funcNode.$p.pid, '(body pid is', funcNode.body.$p.pid, ', blockchain is', funcNode.$p.blockChain, ')');

      // What's cheaper? Always tracking the referenced idents in phase1 (regardless of whether it's used) and having
      // to maintain these references if we change something in this step? Or doing a quick walk through the function
      // (and any nested functions...) to find all referenced idents? The walk is expensive but having to either fix
      // up the collection, well or re-running phase1 for the same reason, is also expensive.
      let stopNow = false;

      const nestedFuncPids = new Set([ast.$p.pid, funcNode.$p.pid]);
      walk(_walker, funcNode, 'body');
      function _walker(node, before, nodeType, path) {
        // Visit a function. Find all nested functions and collect them. Find all identifiers
        // which are bindings and check which function scope owns them. If the function is not
        // the target function, not global, and not a nested function, then this function can
        // not be moved to global for now. (TODO: support partial promotions, slightly trickier)
        if (stopNow) return true;
        const key = nodeType + ':' + (before ? 'before' : 'after');
        switch (key) {
          case 'FunctionExpression:before': {
            nestedFuncPids.add(node.$p.pid);
            break;
          }
          case 'Identifier:before': {
            const name = node.name;
            if (name !== 'arguments') {
              const parentNode = path.nodes[path.nodes.length - 2];
              const parentProp = path.props[path.props.length - 1];
              const kind = getIdentUsageKind(parentNode, parentProp);
              if (kind === 'read' || kind === 'write') {
                // Make sure the binding is either global, local, or nested local. But not bound in a non-global parent scope.
                const meta = fdata.globallyUniqueNamingRegistry.get(name);
                if (meta.isBuiltin || meta.isImplicitGlobal) {
                  // Not blocking the promotion
                } else if (nestedFuncPids.has(meta.bfuncNode.$p.pid)) {
                  // This is a binding that either global, or local to the current function or a nested function. That's fine.
                } else {
                  // Not global, not local, not nested local, this is a closure reference. Stop for now.
                  stopNow = true;
                }
              }
            }
            break;
          }
        }
      }

      // If this function referenced an ident that was not local, not global, and not local to a nested function, then
      // we currently won't bother to promote it to global. TODO: later we may want to promote a func even one level.
      if (stopNow) return;

      vlog('The function appears to be safe to promote to global. Removing it from AST and queueing it for promotion.');
      // Queue the func node to be promoted. Don't change anything yet.
      // Replace the func node with an empty statement but we will use the body as is. This way we can prevent a phase1 pass.

      ASSERT(
        meta.writes.length === 1 && meta.writes[0].blockBody[meta.writes[0].blockIndex].type === 'VariableDeclaration',
        'this is a const func so the first write must be a var decl and it must not be stale',
      );

      toMove.push(meta.writes[0].blockBody[meta.writes[0].blockIndex]);
      meta.writes[0].blockBody[meta.writes[0].blockIndex] = AST.emptyStatement();

      // Update its parent node to reflect global
      meta.bfuncNode = ast;

      vgroupEnd();
    });
    // When a function gets eliminated it's very possible that another function can now be promoted as well
  } while (changed);

  if (toMove.length) {
    ast.body.unshift(...toMove);

    //vlog('\nCurrent state\n--------------\n' + fmat(tmat(fdata.tenkoOutput.ast)) + '\n--------------\n');

    log('Promoted to global:', toMove.length, '. Restarting from phase1 to fix up read/write registry');

    return 'phase1';
  }
  log('Promoted to global: 0.');
}
