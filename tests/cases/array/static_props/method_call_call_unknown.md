# Preval test case

# method_call_call_unknown.md

> Array > Static props > Method call call unknown
>
> Getting the length of an array can be tricky, and sometimes be done

In this case the array escapes so we bail.

## Input

`````js filename=intro
const arr = [1, 2, 3];
arr.splice.call(arr, $(1), 2, 10, 20);
$(arr.length);
`````


## Settled


`````js filename=intro
const tmpCalleeParam$1 /*:unknown*/ = $(1);
const arr /*:array*/ = [1, 2, 3];
$array_splice.call(arr, tmpCalleeParam$1, 2, 10, 20);
$(3);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpCalleeParam$1 = $(1);
$array_splice.call([1, 2, 3], tmpCalleeParam$1, 2, 10, 20);
$(3);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 1 );
const b = [ 1, 2, 3 ];
$array_splice.call( b, a, 2, 10, 20 );
$( 3 );
`````


## Todos triggered


- replace with $array_splice


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: 3
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
