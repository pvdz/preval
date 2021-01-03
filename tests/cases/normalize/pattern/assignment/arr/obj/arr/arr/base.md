# Preval test case

# base.md

> normalize > pattern >  > param > arr > obj > arr > arr > base
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
([
  {
    x: [[]],
  },
] = [{ x: [[1, 2, 3], 10], y: 11 }, 20, 30]);
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
var arrPatternSplat_2;
tmpElement = { x: ((tmpElement_1 = [1, 2, 3]), [tmpElement_1, 10]), y: 11 };
arrAssignPatternRhs = [tmpElement, 20, 30];
arrPatternSplat = [...arrAssignPatternRhs];
arrPatternStep = arrPatternSplat[0];
objPatternNoDefault = arrPatternStep.x;
arrPatternSplat_1 = [...objPatternNoDefault];
arrPatternStep_1 = arrPatternSplat_1[0];
arrPatternSplat_2 = [...arrPatternStep_1];
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
var arrPatternSplat_2;
tmpElement = { x: ((tmpElement_1 = [1, 2, 3]), [tmpElement_1, 10]), y: 11 };
arrAssignPatternRhs = [tmpElement, 20, 30];
arrPatternSplat = [...arrAssignPatternRhs];
arrPatternStep = arrPatternSplat[0];
objPatternNoDefault = arrPatternStep.x;
arrPatternSplat_1 = [...objPatternNoDefault];
arrPatternStep_1 = arrPatternSplat_1[0];
arrPatternSplat_2 = [...arrPatternStep_1];
$('ok');
`````