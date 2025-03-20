# Preval test case

# string_num_neg_one.md

> Normalize > Unary > Tilde > String num neg one
>
> Unaries should be statically resolved where possible

## Input

`````js filename=intro
$(~"-1");
`````


## Settled


`````js filename=intro
$(0);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(0);
`````


## PST Settled
With rename=true

`````js filename=intro
$( 0 );
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 0
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
