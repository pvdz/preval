// Find functions with expandos. This may become a generic approach. The idea is to split non-escaping functions with expandos into regular objects.
// `function f(){} f.foo = x;`
// -> `function f(){}; let tmp = x;`

// Must take care of prototype checks etc.
// The fresh vars must be globals. Since the func doesn't escape and properties don't affect each other, this should be fine.
// Caveat is .defineProperty kinds of hacks. But I choose to ignore those.

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
  todo,
} from '../utils.mjs';
import * as AST from '../ast.mjs';
import { createFreshVar, verifyWriteValueNotThissable } from '../bindings.mjs';
import { SYMBOL_DOTCALL } from '../symbols_preval.mjs';

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

  new Map(fdata.globallyUniqueNamingRegistry).forEach((meta, funcName) => {
    if (meta.isImplicitGlobal) return;
    if (meta.isBuiltin) return;
    if (meta.writes.length !== 1) return;
    if (!meta.isConstant) return;

    const funcNode = meta.varDeclRef.node;
    if (funcNode.type !== 'FunctionExpression') return;

    vlog('- `' + funcName + '`:', meta.varDeclRef.node.type);

    // if (meta.bfuncNode.type !== 'Program') {
    //   vlog('- Currently only considering global functions, bailing');
    //   return;
    // }

    const propReads = [];
    const propWrites = [];
    const dotCalledProps = [];
    const propNames = new Set;
    let calls = 0;
    if (
      meta.reads.some((read) => {
        if (read.parentNode.type === 'CallExpression' && read.parentProp === 'callee') return;
        if (read.parentNode.type === 'MemberExpression') {
          const propName = read.parentNode.property.name;
          if (read.parentNode.computed) {
            vlog('  - At least one member expression to the target was computed, bailing');
            return true;
          }
          if (['prototype', 'name', 'length'].includes(read.parentNode.property.name)) {
            vlog('  - Reading proto, name, or length from function');
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

          if (read.grandNode.type === 'VarStatement') {
            propReads.push([propName, read]);
            propNames.add(propName);
            return;
          }
          if (
            read.grandNode.type === 'AssignmentExpression' &&
            read.grandProp === 'left'
          ) {
            propWrites.push([propName, read]);
            propNames.add(propName);
            return;
          }

          before(read.blockBody[read.blockIndex])
          vlog('  - bail: unexpected member', read.parentNode.type, read.grandNode.type, read.parentProp, read.parentIndex);
          return true;
        }
        if (
          read.parentNode.type === 'CallExpression' &&
          read.parentProp === 'callee'
        ) {
          // The func is being called, of course.
          calls += 1;
          return;
        }
        if (
          read.parentNode.type === 'CallExpression' &&
          read.parentNode.callee.type === 'Identifier' &&
          read.parentNode.callee.name === SYMBOL_DOTCALL &&
          read.parentProp === 'arguments' &&
          read.parentIndex === 1 // This is the context index for dotcall
        ) {
          // The func is dotcalled, presumably with a value that is/was a property on itself. Whatever it is now, we have
          // to verify that the actually invoked function does not use `this`, so the dotcall can become a regular call.
          vlog('  - found a dotcall, now checking writes to', read.parentNode.arguments[0].name);
          const calleeName = read.parentNode.arguments?.[0]?.name;
          ASSERT(calleeName, 'first arg to dotcall should really be an ident. primitive is possible but odd. anything else should be abstracted');
          // First assert that the function being invoked is the result of reading a property of the function central here
          const calleeMeta = fdata.globallyUniqueNamingRegistry.get(read.parentNode.arguments[0].name);
          // I think it's fine to limit ourselves to requiring constants here.
          if (
            calleeMeta.isConstant &&
            calleeMeta.varDeclRef?.node.type === 'MemberExpression' && // Was it initialized with a property read?
            calleeMeta.varDeclRef.node.object.type === 'Identifier' &&
            !calleeMeta.varDeclRef.node.computed && // Not a computed property (room for improvement but)
            calleeMeta.varDeclRef.node.object.name === funcName // Was it a property on the central function?
          ) {
            vlog('- ok; the callee comes from a prop of the function, now checking', meta.reads.length, 'reads');
            // Okay, so the callee is a value that is the property of funcName
            // Now we must validate whether this property is always assigned a function (or primitive) value
            const targetProp = calleeMeta.varDeclRef.node.property.name;
            if (meta.reads.every((read,i) => {
              vlog('-- read', i)
              if (read.parentNode.type !== 'MemberExpression') { vlog('  - ok: read is not a member expression;', read.parentNode.type); return true; }
              if (read.parentNode.computed) return vlog('  - bail: at least one prop is computed');
              if (read.parentNode.property.name !== targetProp) { vlog('  - ok: our target prop', read.parentNode.property.name); return true; }
              // Okay, this is about our targetProp. We only have to validate writes now.
              if (read.grandNode.type !== 'AssignmentExpression') { vlog('  - ok: was not assignment, dont care about anything else in this particular check;', read.grandNode.type); return true; }
              if (read.grandProp !== 'left') { vlog('  - ok: this prop was assigned to something;', read.grandProp); return true; }
              // We must resolve the assigned value. If not an ident then it's not something we can resolve
              if (read.grandNode.right.type !== 'Identifier') { vlog('- was not a prop, still ok if prim:', AST.isPrimitive(read.grandNode.right)); return !AST.isPrimitive(read.grandNode.right); } // it should be an ident or a primitive tbh, this should just be overly defensive
              const rhsMeta = fdata.globallyUniqueNamingRegistry.get(read.grandNode.right.name);
              vlog('- so far so good; now check verifyWriteValueNotThissable on all writes to', read.grandNode.right.name, 'which was assigned to prop', targetProp, 'of function', funcName);
              // Now check that the ident assigned to the prop itself is either always a function that does not `this`, or a primitive (leading to a crash but that's not relevant)
              if (rhsMeta.writes.every(write => verifyWriteValueNotThissable(write, fdata))) {
                vlog('- ok: all refs were prims or funcs that dont `this`');
                // Okay, that property was assigned an ident which was only assigned primitives (like undefined) or
                // function expressions and none of the functions would access `this`. We are good to go now!
                return true;
              }
              vlog('- bail: at least one write must be a non-primitive non-function, or a func that refers to `this`...');
              return false;
            })) {
              vlog('- ok: Dotcalls a function that was read from property', targetProp, 'from', funcName, 'and we were able to validate that this property was assigned a value that is either a primitive or otherwise a function that does not touch `this` so we should be good to transform this to a regular call now!');
              dotCalledProps.push(read);
              return; // ok
            }
            vlog('- bail: could not validate that the property of the func being invoked was a free func');
            return true;
          }
          vlog('- bail: could not validate that the invoked function is a method on the func');
          return true;
        }

        vlog('  - bail: the function escapes (', read.parentNode.type, '.', read.parentProp, read.parentIndex, '), bailing', read.parentNode.callee?.name);
        return true;
      })
    ) {
      vlog('  - bailing...')
      return;
    }

    vlog('Found', propReads.length, 'prop reads and', propWrites.length, 'prop writes (and', calls, 'calls and', dotCalledProps.length, 'dotcalls)');
    if (!propReads.length  || !propWrites.length) return vlog('- bail: props not written or read');

    // So we inject a bunch of let's before the func and initialize them to undefined.
    // Then we replace all member expressions for this expando with a binding reference to this global.
    // And then we hope it just works. Fingers crossed!

    const write = meta.writes[0];

    vgroup();

    rule('A const function with expandos that does not escape and is used as props are really just local vars');
    example('const f = function(){ f.x += 1; return f.x; }; f.x = 1; $(f());', 'let x; const f = function(){ x += 1; return x; }; x = 1; $(f());');
    before(funcNode);

    vgroup();
    // We'll need to create local vars for each prop. In a safe way, of course. Try to do func.prop -> func_prop
    const map = new Map;
    propNames.forEach(prop => map.set(prop, createFreshVar(funcName + '_' + prop, fdata)));

    // Inject the decls before the func
    write.blockBody.splice(write.blockIndex, 0,
      ...Array.from(propNames).map((prop) => AST.varStatement('let', map.get(prop), AST.undef()))
    );

    after(write.blockBody.slice(write.blockIndex, write.blockIndex + 1 + propNames.size - 1));
    vgroupEnd();


    // Now replace each read with just the prop name
    propReads.forEach(([prop, read]) => {
      before(read.blockBody[read.blockIndex]);
      if (read.grandIndex < 0) read.grandNode[read.grandProp] = AST.identifier(map.get(prop));
      else read.grandNode[read.grandProp][read.grandIndex] = AST.identifier(map.get(prop));
      after(read.blockBody[read.blockIndex]);
    });

    propWrites.forEach(([prop, read]) => {
      before(read.blockBody[read.blockIndex]);
      if (read.grandIndex < 0) read.grandNode[read.grandProp] = AST.identifier(map.get(prop));
      else read.grandNode[read.grandProp][read.grandIndex] = AST.identifier(map.get(prop));
      after(read.blockBody[read.blockIndex]);
    });

    after(funcNode);
    vgroupEnd();

    // expandos.forEach(arr => arr.forEach(read => after(read.blockBody[read.blockIndex])));
    ++changes
  });

  if (changes) {
    fdata.tenkoOutput.ast.body.unshift(...vars);

    log('Expandos isolated:', changes, '. Restarting from phase1 to fix up read/write registry.');
    return {what: 'expandoSplitting', changes: changes, next: 'phase1'};
  }

  log('Expandos isolated: 0.');
}
