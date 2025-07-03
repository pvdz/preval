# Preval test case

# ai_array_reduceRight_opaque_cb.md

> Ai > Ai2 > Ai array reduceRight opaque cb
>
> Test: Array.prototype.reduceRight with opaque callback.

## Input

`````js filename=intro
// Expected: ReduceRight proceeds with opaque callback.
let arr = [$('a'), $('b')];
let cb = $('opaque_reducer_right');
let result = arr.reduceRight(cb, $('initial'));
$('reduceRight_result', result);
`````


## Settled


`````js filename=intro
const tmpArrElement /*:unknown*/ = $(`a`);
const tmpArrElement$1 /*:unknown*/ = $(`b`);
const cb /*:unknown*/ = $(`opaque_reducer_right`);
const tmpMCP /*:unknown*/ = $(`initial`);
const arr /*:array*/ /*truthy*/ = [tmpArrElement, tmpArrElement$1];
const tmpClusterSSA_tmpLambdaReduceRightOut /*:unknown*/ = $dotCall(cb, undefined, undefined, tmpMCP, tmpArrElement$1, 1, arr);
const tmpLambdaReduceRightHas$1 /*:boolean*/ = 0 in arr;
if (tmpLambdaReduceRightHas$1) {
  const tmpLambdaReduceRightVal$1 /*:unknown*/ = arr[0];
  const tmpClusterSSA_tmpLambdaReduceRightOut$1 /*:unknown*/ = $dotCall(
    cb,
    undefined,
    undefined,
    tmpClusterSSA_tmpLambdaReduceRightOut,
    tmpLambdaReduceRightVal$1,
    0,
    arr,
  );
  $(`reduceRight_result`, tmpClusterSSA_tmpLambdaReduceRightOut$1);
} else {
  $(`reduceRight_result`, tmpClusterSSA_tmpLambdaReduceRightOut);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpArrElement = $(`a`);
const tmpArrElement$1 = $(`b`);
const cb = $(`opaque_reducer_right`);
const tmpMCP = $(`initial`);
const arr = [tmpArrElement, tmpArrElement$1];
const tmpClusterSSA_tmpLambdaReduceRightOut = $dotCall(cb, undefined, undefined, tmpMCP, tmpArrElement$1, 1, arr);
if (0 in arr) {
  $(`reduceRight_result`, $dotCall(cb, undefined, undefined, tmpClusterSSA_tmpLambdaReduceRightOut, arr[0], 0, arr));
} else {
  $(`reduceRight_result`, tmpClusterSSA_tmpLambdaReduceRightOut);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "a" );
const b = $( "b" );
const c = $( "opaque_reducer_right" );
const d = $( "initial" );
const e = [ a, b ];
const f = $dotCall( c, undefined, undefined, d, b, 1, e );
const g = 0 in e;
if (g) {
  const h = e[ 0 ];
  const i = $dotCall( c, undefined, undefined, f, h, 0, e );
  $( "reduceRight_result", i );
}
else {
  $( "reduceRight_result", f );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpArrElement = $(`a`);
const tmpArrElement$1 = $(`b`);
let arr = [tmpArrElement, tmpArrElement$1];
let cb = $(`opaque_reducer_right`);
const tmpMCF = arr.reduceRight;
const tmpMCP = $(`initial`);
let result = $dotCall(tmpMCF, arr, `reduceRight`, cb, tmpMCP);
$(`reduceRight_result`, result);
`````


## Todos triggered


- (todo) - at least one of the call args to
- (todo) access object property that also exists on prototype? $array_reduceRight
- (todo) array reads var statement with init BinaryExpression
- (todo) array reads var statement with init CallExpression
- (todo) fixme: spyless vars and labeled nodes
- (todo) support array reads statement type ExpressionStatement
- (todo) type trackeed tricks can possibly support static $array_reduceRight
- (todo) we may be able to confirm that ident refs in the array literal are primitives in same loop/try scope


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'a'
 - 2: 'b'
 - 3: 'opaque_reducer_right'
 - 4: 'initial'
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
