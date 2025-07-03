# Preval test case

# base.md

> Normalize > Pattern > Binding > Obj > Obj > Arr > Rest > Base
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

## Input

`````js filename=intro
const {
  x: {
    y: [...z],
  },
} = { x: { x: 13, y: [1, 2, 3], z: 14 }, b: 11, c: 12 };
$(z);
`````


## Settled


`````js filename=intro
const z /*:array*/ /*truthy*/ = [1, 2, 3];
$(z);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$([1, 2, 3]);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = [ 1, 2, 3 ];
$( a );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpObjLitVal$1 = 13;
const tmpObjLitVal$3 = [1, 2, 3];
const tmpObjLitVal = { x: tmpObjLitVal$1, y: tmpObjLitVal$3, z: 14 };
const tmpBindingPatternObjRoot = { x: tmpObjLitVal, b: 11, c: 12 };
const tmpOPND = tmpBindingPatternObjRoot.x;
const tmpOPND$1 = tmpOPND.y;
const tmpArrPatternSplat = [...tmpOPND$1];
const tmpMCF = tmpArrPatternSplat.slice;
const z = $dotCall(tmpMCF, tmpArrPatternSplat, `slice`, 0);
$(z);
`````


## Todos triggered


- (todo) Deal with array spreads in arr mutation?
- (todo) access object property that also exists on prototype? $array_slice
- (todo) array reads var statement with init CallExpression
- (todo) array reads var statement with init ObjectExpression
- (todo) support array reads statement type ExpressionStatement
- (todo) type trackeed tricks can possibly support static $array_slice


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: [1, 2, 3]
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
