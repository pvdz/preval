# Preval test case

# base.md

> normalize > pattern >  > param > obj > obj > obj > arr > base
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
({
  x: {
    y: {
      z: [],
    },
  },
} = { x: { x: 13, y: { z: [1, 2, 3], a: 15, b: 16 }, z: 14 }, b: 11, c: 12 });
$('ok');
`````

## Normalized

`````js filename=intro
const tmpObjLitVal$1 = 13;
const tmpObjLitVal$3 = [1, 2, 3];
const tmpObjLitVal$2 = { z: tmpObjLitVal$3, a: 15, b: 16 };
const tmpObjLitVal = { x: tmpObjLitVal$1, y: tmpObjLitVal$2, z: 14 };
const tmpAssignObjPatternRhs = { x: tmpObjLitVal, b: 11, c: 12 };
const objPatternNoDefault = tmpAssignObjPatternRhs.x;
const objPatternNoDefault$1 = objPatternNoDefault.y;
const objPatternNoDefault$2 = objPatternNoDefault$1.z;
const arrPatternSplat = [...objPatternNoDefault$2];
$('ok');
`````

## Output

`````js filename=intro
const tmpObjLitVal$3 = [1, 2, 3];
const tmpObjLitVal$2 = { z: tmpObjLitVal$3, a: 15, b: 16 };
const tmpObjLitVal = { x: 13, y: tmpObjLitVal$2, z: 14 };
const tmpAssignObjPatternRhs = { x: tmpObjLitVal, b: 11, c: 12 };
const objPatternNoDefault = tmpAssignObjPatternRhs.x;
const objPatternNoDefault$1 = objPatternNoDefault.y;
const objPatternNoDefault$2 = objPatternNoDefault$1.z;
[...objPatternNoDefault$2];
$('ok');
`````

## Result

Should call `$` with:
 - 1: 'ok'
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
