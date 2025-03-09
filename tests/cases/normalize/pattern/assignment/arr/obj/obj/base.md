# Preval test case

# base.md

> Normalize > Pattern > Assignment > Arr > Obj > Obj > Base
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

## Input

`````js filename=intro
([
  {
    x: {},
  },
] = [{ x: [{ a: 1, b: 2, c: 3 }, 12], y: 11 }, 10]);
$('ok');
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
[
  {
    x: {},
  },
] = [{ x: [{ a: 1, b: 2, c: 3 }, 12], y: 11 }, 10];
$(`ok`);
`````

## Normalized


`````js filename=intro
const tmpArrElement$1 = { a: 1, b: 2, c: 3 };
const tmpObjLitVal = [tmpArrElement$1, 12];
const tmpArrElement = { x: tmpObjLitVal, y: 11 };
const arrAssignPatternRhs = [tmpArrElement, 10];
const arrPatternSplat = [...arrAssignPatternRhs];
const arrPatternStep = arrPatternSplat[0];
const objPatternNoDefault = arrPatternStep.x;
let objPatternCrashTest = objPatternNoDefault === undefined;
if (objPatternCrashTest) {
} else {
  objPatternCrashTest = objPatternNoDefault === null;
}
if (objPatternCrashTest) {
  objPatternCrashTest = objPatternNoDefault.cannotDestructureThis;
  $(`ok`);
} else {
  $(`ok`);
}
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
- we may be able to confirm that ident refs in the array literal are primitives in same loop/try scope