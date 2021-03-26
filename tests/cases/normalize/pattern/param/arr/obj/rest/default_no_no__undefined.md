# Preval test case

# default_no_no__undefined.md

> Normalize > Pattern > Param > Arr > Obj > Rest > Default no no  undefined
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
function f([{ ...x }]) {
  return x;
}
$(f(undefined, 200));
`````

## Pre Normal

`````js filename=intro
let f = function ($$0) {
  const tmpParamBare = $$0;
  debugger;
  let [{ ...x }] = tmpParamBare;
  return x;
};
$(f(undefined, 200));
`````

## Normalized

`````js filename=intro
let f = function ($$0) {
  const tmpParamBare = $$0;
  debugger;
  let bindingPatternArrRoot = tmpParamBare;
  let arrPatternSplat = [...bindingPatternArrRoot];
  let arrPatternStep = arrPatternSplat[0];
  const tmpCallCallee = objPatternRest;
  const tmpCalleeParam = arrPatternStep;
  const tmpCalleeParam$1 = [];
  const tmpCalleeParam$3 = undefined;
  let x = tmpCallCallee(tmpCalleeParam, tmpCalleeParam$1, tmpCalleeParam$3);
  return x;
};
const tmpCallCallee$1 = $;
const tmpCalleeParam$5 = f(undefined, 200);
tmpCallCallee$1(tmpCalleeParam$5);
`````

## Output

`````js filename=intro
const arrPatternSplat = [...undefined];
const arrPatternStep = arrPatternSplat[0];
const tmpCalleeParam$1 = [];
const x = objPatternRest(arrPatternStep, tmpCalleeParam$1, undefined);
$(x);
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
