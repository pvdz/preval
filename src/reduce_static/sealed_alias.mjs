// Find a sealer that is always the alias of a constant when read, and just make it read the constant.
//
//    `const y = function(){}; let x = false; if (x) x(); else x = y;`
// ->
//    `const y = function(){}; let x = false; if (x) y(); else x = true;`
//                                                   ^
//
// Same for builtins and primitives. Only works when init is falsy.
//

import { ASSERT, log, group, groupEnd, vlog, vgroup, vgroupEnd, rule, example, before, source, after, findBodyOffset, currentState, } from '../utils.mjs';
import * as AST from '../ast.mjs';

export function sealedAlias(fdata) {
  // currentState(fdata, 'sealedAlias', true, fdata);

  group('\n\n\n[sealedAlias] Looking for sealed const aliases to replace\n');
  const r = _sealedAlias(fdata);
  groupEnd();

  // currentState(fdata, 'sealedAlias', true, fdata);

  return r;
}
function _sealedAlias(fdata) {
  let changes = 0;

  fdata.globallyUniqueNamingRegistry.forEach((meta, varName) => {
    if (meta.isImplicitGlobal) return;
    if (meta.isConstant) return; // Must get updated
    if (meta.isBuiltin) return;
    if (!meta.varDeclRef) return; // catch
    if (meta.writes.length !== 2) return; // Sealers have an init and an assign (seal)
    if (meta.reads.length !== 2) return; // must be an if-test and actual use

    const testRead = meta.reads[0];
    const useRead = meta.reads[1];

    const ifNode = testRead.parentNode;
    if (ifNode.type !== 'IfStatement' || testRead.parentProp !== 'test') return; // As an if-test.

    const write0 = meta.writes[0];
    const write1 = meta.writes[1];
    const initWrite = write0.kind === 'var' ? write0 : write1;
    const assignWrite = write0.kind === 'assign' ? write0 : write1;

    vlog('Considering', [varName]);

    let startAsTruthy;

    // This should work either way (truthy and falsy init)
    if (useRead.node.$p.npid > ifNode.consequent.$p.npid && useRead.node.$p.npid < ifNode.alternate.$p.npid) {
      // Read is in the consequent, so write must be in the alternate branch
      if (assignWrite.blockBody !== ifNode.alternate.body) return vlog('- bail: assign must be in falsy block');
      startAsTruthy = false;
    }
    else if (useRead.node.$p.npid > ifNode.alternate.$p.npid && useRead.node.$p.npid < ifNode.alternate.$p.lastPid) {
      if (assignWrite.blockBody !== ifNode.consequent.body) return; vlog(' - bail: assign must be in truthy block');
      startAsTruthy = true;
    }
    else if (useRead.node.$p.npid > ifNode.alternate.$p.lastPid && useRead.node.$p.npid < testRead.blockBody[testRead.blockBody.length - 1].$p.lastPid) {
      // The read was after the if-node, but in same block as if-node, so we should still be able to proceed
    }
    else {
      // read was not inside the if, so bail
      return vlog('- bail: read was not inside the if-node at all');
    }

    // For now we'll require the assign to be the first statement; this way this rule can't be broken by abrupt completions
    if (assignWrite.blockIndex !== 0) return vlog('- bail: not first stmt'); // TODO: we can improve this but by checking if it's the first we know the write is unconditional (and not susceptible to abrupt completions)

    if (assignWrite.parentNode.right.type !== 'Identifier') return vlog('- bail: Only care about assigning a constant (the thing being aliased)');
    const rhsName = assignWrite.parentNode.right.name;
    const rhsMeta = fdata.globallyUniqueNamingRegistry.get(rhsName);
    if (!rhsMeta.isConstant && !rhsMeta.isBuiltin) return vlog('- bail: ident that was assigned is not a constant nor a builtin');

    vlog('Okay replace the read with this ident:', [varName]);

    rule('A sealed alias that is a const should have its read replaced by it');
    example('const c = $(); let x = false; if (x) $(x); else x = c;', 'const c = $(); let x = false; if (x) $(c); else x = true;');
    before(initWrite.blockBody[initWrite.blockIndex]);
    before(ifNode);

    initWrite.parentNode.init = startAsTruthy ? AST.tru() : AST.fals();
    assignWrite.parentNode.right = startAsTruthy ? AST.fals() : AST.tru();
    useRead.node.name = rhsName;

    after(initWrite.blockBody[initWrite.blockIndex]);
    after(ifNode);

    changes += 1;
  });

  if (changes > 0) {
    log('Sealed const aliases replaced:', sealedAlias, '. Restarting from phase1 to fix up read/write registry.');
    return {what: 'sealedAlias', changes, next: 'phase1'};
  }

  log('Sealed const aliases replaced: 0.');
}

