# Preval test case

# base.md

> Normalize > Pattern > Binding > Obj > Obj > Obj > Arr > Base
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

## Input

`````js filename=intro
const {
  x: {
    y: {
      z: [],
    },
  },
} = { x: { x: 13, y: { z: [1, 2, 3], a: 15, b: 16 }, z: 14 }, b: 11, c: 12 };
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
  x: {
    y: {
      z: [],
    },
  },
} = { x: { x: 13, y: { z: [1, 2, 3], a: 15, b: 16 }, z: 14 }, b: 11, c: 12 };
$(`ok`);
`````

## Normalized


`````js filename=intro
const tmpObjLitVal$1 = 13;
const tmpObjLitVal$5 = [1, 2, 3];
const tmpObjLitVal$3 = { z: tmpObjLitVal$5, a: 15, b: 16 };
const tmpObjLitVal = { x: tmpObjLitVal$1, y: tmpObjLitVal$3, z: 14 };
const bindingPatternObjRoot = { x: tmpObjLitVal, b: 11, c: 12 };
const objPatternNoDefault = bindingPatternObjRoot.x;
const objPatternNoDefault$1 = objPatternNoDefault.y;
const objPatternNoDefault$3 = objPatternNoDefault$1.z;
const arrPatternSplat = [...objPatternNoDefault$3];
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
