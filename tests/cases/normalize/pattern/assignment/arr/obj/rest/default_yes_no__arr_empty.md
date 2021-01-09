# Preval test case

# default_yes_no__arr_empty.md

> normalize > pattern >  > param > arr > obj > rest > default_yes_no__arr_empty
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
([{ ...x } = $({ a: 'pass' })] = []);
$(x);
`````

## Normalized

`````js filename=intro
var tmpTernaryTest;
var tmpTernaryConsequent;
var tmpArg;
var arrAssignPatternRhs;
var arrPatternSplat;
var arrPatternBeforeDefault;
var arrPatternStep;
var x;
arrAssignPatternRhs = [];
arrPatternSplat = [...arrAssignPatternRhs];
arrPatternBeforeDefault = arrPatternSplat[0];
tmpTernaryTest = arrPatternBeforeDefault === undefined;
arrPatternStep = tmpTernaryTest
  ? ((tmpArg = { a: 'pass' }), (tmpTernaryConsequent = $(tmpArg)), tmpTernaryConsequent)
  : arrPatternBeforeDefault;
x = objPatternRest(arrPatternStep, []);
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
x = [];
x = [...x];
x = x[8];
x = x * x;
x = x ? ((x = { x: 'str' }), (x = x(x)), x) : x;
x = x(x, []);
x(x);
`````

## Output

`````js filename=intro
var tmpTernaryTest;
var tmpTernaryConsequent;
var tmpArg;
var arrAssignPatternRhs;
var arrPatternSplat;
var arrPatternBeforeDefault;
var arrPatternStep;
var x;
arrAssignPatternRhs = [];
arrPatternSplat = [...arrAssignPatternRhs];
arrPatternBeforeDefault = arrPatternSplat[0];
tmpTernaryTest = arrPatternBeforeDefault === undefined;
arrPatternStep = tmpTernaryTest
  ? ((tmpArg = { a: 'pass' }), (tmpTernaryConsequent = $(tmpArg)), tmpTernaryConsequent)
  : arrPatternBeforeDefault;
x = objPatternRest(arrPatternStep, []);
$(x);
`````
