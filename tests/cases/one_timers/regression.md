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


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const f = function ($$0, $$1) {
  let x = $$0;
  let y = $$1;
  debugger;
  $();
  const tmpReturnArg = g(x, y);
  return tmpReturnArg;
};
const g = function () {
  debugger;
  if ($) {
    const tmpReturnArg$1 = $();
    return tmpReturnArg$1;
  } else {
    return undefined;
  }
};
const h = function ($$0) {
  let z = $$0;
  debugger;
  const t = z | 4096;
  f(t);
  return undefined;
};
h();
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
