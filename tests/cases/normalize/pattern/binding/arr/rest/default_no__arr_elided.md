# Preval test case

# default_no__arr_elided.md

> Normalize > Pattern > Binding > Arr > Rest > Default no  arr elided
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

## Input

`````js filename=intro
const [...x] = [, , , 1];
$(x);
`````

## Settled


`````js filename=intro
const x /*:array*/ = [undefined, undefined, undefined, 1];
$(x);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$([undefined, undefined, undefined, 1]);
`````

## Pre Normal


`````js filename=intro
const [...x] = [, , , 1];
$(x);
`````

## Normalized


`````js filename=intro
const bindingPatternArrRoot = [, , , 1];
const arrPatternSplat = [...bindingPatternArrRoot];
const x = arrPatternSplat.slice(0);
$(x);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = [ undefined, undefined, undefined, 1 ];
$( a );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: [undefined, undefined, undefined, 1]
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same

Todos triggered:
- type trackeed tricks can possibly support resolving the type for calling this builtin symbol: $array_slice
