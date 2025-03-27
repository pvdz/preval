// Find reads that get cleared after they are conditionally read.
// `const n = /foo/; while (true) { let x = foo; if (x) { f(x); x = false; } }'
// -> `const n = /foo/; while (true) { let x = true; if (x) { f(n); x = false; } }'

import { ASSERT, log, group, groupEnd, vlog, vgroup, vgroupEnd, rule, example, before, source, after, findBodyOffset } from '../utils.mjs';
import * as AST from '../ast.mjs';

export function readOnce(fdata) {
  group('\n\n\nLooking for self destructing bindings that clear after use\n');
  const r = _readOnce(fdata);
  groupEnd();
  return r;
}
function _readOnce(fdata) {
  // Find let bindings that start as a truthy and (only) get assigned falsy values
  // Confirm that they are only called and used in `if` tests or assigned to
  // Edge case: also support .call .apply (.bind)
  // Replace the init with `true`
  // Compile a new binding with the func before the call
  // Replace the callee of the call(s) with the new binding name

  const queue = [];

  fdata.globallyUniqueNamingRegistry.forEach((meta, name) => {
    if (meta.isImplicitGlobal) return;
    if (meta.isBuiltin) return;
    if (meta.isConstant) return;
    if (!meta.varDeclRef) return; // catch

    vlog('- `' + name + '`:', meta.varDeclRef.node.type);

    const init = meta.varDeclRef.node;
    if (AST.isTruthy(init)) {
      // In this case it must be some kind of static value so we're okay
    } else if (init.type === 'Identifier' && !AST.isPrimitive(init)) {
      const initMeta = fdata.globallyUniqueNamingRegistry.get(init.name);
      if (!initMeta.isConstant && !initMeta.isBuiltin) {
        vlog('- The init was not a constant nor a builtin, bailing');
      }
      if (!initMeta.typing.mustBeFalsy) {
        vlog('- The init was an ident that was known to be falsy, bailing');
      }
    } else {
      vlog('- The init was not a truthy value, bailing');
      return;
    }

    // Any read must either be an if-test or inside the `then` of such an `if` and before any write that clears it.
    // That's the only way to guarantee the truthy value.

    let readToReplace; // For now we only allow one read
    let ifRead;
    if (
      meta.reads.some((read) => {
        if (read.parentNode.type === 'IfStatement') {
          if (ifRead) {
            vlog('- The binding was read in an if-test multiple times. Bailing on that for now.'); // Not a problem necessarily but adds edge cases.
            return true;
          }

          ifRead = read;
          return false;
        }

        // Now we need to verify the read
        // It needs to be inside an `if` that has this binding as its test (that's how we know it's truthy at the start)
        // And there needs to be no write between the if-read and this one
        // For this proof of concept I will cheat the easy way and mandate a back-to-back occurrence and only once
        // TODO: expand to generic approach

        // This is going to be a hack.
        if (!ifRead) {
          vlog('- Found a regular read before the if-test read, bailing');
          return true;
        }
        if (ifRead.parentNode.consequent.body !== read.blockBody) {
          vlog('- The read was not directly inside the `then` of the if-tested block, bailing');
          return true;
        }
        if (read.blockIndex !== 0) {
          vlog('- The read was not the first read of the `then`, bailing');
          return true;
        }

        // Now we've verified that this is `if (x) { something(x);  ... }` so we should be good
        readToReplace = read;
      })
    ) {
      return;
    }
    if (!readToReplace) {
      if (ifRead) {
        vlog('- This binding was only read in an `if`, bailing');
        return true;
      }

      vlog('- This binding was not read? Bailing...');
      return true;
    }

    let varWrite;
    if (
      meta.writes.some((write) => {
        if (write.kind === 'var') {
          ASSERT(!varWrite);
          varWrite = write;
        } else if (write.kind === 'assign') {
          if (!AST.isPrimitive(write.parentNode.right)) {
            // TODO: type checks may still reveal that this is a falsy value
            vlog('- At least one assignment was not a primitive, bailing for now');
            return true;
          }
          if (AST.getPrimitiveValue(write.parentNode.right)) {
            vlog('- At least one write assigned a truthy primitive value, bailing');
            return true;
          }
        } else {
          vlog('- At least one write was neither the var nor an assignment, bailing', write.kind);
          return true;
        }
      })
    ) {
      return;
    }

    ASSERT(varWrite);

    queue.push({
      index: varWrite.blockIndex,
      func: () => {
        rule(
          'A binding that starts truthy and is only set to falsy and used in an if-test can have reads inside those ifs inlined up to the write',
        );
        example('const n = /foo/; let x = n; if (x) { f(x); x = false; }', 'const n = /foo/; let x = true; if (x) { f(n); x = false; }');
        before(meta.writes.map((write) => write.blockBody[write.blockIndex]));
        before(meta.reads.map((read) => read.blockBody[read.blockIndex]));

        varWrite.parentNode.init = AST.tru();
        if (readToReplace.parentIndex < 0) readToReplace.parentNode[readToReplace.parentProp] = init;
        else readToReplace.parentNode[readToReplace.parentProp][readToReplace.parentIndex] = init;

        after(varWrite.blockBody[varWrite.blockIndex]);
        after(readToReplace.blockBody[readToReplace.blockIndex]);
      },
    });
  });

  if (queue.length) {
    // By index, high to low. This way it should not be possible to cause reference problems by changing index
    queue.sort(({ index: a }, { index: b }) => (a < b ? 1 : a > b ? -1 : 0));
    queue.forEach(({ index, func }) => func());

    log('Self destructing bindings split:', queue.length, '. Restarting from phase1 to fix up read/write registry.');
    return {what: 'readOnce', changes: queue.length, next: 'phase1'};
  }

  log('Self destructing bindings split: 0.');
  return false;
}
