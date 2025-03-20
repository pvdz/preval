# Preval test case

# base.md

> Normalize > Pattern > Binding > Arr > Obj > Arr > Arr > Base
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

## Input

`````js filename=intro
const [
  {
    x: [[]],
  },
] = [{ x: [[1, 2, 3], 10], y: 11 }, 20, 30];
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
const [
  {
    x: [[]],
  },
] = [{ x: [[1, 2, 3], 10], y: 11 }, 20, 30];
$(`ok`);
`````

## Normalized


`````js filename=intro
const tmpArrElement$1 = [1, 2, 3];
const tmpObjLitVal = [tmpArrElement$1, 10];
const tmpArrElement = { x: tmpObjLitVal, y: 11 };
const bindingPatternArrRoot = [tmpArrElement, 20, 30];
const arrPatternSplat = [...bindingPatternArrRoot];
const arrPatternStep = arrPatternSplat[0];
const objPatternNoDefault = arrPatternStep.x;
const arrPatternSplat$1 = [...objPatternNoDefault];
const arrPatternStep$1 = arrPatternSplat$1[0];
const arrPatternSplat$3 = [...arrPatternStep$1];
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
- inline computed array property read
