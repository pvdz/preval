// Find functions for which a certain param is always called with a specific primitive or builtin symbol
//
//     `function f(a) { $(a); } f(1); f(1);`
// ->
//     `function f() { $(1); } f(); f();`
//
//     `function f(a) { $(a); } f($number_toString); f($number_toString);`
// ->
//     `function f() { const a = $number_toString; $(a); } f(); f();`
//
// (the opposite is "static arg op outlining")
//
// Also trying for objects, but that's much harder (f({x:1}) f({x: 2}) -> f(1)f(2))

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
  fmat,
  tmat,
  findBodyOffset,
  currentState,
} from '../utils.mjs';
import * as AST from '../ast.mjs';
import { createFreshVar } from '../bindings.mjs';
import { getPrimitiveValue } from '../ast.mjs';
import { BUILTIN_SYMBOLS } from '../symbols_builtins.mjs';

export function inlineIdenticalParam(fdata) {
  group('\n\n\n[inlineIdenticalParam] Checking for params which are always a certain primitive or the same object literal');
  currentState(fdata, 'inlineIdenticalParam', true, fdata);
  const r = _inlineIdenticalParam(fdata);
  groupEnd();
  return r;
}
function _inlineIdenticalParam(fdata) {
  // Find arrays which are constants and do not escape and where all member expressions are reads

  let changedPhase1 = 0;
  let changedNormal = 0;
  const queue = [];

  fdata.globallyUniqueNamingRegistry.forEach(function (meta, name) {
    if (meta.isBuiltin) return;
    if (meta.isImplicitGlobal) return;
    if (!meta.isConstant) return;
    if (meta.varDeclRef.node.type !== 'FunctionExpression') return;
    if (meta.varDeclRef.node.$p.readsArgumentsAny) return;
    if (meta.varDeclRef.node.$p.readsArgumentsLen) return;

    vgroup('- `' + name + '` is a constant function');
    const what = process(meta, name, fdata, queue);
    if (what === 'phase1') changedPhase1 += 1;
    if (what === 'normal') changedNormal += 1;
    vgroupEnd();
  });

  log('');
  if (changedPhase1 || changedNormal) {
    queue.sort(({ index: a }, { index: b }) => b - a);
    queue.forEach(({ index, func }) => func());

    log('Params replaced:', changedPhase1, ', objlits inlined:', changedNormal);
    if (changedNormal) {
      log('Restarting from normalization to patch up params');
      return {what: 'inlineIdenticalParam', changes: changedPhase1 + changedNormal, next: 'normal'}; // Params are wrecked
    }
    log('Restarting from phase1');
    return {what: 'inlineIdenticalParam', changes: changedPhase1 + changedNormal, next: 'phase1'}; // Params are fine
  }
  log('Params replaced: 0.');
}

