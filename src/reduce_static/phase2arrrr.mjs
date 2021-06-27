// Look for arrays whose reads we can guarantee to resolve now.
// This includes;
// - index properties
//   - for `let`: `let arr = [1, 2, 3]; f(arr[1]); arr = {};`
//   - for `const`: `const arr = [1, 2, 3]; const f = function(n){ return arr[n]; }; f(arr[1]); f(2);`
// - length lookup
//   - for `let`: `let arr = [1, 2, 3]; f(arr.length); arr = {};`
//   - for `const`: `const arr = [1, 2, 3]; const f = function(n){ return arr.length; }; f(arr.length); f(2);`

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
import { mayBindingMutateBetweenRefs } from '../bindings.mjs';

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
    //if (!meta.isConstant) return;
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
    const arrLen = arrNode.elements.length;

    let failed = false;
    let sawMutatedOnce = false;

    const write = meta.writes[0];

    // Find all reads and confirm that they are member expressions which are reads, not writes
    vlog('Check whether all access is either numeric or a handful of names that do not mutate the array');
    meta.rwOrder.forEach((read, i) => {
      if (failed) return;
      if (meta.tainted) return;
      if (sawMutatedOnce) return;

      if (read.action === 'write') {
        if (read.kind !== 'var') {
          sawMutatedOnce = true;
        }
        return;
      }

      vlog(
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

      if (read.parentNode.type === 'MemberExpression') {
        const mem = read.parentNode;

        if (read.parentProp !== 'object') {
          // Edge case. Solve the jsf*ck case `[][[]]` -> `undefined`
          // Note: `({"":"pass"}[[]])` -> `"pass"` (not undefined)
          // Note: `({0:"pass"}[[0]])` -> `"pass"` (not undefined)
          if (read.parentProp === 'property' && read.parentNode.computed && arrNode.elements.every((enode) => AST.isPrimitive(enode))) {
            if (arrNode.elements.length === 0) {
              rule('The empty array literal that is used as a computed property name is the empty string');
              example('x[[]]', 'x[""]');
            } else {
              rule('An array that is used as a computed property is always converted to a string');
              example('x[[1, 2, 3]]', 'x["1,2,3"]');
            }
            before(read.node, read.blockBody[read.blockIndex]);

            read.parentNode.property = AST.primitive(String(arrNode.elements.map((enode) => AST.getPrimitiveValue(enode))));

            after(read.parentNode.property, read.blockBody[read.blockIndex]);
            ++updated;
            meta.tainted = true;
            vgroupEnd();
            return;
          }

          vlog('This read is not a property access and so we consider the array to escape. We can not trust its contents to be immutable.');
          failed = true;
          return;
        }

        if (read.grandNode.type === 'UnaryExpression' && read.grandProp === 'argument' && read.grandNode.operator === 'delete') {
          // `delete arr[2]`
          vlog('This "property lookup" was actually the argument to `delete`. Must keep this.');
          failed = true;
          return;
        }

        if (read.grandNode.type === 'CallExpression' && read.grandProp === 'callee') {
          // TODO: allow list for certain methods, like toString or join. Maybe.
          vlog('Calling a dynamic property. Cannot guarantee the sandbox. Bailing');
          failed = true;
          return;
        }

        if (read.grandNode.type === 'AssignmentExpression' && read.grandProp === 'left') {
          // TODO: allow for length under very specific circumstances. Might not be worth it.
          vlog('Assigning to a dynamic property. Array is mutated. Bailing');
          failed = true;
          return;
        }

        // This was some kind of property access on the array
        if (mem.computed) {
          vlog('Dynamic property:', mem.property.type === 'Identifier' ? '`' + mem.property.name + '`' : mem.property.type);
          // As long as we don't call this property we should be fine (since we also assert the array
          // doesn't "escape", we can assert that it should not matter whether non-index properties
          // are accessed as long as they aren't immediately called)
          vlog('Reading a dynamic property should be okay since it is not called');
          if (AST.isNumber(mem.property)) {
            vgroup('This is an indexed access to the array tp index', mem.property.value, '. May be able to resolve it immediately');
            // Skip if the read is not in the same loop as the write
            // Skip if the read is in a different function scope
            // If skipped, we can still do it if we can guarantee the array to be immutable
            if (write.innerLoop === read.innerLoop && write.pfuncNode.$p.pid === read.pfuncNode.$p.pid) {
              vlog('Checking now...');
              if (mayBindingMutateBetweenRefs(meta, write, read, true)) {
                vlog('May mutate the array. Bailing');
                failed = true;
                sawMutatedOnce = true;
              } else {
                vlog('Array could not have mutated between decl and first read. The access was numeric so we can resolve it.');
                vlog('Replacing the property lookup with', arrNode.elements[mem.property.value]);

                rule('An array literal lookup that can be statically resolved should be replaced');
                example('const arr = [1]; f(arr[0]);', 'const arr = [1]; f(1);');
                before(read.blockBody[read.blockIndex], write.blockBody[write.blockIndex]);

                // The read.node will be the object of a member expression. We want to replace the member expression.
                // If the index was OOB it must be undefined because this is is a regular array.
                const finalNode =
                  mem.property.value < arrLen ? AST.cloneSimple(arrNode.elements[mem.property.value]) : AST.identifier('undefined');
                if (read.grandIndex < 0) read.grandNode[read.grandProp] = finalNode;
                else read.grandNode[read.grandProp][read.grandIndex] = finalNode;

                after(read.blockBody[read.blockIndex]);
                meta.tainted = true;
                ++updated;
                vgroupEnd();
                return;
              }
            } else {
              vlog('Bailing check because there is a parent scope or loop mismatch between the write and the read');
            }
            vgroupEnd();
          } else {
            vlog('Not index property within range of the array');
          }
        } else {
          vlog('Property name: `.' + mem.property.name + '`');
          if (mem.property.name === 'length') {
            vlog('Accessing array.length might be resolvable');
            // Skip if the read is not in the same loop as the write
            // Skip if the read is in a different function scope
            // If skipped, we can still do it if we can guarantee the array to be immutable
            if (write.innerLoop === read.innerLoop && write.pfuncNode.$p.pid === read.pfuncNode.$p.pid) {
              vlog('Checking now...');
              if (mayBindingMutateBetweenRefs(meta, write, read, true)) {
                vlog('May mutate the array. Bailing');
                failed = true;
                sawMutatedOnce = true;
              } else {
                vlog('Array could not have mutated between decl and first read. So we can resolve it.');
                vlog('Replacing the .length lookup with', arrNode.elements.length);

                rule('An array literal lookup that can be statically resolved should be replaced');
                example('const arr = [1]; f(arr[0]);', 'const arr = [1]; f(1);');
                before(read.blockBody[read.blockIndex], write.blockBody[write.blockIndex]);

                // The read.node will be the object of a member expression. We want to replace the member expression.
                const finalNode = AST.literal(arrNode.elements.length);
                if (read.grandIndex < 0) read.grandNode[read.grandProp] = finalNode;
                else read.grandNode[read.grandProp][read.grandIndex] = finalNode;

                after(read.blockBody[read.blockIndex]);
                meta.tainted = true;
                ++updated;
                vgroupEnd();
                return;
              }
            } else {
              vlog('Bailing check because there is a parent scope or loop mismatch between the write and the read');
            }
          } else {
            vlog('This was a property access that was not called. Should not be able to mutate the array.');
          }
        }
        vgroupEnd();
      } else if (read.parentNode.type === 'CallExpression') {
        if (read.parentProp !== 'arguments') {
          vlog('Calling an array? Okay good luck');
          failed = true;
          return;
        }

        let callee;
        if (read.parentNode.callee.type === 'Identifier') {
          callee = read.parentNode.callee.name;
        } else if (
          read.parentNode.callee.type === 'MemberExpression' &&
          read.parentNode.callee.object.type === 'Identifier' &&
          read.parentNode.callee.property.type === 'Identifier' &&
          !read.parentNode.callee.computed
        ) {
          callee = read.parentNode.callee.object.name + '.' + read.parentNode.callee.property.name;
        } else {
          // TODO: what valid member expressions might this array be an arg to? Like, Array.isArray()
          vlog('Array was arg to a call with unknown callee. Bailing');
          failed = true;
          return;
        }

        switch (callee) {
          case 'String': {
            if (
              arrNode.elements.every((enode) => {
                ASSERT(!enode || enode.type !== 'SpreadElement', 'asserted above');
                return !enode || AST.isPrimitive(enode);
              })
            ) {
              rule('An array literal with primitives that is an arg of String can be resolved');
              example('String([1, 2, 3])', '"1,2,3"');
              before(read.node, read.blockBody[read.blockIndex]);

              // Note: we put `undefined` in the position of holes. This is the same for String()
              const v = arrNode.elements.map((enode) => (enode ? AST.getPrimitiveValue(enode) : undefined));
              const vn = String(v);
              const finalNode = AST.primitive(vn);
              if (read.grandIndex < 0) read.grandNode[read.grandProp] = finalNode;
              else read.grandNode[read.grandProp][read.grandIndex] = finalNode;

              after(finalNode, read.blockBody[read.blockIndex]);
              meta.tainted = true;
              ++updated;
              return;
            }
            break;
          }
          case 'Number': {
            // Note: due to how array serialization works, if the first arg would parse to a number, so does the array
            // Note: this will still trigger spies on all elements, regardless of the outcome
            // `Number([{valueOf(){ console.log('x') }, toString(){ console.log('y'); }}])` -> prints y
            if (
              arrNode.elements.every((enode) => {
                ASSERT(!enode || enode.type !== 'SpreadElement', 'asserted above');
                return AST.isPrimitive(enode);
              })
            ) {
              rule('An array literal with primitives that is an arg of Number can be resolved');
              example('Number([1, 2, 3])', '"1,2,3"');
              before(read.node, read.blockBody[read.blockIndex]);

              // Holes are ignored here
              const v = arrNode.elements.map((enode) => (enode ? AST.getPrimitiveValue(enode) : undefined));
              const vn = Number(v);
              const finalNode = AST.primitive(vn);
              if (read.grandIndex < 0) read.grandNode[read.grandProp] = finalNode;
              else read.grandNode[read.grandProp][read.grandIndex] = finalNode;

              after(finalNode, read.blockBody[read.blockIndex]);
              meta.tainted = true;
              ++updated;
              return;
            }
            break;
          }
          case 'Boolean': {
            // Note: due to how array serialization works, if the first arg would parse to a number, so does the array
            // Note: this will still trigger spies on all elements, regardless of the outcome
            // `Number([{valueOf(){ console.log('x') }, toString(){ console.log('y'); }}])` -> prints y
            // TODO: if we can splice the elements out we don't care about the actual contents
            if (
              arrNode.elements.every((enode) => {
                ASSERT(!enode || enode.type !== 'SpreadElement', 'asserted above');
                return AST.isPrimitive(enode);
              })
            ) {
              rule('An array literal called on Boolean always returns true');
              example('Boolean([1, 2, 3])', 'true;');
              before(read.node, read.blockBody[read.blockIndex]);

              const finalNode = AST.tru();
              if (read.grandIndex < 0) read.grandNode[read.grandProp] = finalNode;
              else read.grandNode[read.grandProp][read.grandIndex] = finalNode;

              after(finalNode, read.blockBody[read.blockIndex]);
              meta.tainted = true;
              ++updated;
              return;
            }
            break;
          }
          case 'Array.isArray': {
            // TODO: if we can splice the elements out we don't care about the actual contents
            if (
              arrNode.elements.every((enode) => {
                ASSERT(!enode || enode.type !== 'SpreadElement', 'asserted above');
                return AST.isPrimitive(enode);
              })
            ) {
              rule('An array literal called on Array.isArray always returns true');
              example('Array.isArray([1, 2, 3])', 'true;');
              before(read.node, read.blockBody[read.blockIndex]);

              const finalNode = AST.tru();
              if (read.grandIndex < 0) read.grandNode[read.grandProp] = finalNode;
              else read.grandNode[read.grandProp][read.grandIndex] = finalNode;

              after(finalNode, read.blockBody[read.blockIndex]);
              meta.tainted = true;
              ++updated;
              return;
            }
            break;
          }
        }
      } else {
        vlog('This read is not a property access and so we consider the array to escape. We can not trust its contents to be immutable.');
        failed = true;
        return;
      }
    });

    if (meta.tainted) {
      // Something was mutated. We already logged out for this.
      return;
    }
    if (failed) {
      vlog(
        'There was at least one read of this array that was either not a property access, or it was a write to a property, or it called a method. The array may be mutated so we must bail.',
      );
      return true;
    }

    vlog(
      'All reads validated. They should all be prop-read accesses. The array should be immutable. Checking for inlineable reads that were skipped before',
    );

    // This supports multi-scope cases that might need to be more conservative. The extra requirement is never seeing the array
    // getting mutated or escape (always used as property access).
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

      if (read.parentNode.type !== 'MemberExpression') return;

      ASSERT(
        read.parentNode.type === 'MemberExpression' && read.parentProp === 'object',
        'should be verified before that this array was only used in prop lookups',
        read.parentNode,
      );

      if (!read.parentNode.computed && read.parentNode.property.name === 'length') {
        rule('Reading the length of an immutable array can be inlined');
        example('const arr = [1, 2, 3]; $(arr.length);', 'const arr = [1, 2, 3]; $(3);');
        before(read.parentNode, read.blockBody[read.blockIndex]);

        if (read.grandIndex < 0) read.grandNode[read.grandProp] = AST.literal(arrNode.elements.length);
        else read.grandNode[read.grandProp][read.grandIndex] = AST.literal(arrNode.elements.length);

        after(read.parentNode, read.blockBody[read.blockIndex]);
        ++updated;
        vgroupEnd();
        return;
      }

      if (
        read.parentNode.computed &&
        AST.isNumber(read.parentNode.property) &&
        // Must be a positive number since otherwise it would be a unary so just check the upper bound
        read.parentNode.property.value < arrLen
      ) {
        rule('Reading a index property of an immutable array can be resolved');
        example('const arr = [1, 2, 3]; $(arr[1]);', 'const arr = [1, 2, 3]; $(2);');
        before(read.parentNode, read.blockBody[read.blockIndex]);

        const finalNode = AST.cloneSimple(arrNode.elements[read.parentNode.property.value]);
        if (read.grandIndex < 0) read.grandNode[read.grandProp] = finalNode;
        else read.grandNode[read.grandProp][read.grandIndex] = finalNode;

        after(read.parentNode, read.blockBody[read.blockIndex]);
        ++updated;
        vgroupEnd();
        return;
      }

      vlog('- not index access, not .length access');

      vgroupEnd();
    });
  }

  return updated;
}
