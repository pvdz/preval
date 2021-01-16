# Preval test case

# default_yes_no__obj_str.md

> normalize > pattern >  > param > obj > ident > default_yes_no__obj_str
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
({ x = $('fail') } = { x: 'abc' });
$(x);
`````

## Normalized

`````js filename=intro
var objAssignPatternRhs;
var objPatternBeforeDefault;
var tmpTernaryTest;
var tmpTernaryConsequent;
objAssignPatternRhs = { x: 'abc' };
objPatternBeforeDefault = objAssignPatternRhs.x;
tmpTernaryTest = objPatternBeforeDefault === undefined;
if (tmpTernaryTest) {
  tmpTernaryConsequent = $('fail');
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
objAssignPatternRhs = { x: 'abc' };
objPatternBeforeDefault = objAssignPatternRhs.x;
tmpTernaryTest = objPatternBeforeDefault === undefined;
if (tmpTernaryTest) {
  tmpTernaryConsequent = $('fail');
  x = tmpTernaryConsequent;
} else {
  x = objPatternBeforeDefault;
}
$(x);
`````
