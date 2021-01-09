# Preval test case

# default_yes_no__null.md

> normalize > pattern > param >  > arr > arr > default_yes_no__null
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
const [[] = $(['fail2'])] = null;
$('bad');
`````

## Normalized

`````js filename=intro
var tmpTernaryTest;
var tmpTernaryConsequent;
var tmpArg;
const bindingPatternArrRoot = null;
const arrPatternSplat = [...bindingPatternArrRoot];
const arrPatternBeforeDefault = arrPatternSplat[0];
tmpTernaryTest = arrPatternBeforeDefault === undefined;
const arrPatternStep = tmpTernaryTest
  ? ((tmpArg = ['fail2']), (tmpTernaryConsequent = $(tmpArg)), tmpTernaryConsequent)
  : arrPatternBeforeDefault;
const arrPatternSplat_1 = [...arrPatternStep];
$('bad');
`````

## Uniformed

`````js filename=intro
var x;
var x;
var x;
var x = /regex/;
var x = [...x];
var x = x[8];
x = x * x;
var x = x ? ((x = ['str']), (x = x(x)), x) : x;
var x = [...x];
x('str');
`````

## Output

`````js filename=intro
var tmpTernaryTest;
var tmpTernaryConsequent;
var tmpArg;
const arrPatternSplat = [...null];
const arrPatternBeforeDefault = arrPatternSplat[0];
tmpTernaryTest = arrPatternBeforeDefault === undefined;
const arrPatternStep = tmpTernaryTest
  ? ((tmpArg = ['fail2']), (tmpTernaryConsequent = $(tmpArg)), tmpTernaryConsequent)
  : arrPatternBeforeDefault;
[...arrPatternStep];
$('bad');
`````
