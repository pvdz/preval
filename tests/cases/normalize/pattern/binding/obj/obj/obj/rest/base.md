# Preval test case

# base.md

> normalize > pattern >  > param > obj > obj > obj > rest > base
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
const {
  x: {
    y: { ...z },
  },
} = { x: { x: 13, y: { z: 1, a: 2, b: 3 }, z: 14 }, b: 11, c: 12 };
$(z);
`````

## Normalized

`````js filename=intro
const tmpObjLitVal$1 = 13;
const tmpObjLitVal$2 = { z: 1, a: 2, b: 3 };
const tmpObjLitVal = { x: tmpObjLitVal$1, y: tmpObjLitVal$2, z: 14 };
const bindingPatternObjRoot = { x: tmpObjLitVal, b: 11, c: 12 };
const objPatternNoDefault = bindingPatternObjRoot.x;
const objPatternNoDefault$1 = objPatternNoDefault.y;
const tmpCallCallee = objPatternRest;
const tmpCalleeParam = objPatternNoDefault$1;
const tmpCalleeParam$1 = [];
const tmpCalleeParam$2 = undefined;
const z = tmpCallCallee(tmpCalleeParam, tmpCalleeParam$1, tmpCalleeParam$2);
$(z);
`````

## Output

`````js filename=intro
const tmpObjLitVal$2 = { z: 1, a: 2, b: 3 };
const tmpObjLitVal = { x: 13, y: tmpObjLitVal$2, z: 14 };
const bindingPatternObjRoot = { x: tmpObjLitVal, b: 11, c: 12 };
const objPatternNoDefault = bindingPatternObjRoot.x;
const objPatternNoDefault$1 = objPatternNoDefault.y;
const tmpCalleeParam = objPatternNoDefault$1;
const tmpCalleeParam$1 = [];
const z = objPatternRest(tmpCalleeParam, tmpCalleeParam$1, undefined);
$(z);
`````

## Result

Should call `$` with:
 - 1: { z: '1', a: '2', b: '3' }
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
