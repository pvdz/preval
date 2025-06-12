# Preval test case

# number_constructor_call_ctx_3args.md

> Builtins cases > Ai number > Number constructor call ctx 3args
>
> Test Number constructor called with .call and dummy context, 3 arguments; extra arguments are ignored

## Input

`````js filename=intro
const result = Number.call(null, "42", 7, 99);
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
const tmpMCF = Number.call;
const result = $dotCall(tmpMCF, $number_constructor, `call`, null, `42`, 7, 99);
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
