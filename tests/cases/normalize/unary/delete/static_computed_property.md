# Preval test case

# static_computed_property.md

> Normalize > Unary > Delete > Static computed property
>
> The property be normalized

## Input

`````js filename=intro
const obj = {x: 1};
delete obj['x'];
`````


## Settled


`````js filename=intro

`````


## Denormalized
(This ought to be the final result)

`````js filename=intro

`````


## PST Settled
With rename=true

`````js filename=intro

`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const obj = { x: 1 };
delete obj.x;
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
