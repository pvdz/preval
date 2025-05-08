// Find `if` tests where there's a decl and write before it and the write is toplevel to a consequent or alternate block of an if
// that is on the same level as the initial if and where the init and the write have a known truthy state.
//
//      let x = true; if (x) { x = false; a; } else { b; } if (x) c; else d;
// ->
//      let x = true; if (y) { x = false; a; d; } else { b; c; }
//
// Binding x must not be a closure because we can only support that in very small cases.
// The same example above is for `undefined` into an object/array/class/etc reference, since that's truthy true/false.
//

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
  findBodyOffset, todo,
} from '../utils.mjs';
import * as AST from '../ast.mjs';

export function ifWeaving(fdata) {
  group('\n\n\n[ifWeaving] Checking for two if-tests that can be merged');
  const ast = fdata.tenkoOutput.ast;
  //currentState(fdata, 'ifWeaving'. true, fdata);
  const r = _ifWeaving(fdata);
  groupEnd();
  return r;
}
function _ifWeaving(fdata) {
  const ast = fdata.tenkoOutput.ast;

  let changed = 0;

  walk(_walker, ast, 'ast');
  function _walker(ifNode, beforeWalk, nodeType, path) {
    if (beforeWalk) return;

    if (ifNode.type !== 'IfStatement') return;
    if (ifNode.test.type !== 'Identifier') return;

    const pathNodes = path.nodes;
    const pathProps = path.props;
    const pathIndexes = path.indexes;
    const parentNode = pathNodes[pathNodes.length - 2];
    const parentProp = pathProps[pathProps.length - 1];
    const parentIndex = pathIndexes[pathIndexes.length - 1];

    // The if must be preceded by another if
    const prevIfNode = parentNode[parentProp][parentIndex-1];
    if (prevIfNode?.type !== 'IfStatement') return;

    // The if-test ident must be single scoped and must have at least two writes
    const meta = fdata.globallyUniqueNamingRegistry.get(ifNode.test.name);
    if (!meta.singleScoped) return;
    if (meta.writes.length < 2) return;

    // Assert we have a var decl and an assign and that they occur before the `if`
    const writeDecl = meta.writes[0];
    const writeAssign = meta.writes[1];
    if (writeDecl.kind !== 'var') return;
    if (writeAssign.kind !== 'assign') return;
    if (meta.rwOrder[0] !== writeDecl) return;
    if (meta.rwOrder[1] !== writeAssign) return;
    if (meta.rwOrder[2].kind !== 'read') return;
    if (meta.rwOrder[2]?.parentNode !== ifNode) return;
    if (+writeDecl.node.$p.pid > +ifNode.$p.pid) return;
    if (+writeAssign.node.$p.pid > +ifNode.$p.pid) return;
    if (+writeDecl.node.$p.pid > +writeAssign.node.$p.pid) return; // Kind of implied but ...

    // Now verify that the assignment occurs in the block of the prevIfNode
    if (writeDecl.blockChain !== ifNode.$p.blockChain) return; // decl and read must appear in same same block scope
    const inConsequent = writeAssign.blockChain === prevIfNode.consequent.$p.blockChain + prevIfNode.consequent.$p.pid + ',';
    const inAlternate = writeAssign.blockChain === prevIfNode.alternate.$p.blockChain + prevIfNode.alternate.$p.pid + ',';
    if (!inConsequent && !inAlternate) return;

    // Confirm the init and assigned value have a known truthy state
    if (!AST.isBoolean(writeDecl.parentNode.init)) return;
    if (!AST.isBoolean(writeAssign.parentNode.right)) return;

    const initValue = AST.getPrimitiveValue(writeDecl.parentNode.init);
    const assignValue = AST.getPrimitiveValue(writeAssign.parentNode.right);

    if (initValue === assignValue) {
      // This is kind of a silly case that needs a different approach; one of the branches of the `if` is unreachable so we can drop the if
      // But in a different rule please.
      return;
    }

    // This should be good?

    rule('When the if-test is updated in one branch of the previous if and can be fully predicted, the ifs can be merged');
    example(
      'let x = false; if (y) { x = true; a; } else { b; } if (x) c; else d;',
      'let x = false; if (y) { x = true; a; c; } else { b; d; }',
    );
    before(writeDecl.blockBody[writeDecl.blockIndex]);
    before(parentNode[parentProp][parentIndex-1]);
    before(parentNode[parentProp][parentIndex]);

    vlog('in consquent:', inConsequent, ', in alternate:', inAlternate, ', initValue:', initValue, ', assignValue:', assignValue);

    if ((inConsequent && assignValue) || (inAlternate && !assignValue)) {
      // `if (y) x = true else x = false; if (x)`
      vlog('Adding consequent to consequent, alternate to alternate');
      prevIfNode.consequent.body.push(...ifNode.consequent.body);
      prevIfNode.alternate.body.push(...ifNode.alternate.body);
    } else {
      // `if (y) x = false else x = true; if (x)`
      vlog('Adding consequent to alternate, alternate to consequent');
      prevIfNode.consequent.body.push(...ifNode.alternate.body);
      prevIfNode.alternate.body.push(...ifNode.consequent.body);
    }
    parentNode[parentProp][parentIndex] = AST.emptyStatement();

    after(writeDecl.blockBody[writeDecl.blockIndex]);
    after(parentNode[parentProp][parentIndex-1]);
    after(parentNode[parentProp][parentIndex]);

    changed += 1;
  }

  if (changed) {
    log('Weaved ifs together:', changed, '. Restarting from phase1 to fix up read/write registry');
    return {what: 'ifWeaving', changes: changed, next: 'phase1'};
  }

  log('Weaved ifs together: 0.');
}
