# Preval test case

# default_yes_yes_no__0.md

> normalize > pattern >  > param > arr > obj > ident > default_yes_yes_no__0
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
([{ x = $('pass') } = $({ x: 'fail2' })] = 0);
$('bad');
`````

## Normalized

`````js filename=intro
var arrAssignPatternRhs;
var arrPatternSplat;
var arrPatternBeforeDefault;
var arrPatternStep;
var objPatternBeforeDefault;
var tmpTernaryTest;
var tmpTernaryConsequent;
var tmpArg;
var tmpTernaryTest$1;
var tmpTernaryConsequent$1;
arrAssignPatternRhs = 0;
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
tmpTernaryTest$1 = objPatternBeforeDefault === undefined;
if (tmpTernaryTest$1) {
  tmpTernaryConsequent$1 = $('pass');
  x = tmpTernaryConsequent$1;
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
var arrPatternBeforeDefault;
var arrPatternStep;
var objPatternBeforeDefault;
var tmpTernaryTest;
var tmpTernaryConsequent;
var tmpArg;
var tmpTernaryTest$1;
var tmpTernaryConsequent$1;
arrAssignPatternRhs = 0;
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
tmpTernaryTest$1 = objPatternBeforeDefault === undefined;
if (tmpTernaryTest$1) {
  tmpTernaryConsequent$1 = $('pass');
  x = tmpTernaryConsequent$1;
} else {
  x = objPatternBeforeDefault;
}
$('bad');
`````

## Result

Should call `$` with:
 - 0: <crash[ undefined is not a function ]>

Normalized calls: BAD?!
['<crash[ <ref> is not iterable ]>'];

Final output calls: BAD!!
['<crash[ <ref> is not iterable ]>'];

