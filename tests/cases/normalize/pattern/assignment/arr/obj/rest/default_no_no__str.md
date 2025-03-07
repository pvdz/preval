# Preval test case

# default_no_no__str.md

> Normalize > Pattern > Assignment > Arr > Obj > Rest > Default no no  str
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

## Input

`````js filename=intro
([{ ...x }] = 'abc');
$(x);
`````

## Settled


`````js filename=intro
const tmpCalleeParam$1 /*:array*/ = [];
x = objPatternRest(`a`, tmpCalleeParam$1, undefined);
$(x);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
x = objPatternRest(`a`, [], undefined);
$(x);
`````

## Pre Normal


`````js filename=intro
[{ ...x }] = `abc`;
$(x);
`````

## Normalized


`````js filename=intro
const arrAssignPatternRhs = `abc`;
const arrPatternSplat = [...arrAssignPatternRhs];
const arrPatternStep = arrPatternSplat[0];
const tmpCalleeParam = arrPatternStep;
const tmpCalleeParam$1 = [];
x = objPatternRest(tmpCalleeParam, tmpCalleeParam$1, undefined);
$(x);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = [];
x = objPatternRest( "a", a, undefined );
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