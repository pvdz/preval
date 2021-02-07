# Preval test case

# base.md

> normalize > pattern >  > param > arr > obj > arr > rest > base
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

## Normalized

`````js filename=intro
function f(tmpParamPattern) {
  let arrPatternSplat = [...tmpParamPattern];
  let arrPatternStep = arrPatternSplat[0];
  let objPatternNoDefault = arrPatternStep.x;
  let arrPatternSplat$1 = [...objPatternNoDefault];
  let y = arrPatternSplat$1.slice(0);
  return y;
}
const tmpCallCallee = $;
const tmpCallCallee$1 = f;
const tmpObjLitVal = [1, 2, 3];
const tmpArrElement = { x: tmpObjLitVal, y: 11 };
const tmpCalleeParam$1 = [tmpArrElement, 20, 30];
const tmpCalleeParam$2 = 200;
const tmpCalleeParam = tmpCallCallee$1(tmpCalleeParam$1, tmpCalleeParam$2);
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
function f(tmpParamPattern) {
  let arrPatternSplat = [...tmpParamPattern];
  let arrPatternStep = arrPatternSplat[0];
  let objPatternNoDefault = arrPatternStep.x;
  let arrPatternSplat$1 = [...objPatternNoDefault];
  let y = arrPatternSplat$1.slice(0);
  return y;
}
const tmpCallCallee = $;
const tmpCallCallee$1 = f;
const tmpObjLitVal = [1, 2, 3];
const tmpArrElement = { x: tmpObjLitVal, y: 11 };
const tmpCalleeParam$1 = [tmpArrElement, 20, 30];
const tmpCalleeParam = tmpCallCallee$1(tmpCalleeParam$1, 200);
tmpCallCallee(tmpCalleeParam);
`````

## Result

Should call `$` with:
 - 1: [1, 2, 3]
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
