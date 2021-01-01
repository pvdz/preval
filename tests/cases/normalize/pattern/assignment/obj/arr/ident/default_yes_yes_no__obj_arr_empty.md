# Preval test case

# default_yes_yes_no__obj_arr_empty.md

> normalize > pattern >  > param > obj > arr > ident > default_yes_yes_no__obj_arr_empty
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
({ x: [y = 'pass'] = $(['fail2']) } = { x: [], a: 11, b: 12 });
$(y);
`````

## Normalized

`````js filename=intro
var tmpTernaryTest;
var tmpTernaryConsequent;
var tmpArg;
var tmpTernaryTest_1;
var objAssignPatternRhs;
var objPatternBeforeDefault;
var objPatternAfterDefault;
var arrPatternSplat;
var arrPatternBeforeDefault;
var y;
objAssignPatternRhs = objAssignPatternRhs = { x: [], a: 11, b: 12 };
objPatternBeforeDefault = objAssignPatternRhs.x;
tmpTernaryTest = objPatternBeforeDefault === undefined;
objPatternAfterDefault = tmpTernaryTest
  ? ((tmpArg = ['fail2']), (tmpTernaryConsequent = $(tmpArg)), tmpTernaryConsequent)
  : objPatternBeforeDefault;
arrPatternSplat = [...objPatternAfterDefault];
arrPatternBeforeDefault = arrPatternSplat[0];
tmpTernaryTest_1 = arrPatternBeforeDefault === undefined;
y = tmpTernaryTest_1 ? 'pass' : arrPatternBeforeDefault;
$(y);
`````

## Output

`````js filename=intro
var tmpTernaryTest;
var tmpTernaryConsequent;
var tmpArg;
var tmpTernaryTest_1;
var objAssignPatternRhs;
var objPatternBeforeDefault;
var objPatternAfterDefault;
var arrPatternSplat;
var arrPatternBeforeDefault;
var y;
objAssignPatternRhs = objAssignPatternRhs = { x: [], a: 11, b: 12 };
objPatternBeforeDefault = objAssignPatternRhs.x;
tmpTernaryTest = objPatternBeforeDefault === undefined;
objPatternAfterDefault = tmpTernaryTest
  ? ((tmpArg = ['fail2']), (tmpTernaryConsequent = $(tmpArg)), tmpTernaryConsequent)
  : objPatternBeforeDefault;
arrPatternSplat = [...objPatternAfterDefault];
arrPatternBeforeDefault = arrPatternSplat[0];
tmpTernaryTest_1 = arrPatternBeforeDefault === undefined;
y = tmpTernaryTest_1 ? 'pass' : arrPatternBeforeDefault;
$(y);
`````
