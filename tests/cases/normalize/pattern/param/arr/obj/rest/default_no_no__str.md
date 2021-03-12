# Preval test case

# default_no_no__str.md

> Normalize > Pattern > Param > Arr > Obj > Rest > Default no no  str
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
function f([{ ...x }]) {
  return x;
}
$(f('abc', 200));
`````

## Pre Normal

`````js filename=intro
let f = function (tmpParamPattern) {
  let [{ ...x }] = tmpParamPattern;
  return x;
};
$(f('abc', 200));
`````

## Normalized

`````js filename=intro
let f = function (tmpParamPattern) {
  let bindingPatternArrRoot = tmpParamPattern;
  let arrPatternSplat = [...bindingPatternArrRoot];
  let arrPatternStep = arrPatternSplat[0];
  const tmpCallCallee = objPatternRest;
  const tmpCalleeParam = arrPatternStep;
  const tmpCalleeParam$1 = [];
  const tmpCalleeParam$2 = undefined;
  let x = tmpCallCallee(tmpCalleeParam, tmpCalleeParam$1, tmpCalleeParam$2);
  return x;
};
const tmpCallCallee$1 = $;
const tmpCalleeParam$3 = f('abc', 200);
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
const tmpCalleeParam$3 = f('abc', 200);
$(tmpCalleeParam$3);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: { 0: '"a"' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
