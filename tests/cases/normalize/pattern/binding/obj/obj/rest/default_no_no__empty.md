# Preval test case

# default_no_no__empty.md

> Normalize > Pattern > Binding > Obj > Obj > Rest > Default no no  empty
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

## Input

`````js filename=intro
const { x: { ...y } } = 1;
$('bad');
`````


## Settled


`````js filename=intro
const tmpCalleeParam /*:unknown*/ = $Number_prototype.x;
const tmpCalleeParam$1 /*:array*/ /*truthy*/ = [];
$objPatternRest(tmpCalleeParam, tmpCalleeParam$1, undefined);
$(`bad`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$objPatternRest($Number_prototype.x, [], undefined);
$(`bad`);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $Number_prototype.x;
const b = [];
$objPatternRest( a, b, undefined );
$( "bad" );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpBindingPatternObjRoot = 1;
const tmpOPND = tmpBindingPatternObjRoot.x;
let tmpCalleeParam = tmpOPND;
let tmpCalleeParam$1 = [];
const y = $objPatternRest(tmpCalleeParam, tmpCalleeParam$1, undefined);
$(`bad`);
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
