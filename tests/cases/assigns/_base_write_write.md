# Preval test case

# _base_write_write.md

> Assigns > Base write write
>
> Testing binding mutation optimizations

## Input

`````js filename=intro
let x = $(1);
x = $(2);
$(x);
`````


## Settled


`````js filename=intro
$(1);
const x /*:unknown*/ = $(2);
$(x);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(1);
$($(2));
`````


## PST Settled
With rename=true

`````js filename=intro
$( 1 );
const a = $( 2 );
$( a );
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
