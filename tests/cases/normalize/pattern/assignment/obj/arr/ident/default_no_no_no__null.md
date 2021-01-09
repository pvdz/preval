# Preval test case

# default_no_no_no__null.md

> normalize > pattern >  > param > obj > arr > ident > default_no_no_no__null
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
({ x: [y] } = null);
$('bad');
`````

## Normalized

`````js filename=intro
var objAssignPatternRhs;
var objPatternNoDefault;
var arrPatternSplat;
var y;
objAssignPatternRhs = null;
objPatternNoDefault = objAssignPatternRhs.x;
arrPatternSplat = [...objPatternNoDefault];
y = arrPatternSplat[0];
$('bad');
`````

## Uniformed

`````js filename=intro
var x;
var x;
var x;
var x;
x = /regex/;
x = x.x;
x = [...x];
x = x[8];
x('str');
`````

## Output

`````js filename=intro
var objAssignPatternRhs;
var objPatternNoDefault;
var arrPatternSplat;
var y;
objAssignPatternRhs = null;
objPatternNoDefault = objAssignPatternRhs.x;
arrPatternSplat = [...objPatternNoDefault];
y = arrPatternSplat[0];
$('bad');
`````
