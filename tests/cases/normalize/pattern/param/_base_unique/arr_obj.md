# Preval test case

# arr_obj.md

> Normalize > Pattern > Param > Base unique > Arr obj
>
> Testing simple pattern normalizations. Make sure pattern bindings are properly renamed to be globally unique.

## Input

`````js filename=intro
let x = 1;
function h([{ x }]) {
  { let x = 2; }
  return x
}
`````

## Pre Normal

`````js filename=intro
let h = function (tmpParamPattern) {
  let [{ x$1 }] = tmpParamPattern;
  {
    let x$2 = 2;
  }
  return x$1;
};
let x = 1;
`````

## Normalized

`````js filename=intro
let h = function (tmpParamPattern) {
  let bindingPatternArrRoot = tmpParamPattern;
  let arrPatternSplat = [...bindingPatternArrRoot];
  let arrPatternStep = arrPatternSplat[0];
  let x$1 = arrPatternStep.x$1;
  let x$2 = 2;
  return x$1;
};
let x = 1;
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
