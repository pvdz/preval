// Functions that just call another function and return the results.
// It's a common artifact, at least, for the single branch normalization
//
//    function f(x){ return $(x); } f(x)
// ->
//    $(x)
//
// Also includes a special case for Buffer.from().toString()
//

import { ASSERT, log, group, groupEnd, vlog, vgroup, vgroupEnd, rule, example, before, source, after, findBodyOffset } from '../utils.mjs';
import * as AST from '../ast.mjs';
import { createFreshVar } from '../bindings.mjs';
import { THIS_ALIAS_BASE_NAME } from '../symbols_preval.mjs';

export function pruneTrampolineFunctions(fdata) {
  group('\n\n\nPruning trampoline functions that only return the call to another function\n');
  const r = _pruneTrampolineFunctions(fdata);
  groupEnd();
  return r;
}
function _pruneTrampolineFunctions(fdata) {
  const toOutlineCall = []; // Array<[read, node, mapping]> // funcs with a call as body (but no return)
  const toReplaceWith = []; // Array<[read, node, mapping, calleeIdentIndex, calleeObjectIndex, calleePropIndex]> // funcs that return the call of another func. the last three values are for replacing the callee with an arg
  const bufferTrick = [];
  fdata.globallyUniqueNamingRegistry.forEach((meta, funcName) => {
    if (meta.isImplicitGlobal) return;
    if (meta.isBuiltin) return;
    if (!meta.isConstant) return;

    vlog(
      '- `' + funcName + '`:',
      meta.constValueRef.node.type,
      'reads `arguments` len/any?',
      meta.constValueRef.node.$p.readsArgumentsLen,
      meta.constValueRef.node.$p.readsArgumentsAny,
    );

    const funcNode = meta.constValueRef.node;
    if (funcNode.type !== 'FunctionExpression') {
      vlog('  - Not a function');
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

    const funcParams = funcNode.params;

    // Ignore this step if the function has a rest arg. It'll be too difficult to map for now.
    const lastParam = funcParams[funcParams.length - 1];
    ASSERT(lastParam === undefined || lastParam.type === 'Param');
    vlog('  - Has rest?', !!lastParam?.rest);
    if (lastParam?.rest) {
      vlog('  - Bailing. Cannot deal with rest right now');
      return;
    }

    const bodyOffset = findBodyOffset(funcNode);
    const statementCount = funcNode.body.body.length - bodyOffset;
    vlog('  - Has', statementCount, 'statements');

    if (statementCount === 1) {
      vlog('  - This function is has one statement. Trying to figure out easy inline cases.');

      const firstNode = funcNode.body.body[bodyOffset];
      vlog('  - node is a;', firstNode.type, firstNode.expression?.type);

      if (firstNode.type !== 'ExpressionStatement' || firstNode.expression.type !== 'CallExpression') {
        vlog('  - The statement is not a call. Not relevant for this step but perhaps another.');
        return;
      }

      // We should probably protect against recursive functions? Although if this is one then it's an infinite loop anyways.
      vlog('  - All the function does is call a function and return undefined. Going to inline calls to it.');

      // Replace all calls to this function with undefined. Add a clone to the inner call before the line of the outer call.
      // Make sure to properly map the params to the new outer call.
      // Some params may be used multiple times. Some args may not be params.
      // This one is slightly trickier than the trampoline that returns the result because the value must be undefined.

      // This is the call the move, its clones should replace all calls to funcNode
      const innerCallNode = firstNode.expression;

      // The callee must be an ident, a literal, or a simple member expression.
      if (innerCallNode.callee.type !== 'Identifier' && innerCallNode.callee.type !== 'MemberExpression') return; // Member expressions are todo

      let calleeMapping = -1; // if ident
      let calleeObjMapping = -1; // if member, the object
      let calleePropMapping = -1; // if computed member, the prop

      if (innerCallNode.callee.type === 'Identifier') {
        const innerCalleeName = innerCallNode.callee.name;
        vlog('  - Callee is an identifier (`' + innerCalleeName + '`)');

        // Find out whether `name` is a parameter
        funcNode.params.some((pnode, pi) => {
          ASSERT(pnode.type === 'Param');
          vlog('    - `' + pnode.$p.paramVarDeclRef?.name + '` === `' + innerCalleeName + '`');
          if (pnode.$p.paramVarDeclRef?.name === innerCalleeName) {
            calleeMapping = pi;
            return true;
          }
        });
        vlog('  - Callee (`' + innerCalleeName + '`) maps to param index:', calleeMapping);
      } else {
        ASSERT(innerCallNode.callee.type === 'MemberExpression');
        const mem = innerCallNode.callee;
        vlog('  - Callee is a member expression');
        // It may still be a literal, which needs no mapping
        if (mem.object.type === 'Identifier') {
          const objName = mem.object.name;
          vlog('  - Callee object is an identifier (`' + objName + '`)');

          // Find out whether `name` is a parameter
          funcNode.params.some((pnode, pi) => {
            ASSERT(pnode.type === 'Param');
            vlog('    - `' + pnode.$p.paramVarDeclRef?.name + '` === `' + objName + '`');
            if (pnode.$p.paramVarDeclRef?.name === objName) {
              calleeObjMapping = pi;
              return true;
            }
          });
          vlog('  - Callee.object (`' + objName + '`) maps to param index:', calleeObjMapping);
        }

        if (mem.computed && mem.property.type === 'Identifier') {
          const propName = mem.property.name;
          vlog('  - Callee is a computed property and the property is an identifier (`' + propName + '`)');

          // Find out whether `name` is a parameter
          funcNode.params.some((pnode, pi) => {
            ASSERT(pnode.type === 'Param');
            vlog('    - `' + pnode.$p.paramVarDeclRef?.name + '` === `' + propName + '`');
            if (pnode.$p.paramVarDeclRef?.name === propName) {
              calleePropMapping = pi;
              return true;
            }
          });
          vlog('  - Callee.property (`' + propName + '`) maps to param index:', calleePropMapping);
        }
      }

      // All args to this call should be simple, so literal or ident, and may be spread (irrelevant)
      // For all idents, figure out whether it's an argument, and if so, generate a mapping to apply when cloning

      const paramArgMapping = new Map();
      innerCallNode['arguments'].forEach((anode, ai) => {
        let name;
        if (anode.type === 'SpreadElement') {
          if (anode.argument.type === 'Identifier') {
            name = anode.argument.name;
          }
        } else if (anode.type === 'Identifier') {
          name = anode.name;
        }

        if (!name) {
          ASSERT(
            !AST.isComplexNode(anode) || (anode.argument && !AST.isComplexNode(anode.argument)),
            'all args must be simple nodes and werent idents so they are literals, yea?',
          );
          // No need to map literals
          return;
        }

        // Find out whether `name` is a parameter
        funcNode.params.some((pnode, pi) => {
          ASSERT(pnode.type === 'Param');

          if (pnode.$p.paramVarDeclRef?.name === name) {
            // For all calls to funcNode we will replace `name` in the clone with the arg at this index
            paramArgMapping.set(ai, pi);
            return true;
          }
        });
      });
      vlog('  - Mapping of call args to params:', paramArgMapping);
      vlog('  - Now finding all calls to the function to replace. Reads:', meta.reads.length);

      // Now find all calls to the funcNode and replace them with the innerCall, applying the mapping
      meta.reads.forEach((read, ri) => {
        const callNode = read.parentNode;
        vlog('    - read', ri, '; is a', callNode.type);
        if (callNode.type !== 'CallExpression') return;
        vlog('      - calls:', callNode.callee.name, 'with', callNode['arguments'].length, 'args');
        if (callNode.callee.type !== 'Identifier') return false;
        if (callNode.callee.name !== funcName) return false;
        if (callNode['arguments'].some((anode) => anode.type === 'SpreadElement')) return false; // TODO: there are some cases where we can still inline this
        // This is a call to funcNode. Queue to replace it with the call, replacing param-args with original args
        vlog('      - queuing into toOutlineCall to eliminating call to trampoline function');
        toOutlineCall.push([read, innerCallNode, paramArgMapping, calleeMapping, calleeObjMapping, calleePropMapping]);
      });
    } else if (statementCount === 2) {
      vlog('    - this function is has two statements. Trying to figure out easy inline cases.');

      const varNode = funcNode.body.body[bodyOffset];
      const returnNode = funcNode.body.body[bodyOffset + 1];
      vlog('    - 1st node;', varNode.type);
      vlog('    - 2nd node;', returnNode.type);
      if (
        varNode.type === 'VariableDeclaration' &&
        varNode.declarations[0].init.type === 'CallExpression' &&
        returnNode.type === 'ReturnStatement' && // While `throw` is very similar, the transform is different because the call site may require injecting a new statement
        returnNode.argument.type === 'Identifier' &&
        returnNode.argument.name === varNode.declarations[0].id.name
      ) {
        // We should probably protect against recursive functions? Although if this is one then it's an infinite loop anyways.
        vlog('        - all the function does is call a function and return its result');

        // Copy-move the call inside this function to all calls to the function
        // Make sure to properly map the callee and params to the call.
        // Some params may be used multiple times. Some args may not be params.

        const innerCallNode = varNode.declarations[0].init;
        const innerCallee = innerCallNode.callee;

        // If the callee is a param, or as a member expression, uses a param, then bail for now.
        // We may still be able to do something explicit in the future but for now just bail.
        let calleeIdentIndex = -1;
        let calleeObjectIndex = -1;
        let calleePropIndex = -1;
        if (innerCallee.type === 'Identifier') {
          const calleeName = innerCallee.name;
          vlog(
            '        - Checking if the callee `' +
              calleeName +
              '` is a param [' +
              funcParams.map((n) => '`' + n.name + '`').join(', ') +
              ']',
          );

          funcParams.some((anode, ai) => {
            if (anode.$p.paramVarDeclRef?.name === calleeName) {
              calleeIdentIndex = ai;
              vlog('          - yes; replacing the callee ident with argument at index', ai);
              return true;
            }
          });
          if (calleeIdentIndex < 0) {
            vlog('          - no');
          }
        } else {
          const calleeNameObj = innerCallee.object.name;
          const calleeNameProp = innerCallee.property.name;
          vlog(
            '        - Checking if the callee.object `' +
              (innerCallee.object.type === 'Identifier' ? calleeNameObj : '<??>') +
              '` or property `' +
              (innerCallee.computed && innerCallee.property.type === 'Identifier' ? innerCallee.property.name : '<??>') +
              '` is a param [' +
              funcParams.map((n) => '`' + n.name + '`').join(', ') +
              ']',
          );
          ASSERT(innerCallee.type === 'MemberExpression', 'All other cases are eliminated, yes?', innerCallNode);
          // For now, reject both object and property. Later we may support property in a special case.
          if (innerCallee.object.type === 'Identifier') {
            funcParams.some((pnode, ai) => {
              if (pnode.$p.paramVarDeclRef?.name === calleeNameObj) {
                calleeObjectIndex = ai;
                vlog('          - yes; replacing the callee object ident with argument at index', ai);
                return true;
              }
            });
          }
          if (innerCallee.computed && innerCallee.property.type === 'Identifier') {
            funcParams.some((pnode, ai) => {
              if (pnode.$p.paramVarDeclRef?.name === calleeNameProp) {
                calleePropIndex = ai;
                vlog('          - yes; replacing the callee prop ident with argument at index', ai);
                return true;
              }
            });
          }
        }
        vlog('          -', calleeIdentIndex, calleeObjectIndex, calleePropIndex);

        const paramArgMapping = new Map(); // Map index of the argument of the call to be cloned to the index of the argument to replace it with
        innerCallNode['arguments'].forEach((anode, ai) => {
          // Check whether this argument was a param of this function. If so add it to the mapping.

          let name;
          if (anode.type === 'SpreadElement') {
            if (anode.argument.type === 'Identifier') {
              name = anode.argument.name;
            }
          } else if (anode.type === 'Identifier') {
            name = anode.name;
          }

          if (!name) {
            ASSERT(
              AST.isPrimitive(anode) || (anode.argument && AST.isPrimitive(anode.argument)),
              'all args must be simple nodes and werent idents so they are literals, yea?',
              anode,
            );
            // No need to map literals
            return;
          }

          funcParams.some((pnode, pi) => {
            ASSERT(pnode.type === 'Param');
            if (pnode.$p.paramVarDeclRef?.name === name) {
              // We are replacing one call with another, and this is how we map the previous args;
              // "The ath argument of the new call is the pth arg of the previous call"
              paramArgMapping.set(ai, pi);
              return true;
            }
          });
        });

        // Now find all calls to the funcNode and replace them with the innerCall, applying the mapping
        meta.reads.forEach((read, ri) => {
          const callNode = read.parentNode;
          vlog('          - read [' + ri + ']:', callNode.type);
          if (callNode.type !== 'CallExpression') return;
          vlog('          - calls:', callNode.callee.name, 'with', callNode['arguments'].length, 'args');
          if (callNode.callee.type !== 'Identifier') return false;
          if (callNode.callee.name !== funcName) return false;
          if (callNode['arguments'].some((anode) => anode.type === 'SpreadElement')) return false; // TODO: there are some cases where we can still inline this
          // This is a call to funcNode. Queue to replace it with the call, replacing param-args with original args
          vlog('          - queuing into toReplaceWith to eliminating call to trampoline function2');
          toReplaceWith.push([read, innerCallNode, paramArgMapping, calleeIdentIndex, calleeObjectIndex, calleePropIndex]);
        });
      }
    } else if (statementCount === 3) {
      // Two statements that are called in tandem and may as well be considered one
      // statement, for example `a.b.c()` is going to be `const x = a.b; x.c()`.

      const stmt1 = funcNode.body.body[bodyOffset];
      const stmt2 = funcNode.body.body[bodyOffset+1];
      const ret = funcNode.body.body[bodyOffset + 2];

      if (!isBufferConvertPattern(stmt1, stmt2, funcNode.params[0]?.$p.paramVarDeclRef?.name)) return;
      if (!isDeclaredVarReturned(stmt2, ret)) return;

      const init1 = stmt1.declarations[0].init;
      const init2 = stmt2.declarations[0].init;

      // Should have found our Buffer.from(x,"y").toString("z") trampoline. Find calls to inline.

      meta.reads.forEach(read => {
        if (
          read.parentNode.type === 'CallExpression' &&
          read.parentProp === 'callee' &&
          read.parentNode.arguments.length === 1 &&
          AST.isPrimitive(read.parentNode.arguments[0])
        ) {
          bufferTrick.push({
            index: +read.node.$p.pid,
            func: () => {
              // This is a case we can inline
              const args = read.parentNode.arguments;

              rule('Calling a function that just calls Buffer.from().toString() on the arg can be inlined');
              example(
                'function f(a) { const x = Buffer.from(a, "base64"); const y = x.toString("binary"); return y; } const boo = f("boo")',
                'function f(a) { const x = Buffer.from(a, "base64"); const y = x.toString("binary"); return y; } const x = Buffer.from("boo", "base64"); const boo = x.toString("binary");)',
              );
              before(funcNode);
              before(read.blockBody[read.blockIndex]);

              const tmpName = createFreshVar('$bufferfrom', fdata);

              read.blockBody.splice(
                read.blockIndex, 0,
                AST.variableDeclaration(
                  tmpName,
                  AST.callExpression(
                    AST.memberExpression('Buffer', 'from'),
                    [
                      AST.primitive(AST.getPrimitiveValue(args[0])),
                      ...init1.arguments.slice(1).map(anode => AST.primitive(AST.getPrimitiveValue(anode)))
                    ]
                  ),
                  'const'
                )
              );
               // replace the call, whereever it is, with a call to the tmp.toString with the same args
              read.parentNode.callee = AST.memberExpression(tmpName, 'toString');
              read.parentNode.arguments = init2.arguments.map(anode => AST.primitive(AST.getPrimitiveValue(anode)));

              after(read.blockBody[read.blockIndex]);
              after(read.blockBody[read.blockIndex+1]);
            }
          })
        }
      });
    } else if (statementCount === 4) {
      // This is a bit of a manual hack to support the buffer encode case when there's an extra statement. So sue me.
      // In this pattern we target a function that does:
      // `function f(x) { whatever = x; const a = Buffer.from(x); const b = a.toString(); return b; }`
      // So in particular, we search for an assignment of the param to a global. Should be safe to outline that too, regardless.

      const stmt = funcNode.body.body[bodyOffset];
      if (stmt.type !== 'ExpressionStatement') return;
      if (stmt.expression.type !== 'AssignmentExpression') return;
      if (stmt.expression.left.type !== 'Identifier') return;
      if (stmt.expression.right.type !== 'Identifier') return;

      const firstParamName = funcNode.params[0]?.$p.paramVarDeclRef?.name;
      if (stmt.expression.right.name !== firstParamName) return;

      const lhsMeta = fdata.globallyUniqueNamingRegistry.get(stmt.expression.left.name);

      if (
        !lhsMeta.isImplicitGlobal &&
        !lhsMeta.writes.some(write => write.kind === 'var' && write.funcChain === '1')
      ) return; // an explicit var whose decl is not a var or not in global space; bail

      const stmt1 = funcNode.body.body[bodyOffset + 1];
      const stmt2 = funcNode.body.body[bodyOffset + 2];
      const ret = funcNode.body.body[bodyOffset + 3];

      if (!isBufferConvertPattern(stmt1, stmt2, firstParamName)) return;
      if (!isDeclaredVarReturned(stmt2, ret)) return;

      const init1 = stmt1.declarations[0].init;
      const init2 = stmt2.declarations[0].init;

      // Should have found our Buffer.from(x,"y").toString("z") trampoline. Find calls to inline.

      meta.reads.forEach(read => {
        if (
          read.parentNode.type === 'CallExpression' &&
          read.parentProp === 'callee' &&
          read.parentNode.arguments.length === 1 &&
          AST.isPrimitive(read.parentNode.arguments[0])
        ) {
          bufferTrick.push({
            index: +read.node.$p.pid,
            func: () => {
              // This is a case we can inline
              const args = read.parentNode.arguments;

              rule('Calling a function that just calls Buffer.from().toString() on the arg can be inlined');
              example(
                'function f(a) { const x = Buffer.from(a, "base64"); const y = x.toString("binary"); return y; } const boo = f("boo")',
                'function f(a) { const x = Buffer.from(a, "base64"); const y = x.toString("binary"); return y; } const x = Buffer.from("boo", "base64"); const boo = x.toString("binary");)',
              );
              before(funcNode);
              before(read.blockBody[read.blockIndex]);

              const tmpName = createFreshVar('$bufferfrom', fdata);
              const argValue = AST.getPrimitiveValue(args[0]);

              read.blockBody.splice(
                read.blockIndex, 0,
                AST.expressionStatement(
                  AST.assignmentExpression(
                    AST.identifier(stmt.expression.left.name),
                    AST.primitive(argValue),
                  )
                ),
                AST.variableDeclaration(
                  tmpName,
                  AST.callExpression(
                    AST.memberExpression('Buffer', 'from'),
                    [
                      AST.primitive(argValue),
                      ...init1.arguments.slice(1).map(anode => AST.primitive(AST.getPrimitiveValue(anode)))
                    ]
                  ),
                  'const'
                )
              );
              // replace the call, whereever it is, with a call to the tmp.toString with the same args
              read.parentNode.callee = AST.memberExpression(tmpName, 'toString');
              read.parentNode.arguments = init2.arguments.map(anode => AST.primitive(AST.getPrimitiveValue(anode)));

              after(read.blockBody[read.blockIndex]);
              after(read.blockBody[read.blockIndex+1]);
            }
          })
        }
      });
    } else {
      // I dunno, gotta draw the line somewhere. Can't risk code bloat.
      vlog('bail: Func body is more than three statements');
    }
  });
  log('Queued', toReplaceWith.length, 'calls for remapping and', toOutlineCall.length, 'calls for outlining');
  if (toReplaceWith.length || toOutlineCall.length || bufferTrick.length) {
    vgroup('toReplaceWith');
    // This is for the var-call-return variant
    toReplaceWith.forEach(
      ([
        { node, parentNode, grandNode, grandProp, grandIndex, ...rest },
        innerCallNode,
        innerArgMapping,
        calleeIdentIndex,
        calleeObjectIndex,
        calleePropIndex,
      ]) => {
        rule('Calls to a function that only returns the call to another function should be replaced with a direct call');
        example('function f(a){ return a; } function g(a){ const r = f(a); return r; } g(10);', 'f(10);');
        before(parentNode, grandNode);

        const outerCallNode = parentNode;
        const oldCall = grandIndex >= 0 ? grandNode[grandProp][grandIndex] : grandNode[grandProp];
        const oldArgs = oldCall.arguments;
        ASSERT(oldCall?.type === 'CallExpression', 'call?', oldCall);
        ASSERT(innerCallNode?.type === 'CallExpression', 'call?', innerCallNode);
        const oldCallee = oldCall.callee;
        const replaceCallee = innerCallNode.callee;
        ASSERT(
          AST.isSimpleNodeOrSimpleMember(oldCallee),
          'outer callee should be normalized so a simple node or simple member expression',
          oldCall,
        );
        ASSERT(
          AST.isSimpleNodeOrSimpleMember(replaceCallee),
          'inner callee should be normalized so a simple node or simple member expression',
          oldCall,
        );
        // Take the replaceNode, clone the callee (could be ident or member, irrelevant) and either remap the args or clone it
        // Take special care if the callee was based on a parameter
        const newCallee =
          replaceCallee.type === 'Identifier'
            ? AST.cloneSimple(calleeIdentIndex >= 0 ? oldArgs[calleeIdentIndex] : replaceCallee)
            : AST.memberExpression(
                AST.cloneSimple(calleeObjectIndex >= 0 ? oldArgs[calleeObjectIndex] ?? AST.identifier('undefined') : replaceCallee.object),
                AST.cloneSimple(calleePropIndex >= 0 ? oldArgs[calleePropIndex] ?? AST.identifier('undefined') : replaceCallee.property),
                replaceCallee.computed,
              );
        const newArgs = innerCallNode.arguments.map((anode, ai) => {
          if (anode.type === 'SpreadElement') {
            if (innerArgMapping.has(ai)) {
              // Use the outer call arg, or undefined if there were fewer args
              return AST.spreadElement(AST.cloneSimple(outerCallNode.arguments[innerArgMapping.get(ai)] ?? AST.identifier('undefined')));
            }
            // Keep the inner call arg
            return AST.spreadElement(AST.cloneSimple(anode.argument));
          } else {
            if (innerArgMapping.has(ai)) {
              // Use the outer call arg, or undefined if there were fewer args
              return AST.cloneSimple(outerCallNode.arguments[innerArgMapping.get(ai)] ?? AST.identifier('undefined'));
            }
            // Keep the inner call arg
            return AST.cloneSimple(anode);
          }
        });

        const newCall = AST.callExpression(newCallee, newArgs);
        // Note: we want to replace the entire call expression, not just the callee
        if (grandIndex >= 0) grandNode[grandProp][grandIndex] = newCall;
        else grandNode[grandProp] = newCall;

        after(newCall, grandNode);
      },
    );
    vgroupEnd();

    vgroup('toOutlineCall');
    // This is for the "just a call" variant
    toOutlineCall
      .reverse()
      .forEach(
        ([
          { node, parentNode, grandNode, grandProp, grandIndex, blockBody, blockIndex, ...rest },
          innerCallNode,
          innerArgMapping,
          innerCalleeMapping,
          calleeObjMapping,
          calleePropMapping,
        ]) => {
          // This one in reverse because it moves indexes and invalidates index references
          rule('Calls to a function that only calls another func should be replaced with a direct call and undefined');
          example('function f(a){ return a; } function g(a){ f(a); } $(g(10));', 'f(10); $(undefined);');
          before(parentNode, blockBody[blockIndex]);

          const outerCallNode = parentNode; // This is the one calling the trampoline, the one to replace with a controlled clone of innerCallNode
          vlog('old call:');
          source(outerCallNode);
          ASSERT(outerCallNode?.type === 'CallExpression', 'call?', outerCallNode);
          ASSERT(outerCallNode.callee.type === 'Identifier', 'name?', outerCallNode);
          ASSERT(innerCallNode?.type === 'CallExpression', 'call?', innerCallNode);
          // Take the replaceNode, clone the callee (could be ident or member, irrelevant) and either remap the args or clone it

          const oldCallee = innerCallNode.callee;
          let newCallee;
          if (oldCallee.type === 'Identifier') {
            newCallee = AST.cloneSimple(
              innerCalleeMapping >= 0 ? outerCallNode.arguments[innerCalleeMapping] ?? AST.identifier('undefined') : innerCallNode.callee,
            );
          } else {
            ASSERT(oldCallee.type === 'MemberExpression');
            const oldObject = oldCallee.object;
            const oldProp = oldCallee.property;
            const newObject = AST.cloneSimple(
              calleeObjMapping >= 0 ? outerCallNode.arguments[calleeObjMapping] ?? AST.identifier('undefined') : oldObject,
            );
            const newProp = AST.cloneSimple(
              oldCallee.computed
                ? calleePropMapping >= 0
                  ? outerCallNode.arguments[calleePropMapping] ?? AST.identifier('undefined')
                  : oldProp
                : oldProp,
            );
            newCallee = AST.memberExpression(newObject, newProp, oldCallee.computed);
          }

          const newArgs = innerCallNode.arguments.map((anode, ai) => {
            if (anode.type === 'SpreadElement') {
              if (innerArgMapping.has(ai)) {
                // Use the outer call arg, or undefined if there were fewer args
                return AST.spreadElement(AST.cloneSimple(outerCallNode.arguments[innerArgMapping.get(ai)] ?? AST.identifier('undefined')));
              }
              // Keep the inner call arg
              return AST.spreadElement(AST.cloneSimple(anode.argument));
            } else {
              if (innerArgMapping.has(ai)) {
                // Use the outer call arg, or undefined if there were fewer args
                return AST.cloneSimple(outerCallNode.arguments[innerArgMapping.get(ai)] ?? AST.identifier('undefined'));
              }
              // Keep the inner call arg
              return AST.cloneSimple(anode);
            }
          });

          const newCall = AST.callExpression(newCallee, newArgs);
          // Note: we want to replace the entire call expression, not just the callee
          blockBody.splice(blockIndex, 0, AST.expressionStatement(newCall));

          // Note: we want to replace the entire call expression, not just the callee
          if (grandIndex >= 0) grandNode[grandProp][grandIndex] = AST.identifier('undefined');
          else grandNode[grandProp] = AST.identifier('undefined');

          after(blockBody[blockIndex]);
          after(blockBody[blockIndex + 1]);
        },
      );
    vgroupEnd();

    vgroup('bufferTrick');
    bufferTrick.sort(({ index: a }, { index: b }) => (a < b ? 1 : a > b ? -1 : 0));
    bufferTrick.forEach(({func}) => func());
    vgroupEnd();

    log('Trampolines inlined:', toReplaceWith.length + toOutlineCall.length + bufferTrick.length, ', restarting phase1');
    return {what: 'pruneTrampolineFunctions', changes: toReplaceWith.length + toOutlineCall.length + bufferTrick.length, next: 'phase1'};
  }

  log('Trampolines inlined: 0.');
  return false;
}


/**
 * Confirm that given statement pair is doing: `const x = Buffer.from('str', 'enc'); const y = x.toString('enc');`
 * The args of both calls should be predictable primitives. The second method call object should be on the first var.
 * The var decls should be const.
 */
function isBufferConvertPattern(stmt1, stmt2, paramName) {
  // Verify that the first statement is like `const x = Buffer.from(x, "base64")`, where x is a param
  if (stmt1.type !== 'VariableDeclaration') return false;
  const init1 = stmt1.declarations[0].init;
  if (init1.type !== 'CallExpression') return false;
  if (init1.arguments.length === 0) return false;
  if (init1.callee.type !== 'MemberExpression') return false;
  if (init1.callee.object.type !== 'Identifier') return false;
  if (init1.callee.computed) return false;
  if (init1.callee.property.name !== 'from') return false;
  // All args beyond the first must be primitives we can predict
  if (!init1.arguments.every((anode,i) => i === 0 || AST.isPrimitive(anode))) return false;
  // Verify that the second statement is something like `id1.toString("ascii")`
  const init2 = stmt2.declarations[0].init;
  if (init2.type !== 'CallExpression') return false;
  if (init2.callee.type !== 'MemberExpression') return false;
  if (init2.callee.object.type !== 'Identifier') return false;
  if (init2.callee.computed) return false;
  if (init2.callee.property.name !== 'toString') return false;
  // Verify that the first arg of init1 is a param
  if (init1.arguments[0].type !== 'Identifier') return false;
  if (init1.arguments[0].name !== paramName) return false;
  // Calling .toString() on the result of stmt1
  if (init2.callee.object.name !== stmt1.declarations[0].id.name) return false;
  // Verify that the args of init1 after the first arg primitives
  if (!init1.arguments.every((anode,i) => i === 0 || AST.isPrimitive(anode))) return false;
  // Verify that all the args to .toString() are primitives
  if (!init2.arguments.every(anode => AST.isPrimitive(anode))) return false;

  return true;
}
function isDeclaredVarReturned(stmt2, ret) {
  // Verify that it returns the stmt2 var
  if (ret.type !== 'ReturnStatement') return false;
  if (ret.argument.type !== 'Identifier') return false;
  if (ret.argument.name !== stmt2.declarations[0].id.name) return false;

  return true;
}
