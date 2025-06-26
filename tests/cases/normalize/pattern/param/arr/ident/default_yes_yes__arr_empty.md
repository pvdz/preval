# Preval test case

# default_yes_yes__arr_empty.md

> Normalize > Pattern > Param > Arr > Ident > Default yes yes  arr empty
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

## Input

`````js filename=intro
function f([x = $('pass')] = $('fail2')) {
  return x;
}
$(f([], 200));
`````


## Settled


`````js filename=intro
const tmpClusterSSA_tmpCalleeParam /*:unknown*/ = $(`pass`);
$(tmpClusterSSA_tmpCalleeParam);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$($(`pass`));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "pass" );
$( a );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let f = function ($$0) {
  const tmpParamBare = $$0;
  debugger;
  let tmpBindingPatternArrRoot = undefined;
  const tmpIfTest = tmpParamBare === undefined;
  if (tmpIfTest) {
    tmpBindingPatternArrRoot = $(`fail2`);
  } else {
    tmpBindingPatternArrRoot = tmpParamBare;
  }
  let tmpArrPatternSplat = [...tmpBindingPatternArrRoot];
  let tmpAPBD = tmpArrPatternSplat[0];
  let x = undefined;
  const tmpIfTest$1 = tmpAPBD === undefined;
  if (tmpIfTest$1) {
    x = $(`pass`);
    return x;
  } else {
    x = tmpAPBD;
    return x;
  }
};
const tmpCallCallee = f;
let tmpCalleeParam$1 = [];
let tmpCalleeParam = f(tmpCalleeParam$1, 200);
$(tmpCalleeParam);
`````


## Todos triggered


- (todo) Deal with array spreads in arr mutation?
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
