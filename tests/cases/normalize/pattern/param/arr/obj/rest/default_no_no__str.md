# Preval test case

# default_no_no__str.md

> Normalize > Pattern > Param > Arr > Obj > Rest > Default no no  str
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

## Input

`````js filename=intro
function f([{ ...x }]) {
  return x;
}
$(f('abc', 200));
`````


## Settled


`````js filename=intro
const tmpCalleeParam$1 /*:array*/ /*truthy*/ = [];
const x /*:unknown*/ = $objPatternRest(`a`, tmpCalleeParam$1, undefined);
$(x);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$($objPatternRest(`a`, [], undefined));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = [];
const b = $objPatternRest( "a", a, undefined );
$( b );
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
  let tmpCalleeParam = tmpArrPatternStep;
  let tmpCalleeParam$1 = [];
  let x = $objPatternRest(tmpCalleeParam, tmpCalleeParam$1, undefined);
  return x;
};
let tmpCalleeParam$3 = f(`abc`, 200);
$(tmpCalleeParam$3);
`````


## Todos triggered


- (todo) Deal with array spreads in arr mutation?
- (todo) array reads var statement with init CallExpression
- (todo) we may be able to confirm that ident refs in the array literal are primitives in same loop/try scope


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: { 0: '"a"' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
