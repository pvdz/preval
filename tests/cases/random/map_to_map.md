# Preval test case

# map_to_map.md

> random > map_to_map
>
> Defining a map with primitives that is immediately converted to another map

More of a concept that should be possible to be folded. This is very close to actual code used in Preval :p

#TODO

## Input

`````js filename=intro
$(
  new Map(
    [
      ...new Map([
        ['clearInterval', 'global.clearInterval'],
        ['clearTimeout', 'global.clearTimeout'],
        ['console', 'global.console'],
        ['false', 'boolean'],
        ['null', 'null'],
        ['this', 'undefined'],
        ['parseInt', 'global.parseInt'],
        ['parseFloat', 'global.parseFloat'],
        ['setInterval', 'global.setInterval'],
        ['setTimeout', 'global.setTimeout'],
        ['true', 'boolean'],
        ['undefined', 'undefined'],
        ['Array', 'Array'],
        ['Boolean', 'Boolean'],
        ['Date', 'Date'],
        ['Error', 'Error'],
        ['Infinity', 'number'],
        ['JSON', 'JSON'],
        ['Math', 'Math'],
        ['Map', 'Map'],
        ['NaN', 'NaN'],
        ['Number', 'Number'],
        ['Object', 'Object'],
        ['RegExp', 'RegExp'],
        ['Set', 'Set'],
        ['String', 'String'],
        ['$', '$'],
      ]).keys(),
      'module',
    ].map((k) => [k, k]),
  ).get('$'),
);
`````

## Normalized

`````js filename=intro
var tmpArg;
var tmpObj;
var tmpArg_1;
var tmpArg_2;
var tmpObj_1;
var tmpObj_2;
var tmpArg_3;
tmpArg = ((tmpArg_2 = (k) => [k, k]),
(tmpArg_1 = ((tmpObj_1 = [
  ...((tmpArg_3 = [
    ['clearInterval', 'global.clearInterval'],
    ['clearTimeout', 'global.clearTimeout'],
    ['console', 'global.console'],
    ['false', 'boolean'],
    ['null', 'null'],
    ['this', 'undefined'],
    ['parseInt', 'global.parseInt'],
    ['parseFloat', 'global.parseFloat'],
    ['setInterval', 'global.setInterval'],
    ['setTimeout', 'global.setTimeout'],
    ['true', 'boolean'],
    ['undefined', 'undefined'],
    ['Array', 'Array'],
    ['Boolean', 'Boolean'],
    ['Date', 'Date'],
    ['Error', 'Error'],
    ['Infinity', 'number'],
    ['JSON', 'JSON'],
    ['Math', 'Math'],
    ['Map', 'Map'],
    ['NaN', 'NaN'],
    ['Number', 'Number'],
    ['Object', 'Object'],
    ['RegExp', 'RegExp'],
    ['Set', 'Set'],
    ['String', 'String'],
    ['$', '$'],
  ]),
  (tmpObj_2 = new Map(tmpArg_3)),
  tmpObj_2).keys(),
  'module',
]),
tmpObj_1).map(tmpArg_2)),
(tmpObj = new Map(tmpArg_1)),
tmpObj).get('$');
$(tmpArg);
`````

## Output

`````js filename=intro
var tmpArg;
var tmpObj;
var tmpArg_1;
var tmpArg_2;
var tmpObj_1;
var tmpObj_2;
var tmpArg_3;
tmpArg = ((tmpArg_2 = (k) => [k, k]),
(tmpArg_1 = ((tmpObj_1 = [
  ...((tmpArg_3 = [
    ['clearInterval', 'global.clearInterval'],
    ['clearTimeout', 'global.clearTimeout'],
    ['console', 'global.console'],
    ['false', 'boolean'],
    ['null', 'null'],
    ['this', 'undefined'],
    ['parseInt', 'global.parseInt'],
    ['parseFloat', 'global.parseFloat'],
    ['setInterval', 'global.setInterval'],
    ['setTimeout', 'global.setTimeout'],
    ['true', 'boolean'],
    ['undefined', 'undefined'],
    ['Array', 'Array'],
    ['Boolean', 'Boolean'],
    ['Date', 'Date'],
    ['Error', 'Error'],
    ['Infinity', 'number'],
    ['JSON', 'JSON'],
    ['Math', 'Math'],
    ['Map', 'Map'],
    ['NaN', 'NaN'],
    ['Number', 'Number'],
    ['Object', 'Object'],
    ['RegExp', 'RegExp'],
    ['Set', 'Set'],
    ['String', 'String'],
    ['$', '$'],
  ]),
  (tmpObj_2 = new Map(tmpArg_3)),
  tmpObj_2).keys(),
  'module',
]),
tmpObj_1).map(tmpArg_2)),
(tmpObj = new Map(tmpArg_1)),
tmpObj).get('$');
$(tmpArg);
`````
