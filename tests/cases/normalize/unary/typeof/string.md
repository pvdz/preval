# Preval test case

# string.md

> Normalize > Unary > Typeof > String
>
> Typeof always returns a string

## Input

`````js filename=intro
$(typeof "foo");
`````


## Settled


`````js filename=intro
$(`string`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`string`);
`````


## PST Settled
With rename=true

`````js filename=intro
$( "string" );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let tmpCalleeParam = `string`;
$(tmpCalleeParam);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'string'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
