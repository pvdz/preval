# Preval test case

# default_yes_yes_no__obj_arr_undefined.md

> normalize > pattern >  > param > obj > arr > ident > default_yes_yes_no__obj_arr_undefined
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
({ x: [y = 'pass'] = $(['fail2']) } = { x: [undefined], a: 11, b: 12 });
$(y);
`````

## Normalized

`````js filename=intro
var tmpObjPropValue;
var tmpArg;
var objAssignPatternRhs;
var objPatternBeforeDefault;
var objPatternAfterDefault;
var arrPatternSplat;
var arrPatternBeforeDefault;
tmpObjPropValue = [undefined];
objAssignPatternRhs = { x: tmpObjPropValue, a: 11, b: 12 };
objPatternBeforeDefault = objAssignPatternRhs.x;
{
  let ifTestTmp = objPatternBeforeDefault === undefined;
  if (ifTestTmp) {
    tmpArg = ['fail2'];
    objPatternAfterDefault = $(tmpArg);
  } else {
    objPatternAfterDefault = objPatternBeforeDefault;
  }
}
arrPatternSplat = [...objPatternAfterDefault];
arrPatternBeforeDefault = arrPatternSplat[0];
{
  let ifTestTmp_1 = arrPatternBeforeDefault === undefined;
  if (ifTestTmp_1) {
    y = 'pass';
  } else {
    y = arrPatternBeforeDefault;
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
var arrPatternSplat;
var arrPatternBeforeDefault;
tmpObjPropValue = [undefined];
objAssignPatternRhs = { x: tmpObjPropValue, a: 11, b: 12 };
objPatternBeforeDefault = objAssignPatternRhs.x;
let ifTestTmp = objPatternBeforeDefault === undefined;
if (ifTestTmp) {
  tmpArg = ['fail2'];
  objPatternAfterDefault = $(tmpArg);
} else {
  objPatternAfterDefault = objPatternBeforeDefault;
}
arrPatternSplat = [...objPatternAfterDefault];
arrPatternBeforeDefault = arrPatternSplat[0];
let ifTestTmp_1 = arrPatternBeforeDefault === undefined;
if (ifTestTmp_1) {
  y = 'pass';
} else {
  y = arrPatternBeforeDefault;
}
$(y);
`````
