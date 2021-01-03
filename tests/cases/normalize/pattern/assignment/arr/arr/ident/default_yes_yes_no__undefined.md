# Preval test case

# default_yes_yes_no__undefined.md

> normalize > pattern >  > param > arr > arr > ident > default_yes_yes_no__undefined
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
([[x = $('fail')] = $(['fail2'])] = undefined);
$('bad');
`````

## Normalized

`````js filename=intro
var tmpTernaryTest;
var tmpTernaryConsequent;
var tmpArg;
var tmpTernaryTest_1;
var tmpTernaryConsequent_1;
var arrAssignPatternRhs;
var arrPatternSplat;
var arrPatternBeforeDefault;
var arrPatternStep;
var arrPatternSplat_1;
var arrPatternBeforeDefault_1;
var x;
arrAssignPatternRhs = undefined;
arrPatternSplat = [...arrAssignPatternRhs];
arrPatternBeforeDefault = arrPatternSplat[0];
tmpTernaryTest = arrPatternBeforeDefault === undefined;
arrPatternStep = tmpTernaryTest
  ? ((tmpArg = ['fail2']), (tmpTernaryConsequent = $(tmpArg)), tmpTernaryConsequent)
  : arrPatternBeforeDefault;
arrPatternSplat_1 = [...arrPatternStep];
arrPatternBeforeDefault_1 = arrPatternSplat_1[0];
tmpTernaryTest_1 = arrPatternBeforeDefault_1 === undefined;
x = tmpTernaryTest_1 ? ((tmpTernaryConsequent_1 = $('fail')), tmpTernaryConsequent_1) : arrPatternBeforeDefault_1;
$('bad');
`````

## Output

`````js filename=intro
var tmpTernaryTest;
var tmpTernaryConsequent;
var tmpArg;
var tmpTernaryTest_1;
var tmpTernaryConsequent_1;
var arrAssignPatternRhs;
var arrPatternSplat;
var arrPatternBeforeDefault;
var arrPatternStep;
var arrPatternSplat_1;
var arrPatternBeforeDefault_1;
var x;
arrAssignPatternRhs = undefined;
arrPatternSplat = [...arrAssignPatternRhs];
arrPatternBeforeDefault = arrPatternSplat[0];
tmpTernaryTest = arrPatternBeforeDefault === undefined;
arrPatternStep = tmpTernaryTest
  ? ((tmpArg = ['fail2']), (tmpTernaryConsequent = $(tmpArg)), tmpTernaryConsequent)
  : arrPatternBeforeDefault;
arrPatternSplat_1 = [...arrPatternStep];
arrPatternBeforeDefault_1 = arrPatternSplat_1[0];
tmpTernaryTest_1 = arrPatternBeforeDefault_1 === undefined;
x = tmpTernaryTest_1 ? ((tmpTernaryConsequent_1 = $('fail')), tmpTernaryConsequent_1) : arrPatternBeforeDefault_1;
$('bad');
`````