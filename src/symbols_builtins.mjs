// Preval symbols representing JS built-ins

// The following convention is to used:
// - Capitalize construct name for static members
// - Lower cased construct name for prototype members
// For example: $String_fromCharCode vs $string_charCodeAt
//
// Every class should expose an object with static and prototype members and a reverse lookup

/**
 *    Boolean
 */


export const BUILTIN_BOOLEAN_PROTOTYPE = '$BooleanPrototype';
export const BUILTIN_BOOLEAN_STATIC_LOOKUP = {
  prototype: BUILTIN_BOOLEAN_PROTOTYPE,
};
export const BUILTIN_BOOLEAN_METHOD_LOOKUP = {
  toString: '$Boolean_toString',
};
export const BUILTIN_BOOLEAN_METHOD_LOOKUP_REV = Object.keys(BUILTIN_BOOLEAN_METHOD_LOOKUP).reduce((obj, key) => { obj[BUILTIN_BOOLEAN_METHOD_LOOKUP[key]] = key; return obj; }, {})
export const BUILTIN_BOOLEAN_METHODS_SUPPORTED = Object.keys(BUILTIN_BOOLEAN_METHOD_LOOKUP);
export const BUILTIN_BOOLEAN_METHODS_SYMBOLS = Object.values(BUILTIN_BOOLEAN_METHOD_LOOKUP);
export const BUILTIN_BOOLEAN_STATIC_SYMBOLS = Object.values(BUILTIN_BOOLEAN_STATIC_LOOKUP);


/**
 *    Number
 */


export const BUILTIN_NUMBER_PROTOTYPE = '$NumberPrototype';
export const BUILTIN_NUMBER_STATIC_LOOKUP = {
  EPSILON: '$Number_EPSILON',
  MAX_SAFE_INTEGER: '$Number_MAX_SAFE_INTEGER',
  MAX_VALUE: '$Number_MAX_VALUE',
  MIN_SAFE_INTEGER: '$Number_MIN_SAFE_INTEGER',
  MIN_VALUE: '$Number_MIN_VALUE',
  NaN: '$Number_NaN',
  NEGATIVE_INFINITY: '$Number_NEGATIVE_INFINITY',
  POSITIVE_INFINITY: '$Number_POSITIVE_INFINITY',
  isFinite: '$Number_isFinite',
  isInteger: '$Number_isInteger',
  isNaN: '$Number_isNaN',
  isSafeInteger: '$Number_isSafeInteger',
  parseFloat: '$Number_parseFloat',
  parseInt: '$Number_parseInt',
  prototype: BUILTIN_NUMBER_PROTOTYPE,
};
export const BUILTIN_NUMBER_METHOD_LOOKUP = {
  toExponential: '$number_toExponential',
  toFixed: '$number_toFixed',
  toLocaleString: '$number_toLocaleString',
  toPrecision: '$number_toPrecision',
  toString: '$number_toString',
  valueOf: '$number_valueOf',
};
export const BUILTIN_NUMBER_METHOD_LOOKUP_REV = Object.keys(BUILTIN_NUMBER_METHOD_LOOKUP).reduce((obj, key) => { obj[BUILTIN_NUMBER_METHOD_LOOKUP[key]] = key; return obj; }, {})
export const BUILTIN_NUMBER_METHODS_SUPPORTED = Object.keys(BUILTIN_NUMBER_METHOD_LOOKUP);
export const BUILTIN_NUMBER_METHODS_SYMBOLS = Object.values(BUILTIN_NUMBER_METHOD_LOOKUP);
export const BUILTIN_NUMBER_STATIC_LOOKUP_REV = Object.keys(BUILTIN_NUMBER_STATIC_LOOKUP).reduce((obj, key) => { obj[BUILTIN_NUMBER_STATIC_LOOKUP[key]] = key; return obj; }, {})
export const BUILTIN_NUMBER_STATIC_SYMBOLS = Object.values(BUILTIN_NUMBER_STATIC_LOOKUP);


