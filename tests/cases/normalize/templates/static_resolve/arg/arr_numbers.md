# Preval test case

# arr_numbers.md

> Normalize > Templates > Static resolve > Arg > Arr numbers
>
> Templates should be able to resolve literals

## Input

`````js filename=intro
$(`${[1,2,3]}`);
`````


## Settled


`````js filename=intro
$(`1,2,3`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`1,2,3`);
`````


## PST Settled
With rename=true

`````js filename=intro
$( "1,2,3" );
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: '1,2,3'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
