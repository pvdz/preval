# Preval test case

# default_yes_no_no__arr_obj_empty.md

> Normalize > Pattern > Param > Arr > Obj > Ident > Default yes no no  arr obj empty
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

## Input

`````js filename=intro
function f([{ x = $('pass') }]) {
  return x;
}
$(f([{}, 20, 30], 200));
`````


## Settled


`````js filename=intro
const tmpOPBD /*:unknown*/ = $Object_prototype.x;
const tmpIfTest /*:boolean*/ = tmpOPBD === undefined;
if (tmpIfTest) {
  const tmpClusterSSA_tmpCalleeParam /*:unknown*/ = $(`pass`);
  $(tmpClusterSSA_tmpCalleeParam);
} else {
  $(tmpOPBD);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpOPBD = $Object_prototype.x;
if (tmpOPBD === undefined) {
  $($(`pass`));
} else {
  $(tmpOPBD);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $Object_prototype.x;
const b = a === undefined;
if (b) {
  const c = $( "pass" );
  $( c );
}
else {
  $( a );
}
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
  let tmpOPBD = tmpArrPatternStep.x;
  let x = undefined;
  const tmpIfTest = tmpOPBD === undefined;
  if (tmpIfTest) {
    x = $(`pass`);
    return x;
  } else {
    x = tmpOPBD;
    return x;
  }
};
const tmpCallCallee = f;
const tmpArrElement = {};
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
 - 1: 'pass'
 - 2: 'pass'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
