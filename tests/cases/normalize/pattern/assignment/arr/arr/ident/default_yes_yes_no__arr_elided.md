# Preval test case

# default_yes_yes_no__arr_elided.md

> normalize > pattern >  > param > arr > arr > ident > default_yes_yes_no__arr_elided
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
([[x = $('fail')] = $(['pass2'])] = [, , , , 4, 5]);
$(x);
`````

## Normalized

`````js filename=intro
var arrAssignPatternRhs;
var arrPatternSplat;
var arrPatternBeforeDefault;
var arrPatternStep;
var arrPatternSplat_1;
var arrPatternBeforeDefault_1;
var tmpTernaryTest;
var tmpTernaryConsequent;
var tmpArg;
var tmpTernaryTest_1;
var tmpTernaryConsequent_1;
arrAssignPatternRhs = [, , , , 4, 5];
arrPatternSplat = [...arrAssignPatternRhs];
arrPatternBeforeDefault = arrPatternSplat[0];
tmpTernaryTest = arrPatternBeforeDefault === undefined;
if (tmpTernaryTest) {
  tmpArg = ['pass2'];
  tmpTernaryConsequent = $(tmpArg);
  arrPatternStep = tmpTernaryConsequent;
} else {
  arrPatternStep = arrPatternBeforeDefault;
}
arrPatternSplat_1 = [...arrPatternStep];
arrPatternBeforeDefault_1 = arrPatternSplat_1[0];
tmpTernaryTest_1 = arrPatternBeforeDefault_1 === undefined;
if (tmpTernaryTest_1) {
  tmpTernaryConsequent_1 = $('fail');
  x = tmpTernaryConsequent_1;
} else {
  x = arrPatternBeforeDefault_1;
}
arrAssignPatternRhs;
$(x);
`````

## Output

`````js filename=intro
var arrAssignPatternRhs;
var arrPatternSplat;
var arrPatternBeforeDefault;
var arrPatternStep;
var arrPatternSplat_1;
var arrPatternBeforeDefault_1;
var tmpTernaryTest;
var tmpTernaryConsequent;
var tmpArg;
var tmpTernaryTest_1;
var tmpTernaryConsequent_1;
arrAssignPatternRhs = [, , , , 4, 5];
arrPatternSplat = [...arrAssignPatternRhs];
arrPatternBeforeDefault = arrPatternSplat[0];
tmpTernaryTest = arrPatternBeforeDefault === undefined;
if (tmpTernaryTest) {
  tmpArg = ['pass2'];
  tmpTernaryConsequent = $(tmpArg);
  arrPatternStep = tmpTernaryConsequent;
} else {
  arrPatternStep = arrPatternBeforeDefault;
}
arrPatternSplat_1 = [...arrPatternStep];
arrPatternBeforeDefault_1 = arrPatternSplat_1[0];
tmpTernaryTest_1 = arrPatternBeforeDefault_1 === undefined;
if (tmpTernaryTest_1) {
  tmpTernaryConsequent_1 = $('fail');
  x = tmpTernaryConsequent_1;
} else {
  x = arrPatternBeforeDefault_1;
}
$(x);
`````

## Result

Should call `$` with:
 - 0: ["pass2"]
 - 1: <crash[ <ref> is not iterable ]>

Normalized calls: Same

Final output calls: Same
