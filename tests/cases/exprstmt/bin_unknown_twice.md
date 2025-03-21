# Preval test case

# bin_unknown_twice.md

> Exprstmt > Bin unknown twice
>
> Expression statements can be eliminated if we have enough information

## Input

`````js filename=intro
implicit1 + implicit2;
`````


## Settled


`````js filename=intro
implicit1 + implicit2;
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
implicit1 + implicit2;
`````


## PST Settled
With rename=true

`````js filename=intro
implicit1 + implicit2;
`````


## Todos triggered


None


## Globals


BAD@! Found 2 implicit global bindings:

implicit1, implicit2


## Runtime Outcome


Should call `$` with:
 - eval returned: ('<crash[ <ref> is not defined ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
