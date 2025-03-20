# Preval test case

# infinity.md

> Normalize > Templates > Static resolve > Arg > Infinity
>
> Templates should be able to resolve literals

## Input

`````js filename=intro
$(`${Infinity}`);
`````


## Settled


`````js filename=intro
$(`Infinity`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`Infinity`);
`````


## PST Settled
With rename=true

`````js filename=intro
$( "Infinity" );
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'Infinity'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
