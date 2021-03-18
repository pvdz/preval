import { ASSERT, log, group, groupEnd, vlog, vgroup, vgroupEnd, rule, example, before, source, after } from '../utils.mjs';
import * as AST from '../ast.mjs';

export function pruneExcessiveParams(fdata) {
  group('\n\n\nPruning excessive params and args\n');
  const r = _pruneExcessiveParams(fdata);
  groupEnd();
  return r;
}
function _pruneExcessiveParams(fdata) {
  const indexDeleteQueue = []; // Array<array, index-to-delete>. Should be in ascending source-code order.
  const assignFoldQueue = []; // Array<write.assign>. Expecting to replace assign.parentNode[prop][index] with its own .right
  fdata.globallyUniqueNamingRegistry.forEach((meta, name) => {
    if (meta.isImplicitGlobal) return;
    if (meta.isBuiltin) return;

    vlog(
      '- `' + name + '`, has constValueRef?',
      !!meta.constValueRef,
      meta.constValueRef?.node?.type,
      'reads args?',
      meta.constValueRef?.node?.$p?.readsArgumentsLen,
      meta.constValueRef?.node?.$p?.readsArgumentsAny,
    );

    const funcNode = meta.constValueRef?.node;
    if (funcNode?.type !== 'FunctionExpression') {
      vlog('  - not a function');
      return;
    }
    if (funcNode.$p.readsArgumentsLen || funcNode.$p.readsArgumentsAny) {
      // If the function reads `arguments` then we won't bother messing with unused parameters at all.
      vlog('  - reads `arguments` so we ignore it');
      return;
    }

    vlog('  - is a function that does not read `arguments`');
    // Okay, this was a constant that was a function. Assert that all usages are actually calls.
    // If there's a read that is not a call then the function may "go rogue" and we ignore it here.
    // If any call uses spread then we cannot analyze any param in that index or later safely.
    // (For now let's just bail entirely?)
    ASSERT(meta.writes.length === 1);
    if (
      meta.reads.every((read) => {
        const callNode = read.parentNode;
        vlog('    - read:', callNode.type);
        if (callNode.type !== 'CallExpression') return false;
        vlog('    - calls:', callNode.callee.name, 'with', callNode['arguments'].length, 'args');
        if (callNode.callee.type !== 'Identifier') return false;
        if (callNode.callee.name !== name) return false;
        if (callNode['arguments'].some((pnode) => pnode.type === 'SpreadElement')) return false; // TODO: we could analyze params up to this index...
        // Ok so this is a call to the function and it does not spread an arg
        return true;
      })
    ) {
      vlog('  - passes usage tests');
      // So this is a constant function that is only called, never passed through or read props on etc
      // We already checked that `arguments` is not accessed
      // - func.length is not accessed so we could drop a bunch of parameters, however
      // - Dropping an unused param is not interesting if we can't drop anything else
      // - For any unused param, we can delete the param at that index and the arg on that index from all calls
      //   Exceptions:
      //   - We cannot do this if any call uses a spread arg (none do, we checked)
      //   - We cannot process args from a RestElement onward
      //   - We cannot do this if the func accesses `arguments` (it does not)
      const params = funcNode.params;
      //const restAt = params.findIndex((n) => n.type === 'RestElement');
      ASSERT(params);
      params.some((pnode, pi) => {
        vlog('    - checking param', pi, ': `' + (pnode.name ?? pnode.argument.name) + '`');
        ASSERT(pnode.type === 'Identifier' || (pnode.type === 'RestElement' && pnode.argument.type === 'Identifier'));
        // If this param has no reads then for all calls to the function, eliminate that index
        // Stop at rest parameters
        if (pnode.type === 'RestElement') {
          vlog('      - is rest param');
          // Stop.
          return true;
        }
        vlog('      - not rest param');

        ASSERT(pnode.type === 'Identifier');
        const pmeta = fdata.globallyUniqueNamingRegistry.get(pnode.name);
        vlog('      - This param has', pmeta.reads.length, 'reads and', pmeta.writes.length, 'writes');
        if (pmeta.reads.length === 0) {
          // If the parameter value is not actually used...
          vlog(
            '      - Parameter',
            pi,
            'of function',
            name,
            'is unused and all usages of the function are calls. Now queueing this index to be dropped from all call args.',
          );

          indexDeleteQueue.push([params, pi]);

          if (pmeta.writes.length > 1) {
            vlog('      - parameter has multiple writes. Queuing them for deletion.');
            // Replace other assignments with expression statements of the .right
            // This should not have the potential to break references relevant to this sub-step
            for (let i = 1; i < pmeta.writes.length; ++i) {
              log('Queueing a write for deletion');
              const write = pmeta.writes[i];
              assignFoldQueue.push(write.assign);
            }
          }

          // We asserted above that all these nodes are calls
          vlog('      - Walking the param reads');
          meta.reads.forEach((read) => {
            vlog('      - dropping call arg from read');
            const callNode = read.parentNode;
            // Since we're normalized, all args should already be simple nodes. We should be
            // able to drop them without the need to outline them first. Does ruin the meta registry.
            // Queue the deletion. By unwinding the queue in reverse order we won't screw up
            // indexing. It should not be possible to queue deletion for the same param/arg twice.
            indexDeleteQueue.push([callNode['arguments'], pi]);
            //if (restAt < 0) {
            //  if (callNode['arguments'].length > funcNode.params.length) {
            //    callNode['arguments'].length = funcNode.params.length;
            //  } else if (callNode['arguments'].length < funcNode.params.length) {
            //    // Append `undefined` for each missing element. I think?
            //    // TODO
            //  }
            //}
          });
        }
      });
    }
  });
  // Delete the unused params/args now. The index queue should be unwound in reverse order. Doesn't matter otherwise.
  if (indexDeleteQueue.length || assignFoldQueue.length) {
    vlog('Dropping', indexDeleteQueue.length, 'params and args and', assignFoldQueue.length, 'redundant writes');
    assignFoldQueue.forEach(({ assignParent, assignProp, assignIndex, ...rest }) => {
      if (assignIndex >= 0) {
        before(assignParent[assignProp][assignIndex]);
        ASSERT(
          assignParent[assignProp][assignIndex].type === 'ExpressionStatement',
          'after normalization, at this point, this should all be about expression statements that are assignments',
        );
        assignParent[assignProp][assignIndex] = AST.expressionStatement(assignParent[assignProp][assignIndex].expression.right);
        after(assignParent[assignProp][assignIndex]);
      } else {
        before(assignParent[assignProp]);
        ASSERT(
          assignParent[assignProp].type === 'ExpressionStatement',
          'after normalization, at this point, this should all be about expression statements that are assignments',
        );
        assignParent[assignProp] = AST.expressionStatement(assignParent[assignProp].expression.right);
        after(assignParent[assignProp]);
      }
    });
    indexDeleteQueue.reverse().forEach(([arr, index]) => {
      arr.splice(index, 1);
    });
    log('Dropped', indexDeleteQueue.length, 'indexes and folded', assignFoldQueue.length, 'assigns, so restarting phase1');
    return 'phase1';
  }
}
