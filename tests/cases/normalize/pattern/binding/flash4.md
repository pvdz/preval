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

## Pre Normal


`````js filename=intro
let x = function ($$0) {
  const tmpParamBare = $$0;
  debugger;
  let { x: x$1 } = tmpParamBare;
  return x$1;
};
x({ x: x });
`````

## Normalized


`````js filename=intro
let x = function ($$0) {
  const tmpParamBare = $$0;
  debugger;
  let bindingPatternObjRoot = tmpParamBare;
  let x$1 = bindingPatternObjRoot.x;
  return x$1;
};
const tmpCallCallee = x;
const tmpCalleeParam = { x: x };
tmpCallCallee(tmpCalleeParam);
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
