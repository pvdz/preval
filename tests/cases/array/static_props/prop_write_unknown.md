# Preval test case

# prop_write_unknown.md

> Array > Static props > Prop write unknown
>
> Getting the length of an array can be tricky, and sometimes be done

We can't tell what happened to the array so we must bail on the inlining.

## Input

`````js filename=intro
const arr = [1, 2, 3];
arr[$(2)] = 10;
$(arr.length);
`````


## Settled


`````js filename=intro
const tmpAssignComMemLhsProp /*:unknown*/ = $(2);
const arr /*:array*/ = [1, 2, 3];
arr[tmpAssignComMemLhsProp] = 10;
const tmpCalleeParam /*:number*/ = arr.length;
$(tmpCalleeParam);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpAssignComMemLhsProp = $(2);
const arr = [1, 2, 3];
arr[tmpAssignComMemLhsProp] = 10;
$(arr.length);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 2 );
const b = [ 1, 2, 3 ];
b[a] = 10;
const c = b.length;
$( c );
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 2
 - 2: 3
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
