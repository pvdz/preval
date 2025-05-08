// Find `if` tests that are identifier and whose value is inverted inside either branch
//
//      if (x) y = !x;
// ->
//      if (x) y = false;

import walk from '../../lib/walk.mjs';
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
import { symbo } from '../symbols_builtins.mjs';

export function ifTestBool(fdata) {
  group('\n\n\n[ifTestBool] Checking for if-tests that are inverted');
  //currentState(fdata, 'ifTestBool'. true, fdata);
  const r = _ifTestBool(fdata);
  groupEnd();
  return r;
}
function _ifTestBool(fdata) {
  const ast = fdata.tenkoOutput.ast;

  let changed = 0;

  // TODO: probably faster to walk the known binding names and check if any of them are used as an if-test
  walk(_walker, ast, 'ast');
  function _walker(node, beforeWalk, nodeType, path) {
    if (beforeWalk) return;

    if (node.type !== 'IfStatement') return;
    if (node.test.type !== 'Identifier') return;

    vlog('If on ident;', [node.test.name]);

    // First find the `var x = a === b``
    const ifTestMeta = fdata.globallyUniqueNamingRegistry.get(node.test.name);
    if (ifTestMeta.isBuiltin) return;
    if (ifTestMeta.isImplicitGlobal) return;
    if (ifTestMeta.varDeclRef.varDeclNode.type !== 'VarStatement') return; // catch, for-x, ???
    if (!ifTestMeta.isConstant) return;
    //if (meta.writes.length > 1) return; // TODO: fixme if broken

    let varDeclRef = ifTestMeta.writes.find((write) => write.kind === 'var');
    if (!varDeclRef) {
      vlog('The binding was not a var. Bailing');
      return;
    }

    const beforeValueNode = ifTestMeta.varDeclRef.node;
    vlog('If on constant or if is immediately after var:', beforeValueNode.type);

    // When the `if-test` ident is aliased as an explicit boolean (!x or Boolean(x)) then
    // inside the if/else we would know the concrete value of that alias.
    // Only for const. And then it doesn't really matter where the alias happens but usually
    // before. The only exception there being TDZ semantics. Not sure about that actually.
    const boolAliasesEq = [];
    const boolAliasesInv = [];

    // Find all reads to the ident and see if we can predict something with the truthy/falsy state of the var
    vgroup('First trick failed. Now searching all reads of the test ident `' + ifTestMeta.uniqueName + '`');
    ifTestMeta.reads.forEach((read, ri) => {
      vlog('- read', ri);

      if (+read.node.$p.pid > +node.consequent.$p.pid && +read.node.$p.pid <= +node.consequent.$p.lastPid) {
        vlog('ref in if branch, mustbe:', ifTestMeta.typing.mustBeType);

        if (ifTestMeta.typing.mustBeType === 'boolean') {
          // We are in a consequent branch of an `if` where the test is an ident that we know is a bool.
          // As such, we know the value must be `true` inside this branch, and we can replace all occurrences
          // with that value.
          rule('A bool ident inside a consequent branch testing for that ident must mean its true');
          example('const x = !y; if (x) $(x, 1) else {}', 'const x = !y; if (x) $(true, 1) else {}');
          before(read.blockBody[read.blockIndex]);

          if (read.parentIndex < 0) read.parentNode[read.parentProp] = AST.tru();
          else read.parentNode[read.parentProp][read.parentIndex] = AST.tru();

          after(read.blockBody[read.blockIndex]);
          ++changed;
        }
        else if (read.parentNode.type === 'UnaryExpression' && read.parentNode.operator === '!') {
          rule('Inverting an `if`-tested constant in the consequent branch must yield `false`');
          example('if (x) y = !x', 'if (x) y = false;');
          before(read.blockBody[read.blockIndex]);

          if (read.grandIndex < 0) read.grandNode[read.grandProp] = AST.fals();
          else read.grandNode[read.grandProp][read.grandIndex] = AST.fals();
          ++changed;

          after(read.blockBody[read.blockIndex]);
        }
        else if (
          read.parentNode.type === 'CallExpression' &&
          read.parentNode.callee.type === 'Identifier' &&
          read.parentNode.callee.name === symbo('boolean', 'constructor') &&
          read.parentNode['arguments'].length === 1 &&
          read.parentProp === 'arguments'
        ) {
          rule('Boolean() on an `if`-tested constant in the consequent branch must yield `true`');
          example('if (x) y = Boolean(x);', 'if (x) y = false;');
          before(read.blockBody[read.blockIndex]);

          if (read.grandIndex < 0) read.grandNode[read.grandProp] = AST.tru();
          else read.grandNode[read.grandProp][read.grandIndex] = AST.tru();
          ++changed;

          after(read.blockBody[read.blockIndex]);
        }
        else {
          vlog('- bail: Not unary excl, not calling Boolean');
        }
      }
      else if (+read.node.$p.pid > +node.alternate.$p.pid && +read.node.$p.pid <= +node.alternate.$p.lastPid) {
        vlog('ref in else branch, mustbe:', ifTestMeta.typing.mustBeType);

        if (ifTestMeta.typing.mustBeType === 'boolean') {
          // We are in the alternate branch of an `if` where the test is an ident that we know is a bool.
          // As such, we know the value must be `false` inside this branch, and we can replace all occurrences
          // with that value.
          rule('A bool ident inside an alternate branch testing for that ident must mean its false');
          example('const x = !y; if (x) {} else $(x, 1)', 'const x = !y; if (x) {} else $(false, 1)');
          before(read.blockBody[read.blockIndex]);

          if (read.parentIndex < 0) read.parentNode[read.parentProp] = AST.fals();
          else read.parentNode[read.parentProp][read.parentIndex] = AST.fals();

          after(read.blockBody[read.blockIndex]);
          ++changed;
        }
        else if (read.parentNode.type === 'UnaryExpression' && read.parentNode.operator === '!') {
          rule('Inverting an `if`-tested constant in the alternate branch must yield `true`');
          example('if (x) y = !x', 'if (x) y = false;');
          before(read.blockBody[read.blockIndex]);

          if (read.grandIndex < 0) read.grandNode[read.grandProp] = AST.tru();
          else read.grandNode[read.grandProp][read.grandIndex] = AST.tru();
          ++changed;

          after(read.blockBody[read.blockIndex]);
        }
        else if (
          read.parentNode.type === 'CallExpression' &&
          read.parentNode.callee.type === 'Identifier' &&
          read.parentNode.callee.name === symbo('boolean', 'constructor') &&
          read.parentNode['arguments'].length === 1 &&
          read.parentProp === 'arguments'
        ) {
          rule('Boolean() on an `if`-tested constant in the alternate branch must yield `false`');
          example('if (x) {} else y = Boolean(x);', 'if (x) {} else y = false;');
          before(read.blockBody[read.blockIndex]);

          if (read.grandIndex < 0) read.grandNode[read.grandProp] = AST.fals();
          else read.grandNode[read.grandProp][read.grandIndex] = AST.fals();
          ++changed;

          after(read.blockBody[read.blockIndex]);
        }
        else {
          vlog('- bail: Not unary excl, not calling Boolean');
        }
      }
      else {
        vlog('ref not inside `if` statement at all. is it a bool alias?');

        if (
          read.blockBody[read.blockIndex].type === 'VarStatement' &&
          read.blockBody[read.blockIndex].kind === 'const'
        ) {
          if (
            read.parentNode.type === 'UnaryExpression' && // This implicitly must mean the ident is not the var .id...
            read.parentNode.operator === '!'
          ) {
            // Yes, this is an inv bool alias so we know its value inside target `if`
            boolAliasesInv.push(read.blockBody[read.blockIndex].id.name);
          } else if (
            read.parentNode.type === 'CallExpression' && // This implicitly must mean the ident is not the var .id...
            read.parentNode.callee.type === 'Identifier' &&
            read.parentNode.callee.name === symbo('boolean', 'constructor') // Boolean(x)
          ) {
            boolAliasesEq.push(read.blockBody[read.blockIndex].id.name);
          }
        }
      }
    });
    vgroupEnd();

    if (boolAliasesEq) {
      // Normally this is at most one, and most of the time zero. It can be multiple, though.
      vlog('Collected', boolAliasesEq.length, 'aliases that coerced the value to bool. Running them now.');
      boolAliasesEq.forEach(aliasName => {
        const meta = fdata.globallyUniqueNamingRegistry.get(aliasName);
        // Note: we know this is a const. We checked above when we collected this var.
        meta.reads.forEach(read => {
          // Basically do the same check as for the original var. Targeting the same `if`. Skip the alias check tho.
          if (+read.node.$p.pid > +node.consequent.$p.pid && +read.node.$p.pid <= +node.consequent.$p.lastPid) {
            vlog('alias ref in if branch, must be true because the if-test it is aliasing is truthy here');

            rule('Alias of an if-test that is bool and same truthy state of if-branch must be true');
            example('const x = Boolean(y); if (y) $(x, 1) else {}', 'const x = Boolean(y); if (y) $(true, 1) else {}');
            before(read.blockBody[read.blockIndex]);

            if (read.parentIndex < 0) read.parentNode[read.parentProp] = AST.tru();
            else read.parentNode[read.parentProp][read.parentIndex] = AST.tru();

            after(read.blockBody[read.blockIndex]);
            ++changed;
          }
          else if (+read.node.$p.pid > +node.alternate.$p.pid && +read.node.$p.pid <= +node.alternate.$p.lastPid) {
            vlog('alias ref in else branch, must be false because the if-test it is aliasing is falsy here');

            rule('Alias of an if-test that is bool and same truthy state of else-branch must be false');
            example('const x = Boolean(y); if (y) {} else $(x, 1)', 'const x = Boolean(y); if (y) {} else $(false, 1)');
            before(read.blockBody[read.blockIndex]);

            if (read.parentIndex < 0) read.parentNode[read.parentProp] = AST.fals();
            else read.parentNode[read.parentProp][read.parentIndex] = AST.fals();

            after(read.blockBody[read.blockIndex]);
            ++changed;
          }
        });
      });
    }

    // Repeat the same for the inverted bool aliases
    if (boolAliasesInv) {
      // Normally this is at most one, and most of the time zero. It can be multiple, though.
      vlog('Collected', boolAliasesInv.length, 'aliases that inverted the value to bool. Running them now.');
      boolAliasesInv.forEach(aliasName => {
        const meta = fdata.globallyUniqueNamingRegistry.get(aliasName);
        // Note: we know this is a const. We checked above when we collected this var.
        meta.reads.forEach(read => {
          // Basically do the same check as for the original var. Targeting the same `if`. Skip the alias check tho.
          if (+read.node.$p.pid > +node.consequent.$p.pid && +read.node.$p.pid <= +node.consequent.$p.lastPid) {
            vlog('inv alias ref in if branch, must be false because the if-test it is aliasing is truthy here');

            rule('Alias of an if-test that is inv bool in if-branch must be false');
            example('const x = !y; if (y) $(x, 1) else {}', 'const x = !y; if (y) $(false, 1) else {}');
            before(read.blockBody[read.blockIndex]);

            if (read.parentIndex < 0) read.parentNode[read.parentProp] = AST.fals();
            else read.parentNode[read.parentProp][read.parentIndex] = AST.fals();

            after(read.blockBody[read.blockIndex]);
            ++changed;
          }
          else if (+read.node.$p.pid > +node.alternate.$p.pid && +read.node.$p.pid <= +node.alternate.$p.lastPid) {
            vlog('inv alias ref in else branch, must be true because the if-test it is aliasing is falsy here');

            rule('Alias of an if-test that is inv bool in else-branch must be true');
            example('const x = !y; if (y) {} else $(x, 1)', 'const x = !y; if (y) {} else $(true, 1)');
            before(read.blockBody[read.blockIndex]);

            if (read.parentIndex < 0) read.parentNode[read.parentProp] = AST.tru();
            else read.parentNode[read.parentProp][read.parentIndex] = AST.tru();

            after(read.blockBody[read.blockIndex]);
            ++changed;
          }
        });
      });
    }
  }

  if (changed) {
    log('If tests inverted:', changed, '. Restarting from phase1 to fix up read/write registry');
    return {what: 'ifTestBool', changes: changed, next: 'phase1'};
  }

  log('If tests inverted: 0.');
}
