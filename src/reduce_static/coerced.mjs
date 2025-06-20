// Find all cases of $coerce and use type information to check whether their arg is already a known primitive of any kind.

import { ASSERT, log, group, groupEnd, vlog, vgroup, vgroupEnd, rule, example, before, source, after, fmat, tmat, coerce, findBodyOffset, todo, } from '../utils.mjs';
import * as AST from '../ast.mjs';
import { BUILTIN_SYMBOLS, symbo } from '../symbols_builtins.mjs';
import { getSerializableArrayParts } from '../ast.mjs';
import { SYMBOL_COERCE } from '../symbols_preval.mjs';
import { PRIMITIVE_TYPE_NAMES_PREVAL } from '../constants.mjs';

export function coercials(fdata) {
  group('\n\n\n[coercials] Find cases of $coerce to eliminate');
  //currentState(fdata, 'coercials', true, fdata);
  const r = _coercials(fdata);
  groupEnd();
  return r;
}
function _coercials(fdata) {
  const changes = core(fdata);

  if (changes) {
    log('$coerces eliminated:', changes, '. Restarting from phase1 to fix up read/write registry');
    return {what: 'coercials', changes: changes, next: 'phase1'};
  }
  log('$coerces eliminated: 0.');

}

function core(fdata) {
  let changes = 0;
  const meta = fdata.globallyUniqueNamingRegistry.get(SYMBOL_COERCE);
  meta.reads.forEach((read, ri) => {
    ASSERT(read.parentNode.type === 'CallExpression', 'when else does $coerce appear??', read.parentNode);
    ASSERT(read.parentProp === 'callee', 'should always be called', read.parentNode);

    const argNode = read.parentNode.arguments[0];
    // We control $coerce and know the second arg is a primitive
    const kind = AST.getPrimitiveValue(read.parentNode.arguments[1]);

    if (AST.isPrimitive(argNode)) {
      vlog('Arg is already a primitive. Drop it now');
      rule('Calling $coerce with a primitive can be resolved');
      example('$coerce(500.123, "string");', '"500.123";');
      example('$coerce(500.123, "number");', '500.123;');
      example('$coerce("500.123", "plustr");', '"500.123";');
      before(read.blockBody[read.blockIndex]);

      const pv = AST.getPrimitiveValue(argNode);
      const pvc =
        kind === 'string'
          ? String(pv)
          : kind === 'number'
          ? Number(pv)
          : kind !== 'plustr'
          ? ASSERT(false, 'the $coerce second arg is an enum we control', kind)
          : // The `plustr` kind means the value was part of a concat to string
            // Since the value is already a primitive, we only have to force it to a string here
            String(pv);

      if (read.grandIndex < 0) read.grandNode[read.grandProp] = AST.primitive(pvc);
      else read.grandNode[read.grandProp][read.grandIndex] = AST.primitive(pvc);

      after(read.blockBody[read.blockIndex]);
      ++changes;
    }

    if (argNode.type !== 'Identifier') {
      // TODO: if it's not a primitive and not an identifier, what is it and can we maybe still resolve it?
      return;
    }

    let argName = argNode.name;

    // Convert to regular name because it's used for serialization
    switch (argName) {
      case symbo('boolean', 'constructor'): {
        argName = 'Boolean';
        break;
      }
      case symbo('array', 'constructor'): {
        argName = 'Array';
        break;
      }
      case symbo('object', 'constructor'): {
        argName = 'Object';
        break;
      }
      case symbo('number', 'constructor'): {
        argName = 'Number';
        break;
      }
      case symbo('string', 'constructor'): {
        argName = 'String';
        break;
      }
      case symbo('regex', 'constructor'): {
        argName = 'RegExp';
        break;
      }
    }

    // Support some globals. Mostly for jsf*ck cases.
    switch (argName) {
      case 'Array':
      case 'Object':
      case 'Boolean':
      case 'Number':
      case 'String':
      case 'RegExp': {
        rule('Adding a builtin constructor to a primitive can be resolved');
        example('f(0 + String);', 'f("0function Array() { [native code] }");', () => argName === 'Array');
        before(read.blockBody[read.blockIndex]);

        ASSERT(['number', 'string', 'plustr'].includes(kind), 'result is the same no matter the kind', kind);
        const finalNode = AST.primitive('function ' + argName + '() { [native code] }');
        read.parentNode['arguments'][0] = finalNode;

        after(read.blockBody[read.blockIndex]);
        ++changes;
        return;
      }
    }

    if (BUILTIN_SYMBOLS.has(argName)) {
      const symb = BUILTIN_SYMBOLS.get(argName);
      if (symb.typings.mustBeType === 'function') {
        rule('$coerce on a namespaced preval built-in symbol should become a string'); // kind of regardless. even if NaN later.
        example(`$coerce(${symbo('array', 'flat')}, "plustr")`, '"function flat() { [native code] }"');
        before(read.blockBody[read.blockIndex]);

        // Let's hope this approach works universally...
        // Kind should not matter when the input is a function
        const finalNode = AST.primitive('function ' + symb.prop + '() { [native code] }');
        if (read.grandIndex < 0) read.grandNode[read.grandProp] = finalNode;
        else read.grandNode[read.grandProp][read.grandIndex] = finalNode;

        after(read.blockBody[read.blockIndex]);
        ++changes;
        return;
      } else {
        todo(`Support coercing "${argName}" to a "${kind}"`);
      }
    }

    const argMeta = fdata.globallyUniqueNamingRegistry.get(argName);

    if (argMeta.isImplicitGlobal) return;
    // Seems to me like there are more conditions but ...

    const at = argMeta.typing.mustBeType;
    // Note: null and undefined are actual values. Let normalize clean those up.

    if (read.grandNode.type === 'ExpressionStatement' && PRIMITIVE_TYPE_NAMES_PREVAL.has(at)) {
      // This is a call to $coerce as a statement. It's only relevant to keep these if the arg can spy.
      // Primitives can't spy so this call is moot.

      rule('$coerce as a statement on a primitive is not observable and can be dropped');
      example(`const x = $() + ''; $coerce(x, "plustr");`, `'const x = $() + ''; ;'`);
      before(read.blockBody[read.blockIndex]);

      read.blockBody[read.blockIndex] = AST.emptyStatement();

      after(read.blockBody[read.blockIndex]);
      ++changes;
      return;
    }

    if (at === 'string' && (kind === 'string' || kind === 'plustr')) {
      const argWrite = argMeta.writes.find((write) => write.kind === 'var');
      ASSERT(argWrite, 'right?', argMeta, argNode);

      rule('Coercing a string to a string is a noop');
      example('const x = `a${b}c`; const b = $coerce(x, "string");', 'const x = `a${b}c`; const b = x;');
      before(argWrite.blockBody[argWrite.blockIndex]);
      before(read.blockBody[read.blockIndex]);

      if (read.grandIndex < 0) read.grandNode[read.grandProp] = argNode;
      else read.grandNode[read.grandProp][read.grandIndex] = argNode;

      after(read.blockBody[read.blockIndex]);
      ++changes;
      return;
    }

    if (at === 'number' && kind === 'plustr') {
      rule('Calling $coerce on a value that is a number when asking for plustr can be changed to want a string');
      example('const x = +y; $coerce(y, "plustr");', 'const x = +y; $coerce(y, "string");');
      before(read.blockBody[read.blockIndex]);

      read.parentNode['arguments'][1] = AST.primitive('string');

      after(read.blockBody[read.blockIndex]);
      ++changes;
      // Allow next checks to scan this change
    }

    if ((at === 'number' && kind === 'number') || (at === 'string' && kind === 'string')) {
      rule('Calling $coerce on a value that is already of target type is a noop');
      example('const x = +y; $coerce(y, "number");', 'const x = +y; y;');
      before(read.blockBody[read.blockIndex]);

      if (read.grandIndex < 0) read.grandNode[read.grandProp] = argNode;
      else read.grandNode[read.grandProp][read.grandIndex] = argNode;

      after(read.blockBody[read.blockIndex]);
      ++changes;
    }

    if (at === 'regex') {
      if (argMeta.varDeclRef?.node && AST.isNewRegexLit(argMeta.varDeclRef.node)) {
        rule('A regex as arg to $coerce can be resolved');
        example('$coerce(/foo/, "number")', 'NaN');
        example('$coerce(/foo/, "string")', '"/foo/"');
        example('$coerce(/foo/, "plustr")', '"/foo/"');
        before(read.blockBody[read.blockIndex]);

        const finalNode = AST.primitive(
          coerce(
            new RegExp(
              AST.getPrimitiveValue(argMeta.varDeclRef.node.arguments[0]),
              AST.getPrimitiveValue(argMeta.varDeclRef.node.arguments[1]),
            ),
            kind
          )
        );
        read.parentNode['arguments'][0] = finalNode;

        after(read.blockBody[read.blockIndex]);
        ++changes;
        return;
      }
    }

    if (at === 'function') {
      if (kind === 'number') {
        rule('A regex as arg to $coerce with number is always NaN');
        example('$coerce(function(){}, "number")', 'NaN');
        before(read.blockBody[read.blockIndex]);

        const finalNode = AST.primitive(NaN);
        read.parentNode['arguments'][0] = finalNode;

        after(read.blockBody[read.blockIndex]);
        ++changes;
        return;
      } else {
        // If we do this before inlining builtin constants then it would serialize a function without the builtin tag as name. So we can't.
        todo('serialization of function, fallback if we know the function is not going to be a builtin...');
      }
    }

    if (at === 'array') {
      // jsfck and other obfuscation cases will try to convert an array to string because it's fun
      if (
        argMeta.isConstant &&
        argMeta.writes.length === 1 &&
        AST.isArraySerializable(argMeta, fdata, null, false)
      ) {
        // We should be able to build a local version of the array and then serialize that
        const shadow = getSerializableArrayParts(argMeta, fdata);
        if (kind === 'number') {
          rule('If we can serialize an array literal to number then we should');
          example('f(2 * [3])', 'f(6)');
          before(read.blockBody[read.blockIndex]);

          // There are some curious edge cases with arrays with numbers here ([]+1 = 1)
          const value = Number(shadow);
          const finalNode = AST.primitive(value);
          if (read.grandNode.type === 'VarStatement') read.grandNode.init = finalNode;
          else if (read.grandNode.type === 'ExpressionStatement' && read.parentNode.type === 'AssignmentExpression') read.parentNode.right = finalNode;
          else if (read.grandNode.type === 'ExpressionStatement' && read.grandNode.expression === read.parentNode) read.grandNode.expression = finalNode;
          else ASSERT(false, 'normalized code, one of these', read.grandNode.type, read.parentNode.type);

          after(read.blockBody[read.blockIndex]);
          ++changes;
          return;
        }
        else {
          // plustr (string concat) is the same as string (String()) in this case: it calls .join()
          rule('If we can serialize an array literal to string then we should');
          example('f("" + [3])', 'f("3")');
          before(read.blockBody[read.blockIndex]);

          // This should call .join() on the array
          const value = String(shadow);
          const finalNode = AST.primitive(value);
          if (read.grandNode.type === 'VarStatement') read.grandNode.init = finalNode;
          else if (read.grandNode.type === 'ExpressionStatement' && read.parentNode.type === 'AssignmentExpression') read.parentNode.right = finalNode;
          else if (read.grandNode.type === 'ExpressionStatement' && read.grandNode.expression === read.parentNode) read.grandNode.expression = finalNode;
          else ASSERT(false, 'normalized code, one of these', read.grandNode.type, read.parentNode.type);

          after(read.blockBody[read.blockIndex]);
          ++changes;
          return;
        }
      }
    }

    if (at === 'arguments') {
      if (kind === 'number') {
        rule('Coercing an `arguments` object to a number leads to NaN');
        example('function f() { return arguments + 1; }', 'function f() { return NaN;  }');
        before(read.blockBody[read.blockIndex]);

        const newNode = AST.primitive(NaN);
        if (read.grandIndex < 0) read.grandNode[read.grandProp] = newNode;
        else read.grandNode[read.grandProp][read.grandIndex] = newNode;

        after(read.blockBody[read.blockIndex]);
        ++changes;
        return;
      } else { // string or plustr
        rule('Coercing an `arguments` object leads to a predictable string');
        example('function f() { return arguments + 1; }', 'function f() { return "[object Arguments]";  }');
        before(read.blockBody[read.blockIndex]);

        const newNode = AST.primitive('[object Arguments]');
        if (read.grandIndex < 0) read.grandNode[read.grandProp] = newNode;
        else read.grandNode[read.grandProp][read.grandIndex] = newNode;

        after(read.blockBody[read.blockIndex]);
        ++changes;
        return;
      }
    }
  });

  return changes;
}
