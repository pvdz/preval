# Preval test case

# base.md

> Normalize > Pattern > Param > Arr > Obj > Arr > Rest > Base
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
function f([
  {
    x: [...y],
  },
]) {
  return y;
}
$(f([{ x: [1, 2, 3], y: 11 }, 20, 30], 200));
`````

## Pre Normal

`````js filename=intro
let f = function ($$0) {
  const tmpParamBare = $$0;
  debugger;
  let [
    {
      x: [...y],
    },
  ] = tmpParamBare;
  return y;
};
$(f([{ x: [1, 2, 3], y: 11 }, 20, 30], 200));
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
  let arrPatternSplat$1 = [...objPatternNoDefault];
  let y = arrPatternSplat$1.slice(0);
  return y;
};
const tmpCallCallee = $;
const tmpCallCallee$1 = f;
const tmpObjLitVal = [1, 2, 3];
const tmpArrElement = { x: tmpObjLitVal, y: 11 };
const tmpCalleeParam$1 = [tmpArrElement, 20, 30];
const tmpCalleeParam$3 = 200;
const tmpCalleeParam = tmpCallCallee$1(tmpCalleeParam$1, tmpCalleeParam$3);
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
const arrPatternSplat$1 = [1, 2, 3];
const y = arrPatternSplat$1.slice(0);
$(y);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: [1, 2, 3]
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
