# Preval test case

# base.md

> Normalize > Pattern > Binding > Obj > Obj > Obj > Ident > Base
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
const {
  x: {
    y: { z },
  },
} = { x: { x: 13, y: { z: 1, a: 2, b: 3 }, z: 14 }, b: 11, c: 12 };
$(z);
`````

## Normalized

`````js filename=intro
const tmpObjLitVal$1 = 13;
const tmpObjLitVal$2 = { z: 1, a: 2, b: 3 };
const tmpObjLitVal = { x: tmpObjLitVal$1, y: tmpObjLitVal$2, z: 14 };
const $tdz$__pattern_after_default = { x: tmpObjLitVal, b: 11, c: 12 };
const objPatternNoDefault = $tdz$__pattern_after_default.x;
const objPatternNoDefault$1 = objPatternNoDefault.y;
const z = objPatternNoDefault$1.z;
$(z);
`````

## Output

`````js filename=intro
const tmpObjLitVal$2 = { z: 1, a: 2, b: 3 };
const tmpObjLitVal = { x: 13, y: tmpObjLitVal$2, z: 14 };
const $tdz$__pattern_after_default = { x: tmpObjLitVal, b: 11, c: 12 };
const objPatternNoDefault = $tdz$__pattern_after_default.x;
const objPatternNoDefault$1 = objPatternNoDefault.y;
const z = objPatternNoDefault$1.z;
$(z);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
