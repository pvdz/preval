# Preval test case

# default_yes_no__obj_undefined.md

> normalize > pattern >  > param > obj > ident > default_yes_no__obj_undefined
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
({ x = $('pass') } = { x: undefined });
$(x);
`````

## Normalized

`````js filename=intro
var tmpTernaryTest;
var tmpTernaryConsequent;
var objAssignPatternRhs;
var objPatternBeforeDefault;
var x;
objAssignPatternRhs = { x: undefined };
objPatternBeforeDefault = objAssignPatternRhs.x;
tmpTernaryTest = objPatternBeforeDefault === undefined;
x = tmpTernaryTest ? ((tmpTernaryConsequent = $('pass')), tmpTernaryConsequent) : objPatternBeforeDefault;
$(x);
`````

## Output

`````js filename=intro
var tmpTernaryTest;
var tmpTernaryConsequent;
var objAssignPatternRhs;
var objPatternBeforeDefault;
var x;
objAssignPatternRhs = { x: undefined };
objPatternBeforeDefault = objAssignPatternRhs.x;
tmpTernaryTest = objPatternBeforeDefault === undefined;
x = tmpTernaryTest ? ((tmpTernaryConsequent = $('pass')), tmpTernaryConsequent) : objPatternBeforeDefault;
$(x);
`````