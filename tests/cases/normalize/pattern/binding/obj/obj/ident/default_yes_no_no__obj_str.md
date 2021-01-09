# Preval test case

# default_yes_no_no__obj_str.md

> normalize > pattern >  > param > obj > obj > ident > default_yes_no_no__obj_str
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
const { x: { y = $('pass') } } = { x: 'abc', b: 11, c: 12 };
$(y);
`````

## Normalized

`````js filename=intro
var tmpTernaryTest;
var tmpTernaryConsequent;
const bindingPatternObjRoot = { x: 'abc', b: 11, c: 12 };
const objPatternNoDefault = bindingPatternObjRoot.x;
const objPatternBeforeDefault = objPatternNoDefault.y;
tmpTernaryTest = objPatternBeforeDefault === undefined;
const y = tmpTernaryTest ? ((tmpTernaryConsequent = $('pass')), tmpTernaryConsequent) : objPatternBeforeDefault;
$(y);
`````

## Uniformed

`````js filename=intro
var x;
var x;
var x = { x: 'str', x: 8, x: 8 };
var x = x.x;
var x = x.x;
x = x * x;
var x = x ? ((x = x('str')), x) : x;
x(x);
`````

## Output

`````js filename=intro
var tmpTernaryTest;
var tmpTernaryConsequent;
const bindingPatternObjRoot = { x: 'abc', b: 11, c: 12 };
const objPatternNoDefault = bindingPatternObjRoot.x;
const objPatternBeforeDefault = objPatternNoDefault.y;
tmpTernaryTest = objPatternBeforeDefault === undefined;
const y = tmpTernaryTest ? ((tmpTernaryConsequent = $('pass')), tmpTernaryConsequent) : objPatternBeforeDefault;
$(y);
`````
