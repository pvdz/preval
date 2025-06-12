# Preval test case

# number_constructor_direct_1arg.md

> Builtins cases > Ai number > Number constructor direct 1arg
>
> Test Number constructor called directly with 1 argument; should return the numeric value

## Input

`````js filename=intro
const result = Number("42");
$(result); // Expected: 42
`````


## Settled


`````js filename=intro
$(42);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(42);
`````


## PST Settled
With rename=true

`````js filename=intro
$( 42 );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const result = $coerce(`42`, `number`);
$(result);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 42
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
