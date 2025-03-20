# Preval test case

# auto_ident_nested_simple_member_assigns.md

> Normalize > Expressions > Assignments > Switch w default case block > Auto ident nested simple member assigns
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = { x: 1 },
  c = 3;

let a = { a: 999, b: 1000 };
switch ($(1)) {
  case $(1): {
    a = b.x = b.x = b.x = b.x = b.x = b.x = c;
  }
  default:
    $("fail1");
  case 2:
    $("fail2");
}
$(a, b, c);
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
const b /*:object*/ = { x: 1 };
if (tmpIfTest$3) {
  b.x = 3;
  b.x = 3;
  b.x = 3;
  b.x = 3;
  b.x = 3;
  b.x = 3;
  a = 3;
} else {
}
const tmpIfTest$5 /*:boolean*/ = tmpSwitchCaseToStart <= 1;
if (tmpIfTest$5) {
  $(`fail1`);
  $(`fail2`);
  $(a, b, 3);
} else {
  $(`fail2`);
  $(a, b, 3);
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
const b = { x: 1 };
if (tmpIfTest$3) {
  b.x = 3;
  b.x = 3;
  b.x = 3;
  b.x = 3;
  b.x = 3;
  b.x = 3;
  a = 3;
}
if (tmpSwitchCaseToStart <= 1) {
  $(`fail1`);
  $(`fail2`);
  $(a, b, 3);
} else {
  $(`fail2`);
  $(a, b, 3);
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
const h = { x: 1 };
if (g) {
  h.x = 3;
  h.x = 3;
  h.x = 3;
  h.x = 3;
  h.x = 3;
  h.x = 3;
  a = 3;
}
const i = c <= 1;
if (i) {
  $( "fail1" );
  $( "fail2" );
  $( a, h, 3 );
}
else {
  $( "fail2" );
  $( a, h, 3 );
}
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: 1
 - 3: 'fail1'
 - 4: 'fail2'
 - 5: 3, { x: '3' }, 3
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
