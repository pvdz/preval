# Preval test case

# auto_ident_unary_void_simple.md

> Normalize > Expressions > Assignments > Switch w default case test > Auto ident unary void simple
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let arg = 1;

let a = { a: 999, b: 1000 };
switch ($(1)) {
  case (a = void arg):
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
let tmpSwitchCaseToStart /*:number*/ /*ternaryConst*/ = 1;
const tmpIfTest /*:boolean*/ = undefined === tmpSwitchValue;
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
  $(undefined, 1);
} else {
  $(`fail2`);
  $(undefined, 1);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpSwitchValue = $(1);
let tmpSwitchCaseToStart = 1;
if (undefined === tmpSwitchValue) {
  tmpSwitchCaseToStart = 0;
} else {
  if (2 === tmpSwitchValue) {
    tmpSwitchCaseToStart = 2;
  }
}
if (tmpSwitchCaseToStart <= 1) {
  $(`fail1`);
  $(`fail2`);
  $(undefined, 1);
} else {
  $(`fail2`);
  $(undefined, 1);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 1 );
let b = 1;
const c = undefined === a;
if (c) {
  b = 0;
}
else {
  const d = 2 === a;
  if (d) {
    b = 2;
  }
}
const e = b <= 1;
if (e) {
  $( "fail1" );
  $( "fail2" );
  $( undefined, 1 );
}
else {
  $( "fail2" );
  $( undefined, 1 );
}
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: 'fail1'
 - 3: 'fail2'
 - 4: undefined, 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
