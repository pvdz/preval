// - Search for inits that are unused, simplify them based on the type of other writes.
// - Search for vars that are unused, drop them
// - Search for vars that are mustBeType undefined/null
//
//
// `let x = a; ...; x = b;` -> `let x = undefined; ...; x = b;`
//
// `let x /*: undefined */ = a;` -> `let x = undefined` and change `a` to be undefined as well
//

import { ASSERT, log, group, groupEnd, vlog, vgroup, vgroupEnd, fmat, tmat, rule, example, before, source, after, findBodyOffset } from '../utils.mjs';
import * as AST from '../ast.mjs';
import { setPrintVarTyping } from "../../lib/printer.mjs";
import { getCleanTypingObject, inferNodeTyping, mergeTyping } from '../bindings.mjs';

export function redundantInit(fdata) {
  group('\n\n\n[redundantInit] Finding redundant var inits');
  const r = _redundantInit(fdata);
  groupEnd();
  return r;
}
function _redundantInit(fdata) {
  const ast = fdata.tenkoOutput.ast;

  let changes = 0;
  /** @var {Array<{index: number, func: Function}>} */
  const queue = [];


  vgroup('Trying to refine the typing where feasible');
  fdata.globallyUniqueNamingRegistry.forEach((meta, name) => {
    if (meta.isImplicitGlobal) return;
    if (meta.isBuiltin) return;

    if (meta.typing.mustBeType === 'undefined' && meta.writes[0]?.kind === 'var') {
      const write = meta.writes[0];
      const init = write.blockBody[write.blockIndex].init;
      if (init.type !== 'Identifier' || init.name !== 'undefined') {
        queue.push({
          index: write.blockIndex,
          func: () => {
            rule('A var that mustBeType undefined is undefined');
            example('const x /*: undefined */ = a;', 'a; const x = undefined');
            before(write.blockBody[write.blockIndex]);

            write.blockBody[write.blockIndex].init = AST.identifier('undefined');
            if (init.type !== 'Param' && !AST.isPrimitive(init)) {
              write.blockBody.splice(write.blockIndex, 0, AST.expressionStatement(init));
            }

            after(write.blockBody[write.blockIndex]);
            after(write.blockBody[write.blockIndex+1]);
          }
        });
        changes += 1;
        return vlog('- Updated queued to set to undefined');
      }
    }

    if (meta.isConstant) return; // The rest is about `let`
    if (!meta.writes.length) return; // when?
    if (!meta.singleScoped) return;

    // This approach applies generically in theory, but in practice there's too many
    // catches to cover. For now we'll focus on the simplest case where the initial
    // value of a binding is not read and it only receives the same primitive otherwise.

    const write0 = meta.writes[0];

    vlog('Trying to refine the typing of', [name]);
    if (write0.kind !== 'var') return vlog('- bail: first write not a var');
    if (write0.reachedByReads.size > 0) return vlog('- bail: first write is reached');
    if (write0.parentNode.init.type === 'Param') return vlog('- bail: dont touch param inits');
    if (meta.writes.some((write, i) => i > 0 && write.kind !== 'assign')) return vlog('- bail: at least one write was not a regular assignment');

    if (meta.reads.length === 0 && meta.writes.length === 1) {
      queue.push({
        index: write0.blockIndex,
        func: () => {
          rule('A var that is not used can be dropped');
          example('let x = $();', '$();');
          before(write0.blockBody[write0.blockIndex]);

          if (write0.parentNode.init.type === 'FunctionExpression' || AST.isPrimitive(write0.parentNode.init)) {
            // Splice is cleaner and it prevents an issue when param inits are set to undefined
            write0.blockBody.splice(write0.blockIndex, 1);
            after(AST.emptyStatement());
          } else {
            write0.blockBody[write0.blockIndex] = AST.expressionStatement(write0.parentNode.init);
            after(write0.blockBody[write0.blockIndex]);
          }
        }
      });
      changes += 1;
      return vlog('- Updated queued to eliminate');
    }

    vlog('- Discovering typing for all writes except the first...');
    let refinedTyping = getCleanTypingObject();
    for (let i=1; i<meta.writes.length; ++i) {
      const write = meta.writes[i];
      const newTyping = inferNodeTyping(fdata, write.parentNode.right);
      mergeTyping(newTyping, refinedTyping);
    }
    vlog('- Result:', refinedTyping);

    const currentPrim = AST.isPrimitive(write0.parentNode.init);

    let pv;
    switch (refinedTyping.mustBeType) {
      case 'undefined': pv = AST.identifier('undefined'); break;
      case 'null': pv = AST.primitive(null); break;
      case 'boolean': pv = AST.primitive(false); break;
      case 'number': pv = AST.primitive(0); break;
      case 'string': pv = AST.primitive(''); break;
      default:
        if (!currentPrim) {
          // Separate the init from the var. This may lead to type related simplification in some
          // edge cases even if we can't determine a primitive type for the current writes.
          queue.push({
            index: write0.blockIndex,
            func: () => {
              rule('A var complex init that is not observed should be separate from the var');
              example('let x = $(); x = 1;', '$(); let x = undefined; x = 1;');
              before(write0.blockBody[write0.blockIndex]);

              write0.blockBody.splice(write0.blockIndex, 0, AST.expressionStatement(write0.parentNode.init));
              write0.parentNode.init = AST.identifier('undefined');

              after(write0.blockBody[write0.blockIndex]);
              after(write0.blockBody[write0.blockIndex+1]);
            }
          });
          changes += 1;
          return vlog('- Update queued to split');
        } else {
          return vlog('- bail: resulting mustBeType is not a primitive and init already is');
        }
    }

    const alreadyGood = currentPrim && AST.getPrimitiveType(pv) === inferNodeTyping(fdata, write0.parentNode.init).mustBeType;
    if (alreadyGood) return vlog('- bail: init already primitive that matches type;');

    queue.push({
      index: write0.blockIndex,
      func: () => {
        rule('When init of variable is not read and the rest is a single primitive type, change init to that type to preserve mustBeType');
        example('let x = xyz; if ($) x = 1; else x = 2; $(x);', 'xyz; let x = 0; if ($) x = 1; else x = 2; $(x);');
        setPrintVarTyping(true, fdata);
        before(write0.blockBody[write0.blockIndex]);

        if (write0.parentNode.init.type !== 'FunctionExpression') {
          // Just don't put func exprs as statements
          write0.blockBody.splice(write0.blockIndex, 0, AST.expressionStatement(write0.parentNode.init));
        }
        write0.parentNode.init = pv;
        meta.typing = refinedTyping;

        after(write0.blockBody[write0.blockIndex]);
        after(write0.blockBody[write0.blockIndex+1]);
        setPrintVarTyping(false);
      }
    });
    changes = changes + 1;
    vlog('- Update queued to refine');
  });
  vgroupEnd();

  if (changes) {
    queue.sort(({index:a}, {index: b}) => b-a); // Flatten in reverse order, back to front
    queue.forEach(({func}) => func());

    log('Redundant inits changed:', changes, '. Restarting from phase1');
    return {what: 'redundantInit', changes: changes, next: 'phase1'};
  }

  log('Redundant inits changed: 0.');
}
