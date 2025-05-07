// Find function that get called once and then cleared. It's a bit of a specific pattern.
//
//        `let f = function(){}; function g() { if (f) { f(); f = null; } } g(); g();'
//         -> `let f = true; function g() { if (f) { const tmp = function(){}; tmp(); f = null; } } g(); g();'
//

// So the idea is that a function is used as an if-test and called and is initialized as a function but also assigned a falsy value.
// In that case we replace the original function binding with initialization to `true` and at the call site compile in a fresh
// binding that immediately gets called. This way the conditional semantics are retained while unblocking some type inference cases.

import { ASSERT, log, group, groupEnd, vlog, vgroup, vgroupEnd, rule, example, before, source, after, findBodyOffset } from '../utils.mjs';
import * as AST from '../ast.mjs';
import { createFreshVar } from '../bindings.mjs';
import { ASSUME_BUILTINS } from '../constants.mjs';
import { SYMBOL_DOTCALL } from '../symbols_preval.mjs';
import { symbo } from '../symbols_builtins.mjs';

export function functionLocks(fdata) {
  group('\n\n\n[functionLocks] Looking for functions that get locked after the first call\n');
  const r = _functionLocks(fdata);
  groupEnd();
  return r;
}
function _functionLocks(fdata) {
  // Find let bindings that start as a function and (only) get assigned falsy values
  // Confirm that they are only called from another func and used in `if` tests or assigned to
  // Edge case: also support .call .apply (.bind)
  // Replace the init with `true`
  // Compile a new binding with the func before the call
  // Replace the callee of the call(s) with the new binding name

  let updates = 0;
  const queue = [];

  new Map(fdata.globallyUniqueNamingRegistry).forEach((meta, funcName) => {
    if (meta.isImplicitGlobal) return;
    if (meta.isBuiltin) return;
    if (meta.isConstant) return;
    if (!meta.varDeclRef) return; // catch

    const funcNode = meta.varDeclRef.node; // Note: this is a misnomer; it is the var decl init ref, also populated for lets.
    if (funcNode.type !== 'FunctionExpression') return;

    // Check if other func is conditionally calling a func. If so, that func is our target.
    vlog('- `' + funcName + '`:', meta.varDeclRef.node.type);

    const identCallReads = [];
    const memberCallReads = []; // func.apply func.call func.bind
    const ifTestReads = [];
    if (
      meta.reads.some((read) => {
        if (read.parentNode.type === 'IfStatement') {
          ifTestReads.push(read);
          return false;
        }

        if (read.parentNode.type === 'CallExpression' && read.parentProp === 'callee') {
          identCallReads.push(read);
          return false;
        }

        if (ASSUME_BUILTINS) {
          vlog('-', read.parentNode.type, read.parentProp, read.parentIndex, read.parentNode.callee?.name, read.parentNode.arguments?.[0]?.name)
          if (
            read.parentNode.type === 'CallExpression' &&
            read.parentProp === 'arguments' &&
            read.parentIndex === 1 && // context
            read.parentNode.callee.type === 'Identifier' && // mandatory at this point
            read.parentNode.callee.name === SYMBOL_DOTCALL &&
            read.parentNode.arguments[0].type === 'Identifier' && // mandatory at this point...
            (
              [
                symbo('function', 'call'),
                symbo('function', 'apply'),
                symbo('function', 'bind'),
              ].includes(read.parentNode.arguments[0].name) ||
              (
                // In this trick, the binding holding the function value may also be undefined
                // so preval doesn't know for sure that reading .call will yield the builtin
                // function. As such, preval won't replace the result with the builtin symbol.
                // The idea is that if you call a method that was the result of reading .call
                // .apply or .bind, then it must be the builtins, right? I'm not sure it can be
                // anything else unless the prototype was poisoned. Aside from undefined on
                // false. But that would lead to an inevitable crash when called.
                AST.isPrimitive(read.parentNode.arguments[2]) && // When is this not true? undef or str, right?
                ['call', 'apply', 'bind'].includes(AST.getPrimitiveValue(read.parentNode.arguments[2]))
              )
            )
          ) {
            // func.apply(), func.call(), func.bind()
            // We asserted that these are the builtins since func is a function
            memberCallReads.push(read);
            return false;
          }
        }

        if (read.parentNode.type === 'MemberExpression') {
          vlog('- Ignoring a property read...');
          return false;
        }

        vlog(
          '- bail: Function was used in one place where it was not an if-test nor being called;',
          read.parentNode.type,
          read.parentProp,
        );
        return true;
      })
    ) {
      return;
    }

    let varWrite;
    if (
      meta.writes.some((write) => {
        if (write.kind === 'var') {
          ASSERT(!varWrite);
          varWrite = write;
        } else if (write.kind === 'assign') {
          if (!AST.isPrimitive(write.parentNode.right)) {
            // TODO: type checks may still reveal that this is a falsy value
            vlog('- At least one assignment was not a primitive, bailing for now');
            return true;
          }
          if (AST.getPrimitiveValue(write.parentNode.right)) {
            vlog('- At least one write assigned a truthy primitive value, bailing');
            return true;
          }
        } else {
          vlog('- At least one write was neither the var nor an assignment, bailing', write.kind);
          return true;
        }
      })
    ) {
      return;
    }

    ASSERT(varWrite);


    updates += 1;
    const tmpName = createFreshVar('tmpFuncLock', fdata);

    // Schedule the func decl itself (injects the tmp var)
    queue.push({
      index: varWrite.blockIndex,
      func: () => {
        rule('A function that is declared and only overwritten by falsy values and only used in ifs and calls can be separated; lock decl step');
        example('let f = function(){}; if (f) { f(); f = false; }', 'let open = true; const f = function(){}; if (open) { f(); open = false; }');
        before(varWrite.blockBody[varWrite.blockIndex]);

        const finalNode = AST.varStatement('let', tmpName, AST.tru());
        varWrite.blockBody.splice(varWrite.blockIndex, 0, finalNode);

        after(varWrite.blockBody[varWrite.blockIndex]);
        after(varWrite.blockBody[varWrite.blockIndex + 1]);
      }
    });

    // Immediately replace the tests. They don't change index order.
    ifTestReads.forEach(read => {
      rule('A function that is declared and only overwritten by falsy values and only used in ifs and calls can be separated; if-test step');
      example('if (f) {}', 'if (tmpLock) {}');
      before(read.parentNode);

      read.parentNode.test = AST.identifier(tmpName);

      after(read.parentNode);
    });

    // Immediately make all writes write to the tmp var instead. No index caches harmed.
    // This way the func decl can become a const (which is the whole goal).
    meta.writes.forEach(write => {
      if (write === varWrite) return; // Skip the decl itself. That's assigning a func.
      // The other writes are assigning a falsy. Let them assign it to the lock instead.
      ASSERT(write.parentNode.type === 'AssignmentExpression' && write.parentProp === 'left', 'should be checked above');

      rule('A function that is declared and only overwritten by falsy values and only used in ifs and calls can be separated; mutate lock instead');
      example('if (f) { f(); f = false; }', 'if (open) { f(); open = false; }');
      before(write.blockBody[write.blockIndex]);

      write.parentNode.left = AST.identifier(tmpName);

      after(write.blockBody[write.blockIndex]);
    });

    // To make sure _unchecked_ calls still crash, wrap them in an if.
    // Be careful about the case where the call is assigned to a var. We'll need to schedule that because we insert a var.
    identCallReads.forEach((read) => {
      // This is for regular calls to the func as an ident.
      const throwNode = AST.throwStatement(AST.primitive('Preval: cannot call a locked function (binding overwritten with non-func)'));
      if (read.blockBody[read.blockIndex]?.type === 'ExpressionStatement') {
        // `f();` or `x = f();` --> `if (tmp) f(); else throw ...`

        rule('A function that is declared and only overwritten by falsy values and only used in ifs and calls can be separated; guard ident call expr');
        example('f();', 'if (tmpLock) f(); else throw "fail";');
        example('x = f();', 'if (tmpLock) x = f(); else throw "fail";');
        before(read.blockBody[read.blockIndex]);

        read.blockBody[read.blockIndex] = AST.ifStatement(
          tmpName,
          AST.blockStatement(read.blockBody[read.blockIndex]),
          AST.blockStatement(throwNode)
        );

        after(read.blockBody[read.blockIndex]);
      } else {
        // `const x = f();` --> `let x = undefined; if (tmp) x= f(); else throw ...`
        // We inject a var so we schedule it to preserve index caches
        queue.push({
          index: read.blockIndex,
          func: () => {
            rule('A function that is declared and only overwritten by falsy values and only used in ifs and calls can be separated; guard ident call to const expr');
            example('const x = f();', 'let x = undefined; if (tmpLock) x = f(); else throw "fail";');
            before(read.blockBody[read.blockIndex]);

            read.blockBody.splice(read.blockIndex, 1,
              AST.varStatement('let', read.blockBody[read.blockIndex].id, AST.undef()),
              AST.ifStatement(
                tmpName,
                AST.blockStatement(AST.expressionStatement(AST.assignmentExpression(
                  AST.identifier(read.blockBody[read.blockIndex].id.name),
                  read.blockBody[read.blockIndex].init
                ))),
                AST.blockStatement(throwNode)
              )
            );
          }
        });

        after(read.blockBody[read.blockIndex]);
      }
    });

    memberCallReads.forEach((read) => {
      // This is for dotcalls to the func as context
      const throwNode = AST.throwStatement(AST.primitive('Preval: cannot call a locked function (binding overwritten with non-func)'));
      if (read.blockBody[read.blockIndex]?.type === 'ExpressionStatement') {
        // `f.call();` or `x = f.call();` --> `if (tmp) f.call(); else throw ...`
        // `$dotCall($function_call, f, undefined);` or `x = $dotCall($function_call, f, undefined);` --> `if (tmp) $dotCall($function_call, f, undefined); else throw ...`

        rule('A function that is declared and only overwritten by falsy values and only used in ifs and calls can be separated; guard method call expr');
        example('f.call();', 'if (tmpLock) f.call(); else throw "fail";');
        example(`${SYMBOL_DOTCALL}(${symbo('function', 'call')}, f, undefined);`, `if (tmpLock) ${SYMBOL_DOTCALL}(${symbo('function', 'call')}); else throw "fail";`);
        example('x = f.call();', 'if (tmpLock) x = f.call(); else throw "fail";');
        example(`x = ${SYMBOL_DOTCALL}(${symbo('function', 'call')}, f, undefined);`, `if (tmpLock) x = ${SYMBOL_DOTCALL}(${symbo('function', 'call')}); else throw "fail";`);
        before(read.blockBody[read.blockIndex]);

        read.blockBody.splice(read.blockIndex, 1, AST.ifStatement(
          tmpName,
          AST.blockStatement(read.blockBody[read.blockIndex]),
          AST.blockStatement(throwNode)
        ));

        after(read.blockBody[read.blockIndex]);
      } else {
        // `const x = f.call();` --> `let x = undefined; if (tmp) x= f.call(); else throw ...`
        // `const x = $dotCall($function_call, f, undefined);` --> `let x = undefined; if (tmp) x= $dotCall($function_call, f, undefined); else throw ...`
        // We inject a var so we schedule it to preserve index caches
        queue.push({
          index: read.blockIndex,
          func: () => {

            rule('A function that is declared and only overwritten by falsy values and only used in ifs and calls can be separated; guard method call to const expr');
            example('const x = f.call();', 'let x = undefined; if (tmpLock) x = f.call(); else throw "fail";');
            example(`let x = ${SYMBOL_DOTCALL}(${symbo('function', 'call')}, f, undefined);`, `let x = undefined; if (tmpLock) x = ${SYMBOL_DOTCALL}(${symbo('function', 'call')}); else throw "fail";`);
            before(read.blockBody[read.blockIndex]);

            read.blockBody.splice(read.blockIndex, 1,
              AST.varStatement('let', read.blockBody[read.blockIndex].id, AST.identifier('undefined')),
              AST.ifStatement(
                tmpName,
                AST.blockStatement(AST.expressionStatement(AST.assignmentExpression(
                  AST.identifier(read.blockBody[read.blockIndex].id.name),
                  read.blockBody[read.blockIndex].init
                ))),
                AST.blockStatement(throwNode)
              )
            );

            after(read.blockBody[read.blockIndex]);
          }
        });
      }
    });
  });

  if (queue.length) {
    // By index, high to low. This way it should not be possible to cause reference problems by changing index
    queue.sort(({ index: a }, { index: b }) => b - a);
    queue.forEach(({ func }) => func());
  }
  if (updates) {
    log('Functions unlocked:', updates, '. Restarting from phase1 to fix up read/write registry.');
    return {what: 'functionLocks', changes: updates, next: 'phase1'};
  }

  log('Functions unlocked: 0.');
}
