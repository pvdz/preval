// Built-in symbol names and their `typeof` result

import {
  BUILTIN_ARRAY_METHODS_SYMBOLS, BUILTIN_BOOLEAN_METHODS_SYMBOLS, BUILTIN_FOR_IN_CALL_NAME, BUILTIN_FOR_OF_CALL_NAME,
  BUILTIN_FUNCTION_METHODS_SYMBOLS,
  BUILTIN_NUMBER_METHODS_SYMBOLS,
  BUILTIN_REGEXP_METHODS_SYMBOLS, BUILTIN_STRING_METHODS_SYMBOLS,
} from './constants.mjs';

// We have to set a max of unrolling infinite loops because we have to predefine their global constant value here.
// It's fine to up but would have to be upped in code. Can't pass this as an argument. Well. Not without changing smoe logic around first.
export const MAX_UNROLL_TRUE_COUNT = 1000;

const globalNames = new Map([
  ['clearInterval', 'function'],
  ['clearTimeout', 'function'],
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
  ['Function', 'function'],

  // NodeJS / Browser
  ['encodeURIComponent', 'function'],

  // nodejs
  ['module', 'object'],
  ['exports', 'undefined'], // for the react build
  ['define', 'undefined'], // for the react build
  ['require', 'undefined'], // for the react build
  ['Worker', 'undefined'], // for the react build
  ['Node', 'undefined'], // for the react build
  ['global', 'object'], // for the react build
  ['console', 'object'],
  // Note: these need to be added in the dotCall reverse transform
  ['$console_log', 'function'], // console.log support
  ['$console_warn', 'function'], // console.warn support
  ['$console_error', 'function'], // console.error support
  ['$console_dir', 'function'], // console.dir support
  ['$console_debug', 'function'], // console.debug support
  ['$console_time', 'function'], // console.time support
  ['$console_timeEnd', 'function'], // console.timeEnd support
  ['$console_group', 'function'], // console.group support
  ['$console_groupEnd', 'function'], // console.groupEnd support

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
  [BUILTIN_FOR_IN_CALL_NAME, BUILTIN_FOR_IN_CALL_NAME],
  [BUILTIN_FOR_OF_CALL_NAME, BUILTIN_FOR_OF_CALL_NAME],

  // Preval special aliases for builtins
  ['$ArrayPrototype', { mustBeType: 'object', mustBeFalsy: false, mustBeTruthy: true, mustBePrimitive: false }],
  ['$BooleanPrototype', { mustBeType: 'object', mustBeFalsy: false, mustBeTruthy: true, mustBePrimitive: false }],
  ['$FunctionPrototype', { mustBeType: 'function', mustBeFalsy: false, mustBeTruthy: true, mustBePrimitive: false }],
  ['$NumberPrototype', { mustBeType: 'object', mustBeFalsy: false, mustBeTruthy: true, mustBePrimitive: false }],
  ['$ObjectPrototype', { mustBeType: 'object', mustBeFalsy: false, mustBeTruthy: true, mustBePrimitive: false }],
  ['$RegExpPrototype', { mustBeType: 'object', mustBeFalsy: false, mustBeTruthy: true, mustBePrimitive: false }],
  ['$StringPrototype', { mustBeType: 'object', mustBeFalsy: false, mustBeTruthy: true, mustBePrimitive: false }],
  ...BUILTIN_ARRAY_METHODS_SYMBOLS.map(name => {
    return [name, { mustBeType: 'function', mustBeFalsy: false, mustBeTruthy: true, mustBePrimitive: false }];
  }),
  ...BUILTIN_BOOLEAN_METHODS_SYMBOLS.map(name => {
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

export const LOOP_UNROLL_CONSTANT_COUNT_PREFIX = '$LOOP_UNROLL_'; // TODO: replace usages
for (let i=0; i<=MAX_UNROLL_TRUE_COUNT; ++i) {
  // $LOOP_UNROLL_1 $LOOP_UNROLL_2 $LOOP_UNROLL_3 etc
  // Special symbols whose number suffix has semantic meaning. Ultimately they boil down to an alias for "true",
  // where the name implies that we can still unroll this infinite `while(true)` that many times, before bailing.
  // We can't set it to actual `true` though because then loop unrolling goes infinite.
  globalNames.set(`${LOOP_UNROLL_CONSTANT_COUNT_PREFIX}${i}`, { mustBeType: 'boolean', mustBeFalsy: false, mustBeTruthy: false, mustBePrimitive: true });
}
// $LOOP_DONE_UNROLLING_ALWAYS_TRUE
// "signals not to unroll any further. Cannot set this as "true" because that'll cause infinite loops when transforming.
export const MAX_UNROLL_CONSTANT_NAME = '$LOOP_DONE_UNROLLING_ALWAYS_TRUE'; // TODO: replace usages
globalNames.set(MAX_UNROLL_CONSTANT_NAME, { mustBeType: 'boolean', mustBeFalsy: false, mustBeTruthy: false, mustBePrimitive: true });

export default globalNames;
