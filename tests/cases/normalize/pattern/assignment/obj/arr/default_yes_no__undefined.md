# Preval test case

# default_yes_no__undefined.md

> normalize > pattern >  > param > obj > arr > default_yes_no__undefined
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
({ x: [] = $(['fail']) } = undefined);
$('bad');
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
objAssignPatternRhs = undefined;
objPatternBeforeDefault = objAssignPatternRhs.x;
tmpTernaryTest = objPatternBeforeDefault === undefined;
objPatternAfterDefault = tmpTernaryTest
  ? ((tmpArg = ['fail']), (tmpTernaryConsequent = $(tmpArg)), tmpTernaryConsequent)
  : objPatternBeforeDefault;
arrPatternSplat = [...objPatternAfterDefault];
$('bad');
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
objAssignPatternRhs = undefined;
objPatternBeforeDefault = objAssignPatternRhs.x;
tmpTernaryTest = objPatternBeforeDefault === undefined;
objPatternAfterDefault = tmpTernaryTest
  ? ((tmpArg = ['fail']), (tmpTernaryConsequent = $(tmpArg)), tmpTernaryConsequent)
  : objPatternBeforeDefault;
arrPatternSplat = [...objPatternAfterDefault];
$('bad');
`````