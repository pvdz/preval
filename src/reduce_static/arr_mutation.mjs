// Look for array literals whose methods get called immediately and try to resolve them if we can guarantee state
// `const arr = [1, 2, 3]; arr.push(4); f(arr.shift()); f(arr)`
// -> `const arr = [2, 3, 4]; f(1); f(arr)`

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
  coerce,
  findBodyOffset,
} from '../utils.mjs';
import * as AST from '../ast.mjs';
import { mayBindingMutateBetweenRefs } from '../bindings.mjs';

export function arr_mutation(fdata) {
  group('\n\n\nChecking for array mutations to inline');
  //vlog('\nCurrent state\n--------------\n' + fmat(tmat(fdata.tenkoOutput.ast)) + '\n--------------\n');
  const r = _arr_mutation(fdata);
  groupEnd();
  return r;
}
function _arr_mutation(fdata) {
  const queue = [];

  let updated = processAttempt(fdata, queue);

  if (queue.length) {
    // By index, high to low. This way it should not be possible to cause reference problems by changing index
    queue.sort(({ index: a }, { index: b }) => (a < b ? 1 : a > b ? -1 : 0));
    queue.forEach(({ index, func }) => func());
  }

  log('');
  if (updated) {
    log('Array accesses changed:', updated, '. Restarting from phase1 to fix up read/write registry');
    return 'phase1';
  }
  log('Array accesses changed: 0.');
}

