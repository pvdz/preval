# Preval test case

# default_yes_no__arr_arr_elided.md

> normalize > pattern >  > param > arr > arr > rest > default_yes_no__arr_arr_elided
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
const [[...x] = $('pass')] = [[, , 1], 4, 5];
$(x);
`````

## Normalized

`````js filename=intro
var tmpElement;
var tmpTernaryConsequent;
var tmpTernaryTest;
tmpElement = [, , 1];
const bindingPatternArrRoot = [tmpElement, 4, 5];
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
$(x);
`````

## Output

`````js filename=intro
var tmpElement;
var tmpTernaryConsequent;
var tmpTernaryTest;
tmpElement = [, , 1];
const bindingPatternArrRoot = [tmpElement, 4, 5];
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
$(x);
`````

## Result

Should call `$` with:
 - 0: [null,null,1]
 - 1: undefined

Normalized calls: Same

Final output calls: Same
