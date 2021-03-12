# Preval test case

# base.md

> Normalize > Pattern > Param > Obj > Obj > Obj > Obj > Base
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
function f({
  x: {
    y: {
      z: {},
    },
  },
}) {
  return 'ok';
}
$(f({ x: { x: 13, y: { z: { a: 1, b: 2, c: 3 }, a: 15, b: 16 }, z: 14 }, b: 11, c: 12 }, 10));
`````

## Normalized

`````js filename=intro
let f = function (tmpParamPattern) {
  let bindingPatternObjRoot = tmpParamPattern;
  let objPatternNoDefault = bindingPatternObjRoot.x;
  let objPatternNoDefault$1 = objPatternNoDefault.y;
  let objPatternNoDefault$2 = objPatternNoDefault$1.z;
  let objPatternCrashTest = objPatternNoDefault$2 === undefined;
  if (objPatternCrashTest) {
  } else {
    objPatternCrashTest = objPatternNoDefault$2 === null;
  }
  if (objPatternCrashTest) {
    objPatternCrashTest = objPatternNoDefault$2.cannotDestructureThis;
    return 'ok';
  } else {
    return 'ok';
  }
};
const tmpCallCallee = $;
const tmpCallCallee$1 = f;
const tmpObjLitVal$1 = 13;
const tmpObjLitVal$3 = { a: 1, b: 2, c: 3 };
const tmpObjLitVal$2 = { z: tmpObjLitVal$3, a: 15, b: 16 };
const tmpObjLitVal = { x: tmpObjLitVal$1, y: tmpObjLitVal$2, z: 14 };
const tmpCalleeParam$1 = { x: tmpObjLitVal, b: 11, c: 12 };
const tmpCalleeParam$2 = 10;
const tmpCalleeParam = tmpCallCallee$1(tmpCalleeParam$1, tmpCalleeParam$2);
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
const f = function (tmpParamPattern) {
  const objPatternNoDefault = tmpParamPattern.x;
  const objPatternNoDefault$1 = objPatternNoDefault.y;
  const objPatternNoDefault$2 = objPatternNoDefault$1.z;
  let objPatternCrashTest = objPatternNoDefault$2 === undefined;
  if (objPatternCrashTest) {
  } else {
    objPatternCrashTest = objPatternNoDefault$2 === null;
  }
  if (objPatternCrashTest) {
    objPatternNoDefault$2.cannotDestructureThis;
    return 'ok';
  } else {
    return 'ok';
  }
};
const tmpObjLitVal$3 = { a: 1, b: 2, c: 3 };
const tmpObjLitVal$2 = { z: tmpObjLitVal$3, a: 15, b: 16 };
const tmpObjLitVal = { x: 13, y: tmpObjLitVal$2, z: 14 };
const tmpCalleeParam$1 = { x: tmpObjLitVal, b: 11, c: 12 };
const tmpCalleeParam = f(tmpCalleeParam$1, 10);
$(tmpCalleeParam);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'ok'
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
