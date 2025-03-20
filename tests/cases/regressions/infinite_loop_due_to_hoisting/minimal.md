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


## Globals


None


## Runtime Outcome


Should call `$` with:
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
