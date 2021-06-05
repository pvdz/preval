# Preval test case

# base.md

> Normalize > Pattern > Param > Arr > Obj > Obj > Rest > Base
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
function f([
  {
    x: { ...y },
  },
]) {
  return y;
}
$(f([{ x: { a: 1, b: 2, c: 3 }, y: 11 }, 10], 100));
`````

## Pre Normal

`````js filename=intro
let f = function ($$0) {
  const tmpParamBare = $$0;
  debugger;
  let [
    {
      x: { ...y },
    },
  ] = tmpParamBare;
  return y;
};
$(f([{ x: { a: 1, b: 2, c: 3 }, y: 11 }, 10], 100));
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
  const tmpCallCallee = objPatternRest;
  const tmpCalleeParam = objPatternNoDefault;
  const tmpCalleeParam$1 = [];
  const tmpCalleeParam$3 = undefined;
  let y = tmpCallCallee(tmpCalleeParam, tmpCalleeParam$1, tmpCalleeParam$3);
  return y;
};
const tmpCallCallee$1 = $;
const tmpCallCallee$3 = f;
const tmpObjLitVal = { a: 1, b: 2, c: 3 };
const tmpArrElement = { x: tmpObjLitVal, y: 11 };
const tmpCalleeParam$7 = [tmpArrElement, 10];
const tmpCalleeParam$9 = 100;
const tmpCalleeParam$5 = tmpCallCallee$3(tmpCalleeParam$7, tmpCalleeParam$9);
tmpCallCallee$1(tmpCalleeParam$5);
`````

## Output

`````js filename=intro
const tmpObjLitVal = { a: 1, b: 2, c: 3 };
const tmpCalleeParam$1 = [];
const y = objPatternRest(tmpObjLitVal, tmpCalleeParam$1, undefined);
$(y);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: { a: '1', b: '2', c: '3' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
