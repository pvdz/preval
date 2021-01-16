# Preval test case

# default_yes_yes_no__arr_obj_empty_str.md

> normalize > pattern >  > param > arr > obj > ident > default_yes_yes_no__arr_obj_empty_str
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
([{ x = $('fail') } = $({ x: 'fail2' })] = [{ x: '', y: 2, z: 3 }, 20, 30]);
$(x);
`````

## Normalized

`````js filename=intro
var arrAssignPatternRhs;
var arrPatternSplat;
var arrPatternBeforeDefault;
var arrPatternStep;
var objPatternBeforeDefault;
var tmpElement;
var tmpTernaryTest;
var tmpTernaryConsequent;
var tmpArg;
var tmpTernaryTest_1;
var tmpTernaryConsequent_1;
tmpElement = { x: '', y: 2, z: 3 };
arrAssignPatternRhs = [tmpElement, 20, 30];
arrPatternSplat = [...arrAssignPatternRhs];
arrPatternBeforeDefault = arrPatternSplat[0];
tmpTernaryTest = arrPatternBeforeDefault === undefined;
if (tmpTernaryTest) {
  tmpArg = { x: 'fail2' };
  tmpTernaryConsequent = $(tmpArg);
  arrPatternStep = tmpTernaryConsequent;
} else {
  arrPatternStep = arrPatternBeforeDefault;
}
objPatternBeforeDefault = arrPatternStep.x;
tmpTernaryTest_1 = objPatternBeforeDefault === undefined;
if (tmpTernaryTest_1) {
  tmpTernaryConsequent_1 = $('fail');
  x = tmpTernaryConsequent_1;
} else {
  x = objPatternBeforeDefault;
}
$(x);
`````

## Output

`````js filename=intro
var arrAssignPatternRhs;
var arrPatternSplat;
var arrPatternBeforeDefault;
var arrPatternStep;
var objPatternBeforeDefault;
var tmpElement;
var tmpTernaryTest;
var tmpTernaryConsequent;
var tmpArg;
var tmpTernaryTest_1;
var tmpTernaryConsequent_1;
tmpElement = { x: '', y: 2, z: 3 };
arrAssignPatternRhs = [tmpElement, 20, 30];
arrPatternSplat = [...arrAssignPatternRhs];
arrPatternBeforeDefault = arrPatternSplat[0];
tmpTernaryTest = arrPatternBeforeDefault === undefined;
if (tmpTernaryTest) {
  tmpArg = { x: 'fail2' };
  tmpTernaryConsequent = $(tmpArg);
  arrPatternStep = tmpTernaryConsequent;
} else {
  arrPatternStep = arrPatternBeforeDefault;
}
objPatternBeforeDefault = arrPatternStep.x;
tmpTernaryTest_1 = objPatternBeforeDefault === undefined;
if (tmpTernaryTest_1) {
  tmpTernaryConsequent_1 = $('fail');
  x = tmpTernaryConsequent_1;
} else {
  x = objPatternBeforeDefault;
}
$(x);
`````
