# Preval test case

# base.md

> Normalize > Pattern > Binding > Obj > Arr > Obj > Rest > Base
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

## Input

`````js filename=intro
const { x: [{ ...y }] } = { x: [{ x: 1, y: 2, c: 3 }, 13, 14], a: 11, b: 12 };
$(y);
`````

## Settled


`````js filename=intro
const tmpArrElement /*:object*/ = { x: 1, y: 2, c: 3 };
const tmpCalleeParam$1 /*:array*/ = [];
const y /*:unknown*/ = objPatternRest(tmpArrElement, tmpCalleeParam$1, undefined);
$(y);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpArrElement = { x: 1, y: 2, c: 3 };
$(objPatternRest(tmpArrElement, [], undefined));
`````

## Pre Normal


`````js filename=intro
const {
  x: [{ ...y }],
} = { x: [{ x: 1, y: 2, c: 3 }, 13, 14], a: 11, b: 12 };
$(y);
`````

## Normalized


`````js filename=intro
const tmpArrElement = { x: 1, y: 2, c: 3 };
const tmpObjLitVal = [tmpArrElement, 13, 14];
const bindingPatternObjRoot = { x: tmpObjLitVal, a: 11, b: 12 };
const objPatternNoDefault = bindingPatternObjRoot.x;
const arrPatternSplat = [...objPatternNoDefault];
const arrPatternStep = arrPatternSplat[0];
const tmpCalleeParam = arrPatternStep;
const tmpCalleeParam$1 = [];
const y = objPatternRest(tmpCalleeParam, tmpCalleeParam$1, undefined);
$(y);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = {
  x: 1,
  y: 2,
  c: 3,
};
const b = [];
const c = objPatternRest( a, b, undefined );
$( c );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: { x: '1', y: '2', c: '3' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same

Todos triggered:
- we may be able to confirm that ident refs in the array literal are primitives in same loop/try scope