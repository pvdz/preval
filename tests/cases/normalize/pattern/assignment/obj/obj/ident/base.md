# Preval test case

# base.md

> Normalize > Pattern > Assignment > Obj > Obj > Ident > Base
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

## Input

`````js filename=intro
({ x: { y } } = { x: { x: 1, y: 2, z: 3 }, b: 11, c: 12 });
$(y);
`````


## Settled


`````js filename=intro
y = 2;
$(y);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
y = 2;
$(y);
`````


## PST Settled
With rename=true

`````js filename=intro
y = 2;
$( y );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpObjLitVal = { x: 1, y: 2, z: 3 };
const tmpAssignObjPatternRhs = { x: tmpObjLitVal, b: 11, c: 12 };
const tmpOPND = tmpAssignObjPatternRhs.x;
y = tmpOPND.y;
$(y);
`````


## Todos triggered


None


## Globals


BAD@! Found 1 implicit global bindings:

y


## Runtime Outcome


Should call `$` with:
 - eval returned: ('<crash[ <ref> is not defined ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
