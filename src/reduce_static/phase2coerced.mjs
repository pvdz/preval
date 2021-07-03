// Find all cases of $coerce and use type information to check whether their arg is already a known primitive of any kind.

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
  coerce,
  findBodyOffset,
} from '../utils.mjs';
import * as AST from '../ast.mjs';

export function coercials(fdata) {
  group('\n\n\nFind cases of $coerce to eliminate');
  //vlog('\nCurrent state\n--------------\n' + fmat(tmat(fdata.tenkoOutput.ast)) + '\n--------------\n');
  const r = _coercials(fdata);
  groupEnd();
  return r;
}
function _coercials(fdata) {
  let changes = 0;
  const meta = fdata.globallyUniqueNamingRegistry.get('$coerce');
  meta.reads.forEach((read, ri) => {
    ASSERT(read.parentNode.type === 'CallExpression', 'when else does $coerce appear??', read.parentNode);
    ASSERT(read.parentProp === 'callee', 'should always be called', read.parentNode);

    const argNode = read.parentNode['arguments'][0];
    const kind = AST.getPrimitiveValue(read.parentNode['arguments'][1]);

    if (AST.isPrimitive(argNode)) {
      vlog('Arg is already a primitive. Drop it now');
      rule('Calling $coerce with a primitive can be resolved');
      example('$coerce(500.123, "string");', '"500.123";');
      example('$coerce(500.123, "number");', '500.123;');
      example('$coerce("500.123", "plustr");', '"500.123";');
      before(read.parentNode, read.blockBody[read.blockIndex]);

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

      after(read.parentNode, read.blockBody[read.blockIndex]);
      ++changes;
    }

    if (argNode.type !== 'Identifier') {
      // TODO: if it's not a primitive and not an identifier, what is it and can we maybe still resolve it?
      return;
    }

    const argName = argNode.name;

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
        example('f(0 + String);', 'f("0function Object() { [native code] }");', () => argName === 'Object');
        example('f(0 + String);', 'f("0function Boolean() { [native code] }");', () => argName === 'Boolean');
        example('f(0 + String);', 'f("0function Number() { [native code] }");', () => argName === 'Number');
        example('f(0 + String);', 'f("0function String() { [native code] }");', () => argName === 'String');
        example('f(0 + String);', 'f("0function RegExp() { [native code] }");', () => argName === 'RegExp');
        before(read.node, read.blockBody[read.blockIndex]);

        ASSERT(['number', 'string', 'plustr'].includes(kind), 'result is the same no matter the kind', kind);
        const finalNode = AST.primitive('function ' + argName + '() { [native code] }');
        read.parentNode['arguments'][0] = finalNode;

        after(finalNode, read.blockBody[read.blockIndex]);
        ++changes;
        return;
      }
    }

    const argMeta = fdata.globallyUniqueNamingRegistry.get(argName);
    const at = argMeta.typing.mustBeType;
    // Note: null and undefined are actual values. Let normalize clean those up.

    if (at === 'number' && kind === 'plustr') {
      rule('Calling $coerce on a value that is a number when asking for plustr can be changed to want a string');
      example('const x = +y; $coerce(y, "plustr");', 'const x = +y; $coerce(y, "string");');
      before(read.parentNode, read.blockBody[read.blockIndex]);

      read.parentNode['arguments'][1] = AST.primitive('string');

      after(argNode, read.blockBody[read.blockIndex]);
      ++changes;
      // Allow next checks to scan this change
    }

    if (kind === 'plustr' && read.grandNode.type === 'ExpressionStatement') {
      rule('Calling $coerce with plustr as a statement should just coerce to number');
      example('const x = +y; $coerce(y, "plustr");', 'const x = +y; $coerce(y, "string");');
      before(read.parentNode, read.blockBody[read.blockIndex]);

      read.parentNode['arguments'][1] = AST.primitive('number'); // The string part does not spy since it applies to a primitive

      after(argNode, read.blockBody[read.blockIndex]);
      ++changes;

      // Allow next checks to scan this change
    }

    if ((at === 'number' && kind === 'number') || (at === 'string' && kind === 'string')) {
      rule('Calling $coerce on a value that is already of target type is a noop');
      example('const x = +y; $coerce(y, "number");', 'const x = +y; y;');
      before(read.parentNode, read.blockBody[read.blockIndex]);

      if (read.grandIndex < 0) read.grandNode[read.grandProp] = argNode;
      else read.grandNode[read.grandProp][read.grandIndex] = argNode;

      after(argNode, read.blockBody[read.blockIndex]);
      ++changes;
    }

    if (argMeta.typing.mustBeType === 'regex') {
      if (argMeta.typing.mustBeValue || argMeta.constValueRef?.node?.raw) {
        rule('A regex as arg to $coerce can be resolved');
        example('$coerce(/foo/, "number")', 'NaN');
        example('$coerce(/foo/, "string")', '"/foo/"');
        example('$coerce(/foo/, "plustr")', '"/foo/"');
        before(read.node, read.blockBody);

        const finalNode = AST.primitive(coerce(argMeta.typing.mustBeValue || argMeta.constValueRef.node.raw, kind));
        read.parentNode['arguments'][0] = finalNode;

        after(finalNode, read.blockBody);
        ++changes;
        return;
      }
    }

    // tbf these are mostly for jsf*ck cases :)
    switch (argMeta.typing.builtinTag) {
      case 'Array#filter': {
        // This is a one-of example which serves to unravel the jsf*ck code (which uses Array#filter)
        rule('Having `Array#filter` in $coerce can be resolved');
        example('f($coerce(Array.prototype.filter. "plustr"))', 'f("function filter() { [native code] }")');
        before(read.node, read.blockBody[read.blockIndex]);

        const finalNode = AST.primitive('function filter() { [native code] }');
        read.parentNode['arguments'][0] = finalNode;

        after(finalNode, read.blockBody[read.blockIndex]);
        ++changes;
        return;
      }
      case 'Array#flat': {
        // This is a one-of example which serves to unravel the jsf*ck code (which uses Array#flat)
        rule('Having `Array#flat` in $coerce can be resolved');
        example('f($coerce(Array.prototype.flat. "plustr"))', 'f("function flat() { [native code] }")');
        before(read.node, read.blockBody[read.blockIndex]);

        const finalNode = AST.primitive('function flat() { [native code] }');
        read.parentNode['arguments'][0] = finalNode;

        after(finalNode, read.blockBody[read.blockIndex]);
        ++changes;
        return;
      }
    }
  });

  if (changes) {
    log('IsPrimitives eliminated:', changes, '. Restarting from phase1 to fix up read/write registry');
    return 'phase1';
  }
  log('IsPrimitives eliminated: 0.');
}
