# Preval test case

# default_no_no__empty_str.md

> Normalize > Pattern > Binding > Obj > Obj > Rest > Default no no  empty str
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

## Input

`````js filename=intro
const { x: { ...y } } = '';
$('bad');
`````


## Settled


`````js filename=intro
const objPatternNoDefault /*:unknown*/ = ``.x;
const tmpCalleeParam$1 /*:array*/ = [];
$objPatternRest(objPatternNoDefault, tmpCalleeParam$1, undefined);
$(`bad`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$objPatternRest(``.x, [], undefined);
$(`bad`);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = "".x;
const b = [];
$objPatternRest( a, b, undefined );
$( "bad" );
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
