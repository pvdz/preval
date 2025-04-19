// Built-in symbol names and their `typeof` result

import { SYMBOL_FORIN, SYMBOL_FOROF, SYMBOL_DOTCALL, BUILTIN_REST_HANDLER_NAME, SYMBOL_LOOP_UNROLL, SYMBOL_MAX_LOOP_UNROLL, SYMBOL_COERCE, } from './symbols_preval.mjs';
import { $JSON, ARRAY, BOOLEAN, BUFFER, DATE, FUNCTION, MATH, NUMBER, OBJECT, REGEXP, STRING, } from './symbols_builtins.mjs';

// We have to set a max of unrolling infinite loops because we have to predefine their global constant value here.
// It's fine to up but would have to be upped in code. Can't pass this as an argument. Well. Not without changing smoe logic around first.
export const MAX_UNROLL_TRUE_COUNT = 1000;

// Don't add preval symbols here. It's used for pcode/$free too
const BUILTIN_GLOBAL_FUNCS = [
  ['clearInterval', {mustBeType: 'function', mustBeFalsy: false, mustBeTruthy: true, mustBePrimitive: false, returns: undefined}],
  ['clearTimeout', {mustBeType: 'function', mustBeFalsy: false, mustBeTruthy: true, mustBePrimitive: false, returns: undefined}],
  ['parseInt', {mustBeType: 'function', mustBeFalsy: false, mustBeTruthy: true, mustBePrimitive: false, returns: 'number'}],
  ['parseFloat', {mustBeType: 'function', mustBeFalsy: false, mustBeTruthy: true, mustBePrimitive: false, returns: 'number'}],
  ['setInterval', 'function'],
  ['setTimeout', 'function'],
  ['isNaN', {mustBeType: 'function', mustBeFalsy: false, mustBeTruthy: true, mustBePrimitive: false, returns: 'boolean'}],
  ['eval', 'function'],
  ['isFinite', {mustBeType: 'function', mustBeFalsy: false, mustBeTruthy: true, mustBePrimitive: false, returns: 'boolean'}],
  ['Array', {mustBeType: 'function', mustBeFalsy: false, mustBeTruthy: true, mustBePrimitive: false, returns: 'array'}],
  ['Boolean', {mustBeType: 'function', mustBeFalsy: false, mustBeTruthy: true, mustBePrimitive: false, returns: 'boolean'}],
  ['Date', {mustBeType: 'function', mustBeFalsy: false, mustBeTruthy: true, mustBePrimitive: false, returns: 'date'}],
  ['Error', 'function'],
  ['JSON', 'object'],
  ['Math', 'object'],
  ['Map', {mustBeType: 'function', mustBeFalsy: false, mustBeTruthy: true, mustBePrimitive: false, returns: 'map'}],
  ['Number', {mustBeType: 'function', mustBeFalsy: false, mustBeTruthy: true, mustBePrimitive: false, returns: 'number'}],
  ['Object', 'function'],
  ['RegExp', {mustBeType: 'function', mustBeFalsy: false, mustBeTruthy: true, mustBePrimitive: false, returns: 'regex'}],
  ['Set', {mustBeType: 'function', mustBeFalsy: false, mustBeTruthy: true, mustBePrimitive: false, returns: 'set'}],
  ['String', {mustBeType: 'function', mustBeFalsy: false, mustBeTruthy: true, mustBePrimitive: false, returns: 'string'}],
  ['Function', {mustBeType: 'function', mustBeFalsy: false, mustBeTruthy: true, mustBePrimitive: false, returns: 'function'}],

  // NodeJS / Browser
  ['encodeURI', {mustBeType: 'function', mustBeFalsy: false, mustBeTruthy: true, mustBePrimitive: false, returns: 'string'}],
  ['decodeURI', {mustBeType: 'function', mustBeFalsy: false, mustBeTruthy: true, mustBePrimitive: false, returns: 'string'}],
  ['encodeURIComponent', {mustBeType: 'function', mustBeFalsy: false, mustBeTruthy: true, mustBePrimitive: false, returns: 'string'}],
  ['decodeURIComponent', {mustBeType: 'function', mustBeFalsy: false, mustBeTruthy: true, mustBePrimitive: false, returns: 'string'}],
  ['escape', {mustBeType: 'function', mustBeFalsy: false, mustBeTruthy: true, mustBePrimitive: false, returns: 'string'}],
  ['unescape', {mustBeType: 'function', mustBeFalsy: false, mustBeTruthy: true, mustBePrimitive: false, returns: 'string'}],
  ['btoa', {mustBeType: 'function', mustBeFalsy: false, mustBeTruthy: true, mustBePrimitive: false, returns: 'string'}],
  ['atob', {mustBeType: 'function', mustBeFalsy: false, mustBeTruthy: true, mustBePrimitive: false, returns: 'string'}],
  ['Buffer', 'function'],
];
export const BUILTIN_GLOBAL_FUNC_NAMES = new Set(BUILTIN_GLOBAL_FUNCS.map(arr => arr[0]));

