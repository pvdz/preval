# Preval test case

# convert_to_func.md

> Normalize > Arrow > Convert to func
>
> Regression

## Input

`````js filename=intro
function f(x = false) {
  const y = (s) => x;
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


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let f = function ($$0) {
  const tmpParamBare = $$0;
  debugger;
  let x = undefined;
  const tmpIfTest = tmpParamBare === undefined;
  if (tmpIfTest) {
    x = false;
  } else {
    x = tmpParamBare;
  }
  const y = function ($$0) {
    let s = $$0;
    debugger;
    return x;
  };
  return undefined;
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
