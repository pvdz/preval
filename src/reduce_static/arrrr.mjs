// Look for arrays whose reads we can guarantee to resolve now.
// This includes;
// - index properties
//   - for `let`: `let arr = [1, 2, 3]; f(arr[1]); arr = {};`
//   - for `const`: `const arr = [1, 2, 3]; const f = function(n){ return arr[n]; }; f(arr[1]); f(2);`
// - length lookup
//   - for `let`: `let arr = [1, 2, 3]; f(arr.length); arr = {};`
//   - for `const`: `const arr = [1, 2, 3]; const f = function(n){ return arr.length; }; f(arr.length); f(2);`
// - consts with array literal init that only have property reads must be safe to inline

import { ASSERT, log, group, groupEnd, vlog, vgroup, vgroupEnd, rule, example, before, source, after, fmat, tmat, coerce, findBodyOffset, todo, } from '../utils.mjs';
import * as AST from '../ast.mjs';
import { mayBindingMutateBetweenRefs } from '../bindings.mjs';
import { SYMBOL_COERCE } from '../symbols_preval.mjs';
import { symbo } from '../symbols_builtins.mjs';

export function arrrrrr(fdata) {
  group('\n\n\n[arrrrrr] Checking for arrrrrrray stuffs');
  //currentState(fdata, 'arrrrrr'. true);
  const r = _arrrrrr(fdata);
  groupEnd();
  return r;
}
function _arrrrrr(fdata) {
  const ast = fdata.tenkoOutput.ast;

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
    return {what: 'arrrrrr', changes: updated, next: 'phase1'};
  }
  log('Array accesses changed: 0.');
}

