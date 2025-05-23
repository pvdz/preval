# Preval test case

# base.md

> Const aliasing > Base
>
>

## Input

`````js filename=intro
const x = 1;
const y = x;
$(x, y);
`````


## Settled


`````js filename=intro
$(1, 1);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(1, 1);
`````


## PST Settled
With rename=true

`````js filename=intro
$( 1, 1 );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const x = 1;
const y = x;
$(x, x);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1, 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
