# Preval test case

# base.md

> Normalize > Pattern > Assignment > Arr > Arr > Arr > Ident > Base
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

## Input

`````js filename=intro
([[[x]]] = [[[[1, 2, 3], 4, 5], 20, 30], 40, 50]);
$(x);
`````

## Settled


`````js filename=intro
const tmpArrElement$3 /*:array*/ = [1, 2, 3];
x = tmpArrElement$3;
$(tmpArrElement$3);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpArrElement$3 = [1, 2, 3];
x = tmpArrElement$3;
$(tmpArrElement$3);
`````

## Pre Normal


`````js filename=intro
[[[x]]] = [[[[1, 2, 3], 4, 5], 20, 30], 40, 50];
$(x);
`````

## Normalized


`````js filename=intro
const tmpArrElement$3 = [1, 2, 3];
const tmpArrElement$1 = [tmpArrElement$3, 4, 5];
const tmpArrElement = [tmpArrElement$1, 20, 30];
const arrAssignPatternRhs = [tmpArrElement, 40, 50];
const arrPatternSplat = [...arrAssignPatternRhs];
const arrPatternStep = arrPatternSplat[0];
const arrPatternSplat$1 = [...arrPatternStep];
const arrPatternStep$1 = arrPatternSplat$1[0];
const arrPatternSplat$3 = [...arrPatternStep$1];
x = arrPatternSplat$3[0];
$(x);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = [ 1, 2, 3 ];
x = a;
$( a );
`````

## Globals

BAD@! Found 1 implicit global bindings:

x

## Runtime Outcome

Should call `$` with:
 - eval returned: ('<crash[ <ref> is not defined ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same

Todos triggered:
- we may be able to confirm that ident refs in the array literal are primitives in same loop/try scope
