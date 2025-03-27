// Look for arrays that don't mutate and that get coerced/converted to a string or number or something.
//
// [] * 1
// [] === x
// [] + x
// etc
//
// These arrays are only allowed to have their index or .length properties read. Anything else bails this transform.
// It's mostly geared against contrived test cases and probably obfuscation. It may randomly hit a real world case tho :D

import { ASSERT, log, group, groupEnd, vlog, vgroup, vgroupEnd, rule, example, before, source, after, fmat, tmat, coerce, findBodyOffset, todo, } from '../utils.mjs';
import * as AST from '../ast.mjs';
import { mayBindingMutateBetweenRefs } from '../bindings.mjs';
import { SYMBOL_COERCE } from '../symbols_preval.mjs';
import { symbo } from '../symbols_builtins.mjs';

export function arrCoerce(fdata) {
  group('\n\n\nChecking for arrays that get coerced');
  //vlog('\nCurrent state\n--------------\n' + fmat(tmat(fdata.tenkoOutput.ast)) + '\n--------------\n');
  const r = _arrCoerce(fdata);
  groupEnd();
  return r;
}
function _arrCoerce(fdata) {
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
    log('Array coercion cases changed:', updated, '. Restarting from phase1 to fix up read/write registry');
    return {what: 'arrCoerce', changes: updated, next: 'phase1'};
  }
  log('Array accesses changed: 0.');
}

