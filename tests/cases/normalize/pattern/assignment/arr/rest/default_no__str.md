# Preval test case

# default_no__str.md

> Normalize > Pattern > Assignment > Arr > Rest > Default no  str
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

## Input

`````js filename=intro
([...x] = 'abc');
$(x);
`````

## Settled


`````js filename=intro
x = [`a`, `b`, `c`];
$(x);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
x = [`a`, `b`, `c`];
$(x);
`````

## Pre Normal


`````js filename=intro
[...x] = `abc`;
$(x);
`````

## Normalized


`````js filename=intro
const arrAssignPatternRhs = `abc`;
const arrPatternSplat = [...arrAssignPatternRhs];
x = arrPatternSplat.slice(0);
$(x);
`````

## PST Settled
With rename=true

`````js filename=intro
x = [ "a", "b", "c" ];
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
- type trackeed tricks can possibly support resolving the type for calling this builtin symbol: $array_slice
