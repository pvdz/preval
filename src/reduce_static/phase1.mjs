import walk from '../../lib/walk.mjs';

import { VERBOSE_TRACING, RED, BLUE, DIM, RESET } from '../constants.mjs';
import { ASSERT, log, group, groupEnd, vlog, vgroup, vgroupEnd, tmat, fmat, source } from '../utils.mjs';
import { $p, resetUid, getUid } from '../$p.mjs';
import * as AST from '../ast.mjs';
import {
  getIdentUsageKind,
  createReadRef,
  createWriteRef,
  inferInitialType,
  registerGlobalIdent,
  registerGlobalLabel,
} from '../bindings.mjs';
import globals from '../globals.mjs';

// This phase is fairly mechanical and should only do discovery, no AST changes.
// It sets up scope tracking, imports/exports tracking, return value analysis. That sort of thing.
// It runs twice; once for actual input code and once on normalized code.

export function phase1(fdata, resolve, req, firstAfterParse) {
  const ast = fdata.tenkoOutput.ast;

  const start = Date.now();

  const funcStack = []; // (also includes global/Program)
  const thisStack = []; // Only contains func exprs. Func decls are eliminated. Arrows do not have this/arguments. Not used for global.
  const blockStack = []; // Stack of nested blocks (functions, try/catch/finally, or statements)
  const blockIds = []; // Stack of block pids. Negative if the parent was a loop of sorts. Functions insert a zero.
  const blockBodies = []; // Stack of blocks. Arrays of statements that is block.body or program.body
  const blockIndexes = []; // Stack of block indexes to match blockIds
  const ifIds = []; // Stack of `if` pids, negative for the `else` branch, zeroes for function boundaries. Used by SSA.
  const loopStack = []; // Stack of loop nodes (while, for-in, for-of). `null` means function (or program).
  let readWriteCounter = 0;
  const refStack = []; // Array<Map<name, {read,write}>> | null. For every branch referenced, for every binding name, track the last read and write. Functions inject a null. This information is useful if the binding is not used as a closure. Take care if a read in a loop reaches a write outside of a loop.

  // For each block,branch,loop,func; track the last writes, which decls were generated in this block, and whether it is a loop/func (?)
  // When going back up, drop all decls from the open set of writes. When going up a function, pop the writes entirely.
  const lastWritesPerName = []; // Array<Map<name, Set<Write>>>. One per scope. If we leave a scope, pop this state (or maybe do something smart first)
  const lastWritesAtStartPerLoop = [];

  const globallyUniqueNamingRegistry = new Map();
  fdata.globallyUniqueNamingRegistry = globallyUniqueNamingRegistry;
  const identNameSuffixOffset = new Map(); // <name, int>
  fdata.identNameSuffixOffset = identNameSuffixOffset;

  const globallyUniqueLabelRegistry = new Map();
  fdata.globallyUniqueLabelRegistry = globallyUniqueLabelRegistry;
  const labelNameSuffixOffset = new Map(); // <name, int>
  fdata.labelNameSuffixOffset = labelNameSuffixOffset;
  fdata.flatNodeMap = new Map(); // Map<pid, Node>

  globals.forEach((_, name) => {
    ASSERT(name);
    registerGlobalIdent(fdata, name, name, { isExport: false, isImplicitGlobal: false, isBuiltin: true });
  });

  const imports = new Map(); // Discovered filenames to import from. We don't care about the imported symbols here just yet.
  const exports = new Map();
  fdata.imports = imports;
  fdata.exports = exports;

  group(
    '\n\n\n##################################\n## phase1 (first=' +
      firstAfterParse +
      ') ::  ' +
      fdata.fname +
      '\n##################################\n\n\n',
  );
  vlog('\nCurrent state (start of phase1)\n--------------\n' + fmat(tmat(ast)) + '\n--------------\n');
  vlog('\n\n\n####################################################################\n\n\n');

  resetUid();

  let called = 0;
  walk(_walker, ast, 'ast');
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
      node.$p = $p();
      node.$p.funcDepth = funcStack.length;
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
      case 'Program:before': {
        funcStack.push(node);
        lastWritesPerName.push(new Map());
        ifIds.push(0);
        blockBodies.push(node.body);
        blockIds.push(+node.$p.pid);
        blockStack.push(node); // Do we assign node or node.body?
        refStack.push(new Map());
        node.$p.promoParent = null;
        node.$p.blockChain = '0';
        node.$p.funcChain = funcStack.map((n) => n.$p.pid).join(',');
        node.$p.ownBindings = new Set();
        node.$p.referencedNames = new Set();
        node.$p.paramNames = [];
        loopStack.push(0);
        break;
      }
      case 'Program:after': {
        funcStack.pop();
        ASSERT(funcStack.length === 0, 'stack should be empty now');
        lastWritesPerName.pop(); // Do we want to do something with this?
        ASSERT(lastWritesPerName.length === 0, 'stack should be empty now');
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
        refStack.pop();
        ASSERT(refStack.length === 0, 'stack should be empty now');

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
        blockStack.push(node); // Do we assign node or node.body?
        // Loops push their block id from the statement node, not the body node.
        const specialType = ['FunctionExpression', 'Program'].includes(parentNode.type)
          ? 'func'
          : ['WhileStatement', 'ForInStatement', 'ForOfStatement'].includes(parentNode.type)
          ? 'func'
          : 'other';
        blockBodies.push(node.body);
        refStack.push(new Map());
        if (['WhileStatement', 'ForInStatement', 'ForOfStatement'].includes(parentNode.type)) {
          blockIds.push(-node.$p.pid); // Mark a loop
        } else {
          blockIds.push(+node.$p.pid);
        }
        node.$p.blockChain = blockIds.join(',');
        if (parentNode.type === 'IfStatement') {
          // Last write analysis:
          //      Tricky ;) we need to store the last writes for the consequent first, then when entering
          //      the alternate branch replace it with the last writes as they were at the start of the
          //      consequent branch and store the end state after the consequent branch. Then after the
          //      alternate branch, replace the state with a union of the two branches, except without
          //      the state for branches that completed early (return/throw/continue/break). The break
          //      and continue case is far more complex since their state does need to be merged after
          //      the jump target (so to speak). Return and throw just forfeit the state since it must
          //      cross a function boundary at that point.
          //      If we are about to enter the consequent branch, backup the current last write state.
          //      Otherwise, backup the current last write state, replace it with the backed up state.
          //      The "after" handler should merge the two when returning from this node.

          if (parentNode.consequent === node) {
            ifIds.push(+parentNode.$p.pid);

            vlog('Entering `if`. Backup the top lastWriteStack state to parentNode.$p.lastWritesBackupBefore');
            const currentLastWritesClone = lastWrites_cloneLastMap(lastWritesPerName[lastWritesPerName.length - 1]);
            parentNode.$p.lastWritesBackupBefore = currentLastWritesClone;
          } else if (parentNode.alternate === node) {
            ifIds.push(-parentNode.$p.pid);

            vlog('Entering `else`. Backup the top lastWriteStack state, then restoring it to the way it was before this `if`');
            const currentLastWritesClone = lastWrites_cloneLastMap(lastWritesPerName[lastWritesPerName.length - 1]);
            parentNode.$p.lastWriteStackAfterIf = currentLastWritesClone;
            ASSERT(
              parentNode.$p.lastWritesBackupBefore,
              'where is parentNode.$p.lastWritesBackupBefore?',
              parentNode.$p.lastWritesBackupBefore,
            );
            lastWritesPerName[lastWritesPerName.length - 1] = parentNode.$p.lastWritesBackupBefore;
            parentNode.$p.lastWritesBackupBefore = 'used'; // delete reference. prevent dupe references etc.
          } else {
            ASSERT(false);
          }
        } else if (parentNode.type === 'TryStatement') {
          // Last write analysis:
          //      This is roughly the same as the `if`. Worst case we have to assume a binding might be manipulated by
          //      any of the three blocks so they must be merged after the block.
          //      Since the (first) block may break at any point while having any partial step of it observable after
          //      we must consider the writes potentially reachable after the try. So we merge, like we do in the `if`.
          //      The catch clause may be executed or not, so same deal. However, the finally block, if it exists, must
          //      always be executed and is not trapped any further. So for the purpose of last write tracking, we can
          //      consider it a regularly nested block. Do the merges for try/catch and do not treat this block special.

          // Note: this must be the block (first one) or the finalizer. The catch will be child of a CatchClause.
          if (parentProp === 'block') {
            vlog('Before the try-block. Backup the top lastWriteStack state to parentNode.$p.lastWritesBackupBefore');
            const currentLastWritesClone = lastWrites_cloneLastMap(lastWritesPerName[lastWritesPerName.length - 1]);
            parentNode.$p.lastWritesBackupBefore = currentLastWritesClone;
          } else if (parentProp === 'finalizer') {
            if (parentProp.handler) {
              // Wost case, the finally block runs when either the try block runs completely, or the catch
              // block runs completely (or almost both). It's also possible that both blocks crash immediately
              // which means the before state may still be relevant as well. So merge all three states here.
              vlog('Before the final block. There was a catch. Merge the before, try, and catch states.');
              // Merge the catch state with the try state and before state. Use that for the rest.
              const lastWritesBefore = parentNode.$p.lastWritesBackupBefore;
              const lastWritesTry = parentNode.$p.lastWritesBackupTry;
              const lastWritesCatch = lastWritesPerName[lastWritesPerName.length - 1];

              ASSERT(lastWritesBefore && lastWritesTry && lastWritesCatch, 'should have three states');

              // Now merge the before and try state into lastWritesCatch (current) and leave it there
              lastWrite_mergeLastWriteMapsByRef(lastWritesBefore, lastWritesCatch);
              lastWrite_mergeLastWriteMapsByRef(lastWritesTry, lastWritesCatch);

              parentNode.$p.lastWritesBackupBefore = 'used';
              parentNode.$p.lastWritesBackupTry = 'used';
            } else {
              // Worst case the try block crashed immediately (making the before state relevant). Best case
              // it ran to completion (making the try block relevant). So merge them both here.
              vlog('Before the final block. This `try` has no catch. Merge the try state with the before state.');

              // Current is try state. Merge the before state into it. Use that for the rest.
              const lastWritesBefore = parentNode.$p.lastWritesBackupBefore;
              const lastWritesTry = lastWritesPerName[lastWritesPerName.length - 1];

              ASSERT(lastWritesBefore && lastWritesTry, 'should have two states');

              // Now merge the before and try state into lastWritesCatch (current) and leave it there
              lastWrite_mergeLastWriteMapsByRef(lastWritesBefore, lastWritesTry);

              parentNode.$p.lastWritesBackupBefore = 'used';
            }
          } else {
            ASSERT(false);
          }
        } else if (parentNode.type === 'CatchClause') {
          // Worst case the try block crashed immediately (making the before state relevant). Best case
          // it ran to completion (making the try block relevant). So merge them both here.
          vlog('Before the catch block. Merge the try state with the before state.');

          const grandNode = pathNodes[pathNodes.length - 3];

          // Current is try state. Merge the before state into it. Use that for the rest.
          const lastWritesBefore = grandNode.$p.lastWritesBackupBefore;
          const lastWritesTry = lastWritesPerName[lastWritesPerName.length - 1];
          grandNode.$p.lastWritesBackupTry = lastWrites_cloneLastMap(lastWritesTry);

          ASSERT(lastWritesBefore && lastWritesTry, 'should have two states');

          // Now merge the before and try state into lastWritesCatch (current) and leave it there
          lastWrite_mergeLastWriteMapsByRef(lastWritesBefore, lastWritesTry);
        }

        vlog(
          'last writes:',
          [...lastWritesPerName[lastWritesPerName.length - 1].entries()].map(([v, k]) => v + ':' + k.size),
        );

        break;
      }
      case 'BlockStatement:after': {
        node.$p.lastPid = getUid();
        blockStack.pop();
        blockBodies.pop();
        blockIds.pop();
        refStack.pop();

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

        vlog('Last write analysis');
        vlog(
          '  - last writes before:',
          [...lastWritesPerName[lastWritesPerName.length - 1].entries()].map(([v, k]) => v + ':' + k.size),
        );
        const currentLastWrites = lastWritesPerName[lastWritesPerName.length - 1];
        if (parentNode.type === 'IfStatement') {
          if (node === parentNode.consequent) {
            // Ignore the `if` branch. Wait for completion of the `else` branch.
            vlog('This was the `if` branch of an `if`. Skipping until else-branch');
          } else {
            vlog('This was the `else` branch of an `if`');
            // Last write analysis:
            //      Ok, merge the backed up consequent end state into the current end state. The "last writes" for both
            //      branches are reachable for reads that follow the if. Early completions are handled through other rules.
            lastWrite_mergeLastWriteMapsByRef(parentNode.$p.lastWriteStackAfterIf, currentLastWrites);
            parentNode.$p.lastWriteStackAfterIf = 'used';
          }
        } else if (['WhileStatement', 'ForInStatement', 'ForOfStatement'].includes(parentNode.type)) {
          // Last write analysis:
          //      Merge the lastWriteStack with the backup at the start of the loop, stored in lastWritesAtStartPerLoop.
          //      Semantically speaking, the writes reachable at the start of the loop are always reachable after the loop
          //      if the loop condition was always false. That is our worst case so that's why we must merge.
          //      I believe I should not do early completion analysis here because it would mess with try/catch/finally
          //      and it's implicitly handled in if-else through other rules. :shrug:
          const before = lastWritesAtStartPerLoop[lastWritesAtStartPerLoop.length - 1];
          lastWrite_mergeLastWriteMapsByRef(before.allWrites, currentLastWrites);
        } else if (parentNode.type === 'TryStatement') {
          // Skip the try, and skip the catch if there's a finalizer
          // Otherwise don't do anything here (for last writes). It is handled in the block:before.
          if (parentProp === 'finalizer') {
            vlog('Exiting the try. Replacing the last writes with that of the `finally` block');
            // Eh. So we don't need to do anything.
          } else {
            vlog('Not the last block of the try. Noop');
          }
        } else if (parentNode.type === 'CatchClause') {
          if (parentNode.finalizer) {
            vlog('This was a catch block and there is a finalizer so we dont do anything (the before visitor will fix it)');
          } else {
            vlog('This was a catch block and there was no catch block. Merge the current last writes set with the try block state');
            // Make the current last writes set be the result of the catch and the try

            // The CatchClause has an extra layer in the AST :(
            const grandNode = pathNodes[pathNodes.length - 3];

            const lastWritesCatch = currentLastWrites;
            const lastWritesTry = grandNode.$p.lastWritesBackupTry;

            ASSERT(lastWritesTry && lastWritesCatch, 'should have two states');

            // Now merge the before and try state into lastWritesCatch (current) and leave it there
            lastWrite_mergeLastWriteMapsByRef(lastWritesTry, lastWritesCatch);

            grandNode.$p.lastWritesBackupTry = 'used';
          }
        } else {
          // This Block was a function or label or something. But not an if or loop or try. Assuming linear flow
          // which means the reachable writes are all reachable after this block, verbatim.
          vlog('Last writes stack does not change because this block does not change flow.');
        }
        vlog(
          '  - last writes after:',
          [...currentLastWrites.entries()].map(([v, k]) => v + ':' + k.size),
        );

        if (parentNode.type === 'IfStatement') {
          ifIds.pop();
        }
        ASSERT(blockIds.length, 'meh?');
        break;
      }

      case 'BreakStatement:before':
      case 'ContinueStatement:before': {
        // TODO: with the new normalization rules, do we still have labels, break, and continue here?
        // Note: continue/break state is verified by the parser so we should be able to assume this continue/break has a valid target
        if (node.label) {
          const name = node.label.name;
          vlog('Label:', name);

          ASSERT(
            fdata.globallyUniqueLabelRegistry.has(node.label.name),
            'the label should be registered',
            node,
            fdata.globallyUniqueLabelRegistry,
          );
          fdata.globallyUniqueLabelRegistry.get(node.label.name).usages.push({
            node,
            parentNode,
            parentProp,
            parentIndex,
          });
        }

        break;
      }

      //case 'CatchClause:before': {
      //  // Note: the catch scope is set on node.handler of the try (parent node of the catch clause)
      //  break;
      //}

      case 'DebuggerStatement:before': {
        // Must be the only one and must be our header/body divider
        ASSERT(parentIndex >= 0);
        funcStack[funcStack.length - 1].$p.bodyOffset = parentIndex + 1;
        break;
      }

      case 'ForInStatement:before': {
        node.$p.outReads = new Set(); // All reads inside this loop that reach a write outside of this loop (they also reach "last writes" at the end of this loop)
        funcStack[funcStack.length - 1].$p.hasBranch = true;
        loopStack.push(+node.$p.pid);
        const currentLastWritesClone = lastWrites_cloneLastMap(lastWritesPerName[lastWritesPerName.length - 1]);
        lastWritesAtStartPerLoop.push({ loopNode: node, allWrites: currentLastWritesClone });
        break;
      }
      case 'ForInStatement:after': {
        loopStack.pop();

        const lastWritesAtLoopStart = lastWritesAtStartPerLoop.pop();
        const currentLastWriteMapForName = lastWritesPerName[lastWritesPerName.length - 1];
        lastWrites_closeTheLoop(lastWritesAtLoopStart, currentLastWriteMapForName);
        break;
      }

      case 'ForOfStatement:before': {
        node.$p.outReads = new Set(); // All reads inside this loop that reach a write outside of this loop (they also reach "last writes" at the end of this loop)
        funcStack[funcStack.length - 1].$p.hasBranch = true;
        loopStack.push(+node.$p.pid);
        const currentLastWritesClone = lastWrites_cloneLastMap(lastWritesPerName[lastWritesPerName.length - 1]);
        lastWritesAtStartPerLoop.push({ loopNode: node, allWrites: currentLastWritesClone });
        break;
      }
      case 'ForOfStatement:after': {
        loopStack.pop();

        const lastWritesAtLoopStart = lastWritesAtStartPerLoop.pop();
        const currentLastWriteMapForName = lastWritesPerName[lastWritesPerName.length - 1];
        lastWrites_closeTheLoop(lastWritesAtLoopStart, currentLastWriteMapForName);
        break;
      }

      case 'FunctionExpression:before': {
        node.$p.blockChain = blockIds.join(',');
        node.$p.ownBindings = new Set();
        node.$p.referencedNames = new Set();
        node.$p.paramNames = [];
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
        loopStack.push(0);
        refStack.push(null); // Dont let reads "reach" writes in an upper scope.
        lastWritesAtStartPerLoop.push(null); // Mark function boundary

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
        lastWritesPerName.push(new Map());
        thisStack.push(node);

        node.$p.funcChain = funcStack.map((n) => n.$p.pid).join(',');
        break;
      }
      case 'FunctionExpression:after': {
        funcStack.pop();
        lastWritesPerName.pop(); // Do we want to do something smart here?
        blockIds.pop(); // the zero
        ifIds.pop(); // the zero
        loopStack.pop();
        ASSERT(blockIds.length, 'meh3?');
        thisStack.pop();
        refStack.pop();
        lastWritesAtStartPerLoop.pop(); // null

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
          ASSERT(false, 'but it shouldnt');
        }
        break;
      }

      case 'Identifier:before': {
        const currentScope = funcStack[funcStack.length - 1];
        const name = node.name;
        vlog('Ident:', name);
        ASSERT(name, 'idents must have valid non-empty names...', node);
        const kind = getIdentUsageKind(parentNode, parentProp);
        vlog('- Ident kind:', kind);

        ASSERT(kind !== 'readwrite', 'I think readwrite is compound assignment and we eliminated those? prove me wrong', node);

        vlog(
          '- Parent: `' + parentNode.type + '.' + parentProp + '`',
          parentNode.type === 'MemberExpression' && node.computed ? 'computed' : 'regular',
        );

        if (kind === 'read' && name === 'arguments' && thisStack.length) {
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
        } else if ((kind === 'read' || kind === 'write') && /^\$\$\d+$/.test(name)) {
          const paramNode = AST.param(name, false);
          vlog('This is a special param "keyword" by Preval. Replacing ident with param node;', paramNode);
          if (parentIndex < 0) parentNode[parentProp] = paramNode;
          else parentNode[parentProp][parentIndex] = paramNode;
        } else if (kind !== 'none' && kind !== 'label') {
          ASSERT(kind === 'read' || kind === 'write', 'consider what to do if this check fails', kind, node);
          vlog('- Binding referenced in $p.pid:', currentScope.$p.pid);
          let meta = registerGlobalIdent(fdata, name, name, { isExport: false, isImplicitGlobal: 'unknown', isBuiltin: false });
          ASSERT(kind !== 'readwrite', 'compound assignments and update expressions should be eliminated by normalization', node);

          // This is normalized code so there must be a block parent for any read ref
          let blockNode;
          let blockIndex;
          if (kind === 'read' || kind === 'write') {
            // Start with the parent, not grandParent (!)
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

          const innerLoop = loopStack[loopStack.length - 1];
          vlog('innerLoop:', innerLoop);

          const grandNode = pathNodes[pathNodes.length - 3];
          const grandProp = pathProps[pathProps.length - 2];
          const grandIndex = pathIndexes[pathIndexes.length - 2];

          if (kind === 'read') {
            // TODO: what if both branches of an if have a write? Or all branches of a nested if? We'd want to model that.
            // TODO: what if a branch had a write and an early return, but not the other? How do we track this properly?
            let prevWrite = undefined;
            for (let n = refStack.length - 1; n >= 0 && !prevWrite; --n) {
              const rcMap = refStack[n];
              if (!rcMap) break; // Function boundary.
              if (rcMap.has(name)) {
                prevWrite = rcMap.get(name).write;
              }
            }
            // Now prevWrite should be the last write this read can reach without moving past a function boundary
            // If undefined, then there was no previous write in the same scope. Says nothing about loops or early returns.

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
              pfuncNode: currentScope,
              node,
              rwCounter: ++readWriteCounter,
              scope: currentScope.$p.pid,
              blockChain: blockIds.join(','),
              blockIds: blockIds.slice(0),
              blockBodies: blockBodies.slice(0),
              blockIndexes: blockIndexes.slice(0),
              ifChain: ifIds.slice(0),
              funcChain: funcStack.map((n) => n.$p.pid).join(','),
              innerLoop,
              prevWrite,
            });
            meta.reads.push(read);

            const currentLastWriteMapForName = lastWritesPerName[lastWritesPerName.length - 1];
            let currentLastWriteSetForName = currentLastWriteMapForName.get(name);
            vlog('Last write analysis; this read can reach', currentLastWriteSetForName?.size ?? 0, 'writes...');
            if (currentLastWriteSetForName) {
              // This is the write(s) this read can reach. Can be multiple, for example after two writes in a branch.
              currentLastWriteSetForName.forEach((write) => {
                // Point to each other
                write.reachedBy.add(read);
                read.reaches.add(write);
              });
              // Now check whether this read crosses any loop boundary (must check all, in case nested, until we encounter
              // the block containing the binding, which we must invariably encounter at some point in normalized code).

              // No matter how nested the read is, it should be added to the outReads for any block up to the block with decl
              // let a, b, c, d, e;
              // f(d); // 0x
              // while (true) {
              //   f(a); // 1x
              //   c = 1;
              //   if ($) e = 1;
              //   while (true) {
              //     f(b); // 2x
              //     while (true) {
              //       f(c); // 2x (!)
              //       f(e); // 2x (but none of the parents will have a blockchain match!)
              //     }
              //   }
              // }

              // Walk the stack backwards. Stop at function boundaries (element is null) or end.
              // We walk all the loops in current function because we don't really know when to stop, but in the real
              // world the worst case should not be morse than a handful of loops, so I think it's fine.
              for (let i = lastWritesAtStartPerLoop.length - 1; i >= 0; --i) {
                const lastWritesAtLoopStart = lastWritesAtStartPerLoop[i];
                if (lastWritesAtLoopStart === null) break; // Function boundary

                const lastWrites = lastWritesAtLoopStart.allWrites.get(name);
                if (lastWrites) {
                  // At the end of this loop, connect all outReads reads to the bindings still open at that point.
                  // The idea here is if the loop loops, these last writes are now going to be read by these reads.
                  lastWritesAtLoopStart.loopNode.$p.outReads.add(read);
                }
              }
            }

            let cache = refStack[refStack.length - 1].get(name);
            if (cache) {
              cache.read = read;
            } else {
              cache = { read, write: undefined };
              refStack[refStack.length - 1].set(cache);
            }

            currentScope.$p.referencedNames.add(name);
          }
          if (kind === 'write') {
            const blockBody = blockNode.body;
            vlog('- Parent block:', blockNode.type, blockNode.$p.pid);

            const write = createWriteRef({
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
              pfuncNode: currentScope,
              node,
              rwCounter: ++readWriteCounter,
              scope: currentScope.$p.pid,
              blockChain: blockIds.join(','),
              blockIds: blockIds.slice(0),
              blockBodies: blockBodies.slice(0),
              blockIndexes: blockIndexes.slice(0),
              ifChain: ifIds.slice(0),
              funcChain: funcStack.map((n) => n.$p.pid).join(','),
              innerLoop,
            });

            let cache = refStack[refStack.length - 1].get(name);
            if (cache) {
              cache.write = write;
            } else {
              cache = { read: undefined, write };
              refStack[refStack.length - 1].set(cache);
            }

            // This needs to overwrite the current reachable write (if any)
            const currentLastWriteMap = lastWritesPerName[lastWritesPerName.length - 1];
            let currentLastWriteSetForName = currentLastWriteMap.get(name);
            vlog(
              'Last write analysis: this binding had',
              currentLastWriteSetForName?.size ?? 0,
              'reachable writes before this one. Replacing the reachable writes for this binding with this one.',
            );
            currentLastWriteMap.set(name, new Set([write]));

            if (parentNode.type === 'VariableDeclarator') {
              ASSERT(parentProp === 'id', 'the read check above should cover the prop=init case');
              vlog('- Adding decl write');

              currentScope.$p.ownBindings.add(name);
              meta.writes.unshift(write);
            } else if (parentNode.type === 'AssignmentExpression') {
              ASSERT(parentProp === 'left', 'the read check above should cover the prop=right case');
              ASSERT(
                pathNodes[pathNodes.length - 3].type === 'ExpressionStatement',
                'assignments must be normalized to statements',
                pathNodes[pathNodes.length - 3],
              );
              vlog('Adding assign write');
              meta.writes.push(write);
            } else if (parentNode.type === 'FunctionDeclaration') {
              ASSERT(false, 'all function declarations should have been eliminated during hoisting');
            } else if (parentProp === 'params' && parentNode.type === 'FunctionExpression') {
              ASSERT(false, 'actual params are special nodes now and original params are local bindings so this should not trigger');
            } else {
              // for-x lhs, not sure what else. not param.
              vlog('Adding "other" write');
              meta.writes.push(write);
            }
          }

          if (node.name === 'undefined') {
            meta.typing.mustBeType = 'undefined';
            meta.typing.mustBeFalsy = true;
            meta.typing.mustBeTruthy = false;
            meta.typing.isPrimitive = true;
            meta.typing.primitiveValue = undefined;
          } else if (node.name === 'Infinity') {
            meta.typing.mustBeType = 'number';
            meta.typing.mustBeFalsy = false;
            meta.typing.mustBeTruthy = true;
            meta.typing.rangeStart = Infinity; // Or should we not set this? Kinda useless?
            meta.typing.rangeEnd = Infinity;
            meta.typing.isPrimitive = true;
            meta.typing.primitiveValue = Infinity;
          } else if (node.name === 'NaN') {
            meta.typing.mustBeType = 'number';
            meta.typing.mustBeFalsy = true;
            meta.typing.mustBeTruthy = false;
            meta.typing.isPrimitive = true;
            meta.typing.primitiveValue = NaN;
          }

          // Resolve whether this was an export. If so, mark the name as such.
          // After normalization there should only be named exports without declarations and
          // anonymous default exports. This ident won't be part of the latter :p
          // TODO: local vs exported. also: exports are neither read nor write. well, pseudo read maybe?
          if (grandNode.type === 'ExportNamedDeclaration') {
            vlog('Marking `' + name + '` as being an export');
            meta.isExport = true;
          }
        } else {
          vlog(RED + '- skipping; not a binding' + RESET);
        }

        break;
      }

      case 'IfStatement:before': {
        funcStack[funcStack.length - 1].$p.hasBranch = true;
        break;
      }
      case 'IfStatement:after': {
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
        // TODO: with the new normalization rules, do we still have labels, break, and continue here?
        vlog('Label:', node.label.name);
        registerGlobalLabel(fdata, node.label.name, node.label.name, node);
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

          funcNode.$p.paramNames.push(parentNode.id.name);
        } else {
          vlog('This is the param');
          // This is the func param (!) `function ($$0) {`
        }
        break;
      }

      case 'ReturnStatement:before': {
        const funcNode = funcStack[funcStack.length - 1];

        funcNode.$p.returnNodes.push(node);

        markEarlyCompletion(node, funcNode, true, parentNode);

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

      case 'TemplateLiteral': {
        ASSERT(
          node.expressions.length === 0 || ['ExpressionStatement', 'VariableDeclarator', 'AssignmentExpression'].includes(parentNode.type),
          'complex templates should have the same limitations as other complex expression nodes',
          parentNode,
        );
        break;
      }

      case 'TryStatement:after': {
        if (node.block.$p.earlyComplete || node.handler?.body.$p.earlyComplete || node.finalizer?.$p.earlyComplete) {
          vlog('At least one block of the try has an early completion');
          node.$p.earlyComplete = true;
          node.$p.earlyReturn = node.block.$p.earlyReturn || node.handler?.body.$p.earlyReturn || node.finalizer?.$p.earlyReturn;
          node.$p.earlyThrow = node.block.$p.earlyThrow || node.handler?.body.$p.earlyThrow || node.finalizer?.$p.earlyThrow;
        }
        if (node.block.$p.alwaysComplete && node.handler?.body.$p.alwaysComplete && node.finalizer?.$p.alwaysComplete) {
          vlog('All blocks of the try complete explicitly');
          node.$p.alwaysComplete = true;
          node.$p.alwaysReturn = node.block.$p.alwaysReturn && node.handler?.body.$p.alwaysReturn && node.finalizer?.$p.alwaysReturn;
          node.$p.alwaysThrow = node.block.$p.alwaysThrow && node.handler?.body.$p.alwaysThrow && node.finalizer?.$p.alwaysThrow;
        }
        break;
      }

      case 'ThrowStatement:before': {
        // (similar logic to ReturnStatement)
        const funcNode = funcStack[funcStack.length - 1];
        markEarlyCompletion(node, funcNode, false, parentNode);
        node.$p.alwaysComplete = true;
        node.$p.alwaysThrow = true;
        // TODO: unless wrapped in a try/catch. Which we don't really track right now.
        if (funcNode.type === 'FunctionExpression') {
          funcNode.$p.throwsExplicitly = true;
        }
        break;
      }

      case 'ThisExpression:after': {
        if (thisStack.length) {
          vlog('Marking func as having `this` access');
          thisStack[thisStack.length - 1].$p.thisAccess = true;
        }
        break;
      }

      case 'VariableDeclaration:before': {
        vlog(node.kind, node.declarations[0]?.id?.name, '=', node.declarations[0]?.init?.type);
        break;
      }
      case 'VariableDeclaration:after': {
        vlog('- Id: `' + node.declarations[0].id.name + '`');
        ASSERT(node.declarations.length === 1, 'all decls should be normalized to one binding');
        ASSERT(node.declarations[0].id.type === 'Identifier', 'all patterns should be normalized away');
        ASSERT(node.declarations[0].init, 'normalized var decls must have an init', node);
        node.$p.promoParent = blockStack[blockStack.length - 1];
        const init = node.declarations[0].init;
        const meta = globallyUniqueNamingRegistry.get(node.declarations[0].id.name);
        if (node.kind === 'const') {
          vlog('- marking', meta.uniqueName, 'as constant, ref set to', node.declarations[0].init.type);
          ASSERT(meta);
          meta.isConstant = true;

          switch (init.type) {
            case 'Literal': {
              let value = undefined; // a literal would never be undefined
              if (init.raw === 'null') {
                meta.typing.mustBeType = 'null';
                value = null;
              } else if (typeof init.value === 'boolean') {
                meta.typing.mustBeType = 'boolean';
                value = init.value;
              } else if (typeof init.value === 'number') {
                value = init.value;
                meta.typing.mustBeType = 'number';
                meta.typing.rangeStart = value;
                meta.typing.rangeEnd = value;
                //const oneBit = isOneSetBit(init.value);
                //if (oneBit) {
                //  meta.typing.oneBitSet = oneBit;
                //}
              } else if (init.value instanceof RegExp) {
                meta.typing.mustBeType = 'regex';
                value = init.value;
              } else {
                // TODO. bigint?
              }
              if (value !== undefined) {
                meta.typing.mustBeValue = value;
                meta.typing.mustBeFalsy = !value;
                meta.typing.mustBeTruthy = !!value;
                meta.typing.isPrimitive = true;
                meta.typing.primitiveValue = value;
              }
              break;
            }
            case 'TemplateLiteral': {
              if (AST.isStringLiteral(init)) {
                meta.typing.mustBeType = 'string';
                const value = AST.getStringValue(init);
                meta.typing.mustBeValue = value;
                meta.typing.mustBeFalsy = !value;
                meta.typing.mustBeTruthy = !!value;
                meta.typing.isPrimitive = true;
                meta.typing.primitiveValue = value;
              } else {
                meta.typing.mustBeFalsy = AST.isFalsy(init);
                meta.typing.mustBeTruthy = AST.isTruthy(init);
                meta.typing.isPrimitive = true;
              }
              break;
            }
            case 'Identifier': {
              if (init.name === 'undefined') {
                meta.typing.mustBeType = 'undefined';
                meta.typing.mustBeFalsy = true;
                meta.typing.mustBeTruthy = false;
                meta.typing.isPrimitive = true;
                meta.typing.primitiveValue = undefined;
              } else if (init.name === 'Infinity') {
                meta.typing.mustBeType = 'number';
                meta.typing.mustBeFalsy = false;
                meta.typing.mustBeTruthy = true;
                meta.typing.rangeStart = Infinity; // Or should we not set this? Kinda useless?
                meta.typing.rangeEnd = Infinity;
                meta.typing.isPrimitive = true;
                meta.typing.primitiveValue = Infinity;
              } else if (init.name === 'NaN') {
                meta.typing.mustBeType = 'number';
                meta.typing.mustBeFalsy = true;
                meta.typing.mustBeTruthy = false;
                meta.typing.isPrimitive = true;
                meta.typing.primitiveValue = NaN;
              } else {
                // "something else". But maybe we can infer that with scope tracking...
              }
              break;
            }
            case 'UnaryExpression': {
              switch (init.operator) {
                case 'delete': {
                  meta.typing.mustBeType = 'boolean';
                  break;
                }
                case '!': {
                  meta.typing.mustBeType = 'boolean';
                  meta.typing.bang = true;
                  break;
                }
                case '-':
                case '+':
                case '~': {
                  meta.typing.mustBeType = 'number';
                  //if (AST.isPrimitive(init.argument)) {
                  //  const arg = AST.getPrimitiveValue(init.argument);
                  //  const value = init.operator === '-' ? -arg : init.operator === '+' ? +arg : ~arg;
                  //  //if (typeof value === 'number' && isFinite(value)) {
                  //  //  // subsumes isNaN
                  //  //  meta.typing.rangeStart = value;
                  //  //  meta.typing.rangeEnd = value;
                  //  //  const oneBit = isOneSetBit(value);
                  //  //  if (oneBit) {
                  //  //    meta.typing.oneBitSet = oneBit;
                  //  //  }
                  //  //}
                  //  meta.typing.mustBeFalsy = !value;
                  //  meta.typing.mustBeTruthy = !!value;
                  //}
                  break;
                }
                case 'typeof': {
                  meta.typing.mustBeType = 'string';
                  meta.typing.valueSet = new Set([
                    'undefined',
                    'boolean',
                    'number',
                    'string',
                    'object',
                    'function',
                    'bigint',
                    'symbol',
                    'unknown', // old ie :shrug:
                  ]);
                  // The string is always not empty
                  meta.typing.mustBeFalsy = false;
                  meta.typing.mustBeTruthy = true;
                  break;
                }
              }
              break;
            }
            case 'BinaryExpression': {
              switch (init.operator) {
                case '&': {
                  meta.typing.mustBeType = 'number';

                  // Need a number on at least one side. Ignore negative numbers (unary expression).
                  if (AST.isPrimitive(init.left)) {
                    const v = AST.getPrimitiveValue(init.left) | 0
                    meta.typing.oneBitAnded = isOneSetBit(v) ? v: undefined;
                  } else if (AST.isPrimitive(init.right)) {
                    const v = AST.getPrimitiveValue(init.right) | 0
                    meta.typing.oneBitAnded = isOneSetBit(v) ? v : undefined;
                  }
                  break;
                }
                case '^':
                case '|':
                case '>>':
                case '>>>':
                case '<<':
                case '/':
                case '-':
                case '%':
                case '*': {
                  meta.typing.mustBeType = 'number';
                  break;
                }
                case '===':
                case '!==':
                case '<':
                case '<=':
                case '>':
                case '>=':
                case 'instanceof':
                case 'in': {
                  meta.typing.mustBeType = 'boolean';
                  break;
                }
                case '+': {
                  vlog('- doing a plus');
                  // Trickier because it highly depends on the args...
                  // Note: despite looks object concat does not need to be string:
                  //       `{toString(){ return 1; }} + {toString(){ return 1; }} === 2`
                  // IF we know the lhs or rhs is a string, then the result must be a string.
                  // Otherwise, both sides are attempted to be coerced to a number, which may or may not
                  // succeed. However, it will be a type error if both values do not end up as the same type.
                  const left = init.left;
                  const right = init.right;
                  // Note: this also checks node.$p.isPrimitive but not meta.typing.mustBeType
                  const ipl = AST.isPrimitive(left);
                  const ipr = AST.isPrimitive(right);
                  if (ipl && ipr) {
                    const pl = AST.getPrimitiveValue(left);
                    const pr = AST.getPrimitiveValue(right);
                    meta.typing.mustBeType = typeof (pr + pr);
                    vlog('- both are primitives, result is a:', meta.typing.mustBeType, pl, pr);
                  } else if (ipl && typeof AST.getPrimitiveValue(left) === 'string') {
                    meta.typing.mustBeType = 'string';
                    vlog('- left is a string so result is a string');
                  } else if (ipr && typeof AST.getPrimitiveValue(right) === 'string') {
                    meta.typing.mustBeType = 'string';
                    vlog('- right is a string so result is a string');
                  } else if (ipl && right.type === 'Identifier') {
                    // We don't really know anything because if the unknown side is a string, the result will still
                    // be a string, regardless of what the other side turns out to be.
                    // We can turn to meta.typing.mustBeType...
                    const rightMeta = fdata.globallyUniqueNamingRegistry.get(right.name);
                    if (rightMeta.typing.mustBeType) {
                      if (rightMeta.typing.mustBeType === 'string') {
                        meta.typing.mustBeType = 'string';
                        vlog('- left is primitive but not string, right is a string type, so result is a string');
                      } else if (['undefined', 'null', 'boolean', 'number'].includes(rightMeta.typing.mustBeType)) {
                        // Note: we know the LHS value is a primitive and not a string.
                        // This will coerce to a number (even if that is NaN)
                        meta.typing.mustBeType = 'number';
                        vlog('- lhs a primitive, rhs neither string nor object type, so the result is a number');
                      } else {
                        // The right side is an object. Maybe we can fix this in the future but for now, let it go.
                        vlog('- left is primitive, right is object, so we must bail');
                      }
                    } else {
                      // We don't know anything about the right type so we have to pass here.
                      vlog('- left is primitive but not a string, right is unknown. We must bail here');
                    }
                  } else if (ipr && left.type === 'Identifier') {
                    // We don't really know anything because if the unknown side is a string, the result will still
                    // be a string, regardless of what the other side turns out to be.
                    // We can turn to meta.typing.mustBeType...
                    const leftMeta = fdata.globallyUniqueNamingRegistry.get(left.name);
                    if (leftMeta.typing.mustBeType) {
                      if (leftMeta.typing.mustBeType === 'string') {
                        meta.typing.mustBeType = 'string';
                        vlog('- right is primitive but not string, left is string type, result is a string');
                      } else if (['undefined', 'null', 'boolean', 'number'].includes(leftMeta.typing.mustBeType)) {
                        // Note: we know the RHS value is a primitive and not a string.
                        // This will coerce to a number (even if that is NaN)
                        meta.typing.mustBeType = 'number';
                        vlog('- lhs a primitive, rhs neither string nor object type, so the result is a number');
                      } else {
                        // The left side is an object. Maybe we can fix this in the future but for now, let it go.
                        vlog('- right is primitive, left is object, so we must bail');
                      }
                    } else {
                      // We don't know anything about the left type so we have to pass here.
                      vlog('- right is primitive but not a string, left is unknown. We must bail here');
                    }
                  } else if (left.type === 'Identifier' && right.type === 'Identifier') {
                    // Neither left nor right was a primitive node
                    // In that case we haven't checked their meta.typing.mustBeTypes yet, so let's try this now.
                    const leftMeta = fdata.globallyUniqueNamingRegistry.get(left.name);
                    const rightMeta = fdata.globallyUniqueNamingRegistry.get(right.name);
                    ASSERT(leftMeta, 'should have meta for left name', left.name, leftMeta);
                    ASSERT(rightMeta, 'should have meta for right name', right.name, rightMeta);
                    if (leftMeta.typing.mustBeType === 'string' || rightMeta.typing.mustBeType === 'string') {
                      meta.typing.mustBeType = 'string';
                      vlog('- left and right are string types, result must be a string');
                    } else if (
                      ['undefined', 'null', 'boolean', 'number'].includes(leftMeta.typing.mustBeType) &&
                      ['undefined', 'null', 'boolean', 'number'].includes(rightMeta.typing.mustBeType)
                    ) {
                      meta.typing.mustBeType = 'number';
                      vlog('- left and right are neither string nor object types, result must be a number');
                    } else {
                      // Either side is an object type. We don't have enough insight right now.
                      vlog('- neither left nor right is a string, at least one is an object, result is unknown');
                    }
                  } else {
                    // Neither node was a primitive and the nodes did not have enough type info to
                    // guarantee us the outcome of a `+` so we can't predict anything here. Sadly.
                    vlog(
                      '- left and right are neither primitive nor ident and we do not have enough type information to predict the result type',
                    );
                  }
                  break;
                }
                case '==':
                case '!=': {
                  // TODO

                  break;
                }
                default:
                  ASSERT(false, 'what op?', node, init);
              }
              break;
            }
            case 'ArrayExpression': {
              meta.typing.mustBeType = 'array';
              meta.typing.mustBeFalsy = false;
              meta.typing.mustBeTruthy = true;
              break;
            }
            case 'ObjectExpression': {
              meta.typing.mustBeType = 'array';
              meta.typing.mustBeFalsy = false;
              meta.typing.mustBeTruthy = true;
              break;
            }
            case 'FunctionExpression': {
              meta.typing.mustBeType = 'function';
              meta.typing.mustBeFalsy = false;
              meta.typing.mustBeTruthy = true;
              break;
            }

            case 'CallExpression': {
              // Certain builtins have a guaranteed outcome... (or an exception is thrown, which we can ignore here)
              if (init.callee.type === 'Identifier') {
                switch (init.callee.name) {
                  case 'String': {
                    meta.typing.mustBeType = 'string';
                    break;
                  }
                  case 'Number': {
                    meta.typing.mustBeType = 'number';
                    break;
                  }
                  case 'Boolean': {
                    // In some cases we may even be able to predict the outcome...
                    meta.typing.mustBeType = 'boolean';
                    break;
                  }
                  case 'parseInt':
                  case 'parseFloat': {
                    // If the arg is a literal we could resolve it immediately
                    meta.typing.mustBeType = 'number';
                    break;
                  }
                  case 'isNaN':
                  case 'isFinite': {
                    // In some rare cases we would be able to resolve this if the arg was a primitive (or otherwise deduced).
                    meta.typing.mustBeType = 'boolean';
                    break;
                  }
                }
              } else if (init.callee.type === 'MemberExpression' && !init.callee.computed) {
                switch (init.callee.object.name + '.' + init.callee.property.name) {
                  case 'Array.from': {
                    meta.typing.mustBeType = 'array';
                    break;
                  }
                  case 'Array.isArray': {
                    meta.typing.mustBeType = 'boolean';
                    break;
                  }
                  case 'Array.of': {
                    // Normalization can replace this with array literals in many-if-not-all cases
                    meta.typing.mustBeType = 'array';
                    break;
                  }
                  case 'Date.now':
                  case 'Date.parse':
                  case 'Date.UTC': {
                    // (Looks like parse/UTC always return a number as well. I hope there's no edge case around that.)
                    meta.typing.mustBeType = 'number';
                    break;
                  }
                  case 'JSON.stringify': {
                    // This can be undefined (if you pass no args or `undefined`), so we don't know for sure.
                    // TODO: Although, if the arg is known to be not `undefined`, then I think the result must be string...
                    break;
                  }
                  case 'Math.abs':
                  case 'Math.acos':
                  case 'Math.acosh':
                  case 'Math.asin':
                  case 'Math.asinh':
                  case 'Math.atan':
                  case 'Math.atan2':
                  case 'Math.atanh':
                  case 'Math.cbrt':
                  case 'Math.ceil':
                  case 'Math.clz32':
                  case 'Math.cos':
                  case 'Math.cosh':
                  case 'Math.exp':
                  case 'Math.expm1':
                  case 'Math.floor':
                  case 'Math.fround':
                  case 'Math.hypot':
                  case 'Math.imul':
                  case 'Math.log':
                  case 'Math.log10':
                  case 'Math.log1p':
                  case 'Math.log2':
                  case 'Math.max':
                  case 'Math.min':
                  case 'Math.pow':
                  case 'Math.random': // The odds of this being a round zero are very small... but let's not bet on it :)
                  case 'Math.round':
                  case 'Math.sign':
                  case 'Math.sin':
                  case 'Math.sinh':
                  case 'Math.sqrt':
                  case 'Math.tan':
                  case 'Math.tanh':
                  case 'Math.trunc': {
                    // I think the only thing we can predict about all these funcs is that their result is a number... (might be NaN/Infinity)
                    meta.typing.mustBeType = 'number';
                    break;
                  }
                  case 'Number.isFinite':
                  case 'Number.isInteger':
                  case 'Number.isNaN':
                  case 'Number.isSafeInteger': {
                    // Some of these should be replaced with the global builtin function, by normalization
                    meta.typing.mustBeType = 'boolean';
                    break;
                  }
                  case 'Number.parseFloat':
                  case 'Number.parseInt': {
                    // These should be replaced with the global value by normalization
                    meta.typing.mustBeType = 'number';
                    break;
                  }
                  case 'Object.is': // We may be able to predict certain outcomes
                  case 'Object.isFrozen':
                  case 'Object.isSealed': {
                    meta.typing.mustBeType = 'boolean';
                    break;
                  }
                  case 'String.fromCharCode':
                  case 'String.fromCodePoint':
                  case 'String.raw': {
                    // Looks like these always return a string of sorts... no matter what arg you feed them
                    meta.typing.mustBeType = 'string';
                    break;
                  }
                }
              }
              break;
            }

            case 'MemberExpression': {
              if (!init.computed) {
                // Resolve some builtins...
                switch (init.object.name + '.' + init.property.name) {
                  case 'Math.E':
                  case 'Math.LN10':
                  case 'Math.LN2':
                  case 'Math.LOG10E':
                  case 'Math.LOG2E':
                  case 'Math.PI':
                  case 'Math.SQRT1_2':
                  case 'Math.SQRT2': {
                    // We can't inline these due to loss of precision
                    meta.typing.mustBeType = 'number';
                    meta.typing.mustBeFalsy = false;
                    meta.typing.mustBeTruthy = true;
                    break;
                  }

                  case 'Number.EPSILON': // We keep this as is
                  case 'Number.MAX_VALUE': // We keep this as is
                  case 'Number.MIN_VALUE': // We keep this as is
                  case 'Number.NEGATIVE_INFINITY': // Is -Infinity
                  case 'Number.POSITIVE_INFINITY': {
                    // Is Infinity
                    // Note: the values that could be inlined should be handled by normalization.
                    meta.typing.mustBeType = 'number';
                    meta.typing.mustBeFalsy = false;
                    meta.typing.mustBeTruthy = true;
                    break;
                  }
                  case 'Number.NaN': {
                    // is global NaN
                    // Note: the values that could be inlined should be handled by normalization.
                    meta.typing.mustBeType = 'number';
                    meta.typing.mustBeFalsy = true;
                    meta.typing.mustBeTruthy = false;
                    break;
                  }
                }
              }
              break;
            }

            default:
            // call, member, etc. :shrug:
          }

          vlog('  - Typing data:', meta.typing);
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
        inferInitialType(meta, init);
        // Binding "owner" func node. In which scope was this binding bound?
        meta.bfuncNode = funcStack[funcStack.length - 1];
        break;
      }

      case 'WhileStatement:before': {
        node.$p.outReads = new Set(); // All reads inside this loop that reach a write outside of this loop (they also reach "last writes" at the end of this loop)
        funcStack[funcStack.length - 1].$p.hasBranch = true;
        loopStack.push(+node.$p.pid);
        const currentLastWritesClone = lastWrites_cloneLastMap(lastWritesPerName[lastWritesPerName.length - 1]);
        lastWritesAtStartPerLoop.push({ loopNode: node, allWrites: currentLastWritesClone });
        break;
      }
      case 'WhileStatement:after': {
        loopStack.pop();

        const lastWritesAtLoopStart = lastWritesAtStartPerLoop.pop();
        const currentLastWriteMapForName = lastWritesPerName[lastWritesPerName.length - 1];
        lastWrites_closeTheLoop(lastWritesAtLoopStart, currentLastWriteMapForName);
        break;
      }
    }

    if (!before && (parentNode?.type === 'Program' || parentNode?.type === 'BlockStatement')) {
      blockIndexes.pop();
    }

    vgroupEnd();
  }

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
      '\ngloballyUniqueNamingRegistry (sans builtins):\n',
      globallyUniqueNamingRegistry.size > 50
        ? '<too many>'
        : globallyUniqueNamingRegistry.size === globals.size
        ? '<none>'
        : [...globallyUniqueNamingRegistry.keys()].filter((name) => !globals.has(name)).join(', '),
    );

    //vlog('\nCurrent state (after phase1)\n--------------\n' + fmat(tmat(fdata.tenkoOutput.ast)) + '\n--------------\n');
  }

  log('End of phase 1. Walker called', called, 'times, took', Date.now() - start, 'ms');
  groupEnd();
}

