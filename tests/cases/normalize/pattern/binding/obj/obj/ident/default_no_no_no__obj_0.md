# Preval test case

# default_no_no_no__obj_0.md

> Normalize > Pattern > Binding > Obj > Obj > Ident > Default no no no  obj 0
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

## Input

`````js filename=intro
const { x: { y } } = { x: 0, b: 11, c: 12 };
$(y);
`````


## Settled


`````js filename=intro
const y /*:unknown*/ = $Number_prototype.y;
$(y);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$($Number_prototype.y);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $Number_prototype.y;
$( a );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpBindingPatternObjRoot = { x: 0, b: 11, c: 12 };
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
 - 1: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
