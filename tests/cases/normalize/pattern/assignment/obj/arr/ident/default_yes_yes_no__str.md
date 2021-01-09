# Preval test case

# default_yes_yes_no__str.md

> normalize > pattern >  > param > obj > arr > ident > default_yes_yes_no__str
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
({ x: [y = 'fail'] = $(['pass2']) } = 'abc');
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
objAssignPatternRhs = 'abc';
objPatternBeforeDefault = objAssignPatternRhs.x;
tmpTernaryTest = objPatternBeforeDefault === undefined;
objPatternAfterDefault = tmpTernaryTest
  ? ((tmpArg = ['pass2']), (tmpTernaryConsequent = $(tmpArg)), tmpTernaryConsequent)
  : objPatternBeforeDefault;
arrPatternSplat = [...objPatternAfterDefault];
arrPatternBeforeDefault = arrPatternSplat[0];
tmpTernaryTest_1 = arrPatternBeforeDefault === undefined;
y = tmpTernaryTest_1 ? 'fail' : arrPatternBeforeDefault;
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
var x;
var x;
var x;
x = 'str';
x = x.x;
x = x * x;
x = x ? ((x = ['str']), (x = x(x)), x) : x;
x = [...x];
x = x[8];
x = x * x;
x = x ? 'str' : x;
x(x);
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
objAssignPatternRhs = 'abc';
objPatternBeforeDefault = objAssignPatternRhs.x;
tmpTernaryTest = objPatternBeforeDefault === undefined;
objPatternAfterDefault = tmpTernaryTest
  ? ((tmpArg = ['pass2']), (tmpTernaryConsequent = $(tmpArg)), tmpTernaryConsequent)
  : objPatternBeforeDefault;
arrPatternSplat = [...objPatternAfterDefault];
arrPatternBeforeDefault = arrPatternSplat[0];
tmpTernaryTest_1 = arrPatternBeforeDefault === undefined;
y = tmpTernaryTest_1 ? 'fail' : arrPatternBeforeDefault;
$(y);
`````
