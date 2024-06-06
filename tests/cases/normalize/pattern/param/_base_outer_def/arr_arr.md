# Preval test case

# arr_arr.md

> Normalize > Pattern > Param > Base outer def > Arr arr
>
> Testing simple pattern normalizations

## Input

`````js filename=intro
function i([[ x ]] = c ) { return x }
`````

## Pre Normal


`````js filename=intro
let i = function ($$0) {
  const tmpParamBare = $$0;
  debugger;
  let [[x]] = tmpParamBare === undefined ? c : tmpParamBare;
  return x;
};
`````

## Normalized


`````js filename=intro
let i = function ($$0) {
  const tmpParamBare = $$0;
  debugger;
  let bindingPatternArrRoot = undefined;
  const tmpIfTest = tmpParamBare === undefined;
  if (tmpIfTest) {
    bindingPatternArrRoot = c;
  } else {
    bindingPatternArrRoot = tmpParamBare;
  }
  let arrPatternSplat = [...bindingPatternArrRoot];
  let arrPatternStep = arrPatternSplat[0];
  let arrPatternSplat$1 = [...arrPatternStep];
  let x = arrPatternSplat$1[0];
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
