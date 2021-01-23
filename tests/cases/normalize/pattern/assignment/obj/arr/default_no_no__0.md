# Preval test case

# default_no_no__0.md

> normalize > pattern >  > param > obj > arr > default_no_no__0
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
({ x: [] } = 0);
$('bad');
`````

## Normalized

`````js filename=intro
var arrPatternSplat;
var objAssignPatternRhs;
var objPatternNoDefault;
objAssignPatternRhs = 0;
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
objAssignPatternRhs = 0;
objPatternNoDefault = objAssignPatternRhs.x;
arrPatternSplat = [...objPatternNoDefault];
$('bad');
`````

## Result

Should call `$` with:
 - 0: <crash[ <ref> is not iterable ]>

Normalized calls: Same

Final output calls: Same