/**
 *      String
 */


export const BUILTIN_STRING_PROTOTYPE = '$StringPrototype';
export const BUILTIN_STRING_STATIC_LOOKUP = {
  fromCharCode: '$String_fromCharCode',
  fromCodePoint: '$String_fromCodePoint',
  prototype: BUILTIN_STRING_PROTOTYPE,
  raw: '$String_raw',
};
export const BUILTIN_STRING_METHOD_LOOKUP = {
  charAt: '$string_charAt',
  charCodeAt: '$string_charCodeAt',
  concat: '$string_concat',
  includes: '$string_includes',
  indexOf: '$string_indexOf',
  lastIndexOf: '$string_lastIndexOf',
  match: '$string_match',
  replace: '$string_replace',
  slice: '$string_slice',
  split: '$string_split',
  substring: '$string_substring',
  substr: '$string_substr',
  toString: '$string_toString',
  toLowerCase: '$string_toLowerCase',
  toUpperCase: '$string_toUpperCase',
};
export const BUILTIN_STRING_METHOD_LOOKUP_REV = Object.keys(BUILTIN_STRING_METHOD_LOOKUP).reduce((obj, key) => { obj[BUILTIN_STRING_METHOD_LOOKUP[key]] = key; return obj; }, {})
export const BUILTIN_STRING_METHODS_SUPPORTED = Object.keys(BUILTIN_STRING_METHOD_LOOKUP);
export const BUILTIN_STRING_METHODS_SYMBOLS = Object.values(BUILTIN_STRING_METHOD_LOOKUP);
export const BUILTIN_STRING_STATIC_LOOKUP_REV = Object.keys(BUILTIN_STRING_STATIC_LOOKUP).reduce((obj, key) => { obj[BUILTIN_STRING_STATIC_LOOKUP[key]] = key; return obj; }, {})
export const BUILTIN_STRING_STATIC_SYMBOLS = Object.values(BUILTIN_STRING_STATIC_LOOKUP);


/**
 *      Object
 */


export const BUILTIN_OBJECT_PROTOTYPE = '$ObjectPrototype';
export const BUILTIN_OBJECT_STATIC_LOOKUP = {
  assign: '$Object_assign',
  create: '$Object_create',
  defineProperty: '$Object_defineProperty',
  defineProperties: '$Object_defineProperties',
  entries: '$Object_entries',
  freeze: '$Object_freeze',
  fromEntries: '$Object_fromEntries',
  getOwnPropertyDescriptor: '$Object_getOwnPropertyDescriptor',
  getOwnPropertyDescriptors: '$Object_getOwnPropertyDescriptors',
  getOwnPropertyNames: '$Object_getOwnPropertyNames',
  getPrototypeOf: '$Object_getPrototypeOf',
  is: '$Object_is',
  isExtensible: '$Object_isExtensible',
  isFrozen: '$Object_isFrozen',
  isSealed: '$Object_isSealed',
  keys: '$Object_keys',
  preventExtensions: '$Object_preventExtensions',
  prototype: BUILTIN_OBJECT_PROTOTYPE,
  seal: '$Object_seal',
  setPrototypeOf: '$Object_setPrototypeOf',
}
export const BUILTIN_OBJECT_METHOD_LOOKUP = {
  //constructor: '$object_constructor',
  hasOwnProperty: '$object_hasOwnProperty',
  isPrototypeOf: '$object_isPrototypeOf',
  propertyIsEnumerable: '$object_propertyIsEnumerable',
  toLocaleString: '$object_toLocaleString',
  toString: '$object_toString',
  valueOf: '$object_valueOf',
};
export const BUILTIN_OBJECT_METHOD_LOOKUP_REV = Object.keys(BUILTIN_OBJECT_METHOD_LOOKUP).reduce((obj, key) => { obj[BUILTIN_OBJECT_METHOD_LOOKUP[key]] = key; return obj; }, {})
export const BUILTIN_OBJECT_METHODS_SUPPORTED = Object.keys(BUILTIN_OBJECT_METHOD_LOOKUP);
export const BUILTIN_OBJECT_METHODS_SYMBOLS = Object.values(BUILTIN_OBJECT_METHOD_LOOKUP);
export const BUILTIN_OBJECT_STATIC_LOOKUP_REV = Object.keys(BUILTIN_OBJECT_STATIC_LOOKUP).reduce((obj, key) => { obj[BUILTIN_OBJECT_STATIC_LOOKUP[key]] = key; return obj; }, {})
export const BUILTIN_OBJECT_STATIC_SYMBOLS = Object.values(BUILTIN_OBJECT_STATIC_LOOKUP);


