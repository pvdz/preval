# Preval test case

# string_includes_known_coerced.md

> Type tracked > String method > String includes known coerced

## Input

`````js filename=intro
const bool1 = '123'.includes(1); // coerced to string
const bool2 = '321'.includes(1); // coerced to string
$(bool1, bool2);
`````


## Settled


`````js filename=intro
$(true, true);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(true, true);
`````


## PST Settled
With rename=true

`````js filename=intro
$( true, true );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpMCF = $string_includes;
const bool1 = $dotCall($string_includes, `123`, `includes`, 1);
const tmpMCF$1 = $string_includes;
const bool2 = $dotCall($string_includes, `321`, `includes`, 1);
$(bool1, bool2);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: true, true
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
