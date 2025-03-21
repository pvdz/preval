# Preval test case

# minus_one.md

> Normalize > Templates > Static resolve > Arg > Minus one
>
> Templates should be able to resolve literals

## Input

`````js filename=intro
$(`${-1}`);
`````


## Settled


`````js filename=intro
$(`-1`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`-1`);
`````


## PST Settled
With rename=true

`````js filename=intro
$( "-1" );
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: '-1'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
