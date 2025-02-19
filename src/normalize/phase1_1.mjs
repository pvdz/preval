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
import { getMeta, inferNodeTyping, mergeTyping } from '../bindings.mjs';
import { SYMBOL_COERCE, SYMBOL_FRFR } from '../symbols_preval.mjs';

// This phase walks the AST a few times to discover things for which it needs phase1 to complete
// Currently it discovers call arg types (for which it needs the meta.typing data) and propagated mustBeType cases

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
    if (!(!verboseTracing && (passes > 1 || phase1s > 1))) {
      if (VERBOSE_TRACING || REF_TRACK_TRACING) {
        const code = fmat(tmat(ast, true), true);
        console.log('\nCurrent state (start of phase1.1)\n--------------\n' + code + '\n--------------\n');
      }
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

  // Collect for type analysis later
  const funcNodesForSomething = new Set; // Set<FunctionExpression>
  const calledMetas = new Map; // Map<Meta, Array<CallExpression>>
  const untypedConstDecls = new Set; // Set<VariableDeclaration> Collect all const decls that have no typing yet.
  const funcNodesForParams = new Set;

  // Discover param types. If an ident always gets invoked in the same way then that's information
  // we can use with the function param. We still have to confirm that the ref doesn't escape
  // anywhere because then we may not be able to determine how the function gets called.

  function _callWalker(node, before, nodeType, path) {
    if (before) return;

    if (nodeType === 'CallExpression') return handleCallExpression(node);
    if (nodeType === 'ObjectExpression') return handleObjectExpression(node, path); // Simple shape validation
    if (nodeType === 'FunctionExpression') return handleFunctionExpression(node, path);
    if (nodeType === 'VariableDeclaration') return handleVariableDeclaration(node);
  }

  function handleCallExpression(callNode) {
    if (callNode.callee.type !== 'Identifier') return; // Ignore type stuff on methods for now

    const isfrfr = callNode.callee.name === '$frfr';
    const calleeName = isfrfr ? callNode.arguments[0].name : callNode.callee.name;
    ASSERT(typeof calleeName === 'string', 'for $frfr; the first arg must be an ident');

    const calleeMeta = fdata.globallyUniqueNamingRegistry.get(calleeName);
    ASSERT(calleeMeta);
    // Currently we only track whether the same arg type was passed on in every call that we could see
    // The consumer of this data is to verify that the function does not escape
    // If the callerArgs value is not set then we assume this is the first call occurrence
    // If it exists, the type must either match and otherwise it is set to undefined, indicating "unknown"
    // If it's undefined then this simple check could not determine a monomorphic primitive type for this arg index

    if (calleeMeta.isBuiltin) return; // No need for this
    if (calleeMeta.isImplicitGlobal) return; // What would we update?

    // Stash the arg nodes. We'll traverse them later in the big type loop.
    if (calledMetas.has(calleeMeta)) {
      calledMetas.get(calleeMeta).push(isfrfr ? callNode.arguments.slice(1) : callNode.arguments);
    } else {
      calledMetas.set(calleeMeta, [isfrfr ? callNode.arguments.slice(1) : callNode.arguments]);
    }
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

  function handleFunctionExpression(funcNode, path) {
    // Collect the nodes so we can do return type analysis on them later, in the loop where we try to resolve the mustBeType
    // We'll use the collected funcNode.$p.returnNodes and try to determine the return type(s)

    const parentNode = path.nodes[path.nodes.length - 2];
    if (parentNode.type === 'VariableDeclarator') {
      const funcMeta = getMeta(parentNode.id.name, fdata);
      if (funcMeta.typing.returns) return; // Skip if already set. This must have been a built-in. Return type won't change.

      const funcName = parentNode.id.name;

      if (path.nodes[path.nodes.length - 3].kind === 'const') {
        funcNodesForSomething.add({funcName, funcNode, funcMeta, parentNode});
      }

      funcNodesForParams.add({funcNode, funcMeta, funcName, parentNode});
    }
    else if (parentNode.type === 'AssignmentExpression' && parentNode.left.type === 'Identifier') {
      // Do not update funcNodesForSomething

      const funcMeta = getMeta(parentNode.left.name, fdata);
      if (funcMeta.typing.returns) return; // Skip if already set. This must have been a built-in. Return type won't change.

      const funcName = parentNode.left.name;
      funcNodesForParams.add({funcNode, funcMeta, funcName, parentNode});
    }
    else {
      // fizzle
      vlog('Bail: function with pid @', +funcNode.$p.pid, 'is not the init of a var decl nor the rhs of an assignment', parentNode.type);
    }
  }

  function handleVariableDeclaration(declNode) {
    const declName = declNode.declarations[0].id.name;
    if (declNode.kind === 'const') {
      const meta = getMeta(declName, fdata);
      if (!meta.typing.mustBeType) {
        vlog('## queued type resolving for decl of', declName, '(', meta.typing.mustBeType, ',', meta.typing.mustBePrimitive, ')');
        untypedConstDecls.add({node: declNode, meta});
      } else {
        vlog('## decl for', declName, 'already has typing;', meta.typing.mustBeType, meta.typing.mustBePrimitive)
      }
    } else {
      vlog('## skipped type resolving for non-const of', declName);
    }
  }

  const now = Date.now();
  group('Walking AST to collect func call arg types...');
  walk(_callWalker, ast, 'ast');
  groupEnd();
  log('Walked AST to collect func call arg types', Date.now() - now, 'ms');

  // Remove any funcs when we know we won't discover its callerArgs
  calledMetas.forEach((arrArgs, calleeMeta) => {
    if (calleeMeta.callerArgs) {
      // Already set. Must mean it's failed. Remove this call.
      calledMetas.delete(calleeMeta);
      return;
    }
    if (!calleeMeta.constValueRef) {
      // If we have no value ref here then it's not a function we can control
      calledMetas.delete(calleeMeta);
      return;
    }
    // Check if this call contains spread. In that case, dont try to discover callerArgs for this function.
    arrArgs.some(args => {
      if (args.some(anode => anode.type === 'SpreadElement')) {
        // Too risky. We could still support some specific cases if we wanted.
        vlog('- bail:', calleeMeta.uniqueName, 'was seen to have a spreadElement in at least one call arg, sealing the callerArgs');
        calleeMeta.callerArgs = [];
        calledMetas.delete(calleeMeta);
        return true;
      }
    });
  });

  const aliasChecks = [];

  // Remove metas that escape
  vlog('');
  group('Starting escape analysis on function expressions waiting to be updated');
  const now3 = Date.now();
  funcNodesForParams.forEach(obj => {
    const {funcNode, funcMeta, funcName, parentNode} = obj;

    vlog('- Verify whether func', [funcName], 'escapes...');
    // We have to do escape analysis first. We must assert the function always gets called.
    // Writes are not relevant. We're only tracking how it gets called. So if
    // you're something like `let f = function(){}; f(); f = 1; f();` so be it.
    // Confirm that all usages of the ident are regular calls. We may be able
    // to extend this later to other cases as they present themselves.
    if (funcMeta.reads.some(read => {
      if (
        (read.parentNode.type === 'CallExpression' && read.parentProp === 'callee') ||
        (
          // It's fine to escape into a frfr since we control that; it won't get called
          read.parentNode.type === 'CallExpression' &&
          read.parentNode.callee.type === 'Identifier' &&
          read.parentNode.callee.name === SYMBOL_FRFR &&
          read.parentNode.arguments[0] === read.node
        ) ||
        (
          // It's fine to escape into a $coerce since we control that; it won't get called
          read.parentNode.type === 'CallExpression' &&
          read.parentNode.callee.type === 'Identifier' &&
          read.parentNode.callee.name === SYMBOL_COERCE &&
          read.parentNode.arguments[0] === read.node
        )
      ) {
        // Ok
        return false;
      }

      vlog('  - Found a case where it was not a call nor a $frfr/$coerce:', read.parentNode.type, read.parentProp);
      // Hmmm
      // At least one read was not callee of a call expression and not the first arg of a $frfr
      // There's one thing we'll try to salvage: an alias where the alias always gets called.
      // If we can verify the alias then we merge the alias callerArgs with this one and move on.

      const isAssign = read.parentNode.type === 'AssignmentExpression' && read.parentProp === 'right' && read.parentNode.left.type === 'Identifier';
      const isVar = !isAssign && read.parentNode.type === 'VariableDeclarator' && read.parentProp === 'init';

      vlog('  - Is it aliased?:', isAssign, isVar);

      if (isAssign || isVar) {
        vlog('    - Yes, trying to confirm whether the alias is always called so we can merge their callerArgs');
        // Trace the alias.
        const aliasName = isAssign ? read.parentNode.left.name : read.parentNode.id.name;
        const aliasMeta = getMeta(aliasName, fdata);
        if (aliasMeta.writes.length === 1 && aliasMeta.reads.every(aliasRead => aliasRead.parentNode.type === 'CallExpression' && aliasRead.parentProp === 'callee')) {
          vlog('    - Confirmed that the alias "', aliasName, '" is always called. Will merge their callerArgs later');
          aliasChecks.push({funcName, aliasName, funcMeta, aliasMeta});
          // Recovered! Will copy callerArgs later
          return false;
        }
      }

      vlog('- Failed to recover alias. Not using callerArgs for "', funcName, '"');
      return true;
    })) {
      // sealing and bailing.
      vlog('- Sealing');
      funcMeta.callerArgs = [];
      calledMetas.delete(funcMeta);
      funcNodesForParams.delete(obj);
      return;
    }
    vlog('- Ok, function only called as callee or with $frfr/$coerce');
  });
  log('Walked AST to type params, in', Date.now() - now3, 'ms');
  groupEnd();

  vlog('');
  vgroup('Trying to resolve a mustBeType of', untypedConstDecls.size, 'var decls, ', funcNodesForSomething.size, 'funcs, and the callerArgs for', calledMetas.size, 'funcs');
  let typingUpdated = 0;
  let typingChanged = true;
  let loopi = 0;
  while (typingChanged && untypedConstDecls.size) {
    typingChanged = false;
    vgroup('typingLoop', loopi++,';', untypedConstDecls.size, 'vars and', funcNodesForSomething.size, 'funcs left');

    vgroup(untypedConstDecls.size, 'const decls');
    let cdi = 0;
    untypedConstDecls.forEach((obj) => {
      const {node, meta} = obj;
      const name = node.declarations[0].id.name;
      vlog('-- decl', cdi++, '::', name);
      if (!meta.typing?.mustBeType) {
        const init = node.declarations[0].init;
        vlog('Resolving .typing of `' + name + '` with the details of the rhs', init.type);
        const newTyping = inferNodeTyping(fdata, init);
        vlog('++ Results in', newTyping?.mustBeType, newTyping?.mustBePrimitive, 'which we will inject');
        if (newTyping?.mustBeType) {
          meta.typing = newTyping; // Is there any reason we shouldn't overwrite it anyways? It may have discovered other typing things?
          typingChanged = true;
          typingUpdated += 1;
          untypedConstDecls.delete(obj);
        }
        else if (newTyping?.mustBePrimitive && !meta.typing?.mustBePrimitive) {
          meta.typing = newTyping; // Is there any reason we shouldn't overwrite it anyways? It may have discovered other typing things?
          typingChanged = true;
          typingUpdated += 1;
          // Primitive is better than nothing but we'd still like to get to a more concrete type if we can
          //untypedConstDecls.delete(obj); // Don't delete
        }
        vlog('---- Typing:', meta.typing.mustBeType, meta.typing.mustBePrimitive);
      }
    });
    vgroupEnd();
    vgroup(funcNodesForSomething.size, 'function return types');
    let fni = 0;
    funcNodesForSomething.forEach((obj) => {
      const {funcName, funcNode, funcMeta, parentNode} = obj;
      vlog('-- func', fni++, '; "', funcName, '"');
      const types = new Set(funcNode.$p.returnNodes?.map(returnNode => {
        const arg = returnNode.argument;
        if (AST.isPrimitive(arg)) return AST.getPrimitiveType(arg);
        ASSERT(arg.type === 'Identifier');
        const argMeta = getMeta(arg.name, fdata);
        if (argMeta.typing?.mustBeType) return argMeta.typing.mustBeType;
        else if (argMeta.typing?.mustBePrimitive) return 'primitive';
        return '?';
      }));
      vlog('  - types:', types);
      if (types.has('?')) {
        // Return type is not certain to be a primitive yet
        funcMeta.typing.returns = types; // This is always the current status quo, so always update it.
        vlog('  - Has an unknown type :(');
      }
      else if (types.size > 1 || types.has('primitive')) {
        vlog('  - Has a primitive type :|');
        // Return type is certain to be a primitive, but there are two or more options.
        if (!funcMeta.typing.returns || funcMeta.typing.returns.has('?')) {
          // This was an improvement because there is no more '?' now
          typingChanged = true;
          typingUpdated += 1;
          vlog('  - This was an improvement :)');
        }
        funcMeta.typing.returns = types; // This is always the current status quo, so always update it.
      }
      else {
        // We've resolve the return type to a mustBeType, yay.
        funcMeta.typing.returns = types; // This is always the current status quo, so always update it.
        typingChanged = true;
        typingUpdated += 1;
        funcNodesForSomething.delete(obj);
        vlog('  - Resolved return type for "', funcName, '" to a mustBeType :D', types);
      }
    });
    vgroupEnd();
    vgroup(calledMetas.size, 'function calls');
    let cmi = 0;
    calledMetas.forEach((arrArgs, calleeMeta) => {
      // Note: callee verified not to escape above. If it's still in the list, we should have all calls to it.
      const calleeName = calleeMeta.uniqueName;
      const oldCallerArgs = calleeMeta.callerArgs?.slice(0);
      const oldcopy = calleeMeta.callerArgs?.slice(0);
      const oldi = calleeMeta.tmpi;
      calleeMeta.callerArgs = undefined;
      calleeMeta.tmpi = loopi;
      vgroup('-- arg', cmi++, '. Processing all', arrArgs.length, 'CallExpressions for "', calleeMeta.uniqueName, '", previous callerArgs:', oldi, oldCallerArgs);
      arrArgs.every((args,ci) => {
        vlog('- Call', ci+1, '/', arrArgs.length);
        // Note: function escape analysis happens in the next block. Here we just track calls, regardless.
        if (calleeMeta.callerArgs) {
          args.forEach((anode, i) => {
            if (AST.isPrimitive(anode)) {
              const seen = AST.getPrimitiveType(anode);
              if (seen !== calleeMeta.callerArgs[i]) {
                vlog('- bail "', calleeName, '", index', i, ': at least one call had a different type than another', seen, calleeMeta.callerArgs[i]);
                calleeMeta.callerArgs[i] = undefined;
              }
            }
            else if (anode.type === 'Identifier') {
              const argMeta = getMeta(anode.name, fdata);
              if (!argMeta.typing.mustBeType || argMeta.typing.mustBeType !== calleeMeta.callerArgs[i]) {
                vlog('- bail"', calleeName, '", index', i, ': at least one call had a different mustBeType than another or none at all', argMeta.typing.mustBeType, calleeMeta.callerArgs[i]);
                calleeMeta.callerArgs[i] = undefined;
              }
            }
            else {
              vlog('- bail"', calleeName, '", index', i, ': unexpected arg type', anode.type);
              calleeMeta.callerArgs[i] = undefined;
            }
            // ok
            return true;
          });

          if (args.length < calleeMeta.callerArgs.length) {
            vlog('-', calleeName, ' was called with fewer args than the previous calls, marking the remaining args as `undefined` from index', args.length, 'onward');
            for (let i=args.length; i<calleeMeta.callerArgs.length; ++i) {
              if (calleeMeta.callerArgs[i] !== 'undefined') {
                vlog('- bail', calleeName, ', index', i, ': was not type="undefined" so cant use it');
                calleeMeta.callerArgs[i] = undefined;
              }
            }
          }
        } else {
          calleeMeta.callerArgs = args.map((anode, i) => {
            if (AST.isPrimitive(anode)) {
              const seen = AST.getPrimitiveType(anode);
              vlog('- first: "', calleeName, '", arg index', i, ': found arg as primitive:', seen);
              return seen;
            }
            if (anode.type === 'Identifier') {
              const argMeta = getMeta(anode.name, fdata);
              vlog('- first: "', calleeName, '", arg index', i, ': ident "', anode.name, '" with mustBeType:', argMeta.typing.mustBeType, ', and mustBePrimitive:', argMeta.typing.mustBePrimitive);
              if (argMeta.typing.mustBeType) return argMeta.typing.mustBeType;
              if (argMeta.typing.mustBePrimitive) return 'primitive';
              return undefined;
            }
            else {
              vlog('- bail: "', calleeName, '", arg index', i, ': not a primitive and not an identifier:', anode.type);
              return undefined;
            }
          });
        }
        vlog('-', calleeName, ': callerArgs after call step =', calleeMeta.tmpi, 'old clone:', calleeMeta.callerArgs, 'old ref:', oldcopy);
        if (!oldCallerArgs || oldCallerArgs.length !== calleeMeta.callerArgs.length || oldCallerArgs.some((_,i) => oldCallerArgs[i] !== calleeMeta.callerArgs[i])) {
          vlog('At least one param was changed!', !oldCallerArgs, oldCallerArgs?.length, calleeMeta.callerArgs.length, (oldCallerArgs?.length !== calleeMeta.callerArgs.length), oldCallerArgs && oldCallerArgs.map((_,i) => oldCallerArgs[i] !== calleeMeta.callerArgs[i]));
          typingChanged = true;
          typingUpdated += 1;
        }

        vlog('All args are undefined or no args found at all. stopping this loop', calleeMeta.callerArgs);
        return false;
      });
      vgroupEnd();
    });
    vgroupEnd();

    vlog('');
    group('Applying type information to params such that hopefully next loop more stuff is discovered');
    // Note: do not change callerArgs (by reference) this loop. Apply that afterwards (!)
    const now2 = Date.now();
    funcNodesForParams.forEach(obj => {
      const {funcNode, funcMeta, funcName, parentNode} = obj;

      if (!funcMeta.callerArgs) return;

      vlog('- Applying', funcMeta.callerArgs, 'to params for "', funcName, '" now');

      // Update the meta.typing.mustBeType for all param bindings to the caller arg type if not undefined
      funcNode.params.some((pnode, i) => {
        const paramName = pnode.$p.paramVarDeclRef?.name ?? '<unknown>';
        if (pnode.rest) { // A Param has param.rest, not 'RestElement'
          vlog('  - param', i, '(', paramName, '); Bail: The function has at least one rest param. Bailing on this and the remainder params');
          return true; // Don't apply callerArgs to the remaining params (there shouldn't be any)
        }
        if (funcMeta.callerArgs[i] === undefined) {
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
          //funcMeta.callerArgs[i] = undefined; // seal
          return;
        }

        // This is where we actually update the params, one way or another
        if (m.typing.mustBeType === undefined) {
          // Not yet determined so now we do
          vlog('  - param', i, '(', paramName, '); Ok! Marking param as:', funcMeta.callerArgs[i], ', writes:', m.writes.length);
          m.typing.mustBeType = funcMeta.callerArgs[i];
          if (['object', 'array', 'regex', 'function', 'class'].includes(funcMeta.callerArgs[i])) m.typing.mustBeTruthy = true;
        }
        else if (m.typing.mustBeType !== false && m.typing.mustBeType !== funcMeta.callerArgs[i]) {
          // It was determined but different from this information. Not sure how I feel about that...
          // This does happen legit when there's an assignment to the param, so that can happen.
          ASSERT(m.writes.length > 1, 'this is a bad omen. unless the param was assigned to, it means the heuristic was incorrect...');
          vlog('  - param', i, '(', paramName, '); Caller arg was', funcMeta.callerArgs[i], 'but mustBeType was already set to', m.typing.mustBeType, '; setting it to false now');
          m.typing.mustBeType = false;
        }
      });
    });
    log('Updated param types in', Date.now() - now2, 'ms');
    groupEnd();

    vgroupEnd();
  }
  vlog('All typing settled now..., updated', typingUpdated, 'times. Still have', untypedConstDecls.size, 'decls without a mustBeType, sadge');
  vgroupEnd();

  vlog('');
  group('Processing all', funcNodesForParams.size, 'defined function expressions that dont escape, to apply callArgs types to params...');
  const now2 = Date.now();
  funcNodesForParams.forEach(obj => {
    const {funcNode, funcMeta, funcName, parentNode} = obj;

    if (!funcMeta.callerArgs) return;

    vlog('- Applying', funcMeta.callerArgs, 'to params for "', funcName, '" now');

    // Update the meta.typing.mustBeType for all param bindings to the caller arg type if not undefined
    funcNode.params.some((pnode, i) => {
      const paramName = pnode.$p.paramVarDeclRef?.name ?? '<unknown>';
      if (pnode.rest) { // A Param has param.rest, not 'RestElement'
        // fizzle the remainder
        funcMeta.callerArgs.length = i; // removes the remainder to indicate "do not use"
        vlog('  - param', i, '(', paramName, '); Bail: The function has at least one rest param. Bailing on this and the remainder params');
        return true;
      }
      if (funcMeta.callerArgs[i] === undefined) {
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
        funcMeta.callerArgs[i] = undefined; // seal
      }
      else if (m.typing.mustBeType === undefined) {
        // Not yet determined so now we do
        vlog('  - param', i, '(', paramName, '); Ok! Marking param as:', funcMeta.callerArgs[i], ', writes:', m.writes.length);
        m.typing.mustBeType = funcMeta.callerArgs[i];
        if (['object', 'array', 'regex', 'function', 'class'].includes(funcMeta.callerArgs[i])) m.typing.mustBeTruthy = true;
      }
      else if (m.typing.mustBeType !== false && m.typing.mustBeType !== funcMeta.callerArgs[i]) {
        // It was determined but different from this information. Not sure how I feel about that...
        // This does happen legit when there's an assignment to the param, so that can happen.
        ASSERT(m.writes.length > 1, 'this is a bad omen. unless the param was assigned to, it means the heuristic was incorrect...');
        vlog('  - param', i, '(', paramName, '); Caller arg was', funcMeta.callerArgs[i], 'but mustBeType was already set to', m.typing.mustBeType, '; setting it to false now');
        m.typing.mustBeType = false;
      }
    });
    vlog('- Caller args after update:', funcMeta.callerArgs);
  });
  log('Walked AST to type params, in', Date.now() - now2, 'ms');
  groupEnd();

  aliasChecks.forEach(obj => {
    const {funcName, aliasName, funcMeta, aliasMeta} = obj;
    vlog('Merging callerArgs of alias "', aliasName, '" into "', funcName, '"');

    // We should be able to use/merge the callerArgs of this alias since it was only assigned our target function
    // and only called otherwise. Effectively, it's an identical alias and so all calls can be attributed to our
    // target function.
    if (funcMeta.callerArgs) {
      for (let i=0, len = Math.min(aliasMeta.callerArgs?.length ?? 0, funcMeta.callerArgs?.length ?? 0); i<len; ++i) {
        if (funcMeta.callerArgs[i] !== aliasMeta.callerArgs[i]) {
          funcMeta.callerArgs[i] = undefined;
        }
      }
    } else if (aliasMeta.callerArgs) {
      funcMeta.callerArgs = aliasMeta.callerArgs.slice(0);
    }
    vlog('    - Caller args after merge:', funcMeta.callerArgs);
  });

  assertNoDupeNodes(ast, 'body');

  setVerboseTracing(tracingValueBefore);

  log('\n\nEnd of phase 1.1, walker took', Date.now() - start, 'ms');

  groupEnd();
}
