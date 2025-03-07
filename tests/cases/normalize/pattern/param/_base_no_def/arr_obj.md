# Preval test case

# arr_obj.md

> Normalize > Pattern > Param > Base no def > Arr obj
>
> Testing simple pattern normalizations

## Input

`````js filename=intro
function h([{ x }]) { return x}
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
let h = function ($$0) {
  const tmpParamBare = $$0;
  debugger;
  let [{ x: x }] = tmpParamBare;
  return x;
};
`````

## Normalized


`````js filename=intro
let h = function ($$0) {
  const tmpParamBare = $$0;
  debugger;
  let bindingPatternArrRoot = tmpParamBare;
  let arrPatternSplat = [...bindingPatternArrRoot];
  let arrPatternStep = arrPatternSplat[0];
  let x = arrPatternStep.x;
  return x;
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
