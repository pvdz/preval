// Built-in symbol names and their `typeof` result

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

  ['$ArrayPrototype', { mustBeType: 'object', mustBeFalsy: false, mustBeTruthy: true, mustBePrimitive: false }],
  ['$FunctionPrototype', { mustBeType: 'object', mustBeFalsy: false, mustBeTruthy: true, mustBePrimitive: false }],
  ['$NumberPrototype', { mustBeType: 'object', mustBeFalsy: false, mustBeTruthy: true, mustBePrimitive: false }],
  ['$ObjectPrototype', { mustBeType: 'object', mustBeFalsy: false, mustBeTruthy: true, mustBePrimitive: false }],
  ['$StringPrototype', { mustBeType: 'object', mustBeFalsy: false, mustBeTruthy: true, mustBePrimitive: false }],
]);

export default globalNames;
