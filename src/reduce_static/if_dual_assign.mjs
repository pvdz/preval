// Find ifs that check a value that we know to be one of two values, and they are a falsy and truthy value
//
//        const x = a === b; if (x) { f(x); } else { return x; }
// ->
//        const x = a === b; if (x) { f(true); } else { return false; }

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
import { tru } from '../ast.mjs';

export function ifDualAssign(fdata) {
  group('\n\n\n[ifDualAssign] Looking for ifs that return a bit that they check');
  //currentState(fdata, 'ifDualAssign', true, fdata);
  const r = _ifDualAssign(fdata);
  groupEnd();
  return r;
}
function _ifDualAssign(fdata) {
  const queue = [];
  let changed = 0;
  fdata.globallyUniqueNamingRegistry.forEach(function (meta, name) {
    if (meta.isBuiltin) return; // We can probably do it for some of these cases? But let's do that in another step
    if (meta.isImplicitGlobal) return;
    if (!meta.isConstant) return;
    if (meta.typing.worstCaseValueSet?.size !== 2) return; // Looking for a truthy and falsy value. Must have two.

    vgroup('- `' + meta.uniqueName + '` can be one of two values:', [...meta.typing.worstCaseValueSet]);

    const [a, b] = meta.typing.worstCaseValueSet;
    if (!a && b) {
      process(meta, b, a);
    } else if (a && !b) {
      process(meta, a, b);
    } else {
      vlog('Was not a falsy and truthy value');
    }

    vgroupEnd();
  });

  function process(meta, truthy, falsy) {
    meta.reads.some((read, ri) => {
      vgroup('-', ri, ':', read.parentNode.type + '.' + read.parentProp, ', truthy value:', [truthy], ', falsy value:', [falsy]);
      const r = subProcess(meta, truthy, falsy, read, ri);
      groupEnd();
      return r;
    });
  }

  function subProcess(meta, truthy, falsy, read, ri) {
    const ifNode = read.parentNode;
    let ruling = () => {
      rule('When a value is used for `if`-test and can only have a truthy and falsy value we can inline those values safely');
      example('const x = a === b; if (x) f(x); else g(x);', 'const x = a === b; if (x) f(true); else g(true);');
      example('const x = a & 32; if (x) f(x); else g(x);', 'const x = a === 32; if (x) f(32); else g(0);');
    };
    if (ifNode.type === 'IfStatement' && read.parentProp === 'test') {
      // First test the special case of both branches returning the ident or the value that it would replace
      if (
        ifNode.consequent.body?.[0]?.type === 'ReturnStatement' &&
        ((ifNode.consequent.body[0].argument.type === 'Identifier' && ifNode.consequent.body[0].argument.name === meta.uniqueName) ||
          (AST.isPrimitive(ifNode.consequent.body[0].argument) &&
            Object.is(AST.getPrimitiveValue(ifNode.consequent.body[0].argument), truthy))) &&
        ifNode.alternate.body?.[0]?.type === 'ReturnStatement' &&
        ((ifNode.alternate.body[0].argument.type === 'Identifier' && ifNode.alternate.body[0].argument.name === meta.uniqueName) ||
          (AST.isPrimitive(ifNode.alternate.body[0].argument) &&
            Object.is(AST.getPrimitiveValue(ifNode.alternate.body[0].argument), falsy)))
      ) {
        vlog('This is a special edge case that we can optimize');
        rule('When both branches of an `if` return the must-be-value of the ident it tests for, the `if` can be folded up');
        example('if (x) return x; else return x;', 'return x;');
        example('const x = a === b; if (x) return x; else return false;', 'return x;');
        before(ifNode);

        read.blockBody[read.blockIndex] = AST.returnStatement(AST.identifier(meta.uniqueName));

        after(read.blockBody[read.blockIndex]);
        ++changed;
        return true; // Stop this meta. Since this pattern is so specific I don't think we need to stop the rest.
      }

      // Test another special case, where a let is conditionally updated but can ultimately only have one of the two values of the test
      {
        const thenEmpty = ifNode.consequent.body.length === 0;
        const thenPass =
          !thenEmpty &&
          ifNode.consequent.body[0].type === 'ExpressionStatement' &&
          ifNode.consequent.body[0].expression.type === 'AssignmentExpression' &&
          ifNode.consequent.body[0].expression.left.type === 'Identifier' &&
          ((ifNode.consequent.body[0].expression.right.type === 'Identifier' &&
            ifNode.consequent.body[0].expression.right.name === meta.uniqueName) ||
            (AST.isPrimitive(ifNode.consequent.body[0].expression.right) &&
              Object.is(AST.getPrimitiveValue(ifNode.consequent.body[0].expression.right), truthy)));
        const elseEmpty = ifNode.alternate.body.length === 0;
        const elsePass =
          !elseEmpty &&
          ifNode.alternate.body[0].type === 'ExpressionStatement' &&
          ifNode.alternate.body[0].expression.type === 'AssignmentExpression' &&
          ifNode.alternate.body[0].expression.left.type === 'Identifier' &&
          ((ifNode.alternate.body[0].expression.right.type === 'Identifier' &&
            ifNode.alternate.body[0].expression.right.name === meta.uniqueName) ||
            (AST.isPrimitive(ifNode.alternate.body[0].expression.right) &&
              Object.is(AST.getPrimitiveValue(ifNode.alternate.body[0].expression.right), falsy)));

        vlog('thenpass?', thenPass, ', elsePass?', elsePass, ', thenEmpty?', thenEmpty, ', elseEmpty?', elseEmpty);

        if ((thenPass && (elsePass || elseEmpty)) || (thenEmpty && elsePass)) {
          vlog('Maybe we can flatten this `if`...');

          // At least one branch starts with an assignment of the test (or the value it would represent
          // in that branch) and the other branch is either empty or starts with doing the same.
          // Figure out what the value is being assigned to and whether it's assigned to the same ident.

          // Get the ident to which the test is being assigned
          const thenLhsIdent = thenPass ? ifNode.consequent.body[0].expression.left.name : undefined;
          const elseLhsIdent = elsePass ? ifNode.alternate.body[0].expression.left.name : undefined;
          ASSERT(
            thenLhsIdent || elseLhsIdent,
            'there should be a then or else name now...',
            thenPass,
            elsePass,
            thenLhsIdent,
            elseLhsIdent,
            ifNode.consequent.body[0]?.expression.right,
            ifNode.alternate.body[0]?.expression.right,
          );

          if (thenPass && elsePass && thenLhsIdent !== elseLhsIdent) {
            vlog('Both branches assigned the if-test to different idents...');
            // We can resolve this. I think. Or we bail.
          } else {
            let pass = thenEmpty || elseEmpty;
            if (!pass) {
              // One branch is empty. Verify that the ident has two writes, one being the var and the other one in the branch
              // and that the initial value the "other branch" value is. This kinda sux, but perhaps we can improve on it later.
              const m = fdata.globallyUniqueNamingRegistry.get(thenLhsIdent || elseLhsIdent);
              if (m.writes.length === 2) {
                const init = m.writes.find((write) => write.kind === 'var')?.parentNode.init;
                if (AST.isPrimitive(init) && Object.is(AST.getPrimitiveValue(init), thenLhsIdent ? falsy : truthy)) {
                  pass = true;
                }
              }
            }

            if (pass) {
              vlog(
                'Either both branches assign the if-test to the same ident, or one branch does with the other being empty. We can collapse that.',
              );
              queue.push({
                index: read.blockIndex,
                func: () => {
                  rule('When both branches assign the if-test to the same ident, or one of the branches is empty, we can fold it up');
                  example('const a = b === c; if (a) x = a; else x = false;', 'const a = b === c; x = a; if (x) {}');
                  example('const a = b === c; if (a) x = a;', 'const a = b === c; x = a; if (x) {}');
                  before(ifNode);

                  const finalNode = AST.expressionStatement(AST.assignmentExpression(thenLhsIdent || elseLhsIdent, meta.uniqueName));
                  if (thenLhsIdent) ifNode.consequent.body[0] = AST.emptyStatement();
                  if (elseLhsIdent) ifNode.alternate.body[0] = AST.emptyStatement();
                  read.blockBody.splice(read.blockIndex, 0, AST.expressionStatement(AST.cloneSimple(ifNode.test)), finalNode);

                  after(finalNode);
                  after(ifNode);
                },
              });
              ++changed;
              return true;
            }

            vlog(
              'One branch was empty and the assigned ident did either not have exactly two writes or the var init was not the correct value',
            );
          }
        }
      }

      // `if (x) { return x; } else { return x }` where x can only be one value in either branch so we can replace them
      // Find all refs that fall within the body of either branch and replace them with the actual truthy or falsy value.
      // (Note: this is a constant)

      const thenPid = +ifNode.consequent.$p.pid;
      const elsePid = +ifNode.alternate.$p.pid;
      const postPid = +ifNode.alternate.$p.lastPid;
      //vlog('->', thenPid, elsePid, postPid)

      let replaced = 0;
      meta.reads.forEach((read, ri) => {
        const pid = +read.node.$p.pid;
        vlog('- ri:', ri, ', pid=', pid, ', inside `then`?', pid > thenPid && pid < elsePid, 'inside `else`?', pid >= elsePid && pid <= postPid);
        if (pid > thenPid && pid < elsePid) {
          if (ruling) ruling = ruling();
          before(read.node, read.blockBody[read.blockIndex]);

          // Inside then
          if (read.parentIndex < 0) read.parentNode[read.parentProp] = AST.primitive(truthy);
          else read.parentNode[read.parentProp][read.parentIndex] = AST.primitive(truthy);

          after(AST.primitive(truthy), read.blockBody[read.blockIndex]);
          ++replaced;
        } else if (pid > elsePid && pid <= postPid) {
          if (ruling) ruling = ruling();
          before(read.node, read.blockBody[read.blockIndex]);

          // Inside else
          if (read.parentIndex < 0) read.parentNode[read.parentProp] = AST.primitive(falsy);
          else read.parentNode[read.parentProp][read.parentIndex] = AST.primitive(falsy);

          after(AST.primitive(falsy), read.blockBody[read.blockIndex]);
          ++replaced;
        }
      });

      if (ruling) vlog('None of the refs could be replaced...');
      else vlog('Replaced', replaced, 'occurrences');
      changed += replaced;
    }
  }

  if (changed) {
    queue.sort(({ index: a }, { index: b }) => (a < b ? 1 : a > b ? -1 : 0));
    queue.forEach(({ index, func }) => func());

    log('Bit checking ifs replaced:', changed, '. Restarting from phase1 to fix up read/write registry');
    return {what: 'ifDualAssign', changes: changed, next: 'phase1'};
  }

  log('Bit checking ifs replaced: 0');
}
