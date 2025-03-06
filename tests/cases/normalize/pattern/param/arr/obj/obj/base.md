# Preval test case

# base.md

> Normalize > Pattern > Param > Arr > Obj > Obj > Base
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

## Input

`````js filename=intro
function f([
  {
    x: {},
  },
]) {
  return 'ok';
}
$(f([{ x: [{ a: 1, b: 2, c: 3 }, 12], y: 11 }, 10], 100));
`````

## Pre Normal


`````js filename=intro
let f = function ($$0) {
  const tmpParamBare = $$0;
  debugger;
  let [
    {
      x: {},
    },
  ] = tmpParamBare;
  return `ok`;
};
$(f([{ x: [{ a: 1, b: 2, c: 3 }, 12], y: 11 }, 10], 100));
`````

## Normalized


`````js filename=intro
let f = function ($$0) {
  const tmpParamBare = $$0;
  debugger;
  let bindingPatternArrRoot = tmpParamBare;
  let arrPatternSplat = [...bindingPatternArrRoot];
  let arrPatternStep = arrPatternSplat[0];
  let objPatternNoDefault = arrPatternStep.x;
  let objPatternCrashTest = objPatternNoDefault === undefined;
  if (objPatternCrashTest) {
  } else {
    objPatternCrashTest = objPatternNoDefault === null;
  }
  if (objPatternCrashTest) {
    objPatternCrashTest = objPatternNoDefault.cannotDestructureThis;
    return `ok`;
  } else {
    return `ok`;
  }
};
const tmpCallCallee = f;
const tmpArrElement$1 = { a: 1, b: 2, c: 3 };
const tmpObjLitVal = [tmpArrElement$1, 12];
const tmpArrElement = { x: tmpObjLitVal, y: 11 };
const tmpCalleeParam$1 = [tmpArrElement, 10];
const tmpCalleeParam = tmpCallCallee(tmpCalleeParam$1, 100);
$(tmpCalleeParam);
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

Todos triggered:
- we may be able to confirm that ident refs in the array literal are primitives in same loop/try scope