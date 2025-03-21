# Preval test case

# write_read_write.md

> Assigns > Write read write
>
> Testing binding mutation optimizations

## Input

`````js filename=intro
let x = $(1);
$(x);
x = $(2);
$(x);
x = $('redundant'); // This assignment should be dropped (but the expression is kept)
`````


## Settled


`````js filename=intro
const x /*:unknown*/ = $(1);
$(x);
const tmpClusterSSA_x /*:unknown*/ = $(2);
$(tmpClusterSSA_x);
$(`redundant`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$($(1));
$($(2));
$(`redundant`);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 1 );
$( a );
const b = $( 2 );
$( b );
$( "redundant" );
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: 1
 - 3: 2
 - 4: 2
 - 5: 'redundant'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
