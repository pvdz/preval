# Preval test case

# obj_obj.md

> normalize > pattern > param > _base > obj_obj
>
> Testing simple pattern normalizations

## Input

`````js filename=intro
function i({x: {y: {z = a }}}) { return z }
`````

## Normalized

`````js filename=intro
function i(tmpParamPattern) {
  var tmpTernaryTest;
  let objPatternNoDefault = tmpParamPattern.x;
  let objPatternNoDefault_1 = objPatternNoDefault.y;
  let objPatternBeforeDefault = objPatternNoDefault_1.z;
  tmpTernaryTest = objPatternBeforeDefault === undefined;
  let z = tmpTernaryTest ? a : objPatternBeforeDefault;
  return z;
}
`````

## Output

`````js filename=intro

`````
