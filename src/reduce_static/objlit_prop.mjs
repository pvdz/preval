// Partial object literal property access resolving. Just a first go at it.
// - If we can resolve a property access to an actual value, we should replace the prop access with that value.
// - If we can resolve it to not exist, we should replace it with a prototype if we can
// - If we can resolve writes then we should update the associated object literal

import { ASSERT, log, group, groupEnd, vlog, vgroup, vgroupEnd, rule, example, before, source, after, fmat, tmat, findBodyOffset, } from '../utils.mjs';
import * as AST from '../ast.mjs';
import { createFreshVar, mayBindingMutateBetweenRefs } from '../bindings.mjs';
import { SYMBOL_DOTCALL } from '../symbols_preval.mjs';
import { symbo } from '../symbols_builtins.mjs';

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
    return {what: 'objlitPropAccess', changes: updated + queue.length, next: 'phase1'};
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

      if (rhs.properties.some(pnode => pnode.computed)) {
        vlog('Objlit had computed properties; bailing');
        return;
      }

      // Ok this was a write that assigned an object literal. Hurray!
      vlog('Found object expression at ref', ri, ' assigned to `' + name + '`. Tracing nearest property lookups.');
      verifyAfterObjectAssign(meta, rwOrder, ref, ri, rhs);
    });
  }

  //moet hier alle tests nog voor toevoegen. see you never.

  function verifyAfterObjectAssign(meta, rwOrder, writeRef, wi, objExprNode) {
    if (wi === rwOrder.length - 1) {
      vlog('This is the last write. The assignment is probably observed by a loop or closure or smth.');
      return;
    }

    const lastMap = new Map(); // Map<scope, ref>

    const singleWriteSafe = meta.writes.length === 1 && !meta.reads.some(read => {
      if (read.parentNode.type !== 'MemberExpression' || read.parentNode.computed || read.parentProp !== 'object') {
        vlog('note: at least one read escaped as it was not a member. singleWriteSafe=false');
        return true;
      }

      if (read.grandNode.type === 'AssignmentExpression' && read.grandProp === 'left') {
        // x.y = z;
        vlog('note: at least one member expression was being assigned to. singleWriteSafe=false');
        return true;
      }

      if (read.grandNode.type === 'CallExpression' && read.grandProp === 'callee') {
        // `x.foo();` (may refer to `this` and mutate object)
        vlog('note: at least one member expression was called. singleWriteSafe=false');
        return true;
      }

      if (read.parentNode.type === 'UnaryExpression' && read.parentNode.op === 'delete') {
        // delete x.y;
        vlog('note: at least one member expression was a property delete. singleWriteSafe=false');
        return true;
      }
    });

    if (singleWriteSafe) {
      vlog('Single write and all reads do not escape, process any read that can reach the write');

      // All reads should be safe to resolve now
      meta.reads.forEach(read => {
        // Only okay for the reads that can reach the write
        if (!read.reachesWrites.size) {
          return vlog('bail: read could not reach write');
        }

        return haveRef(objExprNode, writeRef, read);
      });
    } else {
      vlog('verifyAfterObjectAssign(): Checking', rwOrder.length - wi - 1, 'refs, starting at', wi);
      for (let ri = wi; ri < rwOrder.length; ++ri) {
        const ref = rwOrder[ri];
        vgroup('- ref', ri, ';', ref.action + ':' + ref.kind + ':' + ref.isPropWrite, ref.pfuncNode.$p.pid, ref.parentNode.type);
        const r = processRef(meta, rwOrder, writeRef, objExprNode, ref, wi, ri);
        vgroupEnd();
        if (r) break;
      }
    }

    function processRef(meta, rwOrder, writeRef, objExprNode, ref, wi, ri) {
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
      if (readRef.innerLoop !== prevWrite.innerLoop) {
        // Refs in the header of a loop are considered to be inside that loop so must check this separately
        return vlog('- read/write not in same loop', readRef.innerLoop, prevWrite.innerLoop);
      }
      if (readRef.innerCatch !== prevWrite.innerCatch) {
        // Can't guarantee the write if one ref is inside a catch while the other is not
        return vlog('- read/write not in same catch', readRef.innerCatch, prevWrite.innerCatch);
      }

      if (readRef.parentNode.type === 'UnaryExpression' && readRef.parentNode.op === 'delete') {
        // delete x.y;
        vlog('The member expression was a property delete. Bailing');
        return;
      }


      if (readRef.grandNode.type === 'CallExpression' && readRef.grandProp === 'callee') {
        // `x.foo();` (may refer to `this` and mutate object)
        vlog('At least one member expression was called. Bailing');
        return true;
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
        return true;
      }

      if (readRef.grandNode.type === 'AssignmentExpression' && readRef.grandProp === 'left') {
        // This is property assignment, We can work with some cases.

        if (
          readRef.blockChain === prevWrite.blockChain && // Must be same block because else `if (x) { } else { x = { f: 20 } } x.f = 10;` goes bad
          ri - wi === 1 && // Only back to back (yeah we gotta, for now)
          meta.singleScoped &&
          prevWrite.scope === readRef.scope &&
          prevWrite.innerIf === readRef.innerIf &&
          prevWrite.innerElse === readRef.innerElse &&
          prevWrite.innerLoop === readRef.innerLoop &&
          prevWrite.innerCatch === readRef.innerCatch
        ) {
          // Both references are in the same function scope, same loop scope, and catch scope
          // The binding only appears in one scope so closures can't access it.
          // The write and read are back to back and the read is in the same-or-a-child-of block scope as the write

          log('The assignment to this prop comes after assigning the object so we should be able to inline it');

          const prop = readRef.parentNode.property;
          ASSERT(prop.type === 'Identifier', 'not computed so property node must be an identifier?');
          const propName = prop.name;

          if (!AST.isPrimitive(readRef.grandNode.right)) {
            //if (
            //  readRef.grandNode.right.type === 'Identifier' &&
            //  fdata.globallyUniqueNamingRegistry.get(readRef.grandNode.right.name).isConstant &&
            //  fdata.globallyUniqueNamingRegistry.get(readRef.grandNode.right.name).rwOrder.find(ref => ref.node === readRef.grandNode.right).reachesWrites.size === 1
            //) {
            //  log('Assigned an ident to prop (' + readRef.grandNode.right.name + ') which is a constant and whose write is reachable from the assignment');
            //}
            //else {
              // TODO: if we can prove that the binding is not TDZ'd _at the point of the object_ then we can use it
              log('Found prop, is not assigned a primitive, bailing');
              return true; // Move to next write
            //}
          }

          // TODO: what does `{["x"]: 5, x: 6}` do? should we bail if object has any computed props?
          const propNode = objExprNode.properties.find((pnode) => !pnode.computed && pnode.key.name === propName);
          if (propNode) {
            if (propNode.computed) {
              log('Found prop, is computed, bailing');
              TODO
              return true; // Move to next write
            }
            if (propNode.method) {
              log('Found prop, is method, bailing');
              TODO
              return true; // Move to next write
            }
            if (propNode.kind !== 'init') {
              log('Found prop, is getter/setter, bailing');
              return true; // Move to next write
            }

            log('There exists a prop node with that name. Updating it');
            rule('Writing to a property after the object literal can be inlined');
            example('const x = {a: 1}; x.a = 2;', 'const x = {a: 2}; ;');
            before(writeRef.blockBody[writeRef.blockIndex]);
            before(readRef.blockBody[readRef.blockIndex]);

            propNode.value = readRef.grandNode.right;
            readRef.blockBody[readRef.blockIndex] = AST.emptyStatement();

            after(writeRef.blockBody[writeRef.blockIndex]);
            after(readRef.blockBody[readRef.blockIndex]);

            return true; // "prop mutation". Move to next write
          } else {
            log('Object expression currently does not have this property. Adding it');
            rule('Writing to a new property after the object literal can be inlined');
            example('const x = {}; x.a = 2;', 'const x = {a: 2}; ;');
            before(writeRef.blockBody[writeRef.blockIndex]);
            before(readRef.blockBody[readRef.blockIndex]);

            objExprNode.properties.push(AST.property(propName, readRef.grandNode.right));
            readRef.blockBody[readRef.blockIndex] = AST.emptyStatement();

            after(writeRef.blockBody[writeRef.blockIndex]);
            after(readRef.blockBody[readRef.blockIndex]);

            return true; // "prop mutation". Move to next write
          }
        }


        // x.y = z;
        vlog('The member expression was being assigned to is not singleInner. Bailing');
        return true; // "prop mutation". Move to next write
      }

      if (readRef.grandNode.type === 'UnaryExpression' && readRef.grandProp === 'argument' && readRef.grandNode.operator === 'delete') {
        vlog('This "property lookup" was actually the argument to `delete`. Must keep this.');
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

      return haveRef(objExprNode, writeRef, readRef);
    }

  }

  function haveRef(objExprNode, writeRef, readRef) {

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
            example('let obj = {}; let x = obj.toString();', `let obj = {}; let x = $dotCall(${symbo('Object', 'prototype')}.toString, obj, "toString", prop);`);
            before(writeRef.blockBody[writeRef.blockIndex]);
            before(readRef.blockBody[readRef.blockIndex]);

            ASSERT(!readRef.parentNode.property.computed, 'checked before getting here, right?');
            const tmpNameMethod = createFreshVar('tmpObjectMethod', fdata);
            const methodNode = AST.memberExpression(symbo('Object', 'prototype'), readRef.parentNode.property.name, false);
            const methodVarNode = AST.variableDeclaration(tmpNameMethod, methodNode, 'const');

            ASSERT(!readRef.parentNode.computed, 'right?', readRef.parentNode);

            // `$dotCall(tmpNameMethod, obj, "prop", ...args)`
            const callNode = AST.callExpression(SYMBOL_DOTCALL, [
              AST.identifier(tmpNameMethod),
              readRef.parentNode.object,
              readRef.parentNode.computed ? AST.identifier('undefined') : AST.primitive(readRef.parentNode.property),
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

            readRef.blockBody.splice(readRef.blockIndex, 0, methodVarNode);

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
            example('let obj = {}; let x = obj.x;', `let obj = {}; let x = ${symbo('Object', 'prototype')}.x;`);
            before(writeRef.blockBody[writeRef.blockIndex]);
            before(readRef.blockBody[readRef.blockIndex]);

            ASSERT(!readRef.parentNode.property.computed, 'checked before getting here, right?');

            const finalNode = AST.memberExpression(symbo('Object', 'prototype'), readRef.parentNode.property.name, false);
            if (readRef.grandIndex < 0) readRef.grandNode[readRef.grandProp] = finalNode;
            else readRef.grandNode[readRef.grandProp][readRef.grandIndex] = AST.identifier('undefined'); // FIXME: broken?? shouldnt this be finalNode?

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
        return true;
      }
    } else {
      vlog('The object literal contained a node for `' + propName + '` (pid', pnode.$p.pid, ')');

      if (readRef.grandNode.type === 'CallExpression' && readRef.grandProp === 'callee') {
        // Tricky case. We may be able to find the reference but we may still not be able to improve anything
        // Consider `obj.foo(...)` versus `const tmp = obj.foo; $dotCall(tmp, obj, prop, ...)`. The one line turned into two lines
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
          return true;
        } else {
          rule('A method call that we know does not use the context can call the function directly');
          example('window.parseInt(x)', 'parseInt(x)');
          before(readRef.blockBody[readRef.blockIndex]);

          readRef.grandNode.callee = newCallee;

          after(readRef.blockBody[readRef.blockIndex]);
          ++updated
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
        ++updated
      }
    }
  }

  return updated;
}
