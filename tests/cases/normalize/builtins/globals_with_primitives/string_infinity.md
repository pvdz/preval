# Preval test case

# string_infinity.md

> Normalize > Builtins > Globals with primitives > String infinity
>
> Calling String on a primitive should resolve

## Input

`````js filename=intro
$(String(Infinity));
`````


## Settled


`````js filename=intro
$(`Infinity`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`Infinity`);
`````


## PST Settled
With rename=true

`````js filename=intro
$( "Infinity" );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let tmpCalleeParam = `Infinity`;
$(tmpCalleeParam);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'Infinity'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
