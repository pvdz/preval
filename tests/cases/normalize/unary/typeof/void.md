# Preval test case

# void.md

> Normalize > Unary > Typeof > Void
>
> Typeof always returns a string

## Input

`````js filename=intro
$(typeof void $(100));
`````


## Settled


`````js filename=intro
$(100);
$(`undefined`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(100);
$(`undefined`);
`````


## PST Settled
With rename=true

`````js filename=intro
$( 100 );
$( "undefined" );
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 100
 - 2: 'undefined'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
