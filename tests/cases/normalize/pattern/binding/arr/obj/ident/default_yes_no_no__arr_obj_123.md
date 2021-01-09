# Preval test case

# default_yes_no_no__arr_obj_123.md

> normalize > pattern >  > param > arr > obj > ident > default_yes_no_no__arr_obj_123
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
const [{ x = $('fail') }] = [{ x: 1, y: 2, z: 3 }, 20, 30];
$(x);
`````

## Normalized

`````js filename=intro
var tmpElement;
var tmpTernaryTest;
var tmpTernaryConsequent;
tmpElement = { x: 1, y: 2, z: 3 };
const bindingPatternArrRoot = [tmpElement, 20, 30];
const arrPatternSplat = [...bindingPatternArrRoot];
const arrPatternStep = arrPatternSplat[0];
const objPatternBeforeDefault = arrPatternStep.x;
tmpTernaryTest = objPatternBeforeDefault === undefined;
const x = tmpTernaryTest ? ((tmpTernaryConsequent = $('fail')), tmpTernaryConsequent) : objPatternBeforeDefault;
$(x);
`````

## Uniformed

`````js filename=intro
var x;
var x;
var x;
x = { x: 8, x: 8, x: 8 };
var x = [x, 8, 8];
var x = [...x];
var x = x[8];
var x = x.x;
x = x * x;
var x = x ? ((x = x('str')), x) : x;
x(x);
`````

## Output

`````js filename=intro
var tmpElement;
var tmpTernaryTest;
var tmpTernaryConsequent;
tmpElement = { x: 1, y: 2, z: 3 };
const bindingPatternArrRoot = [tmpElement, 20, 30];
const arrPatternSplat = [...bindingPatternArrRoot];
const arrPatternStep = arrPatternSplat[0];
const objPatternBeforeDefault = arrPatternStep.x;
tmpTernaryTest = objPatternBeforeDefault === undefined;
const x = tmpTernaryTest ? ((tmpTernaryConsequent = $('fail')), tmpTernaryConsequent) : objPatternBeforeDefault;
$(x);
`````
