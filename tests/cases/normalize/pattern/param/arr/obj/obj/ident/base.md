# Preval test case

# base.md

> Normalize > Pattern > Param > Arr > Obj > Obj > Ident > Base
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

## Input

`````js filename=intro
function f([
  {
    x: { y },
  },
]) {
  return y;
}
$(f([{ x: { x: 1, y: 2, z: 3 }, y: 11 }, 10], 100));
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
  let tmpBindingPatternArrRoot = tmpParamBare;
  let tmpArrPatternSplat = [...tmpBindingPatternArrRoot];
  let tmpArrPatternStep = tmpArrPatternSplat[0];
  let tmpOPND = tmpArrPatternStep.x;
  let y = tmpOPND.y;
  return y;
};
const tmpCallCallee = f;
const tmpObjLitVal = { x: 1, y: 2, z: 3 };
const tmpArrElement = { x: tmpObjLitVal, y: 11 };
let tmpCalleeParam$1 = [tmpArrElement, 10];
let tmpCalleeParam = f(tmpCalleeParam$1, 100);
$(tmpCalleeParam);
`````


## Todos triggered


- (todo) Deal with array spreads in arr mutation?
- (todo) can we always safely clone ident refs in this case?
- (todo) support array reads statement type VarStatement
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
