# Preval test case

# default_yes_no_no__arr_123.md

> normalize > pattern >  > param > arr > arr > ident > default_yes_no_no__arr_123
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
([[x = $('fail')]] = [1, 2, 3, , 4, 5]);
$('bad');
`````

## Normalized

`````js filename=intro
var tmpTernaryTest;
var tmpTernaryConsequent;
var arrAssignPatternRhs;
var arrPatternSplat;
var arrPatternStep;
var arrPatternSplat_1;
var arrPatternBeforeDefault;
var x;
arrAssignPatternRhs = [1, 2, 3, , 4, 5];
arrPatternSplat = [...arrAssignPatternRhs];
arrPatternStep = arrPatternSplat[0];
arrPatternSplat_1 = [...arrPatternStep];
arrPatternBeforeDefault = arrPatternSplat_1[0];
tmpTernaryTest = arrPatternBeforeDefault === undefined;
x = tmpTernaryTest ? ((tmpTernaryConsequent = $('fail')), tmpTernaryConsequent) : arrPatternBeforeDefault;
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
x = [8, 8, 8, , 8, 8];
x = [...x];
x = x[8];
x = [...x];
x = x[8];
x = x * x;
x = x ? ((x = x('str')), x) : x;
x('str');
`````

## Output

`````js filename=intro
var tmpTernaryTest;
var tmpTernaryConsequent;
var arrAssignPatternRhs;
var arrPatternSplat;
var arrPatternStep;
var arrPatternSplat_1;
var arrPatternBeforeDefault;
var x;
arrAssignPatternRhs = [1, 2, 3, , 4, 5];
arrPatternSplat = [...arrAssignPatternRhs];
arrPatternStep = arrPatternSplat[0];
arrPatternSplat_1 = [...arrPatternStep];
arrPatternBeforeDefault = arrPatternSplat_1[0];
tmpTernaryTest = arrPatternBeforeDefault === undefined;
x = tmpTernaryTest ? ((tmpTernaryConsequent = $('fail')), tmpTernaryConsequent) : arrPatternBeforeDefault;
$('bad');
`````
