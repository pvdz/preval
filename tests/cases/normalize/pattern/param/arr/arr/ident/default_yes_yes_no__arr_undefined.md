# Preval test case

# default_yes_yes_no__arr_undefined.md

> Normalize > Pattern > Param > Arr > Arr > Ident > Default yes yes no  arr undefined
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

## Input

`````js filename=intro
function f([[x = $('fail')] = $(['pass2'])]) {
  return x;
}
$(f([undefined, 4, 5], 200));
`````


## Settled


`````js filename=intro
const tmpCalleeParam /*:array*/ /*truthy*/ = [`pass2`];
const tmpClusterSSA_tmpArrPatternStep /*:unknown*/ = $(tmpCalleeParam);
const tmpArrPatternSplat$1 /*:array*/ /*truthy*/ = [...tmpClusterSSA_tmpArrPatternStep];
const tmpAPBD$1 /*:unknown*/ = tmpArrPatternSplat$1[0];
const tmpIfTest$1 /*:boolean*/ = tmpAPBD$1 === undefined;
if (tmpIfTest$1) {
  const tmpClusterSSA_tmpCalleeParam$1 /*:unknown*/ = $(`fail`);
  $(tmpClusterSSA_tmpCalleeParam$1);
} else {
  $(tmpAPBD$1);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpClusterSSA_tmpArrPatternStep = $([`pass2`]);
const tmpAPBD$1 = [...tmpClusterSSA_tmpArrPatternStep][0];
if (tmpAPBD$1 === undefined) {
  $($(`fail`));
} else {
  $(tmpAPBD$1);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = [ "pass2" ];
const b = $( a );
const c = [ ...b ];
const d = c[ 0 ];
const e = d === undefined;
if (e) {
  const f = $( "fail" );
  $( f );
}
else {
  $( d );
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
  let tmpAPBD = tmpArrPatternSplat[0];
  let tmpArrPatternStep = undefined;
  const tmpIfTest = tmpAPBD === undefined;
  if (tmpIfTest) {
    let tmpCalleeParam = [`pass2`];
    tmpArrPatternStep = $(tmpCalleeParam);
  } else {
    tmpArrPatternStep = tmpAPBD;
  }
  let tmpArrPatternSplat$1 = [...tmpArrPatternStep];
  let tmpAPBD$1 = tmpArrPatternSplat$1[0];
  let x = undefined;
  const tmpIfTest$1 = tmpAPBD$1 === undefined;
  if (tmpIfTest$1) {
    x = $(`fail`);
    return x;
  } else {
    x = tmpAPBD$1;
    return x;
  }
};
const tmpCallCallee = f;
let tmpCalleeParam$3 = [undefined, 4, 5];
let tmpCalleeParam$1 = f(tmpCalleeParam$3, 200);
$(tmpCalleeParam$1);
`````


## Todos triggered


- (todo) Deal with array spreads in arr mutation?
- (todo) array reads var statement with init CallExpression
- (todo) fixme: spyless vars and labeled nodes
- (todo) support array reads statement type ExpressionStatement
- (todo) we may be able to confirm that ident refs in the array literal are primitives in same loop/try scope
- (todo) what other ways do member expressions still appear? ExpressionStatement


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: ['pass2']
 - 2: 'pass2'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
