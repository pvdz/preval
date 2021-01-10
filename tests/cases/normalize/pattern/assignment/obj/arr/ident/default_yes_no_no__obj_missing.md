# Preval test case

# default_yes_no_no__obj_missing.md

> normalize > pattern >  > param > obj > arr > ident > default_yes_no_no__obj_missing
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
({ x: [y = 'fail'] } = { a: 11, b: 12 });
$('bad');
`````

## Normalized

`````js filename=intro
var objAssignPatternRhs;
var objPatternNoDefault;
var arrPatternSplat;
var arrPatternBeforeDefault;
var y;
objAssignPatternRhs = { a: 11, b: 12 };
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
$('bad');
`````

## Uniformed

`````js filename=intro
var x;
var x;
var x;
var x;
var x;
x = { x: 8, x: 8 };
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
x('str');
`````

## Output

`````js filename=intro
var objAssignPatternRhs;
var objPatternNoDefault;
var arrPatternSplat;
var arrPatternBeforeDefault;
var y;
objAssignPatternRhs = { a: 11, b: 12 };
objPatternNoDefault = objAssignPatternRhs.x;
arrPatternSplat = [...objPatternNoDefault];
arrPatternBeforeDefault = arrPatternSplat[0];
let ifTestTmp = arrPatternBeforeDefault === undefined;
if (ifTestTmp) {
  y = 'fail';
} else {
  y = arrPatternBeforeDefault;
}
$('bad');
`````
