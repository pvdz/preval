// Look for array literals whose methods get called immediately and try to resolve them if we can guarantee state
// `const arr = [1, 2, 3]; arr.push(4); f(arr.shift()); f(arr)`
// -> `const arr = [2, 3, 4]; f(1); f(arr)`

import walk from '../../lib/walk.mjs';
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
            //     tmp = tmp  + 1;
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
            'const x = arr.some(func);',
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
            //     tmp = tmp  + 1;
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
      }
    });
  });
  return changes;
}
