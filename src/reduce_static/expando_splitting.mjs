// Find functions with expandos. This may become a generic appraoch. The idea is to split non-escaping functions with expandos into regular objects.
// `function f(){} f.foo = x;`
// -> `function f(){}; let tmp = x;`

// Must take care of prototype checks etc.
// The fresh vars must be globals. Since the func doesn't escape and properties don't affect each other, this should be fine.
// Caveat is .defineProperty kinds of hacks. But I choose to ignore those.

import { ASSERT, log, group, groupEnd, vlog, vgroup, vgroupEnd, rule, example, before, source, after, findBodyOffset } from '../utils.mjs';
import * as AST from '../ast.mjs';
import { createFreshVar } from '../bindings.mjs';

export function expandoSplitting(fdata) {
  group('\n\n\n[expandoSplitting] Finding funcs with expandos so we can split them into regular objects\n');
  //currentState(fdata, 'expandoSplitting', true, fdata);
  const r = _expandoSplitting(fdata);
  groupEnd();
  return r;
}
function _expandoSplitting(fdata) {
  // - the function must ever only be instantiated once. the easiest way to guarantee that is to require the function to be global so let's start with that.
  // - the function should not escape
  // - all expandos should not be computed
  // - all expandos should not shadow the prototype stuff
  // - all property reads should affect expandos or known builtin stuffs (is that a requirement?)
  // - function should not have computed property reads or writes

  let vars = [];
  let changes = 0;

  new Map(fdata.globallyUniqueNamingRegistry).forEach((meta, name) => {
    if (meta.isImplicitGlobal) return;
    if (meta.isBuiltin) return;
    if (!meta.isConstant) return;

    const funcNode = meta.varDeclRef.node;
    if (funcNode.type !== 'FunctionExpression') return;

    vlog('- `' + name + '`:', meta.varDeclRef.node.type);

    if (meta.bfuncNode.type !== 'Program') {
      vlog('- Currently only considering global functions, bailing');
      return;
    }

    const expandos = new Map();
    if (
      meta.reads.some((read) => {
        if (read.parentNode.type === 'CallExpression' && read.parentProp === 'callee') return;
        if (read.parentNode.type === 'MemberExpression') {
          if (read.parentNode.computed) {
            vlog('- At least one member expression to the target was computed, bailing');
            return true;
          }
          if (['prototype', 'name', 'length'].includes(read.parentNode.property.name)) {
            vlog('- Reading proto, name, or length from function');
            return;
          }
          if (read.parentNode.property.name in Function.prototype) {
            // I guess we just ignore this. It doesn't break anything and it doesn't help anything.
            return;
          }
          if (read.parentNode.property.name in Object.prototype) {
            // I guess we just ignore this. It doesn't break anything and it doesn't help anything.
            return;
          }

          const name = read.parentNode.property.name;
          vlog('- Found expando property `' + name + '`');
          if (expandos.has(name)) expandos.get(name).push(read);
          else expandos.set(name, [read]);

          return;
        }

        vlog('- The function escapes (', read.parentNode.type, '), bailing');
        return true;
      })
    ) {
      return;
    }

    if (expandos.size === 0) {
      vlog('- No expandos found');
      return;
    }

    vlog('Found', expandos.size, 'different expandos on this function. Now we turn them into global bindings.');

    // So we inject a bunch of let's at the top of the global scope and initialize them to undefined.
    // Then we replace all member expressions for this expando with a binding reference to this global.
    // And then we hope it just works. Fingers crossed!

    rule('A global function with expandos that does not escape can change the expandos into global bindings');
    example('function f(){} f.foo = 10; g(f.foo);', 'function f(){} let tmp; tmp = 10; g(tmp);');
    before(funcNode);
    expandos.forEach(arr => arr.forEach(read => before(read.blockBody[read.blockIndex])));

    expandos.forEach((reads, name) => {
      const tmpName = createFreshVar('tmpExpando', fdata);

      const varNode = AST.varStatement('let', tmpName, AST.undef());
      vars.push(varNode);

      reads.forEach((read) => {
        const mem = read.parentNode;
        ASSERT(mem.type === 'MemberExpression' && !mem.computed && mem.property.name === name,
          'read.parentNode should be a memberExpression, not computed, and the prop the expando...', mem.type, mem.computed, mem.property.name, name);

        // Replace the member expression with the ident. I think that should suffice for all cases? Assignments, reads, etc?
        // One case where it does matter is calls, since it changes the context. So for calls we replace it with a .call just in case
        // If the function does not use `this` then another rule will clean this up. And if it does, then the semantics are kept.

        if (read.grandNode.type === 'CallExpression') {
          // `func.foo(a, b, c);` -> `tmp.call(func, a, b, c);`
          // So we replace the callee and inject the object as the first parameter
          read.grandNode.arguments.unshift(read.grandNode.callee.object);
          read.grandNode.callee = AST.memberExpression(tmpName, 'call');
        } else {
          if (read.grandIndex < 0) read.grandNode[read.grandProp] = AST.identifier(tmpName);
          else read.grandNode[read.grandProp][read.grandIndex] = AST.identifier(tmpName);
        }

      });
    });

    expandos.forEach(arr => arr.forEach(read => after(read.blockBody[read.blockIndex])));
    ++changes
  });

  if (changes) {
    fdata.tenkoOutput.ast.body.unshift(...vars);

    log('Expandos isolated:', changes, '. Restarting from phase1 to fix up read/write registry.');
    return {what: 'expandoSplitting', changes: changes, next: 'phase1'};
  }

  log('Expandos isolated: 0.');
}
