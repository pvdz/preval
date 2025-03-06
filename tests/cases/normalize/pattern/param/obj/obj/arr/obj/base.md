# Preval test case

# base.md

> Normalize > Pattern > Param > Obj > Obj > Arr > Obj > Base
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

## Input

`````js filename=intro
function f({
  x: {
    y: [{}],
  },
}) {
  return 'ok';
}
$(f({ x: { x: 13, y: [{ a: 1, b: 2, c: 3 }, 15], z: 14 }, b: 11, c: 12 }, 10));
`````

## Pre Normal


`````js filename=intro
let f = function ($$0) {
  const tmpParamBare = $$0;
  debugger;
  let {
    x: {
      y: [{}],
    },
  } = tmpParamBare;
  return `ok`;
};
$(f({ x: { x: 13, y: [{ a: 1, b: 2, c: 3 }, 15], z: 14 }, b: 11, c: 12 }, 10));
`````

## Normalized


`````js filename=intro
let f = function ($$0) {
  const tmpParamBare = $$0;
  debugger;
  let bindingPatternObjRoot = tmpParamBare;
  let objPatternNoDefault = bindingPatternObjRoot.x;
  let objPatternNoDefault$1 = objPatternNoDefault.y;
  let arrPatternSplat = [...objPatternNoDefault$1];
  let arrPatternStep = arrPatternSplat[0];
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
const tmpCallCallee = f;
const tmpObjLitVal$1 = 13;
const tmpArrElement = { a: 1, b: 2, c: 3 };
const tmpObjLitVal$3 = [tmpArrElement, 15];
const tmpObjLitVal = { x: tmpObjLitVal$1, y: tmpObjLitVal$3, z: 14 };
const tmpCalleeParam$1 = { x: tmpObjLitVal, b: 11, c: 12 };
const tmpCalleeParam = tmpCallCallee(tmpCalleeParam$1, 10);
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