import { log, group, groupEnd, ASSERT, BLUE, RED, RESET, tmat, fmat, TRIBE, PURPLE, DIM, YELLOW } from '../utils.mjs';
import { getIdentUsageKind, createFreshVar, createReadRef, createWriteRef } from '../bindings.mjs';
import walk from '../../lib/walk.mjs';
import * as AST from '../ast.mjs';
import {pruneEmptyFunctions} from './phase2emptyfunc.mjs';

let VERBOSE_TRACING = true;

const ALIAS_PREFIX = 'tmpPrevalAlias';
const THIS_ALIAS_BASE_NAME = ALIAS_PREFIX + 'This';
const ARGUMENTS_ALIAS_PREFIX = ALIAS_PREFIX + 'Arguments';
const ARGUMENTS_ALIAS_BASE_NAME = ARGUMENTS_ALIAS_PREFIX + 'Any';
const ARGLENGTH_ALIAS_BASE_NAME = ARGUMENTS_ALIAS_PREFIX + 'Len'; // `arguments.length`, which is easier than just `arguments`

// Things to do
// - Inline local constants, numbers, literal idents
// - Inline imported constants
// - Unroll a function when called with a primitive
// - Branch out
// - Const binding folding (const a = $(); const b = a; -> redundant)
// - Unary negative/positive should look at argument

function rule(desc, ...rest) {
  log(TRIBE + 'Rule:' + RESET + ' "' + desc + '"', ...rest);
}
function example(from, to, condition) {
  if (!VERBOSE_TRACING) return;
  if (!condition || condition()) {
    log(PURPLE + '--' + RESET + ' `' + from + '` ' + PURPLE + '-->' + RESET + ' `' + to + '`');
  }
}

function before(node, parent) {
  if (!VERBOSE_TRACING) return;
  if (Array.isArray(node)) node.forEach((n) => before(n, parent));
  else {
    const parentCode = parent && (typeof node === 'string' ? node : tmat(parent).replace(/\n/g, ' '));
    const nodeCode = typeof node === 'string' ? node : tmat(node).replace(/\n/g, ' ');
    if (parent && parentCode !== nodeCode) log(DIM + 'Parent:', parentCode, RESET);
    log(YELLOW + 'Before:' + RESET, nodeCode);
  }
}

function source(node) {
  if (VERBOSE_TRACING) {
    if (Array.isArray(node)) node.forEach((n) => source(n));
    else {
      let code = tmat(node);
      try {
        code = fmat(code); // May fail.
      } catch {}
      if (code.includes('\n')) {
        log(YELLOW + 'Source:' + RESET);
        group();
        log(code);
        groupEnd();
      } else {
        log(YELLOW + 'Source:' + RESET, code);
      }
    }
  }
}

function after(node, parentNode) {
  if (!VERBOSE_TRACING) return;
  if (Array.isArray(node)) node.forEach((n) => after(n, parentNode));
  else {
    const parentCode = parentNode && (typeof node === 'string' ? node : tmat(parentNode).replace(/\n/g, ' '));
    const nodeCode = typeof node === 'string' ? node : tmat(node).replace(/\n/g, ' ');
    log(YELLOW + 'After :' + RESET, nodeCode);
    if (parentNode && parentCode !== nodeCode) log(DIM + 'Parent:', parentCode, RESET);
  }
}

