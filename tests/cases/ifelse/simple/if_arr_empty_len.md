# Preval test case

# if_arr_empty_len.md

> Ifelse > Simple > If arr empty len
>
> Eliminate simple tautology

## Input

`````js filename=intro
if ([].length) $();
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
