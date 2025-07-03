# Preval test case

# base.md

> Normalize > Pattern > Binding > Obj > Arr > Arr > Ident > Base
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

## Input

`````js filename=intro
const { x: [[y]] } = { x: [[1, 2, 3], 13], a: 11, b: 12 };
$(y);
`````


## Settled


`````js filename=intro
$(1);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(1);
`````


## PST Settled
With rename=true

`````js filename=intro
$( 1 );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpArrElement = [1, 2, 3];
const tmpObjLitVal = [tmpArrElement, 13];
const tmpBindingPatternObjRoot = { x: tmpObjLitVal, a: 11, b: 12 };
const tmpOPND = tmpBindingPatternObjRoot.x;
const tmpArrPatternSplat = [...tmpOPND];
const tmpArrPatternStep = tmpArrPatternSplat[0];
const tmpArrPatternSplat$1 = [...tmpArrPatternStep];
const y = tmpArrPatternSplat$1[0];
$(y);
`````


## Todos triggered


- (todo) Deal with array spreads in arr mutation?
- (todo) array reads var statement with init MemberExpression
- (todo) array reads var statement with init ObjectExpression
- (todo) can we always safely clone ident refs in this case?
- (todo) support array reads statement type ExpressionStatement
- (todo) we may be able to confirm that ident refs in the array literal are primitives in same loop/try scope


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
