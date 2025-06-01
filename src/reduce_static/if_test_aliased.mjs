// Find `if` tests that allow us to infer the value of an alias of the test and replace the alias with the values.
// This is also known as "conditional constant propagation". Or so I've been told :)
//
//      let x = !y; if (x) $(y);
// ->
//      let x = !y; if (x) $(false);
//

import { ASSERT, log, group, groupEnd, vlog, vgroup, vgroupEnd, rule, example, before, source, after, fmat, tmat, findBodyOffset, } from '../utils.mjs';
import * as AST from '../ast.mjs';
import { symbo } from '../symbols_builtins.mjs';

export function ifTestAliased(fdata) {
  group('\n\n\n[ifTestAliased] Checking for if-tests that are aliased');
  const r = _ifTestAliased(fdata);
  groupEnd();
  return r;
}

function _ifTestAliased(fdata) {
  let changed = 0;
  fdata.globallyUniqueNamingRegistry.forEach((ifTestMeta, ifTestName) => {
    if (ifTestMeta.isBuiltin || ifTestMeta.isCatchVar) return;

    vgroup('- potential ifTestName:', ifTestName, ', has', ifTestMeta.reads.length, 'reads and', ifTestMeta.writes.length, 'writes.');

    ifTestMeta.reads.forEach((read, r) => {
      vlog('- read', r);
      const ifNode = read.parentNode;
      if (ifNode.type !== 'IfStatement') return vlog('- bail: not if statement');
      ASSERT(read.parentProp === 'test', 'only way parent node of ident in normalized code can be if-node is as the test', ifNode);

      const ifThenPidFirst = ifNode.consequent.$p.npid;
      const ifThenPidLast = ifNode.consequent.$p.lastPid;
      const ifElsePidFirst = ifNode.alternate.$p.npid;
      const ifElsePidLast = ifNode.alternate.$p.lastPid;

      vgroup('- brute force find an alias...');

      ifTestMeta.reads.forEach((read2, r2) => {
        const aliasVarNode = read2.grandNode;
        if (aliasVarNode.type !== 'VarStatement') return;
        const aliasName = aliasVarNode.id.name;

        let isUnaryNotAlias = false;
        let isBooleanCallAlias = false;

        if (read2.parentNode.type === 'UnaryExpression' && read2.parentNode.operator === '!') {
          if (read2.grandNode.type === 'VarStatement') {
            vlog('- found potentially !alias:', read2.grandNode.id.name);
            isUnaryNotAlias = true;
          }
        } else if (
          read2.parentNode.type === 'CallExpression' &&
          read2.parentProp === 'arguments' &&
          read2.parentNode.callee.type === 'Identifier' &&
          read2.parentNode.callee.name === symbo('boolean', 'constructor')
        ) {
          if (read2.grandNode.type === 'VarStatement') {
            vlog('- found potentially Boolean(alias):', read2.grandNode.id.name);
            isBooleanCallAlias = true;
          }
        }
        if (!isUnaryNotAlias && !isBooleanCallAlias) return vlog('- bail: read was not !x or Boolean(x) init of a var statement');

        const aliasMeta = fdata.globallyUniqueNamingRegistry.get(aliasName);
        if (!aliasMeta.singleScoped) return vlog('- bail: alias candidate is not single scoped');

        const aliasDeclWrite = aliasMeta.writes.find(write => write.parentNode === aliasVarNode);
        ASSERT(aliasDeclWrite, 'should find a write with kind=var that has the var node as parent'); // If this breaks then :shrug:

        vgroup('- alias', aliasName, 'is compatible with ifTestName', ifTestName, '. Walking', aliasMeta.reads.length, 'alias reads...');

        aliasMeta.reads.forEach((aliasRead, r2) => {
          const readStmtPid = aliasRead.blockBody[aliasRead.blockIndex].$p.npid;
          vgroup('- alias read', r2, ', checking if @', readStmtPid, 'falls inside this if-node (' + ifTestName + ')');

          const success = verifyAliasAndReduce(readStmtPid, isUnaryNotAlias, isBooleanCallAlias, ifThenPidFirst, ifThenPidLast, ifElsePidFirst, ifElsePidLast, aliasMeta, aliasDeclWrite, aliasRead, ifTestName, aliasName);

          if (success) changed += 1;

          vgroupEnd();
        });

        vgroupEnd(); // End alias type vgroup (was: "alias ... is assigned the inverse of ...")
      });
      vgroupEnd();
    });

    vgroupEnd();
  });

  if (changed) {
    log('[ifTestAliased] Inverted aliases in if-tests found:', changed, '. Restarting from phase1.');
    return {what: 'ifTestAliased', changes: changed, next: 'phase1'};
  }

  log('[ifTestAliased] No inverted aliases in if-tests found.');
}

