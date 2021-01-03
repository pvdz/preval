# Preval test case

# default_no_no__obj_undefined.md

> normalize > pattern >  > param > obj > obj > rest > default_no_no__obj_undefined
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
({ x: { ...y } } = { x: undefined, b: 11, c: 12 });
$('bad');
`````

## Normalized

`````js filename=intro
var objAssignPatternRhs;
var objPatternNoDefault;
var y;
objAssignPatternRhs = { x: undefined, b: 11, c: 12 };
objPatternNoDefault = objAssignPatternRhs.x;
y = objPatternRest(objPatternNoDefault, []);
$('bad');
`````

## Output

`````js filename=intro
var objAssignPatternRhs;
var objPatternNoDefault;
var y;
objAssignPatternRhs = { x: undefined, b: 11, c: 12 };
objPatternNoDefault = objAssignPatternRhs.x;
y = objPatternRest(objPatternNoDefault, []);
$('bad');
`````