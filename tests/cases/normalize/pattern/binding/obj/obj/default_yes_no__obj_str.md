# Preval test case

# default_yes_no__obj_str.md

> normalize > pattern >  > param > obj > obj > default_yes_no__obj_str
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
const { x: {} = $({ x: 'fail' }) } = { x: 'abc', b: 11, c: 12 };
$('ok');
`````

## Normalized

`````js filename=intro
var tmpTernaryTest;
var tmpTernaryConsequent;
var tmpArg;
const bindingPatternObjRoot = { x: 'abc', b: 11, c: 12 };
const objPatternBeforeDefault = bindingPatternObjRoot.x;
tmpTernaryTest = objPatternBeforeDefault === undefined;
const objPatternAfterDefault = tmpTernaryTest
  ? ((tmpArg = { x: 'fail' }), (tmpTernaryConsequent = $(tmpArg)), tmpTernaryConsequent)
  : objPatternBeforeDefault;
$('ok');
`````

## Uniformed

`````js filename=intro
var x;
var x;
var x;
var x = { x: 'str', x: 8, x: 8 };
var x = x.x;
x = x * x;
var x = x ? ((x = { x: 'str' }), (x = x(x)), x) : x;
x('str');
`````

## Output

`````js filename=intro
var tmpTernaryTest;
var tmpTernaryConsequent;
var tmpArg;
const bindingPatternObjRoot = { x: 'abc', b: 11, c: 12 };
const objPatternBeforeDefault = bindingPatternObjRoot.x;
tmpTernaryTest = objPatternBeforeDefault === undefined;
tmpTernaryTest ? ((tmpArg = { x: 'fail' }), (tmpTernaryConsequent = $(tmpArg)), tmpTernaryConsequent) : objPatternBeforeDefault;
$('ok');
`````