/**
 *      Array
 */


export const BUILTIN_ARRAY_PROTOTYPE = '$ArrayPrototype';
export const BUILTIN_ARRAY_STATIC_LOOKUP = {
  from: '$Array_from',
  isArray: '$Array_isArray',
  of: '$Array_of',
  prototype: BUILTIN_ARRAY_PROTOTYPE,
};
export const BUILTIN_ARRAY_METHOD_LOOKUP = {
  concat: '$array_concat',
  copyWithin: '$array_copyWithin',
  entries: '$array_entries',
  every: '$array_every',
  fill: '$array_fill',
  filter: '$array_filter',
  find: '$array_find',
  findIndex: '$array_findIndex',
  flat: '$array_flat',
  forEach: '$array_forEach',
  includes: '$array_includes',
  indexOf: '$array_indexOf',
  join: '$array_join',
  keys: '$array_keys',
  lastIndexOf: '$array_lastIndexOf',
  //length: '$array_length', // No! this is an instance bound value, not a global built-in constant
  map: '$array_map',
  pop: '$array_pop',
  push: '$array_push',
  reduce: '$array_reduce',
  reduceRight: '$array_reduceRight',
  reverse: '$array_reverse',
  shift: '$array_shift',
  slice: '$array_slice',
  splice: '$array_splice',
  sort: '$array_sort',
  toLocaleString: '$array_toLocaleString',
  toString: '$array_toString',
  unshift: '$array_unshift',
  values: '$array_values',
};
export const BUILTIN_ARRAY_METHOD_LOOKUP_REV = Object.keys(BUILTIN_ARRAY_METHOD_LOOKUP).reduce((obj, key) => { obj[BUILTIN_ARRAY_METHOD_LOOKUP[key]] = key; return obj; }, {})
export const BUILTIN_ARRAY_METHODS_SUPPORTED = Object.keys(BUILTIN_ARRAY_METHOD_LOOKUP);
export const BUILTIN_ARRAY_METHODS_SYMBOLS = Object.values(BUILTIN_ARRAY_METHOD_LOOKUP);
export const BUILTIN_ARRAY_STATIC_LOOKUP_REV = Object.keys(BUILTIN_ARRAY_STATIC_LOOKUP).reduce((obj, key) => { obj[BUILTIN_ARRAY_STATIC_LOOKUP[key]] = key; return obj; }, {})
export const BUILTIN_ARRAY_STATIC_SYMBOLS = Object.values(BUILTIN_ARRAY_STATIC_LOOKUP);


/**
 *      Date
 */


