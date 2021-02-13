# Preval test case

# base.md

> normalize > pattern >  > param > arr > obj > obj > rest > base
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

## Normalized

`````js filename=intro
function f(tmpParamPattern) {
  let arrPatternSplat = [...tmpParamPattern];
  let arrPatternStep = arrPatternSplat[0];
  let objPatternNoDefault = arrPatternStep.x;
  const tmpCallCallee = objPatternRest;
  const tmpCalleeParam = objPatternNoDefault;
  const tmpCalleeParam$1 = [];
  const tmpCalleeParam$2 = undefined;
  let y = tmpCallCallee(tmpCalleeParam, tmpCalleeParam$1, tmpCalleeParam$2);
  return y;
}
const tmpCallCallee$1 = $;
const tmpCallCallee$2 = f;
const tmpObjLitVal = { a: 1, b: 2, c: 3 };
const tmpArrElement = { x: tmpObjLitVal, y: 11 };
const tmpCalleeParam$4 = [tmpArrElement, 10];
const tmpCalleeParam$5 = 100;
const tmpCalleeParam$3 = tmpCallCallee$2(tmpCalleeParam$4, tmpCalleeParam$5);
tmpCallCallee$1(tmpCalleeParam$3);
`````

## Output

`````js filename=intro
function f(tmpParamPattern) {
  let arrPatternSplat = [...tmpParamPattern];
  let arrPatternStep = arrPatternSplat[0];
  let objPatternNoDefault = arrPatternStep.x;
  const tmpCalleeParam$1 = [];
  let y = objPatternRest(objPatternNoDefault, tmpCalleeParam$1, undefined);
  return y;
}
const tmpObjLitVal = { a: 1, b: 2, c: 3 };
const tmpArrElement = { x: tmpObjLitVal, y: 11 };
const tmpCalleeParam$4 = [tmpArrElement, 10];
const tmpCalleeParam$3 = f(tmpCalleeParam$4, 100);
$(tmpCalleeParam$3);
`````

## Result

Should call `$` with:
 - 1: { a: '1', b: '2', c: '3' }
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
