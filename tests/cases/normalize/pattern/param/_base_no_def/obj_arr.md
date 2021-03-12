# Preval test case

# obj_arr.md

> Normalize > Pattern > Param > Base no def > Obj arr
>
> Testing simple pattern normalizations

## Input

`````js filename=intro
function i({x: [ y ]}) { return y }
`````

## Normalized

`````js filename=intro
let i = function (tmpParamPattern) {
  let $tdz$__pattern_after_default = tmpParamPattern;
  let objPatternNoDefault = $tdz$__pattern_after_default.x;
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

Normalized calls: Same

Final output calls: Same
