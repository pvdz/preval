# Preval test case

# default_no_no_no__empty.md

> Normalize > Pattern > Binding > Obj > Obj > Ident > Default no no no  empty
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

## Input

`````js filename=intro
const { x: { y } } = 1;
$('bad');
`````


## Settled


`````js filename=intro
const objPatternNoDefault /*:unknown*/ = (1).x;
objPatternNoDefault.y;
$(`bad`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
(1).x.y;
$(`bad`);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = 1.x;
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
