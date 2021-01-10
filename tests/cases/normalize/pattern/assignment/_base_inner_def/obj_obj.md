# Preval test case

# obj_obj.md

> normalize > pattern > param > _base > obj_obj
>
> Testing simple pattern normalizations

## Input

`````js filename=intro
({x: {y: {z = a }}} = 1);
`````

## Normalized

`````js filename=intro
var objAssignPatternRhs;
var objPatternNoDefault;
var objPatternNoDefault_1;
var objPatternBeforeDefault;
var z;
objAssignPatternRhs = 1;
objPatternNoDefault = objAssignPatternRhs.x;
objPatternNoDefault_1 = objPatternNoDefault.y;
objPatternBeforeDefault = objPatternNoDefault_1.z;
{
  let ifTestTmp = objPatternBeforeDefault === undefined;
  if (ifTestTmp) {
    z = a;
  } else {
    z = objPatternBeforeDefault;
  }
}
`````

## Uniformed

`````js filename=intro
var x;
var x;
var x;
var x;
var x;
x = 8;
x = x.x;
x = x.x;
x = x.x;
{
  var x = x * x;
  if (x) {
    x = x;
  } else {
    x = x;
  }
}
`````

## Output

`````js filename=intro
var objAssignPatternRhs;
var objPatternNoDefault;
var objPatternNoDefault_1;
var objPatternBeforeDefault;
var z;
objAssignPatternRhs = 1;
objPatternNoDefault = objAssignPatternRhs.x;
objPatternNoDefault_1 = objPatternNoDefault.y;
objPatternBeforeDefault = objPatternNoDefault_1.z;
let ifTestTmp = objPatternBeforeDefault === undefined;
if (ifTestTmp) {
  z = a;
} else {
  z = objPatternBeforeDefault;
}
`````
