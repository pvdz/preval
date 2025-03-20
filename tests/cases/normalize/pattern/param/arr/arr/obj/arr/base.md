# Preval test case

# base.md

> Normalize > Pattern > Param > Arr > Arr > Obj > Arr > Base
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

## Input

`````js filename=intro
function f([
  [
    {
      x: [],
    },
  ],
]) {
  return 'ok';
}
$(f([[{ x: [1, 2, 3] }, 20, 30], 40, 50], 200));
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
  let [
    [
      {
        x: [],
      },
    ],
  ] = tmpParamBare;
  return `ok`;
};
$(f([[{ x: [1, 2, 3] }, 20, 30], 40, 50], 200));
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
  let objPatternNoDefault = arrPatternStep$1.x;
  let arrPatternSplat$3 = [...objPatternNoDefault];
  return `ok`;
};
const tmpCallCallee = f;
const tmpObjLitVal = [1, 2, 3];
const tmpArrElement$1 = { x: tmpObjLitVal };
const tmpArrElement = [tmpArrElement$1, 20, 30];
const tmpCalleeParam$1 = [tmpArrElement, 40, 50];
const tmpCalleeParam = tmpCallCallee(tmpCalleeParam$1, 200);
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
