# Preval test case

# base.md

> Normalize > Pattern > Assignment > Obj > Arr > Rest > Base
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

## Input

`````js filename=intro
({ x: [...y] } = { x: [1, 2, 3], a: 11, b: 12 });
$(y);
`````


## Settled


`````js filename=intro
y = [1, 2, 3];
$(y);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
y = [1, 2, 3];
$(y);
`````


## PST Settled
With rename=true

`````js filename=intro
y = [ 1, 2, 3 ];
$( y );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpObjLitVal = [1, 2, 3];
const tmpAssignObjPatternRhs = { x: tmpObjLitVal, a: 11, b: 12 };
const tmpOPND = tmpAssignObjPatternRhs.x;
const tmpArrPatternSplat = [...tmpOPND];
const tmpMCF = tmpArrPatternSplat.slice;
y = $dotCall(tmpMCF, tmpArrPatternSplat, `slice`, 0);
$(y);
`````


## Todos triggered


- (todo) Deal with array spreads in arr mutation?
- (todo) access object property that also exists on prototype? $array_slice
- (todo) array reads var statement with init ObjectExpression
- (todo) support array reads statement type ExpressionStatement
- (todo) type trackeed tricks can possibly support static $array_slice


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
