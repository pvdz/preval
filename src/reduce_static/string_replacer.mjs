// Find complex cases of string.replace() and try to resolve them
//
//       'foo'.replace(a, b)
// ->
//       'bar'
//

import {
  after,
  ASSERT,
  before,
  currentState,
  example,
  group,
  groupEnd,
  hackyRule,
  log, rule, todo,
  vgroup,
  vgroupEnd,
  vlog,
} from '../utils.mjs';
import * as AST from '../ast.mjs';
import { NODEJS_REQUIRE, symbo } from '../symbols_builtins.mjs';
import { SYMBOL_COERCE, SYMBOL_DOTCALL } from '../symbols_preval.mjs';
import { RED, RESET } from '../constants.mjs';
import { isNewRegexLit } from '../ast.mjs';
import { createFreshVar } from '../bindings.mjs';

export function stringReplacer(fdata) {
  group('\n\n\n[stringReplacer] Finding non-trivial cases of string.replace to resolve\n');
  currentState(fdata, 'stringReplacer', true, fdata);
  const r = _stringReplacer(fdata);
  currentState(fdata, 'stringReplacer', true, fdata);
  groupEnd();
  return r;
}
function _stringReplacer(fdata) {
  let changes = 0;

  const meta =  fdata.globallyUniqueNamingRegistry.get(symbo('string', 'replace'));

  meta.reads.forEach(read => {
    if (read.parentNode.type !== 'CallExpression') return;
    if (read.parentNode.callee.type !== 'Identifier') return;
    if (read.parentNode.callee.name !== SYMBOL_DOTCALL) return; // no point in calling replace directly
    if (read.parentIndex !== 0) return; // this is not calling replace

    const context = read.parentNode.arguments[1];
    const args = read.parentNode.arguments.slice(3); // ignore dotcall args

    vgroup('Have a string.replace with context', context.type, 'and args', args.map(arg => arg.type));
    handleReplace(meta, read, context, args);
    vgroupEnd();
  });

  function handleReplace(meta, read, context, args) {
    if (args.length !== 2) return vlog('- bail: need two arguments');
    if (!AST.isPrimitive(context)) return vlog('- bail: context is not a string literal');

    const regexArg = args[0];
    const callbackArg = args[1];

    if (args[0].type !== 'Identifier') return vlog('- bail: first arg is not an identifier so it cannot be a regex ref');
    if (args[1].type !== 'Identifier') return vlog('- bail: second arg is not an identifier so it cannot be a func ref');

    const regexMeta = fdata.globallyUniqueNamingRegistry.get(regexArg.name);
    if (!regexMeta.isConstant) return vlog('- bail: regex is not constant');
    if (regexMeta.writes.length !== 1) return vlog('- bail: not one write');
    if (!regexMeta.reads.length) return vlog('- bail: no reads');
    if (!AST.isNewRegexLit(regexMeta.varDeclRef.node)) return vlog('- bail: regex const does not have regex init');

    const callbackMeta = fdata.globallyUniqueNamingRegistry.get(callbackArg.name);
    if (!callbackMeta.isConstant) return vlog('- bail: callback is not a const');
    if (callbackMeta.varDeclRef.node.type !== 'FunctionExpression') return vlog('- bail: callback is not a function');

    vlog('- ok, we have a call to string replace, on a string literal, with a regex and func arg', regexArg.name, callbackArg.name);

    // If there is no g flag then the callback is only ever called once
    // If the callback has a limited set of args, in particular one, then we can easily and safely (barring regex ddoss?) call it with the result

    const regexCall = regexMeta.varDeclRef.node;
    const funcNode = callbackMeta.varDeclRef.node;

    const regexBody = AST.getPrimitiveValue(regexCall.arguments[0]);
    const regexFlags = AST.getPrimitiveValue(regexCall.arguments[1]);

    vlog('- Regex:', regexBody, regexFlags);

    if (!regexFlags.includes('g') && !funcNode.$p.readsArgumentsAny) {
      vlog('- Regex has no global flag. Callback is called at most once.');
      // Missing global flag. This regex should invoke the callback only once.
      // Ok so replace will call a callback with `(match, ...capturingGroups, offset, string, groups)`
      // Only the groups argument is not a primitive so if the callback uses 3 or fewer parameters (and
      // no `arguments`) then we should be able to relatively safely inline this as a function call.

      const str = AST.getPrimitiveValue(context);

      // Note: The replacer args have an optional last arg that is "groups", an object. it is only passed on when there is a named group.
      //       We need the offset and there could be any number of capturing group args, so the only reliable way to get the index is to
      //       walk the received args from the back and take the second or third arg from the right, whichever is a number.

      let replaceArgs;
      const regex = new RegExp(regexBody, regexFlags);
      str.replace(regex, (...aas) => {
        ASSERT(replaceArgs === undefined, 'only ever triggers once, right');
        replaceArgs = aas
      });
      vlog('replaceArgs:', replaceArgs);

      if (replaceArgs) {
        vlog('The callback is called with', replaceArgs.length, 'arguments. We can inline all of them except the last.', replaceArgs, funcNode.params.length);
        if (funcNode.params.length < replaceArgs.length) {
          rule('When string.replace is called on a string, regex, and func, the regex has no global flag, and the func 3 or fewer params, we can partially resolve to just calling the callback');
          example(
            'const callback = function(a, b, c) { $(a, b, c); }; const regex = /b/; const x = "abc".replace(regex, callback); $(x);',
            'const callback = function(a, b, c) { $(a, b, c); }; const part = callback("b", 1, "abc"); const ps = $coerce(part, "string"); const x = `a${ps}c`; $(x);',
          );
          example(
            'const callback = function(a, b, c) { $(a, b, c); }; const regex = /nope/; "abc".replace(regex, callback)',
            'const callback = function(a, b, c) { $(a, b, c); }; ;', // Miss. Callback does not fire.
          );
          before(read.blockBody[read.blockIndex]);

          todo('sticky flag, lastindex cases');

          // Only if there are named capturing groups there is an extra last param: a groups object.
          // -1=groups, -2=whole, -3=offset, 1 ... -4 is group, 0 is matching part
          // -1=whole, -2=offset, 1 ... -3 is group, 0 is matching part
          const matchOffset = typeof replaceArgs[replaceArgs.length - 1] === 'string' ? replaceArgs[replaceArgs.length - 2] : replaceArgs[replaceArgs.length - 3];
          ASSERT(typeof matchOffset === 'number', 'we should be able to find the match offset in the real replace callback args', replaceArgs);
          const prefix = str.slice(0, matchOffset);
          vlog('so from', matchOffset, 'plus', replaceArgs[0].length);
          const suffix = str.slice(matchOffset + replaceArgs[0].length);
          vlog('prefix:', [prefix]);
          vlog('suffix:', [suffix]);

          // const tmp = callback(...replaceArgs);
          const tmp = createFreshVar('tmpStrReplVal', fdata);
          const mainCall = AST.varStatement('const', tmp, AST.callExpression(args[1], replaceArgs.map(v => AST.primitive(v))));

          const tmp2 = createFreshVar('tmpStrReplStr', fdata);
          const coerceCall = AST.varStatement('const', tmp2, AST.callExpression(SYMBOL_COERCE, [AST.identifier(tmp), AST.primitive('string')]));

          const resultNode = AST.templateLiteral([prefix, suffix], [AST.identifier(tmp2)]);

          if (read.grandIndex < 0) read.grandNode[read.grandProp] = resultNode;
          else read.grandNode[read.grandProp][read.grandIndex] = resultNode;
          read.blockBody.splice(read.blockIndex, 0, mainCall, coerceCall);

          after(read.blockBody[read.blockIndex]);
          after(read.blockBody[read.blockIndex+1]);
          after(read.blockBody[read.blockIndex+2]);
          changes = changes + 1;
          return;
        }
      } else {
        vlog('Looks like the regex is a MISS, callback is not invoked at all. We can eliminate the replace call entirely.');
        rule('When string.replace does not match at all, the callback is never called and we can drop the call');
        example('const x = "foo".replace(/bar/, ()=>{}); $(x);', 'const x = "foo"; $(x);');
        before(read.blockBody[read.blockIndex]);

        if (read.grandIndex < 0) read.grandNode[read.grandProp] = context;
        else read.grandNode[read.grandProp][read.grandIndex] = context;

        after(read.blockBody[read.blockIndex]);
        changes = changes + 1;
        return;
      }
    }
  }


  if (changes) {
    log('string.replace calls resolved:', changes, '. Restarting from phase1\n');
    return {what: 'stringReplacer', changes: changes, next: 'phase1'};
  }
  log('string.replace calls resolved: 0.\n');
}
