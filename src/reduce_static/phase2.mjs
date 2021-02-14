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

      if (!assignee) {
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
      } else if (assignee.type === 'Literal' && (assignee.raw === 'null' || (!(assignee instanceof RegExp) && assignee.value != null))) {
        // Replace all reads of this name with a clone of the literal

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
          ASSERT((declIndex >= 0 ? declParent[declProp][declIndex] : declParent[declProp]).declarations[0].init.type === 'Literal');
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

  walk(
    (node, before, nodeType, path) => {
      switch (nodeType + ':' + (before ? 'before' : 'after')) {
      }
    },
    fdata.tenkoOutput.ast,
    'ast',
  );

  return false;
}
