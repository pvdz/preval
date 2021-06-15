# Preval test case

# base.md

> Normalize > Pattern > Param > Arr > Arr > Obj > Base
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
function f([[{}]]) {
  return 'ok';
}
$(f([[{ x: 1 }, 20, 30], 40, 50], 200));
`````

## Pre Normal

`````js filename=intro
let f = function ($$0) {
  const tmpParamBare = $$0;
  debugger;
  let [[{}]] = tmpParamBare;
  return `ok`;
};
$(f([[{ x: 1 }, 20, 30], 40, 50], 200));
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
  let arrPatternStep$1 = arrPatternSplat$1[0];
  let objPatternCrashTest = arrPatternStep$1 === undefined;
  if (objPatternCrashTest) {
  } else {
    objPatternCrashTest = arrPatternStep$1 === null;
  }
  if (objPatternCrashTest) {
    objPatternCrashTest = arrPatternStep$1.cannotDestructureThis;
    return `ok`;
  } else {
    return `ok`;
  }
};
const tmpCallCallee = $;
const tmpCallCallee$1 = f;
const tmpArrElement$1 = { x: 1 };
const tmpArrElement = [tmpArrElement$1, 20, 30];
const tmpCalleeParam$1 = [tmpArrElement, 40, 50];
const tmpCalleeParam$3 = 200;
const tmpCalleeParam = tmpCallCallee$1(tmpCalleeParam$1, tmpCalleeParam$3);
tmpCallCallee(tmpCalleeParam);
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
