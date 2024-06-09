import walk from '../../lib/walk.mjs';

import { VERBOSE_TRACING, RED, BLUE, DIM, RESET } from '../constants.mjs';
import { ASSERT, log, group, groupEnd, vlog, vgroup, vgroupEnd, tmat, fmat, source, REF_TRACK_TRACING } from '../utils.mjs';
import { $p, resetUid, getUid } from '../$p.mjs';
import * as AST from '../ast.mjs';
import {
  createReadRef,
  createWriteRef,
  getCleanTypingObject,
  getIdentUsageKind,
  getUnknownTypingObject,
  inferNodeTyping,
  mergeTyping,
  registerGlobalIdent,
} from '../bindings.mjs';
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
  openRefsOnAfterLabel,
} from '../utils/ref_tracking.mjs';
import { addLabelReference, registerGlobalLabel } from '../labels.mjs';

// This phase is fairly mechanical and should only do discovery, no AST changes.
// It sets up scope tracking, imports/exports tracking, return value analysis, ref tracking (which binding can see which binding). That sort of thing.
// It does replace Identifier nodes in the AST that are $$123 param names with a special custom Param node
// It runs twice; once for actual input code and once on normalized code.

export function phase1(fdata, resolve, req, firstAfterParse, passes, phase1s, refTest) {
  const ast = fdata.tenkoOutput.ast;

  const start = Date.now();

  const funcStack = []; // (also includes global/Program)
  const thisStack = []; // Only contains func exprs. Func decls are eliminated. Arrows do not have this/arguments. Not used for global.
  const blockStack = []; // Stack of nested blocks (functions, try/catch, or statements)
  const blockIds = []; // Stack of block pids. Negative if the parent was a loop of sorts. Functions insert a zero.
  const blockBodies = []; // Stack of blocks. Arrays of statements that is block.body or program.body
  const blockIndexes = []; // Stack of block indexes to match blockIds
  const ifIds = []; // Stack of `if` pids, negative for the `else` branch, zeroes for function boundaries. Used by SSA.
  const loopStack = []; // Stack of loop nodes (while, for-in, for-of). `null` means function (or program).
  const ifStack = [0];
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
    ') ::  ' +
      fdata.fname +
      ', pass=' + passes + ', phase1s=', phase1s, ', len:', fdata.len, '\n##################################\n\n\n',
  );
  try {
    if (VERBOSE_TRACING || REF_TRACK_TRACING) {
      const code = fmat(tmat(ast, true), true);
      console.log('\nCurrent state (start of phase1)\n--------------\n' + code + '\n--------------\n');
    }
  } catch (e) {
    vlog('printing ast failed');
    console.dir(ast, { depth: null });

    throw e;
  }
  vlog('\n\n\n####################################################################\n\n\n');

  resetUid();

  let called = 0;
  const now = Date.now();
  vlog(`RTT: phase1 (REF_TRACK_TRACING=${REF_TRACK_TRACING}, enable with --ref-tracing)\n`);
  if (REF_TRACK_TRACING) console.group();
  log('Walking AST...');
  walk(_walker, ast, 'ast');
  log('Walked AST in', Date.now() - now, 'ms');
  if (REF_TRACK_TRACING) console.groupEnd();
  vlog('End of phase1\n');

  function _walker(node, before, nodeType, path) {
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
      fdata.flatNodeMap.set(node.$p.pid, node);
    }

    vgroup(BLUE + nodeType + ':' + (before ? 'before' : 'after'), RESET, DIM, node.$p.pid, RESET);

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
    //vlog('ids/indexes:', blockIds, blockIndexes);

    switch (key) {
      case 'AssignmentExpression:after': {
        vlog('-', node.left.type, node.operator, node.right.type);
        if (node.left.type === 'Identifier') {
          const meta = fdata.globallyUniqueNamingRegistry.get(node.left.name);
          ASSERT(meta);
          vlog('Resolving .typing of `' + node.left.name + '` with the details of the rhs', node.right.type);
          const newTyping = inferNodeTyping(fdata, node.right);
          vlog('Results in', newTyping, 'which we will inject into', meta.typing);
          mergeTyping(newTyping, meta.typing);
          vlog('  - Typing data:', meta.typing);
        }
        break;
      }

      case 'Program:before': {
        funcStack.push(node);
        ifIds.push(0);
        blockBodies.push(node.body);
        blockIds.push(+node.$p.pid);
        blockStack.push(node); // Do we assign node or node.body?

        openRefsOnBeforeProgram(node);

        node.$p.promoParent = null;
        node.$p.blockChain = '0,';
        node.$p.funcChain = funcStack.map((n) => n.$p.pid).join(',');
        node.$p.ownBindings = new Set();
        node.$p.paramNames = []; // Ends up as a `meta.bfuncNode` in some cases, where this is expected to exist, so leave it.
        loopStack.push(null);

        break;
      }
      case 'Program:after': {
        funcStack.pop();
        ASSERT(funcStack.length === 0, 'stack should be empty now');
        blockBodies.pop();
        ASSERT(blockBodies.length === 0, 'stack should be empty now');
        blockIds.pop();
        ASSERT(blockIds.length === 0, 'stack should be empty now');
        ifIds.pop();
        ASSERT(ifIds.length === 0, 'stack should be empty now');
        blockStack.pop();
        ASSERT(blockStack.length === 0, 'stack should be empty now');
        loopStack.pop();
        ASSERT(loopStack.length === 0, 'stack should be empty now');

        openRefsOnAfterProgram(node);

        if (node.$p.earlyComplete) {
          vlog('Global contained at least one early completion');
        } else {
          vlog('Global does not complete early');
        }
        if (node.$p.alwaysComplete) {
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
        if (lip) left.$p.primitiveValue = AST.getPrimitiveValue(left);
        left.$p.isPrimitive = lip;
        const right = node.right;
        const rip = AST.isPrimitive(right);
        if (rip) right.$p.primitiveValue = AST.getPrimitiveValue(right);
        right.$p.isPrimitive = rip;
        break;
      }

      case 'BlockStatement:before': {
        node.$p.promoParent = blockStack[blockStack.length - 1];

        blockStack.push(node);
        openRefsOnBeforeBlock(node, parentNode, parentProp, pathNodes[pathNodes.length - 3], blockStack[blockStack.length - 2], globallyUniqueNamingRegistry);

        if (tryNodeStack.length) {
          if (tryNodeStack[tryNodeStack.length - 1].block === node) trapStack.push(node.$p.pid);
          else catchStack.push(node.$p.pid);
          //vlog('Checked for try:', tryNodeStack.map(n => n.$p.pid), trapStack, catchStack);
        }
        blockBodies.push(node.body);
        if (['WhileStatement', 'ForInStatement', 'ForOfStatement'].includes(parentNode.type)) {
          blockIds.push(-node.$p.pid); // Mark a loop
        } else {
          blockIds.push(+node.$p.pid);
        }

        //node.$p.blockChain = blockIds.join(',');

        if (parentNode.type === 'IfStatement') {
          if (parentNode.consequent === node) {
            ifIds.push(+parentNode.$p.pid);
            ifStack.push(+parentNode.$p.pid);
          } else if (parentNode.alternate === node) {
            ifIds.push(-parentNode.$p.pid);
            elseStack.push(+parentNode.$p.pid);
          }
        }

        break;
      }
      case 'BlockStatement:after': {
        node.$p.lastPid = getUid();
        blockStack.pop();
        blockBodies.pop();
        blockIds.pop();

        const parentBlock = blockStack[blockStack.length - 1];
        openRefsOnAfterBlock(node, path, parentNode, parentProp, pathNodes[pathNodes.length - 3], loopStack, parentBlock, globallyUniqueLabelRegistry, tryNodeStack, catchStack, globallyUniqueNamingRegistry);

        if (tryNodeStack.length) {
          if (tryNodeStack[tryNodeStack.length - 1].block === node) trapStack.pop();
          else catchStack.pop();
          //vlog('Checked for try:', tryNodeStack.map(n => n.$p.pid), trapStack, catchStack);
        }

        // A block has no early / explicit completion if it contains no statements
        node.body.forEach((cnode) => {
          if (cnode.$p.earlyComplete) {
            vlog('The block contained at least one early completion');
            node.$p.earlyComplete = true;
            if (cnode.$p.earlyReturn) node.$p.earlyReturn = true;
            if (cnode.$p.earlyThrow) node.$p.earlyThrow = true;
          }
          // The last node may be an explicit completion while not an early completion. May be both (nested block with early return).
          // Do not propagate the explicit returns from functions, unless it always throws.
          if (cnode.type === 'FunctionExpression') {
            // Ignore completion for this node. It does not affect control flow directly (until called).
          } else if (cnode.$p.alwaysComplete) {
            vlog('The block contained at least one explicit completion');
            node.$p.alwaysComplete = true;
            node.$p.alwaysReturn = cnode.$p.alwaysReturn;
            node.$p.alwaysThrow = cnode.$p.alwaysThrow;
          }
        });

        if (parentNode.type === 'IfStatement') {
          ifIds.pop();
          if (node === parentNode.consequent) {
            ifStack.pop();
          } else {
            elseStack.pop();
          }
        }

        ASSERT(blockIds.length, 'meh?');
        break;
      }

      case 'BreakStatement:before': {
        openRefsOnBeforeBreak(node, blockStack);

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
          addLabelReference(fdata, node.label, parentNode.body, parentIndex);
        }

        break;
      }
      case 'BreakStatement:after': {
        openRefsOnAfterBreak(node, blockStack);
        break;
      }

      case 'CallExpression:before': {
        ASSERT(
          node.callee.type !== 'Identifier' ||
            node.callee.name !== '$coerce' ||
            (node.arguments.length === 2 && AST.isPrimitive(node.arguments[1])),
          '$coerce is a custom symbol that we control. make sure it always conforms to normalized state.',
          node,
        );
        break;
      }

      case 'CatchClause:before': {
        // Note: the catch scope is set on node.handler of the try (parent node of the catch clause)

        const parentBlock = blockStack[blockStack.length - 1];
        openRefsOnBeforeCatchNode(node, parentNode, parentBlock);

        break;
      }

      case 'CatchClause:after': {
        const parentBlock = blockStack[blockStack.length - 1];
        openRefsOnAfterCatchNode(node, parentBlock, globallyUniqueLabelRegistry, loopStack, tryNodeStack);
        break;
      }

      case 'DebuggerStatement:before': {
        // Must be the only one and must be our header/body divider
        ASSERT(parentIndex >= 0);
        funcStack[funcStack.length - 1].$p.bodyOffset = parentIndex + 1;
        break;
      }

      case 'ForInStatement:before': {
        const parentBlock = blockStack[blockStack.length - 1];
        openRefsOnBeforeLoop('in', node, parentBlock);

        funcStack[funcStack.length - 1].$p.hasBranch = true;
        loopStack.push(node);
        break;
      }
      case 'ForInStatement:after': {
        const parentBlock = blockStack[blockStack.length - 1];
        openRefsOnAfterLoop('in', node, parentBlock, path, globallyUniqueLabelRegistry, loopStack, tryNodeStack, catchStack);

        // Pop after the callback because it needs to find the current loop
        loopStack.pop();
        break;
      }

      case 'ForOfStatement:before': {
        const parentBlock = blockStack[blockStack.length - 1];
        openRefsOnBeforeLoop('of', node, parentBlock);

        funcStack[funcStack.length - 1].$p.hasBranch = true;
        loopStack.push(node);
        break;
      }
      case 'ForOfStatement:after': {
        const parentBlock = blockStack[blockStack.length - 1];
        openRefsOnAfterLoop('of', node, parentBlock, path, globallyUniqueLabelRegistry, loopStack, tryNodeStack, catchStack);

        // Pop after the callback because it needs to find the current loop
        loopStack.pop();
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

        if (parentNode.type === 'ExpressionStatement') {
          vlog('Do not traverse function expression statement. I am not going to care about the contents.');
          vgroupEnd();
          return true;
        }

        blockIds.push(0); // Inject a zero to mark function boundaries
        ifIds.push(0);
        loopStack.push(null);

        if (firstAfterParse) {
          vlog('Converting parameter nodes to special Param nodes');
          node.params.forEach((pnode, i) => {
            node.params[i] = AST.param(pnode.type === 'RestElement' ? pnode.argument.name : pnode.name, pnode.type === 'RestElement');
          });
        }

        ASSERT(
          ['VariableDeclarator', 'AssignmentExpression', 'Property', 'MethodDefinition'].includes(parentNode.type),
          'normalized code should not other cases, right?',
          parentNode,
        );

        if (parentNode.type === 'VariableDeclarator' && pathNodes[pathNodes.length - 3].kind === 'const') {
          vlog('Bound as a constant as: `' + parentNode.id.name + '`');
          node.$p.uniqueName = parentNode.id.name;
        }

        node.$p.returnNodes = [];

        funcStack.push(node);
        thisStack.push(node);

        node.$p.funcChain = funcStack.map((n) => n.$p.pid).join(',');
        break;
      }
      case 'FunctionExpression:after': {
        funcStack.pop();
        blockIds.pop(); // the zero
        ifIds.pop(); // the zero
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
          const meta = globallyUniqueNamingRegistry.get(node.id.name);
          ASSERT(meta, 'there should be a meta for this name', node.id.name);
          meta.isImplicitGlobal = false;
        }

        if (node.body.$p.earlyComplete) {
          vlog('Function contained at least one early completion');
          node.$p.earlyComplete = node.body.$p.earlyComplete;
          node.$p.earlyReturn = node.body.$p.earlyReturn;
          node.$p.earlyThrow = node.body.$p.earlyThrow;
        } else {
          vlog('Function does not complete early');
        }
        if (node.body.$p.alwaysComplete) {
          vlog('Function always completes explicitly');
          node.$p.alwaysComplete = true;
          node.$p.alwaysReturn = node.body.$p.alwaysReturn;
          node.$p.alwaysThrow = node.body.$p.alwaysThrow;
        } else {
          vlog('Function may complete implicitly');
          ASSERT(false, 'Function may complete implicitly but it shouldnt');
        }
        break;
      }

      case 'Identifier:before': {
        if (parentNode.type === 'CatchClause') openRefsOnBeforeCatchVar();

        const currentScope = funcStack[funcStack.length - 1];
        const name = node.name;
        vlog(`Ident: \`${name}\``);
        ASSERT(name, 'idents must have valid non-empty names...', node);
        const kind = getIdentUsageKind(parentNode, parentProp);
        vlog(`- Ident kind: "${kind}"`);

        ASSERT(kind !== 'readwrite', 'I think readwrite is compound assignment (or unary inc/dec) and we eliminated those? prove me wrong', node);
        ASSERT(
          name !== '$coerce' ||
            (parentNode.type === 'CallExpression' &&
              parentProp === 'callee' &&
              parentNode.arguments.length === 2 &&
              AST.isStringLiteral(parentNode.arguments[1])),
          'we control $coerce, it should have a specific form all the time',
        );

        vlog(
          '- Parent: `' + parentNode.type + '.' + parentProp + '`',
          parentNode.type === 'MemberExpression' && node.computed ? 'computed' : 'regular',
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
            const greatGrandIndex = pathIndexes[pathIndexes.length - 3]; // Note: this is the index of the var decl, not the grandNode

            ASSERT(
              grandNode.type === 'VariableDeclarator' && grandProp === 'init' && greatGrandIndex >= 0,
              '`arguments.length` should only appear for the custom alias in normalized code',
              grandNode.type,
              grandProp,
              greatGrandIndex,
            );
            thisStack[thisStack.length - 1].$p.readsArgumentsLenAt = greatGrandIndex;
            thisStack[thisStack.length - 1].$p.readsArgumentsLenAs = grandNode.id.name; // Name of the alias
            thisStack[thisStack.length - 1].$p.readsArgumentsLen = true;
          } else if (parentNode.type === 'ExpressionStatement') {
            // A statement that is just `arguments`. :shrug:
            vlog('Ignoring `arguments` as an expression statement');
            //} else if (
            //  parentNode.type === 'VariableDeclaration' &&
            //  parentNode.declarations[0].id.name.startsWith(ARGUMENTS_ALIAS_PREFIX)
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
        else if (kind !== 'none' && kind !== 'label') {
          ASSERT(kind === 'read' || kind === 'write', 'consider what to do if this check fails', kind, node);
          let meta = registerGlobalIdent(fdata, name, name, { isExport: false, isImplicitGlobal: 'unknown', isBuiltin: false });
          vlog('- Binding referenced in $p.pid:', currentScope.$p.pid, ', reads so far:', meta.reads.length, ', writes so far:', meta.writes.length);
          ASSERT(kind !== 'readwrite', 'compound assignments and update expressions should be eliminated by normalization', node);

          openRefsOnBeforeRef(kind, node, parentNode, parentProp, parentIndex, meta);

          // This is normalized code so there must be a block parent for any read ref
          // Find the nearest block/program node
          let blockNode;
          let blockIndex;
          if (kind === 'read' || kind === 'write') {
            // Find the nearest block/program node. Start with the parent, not grandParent (!)
            let pathIndex = pathNodes.length - 1;
            do {
              blockNode = pathNodes[pathIndex];
              vlog('  - block step;', blockNode.type, blockNode.$p.pid);
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
          }

          const innerLoop = +(loopStack[loopStack.length - 1]?.$p.pid ?? 0);
          const innerIf = ifStack[ifStack.length - 1];
          ASSERT(typeof innerIf === 'number', 'ifstack should contain numbers', innerIf, ifStack);
          const innerElse = elseStack[elseStack.length - 1];
          ASSERT(typeof innerElse === 'number', 'ifstack should contain numbers', innerElse, elseStack);
          const innerTry = tryNodeStack[tryNodeStack.length - 1]?.$p.pid || 0;
          const innerTrap = trapStack[trapStack.length - 1];
          const innerCatch = catchStack[catchStack.length - 1];
          vlog('innerLoop:', innerLoop, ', innerIf:', innerIf, ', innerElse:', innerElse, ', innerTry:', innerTry, ', innerTrap:', innerTrap, ', innerCatch:', innerCatch);

          const grandNode = pathNodes[pathNodes.length - 3];
          const grandProp = pathProps[pathProps.length - 2];
          const grandIndex = pathIndexes[pathIndexes.length - 2];

          if (kind === 'read') {
            const blockNode = blockStack[blockStack.length - 1];
            // Note: this could be a property write, but it's not a binding mutation.
            // Note: this includes the write to a property, which does not read the property first, but which does not mutate the binding
            const blockBody = blockNode.body;
            const read
              = createReadRef({
              name,
              kind: grandNode.type === 'ExportNamedDeclaration' ? 'export' : 'read',
              isPropWrite: parentNode.type === 'MemberExpression' && grandNode.type === 'AssignmentExpression' && parentProp === 'object' && grandProp === 'left',
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
              scope: currentScope.$p.pid,
              blockChain: blockIds.join(',') + ',',
              blockIds: blockIds.slice(0),
              blockBodies: blockBodies.slice(0),
              blockIndexes: blockIndexes.slice(0),
              ifChain: ifIds.slice(0),
              funcChain: funcStack.map((n) => n.$p.pid).join(','),
              innerLoop,
              innerIf,
              innerElse,
              innerTry,
              innerTrap,
              innerCatch,
            });
            meta.reads.push(read);

            openRefsOnBeforeRead(read, blockNode, meta);
          }
          if (kind === 'write') {
            const blockNode = blockStack[blockStack.length - 1];
            const blockBody = blockNode.body;
            vlog('- Parent block:', blockNode.type, blockNode.$p.pid);

            const write
              = createWriteRef({
              name,
              kind: parentNode.type === 'VariableDeclarator' ? 'var' : parentNode.type === 'AssignmentExpression' ? 'assign' : 'other',
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
              scope: currentScope.$p.pid,
              blockChain: blockIds.join(',') + ',',
              blockIds: blockIds.slice(0),
              blockBodies: blockBodies.slice(0),
              blockIndexes: blockIndexes.slice(0),
              ifChain: ifIds.slice(0),
              funcChain: funcStack.map((n) => n.$p.pid).join(','),
              innerLoop,
              innerIf,
              innerElse,
              innerTry,
              innerTrap,
              innerCatch,
            });

            meta.writes.push(write);

            openRefsOnBeforeWrite(write, blockNode, meta);

            // Inject var decls at the top, append other writes at the end
            if (parentNode.type === 'VariableDeclarator') {
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
              // `for` lhs? not sure what else, currently. since we dont do catch clause yet and normalize everything else.
              ASSERT(
                parentNode.type === 'ForInStatement' ||
                  parentNode.type === 'ForOfStatement' ||
                  parentNode.type === 'ImportSpecifier' ||
                  parentNode.type === 'CatchClause' ||
                  parentNode.type === 'ClassExpression', // meh. i'm allowing it for now.
                'assign is var, assign, import, catch, or for ... right?',
                parentNode.type,
              );
              vlog('Clearing types because the write was not a var or an assignment expression...', parentNode.type);
              const newTyping = getUnknownTypingObject();
              mergeTyping(newTyping, meta.typing);
              vlog('Typing now:', meta.typing);
            }
          }

          openRefsOnAfterRef(kind, node, parentNode, parentProp, parentIndex, meta);

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


        if (parentNode.type === 'CatchClause') openRefsOnAfterCatchVar();
        break;
      }

      case 'IfStatement:before': {
        const parentBlock = blockStack[blockStack.length - 1];
        openRefsOnBeforeIf(node, parentBlock);

        funcStack[funcStack.length - 1].$p.hasBranch = true;
        break;
      }
      case 'IfStatement:after': {
        const parentBlock = blockStack[blockStack.length - 1];
        openRefsOnAfterIf(node, parentBlock, path, globallyUniqueNamingRegistry, globallyUniqueLabelRegistry, loopStack, blockStack, catchStack);

        if (node.consequent.$p.earlyComplete || node.alternate.$p.earlyComplete) {
          vlog('At least one branch had an early completion');
          node.$p.earlyComplete = true;
          node.$p.earlyReturn = node.consequent.$p.earlyReturn || node.alternate.$p.earlyReturn;
          node.$p.earlyThrow = node.consequent.$p.earlyThrow || node.alternate.$p.earlyThrow;
        }
        if (node.consequent.$p.alwaysComplete && node.alternate.$p.alwaysComplete) {
          vlog('Both branches complete explicitly');
          node.$p.alwaysComplete = true;
          node.$p.alwaysReturn = node.consequent.$p.alwaysReturn && node.alternate.$p.alwaysReturn;
          node.$p.alwaysThrow = node.consequent.$p.alwaysThrow && node.alternate.$p.alwaysThrow;
        }

        break;
      }

      case 'ImportDeclaration:before': {
        // Note: after normalization there should only be two kinds of imports;
        // - named imports, one imported symbol per decl, possibly with alias
        // - anonymous default import
        // TODO: and star import but we haven't bothered with that one yet...

        ASSERT(node.source && typeof node.source.value === 'string', 'fixme if else', node);
        const source = node.source.value;
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
        ASSERT(node.source && typeof node.source.value === 'string', 'fixme if else', node);
        const source = node.source.value;
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
        openRefsOnBeforeLabel(node, parentBlock);
        break;
      }
      case 'LabeledStatement:after': {
        if (node.body.$p.earlyComplete) {
          vlog('Label block/loop contained at least one early completion');
          node.$p.earlyComplete = true;
          node.$p.earlyReturn = node.body.$p.earlyReturn;
          node.$p.earlyThrow = node.body.$p.earlyThrow;
        }
        if (node.body.$p.alwaysComplete) {
          vlog('Label body completes explicitly');
          node.$p.alwaysComplete = true;
          node.$p.alwaysReturn = node.body.$p.alwaysReturn;
          node.$p.alwaysThrow = node.body.$p.alwaysThrow;
        }

        const parentBlock = blockStack[blockStack.length - 1];
        openRefsOnAfterLabel(node, parentBlock, path, globallyUniqueNamingRegistry, globallyUniqueLabelRegistry, loopStack, catchStack);
        break;
      }

      case 'Param:before': {
        ASSERT(
          parentProp === 'params' || parentProp === 'init',
          'this node should only be used as a placeholder for params or when binding the placeholder to the actual name',
        );
        ASSERT(!node.$p.paramVarDeclRef, 'each param should be referenced at most once');
        if (parentProp === 'init') {
          vlog('This is the param var decl. The param maps to `' + parentNode.id.name + '`');

          // This blockNode is the actual var decl `var p = $$0`
          const blockIndex = pathIndexes[pathIndexes.length - 3]; // (node is init of var decl, so two up, not one)
          vlog('The var decl of this param is at body[' + blockIndex + ']');

          const funcNode = funcStack[funcStack.length - 1];
          const funcHeaderParamNode = funcNode.params[node.index];
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

        parentNode.$p.alwaysComplete = true;
        parentNode.$p.alwaysReturn = true;
        funcNode.$p.alwaysComplete = true;
        funcNode.$p.alwaysReturn = true;
        markEarlyCompletion(node, funcNode, true, parentNode);

        openRefsOnBeforeReturn(blockStack, node);

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
        } else if (!AST.isPrimitive(b)) {
          vlog('the arg is not a primitive so setting commonReturn to null');
          funcNode.$p.commonReturn = null; // No longer use this
        } else if (a === undefined) {
          vlog('commonReturn was not set so setting it now');
          funcNode.$p.commonReturn = AST.cloneSimple(node.argument);
        } else if (a.type === b.type) {
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
        } else {
          vlog('- There are at least two different node types being returned. Setting commonMark to null');
          funcNode.$p.commonReturn = null; // No longer use this
        }

        vlog('Func commonReturn right now:', funcNode.$p.commonReturn);
        vgroupEnd();

        break;
      }

      case 'ReturnStatement:after': {
        openRefsOnAfterReturn(blockStack, node);
        break;
      }

      case 'TemplateLiteral': {
        ASSERT(
          node.expressions.length === 0 || ['ExpressionStatement', 'VariableDeclarator', 'AssignmentExpression'].includes(parentNode.type),
          'complex templates should have the same limitations as other complex expression nodes',
          parentNode,
        );
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
        // (similar logic to ReturnStatement)
        const funcNode = funcStack[funcStack.length - 1];
        parentNode.$p.alwaysComplete = true;
        parentNode.$p.alwaysThrow = true;
        funcNode.$p.alwaysComplete = true;
        funcNode.$p.alwaysThrow = true;
        markEarlyCompletion(node, funcNode, false, parentNode);
        node.$p.alwaysComplete = true;
        node.$p.alwaysThrow = true;
        // TODO: unless wrapped in a try/catch. Which we don't really track right now.
        if (funcNode.type === 'FunctionExpression') {
          funcNode.$p.throwsExplicitly = true;
        }

        openRefsOnBeforeThrow(blockStack, node);
        break;
      }

      case 'ThrowStatement:after': {
        openRefsOnAfterThrow(blockStack, node);
        break;
      }

      case 'TryStatement:before': {
        const parentBlock = blockStack[blockStack.length - 1];
        openRefsOnBeforeTryNode(node, parentBlock);

        tryNodeStack.push(node);
        break;
      }
      case 'TryStatement:after': {
        const parentBlock = blockStack[blockStack.length - 1];
        openRefsOnAfterTryNode(node, parentBlock, globallyUniqueLabelRegistry, loopStack);

        if (node.handler.param) {
          const meta = globallyUniqueNamingRegistry.get(node.handler.param.name);
          ASSERT(meta, 'there should be a meta for this name', node.handler.param.name);
          // May need to normalize this a bit...
          // For now, keep the binding as an implicit global. But annotate that this is a catch var.
          // This allows tests to ignore these bindings for the sake of reporting implicit global issues.
          meta.isCatchVar = true;
        }

        if (node.block.$p.earlyComplete || node.handler?.body.$p.earlyComplete) {
          vlog('At least one block of the try has an early completion');
          node.$p.earlyComplete = true;
          node.$p.earlyReturn = node.block.$p.earlyReturn || node.handler?.body.$p.earlyReturn;
          node.$p.earlyThrow = node.block.$p.earlyThrow || node.handler?.body.$p.earlyThrow;
        }
        if (node.block.$p.alwaysComplete && node.handler?.body.$p.alwaysComplete) {
          vlog('All blocks of the try complete explicitly');
          node.$p.alwaysComplete = true;
          node.$p.alwaysReturn = node.block.$p.alwaysReturn && node.handler?.body.$p.alwaysReturn;
          node.$p.alwaysThrow = node.block.$p.alwaysThrow && node.handler?.body.$p.alwaysThrow;
        }
        tryNodeStack.pop();
        break;
      }

      case 'VariableDeclaration:before': {
        vlog(node.kind, node.declarations[0]?.id?.name, '=', node.declarations[0]?.init?.type);
        break;
      }
      case 'VariableDeclaration:after': {
        ASSERT(node.declarations[0].id.type === 'Identifier', 'var ids are idents?', node.declarations[0]);
        vlog('- Id: `' + node.declarations[0].id.name + '`');
        ASSERT(node.declarations.length === 1, 'all decls should be normalized to one binding');
        ASSERT(node.declarations[0].id.type === 'Identifier', 'all patterns should be normalized away');
        ASSERT(node.declarations[0].init, 'normalized var decls must have an init', node);
        node.$p.promoParent = blockStack[blockStack.length - 1];
        const name = node.declarations[0].id.name;
        const init = node.declarations[0].init;
        const meta = globallyUniqueNamingRegistry.get(name);
        //const declWriteRef = meta.writes[meta.writes.length - 1]; // Last write should be this binding
        if (node.kind === 'const') {
          vlog('- marking', meta.uniqueName, 'as constant, ref set to', init.type);
          ASSERT(meta);
          meta.isConstant = true;
        }
        meta.isImplicitGlobal = false;
        ASSERT(
          parentNode.type === 'BlockStatement' || parentNode.type === 'Program',
          'all normalized var decls appear in blocks, right?',
          parentNode,
        );
        ASSERT(parentProp === 'body', 'amirite?', parentProp);
        meta.constValueRef = {
          // This is supposed to be the ref of the binding _value_, not the variable declaration node !
          // If the var decl is not a constant, this value has little meaning. But it is what it is.
          node: init,
          // This refers to the block where the var decl lives that declares the binding
          containerNode: node, // The var decl itself
          // containerParent[containerIndex] === containerNode
          containerParent: parentNode.body,
          containerIndex: parentIndex,
        };

        vlog('Resolving .typing details of the init');
        const newTyping = inferNodeTyping(fdata, node.declarations[0].init);
        vlog('Results in', newTyping, 'which we will inject into', meta.typing);
        mergeTyping(newTyping, meta.typing);
        vlog('  - Typing data:', meta.typing);

        // Binding "owner" func node. In which scope was this binding bound?
        meta.bfuncNode = funcStack[funcStack.length - 1];
        break;
      }

      case 'WhileStatement:before': {
        const parentBlock = blockStack[blockStack.length - 1];
        openRefsOnBeforeLoop('while', node, parentBlock);

        funcStack[funcStack.length - 1].$p.hasBranch = true;
        loopStack.push(node);
        break;
      }
      case 'WhileStatement:after': {
        const parentBlock = blockStack[blockStack.length - 1];
        openRefsOnAfterLoop('while', node, parentBlock, path, globallyUniqueLabelRegistry, loopStack, tryNodeStack, catchStack);

        // Pop after the callback because it needs to find the current loop
        loopStack.pop();
        break;
      }
    }

    if (!before && (parentNode?.type === 'Program' || parentNode?.type === 'BlockStatement')) {
      blockIndexes.pop();
    }

    vgroupEnd();
  }

  dumpOpenRefsState(globallyUniqueNamingRegistry);

  if (VERBOSE_TRACING) {
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
            return `- ${name}: ${meta.reads.length} reads and ${meta.writes.length} writes\n${
              [
                Array.from(meta.reads),
                Array.from(meta.writes),
              ]
              .flat()
              .sort((a, b) => a.node.$p.pid - b.node.$p.pid)
              .map(rw => {
                return `  - ${
                  rw.action
                } @ ${
                  rw.node.$p.pid
                }, might ${rw.action === 'write' ? 'overwrite' : 'observe'} ${
                  reachAtString(rw.reachesWrites, 'writes')
                }${
                  !rw.reachedByReads ? '' : `, might be seen by ${reachAtString(rw.reachedByReads, 'reads')}`
                }${
                  !rw.reachedByWrites ? '' : ` and be overwritten by ${reachAtString(rw.reachedByWrites, 'writes')}`
                }\n`
              }).join('')
            }`;
          }).join('')
      ),
    );

    //vlog('\nCurrent state (after phase1)\n--------------\n' + fmat(tmat(fdata.tenkoOutput.ast)) + '\n--------------\n');
  }

  fdata.phase1nodes = called / 2;
  log('\n\nEnd of phase 1. Walker called', called, 'times, took', Date.now() - start, 'ms');
  groupEnd();
}

