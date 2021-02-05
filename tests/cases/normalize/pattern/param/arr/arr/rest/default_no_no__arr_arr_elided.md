# Preval test case

# default_no_no__arr_arr_elided.md

> normalize > pattern >  > param > arr > arr > rest > default_no_no__arr_arr_elided
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
function f([[...x]]) {
  return x;
}
$(f([[, , , 1], 4, 5], 200));
`````

## Normalized

`````js filename=intro
function f(tmpParamPattern) {
  let arrPatternSplat = [...tmpParamPattern];
  let arrPatternStep = arrPatternSplat[0];
  let arrPatternSplat$1 = [...arrPatternStep];
  let x = arrPatternSplat$1.slice(0);
  return x;
}
const tmpCallCallee = $;
const tmpCallCallee$1 = f;
const tmpArrElement = [, , , 1];
const tmpCalleeParam$1 = [tmpArrElement, 4, 5];
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
  let x = arrPatternSplat$1.slice(0);
  return x;
}
const tmpCallCallee = $;
const tmpCallCallee$1 = f;
const tmpArrElement = [, , , 1];
const tmpCalleeParam$1 = [tmpArrElement, 4, 5];
const tmpCalleeParam = tmpCallCallee$1(tmpCalleeParam$1, 200);
tmpCallCallee(tmpCalleeParam);
`````

## Result

Should call `$` with:
 - 1: [undefined, undefined, undefined, 1]
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
