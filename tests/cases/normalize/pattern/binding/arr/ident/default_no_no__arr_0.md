# Preval test case

# default_no_no__arr_0.md

> Normalize > Pattern > Binding > Arr > Ident > Default no no  arr 0
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

## Input

`````js filename=intro
const [x] = [0];
$(x);
`````

## Settled


`````js filename=intro
$(0);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$(0);
`````

## Pre Normal


`````js filename=intro
const [x] = [0];
$(x);
`````

## Normalized


`````js filename=intro
const bindingPatternArrRoot = [0];
const arrPatternSplat = [...bindingPatternArrRoot];
const x = arrPatternSplat[0];
$(x);
`````

## PST Settled
With rename=true

`````js filename=intro
$( 0 );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 0
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same

Todos triggered:
- we may be able to confirm that ident refs in the array literal are primitives in same loop/try scope
- inline computed array property read