function processAttempt(fdata, queue) {
  // Find arrays which are constants and do not escape and where all member expressions are reads

  let updated = 0;

  fdata.globallyUniqueNamingRegistry.forEach(function (arrMeta, arrName) {
    if (arrMeta.isBuiltin) return;
    if (arrMeta.isImplicitGlobal) return;
    if (!arrMeta.isConstant) return;
    const arrNode = arrMeta.varDeclRef.node;
    if (arrNode.type !== 'ArrayExpression') return;
    if (arrMeta.writes.length !== 1) return;

    // Array should only contain primitives. Otherwise we can't resolve it at all.
    if (arrNode.elements.some(enode => enode && !AST.isPrimitive(enode))) return;

    // Confirm all reads are unable to mutate the array. No property writes, no method calls
    // (because they escape through `.map((e, i, arr)=>` or mutates like `.reverse()`), etc.

    if (!arrMeta.reads.every(read => {
      // Only allow
      // - index property reads
      // - .length access
      // - used in binary expression
      // - used in unary expression (but not delete)
      // - as computed property key (obj[arr]) which is arr.join('')
      if (read.parentNode.type === 'BinaryExpression') return true;
      if (read.parentNode.type === 'UnaryExpression') return true;

      // Calling the array is bad. Calling with the array as arg is bad. Calling any method on the array is bad.
      if (read.parentNode.type === 'CallExpression') return false;
      if (read.grandNode.type === 'CallExpression') return false;

      if (read.parentNode.type === 'MemberExpression') {
        if (read.grandNode.type === 'UnaryExpression' && read.grandNode.operator === 'delete') {
          // `delete arr.x`
          // This obviously mutates the array
          return false;
        }
        if (read.parentNode.property === read.node) {
          // - `const arr = []; obj[arr]`
          // array as computed property key, I think that's just string coercion regardless of how it's used?
          return true;
        }

        // Most likely the object is the array here
        if (read.parentNode.object === read.node) {
          // Don't assign to properties on the array
          if (read.grandNode.type === 'AssignmentExpression' && read.grandProp === 'left') return false;
          // Okay if the read key is computed number or static .length
          if (read.parentNode.computed) {
            if (AST.isNumberLiteral(read.parentNode.property)) return true;
            if (read.parentNode.property.type !== 'Identifier') return false;
            const pmeta = fdata.globallyUniqueNamingRegistry.get(read.parentNode.property.name);
            // It's okay if the index property is read, without writing to it or calling it directly
            // This can't mutate the array so it's all good.
            return pmeta.typing.mustBe === 'number';
          } else {
            return read.parentNode.property.name === 'length';
          }
        }

        ASSERT(false, 'what other kind of member expression occurrence exists?', read.parentNode);
      }


      if (read.parentNode.type === 'AssignmentExpression') return false; // Can't really assign to the arr because it's a constant, and we don't want the array to escape either.
      // Calls are not okay because the array can escape like this: `[function(){ return this }][0]()` (or mutate likewise)

      if (read.parentNode.type === 'MemberExpression' && read.grandNode.type === 'CallExpression') {
        // Calling a method on the array. We know the array is not the computed key. Ignore computed keys.
        if (read.parentNode.computed) return false;
        // We can support a bunch of methods here but I think another transform should handle them...
        todo(`Confirm other transforms resolve this arr method: array.${read.parentNode.property.name}`)
        return false;
      }

      if (read.parentNode.type === 'NewExpression') return false; // Think this just crashes, always. So ignore this array.

      //todo(`Be explicit in allowing or rejecting an array usage with parent type is ${read.parentNode.type}`);
      return false;
    })) return;

    // Should now have:
    // - parent is binary
    // - parent is unary
    // - parent is member (with array being the computed prop key)

    vgroup('- `' + arrName + '` is a constant array literal');
    process(arrMeta, arrName, arrNode, queue);
    vgroupEnd();
  });

  function process(arrMeta, arrName, arrNode, queue) {
    arrMeta.reads.forEach(read => {
      if (read.parentNode.type === 'UnaryExpression') {
        // - `~ arr`

        rule('Calling a unary operator on an array with only primitives can be resolved');
        example('~[1,2,3];', '-1;');
        before(read.blockBody[read.blockIndex]);

        const prims = arrNode.elements.map(enode => enode ? AST.getPrimitiveValue(enode) : undefined);
        const result = {
          '~': arr => ~arr,
          '!': arr => ~arr,
          '+': arr => ~arr,
          '-': arr => ~arr,
          'typeof': arr => ~arr,
          // Delete should just crash
          // New is not a unary operator
          // Void should not be able to reach here
        }[read.parentNode.operator](prims);
        read.parentNode[read.parentProp] = AST.primitive(result);

        after(read.blockBody[read.blockIndex]);
        updated += 1;
        return;
      }
      if (read.parentNode.type === 'BinaryExpression') {
        // - `arr * 1`

        const other = read.parentNode.left === read.node ? read.parentNode.right : read.parentNode.left;
        switch (read.parentNode.operator) {
          case '!=':
          case '==': {
            if (AST.isPrimitive(other)) {
              const val = AST.getPrimitiveValue(other);
              if (val === undefined || val === null) {
                rule('Comparing an array with null or undefined has a fixed outcome');
                example('[] == null', 'false');
                example('[] != null', 'true');
                before(read.blockBody[read.blockIndex]);

                read.grandNode[read.grandProp] = AST.primitive(read.parentNode.operator !== '==');
                queue.push({
                  index: +read.node.$p.pid,
                  func: () => {
                    // Store the other expr as a statement to preserve TDZ/ref errors
                    read.blockBody.splice(read.blockIndex, 0, AST.expressionStatement(other));
                  }
                });

                after(read.blockBody[read.blockIndex]);
                updated += 1;
                return;
              }
            }
            break;
          }
          case '===':
          case '!==': {
            // This array did not escape. As such, we should be able to always reliably resolve ===/!== no matter the other side.
            rule('Strictly comparing an array that does not escape should allow us to resolve it regardless of other side');
            example('[] === x', 'false');
            example('[] !== []', 'true');
            before(read.blockBody[read.blockIndex]);

            read.grandNode[read.grandProp] = AST.primitive(read.parentNode.operator !== '===');
            queue.push({
              index: +read.node.$p.pid,
              func: () => {
                // Store the other expr as a statement to preserve TDZ/ref errors
                read.blockBody.splice(read.blockIndex, 0, AST.expressionStatement(other));
              }
            });

            after(read.blockBody[read.blockIndex]);
            updated += 1;
            return;
          }
          case '+': {
            // - `[1,2,3] + 'x'`

            // Always string concat, regardless of other operand, because it has no .valueOf() so it always ends up calling .toString()
            // Since the array side is always a string, the other side of the `+` also ends up getting coerced to a string, regardless

            rule('An array literal that is part of a plus is always coerced to string first');
            example('[] * 10', '0');
            example('[1] * 10', '10');
            example('[2,1] * 10', 'NaN');
            before(read.blockBody[read.blockIndex]);

            const prims = arrNode.elements.map(enode => enode ? AST.getPrimitiveValue(enode) : undefined);
            const val =  prims + '';
            read.parentNode[read.parentProp] = AST.primitive(val);

            after(read.blockBody[read.blockIndex]);
            updated += 1;
            return;
          }

          case '**':
          case '*':
          case '/':
          case '%':
          case '-':
          case '<<':
          case '>>':
          case '>>>':
          case '&':
          case '^':
          case '|':
          {
            // Arrays get coerced to number, but still end up being a string because they have no .valueOf()
            // Because they are, the other side also ends up getting coerced to a string.
            // For numeric ops, the coercion hint is "default", implying try number then string. So the other
            // side is still coerced to a number first, and then that is coerced to a string.

            rule('An array literal that is part of a numeric binary operator results in coercion to string');
            example('[] * 10', '0');
            example('[1] * 10', '10');
            example('[2,1] * 10', 'NaN');
            before(read.blockBody[read.blockIndex]);

            const prims = arrNode.elements.map(enode => enode ? AST.getPrimitiveValue(enode) : undefined);
            const val = prims + '';
            read.parentNode[read.parentProp] = AST.primitive(val);

            after(read.blockBody[read.blockIndex]);
            updated += 1;
            return;
          }

          case '<':
          case '>':
          case '<=':
          case '>=':
          {
            // Arrays get coerced to number, but still end up being a string because they have no .valueOf()
            // The comparison algorithm still allows the array-string to be coerced to a number, if the other
            // side ends up being primitived into a number. But that's not super relevant for us. We just stringify.

            rule('An array literal that is part of a relational binary operator results in coercion to string');
            example('[] < 10', '"" < 10');
            example('[1] >= 10', '"1" >= 10');
            example('[2,1] > 10', '"2,1" > 10');
            before(read.blockBody[read.blockIndex]);

            const prims = arrNode.elements.map(enode => enode ? AST.getPrimitiveValue(enode) : undefined);
            const val = prims + '';
            read.parentNode[read.parentProp] = AST.primitive(val);

            after(read.blockBody[read.blockIndex]);
            updated += 1;
            return;
          }
        }

        return;
      }
      if (read.parentNode.type === 'MemberExpression') {
        // - `obj[arr]`

        if (read.parentProp === 'property') {
          rule('An array literal used as a property key is coerced to a string');
          example('const arr = [1,2,3]; obj[arr];', 'const arr = [1,2,3]; obj["1,2,3"];');
          before(read.blockBody[read.blockIndex]);

          const prims = arrNode.elements.map(enode => enode ? AST.getPrimitiveValue(enode) : undefined);
          const val = prims + '';
          read.parentNode[read.parentProp] = AST.primitive(val);

          after(read.blockBody[read.blockIndex]);
          updated += 1;
          return;
        }

        // Ignore index properties etc.
      }
    });

    return updated;
  }

  return updated;
}
