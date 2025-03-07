# Preval test case

# base.md

> Normalize > Pattern > Binding > Obj > Arr > Arr > Rest > Base
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

## Input

`````js filename=intro
const { x: [[...y]] } = { x: [[1, 2, 3], 13], a: 11, b: 12 };
$(y);
`````

## Settled


`````js filename=intro
const y /*:array*/ = [1, 2, 3];
$(y);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$([1, 2, 3]);
`````

## Pre Normal


`````js filename=intro
const {
  x: [[...y]],
} = { x: [[1, 2, 3], 13], a: 11, b: 12 };
$(y);
`````

## Normalized


`````js filename=intro
const tmpArrElement = [1, 2, 3];
const tmpObjLitVal = [tmpArrElement, 13];
const bindingPatternObjRoot = { x: tmpObjLitVal, a: 11, b: 12 };
const objPatternNoDefault = bindingPatternObjRoot.x;
const arrPatternSplat = [...objPatternNoDefault];
const arrPatternStep = arrPatternSplat[0];
const arrPatternSplat$1 = [...arrPatternStep];
const y = arrPatternSplat$1.slice(0);
$(y);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = [ 1, 2, 3 ];
$( a );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: [1, 2, 3]
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same

Todos triggered:
- we may be able to confirm that ident refs in the array literal are primitives in same loop/try scope
- type trackeed tricks can possibly support resolving the type for calling this builtin symbol: $array_slice