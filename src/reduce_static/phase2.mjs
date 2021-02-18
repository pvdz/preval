import { log, group, groupEnd, ASSERT, BLUE, RED, RESET, tmat, fmat, getIdentUsageKind, PURPLE, DIM, YELLOW } from '../utils.mjs';
import walk from '../../lib/walk.mjs';
import * as AST from '../ast.mjs';

const VERBOSE_TRACING = true;

// Things to do
// - Inline local constants, numbers, literal idents
// - Inline imported constants
// - Unroll a function when called with a primitive
// - Branch out
// - Const binding folding (const a = $(); const b = a; -> redundant)
// - Unary negative/positive should look at argument

function rule(desc, ...rest) {
  log(PURPLE + 'Rule:' + RESET + ' "' + desc + '"', ...rest);
}
function example(from, to, condition) {
  if (!condition || condition()) {
    log(PURPLE + '--' + RESET + ' `' + from + '` ' + PURPLE + '-->' + RESET + ' `' + to + '`');
  }
}

function before(node, parent) {
  if (Array.isArray(node)) node.forEach((n) => before(n, parent));
  else if (VERBOSE_TRACING) {
    const parentCode = parent && (typeof node === 'string' ? node : tmat(parent).replace(/\n/g, ' '));
    const nodeCode = typeof node === 'string' ? node : tmat(node).replace(/\n/g, ' ');
    if (parent && parentCode !== nodeCode) log(DIM + 'Parent:', parentCode, RESET);
    log(YELLOW + 'Before:' + RESET, nodeCode);
  }
}

function source(node) {
  if (Array.isArray(node)) node.forEach((n) => source(n));
  else if (VERBOSE_TRACING) log(YELLOW + 'Source:' + RESET, tmat(node));
}

function after(node, parentNode) {
  if (Array.isArray(node)) node.forEach((n) => after(n, parentNode));
  else if (VERBOSE_TRACING) {
    const parentCode = parentNode && (typeof node === 'string' ? node : tmat(parentNode).replace(/\n/g, ' '));
    const nodeCode = typeof node === 'string' ? node : tmat(node).replace(/\n/g, ' ');
    log(YELLOW + 'After :' + RESET, nodeCode);
    if (parentNode && parentCode !== nodeCode) log(DIM + 'Parent:', parentCode, RESET);
  }
}

