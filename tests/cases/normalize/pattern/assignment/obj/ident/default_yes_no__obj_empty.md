# Preval test case

# default_yes_no__obj_empty.md

> normalize > pattern >  > param > obj > ident > default_yes_no__obj_empty
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
({ x = $('pass') } = {});
$(x);
`````

## Normalized

`````js filename=intro
var objAssignPatternRhs;
var objPatternBeforeDefault;
var tmpTernaryTest;
var tmpTernaryConsequent;
objAssignPatternRhs = {};
objPatternBeforeDefault = objAssignPatternRhs.x;
tmpTernaryTest = objPatternBeforeDefault === undefined;
if (tmpTernaryTest) {
  tmpTernaryConsequent = $('pass');
  x = tmpTernaryConsequent;
} else {
  x = objPatternBeforeDefault;
}
$(x);
`````

## Output

`````js filename=intro
var objAssignPatternRhs;
var objPatternBeforeDefault;
var tmpTernaryTest;
var tmpTernaryConsequent;
objAssignPatternRhs = {};
objPatternBeforeDefault = objAssignPatternRhs.x;
tmpTernaryTest = objPatternBeforeDefault === undefined;
if (tmpTernaryTest) {
  tmpTernaryConsequent = $('pass');
  x = tmpTernaryConsequent;
} else {
  x = objPatternBeforeDefault;
}
$(x);
`````
