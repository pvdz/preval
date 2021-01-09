# Preval test case

# base.md

> normalize > pattern >  > param > obj > obj > rest > base
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
({ x: { ...y } } = { x: { x: 1, y: 2, z: 3 }, b: 11, c: 12 });
$(y);
`````

## Normalized

`````js filename=intro
var tmpObjPropValue;
var objAssignPatternRhs;
var objPatternNoDefault;
var y;
tmpObjPropValue = { x: 1, y: 2, z: 3 };
objAssignPatternRhs = { x: tmpObjPropValue, b: 11, c: 12 };
objPatternNoDefault = objAssignPatternRhs.x;
y = objPatternRest(objPatternNoDefault, []);
$(y);
`````

## Uniformed

`````js filename=intro
var x;
var x;
var x;
var x;
x = { x: 8, x: 8, x: 8 };
x = { x: x, x: 8, x: 8 };
x = x.x;
x = x(x, []);
x(x);
`````

## Output

`````js filename=intro
var tmpObjPropValue;
var objAssignPatternRhs;
var objPatternNoDefault;
var y;
tmpObjPropValue = { x: 1, y: 2, z: 3 };
objAssignPatternRhs = { x: tmpObjPropValue, b: 11, c: 12 };
objPatternNoDefault = objAssignPatternRhs.x;
y = objPatternRest(objPatternNoDefault, []);
$(y);
`````
