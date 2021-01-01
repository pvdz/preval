# Preval test case

# default_yes_no_no__obj_obj_0.md

> normalize > pattern >  > param > obj > obj > ident > default_yes_no_no__obj_obj_0
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
({ x: { y = $('fail') } } = { x: { x: 1, y: 0, z: 3 }, b: 11, c: 12 });
$(y);
`````

## Normalized

`````js filename=intro
var tmpTernaryTest;
var tmpTernaryConsequent;
var objAssignPatternRhs;
var objPatternNoDefault;
var objPatternBeforeDefault;
var y;
objAssignPatternRhs = objAssignPatternRhs = { x: { x: 1, y: 0, z: 3 }, b: 11, c: 12 };
objPatternNoDefault = objAssignPatternRhs.x;
objPatternBeforeDefault = objPatternNoDefault.y;
tmpTernaryTest = objPatternBeforeDefault === undefined;
y = tmpTernaryTest ? ((tmpTernaryConsequent = $('fail')), tmpTernaryConsequent) : objPatternBeforeDefault;
$(y);
`````

## Output

`````js filename=intro
var tmpTernaryTest;
var tmpTernaryConsequent;
var objAssignPatternRhs;
var objPatternNoDefault;
var objPatternBeforeDefault;
var y;
objAssignPatternRhs = objAssignPatternRhs = { x: { x: 1, y: 0, z: 3 }, b: 11, c: 12 };
objPatternNoDefault = objAssignPatternRhs.x;
objPatternBeforeDefault = objPatternNoDefault.y;
tmpTernaryTest = objPatternBeforeDefault === undefined;
y = tmpTernaryTest ? ((tmpTernaryConsequent = $('fail')), tmpTernaryConsequent) : objPatternBeforeDefault;
$(y);
`````
