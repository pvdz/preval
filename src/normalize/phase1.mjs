import walk from '../../lib/walk.mjs';
import { VERBOSE_TRACING, RED, BLUE, DIM, RESET, setVerboseTracing, PRIMITIVE_TYPE_NAMES_PREVAL } from '../constants.mjs';
import { ASSERT, log, group, groupEnd, vlog, vgroup, vgroupEnd, tmat, fmat, source, REF_TRACK_TRACING, assertNoDupeNodes, currentState, ENABLE_REF_TRACKING, } from '../utils.mjs';
import { $p, resetUid, getUid } from '../$p.mjs';
import * as AST from '../ast.mjs';
import { createReadRef, createWriteRef, getCleanTypingObject, getIdentUsageKind, getUnknownTypingObject, inferNodeTyping, mergeTyping, registerGlobalIdent, } from '../bindings.mjs';
import globals from '../globals.mjs';
import {
  openRefsOnBeforeProgram,
  openRefsOnAfterBlock,
  openRefsOnBeforeCatchNode,
  openRefsOnBeforeLoop,
  openRefsOnAfterLoop,
  openRefsOnBeforeRead,
  openRefsOnBeforeWrite,
  openRefsOnBeforeIf,
  openRefsOnAfterIf,
  openRefsOnBeforeReturn,
  openRefsOnBeforeThrow,
  openRefsOnBeforeTryNode,
  openRefsOnAfterTryNode,
  openRefsOnAfterRef,
  openRefsOnBeforeCatchVar,
  openRefsOnAfterCatchVar,
  openRefsOnAfterCatchNode,
  dumpOpenRefsState,
  openRefsOnBeforeRef,
  openRefsOnBeforeBlock,
  openRefsOnAfterProgram,
  openRefsOnBeforeBreak,
  openRefsOnAfterBreak,
  openRefsOnAfterReturn,
  openRefsOnAfterThrow,
  openRefsOnBeforeLabel,
  openRefsOnAfterLabel, createState,
} from '../utils/ref_tracking.mjs';
import { addLabelReference, registerGlobalLabel } from '../labels.mjs';
import { SYMBOL_COERCE } from '../symbols_preval.mjs';

// This phase is fairly mechanical and should only do discovery, no AST changes.
// It sets up scope tracking, imports/exports tracking, return value analysis, ref tracking (which binding can see which binding). That sort of thing.
// It does replace Identifier nodes in the AST that are $$123 param names with a special custom Param node
// It runs twice; once for actual input code and once on normalized code.

