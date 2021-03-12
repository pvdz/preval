# Preval test case

# base.md

> Normalize > Pattern > Param > Arr > Obj > Arr > Ident > Base
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
function f([
  {
    x: [y],
  },
]) {
  return y;
}
$(f([{ x: [1, 2, 3] }, 20, 30], 200));
`````

## Normalized

`````js filename=intro
let f = function (tmpParamPattern) {
  let bindingPatternArrRoot = tmpParamPattern;
  let arrPatternSplat = [...bindingPatternArrRoot];
  let arrPatternStep = arrPatternSplat[0];
  let objPatternNoDefault = arrPatternStep.x;
  let arrPatternSplat$1 = [...objPatternNoDefault];
  let y = arrPatternSplat$1[0];
  return y;
};
const tmpCallCallee = $;
const tmpCallCallee$1 = f;
const tmpObjLitVal = [1, 2, 3];
const tmpArrElement = { x: tmpObjLitVal };
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
  const y = arrPatternSplat$1[0];
  return y;
};
const tmpObjLitVal = [1, 2, 3];
const tmpArrElement = { x: tmpObjLitVal };
const tmpCalleeParam$1 = [tmpArrElement, 20, 30];
const tmpCalleeParam = f(tmpCalleeParam$1, 200);
$(tmpCalleeParam);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
