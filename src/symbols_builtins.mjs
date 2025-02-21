// Preval symbols representing JS built-ins

// The following convention is to used:
// - Capitalize construct name for static members
// - Lower cased construct name for prototype members
// For example: $String_fromCharCode vs $string_charCodeAt
//
// Every class should expose an object with static and prototype members and a reverse lookup

/**
 * Create qualified symbol name to identify builtins
 * (Note: `symbo` is easier to grep for than `symbol`)
 *
 * @param {string} className Uppercased for static property (Number.isNaN) and lowercased for instance property (number.toString)
 * @param {string} propName
 * @returns {string}
 */
export function symbo(className, propName) {
  return `$${className}_${propName}`;
}
export function sym_prefix(className, proto) {
  if (proto) return `$${className.toLowerCase()}_`;
  return `$${className}_`;
}



/**
 *    Boolean
 */


export const BOOLEAN = new Map([
  [symbo('Boolean', 'prototype'), { prop: 'prototype', isProto: false, typings: { sym: symbo('Boolean', 'prototype'), mustBeType: 'object',   mustBeFalsy: false, mustBeTruthy: true, mustBePrimitive: false}}],

  [symbo('boolean', 'toString'),  { prop: 'toString',  isProto: true,  typings: { sym: symbo('boolean', 'toString'), mustBeType: 'function', mustBeFalsy: false, mustBeTruthy: true, mustBePrimitive: false, returns: 'string'}}],
  [symbo('boolean', 'valueOf'),   { prop: 'valueOf',   isProto: true,  typings: { sym: symbo('boolean', 'valueOf'),  mustBeType: 'function', mustBeFalsy: false, mustBeTruthy: true, mustBePrimitive: false, returns: 'boolean'}}],
]);


/**
 *    Number
 */


export const NUMBER = new Map([
  [symbo('Number', 'prototype'), {prop: 'prototype', isProto: false, typings: { sym: symbo('Number', 'prototype'), mustBeType: 'object', mustBeFalsy: false, mustBeTruthy: true, mustBePrimitive: false }}],

  // TODO: not sure we should set the mustBeValue for these. We should not inline floats and dangerous numbers.
  [symbo('Number', 'EPSILON'),            {prop: 'EPSILON',           isProto: false, typings: { sym: symbo('Number', 'EPSILON'),            mustBeType: 'number', mustBeFalsy: false, mustBeTruthy: true, mustBePrimitive: true, mustBeValue: Number.EPSILON }}],
  [symbo('Number', 'MAX_SAFE_INTEGER'),   {prop: 'MAX_SAFE_INTEGER',  isProto: false, typings: { sym: symbo('Number', 'MAX_SAFE_INTEGER'),   mustBeType: 'number', mustBeFalsy: false, mustBeTruthy: true, mustBePrimitive: true, mustBeValue: Number.MAX_SAFE_INTEGER }}],
  [symbo('Number', 'MAX_VALUE'),          {prop: 'MAX_VALUE',         isProto: false, typings: { sym: symbo('Number', 'MAX_VALUE'),          mustBeType: 'number', mustBeFalsy: false, mustBeTruthy: true, mustBePrimitive: true, mustBeValue: Number.MAX_VALUE }}],
  [symbo('Number', 'MIN_SAFE_INTEGER'),   {prop: 'MIN_SAFE_INTEGER',  isProto: false, typings: { sym: symbo('Number', 'MIN_SAFE_INTEGER'),   mustBeType: 'number', mustBeFalsy: false, mustBeTruthy: true, mustBePrimitive: true, mustBeValue: Number.MIN_SAFE_INTEGER }}],
  [symbo('Number', 'MIN_VALUE'),          {prop: 'MIN_VALUE',         isProto: false, typings: { sym: symbo('Number', 'MIN_VALUE'),          mustBeType: 'number', mustBeFalsy: false, mustBeTruthy: true, mustBePrimitive: true, mustBeValue: Number.MIN_VALUE }}],
  [symbo('Number', 'NaN'),                {prop: 'NaN',               isProto: false, typings: { sym: symbo('Number', 'NaN'),                mustBeType: 'number', mustBeFalsy: true, mustBeTruthy: false, mustBePrimitive: true, mustBeValue: Number.NaN }}],
  [symbo('Number', 'NEGATIVE_INFINITY'),  {prop: 'NEGATIVE_INFINITY', isProto: false, typings: { sym: symbo('Number', 'NEGATIVE_INFINITY'),  mustBeType: 'number', mustBeFalsy: false, mustBeTruthy: true, mustBePrimitive: true, mustBeValue: Number.NEGATIVE_INFINITY }}],
  [symbo('Number', 'POSITIVE_INFINITY'),  {prop: 'POSITIVE_INFINITY', isProto: false, typings: { sym: symbo('Number', 'POSITIVE_INFINITY'),  mustBeType: 'number', mustBeFalsy: false, mustBeTruthy: true, mustBePrimitive: true, mustBeValue: Number.POSITIVE_INFINITY }}],

  [symbo('Number', 'isFinite'),           {prop: 'isFinite',          isProto: false, typings: { sym: symbo('Number', 'isFinite'),           mustBeType: 'function', mustBeFalsy: false, mustBeTruthy: true, mustBePrimitive: false, returns: 'boolean' }}],
  [symbo('Number', 'isInteger'),          {prop: 'isInteger',         isProto: false, typings: { sym: symbo('Number', 'isInteger'),          mustBeType: 'function', mustBeFalsy: false, mustBeTruthy: true, mustBePrimitive: false, returns: 'boolean' }}],
  [symbo('Number', 'isNaN'),              {prop: 'isNaN',             isProto: false, typings: { sym: symbo('Number', 'isNaN'),              mustBeType: 'function', mustBeFalsy: false, mustBeTruthy: true, mustBePrimitive: false, returns: 'boolean' }}],
  [symbo('Number', 'isSafeInteger'),      {prop: 'isSafeInteger',     isProto: false, typings: { sym: symbo('Number', 'isSafeInteger'),      mustBeType: 'function', mustBeFalsy: false, mustBeTruthy: true, mustBePrimitive: false, returns: 'boolean' }}],
  [symbo('Number', 'parseFloat'),         {prop: 'parseFloat',        isProto: false, typings: { sym: symbo('Number', 'parseFloat'),         mustBeType: 'function', mustBeFalsy: false, mustBeTruthy: true, mustBePrimitive: false, returns: 'number' }}],
  [symbo('Number', 'parseInt'),           {prop: 'parseInt',          isProto: false, typings: { sym: symbo('Number', 'parseInt'),           mustBeType: 'function', mustBeFalsy: false, mustBeTruthy: true, mustBePrimitive: false, returns: 'number' }}],

  [symbo('number', 'toExponential'),      {prop: 'toExponential',     isProto: true,  typings: { sym: symbo('number', 'toExponential'),      mustBeType: 'function', mustBeFalsy: false, mustBeTruthy: true, mustBePrimitive: false, returns: 'string' }}],
  [symbo('number', 'toFixed'),            {prop: 'toFixed',           isProto: true,  typings: { sym: symbo('number', 'toFixed'),            mustBeType: 'function', mustBeFalsy: false, mustBeTruthy: true, mustBePrimitive: false, returns: 'string' }}],
  [symbo('number', 'toLocaleString'),     {prop: 'toLocaleString',    isProto: true,  typings: { sym: symbo('number', 'toLocaleString'),     mustBeType: 'function', mustBeFalsy: false, mustBeTruthy: true, mustBePrimitive: false, returns: 'string' }}],
  [symbo('number', 'toPrecision'),        {prop: 'toPrecision',       isProto: true,  typings: { sym: symbo('number', 'toPrecision'),        mustBeType: 'function', mustBeFalsy: false, mustBeTruthy: true, mustBePrimitive: false, returns: 'string' }}],
  [symbo('number', 'toString'),           {prop: 'toString',          isProto: true,  typings: { sym: symbo('number', 'toString'),           mustBeType: 'function', mustBeFalsy: false, mustBeTruthy: true, mustBePrimitive: false, returns: 'string' }}],
  [symbo('number', 'valueOf'),            {prop: 'valueOf',           isProto: true,  typings: { sym: symbo('number', 'valueOf'),            mustBeType: 'function', mustBeFalsy: false, mustBeTruthy: true, mustBePrimitive: false, returns: 'number' }}],
]);


/**
 *      String
 */


