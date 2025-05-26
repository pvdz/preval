# Preval test case

# base.md

> Normalize > Pattern > Assignment > Obj > Arr > Obj > Rest > Base
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

## Input

`````js filename=intro
({ x: [{ ...y }] } = { x: [{ x: 1, y: 2, c: 3 }, 13, 14], a: 11, b: 12 });
$(y);
`````


## Settled


`````js filename=intro
const tmpArrElement /*:object*/ = { x: 1, y: 2, c: 3 };
const tmpCalleeParam$1 /*:array*/ = [];
y = $objPatternRest(tmpArrElement, tmpCalleeParam$1, undefined);
$(y);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
y = $objPatternRest({ x: 1, y: 2, c: 3 }, [], undefined);
$(y);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = {
  x: 1,
  y: 2,
  c: 3,
};
const b = [];
y = $objPatternRest( a, b, undefined );
$( y );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpArrElement = { x: 1, y: 2, c: 3 };
const tmpObjLitVal = [tmpArrElement, 13, 14];
const tmpAssignObjPatternRhs = { x: tmpObjLitVal, a: 11, b: 12 };
const tmpOPND = tmpAssignObjPatternRhs.x;
const tmpArrPatternSplat = [...tmpOPND];
const tmpArrPatternStep = tmpArrPatternSplat[0];
let tmpCalleeParam = tmpArrPatternStep;
let tmpCalleeParam$1 = [];
y = $objPatternRest(tmpCalleeParam, tmpCalleeParam$1, undefined);
$(y);
`````


## Todos triggered


- (todo) Deal with array spreads in arr mutation?
- (todo) can we always safely clone ident refs in this case?
- (todo) support array reads statement type ExpressionStatement
- (todo) support array reads statement type VarStatement
- (todo) we may be able to confirm that ident refs in the array literal are primitives in same loop/try scope


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
