import walk from '../../lib/walk.mjs';

import { VERBOSE_TRACING, RED, BLUE, DIM, RESET } from '../constants.mjs';
import { ASSERT, log, group, groupEnd, vlog, vgroup, vgroupEnd, tmat, fmat } from '../utils.mjs';
import { $p, resetUid } from '../$p.mjs';
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
  const thisStack = []; // Only contains func exprs. Func decls are eliminated. Arrows do not have this/arguments.
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
  vlog(
    '\n\n\n##################################\n## phase1 (first=' +
      firstAfterParse +
      ') ::  ' +
      fdata.fname +
      '\n##################################\n\n\n',
  );

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
        node.$p.paramNames = new Set();
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
        node.$p.paramNames = new Set();

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

        if (node.id) {
          const meta = globallyUniqueNamingRegistry.get(node.id.name);
          ASSERT(meta, 'there should be a meta for this name', node.id.name);
          meta.isImplicitGlobal = false;
        }

        const bodyOffset = node.$p.bodyOffset;
        ASSERT(bodyOffset >= 0, 'normalized functions must have a debugger statement to signify the end of the header');
        const body = node.body.body;
        if (body.length - bodyOffset === 1) {
          vlog('This function has one statement. Trying to see if we can inline calls to it.');
          const stmt = body[bodyOffset];
          if (stmt.type === 'ReturnStatement') {
            // All usages can be inlined with the arg, provided the arg is reachable from the call sites (relevant for closures)
            if (AST.isPrimitive(body[bodyOffset].argument)) {
              node.$p.inlineMe = 'single return with primitive';
            }
          } else {
            ASSERT(
              stmt.type !== 'ExpressionStatement',
              'every function returns explicitly so the last statement can not be a non-returning non-throwing expression',
              node,
            );
          }
        } else if (body.length - bodyOffset === 2) {
          vlog('This function has two statements. Trying to see if we can inline calls to it.');
          const one = body[bodyOffset];
          const two = body[bodyOffset + 1];
          if (one.type === 'VariableDeclaration' && two.type === 'ReturnStatement') {
            vlog('Has var and return. Checking if it just returns the fresh var.');
            const decl = one;
            const decr = decl.declarations[0];
            const ret = two;
            if (ret.argument?.type === 'Identifier' && decr.id.name === ret.argument.name) {
              // This is a function whose body is a variable declaration that is then returned and the func is only called.
              // `var x = unknown; return x`, where unknown is any normalized expression (idc)

              ASSERT(decr.init, 'normalized var decls have an init, right');
              if (AST.isPrimitive(decr.init)) {
                vlog('- Yes. Basically returning a primitive');
                // I think this shouldn't be the case as I expect these to be normalized away
                node.$p.inlineMe = 'double with primitive';
              } else if (decr.init.type === 'ArrayExpression') {
                vlog('- Yes. Basically returning an array literal');
                // `function f() { const x = [...]; return x; }`
                // Let's start with arrays that only contain primitives
                if (decr.init.elements.every((enode) => AST.isPrimitive(enode))) {
                  vlog('And it does contain only primitives');
                  node.$p.inlineMe = 'double with array with primitives';
                } else {
                  vlog('No, it contained other things');
                }
              } else if (decr.init.type === 'Identifier' && decr.init.name !== 'arguments') {
                // (Cannot easily mimic arguments). The `this` is not an identifier.
                node.$p.inlineMe = 'double with identifier';
              } else {
                vlog('No, skipping this one.');
              }
            }
          }
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

        if (kind === 'read' && name === 'arguments') {
          // Make a distinction between arguments.length, arguments[], and maybe the slice paradigm?
          // For now we only care whether the function might detect the call arg count. Without arguemnts, it cannot.
          if (thisStack.length) {
            // Do not count cases like where the arguments have no observable side effect or our own alias
            // This makes sure the `arguments` reference does not stick around unnecessarily as an artifact
            if (
              parentNode.type === 'MemberExpression' &&
              parentProp === 'object' &&
              !parentNode.computed &&
              parentNode.property.name === 'length'
            ) {
              // This is an `arguments.length` access. Easier to work around than plain unbound `arguments` access.
              vlog('Marking function as accessing `arguments.length`');
              thisStack[thisStack.length - 1].$p.readsArgumentsLen = true;
            } else {
              if (parentNode.type === 'ExpressionStatement') {
                vlog('Ignoring `arguments` as an expression statement');
                //} else if (
                //  parentNode.type === 'VariableDeclaration' &&
                //  parentNode.declarations[0].id.name.startsWith(ARGUMENTS_ALIAS_PREFIX)
                //) {
                //  vlog('Ignoring our own arguments alias');
              } else {
                // This disables a few tricks because of observable side effects
                vlog('Marking function as accessing `arguments` in "any" way');
                thisStack[thisStack.length - 1].$p.readsArgumentsAny = true;
              }
            }
          } else {
            // TODO: do we want to act on this?
            vlog('Attempting to access `arguments` in global space? Probably crashes at runtime.');
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
        ASSERT(!node.$p.ref, 'each param should be referenced at most once');
        if (parentProp === 'init') {
          vlog('Maps to `' + parentNode.id.name + '`');
          const funcNode = funcStack[funcStack.length - 1];
          const declParam = funcNode.params[node.index];
          ASSERT(declParam.name === node.name, 'the usage of a Param should map back to the decl', node, declParam);
          declParam.$p.ref = { parentNode, parentProp, parentIndex, node, name: parentNode.id.name };
          funcNode.$p.paramNames.add(parentNode.id.name);
        } else {
          vlog('This is the decl');
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
        if (a === null) {
          // noop
          vlog('commonReturn is already null so not setting it');
        } else if (!AST.isPrimitive(b)) {
          vlog('the arg is not a primitive so setting commonReturn to null');
          funcNode.$p.commonReturn = null; // No longer use this
        } else if (a === undefined) {
          vlog('commonReturn was not set so setting it now');
          funcNode.$p.commonReturn = AST.cloneSimple(node.argument);
        } else if (a.type === b.type) {
          if (b.type === 'Identifier') {
            if (a.name !== b.name) {
              vlog('return value is not same as commonReturn so setting it to null');
              funcNode.$p.commonReturn = null; // No longer use this
            } else {
              vlog('- No change to commonReturn. Both have the same ident:', a.name, b.name);
            }
          } else if (b.type === 'Literal') {
            if (a.value !== b.value || a.raw !== b.raw) {
              vlog('return value is not same as commonReturn so setting it to null');
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

      case 'TryStatement:after': {
        if (node.block.$p.earlyComplete || node.handler?.$p.earlyComplete || node.finalizer?.$p.earlyComplete) {
          vlog('At least one block of the try has an early completion');
          node.$p.earlyComplete = true;
          node.$p.earlyReturn = node.block.$p.earlyReturn || node.handler?.$p.earlyReturn || node.finalizer?.$p.earlyReturn;
          node.$p.earlyThrow = node.block.$p.earlyThrow || node.handler?.$p.earlyThrow || node.finalizer?.$p.earlyThrow;
        }
        if (node.block.$p.alwaysComplete && node.handler?.$p.alwaysComplete && node.finalizer?.$p.alwaysComplete) {
          vlog('All blocks of the try complete explicitly');
          node.$p.alwaysComplete = true;
          node.$p.alwaysReturn = node.block.$p.alwaysReturn && node.handler?.$p.alwaysReturn && node.finalizer?.$p.alwaysReturn;
          node.$p.alwaysThrow = node.block.$p.alwaysThrow && node.handler?.$p.alwaysThrow && node.finalizer?.$p.alwaysThrow;
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
          vlog('Setting commonMark to null because the function throws');
          funcNode.$p.commonReturn = null;
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
        node.$p.promoParent = blockStack[blockStack.length - 1];
        const meta = globallyUniqueNamingRegistry.get(node.declarations[0].id.name);
        if (node.kind === 'const') {
          vlog('- marking', meta.uniqueName, 'as constant, ref set to', node.declarations[0].init.type);
          ASSERT(meta);
          meta.isConstant = true;

          const init = node.declarations[0].init;
          if (init.type === 'BinaryExpression') {
            if (init.operator === '&') {
              // Need a number on at least one side. Ignore negative numbers (unary expression).
              if (init.left.type === 'Literal' && typeof init.left.value === 'number') {
                meta.typing.oneBitSet = isOneSetBit(init.left.value) ? init.left.value : 0;
              }
              if (!meta.typing.oneBitSet && init.right.type === 'Literal' && typeof init.right.value === 'number') {
                meta.typing.oneBitSet = isOneSetBit(init.right.value) ? init.right.value : 0;
              }
            }
          }
        }
        meta.isImplicitGlobal = false;
        ASSERT(
          parentNode.type === 'BlockStatement' || parentNode.type === 'Program',
          'all normalized var decls appear in blocks, right?',
          parentNode,
        );
        ASSERT(parentProp === 'body', 'amirite?', parentProp);
        const init = node.declarations[0].init;
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
  ASSERT(tailNode);
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
      (!tailNode.handler || tailNode.handler.body.length === 0
        ? false
        : isTailNode(completionNode, tailNode.handler.body[tailNode.handler.body.length - 1])) ||
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