export const STRING = new Map([
  [symbo('String', 'prototype'), {prop: 'prototype', isProto: false, typings: { sym: symbo('String', 'prototype'), mustBeType: 'object', mustBeFalsy: false, mustBeTruthy: true, mustBePrimitive: false }}],

  [symbo('String', 'fromCharCode'),   {prop: 'fromCharCode',  isProto: false, typings: { sym: symbo('String', 'fromCharCode'),  mustBeType: 'function', mustBeFalsy: false, mustBeTruthy: true, mustBePrimitive: false, returns: 'string' }}],
  [symbo('String', 'fromCodePoint'),  {prop: 'fromCodePoint', isProto: false, typings: { sym: symbo('String', 'fromCodePoint'), mustBeType: 'function', mustBeFalsy: false, mustBeTruthy: true, mustBePrimitive: false, returns: 'fromCodePoint' }}],
  [symbo('String', 'raw'),            {prop: 'raw',           isProto: false, typings: { sym: symbo('String', 'raw'),           mustBeType: 'function', mustBeFalsy: false, mustBeTruthy: true, mustBePrimitive: false, returns: 'string' }}],

  [symbo('string', 'at'),            {prop: 'at',            isProto: true,  typings: { sym: symbo('string', 'at'),            mustBeType: 'function', mustBeFalsy: false, mustBeTruthy: true, mustBePrimitive: false, returns: 'string' }}],
  [symbo('string', 'charAt'),        {prop: 'charAt',        isProto: true,  typings: { sym: symbo('string', 'charAt'),        mustBeType: 'function', mustBeFalsy: false, mustBeTruthy: true, mustBePrimitive: false, returns: 'string' }}],
  [symbo('string', 'charCodeAt'),    {prop: 'charCodeAt',    isProto: true,  typings: { sym: symbo('string', 'charCodeAt'),    mustBeType: 'function', mustBeFalsy: false, mustBeTruthy: true, mustBePrimitive: false, returns: 'number' }}],
  [symbo('string', 'concat'),        {prop: 'concat',        isProto: true,  typings: { sym: symbo('string', 'concat'),        mustBeType: 'function', mustBeFalsy: false, mustBeTruthy: true, mustBePrimitive: false, returns: 'string' }}],
  [symbo('string', 'endsWith'),      {prop: 'endsWith',      isProto: true,  typings: { sym: symbo('string', 'endsWith'),      mustBeType: 'function', mustBeFalsy: false, mustBeTruthy: true, mustBePrimitive: false, returns: 'boolean' }}],
  [symbo('string', 'includes'),      {prop: 'includes',      isProto: true,  typings: { sym: symbo('string', 'includes'),      mustBeType: 'function', mustBeFalsy: false, mustBeTruthy: true, mustBePrimitive: false, returns: 'boolean' }}],
  [symbo('string', 'indexOf'),       {prop: 'indexOf',       isProto: true,  typings: { sym: symbo('string', 'indexOf'),       mustBeType: 'function', mustBeFalsy: false, mustBeTruthy: true, mustBePrimitive: false, returns: 'number' }}],
  [symbo('string', 'isWellFormed'),  {prop: 'isWellFormed',  isProto: true,  typings: { sym: symbo('string', 'isWellFormed'),  mustBeType: 'function', mustBeFalsy: false, mustBeTruthy: true, mustBePrimitive: false, returns: 'boolean' }}],
  [symbo('string', 'lastIndexOf'),   {prop: 'lastIndexOf',   isProto: true,  typings: { sym: symbo('string', 'lastIndexOf'),   mustBeType: 'function', mustBeFalsy: false, mustBeTruthy: true, mustBePrimitive: false, returns: 'number' }}],
  [symbo('string', 'localeCompare'), {prop: 'localeCompare', isProto: true,  typings: { sym: symbo('string', 'localeCompare'), mustBeType: 'function', mustBeFalsy: false, mustBeTruthy: true, mustBePrimitive: false, returns: 'number' }}],
  [symbo('string', 'match'),         {prop: 'match',         isProto: true,  typings: { sym: symbo('string', 'match'),         mustBeType: 'function', mustBeFalsy: false, mustBeTruthy: true, mustBePrimitive: false, returns: 'string' }}],
  [symbo('string', 'matchAll'),      {prop: 'matchAll',      isProto: true,  typings: { sym: symbo('string', 'matchAll'),      mustBeType: 'function', mustBeFalsy: false, mustBeTruthy: true, mustBePrimitive: false, returns: 'object' }}], // An iterator...
  [symbo('string', 'normalize'),     {prop: 'normalize',     isProto: true,  typings: { sym: symbo('string', 'normalize'),     mustBeType: 'function', mustBeFalsy: false, mustBeTruthy: true, mustBePrimitive: false, returns: 'string' }}],
  [symbo('string', 'padEnd'),        {prop: 'padEnd',        isProto: true,  typings: { sym: symbo('string', 'padEnd'),        mustBeType: 'function', mustBeFalsy: false, mustBeTruthy: true, mustBePrimitive: false, returns: 'string' }}],
  [symbo('string', 'padStart'),      {prop: 'padStart',      isProto: true,  typings: { sym: symbo('string', 'padStart'),      mustBeType: 'function', mustBeFalsy: false, mustBeTruthy: true, mustBePrimitive: false, returns: 'string' }}], // An iterator...
  [symbo('string', 'repeat'),        {prop: 'repeat',        isProto: true,  typings: { sym: symbo('string', 'repeat'),        mustBeType: 'function', mustBeFalsy: false, mustBeTruthy: true, mustBePrimitive: false, returns: 'string' }}],
  [symbo('string', 'replace'),       {prop: 'replace',       isProto: true,  typings: { sym: symbo('string', 'replace'),       mustBeType: 'function', mustBeFalsy: false, mustBeTruthy: true, mustBePrimitive: false, returns: 'string' }}],
  [symbo('string', 'replaceAll'),    {prop: 'replaceAll',    isProto: true,  typings: { sym: symbo('string', 'replaceAll'),    mustBeType: 'function', mustBeFalsy: false, mustBeTruthy: true, mustBePrimitive: false, returns: 'string' }}],
  [symbo('string', 'search'),        {prop: 'search',        isProto: true,  typings: { sym: symbo('string', 'search'),        mustBeType: 'function', mustBeFalsy: false, mustBeTruthy: true, mustBePrimitive: false, returns: 'number' }}],
  [symbo('string', 'slice'),         {prop: 'slice',         isProto: true,  typings: { sym: symbo('string', 'slice'),         mustBeType: 'function', mustBeFalsy: false, mustBeTruthy: true, mustBePrimitive: false, returns: 'string' }}],
  [symbo('string', 'split'),         {prop: 'split',         isProto: true,  typings: { sym: symbo('string', 'split'),         mustBeType: 'function', mustBeFalsy: false, mustBeTruthy: true, mustBePrimitive: false, returns: 'array' }}],
  [symbo('string', 'startsWith'),    {prop: 'startsWith',    isProto: true,  typings: { sym: symbo('string', 'startsWith'),    mustBeType: 'function', mustBeFalsy: false, mustBeTruthy: true, mustBePrimitive: false, returns: 'boolean' }}],
  [symbo('string', 'substring'),     {prop: 'substring',     isProto: true,  typings: { sym: symbo('string', 'substring'),     mustBeType: 'function', mustBeFalsy: false, mustBeTruthy: true, mustBePrimitive: false, returns: 'string' }}],
  [symbo('string', 'substr'),        {prop: 'substr',        isProto: true,  typings: { sym: symbo('string', 'substr'),        mustBeType: 'function', mustBeFalsy: false, mustBeTruthy: true, mustBePrimitive: false, returns: 'string' }}],
  [symbo('string', 'toLocaleLowerCase'),{prop: 'toLocaleLowerCase',isProto: true,  typings: { sym: symbo('string', 'toLocaleLowerCase'),mustBeType: 'function', mustBeFalsy: false, mustBeTruthy: true, mustBePrimitive: false, returns: 'string' }}],
  [symbo('string', 'toLocaleUpperCase'),{prop: 'toLocaleUpperCase',isProto: true,  typings: { sym: symbo('string', 'toLocaleUpperCase'),mustBeType: 'function', mustBeFalsy: false, mustBeTruthy: true, mustBePrimitive: false, returns: 'string' }}],
  [symbo('string', 'toLowerCase'),   {prop: 'toLowerCase',   isProto: true,  typings: { sym: symbo('string', 'toLowerCase'),   mustBeType: 'function', mustBeFalsy: false, mustBeTruthy: true, mustBePrimitive: false, returns: 'string' }}],
  [symbo('string', 'toString'),      {prop: 'toString',      isProto: true,  typings: { sym: symbo('string', 'toString'),      mustBeType: 'function', mustBeFalsy: false, mustBeTruthy: true, mustBePrimitive: false, returns: 'string' }}],
  [symbo('string', 'toUpperCase'),   {prop: 'toUpperCase',   isProto: true,  typings: { sym: symbo('string', 'toUpperCase'),   mustBeType: 'function', mustBeFalsy: false, mustBeTruthy: true, mustBePrimitive: false, returns: 'string' }}],
  [symbo('string', 'toWellFormed'),  {prop: 'toWellFormed',  isProto: true,  typings: { sym: symbo('string', 'toWellFormed'),  mustBeType: 'function', mustBeFalsy: false, mustBeTruthy: true, mustBePrimitive: false, returns: 'string' }}],
  [symbo('string', 'trim'),          {prop: 'trim',          isProto: true,  typings: { sym: symbo('string', 'trim'),          mustBeType: 'function', mustBeFalsy: false, mustBeTruthy: true, mustBePrimitive: false, returns: 'string' }}],
  [symbo('string', 'trimEnd'),       {prop: 'trimEnd',       isProto: true,  typings: { sym: symbo('string', 'trimEnd'),       mustBeType: 'function', mustBeFalsy: false, mustBeTruthy: true, mustBePrimitive: false, returns: 'string' }}],
  [symbo('string', 'trimStart'),     {prop: 'trimStart',     isProto: true,  typings: { sym: symbo('string', 'trimStart'),     mustBeType: 'function', mustBeFalsy: false, mustBeTruthy: true, mustBePrimitive: false, returns: 'string' }}],
  [symbo('string', 'valueOf'),       {prop: 'valueOf',       isProto: true,  typings: { sym: symbo('string', 'valueOf'),       mustBeType: 'function', mustBeFalsy: false, mustBeTruthy: true, mustBePrimitive: false, returns: 'string' }}],

  // This is an instance bound value, not a global. We should approach .length differently for typign
  //[symbo('string', 'length'),        {prop: 'length',        isProto: true,  typings: { sym: symbo('string', 'length'),        mustBeType: 'number', mustBeFalsy: false, mustBeTruthy: false, mustBePrimitive: true }}],

  // There are some web platform things that generate tags, like .anchor() and .fontcolor(). They're used in obfuscation sort of scenario's.
  // We could add this at a relatively innocent risk. TODO

]);


