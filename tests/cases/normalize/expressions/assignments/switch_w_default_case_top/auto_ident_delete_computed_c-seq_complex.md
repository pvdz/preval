# Preval test case

# auto_ident_delete_computed_c-seq_complex.md

> Normalize > Expressions > Assignments > Switch w default case top > Auto ident delete computed c-seq complex
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let arg = { y: 1 };

let a = { a: 999, b: 1000 };
switch ($(1)) {
  case $(1):
    a = delete ($(1), $(2), $(arg))[$("y")];
  default:
    $("fail1");
  case 2:
    $("fail2");
}
$(a, arg);
`````


## Settled


`````js filename=intro
let a /*:unknown*/ = { a: 999, b: 1000 };
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
const arg /*:object*/ = { y: 1 };
if (tmpIfTest$3) {
  $(1);
  $(2);
  const tmpDeleteCompObj /*:unknown*/ = $(arg);
  const tmpDeleteCompProp /*:unknown*/ = $(`y`);
  a = delete tmpDeleteCompObj[tmpDeleteCompProp];
} else {
}
const tmpIfTest$5 /*:boolean*/ = tmpSwitchCaseToStart <= 1;
if (tmpIfTest$5) {
  $(`fail1`);
  $(`fail2`);
  $(a, arg);
} else {
  $(`fail2`);
  $(a, arg);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpSwitchValue = $(1);
let tmpSwitchCaseToStart = 1;
if ($(1) === tmpSwitchValue) {
  tmpSwitchCaseToStart = 0;
} else {
  if (2 === tmpSwitchValue) {
    tmpSwitchCaseToStart = 2;
  }
}
const tmpIfTest$3 = tmpSwitchCaseToStart <= 0;
const arg = { y: 1 };
if (tmpIfTest$3) {
  $(1);
  $(2);
  const tmpDeleteCompObj = $(arg);
  const tmpDeleteCompProp = $(`y`);
  a = delete tmpDeleteCompObj[tmpDeleteCompProp];
}
if (tmpSwitchCaseToStart <= 1) {
  $(`fail1`);
  $(`fail2`);
  $(a, arg);
} else {
  $(`fail2`);
  $(a, arg);
}
`````


## PST Settled
With rename=true

`````js filename=intro
let a = {
  a: 999,
  b: 1000,
};
const b = $( 1 );
let c = 1;
const d = $( 1 );
const e = d === b;
if (e) {
  c = 0;
}
else {
  const f = 2 === b;
  if (f) {
    c = 2;
  }
}
const g = c <= 0;
const h = { y: 1 };
if (g) {
  $( 1 );
  $( 2 );
  const i = $( h );
  const j = $( "y" );
  a = delete i[ j ];
}
const k = c <= 1;
if (k) {
  $( "fail1" );
  $( "fail2" );
  $( a, h );
}
else {
  $( "fail2" );
  $( a, h );
}
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: 1
 - 3: 1
 - 4: 2
 - 5: { y: '1' }
 - 6: 'y'
 - 7: 'fail1'
 - 8: 'fail2'
 - 9: true, {}
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
