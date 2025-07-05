// Find functions using `arguments.length` and figure out if they are always called with the same number of args.

import { ASSERT, log, group, groupEnd, vlog, vgroup, vgroupEnd, rule, example, before, source, after, fmat, tmat, findBodyOffset, todo, riskyRule, } from '../utils.mjs';
import * as AST from '../ast.mjs';

export function inlineArgLen(fdata) {
  group('\n\n\n[inlineArgLen] Checking for predictable `arguments.length` occurrences');
  //currentState(fdata, 'inlineArgLen', true, fdata);
  const r = _inlineArgLen(fdata);
  groupEnd();
  return r;
}
function _inlineArgLen(fdata) {
  const ast = fdata.tenkoOutput.ast;

  let updated = processAttempt(fdata);

  log('');
  if (updated) {
    log('`arguments.length` cases inlined:', updated, '. Restarting from normalization to fix up caches');
    return {what: 'inlineArgLen', changes: updated, next: 'normal'};
  }
  log('`arguments.length` cases inlined: 0.');
}

function processAttempt(fdata) {
  // Find arrays which are constants and do not escape and where all member expressions are reads

  let changed = 0;

  fdata.globallyUniqueNamingRegistry.forEach(function (meta, name) {
    if (!meta.isConstant) return;
    if (meta.isExport) return;
    if (meta.varDeclRef?.node.type !== 'FunctionExpression') return;

    vgroup('- `' + name + '` is a constant function');
    if (process(meta, name)) ++changed;
    vgroupEnd();
  });

  return changed;
}

function process(meta, name) {
  const funcNode = meta.varDeclRef.node;

  if (!funcNode.$p.readsArgumentsAny) return vlog('- bail: This function does not access `arguments`. Bailing');
  if (!meta.reads.length) return vlog('- bail: There were no reads to this function. Bailing');
  if (funcNode.params.some(p => p.rest)) return vlog('- bail: function uses a rest parameter');

  let globalArgCount = -1;
  if (
    !meta.reads.every((read) => {
      if (read.parentNode.type !== 'CallExpression') {
        return vlog('- bail: At least one read was not a call expression');
      }
      if (read.parentProp !== 'callee') {
        return vlog('- bail: The value is "lost", passed on as func arg');
      }

      if (read.parentNode.arguments.some(anode => anode.type === 'SpreadElement')) {
        return vlog('- bail: At least one call uses spread');
      }

      if (globalArgCount === -1) { // first?
        globalArgCount = read.parentNode['arguments'].length;
      } else if (globalArgCount !== read.parentNode['arguments'].length) {
        return vlog('- bail: There was at least two calls to this function with different arg count');
      }

      return true;
    })
  ) {
    return false;
  }

  vlog('Looks like the function is always called with', globalArgCount, 'args. Queuing for replacement.');

  const varWrite = meta.writes.find((write) => write.kind === 'var');
  ASSERT(varWrite);

  let changes = false;

  if (funcNode.$p.readsArgumentsLenAs) {
    rule('A function using `arguments.length` that is always called with the same arg count can replace the reference');
    example('function f() { f(arguments.length); } f(1, 2); f(3, 4);', 'function f() { f(2); } f(1, 2); f(3, 4);');
    before(varWrite.blockBody[varWrite.blockIndex]);

    // There should only ever be one reference to `arguments.length` per function

    ASSERT(funcNode.$p.readsArgumentsLenAt >= 0, 'should be set if it contains it', funcNode.$p);

    vlog('Arglen alias at', funcNode.$p.readsArgumentsLenAt);
    const aliasVarNode = funcNode.body.body[funcNode.$p.readsArgumentsLenAt];
    ASSERT(aliasVarNode?.type === 'VarStatement' && aliasVarNode.kind === 'const', 'arg.len alias should be a constant', 'func name: "', funcNode?.$p?.uniqueName, '", alias node:', aliasVarNode);

    funcNode.body.body[funcNode.$p.readsArgumentsLenAt] = AST.emptyStatement();
    funcNode.body.body.splice(
      funcNode.$p.bodyOffset,
      0,
      // Note: this should be our own alias so we should be able to keep it a constant...
      AST.varStatement('const', aliasVarNode.id, AST.literal(globalArgCount)),
    );

    after(varWrite.blockBody[varWrite.blockIndex]);
    changes = true;
  }

  if (funcNode.$p.readsArgumentsAs) {
    if (funcNode.params.length !== globalArgCount) {
      todo('inline arguments when function does not have that many params yet');
      vlog('- bail: need to inject params for this');
    } else {
      riskyRule('A function using `arguments` that is always called with the same arg count can be replaced with an array literal, probably');
      // I picked an array as replacement over a plain object because it needs to be iterable and for most intentions and purposes, that's what it does.
      example('function f(a, b) { f(arguments); } f(1, 2); f(3, 4);', 'function f(a, b) { const x = [a, b]; f(x); } f(1, 2); f(3, 4);');
      before(varWrite.blockBody[varWrite.blockIndex]);

      // - There should only ever be one reference to `arguments` per normalized function
      // - In strict mode, assigning to arguments.length would throw, so we would not expect too many cases of that.

      ASSERT(funcNode.$p.readsArgumentsAt >= 0, 'should be set if it contains it', funcNode.$p);

      vlog('Arg alias at', funcNode.$p.readsArgumentsAt);
      const aliasVarNode = funcNode.body.body[funcNode.$p.readsArgumentsAt];
      ASSERT(aliasVarNode?.type === 'VarStatement' && aliasVarNode.kind === 'const', 'arg.len alias should be a constant', 'func name: "', funcNode?.$p?.uniqueName, '", alias node:', aliasVarNode);

      funcNode.body.body[funcNode.$p.readsArgumentsAt] = AST.emptyStatement();
      funcNode.body.body.splice(
        funcNode.$p.bodyOffset,
        0,
        // Note: this should be our own alias so we should be able to keep it a constant...
        AST.varStatement(
          'const',
          aliasVarNode.id,
          AST.arrayExpression(
            // Note: if func has more params than args sent in, we only need the first N params.
            ...funcNode.$p.paramNames.slice(0, globalArgCount).map((pname,i) => {
              ASSERT(pname, 'TODO: inline arguments while some params are not used and have no alias anymore', funcNode);
              return AST.identifier(pname);
            })
          )
        ),
      );

      after(varWrite.blockBody[varWrite.blockIndex]);
      changes = true;
    }
  }


  return changes;
}
