# Preval test case

# opaque_array_cache.md

> Ai > Ai5 > Opaque array cache
>
> Test caching of array operations for opaque values

## Input

`````js filename=intro
const x = $("test");
const y = [x, x].map(v => v.toString());
const z = [x, x].filter(v => v.length > 0);
$(y + z);

// Expected:
// const x = $("test");
// const arr = [x, x];
// const y = $dotCall($array_map, arr, "map", v => v.toString());
// const z = $dotCall($array_filter, arr, "filter", v => v.length > 0);
// $(y + z);
`````


## Settled


`````js filename=intro
const x /*:unknown*/ = $(`test`);
const tmpMCP /*:(unknown)=>unknown*/ = function ($$0) {
  const v /*:unknown*/ = $$0;
  debugger;
  const tmpMCF$1 /*:unknown*/ = v.toString;
  const tmpReturnArg /*:unknown*/ = $dotCall(tmpMCF$1, v, `toString`);
  return tmpReturnArg;
};
const tmpMCOO /*:array*/ /*truthy*/ = [x, x];
const y /*:array*/ /*truthy*/ = $dotCall($array_map, tmpMCOO, `map`, tmpMCP);
const tmpMCP$1 /*:(unknown)=>boolean*/ = function ($$0) {
  const v$1 /*:unknown*/ = $$0;
  debugger;
  const tmpBinLhs /*:unknown*/ = v$1.length;
  const tmpReturnArg$1 /*:boolean*/ = tmpBinLhs > 0;
  return tmpReturnArg$1;
};
const tmpMCOO$1 /*:array*/ /*truthy*/ = [x, x];
const z /*:array*/ /*truthy*/ = $dotCall($array_filter, tmpMCOO$1, `filter`, tmpMCP$1);
const tmpCalleeParam /*:primitive*/ = y + z;
$(tmpCalleeParam);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const x = $(`test`);
const tmpMCP = function (v) {
  const tmpReturnArg = v.toString();
  return tmpReturnArg;
};
const y = $dotCall($array_map, [x, x], `map`, tmpMCP);
const tmpMCP$1 = function (v$1) {
  const tmpReturnArg$1 = v$1.length > 0;
  return tmpReturnArg$1;
};
$(y + $dotCall($array_filter, [x, x], `filter`, tmpMCP$1));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "test" );
const b = function($$0 ) {
  const c = $$0;
  debugger;
  const d = c.toString;
  const e = $dotCall( d, c, "toString" );
  return e;
};
const f = [ a, a ];
const g = $dotCall( $array_map, f, "map", b );
const h = function($$0 ) {
  const i = $$0;
  debugger;
  const j = i.length;
  const k = j > 0;
  return k;
};
const l = [ a, a ];
const m = $dotCall( $array_filter, l, "filter", h );
const n = g + m;
$( n );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const x = $(`test`);
const tmpMCOO = [x, x];
const tmpMCF = tmpMCOO.map;
const tmpMCP = function ($$0) {
  let v = $$0;
  debugger;
  const tmpMCF$1 = v.toString;
  const tmpReturnArg = $dotCall(tmpMCF$1, v, `toString`);
  return tmpReturnArg;
};
const y = $dotCall(tmpMCF, tmpMCOO, `map`, tmpMCP);
const tmpMCOO$1 = [x, x];
const tmpMCF$3 = tmpMCOO$1.filter;
const tmpMCP$1 = function ($$0) {
  let v$1 = $$0;
  debugger;
  const tmpBinLhs = v$1.length;
  const tmpReturnArg$1 = tmpBinLhs > 0;
  return tmpReturnArg$1;
};
const z = $dotCall(tmpMCF$3, tmpMCOO$1, `filter`, tmpMCP$1);
let tmpCalleeParam = y + z;
$(tmpCalleeParam);
`````


## Todos triggered


- (todo) arr mutation may be able to inline this method: $array_filter
- (todo) arr mutation may be able to inline this method: $array_map
- (todo) support array reads statement type VarStatement
- (todo) type trackeed tricks can possibly support static $array_filter
- (todo) type trackeed tricks can possibly support static $array_map


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'test'
 - 2: 'test,testtest,test'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
