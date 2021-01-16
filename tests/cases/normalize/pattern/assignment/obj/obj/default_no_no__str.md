# Preval test case

# default_no_no__str.md

> normalize > pattern >  > param > obj > obj > default_no_no__str
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
({ x: {} } = 'abc');
$('bad');
`````

## Normalized

`````js filename=intro
var objAssignPatternRhs;
var objPatternNoDefault;
objAssignPatternRhs = 'abc';
objPatternNoDefault = objAssignPatternRhs.x;
$('bad');
`````

## Output

`````js filename=intro
var objAssignPatternRhs;
var objPatternNoDefault;
objAssignPatternRhs = 'abc';
objPatternNoDefault = objAssignPatternRhs.x;
$('bad');
`````
