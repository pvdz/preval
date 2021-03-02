# Preval test case

# arr_obj.md

> Normalize > Pattern > Param > Base inner def > Arr obj
>
> Testing simple pattern normalizations

## Input

`````js filename=intro
function h([{ x = a }]) { return x}
`````

## Normalized

`````js filename=intro
let h = function (tmpParamPattern) {
  let arrPatternSplat = [...tmpParamPattern];
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

## Globals

None

## Result

Should call `$` with:
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
