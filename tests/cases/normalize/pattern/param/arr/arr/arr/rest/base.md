# Preval test case

# base.md

> Normalize > Pattern > Param > Arr > Arr > Arr > Rest > Base
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

## Input

`````js filename=intro
function f([[[...x]]]) {
  return x;
}
$(f([[[1, 2, 3], 20, 30], 40, 50], 200));
`````


## Settled


`````js filename=intro
const x /*:array*/ /*truthy*/ = [1, 2, 3];
$(x);
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
let f = function ($$0) {
  const tmpParamBare = $$0;
  debugger;
  let tmpBindingPatternArrRoot = tmpParamBare;
  let tmpArrPatternSplat = [...tmpBindingPatternArrRoot];
  let tmpArrPatternStep = tmpArrPatternSplat[0];
  let tmpArrPatternSplat$1 = [...tmpArrPatternStep];
  let tmpArrPatternStep$1 = tmpArrPatternSplat$1[0];
  let tmpArrPatternSplat$3 = [...tmpArrPatternStep$1];
  const tmpMCF = tmpArrPatternSplat$3.slice;
  let x = $dotCall(tmpMCF, tmpArrPatternSplat$3, `slice`, 0);
  return x;
};
const tmpCallCallee = f;
const tmpArrElement$1 = [1, 2, 3];
const tmpArrElement = [tmpArrElement$1, 20, 30];
let tmpCalleeParam$1 = [tmpArrElement, 40, 50];
let tmpCalleeParam = f(tmpCalleeParam$1, 200);
$(tmpCalleeParam);
`````


## Todos triggered


- (todo) Deal with array spreads in arr mutation?
- (todo) access object property that also exists on prototype? $array_slice
- (todo) array reads var statement with init ArrayExpression
- (todo) array reads var statement with init CallExpression
- (todo) array reads var statement with init MemberExpression
- (todo) can we always safely clone ident refs in this case?
- (todo) support Identifier as var init in let_hoisting noob check
- (todo) support array reads statement type ExpressionStatement
- (todo) type trackeed tricks can possibly support static $array_slice
- (todo) we may be able to confirm that ident refs in the array literal are primitives in same loop/try scope


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