export const BUILTIN_DATE_PROTOTYPE = '$DatePrototype';
export const BUILTIN_DATE_STATIC_LOOKUP = {
  now: '$Date_now',
  parse: '$Date_parse',
  prototype: BUILTIN_DATE_PROTOTYPE,
  UTC: '$Date_UTC',
};
export const BUILTIN_DATE_METHOD_LOOKUP = {
  getDate: '$date_getDate',
  getDay: '$date_getDay',
  getFullYear: '$date_getFullYear',
  getHours: '$date_getHours',
  getMilliseconds: '$date_getMilliseconds',
  getMinutes: '$date_getMinutes',
  getMonth: '$date_getMonth',
  getSeconds: '$date_getSeconds',
  getTime: '$date_getTime',
  getUTCDate: '$date_getUTCDate',
  getUTCDay: '$date_getUTCDay',
  getUTCFullYear: '$date_getUTCFullYear',
  getUTCHours: '$date_getUTCHours',
  getUTCMilliseconds: '$date_getUTCMilliseconds',
  getUTCMinutes: '$date_getUTCMinutes',
  getUTCSeconds: '$date_getUTCSeconds',
  setDate: '$date_setDate',
  setFullYear: '$date_setFullYear',
  setHours: '$date_setHours',
  setMilliseconds: '$date_setMilliseconds',
  setMinutes: '$date_setMinutes',
  setMonth: '$date_setMonth',
  setSeconds: '$date_setSeconds',
  setTime: '$date_setTime',
  toDateString: '$date_toDateString',
  toISOString: '$date_toISOString',
  toJSON: '$date_toJSON',
  toLocaleDateString: '$date_toLocaleDateString',
  toLocaleString: '$date_toLocaleString',
  toLocaleTimeString: '$date_toLocaleTimeString',
  toString: '$date_toString',
  toTimeString: '$date_toTimeString',
  valueOf: '$date_valueOf',
};
export const BUILTIN_DATE_METHOD_LOOKUP_REV = Object.keys(BUILTIN_DATE_METHOD_LOOKUP).reduce((obj, key) => { obj[BUILTIN_DATE_METHOD_LOOKUP[key]] = key; return obj; }, {})
export const BUILTIN_DATE_METHODS_SUPPORTED = Object.keys(BUILTIN_DATE_METHOD_LOOKUP);
export const BUILTIN_DATE_METHODS_SYMBOLS = Object.values(BUILTIN_DATE_METHOD_LOOKUP);
export const BUILTIN_DATE_STATIC_LOOKUP_REV = Object.keys(BUILTIN_DATE_STATIC_LOOKUP).reduce((obj, key) => { obj[BUILTIN_DATE_STATIC_LOOKUP[key]] = key; return obj; }, {})
export const BUILTIN_DATE_STATIC_SYMBOLS = Object.values(BUILTIN_DATE_STATIC_LOOKUP);


/**
 *      Function
 */


export const BUILTIN_FUNCTION_PROTOTYPE = '$FunctionPrototype';
export const BUILTIN_FUNCTION_STATIC_LOOKUP = {
  prototype: BUILTIN_FUNCTION_PROTOTYPE,
};
export const BUILTIN_FUNCTION_METHOD_LOOKUP = {
  apply: '$function_apply',
  call: '$function_call',
  bind: '$function_bind',
  toString: '$function_toString',
};
export const BUILTIN_FUNCTION_METHOD_LOOKUP_REV = Object.keys(BUILTIN_FUNCTION_METHOD_LOOKUP).reduce((obj, key) => { obj[BUILTIN_FUNCTION_METHOD_LOOKUP[key]] = key; return obj; }, {})
export const BUILTIN_FUNCTION_METHODS_SUPPORTED = Object.keys(BUILTIN_FUNCTION_METHOD_LOOKUP);
export const BUILTIN_FUNCTION_METHODS_SYMBOLS = Object.values(BUILTIN_FUNCTION_METHOD_LOOKUP);
export const BUILTIN_FUNCTION_STATIC_SYMBOLS = Object.values(BUILTIN_FUNCTION_STATIC_LOOKUP);


/**
 *    JSON
 */


export const BUILTIN_JSON_STATIC_LOOKUP = {
  parse: '$JSON_parse',
  stringify: '$JSON_stringify',
};
export const BUILTIN_JSON_STATIC_LOOKUP_REV = Object.keys(BUILTIN_JSON_STATIC_LOOKUP).reduce((obj, key) => { obj[BUILTIN_JSON_STATIC_LOOKUP[key]] = key; return obj; }, {})
export const BUILTIN_JSON_STATIC_SYMBOLS = Object.values(BUILTIN_JSON_STATIC_LOOKUP);


