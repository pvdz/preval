# Preval test case

# base.md

> Normalize > Pattern > Param > Arr > Obj > Obj > Arr > Base
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
function f([
  {
    x: {
      y: [],
    },
  },
]) {
  return 'ok';
}
$(f([{ x: { x: 13, y: [1, 2, 3], z: 31 }, y: 11 }, 10], 100));
`````

## Pre Normal

`````js filename=intro
let f = function ($$0) {
  const tmpParamBare = $$0;
  debugger;
  let [
    {
      x: {
        y: [],
      },
    },
  ] = tmpParamBare;
  return 'ok';
};
$(f([{ x: { x: 13, y: [1, 2, 3], z: 31 }, y: 11 }, 10], 100));
`````

## Normalized

`````js filename=intro
let f = function ($$0) {
  const tmpParamBare = $$0;
  debugger;
  let bindingPatternArrRoot = tmpParamBare;
  let arrPatternSplat = [...bindingPatternArrRoot];
  let arrPatternStep = arrPatternSplat[0];
  let objPatternNoDefault = arrPatternStep.x;
  let objPatternNoDefault$1 = objPatternNoDefault.y;
  let arrPatternSplat$1 = [...objPatternNoDefault$1];
  return 'ok';
};
const tmpCallCallee = $;
const tmpCallCallee$1 = f;
const tmpObjLitVal$1 = 13;
const tmpObjLitVal$3 = [1, 2, 3];
const tmpObjLitVal = { x: tmpObjLitVal$1, y: tmpObjLitVal$3, z: 31 };
const tmpArrElement = { x: tmpObjLitVal, y: 11 };
const tmpCalleeParam$1 = [tmpArrElement, 10];
const tmpCalleeParam$3 = 100;
const tmpCalleeParam = tmpCallCallee$1(tmpCalleeParam$1, tmpCalleeParam$3);
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
$('ok');
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
