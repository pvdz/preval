# Preval test case

# default_yes_no_no__0.md

> normalize > pattern >  > param > obj > arr > ident > default_yes_no_no__0
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
const { x: [y = 'fail'] } = 0;
$('bad');
`````

## Normalized

`````js filename=intro
var tmpTernaryTest;
const bindingPatternObjRoot = 0;
const objPatternNoDefault = bindingPatternObjRoot.x;
const arrPatternSplat = [...objPatternNoDefault];
const arrPatternBeforeDefault = arrPatternSplat[0];
tmpTernaryTest = arrPatternBeforeDefault === undefined;
const y = tmpTernaryTest ? 'fail' : arrPatternBeforeDefault;
$('bad');
`````

## Uniformed

`````js filename=intro
var x;
var x = 8;
var x = x.x;
var x = [...x];
var x = x[8];
x = x * x;
var x = x ? 'str' : x;
x('str');
`````

## Output

`````js filename=intro
var tmpTernaryTest;
const objPatternNoDefault = (0).x;
const arrPatternSplat = [...objPatternNoDefault];
const arrPatternBeforeDefault = arrPatternSplat[0];
tmpTernaryTest = arrPatternBeforeDefault === undefined;
tmpTernaryTest ? 'fail' : arrPatternBeforeDefault;
$('bad');
`````
