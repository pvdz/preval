# Preval test case

# base.md

> normalize > pattern >  > param > obj > arr > obj > arr > base
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
const {
  x: [
    {
      y: [],
    },
  ],
} = { x: [{ x: 15, y: [1, 2, 3], c: 16 }, 13, 14], a: 11, b: 12 };
$('ok');
`````

## Normalized

`````js filename=intro
const tmpObjLitVal$1 = 15;
const tmpObjLitVal$2 = [1, 2, 3];
const tmpArrElement = { x: tmpObjLitVal$1, y: tmpObjLitVal$2, c: 16 };
const tmpObjLitVal = [tmpArrElement, 13, 14];
const bindingPatternObjRoot = { x: tmpObjLitVal, a: 11, b: 12 };
const objPatternNoDefault = bindingPatternObjRoot.x;
const arrPatternSplat = [...objPatternNoDefault];
const arrPatternStep = arrPatternSplat[0];
const objPatternNoDefault$1 = arrPatternStep.y;
const arrPatternSplat$1 = [...objPatternNoDefault$1];
$('ok');
`````

## Output

`````js filename=intro
const tmpObjLitVal$2 = [1, 2, 3];
const tmpArrElement = { x: 15, y: tmpObjLitVal$2, c: 16 };
const tmpObjLitVal = [tmpArrElement, 13, 14];
const bindingPatternObjRoot = { x: tmpObjLitVal, a: 11, b: 12 };
const objPatternNoDefault = bindingPatternObjRoot.x;
const arrPatternSplat = [...objPatternNoDefault];
const arrPatternStep = arrPatternSplat[0];
const objPatternNoDefault$1 = arrPatternStep.y;
const arrPatternSplat$1 = [...objPatternNoDefault$1];
$('ok');
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'ok'
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
