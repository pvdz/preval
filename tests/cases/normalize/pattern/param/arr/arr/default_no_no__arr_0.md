# Preval test case

# default_no_no__arr_0.md

> Normalize > Pattern > Param > Arr > Arr > Default no no  arr 0
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
function f([[]]) {
  return 'bad';
}
$(f([0, 4, 5], 200));
`````

## Normalized

`````js filename=intro
let f = function (tmpParamPattern) {
  let bindingPatternArrRoot = tmpParamPattern;
  let arrPatternSplat = [...bindingPatternArrRoot];
  let arrPatternStep = arrPatternSplat[0];
  let arrPatternSplat$1 = [...arrPatternStep];
  return 'bad';
};
const tmpCallCallee = $;
const tmpCallCallee$1 = f;
const tmpCalleeParam$1 = [0, 4, 5];
const tmpCalleeParam$2 = 200;
const tmpCalleeParam = tmpCallCallee$1(tmpCalleeParam$1, tmpCalleeParam$2);
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
const f = function (tmpParamPattern) {
  const arrPatternSplat = [...tmpParamPattern];
  const arrPatternStep = arrPatternSplat[0];
  [...arrPatternStep];
  return 'bad';
};
const tmpCalleeParam$1 = [0, 4, 5];
const tmpCalleeParam = f(tmpCalleeParam$1, 200);
$(tmpCalleeParam);
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Normalized calls: Same

Final output calls: Same
