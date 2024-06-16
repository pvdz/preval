// Find function that get called once and then cleared. It's a bit of a specific pattern.
// `let f = function(){}; function g() { if (f) { f(); f = null; } } g(); g();'
// -> `let f = true; function g() { if (f) { const tmp = function(){}; tmp(); f = null; } } g(); g();'

// So the idea is that a function is used as an if-test and called and is initialized as a function but also assigned a falsy value.
// In that case we replace the original function binding with initialization to `true` and at the call site compile in a fresh
// binding that immediately gets called. This way the conditional semantics are retained while unblocking some type inference cases.

import { ASSERT, log, group, groupEnd, vlog, vgroup, vgroupEnd, rule, example, before, source, after, findBodyOffset } from '../utils.mjs';
import * as AST from '../ast.mjs';
import { createFreshVar } from '../bindings.mjs';
import { ASSUME_BUILTINS } from '../constants.mjs';

export function functionLocks(fdata) {
  group('\n\n\nLooking for functions that get locked after the first call\n');
  const r = _functionLocks(fdata);
  groupEnd();
  return r;
}
function _functionLocks(fdata) {
  // Find let bindings that start as a function and (only) get assigned falsy values
  // Confirm that they are only called and used in `if` tests or assigned to
  // Edge case: also support .call .apply (.bind)
  // Replace the init with `true`
  // Compile a new binding with the func before the call
  // Replace the callee of the call(s) with the new binding name

  const queue = [];

  fdata.globallyUniqueNamingRegistry.forEach((meta, name) => {
    if (meta.isImplicitGlobal) return;
    if (meta.isBuiltin) return;
    if (meta.isConstant) return;

    const funcNode = meta.constValueRef.node;
    if (funcNode.type !== 'FunctionExpression') return;

    vlog('- `' + name + '`:', meta.constValueRef.node.type);

    const identCallReads = [];
    const memberCallReads = []; // func.apply func.call func.bind
    if (
      meta.reads.some((read) => {
        if (read.parentNode.type === 'IfStatement') {
          return false;
        }

        if (read.parentNode.type === 'CallExpression' && read.parentProp === 'callee') {
          identCallReads.push(read);
          return false;
        }

        if (ASSUME_BUILTINS) {
          if (
            read.parentNode.type === 'MemberExpression' &&
            read.parentProp === 'object' &&
            !read.parentNode.computed &&
            ['apply', 'bind', 'call'].includes(read.parentNode.property.name) &&
            read.grandNode.type === 'CallExpression' &&
            read.grandProp === 'callee'
          ) {
            // func.apply(), func.call(), func.bind()
            // We asserted that these are the builtins since func is a function
            memberCallReads.push(read);
            return false;
          }
        }

        vlog(
          '- Function was used in one place where it was not an if-test nor being called; bailing',
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

    queue.push({
      index: varWrite.blockIndex,
      func: () => {
        rule('A function that is declared and only overwritten by falsy values and only used in ifs and calls can be separated');
        example('let f = function(){}; if (f) { f(); f = false; }', 'let f = true; const tmp = function(){}; if (f) { tmp(); f = false; }');
        //before(meta.writes.map((write) => write.blockBody[write.blockIndex]));
        //before(meta.reads.map((read) => read.blockBody[read.blockIndex]));

        before(varWrite.blockBody[varWrite.blockIndex]);

        varWrite.parentNode.init = AST.tru();
        const tmpName = createFreshVar('tmpFuncLock', fdata);
        const finalNode = AST.variableDeclaration(tmpName, funcNode, 'const');
        varWrite.blockBody.splice(varWrite.blockIndex, 0, finalNode);

        after(varWrite.blockBody[varWrite.blockIndex]);
        after(varWrite.blockBody[varWrite.blockIndex + 1]);

        identCallReads.forEach((read) => {
          rule('Each call should use the tmp var and be made conditional');
          before(read.blockBody[read.blockIndex]);

          read.parentNode.callee = AST.identifier(tmpName);

          const throwNode = AST.throwStatement(AST.primitive('Preval: cannot call a locked function (binding overwritten with non-func)'));
          if (read.blockBody[read.blockIndex]?.type === 'ExpressionStatement') {
            // `f();` or `x = f();`
            read.blockBody[read.blockIndex] = AST.ifStatement(
              name,
              AST.blockStatement(read.blockBody[read.blockIndex]),
              AST.blockStatement(throwNode)
            );
          } else {
            read.blockBody[read.blockIndex] = AST.blockStatement(
              AST.variableDeclaration(read.blockBody[read.blockIndex].declarations[0].id, AST.identifier('undefined'), 'let'),
              AST.ifStatement(
                name,
                AST.blockStatement(AST.expressionStatement(AST.assignmentExpression(
                  AST.identifier(read.blockBody[read.blockIndex].declarations[0].id.name),
                  read.blockBody[read.blockIndex].declarations[0].init
                  ))),
                AST.blockStatement(throwNode)
              )
            );
          }

          after(read.blockBody[read.blockIndex]);

        });
        memberCallReads.forEach((read) => {
          rule('Each member call should use the tmp var and be made conditional');
          before(read.blockBody[read.blockIndex]);

          read.parentNode.object = AST.identifier(tmpName);

          after(read.blockBody[read.blockIndex]);
        });


        //after(finalNode);
        //after(identCallReads.map((read) => read.blockBody[read.blockIndex]));
      },
    });
  });

  if (queue.length) {
    // By index, high to low. This way it should not be possible to cause reference problems by changing index
    queue.sort(({ index: a }, { index: b }) => (a < b ? 1 : a > b ? -1 : 0));
    queue.forEach(({ index, func }) => func());

    log('Functions unlocked:', queue.length, '. Restarting from phase1 to fix up read/write registry.');
    return 'phase1';
  }

  log('Functions unlocked: 0.');
  return false;
}
