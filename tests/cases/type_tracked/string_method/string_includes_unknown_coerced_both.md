# Preval test case

# string_includes_unknown_coerced_both.md

> Type tracked > String method > String includes unknown coerced both

## Input

`````js filename=intro
const bool = '321'.includes(1, '2'); // coerced to string
const bool2 = '123'.includes(1, '2'); // coerced to string
$(bool, bool2);
`````


## Settled


`````js filename=intro
$(true, false);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(true, false);
`````


## PST Settled
With rename=true

`````js filename=intro
$( true, false );
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: true, false
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
