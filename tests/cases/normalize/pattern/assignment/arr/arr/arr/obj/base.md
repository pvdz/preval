# Preval test case

# base.md

> normalize > pattern > param > arr > arr > arr > obj > base
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
([[[[{}]]]] = [[[[{ x: 1 }, 6, 7], 4, 5], 20, 30], 40, 50]);
$('ok');
`````

## Normalized

`````js filename=intro
var arrAssignPatternRhs;
var arrPatternSplat;
var arrPatternStep;
var arrPatternSplat_1;
var arrPatternStep_1;
var arrPatternSplat_2;
var arrPatternStep_2;
var arrPatternSplat_3;
var arrPatternStep_3;
var objPatternCrashTest;
var tmpElement;
var tmpElement_1;
var tmpElement_2;
var tmpElement_3;
tmpElement_3 = { x: 1 };
tmpElement_2 = [tmpElement_3, 6, 7];
tmpElement_1 = [tmpElement_2, 4, 5];
tmpElement = [tmpElement_1, 20, 30];
arrAssignPatternRhs = [tmpElement, 40, 50];
arrPatternSplat = [...arrAssignPatternRhs];
arrPatternStep = arrPatternSplat[0];
arrPatternSplat_1 = [...arrPatternStep];
arrPatternStep_1 = arrPatternSplat_1[0];
arrPatternSplat_2 = [...arrPatternStep_1];
arrPatternStep_2 = arrPatternSplat_2[0];
arrPatternSplat_3 = [...arrPatternStep_2];
arrPatternStep_3 = arrPatternSplat_3[0];
{
  let tmpAssignLogicStmtOr = arrPatternStep_3 === undefined;
  if (tmpAssignLogicStmtOr) {
  } else {
    tmpAssignLogicStmtOr = arrPatternStep_3 === null;
  }
  if (tmpAssignLogicStmtOr) {
    objPatternCrashTest = arrPatternStep_3.cannotDestructureThis;
  } else {
    objPatternCrashTest = tmpAssignLogicStmtOr;
  }
}
arrAssignPatternRhs;
$('ok');
`````

## Output

`````js filename=intro
var arrAssignPatternRhs;
var arrPatternSplat;
var arrPatternStep;
var arrPatternSplat_1;
var arrPatternStep_1;
var arrPatternSplat_2;
var arrPatternStep_2;
var arrPatternSplat_3;
var arrPatternStep_3;
var objPatternCrashTest;
var tmpElement;
var tmpElement_1;
var tmpElement_2;
var tmpElement_3;
tmpElement_3 = { x: 1 };
tmpElement_2 = [tmpElement_3, 6, 7];
tmpElement_1 = [tmpElement_2, 4, 5];
tmpElement = [tmpElement_1, 20, 30];
arrAssignPatternRhs = [tmpElement, 40, 50];
arrPatternSplat = [...arrAssignPatternRhs];
arrPatternStep = arrPatternSplat[0];
arrPatternSplat_1 = [...arrPatternStep];
arrPatternStep_1 = arrPatternSplat_1[0];
arrPatternSplat_2 = [...arrPatternStep_1];
arrPatternStep_2 = arrPatternSplat_2[0];
arrPatternSplat_3 = [...arrPatternStep_2];
arrPatternStep_3 = arrPatternSplat_3[0];
let tmpAssignLogicStmtOr = arrPatternStep_3 === undefined;
if (tmpAssignLogicStmtOr) {
} else {
  tmpAssignLogicStmtOr = arrPatternStep_3 === null;
}
if (tmpAssignLogicStmtOr) {
  objPatternCrashTest = arrPatternStep_3.cannotDestructureThis;
} else {
  objPatternCrashTest = tmpAssignLogicStmtOr;
}
$('ok');
`````

## Result

Should call `$` with:
[['ok'], null];

Normalized calls: Same

Final output calls: Same
