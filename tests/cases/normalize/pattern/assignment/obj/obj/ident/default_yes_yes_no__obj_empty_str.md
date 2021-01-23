# Preval test case

# default_yes_yes_no__obj_empty_str.md

> normalize > pattern >  > param > obj > obj > ident > default_yes_yes_no__obj_empty_str
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
({ x: { y = $('pass') } = $({ y: 'fail2' }) } = { x: '', b: 11, c: 12 });
$(y);
`````

## Normalized

`````js filename=intro
var objAssignPatternRhs;
var objPatternBeforeDefault;
var objPatternAfterDefault;
var objPatternBeforeDefault$1;
var tmpTernaryTest;
var tmpTernaryConsequent;
var tmpArg;
var tmpTernaryTest$1;
var tmpTernaryConsequent$1;
objAssignPatternRhs = { x: '', b: 11, c: 12 };
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
  tmpTernaryConsequent$1 = $('pass');
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
var tmpTernaryTest;
var tmpTernaryConsequent;
var tmpArg;
var tmpTernaryTest$1;
var tmpTernaryConsequent$1;
objAssignPatternRhs = { x: '', b: 11, c: 12 };
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
  tmpTernaryConsequent$1 = $('pass');
  y = tmpTernaryConsequent$1;
} else {
  y = objPatternBeforeDefault$1;
}
$(y);
`````

## Result

Should call `$` with:
 - 0: "pass"
 - 1: "pass"
 - 2: undefined

Normalized calls: Same

Final output calls: Same
