# Preval test case

# map_to_map.md

> Random > Map to map
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
        ['$', '$'],
      ]).keys(),
      'module',
    ].map((k) => [k, k]),
  ).get('$'),
);
`````

## Pre Normal

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
        ['$', '$'],
      ]).keys(),
      'module',
    ].map((k) => {
      return [k, k];
    }),
  ).get('$'),
);
`````

## Normalized

`````js filename=intro
const tmpCallCallee = $;
const tmpNewCallee = Map;
const tmpNewCallee$1 = Map;
const tmpArrElement = ['clearInterval', 'global.clearInterval'];
const tmpArrElement$1 = ['clearTimeout', 'global.clearTimeout'];
const tmpArrElement$2 = ['console', 'global.console'];
const tmpArrElement$3 = ['false', 'boolean'];
const tmpArrElement$4 = ['null', 'null'];
const tmpArrElement$5 = ['$', '$'];
const tmpCalleeParam$3 = [tmpArrElement, tmpArrElement$1, tmpArrElement$2, tmpArrElement$3, tmpArrElement$4, tmpArrElement$5];
const tmpCallObj$2 = new tmpNewCallee$1(tmpCalleeParam$3);
const tmpArrSpread = tmpCallObj$2.keys();
const tmpCallObj$1 = [...tmpArrSpread, 'module'];
const tmpCallVal = tmpCallObj$1.map;
const tmpCalleeParam$2 = (k) => {
  const tmpReturnArg = [k, k];
  return tmpReturnArg;
};
const tmpCalleeParam$1 = tmpCallVal.call(tmpCallObj$1, tmpCalleeParam$2);
const tmpCallObj = new tmpNewCallee(tmpCalleeParam$1);
const tmpCalleeParam = tmpCallObj.get('$');
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
const tmpArrElement = ['clearInterval', 'global.clearInterval'];
const tmpArrElement$1 = ['clearTimeout', 'global.clearTimeout'];
const tmpArrElement$2 = ['console', 'global.console'];
const tmpArrElement$3 = ['false', 'boolean'];
const tmpArrElement$4 = ['null', 'null'];
const tmpArrElement$5 = ['$', '$'];
const tmpCalleeParam$3 = [tmpArrElement, tmpArrElement$1, tmpArrElement$2, tmpArrElement$3, tmpArrElement$4, tmpArrElement$5];
const tmpCallObj$2 = new Map(tmpCalleeParam$3);
const tmpArrSpread = tmpCallObj$2.keys();
const tmpCallObj$1 = [...tmpArrSpread, 'module'];
const tmpCallVal = tmpCallObj$1.map;
const tmpCalleeParam$2 = (k) => {
  const tmpReturnArg = [k, k];
  return tmpReturnArg;
};
const tmpCalleeParam$1 = tmpCallVal.call(tmpCallObj$1, tmpCalleeParam$2);
const tmpCallObj = new Map(tmpCalleeParam$1);
const tmpCalleeParam = tmpCallObj.get('$');
$(tmpCalleeParam);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: '$'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
