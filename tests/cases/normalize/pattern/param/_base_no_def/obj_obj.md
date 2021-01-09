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
  let objPatternNoDefault_1 = objPatternNoDefault.y;
  let z = objPatternNoDefault_1.z;
  return z;
}
`````

## Uniformed

`````js filename=intro
function x(x) {
  var x = x.x;
  var x = x.x;
  var x = x.x;
  return x;
}
`````

## Output

`````js filename=intro

`````
