# Preval test case

# base.md

> Normalize > Pattern > Param > Arr > Obj > Arr > Arr > Base
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

## Input

`````js filename=intro
function f([
  {
    x: [[]],
  },
]) {
  return 'ok';
}
$(f([{ x: [[1, 2, 3], 10], y: 11 }, 20, 30], 200));
`````


## Settled


`````js filename=intro
$(`ok`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`ok`);
`````


## PST Settled
With rename=true

`````js filename=intro
$( "ok" );
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
  let tmpArrPatternSplat$1 = [...tmpOPND];
  let tmpArrPatternStep$1 = tmpArrPatternSplat$1[0];
  let tmpArrPatternSplat$3 = [...tmpArrPatternStep$1];
  return `ok`;
};
const tmpCallCallee = f;
const tmpArrElement$1 = [1, 2, 3];
const tmpObjLitVal = [tmpArrElement$1, 10];
const tmpArrElement = { x: tmpObjLitVal, y: 11 };
let tmpCalleeParam$1 = [tmpArrElement, 20, 30];
let tmpCalleeParam = f(tmpCalleeParam$1, 200);
$(tmpCalleeParam);
`````


## Todos triggered


- (todo) Deal with array spreads in arr mutation?
- (todo) can we always safely clone ident refs in this case?
- (todo) support array reads statement type ExpressionStatement
- (todo) support array reads statement type VarStatement
- (todo) we may be able to confirm that ident refs in the array literal are primitives in same loop/try scope


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'ok'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
