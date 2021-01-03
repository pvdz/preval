# Preval test case

# default_no_no_no__undefined.md

> normalize > pattern >  > param > obj > obj > ident > default_no_no_no__undefined
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
({ x: { y } } = undefined);
$('bad');
`````

## Normalized

`````js filename=intro
var objAssignPatternRhs;
var objPatternNoDefault;
var y;
objAssignPatternRhs = undefined;
objPatternNoDefault = objAssignPatternRhs.x;
y = objPatternNoDefault.y;
$('bad');
`````

## Output

`````js filename=intro
var objAssignPatternRhs;
var objPatternNoDefault;
var y;
objAssignPatternRhs = undefined;
objPatternNoDefault = objAssignPatternRhs.x;
y = objPatternNoDefault.y;
$('bad');
`````