export function phase1(fdata, resolve, req, firstAfterParse, passes, phase1s, refTest, pcodeTest, verboseTracing, optionsTime) {
  const enableTiming = optionsTime || 0;
  const ast = fdata.tenkoOutput.ast;

  const start = Date.now();
  const mstart = enableTiming && performance.now();

  const TIMING = {
    init: 0,
    walk: 0,
    mscoping: 0,
    end: 0,
  };

  const funcStack = []; // (also includes global/Program)
  const thisStack = []; // Only contains func exprs. Func decls are eliminated. Arrows do not have this/arguments. Not used for global.
  const blockStack = []; // Stack of nested blocks (functions, try/catch, or statements)
  const blockIds = [0]; // Stack of block pids. Negative if the parent was a loop of sorts. Functions insert a zero. Start zero padder even though Program injects a `1,` anyways.
  const blockBodies = []; // Stack of blocks. Arrays of statements that is block.body or program.body
  const blockIndexes = []; // Stack of block indexes to match blockIds
  const ifStack = []; // Stack of `if` pids, negative for the `else` branch, zeroes for function boundaries. Used by SSA.
  const loopStack = []; // Stack of loop nodes. `null` means function (or program).
  const thenStack = [0];
  const elseStack = [0];
  const tryNodeStack = []; // Stack of try nodes (not pid) (try/catch)
  const trapStack = [0]; // Stack of try-block node $pids (try/catch), to detect being inside a try {} block (opposed to the catch)
  const catchStack = [0]; // Stack of catch _block_ node $pids (try/catch)
  let readWriteCounter = 0;

  /**
   * @type {Map<string, Meta>}
   */
  const globallyUniqueNamingRegistry = new Map();
  fdata.globallyUniqueNamingRegistry = globallyUniqueNamingRegistry;
  const identNameSuffixOffset = new Map(); // <name, int>
  fdata.identNameSuffixOffset = identNameSuffixOffset;

  const globallyUniqueLabelRegistry = new Map();
  fdata.globallyUniqueLabelRegistry = globallyUniqueLabelRegistry;
  const labelNameSuffixOffset = new Map(); // <name, int>
  fdata.labelNameSuffixOffset = labelNameSuffixOffset;
  fdata.flatNodeMap = new Map(); // Map<pid, Node>

  globals.forEach((typing, name) => {
    ASSERT(name);
    const meta = registerGlobalIdent(fdata, name, name, { isExport: false, isImplicitGlobal: false, isBuiltin: true });
    // Some values have detailed typing info
    if (typeof typing !== 'string') {
      mergeTyping(typing, meta.typing);
    }
  });

  fdata.globallyUniqueNamingRegistry.forEach(meta => {
    ASSERT(meta.typing.mustBeType === false || !PRIMITIVE_TYPE_NAMES_PREVAL.has(meta.typing.mustBeType) === !meta.typing.mustBePrimitive, 'builtins misconfiguration: if it must be a primitive then mustbeprimitive', meta, meta.typing.mustBeType === false, meta.typing.mustBeType, !!PRIMITIVE_TYPE_NAMES_PREVAL.has(meta.typing.mustBeType), !!meta.typing.mustBePrimitive);
  });

  const imports = new Map(); // Discovered filenames to import from. We don't care about the imported symbols here just yet.
  const exports = new Map();
  fdata.imports = imports;
  fdata.exports = exports;

  fdata.phase1count = (fdata.phase1count || 0) + 1;

  group(
    '\n\n\n##################################\n## phase1 (first=' +
      firstAfterParse +
      ', refTest=' +
      !!refTest +
      ', pcodeTest=' +
      !!pcodeTest +
    ') ::  ' +
      fdata.fname +
      ', pass=' + passes + ', phase1s=', phase1s, ', len:', fdata.len, '\n##################################\n\n\n',
  );
  if (
    (VERBOSE_TRACING && firstAfterParse && passes === 0) ||
    REF_TRACK_TRACING
  ) {
    currentState(fdata, 'start of phase1');
    vlog('\n\n\n#################################################################### phase1 [',passes,'::', phase1s, ']\n\n\n');
  }

  resetUid();

  const refTrackState = createState();

  const tracingValueBefore = VERBOSE_TRACING;
  if (!verboseTracing && (passes > 1 || phase1s > 1)) {
    vlog('(Disabling verbose tracing for phase 1 after the first pass)');
    setVerboseTracing(false);
  }

  const minit = enableTiming && performance.now();
  TIMING.init = minit - mstart;

  let called = 0;
  const now = Date.now();
  vlog(`RTT: phase1 (REF_TRACK_TRACING=${REF_TRACK_TRACING}, enable with --ref-tracing)\n`);
  if (REF_TRACK_TRACING) console.group();
  log('Walking AST...');
  walk(mainPhase1Walker, ast, 'ast');
  log('Walked AST in', Date.now() - now, 'ms');
  if (REF_TRACK_TRACING) console.groupEnd();
  vlog('End of phase1\n');

  const mwalk = enableTiming && performance.now();
  TIMING.walk = mwalk - minit;

  // Set meta.rwOrder and meta.singleScoped stuff.
  fdata.globallyUniqueNamingRegistry.forEach((meta, name) => {
    // Since we regenerate the pid during every phase1, we should be able to rely on it for DFS ordering.
    // Note: this is not necessarily source order. `x = y` will visit `y` before `x`.
    const rwOrder = meta.reads.concat(meta.writes).sort((a,b) => a.node.$p.npid - b.node.$p.npid);
    meta.rwOrder = rwOrder;

    // We can also settle this in phase1...
    let lastScope = undefined;
    let lastScopeRead = undefined;
    let lastScopeWrite = undefined;
    meta.singleScoped = true;
    meta.singleScopeReads = true;
    meta.singleScopeWrites = true;
    rwOrder.some((ref) => {
      if (lastScope === undefined) {
        lastScope = ref.scope;
      }
      if (lastScope !== ref.scope) {
        meta.singleScoped = false;
      }

      if (ref.type === 'read') {
        if (lastScopeRead === undefined) lastScopeRead = ref.scope;
        else if (lastScopeRead !== ref.scope) meta.singleScopeReads = false;
      }
      if (ref.type === 'write') {
        if (lastScopeWrite === undefined) lastScopeWrite = ref.scope;
        else if (lastScopeWrite !== ref.scope) meta.singleScopeWrites = false;
      }

      // These start as undefined
      if (meta.singleScopeReads === false && meta.singleScopeWrites === false) {
        return true;
      }
    });
  });

  const mscoping = enableTiming && performance.now();
  TIMING.scoping = mscoping - mwalk;

  assertNoDupeNodes(ast, 'body');

  setVerboseTracing(tracingValueBefore);

  function mainPhase1Walker(node, before, nodeType, path) {
    ASSERT(node, 'node should be truthy', node);
    ASSERT(nodeType === node.type);

    ++called;

    const pathNodes = path.nodes;
    const pathProps = path.props;
    const pathIndexes = path.indexes;

    const parentNode = pathNodes[pathNodes.length - 2];
    const parentProp = pathProps[pathProps.length - 1];
    const parentIndex = pathIndexes[pathIndexes.length - 1];

    if (before) {
      ASSERT(!parentNode || parentNode.$p);
      ASSERT(
        node.$p?.phase1count !== fdata.phase1count,
        'if this node was tagged with the current count before then that implies it occurs multiple times in the AST which is a bad state. fix the last transform to touch this AST.',
        node,
      );
      node.$p = $p();
      node.$p.phase1count = fdata.phase1count;
      node.$p.funcDepth = funcStack.length;
      node.$p.blockChain = blockIds.join(',') + ','; // Trailing comma prevents ambiguity when doing a.blockChain.startsWith(b.blockChain)
      fdata.flatNodeMap.set(node.$p.npid, node);
    } else {
      // Set lastPid on all nodes. If the node had no child-nodes then pid==lastPid, that's fine.
      node.$p.lastPid = getUid();
    }

    if (before && parentNode?.type === 'IfStatement' && parentProp !== 'test') {
      vlog(BLUE + (parentProp === 'consequent' ? 'If' : 'Else') + `:before:: ${DIM}@${parentNode.$p.npid}${RESET}`);
    }
    vgroup(BLUE + nodeType + ':' + (before ? 'before' : 'after'), `:: ${DIM}@${node.$p.npid}${RESET}`);
    if (!before && parentNode?.type === 'IfStatement' && parentProp !== 'test') {
      vlog(BLUE + (parentProp === 'consequent' ? 'If' : 'Else') + `:after:: ${DIM}@${parentNode.$p.npid}${RESET}`);
    }

    const key = nodeType + ':' + (before ? 'before' : 'after');

    if (before && (parentNode?.type === 'Program' || parentNode?.type === 'BlockStatement')) {
      ASSERT(parentIndex >= 0);
      blockIndexes.push(parentIndex);
      ASSERT(
        blockBodies.length === blockIndexes.length,
        'for every block id there should be an index',
        blockBodies,
        blockIndexes,
        pathNodes,
        pathProps,
        pathIndexes,
      );
    }
    //const mbefore = enableTiming && performance.now();

    switch (key) {
      case 'AssignmentExpression:after': {
        vlog('-', node.left.type, node.operator, node.right.type);
        if (node.left.type === 'Identifier') {
          const meta = fdata.globallyUniqueNamingRegistry.get(node.left.name);
          ASSERT(meta);
          vlog('Resolving the .typing of `' + node.left.name + '` with the details of the rhs', node.right.type);
          const newTyping = inferNodeTyping(fdata, node.right);
          vlog('-- Results in', newTyping, 'which we will inject into', meta.typing);
          mergeTyping(newTyping, meta.typing);
          vlog('---- Typing:', meta.typing.mustBeType, meta.typing.mustBePrimitive);
        }
        break;
      }

      case 'Program:before': {
        funcStack.push(node);
        ifStack.push(0);
        blockBodies.push(node.body);
        blockIds.push(node.$p.npid);
        blockStack.push(node); // Do we assign node or node.body?

        if (ENABLE_REF_TRACKING) openRefsOnBeforeProgram(refTrackState, node, fdata);

        node.$p.promoParent = null;
        node.$p.blockChain = '0,';
        node.$p.funcChain = funcStack.map((n) => n.$p.npid).join(',');
        node.$p.ownBindings = new Set();
        node.$p.paramNames = []; // Ends up as a `meta.bfuncNode` in some cases, where this is expected to exist, so leave it.
        loopStack.push(null);


        // Must do this before visiting or the walker gets confused
        // Reminder: code gets parsed between normalization and phase1 so we must convert here, too
        if (firstAfterParse) {
          node.body.forEach((bnode, i) => {
            if (bnode.type === 'VariableDeclaration') {
              vlog('Converting VariableDeclarator nodes to special VarStatement');
              const newNode = AST.varStatement(bnode.kind, bnode.declarations[0].id, bnode.declarations[0].init);
              node.body[i] = newNode;
              return true;
            }
          });
        }

        break;
      }
      case 'Program:after': {
        funcStack.pop();
        ASSERT(funcStack.length === 0, 'stack should be empty now');
        blockBodies.pop();
        ASSERT(blockBodies.length === 0, 'stack should be empty now');
        blockIds.pop();
        ASSERT(blockIds.length === 1 && blockIds[0] === 0, 'stack should contain just a zero now');
        ifStack.pop();
        ASSERT(ifStack.length === 0, 'stack should be empty now');
        blockStack.pop();
        ASSERT(blockStack.length === 0, 'stack should be empty now');
        loopStack.pop();
        ASSERT(loopStack.length === 0, 'stack should be empty now');

        if (ENABLE_REF_TRACKING) openRefsOnAfterProgram(refTrackState, node, fdata);

        if (node.$p.alwaysCompletes?.size) {
          vlog('Global always completes explicitly, never implicitly');
        } else {
          vlog('Global may complete implicitly');
        }

        break;
      }

      case 'BinaryExpression:after': {
        // Maybe this should only be part of the use case. Or be more generic. Not sure :) Probably negligible for now.
        const left = node.left;
        const lip = AST.isPrimitive(left);
        if (lip) left.$p.primitiveNodeValue = AST.getPrimitiveValue(left);
        const right = node.right;
        const rip = AST.isPrimitive(right);
        if (rip) right.$p.primitiveNodeValue = AST.getPrimitiveValue(right);
        break;
      }

      case 'BlockStatement:before': {
        node.$p.promoParent = blockStack[blockStack.length - 1];

        blockStack.push(node);
        if (ENABLE_REF_TRACKING) openRefsOnBeforeBlock(refTrackState, node, parentNode, parentProp, pathNodes[pathNodes.length - 3], blockStack[blockStack.length - 2], globallyUniqueNamingRegistry);

        if (tryNodeStack.length) {
          if (tryNodeStack[tryNodeStack.length - 1].block === node) trapStack.push(node.$p.npid);
          else catchStack.push(node.$p.npid);
          //vlog('Checked for try:', tryNodeStack.map(n => n.$p.npid), trapStack, catchStack);
        }
        blockBodies.push(node.body);
        if (parentNode.type === 'WhileStatement') {
          blockIds.push(node.$p.npid); // Mark a loop
        } else {
          blockIds.push(node.$p.npid);
        }

        //node.$p.blockChain = blockIds.join(',');

        if (parentNode.type === 'IfStatement') {
          ifStack.push(parentNode.$p.npid);
          if (parentNode.consequent === node) {
            thenStack.push(parentNode.$p.npid);
          } else if (parentNode.alternate === node) {
            elseStack.push(parentNode.$p.npid);
          }
        }

        // Must do this before visiting or the walker gets confused
        // Reminder: code gets parsed between normalization and phase1 so we must convert here, too
        if (firstAfterParse) {
          node.body.forEach((bnode, i) => {
            if (bnode.type === 'VariableDeclaration') {
              vlog('Converting VariableDeclarator nodes to special VarStatement');
              const newNode = AST.varStatement(bnode.kind, bnode.declarations[0].id, bnode.declarations[0].init);
              node.body[i] = newNode;
              return true;
            }
          });
        }

        break;
      }
      case 'BlockStatement:after': {
        blockStack.pop();
        blockBodies.pop();
        blockIds.pop();

        const parentBlock = blockStack[blockStack.length - 1];
        if (ENABLE_REF_TRACKING) openRefsOnAfterBlock(refTrackState, node, path, parentNode, parentProp, pathNodes[pathNodes.length - 3], loopStack, parentBlock, globallyUniqueLabelRegistry, tryNodeStack, catchStack, globallyUniqueNamingRegistry);

        if (tryNodeStack.length) {
          if (tryNodeStack[tryNodeStack.length - 1].block === node) trapStack.pop();
          else catchStack.pop();
          //vlog('Checked for try:', tryNodeStack.map(n => n.$p.npid), trapStack, catchStack);
        }

        // A block has no early / explicit completion if it contains no statements that complete in itself or its descendants
        let blockHasCompletable = false;
        const anyBranchCompletesExplicit = node.body.every((cnode) => {
          // The last node may be an explicit completion while not an early completion. May be both (nested block with early return).
          // Do not propagate the explicit returns from functions, unless it always throws.
          if ([
            'IfStatement',
            'WhileStatement',
            'LabeledStatement',
            'TryStatement',
            'BlockStatement',
            'ReturnStatement',
            'ThrowStatement',
            'BreakStatement'
          ].includes(cnode.type)) {
            // These are the nodes that can propagate their completion status to this Block
            // If they all alwaysCompletes then so does the Block. Otherwise, the block may implicitly
            // continue in the next statement of the parent (recursively).
            blockHasCompletable = true; // We must track this separately
            return cnode.$p.alwaysCompletes?.size > 0;
          }

          // Note: ignore function expressions. consider them to be at the end anyways.
          return true; // Irrelevant, although we need to find at least one breaking statement too
        });
        if (blockHasCompletable && anyBranchCompletesExplicit) {
          // The block alwaysComplets too. Merge all the sets together.
          if (!node.$p.alwaysCompletes) node.$p.alwaysCompletes = new Set;
          // Since we already checked it above, we can simply loop over all statements and copy what we do find.
          node.body.forEach(cnode => cnode.$p.alwaysCompletes?.forEach(pid => node.$p.alwaysCompletes.add(pid)));
        }

        if (parentNode.type === 'IfStatement') {
          ifStack.pop();
          if (node === parentNode.consequent) {
            thenStack.pop();
          } else {
            elseStack.pop();
          }
        }

        ASSERT(blockIds.length, 'meh?');
        break;
      }

      case 'BreakStatement:before': {
        if (ENABLE_REF_TRACKING) openRefsOnBeforeBreak(refTrackState, node, blockStack);

        // Note: break state is verified by the parser so we should be able to assume this break has a valid target
        if (node.label) {
          const name = node.label.name;
          vlog('Label:', name);

          ASSERT(
            fdata.globallyUniqueLabelRegistry.has(node.label.name),
            'the label should be registered',
            node,
            fdata.globallyUniqueLabelRegistry,
          );
          const targetLabelPid = addLabelReference(fdata, node.label, parentNode.body, parentIndex);

          node.$p.alwaysCompletes = new Set([targetLabelPid]); // parent block will consume this
        } else {
          node.$p.alwaysCompletes = new Set([loopStack[loopStack.length - 1].$p.npid]); // parent block will consume this
        }

        break;
      }
      case 'BreakStatement:after': {
        if (ENABLE_REF_TRACKING) openRefsOnAfterBreak(refTrackState, node, blockStack);
        break;
      }

      case 'CallExpression:before': {
        ASSERT(
          node.callee.type !== 'Identifier' ||
            node.callee.name !== SYMBOL_COERCE ||
            (node.arguments.length === 2 && AST.isPrimitive(node.arguments[1])),
          '$coerce is a custom symbol that we control. make sure it always conforms to normalized state.',
          node,
        );
        break;
      }

      case 'CatchClause:before': {
        // Note: the catch scope is set on node.handler of the try (parent node of the catch clause)

        const parentBlock = blockStack[blockStack.length - 1];
        if (ENABLE_REF_TRACKING) openRefsOnBeforeCatchNode(refTrackState, node, parentNode, parentBlock);

        break;
      }
      case 'CatchClause:after': {
        const parentBlock = blockStack[blockStack.length - 1];
        if (ENABLE_REF_TRACKING) openRefsOnAfterCatchNode(refTrackState, node, parentBlock, globallyUniqueLabelRegistry, loopStack, tryNodeStack);
        break;
      }

      case 'DebuggerStatement:before': {
        // Must be the only one and must be our header/body divider
        ASSERT(parentIndex >= 0);
        funcStack[funcStack.length - 1].$p.bodyOffset = parentIndex + 1;
        break;
      }

      case 'FunctionExpression:before': {
        //node.$p.blockChain = blockIds.join(',');
        node.$p.ownBindings = new Set();
        node.$p.paramNames = [];
        node.$p.paramNameToIndex = new Map;
        node.$p.paramIndexToName = new Map;
        node.$p.readsArgumentsAny = false;
        node.$p.readsArgumentsLen = false;
        node.$p.readsArgumentsLenAt = -1;

        blockIds.push(0); // Inject a zero to mark function boundaries
        ifStack.push(0);
        loopStack.push(null);

        if (firstAfterParse) {
          vlog('Converting parameter nodes to special Param nodes');
          node.params.forEach((pnode, i) => {
            node.params[i] = AST.param(
              pnode.type === 'RestElement' ? pnode.argument.name : pnode.name,
              pnode.type === 'RestElement',
              true
            );
          });
        }

        ASSERT(
          ['VarStatement', 'AssignmentExpression', 'Property', 'MethodDefinition', 'ExpressionStatement'].includes(parentNode.type),
          'normalized code should not other cases, right?',
          parentNode,
        );

        if (parentNode.type === 'VarStatement' && parentNode.kind === 'const') {
          vlog('Bound as a constant as: `' + parentNode.id.name + '`');
          node.$p.uniqueName = parentNode.id.name;
        }

        node.$p.returnNodes = [];

        funcStack.push(node);
        thisStack.push(node);

        node.$p.funcChain = funcStack.map((n) => n.$p.npid).join(',');
        break;
      }
      case 'FunctionExpression:after': {
        funcStack.pop();
        blockIds.pop(); // the zero
        ifStack.pop(); // the zero
        loopStack.pop();
        ASSERT(blockIds.length, 'meh3?');
        thisStack.pop();

        if (funcStack.length > 1) {
          // This is relevant for determining whether this function can be cloned when it is called with a primitive
          // This prevents the cloning. This way we don't accidentally clone cloned functions and in general it serves
          // as an artificial way to reduce the cloning surface a little bit.
          funcStack[funcStack.length - 1].$p.containsFunctions = true;
        }

        vlog('Final func commonReturn:', node.$p.commonReturn);

        if (node.id) {
          ASSERT(node.id.name === '$free', 'the only function id that we should have left is the $free function');
          //
          //const meta = globallyUniqueNamingRegistry.get(node.id.name);
          //ASSERT(meta, 'there should be a meta for this name', node.id.name);
          //meta.isImplicitGlobal = false;
        }

        break;
      }

      case 'Identifier:before': {
        if (parentNode.type === 'CatchClause') if (ENABLE_REF_TRACKING) openRefsOnBeforeCatchVar(refTrackState);

        const currentScope = funcStack[funcStack.length - 1];
        const name = node.name;
        vlog('Ident:', [name]);
        ASSERT(name, 'idents must have valid non-empty names...', node);
        const kind = getIdentUsageKind(parentNode, parentProp);
        vlog(`- Ident rw kind: "${kind}"`);

        ASSERT(kind !== 'readwrite', 'I think readwrite is compound assignment (or unary inc/dec) and we eliminated those? prove me wrong', node);
        ASSERT(
          name !== SYMBOL_COERCE ||
            (parentNode.type === 'CallExpression' &&
              parentProp === 'callee' &&
              parentNode.arguments.length === 2 &&
              AST.isStringLiteral(parentNode.arguments[1])),
          'we control $coerce, it should have a specific form all the time',
        );

        vlog(
          '- Parent: `' + parentNode.type + '.' + parentProp + '`',
          parentNode.type === 'MemberExpression' && (parentNode.computed ? 'computed member' : `regular member (${parentNode.property.name})`),
        );

        if (kind === 'read' && name === 'arguments' && thisStack.length) {
          // Note: this could be a property write, but it's not a binding mutation.
          // Make a distinction between arguments.length, arguments[], and maybe the slice paradigm?
          // For now we only care whether the function might detect the call arg count. Without arguemnts, it cannot.
          // Do not count cases like where the arguments have no observable side effect or our own alias
          // This makes sure the `arguments` reference does not stick around unnecessarily as an artifact
          if (
            // Testing for `arguments.length`
            parentNode.type === 'MemberExpression' &&
            parentProp === 'object' &&
            !parentNode.computed &&
            parentNode.property.name === 'length'
          ) {
            // This is an `arguments.length` access. Easier to work around than plain unbound `arguments` access.
            vlog('Marking function as accessing `arguments.length`');

            const grandNode = pathNodes[pathNodes.length - 3];
            const grandProp = pathProps[pathProps.length - 2];
            const bodyIndex = pathIndexes[pathIndexes.length - 3]; // This is where grandNode is stored at in the body

            ASSERT(
              grandNode.type === 'VarStatement' && grandProp === 'init',
              '`arguments.length` should only appear for the custom alias in normalized code',
              grandNode.type, grandProp
            );
            thisStack[thisStack.length - 1].$p.readsArgumentsLenAt = bodyIndex;
            thisStack[thisStack.length - 1].$p.readsArgumentsLenAs = grandNode.id.name; // Name of the alias
            thisStack[thisStack.length - 1].$p.readsArgumentsLen = true;
            thisStack[thisStack.length - 1].$p.readsArgumentsAny = true;
          } else if (parentNode.type === 'ExpressionStatement') {
            // A statement that is just `arguments`. :shrug:
            vlog('Ignoring `arguments` as an expression statement');
            //} else if (
            //  parentNode.type === 'VarStatement' &&
            //  parentNode.id.name.startsWith(ARGUMENTS_ALIAS_PREFIX)
            //) {
            //  vlog('Ignoring our own arguments alias');
          } else {
            // This is an actual read on `arguments`
            // This disables a few tricks because of observable side effects
            vlog('Marking function as accessing `arguments` in "any" way');
            thisStack[thisStack.length - 1].$p.readsArgumentsAny = true;
          }
        }
        else if ((kind === 'read' || kind === 'write') && /^\$\$\d+$/.test(name)) {
          const paramNode = AST.param(name, false);
          vlog('This is a special $$123 param "keyword" by Preval. Replacing ident with param node;', paramNode);
          if (parentIndex < 0) parentNode[parentProp] = paramNode;
          else parentNode[parentProp][parentIndex] = paramNode;
        }
        else if (name === '$free') {
          vlog('Ignoring special $free case');
        }
        else if (kind !== 'none' && kind !== 'label') {
          ASSERT(kind === 'read' || kind === 'write', 'consider what to do if this check fails', kind, node);
          const meta = registerGlobalIdent(fdata, name, name, { isExport: false, isImplicitGlobal: 'unknown', isBuiltin: false });
          vlog('- Binding referenced in $p.npid:', currentScope.$p.npid, ', reads so far:', meta.reads.length, ', writes so far:', meta.writes.length);
          ASSERT(kind !== 'readwrite', 'compound assignments and update expressions should be eliminated by normalization', node);

          if (ENABLE_REF_TRACKING) openRefsOnBeforeRef(refTrackState, kind, node, parentNode, parentProp, parentIndex, meta);

          // This is normalized code so there must be a block parent for any read ref
          // Find the nearest block/program node
          // TODO: use blockStack ?
          let blockNode;
          let blockIndex;
          // Find the nearest block/program node. Start with the parent, not grandParent (!)
          let pathIndex = pathNodes.length - 1;
          do {
            blockNode = pathNodes[pathIndex];
            vlog('  - block step;', blockNode.type, blockNode.$p.npid);
            if (blockNode.type === 'BlockStatement' || blockNode.type === 'Program') {
              blockIndex = pathIndexes[pathIndex + 1];
              ASSERT(
                blockIndex >= 0,
                'block index should be set right',
                pathNodes.map((n) => n.type),
                pathIndexes,
              );
              break;
            }
            --pathIndex;
          } while (true);

          const innerLoop = (loopStack[loopStack.length - 1]?.$p.npid ?? 0);
          const innerIf = ifStack[ifStack.length - 1];
          const innerThen = thenStack[thenStack.length - 1];
          ASSERT(typeof innerThen === 'number', 'ifstack should contain numbers', innerThen, thenStack);
          const innerElse = elseStack[elseStack.length - 1];
          ASSERT(typeof innerElse === 'number', 'ifstack should contain numbers', innerElse, elseStack);
          const innerTry = tryNodeStack[tryNodeStack.length - 1]?.$p.npid || 0;
          const innerTrap = trapStack[trapStack.length - 1];
          const innerCatch = catchStack[catchStack.length - 1];
          vlog('innerLoop:', innerLoop, ', innerThen:', innerThen, ', innerElse:', innerElse, ', innerTry:', innerTry, ', innerTrap:', innerTrap, ', innerCatch:', innerCatch);

          const grandNode = pathNodes[pathNodes.length - 3];
          const grandProp = pathProps[pathProps.length - 2];
          const grandIndex = pathIndexes[pathIndexes.length - 2];

          if (kind === 'read') {
            const blockNode = blockStack[blockStack.length - 1];
            // Note: this could be a property write, but it's not a binding mutation.
            // Note: this includes the write to a property, which does not read the property first, but which does not mutate the binding
            ASSERT(currentScope.$p.npid, 'the scope should be set to something here...', currentScope.$p.npid);
            const blockBody = blockNode.body;
            const read = createReadRef({
              name,
              kind: grandNode.type === 'ExportNamedDeclaration' ? 'export' : 'read',
              parentNode,
              parentProp,
              parentIndex,
              grandNode,
              grandProp,
              grandIndex,
              blockBody,
              blockIndex,
              parentBlockNode: blockNode,
              pfuncNode: currentScope,
              node,
              rwCounter: ++readWriteCounter,
              scope: currentScope.$p.npid,
              blockChain: blockIds.join(',') + ',',
              blockIds: blockIds.slice(0),
              blockBodies: blockBodies.slice(0),
              blockIndexes: blockIndexes.slice(0),
              ifChain: ifStack.slice(0),
              funcChain: funcStack.map((n) => n.$p.npid).join(','),
              innerLoop,
              innerIf,
              innerThen,
              innerElse,
              innerTry,
              innerTrap,
              innerCatch,
            });
            meta.reads.push(read);

            if (ENABLE_REF_TRACKING) openRefsOnBeforeRead(refTrackState, read, blockNode, meta);
          }
          if (kind === 'write') {
            const blockNode = blockStack[blockStack.length - 1];
            const blockBody = blockNode.body;
            vlog('- Parent block:', blockNode.type, blockNode.$p.npid);
            ASSERT(currentScope.$p.npid, 'the scope should be set to something here...', currentScope.$p.npid);

            const write = createWriteRef({
              name,
              kind:
                parentNode.type === 'VarStatement' ? 'var'
                : parentNode.type === 'AssignmentExpression' ? 'assign'
                : parentNode.type === 'CatchClause' ? 'catcher' // something greppable, plz. not used very often.
                : parentNode.type === 'ImportSpecifier' ? 'importee' // greppable
                : 'other', // other is like class ids, not sure what else
              parentNode,
              parentProp,
              parentIndex,
              grandNode,
              grandProp,
              grandIndex,
              blockBody,
              blockIndex,
              parentBlockNode: blockNode,
              pfuncNode: currentScope,
              node,
              rwCounter: ++readWriteCounter,
              scope: currentScope.$p.npid,
              blockChain: blockIds.join(',') + ',',
              blockIds: blockIds.slice(0),
              blockBodies: blockBodies.slice(0),
              blockIndexes: blockIndexes.slice(0),
              ifChain: ifStack.slice(0),
              funcChain: funcStack.map((n) => n.$p.npid).join(','),
              innerLoop,
              innerIf,
              innerThen,
              innerElse,
              innerTry,
              innerTrap,
              innerCatch,
            });

            meta.writes.push(write);

            if (ENABLE_REF_TRACKING) openRefsOnBeforeWrite(refTrackState, write, blockNode, meta);

            // Inject var decls at the top, append other writes at the end
            if (parentNode.type === 'VarStatement') {
              ASSERT(parentProp === 'id', 'the read check above should cover the prop=init case');
              vlog('- Added decl write to meta.writes');

              currentScope.$p.ownBindings.add(name);
            } else if (parentNode.type === 'AssignmentExpression') {
              ASSERT(parentProp === 'left', 'the read check above should cover the prop=right case');
              ASSERT(
                pathNodes[pathNodes.length - 3].type === 'ExpressionStatement',
                'assignments must be normalized to statements',
                pathNodes[pathNodes.length - 3],
              );
              vlog('- Adding assign write to meta.writes');
            } else if (parentNode.type === 'FunctionDeclaration') {
              ASSERT(false, 'all function declarations should have been eliminated during hoisting');
            } else if (parentProp === 'params' && parentNode.type === 'FunctionExpression') {
              ASSERT(false, 'actual params are special nodes now and original params are local bindings so this should not trigger');
            } else {
              // for-x lhs, not sure what else. not param.
              vlog('- Added "other" write to meta.writes');
            }

            // Update .typing for this binding
            ASSERT(meta);
            vlog('Writing to .typing now');
            if (write.kind === 'var' || write.kind === 'assign') {
              vlog('Skipping typing till after the parent var/assign handler');
            } else {
              // exports, catch? not sure what else, currently. we normalize everything else.
              ASSERT(
                parentNode.type === 'ImportSpecifier' ||
                parentNode.type === 'CatchClause' ||
                parentNode.type === 'ClassExpression' || // meh. i'm allowing it for now.
                // parentNode.type === 'FunctionExpression' || // $free functions, but those branch off above
                false,
                'assign is var, assign, import/export, or catch ... right?',
                parentNode.type,
              );
              vlog('Clearing types because the write was not a var or an assignment expression...', parentNode.type);
              const newTyping = getUnknownTypingObject();
              mergeTyping(newTyping, meta.typing);
              vlog('Typing now:', meta.typing);
            }
          }

          if (ENABLE_REF_TRACKING) openRefsOnAfterRef(refTrackState, kind, node, parentNode, parentProp, parentIndex, meta);

          if (node.name === 'arguments') {
            //ASSERT(kind === 'write', 'so this must be a write to the identifier `arguments`', kind, parentNode.type);
            // Treat `arguments` as an unknown object. It's not an array and very special.
            // This can be reached by the regular arguments alias, or by a ref to arguments in global space.
            meta.typing = getCleanTypingObject();
          }

          // Resolve whether this was an export. If so, mark the name as such.
          // After normalization there should only be named exports without declarations and
          // anonymous default exports. This ident won't be part of the latter :p
          // TODO: local vs exported. also: exports are neither read nor write. well, pseudo read maybe?
          if (grandNode.type === 'ExportNamedDeclaration') {
            vlog('Marking `' + name + '` as being an export');
            meta.isExport = true;
          }
        }
        else {
          vlog(RED + '- skipping; not a binding' + RESET);
        }


        if (parentNode.type === 'CatchClause') if (ENABLE_REF_TRACKING) openRefsOnAfterCatchVar(refTrackState);
        break;
      }

      case 'IfStatement:before': {
        const parentBlock = blockStack[blockStack.length - 1];
        if (ENABLE_REF_TRACKING) openRefsOnBeforeIf(refTrackState, node, parentBlock);

        funcStack[funcStack.length - 1].$p.hasBranch = true;
        break;
      }
      case 'IfStatement:after': {
        const parentBlock = blockStack[blockStack.length - 1];
        if (ENABLE_REF_TRACKING) openRefsOnAfterIf(refTrackState, node, parentBlock, path, globallyUniqueNamingRegistry, globallyUniqueLabelRegistry, loopStack, blockStack, catchStack);

        if (node.consequent.$p.alwaysCompletes?.size && node.alternate.$p.alwaysCompletes?.size) {
          if (!node.$p.alwaysCompletes) node.$p.alwaysCompletes = new Set;
          node.consequent.$p.alwaysCompletes.forEach(pid => node.$p.alwaysCompletes.add(pid));
          node.alternate.$p.alwaysCompletes.forEach(pid => node.$p.alwaysCompletes.add(pid));
        }

        break;
      }

      case 'ImportDeclaration:before': {
        // Note: after normalization there should only be two kinds of imports;
        // - named imports, one imported symbol per decl, possibly with alias
        // - anonymous default import
        // TODO: and star import but we haven't bothered with that one yet...

        // The parser would always make import source a string, but normalization
        // would special case this and turn it into a template. support both.
        const source = node.source?.quasis?.[0]?.value?.cooked ?? node.source.value;
        ASSERT(typeof source === 'string', 'fixme if else', node);
        vlog('Importing symbols from "' + source + '"');
        ASSERT(typeof resolve === 'function', 'resolve must be a function here', resolve);
        const resolvedSource = resolve(source, fdata.fname);

        ASSERT(node.specifiers, 'fixme if different', node);
        node.specifiers.forEach((snode) => {
          const id = snode.local;
          ASSERT(id.type === 'Identifier', 'fixme if local is not an ident', snode);

          if (snode.type === 'ImportNamespaceSpecifier') {
            ASSERT(snode.type === 'ImportNamespaceSpecifier');
            // This will trigger the file to be processed. It'll be added to the list if new, it will be bumped to the
            // top of the queue if not finished processing yet. It will resolve before this file.
            imports.set(id.name, resolvedSource);
          } else if (snode.type === 'ImportDefaultSpecifier') {
            // This will trigger the file to be processed. It'll be added to the list if new, it will be bumped to the
            // top of the queue if not finished processing yet. It will resolve before this file.
            imports.set(id.name, resolvedSource);
          } else {
            ASSERT(snode.imported, 'fixme', snode.type, snode);
            // This will trigger the file to be processed. It'll be added to the list if new, it will be bumped to the
            // top of the queue if not finished processing yet. It will resolve before this file.
            imports.set(id.name, resolvedSource);
          }
        });

        break;
      }

      case 'ImportDefaultSpecifier:after': {
        // This must be an anonymous function

        // The parser would always make import source a string, but normalization
        // would special case this and turn it into a template. support both.
        const source = node.source?.quasis?.[0]?.value?.cooked ?? node.source.value;
        ASSERT(typeof source === 'string', 'fixme if else', node);

        const resolvedSource = resolve(source, fdata.fname);

        ASSERT(node.specifiers, 'fixme if different', node);

        // This will trigger the file to be processed. It'll be added to the list if new, it will be bumped to the
        // top of the queue if not finished processing yet. It will resolve before this file.
        imports.set('default', resolvedSource);

        break;
      }

      case 'LabeledStatement:before': {
        vlog(`Label: \`${node.label.name}\``);
        registerGlobalLabel(fdata, node.label.name, node.label.name, node);

        const parentBlock = blockStack[blockStack.length - 1];
        if (ENABLE_REF_TRACKING) openRefsOnBeforeLabel(refTrackState, node, parentBlock);
        break;
      }
      case 'LabeledStatement:after': {
        const parentBlock = blockStack[blockStack.length - 1];
        if (ENABLE_REF_TRACKING) openRefsOnAfterLabel(refTrackState, node, parentBlock, path, globallyUniqueNamingRegistry, globallyUniqueLabelRegistry, loopStack, catchStack);

        if (node.body.$p.alwaysCompletes?.size) {
          const labelPid = node.$p.npid;
          if (node.body.$p.alwaysCompletes.has(labelPid)) {
            // No need to propagate. At least one completion was a break to this label so
            // code is able to continue with the next statement after the label.
          } else {
            if (!node.$p.alwaysCompletes) node.$p.alwaysCompletes = new Set;
            node.body.$p.alwaysCompletes.forEach(pid => {
              if (pid !== labelPid) node.$p.alwaysCompletes.add(pid)
            });
          }
        }

        break;
      }

      case 'Param:before': {
        ASSERT(
          parentProp === 'params' || parentProp === 'init',
          'this node should only be used as a placeholder for params or when binding the placeholder to the actual name',
          node
        );
        ASSERT(!node.$p.paramVarDeclRef, 'each param should be referenced at most once');
        if (parentProp === 'init') {
          vlog('This is the param var decl. The param maps to `' + parentNode.id.name + '`');

          // This blockNode is the actual var decl `var p = $$0`
          const blockIndex = pathIndexes[pathIndexes.length - 2];
          vlog('The var decl of this param is at body[' + blockIndex + ']');

          const funcNode = funcStack[funcStack.length - 1];
          const funcHeaderParamNode = funcNode.params[node.index];
          ASSERT(funcHeaderParamNode, 'funcHeaderParamNode should be at', node.index, funcNode.params.length);
          ASSERT(funcHeaderParamNode.name === node.name, 'the usage of a Param should map back to the decl', node, funcHeaderParamNode);

          // Point from func header node to its var decl ref
          funcHeaderParamNode.$p.paramVarDeclRef = { blockBody: funcNode.body.body, blockIndex, node, name: parentNode.id.name };

          //// Point from var decl ref to its func header node
          //node.$p.paramFuncHeaderRef = {node: funcHeaderParamNode, funcNode};

          const paramName = parentNode.id.name;
          funcNode.$p.paramNames.push(paramName);
          funcNode.$p.paramNameToIndex.set(paramName, node.index);
          funcNode.$p.paramIndexToName.set(node.index, paramName);
        } else {
          vlog('This is the param');
          // This is the func param (!) `function ($$0) {`
        }
        break;
      }

      case 'ReturnStatement:before': {
        const funcNode = funcStack[funcStack.length - 1];

        funcNode.$p.returnNodes.push(node);

        node.$p.alwaysCompletes = new Set([funcNode.$p.npid]); // parent block will consume this

        if (ENABLE_REF_TRACKING) openRefsOnBeforeReturn(refTrackState, blockStack, node);

        vgroup('[commonReturn]');
        const a = funcNode.$p.commonReturn;
        const b = node.argument;
        ASSERT(b, b.$p);
        if (a === null) {
          // We've already detected that this function returns at least two different values.
          vlog('commonReturn is already null so not setting it');
        } else if (b.type === 'Identifier') {
          if (a === undefined) {
            funcNode.$p.commonReturn = AST.cloneSimple(b);
          } else if (a.type !== 'Identifier' || a.name !== b.name) {
            funcNode.$p.commonReturn = null;
          }
        }
        else if (!AST.isPrimitive(b)) {
          vlog('the arg is not a primitive so setting commonReturn to null');
          funcNode.$p.commonReturn = null; // No longer use this
        }
        else if (a === undefined) {
          vlog('commonReturn was not set so setting it now');
          funcNode.$p.commonReturn = AST.cloneSimple(node.argument);
        }
        else if (a.type === b.type) {
          ASSERT(a.type !== 'Identifier', 'very redundant. hopefully');
          if (b.type === 'Literal') {
            if (a.value !== b.value || a.raw !== b.raw) {
              vlog('return value is not same as commonReturn so setting it to null');
              funcNode.$p.commonReturn = null; // No longer use this
            } else {
              vlog('- No change to commonReturn. Both have the same value/raw:', a.value, a.raw, b.value, b.raw);
            }
          } else if (a.type === 'TemplateLiteral') {
            if (AST.getStringValue(a) !== AST.getStringValue(b)) {
              vlog('return string is not same as commonReturn so setting it to null');
              funcNode.$p.commonReturn = null; // No longer use this
            } else {
              vlog('- No change to commonReturn. Both have the same value/raw:', a.value, a.raw, b.value, b.raw);
            }
          } else if (b.type === 'UnaryExpression') {
            const aa = a.argument;
            const bb = b.argument; // We already checked isPrimitive so this should be fine
            if (aa.type === 'Identifier') {
              if (aa.name !== bb.name) {
                vlog('return value is not same as commonReturn so setting it to null');
                funcNode.$p.commonReturn = null; // No longer use this
              } else {
                vlog('- No change to commonReturn. Both have the same unary ident:', aa.name, bb.name);
              }
            } else if (aa.type === 'Literal') {
              if (aa.value !== bb.value || aa.raw !== bb.raw) {
                vlog('return value is not same as commonReturn so setting it to null');
                funcNode.$p.commonReturn = null; // No longer use this
              } else {
                vlog('- No change to commonReturn. Both have the same unary value/raw:', aa.value, aa.raw, bb.value, bb.raw);
              }
            } else if (aa.type === 'TemplateLiteral') {
              if (AST.getStringValue(aa) !== AST.getStringValue(bb)) {
                vlog('return string is not same as commonReturn so setting it to null');
                funcNode.$p.commonReturn = null; // No longer use this
              } else {
                vlog('- No change to commonReturn. Both have the same unary value/raw:', aa.value, aa.raw, bb.value, bb.raw);
              }
            } else {
              ASSERT(false, 'what primitive is this?', bb);
            }
          }
        }
        else {
          vlog('- There are at least two different node types being returned. Setting commonMark to null');
          funcNode.$p.commonReturn = null; // No longer use this
        }

        vlog('Func commonReturn right now:', funcNode.$p.commonReturn);
        vgroupEnd();

        break;
      }
      case 'ReturnStatement:after': {
        if (ENABLE_REF_TRACKING) openRefsOnAfterReturn(refTrackState, blockStack, node);
        break;
      }

      case 'TemplateLiteral': {
        ASSERT(
          node.expressions.length === 0 || ['ExpressionStatement', 'VarStatement', 'AssignmentExpression'].includes(parentNode.type),
          'complex templates should have the same limitations as other complex expression nodes',
          parentNode,
        );
        ASSERT(node.expressions.length+1 === node.quasis.length, 'one more quasi than ident', node);
        ASSERT(node.expressions.every(enode => enode.type !== 'TemplateLiteral'), 'Any transforms leaving nested templates behind should go to normalize or call AST.normalizeTemplateSimple on the result first', node);
        break;
      }

      case 'ThisExpression:after': {
        if (thisStack.length) {
          vlog('Marking func as having `this` access');
          thisStack[thisStack.length - 1].$p.thisAccess = true;
        }
        break;
      }

      case 'ThrowStatement:before': {
        // Note: throws can be caught. We have to find the nearest Try or Function boundary, whichever is closer (lowest pid delta)
        const funcNode = funcStack[funcStack.length - 1];
        const tryNode = tryNodeStack[tryNodeStack.length - 1];
        // Note: Neither node has to exist in which case nearest is still undefined
        const nearest = !tryNode ? funcNode : !funcNode ? tryNode : (tryNode.$p.npid < funcNode.$p.npid ? tryNode : funcNode);

        node.$p.alwaysCompletes = new Set([nearest.$p.npid]); // parent block will consume this

        if (ENABLE_REF_TRACKING) openRefsOnBeforeThrow(refTrackState, blockStack, node);
        break;
      }
      case 'ThrowStatement:after': {
        if (ENABLE_REF_TRACKING) openRefsOnAfterThrow(refTrackState, blockStack, node);
        break;
      }

      case 'TryStatement:before': {
        const parentBlock = blockStack[blockStack.length - 1];
        if (ENABLE_REF_TRACKING) openRefsOnBeforeTryNode(refTrackState, node, parentBlock);

        tryNodeStack.push(node);
        break;
      }
      case 'TryStatement:after': {
        const parentBlock = blockStack[blockStack.length - 1];
        if (ENABLE_REF_TRACKING) openRefsOnAfterTryNode(refTrackState, node, parentBlock, globallyUniqueLabelRegistry, loopStack);

        if (node.handler.param) {
          const meta = globallyUniqueNamingRegistry.get(node.handler.param.name);
          ASSERT(meta, 'there should be a meta for this name', node.handler.param.name);
          // May need to normalize this a bit...
          // For now, keep the binding as an implicit global. But annotate that this is a catch var.
          // This allows tests to ignore these bindings for the sake of reporting implicit global issues.
          meta.isCatchVar = true;
          meta.isImplicitGlobal = false;
        }

        // Completion is slightly more complicated here
        // - Remove any throws that target this Try
        // - The Try only alwaysCompletes when both the Try Block and Catch do it
        // - In that case the Try gets an union of those sets

        const tryPid = node.$p.npid;
        if (node.block.$p.alwaysCompletes?.size && node.handler.body.$p.alwaysCompletes?.size) {
          // Note: an explicit throw does not prevent propagation because the Catch must
          // alwaysCompletes too, regardless. Otherwise the statement(s) that follows the
          // Try might still be visited.
          if (!node.$p.alwaysCompletes) node.$p.alwaysCompletes = new Set;
          node.block.$p.alwaysCompletes.forEach(pid => {
            if (pid !== tryPid) node.$p.alwaysCompletes.add(pid)
          });
          node.handler.body.$p.alwaysCompletes.forEach(pid => node.$p.alwaysCompletes.add(pid));
        }

        tryNodeStack.pop();
        break;
      }

      case 'VariableDeclaration:before': {
        ASSERT(false, 'var decls should be replaced by var stmts in normalization and never return so this is concerning', node);
        return;
      }

      case 'VarStatement:before': {
        vlog(node.kind, node.id.name, '=', node.init.type);
        break;
      }
      case 'VarStatement:after': {
        ASSERT(node.id.type === 'Identifier', 'var ids are idents?', node);
        vlog('- Id: `' + node.id.name + '`');
        ASSERT(node.id.type === 'Identifier', 'all patterns should be normalized away');
        ASSERT(node.init, 'normalized var decls must have an init', node);
        node.$p.promoParent = blockStack[blockStack.length - 1];
        const name = node.id.name;
        const init = node.init;
        const meta = globallyUniqueNamingRegistry.get(name);
        //const declWriteRef = meta.writes[meta.writes.length - 1]; // Last write should be this binding
        if (node.kind === 'const') {
          vlog('- marking', meta.uniqueName, 'as constant, ref set to', init.type);
          ASSERT(meta);
          meta.isConstant = true;
        } else if (node.kind === 'let') {
          meta.isLet = true;
        }
        meta.isImplicitGlobal = false;
        meta.isExplicitVar = true;
        ASSERT(
          parentNode.type === 'BlockStatement' || parentNode.type === 'Program',
          'all normalized var decls appear in blocks, right?',
          parentNode,
        );
        ASSERT(parentProp === 'body', 'amirite?', parentProp);
        meta.varDeclRef = {
          // needles: varDeclRef, constdeclref, constdeclinit, initref, vardeclinit
          // This is supposed to be the ref of the binding _value_, not the variable declaration node !
          // If the var decl is not a constant, this value has little meaning. But it is what it is.
          node: init,
          // This refers to the block where the var decl lives that declares the binding
          varDeclNode: node, // The var decl itself
          // varDeclBody[varDeclIndex] === varDeclNode
          varDeclBody: parentNode.body,
          varDeclIndex: parentIndex,
        };

        if (node.init.type !== 'Param') {
          // If this write is not read (ie `let x=1;if(a)x=2;else x=3`) then the typing is irrelevant.
          // But we won't know that until after this entire phase so that's not helpful. We have to
          // incude all writes for now.g
          vlog('Resolving .typing details of the non-param init');
          const newTyping = inferNodeTyping(fdata, node.init);
          vlog('Results in', newTyping, 'which we will inject into', meta.typing);
          mergeTyping(newTyping, meta.typing);
          vlog('  - Typing data:', meta.typing);
        } else {
          vlog('Skipped .typing data of Param');
        }

        // Binding "owner" func node. In which scope was this binding bound?
        meta.bfuncNode = funcStack[funcStack.length - 1];
        break;
      }

      case 'WhileStatement:before': {
        const parentBlock = blockStack[blockStack.length - 1];
        if (ENABLE_REF_TRACKING) openRefsOnBeforeLoop(refTrackState, 'while', node, parentBlock);

        funcStack[funcStack.length - 1].$p.hasBranch = true;
        loopStack.push(node);
        break;
      }
      case 'WhileStatement:after': {
        const parentBlock = blockStack[blockStack.length - 1];
        if (ENABLE_REF_TRACKING) openRefsOnAfterLoop(refTrackState, 'while', node, parentBlock, path, globallyUniqueLabelRegistry, loopStack, tryNodeStack, catchStack);

        if (node.body.$p.alwaysCompletes?.size) {
          const whilePid = node.$p.npid;
          if (node.body.$p.alwaysCompletes.has(whilePid)) {
            // No need to propagate. At least one completion was the break for this loop so
            // code is able to continue with the next statement after the loop.
          } else {
            if (!node.$p.alwaysCompletes) node.$p.alwaysCompletes = new Set;
            node.body.$p.alwaysCompletes.forEach(pid => {
              if (pid !== whilePid) node.$p.alwaysCompletes.add(pid)
            });
          }
        }

        // Pop after the callback because it needs to find the current loop
        loopStack.pop();
        break;
      }
    }
    //const mafter = enableTiming && performance.now();
    //TIMING[key] = (TIMING[key] | 0) + (mafter - mbefore);

    if (!before && (parentNode?.type === 'Program' || parentNode?.type === 'BlockStatement')) {
      blockIndexes.pop();
    }

    vgroupEnd();
  }

  if (VERBOSE_TRACING) {
    dumpOpenRefsState(refTrackState, globallyUniqueNamingRegistry);

    vlog();
    vlog('Imports from:');
    vlog(
      [...imports.values()]
        .sort()
        .map((s) => '- "' + s + '"')
        .join('\n'),
    );
    vlog(
      '\ngloballyUniqueNamingRegistry (omits builtins, inc ref analysis)(3):\n' +
      ((globallyUniqueNamingRegistry.size - globals.size) > 50
        ? '<too many>'
        : globallyUniqueNamingRegistry.size === globals.size
        ? '<none>'
        : [...globallyUniqueNamingRegistry.entries()]
          .filter(([name, _meta]) => !globals.has(name))
          .map(([name, meta]) => {
            return `- ${name}: ${meta.reads.length} reads and ${meta.writes.length} writes\n${ENABLE_REF_TRACKING ?
              [
                Array.from(meta.reads),
                Array.from(meta.writes),
              ]
              .flat()
              .sort((a, b) => a.node.$p.npid - b.node.$p.npid)
              .map(rw => {
                return `  - ${
                  rw.action
                } @ ${
                  rw.node.$p.npid
                }, might ${rw.action === 'write' ? 'overwrite' : 'observe'} ${
                  reachAtString(rw.reachesWrites, 'writes')
                }${
                  !rw.reachedByReads ? '' : `, might be seen by ${reachAtString(rw.reachedByReads, 'reads')}`
                }${
                  !rw.reachedByWrites ? '' : ` and be overwritten by ${reachAtString(rw.reachedByWrites, 'writes')}`
                }\n`
              }).join('')
              : '(RefTracking was disabled)'
            }`;
          }).join('')
      ),
    );

    //currentState(fdata, 'after phase1');
  }

  log('\n\nEnd of phase 1. Walker called', called, 'times, took', Date.now() - start, 'ms');

  fdata.globallyUniqueNamingRegistry.forEach(meta => {
    ASSERT(meta.typing.mustBeType === false || !PRIMITIVE_TYPE_NAMES_PREVAL.has(meta.typing.mustBeType) === !meta.typing.mustBePrimitive, 'if it must be a primitive then mustbeprimitive', meta, meta.typing.mustBeType === false, meta.typing.mustBeType, !!PRIMITIVE_TYPE_NAMES_PREVAL.has(meta.typing.mustBeType), !!meta.typing.mustBePrimitive);
  });

  groupEnd();

  log('\nRegistered variables:', globallyUniqueNamingRegistry.size, ', of which', globals.size, 'builtins and', globallyUniqueNamingRegistry.size-globals.size, 'locals/implicits');

  refTrackState.trebs.clear(); // Clear ref tracking state...
  refTrackState.trabs.clear(); // Clear ref tracking state...

  if (enableTiming) {
    const mend = performance.now();
    TIMING.end = mend - mscoping;
    //Object.keys(TIMING).forEach(key => TIMING[key] = Math.floor(TIMING[key]))
    console.log(DIM + 'Phase1   timing:', JSON.stringify(TIMING).replace(/"|\.\d+/g, '').replace(/(:|,)/g, '$1 '), RESET);
  }
}

function reachAtString(set, what) {
  if (!set.size) {
    return `0 ${what}`;
  }
  return `${set.size} ${what} (@ ${Array.from(set).map(r => r.node.$p.npid).join(',')})`;
}
