# Preval test case

# default_yes_yes_no__arr_obj_str.md

> normalize > pattern >  > param > arr > obj > ident > default_yes_yes_no__arr_obj_str
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
const [{ x = $('fail') } = $({ x: 'fail2' })] = [{ x: 'abc', y: 2, z: 3 }, 20, 30];
$(x);
`````

## Normalized

`````js filename=intro
var tmpArg;
var tmpElement;
var tmpTernaryConsequent;
var tmpTernaryConsequent$1;
var tmpTernaryTest;
var tmpTernaryTest$1;
tmpElement = { x: 'abc', y: 2, z: 3 };
const bindingPatternArrRoot = [tmpElement, 20, 30];
const arrPatternSplat = [...bindingPatternArrRoot];
const arrPatternBeforeDefault = arrPatternSplat[0];
tmpTernaryTest = arrPatternBeforeDefault === undefined;
let arrPatternStep;
if (tmpTernaryTest) {
  tmpArg = { x: 'fail2' };
  tmpTernaryConsequent = $(tmpArg);
  arrPatternStep = tmpTernaryConsequent;
} else {
  arrPatternStep = arrPatternBeforeDefault;
}
const objPatternBeforeDefault = arrPatternStep.x;
tmpTernaryTest$1 = objPatternBeforeDefault === undefined;
let x;
if (tmpTernaryTest$1) {
  tmpTernaryConsequent$1 = $('fail');
  x = tmpTernaryConsequent$1;
} else {
  x = objPatternBeforeDefault;
}
$(x);
`````

## Output

`````js filename=intro
var tmpArg;
var tmpElement;
var tmpTernaryConsequent;
var tmpTernaryConsequent$1;
var tmpTernaryTest;
var tmpTernaryTest$1;
tmpElement = { x: 'abc', y: 2, z: 3 };
const bindingPatternArrRoot = [tmpElement, 20, 30];
const arrPatternSplat = [...bindingPatternArrRoot];
const arrPatternBeforeDefault = arrPatternSplat[0];
tmpTernaryTest = arrPatternBeforeDefault === undefined;
let arrPatternStep;
if (tmpTernaryTest) {
  tmpArg = { x: 'fail2' };
  tmpTernaryConsequent = $(tmpArg);
  arrPatternStep = tmpTernaryConsequent;
} else {
  arrPatternStep = arrPatternBeforeDefault;
}
const objPatternBeforeDefault = arrPatternStep.x;
tmpTernaryTest$1 = objPatternBeforeDefault === undefined;
let x;
if (tmpTernaryTest$1) {
  tmpTernaryConsequent$1 = $('fail');
  x = tmpTernaryConsequent$1;
} else {
  x = objPatternBeforeDefault;
}
$(x);
`````

## Result

Should call `$` with:
 - 0: "abc"
 - 1: undefined

Normalized calls: Same

Final output calls: Same
