// This is a followup on objlit_prop where it tries to inline property and method usage, even when `this` is involved.
// Object has to be a constant and not escape. Any `this` usage in methods on the object must be traced thoroughly.
//
//      const f = function() { g() }; const obj = { f }; obj.f();
// ->
//      const f = function() { g() }; const obj = { f }; f();
//
//
//      const f = function() { g(obj.x) }; const obj = { f, s: 'x' }; obj.f();
// ->
//      const f = function() { g('x') }; const obj = { f, s: 'x' }; f();
//
//
//      const f = function() { g(this.x) }; const obj = { f, s: 'x' }; obj.f();
// ->
//      const f = function() { g('x') }; const obj = { f, s: 'x' }; f();
//
// Specifically targets functions and props on non-escaping objects that may use context.
// TODO: if the object escapes after the call then we could ignore that case? example: tests/cases/ifelse/this.md

import walk from '../../lib/walk.mjs';
import { ASSERT, log, group, groupEnd, vlog, vgroup, vgroupEnd, rule, example, before, source, after, fmat, tmat, findBodyOffset, todo, } from '../utils.mjs';
import * as AST from '../ast.mjs';
import { SYMBOL_DOTCALL } from '../symbols_preval.mjs';

export function objlitInlining(fdata) {
  group('\n\n\n[objlitInlining] Checking for object literals to inline');
  //currentState(fdata, 'objlitInlining'. true, fdata);
  const r = _objlitInlining(fdata);
  groupEnd();
  return r;
}
function _objlitInlining(fdata) {
  let queue = [];
  let updated = process(fdata, queue);

  log('');
  if (updated + queue.length) {
    queue.sort(({ pid: a }, { pid: b }) => (a < b ? 1 : a > b ? -1 : 0));

    log('Object literals inlined:', 1, '. Restarting from phase1 to fix up read/write registry');
    return {what: 'objlitInlining', changes: 1, next: 'phase1'};
  }
  log('Object literals inlined: 0.');
}

