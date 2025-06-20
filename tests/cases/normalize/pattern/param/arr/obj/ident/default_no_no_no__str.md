# Preval test case

# default_no_no_no__str.md

> Normalize > Pattern > Param > Arr > Obj > Ident > Default no no no  str
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

## Input

`````js filename=intro
function f([{ x }]) {
  return x;
}
$(f('abc'));
`````


## Settled


`````js filename=intro
const x /*:unknown*/ = $String_prototype.x;
$(x);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$($String_prototype.x);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $String_prototype.x;
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
  let x = tmpArrPatternStep.x;
  return x;
};
let tmpCalleeParam = f(`abc`);
$(tmpCalleeParam);
`````


## Todos triggered


- (todo) Deal with array spreads in arr mutation?
- (todo) we may be able to confirm that ident refs in the array literal are primitives in same loop/try scope


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