function lastWrites_cloneLastMap(map) {
  // The map should be a Map of Sets of Writes. We want to clone the map and set, not the writes themselves.
  const clone = new Map(map);
  map.forEach((set, name) => clone.set(name, new Set(set)));
  return clone;
}
function lastWrites_closeTheLoop(lastWritesAtLoopStart, currentLastWriteMapForName) {
  lastWritesAtLoopStart.loopNode.$p.outReads.forEach((read) => {
    let currentLastWriteSetForName = currentLastWriteMapForName.get(read.name);
    if (currentLastWriteSetForName) {
      currentLastWriteSetForName.forEach((write) => {
        write.reachedBy.add(read);
        read.reaches.add(write);
      });
    }
  });
}
function lastWrite_mergeLastWriteMapsByRef(from, to) {
  ASSERT(from instanceof Map, 'from must be map');
  ASSERT(to instanceof Map, 'to must be map');
  // Add all refs in `from` sets to the sets of `to`. For each name, if the set exists in `to`,
  // copy all refs in the `from` set, into the `to` set. If the `to` map does not have a certain
  // name then copy the reset (by reference(!)) into the `to` map.
  from.forEach((oldSet, name) => {
    const set = to.get(name);
    if (set) {
      oldSet.forEach((write) => set.add(write));
    } else {
      to.set(name, oldSet);
    }
  });
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
    // If the try has a finally it gets a little tricky.
    // I think in either way we should try to be conservative and only consider early completions if the completion node
    // is at the end of the try, catch, or finally block. At that point, I don't think it's relevant which block.
    // Hopefully this isn't a footgun and false positives don't blow up in my face. Eh foot. Eh ... you know.
    return (
      (tailNode.block.body.length === 0 ? false : isTailNode(completionNode, tailNode.block.body[tailNode.block.body.length - 1])) ||
      (!tailNode.handler || tailNode.handler.body.body.length === 0
        ? false
        : isTailNode(completionNode, tailNode.handler.body.body[tailNode.handler.body.body.length - 1])) ||
      (!tailNode.finalizer || tailNode.finalizer.body.length === 0
        ? false
        : isTailNode(completionNode, tailNode.finalizer.body[tailNode.finalizer.body.length - 1]))
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
  // And early completion is a return/throw/continue/break that is not the last statement of a function.
  // If the completion is the last statement of a branch then the other branch must not complete or not be last. Recursively.

  // From the end of the function. Check if the statement is the return, in that case bail because this is not early.
  // If the last statement is not `if`, then consider the completion early since DCE would have removed it otherwise.
  // If the last statement is an `if` then check if the return is the last statement of either branch. If not, check
  // if either branch ends with an if. Repeat exhaustively. If the completion was not the last statement of any `if`
  // in a tail position, then consider it an early completion.

  vlog('markEarlyCompletion(); This was an explicit completion (' + completionNode.type + ')');
  parentNode.$p.alwaysComplete = true;
  if (completionNode.type === 'ReturnStatement') parentNode.$p.alwaysReturn = true;
  else if (completionNode.type === 'ThrowStatement') parentNode.$p.alwaysThrow = true;
  // TODO: this should automatically propagate to the function. We should add an assertion instead of this so we can verify that the values properly propagate through all statements.
  funcNode.$p.alwaysComplete = true;
  if (completionNode.type === 'ReturnStatement') funcNode.$p.alwaysReturn = true;
  else if (completionNode.type === 'ThrowStatement') funcNode.$p.alwaysThrow = true;

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

function isOneSetBit(v) {
  // Bit counting is relatively expensive. ES6 added Math.clz32, which counts the number of leading bits of a 32bit number.
  // So what we can do here, rather than bit fiddle to get the whole count, is to get the number of leading zeroes, and then
  // check whether 2^(31-count) equals our value. If so, it's a single bit. If not, it's not.
  // Alternative, we could create an object/Set with 32 entries and do a straight lookup. Not sure what's faster. Won't matter much here.

  return 1 << (31 - Math.clz32(v)) === v;
}
