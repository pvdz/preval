// When two vars are assigned the same value at every write in tandem, they are also aliases.
//
//        `const x = unknown; const y = unknown; mutateUnknown(); $(x, y);`
// ->
//        `const x = unknown; mutateUnknown(); $(x, x);`
//
//
//        `let x = unknown; let y = unknown; mutateUnknown(); $(x, y); z = $(); x = z; y = z; $(); $(x, y);`
// ->
//        `let x = unknown; mutateUnknown(); $(x, x); z = $(); x = z; x = z; $(); $(x, x);`
//
// Start by checking if a declared binding has another declaration next to it with the same init
// From there, check all writes to the binding and check if the prev/next statement also updates this same variable
// with the same value. If this holds for all writes then they must be aliases.
// TODO: refinement: when the second statement of a write-pair sets the var to the other var rather than same value, that's also ok.

import { ASSERT, log, group, groupEnd, vlog, vgroup, vgroupEnd, rule, example, before, source, after, fmat, tmat, findBodyOffset, currentState } from '../utils.mjs';
import * as AST from '../ast.mjs';

export function tandemAlias(fdata) {
  group('\n\n\n[tandemAlias] Checking for two variables updated in tandem');
  currentState(fdata, 'returnClosure', true, fdata);
  const r = _tandemAlias(fdata);
  groupEnd();
  return r;
}
function _tandemAlias(fdata) {
  let changes = 0;

  fdata.globallyUniqueNamingRegistry.forEach(function(meta1, name1) {
    if (!meta1.isExplicitVar) return; // Only care about lets and consts
    if (meta1.isExport) return; // Maybe we cover this later...

    const declWrite = meta1.writes.find((write) => write.kind === 'var');
    ASSERT(declWrite);
    // I think we should only need to scan one way (prev or next) since we will visit all variables eventually
    if (declWrite.blockBody[declWrite.blockIndex+1]?.type !== 'VarStatement') return;

    const name2 = declWrite.blockBody[declWrite.blockIndex+1].id.name;
    const meta2 = fdata.globallyUniqueNamingRegistry.get(name2);
    if (!meta2.reads.length) return; // Nothing to do here even if match

    vlog('Checking two vars that may be tandem;', name1, name2, meta1.writes.length, meta2.writes.length, meta2.reads.length);

    if (meta1.writes.length !== meta2.writes.length) {
      // For each write of the one, we must have a corresponding write of the other, so we must have equal write count.
      return vlog('- bail: write count not equal', meta1.writes.length, meta2.writes.length);
    }

    // Okay. Now verify that all writes of one occur with neighbouring writes of the other, receiving the same
    // (declarative) value/shape. The order can change, that doesn't matter. We only need to walk the writes for one.
    // While my gut feeling says the writes order is equal for both metas (for our target at least), I'm not 100% on that. And it doesn't matter much.

    if (!meta1.writes.every((write1,i) => {
      const body = write1.blockBody;
      const index = write1.blockIndex;
      // Now we must check both sides because we're not walking the writes of the other meta

      vgroup('write', i);
      if (body[index-1]) source(body[index-1], true);
      source(body[index], true);
      if (body[index+1]) source(body[index], true);
      vgroupEnd();

      const is = isSameAssign('before', body[index], body[index-1], name2) || isSameAssign('after ', body[index], body[index+1], name1, name2);
      if (is) vlog('  - ok; found pair');
      return is;
    })) {
      return vlog('- bail: at least one write was not in tandem');
    }

    vlog('- ok, looks like all writes are in tandem and this is an alias?');

    rule('When two vars are always assigned the same value back to back they are effectively aliases');
    example('let x = a; let x = a; $(); $(x, y);', 'let x = a; let b = a; $(); $(x, x);');
    before(declWrite.blockBody[declWrite.blockIndex]);
    before(declWrite.blockBody[declWrite.blockIndex+1]);
    vlog('Replacing all reads of', name2, 'with', name1, '. Writes will be cleaned up elsewhere.');
    // Just replace all reads of the second var (arbitrary choice)
    meta2.reads.forEach(read => {
      before(read.blockBody[read.blockIndex]);

      if (read.parentIndex < 0) read.parentNode[read.parentProp] = AST.identifier(name1);
      else read.parentNode[read.parentProp][read.parentIndex] = AST.identifier(name1);

      after(read.blockBody[read.blockIndex]);
    });
    changes += 1;
  });

  if (changes) {
    log('Tandems collapsed:', changes, '. Restarting from phase1 to fix up read/write registry');
    return {what: 'tandemAlias', changes, next: 'phase1'};
  }

  log('Tandems collapsed: 0');
}

function isSameAssign(when, stmt1, stmt2, name1, name2) {
  // Check if statement 2 is equal to statement 1, it should be an assignment to name2 with same value as in stmt1

  let rhs1;
  let rhs2;
  if (stmt1.type === 'VarStatement') {
    if (stmt2?.type !== 'VarStatement') {
      vlog('  - isSameAssign(', when, '): stmt2 not also var;', stmt2?.type);
      return false;
    }
    if (stmt2.id.name !== name2) {
      vlog('  - isSameAssign(', when, '): stmt2 is not defining name2');
      return false;
    }
    rhs1 = stmt1.init;
    rhs2 = stmt2.init;
  } else {
    ASSERT(stmt1.type === 'ExpressionStatement');
    if (stmt2?.type !== 'ExpressionStatement') {
      vlog('  - isSameAssign(', when, '): stmt2 not also exprstmt;', stmt2?.type);
      return false;
    }
    if (stmt2.expression.type !== 'AssignmentExpression') {
      vlog('  - isSameAssign(', when, '): stmt2 not assign')
      return false;
    }
    if (stmt2.expression.left.type !== 'Identifier') {
      vlog('  - isSameAssign(', when, '): stmt2 lhs not ident')
      return false;
    }
    if (stmt2.expression.left.name !== name2) {
      vlog('  - isSameAssign(', when, '): stmt2 lhs not name2')
      return false;
    }

    rhs1 = stmt1.expression.right;
    rhs2 = stmt2.expression.right;
  }

  vlog('    - huh', rhs1.type, rhs2.type);

  if (rhs1.type !== rhs2.type) {
    vlog('  - isSameAssign(', when, '): rhs type mismatch;', rhs1.type, rhs2.type);

    if (rhs2.type === 'Identifier' && rhs2.name === name1) {
      vlog('    - ')
    }

    return false;
  }

  if (rhs1.type === 'Identifier') {
    if (rhs2.type === 'Identifier' && rhs1.name === rhs2.name) {
      return true;
    }
    vlog('  - isSameAssign(', when, '): rhs not same ident')
    return false;
  }

  if (AST.isPrimitive(rhs1)) {
    if (AST.isPrimitive(rhs2) && AST.isSamePrimitive(rhs1, rhs2)) {
      return true;
    }
    vlog('  - isSameAssign(', when, '): rhs not same primitive')
    return false;
  }

  // We can't do anything which returns different references (arrays, objects etc) so I think this is the end?
  // TODO: You can excavate this by exploring how the value is used, maybe object reference is not relevant, only its shape. But that's beyond what we want right now.
  vlog('  - isSameAssign(', when, '): rhs ident or primitive;', rhs1.type, rhs2.type);
  return false;
}