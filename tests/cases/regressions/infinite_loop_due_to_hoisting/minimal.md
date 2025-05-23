# Preval test case

# minimal.md

> Regressions > Infinite loop due to hoisting > Minimal
>
> Minimal test case for an infinite loop at some point. The problem was hoisting triggering "changes" when there weren't any.

## Input

`````js filename=intro
const a = {x: 1};

function f() {}
f(a.x === 1 ? 2 : 3);
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


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let f = function () {
  debugger;
  return undefined;
};
const a = { x: 1 };
const tmpCallCallee = f;
let tmpCalleeParam = undefined;
const tmpBinLhs = a.x;
const tmpIfTest = tmpBinLhs === 1;
if (tmpIfTest) {
  tmpCalleeParam = 2;
  f(tmpCalleeParam);
} else {
  tmpCalleeParam = 3;
  f(tmpCalleeParam);
}
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
