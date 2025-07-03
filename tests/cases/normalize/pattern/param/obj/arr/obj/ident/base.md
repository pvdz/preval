# Preval test case

# base.md

> Normalize > Pattern > Param > Obj > Arr > Obj > Ident > Base
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

## Input

`````js filename=intro
function f({ x: [{ y }] }) {
  return y;
}
$(f({ x: [{ x: 1, y: 2, c: 3 }, 13, 14], a: 11, b: 12 }, 10));
`````


## Settled


`````js filename=intro
$(2);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(2);
`````


## PST Settled
With rename=true

`````js filename=intro
$( 2 );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let f = function ($$0) {
  const tmpParamBare = $$0;
  debugger;
  let tmpBindingPatternObjRoot = tmpParamBare;
  let tmpOPND = tmpBindingPatternObjRoot.x;
  let tmpArrPatternSplat = [...tmpOPND];
  let tmpArrPatternStep = tmpArrPatternSplat[0];
  let y = tmpArrPatternStep.y;
  return y;
};
const tmpCallCallee = f;
const tmpArrElement = { x: 1, y: 2, c: 3 };
const tmpObjLitVal = [tmpArrElement, 13, 14];
let tmpCalleeParam$1 = { x: tmpObjLitVal, a: 11, b: 12 };
let tmpCalleeParam = f(tmpCalleeParam$1, 10);
$(tmpCalleeParam);
`````


## Todos triggered


- (todo) Deal with array spreads in arr mutation?
- (todo) array reads var statement with init ObjectExpression
- (todo) can we always safely clone ident refs in this case?
- (todo) support array reads statement type ExpressionStatement
- (todo) we may be able to confirm that ident refs in the array literal are primitives in same loop/try scope


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
