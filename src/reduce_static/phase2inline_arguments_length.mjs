// Find functions using `arguments.length` and figure out if they are always called with the same number of args.

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
  findBodyOffset,
} from '../utils.mjs';
import * as AST from '../ast.mjs';
import { mayBindingMutateBetweenRefs } from '../bindings.mjs';

export function inlineArgLen(fdata) {
  group('\n\n\nChecking for predictable `arguments.length` occurrences');
  //vlog('\nCurrent state\n--------------\n' + fmat(tmat(fdata.tenkoOutput.ast)) + '\n--------------\n');
  const r = _inlineArgLen(fdata);
  groupEnd();
  return r;
}
function _inlineArgLen(fdata) {
  const ast = fdata.tenkoOutput.ast;

  let updated = processAttempt(fdata);

  log('');
  if (updated) {
    log('`arguments.length` cases inlined:', updated, '. Restarting from phase1 to fix up read/write registry');
    return 'phase1';
  }
  log('`arguments.length` cases inlined: 0.');
}

function processAttempt(fdata) {
  // Find arrays which are constants and do not escape and where all member expressions are reads

  let changed = 0;

  fdata.globallyUniqueNamingRegistry.forEach(function (meta, name) {
    if (meta.isBuiltin) return;
    if (meta.isImplicitGlobal) return;
    if (!meta.isConstant) return;
    if (meta.constValueRef.node.type !== 'FunctionExpression') return;

    vgroup('- `' + name + '` is a constant function');
    if (process(meta, name)) ++changed;
    vgroupEnd();
  });

  return changed;
}

function process(meta, name) {
  const funcNode = meta.constValueRef.node;

  if (!funcNode.$p.readsArgumentsLen) {
    vlog('This function does not access `arguments.length`. Bailing');
    return false;
  }

  if (!meta.reads.length) {
    vlog('There were no reads to this function. Bailing');
    return false;
  }

  let paramCount = -1;
  if (
    meta.reads.some((read) => {
      if (read.parentNode.type !== 'CallExpression') {
        vlog('At least one read was not a call expression. Bailing');
        return true;
      }
      if (read.parentProp !== 'callee') {
        vlog('The value is "lost", passed on as func arg. Bailing');
        return true;
      }

      if (paramCount === -1) {
        paramCount = read.parentNode['arguments'].length;
      } else if (paramCount !== read.parentNode['arguments'].length) {
        vlog('There was at least two calls to this function with different arg count. Bailing');
        return true;
      }
    })
  ) {
    return false;
  }

  vlog('Looks like the function is always called with', paramCount, 'args. Queuing for replacement.');

  // - There should only ever be one reference to `arguments.length` per function
  // - Index movements relevant to this function should not cross function boundaries
  // So we should be able to move the alias out of the header and assign the constant, without worrying
  // about other functions where we need to do the same.

  const varWrite = meta.writes.find((write) => write.kind === 'var');
  ASSERT(varWrite);
  ASSERT(funcNode.$p.readsArgumentsLenAt >= 0, 'should be set if it contains it');

  const aliasVarNode = funcNode.body.body[funcNode.$p.readsArgumentsLenAt];
  ASSERT(aliasVarNode?.type === 'VariableDeclaration' && aliasVarNode.kind === 'const', 'arg.len alias should be constant');

  rule('A function using `arguments.length` that is always called with the same arg count can replace the reference');
  example('function f() { f(arguments.length); } f(1, 2); f(3, 4);', 'function f() { f(2); } f(1, 2); f(3, 4);');
  before(funcNode, varWrite.blockBody);

  funcNode.body.body[funcNode.$p.readsArgumentsLenAt] = AST.emptyStatement();
  funcNode.body.body.splice(
    funcNode.$p.bodyOffset,0,
    // Note: this should be our own alias so we should be able to keep it a constant...
    AST.variableDeclaration(aliasVarNode.declarations[0].id, AST.literal(paramCount), 'const'),
  );

  after(funcNode, varWrite.blockBody);

  return true;
}
