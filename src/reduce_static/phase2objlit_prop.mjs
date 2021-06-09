// Partial object literal property access resolving. Just a first go at it.
// If we can resolve a property access to an actual value, we should replace the prop access with that value.

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
import { createFreshVar, mayBindingMutateBetweenRefs } from '../bindings.mjs';

export function objlitPropAccess(fdata) {
  group('\n\n\nChecking for object literals whose props are accessed immediately');
  //vlog('\nCurrent state\n--------------\n' + fmat(tmat(fdata.tenkoOutput.ast)) + '\n--------------\n');
  const r = _objlitPropAccess(fdata);
  groupEnd();
  return r;
}
function _objlitPropAccess(fdata) {
  const ast = fdata.tenkoOutput.ast;

  let queue = [];
  let updated = processAttempt(fdata, queue);

  log('');
  if (updated + queue.length) {
    queue.sort(({ pid: a }, { pid: b }) => (a < b ? 1 : a > b ? -1 : 0));

    vgroup('Unwinding', queue.length, 'callbacks');
    queue.forEach(({ func }) => {
      vlog('-- next');
      func();
    });
    vgroupEnd();

    log('Assignments promoted:', updated + queue.length, '. Restarting from phase1 to fix up read/write registry');
    return 'phase1';
  }
  log('Assignments promoted: 0.');
}

