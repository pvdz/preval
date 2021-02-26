# Preval test case

# base.md

> Normalize > Pattern > Param > Arr > Obj > Rest > Base
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
function f([{ ...x }]) {
  return x;
}
$(f([{ x: 1, y: 2, z: 3 }, 20, 30], 200));
`````

## Normalized

`````js filename=intro
let f = function (tmpParamPattern) {
  let arrPatternSplat = [...tmpParamPattern];
  let arrPatternStep = arrPatternSplat[0];
  const tmpCallCallee = objPatternRest;
  const tmpCalleeParam = arrPatternStep;
  const tmpCalleeParam$1 = [];
  const tmpCalleeParam$2 = undefined;
  let x = tmpCallCallee(tmpCalleeParam, tmpCalleeParam$1, tmpCalleeParam$2);
  return x;
};
const tmpCallCallee$1 = $;
const tmpCallCallee$2 = f;
const tmpArrElement = { x: 1, y: 2, z: 3 };
const tmpCalleeParam$4 = [tmpArrElement, 20, 30];
const tmpCalleeParam$5 = 200;
const tmpCalleeParam$3 = tmpCallCallee$2(tmpCalleeParam$4, tmpCalleeParam$5);
tmpCallCallee$1(tmpCalleeParam$3);
`````

## Output

`````js filename=intro
const f = function (tmpParamPattern) {
  const arrPatternSplat = [...tmpParamPattern];
  const arrPatternStep = arrPatternSplat[0];
  const tmpCalleeParam$1 = [];
  const x = objPatternRest(arrPatternStep, tmpCalleeParam$1, undefined);
  return x;
};
const tmpArrElement = { x: 1, y: 2, z: 3 };
const tmpCalleeParam$4 = [tmpArrElement, 20, 30];
const tmpCalleeParam$3 = f(tmpCalleeParam$4, 200);
$(tmpCalleeParam$3);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: { x: '1', y: '2', z: '3' }
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
