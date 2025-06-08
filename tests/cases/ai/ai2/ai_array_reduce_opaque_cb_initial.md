# Preval test case

# ai_array_reduce_opaque_cb_initial.md

> Ai > Ai2 > Ai array reduce opaque cb initial
>
> Test: Array.prototype.reduce with opaque callback and opaque initial value.

## Input

`````js filename=intro
// Expected: Reduce operation proceeds with opaque parts.
let arr = [$('item1')];
let cb = $('opaque_reducer');
let initial = $('opaque_initial');
let result = arr.reduce(cb, initial);
$('reduce_result', result);
`````


## Settled


`````js filename=intro
const tmpArrElement /*:unknown*/ = $(`item1`);
const cb /*:unknown*/ = $(`opaque_reducer`);
const initial /*:unknown*/ = $(`opaque_initial`);
const arr /*:array*/ /*truthy*/ = [tmpArrElement];
const result /*:array*/ /*truthy*/ = $dotCall($array_reduce, arr, `reduce`, cb, initial);
$(`reduce_result`, result);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpArrElement = $(`item1`);
const cb = $(`opaque_reducer`);
const initial = $(`opaque_initial`);
$(`reduce_result`, $dotCall($array_reduce, [tmpArrElement], `reduce`, cb, initial));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "item1" );
const b = $( "opaque_reducer" );
const c = $( "opaque_initial" );
const d = [ a ];
const e = $dotCall( $array_reduce, d, "reduce", b, c );
$( "reduce_result", e );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpArrElement = $(`item1`);
let arr = [tmpArrElement];
let cb = $(`opaque_reducer`);
let initial = $(`opaque_initial`);
const tmpMCF = arr.reduce;
let result = $dotCall(tmpMCF, arr, `reduce`, cb, initial);
$(`reduce_result`, result);
`````


## Todos triggered


- (todo) access object property that also exists on prototype? $array_reduce
- (todo) arr mutation may be able to inline this method: $array_reduce
- (todo) arr mutation may be able to inline this method: tmpMCF
- (todo) support array reads statement type ExpressionStatement
- (todo) support array reads statement type VarStatement
- (todo) type trackeed tricks can possibly support static $array_reduce


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'item1'
 - 2: 'opaque_reducer'
 - 3: 'opaque_initial'
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
