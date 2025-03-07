# Preval test case

# base.md

> Normalize > Pattern > Assignment > Obj > Arr > Arr > Rest > Base
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

## Input

`````js filename=intro
({ x: [[...y]] } = { x: [[1, 2, 3], 13], a: 11, b: 12 });
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
({
  x: [[...y]],
} = { x: [[1, 2, 3], 13], a: 11, b: 12 });
$(y);
`````

## Normalized


`````js filename=intro
const tmpArrElement = [1, 2, 3];
const tmpObjLitVal = [tmpArrElement, 13];
const tmpAssignObjPatternRhs = { x: tmpObjLitVal, a: 11, b: 12 };
const objPatternNoDefault = tmpAssignObjPatternRhs.x;
const arrPatternSplat = [...objPatternNoDefault];
const arrPatternStep = arrPatternSplat[0];
const arrPatternSplat$1 = [...arrPatternStep];
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
- type trackeed tricks can possibly support resolving the type for calling this builtin symbol: $array_slice