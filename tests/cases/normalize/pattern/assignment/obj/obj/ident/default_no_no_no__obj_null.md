# Preval test case

# default_no_no_no__obj_null.md

> Normalize > Pattern > Assignment > Obj > Obj > Ident > Default no no no  obj null
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

## Input

`````js filename=intro
({ x: { y } } = { x: null, b: 11, c: 12 });
$('bad');
`````


## Settled


`````js filename=intro
y = null.y;
$(`bad`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
y = null.y;
$(`bad`);
`````


## PST Settled
With rename=true

`````js filename=intro
y = null.y;
$( "bad" );
`````


## Todos triggered


None


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
