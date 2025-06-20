# Preval test case

# auto_pattern_arr_s-seq.md

> Normalize > Expressions > Assignments > Switch w default case test > Auto pattern arr s-seq
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let [a] = { a: 999, b: 1000 };
switch ($(1)) {
  case ([a] = ($(10), $(20), [1, 2])):
  default:
    $("fail1");
  case 2:
    $("fail2");
}
$(a);
`````


## Settled


`````js filename=intro
const tmpBindingPatternArrRoot /*:object*/ /*truthy*/ = { a: 999, b: 1000 };
[...tmpBindingPatternArrRoot];
const tmpSwitchValue /*:unknown*/ = $(1);
let tmpSwitchCaseToStart /*:number*/ /*ternaryConst*/ = 1;
$(10);
$(20);
const tmpNestedAssignArrPatternRhs /*:array*/ /*truthy*/ = [1, 2];
const tmpArrPatternSplat$1 /*:array*/ /*truthy*/ = [...tmpNestedAssignArrPatternRhs];
const a /*:unknown*/ = tmpArrPatternSplat$1[0];
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
[...tmpBindingPatternArrRoot];
const tmpSwitchValue = $(1);
let tmpSwitchCaseToStart = 1;
$(10);
$(20);
const tmpNestedAssignArrPatternRhs = [1, 2];
const a = [...tmpNestedAssignArrPatternRhs][0];
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
[ ...a ];
const b = $( 1 );
let c = 1;
$( 10 );
$( 20 );
const d = [ 1, 2 ];
const e = [ ...d ];
const f = e[ 0 ];
const g = d === b;
if (g) {
  c = 0;
}
else {
  const h = 2 === b;
  if (h) {
    c = 2;
  }
}
const i = c <= 1;
if (i) {
  $( "fail1" );
  $( "fail2" );
  $( f );
}
else {
  $( "fail2" );
  $( f );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let tmpBindingPatternArrRoot = { a: 999, b: 1000 };
let tmpArrPatternSplat = [...tmpBindingPatternArrRoot];
let a = tmpArrPatternSplat[0];
let tmpSwitchValue = $(1);
let tmpSwitchCaseToStart = 1;
let tmpBinLhs = undefined;
$(10);
$(20);
const tmpNestedAssignArrPatternRhs = [1, 2];
const tmpArrPatternSplat$1 = [...tmpNestedAssignArrPatternRhs];
a = tmpArrPatternSplat$1[0];
tmpBinLhs = tmpNestedAssignArrPatternRhs;
const tmpIfTest = tmpBinLhs === tmpSwitchValue;
if (tmpIfTest) {
  tmpSwitchCaseToStart = 0;
} else {
  const tmpIfTest$1 = 2 === tmpSwitchValue;
  if (tmpIfTest$1) {
    tmpSwitchCaseToStart = 2;
  } else {
  }
}
const tmpIfTest$3 = tmpSwitchCaseToStart <= 0;
const tmpIfTest$5 = tmpSwitchCaseToStart <= 1;
if (tmpIfTest$5) {
  $(`fail1`);
} else {
}
const tmpIfTest$7 = tmpSwitchCaseToStart <= 2;
if (tmpIfTest$7) {
  $(`fail2`);
  $(a);
} else {
  $(a);
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
