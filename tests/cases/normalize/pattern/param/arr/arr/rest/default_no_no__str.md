# Preval test case

# default_no_no__str.md

> Normalize > Pattern > Param > Arr > Arr > Rest > Default no no  str
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

## Input

`````js filename=intro
function f([[...x]]) {
  return x;
}
$(f('abc', 4, 5, 200));
`````


## Settled


`````js filename=intro
const x /*:array*/ /*truthy*/ = [`a`];
$(x);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$([`a`]);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = [ "a" ];
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
  const tmpMCF = tmpArrPatternSplat$1.slice;
  let x = $dotCall(tmpMCF, tmpArrPatternSplat$1, `slice`, 0);
  return x;
};
let tmpCalleeParam = f(`abc`, 4, 5, 200);
$(tmpCalleeParam);
`````


## Todos triggered


- (todo) Deal with array spreads in arr mutation?
- (todo) access object property that also exists on prototype? $array_slice
- (todo) array reads var statement with init CallExpression
- (todo) support array reads statement type ExpressionStatement
- (todo) type trackeed tricks can possibly support static $array_slice
- (todo) we may be able to confirm that ident refs in the array literal are primitives in same loop/try scope


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: ['a']
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