/**
 *      Object
 */


export const OBJECT = new Map([
  [symbo('Object', 'prototype'), {prop: 'prototype', isProto: false, typings: { sym: symbo('Object', 'prototype'), mustBeType: 'object', mustBeFalsy: false, mustBeTruthy: true, mustBePrimitive: false }}],

  [symbo('Object', 'assign'),                    {prop: 'assign',                    isProto: false, typings: { sym: symbo('Object', 'assign'),                    mustBeType: 'function', mustBeFalsy: false, mustBeTruthy: true, mustBePrimitive: false, returns: 'object' }}],
  [symbo('Object', 'create'),                    {prop: 'create',                    isProto: false, typings: { sym: symbo('Object', 'create'),                    mustBeType: 'function', mustBeFalsy: false, mustBeTruthy: true, mustBePrimitive: false, returns: 'object' }}],
  [symbo('Object', 'defineProperties'),          {prop: 'defineProperties',          isProto: false, typings: { sym: symbo('Object', 'defineProperties'),          mustBeType: 'function', mustBeFalsy: false, mustBeTruthy: true, mustBePrimitive: false, returns: 'object' }}],
  [symbo('Object', 'defineProperty'),            {prop: 'defineProperty',            isProto: false, typings: { sym: symbo('Object', 'defineProperty'),            mustBeType: 'function', mustBeFalsy: false, mustBeTruthy: true, mustBePrimitive: false, returns: 'object' }}],
  [symbo('Object', 'entries'),                   {prop: 'entries',                   isProto: false, typings: { sym: symbo('Object', 'entries'),                   mustBeType: 'function', mustBeFalsy: false, mustBeTruthy: true, mustBePrimitive: false, returns: 'array' }}],
  [symbo('Object', 'freeze'),                    {prop: 'freeze',                    isProto: false, typings: { sym: symbo('Object', 'freeze'),                    mustBeType: 'function', mustBeFalsy: false, mustBeTruthy: true, mustBePrimitive: false, returns: 'object' }}],
  [symbo('Object', 'fromEntries'),               {prop: 'fromEntries',               isProto: false, typings: { sym: symbo('Object', 'fromEntries'),               mustBeType: 'function', mustBeFalsy: false, mustBeTruthy: true, mustBePrimitive: false, returns: 'object' }}],
  [symbo('Object', 'getOwnPropertyDescriptor'),  {prop: 'getOwnPropertyDescriptor',  isProto: false, typings: { sym: symbo('Object', 'getOwnPropertyDescriptor'),  mustBeType: 'function', mustBeFalsy: false, mustBeTruthy: true, mustBePrimitive: false, returns: 'object' }}],
  [symbo('Object', 'getOwnPropertyDescriptors'), {prop: 'getOwnPropertyDescriptors', isProto: false, typings: { sym: symbo('Object', 'getOwnPropertyDescriptors'), mustBeType: 'function', mustBeFalsy: false, mustBeTruthy: true, mustBePrimitive: false, returns: 'object' }}],
  [symbo('Object', 'getOwnPropertyNames'),       {prop: 'getOwnPropertyNames',       isProto: false, typings: { sym: symbo('Object', 'getOwnPropertyNames'),       mustBeType: 'function', mustBeFalsy: false, mustBeTruthy: true, mustBePrimitive: false, returns: 'array' }}],
  [symbo('Object', 'getOwnPropertySymbols'),     {prop: 'getOwnPropertySymbols',     isProto: false, typings: { sym: symbo('Object', 'getOwnPropertySymbols'),     mustBeType: 'function', mustBeFalsy: false, mustBeTruthy: true, mustBePrimitive: false, returns: 'array' }}],
  [symbo('Object', 'getPrototypeOf'),            {prop: 'getPrototypeOf',            isProto: false, typings: { sym: symbo('Object', 'getPrototypeOf'),            mustBeType: 'function', mustBeFalsy: false, mustBeTruthy: true, mustBePrimitive: false, returns: 'object' }}],
  [symbo('Object', 'groupBy'),                   {prop: 'groupBy',                   isProto: false, typings: { sym: symbo('Object', 'groupBy'),                   mustBeType: 'function', mustBeFalsy: false, mustBeTruthy: true, mustBePrimitive: false, returns: 'object' }}],
  [symbo('Object', 'hasOwn'),                    {prop: 'hasOwn',                    isProto: false, typings: { sym: symbo('Object', 'hasOwn'),                    mustBeType: 'function', mustBeFalsy: false, mustBeTruthy: true, mustBePrimitive: false, returns: 'boolean' }}],
  [symbo('Object', 'is'),                        {prop: 'is',                        isProto: false, typings: { sym: symbo('Object', 'is'),                        mustBeType: 'function', mustBeFalsy: false, mustBeTruthy: true, mustBePrimitive: false, returns: 'boolean' }}],
  [symbo('Object', 'isExtensible'),              {prop: 'isExtensible',              isProto: false, typings: { sym: symbo('Object', 'isExtensible'),              mustBeType: 'function', mustBeFalsy: false, mustBeTruthy: true, mustBePrimitive: false, returns: 'boolean' }}],
  [symbo('Object', 'isFrozen'),                  {prop: 'isFrozen',                  isProto: false, typings: { sym: symbo('Object', 'isFrozen'),                  mustBeType: 'function', mustBeFalsy: false, mustBeTruthy: true, mustBePrimitive: false, returns: 'boolean' }}],
  [symbo('Object', 'isSealed'),                  {prop: 'isSealed',                  isProto: false, typings: { sym: symbo('Object', 'isSealed'),                  mustBeType: 'function', mustBeFalsy: false, mustBeTruthy: true, mustBePrimitive: false, returns: 'boolean' }}],
  [symbo('Object', 'keys'),                      {prop: 'keys',                      isProto: false, typings: { sym: symbo('Object', 'keys'),                      mustBeType: 'function', mustBeFalsy: false, mustBeTruthy: true, mustBePrimitive: false, returns: 'array' }}],
  [symbo('Object', 'preventExtensions'),         {prop: 'preventExtensions',         isProto: false, typings: { sym: symbo('Object', 'preventExtensions'),         mustBeType: 'function', mustBeFalsy: false, mustBeTruthy: true, mustBePrimitive: false, returns: 'object' }}],
  [symbo('Object', 'prototype'),                 {prop: 'prototype',                 isProto: false, typings: { sym: symbo('Object', 'prototype'),                 mustBeType: 'function', mustBeFalsy: false, mustBeTruthy: true, mustBePrimitive: false, returns: 'object' }}],
  [symbo('Object', 'seal'),                      {prop: 'seal',                      isProto: false, typings: { sym: symbo('Object', 'seal'),                      mustBeType: 'function', mustBeFalsy: false, mustBeTruthy: true, mustBePrimitive: false, returns: 'object' }}],
  [symbo('Object', 'setPrototypeOf'),            {prop: 'setPrototypeOf',            isProto: false, typings: { sym: symbo('Object', 'setPrototypeOf'),            mustBeType: 'function', mustBeFalsy: false, mustBeTruthy: true, mustBePrimitive: false, returns: 'object' }}],
  [symbo('Object', 'values'),                    {prop: 'values',                    isProto: false, typings: { sym: symbo('Object', 'values'),                    mustBeType: 'function', mustBeFalsy: false, mustBeTruthy: true, mustBePrimitive: false, returns: 'array' }}],

  [symbo('object', 'hasOwnProperty'),       {prop: 'hasOwnProperty',       isProto: true, typings: { sym: symbo('object', 'hasOwnProperty'),       mustBeType: 'function', mustBeFalsy: false, mustBeTruthy: true, mustBePrimitive: false, returns: 'boolean' }}],
  [symbo('object', 'isPrototypeOf'),        {prop: 'isPrototypeOf',        isProto: true, typings: { sym: symbo('object', 'isPrototypeOf'),        mustBeType: 'function', mustBeFalsy: false, mustBeTruthy: true, mustBePrimitive: false, returns: 'boolean' }}],
  [symbo('object', 'propertyIsEnumerable'), {prop: 'propertyIsEnumerable', isProto: true, typings: { sym: symbo('object', 'propertyIsEnumerable'), mustBeType: 'function', mustBeFalsy: false, mustBeTruthy: true, mustBePrimitive: false, returns: 'boolean' }}],
  [symbo('object', 'toLocaleString'),       {prop: 'toLocaleString',       isProto: true, typings: { sym: symbo('object', 'toLocaleString'),       mustBeType: 'function', mustBeFalsy: false, mustBeTruthy: true, mustBePrimitive: false, returns: 'string' }}],
  [symbo('object', 'toString'),             {prop: 'toString',             isProto: true, typings: { sym: symbo('object', 'toString'),             mustBeType: 'function', mustBeFalsy: false, mustBeTruthy: true, mustBePrimitive: false, returns: 'string' }}],
  [symbo('object', 'valueOf'),              {prop: 'valueOf',              isProto: true, typings: { sym: symbo('object', 'valueOf'),              mustBeType: 'function', mustBeFalsy: false, mustBeTruthy: true, mustBePrimitive: false, returns: 'object' }}],
]);


