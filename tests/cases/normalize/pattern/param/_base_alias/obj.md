# Preval test case

# obj.md

> Normalize > Pattern > Param > Base alias > Obj
>
> Testing simple pattern normalizations

## Input

`````js filename=intro
function g({ x: y }) { return y }
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
let g = function ($$0) {
  const tmpParamBare = $$0;
  debugger;
  let { x: y } = tmpParamBare;
  return y;
};
`````

## Normalized


`````js filename=intro
let g = function ($$0) {
  const tmpParamBare = $$0;
  debugger;
  let bindingPatternObjRoot = tmpParamBare;
  let y = bindingPatternObjRoot.x;
  return y;
};
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
