# Preval test case

# obj_arr.md

> Normalize > Pattern > Param > Base unique > Obj arr
>
> Testing simple pattern normalizations. Make sure pattern bindings are properly renamed to be globally unique.

## Input

`````js filename=intro
let y = 1;
function i({x: [ y ]}) {
  { let y = 2; }
  return y
}
`````

## Normalized

`````js filename=intro
let i = function (tmpParamPattern) {
  let objPatternNoDefault = tmpParamPattern.x;
  let arrPatternSplat = [...objPatternNoDefault];
  let y$1 = arrPatternSplat[0];
  let y$2 = 2;
  return y$1;
};
let y = 1;
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
