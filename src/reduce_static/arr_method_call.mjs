// Look for array methods that we can transform into loops without knowing the actual structure of the array.
//
// We would look for $array_some symbols and simply transform them to loops, without validation of the context.
// (In cases where the structure might be known, this can lead to improved loop unrolling or even complete resolving!)
//
//    `const arr = [1, 2, 3]; arr.forEach($);`
// ->
//    `const arr = [2, 3, 4]; let n = 0; for (const x of arr) $.call(undefined, x, n++, arr);` (simplified)
//
// Will do this for various array lambda methods or methods that loop over the array.
//

import { ASSERT, log, group, groupEnd, vlog, vgroup, vgroupEnd, rule, example, before, source, after, fmat, tmat, coerce, findBodyOffset, todo } from '../utils.mjs';
import * as AST from '../ast.mjs';
import { SYMBOL_DOTCALL } from '../symbols_preval.mjs';
import { BUILTIN_SYMBOLS, symbo } from '../symbols_builtins.mjs';
import { createFreshVar } from '../bindings.mjs';

export function arrMethodCall(fdata) {
  group('\n\n\n[arrMethodCall] Checking for array method calls to inline');
  //currentState(fdata, 'arrMethodCall', true, fdata);
  const r = _arrMethodCall(fdata);
  groupEnd();

  return r;
}
function _arrMethodCall(fdata) {
  const queue = [];

  let updated = processAttempt(fdata, queue);

  log('');
  if (updated) {
    queue.sort(({index: a}, {index: b}) => b-a);
    queue.forEach(({func}) => func());

    log('Array methods inlined:', updated, '. At least one change requires a restart to phase1');
    return {what: 'arrMethodCall', changes: updated, next: 'phase1'};
  }
  log('Array methods inlined: 0.');
}