/**
 *      Array
 */

export const ARRAY = new Map([
  [symbo('Array', 'prototype'), {prop: 'prototype', isProto: false, typings: { sym: symbo('Array', 'prototype'), mustBeType: 'array', mustBeFalsy: false, mustBeTruthy: true, mustBePrimitive: false }}],

  [symbo('Array', 'from'),      {prop: 'from',      isProto: false, typings: { sym: symbo('Array', 'from'),      mustBeType: 'function', mustBeFalsy: false, mustBeTruthy: true, mustBePrimitive: false, returns: 'array' }}],
  [symbo('Array', 'fromAsync'), {prop: 'fromAsync', isProto: false, typings: { sym: symbo('Array', 'fromAsync'), mustBeType: 'function', mustBeFalsy: false, mustBeTruthy: true, mustBePrimitive: false, returns: 'promise' }}],
  [symbo('Array', 'isArray'),   {prop: 'isArray',   isProto: false, typings: { sym: symbo('Array', 'isArray'),   mustBeType: 'function', mustBeFalsy: false, mustBeTruthy: true, mustBePrimitive: false, returns: 'boolean' }}],
  [symbo('Array', 'of'),        {prop: 'of',        isProto: false, typings: { sym: symbo('Array', 'of'),        mustBeType: 'function', mustBeFalsy: false, mustBeTruthy: true, mustBePrimitive: false, returns: 'array' }}],

  [symbo('array', 'at'),             {prop: 'at',              isProto: true, typings: { sym: symbo('array', 'at'),              mustBeType: 'function', mustBeFalsy: false, mustBeTruthy: true, mustBePrimitive: false, returns: false }}],
  [symbo('array', 'concat'),         {prop: 'concat',          isProto: true, typings: { sym: symbo('array', 'concat'),          mustBeType: 'function', mustBeFalsy: false, mustBeTruthy: true, mustBePrimitive: false, returns: 'array' }}],
  [symbo('array', 'copyWithin'),     {prop: 'copyWithin',      isProto: true, typings: { sym: symbo('array', 'copyWithin'),      mustBeType: 'function', mustBeFalsy: false, mustBeTruthy: true, mustBePrimitive: false, returns: 'array' }}],
  [symbo('array', 'entries'),        {prop: 'entries',         isProto: true, typings: { sym: symbo('array', 'entries'),         mustBeType: 'function', mustBeFalsy: false, mustBeTruthy: true, mustBePrimitive: false, returns: 'object' }}], // iterator
  [symbo('array', 'every'),          {prop: 'every',           isProto: true, typings: { sym: symbo('array', 'every'),           mustBeType: 'function', mustBeFalsy: false, mustBeTruthy: true, mustBePrimitive: false, returns: 'boolean' }}],
  [symbo('array', 'fill'),           {prop: 'fill',            isProto: true, typings: { sym: symbo('array', 'fill'),            mustBeType: 'function', mustBeFalsy: false, mustBeTruthy: true, mustBePrimitive: false, returns: 'array' }}],
  [symbo('array', 'filter'),         {prop: 'filter',          isProto: true, typings: { sym: symbo('array', 'filter'),          mustBeType: 'function', mustBeFalsy: false, mustBeTruthy: true, mustBePrimitive: false, returns: 'array' }}],
  [symbo('array', 'find'),           {prop: 'find',            isProto: true, typings: { sym: symbo('array', 'find'),            mustBeType: 'function', mustBeFalsy: false, mustBeTruthy: true, mustBePrimitive: false, returns: false }}],
  [symbo('array', 'findIndex'),      {prop: 'findIndex',       isProto: true, typings: { sym: symbo('array', 'findIndex'),       mustBeType: 'function', mustBeFalsy: false, mustBeTruthy: true, mustBePrimitive: false, returns: 'number' }}],
  [symbo('array', 'findLast'),       {prop: 'findLast',        isProto: true, typings: { sym: symbo('array', 'findLast'),        mustBeType: 'function', mustBeFalsy: false, mustBeTruthy: true, mustBePrimitive: false, returns: false }}],
  [symbo('array', 'findLastIndex'),  {prop: 'findLastIndex',   isProto: true, typings: { sym: symbo('array', 'findLastIndex'),   mustBeType: 'function', mustBeFalsy: false, mustBeTruthy: true, mustBePrimitive: false, returns: 'number' }}],
  [symbo('array', 'flat'),           {prop: 'flat',            isProto: true, typings: { sym: symbo('array', 'flat'),            mustBeType: 'function', mustBeFalsy: false, mustBeTruthy: true, mustBePrimitive: false, returns: 'array' }}],
  [symbo('array', 'flatMap'),        {prop: 'flatMap',         isProto: true, typings: { sym: symbo('array', 'flatMap'),         mustBeType: 'function', mustBeFalsy: false, mustBeTruthy: true, mustBePrimitive: false, returns: 'array' }}],
  [symbo('array', 'forEach'),        {prop: 'forEach',         isProto: true, typings: { sym: symbo('array', 'forEach'),         mustBeType: 'function', mustBeFalsy: false, mustBeTruthy: true, mustBePrimitive: false, returns: 'undefined' }}],
  [symbo('array', 'includes'),       {prop: 'includes',        isProto: true, typings: { sym: symbo('array', 'includes'),        mustBeType: 'function', mustBeFalsy: false, mustBeTruthy: true, mustBePrimitive: false, returns: 'boolean' }}],
  [symbo('array', 'indexOf'),        {prop: 'indexOf',         isProto: true, typings: { sym: symbo('array', 'indexOf'),         mustBeType: 'function', mustBeFalsy: false, mustBeTruthy: true, mustBePrimitive: false, returns: 'number' }}],
  [symbo('array', 'join'),           {prop: 'join',            isProto: true, typings: { sym: symbo('array', 'join'),            mustBeType: 'function', mustBeFalsy: false, mustBeTruthy: true, mustBePrimitive: false, returns: 'string' }}],
  [symbo('array', 'keys'),           {prop: 'keys',            isProto: true, typings: { sym: symbo('array', 'keys'),            mustBeType: 'function', mustBeFalsy: false, mustBeTruthy: true, mustBePrimitive: false, returns: 'object' }}], // iterator
  [symbo('array', 'lastIndexOf'),    {prop: 'lastIndexOf',     isProto: true, typings: { sym: symbo('array', 'lastIndexOf'),     mustBeType: 'function', mustBeFalsy: false, mustBeTruthy: true, mustBePrimitive: false, returns: 'number' }}],
  [symbo('array', 'map'),            {prop: 'map',             isProto: true, typings: { sym: symbo('array', 'map'),             mustBeType: 'function', mustBeFalsy: false, mustBeTruthy: true, mustBePrimitive: false, returns: 'array' }}],
  [symbo('array', 'pop'),            {prop: 'pop',             isProto: true, typings: { sym: symbo('array', 'pop'),             mustBeType: 'function', mustBeFalsy: false, mustBeTruthy: true, mustBePrimitive: false, returns: false }}],
  [symbo('array', 'push'),           {prop: 'push',            isProto: true, typings: { sym: symbo('array', 'push'),            mustBeType: 'function', mustBeFalsy: false, mustBeTruthy: true, mustBePrimitive: false, returns: 'number' }}],
  [symbo('array', 'reduce'),         {prop: 'reduce',          isProto: true, typings: { sym: symbo('array', 'reduce'),          mustBeType: 'function', mustBeFalsy: false, mustBeTruthy: true, mustBePrimitive: false, returns: 'array' }}],
  [symbo('array', 'reduceRight'),    {prop: 'reduceRight',     isProto: true, typings: { sym: symbo('array', 'reduceRight'),     mustBeType: 'function', mustBeFalsy: false, mustBeTruthy: true, mustBePrimitive: false, returns: 'array' }}],
  [symbo('array', 'reverse'),        {prop: 'reverse',         isProto: true, typings: { sym: symbo('array', 'reverse'),         mustBeType: 'function', mustBeFalsy: false, mustBeTruthy: true, mustBePrimitive: false, returns: 'array' }}],
  [symbo('array', 'shift'),          {prop: 'shift',           isProto: true, typings: { sym: symbo('array', 'shift'),           mustBeType: 'function', mustBeFalsy: false, mustBeTruthy: true, mustBePrimitive: false, returns: false }}],
  [symbo('array', 'slice'),          {prop: 'slice',           isProto: true, typings: { sym: symbo('array', 'slice'),           mustBeType: 'function', mustBeFalsy: false, mustBeTruthy: true, mustBePrimitive: false, returns: 'array' }}],
  [symbo('array', 'some'),           {prop: 'some',            isProto: true, typings: { sym: symbo('array', 'some'),            mustBeType: 'function', mustBeFalsy: false, mustBeTruthy: true, mustBePrimitive: false, returns: 'boolean' }}],
  [symbo('array', 'sort'),           {prop: 'sort',            isProto: true, typings: { sym: symbo('array', 'sort'),            mustBeType: 'function', mustBeFalsy: false, mustBeTruthy: true, mustBePrimitive: false, returns: 'array' }}],
  [symbo('array', 'splice'),         {prop: 'splice',          isProto: true, typings: { sym: symbo('array', 'splice'),          mustBeType: 'function', mustBeFalsy: false, mustBeTruthy: true, mustBePrimitive: false, returns: 'array' }}],
  [symbo('array', 'toLocaleString'), {prop: 'toLocaleString',  isProto: true, typings: { sym: symbo('array', 'toLocaleString'),  mustBeType: 'function', mustBeFalsy: false, mustBeTruthy: true, mustBePrimitive: false, returns: 'string' }}],
  [symbo('array', 'toReversed'),     {prop: 'toReversed',      isProto: true, typings: { sym: symbo('array', 'toReversed'),      mustBeType: 'function', mustBeFalsy: false, mustBeTruthy: true, mustBePrimitive: false, returns: 'array' }}],
  [symbo('array', 'toSorted'),       {prop: 'toSorted',        isProto: true, typings: { sym: symbo('array', 'toSorted'),        mustBeType: 'function', mustBeFalsy: false, mustBeTruthy: true, mustBePrimitive: false, returns: 'array' }}],
  [symbo('array', 'toSpliced'),      {prop: 'toSpliced',       isProto: true, typings: { sym: symbo('array', 'toSpliced'),       mustBeType: 'function', mustBeFalsy: false, mustBeTruthy: true, mustBePrimitive: false, returns: 'array' }}],
  [symbo('array', 'toString'),       {prop: 'toString',        isProto: true, typings: { sym: symbo('array', 'toString'),        mustBeType: 'function', mustBeFalsy: false, mustBeTruthy: true, mustBePrimitive: false, returns: 'string' }}],
  [symbo('array', 'unshift'),        {prop: 'unshift',         isProto: true, typings: { sym: symbo('array', 'unshift'),         mustBeType: 'function', mustBeFalsy: false, mustBeTruthy: true, mustBePrimitive: false, returns: 'number' }}],
  [symbo('array', 'values'),         {prop: 'values',          isProto: true, typings: { sym: symbo('array', 'values'),          mustBeType: 'function', mustBeFalsy: false, mustBeTruthy: true, mustBePrimitive: false, returns: 'object' }}], // iterator
  [symbo('array', 'with'),           {prop: 'with',            isProto: true, typings: { sym: symbo('array', 'with'),            mustBeType: 'function', mustBeFalsy: false, mustBeTruthy: true, mustBePrimitive: false, returns: 'array' }}],

  // Note: .length is an instance property, not a global. We should get the typing of .length in a different way.
]);


