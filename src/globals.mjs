// A mapping from global symbol to internal type representation of that value
// All these names ought to be exposed on the global object, even the syntactic keywords (our system does not care)
// Note: there is no auto-global `arguments` and `super` is not handled through scoping
export default new Map([
  ['clearInterval', 'global.clearInterval'],
  ['clearTimeout', 'global.clearTimeout'],
  ['console', 'global.console'],
  ['false', 'boolean'],
  ['null', 'null'],
  ['this', 'undefined'], // true in strict mode
  ['parseInt', 'global.parseInt'],
  ['parseFloat', 'global.parseFloat'],
  ['setInterval', 'global.setInterval'],
  ['setTimeout', 'global.setTimeout'],
  ['true', 'boolean'],
  ['undefined', 'undefined'],
  ['Array', 'Array'],
  ['Boolean', 'Boolean'],
  ['Error', 'Error'],
  ['Infinity', 'number'],
  ['JSON', 'JSON'],
  ['Math', 'Math'],
  ['Map', 'Map'],
  ['Number', 'Number'],
  ['Object', 'Object'],
  ['RegExp', 'RegExp'],
  ['Set', 'Set'],
  ['String', 'String'],
]);