function process(meta, funcName, fdata, queue) {
  const funcNode = meta.varDeclRef.node;
  if (!meta.reads.length) {
    vlog('- bail: There were no reads to this function');
    return false;
  }

  const params = funcNode.params;
  if (params.some((pnode) => pnode.rest)) {
    vlog('- bail: The function has a rest param');
    return false;
  }

  if (
    meta.reads.some((read, ri) => {
      const callNode = read.parentNode;

      if (callNode.type !== 'CallExpression') {
        vlog('- bail: At least one read was not a call expression');
        return true;
      }
      if (read.parentProp !== 'callee') {
        vlog('- bail: The function escapes, passed on as func arg');
        return true;
      }

      const args = callNode['arguments'];

      if (args.some((anode) => anode.type === 'SpreadElement')) {
        vlog('- bail: At least one call contained a spread');
        return true;
      }
    })
  ) {
    return false;
  }


  vlog('Found func "', funcName, '" that is only called', meta.reads.length, 'times and uses no rest/spread');

  vgroup('tryInliningPrimitiveOrBuiltin():');
  if (tryInliningPrimitiveOrBuiltin(meta, funcNode, params, queue)) {
    vgroupEnd();
    return 'phase1'; // This is fine to just cycle to phase1
  }
  vgroupEnd();

  vgroup('tryInliningObjectLiteral():');
  if (tryInliningObjectLiteral(meta, funcNode, params, fdata)) {
    vgroupEnd();
    return 'normal'; // This needs to go through normalize because we messed with params
  }
  vgroupEnd();

  return false;
}
function tryInliningPrimitiveOrBuiltin(meta, funcNode, params, queue) {
  let knownArgs = undefined; // bool[]. Set for first call. Next calls must match against these. false=invalidated
  let knownValues = params.map(() => undefined);
  if (
    meta.reads.some((read, ri) => {
      const callNode = read.parentNode;
      const args = callNode['arguments'];

      vgroup('- read', ri);
      if (knownArgs) {
        vlog('- not first call');
        // Not first call; args for this call must match knownArgs too. A when an index is false it means invalidation, skip it.
        params.forEach((_, pi) => {
          const anode = args[pi];

          ASSERT(knownValues[pi] || knownArgs[pi] === false, 'there should be a known value for each param here, whatever it is', knownArgs, knownValues);
          if (knownArgs[pi] === false) {
            // Arg is already invalidated. Skip this one.
            vlog('- arg already invalidated...');
          }
          else if (anode) {
            const isPrim = AST.isPrimitive(anode);
            const isBuiltin = anode.type === 'Identifier' && BUILTIN_SYMBOLS.has(anode.name);

            if (!isPrim && !isBuiltin) {
              vlog('- param', pi, 'received at least one non-primitive/non-builtin value. No longer considering this param');
              knownArgs[pi] = false;
            } else {
              let p;
              if (isPrim) {
                p = {kind: 'prim', val: getPrimitiveValue(anode)};
              } else {
                // It's a builtin symbol identifier
                p = {kind: 'name', val: anode.name};
              }
              if (p.kind !== knownValues[pi].kind || !Object.is(p.val, knownValues[pi].val)) {
                vlog('- param', pi, 'received at least two distinct values(', p, 'and', knownValues[pi], '. No longer considering this param');
                knownArgs[pi] = false;
              } else {
                vlog('- arg processed');
              }
            }
          }
          else {
            // There were fewer args than params so the value passed on is `undefined`
            if (knownValues[pi].val !== undefined) {
              vlog('- Param', pi, 'Received two different values (or none at all). No longer considering this param');
              knownArgs[pi] = false;
            } else {
              vlog('- param', pi, 'has no matching arg so it gets undefined, param already marked as such; ok', knownValues[pi]);
            }
            // else: arg is same as before, ok
          }
        });
      } else {
        // First call. Initialize the known args accordingly. There must be at least one call.
        vlog('- first call');
        knownArgs = params.map((_, pi) => {
          const anode = args[pi];
          if (!anode) {
            knownValues[pi] = {kind: 'prim', val: undefined};
            return true;
          } else if (AST.isPrimitive(anode)) {
            knownValues[pi] = {kind: 'prim', val: AST.getPrimitiveValue(anode)};
            return true;
          } else if (anode.type === 'Identifier' && BUILTIN_SYMBOLS.has(anode.name)) {
            knownValues[pi] = {kind: 'name', val: anode.name};
            return true;
          } else {
            // Note: being a global is not a guarantee for being accessible (due to evaluation order)
            return false;
          }
        });
        vlog('- known args now initialized to', knownArgs, 'and', knownValues);
      }
      vgroupEnd();

      if (knownArgs.every((a) => a === false)) return true;
    })
  ) {
    return false;
  }

  vlog('Looks like there was at least one param that was always called with the same value. Lets inline it!');
  vlog('::', knownArgs, knownValues);

  const varWrite = meta.writes.find((write) => write.kind === 'var');
  ASSERT(varWrite);

  rule('A function that is always called with the same primitive value or builtin symbol can inline that value');
  example('function f(a, b) { } f(1, 2); f(1, 4);', 'function f(b) { const a = 1; } f(2); f(4);');
  example('function f(a, b) { } f($number_toString, 2); f($number_toString, 4);', 'function f(b) { const a = $number_toString; } f(2); f(4);');
  before(varWrite.blockBody[varWrite.blockIndex]);

  vlog('Dropping args from calls now...');
  // For every position that is not false, from right to left, remove argument n from all calls to this function
  for (let i = knownArgs.length - 1; i >= 0; --i) {
    const pi = i;
    vgroup('- Arg', pi, 'valid:', knownArgs[pi], ', value:', knownValues[pi]);
    if (knownArgs[pi]) {
      const paramNode = params[pi];
      ASSERT(paramNode?.type === 'Param');

      if (paramNode.$p.paramVarDeclRef) {
        const varDecl = paramNode.$p.paramVarDeclRef.blockBody[paramNode.$p.paramVarDeclRef.blockIndex];
        ASSERT(varDecl?.type === 'VarStatement', 'var decl ye?', paramNode.$p.paramVarDeclRef.blockIndex, varDecl, pi, paramNode);

        params.splice(pi, 1);
        const body = paramNode.$p.paramVarDeclRef.blockBody;
        const index = paramNode.$p.paramVarDeclRef.blockIndex;
        const oldNode = body[index];
        body[index] = AST.emptyStatement();

        let initNode;
        if (knownValues[pi].kind === 'name') {
          initNode = AST.identifier(knownValues[pi].val);
        } else {
          initNode = AST.primitive(knownValues[pi].val);
        }
        oldNode.init = initNode;

        // This one should go first
        vlog('- queued injecting old param decl', pi, 'at body[index]', funcNode.$p.bodyOffset);
        queue.push({index: funcNode.$p.bodyOffset, func: () => {
          vlog('-- now injecting old param decl', pi, 'at body[index]:', funcNode.$p.bodyOffset);
          body.splice(funcNode.$p.bodyOffset, 0, oldNode);
        }});
        vlog('- queued splicing out old param decl', pi, 'at body[index]', index);
        queue.push({index, func: () => {
          vlog('-- now splicing out old param decl', pi, 'at body[index]:', index, body[index].type);
          body.splice(index, 1);
          vlog('-- decreasing the index of params targeting later indices', params.map(p => p.index));
          for (let p=0; p<params.length; ++p) {
            if (params[p].index > index) {
              vlog('  -- param', p, 'was targeting index', params[p].index);
              params[p].index -= 1;
            }
          }
        }});

        meta.reads.forEach((read,c) => {
          // Drop this arg from the read call
          const args = read.parentNode['arguments'];
          vlog('- queued dropping arg', pi, 'from call', c);
          queue.push({index: pi, func: () => {
            vlog('-- now dropping call arg', pi, 'from call', c);
            args.splice(pi, 1)
          }});
        });
      }

    }
    vgroupEnd();
  }

  vlog('Renaming Param nodes to eliminate holes we may have left');
  params.forEach((paramNode, pi) => {
    // Make sure the params are incremental in order. We can't leave any holes.
    if (paramNode.index !== pi) {
      // Dont need to set index but :shrug:
      paramNode.index = pi;
      paramNode.name = '$$' + pi;
      if (paramNode.$p.paramVarDeclRef) {
        paramNode.$p.paramVarDeclRef.node.index = pi;
        paramNode.$p.paramVarDeclRef.node.name = '$$' + pi;
      }
    }
  });

  after(varWrite.blockBody[varWrite.blockIndex]);

  return true;
}

