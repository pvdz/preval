# Preval test case

# flash4.md

> Normalize > Pattern > Binding > Flash4
>
> Regression hunting

## Input

`````js filename=intro
function x({x}) {
  return x; 
}
x({x});
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
let x = function ($$0) {
  const tmpParamBare = $$0;
  debugger;
  let tmpBindingPatternObjRoot = tmpParamBare;
  let x$1 = tmpBindingPatternObjRoot.x;
  return x$1;
};
const tmpCallCallee = x;
let tmpCalleeParam = { x: x };
x(tmpCalleeParam);
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
