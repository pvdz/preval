# Preval test case

# number_constructor_spread_second_4args.md

> Builtins cases > Ai number > Number constructor spread second 4args
>
> Test Number constructor called directly with spread as second argument (4 values)

## Input

`````js filename=intro
const arg1 = "42";
const args = [7, 99, 123, 456];
const result = Number(arg1, ...args);
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
const arg1 = `42`;
const args = [7, 99, 123, 456];
const tmpArgOverflow = arg1;
[...args];
const result = $coerce(tmpArgOverflow, `number`);
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
