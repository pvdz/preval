# Preval test case

# default_yes_no__123.md

> normalize > pattern >  > param > arr > arr > rest > default_yes_no__123
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
const [[...x] = $('pass')] = 1;
$('bad');
`````

## Normalized

`````js filename=intro
var tmpTernaryConsequent;
var tmpTernaryTest;
const bindingPatternArrRoot = 1;
const arrPatternSplat = [...bindingPatternArrRoot];
const arrPatternBeforeDefault = arrPatternSplat[0];
tmpTernaryTest = arrPatternBeforeDefault === undefined;
let arrPatternStep;
if (tmpTernaryTest) {
  tmpTernaryConsequent = $('pass');
  arrPatternStep = tmpTernaryConsequent;
} else {
  arrPatternStep = arrPatternBeforeDefault;
}
const arrPatternSplat$1 = [...arrPatternStep];
const x = arrPatternSplat$1.slice(0);
$('bad');
`````

## Output

`````js filename=intro
var tmpTernaryConsequent;
var tmpTernaryTest;
const arrPatternSplat = [...1];
const arrPatternBeforeDefault = arrPatternSplat[0];
tmpTernaryTest = arrPatternBeforeDefault === undefined;
let arrPatternStep;
if (tmpTernaryTest) {
  tmpTernaryConsequent = $('pass');
  arrPatternStep = tmpTernaryConsequent;
} else {
  arrPatternStep = arrPatternBeforeDefault;
}
const arrPatternSplat$1 = [...arrPatternStep];
arrPatternSplat$1.slice(0);
$('bad');
`````

## Result

Should call `$` with:
 - 0: <crash[ <ref> is not iterable ]>

Normalized calls: Same

Final output calls: Same
