# Preval test case

# arr.md

> Normalize > Pattern > Param > Base no def > Arr
>
> Testing simple pattern normalizations

## Input

`````js filename=intro
function f([ x ]) { return x }
`````

## Pre Normal

`````js filename=intro
let f = function (tmpParamPattern) {
  let [x] = tmpParamPattern;
  return x;
};
`````

## Normalized

`````js filename=intro
let f = function (tmpParamPattern) {
  let bindingPatternArrRoot = tmpParamPattern;
  let arrPatternSplat = [...bindingPatternArrRoot];
  let x = arrPatternSplat[0];
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
