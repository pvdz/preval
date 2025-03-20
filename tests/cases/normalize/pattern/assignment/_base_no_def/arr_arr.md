# Preval test case

# arr_arr.md

> Normalize > Pattern > Assignment > Base no def > Arr arr
>
> Testing simple pattern normalizations

## Input

`````js filename=intro
let x = 10;
([[ x ]] = [[ 100 ]]);
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
let x = 10;
[[x]] = [[100]];
$(x);
`````

## Normalized


`````js filename=intro
let x = 10;
const tmpArrElement = [100];
const arrAssignPatternRhs = [tmpArrElement];
const arrPatternSplat = [...arrAssignPatternRhs];
const arrPatternStep = arrPatternSplat[0];
const arrPatternSplat$1 = [...arrPatternStep];
x = arrPatternSplat$1[0];
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
- inline computed array property read
