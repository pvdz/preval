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
  findBodyOffset,
} from '../utils.mjs';
import * as AST from '../ast.mjs';
import {createFreshVar, mayBindingMutateBetweenRefs} from '../bindings.mjs';
import { SYMBOL_COERCE } from '../symbols_preval.mjs';
import { symbo } from '../symbols_builtins.mjs';

export function buffer_base64(fdata) {
  group('\n\n\nChecking for buffer_base64; base64 decoding through Buffer');
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
    // - const <b> = Buffer.toString(a, 'utf8');
    // - return b;
    if (statementCount !== 3 && statementCount !== 4) {
      vlog('  - The function does not have three or four statements so it cannot be a bool trampoline');
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
      index += 1;
    }

    // TODO: ignore the params aside from at least one

    // Must have a param and we must know what it is
    if (funcNode.params.length !== 1) return vlog('- bail: func param != 1');
    if (funcNode.params[0].type !== 'Param') return vlog('- bail: a');
    if (funcNode.params[0].rest) return vlog('- bail: b');
    const paramName = funcNode.$p.paramNames[0];
    if (!paramName) return vlog('- bail: c');

    let extra = null;
    if (
      funcBody[index]?.type === 'ExpressionStatement' &&
      funcBody[index].expression.type === 'AssignmentExpression' &&
      funcBody[index].expression.left.type === 'Identifier' &&
      funcBody[index].expression.right.type === 'Identifier' &&
      funcBody[index].expression.left.name !== paramName &&
      funcBody[index].expression.right.name === paramName
    ) {
      extra = funcBody[index].expression;
      index += 1;
      if (!funcBody[index]) return vlog('bail: aa');
    }

    // Find the `var x = Buffer.from(param, 'base64')` part
    // Note: we will invariably convert Buffer.from into a symbo ($Buffer_from)
    // So that's the pattern we'll be looking for, even if technically both can appear
    if (funcBody[index].type !== 'VarStatement') return vlog('- bail: d');
    const init1 = funcBody[index].init;
    if (init1.type !== 'CallExpression') return vlog('- bail: e');
    if (init1.callee.type !== 'Identifier') return vlog('- bail: f');
    if (init1.callee.name !== symbo('Buffer', 'from')) return vlog('- bail: f');
    if (init1.arguments.length !== 2) return vlog('- bail: k');
    if (init1.arguments[0].type !== 'Identifier') return vlog('- bail: l');
    if (init1.arguments[0].name !== paramName) return vlog('- bail: m');
    if (!AST.isStringLiteral(init1.arguments[1])) return vlog('- bail: n');
    if (AST.getPrimitiveValue(init1.arguments[1]) !== 'base64') return vlog('- bail: o');
    const tmpName = funcBody[index].id.name;

    // Find the `var y = y.toString('utf8')` part
    const init2 = funcBody[index+1].init;
    if (init2.type !== 'CallExpression') return vlog('- bail: p');
    if (init2.callee.type !== 'MemberExpression') return vlog('- bail: q');
    if (init2.callee.computed) return vlog('- bail: r');
    if (init2.callee.object.type !== 'Identifier') return vlog('- bail: s');
    if (init2.callee.object.name !== tmpName) return vlog('- bail: t');
    if (init2.callee.property.name !== 'toString') return vlog('- bail: u');
    if (init2.arguments.length !== 1) return vlog('- bail: v');
    if (!AST.isStringLiteral(init2.arguments[0])) return vlog('- bail: y');
    if (AST.getPrimitiveValue(init2.arguments[0]) !== 'utf8') return vlog('- bail: z');

    // And finally the `return y` part
    if (funcBody[index+2].type !== 'ReturnStatement') return vlog('- bail: aa');
    if (funcBody[index+2].argument?.type !== 'Identifier') return vlog('- bail: bb');
    if (funcBody[index+2].argument.name !== funcBody[index+1].id.name) return vlog('- bail: cc');

    vlog(`Found the base64decode Buffer pattern in function \`${funcName}\`, now reducing call sites`);

    // I believe we've verified the pattern at this point.
    // Find all calls that pass in a string and apply the conversion

    meta.reads.forEach((read, i) => {
      vlog('- Read', i);
      // First check whether this is actually a call to the binding
      if (read.parentNode.type !== 'CallExpression') {
        vlog('  - Not a call expression, bailing');
        return;
      }
      if (read.parentProp !== 'callee') {
        vlog('  - Not the thing being called in this the expression, bailing');
        return;
      }

      // Confirm that the first arg is a string
      // TODO: param index doesn't matter as long as it maps to the relevant param

      const param = read.parentNode.arguments[0];
      if (!AST.isStringLiteral(param)) return vlog('  - First arg is not a string, bailing');

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
