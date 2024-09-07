// Try to resolve or simplify $dotCall occurrences
// `$dotCall($String_slice, 'foo', x)`
// -> `'foo'.slice(x)`
// The $dotCall(f, ctx, ...args) should always be added by us and means doing a f.call(ctx, ...args)
// In general we prefer this form but it is not always the same, in particular when the own property .call was set
// For certain values and builtins we can assert what they're doing, though.

import {
  BUILTIN_ARRAY_METHODS_SYMBOLS,
  BUILTIN_ARRAY_METHOD_LOOKUP_REV,
  BUILTIN_BOOLEAN_METHODS_SYMBOLS,
  BUILTIN_BOOLEAN_METHOD_LOOKUP_REV,
  BUILTIN_FUNCTION_METHODS_SYMBOLS,
  BUILTIN_FUNCTION_METHOD_LOOKUP_REV,
  BUILTIN_NUMBER_METHOD_LOOKUP_REV,
  BUILTIN_NUMBER_METHODS_SYMBOLS,
  BUILTIN_REGEXP_METHOD_LOOKUP_REV,
  BUILTIN_REGEXP_METHODS_SYMBOLS,
  BUILTIN_STRING_METHOD_LOOKUP_REV,
  BUILTIN_STRING_METHODS_SYMBOLS
} from '../constants.mjs';
import { ASSERT, log, group, groupEnd, vlog, vgroup, vgroupEnd, tmat, fmat, rule, example, before, source, after } from '../utils.mjs';
import * as AST from '../ast.mjs';

