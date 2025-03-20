# Preval test case

# base.md

> Normalize > Pattern > Assignment > Obj > Obj > Obj > Rest > Base
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

## Input

`````js filename=intro
({
  x: {
    y: { ...z },
  },
} = { x: { x: 13, y: { z: 1, a: 2, b: 3 }, z: 14 }, b: 11, c: 12 });
$(z);
`````


## Settled


`````js filename=intro
const tmpObjLitVal$3 /*:object*/ = { z: 1, a: 2, b: 3 };
const tmpCalleeParam$1 /*:array*/ = [];
z = $objPatternRest(tmpObjLitVal$3, tmpCalleeParam$1, undefined);
$(z);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
z = $objPatternRest({ z: 1, a: 2, b: 3 }, [], undefined);
$(z);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = {
  z: 1,
  a: 2,
  b: 3,
};
const b = [];
z = $objPatternRest( a, b, undefined );
$( z );
`````


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
