# Preval test case

# odd_early_return3b.md

> Normalize > Switch > Odd early return3b
>
> Sorting out the branching stuff

Regression was not inlining a single used function

This function is in global.

## Input

`````js filename=intro
const inlineMe = function () {
  $ <= 3;
};
const g = function () {
  if ($) {
    inlineMe();
  }
};
if ($) {
  g();
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