function processAttempt(fdata, queue) {
  // Find arrays where the first read is a method call

  let changes = 0;

  fdata.globallyUniqueNamingRegistry.forEach((meta, varName) => {
    if (!meta.isConstant) return;
    if (!meta.reads.length) return;
    if (meta.writes.length !== 1) return;

    const arrNode = meta.varDeclRef.node;
    if (arrNode.type !== 'ArrayExpression') return;

    // There are two major paths here now.
    // One is where the array is completely known and immutable and we may be
    // able to roll up the method call entirely, like resolving concat or join.
    // The other is where the contents of the array is irrelevant to tackle the
    // method. I think the loop methods are a worthy candidate since there the
    // contents of the array is completely irrelevant to the transform.
    // Our priority should be with eliminating functions because closures make
    // it harder for preval, not easier. Let's start with looking for anything
    // that does not need to know the contents of the array.

    // Start with collecting the methods and other usages.

    const list = []; // {read:Read, method:string}
    meta.reads.forEach(read => {
      if (read.parentNode.type === 'MemberExpression') {
        if (read.grandNode.type === 'AssignmentExpression' && read.grandProp === 'left') {
          // assignment to property
        } else if (read.grandNode.type === 'UnaryExpression' && read.grandProp === 'argument') {
          // deleting a property
        } else {
          // reading a property (I think there aren't any other use cases left in normalized code)
        }
      }
      else if (read.parentNode.type === 'CallExpression') {
        if (
          read.parentNode.callee.type === 'Identifier' &&
          read.parentNode.callee.name === SYMBOL_DOTCALL &&
          read.parentProp === 'arguments' &&
          read.parentIndex === 1
        ) {
          // Context of a method call
          // This is our target. Now we must hope that the function is already a preval symbol. Otherwise we defer.
          if (read.parentNode.arguments[0].type === 'Identifier') {
            const methodName = read.parentNode.arguments[0].name;
            const symb = BUILTIN_SYMBOLS.get(methodName);
            if (symb?.typings.mustBeType === 'function') { // Skip properties
              list.push({read, method: methodName});
            }
          }
        }
        else {
          // Array escapes.
          // Anything else means the array was passed in as an argument (or "function" but that is meh) of a function call
        }
      }
      else {
        // Array escapes. Used in assignment, init, or random (/bogus) unary/binary operation?
      }
    });

    if (!list.length) return;

    vlog('Found these methods:', list.map(({method}) => method));

    // Fingers crossed but as far as I can see this transform is safe. An array.forEach is equivalent
    // to a simple for(i<len) loop. Other variants (some, reduce) just change how the callback is called
    // or how the result is handled.
    // Since the arg will be a function, we just have to call the function appropriately.
    // Even async and generators are not our problem here as the lambda methods always call them as regular functions.

    list.forEach(({read, method}) => {
      switch (method) {
        case symbo('array', 'forEach'): {
          rule('array.forEach can be converted to regular loops');
          example('const x = arr.forEach(func);', 'let tmplen = arr.length; let tmp = 0; while (true) { if (tmp < tmplen) if (i in arr) { func(arr[i], i, arr); i = i + 1; } else { break; } const x = undefined; }');
          example('arr.forEach.call(arr, func);', 'let tmplen = arr.length; let tmp = 0; while (true) { if (tmp < tmplen) { if (i in arr) func(arr[i], i, arr); i = i + 1; } else { break; } }');
          example('x = arr.forEach(func, ctx);', 'let tmplen = arr.length; let tmp = 0; while (true) { if (tmp < tmplen) { if (i in arr) func.call(ctx, arr[i], i, arr); i = i + 1; } else { break; } x = undefined; }');
          example('arr.forEach.call(arr, func, ctx);', 'let tmp = 0; while (true) { if (tmp < tmplen) { if (i in arr) func.call(ctx, (arr[i], i, arr); i = i + 1; } else { break; } }');
          before(read.blockBody[read.blockIndex]);

          // When this is an assignment or var init the transform first needs to move that to an undefined, as that's what forEach always returns.
          // We can do that in the same step here, var decl can go into the block too. We flatten it afterwards anyways so it should be risk free.
          // `const x = arr.forEach()` -> `arr.forEach(); const x = undefined;` the decl goes after (somewhat relevant for tdz but that's it)

          const stmt = read.blockBody[read.blockIndex];

          const tmplen = createFreshVar('tmpArrlen', fdata);
          const tmp = createFreshVar('tmpArri', fdata);
          const tmp2 = createFreshVar('tmpArrc', fdata);
          const tmp3 = createFreshVar('tmpArrin', fdata);
          const tmp4 = createFreshVar('tmpArrel', fdata);

          const stmts = [
            // let tmp = 0;
            AST.varStatement('const', tmplen, AST.memberExpression(varName, 'length', false)),
            AST.varStatement('let', tmp, AST.primitive(0)),
            // while (true) { const tmp2 = tmp < arr.length; if (tmp2) { const tmp3 = i in arr; if (tmp3) func(arr[i], i, arr); tmp = tmp  + 1; } else { break; } }
            // while (true) { const tmp2 = tmp < arr.length; if (tmp2) { const tmp3 = i in arr; if (tmp3) func.call(ctx, arr[i], i, arr); tmp = tmp  + 1; } else { break; } }
            AST.whileStatement(
              AST.tru(),
              AST.blockStatement(
                AST.varStatement('const', tmp2, AST.binaryExpression('<', tmp, tmplen)),
                AST.ifStatement(
                  tmp2,
                  AST.blockStatement(
                    //  Note: this is `{ if (i in arr) callback() } i = i + 1;`, so the increment happens regardless of `i in arr`.
                    AST.varStatement('const', tmp3, AST.binaryExpression('in', tmp, varName)),
                    AST.ifStatement(
                      AST.identifier(tmp3),
                      AST.blockStatement(
                        AST.varStatement('const', tmp4, AST.memberExpression(varName, AST.identifier(tmp), true)), // the current element
                        AST.expressionStatement(
                          AST.callExpression(
                            // either call the callback (`func(arr[i], i, arr)`) or .call with context (`func.call(ctx, arr[i], i, arr)`)
                            // Note: forEach forcefully calls the callback with undefined so we must dotcall and let another rule simplify that when `this` is not used
                            // Note: the call is a dotcall so at least three params
                            SYMBOL_DOTCALL,
                            [
                              read.parentNode.arguments[3], // callback arg (after 3 $dotcall args!)
                              read.parentNode.arguments[4] || AST.undef(), // context arg (after 3 $dotcall args!)
                              AST.undef(),
                              AST.identifier(tmp4),
                              AST.identifier(tmp), // current index
                              AST.identifier(varName), // array being iterated
                            ]
                          )
                        )
                      ),
                      AST.blockStatement(),
                    ),
                    // tmp = tmp + 1
                    AST.expressionStatement(
                      AST.assignmentExpression(tmp, AST.binaryExpression('+', tmp, AST.primitive(1)))
                    )
                  ),
                  AST.blockStatement(
                    AST.breakStatement()
                  ),
                )
              )
            ),
            // If the input was an assignment, assign undefined to it now (afterwards).
            ... (stmt.type === 'ExpressionStatement' && stmt.expression.type === 'AssignmentExpression') ?
              [AST.expressionStatement(AST.assignmentExpression(stmt.expression.left, AST.undef()))] : [],
            // If the input was a var statement, create it with undefined now.
            ... (stmt.type === 'VarStatement') ?
              [AST.varStatement(stmt.kind, stmt.id, AST.undef())] : [],
          ];

          read.blockBody[read.blockIndex] = AST.blockStatement(stmts);
          // Squash the block at the end of this transform
          queue.push({index: read.blockIndex, func: () => read.blockBody.splice(read.blockIndex, 1, ...stmts)})

          after(read.blockBody[read.blockIndex]);
          changes += 1;
          return;
        }
        case symbo('array', 'some'): {
          rule('array.some can be converted to regular loops');
          // See forEach for more examples
          example(
            'const x = arr.some(func);',
            // Note: for assignments; x should be set afterwards to cover try/catch logic.
            'let tmplen = arr.length; let tmp = 0; let result = false; while (true) { if (tmp < tmplen) if (i in arr) { if (func(arr[i], i, arr)) { result = true; break; } i = i + 1; } else { break; } } const x = result;'
          );
          before(read.blockBody[read.blockIndex]);

          // - main transform is same as forEach. same args/context logic.
          // - callback return value is boolean checked, a truthy result ends the loop
          // - result has three cases: expr, assign, var
          //   - var: create a let with same name. init to false. update to true inside loop when appropriate
          //   - assign: create tmp var to hold result. after loop assign tmp result to original lhs. this preserves try/catch logic.
          //   - expr: ignore result. don't store it.

          const stmt = read.blockBody[read.blockIndex];

          const tmplen = createFreshVar('tmpArrlen', fdata);
          const tmp = createFreshVar('tmpArri', fdata);
          const tmp2 = createFreshVar('tmpArrc', fdata);
          const tmp3 = createFreshVar('tmpArrin', fdata);
          const tmp4 = createFreshVar('tmpArrel', fdata);
          const tmp5 = createFreshVar('tmpArreout', fdata);
          const tmp6 = createFreshVar('tmpArrenow', fdata);

          const stmts = [
            // `const len = arr.length;`
            AST.varStatement('const', tmplen, AST.memberExpression(varName, 'length', false)),
            // `let counter = 0;`
            AST.varStatement('let', tmp, AST.primitive(0)),
            // `let result = false;` // empty array.some() is false, too
            AST.varStatement('let', tmp5, AST.fals()),
            // Transform to normalized code such that we don't have to go through normalization first...:
            // while (true) {
            //   const tmp2 = tmp < arr.length;
            //   if (tmp2) {
            //     const tmp3 = i in arr;
            //     if (tmp3) {
            //       const tmp = func(arr[i], i, arr); // invocation is different for context case
            //       if (tmp) {
            //         result = true;
            //         break;
            //       }
            //     }
            //     counter = counter  + 1;
            //   } else {
            //     break;
            //   }
            // }
            // const x = result;     // <-- this may be optimized depending on expr/assign/var but not sure we should bother in favor of simplicity...
            AST.whileStatement(
              AST.tru(),
              AST.blockStatement(
                // `const test = counter < arr.length; if (test)`
                AST.varStatement('const', tmp2, AST.binaryExpression('<', tmp, tmplen)),
                AST.ifStatement(
                  tmp2,
                  AST.blockStatement(
                    // `const has = counter in arr; if (has)`
                    AST.varStatement('const', tmp3, AST.binaryExpression('in', tmp, varName)),
                    AST.ifStatement(
                      AST.identifier(tmp3),
                      AST.blockStatement(
                        // `const val = arr[counter]; const out = callback(val, counter, arr);`
                        AST.varStatement('const', tmp4, AST.memberExpression(varName, AST.identifier(tmp), true)), // the current element
                        AST.varStatement('const', tmp6,
                          AST.callExpression(
                            // either call the callback (`func(arr[i], i, arr)`) or .call with context (`func.call(ctx, arr[i], i, arr)`)
                            // Note: some forcefully calls the callback with undefined so we must dotcall and let another rule simplify that when `this` is not used
                            // Note: the call is a dotcall so at least three params
                            SYMBOL_DOTCALL,
                            [
                              read.parentNode.arguments[3], // callback arg (after 3 $dotcall args!)
                              read.parentNode.arguments[4] || AST.undef(), // context arg (after 3 $dotcall args!)
                              AST.undef(),
                              AST.identifier(tmp4),
                              AST.identifier(tmp), // current index
                              AST.identifier(varName), // array being iterated
                            ]
                          )
                        ),
                        // `if (out)`  -- note that this is a truthy check, not just absolutely `true`
                        AST.ifStatement(tmp6,
                          AST.blockStatement(
                            // `result = true; break;`
                            AST.expressionStatement(AST.assignmentExpression(tmp5, AST.tru())),
                            AST.breakStatement(),
                          ),
                          AST.blockStatement(),
                        )
                      ),
                      AST.blockStatement(),
                    ),
                    // `tmp = tmp + 1`
                    AST.expressionStatement(
                      AST.assignmentExpression(tmp, AST.binaryExpression('+', tmp, AST.primitive(1)))
                    )
                  ),
                  AST.blockStatement(
                    AST.breakStatement()
                  ),
                )
              )
            ),
            // If the input was an assignment, assign result to it _now_, not before, so try/catch semantics are kept
            ... (stmt.type === 'ExpressionStatement' && stmt.expression.type === 'AssignmentExpression') ?
              [AST.expressionStatement(AST.assignmentExpression(stmt.expression.left, AST.identifier(tmp5)))] : [],
            // If the input was a var statement, create it with undefined now.
            ... (stmt.type === 'VarStatement') ?
              [AST.varStatement(stmt.kind, stmt.id, AST.identifier(tmp5))] : [],
            // And otherwise the result is not stored so we don't need to either. (We could omit the temp var but hopefully this happens elsewhere)
          ];

          read.blockBody[read.blockIndex] = AST.blockStatement(stmts);
          // Squash the block at the end of this transform
          queue.push({index: read.blockIndex, func: () => read.blockBody.splice(read.blockIndex, 1, ...stmts)})

          after(read.blockBody[read.blockIndex]);
          changes += 1;
          return;
        }
        case symbo('array', 'every'): {
          rule('array.every can be converted to regular loops');
          // See forEach for more examples
          example(
            'const x = arr.every(func);',
            // Note: for assignments; x should be set afterwards to cover try/catch logic.
            // Similar to .some, except the result defaults to true and goes to false as soon as one result is falsy
            'let tmplen = arr.length; let tmp = 0; let result = true; while (true) { if (tmp < tmplen) if (i in arr) { if (func(arr[i], i, arr)) { } else { result = false; break; } i = i + 1; } else { break; } } const x = result;'
          );
          before(read.blockBody[read.blockIndex]);

          // - main transform is same as forEach. same args/context logic.
          // - callback return value is boolean checked, a falsy result ends the loop
          // - result has three cases: expr, assign, var
          //   - var: create a let with same name. init to false. update to true inside loop when appropriate
          //   - assign: create tmp var to hold result. after loop assign tmp result to original lhs. this preserves try/catch logic.
          //   - expr: ignore result. don't store it.

          const stmt = read.blockBody[read.blockIndex];

          const tmplen = createFreshVar('tmpArrlen', fdata);
          const tmp = createFreshVar('tmpArri', fdata);
          const tmp2 = createFreshVar('tmpArrc', fdata);
          const tmp3 = createFreshVar('tmpArrin', fdata);
          const tmp4 = createFreshVar('tmpArrel', fdata);
          const tmp5 = createFreshVar('tmpArreout', fdata);
          const tmp6 = createFreshVar('tmpArrenow', fdata);

          const stmts = [
            // `const len = arr.length;`
            AST.varStatement('const', tmplen, AST.memberExpression(varName, 'length', false)),
            // `let counter = 0;`
            AST.varStatement('let', tmp, AST.primitive(0)),
            // `let result = true;` // empty array.every() is true, too
            AST.varStatement('let', tmp5, AST.tru()),
            // Transform to normalized code such that we don't have to go through normalization first...:
            // while (true) {
            //   const tmp2 = tmp < arr.length;
            //   if (tmp2) {
            //     const tmp3 = i in arr;
            //     if (tmp3) {
            //       const tmp = func(arr[i], i, arr); // invocation is different for context case
            //       if (tmp) {
            //       } else {
            //         result = false;
            //         break;
            //       }
            //     }
            //     counter = counter  + 1;
            //   } else {
            //     break;
            //   }
            // }
            // const x = result;     // <-- this may be optimized depending on expr/assign/var but not sure we should bother in favor of simplicity...
            AST.whileStatement(
              AST.tru(),
              AST.blockStatement(
                // `const test = counter < arr.length; if (test)`
                AST.varStatement('const', tmp2, AST.binaryExpression('<', tmp, tmplen)),
                AST.ifStatement(
                  tmp2,
                  AST.blockStatement(
                    // `const has = counter in arr; if (has)`
                    AST.varStatement('const', tmp3, AST.binaryExpression('in', tmp, varName)),
                    AST.ifStatement(
                      AST.identifier(tmp3),
                      AST.blockStatement(
                        // `const val = arr[counter]; const out = callback(val, counter, arr);`
                        AST.varStatement('const', tmp4, AST.memberExpression(varName, AST.identifier(tmp), true)), // the current element
                        AST.varStatement('const', tmp6,
                          AST.callExpression(
                            // either call the callback (`func(arr[i], i, arr)`) or .call with context (`func.call(ctx, arr[i], i, arr)`)
                            // Note: `every` forcefully calls the callback with undefined so we must dotcall and let another rule simplify that when `this` is not used
                            // Note: the call is a dotcall so at least three params
                            SYMBOL_DOTCALL,
                            [
                              read.parentNode.arguments[3], // callback arg (after 3 $dotcall args!)
                              read.parentNode.arguments[4] || AST.undef(), // context arg (after 3 $dotcall args!)
                              AST.undef(),
                              AST.identifier(tmp4),
                              AST.identifier(tmp), // current index
                              AST.identifier(varName), // array being iterated
                            ]
                          )
                        ),
                        // `if (out)`  -- note that this is a truthy check, not just absolutely `true`
                        AST.ifStatement(tmp6,
                          AST.blockStatement(),
                          AST.blockStatement(
                            // `result = false; break;`
                            AST.expressionStatement(AST.assignmentExpression(tmp5, AST.fals())),
                            AST.breakStatement(),
                          ),
                        )
                      ),
                      AST.blockStatement(),
                    ),
                    // `tmp = tmp + 1`
                    AST.expressionStatement(
                      AST.assignmentExpression(tmp, AST.binaryExpression('+', tmp, AST.primitive(1)))
                    )
                  ),
                  AST.blockStatement(
                    AST.breakStatement()
                  ),
                )
              )
            ),
            // If the input was an assignment, assign result to it _now_, not before, so try/catch semantics are kept
            ... (stmt.type === 'ExpressionStatement' && stmt.expression.type === 'AssignmentExpression') ?
              [AST.expressionStatement(AST.assignmentExpression(stmt.expression.left, AST.identifier(tmp5)))] : [],
            // If the input was a var statement, create it with undefined now.
            ... (stmt.type === 'VarStatement') ?
              [AST.varStatement(stmt.kind, stmt.id, AST.identifier(tmp5))] : [],
            // And otherwise the result is not stored so we don't need to either. (We could omit the temp var but hopefully this happens elsewhere)
          ];

          read.blockBody[read.blockIndex] = AST.blockStatement(stmts);
          // Squash the block at the end of this transform
          queue.push({index: read.blockIndex, func: () => read.blockBody.splice(read.blockIndex, 1, ...stmts)})

          after(read.blockBody[read.blockIndex]);
          changes += 1;
          return;
        }
        case symbo('array', 'find'): {
          rule('array.find can be converted to regular loops');
          // See forEach for more examples
          example(
            'const x = arr.find(func);',
            // Note: for assignments; x should be set afterwards to cover try/catch logic.
            // Similar to .some, except the result is whatever the callback returns that is not undefined
            'let tmplen = arr.length; let tmp = 0; let result = undefined; while (true) { if (tmp < tmplen) const val = arr[i]; const is = func(arr[i], i, arr); if (is) { result = val; break; } i = i + 1; } else { break; } } const x = result;'
          );
          before(read.blockBody[read.blockIndex]);

          // - main transform is same as forEach. same args/context logic.
          // - .find _does_ visit missing keys, using `undefined` as value
          // - callback return value stops loop when it is not `undefined`, result is return value of call
          // - result has three cases: expr, assign, var
          //   - var: create a let with same name. init to false. update to true inside loop when appropriate
          //   - assign: create tmp var to hold result. after loop assign tmp result to original lhs. this preserves try/catch logic.
          //   - expr: ignore result. don't store it.

          const stmt = read.blockBody[read.blockIndex];

          const tmplen = createFreshVar('tmpArrlen', fdata);
          const tmp = createFreshVar('tmpArri', fdata);
          const tmp2 = createFreshVar('tmpArrc', fdata);
          const tmp4 = createFreshVar('tmpArrel', fdata);
          const tmp5 = createFreshVar('tmpArreout', fdata);
          const tmp6 = createFreshVar('tmpArrnow', fdata);

          const stmts = [
            // `const len = arr.length;`
            AST.varStatement('const', tmplen, AST.memberExpression(varName, 'length', false)),
            // `let counter = 0;`
            AST.varStatement('let', tmp, AST.primitive(0)),
            // `let result = undefined;` // empty array.find() is undefined
            AST.varStatement('let', tmp5, AST.undef()),
            // Transform to normalized code such that we don't have to go through normalization first...:
            // while (true) {
            //   const tmp2 = tmp < arr.length;
            //   if (tmp2) {
            //     const val = arr[i];
            //     const is = func(val, i, arr); // invocation is different for context case
            //     if (is) {
            //       result = val;
            //       break;
            //     } else {
            //     }
            //     counter = counter  + 1;
            //   } else {
            //     break;
            //   }
            // }
            // const x = result;
            AST.whileStatement(
              AST.tru(),
              AST.blockStatement(
                // `const test = counter < arr.length; if (test)`
                AST.varStatement('const', tmp2, AST.binaryExpression('<', tmp, tmplen)),
                AST.ifStatement(
                  tmp2,
                  AST.blockStatement(
                    // `const val = arr[counter]; const out = callback(val, counter, arr);`
                    AST.varStatement('const', tmp4, AST.memberExpression(varName, AST.identifier(tmp), true)), // the current element
                    AST.varStatement('const', tmp6,
                      AST.callExpression(
                        // either call the callback (`func(arr[i], i, arr)`) or .call with context (`func.call(ctx, arr[i], i, arr)`)
                        // Note: `every` forcefully calls the callback with undefined so we must dotcall and let another rule simplify that when `this` is not used
                        // Note: the call is a dotcall so at least three params
                        SYMBOL_DOTCALL,
                        [
                          read.parentNode.arguments[3], // callback arg (after 3 $dotcall args!)
                          read.parentNode.arguments[4] || AST.undef(), // context arg (after 3 $dotcall args!)
                          AST.undef(),
                          AST.identifier(tmp4),
                          AST.identifier(tmp), // current index
                          AST.identifier(varName), // array being iterated
                        ]
                      )
                    ),
                    // `if (now) { result = val; break; }`
                    AST.ifStatement(tmp6,
                      AST.blockStatement(
                        AST.expressionStatement(
                          AST.assignmentExpression(tmp5, tmp4),
                        ),
                        AST.breakStatement()
                      ),
                      AST.blockStatement()
                    ),
                    // `tmp = tmp + 1`
                    AST.expressionStatement(
                      AST.assignmentExpression(tmp, AST.binaryExpression('+', tmp, AST.primitive(1)))
                    )
                  ),
                  AST.blockStatement(
                    AST.breakStatement()
                  ),
                )
              )
            ),
            // If the input was an assignment, assign result to it _now_, not before, so try/catch semantics are kept
            ... (stmt.type === 'ExpressionStatement' && stmt.expression.type === 'AssignmentExpression') ?
              [AST.expressionStatement(AST.assignmentExpression(stmt.expression.left, AST.identifier(tmp5)))] : [],
            // If the input was a var statement, create it with undefined now.
            ... (stmt.type === 'VarStatement') ?
              [AST.varStatement(stmt.kind, stmt.id, AST.identifier(tmp5))] : [],
            // And otherwise the result is not stored so we don't need to either. (We could omit the temp var but hopefully this happens elsewhere)
          ];

          read.blockBody[read.blockIndex] = AST.blockStatement(stmts);
          // Squash the block at the end of this transform
          queue.push({index: read.blockIndex, func: () => read.blockBody.splice(read.blockIndex, 1, ...stmts)})

          after(read.blockBody[read.blockIndex]);
          changes += 1;
          return;
        }
        case symbo('array', 'findIndex'): {
          // (This is the same as the .find transform, except for what it finally returns)
          rule('array.findIndex can be converted to regular loops');
          // See forEach for more examples
          example(
            'const x = arr.findIndex(func);',
            // Note: for assignments; x should be set afterwards to cover try/catch logic.
            // Similar to .some, except the result is whatever the callback returns that is not undefined
            'let tmplen = arr.length; let tmp = 0; let result = undefined; while (true) { if (tmp < tmplen) const val = arr[i]; const is = func(arr[i], i, arr); if (is) { result = val; break; } i = i + 1; } else { break; } } const x = result;'
          );
          before(read.blockBody[read.blockIndex]);

          // - main transform is same as forEach. same args/context logic.
          // - .find _does_ visit missing keys, using `undefined` as value
          // - callback return value stops loop when it is not `undefined`, result is return value of call
          // - result has three cases: expr, assign, var
          //   - var: create a let with same name. init to false. update to true inside loop when appropriate
          //   - assign: create tmp var to hold result. after loop assign tmp result to original lhs. this preserves try/catch logic.
          //   - expr: ignore result. don't store it.

          const stmt = read.blockBody[read.blockIndex];

          const tmplen = createFreshVar('tmpArrlen', fdata);
          const tmp = createFreshVar('tmpArri', fdata);
          const tmp2 = createFreshVar('tmpArrc', fdata);
          const tmp4 = createFreshVar('tmpArrel', fdata);
          const tmp5 = createFreshVar('tmpArreout', fdata);
          const tmp6 = createFreshVar('tmpArrnow', fdata);

          const stmts = [
            // `const len = arr.length;`
            AST.varStatement('const', tmplen, AST.memberExpression(varName, 'length', false)),
            // `let counter = 0;`
            AST.varStatement('let', tmp, AST.primitive(0)),
            // `let result = undefined;` // empty array.find() is undefined
            AST.varStatement('let', tmp5, AST.primitive(-1)),
            // Transform to normalized code such that we don't have to go through normalization first...:
            // while (true) {
            //   const tmp2 = tmp < arr.length;
            //   if (tmp2) {
            //     const val = arr[i];
            //     const is = func(val, i, arr); // invocation is different for context case
            //     if (is) {
            //       result = counter;
            //       break;
            //     } else {
            //     }
            //     counter = counter  + 1;
            //   } else {
            //     break;
            //   }
            // }
            // const x = result;
            AST.whileStatement(
              AST.tru(),
              AST.blockStatement(
                // `const test = counter < arr.length; if (test)`
                AST.varStatement('const', tmp2, AST.binaryExpression('<', tmp, tmplen)),
                AST.ifStatement(
                  tmp2,
                  AST.blockStatement(
                    // `const val = arr[counter]; const out = callback(val, counter, arr);`
                    AST.varStatement('const', tmp4, AST.memberExpression(varName, AST.identifier(tmp), true)), // the current element
                    AST.varStatement('const', tmp6,
                      AST.callExpression(
                        // either call the callback (`func(arr[i], i, arr)`) or .call with context (`func.call(ctx, arr[i], i, arr)`)
                        // Note: `every` forcefully calls the callback with undefined so we must dotcall and let another rule simplify that when `this` is not used
                        // Note: the call is a dotcall so at least three params
                        SYMBOL_DOTCALL,
                        [
                          read.parentNode.arguments[3], // callback arg (after 3 $dotcall args!)
                          read.parentNode.arguments[4] || AST.undef(), // context arg (after 3 $dotcall args!)
                          AST.undef(),
                          AST.identifier(tmp4),
                          AST.identifier(tmp), // current index
                          AST.identifier(varName), // array being iterated
                        ]
                      )
                    ),
                    // `if (now) { result = counter; break; }`
                    AST.ifStatement(tmp6,
                      AST.blockStatement(
                        AST.expressionStatement(
                          AST.assignmentExpression(tmp5, tmp),
                        ),
                        AST.breakStatement()
                      ),
                      AST.blockStatement()
                    ),
                    // `tmp = tmp + 1`
                    AST.expressionStatement(
                      AST.assignmentExpression(tmp, AST.binaryExpression('+', tmp, AST.primitive(1)))
                    )
                  ),
                  AST.blockStatement(
                    AST.breakStatement()
                  ),
                )
              )
            ),
            // If the input was an assignment, assign result to it _now_, not before, so try/catch semantics are kept
            ... (stmt.type === 'ExpressionStatement' && stmt.expression.type === 'AssignmentExpression') ?
              [AST.expressionStatement(AST.assignmentExpression(stmt.expression.left, AST.identifier(tmp5)))] : [],
            // If the input was a var statement, create it with undefined now.
            ... (stmt.type === 'VarStatement') ?
              [AST.varStatement(stmt.kind, stmt.id, AST.identifier(tmp5))] : [],
            // And otherwise the result is not stored so we don't need to either. (We could omit the temp var but hopefully this happens elsewhere)
          ];

          read.blockBody[read.blockIndex] = AST.blockStatement(stmts);
          // Squash the block at the end of this transform
          queue.push({index: read.blockIndex, func: () => read.blockBody.splice(read.blockIndex, 1, ...stmts)})

          after(read.blockBody[read.blockIndex]);
          changes += 1;
          return;
        }
        case symbo('array', 'findLast'): {
          rule('array.findLast can be converted to regular loops');
          // See forEach for more examples
          example(
            'const x = arr.findLast(func);',
            'let tmplen = arr.length; let tmp = len-1; let result = undefined; while (true) { if (tmp >= 0) const val = arr[i]; const is = func(arr[i], i, arr); if (is) { result = val; break; } i = i - 1; } else { break; } } const x = result;'
          );
          before(read.blockBody[read.blockIndex]);

          // - main transform is same as forEach. same args/context logic.
          // - .findLast _does_ visit missing keys, using `undefined` as value
          // - callback return value stops loop when it is not `undefined`, result is return value of call
          // - result has three cases: expr, assign, var
          //   - var: create a let with same name. init to false. update to true inside loop when appropriate
          //   - assign: create tmp var to hold result. after loop assign tmp result to original lhs. this preserves try/catch logic.
          //   - expr: ignore result. don't store it.

          const stmt = read.blockBody[read.blockIndex];

          const tmplen = createFreshVar('tmpArrlen', fdata);
          const tmp = createFreshVar('tmpArri', fdata);
          const tmp2 = createFreshVar('tmpArrc', fdata);
          const tmp4 = createFreshVar('tmpArrel', fdata);
          const tmp5 = createFreshVar('tmpArreout', fdata);
          const tmp6 = createFreshVar('tmpArrnow', fdata);

          const stmts = [
            // `const len = arr.length;`
            AST.varStatement('const', tmplen, AST.memberExpression(varName, 'length', false)),
            // `let counter = len - 1;`
            AST.varStatement('let', tmp, AST.binaryExpression('-', AST.identifier(tmplen), AST.primitive(1))),
            // `let result = undefined;` // empty array.findLast() is undefined
            AST.varStatement('let', tmp5, AST.undef()),
            // Transform to normalized code such that we don't have to go through normalization first...:
            // while (true) {
            //   const tmp2 = tmp >= 0;
            //   if (tmp2) {
            //     const val = arr[i];
            //     const is = func(val, i, arr); // invocation is different for context case
            //     if (is) {
            //       result = val;
            //       break;
            //     } else {
            //     }
            //     counter = counter - 1;
            //   } else {
            //     break;
            //   }
            // }
            // const x = result;
            AST.whileStatement(
              AST.tru(),
              AST.blockStatement(
                // `const test = counter >= 0; if (test)`
                AST.varStatement('const', tmp2, AST.binaryExpression('>=', tmp, AST.primitive(0))),
                AST.ifStatement(
                  tmp2,
                  AST.blockStatement(
                    // `const val = arr[counter]; const out = callback(val, counter, arr);`
                    AST.varStatement('const', tmp4, AST.memberExpression(varName, AST.identifier(tmp), true)), // the current element
                    AST.varStatement('const', tmp6,
                      AST.callExpression(
                        // either call the callback (`func(arr[i], i, arr)`) or .call with context (`func.call(ctx, arr[i], i, arr)`)
                        // Note: `every` forcefully calls the callback with undefined so we must dotcall and let another rule simplify that when `this` is not used
                        // Note: the call is a dotcall so at least three params
                        SYMBOL_DOTCALL,
                        [
                          read.parentNode.arguments[3], // callback arg (after 3 $dotcall args!)
                          read.parentNode.arguments[4] || AST.undef(), // context arg (after 3 $dotcall args!)
                          AST.undef(),
                          AST.identifier(tmp4),
                          AST.identifier(tmp), // current index
                          AST.identifier(varName), // array being iterated
                        ]
                      )
                    ),
                    // `if (now) { result = val; break; }`
                    AST.ifStatement(tmp6,
                      AST.blockStatement(
                        AST.expressionStatement(
                          AST.assignmentExpression(tmp5, tmp4),
                        ),
                        AST.breakStatement()
                      ),
                      AST.blockStatement()
                    ),
                    // `tmp = tmp - 1`
                    AST.expressionStatement(
                      AST.assignmentExpression(tmp, AST.binaryExpression('-', tmp, AST.primitive(1)))
                    )
                  ),
                  AST.blockStatement(
                    AST.breakStatement()
                  ),
                )
              )
            ),
            // If the input was an assignment, assign result to it _now_, not before, so try/catch semantics are kept
            ... (stmt.type === 'ExpressionStatement' && stmt.expression.type === 'AssignmentExpression') ?
              [AST.expressionStatement(AST.assignmentExpression(stmt.expression.left, AST.identifier(tmp5)))] : [],
            // If the input was a var statement, create it with undefined now.
            ... (stmt.type === 'VarStatement') ?
              [AST.varStatement(stmt.kind, stmt.id, AST.identifier(tmp5))] : [],
            // And otherwise the result is not stored so we don't need to either. (We could omit the temp var but hopefully this happens elsewhere)
          ];

          read.blockBody[read.blockIndex] = AST.blockStatement(stmts);
          // Squash the block at the end of this transform
          queue.push({index: read.blockIndex, func: () => read.blockBody.splice(read.blockIndex, 1, ...stmts)})

          after(read.blockBody[read.blockIndex]);
          changes += 1;
          return;
        }
        case symbo('array', 'findLastIndex'): {
          // Same as .findLast except it stores the counter rather than the val
          rule('array.findLastIndex can be converted to regular loops');
          // See forEach for more examples
          example(
            'const x = arr.findLastIndex(func);',
            'let tmplen = arr.length; let tmp = len-1; let result = undefined; while (true) { if (tmp >= 0) const val = arr[i]; const is = func(arr[i], i, arr); if (is) { result = i; break; } i = i - 1; } else { break; } } const x = result;'
          );
          before(read.blockBody[read.blockIndex]);

          // - main transform is same as forEach. same args/context logic.
          // - .findLast _does_ visit missing keys, using `undefined` as value
          // - callback return value stops loop when it is not `undefined`, result is return value of call
          // - result has three cases: expr, assign, var
          //   - var: create a let with same name. init to false. update to true inside loop when appropriate
          //   - assign: create tmp var to hold result. after loop assign tmp result to original lhs. this preserves try/catch logic.
          //   - expr: ignore result. don't store it.

          const stmt = read.blockBody[read.blockIndex];

          const tmplen = createFreshVar('tmpArrlen', fdata);
          const tmp = createFreshVar('tmpArri', fdata);
          const tmp2 = createFreshVar('tmpArrc', fdata);
          const tmp4 = createFreshVar('tmpArrel', fdata);
          const tmp5 = createFreshVar('tmpArreout', fdata);
          const tmp6 = createFreshVar('tmpArrnow', fdata);

          const stmts = [
            // `const len = arr.length;`
            AST.varStatement('const', tmplen, AST.memberExpression(varName, 'length', false)),
            // `let counter = len - 1;`
            AST.varStatement('let', tmp, AST.binaryExpression('-', AST.identifier(tmplen), AST.primitive(1))),
            // `let result = undefined;` // empty array.findLast() is undefined
            AST.varStatement('let', tmp5, AST.primitive(-1)),
            // Transform to normalized code such that we don't have to go through normalization first...:
            // while (true) {
            //   const tmp2 = tmp >= 0;
            //   if (tmp2) {
            //     const val = arr[i];
            //     const is = func(val, i, arr); // invocation is different for context case
            //     if (is) {
            //       result = counter;
            //       break;
            //     } else {
            //     }
            //     counter = counter - 1;
            //   } else {
            //     break;
            //   }
            // }
            // const x = result;
            AST.whileStatement(
              AST.tru(),
              AST.blockStatement(
                // `const test = counter >= 0; if (test)`
                AST.varStatement('const', tmp2, AST.binaryExpression('>=', tmp, AST.primitive(0))),
                AST.ifStatement(
                  tmp2,
                  AST.blockStatement(
                    // `const val = arr[counter]; const out = callback(val, counter, arr);`
                    AST.varStatement('const', tmp4, AST.memberExpression(varName, AST.identifier(tmp), true)), // the current element
                    AST.varStatement('const', tmp6,
                      AST.callExpression(
                        // either call the callback (`func(arr[i], i, arr)`) or .call with context (`func.call(ctx, arr[i], i, arr)`)
                        // Note: `every` forcefully calls the callback with undefined so we must dotcall and let another rule simplify that when `this` is not used
                        // Note: the call is a dotcall so at least three params
                        SYMBOL_DOTCALL,
                        [
                          read.parentNode.arguments[3], // callback arg (after 3 $dotcall args!)
                          read.parentNode.arguments[4] || AST.undef(), // context arg (after 3 $dotcall args!)
                          AST.undef(),
                          AST.identifier(tmp4),
                          AST.identifier(tmp), // current index
                          AST.identifier(varName), // array being iterated
                        ]
                      )
                    ),
                    // `if (now) { result = val; break; }`
                    AST.ifStatement(tmp6,
                      AST.blockStatement(
                        AST.expressionStatement(
                          AST.assignmentExpression(tmp5, tmp),
                        ),
                        AST.breakStatement()
                      ),
                      AST.blockStatement()
                    ),
                    // `tmp = tmp - 1`
                    AST.expressionStatement(
                      AST.assignmentExpression(tmp, AST.binaryExpression('-', tmp, AST.primitive(1)))
                    )
                  ),
                  AST.blockStatement(
                    AST.breakStatement()
                  ),
                )
              )
            ),
            // If the input was an assignment, assign result to it _now_, not before, so try/catch semantics are kept
            ... (stmt.type === 'ExpressionStatement' && stmt.expression.type === 'AssignmentExpression') ?
              [AST.expressionStatement(AST.assignmentExpression(stmt.expression.left, AST.identifier(tmp5)))] : [],
            // If the input was a var statement, create it with undefined now.
            ... (stmt.type === 'VarStatement') ?
              [AST.varStatement(stmt.kind, stmt.id, AST.identifier(tmp5))] : [],
            // And otherwise the result is not stored so we don't need to either. (We could omit the temp var but hopefully this happens elsewhere)
          ];

          read.blockBody[read.blockIndex] = AST.blockStatement(stmts);
          // Squash the block at the end of this transform
          queue.push({index: read.blockIndex, func: () => read.blockBody.splice(read.blockIndex, 1, ...stmts)})

          after(read.blockBody[read.blockIndex]);
          changes += 1;
          return;
        }
        case symbo('array', 'reduce'): {
          rule('array.reduce can be converted to regular loops');
          // See forEach for more examples
          example(
            'const x = arr.reduce(func, init);',
            // Note: for assignments; x should be set afterwards to cover try/catch logic.
            // Note: reduce case is simpler because there is no context. we do have to juggle the result forward.
            'let tmplen = arr.length; let tmp = 0; let result = init; while (true) { if (tmp < tmplen) if (i in arr) { result = func(result, arr[i], i, arr); i = i + 1; } else { break; } } const x = result;'
          );
          // The no-init case is special because iteration starts at second element, throws if array is empty, but otherwise equal
          example(
            'const x = arr.reduce(func);',
            // Note: for assignments; x should be set afterwards to cover try/catch logic.
            // Note: reduce case is simpler because there is no context. we do have to juggle the result forward.
            'let tmplen = arr.length; if (!tmplen) throw new TypeError(); let tmp = 1; let result = arr[0]; while (true) { if (tmp < tmplen) if (i in arr) { result = func(result, arr[i], i, arr); i = i + 1; } else { break; } } const x = result;'
          );
          before(read.blockBody[read.blockIndex]);

          // - main transform is same as forEach. same args/context logic.
          // - callback return value is stored and passed into next call
          // - result has three cases: expr, assign, var
          //   - var: create a let with same name. init to false. update to true inside loop when appropriate
          //   - assign: create tmp var to hold result. after loop assign tmp result to original lhs. this preserves try/catch logic.
          //   - expr: ignore result. don't store it.

          // reduce adds the complexity of the init: when there is no init and there is no first element, a type error is thrown.
          // but we don't necessarily know the shape of the array at this point. we also can't just take arr.length/arr[0] due to elided elements...
          // I think best is to add a check in the transform by setting the init to an object reference and then confirming that the
          // initial value was overridden at least once, throwing a type error if the result is that initial symbol.
          // additionally, the transform must check whether the result is still this symbol, and if so, simply replace the result without
          // calling the callback for it. (it should skip the first iteration in that case)

          const stmt = read.blockBody[read.blockIndex];

          const initArg = read.parentNode.arguments[4]; // dotcall args start with 3 args, then callback arg, then init arg

          const tmplen = createFreshVar('tmpArrlen', fdata);
          const tmp = createFreshVar('tmpArri', fdata);
          const tmp2 = createFreshVar('tmpArrc', fdata);
          const tmp3 = createFreshVar('tmpArrin', fdata);
          const tmp4 = createFreshVar('tmpArrel', fdata);
          const tmp5 = createFreshVar('tmpArreout', fdata);
          const tmp7 = !initArg && createFreshVar('tmpArre1st', fdata);
          const tmp8 = !initArg && createFreshVar('tmpArrebad', fdata);
          const tmp9 = !initArg && createFreshVar('tmpArrette', fdata);
          const tmp10 = !initArg && createFreshVar('tmpArreerr', fdata);

          // Generate this block first. Depending on whether an init was passed on we have slightly different transforms
          // `result = callback(result, val, counter, arr);`
          const callbackPart =
            AST.expressionStatement(
              AST.assignmentExpression(
                tmp5,
                AST.callExpression(
                  // Note: .reduce always calls the callback with context=undefined
                  // Note: the .reduce call is a dotcall so at least three params
                  SYMBOL_DOTCALL,
                  [
                    read.parentNode.arguments[3], // callback arg (after 3 $dotcall args!)
                    AST.undef(), // there is no context arg for .reduce but it's force-called with `undefined`
                    AST.undef(),
                    AST.identifier(tmp5), // result
                    AST.identifier(tmp4), // current value
                    AST.identifier(tmp), // current index
                    AST.identifier(varName), // array being iterated
                  ]
                )
              ),
            );

          const stmts = [
            // `const len = arr.length;`
            AST.varStatement('const', tmplen, AST.memberExpression(varName, 'length', false)),
            // when there is no init to the .reduce call: `if (!arr.length) throw`
            // this includes elided elements, which makes the transform harder as we don't require to know the shape of the array...
            // `let counter = 0;`
            AST.varStatement('let', tmp, AST.primitive(0)),
            // `let badInit = {};`
            ... initArg ? [] : [AST.varStatement('const', tmp7, AST.objectExpression())], // empty object, reference as a symbol
            // `let result = <init arg or special symbol>;` // if .reduce was called with init arg, use that here. otherwise use a symbol indicating no init value was found yet.
            AST.varStatement('let', tmp5, initArg || AST.identifier(tmp7)),
            // Transform to normalized code such that we don't have to go through normalization first...:
            // while (true) {
            //   const tmp2 = tmp < arr.length;
            //   if (tmp2) {
            //     const tmp3 = i in arr;
            //     if (tmp3) {
            //       const first = result === firstSymbol;
            //       if (first) result = arr[i];
            //     } else {
            //       const tmp = func(arr[i], i, arr); // invocation is different for context case
            //       if (tmp) {
            //       } else {
            //         result = false;
            //         break;
            //       }
            //     }
            //     counter = counter  + 1;
            //   } else {
            //     break;
            //   }
            // }
            // if (result === firstSymbol) throw new TypeError(); // in this case the array was empty or only contained elided elements
            // const x = result;     // <-- this may be optimized depending on expr/assign/var but not sure we should bother in favor of simplicity...
            AST.whileStatement(
              AST.tru(),
              AST.blockStatement(
                // `const test = counter < arr.length; if (test)`
                AST.varStatement('const', tmp2, AST.binaryExpression('<', tmp, tmplen)),
                AST.ifStatement(
                  tmp2,
                  AST.blockStatement(
                    // `const has = counter in arr; if (has)`
                    AST.varStatement('const', tmp3, AST.binaryExpression('in', tmp, varName)),
                    AST.ifStatement(
                      AST.identifier(tmp3),
                      AST.blockStatement(
                        // `const val = arr[counter];`
                        AST.varStatement('const', tmp4, AST.memberExpression(varName, AST.identifier(tmp), true)), // the current element
                        // Not pretty but feh.
                        ... initArg
                          ? [callbackPart] // just call the callback and assign it to result.
                          : [
                            // in this code path we have to check if result is still the special symbol. if so, we must assign
                            // the array value to it without calling the callback on it. otherwise we call the callback as usual.
                            AST.varStatement('const', tmp8, AST.binaryExpression('===', tmp5, tmp7)),
                            AST.ifStatement(tmp8,
                              AST.blockStatement(
                                // `result = val`
                                AST.expressionStatement(AST.assignmentExpression(tmp5, tmp4)),
                              ),
                              AST.blockStatement(
                                callbackPart
                              ),
                            ),
                          ]
                      ),
                      AST.blockStatement(),
                    ),
                    // `tmp = tmp + 1`
                    AST.expressionStatement(
                      AST.assignmentExpression(tmp, AST.binaryExpression('+', tmp, AST.primitive(1)))
                    )
                  ),
                  AST.blockStatement(
                    AST.breakStatement()
                  ),
                )
              )
            ),
            // If the result is still the initial no-result symbol then we must throw here.
            // `const tmp = result === badInit; if (tmp) { const msg = '...'; throw new TypeError(msg); }`
            ... initArg ? [] : [
              AST.varStatement('const', tmp9, AST.binaryExpression('===', tmp5, tmp7)),
              AST.ifStatement(tmp9,
                AST.blockStatement(
                  AST.varStatement('const', tmp10,
                    AST.newExpression(
                      'TypeError',
                      [AST.primitive(
                        `[Preval] Called .reduce without init on an array without values: \`${tmat(stmt, true).replace(/ /g, '\\n')}\``
                      )]
                    )
                  ),
                  AST.throwStatement(AST.identifier(tmp10))
                ),
                AST.blockStatement()
              )
            ],
            // If the input was an assignment, assign result to it _now_, not before, so try/catch semantics are kept
            ... (stmt.type === 'ExpressionStatement' && stmt.expression.type === 'AssignmentExpression') ?
              [AST.expressionStatement(AST.assignmentExpression(stmt.expression.left, AST.identifier(tmp5)))] : [],
            // If the input was a var statement, create it with undefined now.
            ... (stmt.type === 'VarStatement') ?
              [AST.varStatement(stmt.kind, stmt.id, AST.identifier(tmp5))] : [],
            // And otherwise the result is not stored so we don't need to either. (We could omit the temp var but hopefully this happens elsewhere)
          ];

          read.blockBody[read.blockIndex] = AST.blockStatement(stmts);
          // Squash the block at the end of this transform
          queue.push({index: read.blockIndex, func: () => read.blockBody.splice(read.blockIndex, 1, ...stmts)})

          after(read.blockBody[read.blockIndex]);
          changes += 1;
          return;
        }
        case symbo('array', 'reduceRight'): {
          // Same as reduce except in the other direction
          rule('array.reduceRight can be converted to regular loops');
          // See forEach for more examples
          example(
            'const x = arr.reduceRight(func, init);',
            // Note: for assignments; x should be set afterwards to cover try/catch logic.
            // Note: reduceRight case is simpler because there is no context. we do have to juggle the result forward.
            'let tmplen = arr.length; let tmp = 0; let result = init; while (true) { if (tmp < tmplen) if (i in arr) { result = func(result, arr[i], i, arr); i = i + 1; } else { break; } } const x = result;'
          );
          // The no-init case is special because iteration starts at second element, throws if array is empty, but otherwise equal
          example(
            'const x = arr.reduceRight(func);',
            // Note: for assignments; x should be set afterwards to cover try/catch logic.
            // Note: reduceRight case is simpler because there is no context. we do have to juggle the result forward.
            'let tmplen = arr.length; if (!tmplen) throw new TypeError(); let tmp = 1; let result = arr[0]; while (true) { if (tmp < tmplen) if (i in arr) { result = func(result, arr[i], i, arr); i = i + 1; } else { break; } } const x = result;'
          );
          before(read.blockBody[read.blockIndex]);

          // - main transform is same as forEach. same args/context logic.
          // - callback return value is stored and passed into next call
          // - result has three cases: expr, assign, var
          //   - var: create a let with same name. init to false. update to true inside loop when appropriate
          //   - assign: create tmp var to hold result. after loop assign tmp result to original lhs. this preserves try/catch logic.
          //   - expr: ignore result. don't store it.

          // reduceRight adds the complexity of the init: when there is no init and there is no first element, a type error is thrown.
          // but we don't necessarily know the shape of the array at this point. we also can't just take arr.length/arr[0] due to elided elements...
          // I think best is to add a check in the transform by setting the init to an object reference and then confirming that the
          // initial value was overridden at least once, throwing a type error if the result is that initial symbol.
          // additionally, the transform must check whether the result is still this symbol, and if so, simply replace the result without
          // calling the callback for it. (it should skip the first iteration in that case)

          const stmt = read.blockBody[read.blockIndex];

          const initArg = read.parentNode.arguments[4]; // dotcall args start with 3 args, then callback arg, then init arg

          const tmplen = createFreshVar('tmpArrlen', fdata);
          const tmp = createFreshVar('tmpArri', fdata);
          const tmp2 = createFreshVar('tmpArrc', fdata);
          const tmp3 = createFreshVar('tmpArrin', fdata);
          const tmp4 = createFreshVar('tmpArrel', fdata);
          const tmp5 = createFreshVar('tmpArreout', fdata);
          const tmp7 = !initArg && createFreshVar('tmpArre1st', fdata);
          const tmp8 = !initArg && createFreshVar('tmpArrebad', fdata);
          const tmp9 = !initArg && createFreshVar('tmpArrette', fdata);
          const tmp10 = !initArg && createFreshVar('tmpArreerr', fdata);

          // Generate this block first. Depending on whether an init was passed on we have slightly different transforms
          // `result = callback(result, val, counter, arr);`
          const callbackPart =
            AST.expressionStatement(
              AST.assignmentExpression(
                tmp5,
                AST.callExpression(
                  // Note: .reduceRight always calls the callback with context=undefined
                  // Note: the .reduceRight call is a dotcall so at least three params
                  SYMBOL_DOTCALL,
                  [
                    read.parentNode.arguments[3], // callback arg (after 3 $dotcall args!)
                    AST.undef(), // there is no context arg for .reduceRight but it's force-called with `undefined`
                    AST.undef(),
                    AST.identifier(tmp5), // result
                    AST.identifier(tmp4), // current value
                    AST.identifier(tmp), // current index
                    AST.identifier(varName), // array being iterated
                  ]
                )
              ),
            );

          // The only difference with regular `reduce` is the inverted visiting order
          const stmts = [
            // `const len = arr.length;`
            AST.varStatement('const', tmplen, AST.memberExpression(varName, 'length', false)),
            // when there is no init to the .reduceRight call: `if (!arr.length) throw`
            // this includes elided elements, which makes the transform harder as we don't require to know the shape of the array...
            // `let counter = len - 1;`
            AST.varStatement('let', tmp, AST.binaryExpression('-', AST.identifier(tmplen), AST.primitive(1))),
            // `let badInit = {};`
            ... initArg ? [] : [AST.varStatement('const', tmp7, AST.objectExpression())], // empty object, reference as a symbol
            // `let result = <init arg or special symbol>;` // if .reduceRight was called with init arg, use that here. otherwise use a symbol indicating no init value was found yet.
            AST.varStatement('let', tmp5, initArg || AST.identifier(tmp7)),
            // Transform to normalized code such that we don't have to go through normalization first...
            // while (true) {
            //   const tmp2 = tmp < arr.length;
            //   if (tmp2) {
            //     const tmp3 = i in arr;
            //     if (tmp3) {
            //       const first = result === firstSymbol;
            //       if (first) result = arr[i];
            //     } else {
            //       const tmp = func(arr[i], i, arr); // invocation is different for context case
            //       if (tmp) {
            //       } else {
            //         result = false;
            //         break;
            //       }
            //     }
            //     counter = counter  + 1;
            //   } else {
            //     break;
            //   }
            // }
            // if (result === firstSymbol) throw new TypeError(); // in this case the array was empty or only contained elided elements
            // const x = result;     // <-- this may be optimized depending on expr/assign/var but not sure we should bother in favor of simplicity...
            AST.whileStatement(
              AST.tru(),
              AST.blockStatement(
                // `const test = counter >= 0; if (test)`   (we're going from back to front)
                AST.varStatement('const', tmp2, AST.binaryExpression('>=', tmp, AST.primitive(0))),
                AST.ifStatement(
                  tmp2,
                  AST.blockStatement(
                    // `const has = counter in arr; if (has)`
                    AST.varStatement('const', tmp3, AST.binaryExpression('in', tmp, varName)),
                    AST.ifStatement(
                      AST.identifier(tmp3),
                      AST.blockStatement(
                        // `const val = arr[counter];`
                        AST.varStatement('const', tmp4, AST.memberExpression(varName, AST.identifier(tmp), true)), // the current element
                        // Not pretty but feh.
                        ... initArg
                          ? [callbackPart] // just call the callback and assign it to result.
                          : [
                            // in this code path we have to check if result is still the special symbol. if so, we must assign
                            // the array value to it without calling the callback on it. otherwise we call the callback as usual.
                            AST.varStatement('const', tmp8, AST.binaryExpression('===', tmp5, tmp7)),
                            AST.ifStatement(tmp8,
                              AST.blockStatement(
                                // `result = val`
                                AST.expressionStatement(AST.assignmentExpression(tmp5, tmp4)),
                              ),
                              AST.blockStatement(
                                callbackPart
                              ),
                            ),
                          ]
                      ),
                      AST.blockStatement(),
                    ),
                    // `tmp = tmp - 1`
                    AST.expressionStatement(
                      AST.assignmentExpression(tmp, AST.binaryExpression('-', tmp, AST.primitive(1)))
                    )
                  ),
                  AST.blockStatement(
                    AST.breakStatement()
                  ),
                )
              )
            ),
            // If the result is still the initial no-result symbol then we must throw here.
            // `const tmp = result === badInit; if (tmp) { const msg = '...'; throw new TypeError(msg); }`
            ... initArg ? [] : [
              AST.varStatement('const', tmp9, AST.binaryExpression('===', tmp5, tmp7)),
              AST.ifStatement(tmp9,
                AST.blockStatement(
                  AST.varStatement('const', tmp10,
                    AST.newExpression(
                      'TypeError',
                      [AST.primitive(
                        `[Preval] Called .reduceRight without init on an array without values: \`${tmat(stmt, true).replace(/ /g, '\\n')}\``
                      )]
                    )
                  ),
                  AST.throwStatement(AST.identifier(tmp10))
                ),
                AST.blockStatement()
              )
            ],
            // If the input was an assignment, assign result to it _now_, not before, so try/catch semantics are kept
            ... (stmt.type === 'ExpressionStatement' && stmt.expression.type === 'AssignmentExpression') ?
              [AST.expressionStatement(AST.assignmentExpression(stmt.expression.left, AST.identifier(tmp5)))] : [],
            // If the input was a var statement, create it with undefined now.
            ... (stmt.type === 'VarStatement') ?
              [AST.varStatement(stmt.kind, stmt.id, AST.identifier(tmp5))] : [],
            // And otherwise the result is not stored so we don't need to either. (We could omit the temp var but hopefully this happens elsewhere)
          ];

          read.blockBody[read.blockIndex] = AST.blockStatement(stmts);
          // Squash the block at the end of this transform
          queue.push({index: read.blockIndex, func: () => read.blockBody.splice(read.blockIndex, 1, ...stmts)})

          after(read.blockBody[read.blockIndex]);
          changes += 1;
          return;
        }
      }
    });
  });
  return changes;
}
