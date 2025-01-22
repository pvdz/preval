// Built-in symbol names and their `typeof` result

import {
  SYMBOL_FORIN,
  SYMBOL_FOROF,
  SYMBOL_DOTCALL,
  BUILTIN_REST_HANDLER_NAME,
  SYMBOL_LOOP_UNROLL,
  SYMBOL_MAX_LOOP_UNROLL, SYMBOL_COERCE,
} from './symbols_preval.mjs';
import {
  BUILTIN_ARRAY_METHODS_SYMBOLS,
  BUILTIN_ARRAY_STATIC_SYMBOLS,
  BUILTIN_BOOLEAN_METHODS_SYMBOLS,
  BUILTIN_BOOLEAN_STATIC_SYMBOLS,
  BUILTIN_DATE_METHODS_SYMBOLS,
  BUILTIN_DATE_STATIC_SYMBOLS,
  BUILTIN_FUNCTION_METHODS_SYMBOLS,
  BUILTIN_FUNCTION_STATIC_SYMBOLS,
  BUILTIN_JSON_STATIC_SYMBOLS,
  BUILTIN_MATH_STATIC_SYMBOLS,
  BUILTIN_NUMBER_METHODS_SYMBOLS,
  BUILTIN_NUMBER_STATIC_SYMBOLS,
  BUILTIN_OBJECT_METHODS_SYMBOLS,
  BUILTIN_OBJECT_STATIC_SYMBOLS,
  BUILTIN_REGEXP_METHODS_SYMBOLS,
  BUILTIN_REGEXP_STATIC_SYMBOLS,
  BUILTIN_STRING_METHODS_SYMBOLS,
  BUILTIN_STRING_STATIC_SYMBOLS,
} from './symbols_builtins.mjs';

// We have to set a max of unrolling infinite loops because we have to predefine their global constant value here.
// It's fine to up but would have to be upped in code. Can't pass this as an argument. Well. Not without changing smoe logic around first.
export const MAX_UNROLL_TRUE_COUNT = 1000;

// Don't add preval symbols here. It's used for pcode/$free too
const BUILTIN_GLOBAL_FUNCS = [
  ['clearInterval', 'function'],
  ['clearTimeout', 'function'],
  ['parseInt', 'function'],
  ['parseFloat', 'function'],
  ['setInterval', 'function'],
  ['setTimeout', 'function'],
  ['isNaN', 'function'],
  ['eval', 'function'],
  ['isFinite', 'function'],
  ['Array', 'function'],
  ['Boolean', 'function'],
  ['Date', 'function'],
  ['Error', 'function'],
  ['JSON', 'object'],
  ['Math', 'object'],
  ['Map', 'function'],
  ['Number', 'function'],
  ['Object', 'function'],
  ['RegExp', 'function'],
  ['Set', 'function'],
  ['String', 'function'],
  ['Function', 'function'],

  // NodeJS / Browser
  ['encodeURI', 'function'],
  ['decodeURI', 'function'],
  ['encodeURIComponent', 'function'],
  ['decodeURIComponent', 'function'],
  ['escape', 'function'],
  ['unescape', 'function'],
  ['btoa', 'function'],
  ['atob', 'function'],
  ['Buffer', 'function'],
];
export const BUILTIN_GLOBAL_FUNC_NAMES = new Set(BUILTIN_GLOBAL_FUNCS.map(arr => arr[0]));

