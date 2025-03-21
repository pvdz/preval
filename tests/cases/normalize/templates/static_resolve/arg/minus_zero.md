# Preval test case

# minus_zero.md

> Normalize > Templates > Static resolve > Arg > Minus zero
>
> Templates should be able to resolve literals

## Input

`````js filename=intro
$(`${-0}`);
`````


## Settled


`````js filename=intro
$(`0`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`0`);
`````


## PST Settled
With rename=true

`````js filename=intro
$( "0" );
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: '0'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
