# Preval test case

# default_no_no__undefined.md

> normalize > pattern >  > param > obj > arr > default_no_no__undefined
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
({ x: [] } = undefined);
$('bad');
`````

## Normalized

`````js filename=intro
var arrPatternSplat;
var objAssignPatternRhs;
var objPatternNoDefault;
objAssignPatternRhs = undefined;
objPatternNoDefault = objAssignPatternRhs.x;
arrPatternSplat = [...objPatternNoDefault];
objAssignPatternRhs;
$('bad');
`````

## Output

`````js filename=intro
var arrPatternSplat;
var objAssignPatternRhs;
var objPatternNoDefault;
objAssignPatternRhs = undefined;
objPatternNoDefault = objAssignPatternRhs.x;
arrPatternSplat = [...objPatternNoDefault];
$('bad');
`````

## Result

Should call `$` with:
 - 0: <crash[ Cannot read property 'x' of undefined ]>

Normalized calls: Same

Final output calls: Same
