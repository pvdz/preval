# Preval test case

# default_yes_yes_no__123.md

> normalize > pattern >  > param > arr > obj > ident > default_yes_yes_no__123
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
([{ x = $('pass') } = $({ x: 'fail2' })] = 1);
$('bad');
`````

## Normalized

`````js filename=intro
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
arrAssignPatternRhs = 1;
arrPatternSplat = [...arrAssignPatternRhs];
arrPatternBeforeDefault = arrPatternSplat[0];
tmpTernaryTest = arrPatternBeforeDefault === undefined;
arrPatternStep = tmpTernaryTest
  ? ((tmpArg = { x: 'fail2' }), (tmpTernaryConsequent = $(tmpArg)), tmpTernaryConsequent)
  : arrPatternBeforeDefault;
objPatternBeforeDefault = arrPatternStep.x;
tmpTernaryTest_1 = objPatternBeforeDefault === undefined;
x = tmpTernaryTest_1 ? ((tmpTernaryConsequent_1 = $('pass')), tmpTernaryConsequent_1) : objPatternBeforeDefault;
$('bad');
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
x = 8;
x = [...x];
x = x[8];
x = x * x;
x = x ? ((x = { x: 'str' }), (x = x(x)), x) : x;
x = x.x;
x = x * x;
x = x ? ((x = x('str')), x) : x;
x('str');
`````

## Output

`````js filename=intro
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
arrAssignPatternRhs = 1;
arrPatternSplat = [...arrAssignPatternRhs];
arrPatternBeforeDefault = arrPatternSplat[0];
tmpTernaryTest = arrPatternBeforeDefault === undefined;
arrPatternStep = tmpTernaryTest
  ? ((tmpArg = { x: 'fail2' }), (tmpTernaryConsequent = $(tmpArg)), tmpTernaryConsequent)
  : arrPatternBeforeDefault;
objPatternBeforeDefault = arrPatternStep.x;
tmpTernaryTest_1 = objPatternBeforeDefault === undefined;
x = tmpTernaryTest_1 ? ((tmpTernaryConsequent_1 = $('pass')), tmpTernaryConsequent_1) : objPatternBeforeDefault;
$('bad');
`````
