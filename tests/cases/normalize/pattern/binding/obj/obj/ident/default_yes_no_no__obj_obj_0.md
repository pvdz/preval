# Preval test case

# default_yes_no_no__obj_obj_0.md

> normalize > pattern >  > param > obj > obj > ident > default_yes_no_no__obj_obj_0
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
const { x: { y = $('fail') } } = { x: { x: 1, y: 0, z: 3 }, b: 11, c: 12 };
$(y);
`````

## Normalized

`````js filename=intro
var tmpObjPropValue;
var tmpTernaryTest;
var tmpTernaryConsequent;
tmpObjPropValue = { x: 1, y: 0, z: 3 };
const bindingPatternObjRoot = { x: tmpObjPropValue, b: 11, c: 12 };
const objPatternNoDefault = bindingPatternObjRoot.x;
const objPatternBeforeDefault = objPatternNoDefault.y;
tmpTernaryTest = objPatternBeforeDefault === undefined;
const y = tmpTernaryTest ? ((tmpTernaryConsequent = $('fail')), tmpTernaryConsequent) : objPatternBeforeDefault;
$(y);
`````

## Uniformed

`````js filename=intro
var x;
var x;
var x;
x = { x: 8, x: 8, x: 8 };
var x = { x: x, x: 8, x: 8 };
var x = x.x;
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
tmpObjPropValue = { x: 1, y: 0, z: 3 };
const bindingPatternObjRoot = { x: tmpObjPropValue, b: 11, c: 12 };
const objPatternNoDefault = bindingPatternObjRoot.x;
const objPatternBeforeDefault = objPatternNoDefault.y;
tmpTernaryTest = objPatternBeforeDefault === undefined;
const y = tmpTernaryTest ? ((tmpTernaryConsequent = $('fail')), tmpTernaryConsequent) : objPatternBeforeDefault;
$(y);
`````
