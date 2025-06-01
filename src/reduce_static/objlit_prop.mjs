// Partial object literal property access resolving. Just a first go at it.
// - If we can resolve a property access to an actual value, we should replace the prop access with that value.
// - If we can resolve it to not exist, we should replace it with a prototype if we can
// - If we can resolve writes then we should update the associated object literal

import { ASSERT, log, group, groupEnd, vlog, vgroup, vgroupEnd, rule, example, before, source, after, fmat, tmat, findBodyOffset, todo, } from '../utils.mjs';
import * as AST from '../ast.mjs';
import { createFreshVar, mayBindingMutateBetweenRefs } from '../bindings.mjs';
import { SYMBOL_COERCE, SYMBOL_DOTCALL, SYMBOL_FRFR } from '../symbols_preval.mjs';
import { BUILTIN_SYMBOLS, BUILTIN_FUNC_NO_CTX, symbo } from '../symbols_builtins.mjs';

export function objlitPropAccess(fdata) {
  group('\n\n\n[objlitPropAccess] Checking for object literals whose props are accessed immediately');
  //currentState(fdata, 'objlitPropAccess', true, fdata);
  const r = _objlitPropAccess(fdata);
  groupEnd();
  return r;
}
function _objlitPropAccess(fdata) {
  let queue = [];
  let updated = 0;

  processAttempt(fdata);

  log('');
  if (updated + queue.length) {
    queue.sort(({ index: a }, { index: b }) => b - a);

    vgroup('Unwinding', queue.length, 'callbacks');
    queue.forEach(({ func }) => {
      vlog('-- next');
      func();
    });
    vgroupEnd();
  }
  if (updated > 0) {
    log('Assignments promoted:', updated, '. Restarting from phase1 to fix up read/write registry');
    return {what: 'objlitPropAccess', changes: updated, next: 'phase1'};
  }
  log('Assignments promoted: 0.');
  return;

  function processAttempt(fdata) {
    new Map(fdata.globallyUniqueNamingRegistry).forEach(function (meta, name) {
      if (meta.isBuiltin) return;
      if (meta.isImplicitGlobal) return;
      //if (!meta.singleScoped) return;
      if (meta.rwOrder[0]?.action !== 'write') return; // TDZ because single scoped
      if (meta.rwOrder[0]?.kind !== 'var') return; // catch?
      //if (meta.isConstant) return; // Not relevant right now

      vgroup(
        '- binding:', [name], ', rwOrder:',
        meta.rwOrder.map((ref) => ref.action + ':' + ref.kind),
      );
      process(meta, name);
      vgroupEnd();
    });

    function process(meta, name) {
      const rwOrder = meta.rwOrder;

      // Initially, target cases like `var obj = {a: x}; var prop = obj.a;`
      // Very simple, very straightforward. Prop access without observable side effects between the obj init and the prop access.

      // First step: search for init/assignment of an object literal
      // Second step: for as long as there are no observable side effects between 'em, process each read
      //   For every read that is a property access, try to resolve it immediately, and cut out the property access
      rwOrder.forEach((ref, ri) => {
        vlog('- ref[' + ri + ']:', ref.action + ':' + ref.kind);
        let rhs;
        if (ref.kind === 'var') {
          rhs = ref.parentNode.init;
        } else if (ref.kind === 'assign') {
          rhs = ref.parentNode.right;
        } else {
          vlog('  - bail: Not a var or assign;', ref.parentNode.type);
          return;
        }

        if (rhs.type !== 'ObjectExpression') {
          vlog('  - bail: Assigned value is not an object (', rhs.type, ')');
          return;
        }

        if (rhs.properties.some(pnode => {
          if (pnode.computed && !AST.isNumberLiteral(pnode.key)) return true; // TODO: allow other literals?
          if (pnode.type === 'SpreadElement') return true; // We can support some sub-cases but not worth the squeeze right now
          if (pnode.kind === 'get' || pnode.kind === 'set') return true; // Ignore getters and setters eeeew
        })) {
          vlog('  - bail: Objlit had computed (non-numeric), get, set, or spread properties; bailing');
          return;
        }

        // Ok this was a write that assigned an object literal. Hurray!
        vgroup('  - ok; Found "simple" object expression at ref', ri, ' assigned to `' + name + '`. Tracing nearest property lookups.');
        verifyAfterObjectAssign(meta, rwOrder, ref, ri, rhs);
        vgroupEnd();

        // This is a bit of a hack or whatever but it's going try and eliminate consecutive prop writes to the same
        // property when the object is known to be simple (no get/set/spread/computed).
        if (meta.writes.length === 1) {
          rwOrder.forEach((ref, ri) => {
            const body = ref.blockBody;
            if (ref.action === 'read' && rwOrder[ri+1]?.action === 'read' && body === rwOrder[ri+1].blockBody) {
              const a = ref.blockIndex;
              const b = rwOrder[ri+1].blockIndex;
              queue.push({
                index: rwOrder[ri].blockIndex,
                func: () => {
                  before(body[a])
                  before(body[b])
                  if (
                    // Assert body[a] is still a prop write
                    body[a]?.type === 'ExpressionStatement' &&
                    body[a].expression.type === 'AssignmentExpression' &&
                    body[a].expression.left.type === 'MemberExpression' &&
                    body[a].expression.left.object.type === 'Identifier' &&
                    !body[a].expression.computed &&

                    // Assert body[b] is still a prop write
                    body[b]?.type === 'ExpressionStatement' &&
                    body[b].expression.type === 'AssignmentExpression' &&
                    body[b].expression.left.type === 'MemberExpression' &&
                    body[b].expression.left.object.type === 'Identifier' &&
                    !body[b].expression.computed &&

                    // Assert the write is to the same object and same property
                    body[a].expression.left.object.name === body[b].expression.left.object.name &&
                    body[a].expression.left.property.name === body[b].expression.left.property.name &&

                    // Assert it's writing the same value
                    ((
                      AST.isPrimitive(body[a].expression.right) &&
                      AST.isPrimitive(body[b].expression.right) &&
                      AST.getPrimitiveValue(body[a].expression.right) === AST.getPrimitiveValue(body[b].expression.right)
                    ) || (
                      body[a].expression.right.type === 'Identifier' &&
                      body[b].expression.right.type === 'Identifier' &&
                      body[a].expression.right.name === body[b].expression.right.name
                    )) &&

                    // Assert no observable change could have happened between these reads
                    onlyFreeVarDeclsBetween(a, b, body)
                  ) {
                    rule('Two prop writes to a simple object assigning the same value with no spies in between can be folded up');
                    example('const obj = {a: 1}; obj.a = 2; obj.a = 2;', 'const obj = {a: 1}; obj.a = 2; ;');
                    before(body[a]);
                    before(body[b]);

                    body[b] = AST.emptyStatement();

                    after(body[a]);
                    after(body[b]);
                    updated += 1;
                  }
                }
              })
            }
          });
        }
      });
    }

    function readMightMutateObject(read) {
      // A reference "might mutate an object" when either we can see it does or when we can't predict it won't.
      // So `delete` on a property is most likely going to mutate the object. But when the object escapes
      // it also becomes less likely that we can predict how it's going to be used, up to perhaps impossible.
      // Note: the parentNode check subsumes calls, so obj cant escape this way.
      if (read.parentNode.type !== 'MemberExpression' || read.parentProp !== 'object') {
        // - `f(obj)`
        // - `foo[obj]`
        vlog('- mightMutate: at least one read escaped as it was not a member. singleWriteSafe=false');
        return true;
      }

      if (read.grandNode.type === 'AssignmentExpression' && read.grandProp === 'left') {
        // - `x.y = z`
        vlog('- mightMutate: at least one member expression was being assigned to. singleWriteSafe=false');
        return true;
      }

      if (read.grandNode.type === 'UnaryExpression' && read.grandProp === 'delete') {
        // - `delete x.y`
        vlog('- mightMutate: at least one member expression was a property delete. singleWriteSafe=false');
        return true;
      }

      return false;
    }

    function verifyAfterObjectAssign(meta, rwOrder, writeRef, wi, objExprNode) {
      if (wi === rwOrder.length - 1) {
        vlog('- bail: This write is the last ref. The assignment is probably observed by a loop?');
        return;
      }

      const lastMap = new Map(); // Map<scope, ref>

      // Assert that this is a constant and the object is not mutated in any way (escapes, delete, method call, etc)
      const singleWriteSafe = meta.writes.length === 1 && !meta.reads.some(read => {
        return readMightMutateObject(read);
      });

      if (singleWriteSafe) {
        vlog('- ok; Single write and all reads do not escape, process any read that can reach the write');

        // All reads should be safe to resolve now
        meta.reads.forEach(read => {
          // If the first prop-read after the write was a statement and it's not mutated in between then we can drop the statement.
          if (read.parentNode.type === 'MemberExpression' && read.parentProp === 'object' && read.grandNode.type === 'ExpressionStatement') {
            vlog('- Prop access was a statement, applying transform now');
            // This should be a property access on a "simple" object, verified to be free of getters/setters.
            // As such, the prop access should not be able to trigger any spies and should be free to drop.
            if (!read.parentNode.computed || AST.isPrimitive(read.parentNode.property)) {
              rule('Statement that is plain/primitive obj property access on plain array can be removed');
              example('const obj = {}; obj[0];', ';');
              example('const obj = {}; obj.x;', ';');
              before(read.blockBody[read.blockIndex]);

              read.blockBody[read.blockIndex] = AST.emptyStatement();

              after(read.blockBody[read.blockIndex]);
              updated += 1;
              return true; // prop was mutated
            } else {
              rule('Statement that is computed property access on plain object can be replaced by coercion of property to string');
              example('const obj = {}; obj[x];', '$coerce(x, "string");');
              before(read.blockBody[read.blockIndex]);

              read.blockBody[read.blockIndex] = AST.expressionStatement(AST.callExpression(SYMBOL_COERCE, [read.parentNode.property, AST.primitive('string')]));

              after(read.blockBody[read.blockIndex]);
              updated += 1;
              return true; // prop was mutated
            }
          }

          return haveRef(objExprNode, writeRef, read);
        });
      } else {
        // Slow path. Try to verify immutability between the write and the read.
        // Requirements are more stringent here, like it must also be same if/loop/try etc.
        vlog('- verifyAfterObjectAssign(): Checking', rwOrder.length - wi - 1, 'refs, starting at', wi);
        for (let ri = wi; ri < rwOrder.length; ++ri) {
          const ref = rwOrder[ri];
          vgroup('- ref', ri, ';', ref.action + ':' + ref.kind, ref.pfuncNode.$p.npid, ref.parentNode.type);
          const r = processRef(meta, rwOrder, writeRef, objExprNode, ref, wi, ri, lastMap);
          vgroupEnd();
          if (r) break;
        }
      }
    }

    function processRef(meta, rwOrder, writeRef, objExprNode, ref, wi, ri, lastMap) {
      // ref should be the next ref in rwOrder, after the writeRef. It may be differently scoped.

      let lastRefArr = lastMap.get(ref.pfuncNode.$p.npid);
      if (!lastRefArr) {
        lastRefArr = [];
        lastMap.set(ref.pfuncNode.$p.npid, lastRefArr);
      }

      if (ref.action === 'write') {
        lastRefArr.push(ref);
        vlog('- Updated last write ref for scope', ref.pfuncNode.$p.npid, 'to a write');
        return;
      }

      const readRef = ref;

      ASSERT(readRef.action === 'read');

      // We want to get the write that sits in the same scope as this read. That's not necessarily writeRef
      let prevWrite = undefined;
      for (let i = lastRefArr.length - 1; i >= 0; --i) {
        const r = lastRefArr[i];
        if (readRef.blockChain.startsWith(r.blockChain)) {
          prevWrite = r;
          break;
        }
      }

      if (!prevWrite) {
        // This is a potential bug though. What if the previous write was not a "simple object" but the write before was?
        // Then that would show up here and incorrectly be considered "the previous write" even though it wasn't...
        // TODO ^^^^
        vlog('- bail: This read has no previous write in the same scope (could mean that the previous write in this scope was not a "simple object")');
        return;
      }

      if (prevWrite.kind !== 'var' && prevWrite.kind !== 'assign') {
        vlog('- bail: Previous write was not a var or assign (so, for-x?)');
        return;
      }

      if (readRef.innerTry !== prevWrite.innerTry) {
        // Can't guarantee the write if one ref is inside a try while the other is not
        return vlog('- bail: read/write not in same try', readRef.innerCatch, prevWrite.innerCatch);
      }

      // Not sure if the catch clause is relevant here. It's just a block
      //if (readRef.innerCatch !== prevWrite.innerCatch) {
      //  // Can't guarantee the write if one ref is inside a catch while the other is not
      //  return vlog('- read/write not in same catch', readRef.innerCatch, prevWrite.innerCatch);
      //}

      if (readRef.parentNode.type === 'UnaryExpression' && readRef.parentNode.op === 'delete') {
        // delete x.y;
        vlog('- bail: The member expression was a property delete. Bailing');
        return;
      }

      if (readRef.grandNode.type === 'CallExpression' && readRef.grandProp === 'callee') {
        // `x.foo();` (may refer to `this` and mutate object)
        vlog('- bail: At least one member expression was called. Bailing');
        return true;
      }

      if (readRef.parentNode.type !== 'MemberExpression' || readRef.parentProp !== 'object') {
        // Object escapes. Any mutation may happen.
        vlog('- bail: Not a non-computed member expression or the read was not the object; type:', readRef.parentNode.type, ', computed:', readRef.parentNode.computed, ', parent prop:', readRef.parentProp);
        return true;
      }

      if (mayBindingMutateBetweenRefs(meta, prevWrite, readRef, true)) {
        vlog('- bail: There was at least one observable side effect that could have mutated the property on the object, so bailing');
        return;
      }

      if (readRef.innerLoop !== prevWrite.innerLoop) {
        // We can support a tiny subset of things here. Borderline useless but here we are.

        // Property assignment when read is inside a loop that write is not. Tricky tricky!
        if (readRef.grandNode.type === 'AssignmentExpression' && readRef.grandProp === 'left') {
          // Silly case of `const x = {a:1}; while (true) { x.a = 2; ...}`
          if (
            // Is next statement after the write a `while`?
            prevWrite.blockBody[prevWrite.blockIndex + 1]?.type === 'WhileStatement' &&
            // Is the body block of the while the same block as that of the read?
            prevWrite.blockBody[prevWrite.blockIndex + 1].body.body === readRef.blockBody &&
            // Is the read the first statement in the loop?
            readRef.blockIndex === 0 &&
            // Is the read a non-computed property on the object?
            readRef.parentNode.type === 'MemberExpression' &&
            readRef.parentProp === 'object' &&
            !readRef.parentNode.computed &&
            // Is the property being written to?
            readRef.grandNode.type === 'AssignmentExpression' &&
            readRef.grandProp === 'left' &&
            // Is the assigned value a literal we can predict?
            AST.isPrimitive(readRef.grandNode.right)
          ) {
            // Is the value different from what the object starts with? (We can't eliminate the property write due to the looping)
            const propNode = objExprNode.properties.find((pnode) => pnode.key.name === readRef.parentNode.property.name);
            if (
              // Either the property doesn't exist at all yet (note: there are no computed/spread props to consider)
              !propNode ||
              // Or the current value is not a primitive
              !AST.isPrimitive(propNode.value) ||
              // Or the primitive value is not the same
              AST.getPrimitiveValue(propNode.value) !== AST.getPrimitiveValue(readRef.grandNode.right)
            ) {
              rule('A prop write to a plain object when the write is in a loop immediately after the objlit decl can set that value');
              example(
                'const obj = {a: 1}; while (true) { obj.a = 2; ... }',
                'const obj = {a: 2}; while (true) { obj.a = 2; ... }'
              );
              before(prevWrite.blockBody[prevWrite.blockIndex]);
              before(readRef.blockBody[readRef.blockIndex]);

              propNode.value = AST.cloneSimple(readRef.grandNode.right);

              after(prevWrite.blockBody[prevWrite.blockIndex]);
              after(readRef.blockBody[readRef.blockIndex]);
              updated += 1;
              return true;
            } else {
              vlog('Not mutating the object property to the same value...');
            }
          }
        }

        return vlog('- read/write not in same loop', readRef.innerLoop, prevWrite.innerLoop);
      }

      if (prevWrite.innerLoop !== readRef.innerLoop) {
        // TODO: if the loop contained no further writes this would still be okay...
        vlog('- bail: The read happened inside a different loop from the write. Bailing just in case.');
        return;
      }

      // If the first prop-read after the write was a statement and it's not mutated in between then we can drop the statement.
      if (readRef.parentNode.type === 'MemberExpression' && readRef.parentProp === 'object' && readRef.grandNode.type === 'ExpressionStatement') {
        vlog('Prop access was a statement');
        // This should be a property access on a "simple" object, verified to be free of getters/setters.
        // As such, the prop access should not be able to trigger any spies and should be free to drop.
        if (!readRef.parentNode.computed || AST.isPrimitive(readRef.parentNode.property)) {
          rule('Statement that is plain/primitive obj property access on plain array can be removed');
          example('const obj = {}; obj[0];', ';');
          example('const obj = {}; obj.x;', ';');
          before(readRef.blockBody[readRef.blockIndex]);

          readRef.blockBody[readRef.blockIndex] = AST.emptyStatement();

          after(readRef.blockBody[readRef.blockIndex]);
          updated += 1;
          return true; // prop was mutated
        } else {
          rule('Statement that is computed property access on plain object can be replaced by coercion of property to string');
          example('const obj = {}; obj[x];', '$coerce(x, "string");');
          before(readRef.blockBody[readRef.blockIndex]);

          readRef.blockBody[readRef.blockIndex] = AST.expressionStatement(AST.callExpression(SYMBOL_COERCE, [readRef.parentNode.property, AST.primitive('string')]));

          after(readRef.blockBody[readRef.blockIndex]);
          updated += 1;
          return true; // prop was mutated
        }
      }

      // TODO: is it really a big deal if we allow arbitrary property assignment in this context? Worst case, __proto__? is that an issue?
      if (readRef.parentNode.computed) {
        // Computed props are hard to predict. Allow numeric literals.
        // TODO: we could do for other literals like `x["a b"]`... but how often does that happen? aside from arrays... which this is not
        if (!AST.isNumberLiteral(readRef.parentNode.property)) {
          vlog('- bail: A computed member expression with non-numeric property; type:', readRef.parentNode.type, ', computed:', readRef.parentNode.computed, ', parent prop:', readRef.parentProp, ', prop type:', readRef.parentNode.property.type);
          return true;
        }
        vlog('- ok: Computed property is a number literal, proceeding with inlining');
      }

      if (readRef.grandNode.type === 'AssignmentExpression' && readRef.grandProp === 'left') {
        // This is property assignment in same/no loop, We can work with some cases.

        if (
          // Must be same block because else `if (x) { } else { x = { f: 20 } } x.f = 10;` goes bad
          prevWrite.blockBody === readRef.blockBody &&
          // Assert the objlit could not have mutated between the write and the read
          onlyFreeVarDeclsBetween(prevWrite.blockIndex, readRef.blockIndex, readRef.blockBody)
        ) {
          // The write and read are in same block, between them are zero or more statements that cannot trigger spies,
          // whatever they are, like var decl with functions.

          vlog('- The assignment to this prop comes after assigning the object so we should be able to inline it');
          vlog('- The write is at index', prevWrite.blockIndex, ', the read at index', readRef.blockIndex, ', between them:', readRef.blockBody.slice(prevWrite.blockIndex+1, readRef.blockIndex).map(node => node.type));

          const prop = readRef.parentNode.property;
          let propName;
          if (readRef.parentNode.computed) {
            if (!AST.isNumberLiteral(prop)) {
              vlog('- bail: Computed property is not a number literal');
              return true; // Move to next write
            }
            propName = AST.getPrimitiveValue(prop).toString();
          } else {
            ASSERT(prop.type === 'Identifier', 'not computed so property node must be an identifier?');
            propName = prop.name;
          }

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
              vlog('- bail: Found prop, is not assigned a primitive');
              return true; // Move to next write
            //}
          }

          // Remember: obj is asserted to be free of get, and set props. computed props may exist but they can only numeric literals.
          const propNode = objExprNode.properties.find((pnode) => {
            if (readRef.parentNode.computed) {
              return pnode.computed && AST.isNumberLiteral(pnode.key) && 
                     AST.getPrimitiveValue(pnode.key).toString() === propName;
            }
            return !pnode.computed && pnode.key.name === propName;
          });
          if (propNode) {
            if (propNode.kind !== 'init') {
              // - `const b = {get a(){}}; b.a = 1'
              // - `const b = {set a(x){}}; b.a = 1'
              ASSERT(false, 'unreachable; we asserted properties are not get/set earlier on');
              vlog('- bail: Found prop, is getter/setter');
              return true; // Move to next write
            }
            if (propNode.computed && !AST.isNumberLiteral(propNode.key)) {
              // - `const b = {[a]: 2}; b.a = 1'
              vlog('- bail: Found non-numeric computed prop');
              ASSERT(false, 'unreachable; we asserted properties are either not computed or numeric literals earlier on', propNode);
              return true; // Move to next write
            }
            if (propNode.method) {
              // This shouldn't be a problem as long as we clear the .method flag
              // - `const b = {a(){}; b.a = 1' -> `const b = {a: 1}`
            }

            vlog('- ok: There exists a prop node with that name. Updating it');
            rule('Writing to a property after the object literal can be inlined');
            example('const x = {a: 1}; x.a = 2;', 'const x = {a: 2}; ;');
            before(prevWrite.blockBody[prevWrite.blockIndex]);
            before(readRef.blockBody[readRef.blockIndex]);

            propNode.value = readRef.grandNode.right;
            propNode.method = false; // Even when assigning a function, it's no longer a method (-> has special bond)
            readRef.blockBody[readRef.blockIndex] = AST.emptyStatement();

            after(prevWrite.blockBody[prevWrite.blockIndex]);
            after(readRef.blockBody[readRef.blockIndex]);

            updated += 1;
            return true; // "prop mutation". Move to next write
          } else {
            // The prop does not exist and since there are no non-numeric computed props and no spreads, it
            // must mean this object simply does not have this own property yet and we can create it.
            vlog('- ok: Object expression currently does not have this property. Adding it');
            rule('Writing to a new property after the object literal can be inlined');
            example('const x = {}; x.a = 2;', 'const x = {a: 2}; ;');
            example('const x = {}; x[0] = 2;', 'const x = {[0]: 2}; ;');
            before(prevWrite.blockBody[prevWrite.blockIndex]);
            before(readRef.blockBody[readRef.blockIndex]);

            if (readRef.parentNode.computed) {
              ASSERT(AST.isNumberLiteral(prop), 'checked before getting here, computed prop must be a number', propNode);
              objExprNode.properties.push(AST.property(
                AST.primitive(Number(propName)),
                readRef.grandNode.right,
                false, // shorthand
                true // computed
              ));
            } else {
              objExprNode.properties.push(AST.property(propName, readRef.grandNode.right));
            }
            readRef.blockBody[readRef.blockIndex] = AST.emptyStatement();

            after(prevWrite.blockBody[prevWrite.blockIndex]);
            after(readRef.blockBody[readRef.blockIndex]);

            updated += 1;
            return true; // "prop mutation". Move to next write
          }
        }

        // x.y = z;
        vlog('- bail: The member expression being assigned to is not same block, or has non-free statements between decl and assign');
        return true; // "prop mutation". Move to next write
      }

      if (readRef.grandNode.type === 'UnaryExpression' && readRef.grandProp === 'argument' && readRef.grandNode.operator === 'delete') {
        vlog('- bail: This "property lookup" was actually the argument to `delete`. Must keep this.');
        return;
      }

      return haveRef(objExprNode, prevWrite, readRef);
    }

    function haveRef(objExprNode, writeRef, readRef) {
      vlog('- ok: Found a read to an object literal while the object literal could not have been mutated!');

      // We have a write ref and a read ref and they are in the same block and there are no observable side effects in between
      // and the write is an object literal and the read is a property lookup. Game time.

      ASSERT(readRef.node.type === 'Identifier', 'right?', readRef.node);
      const propName = readRef.parentNode.property.name;
      const pnode = objExprNode.properties.find((pnode) => !pnode.computed && pnode.key.name === propName);
      if (!pnode) {
        vlog('- Could not find the property...');
        // TODO: can do this when we checked the property can not exist, like through computed prop or whatever
        vlog('- The object literal did not have a property `' + propName + '` so it must be undefined?');

        if (readRef.grandNode.type === 'CallExpression' && readRef.grandProp === 'callee') {
          // This would change `const o = {}; o.toString()` into `objectPrototype.toString()`. This would actually fine in most
          // cases but there are some edge cases where it may still matter and it doesn't feel right to just leave it hanging.
          // We'll convert it to a $dotCall to make sure the context value is preserved

          queue.push({
            index: readRef.blockIndex,
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
              const methodVarNode = AST.varStatement('const', tmpNameMethod, methodNode);

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
                (blockNodeAtIndex.type === 'VarStatement' && blockNodeAtIndex.init === readRef.grandNode),
                'this ought to be a normalized node so the call must either be child of expr stmt, right of assignment, or init of var',
                blockNodeAtIndex,
              );

              if (blockNodeAtIndex.type === 'VarStatement') {
                blockNodeAtIndex.init = callNode;
              } else if (blockNodeAtIndex.expression === readRef.grandNode) {
                blockNodeAtIndex.expression = callNode;
              } else {
                blockNodeAtIndex.expression.right = callNode;
              }

              readRef.blockBody.splice(readRef.blockIndex, 0, methodVarNode);

              after(readRef.blockBody[readRef.blockIndex]);
              updated += 1;
            },
          });
        } else if (BUILTIN_SYMBOLS.has(symbo('object', readRef.parentNode.property.name))) {
          queue.push({
            index: readRef.blockIndex,
            func: () => {
              // The only potential problem with this rule is if the global `Object` is somehow replaced with a different
              // value. But I believe that value is read-only in global, anyways. Beyond that, objlits should read from proto.
              rule('An object literal prop lookup when the obj has no such prop must read from the prototype');
              example('let obj = {}; $(obj.toString);', `let obj = {}; $(${symbo('object', 'toString')});`);
              before(writeRef.blockBody[writeRef.blockIndex]);
              before(readRef.blockBody[readRef.blockIndex]);

              ASSERT(!readRef.parentNode.property.computed, 'checked before getting here, right?');

              const finalNode = AST.identifier(symbo('object', readRef.parentNode.property.name))
              if (readRef.grandIndex < 0) readRef.grandNode[readRef.grandProp] = finalNode;
              else readRef.grandNode[readRef.grandProp][readRef.grandIndex] = finalNode;

              after(readRef.blockBody[readRef.blockIndex]);
              updated += 1;
            },
          });
        }
      } else if (pnode.kind !== 'init') {
        // Maybe we can still do something here but for now we're bailing
        vlog('- bail: The property `' + propName + '` resolves to a getter or setter.');

        if (readRef.grandNode.type === 'CallExpression' && readRef.grandProp === 'callee') {
          // TODO: allow list for certain methods, like toString or join. Maybe.
          vlog('- bail: The member expression was the callee of a call.');
          // x.y();
          // This would transform into what exactly?
          // Even `o = {a: f}; o.a()` to `f()` would be non-trivial since we would need to confirm that `f` does not access `this`.
          // However, we probably still want to go this extra mile since it'll be a common pattern to find in the wild.
          // TODO: This breaks `this` and while it's probably fine in many cases, we do need to confirm them first
          return true;
        }
      } else if (pnode.method) {
        // TODO: can we do anything here?
        vlog('- bail: The property resolves to a method.');

        if (readRef.grandNode.type === 'CallExpression' && readRef.grandProp === 'callee') {
          // TODO: allow list for certain methods, like toString or join. Maybe.
          vlog('- bail: The member expression was the callee of a call.');
          // x.y();
          // This would transform into what exactly?
          // Even `o = {a: f}; o.a()` to `f()` would be non-trivial since we would need to confirm that `f` does not access `this`.
          // However, we probably still want to go this extra mile since it'll be a common pattern to find in the wild.
          // TODO: This breaks `this` and while it's probably fine in many cases, we do need to confirm them first
          return true;
        }
      } else {
        vlog('- The object literal contained a node for `' + propName + '` (pid', pnode.$p.npid, ')');

        if (readRef.grandNode.type === 'CallExpression' && readRef.grandProp === 'callee') {
          // Tricky case. We may be able to find the reference but we may still not be able to improve anything
          // Consider `obj.foo(...)` versus `const tmp = obj.foo; $dotCall(tmp, obj, prop, ...)`. The one line turned into two lines
          // which will hurt certain optimization tricks. And what's the advantage?
          // So for method calls we will only do this if we can resolve to a function that does not use context.
          // For builtins that's an allow list. For constants that's resolved in phase1.

          let newCallee;
          let fail = true;
          if (AST.isPrimitive(pnode.value)) {
            vlog('- Since the value leads to a primitive, it must lead to a runtime error. But another rule will take care of that.');
            fail = false;
            newCallee = AST.cloneSimple(pnode.value);
          } else if (pnode.value.type === 'Identifier') {
            const calleeMeta = fdata.globallyUniqueNamingRegistry.get(pnode.value.name);
            if (calleeMeta.isConstant) {
              if (calleeMeta.varDeclRef.node.type !== 'FunctionExpression') {
                vlog(
                  '- bail: The callee is actually constant `' + pnode.value.name + '` which is not a function (',
                  calleeMeta.varDeclRef.node.type,
                  '), probably a runtime error, but bailing nonetheless',
                );
              } else if (!calleeMeta.varDeclRef.node.$p.thisAccess) {
                vlog('- The callee is actually constant `' + pnode.value.name + '` which is a function that does not access `this`');
                fail = false;
                newCallee = AST.identifier(pnode.value.name);
              } else {
                vlog('- bail: The callee is actually constant `' + pnode.value.name + '` which is a function that accesses `this`');
              }
            } else if (calleeMeta.isBuiltin) {
              switch (pnode.value.name) {
                case symbo('Function', 'constructor'):
                case symbo('Number', 'parseInt'):
                case symbo('Number', 'parseFloat'):
                case 'isNaN':
                case symbo('Number', 'isNaN'):
                case 'isFinite':
                case symbo('Number', 'isFinite'):
                case symbo('Number', 'isInteger'):
                case symbo('Number', 'isSafeInteger'):
                case symbo('RegExp', 'constructor'):
                  vlog('- The callee is actually builtin `' + pnode.value.name + '` and it does not use `this`');
                  fail = false;
                  newCallee = AST.identifier(pnode.value.name);
                  break;
                default:
                  if (BUILTIN_FUNC_NO_CTX.has(pnode.value.name)) {
                    todo('Use contextFreeBuiltin to check this callee');
                  }
                  vlog('- The callee is actually constant `' + pnode.value.name + '` and it does use `this`');
              }
            } else {
              vlog('- bail: The callee is actually `' + pnode.value.name + '` and since it is neither a constant nor a builtin, we must bail');
            }
          }

          if (fail) {
            vlog('- (bailing)');
            return true;
          } else {
            rule('A method call that we know does not use the context can call the function directly');
            example('window.parseInt(x)', 'parseInt(x)');
            before(readRef.blockBody[readRef.blockIndex]);

            readRef.grandNode.callee = newCallee;

            after(readRef.blockBody[readRef.blockIndex]);
            updated += 1;
          }
        } else {
          rule('An object literal whose property is looked up immediately can resolve the lookup immediately');
          before(writeRef.blockBody[writeRef.blockIndex]);
          before(readRef.blockBody[readRef.blockIndex]);

          // The readRef.parentNode was a member expression. It should be replaced into `undefined`.
          if (readRef.grandIndex < 0) readRef.grandNode[readRef.grandProp] = AST.cloneSimple(pnode.value);
          // This will crash for complex nodes ;(
          else readRef.grandNode[readRef.grandProp][readRef.grandIndex] = AST.cloneSimple(pnode.value); // This will crash for complex nodes ;(

          before(writeRef.blockBody[writeRef.blockIndex]);
          after(readRef.blockBody[readRef.blockIndex]);
          updated += 1;
        }
      }
    }
  }
}

