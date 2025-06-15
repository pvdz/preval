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
const tmpMCF$1 /*:unknown*/ = x.toString;
const tmpClusterSSA_tmpArrenow /*:unknown*/ = $dotCall(tmpMCF$1, x, `toString`);
const tmpMCF$2 /*:unknown*/ = x.toString;
const tmpClusterSSA_tmpArrenow$1 /*:unknown*/ = $dotCall(tmpMCF$2, x, `toString`);
const tmpMCP$1 /*:(unknown)=>boolean*/ = function ($$0) {
  const v$1 /*:unknown*/ = $$0;
  debugger;
  const tmpBinLhs /*:unknown*/ = v$1.length;
  const tmpReturnArg$1 /*:boolean*/ = tmpBinLhs > 0;
  return tmpReturnArg$1;
};
const tmpMCOO$1 /*:array*/ /*truthy*/ = [x, x];
const z /*:array*/ /*truthy*/ = $dotCall($array_filter, tmpMCOO$1, `filter`, tmpMCP$1);
const tmpArreout /*:array*/ /*truthy*/ = [tmpClusterSSA_tmpArrenow, tmpClusterSSA_tmpArrenow$1];
const tmpCalleeParam /*:primitive*/ = tmpArreout + z;
$(tmpCalleeParam);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const x = $(`test`);
const tmpClusterSSA_tmpArrenow = x.toString();
const tmpClusterSSA_tmpArrenow$1 = x.toString();
const tmpMCP$1 = function (v$1) {
  const tmpReturnArg$1 = v$1.length > 0;
  return tmpReturnArg$1;
};
const z = $dotCall($array_filter, [x, x], `filter`, tmpMCP$1);
$([tmpClusterSSA_tmpArrenow, tmpClusterSSA_tmpArrenow$1] + z);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "test" );
const b = a.toString;
const c = $dotCall( b, a, "toString" );
const d = a.toString;
const e = $dotCall( d, a, "toString" );
const f = function($$0 ) {
  const g = $$0;
  debugger;
  const h = g.length;
  const i = h > 0;
  return i;
};
const j = [ a, a ];
const k = $dotCall( $array_filter, j, "filter", f );
const l = [ c, e ];
const m = l + k;
$( m );
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
- (todo) support array reads statement type EmptyStatement
- (todo) support array reads statement type ExpressionStatement
- (todo) support array reads statement type VarStatement
- (todo) support array reads statement type WhileStatement
- (todo) type trackeed tricks can possibly support static $array_filter
- (todo) type trackeed tricks can possibly support static $array_map
- (todo) we may be able to confirm that ident refs in the array literal are primitives in same loop/try scope


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