function verifyAliasAndReduce(readStmtPid, isUnaryNotAlias, isBooleanCallAlias, ifThenPidFirst, ifThenPidLast, ifElsePidFirst, ifElsePidLast, aliasMeta, aliasDeclWrite, aliasRead, ifTestName, aliasName) {
  let targetReplacementNode = null;

  // Does it appear in one of the if-node branches?
  if (readStmtPid > ifThenPidFirst && readStmtPid <= ifThenPidLast) {
    vlog('- read is in consequent branch.');
    if (isUnaryNotAlias) targetReplacementNode = AST.fals(); // a = !c; if(c) -> a is false
    else if (isBooleanCallAlias) targetReplacementNode = AST.tru(); // a = Boolean(c); if(c) -> a is true
  } else if (readStmtPid > ifElsePidFirst && readStmtPid <= ifElsePidLast) {
    vlog('- read is in alternate branch.');
    if (isUnaryNotAlias) targetReplacementNode = AST.tru(); // a = !c; else -> a is true
    else if (isBooleanCallAlias) targetReplacementNode = AST.fals(); // a = Boolean(c); else -> a is false
  } else {
    return vlog('- bail: read was not in consequent or alternate branch of target if-node.');
  }
  ASSERT(targetReplacementNode);

  vlog('- ok, checking nearest alias write before this alias read');
  let lastWriteToAlias = null;
  // Determining the index of aliasRead in rwOrder
  const aliasReadIndexInRwOrder = aliasMeta.rwOrder.indexOf(aliasRead);
  if (aliasReadIndexInRwOrder === -1) { // Should not happen if rwOrder is correct
    return vlog('- bail: aliasRead not found in rwOrder. This is unexpected.');
  }
  for (let i = aliasReadIndexInRwOrder - 1; i >= 0; --i) {
    if (aliasMeta.rwOrder[i].kind === 'var' || aliasMeta.rwOrder[i].kind === 'assign') {
      lastWriteToAlias = aliasMeta.rwOrder[i];
      break;
    }
  }
  if (lastWriteToAlias !== aliasDeclWrite) {
    return vlog('- bail: last write to alias before this read was not its declaration.');
  }
  vlog('- ok, confirm the read is in same loop/try scope as the write');
  if (aliasDeclWrite.innerLoop !== aliasRead.innerLoop) {
    return vlog('- bail: read and write are in different loop', aliasDeclWrite.innerLoop, aliasRead.innerLoop);
  }
  if (aliasDeclWrite.innerTry !== aliasRead.innerTry) {
    return vlog('- bail: read and write are in different try scope', aliasDeclWrite.innerTry, aliasRead.innerTry);
  }
  vlog('- ok! Replacing this', aliasName, 'read in `if(', ifTestName, ')` with', targetReplacementNode.type);

  rule('A let/const alias (like !x or Boolean(x)) has a known boolean value inside an if-node testing on x');
  example('let a = !c; if (c) $(a);', 'let a = !c; if (c) $(false);');
  example('let a = !c; if (c) {} else $(a);', 'let a = !c; if (c) {} else $(true);');
  example('let a = Boolean(c); if (c) $(a);', 'let a = Boolean(c); if (c) $(true);');
  example('let a = Boolean(c); if (c) {} else $(a);', 'let a = Boolean(c); if (c) {} else $(false);');
  before(aliasRead.blockBody[aliasRead.blockIndex]);

  if (aliasRead.parentIndex < 0) aliasRead.parentNode[aliasRead.parentProp] = targetReplacementNode;
  else aliasRead.parentNode[aliasRead.parentProp][aliasRead.parentIndex] = targetReplacementNode;

  after(aliasRead.blockBody[aliasRead.blockIndex]);
  return true;
}