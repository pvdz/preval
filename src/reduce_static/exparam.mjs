// Detect excessive params that we can safely drop
//
//          function f(a, b, c) { g(a, b); } f(1, 2, 3)
// ->
//          function f(a, b) { g(a, b); } f(1, 2)

import { ASSERT, log, group, groupEnd, vlog, vgroup, vgroupEnd, rule, example, before, source, after } from '../utils.mjs';
import * as AST from '../ast.mjs';

export function pruneExcessiveParams(fdata) {
  group('\n\n\n[pruneExcessiveParams] Pruning excessive params and args\n');
  const r = _pruneExcessiveParams(fdata);
  groupEnd();
  return r;
}
function _pruneExcessiveParams(fdata) {
  const queue = [];
  let deletedParams = 0;
  let deletedArgs = 0;

  fdata.globallyUniqueNamingRegistry.forEach((meta, name) => {
    if (meta.isImplicitGlobal) return;
    if (meta.isBuiltin) return;
    if (!meta.isConstant) return;

    vlog(
      '- `' + name + '`:',
      meta.varDeclRef.node.type,
      'reads args?',
      meta.varDeclRef.node.$p.readsArgumentsLen,
      meta.varDeclRef.node.$p.readsArgumentsAny,
    );

    const funcNode = meta.varDeclRef.node;
    if (funcNode?.type !== 'FunctionExpression') {
      vlog('  - not a function');
      return;
    }

    if (meta.writes.length !== 1) {
      vlog('This constant has multiple writes. Need to eliminate those runtime errors first.');
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
      ASSERT(params);
      let argsPrefixed = false; // Only do this once. We do it to preserve TDZ logic.
      params.some((pnode, pi) => {
        vlog(
          '    - checking param',
          pi,
          ': `' +
            (pnode.name ?? pnode.argument.name) +
            '`' +
            (pnode.$p.paramVarDeclRef ? ' (`' + pnode.$p.paramVarDeclRef.name + '`)' : '(unused)'),
        );
        ASSERT(pnode.type === 'Param');
        // If this param has no reads then for all calls to the function, eliminate that index
        // Stop at rest parameters
        if (pnode.rest) {
          vlog('      - is rest param');
          // Stop.
          return true;
        }
        vlog('      - not rest param');

        if (pnode.$p.paramVarDeclRef) {
          vlog('Parameter has a reference so it is used');
          // This assert doesn't appear to hold when running the react code, at least
          //ASSERT(
          //  fdata.globallyUniqueNamingRegistry.get(pnode.$p.paramVarDeclRef.name).reads.length > 0,
          //  'a param that is used must have at least one read, can not have only writes (another step would eliminate that)',
          //);
          return;
        }

        // If the parameter value is not actually used...
        vlog(
          '      - Parameter',
          pi,
          'of function `' +
            name +
            '` is unused and all usages of the function are calls. Now queueing this index to be dropped from all call args.',
        );

        ++deletedParams;
        queue.push({
          pi,
          index: funcNode.$p.npid,
          func: () => {
            vgroup('Eliminating param', pi);
            rule('When a trailing parameter is not used or observed it can be removed from the function');
            example('function f(a, b, c) { g(a, b); } f(1, 2, 3)', 'function f(a, b) { g(a, b); } f(1, 2, 3)');
            before(funcNode);

            vlog('Eliminating param index', pi, ', have', funcNode.params.length, 'params');
            funcNode.params.splice(pi, 1);
            for (let i=pi; i<funcNode.params.length; ++i) {
              const was = funcNode.params[i].name;
              vlog('- Renaming later param', was, 'to', '$$' + i);
              funcNode.params[i].name = '$$' + i;

              let index = 0;
              while (funcNode.body.body[index].type !== 'DebuggerStatement') {
                const node = funcNode.body.body[index];
                vlog('  - Found:', node.init?.name, ', looking for', was)
                if (node.type === 'VarStatement' && node.init.name === was) {
                  vlog('    - Renaming', node.init.name, 'to', '$$' + i);
                  node.init.name = '$$' + i;
                  break;
                }
                ++index;
              }
            }

            after(funcNode);
            vgroupEnd();
          }
        });

        // Should the args for all calls be prefixed or was that already done this cycle?
        const prefixNow = !argsPrefixed;
        argsPrefixed = true;
        // We asserted above that all these nodes are calls
        meta.reads.forEach((read) => {
          ++deletedArgs;
          queue.push({
            pi,
            index: read.blockIndex,
            func: () => {
              vgroup('Eliminating call arg', pi);
              rule('When dropping unused params from a function, calls to that function should remove the parameter too');
              example('function f(a, b, c) { g(a, b); } f(1, 2, 3)', 'function f(a, b) { g(a, b); } { 1; 2; 3; } f(1, 2)');
              before(read.blockBody[read.blockIndex]);

              const callNode = read.parentNode;

              if (prefixNow) {
                // Inject them as a set of ident-statements (or whatever) and
                // wrap them in a block so I don't have to spread the list
                const prefixNodes =
                  callNode.arguments
                  .filter(anode => !AST.isPrimitive(anode))
                  .map(anode => AST.expressionStatement(AST.cloneSimple(anode.type === 'SpreadElement' ? anode.argument : anode)));
                vlog('Also injecting call args as statements (to preserve TDZ)');
                read.blockBody.splice(
                  read.blockIndex, 0,
                  // Not a fan of this. Many args could kind of blow this up. Although in real programs that shouldn't cause a problem here.
                  // In faked input code, maybe... Problems for another time?
                  ...prefixNodes
                );
              }

              callNode.arguments.splice(pi, 1);

              after(read.blockBody.slice(read.blockIndex, read.blockIndex + callNode.arguments.length + 1));
              vgroupEnd();
            }
          })
        });
      });
    }
  });

  if (queue.length) {
    queue.sort(({ pi: a, index: A }, { pi: b, index: B }) => b-a || B-A);
    queue.forEach(({ func }) => func());

    log('Deleted params:', deletedParams, ', deleted args:', deletedArgs, '. Restarting from normalization');
    return {what: 'pruneExcessiveParams', changes: deletedParams, next: 'normal'};
  }

  log('Deleted params: 0.');
}
