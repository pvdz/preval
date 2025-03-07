# Preval test case

# base.md

> Normalize > Pattern > Binding > Arr > Obj > Arr > Ident > Base
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

## Input

`````js filename=intro
const [
  {
    x: [y],
  },
] = [{ x: [1, 2, 3] }, 20, 30];
$(y);
`````

## Settled


`````js filename=intro
$(1);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$(1);
`````

## Pre Normal


`````js filename=intro
const [
  {
    x: [y],
  },
] = [{ x: [1, 2, 3] }, 20, 30];
$(y);
`````

## Normalized


`````js filename=intro
const tmpObjLitVal = [1, 2, 3];
const tmpArrElement = { x: tmpObjLitVal };
const bindingPatternArrRoot = [tmpArrElement, 20, 30];
const arrPatternSplat = [...bindingPatternArrRoot];
const arrPatternStep = arrPatternSplat[0];
const objPatternNoDefault = arrPatternStep.x;
const arrPatternSplat$1 = [...objPatternNoDefault];
const y = arrPatternSplat$1[0];
$(y);
`````

## PST Settled
With rename=true

`````js filename=intro
$( 1 );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same

Todos triggered:
- we may be able to confirm that ident refs in the array literal are primitives in same loop/try scope