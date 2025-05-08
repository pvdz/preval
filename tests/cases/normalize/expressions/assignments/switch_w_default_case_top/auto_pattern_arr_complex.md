# Preval test case

# auto_pattern_arr_complex.md

> Normalize > Expressions > Assignments > Switch w default case top > Auto pattern arr complex
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let [a] = { a: 999, b: 1000 };
switch ($(1)) {
  case $(1):
    [a] = $([1, 2]);
  default:
    $("fail1");
  case 2:
    $("fail2");
}
$(a);
`````


## Settled


`````js filename=intro
const tmpBindingPatternArrRoot /*:object*/ = { a: 999, b: 1000 };
const tmpArrPatternSplat /*:array*/ = [...tmpBindingPatternArrRoot];
let a /*:unknown*/ = tmpArrPatternSplat[0];
const tmpSwitchValue /*:unknown*/ = $(1);
let tmpSwitchCaseToStart /*:number*/ = 1;
const tmpBinLhs /*:unknown*/ = $(1);
const tmpIfTest /*:boolean*/ = tmpBinLhs === tmpSwitchValue;
if (tmpIfTest) {
  tmpSwitchCaseToStart = 0;
} else {
  const tmpIfTest$1 /*:boolean*/ = 2 === tmpSwitchValue;
  if (tmpIfTest$1) {
    tmpSwitchCaseToStart = 2;
  } else {
  }
}
const tmpIfTest$3 /*:boolean*/ = tmpSwitchCaseToStart <= 0;
if (tmpIfTest$3) {
  const tmpCalleeParam /*:array*/ = [1, 2];
  const tmpArrAssignPatternRhs /*:unknown*/ = $(tmpCalleeParam);
  const tmpArrPatternSplat$1 /*:array*/ = [...tmpArrAssignPatternRhs];
  a = tmpArrPatternSplat$1[0];
} else {
}
const tmpIfTest$5 /*:boolean*/ = tmpSwitchCaseToStart <= 1;
if (tmpIfTest$5) {
  $(`fail1`);
  $(`fail2`);
  $(a);
} else {
  $(`fail2`);
  $(a);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpBindingPatternArrRoot = { a: 999, b: 1000 };
let a = [...tmpBindingPatternArrRoot][0];
const tmpSwitchValue = $(1);
let tmpSwitchCaseToStart = 1;
if ($(1) === tmpSwitchValue) {
  tmpSwitchCaseToStart = 0;
} else {
  if (2 === tmpSwitchValue) {
    tmpSwitchCaseToStart = 2;
  }
}
if (tmpSwitchCaseToStart <= 0) {
  const tmpArrAssignPatternRhs = $([1, 2]);
  a = [...tmpArrAssignPatternRhs][0];
}
if (tmpSwitchCaseToStart <= 1) {
  $(`fail1`);
  $(`fail2`);
  $(a);
} else {
  $(`fail2`);
  $(a);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = {
  a: 999,
  b: 1000,
};
const b = [ ...a ];
let c = b[ 0 ];
const d = $( 1 );
let e = 1;
const f = $( 1 );
const g = f === d;
if (g) {
  e = 0;
}
else {
  const h = 2 === d;
  if (h) {
    e = 2;
  }
}
const i = e <= 0;
if (i) {
  const j = [ 1, 2 ];
  const k = $( j );
  const l = [ ...k ];
  c = l[ 0 ];
}
const m = e <= 1;
if (m) {
  $( "fail1" );
  $( "fail2" );
  $( c );
}
else {
  $( "fail2" );
  $( c );
}
`````


## Todos triggered


- (todo) Deal with array spreads in arr mutation?
- (todo) support array reads statement type VarStatement
- (todo) we may be able to confirm that ident refs in the array literal are primitives in same loop/try scope


## Globals


None


## Runtime Outcome


Should call `$` with:
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
