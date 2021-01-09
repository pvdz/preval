# Preval test case

# default_yes_no_no__0.md

> normalize > pattern >  > param > arr > obj > ident > default_yes_no_no__0
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
const [{ x = $('pass') }] = 0;
$('bad');
`````

## Normalized

`````js filename=intro
var tmpTernaryTest;
var tmpTernaryConsequent;
const bindingPatternArrRoot = 0;
const arrPatternSplat = [...bindingPatternArrRoot];
const arrPatternStep = arrPatternSplat[0];
const objPatternBeforeDefault = arrPatternStep.x;
tmpTernaryTest = objPatternBeforeDefault === undefined;
const x = tmpTernaryTest ? ((tmpTernaryConsequent = $('pass')), tmpTernaryConsequent) : objPatternBeforeDefault;
$('bad');
`````

## Uniformed

`````js filename=intro
var x;
var x;
var x = 8;
var x = [...x];
var x = x[8];
var x = x.x;
x = x * x;
var x = x ? ((x = x('str')), x) : x;
x('str');
`````

## Output

`````js filename=intro
var tmpTernaryTest;
var tmpTernaryConsequent;
const arrPatternSplat = [...0];
const arrPatternStep = arrPatternSplat[0];
const objPatternBeforeDefault = arrPatternStep.x;
tmpTernaryTest = objPatternBeforeDefault === undefined;
tmpTernaryTest ? ((tmpTernaryConsequent = $('pass')), tmpTernaryConsequent) : objPatternBeforeDefault;
$('bad');
`````
