# Preval test case

# obj_obj.md

> normalize > pattern > param > _base > obj_obj
>
> Testing simple pattern normalizations

## Input

`````js filename=intro
function i({x: {y: {z}}}) { return z }
`````

## Normalized

`````js filename=intro
function i(tmpParamPattern) {
  let objPatternNoDefault = tmpParamPattern.x;
  let objPatternNoDefault$1 = objPatternNoDefault.y;
  let z = objPatternNoDefault$1.z;
  return z;
}
`````

## Output

`````js filename=intro

`````

## Result

Should call `$` with:
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
