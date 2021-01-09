# Preval test case

# default_yes_no__arr_elided.md

> normalize > pattern >  > param > arr > arr > rest > default_yes_no__arr_elided
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
const [[...x] = $('pass')] = [, , , 4, 5];
$(x);
`````

## Normalized

`````js filename=intro
var tmpTernaryTest;
var tmpTernaryConsequent;
const bindingPatternArrRoot = [, , , 4, 5];
const arrPatternSplat = [...bindingPatternArrRoot];
const arrPatternBeforeDefault = arrPatternSplat[0];
tmpTernaryTest = arrPatternBeforeDefault === undefined;
const arrPatternStep = tmpTernaryTest ? ((tmpTernaryConsequent = $('pass')), tmpTernaryConsequent) : arrPatternBeforeDefault;
const arrPatternSplat_1 = [...arrPatternStep];
const x = arrPatternSplat_1.slice(0);
$(x);
`````

## Uniformed

`````js filename=intro
var x;
var x;
var x = [, , , 8, 8];
var x = [...x];
var x = x[8];
x = x * x;
var x = x ? ((x = x('str')), x) : x;
var x = [...x];
var x = x.x(8);
x(x);
`````

## Output

`````js filename=intro
var tmpTernaryTest;
var tmpTernaryConsequent;
const bindingPatternArrRoot = [, , , 4, 5];
const arrPatternSplat = [...bindingPatternArrRoot];
const arrPatternBeforeDefault = arrPatternSplat[0];
tmpTernaryTest = arrPatternBeforeDefault === undefined;
const arrPatternStep = tmpTernaryTest ? ((tmpTernaryConsequent = $('pass')), tmpTernaryConsequent) : arrPatternBeforeDefault;
const arrPatternSplat_1 = [...arrPatternStep];
const x = arrPatternSplat_1.slice(0);
$(x);
`````
