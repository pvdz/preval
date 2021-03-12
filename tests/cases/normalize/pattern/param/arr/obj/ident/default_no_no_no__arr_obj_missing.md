# Preval test case

# default_no_no_no__arr_obj_missing.md

> Normalize > Pattern > Param > Arr > Obj > Ident > Default no no no  arr obj missing
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
function f([{ x }]) {
  return x;
}
$(f([{ y: 2, z: 3 }, 20, 30], 200));
`````

## Pre Normal

`````js filename=intro
let f = function (tmpParamPattern) {
  let [{ x }] = tmpParamPattern;
  return x;
};
$(f([{ y: 2, z: 3 }, 20, 30], 200));
`````

## Normalized

`````js filename=intro
let f = function (tmpParamPattern) {
  let bindingPatternArrRoot = tmpParamPattern;
  let arrPatternSplat = [...bindingPatternArrRoot];
  let arrPatternStep = arrPatternSplat[0];
  let x = arrPatternStep.x;
  return x;
};
const tmpCallCallee = $;
const tmpCallCallee$1 = f;
const tmpArrElement = { y: 2, z: 3 };
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
  const x = arrPatternStep.x;
  return x;
};
const tmpArrElement = { y: 2, z: 3 };
const tmpCalleeParam$1 = [tmpArrElement, 20, 30];
const tmpCalleeParam = f(tmpCalleeParam$1, 200);
$(tmpCalleeParam);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
