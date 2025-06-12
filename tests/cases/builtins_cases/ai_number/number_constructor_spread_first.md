# Preval test case

# number_constructor_spread_first.md

> Builtins cases > Ai number > Number constructor spread first
>
> Test Number constructor called directly with spread as first argument (3 values)

## Input

`````js filename=intro
const args = ["42", 7, 99];
const result = Number(...args);
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
const args = [`42`, 7, 99];
const result = $number_constructor(...args);
$(result);
`````


## Todos triggered


- (todo) type trackeed tricks can possibly support static $number_constructor


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
