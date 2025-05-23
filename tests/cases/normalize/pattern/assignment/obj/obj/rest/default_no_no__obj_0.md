# Preval test case

# default_no_no__obj_0.md

> Normalize > Pattern > Assignment > Obj > Obj > Rest > Default no no  obj 0
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

## Input

`````js filename=intro
({ x: { ...y } } = { x: 0, b: 11, c: 12 });
$(y);
`````


## Settled


`````js filename=intro
const tmpCalleeParam$1 /*:array*/ = [];
y = $objPatternRest(0, tmpCalleeParam$1, undefined);
$(y);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
y = $objPatternRest(0, [], undefined);
$(y);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = [];
y = $objPatternRest( 0, a, undefined );
$( y );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpAssignObjPatternRhs = { x: 0, b: 11, c: 12 };
const tmpOPND = tmpAssignObjPatternRhs.x;
let tmpCalleeParam = tmpOPND;
let tmpCalleeParam$1 = [];
y = $objPatternRest(tmpCalleeParam, tmpCalleeParam$1, undefined);
$(y);
`````


## Todos triggered


- (todo) support array reads statement type ExpressionStatement


## Globals


BAD@! Found 1 implicit global bindings:

y


## Runtime Outcome


Should call `$` with:
 - eval returned: ('<crash[ <ref> is not defined ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
