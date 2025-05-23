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
const tmpArrElement /*:array*/ = [`clearInterval`, `global.clearInterval`];
const tmpArrElement$1 /*:array*/ = [`clearTimeout`, `global.clearTimeout`];
const tmpArrElement$3 /*:array*/ = [`console`, `global.console`];
const tmpArrElement$5 /*:array*/ = [`false`, `boolean`];
const tmpArrElement$7 /*:array*/ = [`null`, `null`];
const tmpArrElement$9 /*:array*/ = [`\$`, `\$`];
const tmpCalleeParam$3 /*:array*/ = [tmpArrElement, tmpArrElement$1, tmpArrElement$3, tmpArrElement$5, tmpArrElement$7, tmpArrElement$9];
const tmpMCOO$3 /*:map*/ = new $map_constructor(tmpCalleeParam$3);
const tmpArrSpread /*:iterator*/ = $dotCall($map_keys, tmpMCOO$3, `keys`);
const tmpMCOO$1 /*:array*/ = [...tmpArrSpread, `module`];
const tmpMCP /*:(unknown)=>array*/ = function ($$0) {
  const k /*:unknown*/ = $$0;
  debugger;
  const tmpReturnArg /*:array*/ = [k, k];
  return tmpReturnArg;
};
const tmpCalleeParam$1 /*:array*/ = $dotCall($array_map, tmpMCOO$1, `map`, tmpMCP);
const tmpMCOO /*:map*/ = new $map_constructor(tmpCalleeParam$1);
const tmpCalleeParam /*:unknown*/ = $dotCall($map_get, tmpMCOO, `get`, `\$`);
$(tmpCalleeParam);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpArrElement = [`clearInterval`, `global.clearInterval`];
const tmpArrElement$1 = [`clearTimeout`, `global.clearTimeout`];
const tmpArrElement$3 = [`console`, `global.console`];
const tmpArrElement$5 = [`false`, `boolean`];
const tmpArrElement$7 = [`null`, `null`];
const tmpArrElement$9 = [`\$`, `\$`];
const tmpCalleeParam$3 = [tmpArrElement, tmpArrElement$1, tmpArrElement$3, tmpArrElement$5, tmpArrElement$7, tmpArrElement$9];
const tmpArrSpread = $dotCall($map_keys, new $map_constructor(tmpCalleeParam$3), `keys`);
const tmpCalleeParam$1 = $dotCall($array_map, [...tmpArrSpread, `module`], `map`, function (k) {
  const tmpReturnArg = [k, k];
  return tmpReturnArg;
});
$($dotCall($map_get, new $map_constructor(tmpCalleeParam$1), `get`, `\$`));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = [ "clearInterval", "global.clearInterval" ];
const b = [ "clearTimeout", "global.clearTimeout" ];
const c = [ "console", "global.console" ];
const d = [ "false", "boolean" ];
const e = [ "null", "null" ];
const f = [ "$", "$" ];
const g = [ a, b, c, d, e, f ];
const h = new $map_constructor( g );
const i = $dotCall( $map_keys, h, "keys" );
const j = [ ...i, "module" ];
const k = function($$0 ) {
  const l = $$0;
  debugger;
  const m = [ l, l ];
  return m;
};
const n = $dotCall( $array_map, j, "map", k );
const o = new $map_constructor( n );
const p = $dotCall( $map_get, o, "get", "$" );
$( p );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpNewCallee = Map;
const tmpNewCallee$1 = Map;
const tmpArrElement = [`clearInterval`, `global.clearInterval`];
const tmpArrElement$1 = [`clearTimeout`, `global.clearTimeout`];
const tmpArrElement$3 = [`console`, `global.console`];
const tmpArrElement$5 = [`false`, `boolean`];
const tmpArrElement$7 = [`null`, `null`];
const tmpArrElement$9 = [`\$`, `\$`];
let tmpCalleeParam$3 = [tmpArrElement, tmpArrElement$1, tmpArrElement$3, tmpArrElement$5, tmpArrElement$7, tmpArrElement$9];
const tmpMCOO$3 = new tmpNewCallee$1(tmpCalleeParam$3);
const tmpMCF = tmpMCOO$3.keys;
const tmpArrSpread = $dotCall(tmpMCF, tmpMCOO$3, `keys`);
const tmpMCOO$1 = [...tmpArrSpread, `module`];
const tmpMCF$1 = tmpMCOO$1.map;
const tmpMCP = function ($$0) {
  let k = $$0;
  debugger;
  const tmpReturnArg = [k, k];
  return tmpReturnArg;
};
let tmpCalleeParam$1 = $dotCall(tmpMCF$1, tmpMCOO$1, `map`, tmpMCP);
const tmpMCOO = new tmpNewCallee(tmpCalleeParam$1);
const tmpMCF$3 = tmpMCOO.get;
let tmpCalleeParam = $dotCall(tmpMCF$3, tmpMCOO, `get`, `\$`);
$(tmpCalleeParam);
`````


## Todos triggered


- (todo) Deal with array spreads in arr mutation?
- (todo) access object property that also exists on prototype? $array_map
- (todo) access object property that also exists on prototype? $map_get
- (todo) access object property that also exists on prototype? $map_keys
- (todo) support array reads statement type ReturnStatement
- (todo) support array reads statement type VarStatement
- (todo) type trackeed tricks can possibly support static $array_map
- (todo) type trackeed tricks can possibly support static $map_get
- (todo) type trackeed tricks can possibly support static $map_keys


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
