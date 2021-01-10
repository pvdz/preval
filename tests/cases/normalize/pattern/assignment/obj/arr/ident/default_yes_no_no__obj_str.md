# Preval test case

# default_yes_no_no__obj_str.md

> normalize > pattern >  > param > obj > arr > ident > default_yes_no_no__obj_str
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
({ x: [y = 'fail'] } = { x: 'abc', a: 11, b: 12 });
$(y);
`````

## Normalized

`````js filename=intro
var objAssignPatternRhs;
var objPatternNoDefault;
var arrPatternSplat;
var arrPatternBeforeDefault;
var y;
objAssignPatternRhs = { x: 'abc', a: 11, b: 12 };
objPatternNoDefault = objAssignPatternRhs.x;
arrPatternSplat = [...objPatternNoDefault];
arrPatternBeforeDefault = arrPatternSplat[0];
{
  let ifTestTmp = arrPatternBeforeDefault === undefined;
  if (ifTestTmp) {
    y = 'fail';
  } else {
    y = arrPatternBeforeDefault;
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
x = { x: 'str', x: 8, x: 8 };
x = x.x;
x = [...x];
x = x[8];
{
  var x = x * x;
  if (x) {
    x = 'str';
  } else {
    x = x;
  }
}
x(x);
`````

## Output

`````js filename=intro
var objAssignPatternRhs;
var objPatternNoDefault;
var arrPatternSplat;
var arrPatternBeforeDefault;
var y;
objAssignPatternRhs = { x: 'abc', a: 11, b: 12 };
objPatternNoDefault = objAssignPatternRhs.x;
arrPatternSplat = [...objPatternNoDefault];
arrPatternBeforeDefault = arrPatternSplat[0];
let ifTestTmp = arrPatternBeforeDefault === undefined;
if (ifTestTmp) {
  y = 'fail';
} else {
  y = arrPatternBeforeDefault;
}
$(y);
`````