/**
 *      Math
 */


export const BUILTIN_MATH_STATIC_LOOKUP = {
  abs: '$Math_abs',
  acos: '$Math_acos',
  acosh: '$Math_acosh',
  asin: '$Math_asin',
  asinh: '$Math_asinh',
  atan: '$Math_atan',
  atan2: '$Math_atan2',
  atanh: '$Math_atanh',
  cbrt: '$Math_cbrt',
  ceil: '$Math_ceil',
  clz32: '$Math_clz32',
  cos: '$Math_cos',
  cosh: '$Math_cosh',
  exp: '$Math_exp',
  expm1: '$Math_expm1',
  floor: '$Math_floor',
  fround: '$Math_fround',
  hypot: '$Math_hypot',
  imul: '$Math_imul',
  log: '$Math_log',
  log10: '$Math_log10',
  log1p: '$Math_log1p',
  log2: '$Math_log2',
  max: '$Math_max',
  min: '$Math_min',
  pow: '$Math_pow',
  random: '$Math_random',
  round: '$Math_round',
  sign: '$Math_sign',
  sin: '$Math_sin',
  sinh: '$Math_sinh',
  sqrt: '$Math_sqrt',
  tan: '$Math_tan',
  tanh: '$Math_tanh',
  trunc: '$Math_trunc',
  E: '$Math_E',
  LN10: '$Math_LN10',
  LN2: '$Math_LN2',
  LOG10E: '$Math_LOG10E',
  LOG2E: '$Math_LOG2E',
  PI: '$Math_PI',
  SQRT1_2: '$Math_SQRT1_2',
  SQRT2: '$Math_SQRT2',
};
export const BUILTIN_MATH_STATIC_LOOKUP_REV = Object.keys(BUILTIN_MATH_STATIC_LOOKUP).reduce((obj, key) => { obj[BUILTIN_MATH_STATIC_LOOKUP[key]] = key; return obj; }, {})
export const BUILTIN_MATH_STATIC_SYMBOLS = Object.values(BUILTIN_MATH_STATIC_LOOKUP);


/**
 *      RegExp
 */


export const BUILTIN_REGEXP_PROTOTYPE = '$RegExpPrototype';
export const BUILTIN_REGEXP_STATIC_LOOKUP = {
  prototype: BUILTIN_REGEXP_PROTOTYPE,
};
export const BUILTIN_REGEXP_METHOD_LOOKUP = {
  exec: '$regexp_exec',
  match: '$regexp_match',
  matchAll: '$regexp_matchAll',
  replace: '$regexp_replace',
  replaceAll: '$regexp_replaceAll',
  search: '$regexp_search',
  split: '$regexp_split',
  test: '$regexp_test',
  // lastIndex : No, this is a instance bound value, not a static global built-in
};
export const BUILTIN_REGEXP_METHOD_LOOKUP_REV = Object.keys(BUILTIN_REGEXP_METHOD_LOOKUP).reduce((obj, key) => { obj[BUILTIN_REGEXP_METHOD_LOOKUP[key]] = key; return obj; }, {})
export const BUILTIN_REGEXP_METHODS_SUPPORTED = Object.keys(BUILTIN_REGEXP_METHOD_LOOKUP);
export const BUILTIN_REGEXP_METHODS_SYMBOLS = Object.values(BUILTIN_REGEXP_METHOD_LOOKUP);
export const BUILTIN_REGEXP_STATIC_SYMBOLS = Object.values(BUILTIN_REGEXP_STATIC_LOOKUP);


/**
 *      Aggregates
 */



