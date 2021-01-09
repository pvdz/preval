# Preval test case

# default_yes_yes_no__arr_obj_null.md

> normalize > pattern >  > param > arr > obj > ident > default_yes_yes_no__arr_obj_null
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
([{ x = $('fail') } = $({ x: 'fail2' })] = [{ x: null, y: 2, z: 3 }, 20, 30]);
$(x);
`````

## Normalized

`````js filename=intro
var tmpElement;
var tmpTernaryTest;
var tmpTernaryConsequent;
var tmpArg;
var tmpTernaryTest_1;
var tmpTernaryConsequent_1;
var arrAssignPatternRhs;
var arrPatternSplat;
var arrPatternBeforeDefault;
var arrPatternStep;
var objPatternBeforeDefault;
var x;
tmpElement = { x: null, y: 2, z: 3 };
arrAssignPatternRhs = [tmpElement, 20, 30];
arrPatternSplat = [...arrAssignPatternRhs];
arrPatternBeforeDefault = arrPatternSplat[0];
tmpTernaryTest = arrPatternBeforeDefault === undefined;
arrPatternStep = tmpTernaryTest
  ? ((tmpArg = { x: 'fail2' }), (tmpTernaryConsequent = $(tmpArg)), tmpTernaryConsequent)
  : arrPatternBeforeDefault;
objPatternBeforeDefault = arrPatternStep.x;
tmpTernaryTest_1 = objPatternBeforeDefault === undefined;
x = tmpTernaryTest_1 ? ((tmpTernaryConsequent_1 = $('fail')), tmpTernaryConsequent_1) : objPatternBeforeDefault;
$(x);
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
var x;
var x;
var x;
var x;
var x;
x = { x: /regex/, x: 8, x: 8 };
x = [x, 8, 8];
x = [...x];
x = x[8];
x = x * x;
x = x ? ((x = { x: 'str' }), (x = x(x)), x) : x;
x = x.x;
x = x * x;
x = x ? ((x = x('str')), x) : x;
x(x);
`````

## Output

`````js filename=intro
var tmpElement;
var tmpTernaryTest;
var tmpTernaryConsequent;
var tmpArg;
var tmpTernaryTest_1;
var tmpTernaryConsequent_1;
var arrAssignPatternRhs;
var arrPatternSplat;
var arrPatternBeforeDefault;
var arrPatternStep;
var objPatternBeforeDefault;
var x;
tmpElement = { x: null, y: 2, z: 3 };
arrAssignPatternRhs = [tmpElement, 20, 30];
arrPatternSplat = [...arrAssignPatternRhs];
arrPatternBeforeDefault = arrPatternSplat[0];
tmpTernaryTest = arrPatternBeforeDefault === undefined;
arrPatternStep = tmpTernaryTest
  ? ((tmpArg = { x: 'fail2' }), (tmpTernaryConsequent = $(tmpArg)), tmpTernaryConsequent)
  : arrPatternBeforeDefault;
objPatternBeforeDefault = arrPatternStep.x;
tmpTernaryTest_1 = objPatternBeforeDefault === undefined;
x = tmpTernaryTest_1 ? ((tmpTernaryConsequent_1 = $('fail')), tmpTernaryConsequent_1) : objPatternBeforeDefault;
$(x);
`````
