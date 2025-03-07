# Preval test case

# base.md

> Normalize > Pattern > Binding > Obj > Arr > Obj > Obj > Base
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

## Input

`````js filename=intro
const {
  x: [
    {
      y: {},
    },
  ],
} = { x: [{ x: 15, y: { a: 1, b: 2, c: 3 }, c: 16 }, 13, 14], a: 11, b: 12 };
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
const {
  x: [
    {
      y: {},
    },
  ],
} = { x: [{ x: 15, y: { a: 1, b: 2, c: 3 }, c: 16 }, 13, 14], a: 11, b: 12 };
$(`ok`);
`````

## Normalized


`````js filename=intro
const tmpObjLitVal$1 = 15;
const tmpObjLitVal$3 = { a: 1, b: 2, c: 3 };
const tmpArrElement = { x: tmpObjLitVal$1, y: tmpObjLitVal$3, c: 16 };
const tmpObjLitVal = [tmpArrElement, 13, 14];
const bindingPatternObjRoot = { x: tmpObjLitVal, a: 11, b: 12 };
const objPatternNoDefault = bindingPatternObjRoot.x;
const arrPatternSplat = [...objPatternNoDefault];
const arrPatternStep = arrPatternSplat[0];
const objPatternNoDefault$1 = arrPatternStep.y;
let objPatternCrashTest = objPatternNoDefault$1 === undefined;
if (objPatternCrashTest) {
} else {
  objPatternCrashTest = objPatternNoDefault$1 === null;
}
if (objPatternCrashTest) {
  objPatternCrashTest = objPatternNoDefault$1.cannotDestructureThis;
} else {
}
$(`ok`);
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