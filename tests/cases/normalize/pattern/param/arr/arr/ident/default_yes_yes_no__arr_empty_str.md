# Preval test case

# default_yes_yes_no__arr_empty_str.md

> Normalize > Pattern > Param > Arr > Arr > Ident > Default yes yes no  arr empty str
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

## Input

`````js filename=intro
function f([[x = $('pass')] = $(['fail2'])]) {
  return x;
}
$(f(['', 4, 5], 200));
`````


## Settled


`````js filename=intro
const tmpClusterSSA_tmpCalleeParam$1 /*:unknown*/ = $(`pass`);
$(tmpClusterSSA_tmpCalleeParam$1);
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
  let tmpBindingPatternArrRoot = tmpParamBare;
  let tmpArrPatternSplat = [...tmpBindingPatternArrRoot];
  let tmpAPBD = tmpArrPatternSplat[0];
  let tmpArrPatternStep = undefined;
  const tmpIfTest = tmpAPBD === undefined;
  if (tmpIfTest) {
    let tmpCalleeParam = [`fail2`];
    tmpArrPatternStep = $(tmpCalleeParam);
  } else {
    tmpArrPatternStep = tmpAPBD;
  }
  let tmpArrPatternSplat$1 = [...tmpArrPatternStep];
  let tmpAPBD$1 = tmpArrPatternSplat$1[0];
  let x = undefined;
  const tmpIfTest$1 = tmpAPBD$1 === undefined;
  if (tmpIfTest$1) {
    x = $(`pass`);
    return x;
  } else {
    x = tmpAPBD$1;
    return x;
  }
};
const tmpCallCallee = f;
let tmpCalleeParam$3 = [``, 4, 5];
let tmpCalleeParam$1 = f(tmpCalleeParam$3, 200);
$(tmpCalleeParam$1);
`````


## Todos triggered


- (todo) Deal with array spreads in arr mutation?
- (todo) array reads var statement with init CallExpression
- (todo) fixme: spyless vars and labeled nodes
- (todo) support array reads statement type ExpressionStatement
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
