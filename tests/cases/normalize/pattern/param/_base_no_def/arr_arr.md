# Preval test case

# arr_arr.md

> Normalize > Pattern > Param > Base no def > Arr arr
>
> Testing simple pattern normalizations

## Input

`````js filename=intro
function i([[ x ]]) { return x }
`````

## Pre Normal

`````js filename=intro
let i = function (tmpParamPattern) {
  let [[x]] = tmpParamPattern;
  return x;
};
`````

## Normalized

`````js filename=intro
let i = function (tmpParamPattern) {
  let bindingPatternArrRoot = tmpParamPattern;
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

## Globals

None

## Result

Should call `$` with:
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
