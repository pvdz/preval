# Preval test case

# default_yes_yes_no__arr_123.md

> normalize > pattern >  > param > arr > obj > ident > default_yes_yes_no__arr_123
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
const [{ x = $('pass') } = $({ x: 'fail2' })] = [1, 2, 3, 20, 30];
$(x);
`````

## Normalized

`````js filename=intro
var tmpTernaryTest;
var tmpTernaryConsequent;
var tmpArg;
var tmpTernaryTest_1;
var tmpTernaryConsequent_1;
const bindingPatternArrRoot = [1, 2, 3, 20, 30];
const arrPatternSplat = [...bindingPatternArrRoot];
const arrPatternBeforeDefault = arrPatternSplat[0];
tmpTernaryTest = arrPatternBeforeDefault === undefined;
const arrPatternStep = tmpTernaryTest
  ? ((tmpArg = { x: 'fail2' }), (tmpTernaryConsequent = $(tmpArg)), tmpTernaryConsequent)
  : arrPatternBeforeDefault;
const objPatternBeforeDefault = arrPatternStep.x;
tmpTernaryTest_1 = objPatternBeforeDefault === undefined;
const x = tmpTernaryTest_1 ? ((tmpTernaryConsequent_1 = $('pass')), tmpTernaryConsequent_1) : objPatternBeforeDefault;
$(x);
`````

## Uniformed

`````js filename=intro
var x;
var x;
var x;
var x;
var x;
var x = [8, 8, 8, 8, 8];
var x = [...x];
var x = x[8];
x = x * x;
var x = x ? ((x = { x: 'str' }), (x = x(x)), x) : x;
var x = x.x;
x = x * x;
var x = x ? ((x = x('str')), x) : x;
x(x);
`````

## Output

`````js filename=intro
var tmpTernaryTest;
var tmpTernaryConsequent;
var tmpArg;
var tmpTernaryTest_1;
var tmpTernaryConsequent_1;
const bindingPatternArrRoot = [1, 2, 3, 20, 30];
const arrPatternSplat = [...bindingPatternArrRoot];
const arrPatternBeforeDefault = arrPatternSplat[0];
tmpTernaryTest = arrPatternBeforeDefault === undefined;
const arrPatternStep = tmpTernaryTest
  ? ((tmpArg = { x: 'fail2' }), (tmpTernaryConsequent = $(tmpArg)), tmpTernaryConsequent)
  : arrPatternBeforeDefault;
const objPatternBeforeDefault = arrPatternStep.x;
tmpTernaryTest_1 = objPatternBeforeDefault === undefined;
const x = tmpTernaryTest_1 ? ((tmpTernaryConsequent_1 = $('pass')), tmpTernaryConsequent_1) : objPatternBeforeDefault;
$(x);
`````