const globalNames = new Map([
  ...BUILTIN_GLOBAL_FUNCS,

  ['undefined', { mustBeType: 'undefined', mustBeFalsy: true, mustBeTruthy: false, mustBePrimitive: true, primitiveValue: undefined }],
  ['NaN', { mustBeType: 'number', mustBeFalsy: true, mustBeTruthy: false, mustBePrimitive: true, primitiveValue: NaN }],
  ['Infinity', { mustBeType: 'number', mustBeFalsy: true, mustBeTruthy: false, mustBePrimitive: true, primitiveValue: Infinity }],

  // nodejs
  ['module', 'object'],
  ['exports', 'undefined'], // for the react build
  ['define', 'undefined'], // for the react build
  ['require', 'undefined'], // for the react build
  ['Worker', 'undefined'], // for the react build
  ['Node', 'undefined'], // for the react build
  ['global', 'object'], // for the react build
  ['$Buffer_from', 'function'], // For $dot_call
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
  [BUILTIN_REST_HANDLER_NAME, 'function'], // Should we tell Preval this is a function?
  [SYMBOL_DOTCALL, 'function'], // Should we tell Preval this is a function?
  [SYMBOL_COERCE, SYMBOL_COERCE], // dito
  [SYMBOL_FORIN, SYMBOL_FORIN],
  [SYMBOL_FOROF, SYMBOL_FOROF],

  ...BUILTIN_BOOLEAN_STATIC_SYMBOLS.map(name => {
    if (name === 'prototype') return { mustBeType: 'object', mustBeFalsy: false, mustBeTruthy: true, mustBePrimitive: false };
    return [name, { mustBeType: 'function', mustBeFalsy: false, mustBeTruthy: true, mustBePrimitive: false }];
  }),
  ...BUILTIN_BOOLEAN_METHODS_SYMBOLS.map(name => {
    return [name, { mustBeType: 'function', mustBeFalsy: false, mustBeTruthy: true, mustBePrimitive: false }];
  }),
  ...BUILTIN_NUMBER_STATIC_SYMBOLS.map(name => {
    switch (name) {
      // TODO: not sure we should set the mustBeValue for these. We should not inline floats and dangerous numbers.
      case 'EPSILON': return { mustBeType: 'number', mustBeFalsy: false, mustBeTruthy: true, mustBePrimitive: true, mustBeValue: Number.EPSILON };
      case 'MAX_SAFE_INTEGER': return { mustBeType: 'number', mustBeFalsy: false, mustBeTruthy: true, mustBePrimitive: true, mustBeValue: Number.MAX_SAFE_INTEGER };
      case 'MAX_VALUE': return { mustBeType: 'number', mustBeFalsy: false, mustBeTruthy: true, mustBePrimitive: true, mustBeValue: Number.MAX_VALUE };
      case 'MIN_SAFE_INTEGER': return { mustBeType: 'number', mustBeFalsy: false, mustBeTruthy: true, mustBePrimitive: true, mustBeValue: Number.MIN_SAFE_INTEGER };
      case 'MIN_VALUE': return { mustBeType: 'number', mustBeFalsy: false, mustBeTruthy: true, mustBePrimitive: true, mustBeValue: Number.MIN_VALUE };
      case 'NaN': return { mustBeType: 'number', mustBeFalsy: true, mustBeTruthy: false, mustBePrimitive: true, mustBeValue: Number.NaN };
      case 'NEGATIVE_INFINITY': return { mustBeType: 'number', mustBeFalsy: false, mustBeTruthy: true, mustBePrimitive: true, mustBeValue: Number.NEGATIVE_INFINITY };
      case 'POSITIVE_INFINITY': return { mustBeType: 'number', mustBeFalsy: false, mustBeTruthy: true, mustBePrimitive: true, mustBeValue: Number.POSITIVE_INFINITY };
    }
    return [name, { mustBeType: 'function', mustBeFalsy: false, mustBeTruthy: true, mustBePrimitive: false }];
  }),
  ...BUILTIN_NUMBER_METHODS_SYMBOLS.map(name => {
    return [name, { mustBeType: 'function', mustBeFalsy: false, mustBeTruthy: true, mustBePrimitive: false }];
  }),
  ...BUILTIN_STRING_STATIC_SYMBOLS.map(name => {
    if (name === 'prototype') return { mustBeType: 'object', mustBeFalsy: false, mustBeTruthy: true, mustBePrimitive: false };
    return [name, { mustBeType: 'function', mustBeFalsy: false, mustBeTruthy: true, mustBePrimitive: false }];
  }),
  ...BUILTIN_STRING_METHODS_SYMBOLS.map(name => {
    return [name, { mustBeType: 'function', mustBeFalsy: false, mustBeTruthy: true, mustBePrimitive: false }];
  }),
  ...BUILTIN_OBJECT_STATIC_SYMBOLS.map(name => {
    if (name === 'prototype') return { mustBeType: 'object', mustBeFalsy: false, mustBeTruthy: true, mustBePrimitive: false };
    return [name, { mustBeType: 'function', mustBeFalsy: false, mustBeTruthy: true, mustBePrimitive: false }];
  }),
  ...BUILTIN_OBJECT_METHODS_SYMBOLS.map(name => {
    return [name, { mustBeType: 'function', mustBeFalsy: false, mustBeTruthy: true, mustBePrimitive: false }];
  }),
  ...BUILTIN_ARRAY_STATIC_SYMBOLS.map(name => {
    if (name === 'prototype') return { mustBeType: 'array', mustBeFalsy: false, mustBeTruthy: true, mustBePrimitive: false };
    return [name, { mustBeType: 'function', mustBeFalsy: false, mustBeTruthy: true, mustBePrimitive: false }];
  }),
  ...BUILTIN_ARRAY_METHODS_SYMBOLS.map(name => {
    return [name, { mustBeType: 'function', mustBeFalsy: false, mustBeTruthy: true, mustBePrimitive: false }];
  }),
  ...BUILTIN_FUNCTION_STATIC_SYMBOLS.map(name => {
    if (name === 'prototype') return { mustBeType: 'function', mustBeFalsy: false, mustBeTruthy: true, mustBePrimitive: false };
    return [name, { mustBeType: 'function', mustBeFalsy: false, mustBeTruthy: true, mustBePrimitive: false }];
  }),
  ...BUILTIN_FUNCTION_METHODS_SYMBOLS.map(name => {
    return [name, { mustBeType: 'function', mustBeFalsy: false, mustBeTruthy: true, mustBePrimitive: false }];
  }),
  ...BUILTIN_DATE_STATIC_SYMBOLS.map(name => {
    if (name === 'prototype') return { mustBeType: 'object', mustBeFalsy: false, mustBeTruthy: true, mustBePrimitive: false };
    return [name, { mustBeType: 'function', mustBeFalsy: false, mustBeTruthy: true, mustBePrimitive: false }];
  }),
  ...BUILTIN_DATE_METHODS_SYMBOLS.map(name => {
    return [name, { mustBeType: 'function', mustBeFalsy: false, mustBeTruthy: true, mustBePrimitive: false }];
  }),
  ...BUILTIN_JSON_STATIC_SYMBOLS.map(name => {
    return [name, { mustBeType: 'function', mustBeFalsy: false, mustBeTruthy: true, mustBePrimitive: false }];
  }),
  ...BUILTIN_MATH_STATIC_SYMBOLS.map(name => {
    if (['E', 'LN10', 'LN2', 'LOG10E', 'LOG2E', 'PI', 'SQRT1_2', 'SQRT2'].includes(name)) {
      return [name, { mustBeType: 'number', mustBeFalsy: false, mustBeTruthy: true, mustBePrimitive: true, mustBeValue: Math[name] }];
    }
    return [name, { mustBeType: 'function', mustBeFalsy: false, mustBeTruthy: true, mustBePrimitive: false }];
  }),
  ...BUILTIN_REGEXP_STATIC_SYMBOLS.map(name => {
    if (name === 'prototype') return { mustBeType: 'object', mustBeFalsy: false, mustBeTruthy: true, mustBePrimitive: false };
    return [name, { mustBeType: 'function', mustBeFalsy: false, mustBeTruthy: true, mustBePrimitive: false }];
  }),
  ...BUILTIN_REGEXP_METHODS_SYMBOLS.map(name => {
    return [name, { mustBeType: 'function', mustBeFalsy: false, mustBeTruthy: true, mustBePrimitive: false }];
  }),
]);

for (let i=0; i<=MAX_UNROLL_TRUE_COUNT; ++i) {
  // $LOOP_UNROLL_1 $LOOP_UNROLL_2 $LOOP_UNROLL_3 etc
  // Special symbols whose number suffix has semantic meaning. Ultimately they boil down to an alias for "true",
  // where the name implies that we can still unroll this infinite `while(true)` that many times, before bailing.
  // We can't set it to actual `true` though because then loop unrolling goes infinite.
  globalNames.set(`${SYMBOL_LOOP_UNROLL}${i}`, { mustBeType: 'boolean', mustBeFalsy: false, mustBeTruthy: false, mustBePrimitive: true });
}
// $LOOP_DONE_UNROLLING_ALWAYS_TRUE
// "signals not to unroll any further. Cannot set this as "true" because that'll cause infinite loops when transforming.
globalNames.set(SYMBOL_MAX_LOOP_UNROLL, { mustBeType: 'boolean', mustBeFalsy: false, mustBeTruthy: false, mustBePrimitive: true });

export default globalNames;
