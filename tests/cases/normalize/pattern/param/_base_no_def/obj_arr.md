# Preval test case

# obj_arr.md

> Normalize > Pattern > Param > Base no def > Obj arr
>
> Testing simple pattern normalizations

## Input

`````js filename=intro
function i({x: [ y ]}) { return y }
`````

## Pre Normal

`````js filename=intro
let i = function (tmpParamPattern) {
  let {
    x: [y],
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
  let y = arrPatternSplat[0];
  return y;
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
