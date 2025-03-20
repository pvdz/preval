# Preval test case

# default_no_no__obj_empty.md

> Normalize > Pattern > Param > Obj > Obj > Rest > Default no no  obj empty
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

## Input

`````js filename=intro
function f({ x: { ...y } }) {
  return 'bad';
}
$(f({}, 10));
`````


## Settled


`````js filename=intro
const objPatternNoDefault /*:unknown*/ = $Object_prototype.x;
const tmpCalleeParam$1 /*:array*/ = [];
$objPatternRest(objPatternNoDefault, tmpCalleeParam$1, undefined);
$(`bad`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$objPatternRest($Object_prototype.x, [], undefined);
$(`bad`);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $Object_prototype.x;
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
