# Preval test case

# base.md

> Normalize > Pattern > Binding > Obj > Obj > Ident > Base
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

## Input

`````js filename=intro
const { x: { y } } = { x: { x: 1, y: 2, z: 3 }, b: 11, c: 12 };
$(y);
`````


## Settled


`````js filename=intro
$(2);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(2);
`````


## PST Settled
With rename=true

`````js filename=intro
$( 2 );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpObjLitVal = { x: 1, y: 2, z: 3 };
const tmpBindingPatternObjRoot = { x: tmpObjLitVal, b: 11, c: 12 };
const tmpOPND = tmpBindingPatternObjRoot.x;
const y = tmpOPND.y;
$(y);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