/**
 *      Date
 */


export const DATE = new Map([
  [symbo('Date', 'prototype'), {prop: 'prototype', isProto: false, typings: { sym: symbo('Date', 'prototype'), mustBeType: 'array', mustBeFalsy: false, mustBeTruthy: true, mustBePrimitive: false }}],

  [symbo('Date', 'now'),   {prop: 'now',   isProto: false, typings: { sym: symbo('Date', 'now'),   mustBeType: 'function', mustBeFalsy: false, mustBeTruthy: true, mustBePrimitive: false, returns: 'number' }}],
  [symbo('Date', 'parse'), {prop: 'parse', isProto: false, typings: { sym: symbo('Date', 'parse'), mustBeType: 'function', mustBeFalsy: false, mustBeTruthy: true, mustBePrimitive: false, returns: 'number' }}],
  [symbo('Date', 'UTC'),   {prop: 'UTC',   isProto: false, typings: { sym: symbo('Date', 'UTC'),   mustBeType: 'function', mustBeFalsy: false, mustBeTruthy: true, mustBePrimitive: false, returns: 'number' }}],

  [symbo('date', 'getDate'),            {prop: 'getDate',             isProto: true, typings: { sym: symbo('date', 'getDate'),             mustBeType: 'function', mustBeFalsy: false, mustBeTruthy: true, mustBePrimitive: false, returns: 'number' }}],
  [symbo('date', 'getDay'),             {prop: 'getDay',              isProto: true, typings: { sym: symbo('date', 'getDay'),              mustBeType: 'function', mustBeFalsy: false, mustBeTruthy: true, mustBePrimitive: false, returns: 'number' }}],
  [symbo('date', 'getFullYear'),        {prop: 'getFullYear',         isProto: true, typings: { sym: symbo('date', 'getFullYear'),         mustBeType: 'function', mustBeFalsy: false, mustBeTruthy: true, mustBePrimitive: false, returns: 'number' }}],
  [symbo('date', 'getHours'),           {prop: 'getHours',            isProto: true, typings: { sym: symbo('date', 'getHours'),            mustBeType: 'function', mustBeFalsy: false, mustBeTruthy: true, mustBePrimitive: false, returns: 'number' }}],
  [symbo('date', 'getMilliseconds'),    {prop: 'getMilliseconds',     isProto: true, typings: { sym: symbo('date', 'getMilliseconds'),     mustBeType: 'function', mustBeFalsy: false, mustBeTruthy: true, mustBePrimitive: false, returns: 'number' }}],
  [symbo('date', 'getMinutes'),         {prop: 'getMinutes',          isProto: true, typings: { sym: symbo('date', 'getMinutes'),          mustBeType: 'function', mustBeFalsy: false, mustBeTruthy: true, mustBePrimitive: false, returns: 'number' }}],
  [symbo('date', 'getMonth'),           {prop: 'getMonth',            isProto: true, typings: { sym: symbo('date', 'getMonth'),            mustBeType: 'function', mustBeFalsy: false, mustBeTruthy: true, mustBePrimitive: false, returns: 'number' }}],
  [symbo('date', 'getSeconds'),         {prop: 'getSeconds',          isProto: true, typings: { sym: symbo('date', 'getSeconds'),          mustBeType: 'function', mustBeFalsy: false, mustBeTruthy: true, mustBePrimitive: false, returns: 'number' }}],
  [symbo('date', 'getTime'),            {prop: 'getTime',             isProto: true, typings: { sym: symbo('date', 'getTime'),             mustBeType: 'function', mustBeFalsy: false, mustBeTruthy: true, mustBePrimitive: false, returns: 'number' }}],
  [symbo('date', 'getTimezoneOffset'),  {prop: 'getTimezoneOffset',   isProto: true, typings: { sym: symbo('date', 'getTimezoneOffset'),   mustBeType: 'function', mustBeFalsy: false, mustBeTruthy: true, mustBePrimitive: false, returns: 'number' }}],
  [symbo('date', 'getUTCDate'),         {prop: 'getUTCDate',          isProto: true, typings: { sym: symbo('date', 'getUTCDate'),          mustBeType: 'function', mustBeFalsy: false, mustBeTruthy: true, mustBePrimitive: false, returns: 'number' }}],
  [symbo('date', 'getUTCDay'),          {prop: 'getUTCDay',           isProto: true, typings: { sym: symbo('date', 'getUTCDay'),           mustBeType: 'function', mustBeFalsy: false, mustBeTruthy: true, mustBePrimitive: false, returns: 'number' }}],
  [symbo('date', 'getUTCFullYear'),     {prop: 'getUTCFullYear',      isProto: true, typings: { sym: symbo('date', 'getUTCFullYear'),      mustBeType: 'function', mustBeFalsy: false, mustBeTruthy: true, mustBePrimitive: false, returns: 'number' }}],
  [symbo('date', 'getUTCHours'),        {prop: 'getUTCHours',         isProto: true, typings: { sym: symbo('date', 'getUTCHours'),         mustBeType: 'function', mustBeFalsy: false, mustBeTruthy: true, mustBePrimitive: false, returns: 'number' }}],
  [symbo('date', 'getUTCMilliseconds'), {prop: 'getUTCMilliseconds',  isProto: true, typings: { sym: symbo('date', 'getUTCMilliseconds'),  mustBeType: 'function', mustBeFalsy: false, mustBeTruthy: true, mustBePrimitive: false, returns: 'number' }}],
  [symbo('date', 'getUTCMinutes'),      {prop: 'getUTCMinutes',       isProto: true, typings: { sym: symbo('date', 'getUTCMinutes'),       mustBeType: 'function', mustBeFalsy: false, mustBeTruthy: true, mustBePrimitive: false, returns: 'number' }}],
  [symbo('date', 'getUTCMonth'),        {prop: 'getUTCMonth',         isProto: true, typings: { sym: symbo('date', 'getUTCMonth'),         mustBeType: 'function', mustBeFalsy: false, mustBeTruthy: true, mustBePrimitive: false, returns: 'number' }}],
  [symbo('date', 'getUTCSeconds'),      {prop: 'getUTCSeconds',       isProto: true, typings: { sym: symbo('date', 'getUTCSeconds'),       mustBeType: 'function', mustBeFalsy: false, mustBeTruthy: true, mustBePrimitive: false, returns: 'number' }}],
  [symbo('date', 'setDate'),            {prop: 'setDate',             isProto: true, typings: { sym: symbo('date', 'setDate'),             mustBeType: 'function', mustBeFalsy: false, mustBeTruthy: true, mustBePrimitive: false, returns: 'number' }}],
  [symbo('date', 'setFullYear'),        {prop: 'setFullYear',         isProto: true, typings: { sym: symbo('date', 'setFullYear'),         mustBeType: 'function', mustBeFalsy: false, mustBeTruthy: true, mustBePrimitive: false, returns: 'number' }}],
  [symbo('date', 'setHours'),           {prop: 'setHours',            isProto: true, typings: { sym: symbo('date', 'setHours'),            mustBeType: 'function', mustBeFalsy: false, mustBeTruthy: true, mustBePrimitive: false, returns: 'number' }}],
  [symbo('date', 'setMilliseconds'),    {prop: 'setMilliseconds',     isProto: true, typings: { sym: symbo('date', 'setMilliseconds'),     mustBeType: 'function', mustBeFalsy: false, mustBeTruthy: true, mustBePrimitive: false, returns: 'number' }}],
  [symbo('date', 'setMinutes'),         {prop: 'setMinutes',          isProto: true, typings: { sym: symbo('date', 'setMinutes'),          mustBeType: 'function', mustBeFalsy: false, mustBeTruthy: true, mustBePrimitive: false, returns: 'number' }}],
  [symbo('date', 'setMonth'),           {prop: 'setMonth',            isProto: true, typings: { sym: symbo('date', 'setMonth'),            mustBeType: 'function', mustBeFalsy: false, mustBeTruthy: true, mustBePrimitive: false, returns: 'number' }}],
  [symbo('date', 'setSeconds'),         {prop: 'setSeconds',          isProto: true, typings: { sym: symbo('date', 'setSeconds'),          mustBeType: 'function', mustBeFalsy: false, mustBeTruthy: true, mustBePrimitive: false, returns: 'number' }}],
  [symbo('date', 'setTime'),            {prop: 'setTime',             isProto: true, typings: { sym: symbo('date', 'setTime'),             mustBeType: 'function', mustBeFalsy: false, mustBeTruthy: true, mustBePrimitive: false, returns: 'number' }}],
  [symbo('date', 'setUTCDate'),         {prop: 'setUTCDate',          isProto: true, typings: { sym: symbo('date', 'setUTCDate'),          mustBeType: 'function', mustBeFalsy: false, mustBeTruthy: true, mustBePrimitive: false, returns: 'number' }}],
  [symbo('date', 'setUTCFullYear'),     {prop: 'setUTCFullYear',      isProto: true, typings: { sym: symbo('date', 'setUTCFullYear'),      mustBeType: 'function', mustBeFalsy: false, mustBeTruthy: true, mustBePrimitive: false, returns: 'number' }}],
  [symbo('date', 'setUTCHours'),        {prop: 'setUTCHours',         isProto: true, typings: { sym: symbo('date', 'setUTCHours'),         mustBeType: 'function', mustBeFalsy: false, mustBeTruthy: true, mustBePrimitive: false, returns: 'number' }}],
  [symbo('date', 'setUTCMilliseconds'), {prop: 'setUTCMilliseconds',  isProto: true, typings: { sym: symbo('date', 'setUTCMilliseconds'),  mustBeType: 'function', mustBeFalsy: false, mustBeTruthy: true, mustBePrimitive: false, returns: 'number' }}],
  [symbo('date', 'setUTCMinutes'),      {prop: 'setUTCMinutes',       isProto: true, typings: { sym: symbo('date', 'setUTCMinutes'),       mustBeType: 'function', mustBeFalsy: false, mustBeTruthy: true, mustBePrimitive: false, returns: 'number' }}],
  [symbo('date', 'setUTCMonth'),        {prop: 'setUTCMonth',         isProto: true, typings: { sym: symbo('date', 'setUTCMonth'),         mustBeType: 'function', mustBeFalsy: false, mustBeTruthy: true, mustBePrimitive: false, returns: 'number' }}],
  [symbo('date', 'setUTCSeconds'),      {prop: 'setUTCSeconds',       isProto: true, typings: { sym: symbo('date', 'setUTCSeconds'),       mustBeType: 'function', mustBeFalsy: false, mustBeTruthy: true, mustBePrimitive: false, returns: 'number' }}],
  [symbo('date', 'toDateString'),       {prop: 'toDateString',        isProto: true, typings: { sym: symbo('date', 'toDateString'),        mustBeType: 'function', mustBeFalsy: false, mustBeTruthy: true, mustBePrimitive: false, returns: 'string' }}],
  [symbo('date', 'toISOString'),        {prop: 'toISOString',         isProto: true, typings: { sym: symbo('date', 'toISOString'),         mustBeType: 'function', mustBeFalsy: false, mustBeTruthy: true, mustBePrimitive: false, returns: 'string' }}],
  [symbo('date', 'toJSON'),             {prop: 'toJSON',              isProto: true, typings: { sym: symbo('date', 'toJSON'),              mustBeType: 'function', mustBeFalsy: false, mustBeTruthy: true, mustBePrimitive: false, returns: 'primitive' }}],
  [symbo('date', 'toLocaleDateString'), {prop: 'toLocaleDateString',  isProto: true, typings: { sym: symbo('date', 'toLocaleDateString'),  mustBeType: 'function', mustBeFalsy: false, mustBeTruthy: true, mustBePrimitive: false, returns: 'string' }}],
  [symbo('date', 'toLocaleString'),     {prop: 'toLocaleString',      isProto: true, typings: { sym: symbo('date', 'toLocaleString'),      mustBeType: 'function', mustBeFalsy: false, mustBeTruthy: true, mustBePrimitive: false, returns: 'string' }}],
  [symbo('date', 'toLocaleTimeString'), {prop: 'toLocaleTimeString',  isProto: true, typings: { sym: symbo('date', 'toLocaleTimeString'),  mustBeType: 'function', mustBeFalsy: false, mustBeTruthy: true, mustBePrimitive: false, returns: 'string' }}],
  [symbo('date', 'toString'),           {prop: 'toString',            isProto: true, typings: { sym: symbo('date', 'toString'),            mustBeType: 'function', mustBeFalsy: false, mustBeTruthy: true, mustBePrimitive: false, returns: 'string' }}],
  [symbo('date', 'toTimeString'),       {prop: 'toTimeString',        isProto: true, typings: { sym: symbo('date', 'toTimeString'),        mustBeType: 'function', mustBeFalsy: false, mustBeTruthy: true, mustBePrimitive: false, returns: 'string' }}],
  [symbo('date', 'toUTCString'),        {prop: 'toUTCString',         isProto: true, typings: { sym: symbo('date', 'toUTCString'),         mustBeType: 'function', mustBeFalsy: false, mustBeTruthy: true, mustBePrimitive: false, returns: 'string' }}],
  [symbo('date', 'valueOf'),            {prop: 'valueOf',             isProto: true, typings: { sym: symbo('date', 'valueOf'),             mustBeType: 'function', mustBeFalsy: false, mustBeTruthy: true, mustBePrimitive: false, returns: 'number' }}],
]);


