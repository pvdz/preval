# Preval test case

# regression.md

> One timers > Regression
>
> Some kind of regression

## Input

`````js filename=intro
const f = function (x, y) {
  $();
  const tmpReturnArg = g(x, y);
  return tmpReturnArg;
};
const g = function () {
  if ($) {
    const tmpReturnArg$1 = $();
    return tmpReturnArg$1;
  }
};
const h = function (z) {
  const t = z | 4096;
  f(t);
};
h();
`````


## Settled


`````js filename=intro
$();
if ($) {
  $();
} else {
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$();
if ($) {
  $();
}
`````


## PST Settled
With rename=true

`````js filename=intro
$();
if ($) {
  $();
}
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 
 - 2: 
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
