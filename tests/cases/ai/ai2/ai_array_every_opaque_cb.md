# Preval test case

# ai_array_every_opaque_cb.md

> Ai > Ai2 > Ai array every opaque cb
>
> Test: Array.prototype.every with an opaque callback.

## Input

`````js filename=intro
// Expected: Every uses opaque predicate, short-circuits if predicate returns false.
let arr = [$('e1'), $('e2')];
let cb = $('opaque_every_predicate');
let allMatch = arr.every(cb);
$('every_result', allMatch);
`````


## Settled


`````js filename=intro
const tmpArrElement /*:unknown*/ = $(`e1`);
const tmpArrElement$1 /*:unknown*/ = $(`e2`);
const cb /*:unknown*/ = $(`opaque_every_predicate`);
const arr /*:array*/ = [tmpArrElement, tmpArrElement$1];
const allMatch /*:boolean*/ = $dotCall($array_every, arr, `every`, cb);
$(`every_result`, allMatch);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpArrElement = $(`e1`);
const tmpArrElement$1 = $(`e2`);
const cb = $(`opaque_every_predicate`);
$(`every_result`, $dotCall($array_every, [tmpArrElement, tmpArrElement$1], `every`, cb));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "e1" );
const b = $( "e2" );
const c = $( "opaque_every_predicate" );
const d = [ a, b ];
const e = $dotCall( $array_every, d, "every", c );
$( "every_result", e );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpArrElement = $(`e1`);
const tmpArrElement$1 = $(`e2`);
let arr = [tmpArrElement, tmpArrElement$1];
let cb = $(`opaque_every_predicate`);
const tmpMCF = arr.every;
let allMatch = $dotCall(tmpMCF, arr, `every`, cb);
$(`every_result`, allMatch);
`````


## Todos triggered


- (todo) access object property that also exists on prototype? $array_every
- (todo) arr mutation may be able to inline this method: $array_every
- (todo) arr mutation may be able to inline this method: tmpMCF
- (todo) support array reads statement type ExpressionStatement
- (todo) support array reads statement type VarStatement
- (todo) type trackeed tricks can possibly support static $array_every


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'e1'
 - 2: 'e2'
 - 3: 'opaque_every_predicate'
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