export const PREVAL_BUILTIN_SYMBOLS = [
  BUILTIN_BOOLEAN_STATIC_SYMBOLS,
  BUILTIN_BOOLEAN_METHODS_SYMBOLS,
  BUILTIN_FUNCTION_STATIC_SYMBOLS,
  BUILTIN_FUNCTION_METHODS_SYMBOLS,
  BUILTIN_NUMBER_STATIC_SYMBOLS,
  BUILTIN_NUMBER_METHODS_SYMBOLS,
  BUILTIN_REGEXP_STATIC_SYMBOLS,
  BUILTIN_REGEXP_METHODS_SYMBOLS,
  BUILTIN_STRING_STATIC_SYMBOLS,
  BUILTIN_STRING_METHODS_SYMBOLS,
  BUILTIN_DATE_STATIC_SYMBOLS,
  BUILTIN_DATE_METHODS_SYMBOLS,
  BUILTIN_OBJECT_STATIC_SYMBOLS,
  BUILTIN_OBJECT_METHODS_SYMBOLS,
  BUILTIN_ARRAY_STATIC_SYMBOLS,
  BUILTIN_ARRAY_METHODS_SYMBOLS,
  //BUILTIN_MAP_STATIC_SYMBOLS,
  //BUILTIN_MAP_METHODS_SYMBOLS,
  //BUILTIN_SET_STATIC_SYMBOLS,
  //BUILTIN_SET_METHODS_SYMBOLS,
  BUILTIN_MATH_STATIC_SYMBOLS,
  BUILTIN_JSON_STATIC_SYMBOLS,
].flat(Infinity);
export const PREVAL_PROTO_SYMBOLS_TO_LOOKUP = {
  [BUILTIN_BOOLEAN_PROTOTYPE]: BUILTIN_BOOLEAN_METHOD_LOOKUP,
  [BUILTIN_NUMBER_PROTOTYPE]: BUILTIN_NUMBER_METHOD_LOOKUP,
  [BUILTIN_STRING_PROTOTYPE]: BUILTIN_STRING_METHOD_LOOKUP,
  [BUILTIN_OBJECT_PROTOTYPE]: BUILTIN_OBJECT_METHOD_LOOKUP,
  [BUILTIN_FUNCTION_PROTOTYPE]: BUILTIN_FUNCTION_METHOD_LOOKUP,
  [BUILTIN_REGEXP_PROTOTYPE]: BUILTIN_REGEXP_METHOD_LOOKUP,
  [BUILTIN_ARRAY_PROTOTYPE]: BUILTIN_ARRAY_METHOD_LOOKUP,
  [BUILTIN_DATE_PROTOTYPE]: BUILTIN_DATE_METHOD_LOOKUP,
  //[BUILTIN_MAP_PROTOTYPE]: BUILTIN_MAP_METHOD_LOOKUP,
  //[BUILTIN_SET_PROTOTYPE]: BUILTIN_SET_METHOD_LOOKUP,
}
// Used for serialization; `''+[].flat()` -> `'function flat() { [native code] }'` -> obj[$string_charAt] -> 'charAt'
export const BUILTIN_NAMESPACED_TO_FUNC_NAME = {
  ...BUILTIN_BOOLEAN_METHOD_LOOKUP_REV,
  ...BUILTIN_NUMBER_METHOD_LOOKUP_REV,
  ...BUILTIN_STRING_METHOD_LOOKUP_REV,
  ...BUILTIN_OBJECT_METHOD_LOOKUP_REV,
  ...BUILTIN_FUNCTION_METHOD_LOOKUP_REV,
  ...BUILTIN_REGEXP_METHOD_LOOKUP_REV,
  ...BUILTIN_ARRAY_METHOD_LOOKUP_REV,
  ...BUILTIN_DATE_METHOD_LOOKUP_REV,
  //...BUILTIN_MAP_METHOD_LOOKUP_REV,
  //...BUILTIN_SET_METHOD_LOOKUP_REV,
};

