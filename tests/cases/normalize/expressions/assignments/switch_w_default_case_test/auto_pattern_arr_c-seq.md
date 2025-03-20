# Preval test case

# auto_pattern_arr_c-seq.md

> Normalize > Expressions > Assignments > Switch w default case test > Auto pattern arr c-seq
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let [a] = { a: 999, b: 1000 };
switch ($(1)) {
  case ([a] = ($(10), $(20), $([1, 2]))):
  default:
    $("fail1");
  case 2:
    $("fail2");
}
$(a);
`````


## Settled


`````js filename=intro
const bindingPatternArrRoot /*:object*/ = { a: 999, b: 1000 };
const arrPatternSplat /*:array*/ = [...bindingPatternArrRoot];
arrPatternSplat[0];
const tmpSwitchValue /*:unknown*/ = $(1);
let tmpSwitchCaseToStart /*:number*/ = 1;
$(10);
$(20);
const tmpCalleeParam /*:array*/ = [1, 2];
const tmpNestedAssignArrPatternRhs /*:unknown*/ = $(tmpCalleeParam);
const arrPatternSplat$1 /*:array*/ = [...tmpNestedAssignArrPatternRhs];
const tmpClusterSSA_a /*:unknown*/ = arrPatternSplat$1[0];
const tmpIfTest /*:boolean*/ = tmpNestedAssignArrPatternRhs === tmpSwitchValue;
if (tmpIfTest) {
  tmpSwitchCaseToStart = 0;
} else {
  const tmpIfTest$1 /*:boolean*/ = 2 === tmpSwitchValue;
  if (tmpIfTest$1) {
    tmpSwitchCaseToStart = 2;
  } else {
  }
}
const tmpIfTest$5 /*:boolean*/ = tmpSwitchCaseToStart <= 1;
if (tmpIfTest$5) {
  $(`fail1`);
  $(`fail2`);
  $(tmpClusterSSA_a);
} else {
  $(`fail2`);
  $(tmpClusterSSA_a);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const bindingPatternArrRoot = { a: 999, b: 1000 };
[...bindingPatternArrRoot][0];
const tmpSwitchValue = $(1);
let tmpSwitchCaseToStart = 1;
$(10);
$(20);
const tmpNestedAssignArrPatternRhs = $([1, 2]);
const tmpClusterSSA_a = [...tmpNestedAssignArrPatternRhs][0];
if (tmpNestedAssignArrPatternRhs === tmpSwitchValue) {
  tmpSwitchCaseToStart = 0;
} else {
  if (2 === tmpSwitchValue) {
    tmpSwitchCaseToStart = 2;
  }
}
if (tmpSwitchCaseToStart <= 1) {
  $(`fail1`);
  $(`fail2`);
  $(tmpClusterSSA_a);
} else {
  $(`fail2`);
  $(tmpClusterSSA_a);
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
b[ 0 ];
const c = $( 1 );
let d = 1;
$( 10 );
$( 20 );
const e = [ 1, 2 ];
const f = $( e );
const g = [ ...f ];
const h = g[ 0 ];
const i = f === c;
if (i) {
  d = 0;
}
else {
  const j = 2 === c;
  if (j) {
    d = 2;
  }
}
const k = d <= 1;
if (k) {
  $( "fail1" );
  $( "fail2" );
  $( h );
}
else {
  $( "fail2" );
  $( h );
}
`````


## Todos triggered


- we may be able to confirm that ident refs in the array literal are primitives in same loop/try scope
- inline computed array property read


## Globals


None


## Runtime Outcome


Should call `$` with:
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