function tryInliningObjectLiteral(meta, funcNode, params, fdata) {
  // It's a bit of a long shot but we're essentially looking for this:
  //
  //    function f(obj) { $(obj.a); } f({a: 1}); f({a: 2});
  //
  // Hopefully we can change it into something like
  //
  //    function f(a) { const obj = {a: a}; $(obj.a); } f(1); f(2);
  //
  // But it only works if all calls pass in the same object with the same
  // shape, which is a bit questionable. But there are tests :)

  let sawObjectValuePerArgIndex = params.map(() => undefined);
  let objectNodesPerArgIndex = params.map(() => []);
  let bailed = false; // This means spread/rest arg. We also need to check whether there's any valid param position at all.
  meta.reads.some((callRead, ri) => {
    const callNode = callRead.parentNode;
    const callArgs = callNode['arguments'];
    vlog('- Processing call', ri, 'which has', callArgs.length, 'args versus', params.length, 'params');

    // We only care about the actual params on the function being called. Excessive args are irrelevant here.
    params.some((param, pi) => {
      if (sawObjectValuePerArgIndex[pi] === false) {
        return;
      }

      if (!param.$p.paramVarDeclRef) {
        vlog('- bail: param is unused. Another rule should clean this up.');
        sawObjectValuePerArgIndex[pi] = false;
        return;
      }

      const anode = callArgs[pi];
      if (!anode) {
        // There were fewer call args, this will be undefined, so not an object arg.
        sawObjectValuePerArgIndex[pi] = false;
        vlog('- bail: param', pi, '; There was at least one call with fewer args than params');
        return;
      }

      if (anode?.type === 'Identifier') {
        // Check if previous line created the object.
        // TODO: do a more thorough search and/or use registry to see if the shape can be asserted
      }

      if (!(
        callRead.blockBody[callRead.blockIndex-1]?.type === 'VarStatement' &&
        callRead.blockBody[callRead.blockIndex-1].id.name === anode.name &&
        callRead.blockBody[callRead.blockIndex-1].init.type === 'ObjectExpression'
      )) {
        // We can improve this but for now we bail
        vlog('- bail: param', pi, ': Statement before the call was not a var being passed on');
        sawObjectValuePerArgIndex[pi] = false;
        return;
      }

      // This call passed on an object that was just created.
      const objNode = callRead.blockBody[callRead.blockIndex-1].init;
      ASSERT(objNode.type === 'ObjectExpression');

      if (objNode.properties.some(pnode => pnode.computed)) {
        vlog('- bail: Receives an object with at least one computed property');
        bailed = true;
        return true;
      }

      if (objNode.properties.some(pnode => pnode.method)) {
        vlog('- bail: Receives an object with at least one method property');
        bailed = true;
        return true;
      }

      if (objNode.properties.some(pnode => pnode.kind !== 'init')) {
        vlog('- bail: Receives an object with at least one getter/setter property (or whatever kind!=init?)');
        bailed = true;
        return true;
      }

      if (objNode.properties.some(pnode => pnode.key.type !== 'Identifier')) {
        vlog('- bail: Receives an object with at least one property with non-ident key (number?)');
        bailed = true;
        return true;
      }

      sawObjectValuePerArgIndex[pi] = true;
      vlog('- Adding objnode now... to', pi);
      objectNodesPerArgIndex[pi].push(objNode);
    });

    if (bailed) return true;
    if (params.every((_, i) => sawObjectValuePerArgIndex[i] === false)) {
      vlog('- bail: there was no param index that received an object in all calls');
      bailed = true;
      // No point checking other calls to the func when this one, at least, did not pass in an objlit
      return true;
    }
  });
  if (bailed) {
    return false;
  }

  vlog('There was at least one param that receives an object lit in all func calls!', sawObjectValuePerArgIndex);

  // There was at least one param that receives an object lit in all func calls. And none of them had a spread.
  // We must now match their shapes. Confirm all objects have exactly the same object names. We're going to
  // ignore order, even though that could very technically mess up too. It is what it is.
  // For every param index, check if it was all objlits in all calls, then check if same prop count, then
  // check if each next object has the same prop names as the first (by collecting them in a set).

  let changes = 0;
  let propsNames = undefined; // Set
  sawObjectValuePerArgIndex.forEach((state, pi) => {
    if (state !== true) return;
    ASSERT(objectNodesPerArgIndex[pi].length === meta.reads.length, 'should have an object node for each call if the state is true', objectNodesPerArgIndex[pi].length, meta.reads.length);

    // Compare all seen objlit nodes given to this param index
    if (!objectNodesPerArgIndex[pi].every((objNode, oi) => {
      vlog('- trying obj at param index', pi, 'of call', oi, '/', objectNodesPerArgIndex.length)
      if (!propsNames) {
        propsNames = new Set(objNode.properties.map(pnode => pnode.key.name));
        vlog('  - propsNames is now set to', propsNames);
        return true;
      } else {
        if (objNode.properties.length !== propsNames.size) {
          vlog('  - bail: param', pi, ': at least one object did not have as many properties as another');
          return false;
        }
        // We asserted above each property was regular so now just check their names
        const same = objNode.properties.every(pnode => propsNames.has(pnode.key.name));
        vlog('  - ok: param', pi, ': has same keys as first obj');
        return same;
      }
    })) {
      return;
    }

    // Should be a match...
    vlog('- Ok: param', pi, 'is used, should receive an objlit in all calls (', meta.reads.length, '), and they have the same property names in all calls, great!', propsNames);

    // Note: we do this to try and make reasoning about values easier. Objects are complicated.
    rule('When calling a non-escaping function with the same objlit means we can inline the obj a bit');
    example(
      'function f(o){ $(o.a, o.b); } f({a: 1, b: 2}); f({a: 3, b: 4});',
      'function f(a, b){ const o = {a:a, b:b}; $(o.a, o.b); } f(1, 2); f(3, 4);',
    );
    before(funcNode);

    // if one property then we can repurpose the param for that.
    // if no property, leave the dud param and that's it
    // otherwise we repurpose the old one and append the other ones

    const propsNamesArr = Array.from(propsNames);
    const propsNameLocalBindings = propsNamesArr.map(name => createFreshVar(name, fdata));
    const paramConstRef = funcNode.params[pi].$p.paramVarDeclRef;

    if (propsNamesArr.length > 0) {
      // Construct the object as the (new) first step of the function
      funcNode.body.body.splice(funcNode.$p.bodyOffset, 0,
        AST.varStatement(
          'const',
          paramConstRef.name,
          AST.objectExpression(
            propsNamesArr.map((name,i) => AST.property(name, propsNameLocalBindings[i]))
          )
        )
      );
      // Replace the original param
      funcNode.body.body[paramConstRef.blockIndex].id.name = propsNameLocalBindings[0];

      for (let i=1; i<propsNamesArr.length; ++i) {
        // Add the $$345 params into the function params (this wont assign them locally yet)
        funcNode.params.push(AST.param(`$$${funcNode.params.length}`, false));

        funcNode.body.body.unshift(
          // We need a better way of doing this...
          // Inject assignments of params to local vars with the actual name
          AST.varStatement('const', propsNameLocalBindings[i], AST.identifier(`$$${funcNode.params.length-1}`))
        );
      }
    } else {
      // Create the empty obj
      funcNode.body.body.splice(funcNode.$p.bodyOffset, 0,
        AST.varStatement('const', paramConstRef.name, AST.objectExpression())
      );
      // Replace the param assignment with an empty string
      funcNode.body.body[paramConstRef.blockIndex] = AST.emptyStatement();
    }

    after(funcNode);

    // Now go after the calls. Update the params in the same order
    // (replace the original arg with the prop value for that call, append the rest)

    meta.reads.forEach(read => {
      rule('When inling an object that is passeed in all calls to a function, call args are replaced too');
      example('const obj = {a: 1, b: 2}; f(obj);', 'f(1, 2);');
      before(read.blockBody[read.blockIndex-1]);
      before(read.blockBody[read.blockIndex]);

      // This works as long as we only check one index back...
      const objNode = read.blockBody[read.blockIndex-1].init;
      ASSERT(objNode.type === 'ObjectExpression');

      // First have to create a map of properties. Then we can just copy those nodes.
      const map = new Map; // Map<propname, Node>
      objNode.properties.forEach(pnode => map.set(pnode.key.name, pnode.value));

      const callNode = read.parentNode;
      ASSERT(callNode.type === 'CallExpression', 'call?', read.parentNode);

      callNode.arguments[pi] = propsNamesArr[0] ? AST.cloneSimple(map.get(propsNamesArr[0])) : AST.identifier('undefined');
      // Now append the remaining ones
      for (let i=1; i<propsNamesArr.length; ++i) {
        callNode.arguments.push(AST.cloneSimple(map.get(propsNamesArr[i])));
      }

      after(read.blockBody[read.blockIndex]);
    });

    changes += 1;
  });

  vlog('Finished')
  return changes;
}
