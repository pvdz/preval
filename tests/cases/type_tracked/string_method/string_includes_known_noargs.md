# Preval test case

# string_includes_known_noargs.md

> Type tracked > String method > String includes known noargs

## Options

- globals: a b c

## Input

`````js filename=intro
const bool = '123'.includes();
$(bool);
`````


## Settled


`````js filename=intro
$(false);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(false);
`````


## PST Settled
With rename=true

`````js filename=intro
$( false );
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: false
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