function processAttempt(fdata, queue) {
  let updated = 0;
  const lastMap = new Map(); // Map<scope, ref>

  fdata.globallyUniqueNamingRegistry.forEach(function (meta, name) {
    if (meta.isBuiltin) return;
    if (meta.isImplicitGlobal) return;
    //if (meta.isConstant) return; // Not relevant right now

    vgroup(
      '- `' + name + '`',
      meta.rwOrder.map((ref) => ref.action + ':' + ref.kind),
    );
    process(meta, name);
    vgroupEnd();
  });

  function process(meta, name) {
    const rwOrder = meta.rwOrder;
    const first = rwOrder[0];
    if (first.action !== 'write' || first.kind !== 'var') return;

    // Initially, target cases like `var obj = {a: x}; var prop = obj.a;`
    // Very simple, very straightforward. Prop access without observable side effects between the obj init and the prop access.

    // First step: search for init/assignment of an object literal
    // Second step: for as long as there are no observable side effects between 'em, process each read
    //   For every read that is a property access, try to resolve it immediately, and cut out the property access
    rwOrder.forEach((ref, ri) => {
      vlog('-', ri, ref.action, ref.kind);
      let rhs;
      if (ref.kind === 'var') {
        rhs = ref.parentNode.init;
      } else if (ref.kind === 'assign') {
        rhs = ref.parentNode.right;
      } else {
        vlog('Not a var or assign');
        return;
      }

      if (rhs.type !== 'ObjectExpression') {
        vlog('Assigned value is not an object (', rhs.type, ')');
        return;
      }

      // Ok this was a write that assigned an object literal. Hurray!
      vlog('Found object expression. Tracing nearest property lookups.');
      verifyObject(meta, rwOrder, ref, ri, rhs);
    });
  }

  //moet hier alle tests nog voor toevoegen

  function verifyObject(meta, rwOrder, writeRef, ri, objExprNode) {
    // It "failed" if the object escapes or when a property was mutated. Otherwise we can consider the object immutable
    // meaning we can inline properties even as side effects or whatever.
    let failed = false;

    if (ri === rwOrder.length - 1) {
      vlog('This is the last write. The assignment is probably observed by a loop or closure or smth.');
      return;
    }

    vlog('Checking', rwOrder.length - ri - 1, 'refs, starting at', ri);
    for (let i = ri; i < rwOrder.length; ++i) {
      const ref = rwOrder[i];
      vgroup('- verifyObject:', ref.action + ':' + ref.kind, ref.pfuncNode.$p.pid, ref.parentNode.type);
      const r = process(meta, rwOrder, writeRef, objExprNode, ref, ri);
      vgroupEnd();
      if (r) break;
    }

    function process(meta, rwOrder, writeRef, objExprNode, ref, ri) {
      let lastRefArr = lastMap.get(ref.pfuncNode.$p.pid);
      if (!lastRefArr) {
        lastRefArr = [];
        lastMap.set(ref.pfuncNode.$p.pid, lastRefArr);
      }

      if (ref.action === 'write') {
        lastRefArr.push(ref);
        vlog('Updated last ref for scope', ref.pfuncNode.$p.pid, 'to a write');
        return;
      }

      const readRef = ref;

      ASSERT(readRef.action === 'read');

      let prevWrite = undefined;
      for (let i = lastRefArr.length - 1; i >= 0; --i) {
        const r = lastRefArr[i];
        if (readRef.blockChain.startsWith(r.blockChain)) {
          prevWrite = r;
          break;
        }
      }

      if (!prevWrite) {
        vlog('This read has no previous write in the same scope');
        return;
      }
      if (prevWrite.kind !== 'var' && prevWrite.kind !== 'assign') {
        vlog('Previous write was not a var or assign (so, for-x?)');
        return;
      }
      if (prevWrite.innerLoop !== readRef.innerLoop) {
        vlog('Current read is not in the same loop as last write', readRef.innerLoop, prevWrite.innerLoop);
        return;
      }

      if (!readRef.blockChain.startsWith(prevWrite.blockChain)) {
        vlog('This read can not reach the last write', prevWrite.blockChain, readRef.blockChain);
        return;
      }

      if (readRef.parentNode.type !== 'MemberExpression' || readRef.parentNode.computed || readRef.parentProp !== 'object') {
        // not used as a property. Or we can't safely determine the property. The end.
        // TODO: we could do for literals... how often does that happen?
        vlog('Not a member expression or a computed one', readRef.parentNode.type, readRef.parentNode.computed, readRef.parentProp);
        failed = true; // "escapes"
        return true;
      }
      if (readRef.grandNode.type === 'AssignmentExpression' && readRef.grandProp === 'left') {
        vlog('The member expression was being assigned to. Bailing');
        // x.y = z;
        return true; // "prop mutation"
      }
      if (readRef.grandNode.type === 'CallExpression' && readRef.grandProp === 'callee') {
        // TODO: allow list for certain methods, like toString or join. Maybe.
        vlog('The member expression was the callee of a call. Bailing');
        // x.y();
        // This would transform into what exactly?
        // Even `o = {a: f}; o.a()` to `f()` would be non-trivial since we would need to confirm that `f` does not access `this`.
        // However, we probably still want to go this extra mile since it'll be a common pattern to find in the wild.
        // TODO: This breaks `this` and while it's probably fine in many cases, we do need to confirm them first
        failed = true; // "call may mutate object"
        return true;
      }
      if (readRef.grandNode.type === 'UnaryExpression' && readRef.grandProp === 'argument' && readRef.grandNode.operator === 'delete') {
        vlog('This "property lookup" was actually the argument to `delete`. Must keep this.');
        failed = true;
        return;
      }

      vlog(
        'May be okay. Checking for observable side effects between the write (',
        writeRef.blockIndex,
        ') and this read (',
        readRef.blockIndex,
        ').',
      );
      if (writeRef.innerLoop !== readRef.innerLoop) {
        // TODO: if the loop contained no further writes this would still be okay...
        vlog('The read happened inside a different loop from the write. Bailing just in case.');
        return;
      }
      if (mayBindingMutateBetweenRefs(meta, writeRef, readRef, true)) {
        vlog('There was at least one observable side effect that could have mutated the property on the object, so bailing');
        return;
      }

      vlog('Found a read to an object literal while the object literal could not have been mutated!');

      // We have a write ref and a read ref and they are in the same block and there are no observable side effects in between
      // and the write is an object literal and the read is a property lookup. Game time.

      ASSERT(readRef.node.type === 'Identifier', 'right?', readRef.node);
      const propName = readRef.parentNode.property.name;
      const pnode = objExprNode.properties.find((pnode) => !pnode.computed && pnode.key.name === propName);
      if (!pnode) {
        vlog('Could not find the property... bailing');
        // TODO: can do this when we checked the property can not exist, like through computed prop or whatever
        vlog('The object literal did not have a property `' + propName + '` so it must be undefined?');

        queue.push({
          pid: +readRef.node.$p.pid,
          func: () => {
            // The only potential problem with this rule is if the global `Object` is somehow replaced with a different
            // value. But I believe that value is read-only in global, anyways. Beyond that, objlits should read from proto.
            rule('An object literal prop lookup when the obj has no such prop must read from the prototype');
            example('let obj = {}; let x = obj.x;', 'let obj = {}; let x = Object.prototype.x;');
            before(writeRef.blockBody[writeRef.blockIndex]);
            before(readRef.blockBody[readRef.blockIndex]);

            const tmpName = createFreshVar('tmpObjectPrototype', fdata);
            const objNode = AST.variableDeclaration(tmpName, AST.memberExpression('Object', 'prototype'));
            const finalNode = AST.memberExpression(tmpName, readRef.parentNode.property.name, readRef.parentNode.property.computed);
            if (readRef.grandIndex < 0) readRef.grandNode[readRef.grandProp] = finalNode;
            else readRef.grandNode[readRef.grandProp][readRef.grandIndex] = AST.identifier('undefined');
            readRef.blockBody.splice(readRef.blockIndex, 0, objNode);

            after(readRef.blockBody[readRef.blockIndex]);
          },
        });
      } else if (pnode.kind !== 'init') {
        // Maybe we can still do something here but for now we're bailing
        vlog('The property `' + propName + '` resolves to a getter or setter. Bailing');
      } else if (pnode.method) {
        // TODO: can we do anything here?
        vlog('The property resolves to a method. Bailing.');
      } else {
        vlog('The object literal contained a node for `' + propName + '` (pid', pnode.$p.pid, ')');

        rule('An object literal whose property is looked up immediately can resolve the lookup immediately');
        before(writeRef.blockBody[writeRef.blockIndex]);
        before(readRef.blockBody[readRef.blockIndex]);

        // The readRef.parentNode was a member expression. It should be replaced into `undefined`.
        if (readRef.grandIndex < 0) readRef.grandNode[readRef.grandProp] = AST.cloneSimple(pnode.value);
        // This will crash for complex nodes ;(
        else readRef.grandNode[readRef.grandProp][readRef.grandIndex] = AST.cloneSimple(pnode.value); // This will crash for complex nodes ;(

        after(readRef.blockBody[readRef.blockIndex]);
      }
    }
  }

  return updated;
}
