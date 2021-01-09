# Preval test case

# default_no_no__obj_missing.md

> normalize > pattern >  > param > obj > obj > default_no_no__obj_missing
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
({ x: {} } = { b: 11, c: 12 });
$('bad');
`````

## Normalized

`````js filename=intro
var objAssignPatternRhs;
var objPatternNoDefault;
objAssignPatternRhs = { b: 11, c: 12 };
objPatternNoDefault = objAssignPatternRhs.x;
$('bad');
`````

## Uniformed

`````js filename=intro
var x;
var x;
x = { x: 8, x: 8 };
x = x.x;
x('str');
`````

## Output

`````js filename=intro
var objAssignPatternRhs;
var objPatternNoDefault;
objAssignPatternRhs = { b: 11, c: 12 };
objPatternNoDefault = objAssignPatternRhs.x;
$('bad');
`````
