# Preval test case

# default_yes_yes__arr_empty.md

> Normalize > Pattern > Param > Arr > Obj > Default yes yes  arr empty
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
function f([{} = $('pass')] = $(['fail2'])) {
  return 'ok';
}
$(f([]));
`````

## Pre Normal

`````js filename=intro
let f = function (tmpParamDefault) {
  let [{} = $('pass')] = tmpParamDefault === undefined ? $(['fail2']) : tmpParamDefault;
  return 'ok';
};
$(f([]));
`````

## Normalized

`````js filename=intro
let f = function (tmpParamDefault) {
  let bindingPatternArrRoot = undefined;
  const tmpIfTest = tmpParamDefault === undefined;
  if (tmpIfTest) {
    const tmpCallCallee = $;
    const tmpCalleeParam = ['fail2'];
    bindingPatternArrRoot = tmpCallCallee(tmpCalleeParam);
  } else {
    bindingPatternArrRoot = tmpParamDefault;
  }
  let arrPatternSplat = [...bindingPatternArrRoot];
  let arrPatternBeforeDefault = arrPatternSplat[0];
  let arrPatternStep = undefined;
  const tmpIfTest$1 = arrPatternBeforeDefault === undefined;
  if (tmpIfTest$1) {
    arrPatternStep = $('pass');
  } else {
    arrPatternStep = arrPatternBeforeDefault;
  }
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
const tmpCallCallee$1 = $;
const tmpCallCallee$2 = f;
const tmpCalleeParam$2 = [];
const tmpCalleeParam$1 = tmpCallCallee$2(tmpCalleeParam$2);
tmpCallCallee$1(tmpCalleeParam$1);
`````

## Output

`````js filename=intro
const f = function (tmpParamDefault) {
  let bindingPatternArrRoot = undefined;
  const tmpIfTest = tmpParamDefault === undefined;
  if (tmpIfTest) {
    const tmpCalleeParam = ['fail2'];
    bindingPatternArrRoot = $(tmpCalleeParam);
  } else {
    bindingPatternArrRoot = tmpParamDefault;
  }
  const arrPatternSplat = [...bindingPatternArrRoot];
  const arrPatternBeforeDefault = arrPatternSplat[0];
  let arrPatternStep = undefined;
  const tmpIfTest$1 = arrPatternBeforeDefault === undefined;
  if (tmpIfTest$1) {
    arrPatternStep = $('pass');
  } else {
    arrPatternStep = arrPatternBeforeDefault;
  }
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
const tmpCalleeParam$2 = [];
const tmpCalleeParam$1 = f(tmpCalleeParam$2);
$(tmpCalleeParam$1);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'pass'
 - 2: 'ok'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
