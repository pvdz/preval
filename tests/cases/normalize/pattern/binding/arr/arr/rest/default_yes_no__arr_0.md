# Preval test case

# default_yes_no__arr_0.md

> normalize > pattern >  > param > arr > arr > rest > default_yes_no__arr_0
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
const [[...x] = $('fail')] = [0, 4, 5];
$('bad');
`````

## Normalized

`````js filename=intro
var tmpTernaryTest;
var tmpTernaryConsequent;
const bindingPatternArrRoot = [0, 4, 5];
const arrPatternSplat = [...bindingPatternArrRoot];
const arrPatternBeforeDefault = arrPatternSplat[0];
tmpTernaryTest = arrPatternBeforeDefault === undefined;
const arrPatternStep = tmpTernaryTest ? ((tmpTernaryConsequent = $('fail')), tmpTernaryConsequent) : arrPatternBeforeDefault;
const arrPatternSplat_1 = [...arrPatternStep];
const x = arrPatternSplat_1.slice(0);
$('bad');
`````

## Uniformed

`````js filename=intro
var x;
var x;
var x = [8, 8, 8];
var x = [...x];
var x = x[8];
x = x * x;
var x = x ? ((x = x('str')), x) : x;
var x = [...x];
var x = x.x(8);
x('str');
`````

## Output

`````js filename=intro
var tmpTernaryTest;
var tmpTernaryConsequent;
const bindingPatternArrRoot = [0, 4, 5];
const arrPatternSplat = [...bindingPatternArrRoot];
const arrPatternBeforeDefault = arrPatternSplat[0];
tmpTernaryTest = arrPatternBeforeDefault === undefined;
const arrPatternStep = tmpTernaryTest ? ((tmpTernaryConsequent = $('fail')), tmpTernaryConsequent) : arrPatternBeforeDefault;
const arrPatternSplat_1 = [...arrPatternStep];
arrPatternSplat_1.slice(0);
$('bad');
`````
