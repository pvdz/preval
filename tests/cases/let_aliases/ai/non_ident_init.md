# Preval test case

# non_ident_init.md

> Let aliases > Ai > Non ident init
>
> Let aliasing with non-identifier initializer (should not alias)

## Input

`````js filename=intro
let x = $(1);
const a = x + 1;
const b = x;
$(a, b);
`````


## Settled


`````js filename=intro
const x /*:unknown*/ = $(1);
const a /*:primitive*/ = x + 1;
$(a, x);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const x = $(1);
$(x + 1, x);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 1 );
const b = a + 1;
$( b, a );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let x = $(1);
const a = x + 1;
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
 - 2: 2, 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
