# Preval test case

# ai_array_some_opaque_cb.md

> Ai > Ai2 > Ai array some opaque cb
>
> Test: Array.prototype.some with an opaque callback.

## Input

`````js filename=intro
// Expected: Some uses opaque predicate, short-circuits if predicate returns true.
let arr = [$('v1'), $('v2')];
let cb = $('opaque_some_predicate');
let hasSome = arr.some(cb);
$('some_result', hasSome);
`````


## Settled


`````js filename=intro
const tmpArrElement /*:unknown*/ = $(`v1`);
const tmpArrElement$1 /*:unknown*/ = $(`v2`);
const cb /*:unknown*/ = $(`opaque_some_predicate`);
const arr /*:array*/ = [tmpArrElement, tmpArrElement$1];
const hasSome /*:boolean*/ = $dotCall($array_some, arr, `some`, cb);
$(`some_result`, hasSome);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpArrElement = $(`v1`);
const tmpArrElement$1 = $(`v2`);
const cb = $(`opaque_some_predicate`);
$(`some_result`, $dotCall($array_some, [tmpArrElement, tmpArrElement$1], `some`, cb));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "v1" );
const b = $( "v2" );
const c = $( "opaque_some_predicate" );
const d = [ a, b ];
const e = $dotCall( $array_some, d, "some", c );
$( "some_result", e );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpArrElement = $(`v1`);
const tmpArrElement$1 = $(`v2`);
let arr = [tmpArrElement, tmpArrElement$1];
let cb = $(`opaque_some_predicate`);
const tmpMCF = arr.some;
let hasSome = $dotCall(tmpMCF, arr, `some`, cb);
$(`some_result`, hasSome);
`````


## Todos triggered


- (todo) access object property that also exists on prototype? $array_some
- (todo) arr mutation may be able to inline this method: $array_some
- (todo) arr mutation may be able to inline this method: tmpMCF
- (todo) support array reads statement type ExpressionStatement
- (todo) support array reads statement type VarStatement
- (todo) type trackeed tricks can possibly support static $array_some


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'v1'
 - 2: 'v2'
 - 3: 'opaque_some_predicate'
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
