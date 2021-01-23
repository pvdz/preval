# Preval test case

# default_no_no_no__str.md

> normalize > pattern >  > param > obj > arr > ident > default_no_no_no__str
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
({ x: [y] } = 'abc');
$('bad');
`````

## Normalized

`````js filename=intro
var arrPatternSplat;
var objAssignPatternRhs;
var objPatternNoDefault;
objAssignPatternRhs = 'abc';
objPatternNoDefault = objAssignPatternRhs.x;
arrPatternSplat = [...objPatternNoDefault];
y = arrPatternSplat[0];
objAssignPatternRhs;
$('bad');
`````

## Output

`````js filename=intro
var arrPatternSplat;
var objAssignPatternRhs;
var objPatternNoDefault;
objAssignPatternRhs = 'abc';
objPatternNoDefault = objAssignPatternRhs.x;
arrPatternSplat = [...objPatternNoDefault];
y = arrPatternSplat[0];
$('bad');
`````

## Result

Should call `$` with:
 - 0: <crash[ <ref> is not iterable ]>

Normalized calls: Same

Final output calls: Same
