import { ALIAS_PREFIX } from '../constants.mjs';
import { ASSERT, log, group, groupEnd, vlog, vgroup, vgroupEnd, tmat, fmat, rule, example, before, source, after } from '../utils.mjs';
import * as AST from '../ast.mjs';
import { createReadRef } from '../bindings.mjs';

export function inlineConstants(fdata) {
  group('\n\n\nInlining constants with primitive values\n');
  const r = _inlineConstants(fdata);
  groupEnd();
  return r;
}
function _inlineConstants(fdata) {
  const toEliminate = [];
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
      vgroup('-- name:', name, ', writes:', meta.writes.length, ', reads:', meta.reads.length);

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
              meta.constValueRef = {
                node: varDecl.declarations[0].init,
                containerNode: varDecl,
                containerProp: 'declarations',
                containerIndex: 0,
              };

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
            vgroupEnd();
            inlined = true;
            return;
          }
        }
      }

      if (meta.reads.length === 0 && meta.writes[0].decl) {
        ASSERT(meta.writes.length);
        vgroup('Binding `' + name + '` only has writes, zero reads and could be eliminated.');
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

        vgroupEnd();

        if (inlined) {
          vgroupEnd();
          return;
        }
      }

      vgroupEnd();
    });
    log('End of iteration', inlineLoops, ' of constant inlining. Did we inline anything?', inlined ? 'yes' : 'no');

    vlog('\nCurrent state\n--------------\n' + fmat(tmat(fdata.tenkoOutput.ast)) + '\n--------------\n');

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
          vlog('Dropping the init because it is `this`, `arguments`, or `arguments.length`');
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
    return 'phase1';
  }
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
