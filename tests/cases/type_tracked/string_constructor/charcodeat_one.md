# Preval test case

# charcodeat_one.md

> Type tracked > String constructor > Charcodeat one
>
> Should try to inline the charCodeAt call

## Input

`````js filename=intro
$(String.fromCharCode(80));
`````


## Settled


`````js filename=intro
$(`P`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`P`);
`````


## PST Settled
With rename=true

`````js filename=intro
$( "P" );
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'P'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
