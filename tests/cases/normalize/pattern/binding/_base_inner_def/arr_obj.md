# Preval test case

# arr_obj.md

> normalize > pattern > param > _base > arr_obj
>
> Testing simple pattern normalizations

## Input

`````js filename=intro
const [{ x = a }] = 1;
`````

## Normalized

`````js filename=intro
var tmpTernaryTest;
const bindingPatternArrRoot = 1;
const arrPatternSplat = [...bindingPatternArrRoot];
const arrPatternStep = arrPatternSplat[0];
const objPatternBeforeDefault = arrPatternStep.x;
tmpTernaryTest = objPatternBeforeDefault === undefined;
const x = tmpTernaryTest ? a : objPatternBeforeDefault;
`````

## Uniformed

`````js filename=intro
var x;
var x = 8;
var x = [...x];
var x = x[8];
var x = x.x;
x = x * x;
var x = x ? x : x;
`````

## Output

`````js filename=intro
var tmpTernaryTest;
const arrPatternSplat = [...1];
const arrPatternStep = arrPatternSplat[0];
const objPatternBeforeDefault = arrPatternStep.x;
tmpTernaryTest = objPatternBeforeDefault === undefined;
tmpTernaryTest ? a : objPatternBeforeDefault;
`````
