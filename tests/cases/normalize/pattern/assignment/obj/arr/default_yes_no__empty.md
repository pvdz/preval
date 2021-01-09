# Preval test case

# default_yes_no__empty.md

> normalize > pattern >  > param > obj > arr > default_yes_no__empty
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
({ x: [] = $(['fail']) } = 1);
$('ok');
`````

## Normalized

`````js filename=intro
var tmpTernaryTest;
var tmpTernaryConsequent;
var tmpArg;
var objAssignPatternRhs;
var objPatternBeforeDefault;
var objPatternAfterDefault;
var arrPatternSplat;
objAssignPatternRhs = 1;
objPatternBeforeDefault = objAssignPatternRhs.x;
tmpTernaryTest = objPatternBeforeDefault === undefined;
objPatternAfterDefault = tmpTernaryTest
  ? ((tmpArg = ['fail']), (tmpTernaryConsequent = $(tmpArg)), tmpTernaryConsequent)
  : objPatternBeforeDefault;
arrPatternSplat = [...objPatternAfterDefault];
$('ok');
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
x = 8;
x = x.x;
x = x * x;
x = x ? ((x = ['str']), (x = x(x)), x) : x;
x = [...x];
x('str');
`````

## Output

`````js filename=intro
var tmpTernaryTest;
var tmpTernaryConsequent;
var tmpArg;
var objAssignPatternRhs;
var objPatternBeforeDefault;
var objPatternAfterDefault;
var arrPatternSplat;
objAssignPatternRhs = 1;
objPatternBeforeDefault = objAssignPatternRhs.x;
tmpTernaryTest = objPatternBeforeDefault === undefined;
objPatternAfterDefault = tmpTernaryTest
  ? ((tmpArg = ['fail']), (tmpTernaryConsequent = $(tmpArg)), tmpTernaryConsequent)
  : objPatternBeforeDefault;
arrPatternSplat = [...objPatternAfterDefault];
$('ok');
`````
