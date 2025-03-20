# Preval test case

# minus_nan.md

> Normalize > Unary > Delete > Minus nan
>
> Silly case that we hopefully never see but :shrug:

## Input

`````js filename=intro
$(delete -NaN);
`````


## Settled


`````js filename=intro
$(true);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(true);
`````


## PST Settled
With rename=true

`````js filename=intro
$( true );
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: true
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