function process(fdata, queue) {
  let updated = 0;

  fdata.globallyUniqueNamingRegistry.forEach(function (meta, objName) {
    if (meta.isBuiltin) return;
    if (meta.isImplicitGlobal) return;
    if (!meta.isConstant) return;
    if (meta.writes.length !== 1) return;
    if (!meta.varDeclRef) return;
    if (meta.varDeclRef.node.type !== 'ObjectExpression') return;

    vgroup('- `' + objName + '` is a constant that is an object literal!');
    tryMeta(meta, objName, meta.writes[0]);
    vgroupEnd();
  });

  function tryMeta(objMeta, objName, write) {
    // - Confirm the objlit doesn't escape itself
    //   - Special care for $dotCall cases
    // - Confirm the objlit only has primitives and functions, no methods, getters/setters, spreads, or other stuffs
    // - Confirm that the functions are only assigned to this object literal
    //   - We can check if they are, otherwise, only called and not using `this`, I guess that's fine too
    // - Confirm that the functions do not use `this`
    //   - TODO: handle the `this` case too
    
    const objNode = objMeta.varDeclRef.node;

    let dotcalling = false;

    vgroup('Confirming whether it escapes');
    const escapes = objMeta.reads.some(read => {
      // - used as member, but not assigned to
      // - passed as context to dotcall

      if (
        read.parentNode.type === 'CallExpression' &&
        read.parentNode.callee.type === 'Identifier' &&
        read.parentNode.callee.name === SYMBOL_DOTCALL // $dotCall
      ) {
        // So something like `$dotCall(method, obj, prop, ...args)`
        // To proceed the read must be the second arg and the first arg must be the value of a or be the result of a property...
        ASSERT(read.parentProp === 'arguments', 'Since the callee was verified to be dotcall, I think the objlit can only appear in the arguments now');
        if (read.parentIndex !== 1) {
          // tests/cases/object_literal/inlining/dotcall_arg_0.md
          // `$dotCall(method, ctx, "prop", objlit)`
          vlog('- bail: At least one read was a child of $dotCall but not the second arg');
          return true;
        }

        // Now verify that the first arg is indeed the result of a property of the objlit
        if (read.parentNode.arguments[0]?.type !== 'Identifier') {
          vlog(`dotcall should have ident as first arg, right?`, read.parentNode.arguments[0]);
          return true;
        }

        const aliasName = read.parentNode.arguments[0].name;
        const aliasMeta = fdata.globallyUniqueNamingRegistry.get(aliasName);
        if (!aliasMeta.isConstant || aliasMeta.isBuiltin || aliasMeta.isImplicitGlobal || !aliasMeta.varDeclRef) {
          // tests/cases/normalize/optional/opt_prop_nonopt_prop_opt_call_pass_var.md
          vlog('- bail: At least one usage of the objlit was a dotcall where the first arg was not referring to a const');
          return true;
        }

        // Confirm that the const init was a property of our objlit ...

        if (aliasMeta.varDeclRef.node.type === 'FunctionExpression') {
          // This may be something like `const f = function(){}; const obj = {a: f}; $dotCall(f, a, "b");`
          // We have to confirm that the called function is the value of one of the properties of the objlit

          if (objNode.properties.every(prop => {
            return (
              prop.value.type !== 'Identifier' ||
              prop.value.name !== read.parentNode.arguments[0].name
            )
          })) {
            // tests/cases/object_literal/inlining/dotcall_arg0_func.md
            // tests/cases/object_literal/inlining/dotcall_arg0_no_funcs.md
            vlog('- bail: At least one usage of the objlit was in a $dotCall but the function called could not be verified to be an objlit value');
            return true;
          }
          // This is
          // `const f = function(){}; const obj = {a: f}; $dotCall(f, obj, "a");`
          // Where the function being dot called is verified to be a value in the objlit
        }
        else if (aliasMeta.varDeclRef.node.type === 'MemberExpression') {
          // This can be something like `const obj = {f: f}; const alias = obj.f; $dotCall(alias, obj, "f");`
          // We have to trace the alias back to a constant and confirm that is a property of the objlit

          if (
            aliasMeta.varDeclRef.node.computed ||
            aliasMeta.varDeclRef.node.object.type !== 'Identifier' ||
            aliasMeta.varDeclRef.node.object.name !== objName ||
            // Follow the trail and assert that the property is a method ...?
            // Orrrrrr just assert that it's a property and :shrug: ?
            // So arg in $dotCall(arg, ...) has a decl. The init of that decl, is that a obj.foo property?
            objNode.properties.every(prop => prop.key.name !== aliasMeta.varDeclRef.node.property.name)
          ) {
            // computed: tests/cases/object_literal/inlining/dotcall_alias_computed.md
            // not same obj: tests/cases/object_literal/inlining/dotcall_alias_not_same_obj.md
            // not sure how to proc the other cases here
            vlog('- bail: At least one usage of the objlit was a dotcall where the first arg was not an alias of a property of the object');
            vlog('-',
              aliasMeta.varDeclRef.node.computed,
              aliasMeta.varDeclRef.node.property?.type,
              aliasMeta.varDeclRef.node.property?.name,
              objName,
              read.parentProp.arguments?.[0].name,
              objNode.properties.map(prop => [prop.key.name, prop.value?.name])
            );
            return true;
          }

          // This is
          // `const obj = {f: g}; const method = obj.f; $(method, obj);`
          // Where the property (.f) is verified to be part of the objlit
        }
        else {
          // tests/cases/object_literal/inlining/dotcall_unknown_alias_obj.md
          vlog('- bail: At least one usage of the objlit was a dotcall where the first arg was not an expected part of the objlit');
          return true;
        }

        // ok, this is a $dotcall that we should be able to inline
        return;
      }

      if (read.parentNode.type !== 'MemberExpression') {
        // tests/cases/array/static_context/string_spied.md
        vlog('- bail: At least one read escapes, parent=', read.parentNode.type, read.parentNode.callee?.name);
        return true;
      }

      if (read.parentNode.computed) {
        // tests/cases/array/static_context/string_spied.md
        vlog('- bail: At least one property access was computed');
        return true;
      }

      if (read.grandNode.type === 'UnaryExpression' && read.grandProp === 'argument' && read.grandNode.operator === 'delete') {
        // tests/cases/object_literal/prop_write/mutation_in_closure_proof.md
        vlog('- bail: At least one "property lookup" was actually the argument to `delete`. Must keep this.', read.parentNode.property.name);
        return true;
      }

      if (read.grandNode.type === 'AssignmentExpression' && read.grandProp === 'left') {
        // tests/cases/normalize/binding/for-a/ident_member_simple_bin.md
        vlog('- bail: At least one property lookup was assigned to;', read.parentNode.property.name);
        return true;
      }

      // is ok?
    });
    vgroupEnd();
    if (escapes) return;

    /** @var {Map<string, Node>} */
    const map = new Map; // <propName, propNode>
    /** @var {Map<string, FunctionExpression>} */
    const keyToFunc = new Map; // <propName, funcNode>
    objNode.properties.forEach(propNode => {
      map.set(propNode.key.name, propNode);
    });

    let thissing = false;
    vgroup('Checking if any prop is gnarly (computed, method, non-prop, using `this`)');
    const gnarly = objNode.properties.some(propNode => {
      vlog('-prop', propNode.key.name, 'is a(n)', propNode.value.type);
      if (propNode.key.type !== 'Identifier') {
        // tests/cases/array/computed_property_obj_empty.md
        // We can probably support this but we'd have to support computed props too which I'm not too sure about
        vlog('- bail: Found prop ', propNode.key.type, ', is not an identifier');
        return true; // Move to next write
      }
      if (propNode.computed) {
        // /home/ptr/proj/preval/tests/cases/object_literal/inlining/with_computed.md
        vlog('- bail: Found prop "', propNode.key.name, '", is computed');
        return true; // Move to next write
      }
      if (propNode.method) {
        // tests/cases/normalize/object/spread_member_call.md
        vlog('- bail: Found prop"', propNode.key.name, '", is method');
        return true; // Move to next write
      }
      if (propNode.kind !== 'init') {
        // tests/cases/expr_order/member_expr_call_complex_arg_getter_proof.md
        vlog('- bail: Found prop"', propNode.key.name, '", is getter/setter');
        return true; // Move to next write
      }

      if (AST.isPrimitive(propNode.value)) {
        return false; // ok
      }
      if (propNode.value.type === 'Identifier') {
        // Confirm whether the ident maps to a constant function
        const propValueName = propNode.value.name;
        const propMeta = fdata.globallyUniqueNamingRegistry.get(propValueName);
        if (propMeta.isBuiltin) {
          // tests/cases/object_literal/inlining/with_ident_builtin.md
          // Is this important at all?
          vlog('- bail: prop value "', propValueName, '" for "',  propNode.key.name, '" is a built-in');
          return true;
        }
        if (propMeta.isImplicitGlobal) {
          // tests/cases/object_literal/inlining/with_ident_global.md
          vlog('- bail: prop value "', propValueName, '" for "',  propNode.key.name, '" is an implicit global');
          return true;
        }
        if (!propMeta.isConstant) {
          // tests/cases/function_trampoline/call_only/call_member_prop_closure.md
          vlog('- bail: prop value "', propValueName, '" for "',  propNode.key.name, '" is not a constant');
          return true;
        }
        if (propMeta.writes.length !== 1) {
          TODO // Not sure what migh cause this
          vlog('- bail: prop value "', propValueName, '" for "',  propNode.key.name, '" has more than one write');
          return true;
        }
        if (!propMeta.varDeclRef) {
          // tests/cases/object_literal/inlining/with_ident_exportvar.md
          // tests/cases/object_literal/inlining/with_ident_catchvar.md
          TODO // catch? import? (both considered implicit globals at the time of writing)
          vlog('- bail: prop value "', propValueName, '" for "',  propNode.key.name, '" has no varDeclRef');
          return true;
        }
        const funcNode = propMeta.varDeclRef.node;
        vlog('  - The ident refers to a', funcNode.type);
        if (funcNode.type !== 'FunctionExpression') {
          // tests/cases/object_literal/inlining/with_ident_non_func2.md
          // Note: we could support some other things too, like regular expressions, arrays, and nested objects ...
          vlog('- bail: prop value "', propValueName, '" for "',  propNode.key.name, '" is not a function;', funcNode.type);
          return true;
        }
        // blockChain is the path of block scopes. If one is subset/eq of another then one can access the scope of the other.
        if (!(propMeta.varDeclRef.node.$p.blockChain <= objNode.$p.blockChain)) {
          TODO // Not sure if this is even possible or how to proc this case
          vlog('- bail: prop value "', propValueName, '" for "',  propNode.key.name, '" is a function node but it can not reach object to which it is a method');
          return true;
        }

        // Note that we don't care about the function reference because we're not changing the function shape here and it is a constant.

        if (funcNode.$p.thisAccess) {
          // tests/cases/ifelse/this.md
          vlog('  - Function accesses `this`', propNode.key.name, propValueName);
          // This requires a bunch of further validation
          thissing = true;
        }

        // Looks like we approve of this function, for now?
        keyToFunc.set(propNode.key.name, funcNode);

        return false;
      }

      vlog('- bail: prop value for "',  propNode.key.name, '" is an unexpected and/or unsupported value');
      return false;
    });
    vgroupEnd();
    if (gnarly) return;

    if (thissing) {
      // At least one method uses the `this` keyword. This complicates things but there are some cases we can still do.
      // First we need to validate whether the code conforms to the subset of cases we can support here.
      // - confirm that the `this` objects are indeed aliased (in the header), if not we can skip that func
      // - trace the alias
      //   - it cannot escape (member expression only, not computed, not assigned to)
      //   - can only access properties defined on the objlit
      //   - we must prove that the func always gets called with the objlit as context. all bets are off when this doesnt hold.
      //     - when a property gets aliased that is a function we must trace that alias to confirm it's $dotCall, otherwise we may not be able to assert this context requirement holds
      //     - likewise we must assert the original function decl holds to the same constraint

      let foundThis = false;
      let thisFail = false;
      objNode.properties.some(propNode => {
        if (propNode.value.type === 'Identifier') {
          // Confirm whether the ident maps to a constant function
          const propValueName = propNode.value.name;
          const propMeta = fdata.globallyUniqueNamingRegistry.get(propValueName);
          if (propMeta.varDeclRef.node.type === 'FunctionExpression') {
            const funcNode = propMeta.varDeclRef.node;
            if (funcNode.$p.thisAccess) {
              let thisAliasName;
              for (let i=0; i<funcNode.body.body.length; ++i) {
                const stmt = funcNode.body.body[i];
                if (!stmt) {
                  return;
                }
                if (stmt.type === 'DebuggerStatement') {
                  funcNode.$p.thisAccess = false;
                  return;
                }
                if (stmt.type !== 'VarStatement') {
                  continue;
                }
                if (stmt.init.type === 'ThisExpression') {
                  thisAliasName = stmt.id.name;
                  foundThis = true;
                  break;
                }
              }
              if (!thisAliasName) {
                TODO // Not sure this should be possible
                vlog('Apparently `this` is actually not used in the func at all, even better');
                return;
              }

              // Now verify this alias
              // - does not escape
              // - only used as member expressions
              // - is not arg to delete or lhs of an assignment
              // - only accesses properties explicitly defined on the objlit (-> map)
              // - if the property is a method and the method uses `this` the ref must be traced to assert it is always called with the objlit as context

              const thisAliasMeta = fdata.globallyUniqueNamingRegistry.get(thisAliasName);
              ASSERT(thisAliasMeta.isConstant, 'the This aliases should be constants regardless, right?');
              ASSERT(thisAliasMeta.writes.length, 'the This aliases should ahve one write');
              thisFail = thisAliasMeta.reads.some(thisRead => {
                if (thisRead.parentNode.type !== 'MemberExpression') {
                  // tests/cases/ifelse/this.md
                  vlog('bail: Found a `this` that was not used in a member expression;', thisAliasName, thisRead.parentNode.type);
                  return true;
                }
                if (thisRead.parentNode.computed) {
                  // tests/cases/object_literal/inlining/this_computed.md
                  vlog('bail: Found a `this` occurrence with a computed property;', thisAliasName);
                  return true;
                }
                const propObjLitValueNode = map.get(thisRead.parentNode.property.name);
                if (!propObjLitValueNode) {
                  // tests/cases/object_literal/inlining/this_unknown_prop.md
                  vlog('bail: Found a `this` occurrence with a property that was not found on the objlit;', thisAliasName, thisRead.parentNode.property.name);
                  return true;
                }

                if (
                  propObjLitValueNode.value.type === 'Identifier' &&
                  fdata.globallyUniqueNamingRegistry.get(propObjLitValueNode.value.name)?.varDeclRef?.node.type === 'FunctionExpression'
                ) {
                  // Confirm the function doesn't escape. Start with just allowing calls.
                  if (thisRead.grandNode.type !== 'CallExpression') {
                    // tests/cases/object_literal/inlining/this_method_escaping_bad.md
                    vlog('bail: Found a `this` reference with a func property but it was not the callee of a call:', thisAliasName, thisRead.parentNode.property.name, thisRead.grandNode.type);
                    return true;
                  }
                  ASSERT(thisRead.grandProp === 'callee', 'in normalized code a member expression can only appear as the callee of a call');
                }

                if (thisRead.grandNode.type === 'UnaryExpression' && thisRead.grandProp === 'argument' && thisRead.grandNode.operator === 'delete') {
                  // tests/cases/object_literal/inlining/this_deletes.md
                  vlog('- bail: Found a `this` reference with that was the arg of `delete`:', thisAliasName, thisRead.parentNode.property.name, thisRead.grandNode.type);
                  return true;
                }

                if (thisRead.grandNode.type === 'AssignmentExpression' && thisRead.grandProp === 'left') {
                  // tests/cases/object_literal/inlining/this_assign.md
                  vlog('- bail: Found a `this` reference with that was the lhs of an assignment:', thisAliasName, thisRead.parentNode.property.name, thisRead.grandNode.type);
                  return true;
                }

                vlog('- The method "', thisRead.parentNode.property.name, '" references `this` but only with known properties and method calls do not escape so that is ok?');
              });
              if (thisFail) return true;
            }
          }
        }
      });
      if (thisFail) return;

      vlog('There was a hint of `this` usage, did we find one?', foundThis, ', even if so, we have verified that all usages can be inlined');
    }

    vlog('So far so good; obj does not escape and has no gnarly props and if `this` is used (', thissing, ') then we know they can be inlined:', Array.from(map.keys()));

    // If the object is only used as member expressions and all the accesses can be traced then
    // it doesn't really need to exist. We can tear down the object and replace all references
    // to the properties by their local values. Sort of.
    // The caveat is when a method is called from a place that has no access to the decl itself.
    // That's no problem in itself because we don't allow the array to escape, however, it will
    // be a concern when we include `this` checks. Not sure how that's gonna work.

    const missing = objMeta.reads.some(read => {
      if (read.parentNode.type === 'MemberExpression' && !read.parentNode.computed && !map.has(read.parentNode.property.name)) {
        // tests/cases/object_literal/inlining/this_valueof.md
        // This avoids the `obj.valueOf().x = 5` kind of traps (or getPrototype or ...)
        vlog('- bail: at least one read accessed a property that is not defined on the objlit (', read.parentNode.property.name, ')');
        return true;
      }
      // Anything else left to validate for $dotCall?
    });
    if (missing) return;

    vlog('Good to go to eliminate "', objName,'". First eliminating all `this` cases. Then eliminating object property accesses');

    if (thissing) {
      // I think we must first eliminate `this` from all methods. If we can't then `this` must escape and we have to bail.
      // But we've already asserted that we can see all `this` objects and that they're only accessing known props...

      // For each method that contained `this`, determine whether they can reach the objlit decl.
      // Only if they can all do so, can we eliminate the thisses.
      // We have already confirmed that all `this` references can be eliminated and so that's what we'll do here.

      for (const [key, propNode] of map.entries()) {
        if (propNode.value.type === 'Identifier') {
          const funcNode = keyToFunc.get(propNode.key.name);
          vlog('- Replacing occurrences of `this` in property "', propNode.key.name, '", refers to "', propNode.key.name, '", which should be a func:', funcNode?.type);
          ASSERT(funcNode);

          let thisAliasName = ''; // There is at most one decl.
          let stop = false;
          walk(walkFunc, funcNode, 'body');
          function walkFunc(node, beforeWalk, nodeType, path) {
            if (stop) return true;
            if (!beforeWalk) return;

            const parentNode = path.nodes[path.nodes.length - 2];
            const parentProp = path.props[path.props.length - 1];
            const parentIndex = path.indexes[path.indexes.length - 1];

            if (!thisAliasName) {
              // First scan header for the name...
              if (nodeType === 'ThisExpression') {
                thisAliasName = parentNode.id.name;
                return;
              }
              if (nodeType === 'DebuggerStatement') {
                // This function has no `this` alias.
                stop = true;
                return;
              }
              return; // Don't care about anything else.
            }

            if (nodeType === 'FunctionExpression' && node !== funcNode) return true; // Do not visit nested funcs
            if (nodeType !== 'Identifier' || node.name !== thisAliasName) return; // Scan for the local `this` alias

            const grandNode = path.nodes[path.nodes.length - 3];
            const grandProp = path.props[path.props.length - 2];
            const grandIndex = path.indexes[path.indexes.length - 2];

            ASSERT(parentNode.type === 'MemberExpression');
            ASSERT(!parentNode.computed);

            const otherPropNode = map.get(parentNode.property.name);
            ASSERT(otherPropNode);

            if (AST.isPrimitive(otherPropNode.value)) {
              rule('When inlining objects, when `this` is a primitive property ref, inline the primitive directly');
              example('const obj = {x: 1}; f(obj.x);', 'const obj = {x: 1}; f(1)');
              before(grandIndex ? grandNode[grandProp] : grandNode[grandProp][grandIndex]);

              const newNode = AST.primitive(AST.getPrimitiveValue(otherPropNode.value));
              if (grandIndex < 0) grandNode[grandProp] = newNode;
              else grandNode[grandProp][grandIndex] = newNode;

              after(grandIndex < 0 ? grandNode[grandProp] : grandNode[grandProp][grandIndex]);
            }
            else if (otherPropNode.value.type === 'Identifier') {
              // Occurrence of `this.foo` or `thisAlias.foo`, replace it with the name of the value assigned to .foo
              ASSERT(parentNode.type === 'MemberExpression' && !parentNode.computed, 'should have asserted this');

              const targetFuncName = otherPropNode.value.name;

              rule('When inlining objects, when `this` is a function, refer to the func decl name instead');
              example('const obj = {x: foo}; obj.foo(a, b, c);', 'const obj = {x: foo}; foo(a, b, c)');
              before(grandIndex < 0 ? grandNode[grandProp] : grandNode[grandProp][grandIndex]);

              const newNode = AST.identifier(otherPropNode.value.name);
              if (grandIndex < 0) grandNode[grandProp] = newNode;
              else grandNode[grandProp][grandIndex] = newNode;

              after(newNode);
            }
            else {
              ASSERT(false, 'we checked before that all values were idents or primitives', otherPropNode.value.type);
            }
          }
        }
      }
    }

    objMeta.reads.forEach(read => {
      if (read.parentNode.type === 'MemberExpression' && !read.parentNode.computed) {
        const propNode = map.get(read.parentNode.property.name);
        if (!propNode) {
          // Can be an inherited property. Room for improvement...
          vlog('- bail: unable to inline a ref to the "', read.parentNode.property.name, " property because the objlit does not have it");
          return;
        }
        if (AST.isPrimitive(propNode.value)) {
          rule('When a primitive property is read from a safe objlit we can inline the value');
          example('const obj = {a: 1}; f(obj.a);', 'const obj = {a: 1}; f(1);'); // This example is superseded in most cases but ok
          before(read.blockBody[read.blockIndex]);

          const value = AST.getPrimitiveValue(propNode.value);
          if (read.grandIndex < 0) read.grandNode[read.grandProp] = AST.primitive(value);
          else read.grandNode[read.grandProp][read.grandIndex] = AST.primitive(value);

          after(read.blockBody[read.blockIndex]);
          ++updated;
          return;
        }

        if (propNode.value.type === 'Identifier') {
          const propMeta = fdata.globallyUniqueNamingRegistry.get(propNode.value.name);
          // This must be a function, right...
          ASSERT(propMeta.varDeclRef?.node.type === 'FunctionExpression', 'should currently only pass objlit prop ident values that refer to constant functions. update logic ifwhen that changes');

          // If one of these methods referred to `this` then we will have eliminated that in the previous step.
          // So we should be able to safely replace the method call with a direct (contextless) call.

          rule('When a function property is read from a safe objlit, we can replace it with the ref ident');
          example('const obj = {a: foo}; obj.a(1);', 'const obj = {a: foo}; foo(1);');
          before(read.blockBody[read.blockIndex]);

          const newNode = AST.identifier(propNode.value.name);
          if (read.grandIndex < 0) read.grandNode[read.grandProp] = newNode;
          else read.grandNode[read.grandProp][read.grandIndex] = newNode;

          after(read.blockBody[read.blockIndex]);
          ++updated;

          return;
        }

        vlog('- bail: unable to inline a ref to the "', read.parentNode.property.name, " property because value is unsupported", propNode.value.type);
        return;
      }
      else {
        if (read.parentNode.type === 'CallExpression' && read.parentNode.callee.type === 'Identifier' && read.parentNode.callee.name === SYMBOL_DOTCALL) {
          // Two forms:
          // - `const f = function(){}; const objlit = {f}; const x = objlit.f; $dotCall(x, objlit, "f", rest)`
          // - `const f = function(){}; const objlit = {f}; $dotCall(x, objlit, "f", rest)`
          // At this point we have verified that the objlit is not mutated and so it's not
          // relevant to know if values "may spy" between reading the method and calling
          // $dotCall on it. So we can just find the const ref and assume it calls that.

          // Replace the $dotCall with a regular call to the function that was assigned to that property
          const funcRefName = read.parentNode.arguments[0].name;
          const funcRefMeta = fdata.globallyUniqueNamingRegistry.get(funcRefName);

          // Either the ref is an actual function expression or a member expression

          if (funcRefMeta.varDeclRef.node.type === 'FunctionExpression') {
            // tests/cases/object_literal/inlining/dotcall_final_func.md

            // Simple inline. Note: if the function was referencing `this`, it should not be doing that anymore at this point. (This transform is all or nothing)
            rule('When dotcall is used on a func ref directly and the funcref is value of a prop of an objlit that we are outlining, replace the dotcall with a direct call');
            example(
              'const f = function(){}; const objlit = {f: f}; $dotCall(f, objlit, "f", rest)',
              'const f = function(){}; const objlit = {f: f}; f(rest)'
            );
            before(read.blockBody[read.blockIndex]);

            read.parentNode.callee = read.parentNode.arguments.shift(); // the func ref node
            read.parentNode.arguments.shift(); // context
            read.parentNode.arguments.shift(); // propname

            after(read.blockBody[read.blockIndex]);
            ++updated;
            return;
          }
          else if (funcRefMeta.varDeclRef.node.type === 'MemberExpression') {
            // tests/cases/object_literal/inlining/dotcall_final_mem.md

            // The func ref should be a const with init of `objlit.f`. We have already verified
            // that this `f` is a property on the objlit. We now need to get the const name of
            // the func node that is the value of that property.

            // First step to the alias decl, then to the prop node, then to the func decl.
            ASSERT(funcRefMeta.varDeclRef.node.object?.name === objName, 'should have been verified', funcRefMeta.varDeclRef.node.object?.name, objName);
            const reffedPropName = funcRefMeta.varDeclRef.node.property.name;
            const propNode = map.get(reffedPropName);
            ASSERT(propNode, 'prop name should have been verified to exist', reffedPropName);
            ASSERT(propNode.value.type === 'Identifier', 'I think we verified this too?'); // Did we? Can't the prop be a primitive? But then we'd have to abort the whole thing...
            const propValueFuncName = propNode.value.name;
            // Now the value may not be a func but that's a later problem (but not for Preval)
            const valueMeta = fdata.globallyUniqueNamingRegistry.get(propValueFuncName);
            ASSERT(valueMeta, 'and this should exist too', propValueFuncName);

            // Indirect reference. We first have to jump past the obj prop aliasing step. We should have verified that the prop was a function.
            // Note: if that function was referencing `this`, it should not be doing that anymore at this point. (This transform is all or nothing)
            rule('When dotcall is used on an alias of an objlit prop that we are outlining, replace the dotcall with a direct call to the aliased func value');
            example(
              'const f = function(){}; const objlit = {f: f}; const alias = objlit.f; $dotCall(alias, objlit, "f", rest)',
              'const f = function(){}; const objlit = {f: f}; const alias = objlit.f; f(rest)'
            );
            before(read.blockBody[read.blockIndex]);

            read.parentNode.callee = AST.identifier(propValueFuncName);
            read.parentNode.arguments.shift(); // the alias ref node
            read.parentNode.arguments.shift(); // the objit ref node
            read.parentNode.arguments.shift(); // propname

            after(read.blockBody[read.blockIndex]);
            ++updated;
            return;
          }
          else {
            ASSERT(false, 'Unexpected dotcall case fixme?', funcRefName, funcRefMeta.varDeclRef.node.type);
          }
          ASSERT(false, 'unreachable');
        }
      }
    });
  }

  return updated;
}
