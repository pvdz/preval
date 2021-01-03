# Preval test case

# default_yes_no_no__0.md

> normalize > pattern >  > param > arr > obj > ident > default_yes_no_no__0
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
const [{ x = $('pass') }] = 0;
$('bad');
`````

## Normalized

`````js filename=intro
var tmpTernaryTest;
var tmpTernaryConsequent;
const bindingPatternArrRoot = 0;
const arrPatternSplat = [...bindingPatternArrRoot];
const arrPatternStep = arrPatternSplat[0];
const objPatternBeforeDefault = arrPatternStep.x;
tmpTernaryTest = objPatternBeforeDefault === undefined;
const x = tmpTernaryTest ? ((tmpTernaryConsequent = $('pass')), tmpTernaryConsequent) : objPatternBeforeDefault;
$('bad');
`````

## Output

`````js filename=intro
var tmpTernaryTest;
const arrPatternSplat = [...0];
const arrPatternStep = arrPatternSplat[0];
const objPatternBeforeDefault = arrPatternStep.x;
tmpTernaryTest = objPatternBeforeDefault === undefined;
$('bad');
`````