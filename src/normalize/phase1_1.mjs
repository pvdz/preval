import walk from '../../lib/walk.mjs';
import * as AST from '../ast.mjs';
import { VERBOSE_TRACING, RED, BLUE, DIM, RESET, setVerboseTracing } from '../constants.mjs';
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
  source,
  REF_TRACK_TRACING,
  assertNoDupeNodes,
} from '../utils.mjs';

// This phase walks the AST a few times to discover things for which it needs phase1 to complete
// Currently it discovers call args (for which it needs the meta.typing data)

export function phase1_1(fdata, resolve, req, firstAfterParse, passes, phase1s, refTest, pcodeTest, verboseTracing) {
  const ast = fdata.tenkoOutput.ast;

  const start = Date.now();

  group(
    '\n\n\n##################################\n## phase1.1 (first=' +
      firstAfterParse +
      ', refTest=' +
      !!refTest +
      ', pcodeTest=' +
      !!pcodeTest +
    ') ::  ' +
    fdata.fname +
    ', pass=' + passes + ', phase1s=', phase1s, ', len:', fdata.len, '\n##################################\n\n\n',
  );
  try {
    if (VERBOSE_TRACING || REF_TRACK_TRACING) {
      const code = fmat(tmat(ast, true), true);
      console.log('\nCurrent state (start of phase1.1)\n--------------\n' + code + '\n--------------\n');
    }
  } catch (e) {
    vlog('printing ast failed');
    console.dir(ast, { depth: null });

    throw e;
  }
  vlog('\n\n\n#################################################################### phase1.1 [',passes,'::', phase1s, ']\n\n\n');

  const tracingValueBefore = VERBOSE_TRACING;
  if (!verboseTracing && (passes > 1 || phase1s > 1)) {
    vlog('(Disabling verbose tracing for phase 1 after the first pass)');
    setVerboseTracing(false);
  }

  // Discover param types. If an ident always gets invoked in the same way then that's information
  // we can use with the function param. We still have to confirm that the ref doesn't escape
  // anywhere because then we may not be able to determine how the function gets called.

  function _callWalker(node, before, nodeType, path) {
    if (before) return;

    if (nodeType === 'CallExpression') return handleCallExpression(node);
    if (nodeType === 'ObjectExpression') return handleObjectExpression(node, path);
  }

  function handleCallExpression(node) {
    if (node.callee.type !== 'Identifier') return;

    const calleeName = node.callee.name;

    const meta = fdata.globallyUniqueNamingRegistry.get(calleeName);
    ASSERT(meta);
    // Currently we only track whether the same arg type was passed on in every call that we could see
    // The consumer of this data is to verify that the function does not escape
    // If the callerArgs value is not set then we assume this is the first call occurrence
    // If it exists, the type must either match and otherwise it is set to undefined, indicating "unknown"
    // If it's undefined then this simple check could not determine a monomorphic primitive type for this arg index

    vlog('Processing a CallExpression for "', calleeName, '"');
    if (meta.callerArgs?.length === 0) {
      // Already invalidated before. Or called with no args, which we wouldn't handle well in this context.
      vlog('-', calleeName, ', ignored, callerArgs is empty array so we ignore further calls to this func');
      return;
    }

    if (node.arguments.some(anode => anode.type === 'SpreadElement')) {
      // Too risky. We could still support some specific cases if we wanted.
      vlog('- bail:', calleeName, 'was seen to have a spreadElement in at least one call arg, sealing func');
      meta.callerArgs = [];
      return;
    }

    // Note: function escape analysis happens in the next block. Here we just track calls, regardless.
    if (meta.callerArgs) {
      node.arguments.forEach((anode, i) => {
        if (AST.isPrimitive(anode)) {
          const seen = AST.getPrimitiveType(anode);
          if (seen !== meta.callerArgs[i]) {
            vlog('- bail', calleeName, ', index', i, ': at least one call had a different type than another', seen, meta.callerArgs[i]);
            meta.callerArgs[i] = undefined;
          }
        }
        else if (anode.type === 'Identifier') {
          const m = fdata.globallyUniqueNamingRegistry.get(anode.name);
          if (!m.typing.mustBeType || m.typing.mustBeType !== meta.callerArgs[i]) {
            vlog('- bail', calleeName, ', index', i, ': at least one call had a different mustBeType than another or none at all', m.typing.mustBeType, meta.callerArgs[i]);
            meta.callerArgs[i] = undefined;
          }
        }
        else {
          vlog('- bail', calleeName, ', index', i, ': unexpected arg type', anode.type);
          meta.callerArgs[i] = undefined;
        }
      });
      if (node.arguments.length < meta.callerArgs.length) {
        vlog('-', calleeName, ' was called with fewer args than the previous calls, marking the remaining args as `undefined` from index', node.arguments.length, 'onward');
        for (let i=node.arguments.length; i<meta.callerArgs.length; ++i) {
          if (meta.callerArgs[i] !== 'undefined') {
            vlog('- bail', calleeName, ', index', i, ': was not type="undefined" so cant use it');
            meta.callerArgs[i] = undefined;
          }
        }
      }
    } else {
      meta.callerArgs = node.arguments.map((anode, i) => {
        if (AST.isPrimitive(anode)) {
          const seen = AST.getPrimitiveType(anode);
          vlog('- first:', calleeName, ', index', i, ': found arg as primitive:', seen);
          return seen;
        }
        if (anode.type === 'Identifier') {
          const m = fdata.globallyUniqueNamingRegistry.get(anode.name);
          vlog('- first:', calleeName, ', index', i, ': ident with mustBeType:', m.typing.mustBeType);
          if (m.typing.mustBeType) return m.typing.mustBeType;
          return undefined;
        }
        else {
          vlog('- bail:', calleeName, ', index', i, ': not a primitive and not an identifier:', anode.type);
          return undefined;
        }
      });
    }
    vlog('-', calleeName, ': callerArgs after call step =', meta.callerArgs);
  }

  function handleObjectExpression(objNode, path) {
    // Verify whether it does not escape and is only assigned to

    const pathNodes = path.nodes;
    const pathProps = path.props;
    const pathIndexes = path.indexes;

    const parentNode = pathNodes[pathNodes.length - 2];
    const parentProp = pathProps[pathProps.length - 1];
    const parentIndex = pathIndexes[pathIndexes.length - 1];

    if (parentNode.type !== 'VariableDeclarator') return;

    if (parentNode.id.name === 'generatedObj') console.log('Now checking generatedObj');

    const meta = fdata.globallyUniqueNamingRegistry.get(parentNode.id.name);
    if (!meta.isConstant) return;

    if (meta.reads.some(read => {
      if (read.parentNode.type !== 'MemberExpression') return true;
      if (read.parentProp !== 'object') return true;

      // This must be either a property read or a property write.
      // The read may not be a call. Delete is fine in this context.

      // Must be the callee in normalized code, a method call, might change
      // the object into something that spies so we can't trust that case.
      if (read.grandNode.type === 'CallExpression') return true;

      // Ok? Delete and assignment are fine in this context (they cannot create getters/setters)
    })) {
      // At least one bad case found, bail
      return;
    }

    if (objNode.properties.some(pnode => pnode.kind !== 'init')) return; // obj has a getter or setter

    // All reads are an object of a member expression and not a method call
    // This means the object literal should not be able to spy when reading
    // properties from it. That's good to know!

    objNode.$p.isSimpleObject = true;
    meta.typing.isSimpleObject = true;
  }

  const now = Date.now();
  group('Walking AST to collect func call arg types...');
  walk(_callWalker, ast, 'ast');
  groupEnd();
  log('Walked AST to collect func call arg types', Date.now() - now, 'ms');

  // Set the param typing if we know
  const now2 = Date.now();
  function _paramWalker(node, before, nodeType, path) {
    if (before) return;
    if (nodeType !== 'FunctionExpression') return;

    const pathNodes = path.nodes;
    const pathProps = path.props;
    const pathIndexes = path.indexes;

    const parentNode = pathNodes[pathNodes.length - 2];
    const parentProp = pathProps[pathProps.length - 1];
    const parentIndex = pathIndexes[pathIndexes.length - 1];

    let funcName;
    if (parentNode.type === 'VariableDeclarator') {
      funcName = parentNode.id.name;
    }
    else if (parentNode.type === 'AssignmentExpression' && parentNode.left.type === 'Identifier') {
      funcName = parentNode.left.name;
    }
    else {
      // fizzle
      vlog('Bail: function with pid @', +node.$p.pid, 'is not the init of a var decl nor the rhs of an assignment', parentNode.type);
      return;
    }

    const meta = fdata.globallyUniqueNamingRegistry.get(funcName);
    vlog('Processing callerArgs for function "', funcName, '":', meta.callerArgs);
    if (!meta.callerArgs) {
      vlog('- bail: no callerArgs set so maybe function wasnt (clearly) called at all?');
      return;
    }
    if (!meta.callerArgs.length) {
      vlog('- bail: callerArgs is empty array, either at least one call passed on zero args or there was a blocking problem');
      return;
    }

    vlog('- Verify whether func escapes...');
    // We have to do escape analysis first. We must assert the function always gets called.
    // Writes are not relevant. We're only tracking how it gets called. So if
    // you're something like `let f = function(){}; f(); f = 1; f();` so be it.
    // Confirm that all usages of the ident are regular calls. We may be able
    // to extend this later to other cases as they present themselves.
    if (meta.reads.some(read => {
      if (read.parentNode.type !== 'CallExpression' || read.parentProp !== 'callee') {
        vlog('  - Found a case where it was not a call:', read.parentNode.type);
        // Hmmm
        // At least one read was not callee of a call expression
        // There's one thing we'll try to salvage: an alias where the alias always gets called.
        // If we can verify the alias then we merge the alias callerArgs with this one and move on.

        const isAssign = read.parentNode.type === 'AssignmentExpression' && read.parentProp === 'right' && read.parentNode.left.type === 'Identifier';
        const isVar = !isAssign && read.parentNode.type === 'VariableDeclarator' && read.parentProp === 'init';

        vlog('  - Is it aliased?:', isAssign, isVar);

        if (isAssign || isVar) {
          vlog('    - Yes, trying to confirm whether the alias is always called so we can merge their callerArgs');
          // Trace the alias.
          const aliasName = isAssign ? read.parentNode.left.name : read.parentNode.id.name;
          const aliasMeta = fdata.globallyUniqueNamingRegistry.get(aliasName);
          if (aliasMeta.writes.length === 1 && aliasMeta.reads.every(aliasRead => aliasRead.parentNode.type === 'CallExpression' && aliasRead.parentProp === 'callee')) {
            vlog('    - Confirmed that the alias "', aliasName, '" is always called. Merging callerArgs', meta.callerArgs, aliasMeta.callerArgs);
            // We should be able to use/merge the callerArgs of this alias since it was only assigned our target function
            // and only called otherwise. Effectively, it's an identical alias and so all calls can be attributed to our
            // target function.
            if (meta.callerArgs) {
              for (let i=0, len = Math.min(aliasMeta.callerArgs?.length ?? 0, meta.callerArgs?.length ?? 0); i<len; ++i) {
                if (meta.callerArgs[i] !== aliasMeta.callerArgs[i]) {
                  meta.callerArgs[i] = undefined;
                }
              }
            } else {
              meta.callerArgs = aliasMeta.callerArgs.slice(0);
            }
            vlog('    - Caller args after merge:', meta.callerArgs);
            // Recovered!
            return;
          }
        }

        vlog('- Failed to recover alias. Not using callerArgs for "', funcName, '"');
        return true;
      }
    })) {
      // sealing and bailing.
      vlog('- Sealing');
      meta.callerArgs = [];
      return;
    }
    vlog('- Ok, function only called as callee in calls, applying', meta.callerArgs, 'to params now');

    // Update the meta.typing.mustBeType for all param bindings to the caller arg type if not undefined
    node.params.some((pnode, i) => {
      const paramName = pnode.$p.paramVarDeclRef?.name ?? '<unknown>';
      if (pnode.rest) { // A Param has param.rest, not 'RestElement'
        // fizzle the remainder
        meta.callerArgs.length = i; // removes the remainder to indicate "do not use"
        vlog('  - param', i, '(', paramName, '); Bail: The function has at least one rest param. Bailing on this and the remainder params');
        return true;
      }
      if (meta.callerArgs[i] === undefined) {
        vlog('  - param', i, '(', paramName, '); Bail: No consistent primitive type found in all calls');
        return;
      } 
      if (!pnode.$p.paramVarDeclRef) {
        vlog('  - param', i, '(', paramName, '); Bail: No local decl to update...');
        return;
      }

      const m = fdata.globallyUniqueNamingRegistry.get(paramName);
      if (m.writes.length > 1) {
        vlog('  - param', i, '(', paramName, '); Bail: The param is written to later so we bail on callerArgs for this param for now');
        // This param is assigned to multiple times. Risky and we should bail for now.
        meta.callerArgs[i] = undefined; // seal
      }
      else if (m.typing.mustBeType === undefined) {
        // Not yet determined so now we do
        vlog('  - param', i, '(', paramName, '); Ok! Marking param as:', meta.callerArgs[i], ', writes:', m.writes.length);
        m.typing.mustBeType = meta.callerArgs[i];
      }
      else if (m.typing.mustBeType !== false && m.typing.mustBeType !== meta.callerArgs[i]) {
        // It was determined but different from this information. Not sure how I feel about that...
        // This does happen legit when there's an assignment to the param, so that can happen.
        ASSERT(m.writes.length > 1, 'this is a bad omen. unless the param was assigned to, it means the heuristic was incorrect...');
        vlog('  - param', i, '(', paramName, '); Caller arg was', meta.callerArgs[i], 'but mustBeType was already set to', m.typing.mustBeType, '; setting it to false now');
        m.typing.mustBeType = false;
      }
    });
    vlog('- Caller args after update:', meta.callerArgs);
  }

  vlog('');
  group('Walking AST to apply callArgs and assign type to params...');
  walk(_paramWalker, ast, 'ast');
  groupEnd();
  log('Walked AST to type params, in', Date.now() - now2, 'ms');

  assertNoDupeNodes(ast, 'body');

  setVerboseTracing(tracingValueBefore);

  log('\n\nEnd of phase 1.1, walker took', Date.now() - start, 'ms');

  groupEnd();
}
