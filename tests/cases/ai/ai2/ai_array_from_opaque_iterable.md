# Preval test case

# ai_array_from_opaque_iterable.md

> Ai > Ai2 > Ai array from opaque iterable
>
> Test: Array.from with an opaque iterable and opaque map function.

## Input

`````js filename=intro
// Expected: Array.from attempts to iterate opaque iterable and apply opaque mapFn.
let iterable = $('opaque_iterable');
let mapFn = $('opaque_map_function');
let newArr = Array.from(iterable, mapFn);
$('array_from_result', newArr);
`````


## Settled


`````js filename=intro
const iterable /*:unknown*/ = $(`opaque_iterable`);
const mapFn /*:unknown*/ = $(`opaque_map_function`);
const newArr /*:array*/ = $Array_from(iterable, mapFn);
$(`array_from_result`, newArr);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const iterable = $(`opaque_iterable`);
$(`array_from_result`, $Array_from(iterable, $(`opaque_map_function`)));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "opaque_iterable" );
const b = $( "opaque_map_function" );
const c = $Array_from( a, b );
$( "array_from_result", c );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let iterable = $(`opaque_iterable`);
let mapFn = $(`opaque_map_function`);
const tmpMCF = $Array_from;
let newArr = $Array_from(iterable, mapFn);
$(`array_from_result`, newArr);
`````


## Todos triggered


- (todo) type trackeed tricks can possibly support static $Array_from


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'opaque_iterable'
 - 2: 'opaque_map_function'
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
