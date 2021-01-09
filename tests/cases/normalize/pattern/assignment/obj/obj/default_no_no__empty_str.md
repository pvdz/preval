# Preval test case

# default_no_no__empty_str.md

> normalize > pattern >  > param > obj > obj > default_no_no__empty_str
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
({ x: {} } = '');
$('bad');
`````

## Normalized

`````js filename=intro
var objAssignPatternRhs;
var objPatternNoDefault;
objAssignPatternRhs = '';
objPatternNoDefault = objAssignPatternRhs.x;
$('bad');
`````

## Uniformed

`````js filename=intro
var x;
var x;
x = 'str';
x = x.x;
x('str');
`````

## Output

`````js filename=intro
var objAssignPatternRhs;
var objPatternNoDefault;
objAssignPatternRhs = '';
objPatternNoDefault = objAssignPatternRhs.x;
$('bad');
`````
