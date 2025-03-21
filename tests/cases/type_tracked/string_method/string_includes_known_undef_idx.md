# Preval test case

# string_includes_known_undef_idx.md

> Type tracked > String method > String includes known undef idx

## Options

- globals: a b c

## Input

`````js filename=intro
const bool1 = 'undefined123'.includes(undefined, 1);
const bool2 = '123undefined'.includes(undefined, 1);
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
