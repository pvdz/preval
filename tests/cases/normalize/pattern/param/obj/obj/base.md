# Preval test case

# base.md

> Normalize > Pattern > Param > Obj > Obj > Base
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

## Input

`````js filename=intro
const a = 1, b = 2;
function f({ x: {} = a } = b) {
  return 'ok';
}
$(f({ x: { x: 1, y: 2, z: 3 }, b: 11, c: 12 }, 10));
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
  let { x: {} = a } = tmpParamBare === undefined ? b : tmpParamBare;
  return `ok`;
};
const a = 1,
  b = 2;
$(f({ x: { x: 1, y: 2, z: 3 }, b: 11, c: 12 }, 10));
`````

## Normalized


`````js filename=intro
let f = function ($$0) {
  const tmpParamBare = $$0;
  debugger;
  let bindingPatternObjRoot = undefined;
  const tmpIfTest = tmpParamBare === undefined;
  if (tmpIfTest) {
    bindingPatternObjRoot = b;
  } else {
    bindingPatternObjRoot = tmpParamBare;
  }
  let objPatternBeforeDefault = bindingPatternObjRoot.x;
  let objPatternAfterDefault = undefined;
  const tmpIfTest$1 = objPatternBeforeDefault === undefined;
  if (tmpIfTest$1) {
    objPatternAfterDefault = a;
  } else {
    objPatternAfterDefault = objPatternBeforeDefault;
  }
  let objPatternCrashTest = objPatternAfterDefault === undefined;
  if (objPatternCrashTest) {
  } else {
    objPatternCrashTest = objPatternAfterDefault === null;
  }
  if (objPatternCrashTest) {
    objPatternCrashTest = objPatternAfterDefault.cannotDestructureThis;
    return `ok`;
  } else {
    return `ok`;
  }
};
const a = 1;
const b = 2;
const tmpCallCallee = f;
const tmpObjLitVal = { x: 1, y: 2, z: 3 };
const tmpCalleeParam$1 = { x: tmpObjLitVal, b: 11, c: 12 };
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
