# Preval test case

# string_num_dec.md

> Normalize > Unary > Tilde > String num dec
>
> Unaries should be statically resolved where possible

## Input

`````js filename=intro
$(~"1005");
`````


## Settled


`````js filename=intro
$(-1006);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(-1006);
`````


## PST Settled
With rename=true

`````js filename=intro
$( -1006 );
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: -1006
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
