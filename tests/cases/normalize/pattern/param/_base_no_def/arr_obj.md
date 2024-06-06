# Preval test case

# arr_obj.md

> Normalize > Pattern > Param > Base no def > Arr obj
>
> Testing simple pattern normalizations

## Input

`````js filename=intro
function h([{ x }]) { return x}
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

## Output


`````js filename=intro

`````

## PST Output

With rename=true

`````js filename=intro

`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
