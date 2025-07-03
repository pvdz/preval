# Preval test case

# default_yes_yes__arr_empty.md

> Normalize > Pattern > Param > Arr > Arr > Rest > Default yes yes  arr empty
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

## Input

`````js filename=intro
function f([[...x] = $('pass')] = $('fail2')) {
  return x;
}
$(f([], 200));
`````


## Settled


`````js filename=intro
const tmpSSA_tmpArrPatternStep /*:unknown*/ = $(`pass`);
const tmpArrPatternSplat$1 /*:array*/ /*truthy*/ = [...tmpSSA_tmpArrPatternStep];
const x /*:array*/ /*truthy*/ = $dotCall($array_slice, tmpArrPatternSplat$1, `slice`, 0);
$(x);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpSSA_tmpArrPatternStep = $(`pass`);
$($dotCall($array_slice, [...tmpSSA_tmpArrPatternStep], `slice`, 0));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "pass" );
const b = [ ...a ];
const c = $dotCall( $array_slice, b, "slice", 0 );
$( c );
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
  let tmpArrPatternStep = undefined;
  const tmpIfTest$1 = tmpAPBD === undefined;
  if (tmpIfTest$1) {
    tmpArrPatternStep = $(`pass`);
  } else {
    tmpArrPatternStep = tmpAPBD;
  }
  let tmpArrPatternSplat$1 = [...tmpArrPatternStep];
  const tmpMCF = tmpArrPatternSplat$1.slice;
  let x = $dotCall(tmpMCF, tmpArrPatternSplat$1, `slice`, 0);
  return x;
};
const tmpCallCallee = f;
let tmpCalleeParam$1 = [];
let tmpCalleeParam = f(tmpCalleeParam$1, 200);
$(tmpCalleeParam);
`````


## Todos triggered


- (todo) Deal with array spreads in arr mutation?
- (todo) access object property that also exists on prototype? $array_slice
- (todo) array reads var statement with init ArrayExpression
- (todo) array reads var statement with init CallExpression
- (todo) support array reads statement type ExpressionStatement
- (todo) type trackeed tricks can possibly support static $array_slice
- (todo) we may be able to confirm that ident refs in the array literal are primitives in same loop/try scope


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'pass'
 - 2: ['p', 'a', 's', 's']
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
