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

  const funcStack = [];
  const thisStack = []; // Only contains func exprs. Func decls are eliminated. Arrows do not have this/arguments.
  const blockStack = []; // Stack of nested blocks (functions, try/catch/finally, or statements)
  const blockIds = []; // Stack of block pids. Negative if the parent was a loop of sorts. Functions insert a zero.
  const blockBodies = []; // Stack of blocks. Arrays of statements that is block.body or program.body
  const blockIndexes = []; // Stack of block indexes to match blockIds
  const ifIds = []; // Stack of `if` pids, negative for the `else` branch, zeroes for function boundaries. Used by SSA.
  const loopStack = []; // Stack of loop nodes (while, for-in, for-of). `null` means function (or program).
  let readWriteCounter = 0;
  const refStack = []; // Array<Map<name, {read,write}>> | null. For every branch referenced, for every binding name, track the last read and write. Functions inject a null. This information is useful if the binding is not used as a closure. Take care if a read in a loop reaches a write outside of a loop.
  const lastWritesPerName = []; // Array<Map<name, Set<write>>>. For every branch, for every binding name referenced, track the last write/s that is/are potentially still accessible by a read "Right now". This should take abrubt completion into account.

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

    const parentNode = path.nodes[path.nodes.length - 2];
    const parentProp = path.props[path.props.length - 1];
    const parentIndex = path.indexes[path.indexes.length - 1];

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
        path.nodes,
        path.props,
        path.indexes,
      );
    }
    //vlog('ids/indexes:', blockIds, blockIndexes);

    switch (key) {
      case 'Program:before': {
        funcStack.push(node);
        blockBodies.push(node.body);
        blockIds.push(+node.$p.pid);
        ifIds.push(0);
        blockStack.push(node); // Do we assign node or node.body?
        refStack.push(new Map());
        lastWritesPerName.push(new Map());
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
        blockBodies.pop();
        blockIds.pop();
        ifIds.pop();
        blockStack.pop();
        loopStack.pop();
        refStack.pop();
        lastWritesPerName.pop();

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
        blockBodies.push(node.body);
        refStack.push(new Map());
        lastWritesPerName.push(new Map());
        if (['WhileStatement', 'ForInStatement', 'ForOfStatement'].includes(parentNode.type)) {
          blockIds.push(-node.$p.pid); // Mark a loop
        } else {
          blockIds.push(+node.$p.pid);
        }
        if (parentNode.type === 'IfStatement') {
          if (parentNode.consequent === node) {
            ifIds.push(+parentNode.$p.pid);
          } else if (parentNode.alternate === node) {
            ifIds.push(-parentNode.$p.pid);
          } else {
            ASSERT(false);
          }
        }
        vlog('This block has depth', blockIds.length, 'and pid', node.$p.pid);
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

        vgroup('Last write analysis');
        const lastWrites = lastWritesPerName.pop();
        const parentLastWrites = lastWritesPerName[lastWritesPerName.length - 1];
        node.$p.lastWrites = lastWrites;
        // Disregard all own bindings of this block. If this block had an abrupt completion, disregard all these writes.
        // If this was the consequent of an if, do nothing and wait for the alternate branch to complete.
        // If this was the alternate of an if, merge the results of the consequent and alternate branch.
        // Merge anything left into the map that is now on top of lastWritesPerName.
        // If if and else of a branch have a name, use the union of those sets as the new set, deleting the old set.
        // If only one branch (or neither) of an if-else has a name, then the name becomes a union of the old and new set.
        // If a branch has an early completion, consider it to not reference any name for the rules above.
        if (parentNode.type === 'IfStatement') {
          // Special branching rules
          if (node === parentNode.consequent) {
            // Ignore the `if` branch. Wait for completion of the `else` branch.
            vlog('This was the `if` branch of an `if`. Skipping until else-branch');
          } else {
            vlog('This was the `else` branch of an `if`');
            // Note: must process the `if` branch too now.
            const ifBlock = parentNode.consequent;
            const elseBlock = parentNode.alternate;

            if (parentLastWrites === null) {
              // We do not cross function boundaries so nothing to do here
              vlog('No parent lastWrites so this is a function root?');
            } else if (ifBlock.$p.earlyComplete) {
              vlog('if branch returns early');
              // The if returned early so if the else contained a ref, use that, and otherwise keep the existing.
              // If the else also returned early, then the rest should be dead code and it shouldn't matter.
              if (elseBlock.$p.earlyComplete) {
                vlog('else branch also returns early so it will not execute any code after the if statement');
              } else {
                vlog('overwriting parent lastWrites with any lastWrites from the else branch');
                elseBlock.$p.lastWrites.forEach((writes, bindingName) => {
                  // Ignore bindings the parent does not have. Those must be local to the branch
                  if (parentLastWrites.has(bindingName)) {
                    parentLastWrites.set(bindingName, writes);
                  }
                });
              }
            } else if (elseBlock.$p.earlyComplete) {
              vlog('else branch returns early. overwriting parent lastWrites with lastWrites from the if branch');
              ifBlock.$p.lastWrites.forEach((writes, bindingName) => {
                // Ignore bindings the parent does not have. Those must be local to the branch
                if (parentLastWrites.has(bindingName)) {
                  parentLastWrites.set(bindingName, writes);
                }
              });
            } else {
              vgroup('Neither branch returns early. Merging write names from both branches and walking them');
              // Both branches do not return early
              new Set([...ifBlock.$p.lastWrites.keys(), ...elseBlock.$p.lastWrites.keys()]).forEach((bindingName) => {
                vlog('-', bindingName);
                const ifSet = ifBlock.$p.lastWrites.get(bindingName);
                const elseSet = elseBlock.$p.lastWrites.get(bindingName);

                if (ifSet && elseSet) {
                  vlog('There was a write in each branch so overwriting the parent lastWrites with the writes from both branches');
                  // Overwrite the existing set. Both branches had at least one write to this binding in every possible branch.
                  parentLastWrites.set(bindingName, new Set([...ifSet.values(), ...elseSet.values()]));
                } else if (ifSet) {
                  vlog('There was no write in the else branch, merging the writes from the if branch with that of the parent');
                  // Merge the if into the existing set
                  let outerSet = parentLastWrites.get(bindingName);
                  if (outerSet) {
                    ifSet.forEach((write) => outerSet.add(write));
                  } else {
                    // In regular code this would imply an implicit global access. But in normalized code, those would
                    // have a different name. So this case must mean that the write is a local binding to the branch.
                    // We should ignore it, not propagate it to the parent, as there's no point to it.
                  }
                } else if (elseSet) {
                  vlog('There was no write in the if branch, merging the writes from the if branch with that of the parent');
                  // Merge the else into the existing set
                  let outerSet = parentLastWrites.get(bindingName);
                  if (outerSet) {
                    elseSet.forEach((write) => outerSet.add(write));
                  } else {
                    // In regular code this would imply an implicit global access. But in normalized code, those would
                    // have a different name. So this case must mean that the write is a local binding to the branch.
                    // We should ignore it, not propagate it to the parent, as there's no point to it.
                  }
                } else {
                  ASSERT(false);
                }
              });
              vgroupEnd();
            }
          }
        } else if (parentNode.type === 'WhileStatement') {
          // TODO
          node.$p.lastWrites = 'TODO';
        } else if (parentNode.type === 'ForInStatement' || parentNode.type === 'ForOfStatement') {
          // TODO
          node.$p.lastWrites = 'TODO';
        } else {
          // This block was a function, try, etc. But not an if or loop. // TODO: try/catch/finally is probably pretty funky
          //Merge the set of lastWrites set down to the lastWrites of the parent block.
          lastWrites.forEach((writes, name) => {
            let set = parentLastWrites.get(name);
            if (!set) {
              set = new Set();
              parentLastWrites.set(name, set);
            }
            writes.forEach((write) => set.add(write));
          });
        }

        if (typeof lastWrites === 'string') {
          vlog('Last writes:', lastWrites);
        } else {
          vgroup('Last writes:', lastWrites.size === 0 ? (node.$p.earlyComplete ? '(none, early completion)' : '(none)') : '');
          lastWrites.forEach((set, name) => {
            vlog('-', name, [...set].map((write) => write.parentNode.$p.pid + ':' + write.blockIndex).join(', '));
          });
          vgroupEnd();
        }
        if (typeof parentLastWrites === 'string') {
          vlog('Parent last writes:', parentLastWrites);
        } else {
          vgroup(
            'Parent last writes:',
            parentLastWrites.size === 0 ? (parentNode.$p.earlyComplete ? '(none, early completion)' : '(none)') : '',
          );
          parentLastWrites.forEach((set, name) => {
            vlog('-', name, [...set].map((write) => write.parentNode.$p.pid + ':' + write.blockIndex).join(', '));
          });
          vgroupEnd();
        }
        vgroupEnd();

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

          const parentNode = path.nodes[path.nodes.length - 2];
          const parentProp = path.props[path.props.length - 1];
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
        funcStack[funcStack.length - 1].$p.hasBranch = true;
        loopStack.push(+node.$p.pid);
        break;
      }
      case 'ForInStatement:after': {
        loopStack.pop();
        break;
      }

      case 'ForOfStatement:before': {
        funcStack[funcStack.length - 1].$p.hasBranch = true;
        loopStack.push(+node.$p.pid);
        break;
      }
      case 'ForOfStatement:after': {
        loopStack.pop();
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

        if (parentNode.type === 'VariableDeclarator' && path.nodes[path.nodes.length - 3].kind === 'const') {
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
        refStack.pop();

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
          } else if (stmt.type === 'ExpressionStatement') {
            // Considering this must be a normalized expression statement it should
            // be no problem to inline it into any call site. Like, it should not lead
            // to more complex situations? Maybe bindings now get referenced multiple times...?
            node.$p.inlineMe = 'single expression statement';
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
              // `var x = unkonwn; return x`, where unknown is any normalized expression (idc)

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
            let pathIndex = path.nodes.length - 1;
            do {
              blockNode = path.nodes[pathIndex];
              vlog('  - block step;', blockNode.type, blockNode.$p.pid);
              if (blockNode.type === 'BlockStatement' || blockNode.type === 'Program') {
                blockIndex = path.indexes[pathIndex + 1];
                ASSERT(
                  blockIndex >= 0,
                  'block index should be set right',
                  path.nodes.map((n) => n.type),
                  path.indexes,
                );
                break;
              }
              --pathIndex;
            } while (true);
          }

          const pfuncNode = funcStack[funcStack.length - 1];

          const innerLoop = loopStack[loopStack.length - 1];
          vlog('innerLoop:', innerLoop);

          const grandNode = path.nodes[path.nodes.length - 3];
          const grandProp = path.props[path.props.length - 2];
          const grandIndex = path.indexes[path.indexes.length - 2];

          if (kind === 'read') {
            // TODO: what if both branches of an if have a write? Or all branches of a nested if? We'd want to model that.
            // TODO: what if a branch had a write and an early return, but not the other? How do we track this properly?
            // TODO: each block can maintain a .$p.lastWrites of Map<name, Array<write>> and we already track early returns
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
              kind: grandNode.type === 'ExportNamedDeclaration' ? 'export' : 'read',
              parentNode,
              parentProp,
              parentIndex,
              grandNode,
              grandProp,
              grandIndex,
              blockBody,
              blockIndex,
              pfuncNode,
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

            let cache = refStack[refStack.length - 1].get(name);
            if (cache) {
              cache.read = read;
            } else {
              cache = { read, write: undefined };
              refStack[refStack.length - 1].set(cache);
            }

            pfuncNode.$p.referencedNames.add(name);
          }
          if (kind === 'write') {
            const blockBody = blockNode.body;
            vlog('- Parent block:', blockNode.type, blockNode.$p.pid);

            const write = createWriteRef({
              kind: parentNode.type === 'VariableDeclarator' ? 'var' : parentNode.type === 'AssignmentExpression' ? 'assign' : 'other',
              parentNode,
              parentProp,
              parentIndex,
              grandNode,
              grandProp,
              grandIndex,
              blockBody,
              blockIndex,
              pfuncNode,
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

            const lastWriteMap = lastWritesPerName[lastWritesPerName.length - 1];
            let lastWriteSet = lastWriteMap.get(name);
            if (lastWriteSet) {
              lastWriteSet.add(write);
            } else {
              lastWriteMap.set(name, new Set([write]));
            }

            if (parentNode.type === 'VariableDeclarator') {
              ASSERT(parentProp === 'id', 'the read check above should cover the prop=init case');
              vlog('- Adding decl write');

              pfuncNode.$p.ownBindings.add(name);
              meta.writes.unshift(write);
            } else if (parentNode.type === 'AssignmentExpression') {
              ASSERT(parentProp === 'left', 'the read check above should cover the prop=right case');
              ASSERT(
                path.nodes[path.nodes.length - 3].type === 'ExpressionStatement',
                'assignments must be normalized to statements',
                path.nodes[path.nodes.length - 3],
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
        funcStack[funcStack.length - 1].$p.hasBranch = true;
        loopStack.push(+node.$p.pid);
        break;
      }
      case 'WhileStatement:after': {
        loopStack.pop();
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

function isTailNode(completionNode, tailNode) {
  ASSERT(completionNode)
  ASSERT(tailNode)
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
  if (completionNode.type === 'ThrowStatement') parentNode.$p.alwaysThrow = true;
  // TODO: this should automatically propagate to the function. We should add an assertion instead of this so we can verify that the values properly propagate through all statements.
  funcNode.$p.alwaysComplete = true;
  if (completionNode.type === 'ReturnStatement') funcNode.$p.alwaysReturn = true;
  if (completionNode.type === 'ThrowStatement') funcNode.$p.alwaysThrow = true;

  const body = funcNode.type === 'Program' ? funcNode.body : funcNode.body.body;
  if (isTailNode(completionNode, body[body.length - 1])) {
    vlog('markEarlyCompletion(); Completion node was found to be in a tail position of the function. Not an early return.');
    return;
  }
  vlog('markEarlyCompletion(); This was an early completion.');

  parentNode.$p.earlyComplete = true;
  if (completionNode.type === 'ReturnStatement') parentNode.$p.earlyReturn = true;
  if (completionNode.type === 'ThrowStatement') parentNode.$p.earlyThrow = true;

  // TODO: this should automatically propagate to the function. We should add an assertion instead of this so we can verify that the values properly propagate through all statements.
  funcNode.$p.earlyComplete = true;
  if (completionNode.type === 'ReturnStatement') funcNode.$p.earlyReturn = true;
  if (completionNode.type === 'ThrowStatement') funcNode.$p.earlyThrow = true;
}
