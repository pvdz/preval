# Preval test case

# default_yes_no_no__null.md

> normalize > pattern >  > param > arr > obj > ident > default_yes_no_no__null
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
([{ x = $('pass') }] = null);
$('bad');
`````

## Normalized

`````js filename=intro
var tmpTernaryTest;
var tmpTernaryConsequent;
var arrAssignPatternRhs;
var arrPatternSplat;
var arrPatternStep;
var objPatternBeforeDefault;
var x;
arrAssignPatternRhs = null;
arrPatternSplat = [...arrAssignPatternRhs];
arrPatternStep = arrPatternSplat[0];
objPatternBeforeDefault = arrPatternStep.x;
tmpTernaryTest = objPatternBeforeDefault === undefined;
x = tmpTernaryTest ? ((tmpTernaryConsequent = $('pass')), tmpTernaryConsequent) : objPatternBeforeDefault;
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
x = /regex/;
x = [...x];
x = x[8];
x = x.x;
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
var objPatternBeforeDefault;
var x;
arrAssignPatternRhs = null;
arrPatternSplat = [...arrAssignPatternRhs];
arrPatternStep = arrPatternSplat[0];
objPatternBeforeDefault = arrPatternStep.x;
tmpTernaryTest = objPatternBeforeDefault === undefined;
x = tmpTernaryTest ? ((tmpTernaryConsequent = $('pass')), tmpTernaryConsequent) : objPatternBeforeDefault;
$('bad');
`````
