# Preval test case

# class_extending_string.md

> Normalize > Class > Class extending string
>
> This broke something at some point in time :)

## Input

`````js filename=intro
class x extends $(String) {}
`````


## Settled


`````js filename=intro
$(String);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(String);
`````


## PST Settled
With rename=true

`````js filename=intro
$( String );
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: '<function>'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
