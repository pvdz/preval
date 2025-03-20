# Preval test case

# ookdunno.md

> Let hoisting > Ookdunno
>
> Property values check

The values were not checked leading to a inconsistent crash

## Input

`````js filename=intro
let f = function (tmpParamBare) {
  const tmpChainRootProp$1 = b;
};
const tmpObjLitVal = $;
let b = { x: tmpObjLitVal };
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
