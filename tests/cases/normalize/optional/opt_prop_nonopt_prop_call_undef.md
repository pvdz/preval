# Preval test case

# opt_prop_nonopt_prop_call_undef.md

> Normalize > Optional > Opt prop nonopt prop call undef
>
> Make sure this works properly

## Input

`````js filename=intro
const a = undefined;
a?.b.c(1);
`````


## Settled


`````js filename=intro

`````


## Denormalized
(This ought to be the final result)

`````js filename=intro

`````


## PST Settled
With rename=true

`````js filename=intro

`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
