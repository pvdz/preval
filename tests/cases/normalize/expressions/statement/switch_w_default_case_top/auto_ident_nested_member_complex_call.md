# Preval test case

# auto_ident_nested_member_complex_call.md

> Normalize > Expressions > Statement > Switch w default case top > Auto ident nested member complex call
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let b = { x: 1 },
  c = { y: 2 },
  d = 3;

let a = { a: 999, b: 1000 };
switch ($(1)) {
  case $(1):
    $(b)[$("x")] = $(c)[$("y")] = $(d);
    break;
  default:
    $("fail1");
  case 2:
    $("fail2");
}
$(a, b, c, d);
`````


## Settled


`````js filename=intro
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
const b /*:object*/ = { x: 1 };
const c /*:object*/ = { y: 2 };
if (tmpIfTest$3) {
  const tmpAssignComMemLhsObj /*:unknown*/ = $(b);
  const tmpAssignComMemLhsProp /*:unknown*/ = $(`x`);
  const tmpInitAssignLhsComputedObj /*:unknown*/ = $(c);
  const tmpInitAssignLhsComputedProp /*:unknown*/ = $(`y`);
  const tmpInitAssignLhsComputedRhs /*:unknown*/ = $(3);
  tmpInitAssignLhsComputedObj[tmpInitAssignLhsComputedProp] = tmpInitAssignLhsComputedRhs;
  tmpAssignComMemLhsObj[tmpAssignComMemLhsProp] = tmpInitAssignLhsComputedRhs;
} else {
  const tmpIfTest$5 /*:boolean*/ = tmpSwitchCaseToStart <= 1;
  if (tmpIfTest$5) {
    $(`fail1`);
    $(`fail2`);
  } else {
    $(`fail2`);
  }
}
const a /*:object*/ = { a: 999, b: 1000 };
$(a, b, c, 3);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
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
const b = { x: 1 };
const c = { y: 2 };
if (tmpIfTest$3) {
  const tmpAssignComMemLhsObj = $(b);
  const tmpAssignComMemLhsProp = $(`x`);
  const tmpInitAssignLhsComputedObj = $(c);
  const tmpInitAssignLhsComputedProp = $(`y`);
  const tmpInitAssignLhsComputedRhs = $(3);
  tmpInitAssignLhsComputedObj[tmpInitAssignLhsComputedProp] = tmpInitAssignLhsComputedRhs;
  tmpAssignComMemLhsObj[tmpAssignComMemLhsProp] = tmpInitAssignLhsComputedRhs;
} else {
  if (tmpSwitchCaseToStart <= 1) {
    $(`fail1`);
    $(`fail2`);
  } else {
    $(`fail2`);
  }
}
$({ a: 999, b: 1000 }, b, c, 3);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 1 );
let b = 1;
const c = $( 1 );
const d = c === a;
if (d) {
  b = 0;
}
else {
  const e = 2 === a;
  if (e) {
    b = 2;
  }
}
const f = b <= 0;
const g = { x: 1 };
const h = { y: 2 };
if (f) {
  const i = $( g );
  const j = $( "x" );
  const k = $( h );
  const l = $( "y" );
  const m = $( 3 );
  k[l] = m;
  i[j] = m;
}
else {
  const n = b <= 1;
  if (n) {
    $( "fail1" );
    $( "fail2" );
  }
  else {
    $( "fail2" );
  }
}
const o = {
  a: 999,
  b: 1000,
};
$( o, g, h, 3 );
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: 1
 - 3: { x: '1' }
 - 4: 'x'
 - 5: { y: '2' }
 - 6: 'y'
 - 7: 3
 - 8: { a: '999', b: '1000' }, { x: '3' }, { y: '3' }, 3
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
