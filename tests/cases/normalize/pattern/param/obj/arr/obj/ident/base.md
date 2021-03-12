# Preval test case

# base.md

> Normalize > Pattern > Param > Obj > Arr > Obj > Ident > Base
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
function f({ x: [{ y }] }) {
  return y;
}
$(f({ x: [{ x: 1, y: 2, c: 3 }, 13, 14], a: 11, b: 12 }, 10));
`````

## Pre Normal

`````js filename=intro
let f = function (tmpParamPattern) {
  let {
    x: [{ y }],
  } = tmpParamPattern;
  return y;
};
$(f({ x: [{ x: 1, y: 2, c: 3 }, 13, 14], a: 11, b: 12 }, 10));
`````

## Normalized

`````js filename=intro
let f = function (tmpParamPattern) {
  let bindingPatternObjRoot = tmpParamPattern;
  let objPatternNoDefault = bindingPatternObjRoot.x;
  let arrPatternSplat = [...objPatternNoDefault];
  let arrPatternStep = arrPatternSplat[0];
  let y = arrPatternStep.y;
  return y;
};
const tmpCallCallee = $;
const tmpCallCallee$1 = f;
const tmpArrElement = { x: 1, y: 2, c: 3 };
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
  const y = arrPatternStep.y;
  return y;
};
const tmpArrElement = { x: 1, y: 2, c: 3 };
const tmpObjLitVal = [tmpArrElement, 13, 14];
const tmpCalleeParam$1 = { x: tmpObjLitVal, a: 11, b: 12 };
const tmpCalleeParam = f(tmpCalleeParam$1, 10);
$(tmpCalleeParam);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
