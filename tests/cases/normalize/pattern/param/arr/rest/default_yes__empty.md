# Preval test case

# default_yes__empty.md

> Normalize > Pattern > Param > Arr > Rest > Default yes  empty
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

## Input

`````js filename=intro
function f([...x] = $(['pass'])) {
  return x;
}
$(f());
`````


## Settled


`````js filename=intro
const tmpCalleeParam /*:array*/ = [`pass`];
const tmpSSA_tmpBindingPatternArrRoot /*:unknown*/ = $(tmpCalleeParam);
const tmpArrPatternSplat /*:array*/ = [...tmpSSA_tmpBindingPatternArrRoot];
const x /*:array*/ = $dotCall($array_slice, tmpArrPatternSplat, `slice`, 0);
$(x);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpSSA_tmpBindingPatternArrRoot = $([`pass`]);
$($dotCall($array_slice, [...tmpSSA_tmpBindingPatternArrRoot], `slice`, 0));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = [ "pass" ];
const b = $( a );
const c = [ ...b ];
const d = $dotCall( $array_slice, c, "slice", 0 );
$( d );
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
    let tmpCalleeParam = [`pass`];
    tmpBindingPatternArrRoot = $(tmpCalleeParam);
  } else {
    tmpBindingPatternArrRoot = tmpParamBare;
  }
  let tmpArrPatternSplat = [...tmpBindingPatternArrRoot];
  const tmpMCF = tmpArrPatternSplat.slice;
  let x = $dotCall(tmpMCF, tmpArrPatternSplat, `slice`, 0);
  return x;
};
let tmpCalleeParam$1 = f();
$(tmpCalleeParam$1);
`````


## Todos triggered


- (todo) Deal with array spreads in arr mutation?
- (todo) access object property that also exists on prototype? $array_slice
- (todo) support array reads statement type ExpressionStatement
- (todo) support array reads statement type VarStatement
- (todo) type trackeed tricks can possibly support static $array_slice


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: ['pass']
 - 2: ['pass']
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
