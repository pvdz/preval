# Preval test case

# default_yes_no__arr_arr_elided.md

> Normalize > Pattern > Param > Arr > Arr > Rest > Default yes no  arr arr elided
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
function f([[...x] = $('pass')]) {
  return x;
}
$(f([[, , 1], 4, 5], 200));
`````

## Pre Normal

`````js filename=intro
let f = function ($$0) {
  const tmpParamBare = $$0;
  debugger;
  let [[...x] = $('pass')] = tmpParamBare;
  return x;
};
$(f([[, , 1], 4, 5], 200));
`````

## Normalized

`````js filename=intro
let f = function ($$0) {
  const tmpParamBare = $$0;
  debugger;
  let bindingPatternArrRoot = tmpParamBare;
  let arrPatternSplat = [...bindingPatternArrRoot];
  let arrPatternBeforeDefault = arrPatternSplat[0];
  let arrPatternStep = undefined;
  const tmpIfTest = arrPatternBeforeDefault === undefined;
  if (tmpIfTest) {
    arrPatternStep = $('pass');
  } else {
    arrPatternStep = arrPatternBeforeDefault;
  }
  let arrPatternSplat$1 = [...arrPatternStep];
  let x = arrPatternSplat$1.slice(0);
  return x;
};
const tmpCallCallee = $;
const tmpCallCallee$1 = f;
const tmpArrElement = [, , 1];
const tmpCalleeParam$1 = [tmpArrElement, 4, 5];
const tmpCalleeParam$3 = 200;
const tmpCalleeParam = tmpCallCallee$1(tmpCalleeParam$1, tmpCalleeParam$3);
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
const arrPatternSplat$1 = [undefined, undefined, 1];
const x = arrPatternSplat$1.slice(0);
$(x);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: [undefined, undefined, 1]
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
