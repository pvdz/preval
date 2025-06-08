# Preval test case

# ai_array_fill_opaque_value.md

> Ai > Ai2 > Ai array fill opaque value
>
> Test: Array.prototype.fill with an opaque value and opaque indices.

## Input

`````js filename=intro
// Expected: Array is filled with opaque value according to opaque indices.
let arr = [1, 2, 3, 4];
let val = $('opaque_fill_value');
let start = $('opaque_start_index'); // e.g. 1
let end = $('opaque_end_index');     // e.g. 3
arr.fill(val, start, end);
$('fill_result', arr);
`````


## Settled


`````js filename=intro
const val /*:unknown*/ = $(`opaque_fill_value`);
const start /*:unknown*/ = $(`opaque_start_index`);
const end /*:unknown*/ = $(`opaque_end_index`);
const arr /*:array*/ /*truthy*/ = [1, 2, 3, 4];
$dotCall($array_fill, arr, `fill`, val, start, end);
$(`fill_result`, arr);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const val = $(`opaque_fill_value`);
const start = $(`opaque_start_index`);
const end = $(`opaque_end_index`);
const arr = [1, 2, 3, 4];
$dotCall($array_fill, arr, `fill`, val, start, end);
$(`fill_result`, arr);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "opaque_fill_value" );
const b = $( "opaque_start_index" );
const c = $( "opaque_end_index" );
const d = [ 1, 2, 3, 4 ];
$dotCall( $array_fill, d, "fill", a, b, c );
$( "fill_result", d );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let arr = [1, 2, 3, 4];
let val = $(`opaque_fill_value`);
let start = $(`opaque_start_index`);
let end = $(`opaque_end_index`);
const tmpMCF = arr.fill;
$dotCall(tmpMCF, arr, `fill`, val, start, end);
$(`fill_result`, arr);
`````


## Todos triggered


- (todo) access object property that also exists on prototype? $array_fill
- (todo) arr mutation may be able to inline this method: $array_fill
- (todo) arr mutation may be able to inline this method: tmpMCF
- (todo) support array reads statement type ExpressionStatement
- (todo) type trackeed tricks can possibly support static $array_fill


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'opaque_fill_value'
 - 2: 'opaque_start_index'
 - 3: 'opaque_end_index'
 - 4: 'fill_result', [1, 2, 3, 4]
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
