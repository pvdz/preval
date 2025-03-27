// Inline constants where values permit it

import { ARG_THIS_ALIAS_PREFIX } from '../symbols_preval.mjs';
import {
  ASSERT,
  log,
  group,
  groupEnd,
  vlog,
  vgroup,
  vgroupEnd,
  tmat,
  fmat,
  rule,
  example,
  before,
  source,
  after,
  riskyRule, useRiskyRules, assertNoDupeNodes,
} from '../utils.mjs';
import * as AST from '../ast.mjs';

export function inlineConstants(fdata) {
  group('\n\n\nInlining constants with primitive or constant values\n');
  const r = _inlineConstants(fdata);
  groupEnd();

  return r;
}
function _inlineConstants(fdata) {
  /** @var {Array<{pid: number, block: Array<Node>, index: number, node: Node}>} */
  const queue = [];
  let changes = 0;
  let promoted = 0;

  // Note: This step may rename bindings, eliminate them (queued), introduce new ones.
  //       Take care to preserve body[index] ordering. Don't add/remove elements to any body array.
  //       Preserve the parent of any identifier as detaching them may affect future steps.
  //       If any such parent/ancestor is to be removed, put it in the toEliminate queue.
  fdata.globallyUniqueNamingRegistry.forEach(function (meta, name) {
    if (meta.isBuiltin) return;
    if (meta.isImplicitGlobal) return;
    // Ignore the `this` and `arguments` aliases
    if (name.startsWith(ARG_THIS_ALIAS_PREFIX)) return;
    vgroup('-- name: `' + name + '`, writes:', meta.writes.length, ', reads:', meta.reads.length);

    step(meta, name);

    vgroupEnd();
  });

  log('End of constant inlining. Did we inline anything?', changes ? 'yes; ' + changes : 'no');

  // All read node meta data (parent etc) are invalidated if the next bit eliminates anything.
  vlog('toEliminate:', queue.length);
  if (queue.length) {
    queue.sort(({pid: a}, {pid: b}) => b-a); // Process back to front, AST node order
    queue.forEach(({func}) => func());

    log('Constants folded:', changes, '. Lets promoted to const:', promoted, ', restarting from normalize to cleanup');
    return {what: 'inlineConstants', changes: changes, next: 'normal'};
  }
  if (changes) {
    log('Constants folded:', changes, '. Lets promoted to const:', promoted, ', restarting from normalize to cleanup');
    return {what: 'inlineConstants', changes: changes, next: 'normal'};
  }
  if (promoted) {
    log('Constants folded: 0. Lets promoted to const:', promoted, '. Restarting from phase1.');
    return {what: 'inlineConstants', changes: promoted, next: 'phase1'};
  }
  log('Constants folded:', changes, '. Lets promoted to const:', promoted, '. No action taken.');

  function step(meta, name) {

    if (meta.writes.length === 1 && meta.writes[0].kind === 'var' && !meta.isConstant) {
      vlog(`Binding \`${name}\` has one write so should be considered a constant, even if it wasnt one`);
      meta.isConstant = true;
      const varDecl = meta.varDeclRef.containerNode;

      rule('A binding decl where the binding has one write must be a const');
      example('let x = 10; f(x);', 'const x = 10; f(x);');
      before(varDecl);

      varDecl.kind = 'const';

      after(varDecl);
      ++promoted;
    }

    if (!meta.isConstant) {
      return;
    }

    ASSERT(meta.uniqueName === name);

    if (meta.writes.length !== 1) {
      // This can happen and the non-decl writes should lead to a runtime error
      // We should postpone inlining this constant until it indeed has one write left
      vlog('Skipping because there are multiple writes to this constant so those need to be eliminated first');
      return;
    }

    const write = meta.writes[0];
    ASSERT(write, 'figure out whats wrong if this breaks (a constant with one write should have this write)');

    if (write.kind !== 'var') {
      vlog('Skipping for/catch/etc decl');
      return;
    }

    const rhs = write.parentNode.init;

    ASSERT(rhs);
    if (rhs.type === 'Param') {
      vlog('Ignore param aliases');
      return;
    }

    if (AST.isPrimitive(rhs) || AST.isStringLiteral(rhs)) {
      // `const x = 5;`
      // Replace all reads of this name with a clone of the literal, ident, or unary

      vgroup('Attempt to replace the', meta.reads.length, 'reads of', name, 'with the literal', rhs);
      // With the new
      const reads = meta.reads;
      for (let i = 0; i < reads.length; ++i) {
        const read = reads[i];
        if (read.parentNode.type === 'ExportSpecifier') {
          vlog('Not inlining export');
        } else if (!useRiskyRules() && read.parentNode.type === 'ExpressionStatement') {
          // This is unsafe because we can't guarantee an ident won't trigger a TDZ/implicitGlobal throw
          vlog('Not inlining ident that is expression statement because riskyRules = false');
        } else {
          queue.push({
            pid: +read.node.$p.pid,
            func: () => {
              riskyRule('Read of constant with literal value should be replaced with that value');
              example('const x = 100; f(x);', 'const x = 100; f(100);');

              vlog('Write:');
              before(write.blockBody[write.blockIndex]);
              vlog('Read:');
              before(read.blockBody[read.blockIndex]);

              // (We know rhs is the init of the var decl of the current meta whose reads we're inlining)
              if (read.parentIndex < 0) read.parentNode[read.parentProp] = AST.cloneSimple(rhs);
              else read.parentNode[read.parentProp][read.parentIndex] = AST.cloneSimple(rhs);
              // Preserve the original binding read to preserve TDZ errors
              read.blockBody.splice(read.blockIndex, 0, AST.expressionStatement(read.node));

              after(read.blockBody[read.blockIndex]);
              after(read.blockBody[read.blockIndex + 1]);

              assertNoDupeNodes(AST.blockStatement(read.blockBody), 'body', true);
            }
          })

          ++changes;
        }
      }

      vgroupEnd();
      if (changes) {
        return;
      }
    }

    if (rhs.type === 'Identifier') {
      if (rhs.name === 'arguments') {
        vlog('TODO; uncomment me to figure out what to do with `arguments`');
        return;
      }

      // Check if the assigned value is a constant. That would mean we're assigning constants to constants and we can fold that.
      const assigneeMeta = fdata.globallyUniqueNamingRegistry.get(rhs.name);
      if (!assigneeMeta.isBuiltin && !assigneeMeta.isConstant) {
        vlog('Rhs is not a builtin or constant, bailing');
        return;
      }
      if (assigneeMeta.isImplicitGlobal) {
        vlog('Rhs is implicit global, bailing');
        return;
      }

      if (meta.reads.length === 0) {
        vlog('Binding has no reads. Bailing to prevent infinite loop. Other rules should clean this if possible');
        return;
      }

      const reads = meta.reads;
      vgroup('Attempt to replace the', meta.reads.length, 'reads of `' + meta.uniqueName + '` with reads of `' + rhs.name);
      for (let i = 0; i < reads.length; ++i) {
        const read = reads[i];
        //const { parentNode, parentProp, parentIndex, grandNode, grandProp, grandIndex } = read;
        const stmt = read.blockBody[read.blockIndex];
        if (stmt.type === 'ExportNamedDeclaration') {
          vlog('Skipping export ident');
        } else if (!useRiskyRules() && stmt.type === 'ExpressionStatement') {
          // Skip. Otherwise it might run into an infinite loop.
          // This can be eliminated if we can eliminate the var decl entirely
          // but otherwise we must keep it to preserve TDZ. Further inlining is not useful.
          vlog('Skipping ident that is expression statement');
        } else {
          queue.push({
            pid: +read.node.$p.pid,
            func: () => {
              rule('Declaring a constant with a constant value should replace its reads with a read of that other constant');
              example('const x = NaN; f(x);', 'f(NaN);', () => assigneeMeta.isBuiltin);
              example('const x = f(); const y = x; g(y);', 'const x = f(); g(x);', () => !assigneeMeta.isBuiltin);

              before(write.blockBody[write.blockIndex]);
              before(read.blockBody[read.blockIndex], read.blockBody);

              vlog('Replacing a read of `' + name + '` with a read from `' + rhs.name + '` (on prop `' + read.parentNode.type + '.' + read.parentProp + (read.parentIndex >= 0 ? '[' + read.parentIndex + ']' : '') + ')' + '`...');

              // (We know rhs is the init of the var decl of the current meta whose reads we're inlining)
              if (read.parentIndex < 0) read.parentNode[read.parentProp] = AST.identifier(rhs.name);
              else read.parentNode[read.parentProp][read.parentIndex] = AST.identifier(rhs.name);
              read.blockBody.splice(read.blockIndex, 0, AST.expressionStatement(read.node));

              after(read.blockBody[read.blockIndex]);
              after(read.blockBody[read.blockIndex+1], read.blockBody);

              assertNoDupeNodes(AST.blockStatement(read.blockBody), 'body', true);
            }
          });
          ++changes;
        }
      }
      vgroupEnd();

      if (changes) {
        return;
      }
    } // </rhs=ident>
  }
}
