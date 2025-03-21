# Preval test case

# default_no__str.md

> Normalize > Pattern > Binding > Arr > Rest > Default no  str
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

## Input

`````js filename=intro
const [...x] = 'abc';
$(x);
`````

## Settled


`````js filename=intro
const x /*:array*/ = [`a`, `b`, `c`];
$(x);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$([`a`, `b`, `c`]);
`````

## Pre Normal


`````js filename=intro
const [...x] = `abc`;
$(x);
`````

## Normalized


`````js filename=intro
const bindingPatternArrRoot = `abc`;
const arrPatternSplat = [...bindingPatternArrRoot];
const x = arrPatternSplat.slice(0);
$(x);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = [ "a", "b", "c" ];
$( a );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: ['a', 'b', 'c']
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same

Todos triggered:
- type trackeed tricks can possibly support resolving the type for calling this builtin symbol: $array_slice
