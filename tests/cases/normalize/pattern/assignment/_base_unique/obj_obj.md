# Preval test case

# obj_obj.md

> normalize > pattern > param > _base > obj_obj
>
> Testing simple pattern normalizations. Make sure pattern bindings are properly renamed to be globally unique.

## Input

`````js filename=intro
{ let z = 1; }
({x: {y: {z}}} = 1);
{ let z = 1; }
`````

## Normalized

`````js filename=intro
var objAssignPatternRhs;
var objPatternNoDefault;
var objPatternNoDefault_1;
var z_1;
{
  let z = 1;
}
objAssignPatternRhs = 1;
objPatternNoDefault = objAssignPatternRhs.x;
objPatternNoDefault_1 = objPatternNoDefault.y;
z_1 = objPatternNoDefault_1.z;
{
  let z_2 = 1;
}
`````

## Uniformed

`````js filename=intro
var x;
var x;
var x;
var x;
{
  var x = 8;
}
x = 8;
x = x.x;
x = x.x;
x = x.x;
{
  var x = 8;
}
`````

## Output

`````js filename=intro
var objAssignPatternRhs;
var objPatternNoDefault;
var objPatternNoDefault_1;
var z_1;
objAssignPatternRhs = 1;
objPatternNoDefault = objAssignPatternRhs.x;
objPatternNoDefault_1 = objPatternNoDefault.y;
z_1 = objPatternNoDefault_1.z;
`````
