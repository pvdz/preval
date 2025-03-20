# Preval test case

# argless.md

> Global casting > String > Argless
>
> Calling global constructors to cast when the call is redundant should be eliminated

## Input

`````js filename=intro
const y = String();
$(y);
`````


## Settled


`````js filename=intro
$(``);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(``);
`````


## PST Settled
With rename=true

`````js filename=intro
$( "" );
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: ''
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
