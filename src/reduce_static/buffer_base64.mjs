// Find a function that looks like base64 decoding through Buffer and resolve it
//
// ```
// const f/*:(string)=>?*/ = function ($$0) {
//   const _0x1a8433/*:string*/ = $$0;
//   debugger;
//   Buffer;
//   const tmpCallCompObj$23 = Buffer.from(_0x1a8433, `base64`);
//   const tmpReturnArg$17 = tmpCallCompObj$23.toString(`utf8`);
//   return tmpReturnArg$17;
// };
// f('ZXhpc3RzU3luYw');
// ```
//
// ->
//
// ```
// 'existsSync'
// ```
//
// Note that there's also a transform for this case where it is
// not in a function, search for cases of `symbo('Buffer', 'from')`


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
  coerce,
  findBodyOffset, todo,
} from '../utils.mjs';
import * as AST from '../ast.mjs';
import {createFreshVar, mayBindingMutateBetweenRefs} from '../bindings.mjs';
import { SYMBOL_COERCE, SYMBOL_DOTCALL } from '../symbols_preval.mjs';
import { symbo } from '../symbols_builtins.mjs';

export function bufferBase64(fdata) {
  group('\n\n\n[bufferBase64] Checking for buffer_base64; base64 decoding through Buffer');
  //vlog('\nCurrent state\n--------------\n' + fmat(tmat(fdata.tenkoOutput.ast)) + '\n--------------\n');
  const r = _buffer_base64(fdata);
  groupEnd();
  return r;
}
function _buffer_base64(fdata) {
  let updated = 0;

  fdata.globallyUniqueNamingRegistry.forEach((meta, funcName) => {
    if (meta.isImplicitGlobal) return;
    if (meta.isBuiltin) return;
    if (!meta.isConstant) return;

    const funcNode = meta.varDeclRef.node;
    if (funcNode.type !== 'FunctionExpression') return;

    vlog('- `' + funcName + '`:', meta.varDeclRef.node.type);

    const funcParams = funcNode.params;

    // Ignore this step if the function has a rest arg. It'll be too difficult to map for now.
    const lastParam = funcParams[funcParams.length - 1];
    ASSERT(lastParam === undefined || lastParam.type === 'Param');
    vlog('  - Has rest?', !!lastParam?.rest);
    if (lastParam?.rest) {
      vlog('  - Bailing. Cannot deal with rest right now');
      return;
    }

    const bodyOffset = findBodyOffset(funcNode);
    const statementCount = funcNode.body.body.length - bodyOffset;

    // We are looking for the pattern:
    // - Buffer; (Let's make this one optional)
    // - const <a> = Buffer.from($$1. 'base64')
    // - const <t> = a.toString;
    // - const <b> = $dotCall(t, a, undefined, 'utf8');
    // - return b;
    if (statementCount !== 4 && statementCount !== 5) {
      vlog('  - The function does not have four or five statements so it cannot be a bool trampoline');
      return;
    }

    const funcBody = funcNode.body.body;
    let index = bodyOffset;
    if (
      funcBody[index].type === 'ExpressionStatement' &&
      funcBody[index].expression.type === 'Identifier' &&
      ['Buffer', '$Buffer_from'].includes(funcBody[index].expression.name)
    ) {
      // This is an artifact and we can ignore it
      todo('these should be eliminated by eliminating builtin-globals-as-statements in normalize');
      vlog('  - Skipping dud statement');
      index += 1;
    }

    // TODO: ignore the params aside from at least one

    vlog('  - Discovering target param');
    // Must have a param and we must know what it is
    if (funcNode.params.length !== 1) return vlog('  - bail: func param != 1');
    if (funcNode.params[0].type !== 'Param') return vlog('  - bail: param[0] is not a param?');
    if (funcNode.params[0].rest) return vlog('  - bail: param[0] is rest');
    const paramName = funcNode.$p.paramNames[0];
    if (!paramName) return vlog('  - bail: param[0] has no name, unused?');
    vlog('  - Param should be', [paramName]);

    // In our target pattern there may be an assignment to an implicit global. Ignore it (but do keep it etc).
    let extra = null;
    if (
      funcBody[index]?.type === 'ExpressionStatement' &&
      funcBody[index].expression.type === 'AssignmentExpression' &&
      funcBody[index].expression.left.type === 'Identifier' &&
      funcBody[index].expression.right.type === 'Identifier' &&
      funcBody[index].expression.left.name !== paramName &&
      funcBody[index].expression.right.name === paramName
    ) {
      vlog('  - Skipping expected assignment to implicit global');
      extra = funcBody[index].expression;
      index += 1;
      if (!funcBody[index]) return vlog('  - bail: missing next statement? impossible i think because we asserted the len before... but here we are');
    }

    vlog('  - Checking step 1: Buffer.from(param, base64)');
    // Find the `var x = Buffer.from(param, 'base64')` part
    // Note: we will invariably convert Buffer.from into a symbo ($Buffer_from)
    // Note: any dotcall with buffer_from will be forced to a regular call
    // So that's the pattern we'll be looking for, even if technically both can appear
    if (funcBody[index].type !== 'VarStatement') return vlog('  - bail: step 1 is not a var statement');
    const init1 = funcBody[index].init;
    if (init1.type !== 'CallExpression') return vlog('  - bail: step 1 is not a call');
    if (init1.callee.type !== 'Identifier') return vlog('  - bail: step 1 is not an ident call??');
    if (init1.callee.name !== symbo('Buffer', 'from')) return vlog('  - bail: step 1 is not buffer.from');
    if (init1.arguments.length !== 2) return vlog('  - bail: step 1 dotcall does not have five args');
    if (init1.arguments[0].type !== 'Identifier') return vlog('  - bail: step 1 call arg 1 is not an ident');
    if (init1.arguments[0].name !== paramName) return vlog('  - bail: step 1 call arg is not param');
    if (!AST.isStringLiteral(init1.arguments[1])) return vlog('  - bail: step 1 call arg 2 is not a string');
    if (AST.getPrimitiveValue(init1.arguments[1]) !== 'base64') return vlog('  - bail: step 1 call arg 2 is not "base64"');
    // Ok, this is some form of `const buf = Buffer.from(param, "base64");`

    if (funcBody[index+1]?.type !== 'VarStatement') return vlog('  - bail: missing tmp var statement');
    vlog('  - Checking step 2: const tmp = buf.toString');
    const method = funcBody[index+1];
    if (method.init.type !== 'MemberExpression') return vlog('  - bail: tmp var init is not a member', method.init.type); // TODO: or builtin? we'll probably revisit this soon enough :)
    if (method.init.object.type !== 'Identifier') return vlog('  - bail: tmp var obj is not an ident');
    if (method.init.object.name !== funcBody[index].id.name) return vlog('  - bail: tmp var obj is not reading a property from the buffer');
    if (method.init.computed) return vlog('  - bail: tmp var obj is reading computed property');
    if (method.init.property.name !== 'toString') return vlog('  - bail: tmp var obj is not reading the `toString` property, which is what we are targeting explicitly');
    // Ok, this is some form of `const tmp = buf.toString;`

    vlog('  - Checking step 3: calling tmp with $dotcall');
    // Find the `var y = y.toString('utf8')` part
    const init2 = funcBody[index+2].init;
    if (init2.type !== 'CallExpression') return vlog('  - bail: init not call');
    if (init2.callee.type !== 'Identifier') return vlog('  - bail: callee not ident??');
    if (init2.callee.name !== SYMBOL_DOTCALL) return vlog('  - bail: not dotcalling');
    if (init2.arguments.length !== 4) return vlog('  - bail: dotcall does not have 4 args');
    if (init2.arguments[0].type !== 'Identifier') return vlog('  - bail: dotcall callee not ident?');
    if (init2.arguments[0].name !== method.id.name) return vlog('  - bail: dotcall callee not calling the tmp tostring');
    if (init2.arguments[1].type !== 'Identifier') return vlog('  - bail: dotcall context not ident');
    if (init2.arguments[1].name !== funcBody[index].id.name) return vlog('  - bail: dotcall context not the buffer');
    if (!AST.isStringLiteral(init2.arguments[3])) return vlog('  - bail: arg not primitive');
    if (AST.getPrimitiveValue(init2.arguments[3]) !== 'utf8') return vlog('  - bail: arg not "utf8"');
    // Ok, this is some form of `const r = $dotCall(tmp, buf, "toString", "utf8");`

    vlog('  - Checking step 4: returning the dotcall result');
    // And finally the `return y` part
    if (funcBody[index+3].type !== 'ReturnStatement') return vlog('  - bail: not returning??');
    if (funcBody[index+3].argument?.type !== 'Identifier') return vlog('  - bail: not returning an ident');
    if (funcBody[index+3].argument.name !== funcBody[index+2].id.name) return vlog('  - bail: not returning the toString result');

    vlog(`  - ok: Found the base64decode Buffer pattern in function \`${funcName}\`, now reducing call sites`);

    // I believe we've verified the pattern at this point.
    // Find all calls that pass in a string and apply the conversion

    meta.reads.forEach((read, i) => {
      vlog('  - Read', i);
      // First check whether this is actually a call to the binding
      if (read.parentNode.type !== 'CallExpression') {
        vlog('    - bail: Not a call expression');
        return;
      }
      if (read.parentProp !== 'callee') {
        vlog('    - bail: Not the thing being called in this the expression');
        return;
      }

      // Confirm that the first arg is a string
      // TODO: param index doesn't matter as long as it maps to the relevant param

      const param = read.parentNode.arguments[0];
      if (!AST.isStringLiteral(param)) return vlog('    - bail: First arg is not a string');

      rule('A call to a function that does base64 decode through Buffer can be inlined');
      example(
        'const f = function(s) { const x = Buffer.from(s, "base64"); const y = x.toString("utf8"); return y; } $(f("cGF0aA"))',
      'const f = function(s) { const x = Buffer.from(s, "base64"); const y = x.toString("utf8"); return y; } $("path")'
      );
      before(meta.varDeclRef.varDeclNode);
      before(read.blockBody[read.blockIndex]);

      const value = AST.getPrimitiveValue(param);

      // Note: atob() is not the same as Buffer.from().toString() because Buffer is less strict about the encoding
      const x = Buffer.from(value, 'base64');
      const y = x.toString('utf8');

      if (read.grandIndex < 0) read.grandNode[read.grandProp] = AST.templateLiteral(y);
      else read.grandNode[read.grandProp][read.grandIndex] = AST.templateLiteral(y);

      if (extra) {
        read.blockBody.splice(read.blockIndex, 0, AST.expressionStatement(
          AST.assignmentExpression(
            AST.cloneSimple(extra.left),
            AST.cloneSimple(param),
          )
        ));
      }

      after(read.blockBody[read.blockIndex]);
      if (extra) after(read.blockBody[read.blockIndex+1]);
      ++updated;
    });
    vgroupEnd();

  });

  if (updated) {
    log('buffer_base64 inlined:', updated, '. Restarting from phase1 to fix up read/write registry.');
    return {what: 'boolTrampolines', changes: updated, next: 'phase1'};
  }

  log('buffer_base64 inlined: 0.');
  return false;
}