export function dotCall(fdata) {
  group('\n\n\nTrying to simplify $dotCall occurrences\n');
  const r = _dotCall(fdata);
  groupEnd();
  return r;
}
function _dotCall(fdata) {
  const ast = fdata.tenkoOutput.ast;

  let changed = 0;

  const meta = fdata.globallyUniqueNamingRegistry.get('$dotCall');
  if (!meta) return;

  meta.reads.forEach(read => {
    ASSERT(read.parentNode.type === 'CallExpression', 'When is the $dotCall not a CallExpression? We create this, we control this 100%', read.parentNode.type);

    const funcArg = read.parentNode.arguments[0];
    const context = read.parentNode.arguments[1];
    const args = read.parentNode.arguments.slice(2);

    ASSERT(funcArg, 'the func arg should exist. we control this');
    ASSERT(context, 'the context arg should exist. we control this');

    if (funcArg.type !== 'Identifier') return; // Unlikely but whatever. TODO: can we change this to a crash?

    const contextType = (AST.isPrimitive(context) && AST.getPrimitiveType(context)) || (context.type === 'Identifier' && fdata.globallyUniqueNamingRegistry.get(context.name).typing.mustBeType);

    log(`- $dotCall(): ident=${funcArg.name}, context type=${contextType}`);

    switch (contextType) {
      case 'undefined': {
        // This is a crash (`undefined.foo()`). handled elsewhere.
        break;
      }
      case 'null': {
        // This is a crash (`null.foo()`). handled elsewhere
        break;
      }
      case 'boolean': {
        source(read.grandNode);
        // This is okay. The `true` and `false` primitive values have a prototype
        if (BUILTIN_BOOLEAN_METHODS_SYMBOLS.includes(funcArg.name)) {
          rule('A dotCall with known func and guaranteed context type should be simplified to a method call');
          example('$dotCall($Boolean_toString, true)', 'true.toString()');
          before(read.blockBody[read.blockIndex]);

          if (read.grandIndex < 0) read.grandNode[read.grandProp] = AST.callExpression(AST.memberExpression(context, BUILTIN_BOOLEAN_METHOD_LOOKUP_REV[funcArg.name]), args);
          else read.grandNode[read.grandProp][read.grandIndex] = AST.callExpression(AST.memberExpression(context, BUILTIN_BOOLEAN_METHOD_LOOKUP_REV[funcArg.name]), args);

          after(read.blockBody[read.blockIndex]);
          ++changed;
          return;
        }
        break;
      }
      case 'number': {
        if (BUILTIN_NUMBER_METHODS_SYMBOLS.includes(funcArg.name)) {
          rule('A dotCall with known func and guaranteed context type should be simplified to a method call');
          example('$dotCall($Number_toString, NaN)', 'NaN.toString()');
          before(read.blockBody[read.blockIndex]);

          if (read.grandIndex < 0) read.grandNode[read.grandProp] = AST.callExpression(AST.memberExpression(context, BUILTIN_NUMBER_METHOD_LOOKUP_REV[funcArg.name]), args);
          else read.grandNode[read.grandProp][read.grandIndex] = AST.callExpression(AST.memberExpression(context, BUILTIN_NUMBER_METHOD_LOOKUP_REV[funcArg.name]), args);

          after(read.blockBody[read.blockIndex]);
          ++changed;
          return;
        }
        break;
      }
      case 'string': {
        if (BUILTIN_STRING_METHODS_SYMBOLS.includes(funcArg.name)) {
          rule('A dotCall with known func and guaranteed context type should be simplified to a method call');
          example('$dotCall($String_concat, "foo", "bar")', '"foo".concat("bar")');
          before(read.blockBody[read.blockIndex]);

          if (read.grandIndex < 0) read.grandNode[read.grandProp] = AST.callExpression(AST.memberExpression(context, BUILTIN_STRING_METHOD_LOOKUP_REV[funcArg.name]), args);
          else read.grandNode[read.grandProp][read.grandIndex] = AST.callExpression(AST.memberExpression(context, BUILTIN_STRING_METHOD_LOOKUP_REV[funcArg.name]), args);

          after(read.blockBody[read.blockIndex]);
          ++changed;
          return;
        }
        break;
      }
      case 'array': {
        if (BUILTIN_ARRAY_METHODS_SYMBOLS.includes(funcArg.name)) {
          rule('A dotCall with known func and guaranteed context type should be simplified to a method call');
          example('const arr = []; $dotCall($Array_push, arr, "arf")', 'arr.push("arf")');
          before(read.blockBody[read.blockIndex]);

          if (read.grandIndex < 0) read.grandNode[read.grandProp] = AST.callExpression(AST.memberExpression(context, BUILTIN_ARRAY_METHOD_LOOKUP_REV[funcArg.name]), args);
          else read.grandNode[read.grandProp][read.grandIndex] = AST.callExpression(AST.memberExpression(context, BUILTIN_ARRAY_METHOD_LOOKUP_REV[funcArg.name]), args);

          after(read.blockBody[read.blockIndex]);
          ++changed;
          return;
        }
        break;
      }
      case 'regex': {
        if (BUILTIN_REGEXP_METHODS_SYMBOLS.includes(funcArg.name)) {
          rule('A dotCall with known func and guaranteed context type should be simplified to a method call');
          example('$dotCall($RegExp_test, /woof/, "arf")', '/woof/.test("arf")');
          before(read.blockBody[read.blockIndex]);

          if (read.grandIndex < 0) read.grandNode[read.grandProp] = AST.callExpression(AST.memberExpression(context, BUILTIN_REGEXP_METHOD_LOOKUP_REV[funcArg.name]), args);
          else read.grandNode[read.grandProp][read.grandIndex] = AST.callExpression(AST.memberExpression(context, BUILTIN_REGEXP_METHOD_LOOKUP_REV[funcArg.name]), args);

          after(read.blockBody[read.blockIndex]);
          ++changed;
          return;
        }
        break;
      }
      case 'function': {
        if (BUILTIN_FUNCTION_METHODS_SYMBOLS.includes(funcArg.name)) {
          rule('A dotCall with known func and guaranteed context type should be simplified to a method call');
          example('$dotCall($Function_apply, f, args)', 'f.apply(args)');
          before(read.blockBody[read.blockIndex]);

          if (read.grandIndex < 0) read.grandNode[read.grandProp] = AST.callExpression(AST.memberExpression(context, BUILTIN_FUNCTION_METHOD_LOOKUP_REV[funcArg.name]), args);
          else read.grandNode[read.grandProp][read.grandIndex] = AST.callExpression(AST.memberExpression(context, BUILTIN_FUNCTION_METHOD_LOOKUP_REV[funcArg.name]), args);

          after(read.blockBody[read.blockIndex]);
          ++changed;
          return;
        }
        break;
      }
    }

    if (funcArg.type === 'Identifier' && context.type === 'Identifier' && context.name === 'console') {
      ASSERT(fdata.globallyUniqueNamingRegistry.get(context.name).isBuiltin, 'should not find other `console` refs than the built-in');

      const method = {
        $console_log: 'log',
        $console_warn: 'warn',
        $console_error: 'error',
        $console_dir: 'dir',
        $console_debug: 'debug',
        $console_time: 'time',
        $console_timeEnd: 'timeEnd',
        $console_group: 'group',
        $console_groupEnd: 'groupEnd',
      }[funcArg.name];

      if (method) {
        rule('restore certain method calls to console');
        example('$dotCall($console_log, console, a, b, c);', 'console.log(a, b, c)');
        before(read.blockBody[read.blockIndex]);

        const newNode = AST.callExpression(
          AST.memberExpression(
            AST.identifier('console'),
            AST.identifier(method),
          ),
          read.parentNode.arguments.slice(2), // First is the func, second is the context, remainder are the args
          false
        );

        if (read.grandIndex < 0) read.grandNode[read.grandProp] = newNode;
        else read.grandNode[read.grandProp][read.grandIndex] = newNode;

        after(read.blockBody[read.blockIndex]);
        ++changed;
        return;
      }
    }

    // find `const method = a.b; const arg = x; $dotCall(method, a, x); cases to collapse (back) into a.b(x);
    // The simple pattern is most common but this can be generalized
    if (
      read.blockIndex > 1 &&
      read.blockBody[read.blockIndex - 2].type === 'VariableDeclaration' &&
      read.blockBody[read.blockIndex - 1].type === 'VariableDeclaration' &&
      read.parentNode.arguments.length > 0 &&
      read.parentNode.arguments[0].type === 'Identifier' &&
      // dotcall first arg is the method. Was that "cached" two steps ago?
      read.parentNode.arguments[0].name === read.blockBody[read.blockIndex - 2].declarations[0].id.name &&
      // Was the rhs a member expr?
      read.blockBody[read.blockIndex - 2].declarations[0].init.type === 'MemberExpression'
    ) {
      // Can the init of the between decl spy?
      if (!AST.complexExpressionNodeMightSpy(read.blockBody[read.blockIndex - 1].declarations[0].init, fdata)) {
        rule('A dotCall expression where can be collapsed back safely in some cases');
        example('const method = a.b; const arg = x; $dotCall(method, a, x);', 'a.b(x);');
        before(read.blockBody[read.blockIndex]);

        read.parentNode.callee = read.blockBody[read.blockIndex - 2].declarations[0].init;
        read.parentNode.arguments.shift(); // method
        read.parentNode.arguments.shift(); // context
        read.blockBody[read.blockIndex - 2] = AST.emptyStatement();

        after(read.blockBody[read.blockIndex]);
        ++changed;
        return;
      }
    }
  });

  if (changed) {
    log('dotCalls replaced:', changed, '. Restarting from phase1');
    return {what: 'dotCall', changes: changed, next: 'phase1'};
  }

  log('dotCalls replaced: 0.');
}
