# Preval test case

# default_yes_no_no__arr_undefined.md

> normalize > pattern >  > param > arr > obj > ident > default_yes_no_no__arr_undefined
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
([{ x = $('pass') }] = [undefined, 20, 30]);
$('bad');
`````

## Normalized

`````js filename=intro
var arrAssignPatternRhs;
var arrPatternSplat;
var arrPatternStep;
var objPatternBeforeDefault;
var tmpTernaryTest;
var tmpTernaryConsequent;
arrAssignPatternRhs = [undefined, 20, 30];
arrPatternSplat = [...arrAssignPatternRhs];
arrPatternStep = arrPatternSplat[0];
objPatternBeforeDefault = arrPatternStep.x;
tmpTernaryTest = objPatternBeforeDefault === undefined;
if (tmpTernaryTest) {
  tmpTernaryConsequent = $('pass');
  x = tmpTernaryConsequent;
} else {
  x = objPatternBeforeDefault;
}
arrAssignPatternRhs;
$('bad');
`````

## Output

`````js filename=intro
var arrAssignPatternRhs;
var arrPatternSplat;
var arrPatternStep;
var objPatternBeforeDefault;
var tmpTernaryTest;
var tmpTernaryConsequent;
arrAssignPatternRhs = [undefined, 20, 30];
arrPatternSplat = [...arrAssignPatternRhs];
arrPatternStep = arrPatternSplat[0];
objPatternBeforeDefault = arrPatternStep.x;
tmpTernaryTest = objPatternBeforeDefault === undefined;
if (tmpTernaryTest) {
  tmpTernaryConsequent = $('pass');
  x = tmpTernaryConsequent;
} else {
  x = objPatternBeforeDefault;
}
$('bad');
`````

## Result

Should call `$` with:
 - 0: <crash[ Cannot read property 'x' of undefined ]>

Normalized calls: Same

Final output calls: Same
