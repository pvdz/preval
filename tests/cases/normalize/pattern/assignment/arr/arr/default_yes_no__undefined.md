# Preval test case

# default_yes_no__undefined.md

> normalize > pattern > param >  > arr > arr > default_yes_no__undefined
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
([[] = $(['fail2'])] = undefined);
$('bad');
`````

## Normalized

`````js filename=intro
var arrAssignPatternRhs;
var arrPatternSplat;
var arrPatternBeforeDefault;
var arrPatternStep;
var arrPatternSplat_1;
var tmpTernaryTest;
var tmpTernaryConsequent;
var tmpArg;
arrAssignPatternRhs = undefined;
arrPatternSplat = [...arrAssignPatternRhs];
arrPatternBeforeDefault = arrPatternSplat[0];
tmpTernaryTest = arrPatternBeforeDefault === undefined;
if (tmpTernaryTest) {
  tmpArg = ['fail2'];
  tmpTernaryConsequent = $(tmpArg);
  arrPatternStep = tmpTernaryConsequent;
} else {
  arrPatternStep = arrPatternBeforeDefault;
}
arrPatternSplat_1 = [...arrPatternStep];
arrAssignPatternRhs;
$('bad');
`````

## Output

`````js filename=intro
var arrAssignPatternRhs;
var arrPatternSplat;
var arrPatternBeforeDefault;
var arrPatternStep;
var arrPatternSplat_1;
var tmpTernaryTest;
var tmpTernaryConsequent;
var tmpArg;
arrAssignPatternRhs = undefined;
arrPatternSplat = [...arrAssignPatternRhs];
arrPatternBeforeDefault = arrPatternSplat[0];
tmpTernaryTest = arrPatternBeforeDefault === undefined;
if (tmpTernaryTest) {
  tmpArg = ['fail2'];
  tmpTernaryConsequent = $(tmpArg);
  arrPatternStep = tmpTernaryConsequent;
} else {
  arrPatternStep = arrPatternBeforeDefault;
}
arrPatternSplat_1 = [...arrPatternStep];
$('bad');
`````

## Result

Should call `$` with:
 - 0: <crash[ <ref> is not iterable ]>

Normalized calls: Same

Final output calls: Same
