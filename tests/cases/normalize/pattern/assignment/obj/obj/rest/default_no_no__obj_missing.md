# Preval test case

# default_no_no__obj_missing.md

> Normalize > Pattern > Assignment > Obj > Obj > Rest > Default no no  obj missing
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

## Input

`````js filename=intro
({ x: { ...y } } = { b: 11, c: 12 });
$('bad');
`````


## Settled


`````js filename=intro
const tmpCalleeParam /*:unknown*/ = $Object_prototype.x;
const tmpCalleeParam$1 /*:array*/ = [];
y = $objPatternRest(tmpCalleeParam, tmpCalleeParam$1, undefined);
$(`bad`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
y = $objPatternRest($Object_prototype.x, [], undefined);
$(`bad`);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $Object_prototype.x;
const b = [];
y = $objPatternRest( a, b, undefined );
$( "bad" );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpAssignObjPatternRhs = { b: 11, c: 12 };
const tmpOPND = tmpAssignObjPatternRhs.x;
let tmpCalleeParam = tmpOPND;
let tmpCalleeParam$1 = [];
y = $objPatternRest(tmpCalleeParam, tmpCalleeParam$1, undefined);
$(`bad`);
`````


## Todos triggered


- (todo) support array reads statement type ExpressionStatement


## Globals


BAD@! Found 1 implicit global bindings:

y


## Runtime Outcome


Should call `$` with:
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
