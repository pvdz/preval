# Preval test case

# default_yes_no_no__arr_obj_str.md

> Normalize > Pattern > Param > Arr > Obj > Ident > Default yes no no  arr obj str
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

## Input

`````js filename=intro
function f([{ x = $('fail') }]) {
  return x;
}
$(f([{ x: 'abc', y: 2, z: 3 }, 20, 30], 200));
`````


## Settled


`````js filename=intro
$(`abc`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`abc`);
`````


## PST Settled
With rename=true

`````js filename=intro
$( "abc" );
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
    x = $(`fail`);
    return x;
  } else {
    x = tmpOPBD;
    return x;
  }
};
const tmpCallCallee = f;
const tmpArrElement = { x: `abc`, y: 2, z: 3 };
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
 - 1: 'abc'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
