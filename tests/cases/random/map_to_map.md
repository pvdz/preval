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
        [`clearInterval`, `global.clearInterval`],
        [`clearTimeout`, `global.clearTimeout`],
        [`console`, `global.console`],
        [`false`, `boolean`],
        [`null`, `null`],
        [`\$`, `\$`],
      ]).keys(),
      `module`,
    ].map(($$0) => {
      let k = $$0;
      debugger;
      return [k, k];
    }),
  ).get(`\$`),
);
`````

## Normalized

`````js filename=intro
const tmpCallCallee = $;
const tmpNewCallee = Map;
const tmpNewCallee$1 = Map;
const tmpArrElement = [`clearInterval`, `global.clearInterval`];
const tmpArrElement$1 = [`clearTimeout`, `global.clearTimeout`];
const tmpArrElement$3 = [`console`, `global.console`];
const tmpArrElement$5 = [`false`, `boolean`];
const tmpArrElement$7 = [`null`, `null`];
const tmpArrElement$9 = [`\$`, `\$`];
const tmpCalleeParam$5 = [tmpArrElement, tmpArrElement$1, tmpArrElement$3, tmpArrElement$5, tmpArrElement$7, tmpArrElement$9];
const tmpCallObj$3 = new tmpNewCallee$1(tmpCalleeParam$5);
const tmpArrSpread = tmpCallObj$3.keys();
const tmpCallObj$1 = [...tmpArrSpread, `module`];
const tmpCallVal = tmpCallObj$1.map;
const tmpCalleeParam$3 = function ($$0) {
  let k = $$0;
  debugger;
  const tmpReturnArg = [k, k];
  return tmpReturnArg;
};
const tmpCalleeParam$1 = $dotCall(tmpCallVal, tmpCallObj$1, tmpCalleeParam$3);
const tmpCallObj = new tmpNewCallee(tmpCalleeParam$1);
const tmpCalleeParam = tmpCallObj.get(`\$`);
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
const tmpArrElement = [`clearInterval`, `global.clearInterval`];
const tmpArrElement$1 = [`clearTimeout`, `global.clearTimeout`];
const tmpArrElement$3 = [`console`, `global.console`];
const tmpArrElement$5 = [`false`, `boolean`];
const tmpArrElement$7 = [`null`, `null`];
const tmpArrElement$9 = [`\$`, `\$`];
const tmpCalleeParam$5 = [tmpArrElement, tmpArrElement$1, tmpArrElement$3, tmpArrElement$5, tmpArrElement$7, tmpArrElement$9];
const tmpCallObj$3 = new Map(tmpCalleeParam$5);
const tmpArrSpread = tmpCallObj$3.keys();
const tmpCallObj$1 = [...tmpArrSpread, `module`];
const tmpCallVal = tmpCallObj$1.map;
const tmpCalleeParam$3 = function ($$0) {
  const k = $$0;
  debugger;
  const tmpReturnArg = [k, k];
  return tmpReturnArg;
};
const tmpCalleeParam$1 = $dotCall(tmpCallVal, tmpCallObj$1, tmpCalleeParam$3);
const tmpCallObj = new Map(tmpCalleeParam$1);
const tmpCalleeParam = tmpCallObj.get(`\$`);
$(tmpCalleeParam);
`````

## PST Output

With rename=true

`````js filename=intro
const a = [ "clearInterval", "global.clearInterval" ];
const b = [ "clearTimeout", "global.clearTimeout" ];
const c = [ "console", "global.console" ];
const d = [ "false", "boolean" ];
const e = [ "null", "null" ];
const f = [ "$", "$" ];
const g = [ a, b, c, d, e, f ];
const h = new Map( g );
const i = h.keys();
const j = [ ... i, "module" ];
const k = j.map;
const l = function($$0 ) {
  const m = n;
  debugger;
  const o = [ m, m ];
  return o;
};
const p = $dotCall( k, j, l );
const q = new Map( p );
const r = q.get( "$" );
$( r );
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
