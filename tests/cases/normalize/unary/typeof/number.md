# Preval test case

# number.md

> Normalize > Unary > Typeof > Number
>
> Typeof always returns a string

## Input

`````js filename=intro
$(typeof 500);
`````


## Settled


`````js filename=intro
$(`number`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`number`);
`````


## PST Settled
With rename=true

`````js filename=intro
$( "number" );
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'number'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
