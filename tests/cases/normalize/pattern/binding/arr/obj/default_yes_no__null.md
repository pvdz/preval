# Preval test case

# default_yes_no__null.md

> normalize > pattern >  > param > arr > obj > default_yes_no__null
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
const [{} = $('fail')] = null;
$('bad');
`````

## Normalized

`````js filename=intro
var tmpTernaryTest;
var tmpTernaryConsequent;
const bindingPatternArrRoot = null;
const arrPatternSplat = [...bindingPatternArrRoot];
const arrPatternBeforeDefault = arrPatternSplat[0];
tmpTernaryTest = arrPatternBeforeDefault === undefined;
const arrPatternStep = tmpTernaryTest ? ((tmpTernaryConsequent = $('fail')), tmpTernaryConsequent) : arrPatternBeforeDefault;
$('bad');
`````

## Uniformed

`````js filename=intro
var x;
var x;
var x = /regex/;
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
const arrPatternSplat = [...null];
const arrPatternBeforeDefault = arrPatternSplat[0];
tmpTernaryTest = arrPatternBeforeDefault === undefined;
tmpTernaryTest ? ((tmpTernaryConsequent = $('fail')), tmpTernaryConsequent) : arrPatternBeforeDefault;
$('bad');
`````