function onlyFreeVarDeclsBetween(a, b, body) {
  // The goal of this function is to determine if any statement between
  // two given indices could potentially trigger a spy or not.
  // More specifically; we want to know if anything might mutate an object.
  //
  // If we expand this later we must ensure that abrupt completions,
  // loops, or try/catch blocks don't mess up certain assumptions.

  // Starting _after_ index a, check if up-to-but-not-including index b there are only
  // var decls with inits we know can't trigger spies for the sake of declaring them.

  ASSERT(a>=0 && a<b && b<body.length, 'caller should ensure bounds 0<=a<b<body.len', a, b, body.length);
  // Do not include checking a and b themselves. We only care about detecting in-between changes.
  for (let i=a+1; i<b-1; ++i) {
    switch (body[i].type) {
      case 'VarStatement': {
        switch (body[i].init.type) {
          case 'FunctionExpression': {
            // ok
            break;
          }

          case 'Literal': {
            // ok
            break;
          }

          case 'ObjectExpression': {
            // Most of the time this is fine. Potential issue:
            // - computed keys, coerced to string, triggering a spy
            // - spread may trigger spy
            const objNode = body[i].init;
            if (!objNode.properties.every(pnode => {
              // Computed keys get coerced to string, this can spy
              // Spread values can spy, trigger getters/iterators
              return !(pnode.type === 'SpreadElement' || pnode.computed);
            })) {
              return false;
            }
            break;
          }

          case 'ArrayExpression': {
            // Most of the time this is fine. Potential issue:
            // - spread may trigger spy
            const arrNode = body[i].init;
            if (!arrNode.elements.every(enode => !enode || enode.type !== 'SpreadElement')) {
              // A spread can trigger a spy with a custom iterator
              return false;
            }

            break;
          }

          case 'CallExpression': {
            if (body[i].init.callee.type === 'Identifier' && body[i].init.callee.name === SYMBOL_FRFR) {
              // ok
              break;
            }
            return false;
          }
          default: {
            // unknown init. maybe it spies?
            return false;
          }
        }
        break;
      }
      default: {
        // unknown statement. maybe it spies?
        return false;
      }
    }
  }
  return true;
}
