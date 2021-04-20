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
  const toEliminate = []; // Array<write>
  let inlined = 0;
  let inlinedSomething = 0;
  let inlineLoops = 0;
  do {
    inlined = 0;

    group('Iteration', ++inlineLoops, 'of constant inlining');
    // Note: This step may rename bindings, eliminate them (queued), introduce new ones.
    //       Take care to preserve body[index] ordering. Don't add/remove elements to any body array.
    //       Preserve the parent of any identifier as detaching them may affect future steps.
    //       If any such parent/ancestor is to be removed, put it in the toEliminate queue.
    fdata.globallyUniqueNamingRegistry.forEach(function (meta, name) {
      if (meta.isBuiltin) return;
      if (meta.isImplicitGlobal) return;
      vgroup('-- name:', name, ', writes:', meta.writes.length, ', reads:', meta.reads.length);

      if (!name.startsWith(ALIAS_PREFIX)) {
        if (meta.writes.length === 1 && meta.writes[0].kind === 'var' && !meta.isConstant) {
          vlog('Binding `' + name + '` has one write so should be considered a constant, even if it wasnt');
          meta.isConstant = true;
          const varDecl = meta.constValueRef.containerNode;

          rule('A binding decl where the binding has one write must be a const');
          example('let x = 10; f(x);', 'const x = 10; f(x);');
          before(varDecl);

          varDecl.kind = 'const';

          after(varDecl);
        }

        // Attempt to fold up constants
        if (meta.isConstant) {
          ASSERT(meta.uniqueName === name);
          if (attemptConstantInlining(meta, fdata)) {
            vgroupEnd();
            ++inlined;
            ++inlinedSomething;
            return;
          }
        }
      }

      if (meta.reads.length === 0 && meta.writes[0].kind === 'var') {
        ASSERT(meta.writes.length);
        vgroup('Binding `' + name + '` only has writes, zero reads and could be eliminated.');
        // For now, only eliminate actual var decls and assigns. Catch clause is possible. Can't change params for now.
        // If any writes are eliminated this way, drop them from the books and queue them up

        // If the decl is used in a for-x or catch binding (or?) then we must keep the binding decl (should only be one).
        const keepDecl = meta.writes.some((write) => write.kind !== 'var' && write.kind !== 'assign');

        rule('[1/2] Write-only bindings should be eliminated');
        example('let a = f(); a = g();', 'f(); g();');

        for (let i = 0; i < meta.writes.length; ++i) {
          vlog('-');
          const write = meta.writes[i];
          if (write.kind === 'assign' || (write.kind === 'var' && !keepDecl)) {
            // Replace the var decl with its init or assignment with its rhs
            if (write.kind === 'assign') {
              vlog('Assignment queued for actual deletion (ast was not changed yet, scroll down)');
            } else {
              vlog('Var decl queued for actual deletion (ast was not changed yet, scroll down)');
            }
            source(write.blockBody[write.blockIndex]);

            toEliminate.push(write);
            meta.writes.splice(i, 1);

            ++inlined;
            ++inlinedSomething;
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
    log('End of iteration', inlineLoops, 'of constant inlining. Did we inline anything?', inlined ? 'yes; ' + inlined : 'no');

    //vlog('\nCurrent state before removal of queued constants\n--------------\n' + fmat(tmat(fdata.tenkoOutput.ast)) + '\n--------------\n');

    groupEnd();
    if (inlined) {
      log('Queued some constants to fold. Their writes were removed. Trying loop again...\n\n');
    }
  } while (inlined);

  // All read node meta data (parent etc) are invalidated if the next bit eliminates anything.
  vlog('toEliminate:', toEliminate.length);
  if (toEliminate.length) {
    group('Actually eliminate', toEliminate.length, 'var decls and assignments that were rendered redundant');
    toEliminate.forEach((write) => {
      rule('[2/2] Write-only writes should be eliminated');
      example('const x = 5;', ';', () => write.kind === 'var');
      example('x = 5;', ';', () => write.kind === 'assign');
      before(write.blockBody[write.blockIndex]);

      if (write.kind === 'var') {
        const init = write.parentNode.init;
        // There are a few values that can have no relevant side effects and we outright drop
        if (nodeToDrop(init)) {
          vlog('Dropping the init too because it is not complex, a function, a param, `this`, or `arguments.length`');
          write.blockBody[write.blockIndex] = AST.emptyStatement();
        } else {
          write.blockBody[write.blockIndex] = AST.expressionStatement(init);
        }
      } else if (write.kind === 'assign') {
        const rhs = write.parentNode.right;
        // There are a few values that can have no relevant side effects and we outright drop
        if (nodeToDrop(rhs)) {
          vlog('Dropping the rhs too because it is not complex, a function, a param, `this`, or `arguments.length`');
          write.blockBody[write.blockIndex] = AST.emptyStatement();
        } else {
          write.blockBody[write.blockIndex] = AST.expressionStatement(rhs);
        }
      } else {
        ASSERT(false, 'support me?');
      }

      after(write.blockBody[write.blockIndex]);
    });
    groupEnd();
    // The read/write data is unreliable from here on out and requires a new phase1 step!
  }
  if (inlinedSomething || toEliminate.length) {
    log('Constants folded:', inlinedSomething, '. Restarting from phase1 to fix up read/write registry');
    return 'phase1';
  }
  log('Constants folded:', inlinedSomething, '.');
}

function attemptConstantInlining(meta, fdata) {
  ASSERT(meta.isConstant);

  if (meta.writes.length !== 1) {
    // This can happen and the non-decl writes should lead to a runtime error
    // We should postpone inlining this constant until it indeed has one write left
    vlog('Skipping because there are multiple writes to this constant so those need to be eliminated first');
    return;
  }

  const write = meta.writes[0];
  ASSERT(write, 'figure out whats wrong if this breaks');

  // Figure out the assigned value. This depends on the position of the identifier (var decl, param, assign).
  // Note: any binding can be isConstant here. It is not determined by `const`, but by the number of writes.
  let rhs;
  if (write.kind === 'var') {
    rhs = write.parentNode.init;
    if (rhs.type === 'Param') {
      vlog('Ignore param aliases');
      return;
    }
  } else if (write.parentNode.type === 'AssignmentExpression') {
    // Must be a regular assignment
    rhs = write.parentNode.right;
    ASSERT(rhs && rhs.type !== 'Param', 'param nodes should only be used in the func header in var decls');
  } else {
    // Tough luck. Until we support parameters and all that.
    vlog('Skipping for/catch write');
    return;
  }

  ASSERT(rhs);
  if (rhs.type === 'Identifier') {
    if (rhs.name === 'arguments') {
      vlog('TODO; uncomment me to figure out what to do with `arguments`');
      return;
    }

    const assigneeMeta = fdata.globallyUniqueNamingRegistry.get(rhs.name);

    if (!assigneeMeta.isBuiltin && !assigneeMeta.isConstant) {
      vlog('Rhs is not a builtin or constant, bailing');
      return;
    }

    // `const x = undefined;` but rhs is and ident, NOT a literal
    // - eliminate the decl (this will get queued)
    // - replace all reads with a clone of this ident
    // - deregister the name

    vgroup('Attempt to replace the', meta.reads.length, 'reads of `' + meta.uniqueName + '` with reads of `' + rhs.name);

    let first = true; // Defer printing the rule until the first actual replacement. It may do nothing.

    const wip = +write.node.$p.pid;

    // With the new
    const reads = meta.reads;
    let inlined = false;
    for (let i = 0; i < reads.length; ++i) {
      // Note: this parent may not be part of the AST anymore (!) (ex. if a var decl with complex init was eliminated)
      const oldRead = reads[i];
      const { parentNode, parentProp, parentIndex, grandNode, grandProp, grandIndex } = oldRead;
      const blockNode = oldRead.blockBody[oldRead.blockIndex];

      if (blockNode.type === 'ExportNamedDeclaration') {
        vlog('Skipping export ident');
      } else if (+oldRead.node.$p.pid < wip && oldRead.scope === write.scope) {
        // We have eliminated the only case that breaks this (`default` case in a switch that is not the last case)
        // So as long as the read is in the same scope of the decl, any read that occurs before the decl is a TDZ.
        vlog('This read occurred before the var decl and is in the same scope. This must lead to a runtime TDZ if invoked so do not inline it.');
      } else {

        if (first) {
          rule('Declaring a constant with a constant value should eliminate the binding');
          example('const x = NaN; f(x);', 'f(NaN);', () => assigneeMeta.isBuiltin);
          example('const x = f(); const y = x; g(y);', 'const x = f(); g(x);', () => !assigneeMeta.isBuiltin);
          before(write.parentNode);
          first = false;
        }

        vlog(
          'Replacing a read of `' +
            meta.uniqueName +
            '` with a read from `' +
            rhs.name +
            '` (on prop `' +
            parentNode.type +
            '.' +
            parentProp +
            (parentIndex >= 0 ? '[' + parentIndex + ']' : '') +
            ')' +
            '`...',
        );

        const clone = AST.cloneSimple(rhs);
        before(parentNode, blockNode);
        if (parentIndex >= 0) parentNode[parentProp][parentIndex] = clone;
        else parentNode[parentProp] = clone;
        after(parentNode, blockNode);

        inlined = true;
        // Remove the read. This binding is read one fewer times
        reads.splice(i, 1);
        // Add a read to the rhs. It is read one more time instead.
        assigneeMeta.reads.push(
          createReadRef({
            kind: oldRead.kind,
            parentNode,
            parentProp,
            parentIndex,
            grandNode,
            grandProp,
            grandIndex,
            blockBody: oldRead.blockBody,
            blockIndex: oldRead.blockIndex,
            pfuncNode: oldRead.pfuncNode,
            node: clone,
            rwCounter: oldRead.rwCounter,
            scope: oldRead.scope,
            blockChain: oldRead.blockChain,
            blockIds: oldRead.blockIds,
            blockIndexes: oldRead.blockIndexes,
            blockBodies: oldRead.blockBodies,
            ifChain: oldRead.ifChain,
            innerLoop: oldRead.innerLoop,
          }),
        );
        // We removed an element from the current loop so retry the current index
        --i;
      }
    }
    vlog('Binding `' + meta.uniqueName + '` has', reads.length, 'reads left after this');

    if (reads.length === 0 && write.kind === 'var') {
      vlog('Zero reads left and it was a const var decl. Replacing it with an empty statement.');
      rule('Constant binding with zero reads should be eliminated [1]');
      // Remove the declaration if it was a var decl because there are no more reads from this and it is a constant
      // Note: the init was a lone identifier (that's how we got here) so we should not need to preserve the init
      // Any reads of the init would only have their blockBody[blockIndex] value no longer correspond. Only relevant for this file.

      before(write.blockBody[write.blockIndex]);
      write.blockBody[write.blockIndex] = AST.emptyStatement();
      after(write.blockBody[write.blockIndex]);

      // TODO: shouldnt we set this to `false` instead. Make sure the name is not taken again, potentially busting the clone cache or something
      fdata.globallyUniqueNamingRegistry.delete(meta.uniqueName);

      inlined = true;
    }

    vgroupEnd();
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
      (rhs.operator === '-' || rhs.operator === '+') && // + shouldn't appear here after normalization but okay
      rhs.argument.type === 'Literal' &&
      typeof rhs.argument.value === 'number')
  ) {
    // `const x = 5;`
    // Replace all reads of this name with a clone of the literal, ident, or unary

    let first = true;

    vgroup('Attempt to replace the', meta.reads.length, 'reads with the literal');
    // With the new
    const reads = meta.reads;
    let inlined = false;
    for (let i = 0; i < reads.length; ++i) {
      const read = reads[i];
      const { parentNode, parentProp, parentIndex } = read;
      if (parentNode.type === 'ExportSpecifier') {
        vlog('Not inlining export');
      } else {
        if (first) {
          rule('Const binding with literal value should replace all reads of that name with the value');
          example('const x = 100; f(x);', 'f(100);');
          before(write.parentNode); // This is the constant decl of the reads here
          first = false;
        }

        before(parentNode, read.blockBody[read.blockIndex]);
        if (parentIndex >= 0) parentNode[parentProp][parentIndex] = AST.cloneSimple(rhs);
        else parentNode[parentProp] = AST.cloneSimple(rhs);
        after(parentNode, read.blockBody[read.blockIndex]);

        inlined = true;
        // No need to push a read back in. We don't need to track reads to builtin literals like `null` or `undefined` (I think)
        reads.splice(i, 1);
        --i;
      }
    }

    vlog('Binding `' + meta.uniqueName + '` has', reads.length, 'reads left after this');

    if (reads.length === 0 && write.kind === 'var') {
      vlog('Zero reads left and it was a const var decl. Replacing it with an empty statement.');
      rule('Constant binding with zero reads should be eliminated [2]');
      // Remove the declaration if it was a var decl because there are no more reads from this and it is a constant
      // Note: the init was a lone identifier (that's how we got here) so we should not need to preserve the init
      // Any reads of the init would only have their blockBody[blockIndex] value no longer correspond. Only relevant for this file.

      before(write.blockBody[write.blockIndex]);
      write.blockBody[write.blockIndex] = AST.emptyStatement();
      after(write.blockBody[write.blockIndex]);

      // TODO: shouldnt we set this to `false` instead. Make sure the name is not taken again, potentially busting the clone cache or something
      fdata.globallyUniqueNamingRegistry.delete(meta.uniqueName);

      inlined = true;
    }

    after(';');
    vgroupEnd();
    return inlined;
  }
}

function nodeToDrop(init) {
  if (init.type === 'Identifier') {
    // Can't just drop idents because it may hide implicit global access, or out of scope access, or TDZ errors.
    // This check can be improved but I think another rule will clean up leftovers anyways.
    return ['undefined', 'NaN', 'Infinity'].includes(init.name);
  }
  return (
    init.type === 'FunctionExpression' ||
    init.type === 'Param' ||
    init.type === 'ThisExpression' ||
    !AST.isComplexNode(init) ||
    (init.type === 'MemberExpression' &&
      init.object.type === 'Identifier' &&
      init.object.name === 'arguments' &&
      !init.object.computed &&
      init.property.name === 'length')
  );
}
