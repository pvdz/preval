// Find a very specific but elaborate obfuscation case that uses prototype and es5 constructors as a herring
// and then calls a few dud functions with various ways of indirection to try and shake the tail (-> us).
//
//             const A = function($$0) {
//               const tmpPrevalAliasThis = this;
//               const callback = $$0;
//               debugger;
//               tmpPrevalAliasThis.expando = callback;              // This prop is referenced later
//                                                                   // (multiple `this` props are set like that in various ways)
//               return undefined;
//             };
//             const f = function() {
//               const thisAlias = this;                             // instance of A
//               debugger;
//               const x = thisAlias.OWukZh;                         // read more proto/this props on A instance and do stuff
//               const y = thisAlias.vEXLvr;                         // (these props are explicitly set in the constructor or on its proto)
//               const z = x + y;
//               // etc. then calls into another function, sometimes passing in a method from the instance as arg, for indirect calls
//               const a = thisAlias.a;
//               const b = thisAlias.b;
//               const red = $dotCall(a, thisAlias, `a`, b);         // A as context again, might do b.call(a) etc
//               return ret;
//             };
//             const proto = A.prototype;
//             proto.a = ref;
//             const proto2 = A.prototype;
//             proto.b = ref2;
//             // (multiple prototype props set this way)
//             const inst = new A(f);
//             const tmp = inst.expando;                             // this is `f`
//             $dotCall(tmp, inst, `expando`);                       // Note: calls `f`, instance of `A` passed on as context
// ->
//
// It's essentially juggling a data object around in an obscure way.
// Because it's setting properties in a less predictable way we can't necessarily predict the concrete values in some cases.
// - The function is called once as a constructor (`new`)
// - The function has some prototype properties set, in our target the values are all global funcs
// - Prototype update happens conditional, but in the same condition as the only call to the constructor
//   - I think this can prove to us that either it's unused or it's always set, and not observable either if we set it on the global level

import { GLOBAL_BLOCKCHAIN } from '../bindings.mjs';

import { ASSERT, log, group, groupEnd, vlog, vgroup, vgroupEnd, fmat, tmat, rule, example, before, source, after, findBodyOffset, todo, riskyRule, currentState, } from '../utils.mjs';
import * as AST from '../ast.mjs';
import { SYMBOL_DOTCALL } from '../symbols_preval.mjs';

