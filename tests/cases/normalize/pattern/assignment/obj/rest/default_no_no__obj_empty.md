# Preval test case

# default_no_no__obj_empty.md

> Normalize > Pattern > Assignment > Obj > Rest > Default no no  obj empty
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

## Input

`````js filename=intro
({ ...x } = {});
$(x);
`````


## Settled


`````js filename=intro
const tmpAssignObjPatternRhs /*:object*/ = {};
const tmpCalleeParam$1 /*:array*/ = [];
x = $objPatternRest(tmpAssignObjPatternRhs, tmpCalleeParam$1, `x`);
$(x);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
x = $objPatternRest({}, [], `x`);
$(x);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = {};
const b = [];
x = $objPatternRest( a, b, "x" );
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
