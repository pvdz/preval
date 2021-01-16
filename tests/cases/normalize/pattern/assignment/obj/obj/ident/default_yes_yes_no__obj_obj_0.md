# Preval test case

# default_yes_yes_no__obj_obj_0.md

> normalize > pattern >  > param > obj > obj > ident > default_yes_yes_no__obj_obj_0
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
({ x: { y = $('fail') } = $({ y: 'fail2' }) } = { x: { x: 1, y: 0, z: 3 }, b: 11, c: 12 });
$(y);
`````

## Normalized

`````js filename=intro
var tmpObjPropValue;
var tmpArg;
var objAssignPatternRhs;
var objPatternBeforeDefault;
var objPatternAfterDefault;
var objPatternBeforeDefault_1;
tmpObjPropValue = { x: 1, y: 0, z: 3 };
objAssignPatternRhs = { x: tmpObjPropValue, b: 11, c: 12 };
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
    y = $('fail');
  } else {
    y = objPatternBeforeDefault_1;
  }
}
$(y);
`````

## Output

`````js filename=intro
var tmpObjPropValue;
var tmpArg;
var objAssignPatternRhs;
var objPatternBeforeDefault;
var objPatternAfterDefault;
var objPatternBeforeDefault_1;
tmpObjPropValue = { x: 1, y: 0, z: 3 };
objAssignPatternRhs = { x: tmpObjPropValue, b: 11, c: 12 };
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
  y = $('fail');
} else {
  y = objPatternBeforeDefault_1;
}
$(y);
`````
