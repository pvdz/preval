# Preval test case

# arg_spread_stmt.md

> Arguments > Arg spread stmt
>
> Arguments can be spread but this should not be observable

## Input

`````js filename=intro
function f(a, b, c) {
  [...arguments]; // Can be dropped. Should be.
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


## Globals


None


## Runtime Outcome


Should call `$` with:
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
