# Preval test case

# regression.md

> Normalize > Expressions > Regression
>
> This case was being transformed incorrectly, with a sequence ending up as the lhs of an assignment (which is invalid).

## Input

`````js filename=intro
var x = {}, a = 1, b = 2, c = 3;
x[a + b] = c;
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