export function phase2(program, fdata, resolve, req, toEliminate = []) {
  group('\n\n\n##################################\n## phase2  ::  ' + fdata.fname + '\n##################################\n\n\n');

  // Initially we only care about bindings whose writes have one var decl and only assignments otherwise
  // Due to normalization, the assignments will be a statement. The var decl can not contain an assignment as init.
  // Elimination of var decls or assignments will be deferred. This way we can preserve parent/node
  // relationships which might otherwise break. This means a binding may have been removed from the books
  // even though it's technically still part of the AST. But since we take the books as leading in this step
  // that should not be a problem.

  group('Checking for inlinable constants');
  let inlined = false;
  // Note: This step may rename bindings, eliminate them (queued), introduce new ones.
  //       Take care to preserve body[index] ordering. Don't add/remove elements to any body array.
  //       Preserve the parent of any identifier as detaching them may affect future steps.
  //       If any such parent/ancestor is to be removed, put it in the toEliminate queue.
  fdata.globallyUniqueNamingRegistry.forEach(function (meta, name) {
    if (meta.isBuiltin) return;
    group('-- name:', name);

    //ASSERT(meta.writes.length >= 1, 'all bindings should have some kind of point of update, or else it is an implicit global read, which can happen but would be a runtime error in strict mode', meta);

    if (meta.writes.length === 1 && !meta.isConstant) {
      log('Binding `' + name + '` has one write so should be considered a constant, even if it wasnt');
      meta.isConstant = true;
      if (meta.writes[0].decl) {
        const { declParent, declProp, declIndex } = meta.writes[0].decl;
        const varDecl = declIndex >= 0 ? declParent[declProp][declIndex] : declParent[declProp];

        ASSERT(varDecl.type === 'VariableDeclaration', 'if not then indexes changed?');
        ASSERT(varDecl.kind === 'var' || varDecl.kind === 'let', 'so it must be a var or let right now', varDecl.declParent);
        if (varDecl.declarations[0].init) {
          rule('A binding decl where the binding has one write must be a const');
          example('let x = 10; f(x);', 'const x = 10; f(x);', () => varDecl.kind === 'let');
          example('var x = 10; f(x);', 'const x = 10; f(x);', () => varDecl.kind === 'var');
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
      log('Is a constant');
      ASSERT(meta.writes.length === 1, 'a constant should have one write?', meta.writes);
      const write = meta.writes[0];
      ASSERT(write, 'figure out whats wrong if this breaks');

      // Figure out the assigned value. This depends on the position of the identifier (var decl, param, assign).
      // Note: any binding can be isConstant here. It is not determined by `const`, but by the number of writes.
      let assignee;
      if (write.parentNode.type === 'VariableDeclarator') {
        assignee = write.parentNode.init; // Must exist if the variable is a constant. We normalized for-header cases away.
      } else if (write.parentNode.type === 'AssignmentExpression') {
        // Must be a regular assignment
        assignee = write.parentNode.right;
      } else {
        // Tough luck. Until we support parameters and all that.
        groupEnd();
        return;
      }

      if (!assignee || assignee.name === 'arguments') {
        log('TODO; uncomment me to figure out what to do with `arguments`');
        groupEnd();
        return;
      }

      const assigneeMeta = fdata.globallyUniqueNamingRegistry.get(assignee.name);

      if (assignee.type === 'Identifier' && (assigneeMeta.isBuiltin || assigneeMeta.isConstant)) {
        // `const x = undefined;` but rhs is NOT a literal
        // If the identifier has isConstant=true or isBuiltin=true then
        // - eliminate the decl (this will get queued)
        // - replace all reads with a clone of it
        // - deregister the name

        rule('Declaring a constant with a constant value should eliminate the binding');
        example('const x = null; f(x);', 'f(null);', () => assigneeMeta.isBuiltin);
        example('const x = f(); const y = x; g(y);', 'const x = f(); g(x);', () => !assigneeMeta.isBuiltin);
        before(write.parentNode);

        // With the new
        group('Attempt to replace the', meta.reads.length, 'reads of `' + name + '` with reads of `' + assignee.name);
        const clone = AST.cloneSimple(assignee);
        const reads = meta.reads;
        for (let i = 0; i < reads.length; ++i) {
          // Note: this parent may not be part of the AST anymore (!) (ex. if a var decl with complex init was eliminated)
          const oldRead = reads[i];
          const { parentNode, parentProp, parentIndex } = oldRead;
          if (parentNode.type === 'ExportSpecifier') {
            log('Skipping export ident');
          } else {
            log(
              'Replacing a read of `' +
                name +
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
            // Add a read to the assignee. It is read one more time instead.
            assigneeMeta.reads.push({
              action: 'read',
              parentNode,
              parentProp,
              parentIndex,
              node: clone,
              rwCounter: oldRead.rwCounter,
              scope: oldRead.scope,
              blockChain: oldRead.blockChain,
              innerLoop: oldRead.innerLoop,
            });
            // We removed an element from the current loop so retry the current index
            --i;
          }
        }
        log('Binding `' + name + '` has', reads.length, 'reads left after this');
        groupEnd();

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
          ASSERT((declIndex >= 0 ? declParent[declProp][declIndex] : declParent[declProp]).declarations[0].init.type === 'Identifier');
          if (declIndex >= 0) declParent[declProp][declIndex] = AST.emptyStatement();
          else declParent[declProp] = AST.emptyStatement();

          fdata.globallyUniqueNamingRegistry.delete(name);
          groupEnd();
        }

        after(';');
        groupEnd();
        return;
      }

      if (
        // numbers, null, true, false, strings
        (assignee.type === 'Literal' &&
          (assignee.raw === 'null' ||
            assignee.value === true ||
            assignee.value === false ||
            typeof assignee.value === 'string' ||
            typeof assignee.value === 'number')) ||
        // Negative numbers, or numbers with a + before it (noop which we should eliminate anyways... but probably not here).
        // This kind of unary for other constants should be statically resolved (elsewhere), like `-null` is `-0` etc.
        (assignee.type === 'UnaryExpression' &&
          (assignee.operator === '+' || assignee.operator === '-') && // + shouldn't appear here after normalization but okay
          assignee.argument.type === 'Literal' &&
          typeof assignee.argument.value === 'number')
      ) {
        // `const x = 5;`
        // Replace all reads of this name with a clone of the literal, ident, or unary

        rule('Declaring a constant with a literal value should eliminate the binding');
        example('const x = 100; f(x);', 'f(100);');
        before(write.parentNode);

        group('Attempt to replace the', meta.reads.length, 'reads');
        // With the new
        const clone = AST.cloneSimple(assignee);
        const reads = meta.reads;
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
        log('Binding `' + name + '` has', reads.length, 'reads left after this');
        groupEnd();

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
          ASSERT((declIndex >= 0 ? declParent[declProp][declIndex] : declParent[declProp]).declarations[0].init === assignee);
          if (declIndex >= 0) declParent[declProp][declIndex] = AST.emptyStatement();
          else declParent[declProp] = AST.emptyStatement();

          fdata.globallyUniqueNamingRegistry.delete(name);
          after(AST.emptyStatement(), declParent);
          groupEnd();
        }

        after(';');
        groupEnd();
        return;
      }
    }

    if (meta.reads.length === 0 && meta.writes[0].decl) {
      ASSERT(meta.writes.length);
      log('Binding `' + name + '` only has writes, zero reads and could be eliminated.');
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
      if (inlined) {
        groupEnd();
        return;
      }
    }

    groupEnd();
  });
  log('End of constant folding. Did we inline anything?', inlined ? 'yes' : 'no');

  const ast = fdata.tenkoOutput.ast;
  log('\nCurrent state\n--------------\n' + fmat(tmat(ast)) + '\n--------------\n');

  groupEnd();
  if (inlined) {
    log('Trying again...');
    groupEnd();
    return phase2(program, fdata, resolve, req, toEliminate);
  }

  group('Checking for promotable vars');
  fdata.globallyUniqueNamingRegistry.forEach((meta, name) => {
    if (meta.isBuiltin) return;
    if (meta.isImplicitGlobal) return;

    group('- `' + name + '`');

    // Check if all usages of the binding is consolidated to one scope
    const writeScopes = new Set();
    meta.writes.forEach((write) => writeScopes.add(write.scope));
    const readScopes = new Set();
    meta.reads.forEach((write) => readScopes.add(write.scope));

    ASSERT(meta.writes.length > 0, 'all bindings must have at least some writes...'); // what about implicit globals?
    const declData = meta.writes[0].decl;

    // "Does the binding have two writes, of which the first was a decl and the second a regular assignment?"
    if (meta.writes.length === 2 && meta.writes[0].decl && meta.writes[1].assign) {
      group('Found `' + name + '` which has two writes, first a decl without init and second an assignment');
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
              example('var x; x = f(); g(x);', 'const x = f(); g(x);');
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
              meta.writes[0] = {
                action: 'write',
                parentNode: newNode.declarations[0],
                parentProp: 'init',
                parentIndex: -1,
                node: newNode.declarations[0].id,
                rwCounter: assign.rwCounter,
                scope: assign.scope,
                blockChain: assign.blockChain,
                innerLoop: assign.innerLoop,
                decl: { declParent: assign.assign.assignParent, declProp: assign.assign.assignProp, declIndex: assign.assign.assignIndex },
              };

              after(newNode, assign.assign.assignParent);
              inlined = true;
            } else {
              log('There was at least one read before the write. Binding may not be a constant (it could be).');
            }
          } else {
            // At least one read appeared on a block that was not an ancestor of the block containing the write.
            log('At least one read was oob and might read an `undefined`. Not a constant.');
          }
        }
      }

      groupEnd();
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

    // "Is this binding defined through a var decl?" -- prevents params, forx, func decl closures, implicit globals, and TDZ cases.
    if (declData) {
      log('The binding `' + name + '` has a var decl. Analyzing usages (', meta.reads.length, 'reads and', meta.writes.length, 'writes).');

      const rwOrder = [...meta.reads, ...meta.writes].sort(({ rwCounter: a }, { rwCounter: b }) => (a < b ? -1 : a > b ? 1 : 0));
      log('rwOrder:', [rwOrder.map((o) => o.action).join(', ')]);
      // Note: we asserted that the first write is a var decl, but a closure in func decl may still put a read as the first source ref
      if (rwOrder[0].action === 'write') {
        ASSERT(rwOrder[0].decl, 'the first write should be a decl, or maybe this is TDZ');
        ASSERT(
          rwOrder.slice(1).every((rw) => !rw.decl),
          'a binding should have no more than one var decl after normalization',
        );

        log('The initial binding:');
        source(rwOrder[0].parentNode);

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
            // TODO: I think there are situations where we can stlil safely support this case
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
            ASSERT(!b.decl, 'a decl must be the first write and a and b were both writes so b cannot be the var decl');
            if (b.assign) {
              // Must verify that all remaining usages can reach this write

              let loopId = b.innerLoop;
              log('Write inside a loop?', loopId);
              let canSSA = true;
              if (loopId) {
                log('Checking if all previous reads can reach this write (it is bad if they do)');
                // All previous reads must not be able to reach this assign (because that implies they're part of the loop)
                for (let j = 0; j < i; ++j) {
                  const c = rwOrder[j];
                  log('-', j, ':', c.action, ', same loop:', loopId === c.innerLoop, ', can reach:', c.blockChain.startsWith(b.blockChain));
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

                const newName = createFreshVar(name.startsWith('SSA_') ? name : 'SSA_' + name);
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

                //endit
              } else {
                log('At least one subsequent usage can not reach this write so we can not easily SSA here');
              }
            }
          } else {
            // Either a or b wasn't a write
          }
        }
      }
    }

    groupEnd();
  });
  groupEnd();

  // All read node meta data (parent etc) are invalidated if the next bit eliminates anything.
  group('Actually eliminate var decls and assignments that were rendered redundant');
  toEliminate.forEach(({ parent, prop, index }) => {
    const node = index >= 0 ? parent[prop][index] : parent[prop];
    before(node, parent);
    if (node.type === 'ExpressionStatement') {
      ASSERT(node.expression.type === 'AssignmentExpression');
      node.expression = node.expression.right;
      after(node);
    } else {
      ASSERT(node.type === 'VariableDeclaration');
      const init = node.declarations[0].init;
      const newNode = init ? AST.expressionStatement(init) : AST.emptyStatement();
      if (index >= 0) {
        parent[prop][index] = newNode;
      } else {
        parent[prop] = newNode;
      }

      after(newNode, parent);
    }
  });
  groupEnd();
  // The reads data is unreliable from here on out and requires a new phase1 step!

  log('\nCurrent state\n--------------\n' + fmat(tmat(ast)) + '\n--------------\n');

  groupEnd();

  function generateUniqueGlobalName(name) {
    // Create a (module) globally unique name. Then use that name for the local scope.
    let n = 0;
    if (fdata.globallyUniqueNamingRegistry.has(name)) {
      while (fdata.globallyUniqueNamingRegistry.has(name + '$' + ++n));
    }
    return n ? name + '$' + n : name;
  }
  function registerGlobalIdent(name, originalName, { isExport = false, isImplicitGlobal = false, knownBuiltin = false } = {}) {
    if (!fdata.globallyUniqueNamingRegistry.has(name)) {
      fdata.globallyUniqueNamingRegistry.set(name, {
        // ident meta data
        uid: ++fdata.globalNameCounter,
        originalName,
        uniqueName: name,
        isExport, // exports should not have their name changed. we ensure this as the last step of this phase.
        isImplicitGlobal, // There exists explicit declaration of this ident. These can be valid, like `process` or `window`
        knownBuiltin, // Make a distinction between known builtins and unknown builtins.
        // Track all cases where a binding value itself is initialized/mutated (not a property or internal state of its value)
        // Useful recent thread on binding mutations: https://twitter.com/youyuxi/status/1329221913579827200
        // var/let a;
        // var/const/let a = b;
        // const a = b;
        // import a, b as a, * as a, {a, b as a} from 'x';
        // export var/let a
        // export var/const/let a = b
        // function a(){};
        // export function a(){};
        // a = b;
        // a+= b;
        // var/const/let [a, b: a] = b;
        // [a, b: a] = b;
        // var/const/let {a, b: a} = b;
        // ({a, b: a} = b);
        // [b: a] = c;
        // ++a;
        // a++;
        // for (a in b);
        // for ([a] in b);
        // for ({a} in b);
        // In a nutshell there are six concrete areas to look for updates;
        // - [x] binding declarations
        //   - [x] regular
        //   - [x] destructuring
        //   - [ ] exported
        //   - [x] could be inside `for` header
        // - [x] param names
        //   - [x] regular
        //   - [x] patterns
        // - [x] assigning
        //   - [x] regular
        //   - [x] compound
        //   - [x] destructuring array
        //   - [x] destructuring object
        // - [ ] imports of any kind
        // - [x] function declarations
        // - [ ] update expressions, pre or postifx, inc or dec
        // - [ ] for-loop lhs
        writes: [], // {parent, prop, index} indirect reference ot the node being assigned
        reads: [], // {parent, prop, index} indirect reference to the node that refers to this binding
      });
    }
  }
  function createFreshVar(name) {
    ASSERT(createFreshVar.length === arguments.length, 'arg count');
    const tmpName = generateUniqueGlobalName(name);
    registerGlobalIdent(tmpName, tmpName);
    return tmpName;
  }
}
