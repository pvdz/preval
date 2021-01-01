# Preval test case

# base.md

> normalize > pattern >  > param > arr > obj > arr > obj > base
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
([
  {
    x: [{}],
  },
] = [{ x: [{ a: 1, b: 2, c: 3 }, 12], y: 11 }, 10]);
$('ok');
`````

## Normalized

`````js filename=intro
var tmpElement;
var tmpElement_1;
var arrAssignPatternRhs;
var arrPatternSplat;
var arrPatternStep;
var objPatternNoDefault;
var arrPatternSplat_1;
var arrPatternStep_1;
tmpElement = { x: ((tmpElement_1 = { a: 1, b: 2, c: 3 }), [tmpElement_1, 12]), y: 11 };
arrAssignPatternRhs = arrAssignPatternRhs = [tmpElement, 10];
arrPatternSplat = [...arrAssignPatternRhs];
arrPatternStep = arrPatternSplat[0];
objPatternNoDefault = arrPatternStep.x;
arrPatternSplat_1 = [...objPatternNoDefault];
arrPatternStep_1 = arrPatternSplat_1[0];
$('ok');
`````

## Output

`````js filename=intro
var tmpElement;
var tmpElement_1;
var arrAssignPatternRhs;
var arrPatternSplat;
var arrPatternStep;
var objPatternNoDefault;
var arrPatternSplat_1;
var arrPatternStep_1;
tmpElement = { x: ((tmpElement_1 = { a: 1, b: 2, c: 3 }), [tmpElement_1, 12]), y: 11 };
arrAssignPatternRhs = arrAssignPatternRhs = [tmpElement, 10];
arrPatternSplat = [...arrAssignPatternRhs];
arrPatternStep = arrPatternSplat[0];
objPatternNoDefault = arrPatternStep.x;
arrPatternSplat_1 = [...objPatternNoDefault];
arrPatternStep_1 = arrPatternSplat_1[0];
$('ok');
`````
