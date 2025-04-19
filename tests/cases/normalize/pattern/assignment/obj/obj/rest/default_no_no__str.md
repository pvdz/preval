# Preval test case

# default_no_no__str.md

> Normalize > Pattern > Assignment > Obj > Obj > Rest > Default no no  str
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

## Input

`````js filename=intro
({ x: { ...y } } = 'abc');
$('bad');
`````


## Settled


`````js filename=intro
const tmpOPND /*:unknown*/ = $String_prototype.x;
const tmpCalleeParam$1 /*:array*/ = [];
y = $objPatternRest(tmpOPND, tmpCalleeParam$1, undefined);
$(`bad`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
y = $objPatternRest($String_prototype.x, [], undefined);
$(`bad`);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $String_prototype.x;
const b = [];
y = $objPatternRest( a, b, undefined );
$( "bad" );
`````


## Todos triggered


None


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
