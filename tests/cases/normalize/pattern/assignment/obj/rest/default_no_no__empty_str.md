# Preval test case

# default_no_no__empty_str.md

> Normalize > Pattern > Assignment > Obj > Rest > Default no no  empty str
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

## Input

`````js filename=intro
({ ...x } = '');
$(x);
`````

## Settled


`````js filename=intro
const tmpCalleeParam$1 /*:array*/ = [];
x = $objPatternRest(``, tmpCalleeParam$1, `x`);
$(x);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
x = $objPatternRest(``, [], `x`);
$(x);
`````

## Pre Normal


`````js filename=intro
({ ...x } = ``);
$(x);
`````

## Normalized


`````js filename=intro
const tmpAssignObjPatternRhs = ``;
const tmpCalleeParam = tmpAssignObjPatternRhs;
const tmpCalleeParam$1 = [];
x = $objPatternRest(tmpCalleeParam, tmpCalleeParam$1, `x`);
$(x);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = [];
x = $objPatternRest( "", a, "x" );
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
