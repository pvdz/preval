# Preval test case

# default_yes_yes_no__obj_obj_123.md

> normalize > pattern >  > param > obj > obj > ident > default_yes_yes_no__obj_obj_123
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
const { x: { y = $('fail') } = $({ y: 'fail2' }) } = { x: { x: 1, y: 2, z: 3 }, b: 11, c: 12 };
$(y);
`````

## Normalized

`````js filename=intro
var tmpArg;
var tmpObjPropValue;
var tmpTernaryConsequent;
var tmpTernaryConsequent$1;
var tmpTernaryTest;
var tmpTernaryTest$1;
tmpObjPropValue = { x: 1, y: 2, z: 3 };
const bindingPatternObjRoot = { x: tmpObjPropValue, b: 11, c: 12 };
const objPatternBeforeDefault = bindingPatternObjRoot.x;
tmpTernaryTest = objPatternBeforeDefault === undefined;
let objPatternAfterDefault;
if (tmpTernaryTest) {
  tmpArg = { y: 'fail2' };
  tmpTernaryConsequent = $(tmpArg);
  objPatternAfterDefault = tmpTernaryConsequent;
} else {
  objPatternAfterDefault = objPatternBeforeDefault;
}
const objPatternBeforeDefault$1 = objPatternAfterDefault.y;
tmpTernaryTest$1 = objPatternBeforeDefault$1 === undefined;
let y;
if (tmpTernaryTest$1) {
  tmpTernaryConsequent$1 = $('fail');
  y = tmpTernaryConsequent$1;
} else {
  y = objPatternBeforeDefault$1;
}
$(y);
`````

## Output

`````js filename=intro
var tmpArg;
var tmpObjPropValue;
var tmpTernaryConsequent;
var tmpTernaryConsequent$1;
var tmpTernaryTest;
var tmpTernaryTest$1;
tmpObjPropValue = { x: 1, y: 2, z: 3 };
const bindingPatternObjRoot = { x: tmpObjPropValue, b: 11, c: 12 };
const objPatternBeforeDefault = bindingPatternObjRoot.x;
tmpTernaryTest = objPatternBeforeDefault === undefined;
let objPatternAfterDefault;
if (tmpTernaryTest) {
  tmpArg = { y: 'fail2' };
  tmpTernaryConsequent = $(tmpArg);
  objPatternAfterDefault = tmpTernaryConsequent;
} else {
  objPatternAfterDefault = objPatternBeforeDefault;
}
const objPatternBeforeDefault$1 = objPatternAfterDefault.y;
tmpTernaryTest$1 = objPatternBeforeDefault$1 === undefined;
let y;
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
 - 0: 2
 - 1: undefined

Normalized calls: Same

Final output calls: Same
