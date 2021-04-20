// Built-in symbol names and their `typeof` result

const globalNames = new Map([
  ['clearInterval', 'function'],
  ['clearTimeout', 'function'],
  ['console', 'function'],
  //['false', 'boolean'],
  //['null', 'null'],
  ['this', 'undefined'], // true in strict mode
  ['parseInt', 'function'],
  ['parseFloat', 'function'],
  ['setInterval', 'function'],
  ['setTimeout', 'function'],
  //['true', 'boolean'],
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

  // special
  ['$', '$'],
  ['objPatternRest', 'objPatternRest'],

  // nodejs
  ['module', 'object'],
]);

export default globalNames;
