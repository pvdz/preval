# Preval test case

# string_num_float.md

> Normalize > Unary > Tilde > String num float
>
> Unaries should be statically resolved where possible

## Input

`````js filename=intro
$(~"10.05");
`````


## Settled


`````js filename=intro
$(-11);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(-11);
`````


## PST Settled
With rename=true

`````js filename=intro
$( -11 );
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: -11
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
