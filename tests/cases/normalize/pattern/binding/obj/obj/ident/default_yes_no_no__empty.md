# Preval test case

# default_yes_no_no__empty.md

> normalize > pattern >  > param > obj > obj > ident > default_yes_no_no__empty
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
const { x: { y = $('fail') } } = 1;
$('bad');
`````

## Normalized

`````js filename=intro
var tmpTernaryTest;
var tmpTernaryConsequent;
const bindingPatternObjRoot = 1;
const objPatternNoDefault = bindingPatternObjRoot.x;
const objPatternBeforeDefault = objPatternNoDefault.y;
tmpTernaryTest = objPatternBeforeDefault === undefined;
const y = tmpTernaryTest ? ((tmpTernaryConsequent = $('fail')), tmpTernaryConsequent) : objPatternBeforeDefault;
$('bad');
`````

## Output

`````js filename=intro
var tmpTernaryTest;
const objPatternNoDefault = (1).x;
const objPatternBeforeDefault = objPatternNoDefault.y;
tmpTernaryTest = objPatternBeforeDefault === undefined;
$('bad');
`````