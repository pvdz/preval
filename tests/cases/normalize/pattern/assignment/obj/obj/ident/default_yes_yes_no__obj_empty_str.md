# Preval test case

# default_yes_yes_no__obj_empty_str.md

> normalize > pattern >  > param > obj > obj > ident > default_yes_yes_no__obj_empty_str
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
({ x: { y = $('pass') } = $({ y: 'fail2' }) } = { x: '', b: 11, c: 12 });
$(y);
`````

## Normalized

`````js filename=intro
var tmpArg;
var objAssignPatternRhs;
var objPatternBeforeDefault;
var objPatternAfterDefault;
var objPatternBeforeDefault_1;
var y;
objAssignPatternRhs = { x: '', b: 11, c: 12 };
objPatternBeforeDefault = objAssignPatternRhs.x;
{
  let ifTestTmp = objPatternBeforeDefault === undefined;
  if (ifTestTmp) {
    tmpArg = { y: 'fail2' };
    objPatternAfterDefault = $(tmpArg);
  } else {
    objPatternAfterDefault = objPatternBeforeDefault;
  }
}
objPatternBeforeDefault_1 = objPatternAfterDefault.y;
{
  let ifTestTmp_1 = objPatternBeforeDefault_1 === undefined;
  if (ifTestTmp_1) {
    y = $('pass');
  } else {
    y = objPatternBeforeDefault_1;
  }
}
$(y);
`````

## Uniformed

`````js filename=intro
var x;
var x;
var x;
var x;
var x;
var x;
x = { x: 'str', x: 8, x: 8 };
x = x.x;
{
  var x = x * x;
  if (x) {
    x = { x: 'str' };
    x = x(x);
  } else {
    x = x;
  }
}
x = x.x;
{
  var x = x * x;
  if (x) {
    x = x('str');
  } else {
    x = x;
  }
}
x(x);
`````

## Output

`````js filename=intro
var tmpArg;
var objAssignPatternRhs;
var objPatternBeforeDefault;
var objPatternAfterDefault;
var objPatternBeforeDefault_1;
var y;
objAssignPatternRhs = { x: '', b: 11, c: 12 };
objPatternBeforeDefault = objAssignPatternRhs.x;
let ifTestTmp = objPatternBeforeDefault === undefined;
if (ifTestTmp) {
  tmpArg = { y: 'fail2' };
  objPatternAfterDefault = $(tmpArg);
} else {
  objPatternAfterDefault = objPatternBeforeDefault;
}
objPatternBeforeDefault_1 = objPatternAfterDefault.y;
let ifTestTmp_1 = objPatternBeforeDefault_1 === undefined;
if (ifTestTmp_1) {
  y = $('pass');
} else {
  y = objPatternBeforeDefault_1;
}
$(y);
`````
