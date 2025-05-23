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


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
$(100);
let tmpCalleeParam = `string`;
$(tmpCalleeParam);
`````


## Todos triggered


None


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
