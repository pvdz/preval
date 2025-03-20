# Preval test case

# true.md

> Normalize > Unary > Typeof > True
>
> Typeof always returns a string

## Input

`````js filename=intro
$(typeof true);
`````


## Settled


`````js filename=intro
$(`boolean`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`boolean`);
`````


## PST Settled
With rename=true

`````js filename=intro
$( "boolean" );
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'boolean'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
