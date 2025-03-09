# Preval test case

# base.md

> Normalize > Pattern > Assignment > Arr > Arr > Ident > Base
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

## Input

`````js filename=intro
([[x]] = [[1, 2, 3], 4, 5]);
$(x);
`````

## Settled


`````js filename=intro
x = 1;
$(x);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
x = 1;
$(x);
`````

## Pre Normal


`````js filename=intro
[[x]] = [[1, 2, 3], 4, 5];
$(x);
`````

## Normalized


`````js filename=intro
const tmpArrElement = [1, 2, 3];
const arrAssignPatternRhs = [tmpArrElement, 4, 5];
const arrPatternSplat = [...arrAssignPatternRhs];
const arrPatternStep = arrPatternSplat[0];
const arrPatternSplat$1 = [...arrPatternStep];
x = arrPatternSplat$1[0];
$(x);
`````

## PST Settled
With rename=true

`````js filename=intro
x = 1;
$( x );
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
