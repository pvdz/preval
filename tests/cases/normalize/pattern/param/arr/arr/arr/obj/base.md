# Preval test case

# base.md

> Normalize > Pattern > Param > Arr > Arr > Arr > Obj > Base
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

## Input

`````js filename=intro
function f([[[[{}]]]]) {
  return 'ok';
}
$(f([[[[{ x: 1 }, 6, 7], 4, 5], 20, 30], 40, 50], 200));
`````

## Pre Normal


`````js filename=intro
let f = function ($$0) {
  const tmpParamBare = $$0;
  debugger;
  let [[[[{}]]]] = tmpParamBare;
  return `ok`;
};
$(f([[[[{ x: 1 }, 6, 7], 4, 5], 20, 30], 40, 50], 200));
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
  let arrPatternSplat$3 = [...arrPatternStep$1];
  let arrPatternStep$3 = arrPatternSplat$3[0];
  let arrPatternSplat$5 = [...arrPatternStep$3];
  let arrPatternStep$5 = arrPatternSplat$5[0];
  let objPatternCrashTest = arrPatternStep$5 === undefined;
  if (objPatternCrashTest) {
  } else {
    objPatternCrashTest = arrPatternStep$5 === null;
  }
  if (objPatternCrashTest) {
    objPatternCrashTest = arrPatternStep$5.cannotDestructureThis;
    return `ok`;
  } else {
    return `ok`;
  }
};
const tmpCallCallee = $;
const tmpCallCallee$1 = f;
const tmpArrElement$5 = { x: 1 };
const tmpArrElement$3 = [tmpArrElement$5, 6, 7];
const tmpArrElement$1 = [tmpArrElement$3, 4, 5];
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

## PST Output

With rename=true

`````js filename=intro
$( "ok" );
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
