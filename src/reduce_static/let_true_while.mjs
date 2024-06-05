// Kind of a normalization step but needs to be part of phase1
// `let x = true; while (x) x = --y > 0;`
// -> `while (true) if (--y > 0) {} else { break; } }`

// Note: This rule is legit but I think it's superseded by another rule that'll make while(true) before this hits it
//       There's another rule idea that may fix this issue, around two let bindings that have identical assignment patterns

import walk from '../../lib/walk.mjs';
import { ASSERT, log, group, groupEnd, vlog, vgroup, vgroupEnd, rule, example, before, source, after, fmat, tmat } from '../utils.mjs';
import * as AST from '../ast.mjs';

export function letTrueWhile(fdata, unrollTrueLimit = 10) {
  group('\n\n\nChecking for while loops with let true as condition');
  //vlog('\nCurrent state\n--------------\n' + fmat(tmat(fdata.tenkoOutput.ast)) + '\n--------------\n');
  const r = _letTrueWhile(fdata, unrollTrueLimit);
  groupEnd();
  return r;
}
function _letTrueWhile(fdata, unrollTrueLimit) {
  let updated = processAttempt(fdata, unrollTrueLimit);

  log('');
  if (updated) {
    log('Total let-true-while unrolled:', updated, '. Restarting from phase1 to fix up read/write registry');
    return 'restart';
  }
  log('Total let-true-while unrolled: 0.');
}

function processAttempt(fdata, unrollTrueLimit) {
  let updated = 0;

  // We're looking for `while` whose test condition is a let binding initialized to `true`

  const ast = fdata.tenkoOutput.ast;

  walk(_walker, ast, 'ast');
  function _walker(node, beforeWalk, nodeType, path) {
    if (beforeWalk) return; // Go from inner to outer...?
    if (updated) return; // TODO: allow to do this for multiple loops in the same iteration as long as they're not nested
    if (node.type !== 'WhileStatement') return;

    // Look for a `let x = true; while (x)`

    const blockBody = path.blockBodies[path.blockBodies.length - 1];
    const blockIndex = path.blockIndexes[path.blockIndexes.length - 1];
    const prev = blockIndex > 0 && blockBody[blockIndex - 1];

    if (!prev) return vlog('- bail: while has no prior statement');
    if (prev.type !== 'VariableDeclaration') return vlog('- bail: while prior statement was not a var decl');
    if (prev.kind !== 'let') return vlog('- bail: while prior statement was a const');
    if (!AST.isTrue(prev.declarations[0].init)) return vlog('- bail: while prior statement was not init true');
    if (node.test.type !== 'Identifier') return vlog('- bail: while test is not an ident');
    if (node.test.name !== prev.declarations[0].id.name) return vlog('- bail: while test is not same ident', node.test.name, prev.declarations[0].id.name);


    // Ok, this is a while, whose test is defined in the statement before it and initialized to true.
    // Confirm that it has one write (TODO: any) and then replace that write with an if-else-break
    // Note that the write must be in the same loop, otherwise the break will fail.

    const testName = node.test.name;

    const meta = fdata.globallyUniqueNamingRegistry.get(testName);
    if (meta.writes.length !== 2) return vlog('- bail: while test did not have two writes', meta.writes.length);
    // Verify that the second write was an assignment and the last statement of the while (else we can't just `break`)
    if (meta.writes[1].blockBody !== node.body.body) return vlog('- assignment block is not while block');
    if (meta.writes[1].blockIndex !== node.body.body.length - 1) return vlog('- assignment is not last statement in block');

    rule('A let x=true; while(x) should be rewritten to a while(true)');
    example('let x = true; while (x) x = --y;', 'while (true) if (--y) {} else { break; } }');
    before(meta.writes[0].blockBody[meta.writes[0].blockIndex]);
    before(node);

    //meta.writes[0].blockBody[meta.writes[0].blockIndex] = AST.emptyStatement();
    node.body.body.push(AST.ifStatement(AST.identifier(testName), AST.blockStatement(), AST.blockStatement([AST.breakStatement()])));
    node.test = AST.tru();

    before(meta.writes[0].blockBody[meta.writes[0].blockIndex]);
    before(node);

    ++updated;
  }

  return updated;
}