function processAttempt(fdata, queue) {
  // Find arrays which are constants and do not escape and where all member expressions are reads

  let updated = 0;

  fdata.globallyUniqueNamingRegistry.forEach(function (meta, name) {
    if (meta.isBuiltin) return;
    if (meta.isImplicitGlobal) return;
    if (!meta.isConstant) return;
    if (meta.varDeclRef.node.type !== 'ArrayExpression') return;

    vgroup('- `' + name + '` is a constant array literal');
    process(meta, name, queue);

    // These reads should not be accessed again so we can safely drop statements of prop access.
    meta.reads.forEach(read => {
      if (read.parentNode.type === 'MemberExpression' && read.parentProp === 'object' && read.grandNode.type === 'ExpressionStatement') {
        // Statement that is a property access on this array. Whatever it is, it's irrelevant.
        if (!read.parentNode.computed || AST.isPrimitive(read.parentNode.property)) {
          rule('Statement that is plain/primitive property access on plain array can be removed');
          example('const arr = []; arr[0];', ';');
          example('const arr = []; arr.x;', ';');
          before(read.blockBody[read.blockIndex]);

          read.blockBody[read.blockIndex] = AST.emptyStatement();

          after(read.blockBody[read.blockIndex]);
          updated += 1;
        } else {
          rule('Statement that is computed property access on plain array can be replaced by coercion of property to string');
          example('const arr = []; arr[x];', '$coerce(x, "string");');
          before(read.blockBody[read.blockIndex]);

          read.blockBody[read.blockIndex] = AST.expressionStatement(AST.callExpression(SYMBOL_COERCE, [read.parentNode.property, AST.primitive('string')]));

          after(read.blockBody[read.blockIndex]);
          updated += 1;
        }
      }
    });

    vgroupEnd();
  });

  function process(meta, name, queue) {
    const arrNode = meta.varDeclRef.node;

    if (arrNode.elements.some((enode) => enode?.type === 'SpreadElement')) {
      vlog('The array literal had a spread element. Bailing for now.');
      return true;
    }
    const arrLen = arrNode.elements.length;

    let failed = false;
    let sawMutatedOnce = false;

    const write = meta.writes[0];

    const declLoopPid = write.innerLoop;
    const declTryPid = write.innerTrap;

    // This is a const with an array literal as init.
    // We need to validate that it doesn't mutate with calls like splice or assignments to .length etc
    if (meta.reads.every(read => {
      return (
        read.parentNode.type === 'MemberExpression' &&
        read.parentProp === 'object' &&
        (
          read.grandNode.type === 'VarStatement' ||
          (read.grandNode.type === 'AssignmentExpression' && read.grandProp === 'right') ||
          read.grandNode.type === 'ExpressionStatement'
        ) &&
        // Loop may mutate the array with statements that appear later in source code
        // Note that if the decl is inside a loop, it's fine as long as the reads are in the same loop because when that loop repeats the
        // decl is fresh again, so source order logic is maintained.
        read.innerLoop === declLoopPid &&
        // A try may or may not mutate the array, leaving unpredictable state.
        // Similar to loops, it's fine if the decl is inside the try-block as logn as the reads are in the same try-block.
        read.innerTrap === declTryPid
      );
    })) {
      vlog('All reads of this array constant are member accesses. Try to resolve the primitives');
      if (arrNode.elements.some(node => !node || AST.isPrimitive(node))) {
        vgroup('At least one element is a primitive that we can inline, or elided (which is undefined). Search for certain reads now.');

        // TODO: what about `for (x of y[Symbol.iterator])` sort of stuff? Not resolving to primitive I guess?

        meta.reads.forEach((read, ei) => {
          vgroup('- read', ei, ', @', +read.node.$p.pid);
          if (read.parentNode.computed) {
            if (read.grandNode.type === 'AssignmentExpression') {
              vlog('This is a write to the property, bailing');
            }
            else if (AST.isPrimitive(read.parentNode.property)) {
              const val = AST.getPrimitiveValue(read.parentNode.property);
              vlog('Accessing primitive value', val, 'on the array, a', typeof val);
              if (typeof val === 'number') {
                const anode = arrNode.elements[val];
                if (!anode || AST.isPrimitive(anode)) {
                  vlog('And the accessed value is also a primitive, so we can inline it!');

                  rule('An array that has only property reads can inline reads when they only concern primitives');
                  example('const arr = [1,2,3]; $(arr[1]);', 'const arr = [1,2,3]; $(2);');
                  before(read.blockBody[read.blockIndex]);

                  const newNode = AST.primitive(anode ? AST.getPrimitiveValue(anode) : undefined)

                  if (read.grandIndex < 0) read.grandNode[read.grandProp] = newNode;
                  else read.grandNode[read.grandProp][read.grandIndex] = newNode;

                  after(read.blockBody[read.blockIndex]);
                  updated += 1;
                } else {
                  vlog('The accessed value is not a primitive, so we bail for now');
                }
              } else {
                vlog('This is not a number so we must abort, for now');
              }
            } else {
              vlog('Dynamic property is not a primitive so we cannot resolve it reliably');
            }
          } else {
            // Just check the property name and resolve it against a plain array (or array prototype, most likely .length)

            switch (read.parentNode.property.name) {
              case 'length':
                rule('Accessing .length on an array when this is a constant and only has props read, can be lined');
                example('const arr = [1, 2, 3, 4]; $(arr.length);', 'const arr [1, 2, 3, 4]; $(4);');
                before(read.blockBody[read.blockIndex]);

                const newNode = AST.primitive(arrNode.elements.length);

                if (read.grandIndex < 0) read.grandNode[read.grandProp] = newNode;
                else read.grandNode[read.grandProp][read.grandIndex] = newNode;

                after(read.blockBody[read.blockIndex]);
                updated += 1;
                break;
              default:
                // arr[true] or whatever. ignore it for now. we may support more cases here but whatever.
            }

          }
          vgroupEnd();
        });
        vgroupEnd();

        if (updated) {
          return;
        }
        vlog('None of the reads qualified for inlining');
      } else {
        vlog('None of the elements of the array are primitives. Other values are unsafe (we can improve this later). Bailing for now.');
      }
    } else {
      vlog('At least one read of this array is not a regular property read, bailing');
    }

    // Find all reads and confirm that they are member expressions which are reads, not writes
    // We must take care of loops and try/catch cases, where mutations may or may not appear in order.
    vgroup('Check whether all access is either numeric or a handful of names that do not mutate the array');
    meta.rwOrder.some((read, i) => {
      if (failed) return true;
      if (meta.tainted) return true;
      if (sawMutatedOnce) return true;

      // Loops may mutate the array with statements that appear later in source code
      // Note that if the decl is inside a loop, it's fine as long as the reads are in the same loop
      // because when that loop repeats the decl is fresh again, so source order logic is maintained.
      if (read.innerLoop !== declLoopPid) {
        failed = true;
        return true;
      }
      // A try may or may not mutate the array, leaving unpredictable state.
      // Note that if the decl is inside a try, it's fine as long as the reads are in the same try
      // because when that try is caught the state is not observable later anyways.
      if (read.innerTrap !== declTryPid) {
        failed = true;
        return true;
      }

      vlog('- read', i, ':', read.grandNode.type, read.grandProp, read.grandIndex, read.parentNode.type, read.parentProp, read.parentIndex, '<read>');

      if (read.action === 'write') {
        if (read.kind !== 'var') {
          vlog(' - Non-var-decl write; bail');
          sawMutatedOnce = true;
        } else {
          vlog(' - Found the var decl');
        }
        return;
      }
      if (read.parentNode.type === 'MemberExpression' && read.grandNode.type === 'AssignmentExpression' && read.grandProp !== 'right') {
        vlog(' - At least one read was part of a property write, array mutates, bailing');
        sawMutatedOnce = true;
        return;
      }
      else if (read.parentNode.type === 'MemberExpression') {
        vlog(' - Used in a member expression; node property:', [read.parentProp], ', computed:', read.parentNode.computed);
        const mem = read.parentNode;

        // Edge case. Solve the jsf*ck case `[][[]]` -> `undefined`
        // Note: `({"":"pass"}[[]])` -> `"pass"` (not undefined)
        // Note: `({0:"pass"}[[0]])` -> `"pass"` (not undefined)
        // (Is `const o = {0:"pass"}; const a = [0]; o[a];`)
        if (read.parentProp === 'property' && read.parentNode.computed && arrNode.elements.every((enode) => !enode || AST.isPrimitive(enode))) {
          if (arrNode.elements.length === 0) {
            rule('The empty array literal that is used as a computed property name is the empty string');
            example('x[[]]', 'x[""]');
          } else {
            rule('An array that is used as a computed property is always converted to a string');
            example('x[[1, 2, 3]]', 'x["1,2,3"]');
          }
          before(read.node, read.blockBody[read.blockIndex]);

          read.parentNode.property = AST.primitive(String(arrNode.elements.map((enode) => enode ? AST.getPrimitiveValue(enode) : AST.identifier('undefined'))));

          after(read.parentNode.property, read.blockBody[read.blockIndex]);
          ++updated;
          meta.tainted = true;
          return;
        }

        if (read.parentProp !== 'object') {
          vlog('This read is not a property access and so we consider the array to escape. We can not trust its contents to be immutable.');
          failed = true;
          return;
        }

        if (read.parentNode.computed) {
          if (AST.isPrimitive(read.parentNode.property)) {
            let v = AST.getPrimitiveValue(read.parentNode.property);
            if (typeof v !== 'number') {
              if (typeof v !== 'string') v = String(v);
              const n = parseInt(v, 10);
              if (String(n) === v) {
                rule('Computed index property access on an array should be a number');
                example('const arr = []; f(arr["10"]);', 'const arr = []; f(arr[10]);');
                before(read.parentNode, read.blockBody[read.blockIndex]);

                read.parentNode.property = AST.literal(n);

                before(read.parentNode, read.blockBody[read.blockIndex]);
                ++updated;
                return;
              }

              if (v === '') {
                // Edge case: support jsf*ck decoding by supporting `[][[]]` -> `undefined`
                rule('Empty string property access on an array returns `undefined`');
                example('const x = []; f(x[""]);', 'const x = []; f(undefined);');
                before(read.parentNode, read.blockBody[read.blockIndex]);

                const finalNode = AST.identifier('undefined');
                if (read.grandIndex < 0) read.grandNode[read.grandProp] = finalNode;
                else read.grandNode[read.grandProp][read.grandIndex] = finalNode;

                before(read.parentNode, read.blockBody[read.blockIndex]);
                ++updated;
                return;
              }
            }
          }
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
          if (AST.isNumberLiteral(mem.property)) {
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
                  mem.property.value < arrLen
                  ? (
                    arrNode.elements[mem.property.value]
                    ? AST.cloneSimple(arrNode.elements[mem.property.value])
                    : AST.identifier('undefined')
                  )
                  : AST.identifier('undefined');
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
                return;
              }
            } else {
              vlog('Bailing check because there is a parent scope or loop mismatch between the write and the read');
            }
          } else {
            vlog('This was a property access that was not called. Should not be able to mutate the array.');
          }
        }
      }
      else if (read.parentNode.type === 'CallExpression') {
        vlog('  - arr is an arg to a func call, probably');
        if (read.parentProp !== 'arguments') {
          vlog('  - oh, no, calling an array? Okay good luck');
          failed = true;
          return;
        }

        const args = read.parentNode.arguments;
        let callee;
        if (read.parentNode.callee.type === 'Identifier') {
          callee = read.parentNode.callee.name;
        //} else if (
        //  read.parentNode.callee.type === 'MemberExpression' &&
        //  read.parentNode.callee.object.type === 'Identifier' &&
        //  read.parentNode.callee.property.type === 'Identifier' &&
        //  !read.parentNode.callee.computed
        //) {
        //  callee = read.parentNode.callee.object.name + '.' + read.parentNode.callee.property.name;
        } else {
          // TODO: what valid member expressions might this array be an arg to? Like, Array.isArray()
          vlog('Array was arg to a call with unknown callee. Bailing');
          failed = true;
          return;
        }

        switch (callee) {
          case symbo('string', 'constructor'):
          case symbo('number', 'constructor'): {
            ASSERT(false, 'string and number constructors should be replaced by $coerce during normalization');
            break;
          }
          case SYMBOL_COERCE: {
            if (
              arrNode.elements.every((enode) => {
                ASSERT(!enode || enode.type !== 'SpreadElement', 'asserted above');
                return !enode || AST.isPrimitive(enode);
              })
            ) {
              // Note: due to how array serialization works, if the first arg would parse to a number, so does the array
              // Note: this will still trigger spies on all elements, regardless of the outcome
              // `Number([{valueOf(){ console.log('x') }, toString(){ console.log('y'); }}])` -> prints y

              rule('An array literal with primitives that is an arg of $coerce can be resolved');
              example('const x = [1, 2, 3]; f($coerce(x, "string"));', 'const x = [1, 2, 3]; f("1,2,3");');
              example('const x = [1, 2, 3]; f($coerce(x, "number"));', 'const x = [1, 2, 3]; f(NaN);');
              example('const x = [1]; f($coerce(x, "number"));', 'const x = [1, 2, 3]; f(1);');
              before(read.node, read.blockBody[read.blockIndex]);

              const kind = AST.getPrimitiveValue(args[1]);
              // Note: we put `undefined` in the position of holes. This is the same for String() / Number()
              const v = arrNode.elements.map((enode) => (enode ? AST.getPrimitiveValue(enode) : undefined));
              const vn = coerce(v, kind);
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
          case symbo('boolean', 'constructor'): {
            rule('An array literal called on Boolean always returns true');
            example('const x = [1, 2, 3]; f(Boolean(x));', 'const x = [1, 2, 3]; f(true);');
            before(read.node, read.blockBody[read.blockIndex]);

            const finalNode = AST.tru();
            if (read.grandIndex < 0) read.grandNode[read.grandProp] = finalNode;
            else read.grandNode[read.grandProp][read.grandIndex] = finalNode;

            after(finalNode, read.blockBody[read.blockIndex]);
            meta.tainted = true;
            ++updated;
            return;
          }
          case symbo('Array', 'isArray'): {
            rule('An array literal called on Array.isArray always returns true');
            example('const x = [1, 2, 3]; f(Array.isArray(x))', 'const x = [1, 2, 3]; f(true);');
            before(read.node, read.blockBody[read.blockIndex]);

            const finalNode = AST.tru();
            if (read.grandIndex < 0) read.grandNode[read.grandProp] = finalNode;
            else read.grandNode[read.grandProp][read.grandIndex] = finalNode;

            after(finalNode, read.blockBody[read.blockIndex]);
            meta.tainted = true;

            ++updated;
            return;
          }
          default: {
            vlog('  - This array escapes as a call arg. In a bad way. Bailing');
            failed = true;
            return;
          }
        }
      }
      else if (read.parentNode.type === 'UnaryExpression') {
        const op = read.parentNode.operator;
        switch (op) {
          case '+':
          case '-':
          case '!':
          case '~': {
            if (
              arrNode.elements.every((enode) => {
                ASSERT(!enode || enode.type !== 'SpreadElement', 'asserted above');
                return AST.isPrimitive(enode);
              })
            ) {
              rule('An array literal with primitives as argument to a unary expression can be resolved');
              example('+[1, 2, 3]', 'NaN;', () => op === '+');
              example('-[1, 2, 3]', 'NaN;', () => op === '-');
              example('![1, 2, 3]', 'NaN;', () => op === '!');
              example('~[1, 2, 3]', 'NaN;', () => op === '~');
              before(read.node, read.blockBody[read.blockIndex]);

              const arr = arrNode.elements.map((enode) => (enode ? AST.getPrimitiveValue(enode) : undefined));

              const finalNode = AST.primitive({
                '+': () => +arr,
                '-': () => -arr,
                '~': () => ~arr,
                '!': () => !arr,
                typeof: () => typeof arr,
              }[op]());

              if (read.grandIndex < 0) read.grandNode[read.grandProp] = finalNode;
              else read.grandNode[read.grandProp][read.grandIndex] = finalNode;

              after(finalNode, read.blockBody[read.blockIndex]);
              meta.tainted = true;
              ++updated;
              return;
            }
            break;
          }

          case 'typeof': {
            // Typeof is different because it does not evaluate the elements so they don't need to be primitives here
            rule('An array literal with primitives as argument to `typeof` always returns "object"');
            example('const x = [1, 2, 3]; f(typeof x);', 'const x = [1, 2, 3]; f("object");');
            before(read.node, read.blockBody[read.blockIndex]);

            const finalNode = AST.primitive('object');
            if (read.grandIndex < 0) read.grandNode[read.grandProp] = finalNode;
            else read.grandNode[read.grandProp][read.grandIndex] = finalNode;

            after(finalNode, read.blockBody[read.blockIndex]);
            meta.tainted = true;
            ++updated;
            return;
          }
        }
      }
      else if (read.parentNode.type === 'BinaryExpression') {
        const op = read.parentNode.operator;
        switch (op) {
          case '+': {
            // If an array is on either side of a `+1 then it _will_ be converted to a string:
            // - the algo first calls ToPrimitive() on both operands
            // - ToPrimitive will proc valueOf() and if that does not return a primitive, it calls toString()
            // - valueOf() on an array, by default, returns the array itself (which is not a primitive)
            // - toString() calls .join() if it is a function, and otherwise Object#toString
            // - join() will be called without args and those default to a comma (`","`)
            // - So we assume `+` on array will invariably do this... but this can be torpedoed.
            if (
              arrNode.elements.every((enode) => {
                ASSERT(!enode || enode.type !== 'SpreadElement', 'asserted above');
                return AST.isPrimitive(enode);
              })
            ) {
              // Either the other side is a primitive, in which case we can melt them immediately
              // Or the other side is not a primitive, in which case we just replace the ref ot the array here
              if (read.parentProp === 'left' ? AST.isPrimitive(read.parentNode.right) : AST.isPrimitive(read.parentNode.left)) {
                const prim =
                  read.parentProp === 'left' ? AST.getPrimitiveValue(read.parentNode.right) : AST.getPrimitiveValue(read.parentNode.left);

                rule('An array literal with primitives that is the operand to `+` with a primitive to other side can be resolved');
                example('[1, 2, 3] + "foo"', '"1,2,3foo";', () => read.parentProp === 'left');
                example('"foo" + [1, 2, 3]', '"foo1,2,3";', () => read.parentProp === 'right');
                before(arrNode, read.blockBody[read.blockIndex]);

                const arr = arrNode.elements.map((enode) => (enode ? AST.getPrimitiveValue(enode) : undefined));

                const finalNode = AST.primitive(read.parentProp === 'left' ? arr + prim : prim + arr);

                if (read.grandIndex < 0) read.grandNode[read.grandProp] = finalNode;
                else read.grandNode[read.grandProp][read.grandIndex] = finalNode;

                after(finalNode, read.blockBody[read.blockIndex]);
                meta.tainted = true;
                ++updated;
                return;
              } else {
                rule('An array with only primitives that is part of a `+` should be converted to a string');
                example('[1, 2, 3] + x', '"1,2,3" + x;', () => read.parentProp === 'left');
                example('x + [1, 2, 3]', 'x + "1,2,3";', () => read.parentProp === 'right');
                before(arrNode, read.blockBody[read.blockIndex]);

                const arr = arrNode.elements.map((enode) => (enode ? AST.getPrimitiveValue(enode) : undefined));

                const finalNode = AST.primitive(String(arr));

                if (read.parentIndex < 0) read.parentNode[read.parentProp] = finalNode;
                else read.parentNode[read.parentProp][read.parentIndex] = finalNode;

                after(finalNode, read.blockBody[read.blockIndex]);
                meta.tainted = true;
                ++updated;
                return;
              }
            }
            break;
          }
        }
      }
      else {
        vlog('This read is not a property access and so we consider the array to escape. We can not trust its contents to be immutable.');
        failed = true;
        return;
      }
    });
    vgroupEnd();

    if (meta.tainted) {
      // Something was mutated. We already logged out for this.
      return;
    }
    if (sawMutatedOnce) {
      // At least one write mutates the array. We should have logged for this.
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

      if (read.parentNode.type !== 'MemberExpression') {
        vlog('The parent is not a member expression');
        vgroupEnd();
        return;
      }

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
        AST.isNumberLiteral(read.parentNode.property) &&
        // Must be a positive number since otherwise it would be a unary so just check the upper bound
        read.parentNode.property.value < arrLen
      ) {
        rule('Reading a index property of an immutable array can be resolved');
        example('const arr = [1, 2, 3]; $(arr[1]);', 'const arr = [1, 2, 3]; $(2);');
        before(read.blockBody[read.blockIndex]);

        const finalNode = AST.cloneSimple(arrNode.elements[read.parentNode.property.value]);
        if (read.grandIndex < 0) read.grandNode[read.grandProp] = finalNode;
        else read.grandNode[read.grandProp][read.grandIndex] = finalNode;

        after(read.blockBody[read.blockIndex]);
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
