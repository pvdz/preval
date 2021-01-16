# Preval test case

# default_yes_no_no__undefined.md

> normalize > pattern >  > param > arr > arr > ident > default_yes_no_no__undefined
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
([[x = $('fail')]] = undefined);
$('bad');
`````

## Normalized

`````js filename=intro
var arrAssignPatternRhs;
var arrPatternSplat;
var arrPatternStep;
var arrPatternSplat_1;
var arrPatternBeforeDefault;
var tmpTernaryTest;
var tmpTernaryConsequent;
arrAssignPatternRhs = undefined;
arrPatternSplat = [...arrAssignPatternRhs];
arrPatternStep = arrPatternSplat[0];
arrPatternSplat_1 = [...arrPatternStep];
arrPatternBeforeDefault = arrPatternSplat_1[0];
tmpTernaryTest = arrPatternBeforeDefault === undefined;
if (tmpTernaryTest) {
  tmpTernaryConsequent = $('fail');
  x = tmpTernaryConsequent;
} else {
  x = arrPatternBeforeDefault;
}
$('bad');
`````

## Output

`````js filename=intro
var arrAssignPatternRhs;
var arrPatternSplat;
var arrPatternStep;
var arrPatternSplat_1;
var arrPatternBeforeDefault;
var tmpTernaryTest;
var tmpTernaryConsequent;
arrAssignPatternRhs = undefined;
arrPatternSplat = [...arrAssignPatternRhs];
arrPatternStep = arrPatternSplat[0];
arrPatternSplat_1 = [...arrPatternStep];
arrPatternBeforeDefault = arrPatternSplat_1[0];
tmpTernaryTest = arrPatternBeforeDefault === undefined;
if (tmpTernaryTest) {
  tmpTernaryConsequent = $('fail');
  x = tmpTernaryConsequent;
} else {
  x = arrPatternBeforeDefault;
}
$('bad');
`````
