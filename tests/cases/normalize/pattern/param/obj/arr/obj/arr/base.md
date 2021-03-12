# Preval test case

# base.md

> Normalize > Pattern > Param > Obj > Arr > Obj > Arr > Base
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
function f({
  x: [
    {
      y: [],
    },
  ],
}) {
  return 'ok';
}
$(f({ x: [{ x: 15, y: [1, 2, 3], c: 16 }, 13, 14], a: 11, b: 12 }, 10));
`````

## Pre Normal

`````js filename=intro
let f = function (tmpParamPattern) {
  let {
    x: [
      {
        y: [],
      },
    ],
  } = tmpParamPattern;
  return 'ok';
};
$(f({ x: [{ x: 15, y: [1, 2, 3], c: 16 }, 13, 14], a: 11, b: 12 }, 10));
`````

## Normalized

`````js filename=intro
let f = function (tmpParamPattern) {
  let bindingPatternObjRoot = tmpParamPattern;
  let objPatternNoDefault = bindingPatternObjRoot.x;
  let arrPatternSplat = [...objPatternNoDefault];
  let arrPatternStep = arrPatternSplat[0];
  let objPatternNoDefault$1 = arrPatternStep.y;
  let arrPatternSplat$1 = [...objPatternNoDefault$1];
  return 'ok';
};
const tmpCallCallee = $;
const tmpCallCallee$1 = f;
const tmpObjLitVal$1 = 15;
const tmpObjLitVal$2 = [1, 2, 3];
const tmpArrElement = { x: tmpObjLitVal$1, y: tmpObjLitVal$2, c: 16 };
const tmpObjLitVal = [tmpArrElement, 13, 14];
const tmpCalleeParam$1 = { x: tmpObjLitVal, a: 11, b: 12 };
const tmpCalleeParam$2 = 10;
const tmpCalleeParam = tmpCallCallee$1(tmpCalleeParam$1, tmpCalleeParam$2);
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
const f = function (tmpParamPattern) {
  const objPatternNoDefault = tmpParamPattern.x;
  const arrPatternSplat = [...objPatternNoDefault];
  const arrPatternStep = arrPatternSplat[0];
  const objPatternNoDefault$1 = arrPatternStep.y;
  [...objPatternNoDefault$1];
  return 'ok';
};
const tmpObjLitVal$2 = [1, 2, 3];
const tmpArrElement = { x: 15, y: tmpObjLitVal$2, c: 16 };
const tmpObjLitVal = [tmpArrElement, 13, 14];
const tmpCalleeParam$1 = { x: tmpObjLitVal, a: 11, b: 12 };
const tmpCalleeParam = f(tmpCalleeParam$1, 10);
$(tmpCalleeParam);
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
