# Preval test case

# default_no_no__obj_str.md

> normalize > pattern >  > param > obj > obj > default_no_no__obj_str
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
({ x: {} } = { x: 'abc', b: 11, c: 12 });
$('ok');
`````

## Normalized

`````js filename=intro
var objAssignPatternRhs;
var objPatternNoDefault;
objAssignPatternRhs = { x: 'abc', b: 11, c: 12 };
objPatternNoDefault = objAssignPatternRhs.x;
$('ok');
`````

## Output

`````js filename=intro
var objAssignPatternRhs;
var objPatternNoDefault;
objAssignPatternRhs = { x: 'abc', b: 11, c: 12 };
objPatternNoDefault = objAssignPatternRhs.x;
$('ok');
`````