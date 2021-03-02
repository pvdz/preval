# Preval test case

# arr_arr.md

> Normalize > Pattern > Param > Base inner def > Arr arr
>
> Testing simple pattern normalizations

## Input

`````js filename=intro
function i([[ x = a ]]) { return x }
`````

## Normalized

`````js filename=intro
let i = function (tmpParamPattern) {
  let arrPatternSplat = [...tmpParamPattern];
  let arrPatternStep = arrPatternSplat[0];
  let arrPatternSplat$1 = [...arrPatternStep];
  let arrPatternBeforeDefault = arrPatternSplat$1[0];
  let x = undefined;
  const tmpIfTest = arrPatternBeforeDefault === undefined;
  if (tmpIfTest) {
    x = a;
    return x;
  } else {
    x = arrPatternBeforeDefault;
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
