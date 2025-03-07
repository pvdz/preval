# Preval test case

# base.md

> Normalize > Pattern > Binding > Arr > Obj > Rest > Base
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

## Input

`````js filename=intro
const [{ ...x }] = [{ x: 1, y: 2, z: 3 }, 20, 30];
$(x);
`````

## Settled


`````js filename=intro
const tmpArrElement /*:object*/ = { x: 1, y: 2, z: 3 };
const tmpCalleeParam$1 /*:array*/ = [];
const x /*:unknown*/ = objPatternRest(tmpArrElement, tmpCalleeParam$1, undefined);
$(x);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpArrElement = { x: 1, y: 2, z: 3 };
$(objPatternRest(tmpArrElement, [], undefined));
`````

## Pre Normal


`````js filename=intro
const [{ ...x }] = [{ x: 1, y: 2, z: 3 }, 20, 30];
$(x);
`````

## Normalized


`````js filename=intro
const tmpArrElement = { x: 1, y: 2, z: 3 };
const bindingPatternArrRoot = [tmpArrElement, 20, 30];
const arrPatternSplat = [...bindingPatternArrRoot];
const arrPatternStep = arrPatternSplat[0];
const tmpCalleeParam = arrPatternStep;
const tmpCalleeParam$1 = [];
const x = objPatternRest(tmpCalleeParam, tmpCalleeParam$1, undefined);
$(x);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = {
  x: 1,
  y: 2,
  z: 3,
};
const b = [];
const c = objPatternRest( a, b, undefined );
$( c );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: { x: '1', y: '2', z: '3' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same

Todos triggered:
- we may be able to confirm that ident refs in the array literal are primitives in same loop/try scope