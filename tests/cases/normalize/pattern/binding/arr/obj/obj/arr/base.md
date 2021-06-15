# Preval test case

# base.md

> Normalize > Pattern > Binding > Arr > Obj > Obj > Arr > Base
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
const [
  {
    x: {
      y: [],
    },
  },
] = [{ x: { x: 13, y: [1, 2, 3], z: 31 }, y: 11 }, 10];
$('ok');
`````

## Pre Normal

`````js filename=intro
const [
  {
    x: {
      y: [],
    },
  },
] = [{ x: { x: 13, y: [1, 2, 3], z: 31 }, y: 11 }, 10];
$(`ok`);
`````

## Normalized

`````js filename=intro
const tmpObjLitVal$1 = 13;
const tmpObjLitVal$3 = [1, 2, 3];
const tmpObjLitVal = { x: tmpObjLitVal$1, y: tmpObjLitVal$3, z: 31 };
const tmpArrElement = { x: tmpObjLitVal, y: 11 };
const bindingPatternArrRoot = [tmpArrElement, 10];
const arrPatternSplat = [...bindingPatternArrRoot];
const arrPatternStep = arrPatternSplat[0];
const objPatternNoDefault = arrPatternStep.x;
const objPatternNoDefault$1 = objPatternNoDefault.y;
const arrPatternSplat$1 = [...objPatternNoDefault$1];
$(`ok`);
`````

## Output

`````js filename=intro
$(`ok`);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'ok'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
