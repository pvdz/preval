// Find loops that start with a truthy condition which is then tested, mimicking do-while logic, to eliminate a useless check.
//
//      `let test = true; while (true) { if (test) { $(); test = false; } else { break; } }`
// ->
//      `let test = true; while (true) { $(); test = false; if (test) { } else { break; } }`
//
// Same for falsy
//
//      `let test = false; while (true) { if (false) { break; } else { $(); test = true; } }`
// ->
//      `let test = false; while (true) { $(); test = true; if (test) { break; } else { } }`

import walk from '../../lib/walk.mjs';
import {
  ASSERT,
  log,
  group,
  groupEnd,
  vlog,
  vgroup,
  vgroupEnd,
  fmat,
  tmat,
  rule,
  example,
  before,
  source,
  after,
  findBodyOffset,
} from '../utils.mjs';
import * as AST from '../ast.mjs';

export function fakeDoWhile(fdata) {
  group('\n\n\n[fakeDoWhile] Find loops with do-while logic inside and outline the truthy if-consequent\n');
  const r = _fakeDoWhile(fdata);
  groupEnd();
  return r;
}
function _fakeDoWhile(fdata) {
  const ast = fdata.tenkoOutput.ast;

  let changed = 0;

  walk(_walker, ast, 'ast');
  function _walker(node, beforeWalk, nodeType, path) {
    // Track while loops
    // Track breaks and continues, maybe throws and returns and try too.
    // If the loop loops then all bets are off
    // If the loop does not loop and there is no try or continue, remove the loop and if the break has no label also the break

    switch (nodeType + ':' + (beforeWalk ? 'before' : 'after')) {
      case 'WhileStatement:after': {
        // Check whether the node only starts with `if` as body.
        // In that case, check whether we know its test to be truthy or falsy.
        // In that case, move the contents of the consequent or alternate block to the root of the while block

        if (node.body.body[0]?.type !== 'IfStatement') {
          vlog('- not starting with If;', node.body.body[0]?.type, ', bailing');
          break;
        }
        const ifStmt = node.body.body[0];
        if (ifStmt.test.type !== 'Identifier') {
          // Not sure what kind of case hits here tbh but whatever
          vlog('- If not testing on ident, bailing')
          break;
        }

        const parentNode = path.nodes[path.nodes.length - 2];
        const parentProp = path.props[path.props.length - 1];
        const parentIndex = path.indexes[path.indexes.length - 1];

        if (parentIndex <= 0) {
          vlog('- While is first statement of parent block, bailing');
          break;
        }

        const testName = ifStmt.test.name;

        // Low hanging fruit: check if previous node is a var decl of the test
        // Next level: check if var decl is before while and all other refs inside the while
        // Next next level: trace values per ref
        const prev = parentNode[parentProp][parentIndex - 1];
        if (prev.type !== 'VarStatement' || prev.id.name !== testName) return; // Prev statement not a let of the test

        if (AST.isTruthy(prev.init)) {
          if (!ifStmt.alternate.$p.alwaysCompletes?.size) {
            vlog('- The pattern matches but alternate branch does not always complete, bailing', ifStmt.$p.alwaysCompletes, ifStmt.consequent.$p.alwaysCompletes, ifStmt.alternate.$p.alwaysCompletes, ifStmt.consequent.$p, ifStmt.alternate.$p);
            break;
          }

          rule('While that starts with if that starts with truthy test can be improved');
          example(
            'let test = true; while (true) { if (test) { f(); test = false; } else { break; } }',
            'let test = true; while (true) { f(); test = false; if (test) { } else { break; } }'
          );
          before(parentNode[parentProp][parentIndex-1]);
          before(parentNode[parentProp][parentIndex]);

          // Put the if consequent block at the start of the node block
          node.body.body.unshift(ifStmt.consequent);
          // Replace the consequent with empty
          ifStmt.consequent = AST.blockStatement();

          after(parentNode[parentProp][parentIndex-1]);
          after(parentNode[parentProp][parentIndex]);
          ++changed;
        } else if (AST.isFalsy(prev.init)) {
          if (!ifStmt.consequent.$p.alwaysCompletes?.size) {
            vlog('- The pattern matches but consequent branch does not always complete, bailing', ifStmt.$p.alwaysCompletes, ifStmt.consequent.$p.alwaysCompletes, ifStmt.alternate.$p.alwaysCompletes, ifStmt.consequent.$p, ifStmt.alternate.$p);
            break;
          }

          rule('While that starts with if that starts with falsy test can be improved');
          example('let test = false; while (true) { f(); test = true; if (test) { break; } else { } }');
          before(parentNode[parentProp][parentIndex-1]);
          before(parentNode[parentProp][parentIndex]);

          // Put the if consequent block at the start of the node block
          node.body.body.unshift(ifStmt.alternate);
          // Replace the consequent with empty
          ifStmt.alternate = AST.blockStatement();

          after(parentNode[parentProp][parentIndex-1]);
          after(parentNode[parentProp][parentIndex]);
          ++changed;
        }
        break;
      }
    }
  }

  if (changed) {
    log('Fake do-while loops found:', changed, '. Restarting from normalization');
    return {what: 'fakeDoWhile', changes: changed, next: 'normal'}; // or is phase1 sufficient?
  }

  log('Fake loops dropped: 0.');
}
