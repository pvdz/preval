# Preval test case

# base.md

> Normalize > Pattern > Assignment > Arr > Obj > Arr > Ident > Base
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
([
  {
    x: [y],
  },
] = [{ x: [1, 2, 3] }, 20, 30]);
$(y);
`````

## Pre Normal

`````js filename=intro
[
  {
    x: [y],
  },
] = [{ x: [1, 2, 3] }, 20, 30];
$(y);
`````

## Normalized

`````js filename=intro
const tmpObjLitVal = [1, 2, 3];
const tmpArrElement = { x: tmpObjLitVal };
const arrAssignPatternRhs = [tmpArrElement, 20, 30];
const arrPatternSplat = [...arrAssignPatternRhs];
const arrPatternStep = arrPatternSplat[0];
const objPatternNoDefault = arrPatternStep.x;
const arrPatternSplat$1 = [...objPatternNoDefault];
y = arrPatternSplat$1[0];
$(y);
`````

## Output

`````js filename=intro
const tmpObjLitVal = [1, 2, 3];
const tmpArrElement = { x: tmpObjLitVal };
const arrAssignPatternRhs = [tmpArrElement, 20, 30];
const arrPatternSplat = [...arrAssignPatternRhs];
const arrPatternStep = arrPatternSplat[0];
const objPatternNoDefault = arrPatternStep.x;
const arrPatternSplat$1 = [...objPatternNoDefault];
y = arrPatternSplat$1[0];
$(y);
`````

## Globals

BAD@! Found 1 implicit global bindings:

y

## Result

Should call `$` with:
 - eval returned: ('<crash[ <ref> is not defined ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
