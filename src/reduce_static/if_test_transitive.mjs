// Search for `if` statements where the if-test reflects the value of another var used in the init of the if-tested var
//
//        const x = y < 10; if (x) $(y < 20);
// ->
//        const x = y < 10; if (x) $(true);
//

import { ASSERT, log, group, groupEnd, vlog, vgroup, vgroupEnd, fmat, tmat, rule, example, before, source, after, findBodyOffset, } from '../utils.mjs';
import * as AST from '../ast.mjs';
import { createFreshVar } from '../bindings.mjs';
import { symbo } from '../symbols_builtins.mjs';

export function ifTestTransitive(fdata) {
  group('\n\n\n[ifTestTransitive] Searching for ifs that give transitive information\n');
  const r = _ifTestTransitive(fdata);
  groupEnd();
  return r;
}
function _ifTestTransitive(fdata) {
  let changed = 0;

  vlog('Searching for const decl giving information about another var, where the const is used as if-test...');

  fdata.globallyUniqueNamingRegistry.forEach((meta, varName) => {
    if (!meta.isConstant) return;
    if (meta.writes.length !== 1) return;
    if (!meta.reads.length) return;

    let ifs = [];
    meta.reads.forEach(read => {
      if (read.parentProp === 'test' && read.parentNode.type === 'IfStatement') {
        ifs.push(read.parentNode); // I don't think there's a point in storing the read...?
      }
    });
    if (!ifs.length) return;

    vgroup('- Candidate is if-test:', varName);
    processCandidate(meta, varName, ifs);
    vgroupEnd();
  });

  function processCandidate(meta, varName, ifs) {
    const write = meta.writes[0];
    const varNode = write.parentNode;
    const init = varNode.init;

    if (!['BinaryExpression',
      // 'UnaryExpression'
    ].includes(init.type)) return vlog('- bail: init not binary/unary', init.type);

    let targetName;
    let otherNode;
    let initNameLeft;
    if (init.type === 'BinaryExpression') {
      if (AST.isPrimitive(init.left) && init.right.type === 'Identifier') {
        targetName = init.right.name;
        otherNode = init.left;
        initNameLeft = false;
      }
      else if (AST.isPrimitive(init.right) && init.left.type === 'Identifier') {
        targetName = init.left.name;
        otherNode = init.right;
        initNameLeft = true;
      }
      else {
        return vlog('- bail: binary expression is not ident with primitive');
      }
    // TODO: we can apply this sort of trick for some other expressions. it's all about conveying the knowledge
    // } else if (init.type === 'UnaryExpression') {
    //   if (init.argument.type === 'Identifier') {
    //     targetName = init.argument.name;
    //   } else {
    //     return vlog('- bail: unary expr is not on ident');
    //   }
    } else {
      ASSERT(false);
    }

    const tmeta = fdata.globallyUniqueNamingRegistry.get(targetName);
    if (!tmeta.isConstant) return; // Can only trivially do this on constants. TODO: can do this on other cases too but it gets complex quickly.

    vlog('- used', [varName], 'as if-test, holds information on', [targetName], ', now crossing', tmeta.reads.length, 'with', ifs.length, 'ifs');

    // Find the reads of the var for which the if-test gives information
    let anything = false;
    for (const { read, ifNode, branch } of readsInsideIfs(tmeta.reads, ifs)) {
      anything = true;
      vgroup('- read @', read.node.$p.npid, 'is inside if @', ifNode.$p.npid);

      // TODO: convert x>y and x>=y to y<=x and y<x. i think that's okay in JS when we know the values are numbers...?

      if (
        read.parentNode.type === 'BinaryExpression' &&
        init.type === 'BinaryExpression' &&
        (
          (init.operator === '<' && read.parentNode.operator === '<') ||
          init.operator === '<=' && read.parentNode.operator === '<='
        )
      ) {
        vlog('- ok; read is doing a `<` or `<=`, init is same');
        // Table for lt
        // x < n, x < m       x < 20, x < 10     redundant when n >= m (20 >= 10). since x<n, x will be <m when m is equal to or smaller than n, so n>m
        // x < n, m < x       x < 20, 10 < x     no info
        // n < x, m < x       20 < x, 10 < x     redundant when n <= m (10 <= 20), here the numbers are on the other side, which flips the comparison
        // n < x, x < m       10 < x, x < 20     no info
        // Similar for lte:
        // x <= n, x <= m     x <= 20, x <= 10   redundant when n > m (20 >= 10)
        // x <= n, m <= x     x <= 20, 10 <= x   no info
        // n <= x, m <= x     20 <= x, 10 <= x   redundant when n < m (10 <= 20)
        // n <= x, x <= m     10 <= x, x <= 20   no info
        // So in both cases n >= m or n <= m

        // So if we know same side, we can compare them to hopefully resolve them.
        if (initNameLeft && read.parentProp === 'left' && AST.isNumberLiteral(read.parentNode.right)) {
          // When `x < n, x < m`, check if n >= m
          // When `x <= n, x <= m`, check if n >= m
          // When `x < n, x <= m`, check if n > m
          const n = AST.getPrimitiveValue(otherNode);
          const m = AST.getPrimitiveValue(read.parentNode.right);
          vlog('- ok; init and read both have a literal number to the right', n, m);
          if (n >= m) {
            rule('When a nested range check is subsumed, we should resolve it; same right');
            example('if (x < 20) $(x < 10);', 'if (x < 10) $(true)');
            before(varNode);
            before(read.blockBody[read.blockIndex]);

            if (read.grandIndex < 0) read.grandNode[read.grandProp] = AST.primitive(branch);
            else read.grandNode[read.grandProp][read.grandIndex] = AST.primitive(branch);

            after(varNode);
            after(read.blockBody[read.blockIndex]);
            changed += 1;
            continue;
          } else {
            vlog('- bail: Unfortunately, the inner number is lower than the outer number, so no game');
          }
        }
        else if (!initNameLeft && read.parentProp === 'right' && AST.isNumberLiteral(read.parentNode.left)) {
          // This is `n < x, m < x`, now check if n >= m
          // This is `n <= x, m <= x`, now check if n >= m
          const n = AST.getPrimitiveValue(otherNode);
          const m = AST.getPrimitiveValue(read.parentNode.left);
          vlog('- ok; init and read both have a literal number to the left', n, m);
          if (n <= m) {
            rule('When a nested range check is subsumed, we should resolve it; same left');
            example('if (10 < x) $(20 < x);', 'if (10 < x) $(true)');
            before(varNode);
            before(read.blockBody[read.blockIndex]);

            if (read.grandIndex < 0) read.grandNode[read.grandProp] = AST.primitive(branch);
            else read.grandNode[read.grandProp][read.grandIndex] = AST.primitive(branch);

            after(varNode);
            after(read.blockBody[read.blockIndex]);
            changed += 1;
            continue;
          } else {
            vlog('- bail: Unfortunately, the inner number is lower than the outer number, so no game');
          }
        }
        else {
          vlog('- bail: read and init dont have number on same side, cant predict');
        }
      } else if (
        read.parentNode.type === 'BinaryExpression' &&
        init.type === 'BinaryExpression' &&
        (
          (init.operator === '<' && read.parentNode.operator === '<=') ||
          (init.operator === '<=' && read.parentNode.operator === '<')
        )
      ) {
        // Table for lt+lte
        // x < n, x <= m       x < 20, x <= 10     redundant when n > m (20 > 10)
        // x < n, m <= x       x < 20, 10 <= x     no info
        // n < x, m <= x       20 < x, 10 <= x     redundant when n < m (10 < 20)
        // n < x, x <= m       10 < x, x <= 20     no info
        // Table for lte+lt
        // x <= n, x < m       x <= 20, x < 10     redundant when n > m (20 > 10)
        // x <= n, m < x       x <= 20, 10 < x     no info
        // n <= x, m < x       20 <= x, 10 < x     redundant when n < m (10 < 20)
        // n <= x, x < m       10 <= x, x < 20     no info

        vlog('- ok; read is doing a `<` or `<=`, init does the other one');
        // So if we know same side, we can compare them to hopefully resolve them.
        if (initNameLeft && read.parentProp === 'left' && AST.isNumberLiteral(read.parentNode.right)) {
          // This is `x <= n, x < m`, now check if n > m
          // This is `x <= n, x < m`, now check if n > m
          const n = AST.getPrimitiveValue(otherNode);
          const m = AST.getPrimitiveValue(read.parentNode.right);
          vlog('- ok; init and read both have a literal number to the right', n, m);
          if (n < m) {
            rule('When a nested range check is subsumed, we should resolve it; diff right');
            example('if (x < 20) $(x < 10);', 'if (x < 10) $(true)');
            before(varNode);
            before(read.blockBody[read.blockIndex]);

            if (read.grandIndex < 0) read.grandNode[read.grandProp] = AST.primitive(branch);
            else read.grandNode[read.grandProp][read.grandIndex] = AST.primitive(branch);

            after(varNode);
            after(read.blockBody[read.blockIndex]);
            changed += 1;
            continue;
          } else {
            vlog('- bail: Unfortunately, the inner number is lower than the outer number, so no game');
          }
        }
        else if (!initNameLeft && read.parentProp === 'right' && AST.isNumberLiteral(read.parentNode.left)) {
          // This is `n <= x, m <= x`, now check if n >= m
          const n = AST.getPrimitiveValue(otherNode);
          const m = AST.getPrimitiveValue(read.parentNode.left);
          vlog('- ok; init and read both have a literal number to the left', n, m);
          if (n > m) {
            rule('When a nested range check is subsumed, we should resolve it; diff right');
            example('if (10 < x) $(20 < x);', 'if (10 < x) $(true)');
            before(varNode);
            before(read.blockBody[read.blockIndex]);

            if (read.grandIndex < 0) read.grandNode[read.grandProp] = AST.primitive(branch);
            else read.grandNode[read.grandProp][read.grandIndex] = AST.primitive(branch);

            after(varNode);
            after(read.blockBody[read.blockIndex]);
            changed += 1;
            continue;
          } else {
            vlog('- bail: Unfortunately, the inner number is lower than the outer number, so no game');
          }
        }
        else {
          vlog('- bail: read and init dont have number on same side, cant predict');
        }
      } else {
        vlog('- bail: read is not matching a supported pattern');
      }


      vgroupEnd();
    }
    if (!anything) vlog('- bail: none of the reads were inside any of the ifs');
  }

  if (changed) {
    log('Transitive if tests solved:', changed, '. Restarting from phase1 to fix up read/write registry');
    return {what: 'ifTestTransitive', changes: changed, next: 'phase1'};
  }

  log('Transitive if tests solved: 0.');
}

// Given a set of reads and array of if-nodes, yield for each read that occurs inside a branch
// of a node. Do not trigger for the (own) if-test of those nodes. Just inside the branch blocks.
// The yielded value will tell you the read, the node, and whether it's then or else branch.
function * readsInsideIfs(reads, ifNodes) {
  for (const ifNode of ifNodes) {
    // Get the pid before-middle-after the if-node. We need to know where each read falls.
    const pid1 = ifNode.$p.npid;
    const pid2 = ifNode.alternate.$p.pid; // mid
    const pid3 = ifNode.$p.lastPid;

    // Ok, now every read that falls within this if-node has a known range
    for (const read of reads) {
      const pid = read.node.$p.npid;
      if (pid > pid1) { // NOT the if-test itself. Don't care about it as much.
        if (pid < pid2) { // (exclusive, not that it matters here)
          // This read falls in the consequent branch so we know it is less than <primRight>
          yield { read, ifNode, branch: true };
        } else if (pid <= pid3) { // (inclusive, it matters here)
          // This read falls in the alternate branch so we know it is more-than-or-equal-to <primRight>
          yield { read, ifNode, branch: false };
        } else {
          // read falls after the if-node, skip to next.
        }
      }
    }
  }
}
