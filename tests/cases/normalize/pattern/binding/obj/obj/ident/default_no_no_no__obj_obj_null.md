# Preval test case

# default_no_no_no__obj_obj_null.md

> Normalize > Pattern > Binding > Obj > Obj > Ident > Default no no no  obj obj null
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

## Input

`````js filename=intro
const { x: { y } } = { x: { x: 1, y: null, z: 3 }, b: 11, c: 12 };
$(y);
`````


## Settled


`````js filename=intro
$(null);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(null);
`````


## PST Settled
With rename=true

`````js filename=intro
$( null );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpObjLitVal = { x: 1, y: null, z: 3 };
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
 - 1: null
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
