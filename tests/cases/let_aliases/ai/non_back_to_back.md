# Preval test case

# non_back_to_back.md

> Let aliases > Ai > Non back to back
>
> Let aliasing with non-back-to-back const declarations

## Input

`````js filename=intro
let x = $(1);
const a = x;
; // unrelated empty statement
const b = x;
$(a, b);
`````


## Settled


`````js filename=intro
const x /*:unknown*/ = $(1);
$(x, x);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const x = $(1);
$(x, x);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 1 );
$( a, a );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let x = $(1);
const a = x;
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
 - 2: 1, 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
