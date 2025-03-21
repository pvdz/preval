# Preval test case

# proto.md

> Array > Manipulation > Proto
>
> Push a number to an array

## Input

`````js filename=intro
const arr = [];
const push = arr.push;
arr.call(arr, 1);
$(arr);
`````


## Settled


`````js filename=intro
const arr /*:array*/ = [];
arr.call(arr, 1);
$(arr);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const arr = [];
arr.call(arr, 1);
$(arr);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = [];
a.call( a, 1 );
$( a );
`````


## Todos triggered


- replace with $array_push


## Globals


None


## Runtime Outcome


Should call `$` with:
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
