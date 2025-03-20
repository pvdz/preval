# Preval test case

# default_no_no__arr_0.md

> Normalize > Pattern > Binding > Arr > Arr > Rest > Default no no  arr 0
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

## Input

`````js filename=intro
const [[...x]] = [0, 4, 5];
$(x);
`````

## Settled


`````js filename=intro
[...0];
throw `[Preval]: Array spread must crash before this line`;
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
[...0];
throw `[Preval]: Array spread must crash before this line`;
`````

## Pre Normal


`````js filename=intro
const [[...x]] = [0, 4, 5];
$(x);
`````

## Normalized


`````js filename=intro
const bindingPatternArrRoot = [0, 4, 5];
const arrPatternSplat = [...bindingPatternArrRoot];
const arrPatternStep = arrPatternSplat[0];
const arrPatternSplat$1 = [...arrPatternStep];
const x = arrPatternSplat$1.slice(0);
$(x);
`````

## PST Settled
With rename=true

`````js filename=intro
[ ...0 ];
throw "[Preval]: Array spread must crash before this line";
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same

Todos triggered:
- we may be able to confirm that ident refs in the array literal are primitives in same loop/try scope
- inline computed array property read
- type trackeed tricks can possibly support resolving the type for calling this builtin method symbol: $array_slice