/**
 *      Function
 */


export const FUNCTION = new Map([
  [symbo('Function', 'prototype'), {prop: 'prototype', isProto: false, typings: { sym: symbo('Function', 'prototype'), mustBeType: 'array', mustBeFalsy: false, mustBeTruthy: true, mustBePrimitive: false }}],

  [symbo('function', 'apply'),    {prop: 'apply',     isProto: true, typings: { sym: symbo('function', 'apply'),     mustBeType: 'function', mustBeFalsy: false, mustBeTruthy: true, mustBePrimitive: false, returns: false }}],
  [symbo('function', 'call'),     {prop: 'call',      isProto: true, typings: { sym: symbo('function', 'call'),      mustBeType: 'function', mustBeFalsy: false, mustBeTruthy: true, mustBePrimitive: false, returns: false }}],
  [symbo('function', 'bind'),     {prop: 'bind',      isProto: true, typings: { sym: symbo('function', 'bind'),      mustBeType: 'function', mustBeFalsy: false, mustBeTruthy: true, mustBePrimitive: false, returns: 'function' }}],
  [symbo('function', 'toString'), {prop: 'toString',  isProto: true, typings: { sym: symbo('function', 'toString'),  mustBeType: 'function', mustBeFalsy: false, mustBeTruthy: true, mustBePrimitive: false, returns: 'string' }}],
]);


