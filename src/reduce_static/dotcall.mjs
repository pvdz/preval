// Try to resolve or simplify $dotCall occurrences
// `$dotCall($string_slice, 'foo', "slice", x)`
// -> `'foo'.slice(x)`
// The $dotCall(f, ctx, "prop", ...args) should always be added by us and means doing a f.apply(ctx, args)
// In general we prefer this form but it is not always the same, in particular when the own property .call was set
// For certain values and builtins we can assert what they're doing, though.

import { NUMBER, BOOLEAN, STRING, OBJECT, ARRAY, DATE, FUNCTION, $JSON, MATH, REGEXP, symbo, sym_prefix, BUFFER, } from '../symbols_builtins.mjs';
import { ASSERT, log, group, groupEnd, vlog, vgroup, vgroupEnd, tmat, fmat, rule, example, before, source, after, todo } from '../utils.mjs';
import * as AST from '../ast.mjs';
import { SYMBOL_DOTCALL } from '../symbols_preval.mjs';

export function simplifyDotCall(fdata) {
  group('\n\n\n[simplifyDotCall] Trying to simplify $dotCall occurrences\n');
  const r = _dotCall(fdata);
  groupEnd();
  return r;
}
function _dotCall(fdata) {
  const ast = fdata.tenkoOutput.ast;

  let changed = 0;

  const meta = fdata.globallyUniqueNamingRegistry.get(SYMBOL_DOTCALL);
  if (!meta) return;

  meta.reads.forEach(read => {
    ASSERT(read.parentNode.type === 'CallExpression', 'When is the $dotCall not a CallExpression? We create this, we control this 100%', read.parentNode.type);

    ASSERT(read.parentNode.arguments.length >= 3, '$dotcall should have at least a func, context, and prop arg.', read.parentNode, read.parentNode.arguments);
    const funcArg = read.parentNode.arguments[0];
    if (funcArg.type !== 'Identifier') return todo(`first arg to $dotcall should be a reference to a function: ${funcArg.type}`, read.parentNode, read.parentNode.arguments);
    const context = read.parentNode.arguments[1];
    ASSERT(read.parentNode.arguments.length >= 3, 'the new $dotcall should have 3+ args', read.grandNode);
    ASSERT(AST.isPrimitive(read.parentNode.arguments[2]), 'third param to $dotcall should be a primitive', read.parentNode, read.parentNode.arguments);
    const prop = AST.getPrimitiveValue(read.parentNode.arguments[2]);
    ASSERT(AST.isUndefined(read.parentNode.arguments[2]) || AST.isStringLiteral(read.parentNode.arguments[2]), 'third param to $dotcall should be a string or undefined', read.parentNode, read.parentNode.arguments);
    const args = read.parentNode.arguments.slice(3);

    ASSERT(funcArg, 'the func arg should exist. we control this');
    ASSERT(context, 'the context arg should exist. we control this');

    if (funcArg.type !== 'Identifier') return; // Unlikely but whatever. TODO: can we change this to a crash?

    const contextType = (AST.isPrimitive(context) && AST.getPrimitiveType(context)) || (context.type === 'Identifier' && fdata.globallyUniqueNamingRegistry.get(context.name).typing.mustBeType);

    log(`- $dotCall(): ident=${funcArg.name}, context type=${contextType}, original prop=${prop}`);

    //switch (contextType) {
    //  case 'undefined': {
    //    // This is a crash (`undefined.foo()`). handled elsewhere.
    //    break;
    //  }
    //  case 'null': {
    //    // This is a crash (`null.foo()`). handled elsewhere
    //    break;
    //  }
    //  case 'boolean': {
    //    source(read.grandNode);
    //    // This is okay. The `true` and `false` primitive values have a prototype
    //    if (BOOLEAN.has(funcArg.name) && funcArg.name.startsWith(sym_prefix('boolean', true))) {
    //      rule('A dotCall with known func and guaranteed context type should be simplified to a method call');
    //      example(`$dotCall(${symbo('boolean', 'toString')}, true, "toString")`, 'true.toString()');
    //      before(read.blockBody[read.blockIndex]);
    //
    //      const prop = BOOLEAN.get(funcArg.name).prop;
    //      if (read.grandIndex < 0) read.grandNode[read.grandProp] = AST.callExpression(AST.memberExpression(context, prop), args);
    //      else read.grandNode[read.grandProp][read.grandIndex] = AST.callExpression(AST.memberExpression(context, prop), args);
    //
    //      after(read.blockBody[read.blockIndex]);
    //      ++changed;
    //      return;
    //    }
    //    break;
    //  }
    //  case 'number': {
    //    if (NUMBER.has(funcArg.name) && funcArg.name.startsWith(sym_prefix('number', true))) {
    //      rule('A dotCall with known builtin func symbol and guaranteed context type should be simplified to a method call');
    //      example(`$dotCall(${symbo('number', 'toString')}, NaN, "toString")`, 'NaN.toString()');
    //      before(read.blockBody[read.blockIndex]);
    //
    //      const prop = NUMBER.get(funcArg.name).prop;
    //      if (read.grandIndex < 0) read.grandNode[read.grandProp] = AST.callExpression(AST.memberExpression(context, prop), args);
    //      else read.grandNode[read.grandProp][read.grandIndex] = AST.callExpression(AST.memberExpression(context, prop), args);
    //
    //      after(read.blockBody[read.blockIndex]);
    //      ++changed;
    //      return;
    //    }
    //    break;
    //  }
    //  case 'string': {
    //    if (STRING.has(funcArg.name) && funcArg.name.startsWith(sym_prefix('string', true))) {
    //      rule('A dotCall with known func and guaranteed context type should be simplified to a method call');
    //      example(`$dotCall(${symbo('string', 'concat')}, "concat", "foo", "bar")`, '"foo".concat("bar")');
    //      before(read.blockBody[read.blockIndex]);
    //
    //      const prop = STRING.get(funcArg.name).prop;
    //      if (read.grandIndex < 0) read.grandNode[read.grandProp] = AST.callExpression(AST.memberExpression(context, prop), args);
    //      else read.grandNode[read.grandProp][read.grandIndex] = AST.callExpression(AST.memberExpression(context, prop), args);
    //
    //      after(read.blockBody[read.blockIndex]);
    //      ++changed;
    //      return;
    //    }
    //    break;
    //  }
    //  case 'array': {
    //    if (ARRAY.has(funcArg.name) && funcArg.name.startsWith(sym_prefix('array', true))) {
    //      rule('A dotCall with known func and guaranteed context type should be simplified to a method call');
    //      example(`const arr = []; $dotCall(${symbo('array', 'push')}, arr, "push", "arf")`, 'arr.push("arf")');
    //      before(read.blockBody[read.blockIndex]);
    //
    //      const prop = ARRAY.get(funcArg.name).prop;
    //      if (read.grandIndex < 0) read.grandNode[read.grandProp] = AST.callExpression(AST.memberExpression(context, prop), args);
    //      else read.grandNode[read.grandProp][read.grandIndex] = AST.callExpression(AST.memberExpression(context, prop), args);
    //
    //      after(read.blockBody[read.blockIndex]);
    //      ++changed;
    //      return;
    //    }
    //    break;
    //  }
    //  case 'regex': {
    //    if (REGEXP.has(funcArg.name) && funcArg.name.startsWith(sym_prefix('regex', true))) {
    //      rule('A dotCall with known func and guaranteed context type should be simplified to a method call');
    //      example(`$dotCall(${symbo('regex', 'test')}, /woof/, "test", "arf")`, '/woof/.test("arf")');
    //      before(read.blockBody[read.blockIndex]);
    //
    //      const prop = REGEXP.get(funcArg.name).prop;
    //      if (read.grandIndex < 0) read.grandNode[read.grandProp] = AST.callExpression(AST.memberExpression(context, prop), args);
    //      else read.grandNode[read.grandProp][read.grandIndex] = AST.callExpression(AST.memberExpression(context, prop), args);
    //
    //      after(read.blockBody[read.blockIndex]);
    //      ++changed;
    //      return;
    //    }
    //    break;
    //  }
    //  case 'function': {
    //    if (FUNCTION.has(funcArg.name) && funcArg.name.startsWith(sym_prefix('function', true))) {
    //      rule('A dotCall with known func and guaranteed context type should be simplified to a method call');
    //      example(`$dotCall(${symbo('function', 'apply')}, f, "apply", args)`, 'f.apply(args)');
    //      before(read.blockBody[read.blockIndex]);
    //
    //      const prop = FUNCTION.get(funcArg.name).prop;
    //      if (read.grandIndex < 0) read.grandNode[read.grandProp] = AST.callExpression(AST.memberExpression(context, prop), args);
    //      else read.grandNode[read.grandProp][read.grandIndex] = AST.callExpression(AST.memberExpression(context, prop), args);
    //
    //      after(read.blockBody[read.blockIndex]);
    //      ++changed;
    //      return;
    //    }
    //    break;
    //  }
    //}

    //if (funcArg.type === 'Identifier' && context.type === 'Identifier' && context.name === 'console') {
    //  ASSERT(fdata.globallyUniqueNamingRegistry.get(context.name).isBuiltin, 'should not find other `console` refs than the built-in');
    //
    //  const method = {
    //    $console_log: 'log',
    //    $console_warn: 'warn',
    //    $console_error: 'error',
    //    $console_dir: 'dir',
    //    $console_debug: 'debug',
    //    $console_time: 'time',
    //    $console_timeEnd: 'timeEnd',
    //    $console_group: 'group',
    //    $console_groupEnd: 'groupEnd',
    //  }[funcArg.name];
    //
    //  if (method) {
    //    rule('restore certain method calls to console');
    //    example('$dotCall($console_log, console, "log", a, b, c);', 'console.log(a, b, c)');
    //    before(read.blockBody[read.blockIndex]);
    //
    //    const newNode = AST.callExpression(
    //      AST.memberExpression(
    //        AST.identifier('console'),
    //        AST.identifier(method),
    //      ),
    //      read.parentNode.arguments.slice(3), // First is the func, second is the context, third is property, remainder are the args
    //      false
    //    );
    //
    //    if (read.grandIndex < 0) read.grandNode[read.grandProp] = newNode;
    //    else read.grandNode[read.grandProp][read.grandIndex] = newNode;
    //
    //    after(read.blockBody[read.blockIndex]);
    //    ++changed;
    //    return;
    //  }
    //}

    //if (globalNames.has(funcArg.name)) {
    //  // This refers to a built-in of some kind (or perhaps a Preval Symbol like $Math_pow)
    //  // Unfortunately we can't point-blank simplify this for the builtins that are context
    //  // sensitive (like most methods) so we have to do this on a step-by-step basis
    //
    //  if (ARRAY.has(funcArg.name) && context.name === 'Array' && funcArg.name.startsWith(sym_prefix('Array'))) { // Make sure to dodge `$dotCall($number_toFixed, Number, "toFixed")` kinds of cases
    //    rule('A dotCall with known Array function should be simplified to a method call');
    //    example(`$dotCall(${symbo('Array', 'from')}, Array, "from", 2, 3)`, 'Array.from(2, 3)');
    //    before(read.blockBody[read.blockIndex]);
    //
    //    const prop = ARRAY.get(funcArg.name).prop;
    //    const finalNode = AST.callExpression(AST.memberExpression(AST.identifier('Array'), prop), args);
    //    if (read.grandIndex < 0) read.grandNode[read.grandProp] = finalNode;
    //    else read.grandNode[read.grandProp][read.grandIndex] = finalNode;
    //
    //    after(read.blockBody[read.blockIndex]);
    //    ++changed;
    //    return;
    //  }
    //  if (NUMBER.has(funcArg.name) && context.name === symbo('number', 'constructor') && funcArg.name.startsWith(sym_prefix('Number'))) { // Make sure to dodge `$dotCall($number_toFixed, Number, "toFixed")`
    //    rule('A dotCall with known Number function should be simplified to a method call');
    //    example(`$dotCall(${symbo('Number', 'isSafeInteger')}, Number, "isSafeInteger", 2, 3)`, 'Number.isSafeInteger(2, 3)');
    //    before(read.blockBody[read.blockIndex]);
    //
    //    const prop = NUMBER.get(funcArg.name).prop;
    //    const finalNode = AST.callExpression(AST.memberExpression(AST.identifier(symbo('number', 'constructor')), prop), args);
    //    if (read.grandIndex < 0) read.grandNode[read.grandProp] = finalNode;
    //    else read.grandNode[read.grandProp][read.grandIndex] = finalNode;
    //
    //    after(read.blockBody[read.blockIndex]);
    //    ++changed;
    //    return;
    //  }
    //  if (OBJECT.has(funcArg.name) && context.name === 'Object' && funcArg.name.startsWith(sym_prefix('Object'))) { // Make sure to dodge `$dotCall($number_toFixed, Number, "toFixed")` kinds of cases
    //    rule('A dotCall with known Object function should be simplified to a method call');
    //    example(`$dotCall(${symbo('Object', 'keys')}, Object, "keys", obj)`, 'Object.keys(obj)');
    //    before(read.blockBody[read.blockIndex]);
    //
    //    const prop = OBJECT.get(funcArg.name).prop;
    //    const finalNode = AST.callExpression(AST.memberExpression(AST.identifier('Object'), prop), args);
    //    if (read.grandIndex < 0) read.grandNode[read.grandProp] = finalNode;
    //    else read.grandNode[read.grandProp][read.grandIndex] = finalNode;
    //
    //    after(read.blockBody[read.blockIndex]);
    //    ++changed;
    //    return;
    //  }
    //  if (STRING.has(funcArg.name) && context.name === symbo('string', 'constructor') && funcArg.name.startsWith(sym_prefix('String'))) { // Make sure to dodge `$dotCall($number_toFixed, Number, "toFixed")` sort of case
    //    rule('A dotCall with known String function should be simplified to a method call');
    //    example(`$dotCall(${symbo('String', 'fromCharCode')}, String, "fromCharCode", 2, 3)`, 'String.fromCharCode(2, 3)');
    //    before(read.blockBody[read.blockIndex]);
    //
    //    const prop = STRING.get(funcArg.name).prop;
    //    const finalNode = AST.callExpression(AST.memberExpression(AST.identifier(symbo('string', 'constructor')), prop), args);
    //    if (read.grandIndex < 0) read.grandNode[read.grandProp] = finalNode;
    //    else read.grandNode[read.grandProp][read.grandIndex] = finalNode;
    //
    //    after(read.blockBody[read.blockIndex]);
    //    ++changed;
    //    return;
    //  }
    //  if (DATE.has(funcArg.name) && context.name === 'Date' && funcArg.name.startsWith(sym_prefix('Date'))) { // Make sure to dodge `$dotCall($number_toFixed, Number, "toFixed")` sort of case
    //    rule('A dotCall with known Date function should be simplified to a method call');
    //    example(`$dotCall(${symbo('Date', 'now')}, Date, "now")`, 'Date.now()');
    //    before(read.blockBody[read.blockIndex]);
    //
    //    const prop = DATE.get(funcArg.name).prop;
    //    const finalNode = AST.callExpression(AST.memberExpression(AST.identifier('Date'), prop), args);
    //    if (read.grandIndex < 0) read.grandNode[read.grandProp] = finalNode;
    //    else read.grandNode[read.grandProp][read.grandIndex] = finalNode;
    //
    //    after(read.blockBody[read.blockIndex]);
    //    ++changed;
    //    return;
    //  }
    //  if (MATH.has(funcArg.name) && context.name === 'Math' && funcArg.name.startsWith(sym_prefix('Math'))) { // Make sure to dodge `$dotCall($number_toFixed, Number, "toFixed")` sort of case
    //    // Note: none of the Math functions are context sensitive so we don't care much for the
    //    // context here. We should preserve it as a statement though, just in case.
    //    rule('A dotCall with known Math function should be simplified to a method call');
    //    example(`$dotCall(${symbo('Math', 'pow')}, Math, "pow", 2, 3)`, 'Math.pow(2, 3)');
    //    before(read.blockBody[read.blockIndex]);
    //
    //    const prop = MATH.get(funcArg.name).prop;
    //    const finalNode = AST.callExpression(AST.memberExpression(AST.identifier('Math'), prop), args);
    //    if (read.grandIndex < 0) read.grandNode[read.grandProp] = finalNode;
    //    else read.grandNode[read.grandProp][read.grandIndex] = finalNode;
    //
    //    after(read.blockBody[read.blockIndex]);
    //    ++changed;
    //    return;
    //  }
    //  if ($JSON.has(funcArg.name) && context.name === 'JSON' && funcArg.name.startsWith(sym_prefix('JSON'))) { // Make sure to dodge `$dotCall($number_toFixed, Number, "toFixed")` sort of case
    //    rule('A dotCall with known JSON function should be simplified to a method call');
    //    example(`$dotCall(${symbo('JSON', 'parse')}, JSON, "parse", "{}")`, 'JSON.parse("{}")');
    //    before(read.blockBody[read.blockIndex]);
    //
    //    const prop = $JSON.get(funcArg.name).prop;
    //    const finalNode = AST.callExpression(AST.memberExpression(AST.identifier('JSON'), prop), args);
    //    if (read.grandIndex < 0) read.grandNode[read.grandProp] = finalNode;
    //    else read.grandNode[read.grandProp][read.grandIndex] = finalNode;
    //
    //    after(read.blockBody[read.blockIndex]);
    //    ++changed;
    //    return;
    //  }
    //  if (BUFFER.has(funcArg.name) && context.name === 'Buffer' && funcArg.name.startsWith(sym_prefix('Buffer'))) { // Make sure to dodge `$dotCall($number_toFixed, Number, "toFixed")` sort of case
    //    rule('A dotCall with known Buffer function should be simplified to a method call');
    //    example(`$dotCall(${symbo('Buffer', 'from')}, Buffer, "from", "{}", "base64")`, 'Buffer.from("x", "base64")');
    //    before(read.blockBody[read.blockIndex]);
    //
    //    const prop = BUFFER.get(funcArg.name).prop;
    //    const finalNode = AST.callExpression(AST.memberExpression(AST.identifier('Buffer  '), prop), args);
    //    if (read.grandIndex < 0) read.grandNode[read.grandProp] = finalNode;
    //    else read.grandNode[read.grandProp][read.grandIndex] = finalNode;
    //
    //    after(read.blockBody[read.blockIndex]);
    //    ++changed;
    //    return;
    //  }
    //}
    //
    //// find `const method = a.b; const arg = x; $dotCall(method, a, "b", x); cases to collapse (back) into a.b(x);
    //// The simple pattern is most common but this can be generalized
    //if (
    //  read.blockIndex > 1 &&
    //  read.blockBody[read.blockIndex - 2].type === 'VarStatement' &&
    //  read.blockBody[read.blockIndex - 1].type === 'VarStatement' &&
    //  read.parentNode.arguments.length > 0 &&
    //  read.parentNode.arguments[0].type === 'Identifier' &&
    //  // dotcall first arg is the method. Was that "cached" two steps ago?
    //  read.parentNode.arguments[0].name === read.blockBody[read.blockIndex - 2].id.name &&
    //  // Was the rhs a member expr?
    //  read.blockBody[read.blockIndex - 2].init.type === 'MemberExpression'
    //) {
    //  // Can the init of the between decl spy?
    //  if (!AST.complexExpressionNodeMightSpy(read.blockBody[read.blockIndex - 1].init, fdata)) {
    //    rule('A dotCall expression where can be collapsed back safely in some cases');
    //    example('const method = a.b; const arg = x; $dotCall(method, a, "b", x);', 'a.b(x);');
    //    before(read.blockBody[read.blockIndex]);
    //
    //    read.parentNode.callee = read.blockBody[read.blockIndex - 2].init;
    //    read.parentNode.arguments.shift(); // method
    //    read.parentNode.arguments.shift(); // context
    //    read.parentNode.arguments.shift(); // property
    //    read.blockBody[read.blockIndex - 2] = AST.emptyStatement();
    //
    //    after(read.blockBody[read.blockIndex]);
    //    ++changed;
    //    return;
    //  }
    //}
  });

  if (changed) {
    log('dotCalls replaced:', changed, '. Restarting from phase1');
    return {what: 'dotCall', changes: changed, next: 'phase1'};
  }

  log('dotCalls replaced: 0.');
}
