# Preval test case

# default_no_no__empty.md

> Normalize > Pattern > Assignment > Arr > Obj > Rest > Default no no  empty
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

## Input

`````js filename=intro
let x = 100;
([{ ...x }] = [{}]);
$(x);
`````

## Settled


`````js filename=intro
const tmpArrElement /*:object*/ = {};
const tmpCalleeParam$1 /*:array*/ = [];
const tmpClusterSSA_x /*:unknown*/ = objPatternRest(tmpArrElement, tmpCalleeParam$1, undefined);
$(tmpClusterSSA_x);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpArrElement = {};
$(objPatternRest(tmpArrElement, [], undefined));
`````

## Pre Normal


`````js filename=intro
let x = 100;
[{ ...x }] = [{}];
$(x);
`````

## Normalized


`````js filename=intro
let x = 100;
const tmpArrElement = {};
const arrAssignPatternRhs = [tmpArrElement];
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
const a = {};
const b = [];
const c = objPatternRest( a, b, undefined );
$( c );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: {}
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same

Todos triggered:
- we may be able to confirm that ident refs in the array literal are primitives in same loop/try scope