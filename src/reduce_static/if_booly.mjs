// Find variables initialized to boolean which are set to a boolean in one if-branch. Some variation of:
//
//      let x = true; if (y) x = false;
// ->
//      let x = !y;
//

import { ASSERT, log, group, groupEnd, vlog, vgroup, vgroupEnd, rule, example, before, source, after, fmat, tmat, findBodyOffset, currentState } from '../utils.mjs';
import * as AST from '../ast.mjs';
import { symbo } from '../symbols_builtins.mjs';

export function ifBooly(fdata) {
  group('\n\n\n[ifBooly] Checking for bool bindings that conditionally get mutated');
  currentState(fdata, 'ifBooly', true, fdata);
  const r = _ifBooly(fdata);
  groupEnd();
  return r;
}
function _ifBooly(fdata) {
  let changed = 0;
  const queue = []; // Clean up properly without disturbing indexes while reducing

  fdata.globallyUniqueNamingRegistry.forEach((meta, varName) => {

    // Find bindings with mustBeType=boolean
    // Check if they conform to the pattern `if (x) b = true` where the other branch doesn't mutate them or updates them to the opposite bool
    // See tests/_tofix/if_is_boolean.md for two examples

    if (!meta.isLet) return;
    if (meta.typing.mustBeType !== 'boolean') return;
    if (meta.writes.length !== 2) return; // TODO: allow 3, one in each branch. not sure if that case would fold up to the 2 case tho.
    if (!meta.singleScoped) return; // TODO: refine to allow multi scope. we can do it for a subset

    const declWrite = meta.writes[0];
    const assignWrite = meta.writes[1];
    if (declWrite.kind !== 'var' || assignWrite.kind !== 'assign') return;

    if (!AST.isBoolean(declWrite.parentNode.init)) return;
    const initValue = AST.getPrimitiveValue(declWrite.parentNode.init);
    if (!AST.isBoolean(assignWrite.parentNode.right)) return;
    const assignedValue = AST.getPrimitiveValue(assignWrite.parentNode.right);
    if (initValue === assignedValue) return;

    vlog('- candidate: single scoped let that is bool, with two writes, writing opposite bools:', [varName]);

    if (declWrite.innerThen === assignWrite.innerThen && declWrite.innerElse === assignWrite.innerElse) {
      return vlog('- bail: decl and assign were in same if-branch', declWrite.innerThen, assignWrite.innerThen, declWrite.innerElse, assignWrite.innerElse);
    }

    // Confirm that no reads precede it
    if (meta.reads.some(read => read.node.$p.npid < assignWrite.node.$p.npid)) return vlog('- bail: at least one read seems to precede the assign');

    // Ok, find the (root) if-statement that contains this write.

    const writePid = assignWrite.node.$p.npid;
    const targetPid = assignWrite.innerIf;
    let block = declWrite.blockBody;
    let index = declWrite.blockIndex + 1;
    while (index < block.length) {
      const stmt = block[index];
      if (writePid <= stmt.$p.lastPid) {
        if (stmt.type === 'IfStatement') {
          vlog('- found an if-node @', stmt.$p.npid, stmt.consequent.$p.npid, stmt.alternate.$p.npid, ', assign innerIf:', assignWrite.innerIf, ', target:', targetPid);
          if (stmt.$p.npid !== targetPid) {
            if (writePid < stmt.alternate.$p.npid) {
              vlog('- not yet the target if-node, entering then-branch');
              block = stmt.consequent;
              index = 0;
            } else {
              vlog('- not yet the target if-node, entering else-branch');
              block = stmt.alternate;
              index = 0;
            }
          } else {
            vlog('- this should be our target if-node!');
          }
          break;
        }
        if ( stmt.type === 'LabeledStatement') {
          vlog('- entering label');
          block = stmt.body;
          index = 0;
          continue;
        }
        if (stmt.type === 'WhileStatement' || stmt.type === 'TryStatement') {
          vlog('- bail: nested in while/try');
          index = block.length;
          break;
        }
        if (stmt.type === 'BlockStatement') {
          vlog('- entering block');
          block = stmt.body;
          index = 0;
          continue;
        }
        // Is there any other statement nesting going on? I think we can skip the rest...
      }
      index += 1;
    }
    const ifNode = block[index];
    if (!ifNode) return vlog('- bail: if node not found, probably a loop or try statement on the way?');

    // We need to know whether the if-test, which ought to be an identifier at this normalized time, is reachable
    // from the decl. It may not be, which would mull this reducer right now.
    const ifTestNode = ifNode.test;
    if (ifTestNode.type !== 'Identifier') return vlog('- bail: if-test node is not an identifier...', ifTestNode.type);

    // This holds as long as y does not change between the var decl and the if-test. Doesn't matter if it changes later.
    // Easiest if y is a const, or if there are no reads in an outer block from where the if-node lives, then we can
    // promote the var decl to be next to the if-node and guarantee this too. Either is meh so we'll start with trivial
    // constant checks instead. TODO: support alternative cases too?
    const ifTestMeta = fdata.globallyUniqueNamingRegistry.get(ifTestNode.name);
    if (!ifTestMeta.isConstant) return vlog('- bail: if-test is not a constant');
    if (ifTestMeta.writes.length !== 1) return vlog('- bail: if-test has multiple writes, anyways');

    // Ok now all that's left is to verify that the if-test is defined before the varName. I think this would
    // imply that the var decl can reach it, since there's a read to this var decl that's nested in a read for
    // that binding. I dunno, it's foggy but I think it's good? :)
    const ifTestWrite = ifTestMeta.writes[0];
    const older = ifTestWrite.node.$p.npid > declWrite.node.$p.npid;
    if (older) {
      if (ifTestMeta.blockBody !== declWrite.blockBody) {
        // return vlog('- bail: if-test is younger than var decl and not in the same scope');
      }
    }

    rule('When a let is assigned bools in cadence to an if-test, it becomes an alias to the if-test');
    example('let x = true; if (y) x = false; $(x);', 'let x = Boolean(y); if (y) ; $(x);');
    before(declWrite.blockBody[declWrite.blockIndex]);
    before(ifTestWrite.blockBody[ifTestWrite.blockIndex]);
    before(ifNode);

    // Ok so the varName is an boolean alias to the if-test. Here's the truth table:
    // init=true, write=then  :: varname = !test
    // init=true, write=else  :: varname = !!test
    // init=false, write=then :: varname = !!test
    // init=false, write=else :: varname = !test
    // So: is-then-branch === is-init-true -> !test, else !!test
    // So:
    const isThen = writePid <= ifNode.consequent.$p.lastPid;
    const isInitTrue = initValue === true;
    vlog('- isThen:', isThen, ', init:', initValue);

    // Replace init with the correct bool of the test
    // Remove the assign write

    if (isThen === isInitTrue) {
      if (initValue) {
        vlog('  - var started as true, was assigned false in the then branch, so it is !test');
      } else {
        vlog('  - var started as false, was assigned true in the then branch, so it is !test');
      }
      declWrite.parentNode.init = AST.unaryExpression('!', AST.identifier(ifTestNode.name));
    } else {
      if (initValue) {
        vlog('  - var started as true, was assigned false in the else branch, so it is !!test');
      } else {
        vlog('  - var started as false, was assigned true in the else branch, so it is !!test');
      }
      declWrite.parentNode.init = AST.callExpression(symbo('boolean', 'constructor'), [AST.identifier(ifTestNode.name)]);
    }

    ASSERT(assignWrite.grandIndex < 0, 'assignment must be expression statement child so must not have index');
    assignWrite.blockBody[assignWrite.blockIndex] = AST.emptyStatement();
    queue.push({index: assignWrite.blockIndex, func: () => assignWrite.blockBody.splice(assignWrite.blockIndex, 1)});

    if (older) {
      // block must be same. Since varName cant be observed until inside the if-node, move the decl to be in front of the if-test decl.
      queue.push({index: ifTestWrite.blockIndex, func: () => ifTestWrite.blockBody.splice(ifTestWrite.blockIndex+1, 0, declWrite.parentNode)});
      declWrite.blockBody[declWrite.blockIndex] = AST.emptyStatement();
      queue.push({index: declWrite.blockIndex, func: () => declWrite.blockBody.splice(declWrite.blockIndex, 1)});
    }

    after(declWrite.blockBody[declWrite.blockIndex]);
    if (older) after(ifTestWrite.blockBody[ifTestWrite.blockIndex]);
    after(declWrite.parentNode);
    after(ifNode);
    changed += 1;
  });

  if (changed) {
    queue.sort(({ index: a }, { index: b }) => b - a);
    queue.forEach(({ index, func }) => func());

    log('Bool bindings updated:', changed, '. Restarting from phase1 to fix up read/write registry');
    return {what: 'ifBooly', changes: changed, next: 'phase1'};
  }

  log('Bool bindings updated: 0.');
}
