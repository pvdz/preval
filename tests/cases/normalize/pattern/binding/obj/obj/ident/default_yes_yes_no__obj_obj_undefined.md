# Preval test case

# default_yes_yes_no__obj_obj_undefined.md

> normalize > pattern >  > param > obj > obj > ident > default_yes_yes_no__obj_obj_undefined
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
const { x: { y = $('pass') } = $({ y: 'fail2' }) } = { x: { x: 1, y: undefined, z: 3 }, b: 11, c: 12 };
$(y);
`````

## Normalized

`````js filename=intro
var tmpObjPropValue;
var tmpTernaryTest;
var tmpTernaryConsequent;
var tmpArg;
var tmpTernaryTest_1;
var tmpTernaryConsequent_1;
tmpObjPropValue = { x: 1, y: undefined, z: 3 };
const bindingPatternObjRoot = { x: tmpObjPropValue, b: 11, c: 12 };
const objPatternBeforeDefault = bindingPatternObjRoot.x;
tmpTernaryTest = objPatternBeforeDefault === undefined;
const objPatternAfterDefault = tmpTernaryTest
  ? ((tmpArg = { y: 'fail2' }), (tmpTernaryConsequent = $(tmpArg)), tmpTernaryConsequent)
  : objPatternBeforeDefault;
const objPatternBeforeDefault_1 = objPatternAfterDefault.y;
tmpTernaryTest_1 = objPatternBeforeDefault_1 === undefined;
const y = tmpTernaryTest_1 ? ((tmpTernaryConsequent_1 = $('pass')), tmpTernaryConsequent_1) : objPatternBeforeDefault_1;
$(y);
`````

## Uniformed

`````js filename=intro
var x;
var x;
var x;
var x;
var x;
var x;
x = { x: 8, x: x, x: 8 };
var x = { x: x, x: 8, x: 8 };
var x = x.x;
x = x * x;
var x = x ? ((x = { x: 'str' }), (x = x(x)), x) : x;
var x = x.x;
x = x * x;
var x = x ? ((x = x('str')), x) : x;
x(x);
`````

## Output

`````js filename=intro
var tmpObjPropValue;
var tmpTernaryTest;
var tmpTernaryConsequent;
var tmpArg;
var tmpTernaryTest_1;
var tmpTernaryConsequent_1;
tmpObjPropValue = { x: 1, y: undefined, z: 3 };
const bindingPatternObjRoot = { x: tmpObjPropValue, b: 11, c: 12 };
const objPatternBeforeDefault = bindingPatternObjRoot.x;
tmpTernaryTest = objPatternBeforeDefault === undefined;
const objPatternAfterDefault = tmpTernaryTest
  ? ((tmpArg = { y: 'fail2' }), (tmpTernaryConsequent = $(tmpArg)), tmpTernaryConsequent)
  : objPatternBeforeDefault;
const objPatternBeforeDefault_1 = objPatternAfterDefault.y;
tmpTernaryTest_1 = objPatternBeforeDefault_1 === undefined;
const y = tmpTernaryTest_1 ? ((tmpTernaryConsequent_1 = $('pass')), tmpTernaryConsequent_1) : objPatternBeforeDefault_1;
$(y);
`````
