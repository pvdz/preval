# Preval test case

# default_no_no_no__null.md

> normalize > pattern >  > param > obj > obj > ident > default_no_no_no__null
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
({ x: { y } } = null);
$('bad');
`````

## Normalized

`````js filename=intro
var objAssignPatternRhs;
var objPatternNoDefault;
objAssignPatternRhs = null;
objPatternNoDefault = objAssignPatternRhs.x;
y = objPatternNoDefault.y;
objAssignPatternRhs;
$('bad');
`````

## Output

`````js filename=intro
var objAssignPatternRhs;
var objPatternNoDefault;
objAssignPatternRhs = null;
objPatternNoDefault = objAssignPatternRhs.x;
y = objPatternNoDefault.y;
$('bad');
`````

## Result

Should call `$` with:
 - 0: <crash[ Cannot read property 'x' of null ]>

Normalized calls: Same

Final output calls: Same
