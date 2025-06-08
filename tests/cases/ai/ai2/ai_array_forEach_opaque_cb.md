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
$dotCall($array_forEach, arr, `forEach`, cb);
$(`forEach_done`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpArrElement = $(`a`);
const tmpArrElement$1 = $(`b`);
const cb = $(`opaque_forEach_callback`);
$dotCall($array_forEach, [tmpArrElement, tmpArrElement$1], `forEach`, cb);
$(`forEach_done`);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "a" );
const b = $( "b" );
const c = $( "opaque_forEach_callback" );
const d = [ a, b ];
$dotCall( $array_forEach, d, "forEach", c );
$( "forEach_done" );
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


- (todo) access object property that also exists on prototype? $array_forEach
- (todo) arr mutation may be able to inline this method: $array_forEach
- (todo) arr mutation may be able to inline this method: tmpMCF
- (todo) support array reads statement type ExpressionStatement
- (todo) type trackeed tricks can possibly support static $array_forEach


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
