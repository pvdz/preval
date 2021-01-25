# Preval test case

# default_yes_no_no__str.md

> normalize > pattern >  > param > arr > arr > ident > default_yes_no_no__str
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
const [[x = $('fail')]] = 'abc';
$(x);
`````

## Normalized

`````js filename=intro
var tmpTernaryConsequent;
var tmpTernaryTest;
const bindingPatternArrRoot = 'abc';
const arrPatternSplat = [...bindingPatternArrRoot];
const arrPatternStep = arrPatternSplat[0];
const arrPatternSplat$1 = [...arrPatternStep];
const arrPatternBeforeDefault = arrPatternSplat$1[0];
tmpTernaryTest = arrPatternBeforeDefault === undefined;
let x;
if (tmpTernaryTest) {
  tmpTernaryConsequent = $('fail');
  x = tmpTernaryConsequent;
} else {
  x = arrPatternBeforeDefault;
}
$(x);
`````

## Output

`````js filename=intro
var tmpTernaryConsequent;
var tmpTernaryTest;
const arrPatternSplat = [...'abc'];
const arrPatternStep = arrPatternSplat[0];
const arrPatternSplat$1 = [...arrPatternStep];
const arrPatternBeforeDefault = arrPatternSplat$1[0];
tmpTernaryTest = arrPatternBeforeDefault === undefined;
let x;
if (tmpTernaryTest) {
  tmpTernaryConsequent = $('fail');
  x = tmpTernaryConsequent;
} else {
  x = arrPatternBeforeDefault;
}
$(x);
`````

## Result

Should call `$` with:
 - 0: "a"
 - 1: undefined

Normalized calls: Same

Final output calls: Same
