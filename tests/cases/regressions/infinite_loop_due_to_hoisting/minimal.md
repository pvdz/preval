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

## Pre Normal


`````js filename=intro
let f = function () {
  debugger;
};
const a = { x: 1 };
f(a.x === 1 ? 2 : 3);
`````

## Normalized


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
  tmpCallCallee(tmpCalleeParam);
} else {
  tmpCalleeParam = 3;
  tmpCallCallee(tmpCalleeParam);
}
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
