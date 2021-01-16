# Preval test case

# default_yes_no_no__obj_str.md

> normalize > pattern >  > param > obj > obj > ident > default_yes_no_no__obj_str
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
({ x: { y = $('pass') } } = { x: 'abc', b: 11, c: 12 });
$(y);
`````

## Normalized

`````js filename=intro
var objAssignPatternRhs;
var objPatternNoDefault;
var objPatternBeforeDefault;
var tmpTernaryTest;
var tmpTernaryConsequent;
objAssignPatternRhs = { x: 'abc', b: 11, c: 12 };
objPatternNoDefault = objAssignPatternRhs.x;
objPatternBeforeDefault = objPatternNoDefault.y;
tmpTernaryTest = objPatternBeforeDefault === undefined;
if (tmpTernaryTest) {
  tmpTernaryConsequent = $('pass');
  y = tmpTernaryConsequent;
} else {
  y = objPatternBeforeDefault;
}
$(y);
`````

## Output

`````js filename=intro
var objAssignPatternRhs;
var objPatternNoDefault;
var objPatternBeforeDefault;
var tmpTernaryTest;
var tmpTernaryConsequent;
objAssignPatternRhs = { x: 'abc', b: 11, c: 12 };
objPatternNoDefault = objAssignPatternRhs.x;
objPatternBeforeDefault = objPatternNoDefault.y;
tmpTernaryTest = objPatternBeforeDefault === undefined;
if (tmpTernaryTest) {
  tmpTernaryConsequent = $('pass');
  y = tmpTernaryConsequent;
} else {
  y = objPatternBeforeDefault;
}
$(y);
`````
