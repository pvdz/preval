# Preval test case

# default_yes_yes__undefined.md

> Normalize > Pattern > Param > Arr > Arr > Rest > Default yes yes  undefined
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

## Input

`````js filename=intro
function f([[...x] = $('fail')] = $('pass2')) {
  return x;
}
$(f(undefined, 200));
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
