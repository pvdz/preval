# Preval test case

# default_no_no__obj_empty.md

> Normalize > Pattern > Assignment > Obj > Ident > Default no no  obj empty
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

## Input

`````js filename=intro
({ x } = {});
$(x);
`````


## Settled


`````js filename=intro
x = $Object_prototype.x;
$(x);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
x = $Object_prototype.x;
$(x);
`````


## PST Settled
With rename=true

`````js filename=intro
x = $Object_prototype.x;
$( x );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpAssignObjPatternRhs = {};
x = tmpAssignObjPatternRhs.x;
$(x);
`````


## Todos triggered


None


## Globals


BAD@! Found 1 implicit global bindings:

x


## Runtime Outcome


Should call `$` with:
 - eval returned: ('<crash[ <ref> is not defined ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
