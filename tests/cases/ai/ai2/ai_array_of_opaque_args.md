# Preval test case

# ai_array_of_opaque_args.md

> Ai > Ai2 > Ai array of opaque args
>
> Test: Array.of with opaque arguments.

## Input

`````js filename=intro
// Expected: Array.of creates an array from opaque arguments.
let item1 = $('val1');
let item2 = $('val2');
let newArr = Array.of(item1, item2, 'concrete');
$('array_of_result', newArr);
`````


## Settled


`````js filename=intro
const item1 /*:unknown*/ = $(`val1`);
const item2 /*:unknown*/ = $(`val2`);
const newArr /*:array*/ = $Array_of(item1, item2, `concrete`);
$(`array_of_result`, newArr);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const item1 = $(`val1`);
$(`array_of_result`, $Array_of(item1, $(`val2`), `concrete`));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "val1" );
const b = $( "val2" );
const c = $Array_of( a, b, "concrete" );
$( "array_of_result", c );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let item1 = $(`val1`);
let item2 = $(`val2`);
const tmpMCF = $Array_of;
let newArr = $Array_of(item1, item2, `concrete`);
$(`array_of_result`, newArr);
`````


## Todos triggered


- (todo) type trackeed tricks can possibly support static $Array_of


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'val1'
 - 2: 'val2'
 - 3: 'array_of_result', ['val1', 'val2', 'concrete']
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
