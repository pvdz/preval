# Preval test case

# default_yes_yes_no__str.md

> normalize > pattern >  > param > obj > obj > ident > default_yes_yes_no__str
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
({ x: { y = $('fail') } = $({ y: 'pass2' }) } = 'abc');
$(y);
`````

## Normalized

`````js filename=intro
var tmpArg;
var objAssignPatternRhs;
var objPatternBeforeDefault;
var objPatternAfterDefault;
var objPatternBeforeDefault_1;
objAssignPatternRhs = 'abc';
objPatternBeforeDefault = objAssignPatternRhs.x;
{
  let ifTestTmp = objPatternBeforeDefault === undefined;
  if (ifTestTmp) {
    tmpArg = { y: 'pass2' };
    objPatternAfterDefault = $(tmpArg);
  } else {
    objPatternAfterDefault = objPatternBeforeDefault;
  }
}
objPatternBeforeDefault_1 = objPatternAfterDefault.y;
{
  let ifTestTmp_1 = objPatternBeforeDefault_1 === undefined;
  if (ifTestTmp_1) {
    y = $('fail');
  } else {
    y = objPatternBeforeDefault_1;
  }
}
$(y);
`````

## Output

`````js filename=intro
var tmpArg;
var objAssignPatternRhs;
var objPatternBeforeDefault;
var objPatternAfterDefault;
var objPatternBeforeDefault_1;
objAssignPatternRhs = 'abc';
objPatternBeforeDefault = objAssignPatternRhs.x;
let ifTestTmp = objPatternBeforeDefault === undefined;
if (ifTestTmp) {
  tmpArg = { y: 'pass2' };
  objPatternAfterDefault = $(tmpArg);
} else {
  objPatternAfterDefault = objPatternBeforeDefault;
}
objPatternBeforeDefault_1 = objPatternAfterDefault.y;
let ifTestTmp_1 = objPatternBeforeDefault_1 === undefined;
if (ifTestTmp_1) {
  y = $('fail');
} else {
  y = objPatternBeforeDefault_1;
}
$(y);
`````
