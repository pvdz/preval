# Preval test case

# default_yes_no_no__empty_str.md

> normalize > pattern >  > param > obj > obj > ident > default_yes_no_no__empty_str
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
const { x: { y = $('fail') } } = '';
$('bad');
`````

## Normalized

`````js filename=intro
var tmpTernaryTest;
var tmpTernaryConsequent;
const bindingPatternObjRoot = '';
const objPatternNoDefault = bindingPatternObjRoot.x;
const objPatternBeforeDefault = objPatternNoDefault.y;
tmpTernaryTest = objPatternBeforeDefault === undefined;
const y = tmpTernaryTest ? ((tmpTernaryConsequent = $('fail')), tmpTernaryConsequent) : objPatternBeforeDefault;
$('bad');
`````

## Uniformed

`````js filename=intro
var x;
var x;
var x = 'str';
var x = x.x;
var x = x.x;
x = x * x;
var x = x ? ((x = x('str')), x) : x;
x('str');
`````

## Output

`````js filename=intro
var tmpTernaryTest;
var tmpTernaryConsequent;
const objPatternNoDefault = ''.x;
const objPatternBeforeDefault = objPatternNoDefault.y;
tmpTernaryTest = objPatternBeforeDefault === undefined;
tmpTernaryTest ? ((tmpTernaryConsequent = $('fail')), tmpTernaryConsequent) : objPatternBeforeDefault;
$('bad');
`````
