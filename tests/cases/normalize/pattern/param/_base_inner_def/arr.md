# Preval test case

# arr.md

> Normalize > Pattern > Param > Base inner def > Arr
>
> Testing simple pattern normalizations

## Input

`````js filename=intro
function f([ x = a ]) { return x }
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
let f = function ($$0) {
  const tmpParamBare = $$0;
  debugger;
  let tmpBindingPatternArrRoot = tmpParamBare;
  let tmpArrPatternSplat = [...tmpBindingPatternArrRoot];
  let tmpAPBD = tmpArrPatternSplat[0];
  let x = undefined;
  const tmpIfTest = tmpAPBD === undefined;
  if (tmpIfTest) {
    x = a;
    return x;
  } else {
    x = tmpAPBD;
    return x;
  }
};
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
