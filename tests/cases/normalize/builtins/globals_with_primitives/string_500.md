# Preval test case

# string_500.md

> Normalize > Builtins > Globals with primitives > String 500
>
> Calling String on a primitive should resolve

## Input

`````js filename=intro
$(String(500));
`````


## Settled


`````js filename=intro
$(`500`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`500`);
`````


## PST Settled
With rename=true

`````js filename=intro
$( "500" );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let tmpCalleeParam = $coerce(500, `string`);
$(tmpCalleeParam);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: '500'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
