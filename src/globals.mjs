// Built-in symbol names and their `typeof` result

import {
  BUILTIN_ARRAY_METHODS_SYMBOLS,
  BUILTIN_FUNCTION_METHODS_SYMBOLS,
  BUILTIN_NUMBER_METHODS_SYMBOLS,
  BUILTIN_REGEXP_METHODS_SYMBOLS, BUILTIN_STRING_METHODS_SYMBOLS
} from "./constants.mjs"
import {MAX_UNROLL_COUNT} from "./reduce_static/unroll_loop_with_true.mjs"

const globalNames = new Map([
  ['clearInterval', 'function'],
  ['clearTimeout', 'function'],
  ['console', 'function'],
  ['parseInt', 'function'],
  ['parseFloat', 'function'],
  ['setInterval', 'function'],
  ['setTimeout', 'function'],
  ['undefined', { mustBeType: 'undefined', mustBeFalsy: true, mustBeTruthy: false, mustBePrimitive: true, primitiveValue: undefined }],
  ['Array', 'function'],
  ['Boolean', 'function'],
  ['Date', 'function'],
  ['Error', 'function'],
  ['Infinity', { mustBeType: 'number', mustBeFalsy: true, mustBeTruthy: false, mustBePrimitive: true, primitiveValue: Infinity }],
  ['JSON', 'object'],
  ['Math', 'object'],
  ['Map', 'function'],
  ['NaN', { mustBeType: 'number', mustBeFalsy: true, mustBeTruthy: false, mustBePrimitive: true, primitiveValue: NaN }],
  ['Number', 'function'],
  ['Object', 'function'],
  ['RegExp', 'function'],
  ['Set', 'function'],
  ['String', 'function'],

  // nodejs
  ['module', 'object'],
  ['exports', 'undefined'], // for the react build
  ['define', 'undefined'], // for the react build
  ['require', 'undefined'], // for the react build
  ['Worker', 'undefined'], // for the react build
  ['Node', 'undefined'], // for the react build
  ['global', 'object'], // for the react build

  // browser
  ['window', 'undefined'], // for the react build
  ['document', 'undefined'], // for the react build
  ['self', 'undefined'], // for the react build

  // special to Preval
  ['$', '$'], // Do we want to tell Preval that it's a function?
  ['$spy', '$spy'], // Do we want to tell Preval that it's a function?
  ['objPatternRest', 'function'], // Should we tell Preval this is a function?
  ['$dotCall', 'function'], // Should we tell Preval this is a function?
  ['$coerce', '$coerce'], // dito

  // Preval special aliases for builtins
  ['$ArrayPrototype', { mustBeType: 'object', mustBeFalsy: false, mustBeTruthy: true, mustBePrimitive: false }],
  ['$FunctionPrototype', { mustBeType: 'function', mustBeFalsy: false, mustBeTruthy: true, mustBePrimitive: false }],
  ['$NumberPrototype', { mustBeType: 'object', mustBeFalsy: false, mustBeTruthy: true, mustBePrimitive: false }],
  ['$ObjectPrototype', { mustBeType: 'object', mustBeFalsy: false, mustBeTruthy: true, mustBePrimitive: false }],
  ['$RegExpPrototype', { mustBeType: 'object', mustBeFalsy: false, mustBeTruthy: true, mustBePrimitive: false }],
  ['$StringPrototype', { mustBeType: 'object', mustBeFalsy: false, mustBeTruthy: true, mustBePrimitive: false }],
  ...BUILTIN_ARRAY_METHODS_SYMBOLS.map(name => {
    return [name, { mustBeType: 'function', mustBeFalsy: false, mustBeTruthy: true, mustBePrimitive: false }];
  }),
  ...BUILTIN_FUNCTION_METHODS_SYMBOLS.map(name => {
    return [name, { mustBeType: 'function', mustBeFalsy: false, mustBeTruthy: true, mustBePrimitive: false }];
  }),
  ...BUILTIN_NUMBER_METHODS_SYMBOLS.map(name => {
    return [name, { mustBeType: 'function', mustBeFalsy: false, mustBeTruthy: true, mustBePrimitive: false }];
  }),
  ...BUILTIN_REGEXP_METHODS_SYMBOLS.map(name => {
    return [name, { mustBeType: 'function', mustBeFalsy: false, mustBeTruthy: true, mustBePrimitive: false }];
  }),
  ...BUILTIN_STRING_METHODS_SYMBOLS.map(name => {
    return [name, { mustBeType: 'function', mustBeFalsy: false, mustBeTruthy: true, mustBePrimitive: false }];
  }),
]);

for (let i=0; i<=MAX_UNROLL_COUNT; ++i) {
  // $LOOP_UNROLL_1 $LOOP_UNROLL_2 $LOOP_UNROLL_3 etc
  // Special symbols whose number suffix has semantic meaning. Ultimately they boil down to an alias for "true",
  // where the name implies that we can still unroll this infinite `while(true)` that many times, before bailing.
  // We can't set it to actual `true` though because then loop unrolling goes infinite.
  globalNames.set(`$LOOP_UNROLL_${i}`, { mustBeType: 'boolean', mustBeFalsy: false, mustBeTruthy: false, mustBePrimitive: true });
}
// $LOOP_DONE_UNROLLING_ALWAYS_TRUE_5
// "signals not to unroll any further. Cannot set this as "true" because that'll cause infinite loops when transforming.
globalNames.set(`$LOOP_DONE_UNROLLING_ALWAYS_TRUE`, { mustBeType: 'boolean', mustBeFalsy: false, mustBeTruthy: false, mustBePrimitive: true });

export default globalNames;
