# Preval test case

# arg_spread_stmt2.md

> Arguments > Arg spread stmt2
>
> Arguments can be spread but this should not be observable

## Input

`````js filename=intro
function f(a) {
  [...arguments];
}
f();
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
