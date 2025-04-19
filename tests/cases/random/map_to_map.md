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
const tmpMCOO$3 /*:object*/ = new Map(tmpCalleeParam$3);
const tmpMCF /*:unknown*/ = tmpMCOO$3.keys;
const tmpArrSpread /*:unknown*/ = $dotCall(tmpMCF, tmpMCOO$3, `keys`);
const tmpMCOO$1 /*:array*/ = [...tmpArrSpread, `module`];
const tmpMCP /*:(unknown)=>array*/ = function ($$0) {
  const k /*:unknown*/ = $$0;
  debugger;
  const tmpReturnArg /*:array*/ = [k, k];
  return tmpReturnArg;
};
const tmpCalleeParam$1 /*:array*/ = $dotCall($array_map, tmpMCOO$1, `map`, tmpMCP);
const tmpMCOO /*:object*/ = new Map(tmpCalleeParam$1);
const tmpMCF$3 /*:unknown*/ = tmpMCOO.get;
const tmpCalleeParam /*:unknown*/ = $dotCall(tmpMCF$3, tmpMCOO, `get`, `\$`);
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
const tmpMCOO$3 = new Map(tmpCalleeParam$3);
const tmpArrSpread = tmpMCOO$3.keys();
const tmpCalleeParam$1 = $dotCall($array_map, [...tmpArrSpread, `module`], `map`, function (k) {
  const tmpReturnArg = [k, k];
  return tmpReturnArg;
});
const tmpMCOO = new Map(tmpCalleeParam$1);
$(tmpMCOO.get(`\$`));
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
const h = new Map( g );
const i = h.keys;
const j = $dotCall( i, h, "keys" );
const k = [ ...j, "module" ];
const l = function($$0 ) {
  const m = $$0;
  debugger;
  const n = [ m, m ];
  return n;
};
const o = $dotCall( $array_map, k, "map", l );
const p = new Map( o );
const q = p.get;
const r = $dotCall( q, p, "get", "$" );
$( r );
`````


## Todos triggered


- (todo) Deal with array spreads in arr mutation?
- (todo) access object property that also exists on prototype? $array_map
- (todo) type trackeed tricks can possibly support static $array_map


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
