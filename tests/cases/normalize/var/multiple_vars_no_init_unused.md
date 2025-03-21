# Preval test case

# multiple_vars_no_init_unused.md

> Normalize > Var > Multiple vars no init unused
>
> Declaring multiple bindings should be normalized to separate declarations such that there is one binding per declaration.

## Input

`````js filename=intro
var a, b, c
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
