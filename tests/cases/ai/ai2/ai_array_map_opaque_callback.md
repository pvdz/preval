# Preval test case

# ai_array_map_opaque_callback.md

> Ai > Ai2 > Ai array map opaque callback
>
> Test: Array map method with an opaque callback.

## Input

`````js filename=intro
// Expected: [1,2,3].map($('callback')) (or equivalent normalized form)
let arr = [1, 2, 3];
let cb = $('opaque_callback');
let result = arr.map(cb);
$('result_array', result);
$('original_array', arr); // Check if original is mutated
`````


## Settled


`````js filename=intro
const cb /*:unknown*/ = $(`opaque_callback`);
const arr /*:array*/ /*truthy*/ = [1, 2, 3];
const tmpLambdaMapNow /*:unknown*/ = $dotCall(cb, undefined, undefined, 1, 0, arr);
const tmpLambdaMapHas$1 /*:boolean*/ = 1 in arr;
const tmpLambdaMapOut /*:array*/ /*truthy*/ = [tmpLambdaMapNow];
if (tmpLambdaMapHas$1) {
  const tmpLambdaMapVal$1 /*:primitive*/ = arr[1];
  const tmpLambdaMapNow$1 /*:unknown*/ = $dotCall(cb, undefined, undefined, tmpLambdaMapVal$1, 1, arr);
  tmpLambdaMapOut[1] = tmpLambdaMapNow$1;
} else {
}
const tmpLambdaMapHas$2 /*:boolean*/ = 2 in arr;
if (tmpLambdaMapHas$2) {
  const tmpLambdaMapVal$2 /*:primitive*/ = arr[2];
  const tmpLambdaMapNow$2 /*:unknown*/ = $dotCall(cb, undefined, undefined, tmpLambdaMapVal$2, 2, arr);
  tmpLambdaMapOut[2] = tmpLambdaMapNow$2;
} else {
}
tmpLambdaMapOut.length = 3;
$(`result_array`, tmpLambdaMapOut);
$(`original_array`, arr);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const cb = $(`opaque_callback`);
const arr = [1, 2, 3];
const tmpLambdaMapNow = $dotCall(cb, undefined, undefined, 1, 0, arr);
const tmpLambdaMapHas$1 = 1 in arr;
const tmpLambdaMapOut = [tmpLambdaMapNow];
if (tmpLambdaMapHas$1) {
  const tmpLambdaMapNow$1 = $dotCall(cb, undefined, undefined, arr[1], 1, arr);
  tmpLambdaMapOut[1] = tmpLambdaMapNow$1;
}
if (2 in arr) {
  const tmpLambdaMapNow$2 = $dotCall(cb, undefined, undefined, arr[2], 2, arr);
  tmpLambdaMapOut[2] = tmpLambdaMapNow$2;
}
tmpLambdaMapOut.length = 3;
$(`result_array`, tmpLambdaMapOut);
$(`original_array`, arr);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "opaque_callback" );
const b = [ 1, 2, 3 ];
const c = $dotCall( a, undefined, undefined, 1, 0, b );
const d = 1 in b;
const e = [ c ];
if (d) {
  const f = b[ 1 ];
  const g = $dotCall( a, undefined, undefined, f, 1, b );
  e[1] = g;
}
const h = 2 in b;
if (h) {
  const i = b[ 2 ];
  const j = $dotCall( a, undefined, undefined, i, 2, b );
  e[2] = j;
}
e.length = 3;
$( "result_array", e );
$( "original_array", b );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let arr = [1, 2, 3];
let cb = $(`opaque_callback`);
const tmpMCF = arr.map;
let result = $dotCall(tmpMCF, arr, `map`, cb);
$(`result_array`, result);
$(`original_array`, arr);
`````


## Todos triggered


- (todo) Support this binary expression operator:
- (todo) access object property that also exists on prototype? $array_map
- (todo) arr mutation may be able to inline this method: tmpMCF
- (todo) fixme: spyless vars and labeled nodes
- (todo) support array reads statement type ExpressionStatement
- (todo) support array reads statement type VarStatement
- (todo) support array reads statement type WhileStatement
- (todo) type trackeed tricks can possibly support static $array_map


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'opaque_callback'
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
