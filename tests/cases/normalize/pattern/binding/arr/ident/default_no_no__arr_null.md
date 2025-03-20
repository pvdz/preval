# Preval test case

# default_no_no__arr_null.md

> Normalize > Pattern > Binding > Arr > Ident > Default no no  arr null
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

## Input

`````js filename=intro
const [x] = [null];
$(x);
`````

## Settled


`````js filename=intro
$(null);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$(null);
`````

## Pre Normal


`````js filename=intro
const [x] = [null];
$(x);
`````

## Normalized


`````js filename=intro
const bindingPatternArrRoot = [null];
const arrPatternSplat = [...bindingPatternArrRoot];
const x = arrPatternSplat[0];
$(x);
`````

## PST Settled
With rename=true

`````js filename=intro
$( null );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: null
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same

Todos triggered:
- we may be able to confirm that ident refs in the array literal are primitives in same loop/try scope
- inline computed array property read
