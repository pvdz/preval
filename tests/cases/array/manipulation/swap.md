# Preval test case

# swap.md

> Array > Manipulation > Swap
>
> Rotate a number

## Input

`````js filename=intro
const arr = [1, 2];
arr.push(arr.shift());
$(arr);
`````


## Settled


`````js filename=intro
const arr /*:array*/ = [2];
$dotCall($array_push, arr, `push`, 1);
$(arr);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const arr = [2];
$dotCall($array_push, arr, `push`, 1);
$(arr);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = [ 2 ];
$dotCall( $array_push, a, "push", 1 );
$( a );
`````


## Todos triggered


- (todo) Missed opportunity to inline a type tracked trick for $array_push


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: [2, 1]
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
