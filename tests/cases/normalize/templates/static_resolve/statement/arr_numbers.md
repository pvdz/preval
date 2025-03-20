# Preval test case

# arr_numbers.md

> Normalize > Templates > Static resolve > Statement > Arr numbers
>
> Templates should be able to resolve literals

## Input

`````js filename=intro
`${[1,2,3]}`;
`````


## Settled


`````js filename=intro

`````


## Denormalized
(This ought to be the final result)

`````js filename=intro

`````


## PST Settled
With rename=true

`````js filename=intro

`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
