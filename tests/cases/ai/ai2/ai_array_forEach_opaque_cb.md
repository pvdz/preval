# Preval test case

# ai_array_forEach_opaque_cb.md

> Ai > Ai2 > Ai array forEach opaque cb
>
> Test: Array.prototype.forEach with an opaque callback.

## Input

`````js filename=intro
// Expected: Opaque callback invoked for each element, side effects preserved.
let arr = [$('a'), $('b')];
let cb = $('opaque_forEach_callback');
arr.forEach(cb);
$('forEach_done');
`````


## Settled


`````js filename=intro
const tmpArrElement /*:unknown*/ = $(`a`);
const tmpArrElement$1 /*:unknown*/ = $(`b`);
const cb /*:unknown*/ = $(`opaque_forEach_callback`);
const arr /*:array*/ /*truthy*/ = [tmpArrElement, tmpArrElement$1];
$dotCall(cb, undefined, undefined, tmpArrElement, 0, arr);
const tmpLambdaForeachCounterHas$1 /*:boolean*/ = 1 in arr;
if (tmpLambdaForeachCounterHas$1) {
  const tmpLambdaForeachCounterVal$1 /*:unknown*/ = arr[1];
  $dotCall(cb, undefined, undefined, tmpLambdaForeachCounterVal$1, 1, arr);
  $(`forEach_done`);
} else {
  $(`forEach_done`);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpArrElement = $(`a`);
const tmpArrElement$1 = $(`b`);
const cb = $(`opaque_forEach_callback`);
const arr = [tmpArrElement, tmpArrElement$1];
$dotCall(cb, undefined, undefined, tmpArrElement, 0, arr);
if (1 in arr) {
  $dotCall(cb, undefined, undefined, arr[1], 1, arr);
  $(`forEach_done`);
} else {
  $(`forEach_done`);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "a" );
const b = $( "b" );
const c = $( "opaque_forEach_callback" );
const d = [ a, b ];
$dotCall( c, undefined, undefined, a, 0, d );
const e = 1 in d;
if (e) {
  const f = d[ 1 ];
  $dotCall( c, undefined, undefined, f, 1, d );
  $( "forEach_done" );
}
else {
  $( "forEach_done" );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpArrElement = $(`a`);
const tmpArrElement$1 = $(`b`);
let arr = [tmpArrElement, tmpArrElement$1];
let cb = $(`opaque_forEach_callback`);
const tmpMCF = arr.forEach;
$dotCall(tmpMCF, arr, `forEach`, cb);
$(`forEach_done`);
`````


## Todos triggered


- (todo) - at least one of the call args to
- (todo) access object property that also exists on prototype? $array_forEach
- (todo) arr mutation may be able to inline this method: tmpMCF
- (todo) fixme: spyless vars and labeled nodes
- (todo) support array reads statement type EmptyStatement
- (todo) support array reads statement type ExpressionStatement
- (todo) support array reads statement type VarStatement
- (todo) support array reads statement type WhileStatement
- (todo) type trackeed tricks can possibly support static $array_forEach
- (todo) we may be able to confirm that ident refs in the array literal are primitives in same loop/try scope


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'a'
 - 2: 'b'
 - 3: 'opaque_forEach_callback'
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
