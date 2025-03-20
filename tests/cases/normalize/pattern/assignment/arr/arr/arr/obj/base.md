# Preval test case

# base.md

> Normalize > Pattern > Assignment > Arr > Arr > Arr > Obj > Base
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

## Input

`````js filename=intro
([[[[{}]]]] = [[[[{ x: 1 }, 6, 7], 4, 5], 20, 30], 40, 50]);
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
[[[[{}]]]] = [[[[{ x: 1 }, 6, 7], 4, 5], 20, 30], 40, 50];
$(`ok`);
`````

## Normalized


`````js filename=intro
const tmpArrElement$5 = { x: 1 };
const tmpArrElement$3 = [tmpArrElement$5, 6, 7];
const tmpArrElement$1 = [tmpArrElement$3, 4, 5];
const tmpArrElement = [tmpArrElement$1, 20, 30];
const arrAssignPatternRhs = [tmpArrElement, 40, 50];
const arrPatternSplat = [...arrAssignPatternRhs];
const arrPatternStep = arrPatternSplat[0];
const arrPatternSplat$1 = [...arrPatternStep];
const arrPatternStep$1 = arrPatternSplat$1[0];
const arrPatternSplat$3 = [...arrPatternStep$1];
const arrPatternStep$3 = arrPatternSplat$3[0];
const arrPatternSplat$5 = [...arrPatternStep$3];
const arrPatternStep$5 = arrPatternSplat$5[0];
let objPatternCrashTest = arrPatternStep$5 === undefined;
if (objPatternCrashTest) {
} else {
  objPatternCrashTest = arrPatternStep$5 === null;
}
if (objPatternCrashTest) {
  objPatternCrashTest = arrPatternStep$5.cannotDestructureThis;
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
- inline computed array property read
