# Preval test case

# ai_array_find_opaque_cb.md

> Ai > Ai2 > Ai array find opaque cb
>
> Test: Array.prototype.find with an opaque callback.

## Input

`````js filename=intro
// Expected: Find uses opaque predicate, returns element or undefined.
let arr = [$('a'), $('b'), $('c')];
let cb = $('opaque_find_predicate');
let found = arr.find(cb);
$('find_result', found);
`````


## Settled


`````js filename=intro
const tmpArrElement /*:unknown*/ = $(`a`);
const tmpArrElement$1 /*:unknown*/ = $(`b`);
const tmpArrElement$3 /*:unknown*/ = $(`c`);
const cb /*:unknown*/ = $(`opaque_find_predicate`);
const arr /*:array*/ = [tmpArrElement, tmpArrElement$1, tmpArrElement$3];
const found /*:unknown*/ = $dotCall($array_find, arr, `find`, cb);
$(`find_result`, found);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpArrElement = $(`a`);
const tmpArrElement$1 = $(`b`);
const tmpArrElement$3 = $(`c`);
const cb = $(`opaque_find_predicate`);
$(`find_result`, $dotCall($array_find, [tmpArrElement, tmpArrElement$1, tmpArrElement$3], `find`, cb));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "a" );
const b = $( "b" );
const c = $( "c" );
const d = $( "opaque_find_predicate" );
const e = [ a, b, c ];
const f = $dotCall( $array_find, e, "find", d );
$( "find_result", f );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpArrElement = $(`a`);
const tmpArrElement$1 = $(`b`);
const tmpArrElement$3 = $(`c`);
let arr = [tmpArrElement, tmpArrElement$1, tmpArrElement$3];
let cb = $(`opaque_find_predicate`);
const tmpMCF = arr.find;
let found = $dotCall(tmpMCF, arr, `find`, cb);
$(`find_result`, found);
`````


## Todos triggered


- (todo) access object property that also exists on prototype? $array_find
- (todo) arr mutation may be able to inline this method: $array_find
- (todo) arr mutation may be able to inline this method: tmpMCF
- (todo) support array reads statement type ExpressionStatement
- (todo) support array reads statement type VarStatement
- (todo) type trackeed tricks can possibly support static $array_find


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'a'
 - 2: 'b'
 - 3: 'c'
 - 4: 'opaque_find_predicate'
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
