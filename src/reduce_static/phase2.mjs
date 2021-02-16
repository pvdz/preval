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

export function phase2(program, fdata, resolve, req) {
  group('\n\n\n##################################\n## phase2  ::  ' + fdata.fname + '\n##################################\n\n\n');

  group('Checking for inlinable constants');
  let inlined = false;
  fdata.globallyUniqueNamingRegistry.forEach((meta, name) => {
    if (meta.isBuiltin) return;

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
          rule('let x = 10; f(x);', 'const x = 10; f(x);', () => varDecl.kind === 'let');
          rule('var x = 10; f(x);', 'const x = 10; f(x);', () => varDecl.kind === 'var');
          before(meta.writes[0].decl.declParent);

          varDecl.kind = 'const';

          after(meta.writes[0].decl.declParent);
        } else {
          log('This var has no init so it cannot be a const. Probably unused, or plain undefined.');
        }
      }
    }

    if (meta.isConstant) {
      ASSERT(meta.writes.length === 1, 'a constant should have one write?', meta.writes);
      const write = meta.writes[0];
      if (!write) {
        log('TODO; uncomment me to figure out what');
        return;
      }
      //log('Write:', write);

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
        return;
      }

      if (!assignee || assignee.name === 'arguments') {
        log('TODO; uncomment me to figure out what');
        return;
      }

      const assigneeMeta = fdata.globallyUniqueNamingRegistry.get(assignee.name);

      if (assignee.type === 'Identifier' && (assigneeMeta.isBuiltin || assigneeMeta.isConstant)) {
        // If the identifier is a constant binding or builtin constant then replace all reads with a clone of it

        rule('Declaring a constant with a constant value should eliminate the binding');
        example('const x = null; f(x);', 'f(null);', () => assigneeMeta.isBuiltin);
        example('const x = f(); const y = x; g(y);', 'const x = f(); g(x);', () => !assigneeMeta.isBuiltin);
        before(write.parentNode);

        // With the new
        group('Attempt to replace the reads of `' + name + '` with reads of `' + assignee.name);
        const clone = AST.cloneSimple(assignee);
        const reads = meta.reads;
        for (let i = 0; i < reads.length; ++i) {
          const { parentNode, parentProp, parentIndex } = reads[i];
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
            before(parentNode);
            if (parentIndex >= 0) parentNode[parentProp][parentIndex] = clone;
            else parentNode[parentProp] = clone;
            after(parentNode);
            inlined = true;
            // Remove the read. This binding is read one fewer times
            reads.splice(i, 1);
            // Add a read to the assignee. It is read one more time instead.
            assigneeMeta.reads.push({ parentNode, parentProp, parentIndex, node: clone });
            // We removed an element from the current loop so retry the current index
            --i;
          }
        }
        log('Binding `' + name + '` has', reads.length, 'reads left after this');
        groupEnd();

        if (reads.length === 0 && write.parentNode.type === 'VariableDeclarator') {
          log('Zero reads left and it was a var decl. Replacing it with an empty statement.');
          ASSERT(write.decl, 'var decls should have the decl parent stuff recorded for this exact reason');
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
        }

        after(';');
      } else if (
        // numbers, null, true, false, strings
        (assignee.type === 'Literal' && (assignee.raw === 'null' || (!(assignee instanceof RegExp) && assignee.value != null))) ||
        // Negative numbers, or numbers with a + before it (noop which we should eliminate anyways... but probably not here).
        // This kind of unary for other constants should be statically resolved (elsewhere), like `-null` is `-0` etc.
        (assignee.type === 'UnaryExpression' &&
          (assignee.operator === '+' || assignee.operator === '-') &&
          assignee.argument.type === 'Literal' &&
          typeof assignee.argument.value === 'number')
      ) {
        // Replace all reads of this name with a clone of the literal, ident, or unary

        rule('Declaring a constant with a literal value should eliminate the binding');
        example('const x = 100; f(x);', 'f(100);');
        before(write.parentNode);

        group('Attempt to replace the reads');
        // With the new
        const clone = AST.cloneSimple(assignee);
        const reads = meta.reads;
        for (let i = 0; i < reads.length; ++i) {
          const { parentNode, parentProp, parentIndex } = reads[i];
          if (parentNode.type === 'ExportSpecifier') {
            log('Skipping export ident');
          } else {
            log('Replacing a read...');
            before(parentNode);
            if (parentIndex >= 0) parentNode[parentProp][parentIndex] = clone;
            else parentNode[parentProp] = clone;
            after(parentNode);
            inlined = true;
            // No need to push a read back in. We don't need to track reads to builtin literals like `null` or `undefined` (I think)
            reads.splice(i, 1);
            --i;
          }
        }
        log('Binding `' + name + '` has', reads.length, 'reads left after this');
        groupEnd();

        if (reads.length === 0 && write.parentNode.type === 'VariableDeclarator') {
          ASSERT(write.decl, 'var decls should have the decl parent stuff recorded for this exact reason');
          // Remove the declaration if it was a var decl because there are no more reads from this and it is a constant
          // Note: the init was a lone literal (that's how we got here) so we should not need to preserve the init
          const { declParent, declProp, declIndex } = write.decl;
          ASSERT(
            (declIndex >= 0 ? declParent[declProp][declIndex] : declParent[declProp]).type === 'VariableDeclaration',
            'if not then indexes changed?',
          );
          ASSERT((declIndex >= 0 ? declParent[declProp][declIndex] : declParent[declProp]).declarations[0].init === assignee);
          if (declIndex >= 0) declParent[declProp][declIndex] = AST.emptyStatement();
          else declParent[declProp] = AST.emptyStatement();

          fdata.globallyUniqueNamingRegistry.delete(name);
        }

        after(';');
      }
    }
  });
  log('End of constant folding. Did we inline anything?', inlined ? 'yes' : 'no');

  const ast = fdata.tenkoOutput.ast;
  log('\nCurrent state\n--------------\n' + fmat(tmat(ast)) + '\n--------------\n');

  groupEnd();
  if (inlined) {
    log('Trying again...');
    groupEnd();
    return phase2(program, fdata, resolve, req);
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

    groupEnd();
  });
  groupEnd();

  log('\nCurrent state\n--------------\n' + fmat(tmat(ast)) + '\n--------------\n');

  groupEnd();
}
