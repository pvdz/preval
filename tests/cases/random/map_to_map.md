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
var tmpElement;
var tmpObj_2;
var tmpArg_3;
var tmpElement_1;
var tmpElement_2;
var tmpElement_3;
var tmpElement_4;
var tmpElement_5;
var tmpElement_6;
var tmpElement_7;
var tmpElement_8;
var tmpElement_9;
var tmpElement_10;
var tmpElement_11;
var tmpElement_12;
var tmpElement_13;
var tmpElement_14;
var tmpElement_15;
var tmpElement_16;
var tmpElement_17;
var tmpElement_18;
var tmpElement_19;
var tmpElement_20;
var tmpElement_21;
var tmpElement_22;
var tmpElement_23;
var tmpElement_24;
var tmpElement_25;
var tmpElement_26;
var tmpElement_27;
tmpArg_2 = (k) => [k, k];
tmpElement_1 = ['clearInterval', 'global.clearInterval'];
tmpElement_2 = ['clearTimeout', 'global.clearTimeout'];
tmpElement_3 = ['console', 'global.console'];
tmpElement_4 = ['false', 'boolean'];
tmpElement_5 = ['null', 'null'];
tmpElement_6 = ['this', 'undefined'];
tmpElement_7 = ['parseInt', 'global.parseInt'];
tmpElement_8 = ['parseFloat', 'global.parseFloat'];
tmpElement_9 = ['setInterval', 'global.setInterval'];
tmpElement_10 = ['setTimeout', 'global.setTimeout'];
tmpElement_11 = ['true', 'boolean'];
tmpElement_12 = ['undefined', 'undefined'];
tmpElement_13 = ['Array', 'Array'];
tmpElement_14 = ['Boolean', 'Boolean'];
tmpElement_15 = ['Date', 'Date'];
tmpElement_16 = ['Error', 'Error'];
tmpElement_17 = ['Infinity', 'number'];
tmpElement_18 = ['JSON', 'JSON'];
tmpElement_19 = ['Math', 'Math'];
tmpElement_20 = ['Map', 'Map'];
tmpElement_21 = ['NaN', 'NaN'];
tmpElement_22 = ['Number', 'Number'];
tmpElement_23 = ['Object', 'Object'];
tmpElement_24 = ['RegExp', 'RegExp'];
tmpElement_25 = ['Set', 'Set'];
tmpElement_26 = ['String', 'String'];
tmpElement_27 = ['$', '$'];
tmpArg_3 = [
  tmpElement_1,
  tmpElement_2,
  tmpElement_3,
  tmpElement_4,
  tmpElement_5,
  tmpElement_6,
  tmpElement_7,
  tmpElement_8,
  tmpElement_9,
  tmpElement_10,
  tmpElement_11,
  tmpElement_12,
  tmpElement_13,
  tmpElement_14,
  tmpElement_15,
  tmpElement_16,
  tmpElement_17,
  tmpElement_18,
  tmpElement_19,
  tmpElement_20,
  tmpElement_21,
  tmpElement_22,
  tmpElement_23,
  tmpElement_24,
  tmpElement_25,
  tmpElement_26,
  tmpElement_27,
];
tmpObj_2 = new Map(tmpArg_3);
tmpElement = tmpObj_2.keys();
tmpObj_1 = [tmpElement, 'module'];
tmpArg_1 = tmpObj_1.map(tmpArg_2);
tmpObj = new Map(tmpArg_1);
tmpArg = tmpObj.get('$');
$(tmpArg);
`````

## Output

`````js filename=intro
var tmpArg;
var tmpObj;
var tmpArg_1;
var tmpArg_2;
var tmpObj_1;
var tmpElement;
var tmpObj_2;
var tmpArg_3;
var tmpElement_1;
var tmpElement_2;
var tmpElement_3;
var tmpElement_4;
var tmpElement_5;
var tmpElement_6;
var tmpElement_7;
var tmpElement_8;
var tmpElement_9;
var tmpElement_10;
var tmpElement_11;
var tmpElement_12;
var tmpElement_13;
var tmpElement_14;
var tmpElement_15;
var tmpElement_16;
var tmpElement_17;
var tmpElement_18;
var tmpElement_19;
var tmpElement_20;
var tmpElement_21;
var tmpElement_22;
var tmpElement_23;
var tmpElement_24;
var tmpElement_25;
var tmpElement_26;
var tmpElement_27;
tmpArg_2 = (k) => [k, k];
tmpElement_1 = ['clearInterval', 'global.clearInterval'];
tmpElement_2 = ['clearTimeout', 'global.clearTimeout'];
tmpElement_3 = ['console', 'global.console'];
tmpElement_4 = ['false', 'boolean'];
tmpElement_5 = ['null', 'null'];
tmpElement_6 = ['this', 'undefined'];
tmpElement_7 = ['parseInt', 'global.parseInt'];
tmpElement_8 = ['parseFloat', 'global.parseFloat'];
tmpElement_9 = ['setInterval', 'global.setInterval'];
tmpElement_10 = ['setTimeout', 'global.setTimeout'];
tmpElement_11 = ['true', 'boolean'];
tmpElement_12 = ['undefined', 'undefined'];
tmpElement_13 = ['Array', 'Array'];
tmpElement_14 = ['Boolean', 'Boolean'];
tmpElement_15 = ['Date', 'Date'];
tmpElement_16 = ['Error', 'Error'];
tmpElement_17 = ['Infinity', 'number'];
tmpElement_18 = ['JSON', 'JSON'];
tmpElement_19 = ['Math', 'Math'];
tmpElement_20 = ['Map', 'Map'];
tmpElement_21 = ['NaN', 'NaN'];
tmpElement_22 = ['Number', 'Number'];
tmpElement_23 = ['Object', 'Object'];
tmpElement_24 = ['RegExp', 'RegExp'];
tmpElement_25 = ['Set', 'Set'];
tmpElement_26 = ['String', 'String'];
tmpElement_27 = ['$', '$'];
tmpArg_3 = [
  tmpElement_1,
  tmpElement_2,
  tmpElement_3,
  tmpElement_4,
  tmpElement_5,
  tmpElement_6,
  tmpElement_7,
  tmpElement_8,
  tmpElement_9,
  tmpElement_10,
  tmpElement_11,
  tmpElement_12,
  tmpElement_13,
  tmpElement_14,
  tmpElement_15,
  tmpElement_16,
  tmpElement_17,
  tmpElement_18,
  tmpElement_19,
  tmpElement_20,
  tmpElement_21,
  tmpElement_22,
  tmpElement_23,
  tmpElement_24,
  tmpElement_25,
  tmpElement_26,
  tmpElement_27,
];
tmpObj_2 = new Map(tmpArg_3);
tmpElement = tmpObj_2.keys();
tmpObj_1 = [tmpElement, 'module'];
tmpArg_1 = tmpObj_1.map(tmpArg_2);
tmpObj = new Map(tmpArg_1);
tmpArg = tmpObj.get('$');
$(tmpArg);
`````
