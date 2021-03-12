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
const tmpCalleeParam$3 = f(undefined, 200);
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
const tmpCalleeParam$3 = f(undefined, 200);
$(tmpCalleeParam$3);
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Normalized calls: Same

Final output calls: Same
