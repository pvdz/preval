# Preval test case

# default_no_no_no__obj_empty_str.md

> Normalize > Pattern > Assignment > Obj > Obj > Ident > Default no no no  obj empty str
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

## Input

`````js filename=intro
({ x: { y } } = { x: '', b: 11, c: 12 });
$(y);
`````


## Settled


`````js filename=intro
y = ``.y;
$(y);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
y = ``.y;
$(y);
`````


## PST Settled
With rename=true

`````js filename=intro
y = "".y;
$( y );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpAssignObjPatternRhs = { x: ``, b: 11, c: 12 };
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
