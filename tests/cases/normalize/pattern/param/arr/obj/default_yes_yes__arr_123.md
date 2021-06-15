# Preval test case

# default_yes_yes__arr_123.md

> Normalize > Pattern > Param > Arr > Obj > Default yes yes  arr 123
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
function f([{} = $('fail')] = $(['fail2'])) {
  return 'ok';
}
$(f([1, 2, 3, 20, 30], 200));
`````

## Pre Normal

`````js filename=intro
let f = function ($$0) {
  const tmpParamBare = $$0;
  debugger;
  let [{} = $(`fail`)] = tmpParamBare === undefined ? $([`fail2`]) : tmpParamBare;
  return `ok`;
};
$(f([1, 2, 3, 20, 30], 200));
`````

## Normalized

`````js filename=intro
let f = function ($$0) {
  const tmpParamBare = $$0;
  debugger;
  let bindingPatternArrRoot = undefined;
  const tmpIfTest = tmpParamBare === undefined;
  if (tmpIfTest) {
    const tmpCallCallee = $;
    const tmpCalleeParam = [`fail2`];
    bindingPatternArrRoot = tmpCallCallee(tmpCalleeParam);
  } else {
    bindingPatternArrRoot = tmpParamBare;
  }
  let arrPatternSplat = [...bindingPatternArrRoot];
  let arrPatternBeforeDefault = arrPatternSplat[0];
  let arrPatternStep = undefined;
  const tmpIfTest$1 = arrPatternBeforeDefault === undefined;
  if (tmpIfTest$1) {
    arrPatternStep = $(`fail`);
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
    return `ok`;
  } else {
    return `ok`;
  }
};
const tmpCallCallee$1 = $;
const tmpCallCallee$3 = f;
const tmpCalleeParam$3 = [1, 2, 3, 20, 30];
const tmpCalleeParam$5 = 200;
const tmpCalleeParam$1 = tmpCallCallee$3(tmpCalleeParam$3, tmpCalleeParam$5);
tmpCallCallee$1(tmpCalleeParam$1);
`````

## Output

`````js filename=intro
$(`ok`);
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
