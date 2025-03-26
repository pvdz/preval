# Preval test case

# unknown_complex.md

> Const aliasing > Unknown complex

## Input

`````js filename=intro
const tmp = $(1);
const x = tmp;
const y = tmp;
$(x, y);
`````


## Settled


`````js filename=intro
const tmp /*:unknown*/ = $(1);
$(tmp, tmp);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmp = $(1);
$(tmp, tmp);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 1 );
$( a, a );
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
