# Preval test case

# default_yes_no__obj_missing.md

> normalize > pattern >  > param > obj > ident > default_yes_no__obj_missing
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
({ x = $('pass') } = { b: 2, c: 3 });
$(x);
`````

## Normalized

`````js filename=intro
var objAssignPatternRhs;
var objPatternBeforeDefault;
objAssignPatternRhs = { b: 2, c: 3 };
objPatternBeforeDefault = objAssignPatternRhs.x;
{
  let ifTestTmp = objPatternBeforeDefault === undefined;
  if (ifTestTmp) {
    x = $('pass');
  } else {
    x = objPatternBeforeDefault;
  }
}
$(x);
`````

## Output

`````js filename=intro
var objAssignPatternRhs;
var objPatternBeforeDefault;
objAssignPatternRhs = { b: 2, c: 3 };
objPatternBeforeDefault = objAssignPatternRhs.x;
let ifTestTmp = objPatternBeforeDefault === undefined;
if (ifTestTmp) {
  x = $('pass');
} else {
  x = objPatternBeforeDefault;
}
$(x);
`````
