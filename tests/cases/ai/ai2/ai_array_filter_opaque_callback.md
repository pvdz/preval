# Preval test case

# ai_array_filter_opaque_callback.md

> Ai > Ai2 > Ai array filter opaque callback
>
> Test: Array filter method with an opaque callback.

## Input

`````js filename=intro
// Expected: [1,2,3].filter($('callback')) (or equivalent normalized form)
let arr = [1, 2, 3, 4];
let cb = $('opaque_filter_callback');
let result = arr.filter(cb);
$('result_array', result);
$('original_array', arr); // Check if original is mutated
`````


## Settled


`````js filename=intro
const cb /*:unknown*/ = $(`opaque_filter_callback`);
const arr /*:array*/ /*truthy*/ = [1, 2, 3, 4];
const result /*:array*/ /*truthy*/ = $dotCall($array_filter, arr, `filter`, cb);
$(`result_array`, result);
$(`original_array`, arr);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const cb = $(`opaque_filter_callback`);
const arr = [1, 2, 3, 4];
$(`result_array`, $dotCall($array_filter, arr, `filter`, cb));
$(`original_array`, arr);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "opaque_filter_callback" );
const b = [ 1, 2, 3, 4 ];
const c = $dotCall( $array_filter, b, "filter", a );
$( "result_array", c );
$( "original_array", b );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let arr = [1, 2, 3, 4];
let cb = $(`opaque_filter_callback`);
const tmpMCF = arr.filter;
let result = $dotCall(tmpMCF, arr, `filter`, cb);
$(`result_array`, result);
$(`original_array`, arr);
`````


## Todos triggered


- (todo) access object property that also exists on prototype? $array_filter
- (todo) arr mutation may be able to inline this method: $array_filter
- (todo) arr mutation may be able to inline this method: tmpMCF
- (todo) support array reads statement type ExpressionStatement
- (todo) support array reads statement type VarStatement
- (todo) type trackeed tricks can possibly support static $array_filter


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'opaque_filter_callback'
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
