# Preval test case

# obj_obj.md

> normalize > pattern > param > _base > obj_obj
>
> Testing simple pattern normalizations

## Input

`````js filename=intro
function i({x: {y: {z: a}}}) { return a }
`````

## Normalized

`````js filename=intro
function i(tmpParamPattern) {
  let arrPatternStep = tmpParamPattern.x;
  let arrPatternStep_1 = arrPatternStep.y;
  let a = arrPatternStep_1.z;
  return a;
}
`````

## Output

`````js filename=intro

`````
