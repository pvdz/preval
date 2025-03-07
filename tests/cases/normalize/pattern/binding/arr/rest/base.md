# Preval test case

# base.md

> Normalize > Pattern > Binding > Arr > Rest > Base
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

## Input

`````js filename=intro
const [...x] = [1, 2, 3];
$(x);
`````

## Settled


`````js filename=intro
const x /*:array*/ = [1, 2, 3];
$(x);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$([1, 2, 3]);
`````

## Pre Normal


`````js filename=intro
const [...x] = [1, 2, 3];
$(x);
`````

## Normalized


`````js filename=intro
const bindingPatternArrRoot = [1, 2, 3];
const arrPatternSplat = [...bindingPatternArrRoot];
const x = arrPatternSplat.slice(0);
$(x);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = [ 1, 2, 3 ];
$( a );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: [1, 2, 3]
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same

Todos triggered:
- type trackeed tricks can possibly support resolving the type for calling this builtin symbol: $array_slice