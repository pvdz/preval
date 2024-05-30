// Find a specific pattern where a function param literally splits the behavior of a function in two, then or else path.
// `function f(a) { if (a) g(); else h(); } f(0); f(true);`
// `function fTruthy() { g(); } function fFalsy() { h(); } fTruthy(); fFalsy();`

// The pattern is a proof of concept used to break a decision in a certain piece of code where preval ran stuck on it.
// Not sure how generic it is, but who knows.

import { ASSERT, log, group, groupEnd, vlog, vgroup, vgroupEnd, rule, example, before, source, after, findBodyOffset } from '../utils.mjs';
import * as AST from '../ast.mjs';
import { createFreshVar } from '../bindings.mjs';
import { ASSUME_BUILTINS } from '../constants.mjs';

export function functionSplitting(fdata) {
  group('\n\n\nLooking for funcs where a param splits the behavior of the function\n');
  const r = _funcionSplitting(fdata);
  groupEnd();
  return r;
}
function _funcionSplitting(fdata) {
  const queue = [];

  new Map(fdata.globallyUniqueNamingRegistry).forEach((meta, name) => {
    if (meta.isImplicitGlobal) return;
    if (meta.isBuiltin) return;
    if (!meta.isConstant) return;

    const funcNode = meta.constValueRef.node;
    if (funcNode.type !== 'FunctionExpression') return;

    vlog('- `' + name + '`:', meta.constValueRef.node.type);

    if (meta.writes.length !== 1) {
      vlog('This constant has multiple writes. Need to eliminate those runtime errors first.');
      return;
    }

    ASSERT(findBodyOffset(funcNode) === funcNode.$p.bodyOffset, 'not stale plz');
    // A function body contains a header, debugger statement, body, and at least one return statement which may be inside an if
    const bodySize = funcNode.body.body.length - funcNode.$p.bodyOffset;

    if (bodySize === 2) {
      const last = funcNode.body.body[funcNode.body.body.length - 1];
      if (last.type === 'ReturnStatement' || last.type === 'ThrowStatement') {
        // ok
      } else {
        vlog('- Function body contained two statements and last one was not a return or throw, bailing');
        return;
      }
    } else if (bodySize !== 1) {
      vlog('- Function body contained more than one statement, bailing');
      return;
    }

    let tries = false;
    let tryNode;
    let ifNode = funcNode.body.body[funcNode.$p.bodyOffset];
    ASSERT(ifNode);

    if (ifNode.type !== 'IfStatement') {
      // Check for `try { if (splitter) ... } catch (e) {}`
      if (ifNode.type === 'TryStatement') {
        // Hacky exception to support an if inside a try that doesn't really do anything else
        // Confirm whether or not the try is hollow (not really doing anything)
        tryNode = ifNode; // Keep sanity
        if (
          tryNode.block.body.length === 1 &&
          tryNode.block.body[0].type === 'IfStatement' &&
          tryNode.handler.body.body.length === 0
        ) {
          vlog('- The try handler is hollow and only contains the `if`, we can proceed.');
          ifNode = tryNode.block.body[0];
          tries = true;
        } else {
          vlog('- The `try` exception did not match. We must bail');
          return;
        }
      } else {
        vlog('- The body was not just an `if` node, bailing');
        return;
      }
    }

    if (ifNode.test.type !== 'Identifier') {
      vlog('- The if was not testing on `if`');
      return;
    }

    if (fdata.globallyUniqueNamingRegistry.get(ifNode.test.name).reads.length > 1) {
      // TODO: easy to support when we properly implement this and make names unique. For now, we bail.
      vlog('The param is used more than in just the `if` test, bailing');
      return;
    }

    const paramIndex = funcNode.$p.paramNames.indexOf(ifNode.test.name);

    if (funcNode.params.some((pnode, pi) => pi <= paramIndex && pnode.rest)) {
      vlog('- At least one param of the function was a spread, and it was before the target param, bailing');
      return;
    }

    if (paramIndex < 0) {
      vlog('- The `if` is not testing on a param name, bailing');
      return;
    }

    // So far so good. Now we check whether the function is only called and whether we know the truthy value
    // of this particular param in all these cases. We also need to check for spread before/on the arg index.

    const toReplace = [];
    if (
      meta.reads.some((read) => {
        if (read.parentNode.type !== 'CallExpression' || read.parentProp !== 'callee') {
          vlog('- The function was not called in at least one case, bailing', read.parentNode.type, read.parentProp);
          return true;
        }

        if (
          read.parentNode['arguments'].some((anode, ai) => {
            if (ai <= paramIndex && anode.type === 'SpreadElement') {
              vlog('- At least one arg of the call before or on the target arg index was a spread, bailing');
              return true;
            }
          })
        ) {
          return true;
        }

        const argNode = read.parentNode['arguments'][paramIndex];
        if (argNode) {
          // Verify that the booly value is known
          if (AST.isTruthy(argNode)) {
            toReplace.push([read, true]);
          } else if (AST.isFalsy(argNode)) {
            toReplace.push([read, false]);
          } else if (argNode.type === 'Identifier') {
            // If this is `arguments` then it must be the implicit global so that's fine
            const ameta = fdata.globallyUniqueNamingRegistry.get(argNode.name);
            if (ameta.typing.mustBeTruthy) {
              toReplace.push([read, true]);
            } else if (ameta.typing.mustBeFalsy) {
              toReplace.push([read, false]);
            } else {
              vlog('- We do not know the booly value of the arg in this call so we must bail');
              return true;
            }
          } else {
            vlog('- Can not determine the truthy value for this node:', argNode.type);
            return true;
          }
        } else {
          vlog('- No arg so this is undefined so falsy');
          toReplace.push([read, false]);
        }
      })
    ) {
      return;
    }

    // So we have now a function that splits on the param and all we know the booly state for all the calls...
    // I guess now we clone it.
    // Ideally we'd just copy/paste it and call that a day. But that is only possible if there was exactly
    // one param to begin with (in that case there are no idents shared between branches so it'd be a simple
    // step that does not need cloning).

    if (funcNode.params.length > 1) {
      vlog('TODO :*)');
      return;
    }

    const varWrite = meta.writes.find((write) => write.kind === 'var');
    ASSERT(varWrite);

    vlog('Pattern found. Cached the transform');
    queue.push({
      index: varWrite.blockIndex,
      func: () => {
        if (tries) {
          ASSERT(bodySize === 2, 'for the `try` case, the return/throw will follow the `try`so there are two nodes, right?', bodySize);
          const lastStatement = funcNode.body.body[funcNode.body.body.length - 1];
          ASSERT(lastStatement.type === 'ReturnStatement' || lastStatement.type === 'ThrowStatement');
          const exitArg = lastStatement.argument;

          // A little more work to properly split but pretty much the same deal
          rule(
            'If a function can be split on a param with an if and we know all truthy values of that param then we can split the function (try case)',
          );
          example(
            'function f(a) { try { if (a) g(); else h(); } f(0); f(true); } catch {}',
            'function T(a) { try { g(); } catch {} } function F(a) { try { h(); } catch {} } F(0); T(true);',
          );
          before(funcNode);
          before(toReplace.map(([read]) => read.blockBody[read.blockIndex]));

          const tmpNameCatchParam = createFreshVar('tmpCatchParam', fdata);
          const tmpNameCatchParam2 = createFreshVar('tmpCatchParam', fdata);

          const tmpNameTruthy = createFreshVar('tmpSplitTruthy', fdata);
          const funcTruthy = AST.functionExpression(
            [],
            [
              AST.debuggerStatement(),
              AST.tryStatement(
                AST.blockStatement(ifNode.consequent.body),
                AST.identifier(tmpNameCatchParam),
                tryNode.handler ? AST.blockStatement() : null,
                tryNode.handler ? null : AST.blockStatement(),
              ),
              AST.returnStatement('undefined'),
              lastStatement.type === 'ReturnStatement'
                ? AST.returnStatement(AST.cloneSimple(exitArg))
                : AST.throwStatement(AST.cloneSimple(exitArg)),
            ],
            { normalized: true },
          );
          const varTruthy = AST.variableDeclaration(tmpNameTruthy, funcTruthy, 'const');

          const tmpNameFalsy = createFreshVar('tmpSplitFalsy', fdata);
          const funcFalsy = AST.functionExpression(
            [],
            [
              AST.debuggerStatement(),
              AST.tryStatement(
                AST.blockStatement(ifNode.alternate.body),
                AST.identifier(tmpNameCatchParam2),
                tryNode.handler ? AST.blockStatement() : null,
                tryNode.handler ? null : AST.blockStatement(),
              ),
              lastStatement.type === 'ReturnStatement' ? AST.returnStatement(exitArg) : AST.throwStatement(exitArg),
            ],
            { normalized: true },
          );
          const varFalsy = AST.variableDeclaration(tmpNameFalsy, funcFalsy, 'const');

          varWrite.blockBody.splice(varWrite.blockIndex, 1, varTruthy, varFalsy);
          toReplace.forEach(([read, value]) => {
            // These are call calls so we should be able to safely replace the callee straight
            read.parentNode.callee = AST.identifier(value ? tmpNameTruthy : tmpNameFalsy);
          });

          after(varTruthy);
          after(varFalsy);
          after(toReplace.map(([read]) => read.blockBody[read.blockIndex]));
        } else {
          ASSERT(bodySize === 1, 'for the `if` case, the return/throw will have moved inside the `if` so there is only one node, right?');

          rule(
            'If a function can be split on a param with an if and we know all truthy values of that param then we can split the function',
          );
          example('function f(a) { if (a) g(); else h(); } f(0); f(true);', 'function T(a) { g(); } function F(a) { h(); } F(0); T(true);');
          before(funcNode);
          before(toReplace.map(([read]) => read.blockBody[read.blockIndex]));

          const tmpNameTruthy = createFreshVar('tmpSplitTruthy', fdata);
          const funcTruthy = AST.functionExpression([], [AST.debuggerStatement(), ...ifNode.consequent.body], { normalized: true });
          const varTruthy = AST.variableDeclaration(tmpNameTruthy, funcTruthy, 'const');

          const tmpNameFalsy = createFreshVar('tmpSplitTruthy', fdata);
          const funcFalsy = AST.functionExpression([], [AST.debuggerStatement(), ...ifNode.alternate.body], { normalized: true });
          const varFalsy = AST.variableDeclaration(tmpNameFalsy, funcFalsy, 'const');

          varWrite.blockBody.splice(varWrite.blockIndex, 1, varTruthy, varFalsy);
          toReplace.forEach(([read, value]) => {
            // These are call calls so we should be able to safely replace the callee straight
            read.parentNode.callee = AST.identifier(value ? tmpNameTruthy : tmpNameFalsy);
          });

          after(varTruthy);
          after(varFalsy);
          after(toReplace.map(([read]) => read.blockBody[read.blockIndex]));
        }
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
