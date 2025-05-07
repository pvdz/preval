# Preval test case

# default_yes_no__obj_null.md

> Normalize > Pattern > Binding > Obj > Obj > Rest > Default yes no  obj null
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

## Input

`````js filename=intro
const { x: { ...y } = $({ a: 'fail' }) } = { x: null, b: 11, c: 12 };
$('bad');
`````


## Settled


`````js filename=intro
const tmpCalleeParam$3 /*:array*/ = [];
$objPatternRest(null, tmpCalleeParam$3, undefined);
$(`bad`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$objPatternRest(null, [], undefined);
$(`bad`);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = [];
$objPatternRest( null, a, undefined );
$( "bad" );
`````


## Todos triggered


- (todo) support array reads statement type ExpressionStatement


## Globals


None


## Runtime Outcome


Should call `$` with:
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
