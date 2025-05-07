# Preval test case

# default_no_no__obj_123.md

> Normalize > Pattern > Assignment > Obj > Rest > Default no no  obj 123
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

## Input

`````js filename=intro
({ ...x } = { x: 1, b: 2, c: 3 });
$(x);
`````


## Settled


`````js filename=intro
const tmpAssignObjPatternRhs /*:object*/ = { x: 1, b: 2, c: 3 };
const tmpCalleeParam$1 /*:array*/ = [];
x = $objPatternRest(tmpAssignObjPatternRhs, tmpCalleeParam$1, `x`);
$(x);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
x = $objPatternRest({ x: 1, b: 2, c: 3 }, [], `x`);
$(x);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = {
  x: 1,
  b: 2,
  c: 3,
};
const b = [];
x = $objPatternRest( a, b, "x" );
$( x );
`````


## Todos triggered


- (todo) support array reads statement type ExpressionStatement


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
