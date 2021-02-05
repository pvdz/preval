# Preval test case

# base.md

> normalize > pattern >  > param > obj > obj > arr > rest > base
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
const {
  x: {
    y: [...z],
  },
} = { x: { x: 13, y: [1, 2, 3], z: 14 }, b: 11, c: 12 };
$(z);
`````

## Normalized

`````js filename=intro
const tmpObjLitVal$1 = 13;
const tmpObjLitVal$2 = [1, 2, 3];
const tmpObjLitVal = { x: tmpObjLitVal$1, y: tmpObjLitVal$2, z: 14 };
const bindingPatternObjRoot = { x: tmpObjLitVal, b: 11, c: 12 };
const objPatternNoDefault = bindingPatternObjRoot.x;
const objPatternNoDefault$1 = objPatternNoDefault.y;
const arrPatternSplat = [...objPatternNoDefault$1];
const z = arrPatternSplat.slice(0);
$(z);
`````

## Output

`````js filename=intro
const tmpObjLitVal$2 = [1, 2, 3];
const tmpObjLitVal = { x: 13, y: tmpObjLitVal$2, z: 14 };
const bindingPatternObjRoot = { x: tmpObjLitVal, b: 11, c: 12 };
const objPatternNoDefault = bindingPatternObjRoot.x;
const objPatternNoDefault$1 = objPatternNoDefault.y;
const arrPatternSplat = [...objPatternNoDefault$1];
const z = arrPatternSplat.slice(0);
$(z);
`````

## Result

Should call `$` with:
 - 1: [1, 2, 3]
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
