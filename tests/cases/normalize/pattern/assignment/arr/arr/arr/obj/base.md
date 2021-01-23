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
var arrPatternSplat$1;
var arrPatternSplat$2;
var arrPatternSplat$3;
var arrPatternStep;
var arrPatternStep$1;
var arrPatternStep$2;
var arrPatternStep$3;
var objPatternCrashTest;
var tmpElement;
var tmpElement$1;
var tmpElement$2;
var tmpElement$3;
tmpElement$3 = { x: 1 };
tmpElement$2 = [tmpElement$3, 6, 7];
tmpElement$1 = [tmpElement$2, 4, 5];
tmpElement = [tmpElement$1, 20, 30];
arrAssignPatternRhs = [tmpElement, 40, 50];
arrPatternSplat = [...arrAssignPatternRhs];
arrPatternStep = arrPatternSplat[0];
arrPatternSplat$1 = [...arrPatternStep];
arrPatternStep$1 = arrPatternSplat$1[0];
arrPatternSplat$2 = [...arrPatternStep$1];
arrPatternStep$2 = arrPatternSplat$2[0];
arrPatternSplat$3 = [...arrPatternStep$2];
arrPatternStep$3 = arrPatternSplat$3[0];
{
  let tmpAssignLogicStmtOr = arrPatternStep$3 === undefined;
  if (tmpAssignLogicStmtOr) {
  } else {
    tmpAssignLogicStmtOr = arrPatternStep$3 === null;
  }
  if (tmpAssignLogicStmtOr) {
    objPatternCrashTest = arrPatternStep$3.cannotDestructureThis;
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
var arrPatternSplat$1;
var arrPatternSplat$2;
var arrPatternSplat$3;
var arrPatternStep;
var arrPatternStep$1;
var arrPatternStep$2;
var arrPatternStep$3;
var objPatternCrashTest;
var tmpElement;
var tmpElement$1;
var tmpElement$2;
var tmpElement$3;
tmpElement$3 = { x: 1 };
tmpElement$2 = [tmpElement$3, 6, 7];
tmpElement$1 = [tmpElement$2, 4, 5];
tmpElement = [tmpElement$1, 20, 30];
arrAssignPatternRhs = [tmpElement, 40, 50];
arrPatternSplat = [...arrAssignPatternRhs];
arrPatternStep = arrPatternSplat[0];
arrPatternSplat$1 = [...arrPatternStep];
arrPatternStep$1 = arrPatternSplat$1[0];
arrPatternSplat$2 = [...arrPatternStep$1];
arrPatternStep$2 = arrPatternSplat$2[0];
arrPatternSplat$3 = [...arrPatternStep$2];
arrPatternStep$3 = arrPatternSplat$3[0];
let tmpAssignLogicStmtOr = arrPatternStep$3 === undefined;
if (tmpAssignLogicStmtOr) {
} else {
  tmpAssignLogicStmtOr = arrPatternStep$3 === null;
}
if (tmpAssignLogicStmtOr) {
  objPatternCrashTest = arrPatternStep$3.cannotDestructureThis;
} else {
  objPatternCrashTest = tmpAssignLogicStmtOr;
}
$('ok');
`````

## Result

Should call `$` with:
 - 0: "ok"
 - 1: undefined

Normalized calls: Same

Final output calls: Same