function processAttempt(fdata, queue) {
  // Find arrays where the first read is a method call
  // TODO: Find arrays that call methods before any other potential mutation happens to them (ie. reading index prop is fine, escaping is not)

  let updated = 0;

  fdata.globallyUniqueNamingRegistry.forEach(function (meta, name) {
    if (meta.isBuiltin) return;
    if (meta.isImplicitGlobal) return;
    //if (!meta.isConstant) return;
    if (meta.constValueRef.node.type !== 'ArrayExpression') return;
    if (!meta.reads.length) return; // I mean, why. But ok.
    if (meta.writes.length !== 1) return; // :shrug:

    vgroup('- `' + name + '` is a constant array literal');
    process(meta, name, queue);
    vgroupEnd();
  });

  function process(meta, name, queue) {
    // Find the first read after the decl
    // Determine whether it is a method call
    // Determine whether it is calling a supported builtin
    // If possible, apply mutation to the constant and eliminate it

    ASSERT(meta.rwOrder.length >= 2, 'there should be a read and a write here');

    const write = meta.writes[0];
    const read = meta.rwOrder[meta.rwOrder.indexOf(write) + 1];

    if (!read) {
      vlog('- There was no read after the write, bailing');
      return;
    }

    if (!meta.singleScoped && (write.blockBody !== read.blockBody || write.blockIndex !== read.blockIndex - 1)) {
      vlog(
        '- The binding is not single scoped and the read does not immediately follow the write, bailing for now',
        write.blockBody !== read.blockBody,
        write.blockIndex,
        read.blockIndex,
      );
      return;
    }


    if (write.action !== 'write' || write.kind !== 'var') {
      // I don't think this is possible for single scoped bindings in normalized code. But here we are.
      vlog('- The first ref was not the var, bailing', write.action);
      return;
    }
    if (read.action !== 'read') {
      vlog('- The second ref was not a read, bailing');
      return;
    }

    // Need to verify that there is no loop boundary between the decl and the read
    // (It's fine if both are in the same loop, but otherwise certain invariants don't hold)

    if (write.innerLoop !== read.innerLoop) {
      vlog('- The decl was not in the same loop as the read, bailing');
      return;
    }

    // Now need to verify that the read is a member call

    if (read.parentNode.type !== 'MemberExpression' || read.parentProp !== 'object') {
      vlog('- The read was not the object of a member expression, bailing');
      return;
    }

    if (read.parentNode.computed) {
      vlog('- The member expression was computed, bailing');

      if (AST.isNumber(read.parentNode.property)) {
        if (read.grandNode.type === 'AssignmentExpression' && read.grandProp === 'left') {
          // This is `arr[x] = y`
          const n = AST.getPrimitiveValue(read.parentNode.property);
          const arrNode = write.parentNode.init;
          if (n === arrNode.elements.length) {
            vlog('- Assigning to the next index of an array. We can inline that...');

            rule('An assignment to the next index of an array can be inlined');
            example('const x = []; x[0] = 1;', 'const x = [1];');
            before(arrNode);
            before(read.blockBody[read.blockIndex]);

            arrNode.elements.push(read.grandNode.right);
            read.blockBody[read.blockIndex] = AST.emptyStatement();

            after(arrNode);
            updated = true;
            return;
          }
        }
      }

      return;
    }

    if (read.grandNode.type !== 'CallExpression' || read.grandProp !== 'callee') {
      vlog(' - The read was not the callee of a call, bailing');
      return;
    }

    const methodName = read.parentNode.property.name;
    if (!['push', 'pop', 'shift', 'unshift'].includes(methodName)) {
      vlog('- Method name not in the allow list currently, bailing;', methodName);
      return;
    }

    // Okay, this is a call of an array of a supported method
    // I think we're good now?

    switch (methodName) {
      case 'shift': {
        rule('Calling .shift on an array literal we can fully track can be resolved');
        example('const arr = [1, 2, 3]; f(arr.shift()); f(arr);', 'const arr = [2, 3]; f(1); f(arr);');
        before(write.blockBody[write.blockIndex]);
        before(read.blockBody[read.blockIndex]);

        // TODO: verify that it's still accessible? not 100% if that's a concern at all.

        const arrNode = write.parentNode.init;
        // TODO: empty array case
        const firstElementNode = arrNode.elements.shift();
        // Replace the original call with this node
        // This is a little annoying since the grand* stuff won't suffice as we need the greatGrandNode stuff.
        // Instead we'll do some manual poking from the blockBody[blockIndex].
        // In normalized code it can only be one of three cases

        const stmt = read.blockBody[read.blockIndex];
        if (stmt.type === 'VariableDeclaration') {
          stmt.declarations[0].init = firstElementNode;
        } else if (stmt.type === 'ExpressionStatement') {
          if (stmt.expression === read.grandNode) {
            stmt.expression = firstElementNode;
          } else if (stmt.expression.type === 'AssignmentExpression' && stmt.expression.right === read.grandNode) {
            stmt.expression.right = firstElementNode;
          } else {
            ASSERT(false);
          }
        } else {
          ASSERT(false);
        }

        after(write.blockBody[write.blockIndex]);
        after(read.blockBody[read.blockIndex]);
        updated = true;
        break;
      }
      case 'pop': {
        rule('Calling .pop on an array literal we can fully track can be resolved');
        example('const arr = [1, 2, 3]; f(arr.pop()); f(arr);', 'const arr = [1, 2]; f(3); f(arr);');
        before(write.blockBody[write.blockIndex]);
        before(read.blockBody[read.blockIndex]);

        // TODO: verify that it's still accessible? not 100% if that's a concern at all.

        const arrNode = write.parentNode.init;
        // TODO: empty array case
        const firstElementNode = arrNode.elements.pop();
        // Replace the original call with this node
        // This is a little annoying since the grand* stuff won't suffice as we need the greatGrandNode stuff.
        // Instead we'll do some manual poking from the blockBody[blockIndex].
        // In normalized code it can only be one of three cases

        const stmt = read.blockBody[read.blockIndex];
        if (stmt.type === 'VariableDeclaration') {
          stmt.declarations[0].init = firstElementNode;
        } else if (stmt.type === 'ExpressionStatement') {
          if (stmt.expression === read.grandNode) {
            stmt.expression = firstElementNode;
          } else if (stmt.expression.type === 'AssignmentExpression' && stmt.expression.right === read.grandNode) {
            stmt.expression.right = firstElementNode;
          } else {
            ASSERT(false);
          }
        } else {
          ASSERT(false);
        }

        after(write.blockBody[write.blockIndex]);
        after(read.blockBody[read.blockIndex]);
        updated = true;
        break;
      }
      case 'push': {
        rule('Calling .push on an array literal we can fully track can be resolved');
        example('const arr = [1, 2, 3]; arr.push(4); f(arr);', 'const arr = [1, 2, 3, 4]; f(arr);');
        before(write.blockBody[write.blockIndex]);
        before(read.blockBody[read.blockIndex]);

        // TODO: verify that it's still accessible? not 100% if that's a concern at all.

        const arrNode = write.parentNode.init;
        const addedElements = read.grandNode.arguments;
        // TODO: can the arg be reached in the array expr context? (`const arr=  []; { let x = 1; arr.push(x) }`)
        ASSERT(
          addedElements.every((anode) => AST.isPrimitive(anode)),
          'fixme >:)',
        );

        // Eliminate original push call. Move original args into the array, append at the end
        // This is a little annoying since the grand* stuff won't suffice as we need the greatGrandNode stuff.
        // Instead we'll do some manual poking from the blockBody[blockIndex].
        // In normalized code it can only be one of three cases

        arrNode.elements.push(...addedElements);
        read.blockBody[read.blockIndex] = AST.emptyStatement();

        after(write.blockBody[write.blockIndex]);
        after(read.blockBody[read.blockIndex]);
        updated = true;
        break;
      }
      case 'unshift': {
        rule('Calling .unshift on an array literal we can fully track can be resolved');
        example('const arr = [1, 2, 3]; arr.unshift(4); f(arr);', 'const arr = [4, 1, 2, 3]; f(arr);');
        before(write.blockBody[write.blockIndex]);
        before(read.blockBody[read.blockIndex]);

        // TODO: verify that it's still accessible? not 100% if that's a concern at all.

        const arrNode = write.parentNode.init;
        const addedElements = read.grandNode.arguments;
        // TODO: can the arg be reached in the array expr context? (`const arr=  []; { let x = 1; arr.push(x) }`)
        ASSERT(
          addedElements.every((anode) => AST.isPrimitive(anode)),
          'fixme >:)',
        );

        // Eliminate original push call. Move original args into the array, append at the end
        // This is a little annoying since the grand* stuff won't suffice as we need the greatGrandNode stuff.
        // Instead we'll do some manual poking from the blockBody[blockIndex].
        // In normalized code it can only be one of three cases

        arrNode.elements.unshift(...addedElements);
        read.blockBody[read.blockIndex] = AST.emptyStatement();

        after(write.blockBody[write.blockIndex]);
        after(read.blockBody[read.blockIndex]);
        updated = true;
        break;
      }
      default: {
      }
    }
  }

  return updated;
}
