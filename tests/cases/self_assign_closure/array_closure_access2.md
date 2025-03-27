# Preval test case

# array_closure_access.md

## Input

`````js filename=intro
const a /*:array*/ = [1, 2, 3];
$(a);                                           // <-- this may change the array!
const tmpCalleeParam$1 /*:primitive*/ = a[1];   // <-- so this cannot be safely inlined
$(tmpCalleeParam$1);
`````


## Settled


`````js filename=intro
const a /*:array*/ = [1, 2, 3];
$(a);
const tmpCalleeParam$1 /*:primitive*/ = a[1];
$(tmpCalleeParam$1);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const a = [1, 2, 3];
$(a);
$(a[1]);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = [ 1, 2, 3 ];
$( a );
const b = a[ 1 ];
$( b );
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: [1, 2, 3]
 - 2: 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
