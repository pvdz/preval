# Preval test case

# obj_arr.md

> Normalize > Pattern > Param > Base inner def > Obj arr
>
> Testing simple pattern normalizations

## Input

`````js filename=intro
function i({x: [ y = a ]}) { return y }
`````

## Pre Normal

`````js filename=intro
let i = function (tmpParamPattern) {
  let {
    x: [y = a],
  } = tmpParamPattern;
  return y;
};
`````

## Normalized

`````js filename=intro
let i = function (tmpParamPattern) {
  let bindingPatternObjRoot = tmpParamPattern;
  let objPatternNoDefault = bindingPatternObjRoot.x;
  let arrPatternSplat = [...objPatternNoDefault];
  let arrPatternBeforeDefault = arrPatternSplat[0];
  let y = undefined;
  const tmpIfTest = arrPatternBeforeDefault === undefined;
  if (tmpIfTest) {
    y = a;
    return y;
  } else {
    y = arrPatternBeforeDefault;
    return y;
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

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
