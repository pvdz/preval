# Preval test case

# arr_obj.md

> Normalize > Pattern > Param > Base no def > Arr obj
>
> Testing simple pattern normalizations

## Input

`````js filename=intro
function h([{ x }]) { return x}
`````

## Normalized

`````js filename=intro
let h = function (tmpParamPattern) {
  let bindingPatternArrRoot = tmpParamPattern;
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

Normalized calls: Same

Final output calls: Same
