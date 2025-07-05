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
const tmpClusterSSA_tmpLambdaMapNow /*:unknown*/ = $dotCall(tmpMCF$1, x, `toString`);
const tmpMCF$2 /*:unknown*/ = x.toString;
const tmpClusterSSA_tmpLambdaMapNow$1 /*:unknown*/ = $dotCall(tmpMCF$2, x, `toString`);
const tmpBinLhs /*:unknown*/ = x.length;
const tmpClusterSSA_tmpLambdaFilterWas /*:boolean*/ = tmpBinLhs > 0;
const tmpLambdaFilterOut /*:array*/ /*truthy*/ = [];
if (tmpClusterSSA_tmpLambdaFilterWas) {
  $dotCall($array_push, tmpLambdaFilterOut, `push`, x);
} else {
}
const tmpBinLhs$1 /*:unknown*/ = x.length;
const tmpClusterSSA_tmpLambdaFilterWas$1 /*:boolean*/ = tmpBinLhs$1 > 0;
if (tmpClusterSSA_tmpLambdaFilterWas$1) {
  $dotCall($array_push, tmpLambdaFilterOut, `push`, x);
} else {
}
const tmpLambdaMapOut /*:array*/ /*truthy*/ = [tmpClusterSSA_tmpLambdaMapNow, tmpClusterSSA_tmpLambdaMapNow$1];
const tmpCalleeParam /*:primitive*/ = tmpLambdaMapOut + tmpLambdaFilterOut;
$(tmpCalleeParam);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const x = $(`test`);
const tmpClusterSSA_tmpLambdaMapNow = x.toString();
const tmpClusterSSA_tmpLambdaMapNow$1 = x.toString();
const tmpClusterSSA_tmpLambdaFilterWas = x.length > 0;
const tmpLambdaFilterOut = [];
if (tmpClusterSSA_tmpLambdaFilterWas) {
  $dotCall($array_push, tmpLambdaFilterOut, `push`, x);
}
if (x.length > 0) {
  $dotCall($array_push, tmpLambdaFilterOut, `push`, x);
}
$([tmpClusterSSA_tmpLambdaMapNow, tmpClusterSSA_tmpLambdaMapNow$1] + tmpLambdaFilterOut);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "test" );
const b = a.toString;
const c = $dotCall( b, a, "toString" );
const d = a.toString;
const e = $dotCall( d, a, "toString" );
const f = a.length;
const g = f > 0;
const h = [];
if (g) {
  $dotCall( $array_push, h, "push", a );
}
const i = a.length;
const j = i > 0;
if (j) {
  $dotCall( $array_push, h, "push", a );
}
const k = [ c, e ];
const l = k + h;
$( l );
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


- (todo) array reads var statement with init BinaryExpression
- (todo) array reads var statement with init CallExpression
- (todo) array reads var statement with init MemberExpression
- (todo) fixme: spyless vars and labeled nodes
- (todo) property on nullable; unreachable or hard error?
- (todo) support Identifier as var init in let_hoisting noob check
- (todo) support array reads statement type ExpressionStatement
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
