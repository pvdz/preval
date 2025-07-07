// Find let with simple inits that are only referenced inside a block scope and move them into that scope.
//
//      let a = undefined; $(x); if (y) { if (z) a = function(){}; $(a); }
// ->
//      $(x); if (y) { let a = undefined; if (z) a = function(){}; $(a); }
//
// The goal is to bring let decls closer to their first assignment in hopes of pleasing the heuristics.
// If a let binding is used as closure, it should still be safe to do this since the closure can only be
// created inside that same block.
// Some rules
// - target block must be in same func scope as write was
// - target block must be in same innerLoop as write was
// - it's okay to move them into ifs and trys

import { ASSERT, log, group, groupEnd, vlog, vgroup, vgroupEnd, rule, example, before, source, after, fmat, tmat, findBodyOffset, todo, } from '../utils.mjs';
import * as AST from '../ast.mjs';

export function letScoping(fdata) {
  group('\n\n\n[letScoping] Searching for lets to move into the only scope that references them');
  //currentState(fdata, 'letScoping', true, fdata);
  const r = _letScoping(fdata);
  groupEnd();
  return r;
}
function _letScoping(fdata) {
  let changed = 0;
  const queue = [];

  fdata.globallyUniqueNamingRegistry.forEach((meta, varName) => {
    if (!meta.isLet) return;
    if (meta.writes.length <= 1) return; // This is a const. I think I prefer them as outside as possible? Maybe not. Tbd.
    if (!meta.varDeclRef) return; // shrug
    if (!AST.isPrimitive(meta.varDeclRef.node)) return;

    vlog('- testing:', varName)

    // I thiiink all refs would need to be forward. Violations of that invariant would imply loop/func scope breaking cases.
    if (meta.rwOrder[0].kind !== 'var') return vlog('- bail: first ref is not var');
    const declWrite = meta.writes[0]; // TODO: what of `let x = x` tdz?
    // First confirm no ref is in same scope as decl.
    if (meta.rwOrder.some((ref,i) => i > 0 && ref.blockChain === declWrite.blockChain)) return vlog('- bail: at least one ref is same block as decl', meta.rwOrder.map(ref => ref.blockChain), declWrite.blockChain);
    // I think now we must scan forward to find a block that contains some reads, then determine whether it contains them all.

    vlog('- Searching for target block');

    const body = declWrite.blockBody;
    let index = declWrite.blockIndex;
    while (++index < body.length) {
      const stmt = body[index];
      // Note: we skip funcs and left-over blocks etc.
      // Note: if we added try then we enter infinite transform loop with try descoping
      // Note: labels would already try to wrap let statements if they can, I think that's redundant here...?
      if (['IfStatement', 'LabeledStatement'].includes(stmt.type)) {
        let foundIn = false;
        let foundOut = false;

        if (stmt.type === 'IfStatement') {
          let a = stmt.consequent.$p.npid;
          let b = stmt.alternate.$p.npid;
          let c = stmt.alternate.$p.lastPid;
          let inThen = false;
          let inElse = false;
          meta.rwOrder.some((ref,i) => {
            if (i === 0) return; // decl
            vlog(  '- ref in if:', i,':', a, b, c, '&', ref.node.$p.npid);
            if (ref.node.$p.npid >= a && ref.node.$p.npid < b) {
              inThen = stmt.consequent.body;
              if (inElse || foundOut) return true;
            } else if (ref.node.$p.npid >= b && ref.node.$p.npid < c) {
              inElse = stmt.alternate.body;
              if (inThen || foundOut) return true;
            } else {
              foundOut = true;
              if (inThen || inElse) return true;
            }
          });
          vlog('- in then:', !!inThen, ', in else:', !!inElse, ', found out:', foundOut);
          if (inThen && inElse) return vlog('- bail: at least two references had different if-branch');
          if ((inThen || inElse) && foundOut) return vlog('- bail: at least two references had different sibling scope');
          if (inThen) {
            vlog('- found in then...');
            foundIn = inThen;
          }
          else if (inElse) {
            vlog('- found in else...');
            foundIn = inElse;
          }
        } else {
          let a = stmt.$p.npid;
          let b = stmt.$p.lastPid;

          meta.rwOrder.some((ref,i) => {
            if (i === 0) return; // decl
            vlog(  '- ref', i,':', a, ref.node.$p.npid, b)
            if (ref.node.$p.npid >= a && ref.node.$p.npid <= b) {
              foundIn = stmt.body.body;
              if (foundOut) return true;
            } else {
              foundOut = true;
              if (foundIn) return true;
            }
          });
        }

        if (foundIn) {
          if (foundOut) {
            return vlog('- bail: There are references in and outside of this node so we bail now, regardless.');
          }

          if (stmt.type === 'WhileStatement') {
            return vlog('- bail: All refs are inside this loop but let must stay outside of it. Ref tracking may clean this up.');
          }
          // All refs are inside this node and it's safe to move it inside this block so do that now.

          // I think we can do without a queue: we only move the decl and don't rely on indices for anything else.
          // We will need a queue to cleanup empty statements though

          rule('When a let-binding is only used inside a block, move it inside that block');
          example(
            'let a = undefined; $(x); if (y) { if (z) a = function(){}; $(a); }',
            '$(x); if (y) { let a = undefined; if (z) a = function(){}; $(a); }'
          );
          before(declWrite.blockBody[declWrite.blockIndex]);
          before(body[index]);

          foundIn.unshift(declWrite.blockBody[declWrite.blockIndex]);
          declWrite.blockBody[declWrite.blockIndex] = AST.emptyStatement();

          queue.push({
            index: declWrite.blockIndex,
            func: () => body.splice(declWrite.blockIndex, 1)
          });

          after(declWrite.blockBody[declWrite.blockIndex]);
          after(body[index]);
          changed = changed + 1;
        }
      }
      // Does not have sub-statements; continue. We may miss here. Either that should recover automatically, or it's an invalid case anyways.
    }
  });

  if (changed) {
    queue.sort(({ index: a }, { index: b }) => b - a);
    queue.forEach(({ index, func }) => func());

    log('Lets moved into scope:', changed, '. Restarting from phase1 to fix up read/write registry');
    return {what: 'letScoping', changes: changed, next: 'phase1'};
  }

  log('Lets moved into scope: 0.');
}
