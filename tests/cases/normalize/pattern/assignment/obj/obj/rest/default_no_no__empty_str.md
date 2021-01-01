# Preval test case

# default_no_no__empty_str.md

> normalize > pattern >  > param > obj > obj > rest > default_no_no__empty_str
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
({ x: { ...y } } = '');
$('bad');
`````

## Normalized

`````js filename=intro
var objAssignPatternRhs;
var objPatternNoDefault;
var y;
objAssignPatternRhs = objAssignPatternRhs = '';
objPatternNoDefault = objAssignPatternRhs.x;
y = objPatternRest(objPatternNoDefault, []);
$('bad');
`````

## Output

`````js filename=intro
var objAssignPatternRhs;
var objPatternNoDefault;
var y;
objAssignPatternRhs = objAssignPatternRhs = '';
objPatternNoDefault = objAssignPatternRhs.x;
y = objPatternRest(objPatternNoDefault, []);
$('bad');
`````
