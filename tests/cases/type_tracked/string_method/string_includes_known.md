# Preval test case

# string_includes_known.md

> Type tracked > String method > String includes known

## Options

- globals: a b c

## Input

`````js filename=intro
const str = '123';
const bool = str.includes('1');
$(bool);
`````


## Settled


`````js filename=intro
$(true);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(true);
`````


## PST Settled
With rename=true

`````js filename=intro
$( true );
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: true
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
