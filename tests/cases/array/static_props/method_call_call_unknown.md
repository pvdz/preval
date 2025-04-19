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
const tmpCalleeParam /*:unknown*/ = $(1);
const arr /*:array*/ = [1, 2, 3];
$dotCall($array_splice, arr, undefined, tmpCalleeParam, 2, 10, 20);
const tmpCalleeParam$1 /*:number*/ = arr.length;
$(tmpCalleeParam$1);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpCalleeParam = $(1);
const arr = [1, 2, 3];
$dotCall($array_splice, arr, undefined, tmpCalleeParam, 2, 10, 20);
$(arr.length);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 1 );
const b = [ 1, 2, 3 ];
$dotCall( $array_splice, b, undefined, a, 2, 10, 20 );
const c = b.length;
$( c );
`````


## Todos triggered


None


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
