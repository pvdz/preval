import {
  ASSERT,
  log,
  group,
  groupEnd,
  vlog,
  vgroup,
  vgroupEnd,
  fmat,
  tmat,
  rule,
  example,
  before,
  source,
  after,
  findBodyOffset,
} from '../utils.mjs';
import * as AST from '../ast.mjs';

export function pruneEmptyFunctions(fdata) {
  group('\n\n\nPruning calls to empty and noop functions\n');
  const r = _pruneEmptyFunctions(fdata);
  groupEnd();
  return r;
}
function _pruneEmptyFunctions(fdata) {
  const toDelete = []; // read
  const toReplaceAt = []; // Array<[read, index]>
  const toReplaceWith = []; // Array<[read, node]> (the node should be simple and will be cloned)
  fdata.globallyUniqueNamingRegistry.forEach((meta, name) => {
    if (meta.isImplicitGlobal) return;
    if (meta.isBuiltin) return;
    if (!meta.isConstant) return;

    vlog(
      '- `' + name + '`:',
      meta.constValueRef.node.type,
      'reads args?',
      meta.constValueRef.node.$p.readsArgumentsLen,
      meta.constValueRef.node.$p.readsArgumentsAny,
    );

    if (meta.writes.length !== 1) {
      vlog('  - Binding has more than one write. Bailing');
      return;
    }

    const funcNode = meta.constValueRef.node;
    if (funcNode.type !== 'FunctionExpression') {
      vlog('  - not a function');
      return;
    }

    if (funcNode.$p.readsArgumentsAny || funcNode.$p.readsArgumentsLen) {
      // Note: Inlining the arg count should be trivial so we can do that easily
      //       We can probably deal with many usages of `arguments` as well, but I'm just deferring that
      vlog('  - Accesses `arguments`, bailing on that for now');
      return;
    }

    if (funcNode.$p.thisAccess) {
      // Note: Most likely we can patch up many cases where `this` is accessed. But not right now.
      vlog('  - Accesses `this`, bailing on that for now');
      return;
    }

    const body = funcNode.body.body;
    ASSERT(body.length > 0, 'normalized functions must always at least have a Debugger node');

    const bodyStart = findBodyOffset(funcNode);
    if (bodyStart >= body.length) {
      vlog('  - this function is empty. Find all calls and replace them with `undefined`');
      if (!meta.reads.length) vlog('    - (this function is not used)');

      meta.reads.forEach((read) => {
        const callNode = read.parentNode;
        vlog('    - read:', callNode.type);
        if (callNode.type !== 'CallExpression') return;
        vlog('    - calls:', callNode.callee.name, 'with', callNode['arguments'].length, 'args');
        if (callNode.callee.type !== 'Identifier') return false;
        if (callNode.callee.name !== name) return false;
        vlog('    - queuing to eliminating call to empty function');
        toDelete.push(read);
      });
    } else if (bodyStart >= body.length - 1) {
      vlog('  - this function is has one statement. Trying to figure out easy inline cases.');

      const onlyNode = body[bodyStart];
      if (onlyNode.type === 'ReturnStatement') {
        vlog('  - the function has a return statement');

        const arg = onlyNode.argument;
        // Outlining this may introduce multiple copies of a long string or complex literal. TBD whether I care.
        // - if the return argument is a primitive, replace all calls with that (probably won't see much of that in the wild)
        // - if the return value is an identifier
        //   - if the ident is a param name, replace all calls with the argument at that index
        //   - otherwise it is a closure, can only inline the call if the call site can reach the returned binding
        // This will hit a lot of artifacts of the IR. Not so much for real code in the wild (although it could)
        if (AST.isPrimitive(arg)) {
          vlog('  - the function returns a primitive. Replace all calls with that primitive');

          meta.reads.forEach((read, ri) => {
            const callNode = read.parentNode;
            vlog('    - read [' + ri + ']:', callNode.type);
            if (callNode.type !== 'CallExpression') return;
            vlog('    - calls:', callNode.callee.name, 'with', callNode['arguments'].length, 'args');
            if (callNode.callee.type !== 'Identifier') return false;
            if (callNode.callee.name !== name) return false;
            vlog('    - queuing to eliminating call to noop function');
            toReplaceWith.push(['primitive', read, arg]);
          });
        } else if (arg.type === 'Identifier') {
          vgroup('  - the function returns the identifier `' + arg.name + '` which is not a primitive. Checking if it is an arg');

          const argName = arg.name;
          let found = false;
          let rest = false;
          funcNode.params.forEach((pnode, pi) => {
            vlog(
              '  - pos',
              pi,
              ', placeholder `' +
                pnode.name +
                '`, name: ' +
                (pnode.$p.paramVarDeclRef?.name ? '`' + pnode.$p.paramVarDeclRef?.name + '`' : '<none>'),
            );
            ASSERT(pnode.type === 'Param');
            if (pnode.rest) {
              vlog('    - param at position', pi, 'is a rest param (`' + pnode.$p.paramVarDeclRef?.name + '`)');
              if (pnode.$p.paramVarDeclRef?.name === argName) {
                // Skip the implicit global check. We can't do this one.
                vlog('    - has the same name');
                found = true;
              }
              rest = true;
            } else if (pnode.$p.paramVarDeclRef?.name === argName) {
              vlog(
                '    - param at position',
                pi,
                'has the same name (`' + argName + '`). queueing all calls to `' + name + '` for replacement,',
                meta.reads.length,
                'reads',
              );
              found = true;
              // The returned value was a parameter and there was no rest parameter before it
              meta.reads.forEach((read, ri) => {
                const callNode = read.parentNode;
                vlog('    - read [' + ri + ']:', callNode.type);
                if (callNode.type !== 'CallExpression') {
                  vlog('      - Not a call');
                  return;
                }
                vlog('      - calls:', callNode.callee.name, 'with', callNode['arguments'].length, 'args');
                if (callNode.callee.type !== 'Identifier') {
                  vlog('      - Callee not ident');
                  return;
                }
                if (callNode.callee.name !== name) {
                  vlog('      - Callee different name (', callNode.callee.name, name, ')');
                  return;
                }
                vlog('      - queuing to eliminating call to empty function');
                toReplaceAt.push([read, pi]);
              });
            } else {
              vlog('    - param at position', pi, 'has a different name');
            }
          });

          vgroupEnd();

          if (found) {
            vlog('  - Yes, it was a param');
          } else {
            // The returned ident does not match any of the param names so it must be a closure, (global), or implicit global
            // Find all reads to the func. For all calls, determine whether the position of the call has access
            // to this identifier. If so, we can outline the return value and replace the call with the ident.
            vlog('  - No. Returned ident is not a param name. Inlining any call that has access to this ident.');
            // We can compare the blockChain of the returned ident with the blockChain of the call. If the
            // ident blockChain is a prefix of the call blockChain then the call should have access to the ident.

            meta.reads.forEach((read, ri) => {
              const callNode = read.parentNode;
              vlog('    - read [' + ri + ']:', callNode.type);
              if (callNode.type !== 'CallExpression') {
                vlog('      - Not a call');
                return;
              }
              vlog('      - calls:', callNode.callee.name, 'with', callNode['arguments'].length, 'args');
              if (callNode.callee.type !== 'Identifier') {
                vlog('      - Callee not ident');
                return false;
              }
              if (callNode.callee.name !== name) {
                vlog('      - Callee different name (', callNode.callee.name, name, ')');
                return false;
              }
              vlog('      - queuing to eliminating call with the ident `' + argName + '`');
              toReplaceWith.push(['identifier', read, arg]);
            });
          }
        }
      } else {
        vlog('TODO: the statement is not a return. we can probably still inline it');
      }
    }
  });
  log('\nQueued', toDelete.length, 'calls for deletion,', toReplaceAt.length, 'for replacement, and', toReplaceWith.length, 'for inlining');
  if (toDelete.length || toReplaceAt.length || toReplaceWith.length) {
    toDelete.forEach(({ node, parentNode, grandNode, grandProp, grandIndex, ...rest }, i) => {
      rule('[' + (i + 1) + '/' + toDelete.length + '] Call to function with empty body should be replaced with `undefined`');
      example('function f(){} f();', 'undefined;');
      before(node, grandNode);

      // Note: we want to replace the entire call expression, not just the identifier (otherwise you end up with `undefined()`)
      if (grandIndex >= 0) grandNode[grandProp][grandIndex] = AST.identifier('undefined');
      else grandNode[grandProp] = AST.identifier('undefined');

      after(AST.identifier('undefined'), grandNode);
    });
    toReplaceAt.forEach(([{ node, parentNode, grandNode, grandProp, grandIndex, ...rest }, pi], i) => {
      rule('[' + (i + 1) + '/' + toReplaceAt.length + '] Call to function that returns a param should be replaced with that arg');
      example('function f(a){ return a; } f(10);', '10;');
      before(parentNode, grandNode);

      // Note: we want to replace the entire call expression, not just the identifier (otherwise you end up with `undefined()`)
      const newNode = parentNode.arguments[pi] || AST.identifier('undefined');
      if (grandIndex >= 0) grandNode[grandProp][grandIndex] = newNode;
      else grandNode[grandProp] = newNode;

      after(newNode, grandNode);

      //vlog('\nCurrent state\n--------------\n' + fmat(tmat(fdata.tenkoOutput.ast)) + '\n--------------\n');
    });
    toReplaceWith.forEach(([what, { node, parentNode, grandNode, grandProp, grandIndex, ...rest }, arg], i) => {
      rule(
        '[' + (i + 1) + '/' + toReplaceWith.length + '] Call to function that returns a [' + what + '] should be replaced with that node',
      );
      example('function f(){ return 15; } f(10);', '15;', () => what === 'primitive');
      example('function f(){ return x; } f(10);', 'x;', () => what === 'identifier');
      before(parentNode, grandNode);

      // Note: we want to replace the entire call expression, not just the identifier (otherwise you end up with `undefined()`)
      const newNode = AST.cloneSimple(arg);
      if (grandIndex >= 0) grandNode[grandProp][grandIndex] = AST.cloneSimple(arg);
      else grandNode[grandProp] = AST.cloneSimple(arg);

      after(newNode, grandNode);
    });

    log('\nDeleted calls:', toDelete.length + toReplaceAt.length + toReplaceWith.length, '. Restarting from phase1.');
    return {what: 'pruneEmptyFunctions', changes: toDelete.length + toReplaceAt.length + toReplaceWith.length, next: 'phase1'};
  }

  log('Deleted calls: 0.');
}
