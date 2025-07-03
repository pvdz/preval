# Preval test case

# base.md

> Normalize > Pattern > Param > Arr > Arr > Arr > Ident > Base
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

## Input

`````js filename=intro
function f([[[x]]]) {
  return x;
}
$(f([[[[1, 2, 3], 4, 5], 20, 30], 40, 50], 200));
`````


## Settled


`````js filename=intro
const tmpArrElement$3 /*:array*/ /*truthy*/ = [1, 2, 3];
$(tmpArrElement$3);
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
  let x = tmpArrPatternSplat$3[0];
  return x;
};
const tmpCallCallee = f;
const tmpArrElement$3 = [1, 2, 3];
const tmpArrElement$1 = [tmpArrElement$3, 4, 5];
const tmpArrElement = [tmpArrElement$1, 20, 30];
let tmpCalleeParam$1 = [tmpArrElement, 40, 50];
let tmpCalleeParam = f(tmpCalleeParam$1, 200);
$(tmpCalleeParam);
`````


## Todos triggered


- (todo) Deal with array spreads in arr mutation?
- (todo) array reads var statement with init ArrayExpression
- (todo) array reads var statement with init CallExpression
- (todo) array reads var statement with init MemberExpression
- (todo) can we always safely clone ident refs in this case?
- (todo) support array reads statement type ExpressionStatement
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
