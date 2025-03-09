# Preval test case

# arr_obj.md

> Normalize > Pattern > Binding > Base no def > Arr obj
>
> Testing simple pattern normalizations

## Input

`````js filename=intro
const [{ x }] = [{x: 100}];
$(x);
`````

## Settled


`````js filename=intro
$(100);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$(100);
`````

## Pre Normal


`````js filename=intro
const [{ x: x }] = [{ x: 100 }];
$(x);
`````

## Normalized


`````js filename=intro
const tmpArrElement = { x: 100 };
const bindingPatternArrRoot = [tmpArrElement];
const arrPatternSplat = [...bindingPatternArrRoot];
const arrPatternStep = arrPatternSplat[0];
const x = arrPatternStep.x;
$(x);
`````

## PST Settled
With rename=true

`````js filename=intro
$( 100 );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 100
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same

Todos triggered:
- we may be able to confirm that ident refs in the array literal are primitives in same loop/try scope