export function phase2(program, fdata, resolve, req, verbose = VERBOSE_TRACING) {
  VERBOSE_TRACING = verbose;
  if (fdata.len > 10 * 1024) VERBOSE_TRACING = false; // Only care about this for tests or debugging. Limit serialization for larger payloads for the sake of speed.

  group('\n\n\n##################################\n## phase2  ::  ' + fdata.fname + '\n##################################\n\n\n');

  // Initially we only care about bindings whose writes have one var decl and only assignments otherwise
  // Due to normalization, the assignments will be a statement. The var decl can not contain an assignment as init.
  // Elimination of var decls or assignments will be deferred. This way we can preserve parent/node
  // relationships which might otherwise break. This means a binding may have been removed from the books
  // even though it's technically still part of the AST. But since we take the books as leading in this step
  // that should not be a problem.

  const ast = fdata.tenkoOutput.ast;
  const toEliminate = [];

  const emptyFuncs = pruneEmptyFunctions(fdata);
  if (emptyFuncs) return emptyFuncs;

  group('\n\n\nInlining constants with primitive values\n');
  let inlined = false;
  let inlinedSomething = 0;
  let inlineLoops = 0;
  do {
    inlined = false;

    group('Iteration', ++inlineLoops, 'of constant inlining');
    // Note: This step may rename bindings, eliminate them (queued), introduce new ones.
    //       Take care to preserve body[index] ordering. Don't add/remove elements to any body array.
    //       Preserve the parent of any identifier as detaching them may affect future steps.
    //       If any such parent/ancestor is to be removed, put it in the toEliminate queue.
    fdata.globallyUniqueNamingRegistry.forEach(function (meta, name) {
      if (meta.isBuiltin) return;
      if (VERBOSE_TRACING) group('-- name:', name, ', writes:', meta.writes.length, ', reads:', meta.reads.length);

      if (!name.startsWith(ALIAS_PREFIX)) {
        if (meta.writes.length === 1 && !meta.isConstant) {
          log('Binding `' + name + '` has one write so should be considered a constant, even if it wasnt');
          meta.isConstant = true;
          if (meta.writes[0].decl) {
            const { declParent, declProp, declIndex } = meta.writes[0].decl;
            const varDecl = declIndex >= 0 ? declParent[declProp][declIndex] : declParent[declProp];

            ASSERT(varDecl.type === 'VariableDeclaration', 'if not then indexes changed?');
            ASSERT(
              varDecl.kind === 'let',
              'so it must be a let right now because vars are eliminated and it wasnt marked as a constant',
              declParent,
            );
            if (varDecl.declarations[0].init) {
              rule('A binding decl where the binding has one write must be a const');
              example('let x = 10; f(x);', 'const x = 10; f(x);');
              before(meta.writes[0].decl.declParent);

              varDecl.kind = 'const';

              after(meta.writes[0].decl.declParent);
            } else {
              log('This var has no init so it cannot be a const. Probably unused, or plain undefined.');
            }
          }
        }

        // Attempt to fold up constants
        if (meta.isConstant) {
          ASSERT(meta.name === name);
          if (attemptConstantInlining(meta, fdata)) {
            groupEnd();
            inlined = true;
            return;
          }
        }
      }

      if (meta.reads.length === 0 && meta.writes[0].decl) {
        ASSERT(meta.writes.length);
        if (VERBOSE_TRACING) group('Binding `' + name + '` only has writes, zero reads and could be eliminated.');
        // For now, only eliminate actual var decls and assigns. Catch clause is possible. Can't change params for now.
        // If any writes are eliminated this way, drop them from the books and queue them up

        // If the decl is used in a for-x, export, or catch binding (or?) then we must keep the binding decl (should only be one).
        const keepDecl = meta.writes.some((write) => !write.decl && !write.assign);

        rule('Write-only bindings should be eliminated');
        example('let a = f(); a = g();', 'f(); g();');

        for (let i = 0; i < meta.writes.length; ++i) {
          const write = meta.writes[i];
          if (write.decl && !keepDecl) {
            // Replace the decl with the init.

            const { declParent, declProp, declIndex } = write.decl;
            const node = declIndex >= 0 ? declParent[declProp][declIndex] : declParent[declProp];
            log('Replacing a decl with the init', declParent.type + '.' + declProp, declParent.$p.pid, node.type, node.$p.pid);
            before(node, declParent);

            ASSERT(node.type === 'VariableDeclaration', 'if not then indexes changed?', node);
            //const init = node.declarations[0].init; // It may be empty. Most likely case is a hoisted var decl.
            log('Var decl queued for actual deletion');
            toEliminate.push({ parent: declParent, prop: declProp, index: declIndex });
            meta.writes.splice(i, 1);

            inlined = true;
            --i;
          } else if (write.assign) {
            // Replace the assignment with the rhs

            const { assignParent, assignProp, assignIndex } = write.assign;
            const node = assignIndex >= 0 ? assignParent[assignProp][assignIndex] : assignParent[assignProp];
            log('Replacing an assignment with the rhs', assignParent.type + '.' + assignProp, assignParent.$p.pid, node.type, node.$p.pid);
            before(node, assignParent);

            ASSERT(
              node.type === 'ExpressionStatement' && node.expression.type === 'AssignmentExpression',
              'if not then indexes changed?',
              node,
            );
            log('Assignment queued for actual deletion');
            toEliminate.push({ parent: assignParent, prop: assignProp, index: assignIndex });
            meta.writes.splice(i, 1);

            inlined = true;
            --i;
          }
        }

        if (meta.writes.length === 0) {
          fdata.globallyUniqueNamingRegistry.delete(name);
        }

        if (VERBOSE_TRACING) groupEnd();

        if (inlined) {
          if (VERBOSE_TRACING) groupEnd();
          return;
        }
      }

      if (VERBOSE_TRACING) groupEnd();
    });
    log('End of iteration', inlineLoops, ' of constant inlining. Did we inline anything?', inlined ? 'yes' : 'no');

    if (VERBOSE_TRACING) log('\nCurrent state\n--------------\n' + fmat(tmat(ast)) + '\n--------------\n');

    groupEnd();
    if (inlined) {
      log('Folded some constants. Trying loop again...\n\n');
      ++inlinedSomething;
    }
  } while (inlined);
  // All read node meta data (parent etc) are invalidated if the next bit eliminates anything.
  if (toEliminate.length) {
    group('Actually eliminate', toEliminate.length, 'var decls and assignments that were rendered redundant');
    toEliminate.forEach(({ parent, prop, index }) => {
      const node = index >= 0 ? parent[prop][index] : parent[prop];
      before(node, parent);
      if (node.type === 'ExpressionStatement') {
        ASSERT(node.expression.type === 'AssignmentExpression');
        node.expression = node.expression.right;
        after(node);
      } else if (node.type === 'FunctionDeclaration') {
        ASSERT(node.id);
        log('Eliminating `' + node.id.name + '`');
        if (index >= 0) {
          parent[prop][index] = AST.emptyStatement();
        } else {
          parent[prop] = AST.emptyStatement();
        }
      } else {
        ASSERT(node.type === 'VariableDeclaration', 'if eliminating a new node support it above', node);
        const init = node.declarations[0].init;
        // If the init is `this`, `arguments`, or `arguments.length`, we can and should immediately drop it
        if (
          init &&
          (init.type === 'ThisExpression' ||
            (init.type === 'Identifier' && init.name === 'arguments') ||
            (init.type === 'MemberExpression' &&
              init.object.type === 'Identifier' &&
              init.object.name === 'arguments' &&
              !init.object.computed &&
              init.property.name === 'length'))
        ) {
          if (VERBOSE_TRACING) log('Dropping the init because it is `this`, `arguments`, or `arguments.length`');
          if (index >= 0) {
            parent[prop][index] = AST.emptyStatement();
          } else {
            parent[prop] = AST.emptyStatement();
          }
          after(AST.emptyStatement(), parent);
        } else {
          const newNode = init ? AST.expressionStatement(init) : AST.emptyStatement();
          if (index >= 0) {
            parent[prop][index] = newNode;
          } else {
            parent[prop] = newNode;
          }
          after(newNode, parent);
        }
      }
    });
    groupEnd();
    // The read/write data is unreliable from here on out and requires a new phase1 step!
  }
  log('Folded', inlinedSomething, 'constants.');
  if (inlinedSomething || toEliminate.length) {
    log('Restarting from phase1 to fix up read/write registry\n\n\n\n\n\n');
    groupEnd();
    groupEnd();
    return 'phase1';
  }
  groupEnd();

  group('\n\n\nChecking for promotable vars\n');
  let promoted = 0;
  fdata.globallyUniqueNamingRegistry.forEach((meta, name) => {
    if (meta.isBuiltin) return;
    if (meta.isImplicitGlobal) return;

    if (VERBOSE_TRACING) group('- `' + name + '`');

    // Check if all usages of the binding is consolidated to one scope
    const writeScopes = new Set();
    meta.writes.forEach((write) => writeScopes.add(write.scope));
    const readScopes = new Set();
    meta.reads.forEach((write) => readScopes.add(write.scope));

    ASSERT(meta.writes.length > 0, 'all bindings must have at least some writes...');
    const declData = meta.writes[0].decl;

    // "Does the binding have two writes, of which the first was a decl and the second a regular assignment?"
    if (meta.writes.length === 2 && meta.writes[0].decl && meta.writes[1].assign) {
      if (VERBOSE_TRACING) group('Found `' + name + '` which has two writes, first a decl without init and second an assignment');
      const decl =
        declData.declIndex >= 0 ? declData.declParent[declData.declProp][declData.declIndex] : declData.declParent[declData.declProp];
      const decr = decl.declarations[0];
      // Did the decl have no init? Because that's a case where we may ignore the "write", provided reads don't happen before it.
      if (decr && decr.id && !decr.init) {
        // This might be a constant. It is currently a var or let (not already a const because it has no init).
        // Confirm that the reads happen in the same scope as the write. Ignore the decl as it doesn't write.
        if (readScopes.size === 1 && readScopes.has(meta.writes[1].scope)) {
          // The writes and all the reads happen in the same scope. Now confirm that the branch where
          // the reads occur can all reach the branch (upwards) to where the write occurs.
          // For example, `{ x=10; } x;` fails where `{ x=10; { x; } }` passes.

          // Each read and write will have a blockChain property which is an array of block pids where the
          // last pid is that of the block that contains the read or write.
          // We need to validate here whether the read occurs in a block that is an ancestor of the block
          // containing the write. This must mean the write chain is a prefix of the read...?

          const writeChain = meta.writes[1].blockChain;
          if (
            meta.reads.every((read) => {
              const pass = read.blockChain.startsWith(writeChain);
              log('OOB check: does `' + read.blockChain + '` start with `' + writeChain + '` ?', pass);
              return pass;
            })
          ) {
            // Every read is in a block that is on the same level of, or an ancestor of, the block containing the write.
            // As the final step We must now confirm that the first read occurs after the write.
            // We stick to source order for now. We can use rwCounter for this purpose.
            // Note that var statements are hoisted above func decls so that order should work out.
            // All reads must have a higher value than the write.
            const writeCounter = meta.writes[1].rwCounter;
            // TODO: we can merge this step with the one above
            if (
              meta.reads.every((read) => {
                log('Does the read appear later in source than the write?', read.rwCounter, '>', writeCounter);
                return read.rwCounter > writeCounter;
              })
            ) {
              log('The binding is a constant. Change the write to a const decl.');
              // Drop the decl (the first write) and promote the second write to a const decl. Make sure to update the write too.

              rule('Hoisted var decl that is a constant should become const');
              example('let x; x = f(); g(x);', 'const x = f(); g(x);');
              before(decl);
              before(meta.writes[1].parentNode);

              if (declData.declIndex >= 0) {
                declData.declParent[declData.declProp][declData.declIndex] = AST.emptyStatement();
              } else {
                declData.declParent[declData.declProp] = AST.emptyStatement();
              }

              // Drop the empty var decl from the list
              meta.writes.shift();

              // Promote the only write left.
              // The original code may not have been an expression statement but after normalization it must now be.
              const assign = meta.writes[0];

              ASSERT(
                assign.assign.assignParent[assign.assign.assignProp][assign.assign.assignIndex].type === 'ExpressionStatement',
                'all assignments should be normalized to expression statements',
                assign,
              );
              ASSERT(
                assign.assign.assignParent[assign.assign.assignProp][assign.assign.assignIndex].expression === assign.parentNode,
                'the assignment should be in the expression statement',
              );

              declData.declParent[declData.declProp][declData.declIndex] = AST.emptyStatement();

              const newNode = AST.variableDeclaration(assign.parentNode.left, assign.parentNode.right, 'const');

              assign.assign.assignParent[assign.assign.assignProp][assign.assign.assignIndex] = newNode;

              // Mark it as a constant for other reasons
              meta.isConstant = true;

              // Push a new write record for the const decl which replaces the old one for the assignment
              meta.writes[0] = createWriteRef({
                parentNode: newNode.declarations[0],
                parentProp: 'init',
                parentIndex: -1,
                blockBody: assign.blockBody,
                blockIndex: assign.blockIndex,
                node: newNode.declarations[0].id,
                rwCounter: assign.rwCounter,
                scope: assign.scope,
                blockChain: assign.blockChain,
                innerLoop: assign.innerLoop,
                decl: { declParent: assign.assign.assignParent, declProp: assign.assign.assignProp, declIndex: assign.assign.assignIndex },
              });

              after(newNode, assign.assign.assignParent);
              inlined = true;
              ++promoted;
              return;
            } else {
              log('There was at least one read before the write. Binding may not be a constant (it could be).');
            }
          } else {
            // At least one read appeared on a block that was not an ancestor of the block containing the write.
            log('At least one read was oob and might read an `undefined`. Not a constant.');
          }
        }
      }

      if (VERBOSE_TRACING) log('- Var decl not immediately followed by assignment');
      if (VERBOSE_TRACING) groupEnd();
    }

    // If a binding start with a var decl as first write (prevents func decl closure problem) and the next
    // usage is an assignment write then the first decl can be dropped (if it has an init then that becomes
    // the statement) and the next write becomes the decl. This should hold even if the binding becomes a
    // closure since func decls will be hoisted and so will appear earlier and any other closure won't be
    // able to be called until it is defined (-> source order read) so that can't cause problems either.
    // This only holds if all future reads have the blockchain of the first read as a prefix of their own.
    // A future update might improve that by doing branch analysis or branch extrapolation.
    // Additionally, we can't do this for loops since they obviously do revisit the previous name. If the
    // last write was in the same loop then the above applies anyways. Otherwise it's trickier. So we track
    // it. If a block was was the body of a loop (must be `while` or `fox-x` at this point) then the number
    // in the blockChain will be negative.

    // A write can be SSA'd if
    // - all future writes are assigns (not params, for-x or something else)
    // - all reads must reach the write
    // - all prior reads are in the same scope
    // - if the write is in a loop,
    //   - there are no prior reads in the same or an even deeper loop
    //   - all future reads are in the same scope

    // Note regarding SSA on param names; there exists a secret live binding in `arguments` that this transform breaks. Not sure I car.e

    if (VERBOSE_TRACING) log('Starts with decl or param?', !!declData, !!meta.writes[0].param);

    // "Is this binding defined through a var decl or param name?" -- prevents forx, func decl closures, implicit globals, and TDZ cases.
    if (declData || meta.writes[0].param) {
      log('The binding `' + name + '` has a var decl. Analyzing usages (', meta.reads.length, 'reads and', meta.writes.length, 'writes).');

      const rwOrder = [...meta.reads, ...meta.writes].sort(({ rwCounter: a }, { rwCounter: b }) => (a < b ? -1 : a > b ? 1 : 0));
      log('rwOrder:', [rwOrder.map((o) => o.action).join(', ')]);
      // Note: We asserted that the first write is a var decl, but a closure in func decl may still put a read as
      //       the first source ref. This is not a concern for params since they must go first in their scope (defaults are gone).
      if (rwOrder[0].action === 'write') {
        log('The initial binding:');
        source(rwOrder[0].parentNode);

        ASSERT(rwOrder[0].decl || rwOrder[0].param, 'the first write should be a decl or param, otherwise maybe this is TDZ');
        ASSERT(
          rwOrder.slice(1).every((rw) => (!rw.decl && !rw.param ? true : !!void console.dir(rw, { depth: null }))),
          'a binding should have no more than one var decl / param after normalization',
          name,
          rwOrder,
        );

        // Bail as soon as we find a read/write in a different scope. In that case we have a TDZ or closure
        // and source-order-"future" read/writes can not (easily) statically be guaranteed to be safe.
        const bindingScope = rwOrder[0].scope;

        // Note: rwOrder may have holes after the loop but during the loop, a and b should not be null
        for (let i = 1; i < rwOrder.length; ++i) {
          const a = rwOrder[i - 1];
          const b = rwOrder[i];

          log('- rwOrder[' + i + '] =', b.action);
          source(b.parentNode);

          if (b.scope !== bindingScope) {
            // TODO: I think there are situations where we can still safely support this case
            log('Found a read/write in a different scope. Bailing as we cannot guarantee the remaining read/writes.');
            break;
          }

          if (b.action === 'write') {
            // Must be
            // - an assignment
            // - all future reads must reach this write
            // - if the current write is inside a loop (while, for-x)
            //   - all future reads must not be outside the current loop
            //   - all future reads must be in the same scope
            //   - all previous reads must be before the current loop

            log('Is the write an assign?', !!b.assign);

            // Verify that the write is an assign that happens in the same scope because we must ignore closures for now
            ASSERT(!b.decl && !b.param, 'a decl must be the first write and a and b were both writes so b cannot be the var decl');
            if (b.assign) {
              // Must verify that all remaining usages can reach this write

              let loopId = b.innerLoop;
              log('Write inside a loop?', loopId);
              let canSSA = true;
              if (loopId) {
                log('Checking if any previous read can reach this write (it is bad if one does)');
                // All previous reads must not be able to reach this assign (because that implies they're part of the loop)
                for (let j = 0; j < i; ++j) {
                  const c = rwOrder[j];
                  if (c.action === 'read') {
                    log(
                      '-',
                      j,
                      ':',
                      c.action,
                      ', same loop:',
                      loopId === c.innerLoop,
                      ', can reach:',
                      c.blockChain.startsWith(b.blockChain),
                    );
                    if (loopId === c.innerLoop) {
                      log('At least one previous ref is in the same loop so this we can not SSA');
                      canSSA = false;
                      break;
                    }
                    if (c.blockChain.startsWith(b.blockChain)) {
                      log('At least one previous ref can reach this write so this we can not SSA');
                      canSSA = false;
                      break;
                    }
                  }
                }
              }
              if (canSSA) {
                log('Checking if all future reads can reach this write (good) and that they are in the same scope (good)');
                for (let j = i + 1; j < rwOrder.length; ++j) {
                  const c = rwOrder[j];
                  log('-', j, ': can reach:', c.blockChain.startsWith(b.blockChain), ', same scope:', b.scope === c.scope);
                  // Closure? Only relevant if assignment is in a loop.
                  if (loopId && b.scope !== c.scope) {
                    log('At least one future read/write was in a different scope');
                    canSSA = false;
                    break;
                  }
                  // A usage c can reach another usage b if the blockChain of b is a prefix of the blockchain of c
                  if (!c.blockChain.startsWith(b.blockChain)) {
                    log('At least one future read/write can not reach this assignment');
                    canSSA = false;
                    break;
                  }
                }
              }

              if (canSSA) {
                log('Applying SSA now');
                rule('A redundant assign where remaining usages can all reach it must be SSA-ed');
                example('let x = 10; x = 20; f(x);', 'let x = 10; let x2 = 20; f(x2);');
                before(b.node);

                const newName = createFreshVar(name.startsWith('SSA_') ? name : 'SSA_' + name, fdata);
                const newMeta = fdata.globallyUniqueNamingRegistry.get(newName);
                b.node.name = newName;

                // Convert the assignment node represented by `b` into a let decl

                meta.writes.splice(meta.writes.indexOf(b), 1);
                newMeta.writes.push(b);

                // Replace the assignment with a var decl of the same kind
                const { assignParent, assignProp, assignIndex } = b.assign;
                const assignExpr = assignIndex >= 0 ? assignParent[assignProp][assignIndex] : assignParent[assignProp];
                ASSERT(b.parentNode.type === 'AssignmentExpression', 'if not then indexes changed?', assignExpr);
                ASSERT(b.parentNode.left === b.node, 'should still be node');
                const rhs = b.parentNode.right;
                const newNode = AST.variableDeclaration(b.node, rhs, 'let'); // it SHOULD be fine to change this to a let...?
                if (assignIndex >= 0) assignParent[assignProp][assignIndex] = newNode;
                else assignParent[assignProp] = newNode;

                for (let j = i + 1; j < rwOrder.length; ++j) {
                  const c = rwOrder[j];

                  if (c.action === 'write') {
                    meta.writes.splice(meta.writes.indexOf(c), 1);
                    newMeta.writes.push(c);
                  } else {
                    meta.reads.splice(meta.reads.indexOf(c), 1);
                    newMeta.reads.push(c);
                  }

                  c.node.name = newName;
                }

                after(b.node);
                ++promoted;
                //endit
              } else {
                log('At least one subsequent usage can not reach this write so we can not easily SSA here');
              }
            }
          }
        }
      }
    }

    if (VERBOSE_TRACING) groupEnd();
  });
  groupEnd();
  log('\nPromoted', promoted, 'bindings to constant');
  if (promoted) {
    log('Restarting from phase1 to fix up read/write registry\n\n\n\n\n\n');
    groupEnd();
    return 'phase1';
  }

  group('\n\n\nChecking for func calls that can be inlined');
  let inlinedFuncCount = 0;
  fdata.globallyUniqueNamingRegistry.forEach((meta, name) => {
    if (meta.isConstant && meta.constValueRef) {
      ASSERT(meta.writes.length === 1);
      const funcNode = meta.constValueRef.node;
      if ((funcNode.type === 'FunctionExpression' || funcNode.type === 'ArrowFunctionExpression') && funcNode.$p.inlineMe) {
        meta.reads.forEach((read) => {
          if (read.parentNode.type === 'CallExpression' && read.parentProp === 'callee') {
            // This read was a call to the function
            if (funcNode.$p.inlineMe === 'single return with primitive') {
              rule('Function that only returns primitive must be inlined');
              example('function f() { return 5; } f();', '5;');
              before(read.node, read.parentNode);

              if (read.grandIndex >= 0) {
                read.grandNode[read.grandProp][read.grandIndex] = AST.cloneSimple(funcNode.body.body[0].argument);
              } else {
                read.grandNode[read.grandProp] = AST.cloneSimple(funcNode.body.body[0].argument);
              }
              ++inlinedFuncCount;

              after(read.parentNode);
            } else if (funcNode.$p.inlineMe === 'double with primitive') {
              rule('Function that returns local primitive should be inlined');
              example('function f() { const x = undefined; return x; } f();', 'undefined;');
              before(read.node, read.parentNode);

              if (read.grandIndex >= 0) {
                read.grandNode[read.grandProp][read.grandIndex] = funcNode.body.body[0].declarations[0].init;
              } else {
                read.grandNode[read.grandProp] = funcNode.body.body[0].declarations[0].init;
              }
              ++inlinedFuncCount;

              after(read.parentNode);
            } else if (funcNode.$p.inlineMe === 'double with array with primitives') {
              rule('Function that returns array literal with only primitives should be inlined');
              example('function f() { const arr = [1, 2]; return arr; } f();', '[1, 2];');
              before(read.node, read.parentNode);

              if (read.grandIndex >= 0) {
                read.grandNode[read.grandProp][read.grandIndex] = funcNode.body.body[0].declarations[0].init;
              } else {
                read.grandNode[read.grandProp] = funcNode.body.body[0].declarations[0].init;
              }
              ++inlinedFuncCount;

              after(read.parentNode);
            }
          }
        });
      }
    }
  });
  groupEnd();
  log('Inlined', inlinedFuncCount, 'function calls.');
  if (inlinedFuncCount > 0) {
    log('Restarting from phase1 to fix up read/write registry\n\n\n\n\n\n');
    groupEnd();
    return 'phase1';
  }

  // The read/write data should still be in tact

  if (VERBOSE_TRACING) log('\nCurrent state\n--------------\n' + fmat(tmat(ast)) + '\n--------------\n');

  groupEnd();
}

