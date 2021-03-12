# Preval test case

# base.md

> Normalize > Pattern > Param > Arr > Obj > Arr > Arr > Base
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
function f([
  {
    x: [[]],
  },
]) {
  return 'ok';
}
$(f([{ x: [[1, 2, 3], 10], y: 11 }, 20, 30], 200));
`````

## Pre Normal

`````js filename=intro
let f = function (tmpParamPattern) {
  let [
    {
      x: [[]],
    },
  ] = tmpParamPattern;
  return 'ok';
};
$(f([{ x: [[1, 2, 3], 10], y: 11 }, 20, 30], 200));
`````

## Normalized

`````js filename=intro
let f = function (tmpParamPattern) {
  let bindingPatternArrRoot = tmpParamPattern;
  let arrPatternSplat = [...bindingPatternArrRoot];
  let arrPatternStep = arrPatternSplat[0];
  let objPatternNoDefault = arrPatternStep.x;
  let arrPatternSplat$1 = [...objPatternNoDefault];
  let arrPatternStep$1 = arrPatternSplat$1[0];
  let arrPatternSplat$2 = [...arrPatternStep$1];
  return 'ok';
};
const tmpCallCallee = $;
const tmpCallCallee$1 = f;
const tmpArrElement$1 = [1, 2, 3];
const tmpObjLitVal = [tmpArrElement$1, 10];
const tmpArrElement = { x: tmpObjLitVal, y: 11 };
const tmpCalleeParam$1 = [tmpArrElement, 20, 30];
const tmpCalleeParam$2 = 200;
const tmpCalleeParam = tmpCallCallee$1(tmpCalleeParam$1, tmpCalleeParam$2);
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
const f = function (tmpParamPattern) {
  const arrPatternSplat = [...tmpParamPattern];
  const arrPatternStep = arrPatternSplat[0];
  const objPatternNoDefault = arrPatternStep.x;
  const arrPatternSplat$1 = [...objPatternNoDefault];
  const arrPatternStep$1 = arrPatternSplat$1[0];
  [...arrPatternStep$1];
  return 'ok';
};
const tmpArrElement$1 = [1, 2, 3];
const tmpObjLitVal = [tmpArrElement$1, 10];
const tmpArrElement = { x: tmpObjLitVal, y: 11 };
const tmpCalleeParam$1 = [tmpArrElement, 20, 30];
const tmpCalleeParam = f(tmpCalleeParam$1, 200);
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
