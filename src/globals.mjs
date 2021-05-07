// Built-in symbol names and their `typeof` result

const globalNames = new Map([
  ['clearInterval', 'function'],
  ['clearTimeout', 'function'],
  ['console', 'function'],
  ['parseInt', 'function'],
  ['parseFloat', 'function'],
  ['setInterval', 'function'],
  ['setTimeout', 'function'],
  ['undefined', 'undefined'],
  ['Array', 'function'],
  ['Boolean', 'function'],
  ['Date', 'function'],
  ['Error', 'function'],
  ['Infinity', 'number'],
  ['JSON', 'object'],
  ['Math', 'object'],
  ['Map', 'function'],
  ['NaN', 'number'],
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
  ['objPatternRest', 'function'], // Should we tell Preval this is a function?
  ['$dotCall', 'function'], // Should we tell Preval this is a function?
]);

export default globalNames;
