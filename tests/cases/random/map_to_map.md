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
var tmpArg$1;
var tmpArg$2;
var tmpArg$3;
var tmpElement;
var tmpElement$1;
var tmpElement$10;
var tmpElement$11;
var tmpElement$12;
var tmpElement$13;
var tmpElement$14;
var tmpElement$15;
var tmpElement$16;
var tmpElement$17;
var tmpElement$18;
var tmpElement$19;
var tmpElement$2;
var tmpElement$20;
var tmpElement$21;
var tmpElement$22;
var tmpElement$23;
var tmpElement$24;
var tmpElement$25;
var tmpElement$26;
var tmpElement$27;
var tmpElement$3;
var tmpElement$4;
var tmpElement$5;
var tmpElement$6;
var tmpElement$7;
var tmpElement$8;
var tmpElement$9;
var tmpMemberComplexObj;
var tmpMemberComplexObj$1;
var tmpMemberComplexObj$2;
tmpArg$2 = (k) => {
  {
    let tmpReturnArg = [k, k];
    return tmpReturnArg;
  }
};
tmpElement$1 = ['clearInterval', 'global.clearInterval'];
tmpElement$2 = ['clearTimeout', 'global.clearTimeout'];
tmpElement$3 = ['console', 'global.console'];
tmpElement$4 = ['false', 'boolean'];
tmpElement$5 = ['null', 'null'];
tmpElement$6 = ['this', 'undefined'];
tmpElement$7 = ['parseInt', 'global.parseInt'];
tmpElement$8 = ['parseFloat', 'global.parseFloat'];
tmpElement$9 = ['setInterval', 'global.setInterval'];
tmpElement$10 = ['setTimeout', 'global.setTimeout'];
tmpElement$11 = ['true', 'boolean'];
tmpElement$12 = ['undefined', 'undefined'];
tmpElement$13 = ['Array', 'Array'];
tmpElement$14 = ['Boolean', 'Boolean'];
tmpElement$15 = ['Date', 'Date'];
tmpElement$16 = ['Error', 'Error'];
tmpElement$17 = ['Infinity', 'number'];
tmpElement$18 = ['JSON', 'JSON'];
tmpElement$19 = ['Math', 'Math'];
tmpElement$20 = ['Map', 'Map'];
tmpElement$21 = ['NaN', 'NaN'];
tmpElement$22 = ['Number', 'Number'];
tmpElement$23 = ['Object', 'Object'];
tmpElement$24 = ['RegExp', 'RegExp'];
tmpElement$25 = ['Set', 'Set'];
tmpElement$26 = ['String', 'String'];
tmpElement$27 = ['$', '$'];
tmpArg$3 = [
  tmpElement$1,
  tmpElement$2,
  tmpElement$3,
  tmpElement$4,
  tmpElement$5,
  tmpElement$6,
  tmpElement$7,
  tmpElement$8,
  tmpElement$9,
  tmpElement$10,
  tmpElement$11,
  tmpElement$12,
  tmpElement$13,
  tmpElement$14,
  tmpElement$15,
  tmpElement$16,
  tmpElement$17,
  tmpElement$18,
  tmpElement$19,
  tmpElement$20,
  tmpElement$21,
  tmpElement$22,
  tmpElement$23,
  tmpElement$24,
  tmpElement$25,
  tmpElement$26,
  tmpElement$27,
];
tmpMemberComplexObj$2 = new Map(tmpArg$3);
tmpElement = tmpMemberComplexObj$2.keys();
tmpMemberComplexObj$1 = [...tmpElement, 'module'];
tmpArg$1 = tmpMemberComplexObj$1.map(tmpArg$2);
tmpMemberComplexObj = new Map(tmpArg$1);
tmpArg = tmpMemberComplexObj.get('$');
$(tmpArg);
`````

## Output

`````js filename=intro
var tmpArg;
var tmpArg$1;
var tmpArg$2;
var tmpArg$3;
var tmpElement;
var tmpElement$1;
var tmpElement$10;
var tmpElement$11;
var tmpElement$12;
var tmpElement$13;
var tmpElement$14;
var tmpElement$15;
var tmpElement$16;
var tmpElement$17;
var tmpElement$18;
var tmpElement$19;
var tmpElement$2;
var tmpElement$20;
var tmpElement$21;
var tmpElement$22;
var tmpElement$23;
var tmpElement$24;
var tmpElement$25;
var tmpElement$26;
var tmpElement$27;
var tmpElement$3;
var tmpElement$4;
var tmpElement$5;
var tmpElement$6;
var tmpElement$7;
var tmpElement$8;
var tmpElement$9;
var tmpMemberComplexObj;
var tmpMemberComplexObj$1;
var tmpMemberComplexObj$2;
tmpArg$2 = (k) => {
  let tmpReturnArg = [k, k];
  return tmpReturnArg;
};
tmpElement$1 = ['clearInterval', 'global.clearInterval'];
tmpElement$2 = ['clearTimeout', 'global.clearTimeout'];
tmpElement$3 = ['console', 'global.console'];
tmpElement$4 = ['false', 'boolean'];
tmpElement$5 = ['null', 'null'];
tmpElement$6 = ['this', 'undefined'];
tmpElement$7 = ['parseInt', 'global.parseInt'];
tmpElement$8 = ['parseFloat', 'global.parseFloat'];
tmpElement$9 = ['setInterval', 'global.setInterval'];
tmpElement$10 = ['setTimeout', 'global.setTimeout'];
tmpElement$11 = ['true', 'boolean'];
tmpElement$12 = ['undefined', 'undefined'];
tmpElement$13 = ['Array', 'Array'];
tmpElement$14 = ['Boolean', 'Boolean'];
tmpElement$15 = ['Date', 'Date'];
tmpElement$16 = ['Error', 'Error'];
tmpElement$17 = ['Infinity', 'number'];
tmpElement$18 = ['JSON', 'JSON'];
tmpElement$19 = ['Math', 'Math'];
tmpElement$20 = ['Map', 'Map'];
tmpElement$21 = ['NaN', 'NaN'];
tmpElement$22 = ['Number', 'Number'];
tmpElement$23 = ['Object', 'Object'];
tmpElement$24 = ['RegExp', 'RegExp'];
tmpElement$25 = ['Set', 'Set'];
tmpElement$26 = ['String', 'String'];
tmpElement$27 = ['$', '$'];
tmpArg$3 = [
  tmpElement$1,
  tmpElement$2,
  tmpElement$3,
  tmpElement$4,
  tmpElement$5,
  tmpElement$6,
  tmpElement$7,
  tmpElement$8,
  tmpElement$9,
  tmpElement$10,
  tmpElement$11,
  tmpElement$12,
  tmpElement$13,
  tmpElement$14,
  tmpElement$15,
  tmpElement$16,
  tmpElement$17,
  tmpElement$18,
  tmpElement$19,
  tmpElement$20,
  tmpElement$21,
  tmpElement$22,
  tmpElement$23,
  tmpElement$24,
  tmpElement$25,
  tmpElement$26,
  tmpElement$27,
];
tmpMemberComplexObj$2 = new Map(tmpArg$3);
tmpElement = tmpMemberComplexObj$2.keys();
tmpMemberComplexObj$1 = [...tmpElement, 'module'];
tmpArg$1 = tmpMemberComplexObj$1.map(tmpArg$2);
tmpMemberComplexObj = new Map(tmpArg$1);
tmpArg = tmpMemberComplexObj.get('$');
$(tmpArg);
`````

## Result

Should call `$` with:
 - 0: "$"
 - 1: undefined

Normalized calls: Same

Final output calls: Same
