# Preval test case

# base.md

> Normalize > Pattern > Binding > Arr > Obj > Obj > Rest > Base
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

## Input

`````js filename=intro
const [
  {
    x: { ...y },
  },
] = [{ x: { a: 1, b: 2, c: 3 }, y: 11 }, 10];
$(y);
`````

## Settled


`````js filename=intro
const tmpObjLitVal /*:object*/ = { a: 1, b: 2, c: 3 };
const tmpCalleeParam$1 /*:array*/ = [];
const y /*:unknown*/ = objPatternRest(tmpObjLitVal, tmpCalleeParam$1, undefined);
$(y);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpObjLitVal = { a: 1, b: 2, c: 3 };
$(objPatternRest(tmpObjLitVal, [], undefined));
`````

## Pre Normal


`````js filename=intro
const [
  {
    x: { ...y },
  },
] = [{ x: { a: 1, b: 2, c: 3 }, y: 11 }, 10];
$(y);
`````

## Normalized


`````js filename=intro
const tmpObjLitVal = { a: 1, b: 2, c: 3 };
const tmpArrElement = { x: tmpObjLitVal, y: 11 };
const bindingPatternArrRoot = [tmpArrElement, 10];
const arrPatternSplat = [...bindingPatternArrRoot];
const arrPatternStep = arrPatternSplat[0];
const objPatternNoDefault = arrPatternStep.x;
const tmpCalleeParam = objPatternNoDefault;
const tmpCalleeParam$1 = [];
const y = objPatternRest(tmpCalleeParam, tmpCalleeParam$1, undefined);
$(y);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = {
  a: 1,
  b: 2,
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
 - 1: { a: '1', b: '2', c: '3' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same

Todos triggered:
- we may be able to confirm that ident refs in the array literal are primitives in same loop/try scope