function reachAtString(set, what) {
  if (!set.size) {
    return `0 ${what}`;
  }
  return `${set.size} ${what} (@ ${Array.from(set).map(r => r.node.$p.pid).join(',')})`;
}

function isTailNode(completionNode, tailNode) {
  ASSERT(completionNode);
  ASSERT(tailNode, 'tailNode must exist', tailNode);
  // In this context, a tail node is the last node of a function, or the last node of an `if` that is the last
  // node of a function or the last node of an if that is the last node of a function, repeating.
  if (completionNode === tailNode) return true;
  if (tailNode.type === 'IfStatement') {
    return (
      (tailNode.consequent.body.length === 0
        ? false
        : isTailNode(completionNode, tailNode.consequent.body[tailNode.consequent.body.length - 1])) ||
      (tailNode.alternate.body.length === 0
        ? false
        : isTailNode(completionNode, tailNode.alternate.body[tailNode.alternate.body.length - 1]))
    );
  }
  if (
    // Loops
    tailNode.type === 'WhileStatement' ||
    tailNode.type === 'ForInStatement' ||
    tailNode.type === 'ForOfStatement'
  ) {
    return tailNode.body.body.length === 0 ? false : isTailNode(completionNode, tailNode.body.body[tailNode.body.body.length - 1]);
  }
  if (
    // Try catch. Trickier because we have to consider the best and worst case.
    tailNode.type === 'TryStatement'
  ) {
    // Note: finally was eliminated so the Try must have a Catch
    // We should try to be conservative and only consider early completions if the completion node
    // is at the end of the try or catch block. At that point, I don't think it's relevant which block.
    // Hopefully this isn't a footgun and false positives don't blow up in my face. Eh foot. Eh ... you know.
    return (
      (tailNode.block.body.length === 0 ? false : isTailNode(completionNode, tailNode.block.body[tailNode.block.body.length - 1])) ||
      (!tailNode.handler || tailNode.handler.body.body.length === 0
        ? false
        : isTailNode(completionNode, tailNode.handler.body.body[tailNode.handler.body.body.length - 1]))
    );
  }
  if (tailNode.type === 'LabeledStatement') {
    // Note: body must be either a block or a loop. We generate labels as part of the switch transform and it can also occur in the wild
    if (tailNode.body.type === 'BlockStatement') {
      return tailNode.body.body.length === 0 ? false : isTailNode(completionNode, tailNode.body.body[tailNode.body.body.length - 1]);
    }

    ASSERT(
      tailNode.body.type === 'WhileStatement' || tailNode.body.type === 'ForInStatement' || tailNode.body.type === 'ForOfStatement',
      'normalized labels can only have blocks and loops as body',
    );
    ASSERT(
      completionNode !== tailNode.body,
      'completion node should be a completion and labels can only have blocks and loops as body in normalized code',
    );

    return false;
  }

  if (tailNode.type === 'BlockStatement') {
    ASSERT(false, 'This would be a nested block. I dont think this should happen in normalized code.');
  }

  return false;
}
function markEarlyCompletion(completionNode, funcNode, isReturn, parentNode) {
  // And early completion is a return/throw/break that is not the last statement of a function.
  // If the completion is the last statement of a branch then the other branch must not complete or not be last. Recursively.

  // From the end of the function. Check if the statement is the return, in that case bail because this is not early.
  // If the last statement is not `if`, then consider the completion early since DCE would have removed it otherwise.
  // If the last statement is an `if` then check if the return is the last statement of either branch. If not, check
  // if either branch ends with an if. Repeat exhaustively. If the completion was not the last statement of any `if`
  // in a tail position, then consider it an early completion.

  const body = funcNode.type === 'Program' ? funcNode.body : funcNode.body.body;
  ASSERT(body.length, 'the function containing this statement should have at least one statement eh');
  ASSERT(body[body.length - 1], 'body has no holes amirite', funcNode);
  if (isTailNode(completionNode, body[body.length - 1])) {
    vlog('markEarlyCompletion(); Completion node was found to be in a tail position of the function. Not an early return.');
    return;
  }
  vlog('markEarlyCompletion(); This was an early completion.');

  parentNode.$p.earlyComplete = true;
  if (completionNode.type === 'ReturnStatement') parentNode.$p.earlyReturn = true;
  else if (completionNode.type === 'ThrowStatement') parentNode.$p.earlyThrow = true;

  // TODO: this should automatically propagate to the function. We should add an assertion instead of this so we can verify that the values properly propagate through all statements.
  funcNode.$p.earlyComplete = true;
  if (completionNode.type === 'ReturnStatement') funcNode.$p.earlyReturn = true;
  else if (completionNode.type === 'ThrowStatement') funcNode.$p.earlyThrow = true;
}
