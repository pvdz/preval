# Preval test case

# default_yes_no__obj_undefined.md

> normalize > pattern >  > param > obj > obj > default_yes_no__obj_undefined
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
({ x: {} = $({ x: 'pass' }) } = { x: undefined, b: 11, c: 12 });
$('ok');
`````

## Normalized

`````js filename=intro
var tmpArg;
var objAssignPatternRhs;
var objPatternBeforeDefault;
var objPatternAfterDefault;
objAssignPatternRhs = { x: undefined, b: 11, c: 12 };
objPatternBeforeDefault = objAssignPatternRhs.x;
{
  let ifTestTmp = objPatternBeforeDefault === undefined;
  if (ifTestTmp) {
    tmpArg = { x: 'pass' };
    objPatternAfterDefault = $(tmpArg);
  } else {
    objPatternAfterDefault = objPatternBeforeDefault;
  }
}
$('ok');
`````

## Uniformed

`````js filename=intro
var x;
var x;
var x;
var x;
x = { x: x, x: 8, x: 8 };
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
x('str');
`````

## Output

`````js filename=intro
var tmpArg;
var objAssignPatternRhs;
var objPatternBeforeDefault;
var objPatternAfterDefault;
objAssignPatternRhs = { x: undefined, b: 11, c: 12 };
objPatternBeforeDefault = objAssignPatternRhs.x;
let ifTestTmp = objPatternBeforeDefault === undefined;
if (ifTestTmp) {
  tmpArg = { x: 'pass' };
  objPatternAfterDefault = $(tmpArg);
} else {
  objPatternAfterDefault = objPatternBeforeDefault;
}
$('ok');
`````
