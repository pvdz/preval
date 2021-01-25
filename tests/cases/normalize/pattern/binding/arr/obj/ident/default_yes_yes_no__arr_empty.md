# Preval test case

# default_yes_yes_no__arr_empty.md

> normalize > pattern >  > param > arr > obj > ident > default_yes_yes_no__arr_empty
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
const [{ x = $('pass') } = $({ x: 'pass2' })] = [];
$(x);
`````

## Normalized

`````js filename=intro
var tmpArg;
var tmpTernaryConsequent;
var tmpTernaryConsequent$1;
var tmpTernaryTest;
var tmpTernaryTest$1;
const bindingPatternArrRoot = [];
const arrPatternSplat = [...bindingPatternArrRoot];
const arrPatternBeforeDefault = arrPatternSplat[0];
tmpTernaryTest = arrPatternBeforeDefault === undefined;
let arrPatternStep;
if (tmpTernaryTest) {
  tmpArg = { x: 'pass2' };
  tmpTernaryConsequent = $(tmpArg);
  arrPatternStep = tmpTernaryConsequent;
} else {
  arrPatternStep = arrPatternBeforeDefault;
}
const objPatternBeforeDefault = arrPatternStep.x;
tmpTernaryTest$1 = objPatternBeforeDefault === undefined;
let x;
if (tmpTernaryTest$1) {
  tmpTernaryConsequent$1 = $('pass');
  x = tmpTernaryConsequent$1;
} else {
  x = objPatternBeforeDefault;
}
$(x);
`````

## Output

`````js filename=intro
var tmpArg;
var tmpTernaryConsequent;
var tmpTernaryConsequent$1;
var tmpTernaryTest;
var tmpTernaryTest$1;
const bindingPatternArrRoot = [];
const arrPatternSplat = [...bindingPatternArrRoot];
const arrPatternBeforeDefault = arrPatternSplat[0];
tmpTernaryTest = arrPatternBeforeDefault === undefined;
let arrPatternStep;
if (tmpTernaryTest) {
  tmpArg = { x: 'pass2' };
  tmpTernaryConsequent = $(tmpArg);
  arrPatternStep = tmpTernaryConsequent;
} else {
  arrPatternStep = arrPatternBeforeDefault;
}
const objPatternBeforeDefault = arrPatternStep.x;
tmpTernaryTest$1 = objPatternBeforeDefault === undefined;
let x;
if (tmpTernaryTest$1) {
  tmpTernaryConsequent$1 = $('pass');
  x = tmpTernaryConsequent$1;
} else {
  x = objPatternBeforeDefault;
}
$(x);
`````

## Result

Should call `$` with:
 - 0: {"x":"pass2"}
 - 1: "pass2"
 - 2: undefined

Normalized calls: Same

Final output calls: Same
