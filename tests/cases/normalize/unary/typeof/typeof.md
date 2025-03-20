# Preval test case

# typeof.md

> Normalize > Unary > Typeof > Typeof
>
> Typeof always returns a string

## Input

`````js filename=intro
$(typeof typeof $(100));
`````


## Settled


`````js filename=intro
$(100);
$(`string`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(100);
$(`string`);
`````


## PST Settled
With rename=true

`````js filename=intro
$( 100 );
$( "string" );
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 100
 - 2: 'string'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
