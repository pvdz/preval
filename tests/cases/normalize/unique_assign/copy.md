# Preval test case

# copy.md

> Normalize > Unique assign > Copy
>
> The normalization step should make it so that each binding is only assigned to once. It should create fresh bindings for every mutation.

## Input

`````js filename=intro
let a = $(1);
a = $(2);
$(a);
`````


## Settled


`````js filename=intro
$(1);
const a /*:unknown*/ = $(2);
$(a);
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


## Todos triggered


None


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
