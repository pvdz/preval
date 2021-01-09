# Preval test case

# default_no_no_no__obj_obj_empty.md

> normalize > pattern >  > param > obj > obj > ident > default_no_no_no__obj_obj_empty
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
({ x: { y } } = { x: {}, b: 11, c: 12 });
$(y);
`````

## Normalized

`````js filename=intro
var objAssignPatternRhs;
var objPatternNoDefault;
var y;
objAssignPatternRhs = { x: {}, b: 11, c: 12 };
objPatternNoDefault = objAssignPatternRhs.x;
y = objPatternNoDefault.y;
$(y);
`````

## Uniformed

`````js filename=intro
var x;
var x;
var x;
x = { x: {}, x: 8, x: 8 };
x = x.x;
x = x.x;
x(x);
`````

## Output

`````js filename=intro
var objAssignPatternRhs;
var objPatternNoDefault;
var y;
objAssignPatternRhs = { x: {}, b: 11, c: 12 };
objPatternNoDefault = objAssignPatternRhs.x;
y = objPatternNoDefault.y;
$(y);
`````
