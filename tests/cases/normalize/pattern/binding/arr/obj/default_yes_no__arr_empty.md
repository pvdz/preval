# Preval test case

# default_yes_no__arr_empty.md

> normalize > pattern >  > param > arr > obj > default_yes_no__arr_empty
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
const [{} = $('pass')] = [];
$('ok');
`````

## Normalized

`````js filename=intro
var tmpTernaryTest;
var tmpTernaryConsequent;
const bindingPatternArrRoot = [];
const arrPatternSplat = [...bindingPatternArrRoot];
const arrPatternBeforeDefault = arrPatternSplat[0];
tmpTernaryTest = arrPatternBeforeDefault === undefined;
const arrPatternStep = tmpTernaryTest ? ((tmpTernaryConsequent = $('pass')), tmpTernaryConsequent) : arrPatternBeforeDefault;
$('ok');
`````

## Uniformed

`````js filename=intro
var x;
var x;
var x = [];
var x = [...x];
var x = x[8];
x = x * x;
var x = x ? ((x = x('str')), x) : x;
x('str');
`````

## Output

`````js filename=intro
var tmpTernaryTest;
var tmpTernaryConsequent;
const bindingPatternArrRoot = [];
const arrPatternSplat = [...bindingPatternArrRoot];
const arrPatternBeforeDefault = arrPatternSplat[0];
tmpTernaryTest = arrPatternBeforeDefault === undefined;
tmpTernaryTest ? ((tmpTernaryConsequent = $('pass')), tmpTernaryConsequent) : arrPatternBeforeDefault;
$('ok');
`````