// This converts an A.b to $A_b, like Math.pow to $Math_pow
// In this context, a qualified name will use capitals for static members on built-in
// globals (Math.pow, Number.PI) and lowercase for instance methods (string.replace, array.slice)
export const QUALIFIED_NAME_TO_PREVAL_NAME = new Map([
  ...Object.keys(BUILTIN_OBJECT_STATIC_LOOKUP).map(key => [`Object.${key}`, BUILTIN_OBJECT_STATIC_LOOKUP[key]]),
  ...Object.keys(BUILTIN_OBJECT_METHOD_LOOKUP).map(key => [`object.${key}`, BUILTIN_OBJECT_METHOD_LOOKUP[key]]),
  ...Object.keys(BUILTIN_ARRAY_STATIC_LOOKUP).map(key => [`Array.${key}`, BUILTIN_ARRAY_STATIC_LOOKUP[key]]),
  ...Object.keys(BUILTIN_ARRAY_METHOD_LOOKUP).map(key => [`array.${key}`, BUILTIN_ARRAY_METHOD_LOOKUP[key]]),
  ...Object.keys(BUILTIN_BOOLEAN_STATIC_LOOKUP).map(key => [`Boolean.${key}`, BUILTIN_BOOLEAN_STATIC_LOOKUP[key]]),
  ...Object.keys(BUILTIN_BOOLEAN_METHOD_LOOKUP).map(key => [`boolean.${key}`, BUILTIN_BOOLEAN_METHOD_LOOKUP[key]]),
  ...Object.keys(BUILTIN_FUNCTION_STATIC_LOOKUP).map(key => [`Function.${key}`, BUILTIN_FUNCTION_STATIC_LOOKUP[key]]),
  ...Object.keys(BUILTIN_FUNCTION_METHOD_LOOKUP).map(key => [`function.${key}`, BUILTIN_FUNCTION_METHOD_LOOKUP[key]]),
  ...Object.keys(BUILTIN_NUMBER_STATIC_LOOKUP).map(key => [`Number.${key}`, BUILTIN_NUMBER_STATIC_LOOKUP[key]]),
  ...Object.keys(BUILTIN_NUMBER_METHOD_LOOKUP).map(key => [`number.${key}`, BUILTIN_NUMBER_METHOD_LOOKUP[key]]),
  ...Object.keys(BUILTIN_REGEXP_STATIC_LOOKUP).map(key => [`RegExp.${key}`, BUILTIN_REGEXP_STATIC_LOOKUP[key]]),
  ...Object.keys(BUILTIN_REGEXP_METHOD_LOOKUP).map(key => [`regexp.${key}`, BUILTIN_REGEXP_METHOD_LOOKUP[key]]),
  ...Object.keys(BUILTIN_STRING_STATIC_LOOKUP).map(key => [`String.${key}`, BUILTIN_STRING_STATIC_LOOKUP[key]]),
  ...Object.keys(BUILTIN_STRING_METHOD_LOOKUP).map(key => [`string.${key}`, BUILTIN_STRING_METHOD_LOOKUP[key]]),
  ...Object.keys(BUILTIN_DATE_STATIC_LOOKUP).map(key => [`Date.${key}`, BUILTIN_DATE_STATIC_LOOKUP[key]]),
  ...Object.keys(BUILTIN_DATE_METHOD_LOOKUP).map(key => [`date.${key}`, BUILTIN_DATE_METHOD_LOOKUP[key]]),
  //...Object.keys(BUILTIN_MAP_STATIC_LOOKUP).map(key => [`Date.${key}`, BUILTIN_MAP_STATIC_LOOKUP[key]]),
  //...Object.keys(BUILTIN_SET_METHOD_LOOKUP).map(key => [`date.${key}`, BUILTIN_SET_METHOD_LOOKUP[key]]),
  ...Object.keys(BUILTIN_MATH_STATIC_LOOKUP).map(key => [`Math.${key}`, BUILTIN_MATH_STATIC_LOOKUP[key]]),
  ...Object.keys(BUILTIN_JSON_STATIC_LOOKUP).map(key => [`JSON.${key}`, BUILTIN_JSON_STATIC_LOOKUP[key]]),
]);
