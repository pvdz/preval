# Preval test case

# base.md

> normalize > pattern >  > param > obj > obj > base
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
({ x: {} = a } = { x: { x: 1, y: 2, z: 3 }, b: 11, c: 12 });
$('ok');
`````

## Normalized

`````js filename=intro
var objAssignPatternRhs;
var objPatternBeforeDefault;
var objPatternAfterDefault;
var tmpObjPropValue;
var tmpTernaryTest;
tmpObjPropValue = { x: 1, y: 2, z: 3 };
objAssignPatternRhs = { x: tmpObjPropValue, b: 11, c: 12 };
objPatternBeforeDefault = objAssignPatternRhs.x;
tmpTernaryTest = objPatternBeforeDefault === undefined;
if (tmpTernaryTest) {
  objPatternAfterDefault = a;
} else {
  objPatternAfterDefault = objPatternBeforeDefault;
}
$('ok');
`````

## Output

`````js filename=intro
var objAssignPatternRhs;
var objPatternBeforeDefault;
var objPatternAfterDefault;
var tmpObjPropValue;
var tmpTernaryTest;
tmpObjPropValue = { x: 1, y: 2, z: 3 };
objAssignPatternRhs = { x: tmpObjPropValue, b: 11, c: 12 };
objPatternBeforeDefault = objAssignPatternRhs.x;
tmpTernaryTest = objPatternBeforeDefault === undefined;
if (tmpTernaryTest) {
  objPatternAfterDefault = a;
} else {
  objPatternAfterDefault = objPatternBeforeDefault;
}
$('ok');
`````
