# Preval test case

# number_constructor_direct_2args.md

> Builtins cases > Ai number > Number constructor direct 2args
>
> Test Number constructor called directly with 2 arguments; extra arguments are ignored

## Input

`````js filename=intro
const result = Number("42", 7);
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
const tmpArgOverflow = `42`;
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
