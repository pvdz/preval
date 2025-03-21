# Preval test case

# base.md

> Normalize > Pattern > Assignment > Obj > Obj > Obj > Ident > Base
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

## Input

`````js filename=intro
({
  x: {
    y: { z },
  },
} = { x: { x: 13, y: { z: 1, a: 2, b: 3 }, z: 14 }, b: 11, c: 12 });
$(z);
`````


## Settled


`````js filename=intro
z = 1;
$(z);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
z = 1;
$(z);
`````


## PST Settled
With rename=true

`````js filename=intro
z = 1;
$( z );
`````


## Todos triggered


None


## Globals


BAD@! Found 1 implicit global bindings:

z


## Runtime Outcome


Should call `$` with:
 - eval returned: ('<crash[ <ref> is not defined ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
