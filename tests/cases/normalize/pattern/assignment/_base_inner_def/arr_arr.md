# Preval test case

# 5.md

> normalize > pattern > param > _base > 5
>
> Testing simple pattern normalizations

## Input

`````js filename=intro
([[ x = a ]] = 1);
`````

## Normalized

`````js filename=intro
var tmpTernaryTest;
var arrAssignPatternRhs;
var arrPatternSplat;
var arrPatternStep;
var arrPatternSplat_1;
var arrPatternBeforeDefault;
var x;
arrAssignPatternRhs = 1;
arrPatternSplat = [...arrAssignPatternRhs];
arrPatternStep = arrPatternSplat[0];
arrPatternSplat_1 = [...arrPatternStep];
arrPatternBeforeDefault = arrPatternSplat_1[0];
tmpTernaryTest = arrPatternBeforeDefault === undefined;
x = tmpTernaryTest ? a : arrPatternBeforeDefault;
`````

## Uniformed

`````js filename=intro
var x;
var x;
var x;
var x;
var x;
var x;
var x;
x = 8;
x = [...x];
x = x[8];
x = [...x];
x = x[8];
x = x * x;
x = x ? x : x;
`````

## Output

`````js filename=intro
var tmpTernaryTest;
var arrAssignPatternRhs;
var arrPatternSplat;
var arrPatternStep;
var arrPatternSplat_1;
var arrPatternBeforeDefault;
var x;
arrAssignPatternRhs = 1;
arrPatternSplat = [...arrAssignPatternRhs];
arrPatternStep = arrPatternSplat[0];
arrPatternSplat_1 = [...arrPatternStep];
arrPatternBeforeDefault = arrPatternSplat_1[0];
tmpTernaryTest = arrPatternBeforeDefault === undefined;
x = tmpTernaryTest ? a : arrPatternBeforeDefault;
`````
