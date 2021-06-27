// Partial object literal property access resolving. Just a first go at it.
// - If we can resolve a property access to an actual value, we should replace the prop access with that value.
// - If we can resolve it to not exist, we should replace it with a prototype if we can

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
import { BUILTIN_FUNC_CALL_NAME } from '../constants.mjs';

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

  new Map(fdata.globallyUniqueNamingRegistry).forEach(function (meta, name) {
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
      vlog('Found object expression at ref', ri, ' assigned to `' + name + '`. Tracing nearest property lookups.');
      verifyAfterObjectAssign(meta, rwOrder, ref, ri, rhs);
    });
  }

  //moet hier alle tests nog voor toevoegen. see you never.

  function verifyAfterObjectAssign(meta, rwOrder, writeRef, ri, objExprNode) {
    // It "failed" if the object escapes or when a property was mutated. Otherwise we can consider the object immutable
    // meaning we can inline properties even as side effects or whatever.
    let failed = false;

    if (ri === rwOrder.length - 1) {
      vlog('This is the last write. The assignment is probably observed by a loop or closure or smth.');
      return;
    }

    const lastMap = new Map(); // Map<scope, ref>

    vlog('verifyAfterObjectAssign(): Checking', rwOrder.length - ri - 1, 'refs, starting at', ri);
    for (let i = ri; i < rwOrder.length; ++i) {
      const ref = rwOrder[i];
      vgroup('- ref', i, ';', ref.action + ':' + ref.kind, ref.pfuncNode.$p.pid, ref.parentNode.type);
      const r = processRef(meta, rwOrder, writeRef, objExprNode, ref, ri);
      vgroupEnd();
      if (r) break;
    }

    function processRef(meta, rwOrder, writeRef, objExprNode, ref, ri) {
      let lastRefArr = lastMap.get(ref.pfuncNode.$p.pid);
      if (!lastRefArr) {
        lastRefArr = [];
        lastMap.set(ref.pfuncNode.$p.pid, lastRefArr);
      }

      if (ref.action === 'write') {
        lastRefArr.push(ref);
        vlog('Updated last write ref for scope', ref.pfuncNode.$p.pid, 'to a write');
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
        vlog(
          'Not a non-computed member expression or the read was not the object; type:',
          readRef.parentNode.type,
          ', computed:',
          readRef.parentNode.computed,
          ', parent prop:',
          readRef.parentProp,
        );
        failed = true; // "escapes"
        return true;
      }
      if (readRef.grandNode.type === 'AssignmentExpression' && readRef.grandProp === 'left') {
        vlog('The member expression was being assigned to. Bailing');
        // x.y = z;
        return true; // "prop mutation"
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

        if (readRef.grandNode.type === 'CallExpression' && readRef.grandProp === 'callee') {
          // This would change `const o = {}; o.toString()` into `objectPrototype.toString()`. This would actually fine in most
          // cases but there are some edge cases where it may still matter and it doesn't feel right to just leave it hanging.
          // We'll convert it to a $dotCall to make sure the context value is preserved

          queue.push({
            pid: +readRef.node.$p.pid,
            func: () => {
              // The only potential problem with this rule is if the global `Object` is somehow replaced with a different
              // value. But I believe that value is read-only in global, anyways. Beyond that, objlits should read from proto.
              rule('An object literal method lookup when the obj has no such prop must read from the prototype');
              example('let obj = {}; let x = obj.toString();', 'let obj = {}; let x = $dotCall(Object.prototype.toString, obj);');
              before(writeRef.blockBody[writeRef.blockIndex]);
              before(readRef.blockBody[readRef.blockIndex]);

              // TODO: go down the $ObjectPrototype route (and prepare this for all primitive builtin constructors that we care about)
              // `const tmpObjectPrototype = Object.prototype`
              const tmpNameProto = createFreshVar('tmpObjectPrototype', fdata);
              const protoVarNode = AST.variableDeclaration(tmpNameProto, AST.memberExpression('Object', 'prototype'), 'const');

              // `const tmpObjectMethod = tmpObjectPrototype.prop`
              ASSERT(!readRef.parentNode.property.computed, 'checked before getting here, right?');
              const tmpNameMethod = createFreshVar('tmpObjectMethod', fdata);
              const methodNode = AST.memberExpression(tmpNameProto, readRef.parentNode.property.name, false);
              const methodVarNode = AST.variableDeclaration(tmpNameMethod, methodNode, 'const');

              // `$dotCall(tmpNameMethod, obj, ...args)`
              const callNode = AST.callExpression(BUILTIN_FUNC_CALL_NAME, [
                AST.identifier(tmpNameMethod),
                readRef.parentNode.object,
                ...readRef.grandNode.arguments,
              ]);

              // One of those cases where the `grandNode` does not suffice and we need the greatgrand but it may still not be the block

              const blockNodeAtIndex = readRef.blockBody[readRef.blockIndex];
              ASSERT(
                (blockNodeAtIndex.type === 'ExpressionStatement' && blockNodeAtIndex.expression === readRef.grandNode) ||
                  (blockNodeAtIndex.type === 'ExpressionStatement' &&
                    blockNodeAtIndex.expression.type === 'AssignmentExpression' &&
                    blockNodeAtIndex.expression.right === readRef.grandNode) ||
                  (blockNodeAtIndex.type === 'VariableDeclaration' && blockNodeAtIndex.declarations[0].init === readRef.grandNode),
                'this ought to be a normalized node so the call must either be child of expr stmt, right of assignment, or init of var',
                blockNodeAtIndex,
              );

              if (blockNodeAtIndex.type === 'VariableDeclaration') {
                blockNodeAtIndex.declarations[0].init = callNode;
              } else if (blockNodeAtIndex.expression === readRef.grandNode) {
                blockNodeAtIndex.expression = callNode;
              } else {
                blockNodeAtIndex.expression.right = callNode;
              }

              readRef.blockBody.splice(readRef.blockIndex, 0, protoVarNode, methodVarNode);

              after(readRef.blockBody[readRef.blockIndex]);
            },
          });
        } else {
          queue.push({
            pid: +readRef.node.$p.pid,
            func: () => {
              // The only potential problem with this rule is if the global `Object` is somehow replaced with a different
              // value. But I believe that value is read-only in global, anyways. Beyond that, objlits should read from proto.
              rule('An object literal prop lookup when the obj has no such prop must read from the prototype');
              example('let obj = {}; let x = obj.x;', 'let obj = {}; let x = Object.prototype.x;');
              before(writeRef.blockBody[writeRef.blockIndex]);
              before(readRef.blockBody[readRef.blockIndex]);

              ASSERT(!readRef.parentNode.property.computed, 'checked before getting here, right?');

              // TODO: go down the $ObjectPrototype route (and prepare this for all primitive builtin constructors that we care about)
              const tmpName = createFreshVar('tmpObjectPrototype', fdata);
              const objNode = AST.variableDeclaration(tmpName, AST.memberExpression('Object', 'prototype'));
              const finalNode = AST.memberExpression(tmpName, readRef.parentNode.property.name, false);
              if (readRef.grandIndex < 0) readRef.grandNode[readRef.grandProp] = finalNode;
              else readRef.grandNode[readRef.grandProp][readRef.grandIndex] = AST.identifier('undefined'); // FIXME: broken?? shouldnt this be finalNode?
              readRef.blockBody.splice(readRef.blockIndex, 0, objNode);

              after(readRef.blockBody[readRef.blockIndex]);
            },
          });
        }
      } else if (pnode.kind !== 'init') {
        // Maybe we can still do something here but for now we're bailing
        vlog('The property `' + propName + '` resolves to a getter or setter. Bailing');

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
      } else if (pnode.method) {
        // TODO: can we do anything here?
        vlog('The property resolves to a method. Bailing.');

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
      } else {
        vlog('The object literal contained a node for `' + propName + '` (pid', pnode.$p.pid, ')');

        if (readRef.grandNode.type === 'CallExpression' && readRef.grandProp === 'callee') {
          // Tricky case. We may be able to find the reference but we may still not be able to improve anything
          // Consider `obj.foo(...)` versus `const tmp = obj.foo; $dotCall(tmp, obj, ...)`. The one line turned into two lines
          // which will hurt certain optimization tricks. And what's the advantage?
          // So for method calls we will only do this if we can resolve to a function that does not use context.
          // For builtins that's an allow list. For constants that's resolved in phase1.

          let newCallee;
          let fail = true;
          if (AST.isPrimitive(pnode.value)) {
            vlog('Since the value leads to a primitive, it must lead to a runtime error. But another rule will take care of that.');
            fail = false;
            newCallee = AST.cloneSimple(pnode.value);
          } else if (pnode.value.type === 'Identifier') {
            const calleeMeta = fdata.globallyUniqueNamingRegistry.get(pnode.value.name);
            if (calleeMeta.isConstant) {
              if (calleeMeta.constValueRef.node.type !== 'FunctionExpression') {
                vlog(
                  'The callee is actually constant `' + pnode.value.name + '` which is not a function (',
                  calleeMeta.constValueRef.node.type,
                  '), probably a runtime error, but bailing nonetheless',
                );
              } else if (!calleeMeta.constValueRef.node.$p.thisAccess) {
                vlog('The callee is actually constant `' + pnode.value.name + '` which is a function that does not access `this`');
                fail = false;
                newCallee = AST.identifier(pnode.value.name);
              } else {
                vlog('The callee is actually constant `' + pnode.value.name + '` which is a function that accesses `this`, bailing');
              }
            } else if (calleeMeta.isBuiltin) {
              switch (pnode.value.name) {
                case 'Function':
                case 'parseInt':
                case 'parseFloat':
                case 'RegExp':
                  vlog('The callee is actually builtin `' + pnode.value.name + '` and it does not use `this`');
                  fail = false;
                  newCallee = AST.identifier(pnode.value.name);
                  break;
                default:
                  vlog('The callee is actually constant `' + pnode.value.name + '` and it does use `this`');
              }
            } else {
              vlog('The callee is actually `' + pnode.value.name + '` and since it is neither a constant nor a builtin, we must bail');
            }
          }

          if (fail) {
            vlog('(bailing)');
            failed = true; // "call may mutate object"
            return true;
          } else {
            rule('A method call that we know does not use the context can call the function directly');
            example('window.parseInt(x)', 'parseInt(x)');
            before(readRef.blockBody[readRef.blockIndex]);

            readRef.grandNode.callee = newCallee;

            after(readRef.blockBody[readRef.blockIndex]);
          }
        } else {
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
  }

  return updated;
}
