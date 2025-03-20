# Preval test case

# tilde_minus_1.md

> Normalize > Binary > Tilde minus 1
>
> This wasn't getting normalized...

## Input

`````js filename=intro
~-0x1;
$(~-0x1);
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
