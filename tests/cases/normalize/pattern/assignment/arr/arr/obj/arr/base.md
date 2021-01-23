# Preval test case

# base.md

> normalize > pattern >  > param > arr > arr > obj > arr > base
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
([
  [
    {
      x: [],
    },
  ],
] = [[{ x: [1, 2, 3] }, 20, 30], 40, 50]);
$('ok');
`````

## Normalized

`````js filename=intro
var arrAssignPatternRhs;
var arrPatternSplat;
var arrPatternStep;
var arrPatternSplat$1;
var arrPatternStep$1;
var objPatternNoDefault;
var arrPatternSplat$2;
var tmpElement;
var tmpElement$1;
var tmpObjPropValue;
tmpObjPropValue = [1, 2, 3];
tmpElement$1 = { x: tmpObjPropValue };
tmpElement = [tmpElement$1, 20, 30];
arrAssignPatternRhs = [tmpElement, 40, 50];
arrPatternSplat = [...arrAssignPatternRhs];
arrPatternStep = arrPatternSplat[0];
arrPatternSplat$1 = [...arrPatternStep];
arrPatternStep$1 = arrPatternSplat$1[0];
objPatternNoDefault = arrPatternStep$1.x;
arrPatternSplat$2 = [...objPatternNoDefault];
arrAssignPatternRhs;
$('ok');
`````

## Output

`````js filename=intro
var arrAssignPatternRhs;
var arrPatternSplat;
var arrPatternStep;
var arrPatternSplat$1;
var arrPatternStep$1;
var objPatternNoDefault;
var arrPatternSplat$2;
var tmpElement;
var tmpElement$1;
var tmpObjPropValue;
tmpObjPropValue = [1, 2, 3];
tmpElement$1 = { x: tmpObjPropValue };
tmpElement = [tmpElement$1, 20, 30];
arrAssignPatternRhs = [tmpElement, 40, 50];
arrPatternSplat = [...arrAssignPatternRhs];
arrPatternStep = arrPatternSplat[0];
arrPatternSplat$1 = [...arrPatternStep];
arrPatternStep$1 = arrPatternSplat$1[0];
objPatternNoDefault = arrPatternStep$1.x;
arrPatternSplat$2 = [...objPatternNoDefault];
$('ok');
`````

## Result

Should call `$` with:
 - 0: "ok"
 - 1: undefined

Normalized calls: Same

Final output calls: Same
