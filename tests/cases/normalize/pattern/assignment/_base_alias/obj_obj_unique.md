# Preval test case

# obj.md

> normalize > pattern > param > _base > obj
>
> Testing simple pattern normalizations. Make sure pattern bindings are properly renamed to be globally unique.

Confirm that both references of `x` get a unique name.

In particular, the pattern's "y" should be replaced with a different name.

## Input

`````js filename=intro
{ let a = 1; }
({x: {y: {z: a}}} = 1);
{ let a = 1; }
`````

## Normalized

`````js filename=intro
var objAssignPatternRhs;
var objPatternNoDefault;
var objPatternNoDefault_1;
var a_1;
{
  let a = 1;
}
objAssignPatternRhs = 1;
objPatternNoDefault = objAssignPatternRhs.x;
objPatternNoDefault_1 = objPatternNoDefault.y;
a_1 = objPatternNoDefault_1.z;
{
  let a_2 = 1;
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
var a_1;
objAssignPatternRhs = 1;
objPatternNoDefault = objAssignPatternRhs.x;
objPatternNoDefault_1 = objPatternNoDefault.y;
a_1 = objPatternNoDefault_1.z;
`````
