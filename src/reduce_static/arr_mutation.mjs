// Look for array literals whose methods get called immediately and try to resolve them if we can guarantee state
// `const arr = [1, 2, 3]; arr.push(4); f(arr.shift()); f(arr)`
// -> `const arr = [2, 3, 4]; f(1); f(arr)`

import walk from '../../lib/walk.mjs';
import { ASSERT, log, group, groupEnd, vlog, vgroup, vgroupEnd, rule, example, before, source, after, fmat, tmat, coerce, findBodyOffset, todo, assertNoDupeNodes, } from '../utils.mjs';
import * as AST from '../ast.mjs';
import { BUILTIN_SYMBOLS, symbo } from '../symbols_builtins.mjs';
import { SYMBOL_DOTCALL } from '../symbols_preval.mjs';

export function arrMutation(fdata) {
  group('\n\n\n[arrMutation] Checking for array mutations to inline');
  //currentState(fdata, 'arrMutation', true, fdata);
  const r = _arrMutation(fdata);
  groupEnd();
  return r;
}
function _arrMutation(fdata) {
  let updated = 0;
  const queue = [];

  runArrMutation(fdata);

  if (queue.length) {
    queue.sort(({ index: a }, { index: b }) => b - a);
    queue.forEach(({ index, func }) => func());
  }

  log('');
  if (updated) {
    log('Array mutations changed:', updated, '. Restarting from phase1 to fix up read/write registry');
    return {what: 'arr_mutation', changes: updated, next: 'phase1'};
  }
  log('Array mutations changed: 0.');
  return;

  function runArrMutation(fdata) {
    // Search for array writes
    fdata.globallyUniqueNamingRegistry.forEach(arrMeta => {
      if (arrMeta.isBuiltin) return;
      if (arrMeta.isImplicitGlobal) return;

      arrMeta.writes.forEach(write => {
        if (
          write.kind === 'var' &&
          write.parentNode.init.type === 'ArrayExpression'
        ) {
          vgroup('- Array init @', write.parentNode.init.$p.npid);
          processArrayWrite(arrMeta, write, write.parentNode.init);
          vgroupEnd();
        }
        else if (
          write.kind === 'assign' &&
          write.parentNode.right.type === 'ArrayExpression'
        ) {
          vgroup('- Array assignment @', write.parentNode.right.$p.npid);
          processArrayWrite(arrMeta, write, write.parentNode.right);
          vgroupEnd();
        }
      });
    });
  }

  // Given a write, the write is init/assign of an array expression.
  // Find the next read in same scope and determine if the array could have been
  // mutated between the write and read. If not, and not in loop/try, we should
  // be able to apply resolve array prop reads and write mutations.
  function processArrayWrite(arrMeta, write, arrNode) {
    if (arrNode.elements.some(anode => anode?.type === 'SpreadElement')) {
      // While we can probably deal with some edge case around spreads, we currently won't.
      todo('Deal with array spreads in arr mutation?');
      return vlog('- bail: the array contained a spread element');
    }

    const rwIndex = arrMeta.rwOrder.indexOf(write);
    ASSERT(rwIndex >= 0);

    // Find the next read in the same scope (closure reads are not relevant and don't block the transform)
    let read;
    for (let i=rwIndex+1; i<arrMeta.rwOrder.length; ++i) {
      const ref = arrMeta.rwOrder[i];
      if (write.funcChain === ref.funcChain) {
        if (ref.kind !== 'read') return vlog('- bail: next ref after write in same scope is also a write');
        read = ref;
        break;
      }
    }
    if (!read) return vlog('- bail: did not find read after this write in same scope');

    // We now have a consecutive write (of array expr) and read (of that binding) in the same scope.
    // We have to confirm whether the array may have mutated in any way between these two refs.

    if (write.innerThenParent !== read.innerThenParent) return vlog('- bail: Not in same then-branch', write.innerThenParent, read.innerThenParent);
    if (write.innerElseParent !== read.innerElseParent) return vlog('- bail: Not in same else-branch', write.innerElseParent, read.innerElseParent);
    if (write.innerLoop !== read.innerLoop) return vlog('- bail: Not in same loop', write.innerLoop, read.innerLoop);
    if (write.innerTry !== read.innerTry) return vlog('- bail: Not in same try', write.innerTry, read.innerTry);

    let has = AST.hasObservableSideEffectsBetweenRefs(write, read);
    if (has) return vlog('- bail: there are observable side effects between the write and the read');

    // We should at this point be able to trust that the array structure in the AST is going to be what the array
    // looks like at read time. So we should be able to resolve reading/writing properties in certain cases.

    if (read.parentNode.type === 'MemberExpression') {
      // This is a regular array. Only assignment, delete, and method calls could mess up the array here.
      // Note that method calls are forced to simple $dotCalls so they can't occur here.
      if (read.grandNode.type === 'AssignmentExpression') {
        // This mutates the array if the read is on the left
        // - assignment to .length will mutate it
        // - assignment to index properties will mutate it
        // - other prop assignments are expandos and we don't really track them in preval
        // If the read is on the right then we may be able to resolve it here
        // - if the property is predictable (.length pr index) and we know the outcome then we
        //   can inline that value immediately. Like `const arr = [1,2,3]; $(arr[1])` is `$(2)`
        if (read.grandProp === 'left') {
          vlog('- this is assignment to a prop. We can support a small set of cases but most likely we cant do much here');
          if (read.parentNode.computed) {
            // - index properties (numbered computed props)
            if (
              AST.isPrimitive(read.parentNode.property) &&
              AST.isPrimitive(read.grandNode.right)
            ) {
              const pkey = AST.getPrimitiveValue(read.parentNode.property);
              if (
                Number.isInteger(pkey) &&
                pkey >= 0 && pkey < arrNode.elements.length + 10
              ) {
                // The assignment is within range and a primitive.
                rule('Assignment of primitive to predictable index property can be resolved');
                example('const arr = []; arr[0] = 100;', 'const arr[100]; ;');
                before(write.blockBody[write.blockIndex]);
                before(read.blockBody[read.blockIndex]);

                arrNode.elements[pkey] = AST.cloneSimple(read.grandNode.right);
                for (let i=0; i<arrNode.elements.length; ++i) {
                  if (!arrNode.elements[i]) arrNode.elements[i] = null; // Prevent elided elements in the AST
                }
                ASSERT(read.blockBody[read.blockIndex].type === 'ExpressionStatement' && read.blockBody[read.blockIndex].expression === read.grandNode, 'assignment should be the statement', read.blockBody);
                read.blockBody[read.blockIndex] = AST.emptyStatement();

                after(write.blockBody[write.blockIndex]);
                after(read.blockBody[read.blockIndex]);
                assertNoDupeNodes(write.blockBody, 'body', true);
                updated += 1;
                return;
              } else {
                return vlog('- bail: assigning to a float index or oob prop?', pkey);
              }
            } else if (
              AST.isPrimitive(read.parentNode.property) &&
              write.blockBody === read.blockBody &&
              write.blockIndex + 1 === read.blockIndex &&
              // Warning: There are several weird (contrived) risks here involving recursive array access.
              //          To that end we start with only allowing idents here, when the ident is not the array itself.
              read.grandNode.right.type === 'Identifier' &&
              read.grandNode.right.name !== write.parentNode.id.name
            ) {
              const pkey = AST.getPrimitiveValue(read.parentNode.property);
              if (
                Number.isInteger(pkey) &&
                pkey >= 0 && pkey < arrNode.elements.length + 10
              ) {
                rule('Assignment of ident to predictable index property on array declared in previous line can be resolved');
                example('const arr = []; arr[0] = x;', 'const arr[x]; ;');
                before(write.blockBody[write.blockIndex]);
                before(read.blockBody[read.blockIndex]);

                arrNode.elements[pkey] = AST.cloneSimple(read.grandNode.right);
                for (let i=0; i<arrNode.elements.length; ++i) {
                  if (!arrNode.elements[i]) arrNode.elements[i] = null; // Prevent elided elements in the AST
                }
                ASSERT(read.blockBody[read.blockIndex].type === 'ExpressionStatement' && read.blockBody[read.blockIndex].expression === read.grandNode, 'assignment should be the statement', read.blockBody);
                read.blockBody[read.blockIndex] = AST.emptyStatement();

                after(write.blockBody[write.blockIndex]);
                after(read.blockBody[read.blockIndex]);
                assertNoDupeNodes(write.blockBody, 'body', true);
                updated += 1;
                return;
              } else {
                return vlog('- bail: assigning to a float index or oob prop?', pkey);
              }
            } else {
              todo('In some (many?) cases the array can access this value so we could move the rhs into the array...');
              return vlog('- bail: assigning a non-primitive to an array index property');
            }
          } else {
            // - .length, if we can resolve the rhs to a number
            if (
              read.parentNode.property.name === 'length' &&
              AST.isPrimitive(read.grandNode.right)
            ) {
              // If the index property is within reasonable range, do the assignment. Don't create a million element array here.
              const pvalue = AST.getPrimitiveValue(read.grandNode.right);
              if (typeof pvalue === 'number' && pvalue >= 0 && pvalue < arrNode.elements.length+10) {
                rule('Assignment of bounded number to array.length can be resolved');
                example('const arr = [1,2,3,4,5]; arr.length = 2;', 'const arr = [1,2]; ;');
                before(write.blockBody[write.blockIndex]);
                before(read.blockBody[read.blockIndex]);

                // If this grows the array then the new elements are elided. If they shrink it the excessive nodes will be pruned.
                arrNode.elements.length = pvalue;
                for (let i=0; i<arrNode.elements.length; ++i) {
                  if (!arrNode.elements[i]) arrNode.elements[i] = null; // Prevent elided elements in the AST
                }
                // Eliminate the .length assignment
                ASSERT(read.blockBody[read.blockIndex].type === 'ExpressionStatement' && read.blockBody[read.blockIndex].expression === read.grandNode, 'the assignment should be the child of an expression statement...', read.blockBody[read.blockIndex]);
                read.blockBody[read.blockIndex] = AST.emptyStatement();

                after(write.blockBody[write.blockIndex]);
                after(read.blockBody[read.blockIndex]);
                assertNoDupeNodes(write.blockBody, 'body', true);
                updated += 1;
                return;
              }
            }
          }
        } else {
          ASSERT(read.grandProp === 'right');
        }
      }
      else if (read.grandNode.type === 'UnaryExpression' && read.grandNode.operator === 'delete') {
        // Either way this does something funky and we should bail.
        return vlog('- bail: explicitly deleting a property on the array');
      }
      else {
        ASSERT(read.grandNode.type !== 'CallExpression', 'method calls should be normalized to dotcalls', read);

        // What are valid parents here? var init, ...?
        if (read.grandNode.type !== 'VarStatement') todo(`what other ways do member expressions still appear? ${read.grandNode.type}`);
        vlog('- Parent of prop is', read.grandNode.type, 'and should be good to go');
        vlog('- this is reading a prop from the array, if we can predict the key and its value then we can inline it');
        // - .length
        if (read.parentNode.computed) {
          // - index properties (numbered computed props)
          if (AST.isPrimitive(read.parentNode.property)) {
            const pvalue = AST.getPrimitiveValue(read.parentNode.property);
            if (
              typeof pvalue === 'number' &&
              pvalue >= 0 &&
              pvalue < arrNode.elements.length+10
            ) {
              if (!arrNode.elements[pvalue] || AST.isPrimitive(arrNode.elements[pvalue])) {
                rule('Reading an index property from an array where the value is a known primitive can be resolved');
                example('const arr = [1,2,3]; $(arr[1]);', 'const arr[1,2,3]; $(2);');
                before(write.blockBody[write.blockIndex]);
                before(read.blockBody[read.blockIndex]);

                const newNode = arrNode.elements[pvalue] ? AST.primitive(AST.getPrimitiveValue(arrNode.elements[pvalue])) : AST.undef();
                if (read.grandIndex < 0) read.grandNode[read.grandProp] = newNode;
                else read.grandNode[read.grandProp][read.grandIndex] = newNode;

                after(write.blockBody[write.blockIndex]);
                after(read.blockBody[read.blockIndex]);
                updated += 1;
                return;
              } else {
                todo('can we always safely clone ident refs in this case?');
                return vlog('- bail: array index is not a primitive;', arrNode.elements[pvalue].type);
              }
            } else {
              return vlog('- bail: array index is way outside of range of array literal');
            }
          } else {
            return vlog('- bail: property was not a numeric prim');
          }
        } else {
          // .length
          if (read.parentNode.property.name === 'length') {
            rule('Reading array.length when we know the shape of the array means we can resolve it');
            example('const arr = [1,2,3]; $(arr.length);', 'const arr[100]; $(3);');
            before(write.blockBody[write.blockIndex]);
            before(read.blockBody[read.blockIndex]);

            if (read.grandIndex < 0) read.grandNode[read.grandProp] = AST.primitive(arrNode.elements.length);
            else read.grandNode[read.grandProp][read.grandIndex] = AST.primitive(arrNode.elements.length);

            after(write.blockBody[write.blockIndex]);
            after(read.blockBody[read.blockIndex]);
            updated += 1;
            return;
          } else if (BUILTIN_SYMBOLS.has(symbo('array', read.parentNode.property.name))) {
            // - builtin array methods, can replace the member expression
            rule('Reading array methods from arrays can be replaced by their symbol');
            example('const push = [].push;', `const push = ${symbo('array', 'push')};`);
            before(write.blockBody[write.blockIndex]);
            before(read.blockBody[read.blockIndex]);

            const newNode = AST.identifier(symbo('array', read.parentNode.property.name));
            if (read.grandIndex < 0) read.grandNode[read.grandProp] = newNode;
            else read.grandNode[read.grandProp][read.grandIndex] = newNode;

            after(write.blockBody[write.blockIndex]);
            after(read.blockBody[read.blockIndex]);
            updated += 1;
            return;
          }
        }
      }
    }

    // Not a member expression. Most likely an alias (init/assign) or used as arg in a call expression.

    if (
      read.parentNode.type === 'CallExpression' &&
      read.parentProp === 'arguments' && // it's a certain crash otherwise
      read.parentIndex === 1 && // We are dotcalling a method on the array, yes? Not just passing it as an argument
      read.parentNode.callee.type === 'Identifier' &&
      read.parentNode.callee.name === SYMBOL_DOTCALL
    ) {
      // This is calling a member on the array and can resolve certain cases.

      const args = read.parentNode.arguments;
      const funcNameNode = args[0];
      const contextNode = args[1];
      ASSERT(funcNameNode && contextNode, 'we control $dotcall, we should be able to assert its first three args', read.parentNode);
      //const prop = args[2]; // Unused
      const rest = args.slice(3);

      if (funcNameNode.type !== 'Identifier') return vlog('- bail: dotcall is not calling an ident, this can only end bad', funcNameNode);

      vlog(`- Inspecting a $dotCall that calls ${funcNameNode.name}`);

      switch (funcNameNode.name) {
        case symbo('array', 'concat'): {
          // We can only concat array expressions. We need to be certain that they're unchanged between write and read.
          // We also need to make sure they don't use spreads.
          // Concat is generic and anything that is spreadable will be spread so we can only support builtins we know.
          // arrays and strings can spread, other primitives are not, we will bail for other or unknown kinds of values.

          if (!arrNode.elements.every(enode => !enode || AST.isPrimitive(enode))) {
            vlog('- array was not just primitives, verifying alt transform...');

            const block = read.blockBody;
            const index = read.blockIndex;

            const writes = [];

            // Verify whether arrays are back to back and only containing consts. In that case it should be safe to create
            // a new array with those references, since the value they reference cannot change, even if its state mutates.
            // We can expand on this detection later if we need to.
            const arrNodes = [contextNode, ...rest];
            if (!arrNodes.every(arrIdNode => {
              vlog('  - array', [arrIdNode.name], arrIdNode.type);
              if (arrIdNode.type !== 'Identifier') return false; // You can pass on anything to .concat() so why not
              const meta = fdata.globallyUniqueNamingRegistry.get(arrIdNode.name);
              vlog('  -', meta.isConstant, meta.writes.length, meta.writes[0]?.parentNode?.init.type);
              if (!meta.isConstant || meta.writes.length !== 1) return false;
              const write = meta.writes[0];
              const arrNode = write.parentNode.init;
              if (arrNode.type !== 'ArrayExpression') return false;
              vlog('    - node ok, now check the array elements');
              // Ok, now validate this array
              if (!arrNode.elements.every(enode => {
                if (!enode) return true;
                if (AST.isPrimitive(enode)) return true;
                if (enode.type !== 'Identifier') return false;
                const meta = fdata.globallyUniqueNamingRegistry.get(enode.name);
                if (!meta?.isConstant || meta.writes.length !== 1) return false;
                return true; // it's a constant... do we care about anything else here?
              })) {
                return false;
              }
              vlog('    - array seems ok, is it next to the call?');
              // Does the array immediately precede this concat call? We need to be sure that idents in them are accessible.
              // The heuristic is a simple one; must appear next to the statement with the call. Only allow var statements
              // between it with functions or arrays (without rest).
              if (write.blockBody !== block) return false; // Not in same block scope
              if (write.blockIndex > index) return false; // The array const appears afterwards? huh. Super tdz.
              let n = index;
              while (--n > write.blockIndex) { // Do not check the array itself. Assume it bails before, or else it's ok.
                if (block[n].type !== 'VarStatement') break;
                const init = block[n].init;
                if (init.type === 'ArrayExpression') {
                  // Must assert that this array does not contain spread
                  if (init.elements.some(enode => enode?.type === 'SpreadElement')) return false;
                }
                else if (!['FunctionExpression'].includes(block[n].init.type) && !AST.isPrimitive(block[n].init)) {
                  break;
                }
              }
              vlog('    - array accepted.');
              // This array should be ok:
              // - only contains primitives or idents
              // - any ident would be a constant
              // - array should be immutable between decl and this call
              // This should mean the array is safe to duplicate, which is what we want
              writes.push(write);
              return true;
            })) {
              vlog('- bail: at least one arr contained a bad element or was not safe');
              return false;
            }

            // Looks like the arrays are safe to duplicate into a single array. Let's go...
            // Clone the nodes, keep order (that's important).
            // The old arrays may be removed if they are only used in this call, or not. Either is fine.

            rule('Concat of arrays with prims or constants should be safe to clone into a single array');
            example(
              'const x = $(); const a = [x, 1, 2]; const b = [3, x, 4]; $(a.concat(b))',
              'const x = $(); const a = [x, 1, 2]; const b = [3, x, 4]; $([x, 1, 2, 3, x, 4])',
            );
            writes.map(write => before(write.blockBody[write.blockIndex])); // The arrays being concat
            before(block[index]); // The call itself

            const newNode = AST.arrayExpression();
            writes.forEach(write => write.parentNode.init.elements.forEach(enode => newNode.elements.push(AST.cloneSimple(enode))));
            if (read.grandIndex < 0) read.grandNode[read.grandProp] = newNode;
            else read.grandNode[read.grandProp][read.grandIndex] = newNode;

            after(block[index]); // The call itself
            updated += 1;
            return true;
          }

          const arr = arrNode.elements.slice(0).map(a => AST.cloneSimple(a));

          for (let index=0; index<rest.length; ++index) {
            const anode = rest[index];

            if (!anode) {
              arr.push(anode);
            }
            else if (AST.isPrimitive(anode)) {
              const value = AST.getPrimitiveValue(anode);
              if (typeof value === 'string') {
                arr.push(Array.from(value).map(a => AST.primitive(a)));
              } else {
                arr.push(AST.primitive(value));
              }
            }
            else if (anode.type === 'Identifier') {
              const meta = fdata.globallyUniqueNamingRegistry.get(anode.name);
              if (
                meta.isConstant &&
                meta.varDeclRef?.node?.type === 'ArrayExpression' &&
                meta.writes.length === 1 &&
                meta.varDeclRef?.node.elements.every(enode => !enode || AST.isPrimitive(enode))
              ) {
                const ref = meta.writes[0];
                let noopBetween = index === 0 || write.blockBody === ref.blockBody && write.blockIndex + 1 === ref.blockIndex;
                if (!noopBetween) {
                  for (let i=write.blockIndex+1; i<=read.blockIndex; ++i) {
                    if (i === read.blockIndex) {
                      noopBetween = true;
                      break;
                    }
                    // We can expand on this but there's not that much meat on the bone for other statements here.
                    if (write.blockBody[i].type !== 'VarStatement') break;
                    // There's not many things that are absolutely safe. But we can also support array/object/class here as
                    // well as some cases of unary/binary expression when we know the args are prims.
                    if (write.blockBody[i].init.type !== 'FunctionExpression' && !AST.isPrimitive(write.blockBody[i].init)) break;
                  }
                }
                if (noopBetween) {
                  for (let i=0; i<meta.varDeclRef.node.elements.length; ++i) {
                    const e = meta.varDeclRef.node.elements[i];
                    if (!e) arr.push(e);
                    else arr.push(AST.cloneSimple(e));
                  }
                } else {
                  return vlog('- bail: at least one arg to concat was not an array with just primitives');
                }
              }
              else {
                return vlog('- bail: at least one arg to concat was not an array ref that met the requirements', meta.isConstant, meta.varDeclRef?.node?.type);
              }
            }
            else {
              // ??
              todo('what else is an arg to array_concat?', anode);
              return vlog('At least one concat arg is not a primitive or ident', anode.type);
            }
          }

          // If it reaches here then we can replace the concat call with a fresh array with arr elements

          rule('When we can resolve array concat, we should');
          example('const arr = [1, 2]; const y = arr.concat("abc", [3, , 5], "xyz");', 'const arr = [1, 2]; const y = [1, 2, "a", "b", "c", 3, , 5, "x", "y", "z"];');
          before(write.blockBody[write.blockIndex]);
          before(read.blockBody[read.blockIndex]);

          const newNode = AST.arrayExpression(arr);
          if (read.grandIndex < 0) read.grandNode[read.grandProp] = newNode;
          else read.grandNode[read.grandProp][read.grandIndex] = newNode;

          after(write.blockBody[write.blockIndex]);
          after(read.blockBody[read.blockIndex]);
          updated += 1;
          break;
        }
        case symbo('array', 'join'): {
          // We can do this when:
          // - the array is read only once, or when we can guarantee it is not accessed between the decl and this read
          // - the first argument of the call can be fully resolved (we currently only support the trivial isPrimitive check)
          // - the concrete values of all elements of the array can be resolved
          // Note that this is a dotcall and the first real arg is at index 3
          if (rest[0] && !AST.isPrimitive(rest[0])) {
            todo('calling $array_join when the first arg is not a primitive');
          }
          else if (arrNode.elements.some(e => e && !AST.isPrimitive(e))) {
            todo('calling $array_join when the array is not just primitives');
          }
          else {
            // Must do it in a queue to preserve tdz order in excessive args
            queue.push({
              index: read.blockIndex,
              func: () => {
                rule('Calling array.join on an array that contains only primitives, with a known argument, can resolve to a string');
                example('[1, 2, "a", 3].join("yo")', '"1yo2yoayo3"');
                before(write.blockBody[write.blockIndex]);
                before(read.blockBody[read.blockIndex]);

                const str = arrNode.elements
                  .map(e => e ? AST.getPrimitiveValue(e) : '')
                  .join(rest[0] ? AST.getPrimitiveValue(rest[0]) : ',');
                // Now replace the call with this string literal

                const newNode = AST.primitive(str);
                if (read.grandIndex < 0) read.grandNode[read.grandProp] = newNode;
                else read.grandNode[read.grandProp][read.grandIndex] = newNode;

                // Clone all the nodes, inc the actual params, because they may tdz all the same
                read.blockBody.splice(read.blockIndex, 0, ...rest.map(anode => AST.expressionStatement(AST.cloneSimple(anode))))

                after(write.blockBody[write.blockIndex]);
                after(read.blockBody[read.blockIndex]);
                ++updated;
              }
            })
            return true;
          }
          break;
        }
        case symbo('array', 'pop'): {
          // If this is an ident then it's not safe to copy the reference here without more checks:
          // - `const arr = [x]; x = 5; $(arr.shift());` should print the previous value of x, not 5.
          if (!arrNode.elements.length || AST.isPrimitive(arrNode.elements[arrNode.elements.length - 1])) {
            rule('Calling .pop on an array literal we can fully track can be resolved');
            example('const arr = [1, 2, 3]; arr.pop();', 'const arr = [1, 2]; 3;');
            before(write.blockBody[write.blockIndex]);
            before(read.blockBody[read.blockIndex]);

            // - an empty array can be popped, simply returns undefined
            // - an elided element can still be popped, returns undefined
            // - array already asserted not to contain spread
            const firstArrNode = arrNode.elements.pop() || AST.undef();

            todo('outline any args for tdz');
            if (read.grandIndex < 0) read.grandNode[read.grandProp] = firstArrNode;
            else read.grandNode[read.grandProp][read.grandIndex] = firstArrNode;

            after(write.blockBody[write.blockIndex]);
            after(read.blockBody[read.blockIndex]);
            updated += 1;
            return;
          } else {
            todo('array_popping an ident');
            return;
          }
        }
        case symbo('array', 'push'): {
          // Keep in mind array.push returns the length of the array afterwards, which is
          // always (?) arr.length + the number of arguments. So we should always replace the
          // actual call with a sequence ending with that number. Other parts will eliminate it.

          // We can only push primitives. Example why idents are unsafe without further checks:
          // - `let x = a; const arr[]; x = b; arr.push(x);` , we want arr to be [b], not [a].

          // Exception to that is when there can be no spies between the write and the read.
          // For example when they are back to back or there are only certain var decls between them.
          let noopBetween = write.blockBody === read.blockBody && write.blockIndex + 1 === read.blockIndex;
          if (!noopBetween) {
            for (let i=write.blockIndex+1; i<=read.blockIndex; ++i) {
              if (i === read.blockIndex) {
                noopBetween = true;
                break;
              }
              // We can expand on this but there's not that much meat on the bone for other statements here.
              if (write.blockBody[i].type !== 'VarStatement') break;
              // There's not many things that are absolutely safe. But we can also support array/object/class here as
              // well as some cases of unary/binary expression when we know the args are prims.
              if (write.blockBody[i].init.type !== 'FunctionExpression' && !AST.isPrimitive(write.blockBody[i].init)) break;
            }
          }
          vlog('- back2back=', noopBetween);
          while (args.length > 3 && (AST.isPrimitive(args[3]) || (args[3].type !== 'SpreadElement' && noopBetween))) {
            // Remove the first param from the call and append it to the array literal

            rule('Push on an array literal with first element a primitive should move the node');
            example('const arr = [1, 2]; arr.push("a", "b");', 'const arr = [1, 2, "a"]; f(arr.push("b"));');
            before(write.blockBody[write.blockIndex]);
            before(read.blockBody[read.blockIndex]);

            arrNode.elements.push(args[3]);
            args.splice(3, 1); // Note: this is rest.shift()

            after(write.blockBody[write.blockIndex]);
            after(read.blockBody[read.blockIndex]);
            ++updated;
          }

          // If, after resolving the push as much as possible, there are now no args left in the .push(), replace it with the arr length
          if (args.length === 3) {
            rule('Array push without arguments can be replaced with the arg len');
            example('const arr = [1, 2, 3]; count = arr.push();', 'const arr = [1, 2, 3]; count = 3;');
            before(write.blockBody[write.blockIndex]);
            before(read.blockBody[read.blockIndex]);

            if (read.grandIndex < 0) read.grandNode[read.grandProp] = AST.primitive(arrNode.elements.length);
            else read.grandNode[read.grandProp][read.grandIndex] = AST.primitive(arrNode.elements.length);

            after(write.blockBody[write.blockIndex]);
            after(read.blockBody[read.blockIndex]);
            ++updated;
          } else if (read.blockBody[read.blockIndex].type !== 'ExpressionStatement') {
            // There are args left so the push cannot be eliminated. But we can predict the final length, right?
            // - `const arr = []; arr.push(1, 2, a, b, 3);` the final len would always be 5 regardless of what's being pushed.

            if (args.every(anode => anode.type !== 'SpreadElement')) {
              queue.push({
                index: read.blockIndex,
                func: () => {
                  rule('Array push on known array that cannot be eliminated can still have its final len inlined');
                  example('const arr = []; const y = arr.push(a); $(y);', 'const arr = []; arr.push(a); const y = 1; $(y);');
                  before(write.blockBody[write.blockIndex]);
                  before(read.blockBody[read.blockIndex]);

                  const finalLen = arrNode.elements.length + (args.length-3);
                  const newNode = AST.primitive(finalLen);
                  if (read.grandIndex < 0) read.grandNode[read.grandProp] = newNode;
                  else read.grandNode[read.grandProp][read.grandIndex] = newNode;

                  // Move the push call
                  read.blockBody.splice(read.blockIndex, 0, AST.expressionStatement(read.parentNode));

                  after(write.blockBody[write.blockIndex]);
                  after(read.blockBody[read.blockIndex]);
                  ++updated;
                }
              });
            } else {
              // The push args contained a spread. If we can't resolve that then we probably can't resolve its length either.
            }
          } else {
            // Ignore expression statement that is a push call. We've done all we can at this point.
          }

          break;
        }
        case symbo('array', 'reverse'): {
          rule('Calling .reverse on an array literal without changes in between can be resolved');
          example('const arr = [1, 2, 3]; const y = arr.reverse();', 'const arr = [3, 2, 1]; const y = arr;');
          before(write.blockBody[write.blockIndex]);
          before(read.blockBody[read.blockIndex]);

          // .reverse() returns the array it mutated so we should be able to leave the context
          if (read.grandIndex < 0) read.grandNode[read.grandProp] = contextNode;
          else read.grandNode[read.grandProp][read.grandIndex] = contextNode;

          arrNode.elements.reverse();

          if (rest.length) {
            queue.push({
              index: read.blockIndex,
              func: () => {
                // Prepend all args of the call as statements, that should preserve tdz semantics.
                read.blockBody.splice(read.blockIndex, 0, ...rest.map(anode => AST.expressionStatement(AST.cloneSimple(anode))));
              }
            })
          }

          after(write.blockBody[write.blockIndex]);
          after(read.blockBody[read.blockIndex]);
          updated += 1;
          return;
        }
        case symbo('array', 'shift'): {
          // If this is an ident then it's not safe to copy the reference here without more checks:
          // - `const arr = [x]; x = 5; $(arr.shift());` should print the previous value of x, not 5.
          if (!arrNode.elements.length || AST.isPrimitive(arrNode.elements[arrNode.elements.length - 1])) {
            // If the shifted element is not an ident, we don't need to statementify the array elements.
            rule('Calling .shift on an array literal we can fully track can be resolved');
            example('const arr = [1, 2, 3]; arr.shift();', 'const arr = [2, 3]; 1;');
            before(write.blockBody[write.blockIndex]);
            before(read.blockBody[read.blockIndex]);

            // - an empty array can be shifted, simply returns undefined
            // - an elided element can still be shifted, returns undefined
            // - array already asserted not to contain spread
            const firstArrNode = arrNode.elements.shift() || AST.undef();

            todo('outline any args for tdz');
            if (read.grandIndex < 0) read.grandNode[read.grandProp] = firstArrNode;
            else read.grandNode[read.grandProp][read.grandIndex] = firstArrNode;

            after(write.blockBody[write.blockIndex]);
            after(read.blockBody[read.blockIndex]);
            updated += 1;
            return;
          } else {

            todo('array_shifting an ident');
            return;

            //// Must queue because we must retain evaluation order of array elements. As such, the first element,
            //// which is "popped", should still get evaluated first. So we create a bunch of expr statements for them.
            //queue.push({
            //  index: read.blockIndex,
            //  func: () => {
            //    rule('Calling .shift on an array literal we can fully track can be resolved');
            //    example('const arr = [a, b, c]; f(arr.shift()); f(arr);', 'a; b; c; const arr = [b, c]; f(a); f(arr);');
            //    before(write.blockBody[write.blockIndex]);
            //    before(read.blockBody[read.blockIndex]);
            //
            //    // But if this is indeed an ident then this is not safe, right?
            //    // - `const arr = [x]; x = 5; $(arr.shift());` should print the previous value of x, not 5.
            //    const firstArrNode = arrNode.elements.shift();
            //
            //    if (read.grandIndex < 0) read.grandNode[read.grandProp] = firstArrNode;
            //    else read.grandNode[read.grandProp][read.grandIndex] = firstArrNode;
            //
            //    // Now must inject the array arg elements as statements to retain original tdz order
            //    read.blockBody.splice(
            //      read.blockIndex,
            //      0,
            //      ...arrNode.elements.map(enode => AST.expressionStatements(enode ? AST.cloneSimple(enode) : AST.undef()))
            //    );
            //
            //    after(write.blockBody[write.blockIndex]);
            //    after(read.blockBody[read.blockIndex]);
            //  }
            //});
            //updated += 1;
            //return;
          }
        }
        case symbo('array', 'slice'): {
          if (
            // We only need up to the first two arguments. The rest is not relevant to the call
            // Note that this is a $dotCall so the first three are for $dotCall, the next two are for slice
            (rest.length === 0 || AST.isPrimitive(rest[0])) &&
            (rest.length === 1 || AST.isPrimitive(rest[1])) &&
            // Idents are tricky because their refs may have changed between the original array literal and this slice
            arrNode.elements.every(enode => !enode || AST.isPrimitive(enode))
          ) {
            // Doing an array.slice on an array literal is predictable
            // Must queue it to preserve tdz issues in excessive args
            queue.push({
              index: read.blockIndex,
              func: () => {
                rule('Array slice on a binding known to be an array literal containing primitives can be copied');
                example(
                  `const arr = [1, 2, undefined, "foo"]; f(); $(${SYMBOL_DOTCALL}(${symbo('array', 'slice')}, arr, "prop", 0));`,
                  'const arr = [1, 2, undefined, "foo"]; f(); $([1, 2, undefined, "foo"]);'
                );
                example(
                  `const arr = [1, 2, undefined, "foo"]; f(); $(${SYMBOL_DOTCALL}(${symbo('array', 'slice')}, arr, "prop", 1));`,
                  'const arr = [1, 2, undefined, "foo"]; f(); $([2, undefined, "foo"]);'
                );
                example(
                  `const arr = [1, 2, undefined, "foo"]; f(); $(${SYMBOL_DOTCALL}(${symbo('array', 'slice')}, arr, "prop", 1, 3));`,
                  'const arr = [1, 2, undefined, "foo"]; f(); $([2, undefined]);'
                );
                before(write.blockBody[write.blockIndex]);
                before(read.blockBody[read.blockIndex]);

                const clone = AST.arrayExpression(
                  arrNode.elements
                  .slice(
                    rest[0] ? AST.getPrimitiveValue(rest[0]) : undefined,
                    rest[1] ? AST.getPrimitiveValue(rest[1]) : undefined
                  )
                  .map(e => e && AST.cloneSimple(e))
                );

                if (read.grandIndex < 0) read.grandNode[read.grandProp] = clone;
                else read.grandNode[read.grandProp][read.grandIndex] = clone;

                // Clone all the nodes, inc the actual params, because they may tdz all the same
                read.blockBody.splice(read.blockIndex, 0, ...rest.map(anode => AST.expressionStatement(AST.cloneSimple(anode))))

                after(write.blockBody[write.blockIndex]);
                after(read.blockBody[read.blockIndex]);
                ++updated;
              }
            })
            return;
          } else {
            return vlog('- bail: either the first two args are not primitives or an element in the array is not, slicing is unsafe');
          }
        }
        case symbo('array', 'splice'): {
          if (rest.every(anode => AST.isPrimitive(anode))) {
            rule('Calling .splice on an array literal we can fully track can be resolved');
            example('const arr = [1, 2, 3]; arr.splice(1, 1, a, b);', 'const arr = [1, a, b, 3]; [2];');
            before(write.blockBody[write.blockIndex]);
            before(read.blockBody[read.blockIndex]);

            const splicedNodes = arrNode.elements.splice(
              rest[0] ? AST.getPrimitiveValue(rest[0]) : 0,
              rest[1] ? AST.getPrimitiveValue(rest[1]) : 0,
              ...rest.slice(2)
            );

            const newNode = AST.arrayExpression(...splicedNodes);
            if (read.grandIndex < 0) read.grandNode[read.grandProp] = newNode;
            else read.grandNode[read.grandProp][read.grandIndex] = newNode;

            after(write.blockBody[write.blockIndex]);
            after(read.blockBody[read.blockIndex]);
            updated += 1;
            return;
          } else {
            return vlog('- bail: not all args of the splice are primitives');
          }
        }
        case symbo('array', 'toString'): {
          // Same logic as .join() except with fixed string ','
          // We can do this when:
          // - the array is read only once, or when we can guarantee it is not accessed between the decl and this read
          // - the first argument of the call can be fully resolved (we currently only support the trivial isPrimitive check)
          // - the concrete values of all elements of the array can be resolved
          // Note that this is a dotcall and the first real arg is at index 3
          if (arrNode.elements.some(e => e && !AST.isPrimitive(e))) {
            todo('calling $array_tostring when the array is not just primitives');
          }
          else {
            // Must do it in a queue to preserve tdz order in excessive args
            queue.push({
              index: read.blockIndex,
              func: () => {
                rule('Calling array.toString on an array that contains only primitives, with a known argument, can resolve to a string');
                example('[1, 2, "a", 3].toString()', '"1,2,a,3"');
                before(write.blockBody[write.blockIndex]);
                before(read.blockBody[read.blockIndex]);

                const str = arrNode.elements
                  .map(e => e ? AST.getPrimitiveValue(e) : '')
                  .join(',');
                // Now replace the call with this string literal

                const newNode = AST.primitive(str);
                if (read.grandIndex < 0) read.grandNode[read.grandProp] = newNode;
                else read.grandNode[read.grandProp][read.grandIndex] = newNode;

                // Clone all the nodes, inc the actual params, because they may tdz all the same
                read.blockBody.splice(read.blockIndex, 0, ...rest.map(anode => AST.expressionStatement(AST.cloneSimple(anode))))

                after(write.blockBody[write.blockIndex]);
                after(read.blockBody[read.blockIndex]);
                ++updated;
              }
            })
            return true;
          }
          break;
        }
        case symbo('array', 'unshift'): {
          // Keep in mind array.unshift returns the length of the array afterwards, which is
          // always (?) arr.length + the number of arguments. So we should always replace the
          // actual call with a sequence ending with that number. Other parts will eliminate it.

          while (args.length > 3 && AST.isPrimitive(args[args.length - 1])) {
            // Remove the first param from the call and append it to the array literal

            rule('Unshift on an array literal with first element simple should move the node');
            example('const arr = [100]; arr.unshift(1, 2, 3));', 'const arr = [3, 100]; arr.unshift(1, 2)');
            before(write.blockBody[write.blockIndex]);
            before(read.blockBody[read.blockIndex]);

            arrNode.elements.unshift(args.pop());

            after(write.blockBody[write.blockIndex]);
            after(read.blockBody[read.blockIndex]);
            ++updated;
          }

          // If, after resolving the unshift as much as possible, there are now no args left in the .unshift(), replace it with the arr length
          if (args.length === 3) {
            rule('Array unshift without arguments can be replaced with the (final) arg count');
            example('const arr = [1, 2, 3]; const count = arr.unshift();', 'const arr = [1, 2, 3]; const count = 3;');
            before(write.blockBody[write.blockIndex]);
            before(read.blockBody[read.blockIndex]);

            if (read.grandIndex < 0) read.grandNode[read.grandProp] = AST.primitive(arrNode.elements.length);
            else read.grandNode[read.grandProp][read.grandIndex] = AST.primitive(arrNode.elements.length);

            after(write.blockBody[write.blockIndex]);
            after(read.blockBody[read.blockIndex]);
            ++updated;
          } else if (read.blockBody[read.blockIndex].type !== 'ExpressionStatement') {
            // There are args left so the push cannot be eliminated. But we can predict the final length, right?
            // - `const arr = []; arr.push(1, 2, a, b, 3);` the final len would always be 5 regardless of what's being pushed.

            if (args.every(anode => anode.type !== 'SpreadElement')) {
              queue.push({
                index: read.blockIndex,
                func: () => {
                  rule('Array unshift on known array that cannot be eliminated can still have its final len inlined');
                  example('const arr = []; const y = arr.unshift(a); $(y);', 'const arr = []; arr.unshift(a); const y = 1; $(y);');
                  before(write.blockBody[write.blockIndex]);
                  before(read.blockBody[read.blockIndex]);

                  const finalLen = arrNode.elements.length + (args.length-3);
                  const newNode = AST.primitive(finalLen);
                  if (read.grandIndex < 0) read.grandNode[read.grandProp] = newNode;
                  else read.grandNode[read.grandProp][read.grandIndex] = newNode;

                  // Move the push call
                  read.blockBody.splice(read.blockIndex, 0, AST.expressionStatement(read.parentNode));

                  after(write.blockBody[write.blockIndex]);
                  after(read.blockBody[read.blockIndex]);
                  ++updated;
                }
              });
            } else {
              // The unshift args contained a spread. If we can't resolve that then we probably can't resolve its length either.
            }
          } else {
            // Ignore expression statement that is a shift call. We've done all we can at this point.
          }
          break;
        }
        default: {
          // Certain methods are a no-go but there's probably a few missing here that we can do
          todo(`arr mutation may be able to inline this method: ${funcNameNode.name}`);
        }
      }

      //de method calls moeten worden omgezet in static func calls
      //deze lijst moet naar beneden worden geschoven want de afstand tussen read en write moeten nog bevestigd worden
      //als die niet spied dan is het goed. en dan hebben we alsnog een lange weg te gaan.

    }

  }
}
