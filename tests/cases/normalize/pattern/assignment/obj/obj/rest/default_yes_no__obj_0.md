# Preval test case

# default_yes_no__obj_0.md

> Normalize > Pattern > Assignment > Obj > Obj > Rest > Default yes no  obj 0
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

## Input

`````js filename=intro
({ x: { ...y } = $({ a: 'fail' }) } = { x: 0, b: 11, c: 12 });
$(y);
`````


## Settled


`````js filename=intro
const tmpCalleeParam$3 /*:array*/ = [];
y = $objPatternRest(0, tmpCalleeParam$3, undefined);
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
