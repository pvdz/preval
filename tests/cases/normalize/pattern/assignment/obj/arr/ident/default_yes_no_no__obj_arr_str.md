# Preval test case

# default_yes_no_no__obj_arr_str.md

> normalize > pattern >  > param > obj > arr > ident > default_yes_no_no__obj_arr_str
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
({ x: [y = 'fail'] } = { x: ['abc'], a: 11, b: 12 });
$(y);
`````

## Normalized

`````js filename=intro
var tmpObjPropValue;
var tmpTernaryTest;
var objAssignPatternRhs;
var objPatternNoDefault;
var arrPatternSplat;
var arrPatternBeforeDefault;
var y;
tmpObjPropValue = ['abc'];
objAssignPatternRhs = { x: tmpObjPropValue, a: 11, b: 12 };
objPatternNoDefault = objAssignPatternRhs.x;
arrPatternSplat = [...objPatternNoDefault];
arrPatternBeforeDefault = arrPatternSplat[0];
tmpTernaryTest = arrPatternBeforeDefault === undefined;
y = tmpTernaryTest ? 'fail' : arrPatternBeforeDefault;
$(y);
`````

## Uniformed

`````js filename=intro
var x;
var x;
var x;
var x;
var x;
var x;
var x;
x = ['str'];
x = { x: x, x: 8, x: 8 };
x = x.x;
x = [...x];
x = x[8];
x = x * x;
x = x ? 'str' : x;
x(x);
`````

## Output

`````js filename=intro
var tmpObjPropValue;
var tmpTernaryTest;
var objAssignPatternRhs;
var objPatternNoDefault;
var arrPatternSplat;
var arrPatternBeforeDefault;
var y;
tmpObjPropValue = ['abc'];
objAssignPatternRhs = { x: tmpObjPropValue, a: 11, b: 12 };
objPatternNoDefault = objAssignPatternRhs.x;
arrPatternSplat = [...objPatternNoDefault];
arrPatternBeforeDefault = arrPatternSplat[0];
tmpTernaryTest = arrPatternBeforeDefault === undefined;
y = tmpTernaryTest ? 'fail' : arrPatternBeforeDefault;
$(y);
`````
