// If a decl is followed by a ref and has no observable side effects in between then the assignment is the actual decl init.
// This transform attempts to find these cases and promote the assignments likewise.
// This tackles the problem of `let x = undefined; const f = function(){ $(x); }; x = fetch();`, allow x to be a constant.

import {
  ASSERT,
  log,
  group,
  groupEnd,
  vlog,
  vgroup,
  vgroupEnd,
  rule,
  example,
  before,
  source,
  after,
  fmat,
  tmat,
  findBodyOffset,
} from '../utils.mjs';
import * as AST from '../ast.mjs';

export function arrrrrr(fdata) {
  group('\n\n\nChecking for array stuffs');
  //vlog('\nCurrent state\n--------------\n' + fmat(tmat(fdata.tenkoOutput.ast)) + '\n--------------\n');
  const r = _arrrrrr(fdata);
  groupEnd();
  return r;
}
function _arrrrrr(fdata) {
  const ast = fdata.tenkoOutput.ast;

  let updated = processAttempt(fdata);

  log('');
  if (updated) {
    log('Array accesses changed:', updated, '. Restarting from phase1 to fix up read/write registry');
    return 'phase1';
  }
  log('Array accesses changed: 0.');
}

function processAttempt(fdata) {
  // Find arrays which are constants and do not escape and where all member expressions are reads

  let updated = 0;

  fdata.globallyUniqueNamingRegistry.forEach(function (meta, name) {
    if (meta.isBuiltin) return;
    if (meta.isImplicitGlobal) return;
    if (!meta.isConstant) return;
    if (meta.constValueRef.node.type !== 'ArrayExpression') return;

    vgroup('- `' + name + '` is a constant array literal');
    process(meta, name);
    vgroupEnd();
  });

  function process(meta, name) {
    const arrNode = meta.constValueRef.node;

    if (arrNode.elements.some((enode) => enode?.type === 'SpreadElement')) {
      vlog('The array literal had a spread element. Bailing for now.');
      return true;
    }

    let failed = false;

    // Find all reads and confirm that they are member expressions which are reads, not writes
    vlog('Check whether all access is either numeric or a handful of names that do not mutate the array');
    meta.reads.forEach((read, i) => {
      if (failed) return;
      vgroup(
        '- read',
        i,
        ':',
        read.grandNode.type,
        read.grandProp,
        read.grandIndex,
        read.parentNode.type,
        read.parentProp,
        read.parentIndex,
        '<read>',
      );
      if (read.parentNode.type === 'MemberExpression' && read.parentProp === 'object') {
        // This was some kind of property access on the array
        const mem = read.parentNode;
        if (mem.computed) {
          vlog('Dynamic property:', mem.property.type === 'Identifier' ? '`' + mem.property.name + '`' : mem.property.type);
          // As long as we don't call this property we should be fine (since we also assert the array
          // doesn't "escape", we can assert that it should not matter whether non-index properties
          // are accessed as long as they aren't immediately called)
          if (read.grandNode.type === 'CallExpression' && read.grandProp === 'callee') {
            vlog('Calling a dynamic property. Cannot guarantee the sandbox. Bailing');
            failed = true;
          } else if (read.grandNode.type === 'AssignmentExpression' && read.grandProp === 'left') {
            vlog('Assigning to a dynamic property. Array is mutated. Bailing');
            failed = true;
          } else {
            vlog('Accessing a dynamic property should be okay since it is not called');
          }
        } else {
          vlog('Property name: `.' + mem.property.name + '`');
          if (read.grandNode.type === 'CallExpression' && read.grandProp === 'callee') {
            // TODO: allow list for certain methods, like toString or join. Maybe.
            vlog('Calling this method may change the contents of the array. We must bail for now.');
            failed = true;
          } else if (read.grandNode.type === 'AssignmentExpression' && read.grandProp === 'left') {
            // TODO: allow for length under very specific circumstances. Might not be worth it.
            vlog('Assigning to a dynamic property. Array is mutated. Bailing');
            failed = true;
          } else {
            vlog('This was a property access that was not called. Should not be able to mutate the array.');
          }
        }
      } else {
        vlog('This read is not a property access and so we consider the array to escape. We can not trust its contents to be immutable.');
        failed = true;
      }
      vgroupEnd();
    });

    if (failed) {
      vlog(
        'There was at least one read of this array that was either not a property access, or it was a write to a property, or it called a method. The array may be mutated so we must bail.',
      );
      return true;
    }

    vlog('All reads validated. They should all be prop-read accesses. The array should be immutable.');

    meta.reads.forEach((read, i) => {
      vgroup(
        '- read',
        i,
        ':',
        read.grandNode.type,
        read.grandProp,
        read.grandIndex,
        read.parentNode.type,
        read.parentProp,
        read.parentIndex,
        '<read>',
      );

      if (
        read.parentNode.type === 'MemberExpression' &&
        read.parentProp === 'object' &&
        !read.parentNode.computed &&
        read.parentNode.property.name === 'length'
      ) {
        rule('Reading the length of an immutable array can be inlined');
        example('const arr = [1, 2, 3]; $(arr.length);', 'const arr = [1, 2, 3]; $(3);');
        before(read.parentNode, read.blockBody[read.blockIndex]);

        if (read.grandIndex < 0) read.grandNode[read.grandProp] = AST.literal(arrNode.elements.length);
        else read.grandNode[read.grandProp][read.grandIndex] = AST.literal(arrNode.elements.length);

        after(read.parentNode, read.blockBody[read.blockIndex]);
        ++updated;
      }

      vgroupEnd();
    });
  }

  return updated;
}
