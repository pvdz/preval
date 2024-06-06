# Preval test case

# arr_obj.md

> Normalize > Pattern > Param > Base inner def > Arr obj
>
> Testing simple pattern normalizations

## Input

`````js filename=intro
function h([{ x = a }]) { return x}
`````

## Pre Normal


`````js filename=intro
let h = function ($$0) {
  const tmpParamBare = $$0;
  debugger;
  let [{ x: x = a }] = tmpParamBare;
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
  let objPatternBeforeDefault = arrPatternStep.x;
  let x = undefined;
  const tmpIfTest = objPatternBeforeDefault === undefined;
  if (tmpIfTest) {
    x = a;
    return x;
  } else {
    x = objPatternBeforeDefault;
    return x;
  }
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
