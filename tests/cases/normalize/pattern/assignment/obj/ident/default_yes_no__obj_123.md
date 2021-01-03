# Preval test case

# default_yes_no__obj_123.md

> normalize > pattern >  > param > obj > ident > default_yes_no__obj_123
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
({ x = $('fail') } = { x: 1, b: 2, c: 3 });
$(x);
`````

## Normalized

`````js filename=intro
var tmpTernaryTest;
var tmpTernaryConsequent;
var objAssignPatternRhs;
var objPatternBeforeDefault;
var x;
objAssignPatternRhs = { x: 1, b: 2, c: 3 };
objPatternBeforeDefault = objAssignPatternRhs.x;
tmpTernaryTest = objPatternBeforeDefault === undefined;
x = tmpTernaryTest ? ((tmpTernaryConsequent = $('fail')), tmpTernaryConsequent) : objPatternBeforeDefault;
$(x);
`````

## Output

`````js filename=intro
var tmpTernaryTest;
var tmpTernaryConsequent;
var objAssignPatternRhs;
var objPatternBeforeDefault;
var x;
objAssignPatternRhs = { x: 1, b: 2, c: 3 };
objPatternBeforeDefault = objAssignPatternRhs.x;
tmpTernaryTest = objPatternBeforeDefault === undefined;
x = tmpTernaryTest ? ((tmpTernaryConsequent = $('fail')), tmpTernaryConsequent) : objPatternBeforeDefault;
$(x);
`````
