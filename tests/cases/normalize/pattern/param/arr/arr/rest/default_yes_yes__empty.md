# Preval test case

# default_yes_yes__empty.md

> Normalize > Pattern > Param > Arr > Arr > Rest > Default yes yes  empty
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

## Input

`````js filename=intro
function f([[...x] = $('fail')] = $('pass2')) {
  return x;
}
$(f());
`````


## Settled


`````js filename=intro
const tmpBindingPatternArrRoot /*:unknown*/ = $(`pass2`);
const tmpArrPatternSplat /*:array*/ = [...tmpBindingPatternArrRoot];
const tmpAPBD /*:unknown*/ = tmpArrPatternSplat[0];
let tmpArrPatternStep /*:unknown*/ /*ternaryConst*/ = undefined;
const tmpIfTest$1 /*:boolean*/ = tmpAPBD === undefined;
if (tmpIfTest$1) {
  tmpArrPatternStep = $(`fail`);
} else {
  tmpArrPatternStep = tmpAPBD;
}
const tmpArrPatternSplat$1 /*:array*/ = [...tmpArrPatternStep];
const x /*:array*/ = $dotCall($array_slice, tmpArrPatternSplat$1, `slice`, 0);
$(x);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpBindingPatternArrRoot = $(`pass2`);
const tmpAPBD = [...tmpBindingPatternArrRoot][0];
let tmpArrPatternStep = undefined;
if (tmpAPBD === undefined) {
  tmpArrPatternStep = $(`fail`);
} else {
  tmpArrPatternStep = tmpAPBD;
}
$($dotCall($array_slice, [...tmpArrPatternStep], `slice`, 0));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "pass2" );
const b = [ ...a ];
const c = b[ 0 ];
let d = undefined;
const e = c === undefined;
if (e) {
  d = $( "fail" );
}
else {
  d = c;
}
const f = [ ...d ];
const g = $dotCall( $array_slice, f, "slice", 0 );
$( g );
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
    tmpBindingPatternArrRoot = $(`pass2`);
  } else {
    tmpBindingPatternArrRoot = tmpParamBare;
  }
  let tmpArrPatternSplat = [...tmpBindingPatternArrRoot];
  let tmpAPBD = tmpArrPatternSplat[0];
  let tmpArrPatternStep = undefined;
  const tmpIfTest$1 = tmpAPBD === undefined;
  if (tmpIfTest$1) {
    tmpArrPatternStep = $(`fail`);
  } else {
    tmpArrPatternStep = tmpAPBD;
  }
  let tmpArrPatternSplat$1 = [...tmpArrPatternStep];
  const tmpMCF = tmpArrPatternSplat$1.slice;
  let x = $dotCall(tmpMCF, tmpArrPatternSplat$1, `slice`, 0);
  return x;
};
let tmpCalleeParam = f();
$(tmpCalleeParam);
`````


## Todos triggered


- (todo) Deal with array spreads in arr mutation?
- (todo) access object property that also exists on prototype? $array_slice
- (todo) type trackeed tricks can possibly support static $array_slice
- (todo) we may be able to confirm that ident refs in the array literal are primitives in same loop/try scope


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'pass2'
 - 2: ['p']
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
