# Preval test case

# default_yes_no_no__obj_obj_null.md

> normalize > pattern >  > param > obj > obj > ident > default_yes_no_no__obj_obj_null
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
({ x: { y = $('fail') } } = { x: { x: 1, y: null, z: 3 }, b: 11, c: 12 });
$(y);
`````

## Normalized

`````js filename=intro
var tmpObjPropValue;
var objAssignPatternRhs;
var objPatternNoDefault;
var objPatternBeforeDefault;
var y;
tmpObjPropValue = { x: 1, y: null, z: 3 };
objAssignPatternRhs = { x: tmpObjPropValue, b: 11, c: 12 };
objPatternNoDefault = objAssignPatternRhs.x;
objPatternBeforeDefault = objPatternNoDefault.y;
{
  let ifTestTmp = objPatternBeforeDefault === undefined;
  if (ifTestTmp) {
    y = $('fail');
  } else {
    y = objPatternBeforeDefault;
  }
}
$(y);
`````

## Output

`````js filename=intro
var tmpObjPropValue;
var objAssignPatternRhs;
var objPatternNoDefault;
var objPatternBeforeDefault;
var y;
tmpObjPropValue = { x: 1, y: null, z: 3 };
objAssignPatternRhs = { x: tmpObjPropValue, b: 11, c: 12 };
objPatternNoDefault = objAssignPatternRhs.x;
objPatternBeforeDefault = objPatternNoDefault.y;
let ifTestTmp = objPatternBeforeDefault === undefined;
if (ifTestTmp) {
  y = $('fail');
} else {
  y = objPatternBeforeDefault;
}
$(y);
`````
