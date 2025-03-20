# Preval test case

# base.md

> Normalize > Pattern > Assignment > Arr > Obj > Arr > Rest > Base
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

## Input

`````js filename=intro
([
  {
    x: [...y],
  },
] = [{ x: [1, 2, 3], y: 11 }, 20, 30]);
$(y);
`````

## Settled


`````js filename=intro
y = [1, 2, 3];
$(y);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
y = [1, 2, 3];
$(y);
`````

## Pre Normal


`````js filename=intro
[
  {
    x: [...y],
  },
] = [{ x: [1, 2, 3], y: 11 }, 20, 30];
$(y);
`````

## Normalized


`````js filename=intro
const tmpObjLitVal = [1, 2, 3];
const tmpArrElement = { x: tmpObjLitVal, y: 11 };
const arrAssignPatternRhs = [tmpArrElement, 20, 30];
const arrPatternSplat = [...arrAssignPatternRhs];
const arrPatternStep = arrPatternSplat[0];
const objPatternNoDefault = arrPatternStep.x;
const arrPatternSplat$1 = [...objPatternNoDefault];
y = arrPatternSplat$1.slice(0);
$(y);
`````

## PST Settled
With rename=true

`````js filename=intro
y = [ 1, 2, 3 ];
$( y );
`````

## Globals

BAD@! Found 1 implicit global bindings:

y

## Runtime Outcome

Should call `$` with:
 - eval returned: ('<crash[ <ref> is not defined ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same

Todos triggered:
- we may be able to confirm that ident refs in the array literal are primitives in same loop/try scope
- inline computed array property read
- type trackeed tricks can possibly support resolving the type for calling this builtin method symbol: $array_slice
