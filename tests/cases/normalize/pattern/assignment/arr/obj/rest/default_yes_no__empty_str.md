# Preval test case

# default_yes_no__empty_str.md

> normalize > pattern >  > param > arr > obj > rest > default_yes_no__empty_str
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
([{ ...x } = $({ a: 'pass' })] = '');
$(x);
`````

## Normalized

`````js filename=intro
var arrAssignPatternRhs;
var arrPatternSplat;
var arrPatternBeforeDefault;
var arrPatternStep;
var tmpTernaryTest;
var tmpTernaryConsequent;
var tmpArg;
arrAssignPatternRhs = '';
arrPatternSplat = [...arrAssignPatternRhs];
arrPatternBeforeDefault = arrPatternSplat[0];
tmpTernaryTest = arrPatternBeforeDefault === undefined;
if (tmpTernaryTest) {
  tmpArg = { a: 'pass' };
  tmpTernaryConsequent = $(tmpArg);
  arrPatternStep = tmpTernaryConsequent;
} else {
  arrPatternStep = arrPatternBeforeDefault;
}
x = objPatternRest(arrPatternStep, [], undefined);
arrAssignPatternRhs;
$(x);
`````

## Output

`````js filename=intro
var arrAssignPatternRhs;
var arrPatternSplat;
var arrPatternBeforeDefault;
var arrPatternStep;
var tmpTernaryTest;
var tmpTernaryConsequent;
var tmpArg;
arrAssignPatternRhs = '';
arrPatternSplat = [...arrAssignPatternRhs];
arrPatternBeforeDefault = arrPatternSplat[0];
tmpTernaryTest = arrPatternBeforeDefault === undefined;
if (tmpTernaryTest) {
  tmpArg = { a: 'pass' };
  tmpTernaryConsequent = $(tmpArg);
  arrPatternStep = tmpTernaryConsequent;
} else {
  arrPatternStep = arrPatternBeforeDefault;
}
x = objPatternRest(arrPatternStep, [], undefined);
$(x);
`````

## Result

Should call `$` with:
 - 0: {"a":"pass"}
 - 1: <crash[ Cannot read property 'cannotDestructureThis' of undefined ]>

Normalized calls: Same

Final output calls: Same
