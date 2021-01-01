# Preval test case

# default_yes_no_no__obj_arr_elided.md

> normalize > pattern >  > param > obj > arr > ident > default_yes_no_no__obj_arr_elided
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
({ x: [y = 'pass'] } = { x: [, , , 1], a: 11, b: 12 });
$(y);
`````

## Normalized

`````js filename=intro
var tmpTernaryTest;
var objAssignPatternRhs;
var objPatternNoDefault;
var arrPatternSplat;
var arrPatternBeforeDefault;
var y;
objAssignPatternRhs = objAssignPatternRhs = { x: [, , , 1], a: 11, b: 12 };
objPatternNoDefault = objAssignPatternRhs.x;
arrPatternSplat = [...objPatternNoDefault];
arrPatternBeforeDefault = arrPatternSplat[0];
tmpTernaryTest = arrPatternBeforeDefault === undefined;
y = tmpTernaryTest ? 'pass' : arrPatternBeforeDefault;
$(y);
`````

## Output

`````js filename=intro
var tmpTernaryTest;
var objAssignPatternRhs;
var objPatternNoDefault;
var arrPatternSplat;
var arrPatternBeforeDefault;
var y;
objAssignPatternRhs = objAssignPatternRhs = { x: [, , , 1], a: 11, b: 12 };
objPatternNoDefault = objAssignPatternRhs.x;
arrPatternSplat = [...objPatternNoDefault];
arrPatternBeforeDefault = arrPatternSplat[0];
tmpTernaryTest = arrPatternBeforeDefault === undefined;
y = tmpTernaryTest ? 'pass' : arrPatternBeforeDefault;
$(y);
`````
