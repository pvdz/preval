# Preval test case

# base.md

> normalize > pattern >  > param > obj > arr > obj > rest > base
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

## Normalized

`````js filename=intro
function f(tmpParamPattern) {
  let objPatternNoDefault = tmpParamPattern.x;
  let arrPatternSplat = [...objPatternNoDefault];
  let arrPatternStep = arrPatternSplat[0];
  const tmpCallCallee = objPatternRest;
  const tmpCalleeParam = arrPatternStep;
  const tmpCalleeParam$1 = [];
  const tmpCalleeParam$2 = undefined;
  let y = tmpCallCallee(tmpCalleeParam, tmpCalleeParam$1, tmpCalleeParam$2);
  return y;
}
const tmpCallCallee$1 = $;
const tmpCallCallee$2 = f;
const tmpArrElement = { x: 1, y: 2, c: 3 };
const tmpObjLitVal = [tmpArrElement, 13, 14];
const tmpCalleeParam$4 = { x: tmpObjLitVal, a: 11, b: 12 };
const tmpCalleeParam$5 = 10;
const tmpCalleeParam$3 = tmpCallCallee$2(tmpCalleeParam$4, tmpCalleeParam$5);
tmpCallCallee$1(tmpCalleeParam$3);
`````

## Output

`````js filename=intro
function f(tmpParamPattern) {
  let objPatternNoDefault = tmpParamPattern.x;
  let arrPatternSplat = [...objPatternNoDefault];
  let arrPatternStep = arrPatternSplat[0];
  const tmpCallCallee = objPatternRest;
  const tmpCalleeParam = arrPatternStep;
  const tmpCalleeParam$1 = [];
  let y = tmpCallCallee(tmpCalleeParam, tmpCalleeParam$1, undefined);
  return y;
}
const tmpCallCallee$1 = $;
const tmpCallCallee$2 = f;
const tmpArrElement = { x: 1, y: 2, c: 3 };
const tmpObjLitVal = [tmpArrElement, 13, 14];
const tmpCalleeParam$4 = { x: tmpObjLitVal, a: 11, b: 12 };
const tmpCalleeParam$3 = tmpCallCallee$2(tmpCalleeParam$4, 10);
tmpCallCallee$1(tmpCalleeParam$3);
`````

## Result

Should call `$` with:
 - 1: { x: '1', y: '2', c: '3' }
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
