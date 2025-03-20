# Preval test case

# default_no_no_no__0.md

> Normalize > Pattern > Assignment > Obj > Obj > Ident > Default no no no  0
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

## Input

`````js filename=intro
({ x: { y } } = 0);
$('bad');
`````


## Settled


`````js filename=intro
const objPatternNoDefault /*:unknown*/ = (0).x;
y = objPatternNoDefault.y;
$(`bad`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
y = (0).x.y;
$(`bad`);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = 0.x;
y = a.y;
$( "bad" );
`````


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
