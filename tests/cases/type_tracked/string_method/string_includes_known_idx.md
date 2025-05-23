# Preval test case

# string_includes_known_idx.md

> Type tracked > String method > String includes known idx

## Options

- globals: a b c

## Input

`````js filename=intro
const bool1 = '123'.includes('1', 1);
const bool2 = '321'.includes('1', 1);
$(bool1, bool2);
`````


## Settled


`````js filename=intro
$(false, true);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(false, true);
`````


## PST Settled
With rename=true

`````js filename=intro
$( false, true );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpMCF = $string_includes;
const bool1 = $dotCall($string_includes, `123`, `includes`, `1`, 1);
const tmpMCF$1 = $string_includes;
const bool2 = $dotCall($string_includes, `321`, `includes`, `1`, 1);
$(bool1, bool2);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: false, true
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
