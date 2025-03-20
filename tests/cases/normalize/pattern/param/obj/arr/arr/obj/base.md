# Preval test case

# base.md

> Normalize > Pattern > Param > Obj > Arr > Arr > Obj > Base
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

## Input

`````js filename=intro
function f({ x: [[{}]] }) {
  return 'ok';
}
$(f({ x: [[{ a: 1, b: 2, c: 3 }, 14], 13], a: 11, b: 12 }, 10));
`````

## Settled


`````js filename=intro
$(`ok`);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`ok`);
`````

## Pre Normal


`````js filename=intro
let f = function ($$0) {
  const tmpParamBare = $$0;
  debugger;
  let {
    x: [[{}]],
  } = tmpParamBare;
  return `ok`;
};
$(f({ x: [[{ a: 1, b: 2, c: 3 }, 14], 13], a: 11, b: 12 }, 10));
`````

## Normalized


`````js filename=intro
let f = function ($$0) {
  const tmpParamBare = $$0;
  debugger;
  let bindingPatternObjRoot = tmpParamBare;
  let objPatternNoDefault = bindingPatternObjRoot.x;
  let arrPatternSplat = [...objPatternNoDefault];
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
const tmpCallCallee = f;
const tmpArrElement$1 = { a: 1, b: 2, c: 3 };
const tmpArrElement = [tmpArrElement$1, 14];
const tmpObjLitVal = [tmpArrElement, 13];
const tmpCalleeParam$1 = { x: tmpObjLitVal, a: 11, b: 12 };
const tmpCalleeParam = tmpCallCallee(tmpCalleeParam$1, 10);
$(tmpCalleeParam);
`````

## PST Settled
With rename=true

`````js filename=intro
$( "ok" );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 'ok'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same

Todos triggered:
- inline computed array property read
- we may be able to confirm that ident refs in the array literal are primitives in same loop/try scope
