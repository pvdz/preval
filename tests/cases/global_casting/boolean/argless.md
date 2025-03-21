# Preval test case

# argless.md

> Global casting > Boolean > Argless
>
> Calling global constructors to cast when the call is redundant should be eliminated

## Input

`````js filename=intro
const y = Boolean();
$(y);
`````


## Settled


`````js filename=intro
$(false);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(false);
`````


## PST Settled
With rename=true

`````js filename=intro
$( false );
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: false
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