export function lockThis(fdata) {
  group('\n\n\n[lockThis] Finding specific lock using a lot of context\n');
  //currentState(fdata, 'lockThis', true, fdata);
  const r = _lockThis(fdata);
  groupEnd();
  return r;
}
function _lockThis(fdata) {
  let changed = 0;

  fdata.globallyUniqueNamingRegistry.forEach((mainMeta, funcName) => {
    if (!mainMeta.isConstant) return;
    if (mainMeta.writes.length !== 1) return;
    if (mainMeta.reads.length < 2) return; // Can probably up this. Our pattern reads a few properties, but at least one
    if (mainMeta.varDeclRef?.node.type !== 'FunctionExpression') return;

    const funcNode = mainMeta.varDeclRef.node;

    // Verify that all reads are reading .prototype and one of them is a `new` expression. All of them in the same block, too.
    let sameBodyCheck;
    const readsOk = mainMeta.reads.every(read => {
      if (sameBodyCheck && sameBodyCheck !== read.blockBody) return false; // Must be same block
      else if (!sameBodyCheck) sameBodyCheck = read.blockBody; // first read

      if (read.parentNode.type === 'MemberExpression') {
        if (read.parentProp !== 'object') return false;
        if (read.parentNode.computed) return false;
        if (read.parentNode.property.name !== 'prototype') return false;
        if (read.grandNode.type !== 'VarStatement') return false;
        // Ok this is reading `func.prototype`
        return true;
      }
      else if (read.parentNode.type === 'NewExpression') {
        if (read.parentProp !== 'callee') return false;
        // All we currently care about is `new func(..)` in some way
        return true;
      }
      else {
        // This is not our pattern right now.
        return false;
      }
    });
    if (!readsOk) return;

    vlog('- ok. Have a candidate:', [funcName]);

    if (funcNode.$p.readsArgumentsAny) return vlog('- bail: function uses arguments; our target does not');
    if (funcNode.params.length !== 1) return vlog('- bail: function does not have exactly one parameter', funcNode.params.length);

    // Now the fun starts. We need to verify a few things and then follow the rabbit hole
    // - all prototype assigns must be global funcs or predictable
    // - all this prop assigns must be global funcs or predictable
    // - for now: prop names must not collide with func/obj prototype
    // - must then dotcall one of these new properties with instance as context
    // - rabbit hole:
    //   - function being called will read some properties on the context (which is the instance)
    //   - never write to this.*
    //   - end with calling another method
    //   - function may have `if` or loop
    //   - one property will be an array that itself does get mutated, but not the property value
    //   - everything should be traceable, assuming the property keys are unique and the above holds
    //   - target in the wild had three levels of calls but not sure how fixed that is, shouldn't matter(?)
    // - when we verify all of this we can inline the values, I think, because
    //   - the instance is dropped
    //   - the values are global/predictable
    //   - the values are guaranteed to be set before the every root call to the rabbit hole
    // - search must be exhaustive

    const refsToDrop = [];
    const protoMap = new Map; // <propName, name> :  this[propName] === name
    let newArgs; // args of the new call
    const protoOk = mainMeta.reads.every(read => {
      if (read.parentNode.type === 'MemberExpression') {
        // Track how the prototype is used. It should have one usage; lhs of a prop write.
        const lhsObjName = read.grandNode.id.name;
        refsToDrop.push(read);
        const pmeta = fdata.globallyUniqueNamingRegistry.get(lhsObjName);
        // We expect a tight `const tmp = A.prototype; tmp.xyz = rhs` pattern.
        // The tmp is not reused for multiple writes, though we can support that too.
        if (pmeta.writes.length !== 1) return vlog('- bail: prototype alias is written to more than once');
        if (pmeta.reads.length !== 1) return vlog('- bail: prototype alias is read more than once');
        // Ok, now given a read to `proto`, confirm `proto.foo = bar`
        if (pmeta.reads[0].parentNode.type !== 'MemberExpression') return vlog('- bail: proto read is not prop read');
        if (pmeta.reads[0].computed) return vlog('- bail: proto read is computed prop');
        if (pmeta.reads[0].parentProp !== 'object') return vlog('- bail: proto prop read is computed prop value? eew.');
        if (pmeta.reads[0].grandNode.type !== 'AssignmentExpression') return vlog('- bail: proto prop read is not assignment');
        if (pmeta.reads[0].grandProp !== 'left') return vlog('- bail: proto prop read is not lhs of assignment');
        refsToDrop.push(pmeta.reads[0]);
        const protoPropName = pmeta.reads[0].parentNode.property.name;
        vlog('- assigning to proto prop:', protoPropName);
        // Ok, now verify the rhs to be a global func
        const rhs = pmeta.reads[0].grandNode.right;
        if (rhs.type !== 'Identifier') return todo('lockThis is not assigning an ident to the proto prop');
        const rmeta = fdata.globallyUniqueNamingRegistry.get(rhs.name);
        if (!rmeta?.isConstant) return todo('lockThis is assigning something that is not a const func');
        if (rmeta.varDeclRef?.node.type !== 'FunctionExpression') {
          todo('lockThis is assigning something that is not a func');
          return vlog('- bail: assigned ident is not a function;', [rhs.name], rmeta.varDeclRef?.node.type);
        }
        if (rmeta.varDeclRef.node.$p.blockChain !== GLOBAL_BLOCKCHAIN) {
          todo('lockThis is assigning a function that is not global');
          return vlog('- bail: assigned function is not global;', [rhs.name], [rmeta.varDeclRef.node.$p.blockChain]);
        }
        // TODO: confirm the property is not overwriting a builtin?
        vlog('- Recording prototype.', protoPropName, '=', rhs.name);
        protoMap.set(protoPropName, rhs.name);

        // Ok this is writing a global function ref to a property on `func.prototype`
        return true;
      }
      else if (read.parentNode.type === 'NewExpression') {
        // There should be one call. It may pass in an argument. We'll circle back to this later.
        newArgs = read.parentNode.arguments;
        if (newArgs.length !== 1) return vlog('- bail: the new expression does not have exactly one argument', newArgs.length);
        return true;
      }
      else {
        ASSERT(false, 'unreachable; previous reads loop has already confirmed how these reads are used...');
      }
    });
    if (!protoOk) return;

    vlog('- ok. Prototype property writes verified to be global funcs. Next: check the constructor');

    // All reads of the prototype of this function are writing a property that is a ref ot a global function.
    // Now dig into the `new` expression and check whet the constructor is doing.
    // We are basically expecting a bunch of property writes to `this`
    // All writes should reference a global or some kind of predictable value (including array literal and params...)
    const thisMap = new Map; // for every assignment to a `this` property, record prop name and init node
    const locals = new Map; // <name, init>
    let thisAliasName;
    const constructorOk = funcNode.body.body.every(stmt => {
      if (stmt.type === 'DebuggerStatement') return true;
      if (stmt.type === 'EmptyStatement') return true;
      if (stmt.type === 'VarStatement') {
        if (stmt.init.type === 'ThisExpression') {
          thisAliasName = stmt.id.name;
          return true;
        }
        else if (stmt.init.type === 'Param' || stmt.init.type === 'ArrayExpression') {
          locals.set(stmt.id.name, stmt.init);
          return true;
        }
        else if (stmt.init.type === 'Identifier') {
          return vlog('- bail: unable to validate ident matches known or expected pattern;', stmt.init.name);
        }
        else {
          // There are some other feasible cases but we target a pattern right now
          todo(`lockThis constructor has local var with ${stmt.init.type} which is not this, param, or array`);
          return vlog('- bail: local binding has unexpected init:', stmt.init.type);
        }
      }
      if (stmt.type === 'ExpressionStatement' && stmt.expression.type === 'AssignmentExpression') {
        const lhs = stmt.expression.left;
        let rhs = stmt.expression.right; // replaced with another node, potentially
        if (lhs.type === 'MemberExpression') {
          if (lhs.object.type !== 'Identifier') return vlog('- bail: assignment to non-this-alias prop is not part of our pattern');
          if (lhs.computed) return vlog('- bail: assignment to computed prop here is not part of our pattern');
          if (lhs.object.name !== thisAliasName) return vlog('- bail: assignment to non-this-alias prop is not part of our pattern');
          // The rhs must be something predictable. We've seen a few different things to support. Can't quickly cheese this.
          if (AST.isPrimitive(rhs)) {}
          else if (rhs.type === 'Identifier') {
            if (locals.has(rhs.name)) {
              const real = locals.get(rhs.name);
              vlog('- Ident', rhs.name, 'is a local var:', real.type, real.name);
              if (real.type === 'Param') {
                vlog('  - Setting a param to proto;', rhs.name, 'is param', real.index);
                // We should be able to find that reference in newArgs
                vlog('  - This should be newArgs[n]:', newArgs[real.index]?.type, newArgs[real.index]?.name);
                ASSERT(newArgs[real.index], 'we checked above that there was exactly one param and that it was passed on. the pattern assigns just that param so we should get it here.', newArgs);
                rhs = newArgs[real.index];
              } else if (real.type === 'ArrayExpression') {
                vlog('  - initialized to an array');
                rhs = real; // I think this array is going to consist of primitives and that we should clone it, but tbd
              } else {
                ASSERT(false, 'this is gated so we should have all types here', real);
              }
            } else {
              // must confirm this to be a global const ...
              const gmeta = fdata.globallyUniqueNamingRegistry.get(rhs.name);
              if (gmeta.isBuiltin) {
                // meh. i'll allow this.
              }
              else if (
                gmeta.isConstant &&
                gmeta.writes.length === 1 &&
                gmeta.writes[0].blockChain === GLOBAL_BLOCKCHAIN && // "global"
                gmeta.varDeclRef?.node.type === 'FunctionExpression' // relevant?
              ) {
                // ok
              } else {
                return vlog('- assigning a ref that is neither an approved local and not a global;', rhs.name);
              }
            }
          }
          else {
            return vlog('- bail: assigning neither a primitive nor an ident. not sure what this even is;', rhs.type);
          }

          vlog('- recording prototype.', lhs.property.name, 'as a', rhs.type, rhs.name);
          thisMap.set(lhs.property.name, rhs);
          return true;
        }
      }
      if (stmt.type === 'ReturnStatement') {
        // should return undefined, not override...
        if (stmt.argument.name !== 'undefined') {
          todo('lockThis constructor is not returning undefined', [stmt.argument.type, stmt.argument.name]);
          return vlog('- bail: return value seems to be overridden');
        }
        return true;
      }

      return vlog('- bail: has statement not expected in pattern:', stmt.type);
    });
    if (!constructorOk) return vlog('- bail: constructor verification failed');

    vlog('- ok, constructor checked. matches pattern. now following the rabbit hole');

    // So after the `new` there should be a method call on the returned instance.
    // This is a two step back-to-back process due to how $dotcall works.
    // We should have the property in the thisMap and it will most likely resolve to the
    // same function as was passed into the new call.

    const newRead = mainMeta.reads.find(read => read.parentNode.type === 'NewExpression');
    ASSERT(newRead, 'asserted to have this');

    const instancePropStuff = []; // [stmt, propName, resolvesTo] []

    // This ought to be followed by two statements that form a dotcall on the return
    const body = newRead.blockBody;
    const index = newRead.blockIndex;
    if (body[index].type !== 'VarStatement') return vlog('- bail: new call was not init of a var statement');
    const instName = body[index].id.name;
    if (body[index+1]?.type !== 'VarStatement') return vlog('- bail: statement after new call should be a var');
    if (body[index+1].init.type !== 'MemberExpression') return vlog('- bail: init of statement after new call should look up a prop on instance');
    if (body[index+1].init.object.type !== 'Identifier') return vlog('- bail: obj of init after new call is not the instance');
    if (body[index+1].init.object.name !== instName) return vlog('- bail: obj of init after new call is not the instance name');
    if (body[index+1].init.computed) return vlog('- bail: prop after new call is computed');
    const prop = body[index+1].init.property.name;
    const initialTargetFuncName = protoMap.get(prop);
    vlog('- it looked up prop', [prop], 'and that protoMap resolved to', [initialTargetFuncName]);
    // Can we actually assert this? or just todo() it?
    ASSERT(initialTargetFuncName, 'if we got this far then the property ought to find the function expression argument...');
    // Cover the instance prop read of the first method call
    instancePropStuff.push([body[index+1], prop, AST.identifier(initialTargetFuncName)]);

    // Verify this function call
    // - `this` (alias) should only have props read from
    //   - it should not escape except in the final method call
    //   - it should not pass it on as call args
    //   - it should not assign it to a var etc
    // - it should only read known props? not sure how relevant
    // - walk the whole function. repeat any method calls with this function. ignore anything that does not use context
    // - probably one method call will pass in another function, which is then called as param inside that func

    const visited = new Set(); // Prevent pingponging indefinitely
    const jumpNodes = [];
    const jumpFuncQueue = [initialTargetFuncName]; // One call may queue many new calls. Usually just zeror or one, though.

    while (jumpFuncQueue.length > 0) {
      const targetFuncName = jumpFuncQueue.shift();
      vgroup('- Processing next "jump" function:', [targetFuncName]);

      if (visited.has(targetFuncName)) {
        vlog('- skipping already visited function');
        vgroupEnd();
        continue;
      }
      visited.add(targetFuncName);

      const fmeta = fdata.globallyUniqueNamingRegistry.get(targetFuncName);
      ASSERT(fmeta);

      const cnode = fmeta.varDeclRef.node;
      ASSERT(cnode);
      jumpNodes.push(cnode);

      let thisAliasName2; // If there's no alias that's also cool :D
      let bailed = false;

      // Check an expression for usages of `this` for var init, assignments, and expr stmts
      function thisInJumpFunctionExpr(expr, stmt) {
        if (expr.type === 'Identifier') {
          // ok?
          return true;
        }
        else if (expr.type === 'ThisExpression') {
          return false;
        }
        else if (expr.type === 'MemberExpression') {
          // It's fine to read a prop from this.
          // It can't be writing a prop because that would be an assignment expression
          // It can't delete a prop because that's a unary expression
          if (expr.computed && expr.property.type === 'Identifier' && expr.property.name === thisAliasName2) {
            return vlog('- bail: `this` alias used as dynamic property value');
          }
          if (expr.object.type === 'Identifier' && expr.object.name === thisAliasName2) {
            if (expr.object.computed) return vlog('- bail: computed prop on this is not part of target pattern');
            const propName = expr.property.name;
            // The "jump" calls will use the prototype props and anything else uses the instance props
            const resolvesTo = thisMap.get(propName) || (protoMap.has(propName) ? AST.identifier(protoMap.get(propName)) : undefined);
            // There's no guarantee that the property lookup actually hits. Our target pattern does.
            if (!resolvesTo) return vlog('  - bail: unable to resolve a prototype property to a declaration node;', propName);
            vlog('  - found this-property read of property:', propName, ', resolves to:', resolvesTo?.type);
            instancePropStuff.push([stmt, propName, resolvesTo]);
          }
          // ok
          return true;
        }
        else if (expr.type === 'CallExpression') {
          let found = false;
          // The context is allowed to escape in one call. We might as well support any number of calls as long as
          // we follow through on all of them. Maybe mark them as checked to prevent loops. Our target pattern
          // doesn't but that doesn't mean it can randomly occur in the wild.
          if (expr.callee.type === 'Identifier') {
            if (expr.callee.name === thisAliasName2) return vlog('- bail: calling `this`? okay no');
            if (expr.callee.name === SYMBOL_DOTCALL && expr.arguments[1].name === thisAliasName2) {
              // Need to queue the actual value now... if we don't know which function is being called here then we must bail completely
              vlog('  - Found a method call to the context. Now resolving function.');
              // - Get the func arg
              // - Should be an identifier. Resolve it, find the init. It should be a property lookup on `this`.
              // - Resolve the property using the protoMap to find the function being invoked
              // - Queue that function for processing.
              const funcArg = expr.arguments[0];
              if (funcArg.type === 'Identifier') {
                vlog('  - func arg is', funcArg.name);
                const meta = fdata.globallyUniqueNamingRegistry.get(funcArg.name);
                if (
                  meta?.isConstant &&
                  meta.varDeclRef?.node.type === 'MemberExpression' &&
                  !meta.varDeclRef.node.computed
                ) {
                  const propName = meta.varDeclRef.node.property.name;
                  vlog('  - found init of method arg, a member expression, prop:', [propName]);
                  const is = protoMap.get(propName);
                  vlog('  - resolves to jump func:', [is]);
                  if (is) {
                    vlog('  - queueing for processing now');
                    jumpFuncQueue.push(is);
                    found = true;
                  }
                }
              }
            }
          }
          if (expr.arguments.some((anode,i) => {
            if (found && i === 1) return false; // Allow it as arg 1 for the validated case only
            return anode.type === 'Identifier' && anode.name === thisAliasName2
          })) {
            return vlog('- bail: `this` was passed on as call arg');
          }
          return true;
        }
        else if (expr.type === 'NewExpression') {
          // In target pattern, `this` is not used in new expressions
          if (expr.callee.type === 'Identifier' && expr.callee.name === thisAliasName2) return vlog('- bail: `this` is used in new callee');
          if (expr.arguments.some(anode => anode.type === 'Identifier' && anode.name === thisAliasName2)) return vlog('- bail: `this` is used in new arg');
          // ok.
          return true;
        }
        else if (expr.type === 'BinaryExpression') {
          if (expr.left.type === 'Identifier' && expr.left.name === thisAliasName2) return vlog('- bail: `this` is used as binary operand');
          if (expr.right.type === 'Identifier' && expr.right.name === thisAliasName2) return vlog('- bail: `this` is used as binary operand');
          // ok.
          return true;
        }
        else if (expr.type === 'UnaryExpression') {
          // This is particularly bad with `delete` but I think we can safely ignore any operator here.
          if (expr.argument.type === 'Identifier' && expr.argument.name === thisAliasName2) return vlog('- bail: `this` is used as unary operand');
          // ok.
          return true;
        }
        else if (AST.isPrimitive(expr)) {
          // ok
          return true;
        }
        else if (expr.type === 'Param') {
          // ok
          return true;
        }
        else {
          todo(`lockThis support this init in jump function var decl: ${expr.type})`);
          return vlog('- bail: unexpected init in jump function var statement:', expr.type);
        }

        ASSERT(false, 'unreachable', expr);
      }

      function walkBlock(block) {
        if (bailed) return;

        vgroup('- walkBlock: now walking', block.body.length, 'statements...');
        const ok = block.body.every((stmt,i) => {
          vlog('- stmt:', i, stmt.type);
          switch (stmt.type) {
            case 'DebuggerStatement': {
              if (!thisAliasName2) {
                vlog('Found `debugger` before a `this` alias so we should not need to scan this function');
                return false; // just stop the loop
              }
              return !bailed;
            }
            case 'VarStatement': {
              if (stmt.init.type === 'Identifier' && stmt.init.name === thisAliasName2) {
                bailed = true;
                return vlog('- bail: `this` alias is being reassigned, meaning `this` escapes; init to', stmt.id.name, ', init is', stmt.init.name);
              }
              if (stmt.init.type === 'ThisExpression') {
                if (thisAliasName2) todo('linkThis: Assigning this twice?');
                thisAliasName2 = stmt.id.name;
                return true;
              }
              if (!thisInJumpFunctionExpr(stmt.init, stmt)) {
                bailed = true;
              }
              return !bailed;
            }
            case 'ExpressionStatement': {
              const expr = stmt.expression;
              if (expr.type === 'AssignmentExpression') {
                const lhs = expr.left;
                const rhs = expr.right;

                if (lhs.type === 'MemberExpression') {
                  if (lhs.object.type === 'Identifier' && lhs.object.name === thisAliasName2) return vlog('- bail: assigning to `this` prop');
                  if (lhs.computed && lhs.property.type === 'Identifier' && lhs.property.name === thisAliasName2) return vlog('- bail: `this` is computed prop as lhs in assignment');
                } else if (lhs.type === 'Identifier' && lhs.name === thisAliasName2) {
                  return vlog('- bail: re-assigning to the this alias? huh');
                }

                if (!thisInJumpFunctionExpr(rhs, stmt)) {
                  bailed = true;
                }
              } else {
                if (!thisInJumpFunctionExpr(stmt.expression, stmt)) {
                  bailed = true;
                }
              }
              return !bailed;
            }
            case 'ReturnStatement': {
              if (stmt.argument.type === 'Identifier' && stmt.argument.name === thisAliasName2) {
                bailed = true;
                return vlog('- bail: returning `this`');
              }
              return true;
            }
            case 'IfStatement': {
              vgroup('- then:');
              const p = walkBlock(stmt.consequent);
              vlog('- then outcome:', p);
              vgroupEnd();
              if (!p) return;
              vgroup('- else:')
              const q = walkBlock(stmt.alternate);
              vlog('- else outcome:', q);
              vgroupEnd();
              return q;
            }
            case 'WhileStatement': {
              vgroup('- loop body:');
              const r = walkBlock(stmt.body);
              vgroupEnd();
              return r;
            }
            case 'BreakStatement': {
              return true;
            }
            default: {
              todo(`lockThis support statement in jump function: ${stmt.type}`);
              bailed = true;
              return vlog('- bail: unexpected statement type in jump function:', stmt.type);
            }
          }
        });
        vgroupEnd();

        return ok;
      }

      walkBlock(cnode.body);

      vlog('- end of body walk');
      if (bailed) {
        vlog('- bailed, so stopping entire process...');
        return false;
      }

      vgroupEnd();
    }

    vlog('- finished. Target found...?');

    // So in this case we have a constructor:
    // - invoked once as a new-expression
    // - has some globals assigned to its prototype, every time before the invoke
    // - has some this-properties assigned
    // - is used in method calls which we can all fully track
    // - does not escape other than these method calls
    // - does not have this/prototype writes other than at the start
    // - instance is discarded after the root method call
    // - root method call on instance happens immediately after new-expression
    // - result is used but does not need instance
    // Can we inline all the things? What about references like arrays? We must confirm that they are not
    // read more than once. Or if they are, guarantee that all-but-the-last case is not mutated.


    vlog('- now carving out the constructor and replacing', instancePropStuff.length, 'prop nodes');

    currentState(fdata, 'lockThis', true, fdata);

    // Bit noisy but
    jumpNodes.forEach(node => before(node));

    vgroup('Remove the constructor refs');
    refsToDrop.forEach(ref => {
      before(ref.blockBody[ref.blockIndex]);
      ref.blockBody[ref.blockIndex] = AST.emptyStatement();
      after(ref.blockBody[ref.blockIndex]);
    });
    vgroupEnd();

    vgroup('Clear the new expression, retain the var'); // this way the method call passes in undefined. another reducer can clean that up
    before(newRead.blockBody[newRead.blockIndex]);
    newRead.grandNode.init = AST.undef();
    after(newRead.blockBody[newRead.blockIndex]);
    vgroupEnd();

    instancePropStuff.forEach(([stmt, propName, resolvesTo]) => {
      vgroup('ok;', propName, 'resolves to', resolvesTo.type, resolvesTo.name);

      riskyRule('Replace instance property with known fixed node');
      example('this.foo', 'globalFunc');
      before(stmt);

      if (stmt.type === 'VarStatement') {
        stmt.init =
          resolvesTo.type === 'ArrayExpression'
          ? AST.arrayExpression(
              resolvesTo.elements.map(enode =>
                enode && (enode.type === 'SpreadElement' ? AST.spreadElement(AST.cloneSimple(enode.argument)) : AST.cloneSimple(enode))
              ))
          : AST.cloneSortOfSimple(resolvesTo);
      }
      else if (stmt.type === 'ExpressionStatement') {
        if (stmt.expression.type === 'AssignmentExpression') {
          stmt.expression.right = AST.cloneSortOfSimple(resolvesTo);
        } else if (stmt.expression.type === 'MemberExpression') {
          stmt.expression = AST.cloneSortOfSimple(resolvesTo);
        }
        else ASSERT(false, 'unreachable');
      }
      else ASSERT(false, 'unreachable');

      after(stmt);
      changed = changed + 1;

      vgroupEnd();
    });

    jumpNodes.forEach(node => after(node));

    currentState(fdata, 'lockThis', true, fdata);
  });


  if (changed) {
    log('Locks broken:', changed, '. Restarting from normal');
    return {what: 'lockThis', changes: changed, next: 'normal'};
  }

  log('Locks broken: 0.');
}
