# Preval test case

# base.md

> normalize > pattern >  > param > obj > obj > arr > arr > base
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
function f({
  x: {
    y: [[]],
  },
}) {
  return 'ok';
}
$(f({ x: { x: 13, y: [[1, 2, 3], 15], z: 14 }, b: 11, c: 12 }, 10));
`````

## Normalized

`````js filename=intro
function f(tmpParamPattern) {
  let objPatternNoDefault = tmpParamPattern.x;
  let objPatternNoDefault$1 = objPatternNoDefault.y;
  let arrPatternSplat = [...objPatternNoDefault$1];
  let arrPatternStep = arrPatternSplat[0];
  let arrPatternSplat$1 = [...arrPatternStep];
  return 'ok';
}
const tmpCallCallee = $;
const tmpCallCallee$1 = f;
const tmpObjLitVal$1 = 13;
const tmpArrElement = [1, 2, 3];
const tmpObjLitVal$2 = [tmpArrElement, 15];
const tmpObjLitVal = { x: tmpObjLitVal$1, y: tmpObjLitVal$2, z: 14 };
const tmpCalleeParam$1 = { x: tmpObjLitVal, b: 11, c: 12 };
const tmpCalleeParam$2 = 10;
const tmpCalleeParam = tmpCallCallee$1(tmpCalleeParam$1, tmpCalleeParam$2);
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
'<skipped>';
`````

## Result

Should call `$` with:
 - 1: 'ok'
 - eval returned: undefined

Normalized calls: Same

Final output calls: BAD!!
 - eval returned: undefined
