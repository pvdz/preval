# Preval test case

# base.md

> normalize > pattern >  > param > arr > arr > obj > arr > base
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
function f([
  [
    {
      x: [],
    },
  ],
]) {
  return 'ok';
}
$(f([[{ x: [1, 2, 3] }, 20, 30], 40, 50], 200));
`````

## Normalized

`````js filename=intro
function f(tmpParamPattern) {
  let arrPatternSplat = [...tmpParamPattern];
  let arrPatternStep = arrPatternSplat[0];
  let arrPatternSplat$1 = [...arrPatternStep];
  let arrPatternStep$1 = arrPatternSplat$1[0];
  let objPatternNoDefault = arrPatternStep$1.x;
  let arrPatternSplat$2 = [...objPatternNoDefault];
  return 'ok';
}
const tmpCallCallee = $;
const tmpCallCallee$1 = f;
const tmpObjLitVal = [1, 2, 3];
const tmpArrElement$1 = { x: tmpObjLitVal };
const tmpArrElement = [tmpArrElement$1, 20, 30];
const tmpCalleeParam$1 = [tmpArrElement, 40, 50];
const tmpCalleeParam$2 = 200;
const tmpCalleeParam = tmpCallCallee$1(tmpCalleeParam$1, tmpCalleeParam$2);
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
function f(tmpParamPattern) {
  let arrPatternSplat = [...tmpParamPattern];
  let arrPatternStep = arrPatternSplat[0];
  let arrPatternSplat$1 = [...arrPatternStep];
  let arrPatternStep$1 = arrPatternSplat$1[0];
  let objPatternNoDefault = arrPatternStep$1.x;
  [...objPatternNoDefault];
  return 'ok';
}
const tmpCallCallee = $;
const tmpCallCallee$1 = f;
const tmpObjLitVal = [1, 2, 3];
const tmpArrElement$1 = { x: tmpObjLitVal };
const tmpArrElement = [tmpArrElement$1, 20, 30];
const tmpCalleeParam$1 = [tmpArrElement, 40, 50];
const tmpCalleeParam = tmpCallCallee$1(tmpCalleeParam$1, 200);
tmpCallCallee(tmpCalleeParam);
`````

## Result

Should call `$` with:
 - 1: 'ok'
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
