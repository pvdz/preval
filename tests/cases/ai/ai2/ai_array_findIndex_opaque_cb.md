# Preval test case

# ai_array_findIndex_opaque_cb.md

> Ai > Ai2 > Ai array findIndex opaque cb
>
> Test: Array.prototype.findIndex with an opaque callback.

## Input

`````js filename=intro
// Expected: findIndex uses opaque predicate, returns index or -1.
let arr = [$('x'), $('y')];
let cb = $('opaque_findIndex_predicate');
let index = arr.findIndex(cb);
$('findIndex_result', index);
`````


## Settled


`````js filename=intro
const tmpArrElement /*:unknown*/ = $(`x`);
const tmpArrElement$1 /*:unknown*/ = $(`y`);
const cb /*:unknown*/ = $(`opaque_findIndex_predicate`);
const arr /*:array*/ /*truthy*/ = [tmpArrElement, tmpArrElement$1];
const index /*:number*/ = $dotCall($array_findIndex, arr, `findIndex`, cb);
$(`findIndex_result`, index);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpArrElement = $(`x`);
const tmpArrElement$1 = $(`y`);
const cb = $(`opaque_findIndex_predicate`);
$(`findIndex_result`, $dotCall($array_findIndex, [tmpArrElement, tmpArrElement$1], `findIndex`, cb));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "x" );
const b = $( "y" );
const c = $( "opaque_findIndex_predicate" );
const d = [ a, b ];
const e = $dotCall( $array_findIndex, d, "findIndex", c );
$( "findIndex_result", e );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpArrElement = $(`x`);
const tmpArrElement$1 = $(`y`);
let arr = [tmpArrElement, tmpArrElement$1];
let cb = $(`opaque_findIndex_predicate`);
const tmpMCF = arr.findIndex;
let index = $dotCall(tmpMCF, arr, `findIndex`, cb);
$(`findIndex_result`, index);
`````


## Todos triggered


- (todo) access object property that also exists on prototype? $array_findIndex
- (todo) arr mutation may be able to inline this method: $array_findIndex
- (todo) arr mutation may be able to inline this method: tmpMCF
- (todo) support array reads statement type ExpressionStatement
- (todo) support array reads statement type VarStatement
- (todo) type trackeed tricks can possibly support static $array_findIndex


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'x'
 - 2: 'y'
 - 3: 'opaque_findIndex_predicate'
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
