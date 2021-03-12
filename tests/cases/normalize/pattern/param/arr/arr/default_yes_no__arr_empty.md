# Preval test case

# default_yes_no__arr_empty.md

> Normalize > Pattern > Param > Arr > Arr > Default yes no  arr empty
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
function f([[] = $(['pass2'])]) {
  return 'ok';
}
$(f([], 200));
`````

## Pre Normal

`````js filename=intro
let f = function (tmpParamPattern) {
  let [[] = $(['pass2'])] = tmpParamPattern;
  return 'ok';
};
$(f([], 200));
`````

## Normalized

`````js filename=intro
let f = function (tmpParamPattern) {
  let bindingPatternArrRoot = tmpParamPattern;
  let arrPatternSplat = [...bindingPatternArrRoot];
  let arrPatternBeforeDefault = arrPatternSplat[0];
  let arrPatternStep = undefined;
  const tmpIfTest = arrPatternBeforeDefault === undefined;
  if (tmpIfTest) {
    const tmpCallCallee = $;
    const tmpCalleeParam = ['pass2'];
    arrPatternStep = tmpCallCallee(tmpCalleeParam);
  } else {
    arrPatternStep = arrPatternBeforeDefault;
  }
  let arrPatternSplat$1 = [...arrPatternStep];
  return 'ok';
};
const tmpCallCallee$1 = $;
const tmpCallCallee$2 = f;
const tmpCalleeParam$2 = [];
const tmpCalleeParam$3 = 200;
const tmpCalleeParam$1 = tmpCallCallee$2(tmpCalleeParam$2, tmpCalleeParam$3);
tmpCallCallee$1(tmpCalleeParam$1);
`````

## Output

`````js filename=intro
const f = function (tmpParamPattern) {
  const arrPatternSplat = [...tmpParamPattern];
  const arrPatternBeforeDefault = arrPatternSplat[0];
  let arrPatternStep = undefined;
  const tmpIfTest = arrPatternBeforeDefault === undefined;
  if (tmpIfTest) {
    const tmpCalleeParam = ['pass2'];
    arrPatternStep = $(tmpCalleeParam);
  } else {
    arrPatternStep = arrPatternBeforeDefault;
  }
  [...arrPatternStep];
  return 'ok';
};
const tmpCalleeParam$2 = [];
const tmpCalleeParam$1 = f(tmpCalleeParam$2, 200);
$(tmpCalleeParam$1);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: ['pass2']
 - 2: 'ok'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
