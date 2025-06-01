# Preval test case

# tdz.md

> Let aliases > Ai > Tdz
>
> Let aliasing with let reassignment between consts (should not alias)

## Input

`````js filename=intro
let x = $(1);
const a = x;
x = 2;
const b = x;
$(a, b);
`````


## Settled


`````js filename=intro
const x /*:unknown*/ = $(1);
$(x, 2);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$($(1), 2);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 1 );
$( a, 2 );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let x = $(1);
const a = x;
x = 2;
const b = x;
$(a, x);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: 1, 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
