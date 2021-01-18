# Preval test case

# default_no_no__obj_empty.md

> normalize > pattern >  > param > obj > obj > default_no_no__obj_empty
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
({ x: {} } = {});
$('bad');
`````

## Normalized

`````js filename=intro
var objAssignPatternRhs;
var objPatternNoDefault;
objAssignPatternRhs = {};
objPatternNoDefault = objAssignPatternRhs.x;
$('bad');
`````

## Output

`````js filename=intro
var objAssignPatternRhs;
var objPatternNoDefault;
objAssignPatternRhs = {};
objPatternNoDefault = objAssignPatternRhs.x;
$('bad');
`````

## Result

Should call `$` with:
["<crash[ Cannot destructure property 'x' of '{}' as it is undefined. ]>"];

Normalized calls: BAD?!
[['bad'], null];

Final output calls: BAD!!
[['bad'], null];