/**
 *    JSON
 */


export const $JSON = new Map([
  [symbo('JSON', 'parse'),     {prop: 'parse',     isProto: false, typings: { sym: symbo('JSON', 'parse'),     mustBeType: 'function', mustBeFalsy: false, mustBeTruthy: true, mustBePrimitive: false, returns: false }}], // Note: null returns null so not always an object
  [symbo('JSON', 'stringify'), {prop: 'stringify', isProto: false, typings: { sym: symbo('JSON', 'stringify'), mustBeType: 'function', mustBeFalsy: false, mustBeTruthy: true, mustBePrimitive: false, returns: 'primitive' }}], // Note: undefined returns undefined so it's not always a string
]);


/**
 *      Math
 */


export const MATH = new Map([
  [symbo('Math', 'E'),       {prop: 'E',       isProto: false, typings: { sym: symbo('Math', 'E'),       mustBeType: 'number', mustBeFalsy: false, mustBeTruthy: true, mustBePrimitive: true, mustBeValue: false }}], // don't inline, it will lead to rounding errors
  [symbo('Math', 'LN10'),    {prop: 'LN10',    isProto: false, typings: { sym: symbo('Math', 'LN10'),    mustBeType: 'number', mustBeFalsy: false, mustBeTruthy: true, mustBePrimitive: true, mustBeValue: false }}], // don't inline, it will lead to rounding errors
  [symbo('Math', 'LN2'),     {prop: 'LN2',     isProto: false, typings: { sym: symbo('Math', 'LN2'),     mustBeType: 'number', mustBeFalsy: false, mustBeTruthy: true, mustBePrimitive: true, mustBeValue: false }}], // don't inline, it will lead to rounding errors
  [symbo('Math', 'LOG10E'),  {prop: 'LOG10E',  isProto: false, typings: { sym: symbo('Math', 'LOG10E'),  mustBeType: 'number', mustBeFalsy: false, mustBeTruthy: true, mustBePrimitive: true, mustBeValue: false }}], // don't inline, it will lead to rounding errors
  [symbo('Math', 'LOG2E'),   {prop: 'LOG2E',   isProto: false, typings: { sym: symbo('Math', 'LOG2E'),   mustBeType: 'number', mustBeFalsy: false, mustBeTruthy: true, mustBePrimitive: true, mustBeValue: false }}], // don't inline, it will lead to rounding errors
  [symbo('Math', 'PI'),      {prop: 'PI',      isProto: false, typings: { sym: symbo('Math', 'PI'),      mustBeType: 'number', mustBeFalsy: false, mustBeTruthy: true, mustBePrimitive: true, mustBeValue: false }}], // don't inline, it will lead to rounding errors
  [symbo('Math', 'SQRT1_2'), {prop: 'SQRT1_2', isProto: false, typings: { sym: symbo('Math', 'SQRT1_2'), mustBeType: 'number', mustBeFalsy: false, mustBeTruthy: true, mustBePrimitive: true, mustBeValue: false }}], // don't inline, it will lead to rounding errors
  [symbo('Math', 'SQRT2'),   {prop: 'SQRT2',   isProto: false, typings: { sym: symbo('Math', 'SQRT2'),   mustBeType: 'number', mustBeFalsy: false, mustBeTruthy: true, mustBePrimitive: true, mustBeValue: false }}], // don't inline, it will lead to rounding errors

  [symbo('Math', 'abs'),      {prop: 'abs',      isProto: false, typings: { sym: symbo('Math', 'abs'),      mustBeType: 'function', mustBeFalsy: false, mustBeTruthy: true, mustBePrimitive: false, returns: 'number' }}],
  [symbo('Math', 'acos'),     {prop: 'acos',     isProto: false, typings: { sym: symbo('Math', 'acos'),     mustBeType: 'function', mustBeFalsy: false, mustBeTruthy: true, mustBePrimitive: false, returns: 'number' }}],
  [symbo('Math', 'acosh'),    {prop: 'acosh',    isProto: false, typings: { sym: symbo('Math', 'acosh'),    mustBeType: 'function', mustBeFalsy: false, mustBeTruthy: true, mustBePrimitive: false, returns: 'number' }}],
  [symbo('Math', 'asin'),     {prop: 'asin',     isProto: false, typings: { sym: symbo('Math', 'asin'),     mustBeType: 'function', mustBeFalsy: false, mustBeTruthy: true, mustBePrimitive: false, returns: 'number' }}],
  [symbo('Math', 'asinh'),    {prop: 'asinh',    isProto: false, typings: { sym: symbo('Math', 'asinh'),    mustBeType: 'function', mustBeFalsy: false, mustBeTruthy: true, mustBePrimitive: false, returns: 'number' }}],
  [symbo('Math', 'atan'),     {prop: 'atan',     isProto: false, typings: { sym: symbo('Math', 'atan'),     mustBeType: 'function', mustBeFalsy: false, mustBeTruthy: true, mustBePrimitive: false, returns: 'number' }}],
  [symbo('Math', 'atan2'),    {prop: 'atan2',    isProto: false, typings: { sym: symbo('Math', 'atan2'),    mustBeType: 'function', mustBeFalsy: false, mustBeTruthy: true, mustBePrimitive: false, returns: 'number' }}],
  [symbo('Math', 'atanh'),    {prop: 'atanh',    isProto: false, typings: { sym: symbo('Math', 'atanh'),    mustBeType: 'function', mustBeFalsy: false, mustBeTruthy: true, mustBePrimitive: false, returns: 'number' }}],
  [symbo('Math', 'cbrt'),     {prop: 'cbrt',     isProto: false, typings: { sym: symbo('Math', 'cbrt'),     mustBeType: 'function', mustBeFalsy: false, mustBeTruthy: true, mustBePrimitive: false, returns: 'number' }}],
  [symbo('Math', 'ceil'),     {prop: 'ceil',     isProto: false, typings: { sym: symbo('Math', 'ceil'),     mustBeType: 'function', mustBeFalsy: false, mustBeTruthy: true, mustBePrimitive: false, returns: 'number' }}],
  [symbo('Math', 'clz32'),    {prop: 'clz32',    isProto: false, typings: { sym: symbo('Math', 'clz32'),    mustBeType: 'function', mustBeFalsy: false, mustBeTruthy: true, mustBePrimitive: false, returns: 'number' }}],
  [symbo('Math', 'cos'),      {prop: 'cos',      isProto: false, typings: { sym: symbo('Math', 'cos'),      mustBeType: 'function', mustBeFalsy: false, mustBeTruthy: true, mustBePrimitive: false, returns: 'number' }}],
  [symbo('Math', 'cosh'),     {prop: 'cosh',     isProto: false, typings: { sym: symbo('Math', 'cosh'),     mustBeType: 'function', mustBeFalsy: false, mustBeTruthy: true, mustBePrimitive: false, returns: 'number' }}],
  [symbo('Math', 'exp'),      {prop: 'exp',      isProto: false, typings: { sym: symbo('Math', 'exp'),      mustBeType: 'function', mustBeFalsy: false, mustBeTruthy: true, mustBePrimitive: false, returns: 'number' }}],
  [symbo('Math', 'expm1'),    {prop: 'expm1',    isProto: false, typings: { sym: symbo('Math', 'expm1'),    mustBeType: 'function', mustBeFalsy: false, mustBeTruthy: true, mustBePrimitive: false, returns: 'number' }}],
  [symbo('Math', 'f16round'), {prop: 'f16round', isProto: false, typings: { sym: symbo('Math', 'f16round'), mustBeType: 'function', mustBeFalsy: false, mustBeTruthy: true, mustBePrimitive: false, returns: 'number' }}],
  [symbo('Math', 'floor'),    {prop: 'floor',    isProto: false, typings: { sym: symbo('Math', 'floor'),    mustBeType: 'function', mustBeFalsy: false, mustBeTruthy: true, mustBePrimitive: false, returns: 'number' }}],
  [symbo('Math', 'fround'),   {prop: 'fround',   isProto: false, typings: { sym: symbo('Math', 'fround'),   mustBeType: 'function', mustBeFalsy: false, mustBeTruthy: true, mustBePrimitive: false, returns: 'number' }}],
  [symbo('Math', 'hypot'),    {prop: 'hypot',    isProto: false, typings: { sym: symbo('Math', 'hypot'),    mustBeType: 'function', mustBeFalsy: false, mustBeTruthy: true, mustBePrimitive: false, returns: 'number' }}],
  [symbo('Math', 'imul'),     {prop: 'imul',     isProto: false, typings: { sym: symbo('Math', 'imul'),     mustBeType: 'function', mustBeFalsy: false, mustBeTruthy: true, mustBePrimitive: false, returns: 'number' }}],
  [symbo('Math', 'log'),      {prop: 'log',      isProto: false, typings: { sym: symbo('Math', 'log'),      mustBeType: 'function', mustBeFalsy: false, mustBeTruthy: true, mustBePrimitive: false, returns: 'number' }}],
  [symbo('Math', 'log10'),    {prop: 'log10',    isProto: false, typings: { sym: symbo('Math', 'log10'),    mustBeType: 'function', mustBeFalsy: false, mustBeTruthy: true, mustBePrimitive: false, returns: 'number' }}],
  [symbo('Math', 'log1p'),    {prop: 'log1p',    isProto: false, typings: { sym: symbo('Math', 'log1p'),    mustBeType: 'function', mustBeFalsy: false, mustBeTruthy: true, mustBePrimitive: false, returns: 'number' }}],
  [symbo('Math', 'log2'),     {prop: 'log2',     isProto: false, typings: { sym: symbo('Math', 'log2'),     mustBeType: 'function', mustBeFalsy: false, mustBeTruthy: true, mustBePrimitive: false, returns: 'number' }}],
  [symbo('Math', 'max'),      {prop: 'max',      isProto: false, typings: { sym: symbo('Math', 'max'),      mustBeType: 'function', mustBeFalsy: false, mustBeTruthy: true, mustBePrimitive: false, returns: 'number' }}],
  [symbo('Math', 'min'),      {prop: 'min',      isProto: false, typings: { sym: symbo('Math', 'min'),      mustBeType: 'function', mustBeFalsy: false, mustBeTruthy: true, mustBePrimitive: false, returns: 'number' }}],
  [symbo('Math', 'pow'),      {prop: 'pow',      isProto: false, typings: { sym: symbo('Math', 'pow'),      mustBeType: 'function', mustBeFalsy: false, mustBeTruthy: true, mustBePrimitive: false, returns: 'number' }}],
  [symbo('Math', 'random'),   {prop: 'random',   isProto: false, typings: { sym: symbo('Math', 'random'),   mustBeType: 'function', mustBeFalsy: false, mustBeTruthy: true, mustBePrimitive: false, returns: 'number' }}],
  [symbo('Math', 'round'),    {prop: 'round',    isProto: false, typings: { sym: symbo('Math', 'round'),    mustBeType: 'function', mustBeFalsy: false, mustBeTruthy: true, mustBePrimitive: false, returns: 'number' }}],
  [symbo('Math', 'sign'),     {prop: 'sign',     isProto: false, typings: { sym: symbo('Math', 'sign'),     mustBeType: 'function', mustBeFalsy: false, mustBeTruthy: true, mustBePrimitive: false, returns: 'number' }}],
  [symbo('Math', 'sin'),      {prop: 'sin',      isProto: false, typings: { sym: symbo('Math', 'sin'),      mustBeType: 'function', mustBeFalsy: false, mustBeTruthy: true, mustBePrimitive: false, returns: 'number' }}],
  [symbo('Math', 'sinh'),     {prop: 'sinh',     isProto: false, typings: { sym: symbo('Math', 'sinh'),     mustBeType: 'function', mustBeFalsy: false, mustBeTruthy: true, mustBePrimitive: false, returns: 'number' }}],
  [symbo('Math', 'sqrt'),     {prop: 'sqrt',     isProto: false, typings: { sym: symbo('Math', 'sqrt'),     mustBeType: 'function', mustBeFalsy: false, mustBeTruthy: true, mustBePrimitive: false, returns: 'number' }}],
  [symbo('Math', 'tan'),      {prop: 'tan',      isProto: false, typings: { sym: symbo('Math', 'tan'),      mustBeType: 'function', mustBeFalsy: false, mustBeTruthy: true, mustBePrimitive: false, returns: 'number' }}],
  [symbo('Math', 'tanh'),     {prop: 'tanh',     isProto: false, typings: { sym: symbo('Math', 'tanh'),     mustBeType: 'function', mustBeFalsy: false, mustBeTruthy: true, mustBePrimitive: false, returns: 'number' }}],
  [symbo('Math', 'trunc'),    {prop: 'trunc',    isProto: false, typings: { sym: symbo('Math', 'trunc'),    mustBeType: 'function', mustBeFalsy: false, mustBeTruthy: true, mustBePrimitive: false, returns: 'number' }}],
])


