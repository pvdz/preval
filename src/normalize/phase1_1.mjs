import walk from '../../lib/walk.mjs';
import * as AST from '../ast.mjs';
import { VERBOSE_TRACING, RED, BLUE, DIM, RESET, setVerboseTracing, PRIMITIVE_TYPE_NAMES_PREVAL } from '../constants.mjs';
import { ASSERT, log, group, groupEnd, vlog, vgroup, vgroupEnd, tmat, fmat, source, REF_TRACK_TRACING, assertNoDupeNodes, todo, currentState, } from '../utils.mjs';
import { createTypingObject, getCleanTypingObject, getMeta, inferNodeTyping, mergeTyping } from '../bindings.mjs';
import { SYMBOL_COERCE, SYMBOL_DOTCALL, SYMBOL_FRFR } from '../symbols_preval.mjs';
import { symbo } from '../symbols_builtins.mjs';
// import { setPrintPids } from '../../lib/printer.mjs';

// This phase walks the AST a few times to discover things for which it needs phase1 to complete
// Currently it discovers call arg types (for which it needs the meta.typing data) and propagated mustBeType cases

export function phase1_1(fdata, resolve, req, firstAfterParse, passes, phase1s, refTest, pcodeTest, verboseTracing, optionsTime) {
  const enableTiming = optionsTime;
  const ast = fdata.tenkoOutput.ast;

  const start = Date.now();
  const mstart = enableTiming && performance.now();

  const TIMING = {
    init: 0,
    one: 0,
    two: 0,
    three: 0,
    four: 0,
    five: 0,
    six: 0,
    seven: 0,
  };

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
  if (!(!verboseTracing && (passes > 1 || phase1s > 1))) {
    if (REF_TRACK_TRACING) {
      currentState(fdata, 'start of phase1.1', true, fdata);
      vlog('\n\n\n#################################################################### phase1.1 [',passes,'::', phase1s, ']\n\n\n');
    }
  }

  const tracingValueBefore = VERBOSE_TRACING;
  if (!verboseTracing /*&& (passes > 1 || phase1s > 1)*/) {
    vlog('(Disabling verbose tracing for phase 1 after the first pass)');
    setVerboseTracing(false);
    // setPrintPids(true);
    // currentState(fdata, 'phase1.1', true, fdata);
    // setPrintPids(false);
  }

  // Collect for type analysis later
  const funcNodesForSomething = new Set; // Set<FunctionExpression>
  const calledMetas = new Map; // Map<Meta, Array<CallExpression>>
  const untypedVarDecls = new Set; // Set<VarStatement> Collect all const decls that have no typing yet.
  const funcNodesForParams = new Set;

  // Discover param types. If an ident always gets invoked in the same way then that's information
  // we can use with the function param. We still have to confirm that the ref doesn't escape
  // anywhere because then we may not be able to determine how the function gets called.

  function _callWalker(node, before, nodeType, path) {
    if (before) return;

    if (nodeType === 'CallExpression') return handleCallExpression(node);
    if (nodeType === 'ObjectExpression') return handleObjectExpression(node, path); // Simple shape validation
    if (nodeType === 'FunctionExpression') return handleFunctionExpression(node, path);
    if (nodeType === 'VarStatement') return handleVarStatement(node);
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

    if (parentNode.type !== 'VarStatement') return;

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
  }

  function handleFunctionExpression(funcNode, path) {
    // Collect the nodes so we can do return type analysis on them later, in the loop where we try to resolve the mustBeType
    // We'll use the collected funcNode.$p.returnNodes and try to determine the return type(s)

    if (funcNode.params.length && funcNode.params[funcNode.params.length - 1].rest) {
      vlog('  - Last param of function was rest param so setting mustBeType of param to "array"');
      const pnode = funcNode.params[funcNode.params.length - 1];
      const paramName = pnode.$p.paramVarDeclRef?.name;
      if (!paramName) {
        vlog('  - looks like the rest param is not actually used. Maybe we should drop it.');
        todo('drop unused rest param?');
      } else {
        const m = fdata.globallyUniqueNamingRegistry.get(paramName);
        if (m.writes.length > 1) {
          vlog('  - param', funcNode.params.length-1, '(', paramName, '); Bail: it may be a rest but it gets overwritten later');
          todo('we may still be able to support some of these rest-overwrite cases');
        } else {
          m.typing = createTypingObject({
            mustBeType: 'array',
            mustBePrimitive: false,
            mustBeTruthy: true,
            mustBeFalsy: false,
          });

          // We should update caller args but I'm not sure what makes sense.
          // Do we want to track what type the param is (array) or what types are going to be assigned due to the func calls (Array<string> or whatever)
          // For now we can hack around it by patching the printer to detect a rest and replacing the value with "array"... meh.
        }
      }
    }

    const parentNode = path.nodes[path.nodes.length - 2];
    if (parentNode.type === 'VarStatement') {
      const funcMeta = getMeta(parentNode.id.name, fdata);
      if (funcMeta.typing.returns) return; // Skip if already set. This must have been a built-in. Return type won't change.

      if (funcNode.async) {
        vlog('This is an async function, it will always and only return a promise');
        funcMeta.typing.returns = 'promise';
        return;
      }
      if (funcNode.generator) {
        vlog('This is a generator function, it will always and only return an object');
        funcMeta.typing.returns = 'object';
        return;
      }

      const funcName = parentNode.id.name;

      if (parentNode.kind === 'const') {
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
      vlog('Bail: function with pid @', funcNode.$p.npid, 'is not the init of a var decl nor the rhs of an assignment', parentNode.type);
    }
  }

  function handleVarStatement(declNode) {
    const declName = declNode.id.name;
    if (declNode.kind === 'const' || declNode.kind === 'let') {
      const meta = getMeta(declName, fdata);
      if (declNode.kind === 'let') {
        if (isTernaryPattern(declNode, meta)) {
          log('  -', declName, 'is a ternary constant!');
          meta.isTernaryConst = true;
          // i'd rather control it through a var such that we can easily update this in the future.
          // We may expand support with higher write counts later and I don't want to search for them everywhere :)
          if (meta.writes.length !== 2) meta.ternaryWritesIgnoreFirst = true;
        }
      }
      if (!meta.typing.mustBeType || meta.typing.mustBeType === 'primitive' || meta.typing.mustBeType === 'object' || meta.typing.mustBeType === 'plustr') {
        vlog('## queued type resolving for decl of', [declName], '(mustbetype:', [meta.typing.mustBeType], ', isprimitive:', meta.typing.mustBePrimitive, ')');
        untypedVarDecls.add({node: declNode, meta});
      } else {
        vlog('## decl for', [declName], 'already has typing;', [meta.typing.mustBeType], meta.typing.mustBePrimitive)
      }
    } else {
      vlog('## skipped type resolving for non-const of', [declName]);
    }
  }

  const minit = enableTiming && performance.now();
  TIMING.init = minit - mstart;

  fdata.globallyUniqueNamingRegistry.forEach((meta, varName) => {
    if (!meta.hasRangeCheck) return;
    if (!meta.isLet) return; // Should go up/down (TODO: maybe we don't care as much and the range check still helps for array access?)
    if (meta.writes.length < 2) return; // init and update
    if (meta.reads.length < 2) return; // we already found the range check but we would need another observation

    // We're looking for cases where we can apply a clear min/max bound for vars, like loop counters
    // - Record the initial value
    // - Confirm one assignment does a ++x kind of update
    // - Confirm any other assignment is writing numbers
    // - Confirm numeric assignments don't go out of bounds
    // - Confirm that the update mutation happens inside the range check `if`
    // Then... I guess all reads can be guaranteed to be bound

    let initial;
    let step;
    let boundsRead;
    let boundsValue;
    let assigns = [];

    if (!meta.writes.every(write => {
      if (write.kind === 'var') {
        if (!AST.isNumberLiteral(write.parentNode.init)) return false;
        initial = AST.getPrimitiveValue(write.parentNode.init);
        return true;
      }

      const assign = write.parentNode;
      const rhs = assign.right;
      if (rhs.type === 'BinaryExpression') {
        if (step !== undefined) return false; // dont update multiple times. TODO: we can support this too why not..?
        // Confirm self-updating pattern. We will have to do the other one later (++x vs x++)
        if (rhs.operator !== '+' && rhs.operator !== '-') return false; // Simple steps only. TODO: what else would be ok here?
        if (rhs.left.type === 'Identifier' && rhs.left.name === varName && AST.isNumberLiteral(rhs.right)) {
          step = (rhs.operator === '-' ? -1 : 1) * AST.getPrimitiveValue(rhs.right);
          if (!isFinite(step)) return false; // nan/infinite
          return true;
        }
        else if (rhs.right.type === 'Identifier' && rhs.right.name === varName && AST.isNumberLiteral(rhs.left)) {
          step = (rhs.operator === '-' ? -1 : 1) * AST.getPrimitiveValue(rhs.left);
          if (!isFinite(step)) return false; // nan/infinite
          return true;
        }
        else {
          return false; // Only allow assignments of numerics and the one self-updater
        }
      }
      if (!AST.isNumberLiteral(rhs)) return false;
      assigns.push(AST.getPrimitiveValue(rhs)); // We can't check this yet
    })) return;
    if (initial === undefined) return;

    // Search for the range check. Make sure there is only one
    if (!meta.reads.every(read => {
      if (read.parentNode.type === 'BinaryExpression') {
        if ('<=>='.includes(read.parentNode.operator)) {
          if (boundsRead) {
            todo('can we support multi range check on variable and still assert bounds?');
            return false;
          }
          const lhs = read.parentNode.left;
          const rhs = read.parentNode.right;
          if (lhs === read && AST.isNumberLiteral(rhs)) {
            boundsValue = AST.getPrimitiveValue(rhs);
            boundsRead = read;
            return true;
          }
          if (rhs === read && AST.isNumberLiteral(lhs)) {
            boundsValue = AST.getPrimitiveValue(lhs);
            boundsRead = read;
            return true;
          }
          // Since this is a range check on this read, it must mean the other arg was not a numeric literal. we must bail now.
          return false;
        }
        // Ignore other binary expressions
        return true;
      }
      // Ignore other expressions
      return true;
    })) return;
    if (!boundsRead) return false;

    // We must now have a range check in boundsRead, a min/max value, a self-increment, a step, and all assigns.
    vlog('- Bounds check for', varName,': initial=', initial, ', bounds:', boundsValue, ', step:', step);

    // Now verify that the mutation happens inside the range check
    // `if (x < 100) x = x + 1;` not `x = x + 1; if (x < 100) ...`
    // The bounds check ought to be stored in a var. We'll require it to be fresh for now but (TODO) we can probably work with lets too.
    // This var must be the test of an `if` and all other reads should happen in one branch or the other (but not both).
    // Those constraints may be eased later. For now that is the target pattern.
    const decl = boundsRead.blockBody[boundsRead.blockIndex];
    if (decl.type !== 'VarStatement') return;
    if (decl.kind !== 'const') return;
    const rangeCheckName = decl.id.name;
    const rangeCheckMeta = fdata.globallyUniqueNamingRegistry.get(rangeCheckName);
    if (rangeCheckMeta.reads.length !== 1) return; // Expecting `const tmp = x < 100; if (tmp)` sort of struct. One read.
    const ifStmt = rangeCheckMeta.reads[0].parentNode;
    if (ifStmt.type !== 'IfStatement') return;
    if (rangeCheckMeta.reads[0].parentProp !== 'test') return;
    // All reads must be in one branch of this `if`
    const start = ifStmt.consequent.$p.npid;
    const mid = ifStmt.alternate.$p.npid;
    const end = ifStmt.$p.lastPid;
    let dir = undefined;
    if (!meta.reads.every(read => {
      if (read === boundsRead) return true;
      const pid = read.node.$p.npid
      if (pid > start && pid < mid) {
        if (dir === false) return false; // Already saw a read in the else-branch
        dir = true;
        return true;
      }
      if (pid > mid && pid <= end) {
        if (dir === true) return false; // Already saw a read in the then-branch
        dir = false;
        return true;
      }
      return false; // saw a pid outside of this `if`-node
    })) return;

    // One last thing; confirm the step goes in the correct direction
    if (initial - boundsValue > 0 && step > 0) return false; // bound is under the initial but the value only goes up
    else if (initial - boundsValue < 0 && step < 0) return false; // bound is above the initial but the value only goes down
    // There is an initial==boundsvalue case but I thiiiink it's not an issue here? The first check will immediately fail in that case.

    vlog('- I think we have now proven that', varName, 'is bound between', initial, 'and', boundsValue, 'with a step of', step);
    meta.isRangeBound = true;
    meta.rangeMin = Math.min(initial, boundsValue);
    meta.rangeMax = Math.max(initial, boundsValue);
    meta.rangeStep = step;
  });

  const now = Date.now();
  group('Walking AST to collect func call arg types...');
  walk(_callWalker, ast, 'ast');
  groupEnd();
  log('Walked AST to collect func call arg types', Date.now() - now, 'ms');

  const mone = enableTiming && performance.now();
  TIMING.one = mone - minit;

  // Remove any funcs when we know we won't discover its callerArgs
  calledMetas.forEach((arrArgs, calleeMeta) => {
    if (calleeMeta.callerArgs) {
      // Already set. Must mean it's failed. Remove this call.
      calledMetas.delete(calleeMeta);
      return;
    }
    if (!calleeMeta.varDeclRef) {
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

  const mtwo = enableTiming && performance.now();
  TIMING.two = mtwo - mone;

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
      const isVar = !isAssign && read.parentNode.type === 'VarStatement' && read.parentProp === 'init';

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

  const mthree = enableTiming && performance.now();
  TIMING.three = mthree - mtwo;

  vlog('');
  vgroup('Trying to resolve a mustBeType for', untypedVarDecls.size, 'var decls, ', funcNodesForSomething.size, 'funcs, and the callerArgs for', calledMetas.size, 'funcs');
  let typingUpdated = 0;
  let typingChanged = true;
  let loopi = 0;
  while (typingChanged && untypedVarDecls.size) {
    typingChanged = false;
    vgroup('typingLoop', loopi++,';', untypedVarDecls.size, 'vars and', funcNodesForSomething.size, 'funcs left');

    vgroup(untypedVarDecls.size, 'const decl types to discover');
    let cdi = 0;
    untypedVarDecls.forEach((untypedObj) => {
      const {node, meta} = untypedObj;
      const name = node.id.name;
      vgroup('-- decl', cdi++, '::', [name], ', mustBeType:', [meta.typing?.mustBeType, meta.typing?.mustBePrimitive]);
      if (!meta.typing?.mustBeType || meta.typing?.mustBeType === 'primitive') {
        untypedCheck(untypedObj, node, meta, name)
      } else {
        vlog('- already has a concrete mustBeType:', meta.typing.mustBeType)
      }
      vgroupEnd();
    });
    vgroupEnd();

    function untypedCheck(untypedObj, node, meta, name) {
      // Note: deal with lets properly. That's not just this init.
      let newTyping = getCleanTypingObject();
      let firstVisibleWrite;
      let firstVisibleNode;
      const skipInit = meta.isTernaryConst && meta.writes.length === 3;
      if (skipInit) {
        vlog('This is a ternaryConst with 3 writes, which means that the first write is not observable. We should ignore it for typing.');
        firstVisibleWrite = meta.writes[1];
        ASSERT(firstVisibleWrite.kind === 'assign', 'part of ternaryconst assert');
        firstVisibleNode = firstVisibleWrite.parentNode.right;
      } else {
        firstVisibleNode = node.init;
      }
      vlog('++ Now processing all writes', meta.singleScoped);
      meta.writes.forEach((write,i) => {
        // if (meta.singleScoped && write.reachedByReads.size === 0) return vlog('- write', i, ': Skipping; it is not reachable');
        if (skipInit && write.kind === 'var') return vlog('- write', i, ': Skipping; ternary const that ignores init');
        const lhs = write.kind === 'var' ? write.parentNode.id : write.parentNode.left;
        const rhs = write.kind === 'var' ? write.parentNode.init : write.parentNode.right;
        // if (rhs.type === 'Identifier') {
        //   let notyet = false;
        //   untypedVarDecls.forEach(obj => {
        //     if (rhs.name === obj.node.id.name) notyet = true;
        //   })
        //   if (notyet) return vlog('  - rhs', rhs.name, 'is not yet resolved so skip it for now');
        // }
        vgroup('- write', i, ':', write.kind, write.parentNode.type, lhs.name, rhs.name);
        const rhsTyping = inferNodeTyping(fdata, rhs, true);
        vlog('Merging rhs typing with binding;', write.parentNode.type, lhs.name ?? '<lhs not ident>', rhs.name ?? '<rhs not ident>', rhsTyping);
        mergeTyping(rhsTyping, newTyping);
        vlog('newTyping for', lhs.name, 'now:', newTyping);
        vgroupEnd();
      });

      if (
        !newTyping?.mustBeType &&
        firstVisibleNode.type === 'MemberExpression' &&
        firstVisibleNode.object.type === 'Identifier' &&
        AST.isNumberLiteral(firstVisibleNode.property)
      ) {
        // `const x = arr[100]`
        vlog('Special array access check for var that has unknown typing but is assigned a number computed prop of an ident');
        // valueNode is a computed member expression.
        // If the object is an array and we can assert the array only contains primitives
        // and we can assert the array cannot get other types then ... it must be a primitive?
        const meta = fdata.globallyUniqueNamingRegistry.get(firstVisibleNode.object.name);
        vlog('- The object of the member expression mustBeType', meta.typing.mustBeType);
        if (meta.typing.mustBeType === 'array') {
          // Must verify that the array only contains primitives and doesn't escape
          if (!meta.isConstant) vlog('- is not a var decl');
          else if (meta.isImplicitGlobal) vlog('- is an implicit global');
          else if (meta.isBuiltin) vlog('- is builtin');
          else if (meta.varDeclRef.node.type !== 'ArrayExpression') vlog('- init of obj ident is not an array expression');
          else if (!meta.varDeclRef.node.elements.every(e => !e || AST.isPrimitive(e))) vlog('- array does not only contain primitives');
          else if (meta.writes.length !== 1) vlog('- array ref has multiple writes');
          else {
            vgroup('Checking all reads of this array ref for escape analysis');
            const escapes = meta.reads.some(read => {
              // Confirm this is not a method call
              // If this is the lhs of an assignment, confirm that the rhs is a primitive
              vlog('- read:', meta.reads.length, read.grandNode.type, read.grandProp, read.parentNode.type, read.parentProp, meta.uniqueName);
              if (read.grandNode.type === 'CallExpression') return true;
              if (read.grandNode.type === 'AssignmentExpression' && read.grandProp === 'left') {
                let ok = true;

                if (AST.isPrimitive(read.grandNode.right)) ok = false;
                else if (read.grandNode.right.type === 'Identifier') {
                  const rhsMeta = fdata.globallyUniqueNamingRegistry.get(firstVisibleNode.object.name);
                  if (PRIMITIVE_TYPE_NAMES_PREVAL.has(rhsMeta.typing.mustBeType)) ok = false;
                }
                if (!ok) return true;

                // So this was an assignment to an array prop and the rhs was a primitive.. should be good?
                return false;
              }
              if (read.grandNode.type === 'AssignmentExpression' && read.grandProp === 'right') {
                // Should be fine to assign, that's just a read
                return false;
              }
              if (read.grandNode.type === 'VarStatement') {
                // init of var decl is ok
                return false;
              }
              if (read.grandNode.type === 'ExpressionStatement') {
                // I guess this can happen. If it's fine to assign then it's fine to not assign.
                return false;
              }
              todo(`How else are member expressions used in normalized code? ${read.grandNode.type}`, read.grandNode);
              return true;
            });
            vgroupEnd();
            vlog('- Escape analysis verdict:', escapes);
            if (!escapes) {
              // Seems the array must contain primitives? Only mutations are writes to properties and those are assigned primitives too.
              // This must mean the array can only contain primitives (or the default undefined, which is a primitive too)
              // So it should be safe to assert the result of reading a computed number prop from the array results in a primitive of sorts.
              vlog('- Numbered computed property on an array that doesnt escape and only contains primitives; must be primitive');
              newTyping.mustBeType = 'primitive';
              newTyping.mustBePrimitive = true;
            }
          }
        } else {
          vlog('- is not an array');
        }
      }

      // If we don't have a concrete type here, try to detect and cover the "array pump" trick.
      // To cover this we only care whether the array consists of primitives or not.
      if (
        meta.typing.mustBeType !== 'primitive' &&
        !newTyping?.mustBeType &&
        firstVisibleNode.type === 'CallExpression' &&
        firstVisibleNode.callee.type === 'Identifier' &&
        firstVisibleNode.callee.name === SYMBOL_DOTCALL &&
        [
          symbo('array', 'shift'),
          symbo('array', 'pop'),
        ].includes(firstVisibleNode.arguments[0].name)
      ) {
        vlog('- Trying pump detection to recover...');
        // The pop/shift does not add types to the array (may remove one if it's the last)
        // We need to verify;
        // - the written value is an array expression
        // - the array does not escape (we cannot allow untracked mutations)
        // - the types of elements in the array are primitives
        // - tye types of elements in the array can not become non-primitives
        //   - to this end we need to check every read of the array
        //   - all property reads are fine on their own
        //   - deleting a property is fine, this can not cause the array to contain non-primitives suddenly
        //   - method calls need to be validated
        //     - in particular, push/unshift need to be validated
        //       - every arg of these methods needs to be
        //         - primitive, or
        //         - an ident that mustBePrimitive, or
        //         - an ident that is the result of pop/shift on the same array (this is the key to pump detection!)
        // (Note that we only care about primitive because arrays may always produce undefined, so there's no real point
        // in tracking anything other than "primitive".)

        const ctxNode = firstVisibleNode.arguments[1];
        if (ctxNode.type !== 'Identifier') return; // This is not an array, ignore and assume the call returns unknown.
        const arrMeta = fdata.globallyUniqueNamingRegistry.get(ctxNode.name);
        if (!arrMeta.isConstant || arrMeta.writes.length !== 1) return; // bail: can only deal with constant arrays. TODO: i mean, why not..?
        if (arrMeta?.typing.mustBeType !== 'array') return; // failure, assume the call returns unknown

        if (arrMeta.varDeclRef.node?.type !== 'ArrayExpression') {
          // Maybe we can support this by following an alias or .slice or whatever. For now we bail.
          todo(`can we support this edge case of array pump? ${arrMeta.varDeclRef.node?.type}`);
          return vlog('- bail: weird but the array init was not an array expr');
        }

        if (!arrMeta.varDeclRef.node.elements.every(enode => {
          if (!enode) return true;
          if (AST.isPrimitive(enode)) return true;
          const eMeta = fdata.globallyUniqueNamingRegistry.get(enode.name);
          if (eMeta?.typing.mustBePrimitive) return true; // ok
          return false;
        })) {
          return vlog('- bail: array was not just primitives');
        }

        vlog('- Passed array structure pump checks, now verifying array usage...');

        // Verify the array never escapes, verify all property assignments
        // Note: since mustBeType is array, we can skip the writes
//TODO // cache the result on arrMeta (or the const $p)
        const mustReturnPrimitive = arrMeta.reads.every(read => {
          switch (read.parentNode.type) {
            case 'CallExpression': {
              if (read.parentNode.callee.type !== 'Identifier' || read.parentNode.callee.name !== SYMBOL_DOTCALL) {
                vlog('- bail: at least one usage in a func call that was not a dotcall');
                return false;
              }
              if (read.parentProp !== 'arguments') {
                vlog('- bail: calling the array?');
                return false;
              }
              if (read.parentIndex !== 1) {
                vlog('- bail: array is not the context but an actual arg');
                return false;
              }
              if (read.parentNode.arguments[0].type !== 'Identifier') {
                vlog('- bail: not dotcalling an ident?');
                return false;
              }
              // So this read is a dotcall with the array as context. We must do some more deep validation here next:
              switch (read.parentNode.arguments[0].name) {
                case symbo('array', 'push'):
                case symbo('array', 'unshift'): {
                  // Verify all the elements being pushed in are primitives
                  // In this case we must follow idents too to cover the array pump trick
                  if (read.parentNode.arguments.slice(3).some(anode => {
                    if (AST.isPrimitive(anode)) return false;
                    if (anode.type !== 'Identifier') return true;
                    const aMeta = fdata.globallyUniqueNamingRegistry.get(anode.name);
                    if (aMeta?.typing.mustBePrimitive) return false; // ok
                    // If this is a constant that is the result of pop/shifting the same array, then we are still good!
                    // This last grasp is necessary to break the chicken-egg circular typing of a pump.
                    if (aMeta.isConstant && aMeta.writes.length === 1) {
                      const init = aMeta.varDeclRef.node;
                      if (
                        init?.type === 'CallExpression' &&
                        init.callee.type === 'Identifier' &&
                        init.callee.name === SYMBOL_DOTCALL &&
                        init.arguments[0].type === 'Identifier' &&
                        init.arguments[1].type === 'Identifier' &&
                        init.arguments[1].name === ctxNode.name &&
                        [
                          symbo('array', 'shift'),
                          symbo('array', 'pop'),
                        ].includes(init.arguments[0].name)
                      ) {
                        vlog('- still ok; this var is the result of pop/shifting the same array');
                        return false;
                      }
                    }
                    return false; // unable to verify the type to be a primitive
                  })) {
                    vlog('- bail: at least one arg push/unshifted is not a primitive');
                    return false;
                  }
                  // This push/unshift only pushes primitives. We don't really care about the concrete primitive here.
                  return true;
                }
                case symbo('array', 'pop'):
                case symbo('array', 'shift'): {
                  // These methods can not _add_ a new type to the array
                  // At most they can empty the array and remove the last non-undefined type, which is ok
                  return true;
                }
                default: {
                  todo(`phase1_1 support this array method call? ${read.parentNode.arguments[0].name}`)
                }
              }
              return false;
            }
            case 'MemberExpression': {
              if (read.parentNode.computed) {
                if (read.grandNode.type === 'AssignmentExpression' && read.grandProp === 'left') {
                  // Assignment to property
                  if (AST.isNumberLiteral(read.parentNode.property)) {
                    // need to validate the rhs type
                    const rhs = read.grandNode.right;

                    if (AST.isPrimitive(rhs)) return true; // Assigning primitive to index property is fine
                    if (rhs.type !== 'Identifier') return true; // What the heck are we assigning here
                    const aMeta = fdata.globallyUniqueNamingRegistry.get(rhs.name);
                    return !!aMeta?.typing.mustBePrimitive; // If we are assigning a primitive we're okay. Otherwise we're not.
                  } else {
                    vlog('- bail: assignment to computed prop may be an index prop which may add a new type');
                    return false;
                  }
                } else {
                  // Either assignment of the property value, or something else entirely.
                  // I think this is okay? It cannot be a call anymore and we can ignore delete here.
                  // So I think this is a regular property read which cannot change the type of the array.
                  return true;
                }
              } else {
                return true; // I think assignment to any static property cannot change the array subtype?
              }
            }
            case 'AssignmentExpression': {
              vlog('- bail: array escapes in an alias');
              return false;
            }
            default: {
              todo(`${read.parentNode.type}; how else might an array be used that we may want to support in phase1_1?`)
              return false;
            }
          }
        });

        vlog('- Must return primitive?', mustReturnPrimitive);

        if (mustReturnPrimitive) {
          vlog('- confirmed that the pop/shift must return a primitive');
          meta.typing.mustBeType = 'primitive';
          meta.typing.mustBePrimitive = true;
          typingChanged = true;
          typingUpdated += 1;
          // Primitive is better than nothing but we'd still like to get to a more concrete type if we can.
          return;
        }


        // Does not change type of array elements
        // (Ok, if it removes the last element it may remove a type, which is fine here)
        vlog('- postponing type; this is a array_shift/array_pop which does not change the array');
        return;
      }

      ASSERT(newTyping?.mustBeType === 'primitive' ? newTyping.mustBePrimitive : true, 'if mustbetype is primitive then isprimitive must be set too', newTyping);
      if (newTyping?.mustBeType && newTyping.mustBeType !== 'primitive') {
        vlog('  - We have a mustBeType (', newTyping.mustBeType, '), typingChanged=true');
        meta.typing = newTyping; // Is there any reason we shouldn't overwrite it anyways? It may have discovered other typing things?
        typingChanged = true;
        typingUpdated += 1;
        untypedVarDecls.delete(untypedObj);
      }
      else if (newTyping?.mustBePrimitive && !meta.typing?.mustBePrimitive) {
        vlog('  - We have a mustBePrimitive, typingChanged=true');
        meta.typing = newTyping; // Is there any reason we shouldn't overwrite it anyways? It may have discovered other typing things?
        typingChanged = true;
        typingUpdated += 1;
        // Primitive is better than nothing but we'd still like to get to a more concrete type if we can
        //untypedConstDecls.delete(obj); // Don't delete. Maybe we can push it further to the concrete primitive type.
      }
      vlog('---- Typing:', meta.typing.mustBeType, meta.typing.mustBePrimitive);
    }

    vgroup(funcNodesForSomething.size, 'function return types to discover');
    let fni = 0;
    funcNodesForSomething.forEach((obj) => {
      const {funcName, funcNode, funcMeta, parentNode} = obj;
      vlog('-- func', fni++, ';', [funcName]);

      const rightnow = new Set(funcNode.$p.returnNodes?.map(returnNode => {
        const arg = returnNode.argument;
        if (AST.isPrimitive(arg)) return AST.getPrimitiveType(arg);
        ASSERT(arg.type === 'Identifier', 'return node arg should be identifier in normalized code');
        const argMeta = getMeta(arg.name, fdata);

        // Edge case: recursion. We can ignore cases of recursive calls as they should not change
        //            the return type of themselves. This breaks a chicken-egg problem. Bit annoying.
        // So we are going to check whether the var is a const and the init is the result of
        // calling this same function. Provided it was const too. Otherwise ignore this edge case.
        if (
          funcMeta.isConstant &&
          funcMeta.writes.length === 1 &&
          funcMeta.writes[0].kind === 'var' &&
          argMeta.isConstant &&
          argMeta.writes.length === 1 &&
          argMeta.writes[0].kind === 'var' &&
          argMeta.writes[0].parentNode.init.type === 'CallExpression' &&
          argMeta.writes[0].parentNode.init.callee.type === 'Identifier' &&
          argMeta.writes[0].parentNode.init.callee.name === funcName
        ) {
          vlog('Found a recursion edge case; this return can not change the return type of the func');
          return true; // Special symbol to filter on?
        }

        if (argMeta.typing?.mustBeType) return argMeta.typing.mustBeType;
        else if (argMeta.typing?.mustBePrimitive) return 'primitive';
        return undefined;
      }).filter(wasRecursion => wasRecursion !== true));

      let types =
        rightnow.size === 0
        ? undefined
        : rightnow.size === 1
        ? Array.from(rightnow)[0]
        : Array.from(rightnow).every(type => PRIMITIVE_TYPE_NAMES_PREVAL.has(type))
        ? 'primitive'
        : false;

      vlog('  - types:', types);
      if (!types) {
        vlog('No types, no change');
      }
      else if (!funcMeta.typing.returns) {
        vlog('Have types now where we had none before, this must be an improvement, typingChanged = true');
        typingChanged = true;
        typingUpdated += 1;
        funcMeta.typing.returns = types;
      }
      else if (types === '?') {
        // Return type is not settled yet
        funcMeta.typing.returns = types; // This is always the current status quo, so always update it.
        vlog('  - Has an unknown type :(');
      }
      else if (types === 'primitive' && funcMeta.typing.returns !== 'primitive') {
        vlog('The new types have no unknowns and no "primitive" while the old types did so this must be an improvement, typingChanged = true');
        typingChanged = true;
        typingUpdated += 1;
        funcMeta.typing.returns = types;
      }
      else if (types === 'primitive') {
        vlog('The new types have a "primitive" while the old types did not, this is worse, discarding result, no change.');
      }
      else if (!funcMeta.typing.returns || funcMeta.typing.returns === 'primitive') {
        vlog('The old types had unknown or "primitive" and the new one did not so this must be better, typingChanged = true');
        typingChanged = true;
        typingUpdated += 1;
        funcMeta.typing.returns = types;
      }
      else {
        vlog('No change or no improvement');
      }
    });
    vgroupEnd();

    vgroup(calledMetas.size, 'functions to process calls to distill param types from');
    let cmi = 0;
    calledMetas.forEach((arrArrCallArgNodes, calleeMeta) => {
      // Note: callee verified not to escape above. If it's still in the list, we should have all calls to it.
      const calleeName = calleeMeta.uniqueName;
      // Caller args is an array of mustBeTypes. If an element is `undefined` (not a string) then the param
      // is burned and we have to ignore it. If all elements are `undefined`, we can't distill any of its params
      const oldCallerArgTypes = calleeMeta.callerArgs?.slice(0);
      const oldcopy = calleeMeta.callerArgs?.slice(0);
      const oldi = calleeMeta.tmpi;

      // If an element is `false` then no type is known yet
      // If an element is `true` then we've seen an ident for it without type and we can't find a type this loop, but hopefully next. dont set to unknown.
      // If an element is `undefined` then there was a collision or unknown type and we give up
      // Otherwise, each element is a mustBeType string

      let newCallerArgTypes = new Array(calleeMeta.varDeclRef?.node.params?.length ?? arrArrCallArgNodes?.[0].length ?? 0).fill(false);
      calleeMeta.tmpi = loopi; // TODO: remove this? or keep?

      //source(calleeMeta.varDeclRef.varDeclNode, true)
      vgroup('-- func', cmi++, '. Processing all', arrArrCallArgNodes.length, 'CallExpressions for', [calleeMeta.uniqueName], ', previous callerArgs:', oldi, oldCallerArgTypes, ', starting with', newCallerArgTypes.length, 'param types');
      arrArrCallArgNodes.every((args, ci) => {
        vgroup('- Call', ci+1, '/', arrArrCallArgNodes.length, ', args:', args.map(n => n.type).join(', '), 'len now:', args.length, ', len known:', newCallerArgTypes.length);

        if (args.length < newCallerArgTypes.length) {
          vgroup('This call had fewer args than before so reducing the size of newCallerArgTypes from', newCallerArgTypes.length, 'to', args.length);
          for (let i=args.length; i<newCallerArgTypes.length; ++i) {
            if (newCallerArgTypes[i] === false) {
              // resolve to 'undefined' type now
              vlog('Setting param', i, 'to "undefined"');
              newCallerArgTypes[i] = 'undefined';
            } else if (newCallerArgTypes[i] === false) {
              vlog('Ignoring param', i, 'because it was set to "true"');
            } else if (newCallerArgTypes[i] !== 'undefined') {
              // colliding types for param
              if (PRIMITIVE_TYPE_NAMES_PREVAL.has(newCallerArgTypes[i])) {
                if (newCallerArgTypes[i] === 'primitive') {
                  vlog('Param', i, 'has colliding types ( "undefined" !== ', newCallerArgTypes[i], ') but both primitives, already primitive, no change');
                } else {
                  vlog('Param', i, 'has colliding types ( "undefined" !== ', newCallerArgTypes[i], ') but both primitives, setting to primitive, change');
                  newCallerArgTypes[i] = 'primitive';
                }
              } else {
                vlog('Param', i, 'has colliding types ( "undefined" !== ', newCallerArgTypes[i], '), setting to undefined');
                newCallerArgTypes[i] = undefined;
              }
            }
          }
          vgroupEnd();
        }

        // Note: function escape analysis happens in the next block. Here we just track calls, regardless.
        vgroup(args.length ? 'Now processing args (' + args.length + 'x):' : 'No further args to process for this call instance');
        args.forEach((anode, i) => {
          if (newCallerArgTypes[i] === undefined) {
            // unable to do this param
            vlog('Param', i, '; already undefined, skipping to next');
            return;
          }
          if (newCallerArgTypes[i] === true) {
            // unable to do this param this round because there's an unresolved ident
            vlog('Param', i, '; already undefined, skipping to next');
            return;
          }

          // Note: inferNodeTyping will not skip idents now (only does that in normalization/phase1)
          if (AST.isPrimitive(anode)) {
            const seen = AST.getPrimitiveType(anode);
            if (newCallerArgTypes[i] === false) {
              vlog('Param', i, '; setting to', seen);
              newCallerArgTypes[i] = seen;
            } else if (seen !== newCallerArgTypes[i]) {
              if (PRIMITIVE_TYPE_NAMES_PREVAL.has(seen) && PRIMITIVE_TYPE_NAMES_PREVAL.has(newCallerArgTypes[i])) {
                if (newCallerArgTypes[i] === 'primitive') {
                  vlog('Param', i, 'has colliding types (', seen, ' !== ', newCallerArgTypes[i], ') but both primitives, already primitive, no change');
                } else {
                  vlog('Param', i, 'has colliding types (', seen, ' !== ', newCallerArgTypes[i], ') but both primitives, setting to primitive, change');
                  newCallerArgTypes[i] = 'primitive';
                }
              } else {
                vlog('Param', i, 'has colliding types (', seen, ' !== ', newCallerArgTypes[i], '), setting to undefined');
                newCallerArgTypes[i] = undefined;
              }
            }
          }
          else if (anode.type === 'Identifier') {
            const argMeta = getMeta(anode.name, fdata);
            if (!argMeta.typing.mustBeType) {
              vlog('Param', i, '; ident', [anode.name], 'has no mustBeType, unable to resolve param');
              newCallerArgTypes[i] = true; // Mark as skip-to-next-loop
            } else if (newCallerArgTypes[i] === false) {
              vlog('Param', i,', setting to mustBeType of ident:', argMeta.typing.mustBeType);
              newCallerArgTypes[i] = argMeta.typing.mustBeType;
            } else if (argMeta.typing.mustBeType !== newCallerArgTypes[i]) {
              vlog('Param', i, '; ident had different type as seen before, too bad');
              newCallerArgTypes[i] = undefined;
            } else {
              vlog('Param', i, '; ident has same type as before, no change');
            }
          }
          else {
            const inf = inferNodeTyping(fdata, anode, true).mustBeType;
            vlog('Param', i, '; type so far:', newCallerArgTypes[i] ?? '<not yet>', ', inferred now:', JSON.stringify(inf));
            if (newCallerArgTypes[i] === undefined) {
              vlog('Param', i, '; did not have a type before, updating');
              newCallerArgTypes[i] = inf.mustBeType;
            }
            else if (newCallerArgTypes[i] !== inf.mustBeType) {
              vlog('Param', i, '; previous call had different type (', newCallerArgTypes[i], '), so burning this param index');
              newCallerArgTypes[i] = false;
            }
            else {
              // same type, no change
              vlog('Param', i, '; assigned same type as seen before, no change');
            }
          }
        });
        vgroupEnd();
        vlog('Param types after processing all calls:', newCallerArgTypes, ', was:', oldCallerArgTypes);

        vgroupEnd();
        return true;
      });
      vlog('All calls for this function processed');
      vgroupEnd();


      newCallerArgTypes.forEach((t,i) => {
        if (t === true) newCallerArgTypes[i] = false;
      });

      if (!calleeMeta.callerArgs) {
        vlog('Had no param typing before, using it now;', newCallerArgTypes, ', typingChanged = true');
        calleeMeta.callerArgs = newCallerArgTypes;
        typingChanged = true;
        typingUpdated += 1;
      } else {
        if (JSON.stringify(calleeMeta.callerArgs) !== JSON.stringify(newCallerArgTypes)) {
          vlog('The callerArgs resolved differently, updating, typingChanged = true');
          calleeMeta.callerArgs = newCallerArgTypes;
          typingChanged = true;
          typingUpdated += 1;
        } else {
          vlog('Looks like no param types changed, no change');
        }
      }
    });
    vgroupEnd();

    vlog('');
    vgroup('Applying type information to params such that hopefully next loop more stuff is discovered');
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
        if (m.typing.mustBeType === funcMeta.callerArgs[i]) {
          vlog('  - param', i, '(', paramName, '); discovered type was same as before; no change');
        }
        else if (m.typing.mustBeType === undefined) {
          // Not yet determined so now we do
          vlog('  - param', i, '(', paramName, '); Ok! Had no type before, marking param as:', funcMeta.callerArgs[i], ', writes:', m.writes.length);
          m.typing.mustBeType = funcMeta.callerArgs[i];
          if (['object', 'array', 'regex', 'function', 'class'].includes(funcMeta.callerArgs[i])) m.typing.mustBeTruthy = true;
          else if (PRIMITIVE_TYPE_NAMES_PREVAL.has(funcMeta.callerArgs[i])) m.typing.mustBePrimitive = true;
        }
        else if (m.typing.mustBeType === false) {
          vlog('  - param', i, '(', paramName, '); Couldnt figure it out before so copy what we found now:', funcMeta.callerArgs[i]);
          m.typing.mustBeType = funcMeta.callerArgs[i];
          if (['object', 'array', 'regex', 'function', 'class'].includes(funcMeta.callerArgs[i])) m.typing.mustBeTruthy = true;
          else if (PRIMITIVE_TYPE_NAMES_PREVAL.has(funcMeta.callerArgs[i])) m.typing.mustBePrimitive = true;
        }
        else if (PRIMITIVE_TYPE_NAMES_PREVAL.has(funcMeta.callerArgs[i])) {
          if (PRIMITIVE_TYPE_NAMES_PREVAL.has(m.typing.mustBeType)) {
            // If it _was_ already a primitive type
            // We conclude a primitive but the type was more narrow or different.
            // Demote type to a generic primitive. Clear anything else we may know about the type.
            vlog('  - param', i, '(', paramName, '); Caller arg was determined to some sort of primitive but different than we found now, demote to primitive');
            const updated = createTypingObject({
              mustBeType: 'primitive',
              mustBePrimitive: true,
            });
            mergeTyping(updated, m.typing);
            todo('Record this phase1.1 as a test case, please (A)');
          }
          else {
            ASSERT(m.typing.mustBeType !== funcMeta.callerArgs[i], 'we found some kind of primitive but before we had a non-primitive', m.typing.mustBeType, funcMeta.callerArgs[i]);
            // If it _was_ determined to be a different type (but not primitive cause thats checked above)
            // It was determined but different from this information. Not sure how I feel about that...
            // This does happen legit when there's an assignment to the param, so that can happen.
            vlog('  - param', i, '(', paramName, '); Caller arg was', funcMeta.callerArgs[i], 'but mustBeType was already set to', m.typing.mustBeType, '; setting it to false now');
            ASSERT(m.writes.length > 1, 'this is a bad omen. unless the param was assigned to, it means the heuristic was incorrect...', m.typing.mustBeType, funcMeta.callerArgs[i]);
            m.typing.mustBeType = false;
            todo('Record this phase1.1 as a test case, please (B)');
          }
        } else {
          ASSERT(m.typing.mustBeType !== funcMeta.callerArgs[i], 'we found some kind of non-primitive and before we had a non-primitive', m.typing.mustBeType, funcMeta.callerArgs[i]);
          vlog('  - param', i, '(', paramName, '); Caller arg was same type as already known:', m.typing.mustBeType);
          m.typing.mustBeType = false;
          todo('Record this phase1.1 as a test case, please (C)');
        }
      });
    });
    vlog('Updated param types in', Date.now() - now2, 'ms');
    vgroupEnd();

    vgroupEnd(); // typingloop
  }
  vlog('All typing settled now..., updated', typingUpdated, 'times. Still have', untypedVarDecls.size, 'decls without a mustBeType, sadge');
  vgroupEnd();

  const mfour = enableTiming && performance.now();
  TIMING.four = mfour - mthree;

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
      else if (m.typing.mustBeType === funcMeta.callerArgs[i]) {
        vlog('  - param', i, '(', paramName, '); discovered type was same as before; no change');
      }
      else if (m.typing.mustBeType === undefined) {
        // Not yet determined so now we do
        vlog('  - param', i, '(', paramName, '); Ok! Marking param as:', funcMeta.callerArgs[i], ', writes:', m.writes.length);
        m.typing.mustBeType = funcMeta.callerArgs[i];
        if (['object', 'array', 'regex', 'function', 'class', 'promise'].includes(funcMeta.callerArgs[i])) m.typing.mustBeTruthy = true;
        else if (PRIMITIVE_TYPE_NAMES_PREVAL.has(funcMeta.callerArgs[i])) m.typing.mustBePrimitive = true;
      }
      else if (m.typing.mustBeType === false) {
        vlog('  - param', i, '(', paramName, '); Couldnt figure it out before so copy what we found now:', funcMeta.callerArgs[i]);
        m.typing.mustBeType = funcMeta.callerArgs[i];
        if (['object', 'array', 'regex', 'function', 'class', 'promise'].includes(funcMeta.callerArgs[i])) m.typing.mustBeTruthy = true;
        else if (PRIMITIVE_TYPE_NAMES_PREVAL.has(funcMeta.callerArgs[i])) m.typing.mustBePrimitive = true;
      }
      else if (m.typing.mustBeType === 'primitive' && PRIMITIVE_TYPE_NAMES_PREVAL.has(funcMeta.callerArgs[i])) {
        // Ok, keep it.
        vlog('  - param', i, '(', paramName, '); Caller arg was some kind of primitive and mustBeType already set to "primitive"; noop');
      }
      else if (funcMeta.callerArgs[i] === 'primitive' && PRIMITIVE_TYPE_NAMES_PREVAL.has(m.typing.mustBeType)) {
        // Demote type to a generic primitive. Clear anything else we may know about the type.
        vlog('  - param', i, '(', paramName, '); Caller arg was a primitive while arg was but mustBeType was set to', m.typing.mustBeType, '; demoting it to a primitive');
        const updated = createTypingObject({
          mustBeType: 'primitive',
          mustBePrimitive: true,
        });
        mergeTyping(updated, m.typing);
        todo('Record this phase1.1 as a test case, please (D)');
      }
      else {
        // It was determined but different from this information. Not sure how I feel about that...
        // This does happen legit when there's an assignment to the param, so that can happen.
        ASSERT(m.typing.mustBeType !== funcMeta.callerArgs[i], 'not a primitive, not the same, was already found, so must be inequal', m.typing.mustBeType, funcMeta.callerArgs[i]);
        ASSERT(m.writes.length > 1, 'this is a bad omen. unless the param was assigned to, it means the heuristic was incorrect...');
        vlog('  - param', i, '(', paramName, '); Caller arg was', funcMeta.callerArgs[i], 'but mustBeType was already set to', m.typing.mustBeType, '; setting it to false now');
        m.typing.mustBeType = false;
      }
    });
    vlog('- Caller args after update:', funcMeta.callerArgs);
  });
  log('Walked AST to type params, in', Date.now() - now2, 'ms');
  groupEnd();

  const mfive = enableTiming && performance.now();
  TIMING.five = mfive - mfour;

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

  const msix = enableTiming && performance.now();
  TIMING.six = msix - mfive;

  assertNoDupeNodes(ast, 'body');

  setVerboseTracing(tracingValueBefore);

  fdata.globallyUniqueNamingRegistry.forEach(meta => {
    ASSERT(meta.typing.mustBeType === false || !PRIMITIVE_TYPE_NAMES_PREVAL.has(meta.typing.mustBeType) === !meta.typing.mustBePrimitive, 'if it must be a primitive then mustbeprimitive', meta, meta.typing.mustBeType === false, meta.typing.mustBeType, !!PRIMITIVE_TYPE_NAMES_PREVAL.has(meta.typing.mustBeType), !!meta.typing.mustBePrimitive);
  });

  log('\n\nEnd of phase 1.1, walker took', Date.now() - start, 'ms');

  groupEnd();

  if (enableTiming) {
    const mseven = performance.now();
    TIMING.seven = mseven - msix;
    console.log(DIM + 'Phase1.1 timing:', JSON.stringify(TIMING).replace(/"|\.\d+/g, '').replace(/(:|,)/g, '$1 '), RESET);
  }
}

function isTernaryPattern(varDeclNode, meta) {
  // This function is sound (if it returns true, it must be correct), but not complete (won't always return true when it should)
  // When it returns true, it guarantees all reads always return the same value, considered constant for most intentions and purposes.

  // A binding is a "ternary constant" if is a let that is assigned to once or twice, each assignment in different branches
  // of the same `if` node. There's three variations; three writes (var, assign in either branch), and two writes (var init
  // and a write in one branch or the other).
  // An important property is that under no circumstance a read may see a different value of the binding in the same run.
  // eg. `let x = 1; x; if (a) x = 2; x` now x is observed with different values twice. However, `let x = 1; if (a) x = 2; else x; x;`
  // now x is never observed differently, no matter the value of `a`. When `a` is true, x will only be seen as `2` once,
  // and otherwise `x` is observed as 1 twice. But never as a different value.
  //
  // This property is important and easy to check for single scoped vars while difficult to prove for multi scoped vars.
  // For multi scoped we have to prove that there are no observable side effects that may observe the binding before it's
  // "sealed" into its final value. We can only do some heuristics but we'll never catch all cases around this.
  //
  // Another property is that the writes must occur in unique branches of an `if` node. Due to the nature of the AST we
  // can't easily navigate from the assign back to the decl so we have to do some guess work here.
  // To begin with we are going to serach for an `if`, starting at the var decl. We'll bail if there's no `if` following
  // the var decl in the same body.

  if (!meta.singleScoped) return; // Multi scoped is much harder to do. Bail on it for now.
  if (meta.writes.length < 2) return; // Must have two or three writes
  if (meta.writes.length > 3) return; // Not our pattern. TODO: we could catch more cases like this that use nested ternaries but it gets harder.
  if (!meta.reads.length) return; // essentially dead code

  const varWrite = meta.writes[0];
  if (varWrite.kind !== 'var') return;

  if (varWrite.parentNode.kind !== 'let') return;
  const varNode = varWrite.blockBody[varWrite.blockIndex];

  if (meta.rwOrder[0] !== varWrite) return; // we can't assert the first or second assign as easily.

  const firstAssign = meta.writes[1];
  if (firstAssign.kind !== 'assign') return; // dont think this can happen but ok

  const firstNode = firstAssign.blockBody[firstAssign.blockIndex];
  const firstPid = firstNode.$p.npid;

  // Find the node that contains the write.
  vlog('Searching for firstAssign pid @', firstPid, ', var decl @', varNode.$p.npid, '(note: we are looking for PREV here!)');
  let ifNode;
  let prevPid = varNode.$p.npid;
  // Note: +2 because we lookahead and then walk one back.
  for (let i=varWrite.blockIndex+2; i<varWrite.blockBody.length; ++i) {
    const stmt = varWrite.blockBody[i];
    const stmtPid = stmt.$p.npid;
    vlog('-', i, ';', stmt.type, '(', firstPid, '>=', prevPid, '&&', firstPid, '<', stmtPid, ')');
    if (firstPid >= prevPid && firstPid < stmtPid) {
      // write must exist in prev statement, which must exist (and shouldn't really be the var decl itself)
      const prev = varWrite.blockBody[i-1];
      if (prev.type === 'IfStatement') {
        // Good.
        vlog('Found the if-node! At i=', i-1);
        ifNode = prev;
        break;
      } else {
        // It may still be nested or whatever, but we bail on that for now.
        return false;
      }
    }
    prevPid = stmtPid;
  }
  if (!ifNode) return false;

  // Now we must confirm that the binding has at most two assigns and that each assign has their own branch and that
  // there is no read prior to the assign of that branch (if there is one). If there is a second assign, it must be
  // a child of this same if-node.

  const ifBranchStart = ifNode.consequent.$p.npid;
  const ifBranchEnd = ifNode.consequent.$p.lastPid;
  const elseBranchStart = ifNode.alternate.$p.npid;
  const elseBranchEnd = ifNode.alternate.$p.lastPid;

  const read0pid = meta.reads[0].blockBody[meta.reads[0].blockIndex].$p.npid;

  if (read0pid < ifBranchStart) {
    // First read occurred before the if-consequent and since we asserted the write to be inside the if
    // this read can observe a value different from the final value. So we bail. (can also be if-test!)
    return false;
  }

  // Note: check the consequent. The if-test may read it too which would be bad too.
  if (read0pid > elseBranchEnd) {
    // This safeguards the read condition, provided the writes both occur in this if-node
    // - For the 2-write case, this is a fast safe check and we are done (we know it appears in this if-node and don't care where).
    // - For the 3-write case, we must verify that the writes appear in the proper branches first
    // - Technically, we can do this recursive for more writes (a ? b : c ? d : etc)
    if (meta.writes.length === 2) return true;
    const secondPid = meta.writes[2].blockBody[meta.writes[2].blockIndex].$p.npid;
    return firstPid > ifBranchStart && firstPid < ifBranchEnd && secondPid > elseBranchStart && secondPid < elseBranchEnd;
  }

  if (meta.writes.length === 2) {
    // In this case we must check if there's a read in the write-branch that appears before the write.
    // This does not need to be the first read, like `let a=1; if(x) { a; a } else { a=2; a; }` is fine
    // while `let a=1; if(x) { a; a } else { a; a=2; }` is bad. Check until the first ref that appears
    // after the if-node, if any.

    if (firstPid > ifBranchStart && firstPid < ifBranchEnd) {
      // Assert that no write appears between ifBranchStart and firstPid.
      // Stop search when we see a read after the firstPid (they are sequential)
      for (let i=0; i<meta.reads.length; ++i) {
        const pid = meta.reads[i].blockBody[meta.reads[i].blockIndex].$p.npid;
        ASSERT(pid > ifBranchStart, 'this was checked above and is a bad case');
        if (pid > firstPid) break;
        return false; // Bail: this read observes the binding before writing to it so different reads can have different results.
      }
      // If it reaches here it must be ok; reading this binding must yield a consistent result, no matter the branching.
      return true;
    }
    else if (firstPid > elseBranchStart && firstPid < elseBranchEnd) {
      // Basically the same as in the other branch;
      // Assert that no write appears between elseBranchStart and firstPid.
      // Stop search when we see a read after the firstPid (they are sequential)
      for (let i=0; i<meta.reads.length; ++i) {
        const pid = meta.reads[i].blockBody[meta.reads[i].blockIndex].$p.npid;
        if (pid < elseBranchStart) continue;
        if (pid > firstPid) break;
        return false; // Bail: this read observes the binding before writing to it so different reads can have different results.
      }
      // If it reaches here it must be ok; reading this binding must yield a consistent result, no matter the branching.
      return true;
    }
    else {
      ASSERT(false, 'the first pid must appear between the pid of the if-branch or the else-branch as it must appear inside this node.');
    }
    unreachable();
  } else {
    ASSERT(meta.writes.length === 3, 'checked above');

    const secondAssign = meta.writes[2];
    if (secondAssign.kind !== 'assign') return; // dont think this can happen but ok

    const secondNode = secondAssign.blockBody[secondAssign.blockIndex];
    const secondPid = secondNode.$p.npid;

    // Due to sequential nature, the first assign must be in the if-branch and the second-assign must be in the else-branch.
    if (firstPid < ifBranchStart || firstPid > ifBranchEnd) return false;
    if (secondPid < elseBranchStart || secondPid > elseBranchEnd) return false;

    // Ok, each branch has one assign. Now verify for each read to be between the first assign and if-branch-end, or simply after the second assign.
    // We can stop searching once we find a read that occurs after the if-node, because they're sequential.
    // There is no read before this if (already checked).
    for (let i=0; i<meta.reads.length; ++i) {
      const pid = +meta.reads[i].blockBody[i-1];
      if (pid > secondPid) break;
      if (pid < firstPid || pid > elseBranchStart) {
        // So in this case the read must be in the if-branch but before the first assign, or in the else-branch before the second assign.
        return false;
      }
    }
    // If it gets here then all reads are in such a way that they can never yield an inconsistent value for this binding.
    return true;
  }
}