/** @var {Map<string, MetaTypingObject | string>} The string maps to a default object **/
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
  ['console', 'object'],
  // Note: these need to be added in the dotCall reverse transform
  ['$console_log', {mustBeType: 'function', mustBeFalsy: false, mustBeTruthy: true, mustBePrimitive: false, returns: 'undefined'}], // console.log support
  ['$console_warn', {mustBeType: 'function', mustBeFalsy: false, mustBeTruthy: true, mustBePrimitive: false, returns: 'undefined'}], // console.warn support
  ['$console_error', {mustBeType: 'function', mustBeFalsy: false, mustBeTruthy: true, mustBePrimitive: false, returns: 'undefined'}], // console.error support
  ['$console_dir', {mustBeType: 'function', mustBeFalsy: false, mustBeTruthy: true, mustBePrimitive: false, returns: 'undefined'}], // console.dir support
  ['$console_debug', {mustBeType: 'function', mustBeFalsy: false, mustBeTruthy: true, mustBePrimitive: false, returns: 'undefined'}], // console.debug support
  ['$console_time', {mustBeType: 'function', mustBeFalsy: false, mustBeTruthy: true, mustBePrimitive: false, returns: 'undefined'}], // console.time support
  ['$console_timeEnd', {mustBeType: 'function', mustBeFalsy: false, mustBeTruthy: true, mustBePrimitive: false, returns: 'undefined'}], // console.timeEnd support
  ['$console_group', {mustBeType: 'function', mustBeFalsy: false, mustBeTruthy: true, mustBePrimitive: false, returns: 'undefined'}], // console.group support
  ['$console_groupEnd', {mustBeType: 'function', mustBeFalsy: false, mustBeTruthy: true, mustBePrimitive: false, returns: 'undefined'}], // console.groupEnd support

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

  ...Array.from(BOOLEAN.entries()).map(([sname, obj]) => [sname, {...obj.typings}]),
  ...Array.from(NUMBER.entries()).map(([sname, obj]) => [sname, {...obj.typings}]),
  ...Array.from(STRING.entries()).map(([sname, obj]) => [sname, {...obj.typings}]),
  ...Array.from(OBJECT.entries()).map(([sname, obj]) => [sname, {...obj.typings}]),
  ...Array.from(ARRAY.entries()).map(([sname, obj]) => [sname, {...obj.typings}]),
  ...Array.from(DATE.entries()).map(([sname, obj]) => [sname, {...obj.typings}]),
  ...Array.from(FUNCTION.entries()).map(([sname, obj]) => [sname, {...obj.typings}]),
  ...Array.from($JSON.entries()).map(([sname, obj]) => [sname, {...obj.typings}]),
  ...Array.from(MATH.entries()).map(([sname, obj]) => [sname, {...obj.typings}]),
  ...Array.from(REGEXP.entries()).map(([sname, obj]) => [sname, {...obj.typings}]),
  ...Array.from(BUFFER.entries()).map(([sname, obj]) => [sname, {...obj.typings}]),
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
