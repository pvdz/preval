# Preval test case

# base_props.md

> Normalize > Pattern > Assignment > Arr > Rest > Base props
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

## Input

`````js filename=intro
([a, ...x] = [1, 2, 3]);
$(x);
`````

## Settled


`````js filename=intro
a = 1;
x = [2, 3];
$(x);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
a = 1;
x = [2, 3];
$(x);
`````

## Pre Normal


`````js filename=intro
[a, ...x] = [1, 2, 3];
$(x);
`````

## Normalized


`````js filename=intro
const arrAssignPatternRhs = [1, 2, 3];
const arrPatternSplat = [...arrAssignPatternRhs];
a = arrPatternSplat[0];
x = arrPatternSplat.slice(1);
$(x);
`````

## PST Settled
With rename=true

`````js filename=intro
a = 1;
x = [ 2, 3 ];
$( x );
`````

## Globals

BAD@! Found 2 implicit global bindings:

a, x

## Runtime Outcome

Should call `$` with:
 - eval returned: ('<crash[ <ref> is not defined ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same

Todos triggered:
- we may be able to confirm that ident refs in the array literal are primitives in same loop/try scope
- type trackeed tricks can possibly support resolving the type for calling this builtin symbol: $array_slice
