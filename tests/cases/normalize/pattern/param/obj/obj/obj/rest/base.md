# Preval test case

# base.md

> normalize > pattern >  > param > obj > obj > obj > rest > base
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
function f({
  x: {
    y: { ...z },
  },
}) {
  return z;
}
$(f({ x: { x: 13, y: { z: 1, a: 2, b: 3 }, z: 14 }, b: 11, c: 12 }, 10));
`````

## Normalized

`````js filename=intro
function f(tmpParamPattern) {
  let objPatternNoDefault = tmpParamPattern.x;
  let objPatternNoDefault$1 = objPatternNoDefault.y;
  const tmpCallCallee = objPatternRest;
  const tmpCalleeParam = objPatternNoDefault$1;
  const tmpCalleeParam$1 = [];
  const tmpCalleeParam$2 = undefined;
  let z = tmpCallCallee(tmpCalleeParam, tmpCalleeParam$1, tmpCalleeParam$2);
  return z;
}
const tmpCallCallee$1 = $;
const tmpCallCallee$2 = f;
const tmpObjLitVal$1 = 13;
const tmpObjLitVal$2 = { z: 1, a: 2, b: 3 };
const tmpObjLitVal = { x: tmpObjLitVal$1, y: tmpObjLitVal$2, z: 14 };
const tmpCalleeParam$4 = { x: tmpObjLitVal, b: 11, c: 12 };
const tmpCalleeParam$5 = 10;
const tmpCalleeParam$3 = tmpCallCallee$2(tmpCalleeParam$4, tmpCalleeParam$5);
tmpCallCallee$1(tmpCalleeParam$3);
`````

## Output

`````js filename=intro
function f(tmpParamPattern) {
  let objPatternNoDefault = tmpParamPattern.x;
  let objPatternNoDefault$1 = objPatternNoDefault.y;
  const tmpCalleeParam$1 = [];
  let z = objPatternRest(objPatternNoDefault$1, tmpCalleeParam$1, undefined);
  return z;
}
const tmpObjLitVal$2 = { z: 1, a: 2, b: 3 };
const tmpObjLitVal = { x: 13, y: tmpObjLitVal$2, z: 14 };
const tmpCalleeParam$4 = { x: tmpObjLitVal, b: 11, c: 12 };
const tmpCalleeParam$3 = f(tmpCalleeParam$4, 10);
$(tmpCalleeParam$3);
`````

## Result

Should call `$` with:
 - 1: { z: '1', a: '2', b: '3' }
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
