# Preval test case

# auto_ident_delete_computed_complex_complex.md

> Normalize > Expressions > Assignments > Switch w default case test > Auto ident delete computed complex complex
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let arg = { y: 1 };

let a = { a: 999, b: 1000 };
switch ($(1)) {
  case (a = delete $(arg)[$("y")]):
  default:
    $("fail1");
  case 2:
    $("fail2");
}
$(a, arg);
`````


## Settled


`````js filename=intro
const tmpSwitchValue /*:unknown*/ = $(1);
let tmpSwitchCaseToStart /*:number*/ = 1;
const arg /*:object*/ = { y: 1 };
const tmpDeleteCompObj /*:unknown*/ = $(arg);
const tmpDeleteCompProp /*:unknown*/ = $(`y`);
const tmpClusterSSA_a /*:boolean*/ = delete tmpDeleteCompObj[tmpDeleteCompProp];
const tmpIfTest /*:boolean*/ = tmpClusterSSA_a === tmpSwitchValue;
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
  $(tmpClusterSSA_a, arg);
} else {
  $(`fail2`);
  $(tmpClusterSSA_a, arg);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpSwitchValue = $(1);
let tmpSwitchCaseToStart = 1;
const arg = { y: 1 };
const tmpDeleteCompObj = $(arg);
const tmpDeleteCompProp = $(`y`);
const tmpClusterSSA_a = delete tmpDeleteCompObj[tmpDeleteCompProp];
if (tmpClusterSSA_a === tmpSwitchValue) {
  tmpSwitchCaseToStart = 0;
} else {
  if (2 === tmpSwitchValue) {
    tmpSwitchCaseToStart = 2;
  }
}
if (tmpSwitchCaseToStart <= 1) {
  $(`fail1`);
  $(`fail2`);
  $(tmpClusterSSA_a, arg);
} else {
  $(`fail2`);
  $(tmpClusterSSA_a, arg);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 1 );
let b = 1;
const c = { y: 1 };
const d = $( c );
const e = $( "y" );
const f = delete d[ e ];
const g = f === a;
if (g) {
  b = 0;
}
else {
  const h = 2 === a;
  if (h) {
    b = 2;
  }
}
const i = b <= 1;
if (i) {
  $( "fail1" );
  $( "fail2" );
  $( f, c );
}
else {
  $( "fail2" );
  $( f, c );
}
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: { y: '1' }
 - 3: 'y'
 - 4: 'fail1'
 - 5: 'fail2'
 - 6: true, {}
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
