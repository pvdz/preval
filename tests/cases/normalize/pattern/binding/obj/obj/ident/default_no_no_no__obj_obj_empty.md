# Preval test case

# default_no_no_no__obj_obj_empty.md

> Normalize > Pattern > Binding > Obj > Obj > Ident > Default no no no  obj obj empty
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

## Input

`````js filename=intro
const { x: { y } } = { x: {}, b: 11, c: 12 };
$(y);
`````


## Settled


`````js filename=intro
const y /*:unknown*/ = $Object_prototype.y;
$(y);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$($Object_prototype.y);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $Object_prototype.y;
$( a );
`````


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
