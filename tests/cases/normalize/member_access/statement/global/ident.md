# Preval test case

# ident.md

> Normalize > Member access > Statement > Global > Ident
>
> Ident property access should not be changed

## Input

`````js filename=intro
$.length;
`````


## Settled


`````js filename=intro
$.length;
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$.length;
`````


## PST Settled
With rename=true

`````js filename=intro
$.length;
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
$.length;
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
