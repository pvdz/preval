# Preval test case

# default_no_no__str.md

> Normalize > Pattern > Param > Arr > Ident > Default no no  str
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

## Input

`````js filename=intro
function f([x]) {
  return x;
}
$(f('abc', 200));
`````


## Settled


`````js filename=intro
$(`a`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`a`);
`````


## PST Settled
With rename=true

`````js filename=intro
$( "a" );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let f = function ($$0) {
  const tmpParamBare = $$0;
  debugger;
  let tmpBindingPatternArrRoot = tmpParamBare;
  let tmpArrPatternSplat = [...tmpBindingPatternArrRoot];
  let x = tmpArrPatternSplat[0];
  return x;
};
let tmpCalleeParam = f(`abc`, 200);
$(tmpCalleeParam);
`````


## Todos triggered


- (todo) Deal with array spreads in arr mutation?
- (todo) we may be able to confirm that ident refs in the array literal are primitives in same loop/try scope


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'a'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
