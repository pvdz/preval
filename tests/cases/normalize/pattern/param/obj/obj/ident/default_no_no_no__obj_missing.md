# Preval test case

# default_no_no_no__obj_missing.md

> Normalize > Pattern > Param > Obj > Obj > Ident > Default no no no  obj missing
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

## Input

`````js filename=intro
function f({ x: { y } }) {
  return 'bad';
}
$(f({ b: 11, c: 12 }, 10));
`````


## Settled


`````js filename=intro
const objPatternNoDefault /*:unknown*/ = $Object_prototype.x;
objPatternNoDefault.y;
$(`bad`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$Object_prototype.x.y;
$(`bad`);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $Object_prototype.x;
a.y;
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
