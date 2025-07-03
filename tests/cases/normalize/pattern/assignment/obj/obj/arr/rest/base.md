# Preval test case

# base.md

> Normalize > Pattern > Assignment > Obj > Obj > Arr > Rest > Base
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

## Input

`````js filename=intro
({
  x: {
    y: [...z],
  },
} = { x: { x: 13, y: [1, 2, 3], z: 14 }, b: 11, c: 12 });
$(z);
`````


## Settled


`````js filename=intro
z = [1, 2, 3];
$(z);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
z = [1, 2, 3];
$(z);
`````


## PST Settled
With rename=true

`````js filename=intro
z = [ 1, 2, 3 ];
$( z );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpObjLitVal$1 = 13;
const tmpObjLitVal$3 = [1, 2, 3];
const tmpObjLitVal = { x: tmpObjLitVal$1, y: tmpObjLitVal$3, z: 14 };
const tmpAssignObjPatternRhs = { x: tmpObjLitVal, b: 11, c: 12 };
const tmpOPND = tmpAssignObjPatternRhs.x;
const tmpOPND$1 = tmpOPND.y;
const tmpArrPatternSplat = [...tmpOPND$1];
const tmpMCF = tmpArrPatternSplat.slice;
z = $dotCall(tmpMCF, tmpArrPatternSplat, `slice`, 0);
$(z);
`````


## Todos triggered


- (todo) Deal with array spreads in arr mutation?
- (todo) access object property that also exists on prototype? $array_slice
- (todo) array reads var statement with init ObjectExpression
- (todo) support array reads statement type ExpressionStatement
- (todo) type trackeed tricks can possibly support static $array_slice


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
