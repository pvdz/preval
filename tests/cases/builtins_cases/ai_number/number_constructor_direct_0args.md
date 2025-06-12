# Preval test case

# number_constructor_direct_0args.md

> Builtins cases > Ai number > Number constructor direct 0args
>
> Test Number constructor called directly with 0 arguments; should return 0

## Input

`````js filename=intro
const result = Number();
$(result); // Expected: 0
`````


## Settled


`````js filename=intro
$(0);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(0);
`````


## PST Settled
With rename=true

`````js filename=intro
$( 0 );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const result = 0;
$(result);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 0
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
