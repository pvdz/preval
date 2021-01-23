# Preval test case

# base.md

> normalize > pattern > param > arr > arr > arr > ident > base
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
([[[x]]] = [[[[1, 2, 3], 4, 5], 20, 30], 40, 50]);
$(x);
`````

## Normalized

`````js filename=intro
var arrAssignPatternRhs;
var arrPatternSplat;
var arrPatternStep;
var arrPatternSplat$1;
var arrPatternStep$1;
var arrPatternSplat$2;
var tmpElement;
var tmpElement$1;
var tmpElement$2;
tmpElement$2 = [1, 2, 3];
tmpElement$1 = [tmpElement$2, 4, 5];
tmpElement = [tmpElement$1, 20, 30];
arrAssignPatternRhs = [tmpElement, 40, 50];
arrPatternSplat = [...arrAssignPatternRhs];
arrPatternStep = arrPatternSplat[0];
arrPatternSplat$1 = [...arrPatternStep];
arrPatternStep$1 = arrPatternSplat$1[0];
arrPatternSplat$2 = [...arrPatternStep$1];
x = arrPatternSplat$2[0];
arrAssignPatternRhs;
$(x);
`````

## Output

`````js filename=intro
var arrAssignPatternRhs;
var arrPatternSplat;
var arrPatternStep;
var arrPatternSplat$1;
var arrPatternStep$1;
var arrPatternSplat$2;
var tmpElement;
var tmpElement$1;
var tmpElement$2;
tmpElement$2 = [1, 2, 3];
tmpElement$1 = [tmpElement$2, 4, 5];
tmpElement = [tmpElement$1, 20, 30];
arrAssignPatternRhs = [tmpElement, 40, 50];
arrPatternSplat = [...arrAssignPatternRhs];
arrPatternStep = arrPatternSplat[0];
arrPatternSplat$1 = [...arrPatternStep];
arrPatternStep$1 = arrPatternSplat$1[0];
arrPatternSplat$2 = [...arrPatternStep$1];
x = arrPatternSplat$2[0];
$(x);
`````

## Result

Should call `$` with:
 - 0: [1,2,3]
 - 1: undefined

Normalized calls: Same

Final output calls: Same
