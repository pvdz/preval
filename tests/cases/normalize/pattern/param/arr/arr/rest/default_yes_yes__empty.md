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
const bindingPatternArrRoot /*:unknown*/ = $(`pass2`);
const arrPatternSplat /*:array*/ = [...bindingPatternArrRoot];
const arrPatternBeforeDefault /*:unknown*/ = arrPatternSplat[0];
let arrPatternStep /*:unknown*/ = undefined;
const tmpIfTest$1 /*:boolean*/ = arrPatternBeforeDefault === undefined;
if (tmpIfTest$1) {
  arrPatternStep = $(`fail`);
} else {
  arrPatternStep = arrPatternBeforeDefault;
}
const arrPatternSplat$1 /*:array*/ = [...arrPatternStep];
const x /*:array*/ = $dotCall($array_slice, arrPatternSplat$1, `slice`, 0);
$(x);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const bindingPatternArrRoot = $(`pass2`);
const arrPatternBeforeDefault = [...bindingPatternArrRoot][0];
let arrPatternStep = undefined;
if (arrPatternBeforeDefault === undefined) {
  arrPatternStep = $(`fail`);
} else {
  arrPatternStep = arrPatternBeforeDefault;
}
$($dotCall($array_slice, [...arrPatternStep], `slice`, 0));
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
- (todo) we may be able to confirm that ident refs in the array literal are primitives in same loop/try scope
- (todo) access object property that also exists on prototype? $array_slice
- (todo) type trackeed tricks can possibly support static $array_slice


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
