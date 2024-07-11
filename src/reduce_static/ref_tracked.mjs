// Ref tracking tricks
// Note: this only applies to explicit bindings that are not closures. Certain rules apply only to var binding (not catch etc)
// - [x]: A read that can reach only one write and that write is assigning a primitive -> replace read with primitive
// - [x]: A binding that can't reach any write -> add a TDZ throw
// - [x]: A write that has no reads -> eliminate (keep rhs)
// - [x]: A binding with only writes can be eliminated? TDZ concerns notwithstanding

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
  findBodyOffset,
  tmat,
} from '../utils.mjs';
import * as AST from '../ast.mjs';
import { createFreshVar } from '../bindings.mjs';
import { ASSUME_BUILTINS } from '../constants.mjs';
import {cloneSimple} from "../ast.mjs"

export function refTracked(fdata) {
  group('\n\n\nLooking ref-tracking tricks to apply\n');
  const r = _refTracked(fdata);
  groupEnd();
  return r;
}
function _refTracked(fdata) {
  let changed = 0;

  const queue = [];

  fdata.globallyUniqueNamingRegistry.forEach((meta, name) => {
    if (meta.isImplicitGlobal) return;
    if (meta.isBuiltin) return;
    if (!meta.singleScoped) return;

    vgroup('- `' + name);
    processBinding(meta, name);
    vgroupEnd();
  });

  function processBinding(meta, name) {
    meta.rwOrder.forEach((ref => {
      if (ref.kind === 'read') {
        const read = ref;
        ASSERT(read.reachesWrites, 'ref tracking should create this');
        if (read.reachesWrites.size === 0) {
          if (read.blockBody[read.blockIndex + 1]?.type !== 'ThrowStatement') {
            // TDZ? We should have written a TDZ throw for these non-closure cases before phase2 ... I think?
            // We should be able to safely deconstruct this assignment and let other rules cleanup the fallout.

            // Covered by tests/cases/normalize/binding/for-header-pattern-rhs-scoping-tdz.md
            rule('Read that cannot see any writes can be eliminated');
            example('a = b', 'a; b;');
            before(read.blockBody[read.blockIndex]);

            const stringArg = tmat(read.blockBody[read.blockIndex], true).replace(/\n.*/g, ' ').trim();
            const stringArgTrunced = stringArg.slice(0, 50) + (stringArg.length > 50 ? ' ...' : '');
            read.blockBody[read.blockIndex] =
              AST.throwStatement(AST.primitive(`Preval: This statement contained a read that reached no writes: ${stringArgTrunced}`));

            after(read.blockBody[read.blockIndex]);
            ++changed;
            return;
          }
        }
        else if (read.reachesWrites.size === 1) {
          const write = Array.from(read.reachesWrites)[0];
          // Note: the write may be a catch etc. Explicitly check for the var decl or assignment cases. Ignore the rest.
          if (write.parentNode.type === 'AssignmentExpression') {
            // TODO: same if it's a builtin or other "predictable" value. But maybe another rule would already do this anyways?
            if (AST.isPrimitive(write.parentNode.right)) {
              // Covered by tests/cases/arr_mutation/arr_loop_case_assign.md
              rule('A read that can only reach one write and that write assigns a primitive can be replaced by the primitive value');
              example('x = 10; f(x);', 'x = 10; f(10);');
              before(read.blockBody[read.blockIndex]);

              const newNode = AST.primitive(AST.getPrimitiveValue(write.parentNode.right));
              if (read.parentIndex < 0) read.parentNode[read.parentProp] = newNode;
              else read.parentNode[read.parentProp][read.parentIndex] = newNode;

              after(read.blockBody[read.blockIndex]);
              ++changed;
              return;
            } else {
              vlog('RHS is not a primitive:', write.parentNode.right.type);
            }
          }
          else if (write.parentNode.type === 'VariableDeclarator') {
            // TODO: same if it's a builtin or other "predictable" value. But maybe another rule would already do this anyways?
            if (AST.isPrimitive(write.parentNode.init)) {
              // Covered by tests/cases/_base/concat.md
              rule('A read that can only reach one write and that write assigns a primitive can be replaced by the primitive value');
              example('const x = 10; f(x);', 'const x = 10; f(10);');
              before(read.blockBody[read.blockIndex]);

              const newNode = AST.primitive(AST.getPrimitiveValue(write.parentNode.init));
              if (read.parentIndex < 0) read.parentNode[read.parentProp] = newNode;
              else read.parentNode[read.parentProp][read.parentIndex] = newNode;

              after(read.blockBody[read.blockIndex]);
              ++changed;
              return;
            } else {
              vlog('Init is not a primitive:', write.parentNode.init.type);
            }
          }
          else {
            // for-x/for-in ?
            ASSERT(write.parentNode.type === 'ForInStatement' || write.parentNode.type === 'ForOfStatement', 'what else might cause this?', write.parentNode.type);
            return;
          }
        }
      }
      else if (!meta.reads.length) {
        meta.writes.forEach(write => {
          if (write.parentNode.type === 'VariableDeclarator') {
            if (meta.writes.every(write => write.kind === 'assign' || write.kind === 'var')) {
              queue.push({
                index: write.blockIndex,
                func: () => {
                  // Covered by tests/cases/arguments/arg_spread_stmt2.md
                  rule('A binding with only writes can be eliminated; var decl');
                  example('let x = 1; x = 2; x = 3;', '1; 2; 3;');
                  before(write.blockBody[write.blockIndex]);

                  if (write.parentNode.init.type === 'Param' || write.parentNode.init.type === 'FunctionExpression') {
                    write.blockBody[write.blockIndex] = AST.emptyStatement();
                  } else {
                    write.blockBody[write.blockIndex] = AST.expressionStatement(write.parentNode.init);
                  }

                  after(write.blockBody[write.blockIndex]);
                }
              });
              ++changed;
              return;
            } else {
              // keep; binding used in for-in/of or something
            }
          } else if (write.kind === 'assign') {
            queue.push({
              index: write.blockIndex,
              func: () => {
                // Covered by tests/cases/arr_mutation/loop_access_of_const.md
                rule('A binding with only writes can be eliminated; var decl');
                example('let x = 1; x = 2; x = 3;', '1; 2; 3;');
                before(write.blockBody[write.blockIndex]);

                write.blockBody[write.blockIndex] = AST.expressionStatement(write.parentNode.right);

                after(write.blockBody[write.blockIndex]);
              }
            });
            ++changed;
            return;
          }
        })
      }
      else if (ref.kind === 'write') {
        const write = ref;
        ASSERT(write.reachedByReads, 'ref tracking should create this');
        ASSERT(write.reachedByWrites, 'ref tracking should create this');

        if (write.reachedByReads.size === 0) {
          if (write.parentNode.type === 'AssignmentExpression') {
            // TODO: this works fine for complex nodes too but in that case tainting other binding caches (rhs or lhs) is a risk. Not for primitives.
            //if (AST.isPrimitive(write.parentNode.right)) {
              queue.push({
                index: write.blockIndex,
                func: () => {
                  rule('A write that is not reached by any read can be eliminated');
                  example('let x = 1; x = 2; x = 3;', 'let x = 1; x; 2; x = 3;');
                  before(write.blockBody[write.blockIndex]);

                  write.blockBody.splice(
                    write.blockIndex, 1,
                    AST.expressionStatement(write.parentNode.left),
                    AST.expressionStatement(write.parentNode.right)
                  );

                  after(write.blockBody[write.blockIndex]);
                  after(write.blockBody[write.blockIndex + 1]);
                  todo
                }
              });
              ++changed;
              return;
            //} else {
            //  vlog('RHS is not a primitive:', write.parentNode.right.type);
            //}
          }
          else if (write.parentNode.type === 'VariableDeclarator') {
            // TODO: same if it's a builtin or other "predictable" value. But maybe another rule would already do this anyways?
            // Ignore undefined because that's our base case
            //if (AST.isPrimitive(write.parentNode.init) && !AST.isUndefined(write.parentNode.init)) {
              queue.push({
                index: write.blockIndex,
                func: () => {
                  rule('A write that is not reached by any read can be eliminated');
                  example('let x = 1; x = 2;', 'let x = undefined; 1; x = 2;');
                  before(write.blockBody[write.blockIndex]);

                  write.blockBody.splice(
                    write.blockIndex, 1,
                    AST.expressionStatement(write.parentNode.id),
                    AST.expressionStatement(write.parentNode.init)
                  );

                  after(write.blockBody[write.blockIndex]);
                  after(write.blockBody[write.blockIndex + 1]);
                  todo
                }
              });

              ++changed;
              return;
            //} else {
            //  vlog('Init is not a primitive:', write.parentNode.init.type);
            //}
          }
          else {
            // for-x/for-in ?
            ASSERT(write.parentNode.type === 'ForInStatement' || write.parentNode.type === 'ForOfStatement', 'what else might cause this?', write.parentNode.type);
            return;
          }

          return;
        }
      }
    }))


  }

  if (queue.length) {
    // By index, high to low. This way it should not be possible to cause reference problems by changing index
    queue.sort(({ index: a }, { index: b }) => (a < b ? 1 : a > b ? -1 : 0));
    queue.forEach(({ func }) => func());
  }
  if (changed) {
    log('Ref-tracking tricks applied:', changed, '. Restarting from phase1 to fix up read/write registry.');
    return 'phase1';
  }

  log('Ref-tracking tricks applied: 0.');
  return false;
}
