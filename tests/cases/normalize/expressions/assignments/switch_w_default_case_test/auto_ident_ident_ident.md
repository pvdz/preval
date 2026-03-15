# Preval test case

# auto_ident_ident_ident.md

> Normalize > Expressions > Assignments > Switch w default case test > Auto ident ident ident
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = 1,
  c = 2;

let a = { a: 999, b: 1000 };
switch ($(1)) {
  case (a = b = 2):
  default:
    $("fail1");
  case 2:
    $("fail2");
}
$(a, b, c);
`````


## Settled


`````js filename=intro
const tmpSwitchValue /*:unknown*/ = $(1);
let tmpSwitchCaseToStart /*:number*/ /*ternaryConst*/ = 1;
const tmpIfTest /*:boolean*/ = 2 === tmpSwitchValue;
if (tmpIfTest) {
  tmpSwitchCaseToStart = 0;
  $(`fail1`);
} else {
  $(`fail1`);
}
const tmpIfTest$7 /*:boolean*/ = tmpSwitchCaseToStart <= 2;
if (tmpIfTest$7) {
  $(`fail2`);
  $(2, 2, 2);
} else {
  $(2, 2, 2);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpSwitchValue = $(1);
let tmpSwitchCaseToStart = 1;
if (2 === tmpSwitchValue) {
  tmpSwitchCaseToStart = 0;
  $(`fail1`);
} else {
  $(`fail1`);
}
if (tmpSwitchCaseToStart <= 2) {
  $(`fail2`);
  $(2, 2, 2);
} else {
  $(2, 2, 2);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 1 );
let b = 1;
const c = 2 === a;
if (c) {
  b = 0;
  $( "fail1" );
}
else {
  $( "fail1" );
}
const d = b <= 2;
if (d) {
  $( "fail2" );
  $( 2, 2, 2 );
}
else {
  $( 2, 2, 2 );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let b = 1;
let c = 2;
let a = { a: 999, b: 1000 };
let tmpSwitchValue = $(1);
let tmpSwitchCaseToStart = 1;
b = 2;
a = 2;
const tmpBinLhs = a;
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
  $(a, b, c);
} else {
  $(a, b, c);
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
 - 4: 2, 2, 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
