# Preval test case

# default_yes_no__arr_obj_123.md

> normalize > pattern >  > param > arr > obj > default_yes_no__arr_obj_123
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
const [{} = $('fail')] = [{ x: 1, y: 2, z: 3 }, 20, 30];
$('ok');
`````

## Normalized

`````js filename=intro
var tmpElement;
var tmpTernaryTest;
var tmpTernaryConsequent;
tmpElement = { x: 1, y: 2, z: 3 };
const bindingPatternArrRoot = [tmpElement, 20, 30];
const arrPatternSplat = [...bindingPatternArrRoot];
const arrPatternBeforeDefault = arrPatternSplat[0];
tmpTernaryTest = arrPatternBeforeDefault === undefined;
const arrPatternStep = tmpTernaryTest ? ((tmpTernaryConsequent = $('fail')), tmpTernaryConsequent) : arrPatternBeforeDefault;
$('ok');
`````

## Output

`````js filename=intro
var tmpElement;
var tmpTernaryTest;
var tmpTernaryConsequent;
tmpElement = { x: 1, y: 2, z: 3 };
const bindingPatternArrRoot = [tmpElement, 20, 30];
const arrPatternSplat = [...bindingPatternArrRoot];
const arrPatternBeforeDefault = arrPatternSplat[0];
tmpTernaryTest = arrPatternBeforeDefault === undefined;
tmpTernaryTest ? ((tmpTernaryConsequent = $('fail')), tmpTernaryConsequent) : arrPatternBeforeDefault;
$('ok');
`````