/**
 *      RegExp
 */


// The only exception to the static<>instance mapping: RegExp <> regex :grimmace:
export const REGEXP = new Map([
  [symbo('RegExp', 'prototype'), {prop: 'prototype', isProto: false, typings: { sym: symbo('RegExp', 'prototype'), mustBeType: 'array', mustBeFalsy: false, mustBeTruthy: true, mustBePrimitive: false }}],

  // Note: there are some legacy static props that mdn lists. I don't think we should try to support them. Not worth the squeeze.
  [symbo('RegExp', 'escape'), {prop: 'escape', isProto: false, typings: { sym: symbo('RegExp', 'escape'), mustBeType: 'function', mustBeFalsy: false, mustBeTruthy: true, mustBePrimitive: false, returns: 'string' }}],
  // Not sure what to do with RegExp.lastIndex

  [symbo('regex', 'exec'),     {prop: 'exec', isProto: true, typings: { sym: symbo('regex', 'exec'), mustBeType: 'function', mustBeFalsy: false, mustBeTruthy: true, mustBePrimitive: false, returns: false }}],
  [symbo('regex', 'test'),     {prop: 'test',  isProto: true, typings: { sym: symbo('regex', 'test'),  mustBeType: 'function', mustBeFalsy: false, mustBeTruthy: true, mustBePrimitive: false, returns: false }}],
  [symbo('regex', 'toString'), {prop: 'toString',  isProto: true, typings: { sym: symbo('regex', 'toString'),  mustBeType: 'function', mustBeFalsy: false, mustBeTruthy: true, mustBePrimitive: false, returns: 'function' }}],
  // Note: there are a bunch of instance properties available like, flags, global, hasIndices, etc. Not sure if they need to be exposed here. TBD
]);


/**
 *      Buffer
 */


// Kinda need buffer to recognize the base64 trick
export const BUFFER = new Map([
  [symbo('Buffer', 'prototype'), {prop: 'prototype', isProto: false, typings: { sym: symbo('Buffer', 'prototype'), mustBeType: 'array', mustBeFalsy: false, mustBeTruthy: true, mustBePrimitive: false }}],

  // Note: there are some legacy static props that mdn lists. I don't think we should try to support them. Not worth the squeeze.
  [symbo('Buffer', 'from'), {prop: 'from', isProto: true, typings: { sym: symbo('Buffer', 'from'), mustBeType: 'function', mustBeFalsy: false, mustBeTruthy: true, mustBePrimitive: false, returns: 'buffer' }}],
  // Not sure what to do with RegExp.lastIndex

  [symbo('buffer', 'toString'), {prop: 'toString', isProto: true, typings: { sym: symbo('buffer', 'toString'), mustBeType: 'function', mustBeFalsy: false, mustBeTruthy: true, mustBePrimitive: false, returns: 'string' }}],
  [symbo('buffer', 'valueOf'),  {prop: 'valueOf',  isProto: true, typings: { sym: symbo('buffer', 'valueOf'),  mustBeType: 'function', mustBeFalsy: false, mustBeTruthy: true, mustBePrimitive: false, returns: 'buffer' }}],
  // Note: there are a bunch of instance properties available like, flags, global, hasIndices, etc. Not sure if they need to be exposed here. TBD
]);



/**
 *      Aggregates
 */


// TODO: rename back to PREVAL_BUILTIN_SYMBOLS after the switch
export const BUILTIN_SYMBOLS = new Map([
  Array.from(BOOLEAN.entries()),
  Array.from(NUMBER.entries()),
  Array.from(STRING.entries()),
  Array.from(OBJECT.entries()),
  Array.from(ARRAY.entries()),
  Array.from(DATE.entries()),
  Array.from(FUNCTION.entries()),
  Array.from($JSON.entries()),
  Array.from(MATH.entries()),
  Array.from(REGEXP.entries()),
  Array.from(BUFFER.entries()),
  // Map, Set, WeakMap, WeakSet, AraryBuffer, etc?
].flat());
