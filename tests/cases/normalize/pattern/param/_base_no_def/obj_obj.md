# Preval test case

# obj_obj.md

> Normalize > Pattern > Param > Base no def > Obj obj
>
> Testing simple pattern normalizations

## Input

`````js filename=intro
function i({x: {y: {z}}}) { return z }
`````

## Normalized

`````js filename=intro
let i = function (tmpParamPattern) {
  let objPatternNoDefault = tmpParamPattern.x;
  let objPatternNoDefault$1 = objPatternNoDefault.y;
  let z = objPatternNoDefault$1.z;
  return z;
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
