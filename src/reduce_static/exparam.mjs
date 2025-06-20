// Detect excessive params that we can safely drop
//
//          function f(a, b, c) { g(a, b); } f(1, 2, 3)
// ->
//          function f(a, b) { g(a, b); } f(1, 2)

import { ASSERT, log, group, groupEnd, vlog, vgroup, vgroupEnd, rule, example, before, source, after, currentState, } from '../utils.mjs';
import * as AST from '../ast.mjs';
import { SYMBOL_DOTCALL, SYMBOL_FRFR } from '../symbols_preval.mjs';

export function pruneExcessiveParams(fdata) {
  group('\n\n\n[pruneExcessiveParams] Pruning excessive params and args\n');
  // currentState(fdata, 'pruneExcessiveParams', true, fdata);
  const r = _pruneExcessiveParams(fdata);
  groupEnd();
  return r;
}
function _pruneExcessiveParams(fdata) {
  const queue = [];
  const queue2 = []; // squash temp blocks
  let deletedParams = 0;
  let deletedArgs = 0;

  fdata.globallyUniqueNamingRegistry.forEach((meta, name) => {
    if (!meta.isConstant) return;
    if (meta.writes.length !== 1) return;
    if (!meta.reads.length) return;
    if (meta.varDeclRef.node.type !== 'FunctionExpression') return;

    vlog(
      '- `' + name + '`:',
      meta.varDeclRef.node.type,
      'reads args?',
      meta.varDeclRef.node.$p.readsArgumentsLen,
      meta.varDeclRef.node.$p.readsArgumentsAny,
    );

    const funcNode = meta.varDeclRef.node;

    if (funcNode.$p.readsArgumentsLen || funcNode.$p.readsArgumentsAny) {
      // If the function reads `arguments` then we won't bother messing with unused parameters at all.
      return vlog('  - reads `arguments` so we ignore it');
    }
    if (funcNode.params.some(param => param.rest)) return vlog('  - bail: at least one func param was a rest'); // the last one but ok

    vlog('  - is a function that does not read `arguments`');
    // Okay, this was a constant that was a function. Assert that all usages are actually calls and that we control the args.
    // If there's a read that is not a call then the function may "go rogue" and we ignore it here.
    // If any call uses spread then we cannot analyze any param in that index or later safely.
    // (For now let's just bail entirely?)
    if (
      !meta.reads.every((read) => {
        const callNode = read.parentNode;
        vlog('    - read:', callNode.type);
        if (callNode.type !== 'CallExpression') return false;
        vlog('    - calls:', callNode.callee.name, 'with', callNode['arguments'].length, 'args');
        // Either regular call, dotcall, or frfr?
        if (callNode.callee.type !== 'Identifier') return false;
        // We must control the call args so we can only consider when the function is a callee in all cases
        if (!(
          callNode.callee.name === name ||
          (callNode.callee.name === SYMBOL_DOTCALL && read.parentIndex === 0) ||
          (callNode.callee.name === SYMBOL_FRFR && read.parentIndex === 0)
        )) return false;
        if (callNode['arguments'].some((pnode) => pnode.type === 'SpreadElement')) return false; // TODO: we could analyze params up to this index...
        // Ok so this is a call or dotcall or frfr to the function and it does not spread an arg
        return true;
      })
    ) {
      vlog('  - bail: at least one read was not callee');
      return;
    }

    vlog('  - ok; passes usage tests');

    // So this is a constant function that is only called, never passed through or read props on etc
    // We already checked that `arguments` is not accessed
    // - func.length is not accessed so we could drop a bunch of parameters, however
    // - Dropping an unused param is not interesting if we can't drop anything else
    // - For any unused param, we can delete the param at that index and the arg on that index from all calls
    //   Exceptions:
    //   - We cannot do this if any call uses a spread arg (none do, we checked)
    //   - We cannot process args from a RestElement onward (func has no rest, we checked)
    //   - We cannot do this if the func accesses `arguments` (it does not)
    const params = funcNode.params;
    ASSERT(params);
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
      ASSERT(!pnode.rest, 'checked above');

      // If this param has no reads then for all calls to the function, eliminate that index

      if (pnode.$p.paramVarDeclRef) return vlog('Parameter has a reference so it is used'); // unused constant reducer would clean it up otherwise

      // If the parameter value is not actually used...
      vlog(
        '      - Parameter',
        pi,
        'of function `' +
          name +
          '` is unused and all usages of the function are calls. Now queueing this index to be dropped from all call args.',
      );


      rule('When a function does not use a param, arguments, and all calls are known, we can drop the param');
      example('function f(a, b, c) { $(a, c); } f(1, 2, 3);', 'function f(a, c) { $(a, c); } f(1, 3);');
      example('function f(a, b, c) { $(a, c); } $dotCall(func, ctx, "x", x, y, z);', 'function f(a, c) { $(a, c); } $dotCall(func, ctx, "x", x, z);');
      example('function f(a, b, c) { $(a, c); } $frfr(f, 1, 2, 3);', 'function f(a, c) { $(a, c); } $frfr(f, 1, 3);');
      vlog('Queueing individual pieces to transform...');

      const newMaxParamCount = funcNode.params.length - 1; // Multiple queued callbacks may undercut but that's fine

      ++deletedParams;
      vlog('- queued func itself to update');
      queue.push({
        pi,
        index: 0, // function processing order is not relevant
        func: () => {
          vgroup('Eliminating PARAM at param index', pi, ', block index:', meta.varDeclRef?.varDeclIndex);
          rule('When a parameter is not used or observed it can be removed from the function');
          example('function f(a, b, c) { g(a, c); } f(1, 2, 3)', 'function f(a, c) { g(a, c); } f(1, 2, 3)');
          before(funcNode);

          vlog('Eliminating param index', pi, ', have', funcNode.params.length, 'params');
          funcNode.params.splice(pi, 1);
          funcNode.$p.paramNames.splice(pi, 1);
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

      // We asserted above that all these nodes are calls
      meta.reads.forEach((read) => {
        // Check dotcall/frfr too
        source(read.blockBody[read.blockIndex], true);
        let isDotcall = false;
        let isFrfr = false;
        if (read.parentProp === 'callee') {}
        else if (read.parentNode.callee.type === 'Identifier' && read.parentNode.callee.name === SYMBOL_FRFR && read.parentIndex === 0) {
          isFrfr = true;
        }
        else if (read.parentNode.callee.type === 'Identifier' && read.parentNode.callee.name === SYMBOL_DOTCALL && read.parentIndex === 0) {
          isDotcall = true;
        }
        else return vlog('- skip read: it is not a callee here, which is fine');

        ++deletedArgs;
        vlog('- queued call to update');
        queue.push({
          pi, // we need this: when processing the same func, the same call must be processed multiple times too, but we should eliminate args back to front.
          index: read.blockIndex,
          func: () => {
            vgroup('Eliminating CALL arg for param index', pi, ', block index:', read.blockIndex);
            rule('When dropping unused params from a function, calls to that function should remove the parameter too');
            example('function f(a, c) { g(a, c); } f(1, 2, 3)', 'function f(a, c) { g(a, c); } { const t1 = 1; const t2 = 2; const t3 = 3; } f(t1, t3)');
            before(read.blockBody[read.blockIndex]);

            const callNode = read.parentNode;
            const targetArgIndex =
              isDotcall
              // dotcall adds 3 arguments for itself so target index moves by 3
              ? 3 + pi
              : isFrfr
              // frfr adds 1 argument for itself so target index moves by 1
              ? 1 + pi
              : pi;

            // Inject them as a set of ident-statements (or whatever) and
            // wrap them in a block so I don't have to spread the list
            const prefixNodes =
              callNode.arguments
              .filter(anode => !AST.isPrimitive(anode))
              .map(anode => AST.expressionStatement(AST.cloneSimple(anode.type === 'SpreadElement' ? anode.argument : anode)));

            // One call may be processed multiple times (same func dropping two params etc).
            // To prevent outlining multiple times we store this outline in a block. Next visits will recognize it and skip the outline.

            if (read.blockBody[read.blockIndex].type !== 'BlockStatement') {
              vlog('Also injecting call args as statements (to preserve TDZ)');
              // Store in a block to indicate this call has been outlined
              read.blockBody[read.blockIndex] = AST.blockStatement(
                read.blockBody[read.blockIndex],
                // Not a fan of this. Many args could kind of blow this up. Although in real programs that shouldn't cause a problem here.
                // In faked input code, maybe... Problems for another time?
                ...prefixNodes
              );
              // Then squash in the end.
              queue2.push({index: read.blockIndex, func: () => read.blockBody.splice(read.blockIndex, 1, ...read.blockBody[read.blockIndex].body)});
            } else {
              vlog('Already outlined the call args for this call this iteration, skipping this step');
            }

            callNode.arguments.splice(targetArgIndex, 1);
            if (callNode.arguments.length > newMaxParamCount) {
              vlog('Culling the arg list to not pass more args than there are params. there should not be any spreads/rest/arguments access so this is safe?', callNode.arguments.length, newMaxParamCount);
              callNode.arguments.length = (isDotcall ? 3 : 0) + (isFrfr ? 1 : 0) + newMaxParamCount;
            }

            after(read.blockBody[read.blockIndex]);
            vgroupEnd();
          }
        })
      });
    });
  });

  if (queue.length) {
    queue.sort(({ pi: A, index: a }, { pi: B, index: b }) => B-A || b-a);
    queue.forEach(({ func }) => func());
    queue2.sort(({ index: a }, { index: b }) => b-a);
    queue2.forEach(({ func }) => func());

    log('Deleted params:', deletedParams, ', deleted args:', deletedArgs, '. Restarting from normalization (fixup param magic)');
    return {what: 'pruneExcessiveParams', changes: deletedParams, next: 'normal'};
  }

  log('Deleted params: 0.');
}
