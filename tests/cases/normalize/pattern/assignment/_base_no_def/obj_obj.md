# Preval test case

# obj_obj.md

> normalize > pattern > param > _base > obj_obj
>
> Testing simple pattern normalizations

## Input

`````js filename=intro
({x: {y: {z}}} = 1);
`````

## Normalized

`````js filename=intro
var objAssignPatternRhs;
var objPatternNoDefault;
var objPatternNoDefault_1;
objAssignPatternRhs = 1;
objPatternNoDefault = objAssignPatternRhs.x;
objPatternNoDefault_1 = objPatternNoDefault.y;
z = objPatternNoDefault_1.z;
`````

## Output

`````js filename=intro
var objAssignPatternRhs;
var objPatternNoDefault;
var objPatternNoDefault_1;
objAssignPatternRhs = 1;
objPatternNoDefault = objAssignPatternRhs.x;
objPatternNoDefault_1 = objPatternNoDefault.y;
z = objPatternNoDefault_1.z;
`````
