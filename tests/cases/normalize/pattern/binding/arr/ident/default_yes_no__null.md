# Preval test case

# default_yes_no__null.md

> normalize > pattern >  > param > arr > ident > default_yes_no__null
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
const [x = $('fail')] = null;
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
const x = tmpTernaryTest ? ((tmpTernaryConsequent = $('fail')), tmpTernaryConsequent) : arrPatternBeforeDefault;
$('bad');
`````

## Output

`````js filename=intro
var tmpTernaryTest;
const arrPatternSplat = [...null];
const arrPatternBeforeDefault = arrPatternSplat[0];
tmpTernaryTest = arrPatternBeforeDefault === undefined;
$('bad');
`````