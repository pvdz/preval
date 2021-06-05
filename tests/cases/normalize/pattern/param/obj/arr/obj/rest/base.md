# Preval test case

# base.md

> Normalize > Pattern > Param > Obj > Arr > Obj > Rest > Base
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
function f({ x: [{ ...y }] }) {
  return y;
}
$(f({ x: [{ x: 1, y: 2, c: 3 }, 13, 14], a: 11, b: 12 }, 10));
`````

## Pre Normal

`````js filename=intro
let f = function ($$0) {
  const tmpParamBare = $$0;
  debugger;
  let {
    x: [{ ...y }],
  } = tmpParamBare;
  return y;
};
$(f({ x: [{ x: 1, y: 2, c: 3 }, 13, 14], a: 11, b: 12 }, 10));
`````

## Normalized

`````js filename=intro
let f = function ($$0) {
  const tmpParamBare = $$0;
  debugger;
  let bindingPatternObjRoot = tmpParamBare;
  let objPatternNoDefault = bindingPatternObjRoot.x;
  let arrPatternSplat = [...objPatternNoDefault];
  let arrPatternStep = arrPatternSplat[0];
  const tmpCallCallee = objPatternRest;
  const tmpCalleeParam = arrPatternStep;
  const tmpCalleeParam$1 = [];
  const tmpCalleeParam$3 = undefined;
  let y = tmpCallCallee(tmpCalleeParam, tmpCalleeParam$1, tmpCalleeParam$3);
  return y;
};
const tmpCallCallee$1 = $;
const tmpCallCallee$3 = f;
const tmpArrElement = { x: 1, y: 2, c: 3 };
const tmpObjLitVal = [tmpArrElement, 13, 14];
const tmpCalleeParam$7 = { x: tmpObjLitVal, a: 11, b: 12 };
const tmpCalleeParam$9 = 10;
const tmpCalleeParam$5 = tmpCallCallee$3(tmpCalleeParam$7, tmpCalleeParam$9);
tmpCallCallee$1(tmpCalleeParam$5);
`````

## Output

`````js filename=intro
const tmpArrElement = { x: 1, y: 2, c: 3 };
const tmpCalleeParam$1 = [];
const y = objPatternRest(tmpArrElement, tmpCalleeParam$1, undefined);
$(y);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: { x: '1', y: '2', c: '3' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
