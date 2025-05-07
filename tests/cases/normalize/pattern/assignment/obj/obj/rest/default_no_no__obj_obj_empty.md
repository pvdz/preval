# Preval test case

# default_no_no__obj_obj_empty.md

> Normalize > Pattern > Assignment > Obj > Obj > Rest > Default no no  obj obj empty
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

## Input

`````js filename=intro
({ x: { ...y } } = { x: {}, b: 11, c: 12 });
$(y);
`````


## Settled


`````js filename=intro
const tmpObjLitVal /*:object*/ = {};
const tmpCalleeParam$1 /*:array*/ = [];
y = $objPatternRest(tmpObjLitVal, tmpCalleeParam$1, undefined);
$(y);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
y = $objPatternRest({}, [], undefined);
$(y);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = {};
const b = [];
y = $objPatternRest( a, b, undefined );
$( y );
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
