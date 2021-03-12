# Preval test case

# arr_obj.md

> Normalize > Pattern > Param > Base outer def > Arr obj
>
> Testing simple pattern normalizations

## Input

`````js filename=intro
function h([{ x }] = c ) { return x}
`````

## Pre Normal

`````js filename=intro
let h = function (tmpParamDefault) {
  let [{ x }] = tmpParamDefault === undefined ? c : tmpParamDefault;
  return x;
};
`````

## Normalized

`````js filename=intro
let h = function (tmpParamDefault) {
  let bindingPatternArrRoot = undefined;
  const tmpIfTest = tmpParamDefault === undefined;
  if (tmpIfTest) {
    bindingPatternArrRoot = c;
  } else {
    bindingPatternArrRoot = tmpParamDefault;
  }
  let arrPatternSplat = [...bindingPatternArrRoot];
  let arrPatternStep = arrPatternSplat[0];
  let x = arrPatternStep.x;
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
