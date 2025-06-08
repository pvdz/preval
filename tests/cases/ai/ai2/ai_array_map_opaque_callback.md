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
const result /*:array*/ /*truthy*/ = $dotCall($array_map, arr, `map`, cb);
$(`result_array`, result);
$(`original_array`, arr);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const cb = $(`opaque_callback`);
const arr = [1, 2, 3];
$(`result_array`, $dotCall($array_map, arr, `map`, cb));
$(`original_array`, arr);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "opaque_callback" );
const b = [ 1, 2, 3 ];
const c = $dotCall( $array_map, b, "map", a );
$( "result_array", c );
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


- (todo) access object property that also exists on prototype? $array_map
- (todo) arr mutation may be able to inline this method: $array_map
- (todo) arr mutation may be able to inline this method: tmpMCF
- (todo) support array reads statement type ExpressionStatement
- (todo) support array reads statement type VarStatement
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
