# Preval test case

# undefined.md

> Normalize > Unary > Typeof > Undefined
>
> Typeof always returns a string

## Input

`````js filename=intro
$(typeof undefined);
`````


## Settled


`````js filename=intro
$(`undefined`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`undefined`);
`````


## PST Settled
With rename=true

`````js filename=intro
$( "undefined" );
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'undefined'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
