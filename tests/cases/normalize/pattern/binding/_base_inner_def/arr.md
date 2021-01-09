# Preval test case

# 1.md

> normalize > pattern > param > _base > 1
>
> Testing simple pattern normalizations

## Input

`````js filename=intro
const [ x = a ] = 1;
`````

## Normalized

`````js filename=intro
var tmpTernaryTest;
const bindingPatternArrRoot = 1;
const arrPatternSplat = [...bindingPatternArrRoot];
const arrPatternBeforeDefault = arrPatternSplat[0];
tmpTernaryTest = arrPatternBeforeDefault === undefined;
const x = tmpTernaryTest ? a : arrPatternBeforeDefault;
`````

## Uniformed

`````js filename=intro
var x;
var x = 8;
var x = [...x];
var x = x[8];
x = x * x;
var x = x ? x : x;
`````

## Output

`````js filename=intro
var tmpTernaryTest;
const arrPatternSplat = [...1];
const arrPatternBeforeDefault = arrPatternSplat[0];
tmpTernaryTest = arrPatternBeforeDefault === undefined;
tmpTernaryTest ? a : arrPatternBeforeDefault;
`````
