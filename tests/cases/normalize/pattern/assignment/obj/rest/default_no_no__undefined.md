# Preval test case

# default_no_no__undefined.md

> Normalize > Pattern > Assignment > Obj > Rest > Default no no  undefined
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

## Input

`````js filename=intro
({ ...x } = undefined);
$(x);
`````


## Settled


`````js filename=intro
const tmpCalleeParam$1 /*:array*/ /*truthy*/ = [];
x = $objPatternRest(undefined, tmpCalleeParam$1, `x`);
$(x);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
x = $objPatternRest(undefined, [], `x`);
$(x);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = [];
x = $objPatternRest( undefined, a, "x" );
$( x );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpAssignObjPatternRhs = undefined;
let tmpCalleeParam = tmpAssignObjPatternRhs;
let tmpCalleeParam$1 = [];
x = $objPatternRest(tmpCalleeParam, tmpCalleeParam$1, `x`);
$(x);
`````


## Todos triggered


- (todo) support array reads statement type ExpressionStatement


## Globals


BAD@! Found 1 implicit global bindings:

x


## Runtime Outcome


Should call `$` with:
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