function attemptConstantInlining(meta, fdata) {
  ASSERT(meta.isConstant);
  ASSERT(meta.writes.length === 1, 'a constant should have one write?', meta.writes);
  const write = meta.writes[0];
  ASSERT(write, 'figure out whats wrong if this breaks');

  // Figure out the assigned value. This depends on the position of the identifier (var decl, param, assign).
  // Note: any binding can be isConstant here. It is not determined by `const`, but by the number of writes.
  let rhs;
  if (write.parentNode.type === 'VariableDeclarator') {
    rhs = write.parentNode.init; // Must exist if the variable is a constant. We normalized for-header cases away.
    if (!rhs) {
      // Var decl without init. Substitute undefined here.
      rhs = AST.identifier('undefined');
    }
  } else if (write.parentNode.type === 'AssignmentExpression') {
    // Must be a regular assignment
    rhs = write.parentNode.right;
  } else {
    // Tough luck. Until we support parameters and all that.
    return;
  }

  if (rhs && rhs.name === 'arguments') {
    log('TODO; uncomment me to figure out what to do with `arguments`');
    return;
  }

  const assigneeMeta = fdata.globallyUniqueNamingRegistry.get(rhs.name);

  if (rhs.type === 'Identifier' && (assigneeMeta.isBuiltin || assigneeMeta.isConstant)) {
    // `const x = undefined;` but rhs is NOT a literal
    // If the identifier has isConstant=true or isBuiltin=true then
    // - eliminate the decl (this will get queued)
    // - replace all reads with a clone of it
    // - deregister the name

    group('Attempt to replace the', meta.reads.length, 'reads of `' + meta.name + '` with reads of `' + rhs.name);

    rule('Declaring a constant with a constant value should eliminate the binding');
    example('const x = null; f(x);', 'f(null);', () => assigneeMeta.isBuiltin);
    example('const x = f(); const y = x; g(y);', 'const x = f(); g(x);', () => !assigneeMeta.isBuiltin);
    before(write.parentNode);

    // With the new
    const clone = AST.cloneSimple(rhs);
    const reads = meta.reads;
    let inlined = false;
    for (let i = 0; i < reads.length; ++i) {
      // Note: this parent may not be part of the AST anymore (!) (ex. if a var decl with complex init was eliminated)
      const oldRead = reads[i];
      const { parentNode, parentProp, parentIndex, grandNode, grandProp, grandIndex } = oldRead;
      if (parentNode.type === 'ExportSpecifier') {
        log('Skipping export ident');
      } else {
        log(
          'Replacing a read of `' +
            meta.name +
            '` with a read from `' +
            clone.name +
            '` (on prop `' +
            parentNode.type +
            '.' +
            parentProp +
            (parentIndex >= 0 ? '[' + parentIndex + ']' : '') +
            ')' +
            '`...',
        );
        before(parentNode, parentIndex >= 0 ? parentNode[parentProp][parentIndex] : parentNode[parentProp]);
        if (parentIndex >= 0) parentNode[parentProp][parentIndex] = clone;
        else parentNode[parentProp] = clone;
        after(parentNode, parentIndex >= 0 ? parentNode[parentProp][parentIndex] : parentNode[parentProp]);
        inlined = true;
        // Remove the read. This binding is read one fewer times
        reads.splice(i, 1);
        // Add a read to the rhs. It is read one more time instead.
        assigneeMeta.reads.push(
          createReadRef({
            parentNode,
            parentProp,
            parentIndex,
            grandNode,
            grandProp,
            grandIndex,
            blockBody: oldRead.blockBody,
            blockIndex: oldRead.blockIndex,
            node: clone,
            rwCounter: oldRead.rwCounter,
            scope: oldRead.scope,
            blockChain: oldRead.blockChain,
            innerLoop: oldRead.innerLoop,
          }),
        );
        // We removed an element from the current loop so retry the current index
        --i;
      }
    }
    log('Binding `' + meta.name + '` has', reads.length, 'reads left after this');

    if (reads.length === 0 && write.decl) {
      group('Eliminating var decl');
      log('Zero reads left and it was a var decl. Replacing it with an empty statement.');
      // Remove the declaration if it was a var decl because there are no more reads from this and it is a constant
      // Note: the init was a lone identifier (that's how we got here) so we should not need to preserve the init
      const { declParent, declProp, declIndex } = write.decl;
      ASSERT(
        (declIndex >= 0 ? declParent[declProp][declIndex] : declParent[declProp]).type === 'VariableDeclaration',
        'if not then indexes changed?',
      );
      const decr = (declIndex >= 0 ? declParent[declProp][declIndex] : declParent[declProp]).declarations[0];
      ASSERT(!decr.init || decr.init.type === 'Identifier');
      if (declIndex >= 0) declParent[declProp][declIndex] = AST.emptyStatement();
      else declParent[declProp] = AST.emptyStatement();

      inlined = true;

      fdata.globallyUniqueNamingRegistry.delete(meta.name);
      groupEnd();
    }

    after(';');
    groupEnd();
    return inlined;
  }

  if (
    // numbers, null, true, false, strings
    (rhs.type === 'Literal' &&
      (rhs.raw === 'null' ||
        rhs.value === true ||
        rhs.value === false ||
        typeof rhs.value === 'string' ||
        typeof rhs.value === 'number')) ||
    // Negative numbers, or numbers with a + before it (noop which we should eliminate anyways... but probably not here).
    // This kind of unary for other constants should be statically resolved (elsewhere), like `-null` is `-0` etc.
    (rhs.type === 'UnaryExpression' &&
      (rhs.operator === '+' || rhs.operator === '-') && // + shouldn't appear here after normalization but okay
      rhs.argument.type === 'Literal' &&
      typeof rhs.argument.value === 'number')
  ) {
    // `const x = 5;`
    // Replace all reads of this name with a clone of the literal, ident, or unary

    rule('Declaring a constant with a literal value should eliminate the binding');
    example('const x = 100; f(x);', 'f(100);');
    before(write.parentNode);

    group('Attempt to replace the', meta.reads.length, 'reads');
    // With the new
    const clone = AST.cloneSimple(rhs);
    const reads = meta.reads;
    let inlined = false;
    for (let i = 0; i < reads.length; ++i) {
      const { parentNode, parentProp, parentIndex } = reads[i];
      if (parentNode.type === 'ExportSpecifier') {
        log('Skipping export ident');
      } else {
        group(
          'Replacing a read with the literal...',
          parentNode.type + '.' + parentProp,
          parentNode.$p.pid,
          (parentIndex >= 0 ? parentNode[parentProp][parentIndex] : parentNode[parentProp]).type,
          (parentIndex >= 0 ? parentNode[parentProp][parentIndex] : parentNode[parentProp]).$p.pid,
        );

        before(parentNode, write.assign ? write.assign.assignParent : write.decl ? write.decl.declParent : wat);
        if (parentIndex >= 0) parentNode[parentProp][parentIndex] = clone;
        else parentNode[parentProp] = clone;
        after(parentNode, write.assign ? write.assign.assignParent : write.decl ? write.decl.declParent : wat);
        inlined = true;
        // No need to push a read back in. We don't need to track reads to builtin literals like `null` or `undefined` (I think)
        reads.splice(i, 1);
        --i;
        groupEnd();
      }
    }
    log('Binding `' + meta.name + '` has', reads.length, 'reads left after this');

    if (reads.length === 0 && write.decl) {
      group('Deleting the var decl');
      // Remove the declaration if it was a var decl because there are no more reads from this and it is a constant
      // Note: the init was a lone literal (that's how we got here) so we should not need to preserve the init
      const { declParent, declProp, declIndex } = write.decl;
      before(declIndex >= 0 ? declParent[declProp][declIndex] : declParent[declProp], declParent);
      ASSERT(
        (declIndex >= 0 ? declParent[declProp][declIndex] : declParent[declProp]).type === 'VariableDeclaration',
        'if not then indexes changed?',
      );
      const decr = (declIndex >= 0 ? declParent[declProp][declIndex] : declParent[declProp]).declarations[0];
      ASSERT(!decr.init || decr.init === rhs);
      if (declIndex >= 0) declParent[declProp][declIndex] = AST.emptyStatement();
      else declParent[declProp] = AST.emptyStatement();
      inlined = true;

      fdata.globallyUniqueNamingRegistry.delete(meta.name);
      after(AST.emptyStatement(), declParent);
      groupEnd();
    }

    after(';');
    groupEnd();
    return inlined;
  }
}
