# Preval test case

# default_yes_no__missing.md

> normalize > pattern >  > param > obj > arr > rest > default_yes_no__missing
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
({ x: [...y] = $(['pass']) } = { a: 11, b: 12 });
$(y);
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
var y;
objAssignPatternRhs = { a: 11, b: 12 };
objPatternBeforeDefault = objAssignPatternRhs.x;
tmpTernaryTest = objPatternBeforeDefault === undefined;
objPatternAfterDefault = tmpTernaryTest
  ? ((tmpArg = ['pass']), (tmpTernaryConsequent = $(tmpArg)), tmpTernaryConsequent)
  : objPatternBeforeDefault;
arrPatternSplat = [...objPatternAfterDefault];
y = arrPatternSplat.slice(0);
$(y);
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
var y;
objAssignPatternRhs = { a: 11, b: 12 };
objPatternBeforeDefault = objAssignPatternRhs.x;
tmpTernaryTest = objPatternBeforeDefault === undefined;
objPatternAfterDefault = tmpTernaryTest
  ? ((tmpArg = ['pass']), (tmpTernaryConsequent = $(tmpArg)), tmpTernaryConsequent)
  : objPatternBeforeDefault;
arrPatternSplat = [...objPatternAfterDefault];
y = arrPatternSplat.slice(0);
$(y);
`````