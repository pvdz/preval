# Preval test case

# default_no_no__arr_empty_str.md

> Normalize > Pattern > Param > Arr > Arr > Rest > Default no no  arr empty str
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
function f([[...x]]) {
  return x;
}
$(f(['', 4, 5], 200));
`````

## Pre Normal

`````js filename=intro
let f = function ($$0) {
  const tmpParamBare = $$0;
  debugger;
  let [[...x]] = tmpParamBare;
  return x;
};
$(f(['', 4, 5], 200));
`````

## Normalized

`````js filename=intro
let f = function ($$0) {
  const tmpParamBare = $$0;
  debugger;
  let bindingPatternArrRoot = tmpParamBare;
  let arrPatternSplat = [...bindingPatternArrRoot];
  let arrPatternStep = arrPatternSplat[0];
  let arrPatternSplat$1 = [...arrPatternStep];
  let x = arrPatternSplat$1.slice(0);
  return x;
};
const tmpCallCallee = $;
const tmpCallCallee$1 = f;
const tmpCalleeParam$1 = ['', 4, 5];
const tmpCalleeParam$3 = 200;
const tmpCalleeParam = tmpCallCallee$1(tmpCalleeParam$1, tmpCalleeParam$3);
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
const arrPatternSplat$1 = [];
const x = arrPatternSplat$1.slice(0);
$(x);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: []
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
