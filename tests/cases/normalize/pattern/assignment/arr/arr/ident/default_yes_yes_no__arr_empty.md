# Preval test case

# default_yes_yes_no__arr_empty.md

> normalize > pattern >  > param > arr > arr > ident > default_yes_yes_no__arr_empty
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
([[x = $('fail')] = $(['pass2'])] = []);
$(x);
`````

## Normalized

`````js filename=intro
var arrAssignPatternRhs;
var arrPatternSplat;
var arrPatternBeforeDefault;
var arrPatternStep;
var arrPatternSplat$1;
var arrPatternBeforeDefault$1;
var tmpTernaryTest;
var tmpTernaryConsequent;
var tmpArg;
var tmpTernaryTest$1;
var tmpTernaryConsequent$1;
arrAssignPatternRhs = [];
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
arrPatternSplat$1 = [...arrPatternStep];
arrPatternBeforeDefault$1 = arrPatternSplat$1[0];
tmpTernaryTest$1 = arrPatternBeforeDefault$1 === undefined;
if (tmpTernaryTest$1) {
  tmpTernaryConsequent$1 = $('fail');
  x = tmpTernaryConsequent$1;
} else {
  x = arrPatternBeforeDefault$1;
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
var arrPatternSplat$1;
var arrPatternBeforeDefault$1;
var tmpTernaryTest;
var tmpTernaryConsequent;
var tmpArg;
var tmpTernaryTest$1;
var tmpTernaryConsequent$1;
arrAssignPatternRhs = [];
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
arrPatternSplat$1 = [...arrPatternStep];
arrPatternBeforeDefault$1 = arrPatternSplat$1[0];
tmpTernaryTest$1 = arrPatternBeforeDefault$1 === undefined;
if (tmpTernaryTest$1) {
  tmpTernaryConsequent$1 = $('fail');
  x = tmpTernaryConsequent$1;
} else {
  x = arrPatternBeforeDefault$1;
}
$(x);
`````

## Result

Should call `$` with:
 - 0: ["pass2"]
 - 1: "pass2"
 - 2: undefined

Normalized calls: Same

Final output calls: Same
