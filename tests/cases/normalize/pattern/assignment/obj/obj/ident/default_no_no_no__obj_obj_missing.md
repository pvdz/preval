# Preval test case

# default_no_no_no__obj_obj_missing.md

> Normalize > Pattern > Assignment > Obj > Obj > Ident > Default no no no  obj obj missing
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

## Input

`````js filename=intro
({ x: { y } } = { x: { x: 1, z: 3 }, b: 11, c: 12 });
$(y);
`````


## Settled


`````js filename=intro
y = $Object_prototype.y;
$(y);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
y = $Object_prototype.y;
$(y);
`````


## PST Settled
With rename=true

`````js filename=intro
y = $Object_prototype.y;
$( y );
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
