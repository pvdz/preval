# Preval test case

# base.md

> Normalize > Pattern > Assignment > Arr > Arr > Obj > Rest > Base
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

## Input

`````js filename=intro
([[{ ...x }]] = [[{ x: 1, y: 2, z: 3 }, 20, 30], 40, 50]);
$(x);
`````


## Settled


`````js filename=intro
const tmpArrElement$1 /*:object*/ = { x: 1, y: 2, z: 3 };
const tmpCalleeParam$1 /*:array*/ = [];
x = $objPatternRest(tmpArrElement$1, tmpCalleeParam$1, undefined);
$(x);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
x = $objPatternRest({ x: 1, y: 2, z: 3 }, [], undefined);
$(x);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = {
  x: 1,
  y: 2,
  z: 3,
};
const b = [];
x = $objPatternRest( a, b, undefined );
$( x );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpArrElement$1 = { x: 1, y: 2, z: 3 };
const tmpArrElement = [tmpArrElement$1, 20, 30];
const tmpArrAssignPatternRhs = [tmpArrElement, 40, 50];
const tmpArrPatternSplat = [...tmpArrAssignPatternRhs];
const tmpArrPatternStep = tmpArrPatternSplat[0];
const tmpArrPatternSplat$1 = [...tmpArrPatternStep];
const tmpArrPatternStep$1 = tmpArrPatternSplat$1[0];
let tmpCalleeParam = tmpArrPatternStep$1;
let tmpCalleeParam$1 = [];
x = $objPatternRest(tmpCalleeParam, tmpCalleeParam$1, undefined);
$(x);
`````


## Todos triggered


- (todo) Deal with array spreads in arr mutation?
- (todo) can we always safely clone ident refs in this case?
- (todo) support array reads statement type ExpressionStatement
- (todo) support array reads statement type VarStatement
- (todo) we may be able to confirm that ident refs in the array literal are primitives in same loop/try scope


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
