# Preval test case

# two_add.md

> Constants > Two add
>
> Two constants, nothing happens

## Input

`````js filename=intro
const foo = "five";
const bar = "six";
$(bar + foo)
`````


## Settled


`````js filename=intro
$(`sixfive`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`sixfive`);
`````


## PST Settled
With rename=true

`````js filename=intro
$( "sixfive" );
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'sixfive'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
