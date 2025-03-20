# Preval test case

# string_num_hex.md

> Normalize > Unary > Tilde > String num hex
>
> Unaries should be statically resolved where possible

## Input

`````js filename=intro
$(~"0x0a05");
`````


## Settled


`````js filename=intro
$(-2566);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(-2566);
`````


## PST Settled
With rename=true

`````js filename=intro
$( -2566 );
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: -2566
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
