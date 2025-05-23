# Preval test case

# default_no_no__undefined.md

> Normalize > Pattern > Assignment > Obj > Ident > Default no no  undefined
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

## Input

`````js filename=intro
({ x } = undefined);
$('bad');
`````


## Settled


`````js filename=intro
x = undefined.x;
$(`bad`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
x = undefined.x;
$(`bad`);
`````


## PST Settled
With rename=true

`````js filename=intro
x = undefined.x;
$( "bad" );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpAssignObjPatternRhs = undefined;
x = tmpAssignObjPatternRhs.x;
$(`bad`);
`````


## Todos triggered


None


## Globals


BAD@! Found 1 implicit global bindings:

x


## Runtime Outcome


Should call `$` with:
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
