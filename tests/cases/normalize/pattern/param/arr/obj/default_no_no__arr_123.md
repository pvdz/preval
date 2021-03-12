# Preval test case

# default_no_no__arr_123.md

> Normalize > Pattern > Param > Arr > Obj > Default no no  arr 123
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
function f([{}]) {
  return 'ok';
}
$(f([1, 2, 3, 20, 30], 200));
`````

## Pre Normal

`````js filename=intro
let f = function (tmpParamPattern) {
  let [{}] = tmpParamPattern;
  return 'ok';
};
$(f([1, 2, 3, 20, 30], 200));
`````

## Normalized

`````js filename=intro
let f = function (tmpParamPattern) {
  let bindingPatternArrRoot = tmpParamPattern;
  let arrPatternSplat = [...bindingPatternArrRoot];
  let arrPatternStep = arrPatternSplat[0];
  let objPatternCrashTest = arrPatternStep === undefined;
  if (objPatternCrashTest) {
  } else {
    objPatternCrashTest = arrPatternStep === null;
  }
  if (objPatternCrashTest) {
    objPatternCrashTest = arrPatternStep.cannotDestructureThis;
    return 'ok';
  } else {
    return 'ok';
  }
};
const tmpCallCallee = $;
const tmpCallCallee$1 = f;
const tmpCalleeParam$1 = [1, 2, 3, 20, 30];
const tmpCalleeParam$2 = 200;
const tmpCalleeParam = tmpCallCallee$1(tmpCalleeParam$1, tmpCalleeParam$2);
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
const f = function (tmpParamPattern) {
  const arrPatternSplat = [...tmpParamPattern];
  const arrPatternStep = arrPatternSplat[0];
  let objPatternCrashTest = arrPatternStep === undefined;
  if (objPatternCrashTest) {
  } else {
    objPatternCrashTest = arrPatternStep === null;
  }
  if (objPatternCrashTest) {
    arrPatternStep.cannotDestructureThis;
    return 'ok';
  } else {
    return 'ok';
  }
};
const tmpCalleeParam$1 = [1, 2, 3, 20, 30];
const tmpCalleeParam = f(tmpCalleeParam$1, 200);
$(tmpCalleeParam);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'ok'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
