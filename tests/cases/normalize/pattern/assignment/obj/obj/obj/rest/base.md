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
const tmpObjLitVal$3 /*:object*/ /*truthy*/ = { z: 1, a: 2, b: 3 };
const tmpCalleeParam$1 /*:array*/ /*truthy*/ = [];
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


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpObjLitVal$1 = 13;
const tmpObjLitVal$3 = { z: 1, a: 2, b: 3 };
const tmpObjLitVal = { x: tmpObjLitVal$1, y: tmpObjLitVal$3, z: 14 };
const tmpAssignObjPatternRhs = { x: tmpObjLitVal, b: 11, c: 12 };
const tmpOPND = tmpAssignObjPatternRhs.x;
const tmpOPND$1 = tmpOPND.y;
let tmpCalleeParam = tmpOPND$1;
let tmpCalleeParam$1 = [];
z = $objPatternRest(tmpCalleeParam, tmpCalleeParam$1, undefined);
$(z);
`````


## Todos triggered


- (todo) support array reads statement type ExpressionStatement


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
