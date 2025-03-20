# Preval test case

# map_to_map.md

> Random > Map to map
>
> Defining a map with primitives that is immediately converted to another map

More of a concept that should be possible to be folded. This is very close to actual code used in Preval :p

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

## Settled


`````js filename=intro
const tmpCalleeParam$3 /*:(unknown)=>array*/ = function ($$0) {
  const k /*:unknown*/ = $$0;
  debugger;
  const tmpReturnArg /*:array*/ = [k, k];
  return tmpReturnArg;
};
const tmpArrElement /*:array*/ = [`clearInterval`, `global.clearInterval`];
const tmpArrElement$1 /*:array*/ = [`clearTimeout`, `global.clearTimeout`];
const tmpArrElement$3 /*:array*/ = [`console`, `global.console`];
const tmpArrElement$5 /*:array*/ = [`false`, `boolean`];
const tmpArrElement$7 /*:array*/ = [`null`, `null`];
const tmpArrElement$9 /*:array*/ = [`\$`, `\$`];
const tmpCalleeParam$5 /*:array*/ = [tmpArrElement, tmpArrElement$1, tmpArrElement$3, tmpArrElement$5, tmpArrElement$7, tmpArrElement$9];
const tmpCallObj$3 /*:object*/ = new Map(tmpCalleeParam$5);
const tmpArrSpread /*:unknown*/ = tmpCallObj$3.keys();
const tmpCallObj$1 /*:array*/ = [...tmpArrSpread, `module`];
const tmpCalleeParam$1 /*:array*/ = tmpCallObj$1.map(tmpCalleeParam$3);
const tmpCallObj /*:object*/ = new Map(tmpCalleeParam$1);
const tmpCalleeParam /*:unknown*/ = tmpCallObj.get(`\$`);
$(tmpCalleeParam);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpCalleeParam$3 = function (k) {
  const tmpReturnArg = [k, k];
  return tmpReturnArg;
};
const tmpArrElement = [`clearInterval`, `global.clearInterval`];
const tmpArrElement$1 = [`clearTimeout`, `global.clearTimeout`];
const tmpArrElement$3 = [`console`, `global.console`];
const tmpArrElement$5 = [`false`, `boolean`];
const tmpArrElement$7 = [`null`, `null`];
const tmpArrElement$9 = [`\$`, `\$`];
const tmpCalleeParam$5 = [tmpArrElement, tmpArrElement$1, tmpArrElement$3, tmpArrElement$5, tmpArrElement$7, tmpArrElement$9];
const tmpArrSpread = new Map(tmpCalleeParam$5).keys();
const tmpCalleeParam$1 = [...tmpArrSpread, `module`].map(tmpCalleeParam$3);
$(new Map(tmpCalleeParam$1).get(`\$`));
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
const tmpNewCallee = Map;
const tmpCalleeParam$3 = function ($$0) {
  let k = $$0;
  debugger;
  const tmpReturnArg = [k, k];
  return tmpReturnArg;
};
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
const tmpCalleeParam$1 = tmpCallObj$1.map(tmpCalleeParam$3);
const tmpCallObj = new tmpNewCallee(tmpCalleeParam$1);
const tmpCalleeParam = tmpCallObj.get(`\$`);
$(tmpCalleeParam);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = function($$0 ) {
  const b = $$0;
  debugger;
  const c = [ b, b ];
  return c;
};
const d = [ "clearInterval", "global.clearInterval" ];
const e = [ "clearTimeout", "global.clearTimeout" ];
const f = [ "console", "global.console" ];
const g = [ "false", "boolean" ];
const h = [ "null", "null" ];
const i = [ "$", "$" ];
const j = [ d, e, f, g, h, i ];
const k = new Map( j );
const l = k.keys();
const m = [ ...l, "module" ];
const n = m.map( a );
const o = new Map( n );
const p = o.get( "$" );
$( p );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: '$'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same

Todos triggered:
- type trackeed tricks can possibly support resolving the type for calling this builtin method symbol: $array_map
