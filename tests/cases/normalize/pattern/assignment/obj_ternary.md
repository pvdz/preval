# Preval test case

# obj_ternary.md

> Normalize > Pattern > Assignment > Obj ternary
>
> Regression from obj param with default

Regression was causing infinite loop

## Input

`````js filename=intro
let f = function () {
  let {} = $ ? 1 : 2;
};
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
