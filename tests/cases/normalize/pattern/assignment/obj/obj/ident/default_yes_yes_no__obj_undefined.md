# Preval test case

# default_yes_yes_no__obj_undefined.md

> normalize > pattern >  > param > obj > obj > ident > default_yes_yes_no__obj_undefined
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
({ x: { y = $('fail') } = $({ y: 'pass2' }) } = { x: undefined, b: 11, c: 12 });
$(y);
`````

## Normalized

`````js filename=intro
var objAssignPatternRhs;
var objPatternBeforeDefault;
var objPatternAfterDefault;
var objPatternBeforeDefault_1;
var tmpTernaryTest;
var tmpTernaryConsequent;
var tmpArg;
var tmpTernaryTest_1;
var tmpTernaryConsequent_1;
objAssignPatternRhs = { x: undefined, b: 11, c: 12 };
objPatternBeforeDefault = objAssignPatternRhs.x;
tmpTernaryTest = objPatternBeforeDefault === undefined;
if (tmpTernaryTest) {
  tmpArg = { y: 'pass2' };
  tmpTernaryConsequent = $(tmpArg);
  objPatternAfterDefault = tmpTernaryConsequent;
} else {
  objPatternAfterDefault = objPatternBeforeDefault;
}
objPatternBeforeDefault_1 = objPatternAfterDefault.y;
tmpTernaryTest_1 = objPatternBeforeDefault_1 === undefined;
if (tmpTernaryTest_1) {
  tmpTernaryConsequent_1 = $('fail');
  y = tmpTernaryConsequent_1;
} else {
  y = objPatternBeforeDefault_1;
}
$(y);
`````

## Output

`````js filename=intro
var objAssignPatternRhs;
var objPatternBeforeDefault;
var objPatternAfterDefault;
var objPatternBeforeDefault_1;
var tmpTernaryTest;
var tmpTernaryConsequent;
var tmpArg;
var tmpTernaryTest_1;
var tmpTernaryConsequent_1;
objAssignPatternRhs = { x: undefined, b: 11, c: 12 };
objPatternBeforeDefault = objAssignPatternRhs.x;
tmpTernaryTest = objPatternBeforeDefault === undefined;
if (tmpTernaryTest) {
  tmpArg = { y: 'pass2' };
  tmpTernaryConsequent = $(tmpArg);
  objPatternAfterDefault = tmpTernaryConsequent;
} else {
  objPatternAfterDefault = objPatternBeforeDefault;
}
objPatternBeforeDefault_1 = objPatternAfterDefault.y;
tmpTernaryTest_1 = objPatternBeforeDefault_1 === undefined;
if (tmpTernaryTest_1) {
  tmpTernaryConsequent_1 = $('fail');
  y = tmpTernaryConsequent_1;
} else {
  y = objPatternBeforeDefault_1;
}
$(y);
`````

## Result

Should call `$` with:
 - 0: {"y":"pass2"}
 - 1: <crash[ Cannot read property 'y' of undefined ]>

Normalized calls: Same

Final output calls: Same
