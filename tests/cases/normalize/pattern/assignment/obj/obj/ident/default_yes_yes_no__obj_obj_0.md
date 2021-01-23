# Preval test case

# default_yes_yes_no__obj_obj_0.md

> normalize > pattern >  > param > obj > obj > ident > default_yes_yes_no__obj_obj_0
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
({ x: { y = $('fail') } = $({ y: 'fail2' }) } = { x: { x: 1, y: 0, z: 3 }, b: 11, c: 12 });
$(y);
`````

## Normalized

`````js filename=intro
var objAssignPatternRhs;
var objPatternBeforeDefault;
var objPatternAfterDefault;
var objPatternBeforeDefault$1;
var tmpObjPropValue;
var tmpTernaryTest;
var tmpTernaryConsequent;
var tmpArg;
var tmpTernaryTest$1;
var tmpTernaryConsequent$1;
tmpObjPropValue = { x: 1, y: 0, z: 3 };
objAssignPatternRhs = { x: tmpObjPropValue, b: 11, c: 12 };
objPatternBeforeDefault = objAssignPatternRhs.x;
tmpTernaryTest = objPatternBeforeDefault === undefined;
if (tmpTernaryTest) {
  tmpArg = { y: 'fail2' };
  tmpTernaryConsequent = $(tmpArg);
  objPatternAfterDefault = tmpTernaryConsequent;
} else {
  objPatternAfterDefault = objPatternBeforeDefault;
}
objPatternBeforeDefault$1 = objPatternAfterDefault.y;
tmpTernaryTest$1 = objPatternBeforeDefault$1 === undefined;
if (tmpTernaryTest$1) {
  tmpTernaryConsequent$1 = $('fail');
  y = tmpTernaryConsequent$1;
} else {
  y = objPatternBeforeDefault$1;
}
objAssignPatternRhs;
$(y);
`````

## Output

`````js filename=intro
var objAssignPatternRhs;
var objPatternBeforeDefault;
var objPatternAfterDefault;
var objPatternBeforeDefault$1;
var tmpObjPropValue;
var tmpTernaryTest;
var tmpTernaryConsequent;
var tmpArg;
var tmpTernaryTest$1;
var tmpTernaryConsequent$1;
tmpObjPropValue = { x: 1, y: 0, z: 3 };
objAssignPatternRhs = { x: tmpObjPropValue, b: 11, c: 12 };
objPatternBeforeDefault = objAssignPatternRhs.x;
tmpTernaryTest = objPatternBeforeDefault === undefined;
if (tmpTernaryTest) {
  tmpArg = { y: 'fail2' };
  tmpTernaryConsequent = $(tmpArg);
  objPatternAfterDefault = tmpTernaryConsequent;
} else {
  objPatternAfterDefault = objPatternBeforeDefault;
}
objPatternBeforeDefault$1 = objPatternAfterDefault.y;
tmpTernaryTest$1 = objPatternBeforeDefault$1 === undefined;
if (tmpTernaryTest$1) {
  tmpTernaryConsequent$1 = $('fail');
  y = tmpTernaryConsequent$1;
} else {
  y = objPatternBeforeDefault$1;
}
$(y);
`````

## Result

Should call `$` with:
 - 0: 0
 - 1: undefined

Normalized calls: Same

Final output calls: Same
