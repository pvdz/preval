# Preval test case

# return.md

> Normalize > Expressions > Return
>
> Testing simple pattern normalizations

## Input

`````js filename=intro
function f(x, y) {
  return x = y;
}
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
